import type { AppRole, AuthUser, LoginInput, RegisterInput } from "../../../shared/schema.js";
import { countryToMoodleIso, normalizeScholarshipCountry } from "../../../shared/scholarship-concessions.js";
import { env } from "../../config/config.js";
import { getMoodleAdminToken } from "./moodle-tokens.js";
import { getPendingSignupByUsername, getStoredRoleByMoodleUserId, markPendingSignupConfirmed, rememberPendingRegistrationRole, rememberPendingSignup, syncUserFromMoodleSession } from "../../repositories/user-store.js";
import { prisma } from "../../db/prisma.js";
import { recordProvisionedStudentCredential } from "../provisioned-student-credentials.js";

interface MoodleLoginResponse {
  token?: string;
  privatetoken?: string;
  error?: string;
}

interface MoodleSiteInfo {
  userid?: number;
  username?: string;
  fullname?: string;
  firstname?: string;
  lastname?: string;
  userpictureurl?: string;
  userissiteadmin?: boolean;
  exception?: string;
  message?: string;
}

interface MoodleUserRecord {
  id?: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  email?: string;
  city?: string;
  country?: string;
  phone1?: string;
  description?: string;
  profileimageurlsmall?: string;
  profileimageurl?: string;
}

interface MoodleUsersResponse {
  users?: MoodleUserRecord[];
}

interface MoodleCreateUserRow {
  id?: number;
  username?: string;
}

interface MoodleSignupResponse {
  success?: boolean;
}

interface RegisterWithMoodleResult {
  user: AuthUser | null;
  requiresEmailConfirmation: boolean;
  message: string;
}

function sanitizeUsernameFromEmail(email: string) {
  const base = email.split("@")[0]?.toLowerCase() || "student";
  const normalized = base.replace(/[^a-z0-9._-]/g, "");
  const safe = normalized.length >= 3 ? normalized : `student${Date.now()}`;
  return safe.slice(0, 24);
}

function splitDisplayName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Student", lastName: "User" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "User" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function getBaseUrl() {
  const baseUrl = env.moodle.baseUrl;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  return baseUrl;
}

function getServiceName() {
  return env.moodle.publicService || "moodle_mobile_app";
}

function getAdminTokenCandidates() {
  return [getMoodleAdminToken()];
}

function getAdminToken() {
  return getMoodleAdminToken();
}

function isInvalidMoodleTokenError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return message.toLowerCase().includes("invalid token");
}

function isServiceAccountBlockedError(error: unknown) {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return message.includes("forcepasswordchangenotice") || message.includes("force password change");
}

function formatMoodleAuthError(message: string, context: "service" | "login" = "service") {
  if (message.includes("forcepasswordchangenotice")) {
    if (context === "login") {
      return "Your account was created, but Moodle is blocking sign-in until the password is changed once in Moodle. Open moodle.edumeup.com, log in with your new credentials, complete the password change, then return here.";
    }
    return "The Moodle API service account must change its password before registration can work. Log in to Moodle as that service user, complete the password change, then try again.";
  }
  return message;
}

export async function moodlePostWithTokenFallback<T>(
  wsfunction: string,
  params: URLSearchParams,
  tokens: string[] = getAdminTokenCandidates(),
) {
  if (!tokens.length) {
    throw new Error("MOODLE_ADMIN_TOKEN is not configured");
  }

  let lastError: Error | null = null;
  for (const token of tokens) {
    try {
      return await moodlePost<T>(token, wsfunction, params);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (!isInvalidMoodleTokenError(lastError) && !isServiceAccountBlockedError(lastError)) {
        throw lastError;
      }
    }
  }

  if (lastError && isServiceAccountBlockedError(lastError)) {
    throw new Error(formatMoodleAuthError(lastError.message));
  }

  throw lastError || new Error(
    "No valid Moodle webservice token found. In Moodle, go to Site administration → Server → Web services → Manage tokens, create a new token for a service user with core_user_create_users enabled, then set MOODLE_ADMIN_TOKEN in your .env file.",
  );
}

function resolveAppRole(userId: number, username: string, isSiteAdmin?: boolean): AppRole {
  if (isSiteAdmin || username === "admin") return "admin";

  const userIdKey = String(userId);
  if (new Set(env.moodle.parentUserIds).has(userIdKey)) return "parent";
  if (new Set(env.moodle.schoolUserIds).has(userIdKey)) return "school";
  if (new Set(env.moodle.adminUserIds).has(userIdKey)) return "admin";

  return "student";
}

async function moodleGet<T>(path: string) {
  const response = await fetch(path, { method: "GET", headers: { "User-Agent": "Edu/1.0" } });
  if (!response.ok) {
    throw new Error(`Moodle request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

async function moodlePost<T>(token: string, wsfunction: string, params: URLSearchParams) {
  const payload = new URLSearchParams({
    wstoken: token,
    wsfunction,
    moodlewsrestformat: "json",
  });

  params.forEach((value, key) => payload.append(key, value));

  const response = await fetch(`${getBaseUrl()}/webservice/rest/server.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    const detail = errorText.trim().slice(0, 300);
    throw new Error(detail ? `Moodle request failed with status ${response.status}: ${detail}` : `Moodle request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (data?.exception || data?.errorcode) {
    throw new Error(formatMoodleAuthError(data.message || `Moodle error in ${wsfunction}`));
  }

  return data as T;
}

function parseMoodleCookieHeader(headers: Headers) {
  const headersWithCookies = headers as Headers & { getSetCookie?: () => string[] };
  const setCookieHeaders = typeof headersWithCookies.getSetCookie === "function"
    ? headersWithCookies.getSetCookie()
    : [];
  const rawCookies = setCookieHeaders.length > 0 ? setCookieHeaders : [headers.get("set-cookie")].filter((value): value is string => Boolean(value));

  return rawCookies
    .map((cookie) => cookie.split(";")[0]?.trim())
    .filter((cookie): cookie is string => Boolean(cookie))
    .join("; ");
}

function extractMoodleSesskey(html: string) {
  const cfgMatch = html.match(/M\.cfg\s*=\s*\{[\s\S]*?"sesskey"\s*:\s*"([^"]+)"/i);
  if (cfgMatch?.[1]) {
    return cfgMatch[1];
  }

  const patterns = [
    /<input\b[^>]*name=["']sesskey["'][^>]*value=["']([^"']+)["'][^>]*>/i,
    /<input\b[^>]*value=["']([^"']+)["'][^>]*name=["']sesskey["'][^>]*>/i,
    /name=["']sesskey["'][^>]*value=["']([^"']+)["']/i,
    /value=["']([^"']+)["'][^>]*name=["']sesskey["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  if (!html.toLowerCase().includes("sesskey")) {
    throw new Error("Moodle signup page did not expose a sesskey");
  }

  throw new Error(`Moodle signup page sesskey could not be parsed: ${html.slice(0, 300).replace(/\s+/g, " ")}`);
}

async function fetchMoodleWithCookies(url: string, init: RequestInit, initialCookies = "") {
  let currentUrl = url;
  let cookieHeader = initialCookies;

  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    const response = await fetch(currentUrl, {
      ...init,
      redirect: "manual",
      headers: {
        ...(init.headers || {}),
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    });

    const responseCookies = parseMoodleCookieHeader(response.headers);
    if (responseCookies) {
      cookieHeader = cookieHeader ? `${cookieHeader}; ${responseCookies}` : responseCookies;
    }

    const location = response.headers.get("location");
    if (response.status >= 300 && response.status < 400 && location) {
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    return { response, cookieHeader };
  }

  throw new Error(`Moodle redirected too many times while requesting ${url}`);
}

async function submitMoodleSignupForm(input: {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  country?: string;
}) {
  const signupUrl = `${getBaseUrl()}/login/signup.php`;
  const getResult = await fetchMoodleWithCookies(signupUrl, {
    method: "GET",
    headers: {
      "User-Agent": "Edu/1.0",
    },
  });
  const getResponse = getResult.response;

  if (!getResponse.ok) {
    const errorText = await getResponse.text().catch(() => "");
    const detail = errorText.trim().slice(0, 300);
    throw new Error(detail ? `Moodle signup page failed with status ${getResponse.status}: ${detail}` : `Moodle signup page failed with status ${getResponse.status}`);
  }

  const html = await getResponse.text();
  const sesskey = extractMoodleSesskey(html);
  const cookieHeader = getResult.cookieHeader;
  const body = new URLSearchParams({
    sesskey,
    _qf__login_signup_form: "1",
    username: input.username,
    password: input.password,
    email: input.email,
    email2: input.email,
    firstname: input.firstname,
    lastname: input.lastname,
    city: "",
    country: input.country || "",
    submitbutton: "Create my new account",
  });

  const postResult = await fetchMoodleWithCookies(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      Origin: new URL(getBaseUrl()).origin,
      Referer: signupUrl,
      "User-Agent": "Edu/1.0",
    },
    body: body.toString(),
  }, cookieHeader);
  const postResponse = postResult.response;

  const responseText = await postResponse.text().catch(() => "");
  if (!postResponse.ok) {
    const detail = responseText.trim().slice(0, 300);
    throw new Error(detail ? `Moodle signup failed with status ${postResponse.status}: ${detail}` : `Moodle signup failed with status ${postResponse.status}`);
  }

  return responseText;
}

async function moodleUserExists(username: string) {
  const normalizedUsername = username.trim().toLowerCase();
  const candidateTokens: string[] = [];
  try {
    candidateTokens.push(getAdminToken());
  } catch {
    // Ignore missing admin token and try public token fallback.
  }
  if (env.moodle.token) {
    candidateTokens.push(env.moodle.token);
  }

  for (const token of candidateTokens) {
    try {
      const users = await moodlePost<MoodleUserRecord[]>(
        token,
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "username",
          "values[0]": normalizedUsername,
        }),
      );
      if (Array.isArray(users) && users.length > 0) {
        return true;
      }
    } catch {
      // Continue fallback chain.
    }
  }

  return false;
}

export async function confirmMoodleUserAccount(userId: number, username?: string) {
  try {
    await moodlePostWithTokenFallback(
      "core_user_update_users",
      new URLSearchParams({
        "users[0][id]": String(userId),
        "users[0][auth]": "manual",
        "users[0][suspended]": "0",
      }),
    );
    console.log(`[Moodle] Updated user ${userId} auth=manual, suspended=0`);
  } catch (err) {
    console.warn(`[Moodle] Update auth=manual for user ${userId} failed:`, err instanceof Error ? err.message : String(err));
  }

  if (username) {
    try {
      const res = await moodlePostWithTokenFallback(
        "core_auth_confirm_user",
        new URLSearchParams({
          username: username,
          secret: "",
        }),
      );
      console.log(`[Moodle] core_auth_confirm_user for ${username} result:`, res);
    } catch (err) {
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err).toLowerCase();
      if (
        msg.includes("invalid confirmation data")
        || msg.includes("already confirmed")
        || msg.includes("secret")
        || msg.includes("invalid parameter")
      ) {
        console.log(`[Moodle] User ${username} (ID: ${userId}) confirmation token already resolved or bypassed. Moving on.`);
      } else {
        console.warn(`[Moodle] core_auth_confirm_user notice for ${username}:`, err instanceof Error ? err.message : String(err));
      }
    }
  }
}

export async function ensureMoodleStudentByEmail(input: {
  email: string;
  fullName?: string;
}) {
  const email = input.email.trim().toLowerCase();
  if (!email) {
    throw new Error("Email is required");
  }

  const lookupByEmail = async () => {
    try {
      const byField = await moodlePostWithTokenFallback<MoodleUserRecord[]>(
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "email",
          "values[0]": email,
        }),
      );
      if (Array.isArray(byField) && byField.length > 0) {
        return byField[0];
      }
    } catch {
      // Fall through to criteria search.
    }

    try {
      const byCriteria = await moodlePostWithTokenFallback<MoodleUsersResponse>(
        "core_user_get_users",
        new URLSearchParams({
          "criteria[0][key]": "email",
          "criteria[0][value]": email,
        }),
      );
      if (Array.isArray(byCriteria?.users) && byCriteria.users.length > 0) {
        return byCriteria.users[0];
      }
    } catch {
      // Ignore and return undefined.
    }

    return undefined;
  };

  const lookupByEmailWithRetry = async () => {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const foundUser = await lookupByEmail();
      if (foundUser?.id && foundUser?.username) {
        return foundUser;
      }
      if (attempt < 5) {
        await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
      }
    }
    return undefined;
  };



  const existingByEmail = await lookupByEmail();

  const found = existingByEmail;
  if (found?.id && found?.username) {
    // Ensure account is confirmed in Moodle so "Confirmation pending" status is cleared
    await confirmMoodleUserAccount(found.id, found.username);

    await syncUserFromMoodleSession({
      moodleUserId: found.id,
      username: found.username,
      role: "student",
      email,
      firstName: found.firstname || null,
      lastName: found.lastname || null,
      profileImage: found.profileimageurl || found.profileimageurlsmall || null,
      allowAutoCreate: true,
    });
    return { moodleUserId: found.id, username: found.username, wasCreated: false };
  }

  const displayName = input.fullName?.trim() || "Student User";
  const { firstName, lastName } = splitDisplayName(displayName);
  let username = sanitizeUsernameFromEmail(email);
  let attempts = 0;
  let created: MoodleCreateUserRow | undefined;
  let createdPassword = "";



  while (attempts < 5 && !created?.id) {
    const suffix = attempts === 0 ? "" : `${Date.now()}${attempts}`;
    const candidate = `${username}${suffix}`.slice(0, 32);
    const randomPassword = `Edu!${Math.random().toString(36).slice(-10)}A1`;
    try {
      const createdRows = await moodlePostWithTokenFallback<MoodleCreateUserRow[]>(
        "core_user_create_users",
        new URLSearchParams({
          "users[0][username]": candidate,
          "users[0][password]": randomPassword,
          "users[0][firstname]": firstName,
          "users[0][lastname]": lastName,
          "users[0][email]": email,
          "users[0][auth]": "manual",
          "users[0][createpassword]": "1",
          "users[0][preferences][0][type]": "auth_forcepasswordchange",
          "users[0][preferences][0][value]": "0",
        }),
      );
      created = Array.isArray(createdRows) ? createdRows[0] : undefined;
      if (created?.id && created?.username) {
        createdPassword = randomPassword;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : "";
      // Moodle can create the user but still throw when outbound email is not configured
      // or when a duplicated create payload is retried. In both cases, resolve by email lookup.
      if (
        message.includes("message was not sent")
        || message.includes("email is already taken")
        || message.includes("already exists")
      ) {
        const createdAfterWarning = await lookupByEmailWithRetry();
        if (createdAfterWarning?.id && createdAfterWarning?.username) {
          created = { id: createdAfterWarning.id, username: createdAfterWarning.username };
          createdPassword = randomPassword;
          break;
        }
      }
      if (!message.includes("username")) {
        throw error;
      }
    }
    attempts += 1;
  }

  if (!created?.id || !created.username) {
    const rescuedUser = await lookupByEmailWithRetry();
    if (rescuedUser?.id && rescuedUser?.username) {
      created = { id: rescuedUser.id, username: rescuedUser.username };
    }
  }

  if (!created?.id || !created.username) {
    throw new Error("Could not create Moodle account for student email.");
  }

  // Auto-confirm newly created Moodle user so seat enrollment succeeds seamlessly
  await confirmMoodleUserAccount(created.id, created.username);

  await syncUserFromMoodleSession({
    moodleUserId: created.id,
    username: created.username,
    role: "student",
    email,
    firstName: firstName,
    lastName: lastName,
    profileImage: null,
    allowAutoCreate: true,
  });

  if (createdPassword) {
    await recordProvisionedStudentCredential({
      email,
      password: createdPassword,
      moodleUserId: created.id,
    }).catch((error) => {
      console.warn(
        "[roster] Failed to record created student credentials:",
        error instanceof Error ? error.message : String(error),
      );
    });
  }

  return {
    moodleUserId: created.id,
    username: created.username,
    generatedPassword: createdPassword || undefined,
    wasCreated: true,
  };
}

export async function loginWithMoodle(input: LoginInput): Promise<{ token: string; privateToken: string | null; user: AuthUser }> {
  const params = new URLSearchParams({
    username: input.username.trim(),
    password: input.password,
    service: getServiceName(),
  });

  const data = await moodleGet<MoodleLoginResponse>(`${getBaseUrl()}/login/token.php?${params.toString()}`);
  const token = String(data.token ?? "");
  if (data.error || !token) {
    throw new Error(formatMoodleAuthError(data.error || "Invalid username or password", "login"));
  }

  const user = await fetchCurrentUser(token);
  return {
    token,
    privateToken: data.privatetoken || null,
    user,
  };
}

export async function registerWithMoodle(input: RegisterInput): Promise<RegisterWithMoodleResult> {
  const normalizedUsername = String(input.username ?? "").trim().toLowerCase();
  const normalizedEmail = String(input.email ?? "").trim().toLowerCase();
  const password = String(input.password ?? "");
  const firstName = String(input.firstname ?? "").trim();
  const lastName = String(input.lastname ?? "").trim();
  const moodleCountryIso = countryToMoodleIso(String(input.country ?? ""));

  const skipEmailConfirmation = !env.moodle.signupToken || env.moodle.skipEmailConfirmation;
  console.log("skipEmailConfirmation = ", skipEmailConfirmation);
  if (!skipEmailConfirmation) {
    await rememberPendingRegistrationRole(normalizedUsername, input.role);
    await rememberPendingSignup({
      username: normalizedUsername,
      email: normalizedEmail,
      firstName,
      lastName,
      role: input.role,
    });
  }

  if (!skipEmailConfirmation) {
    let signupSucceeded = false;
    try {
      const signupUrl = `${getBaseUrl()}/login/signup.php`;
      const getResponse = await fetch(signupUrl, {
        method: "GET",
        headers: {
          "User-Agent": "Edu/1.0",
        },
      });

      if (!getResponse.ok) {
        const errorText = await getResponse.text().catch(() => "");
        const detail = errorText.trim().slice(0, 300);
        throw new Error(detail ? `Moodle signup page failed with status ${getResponse.status}: ${detail}` : `Moodle signup page failed with status ${getResponse.status}`);
      }

      const html = await getResponse.text();
      const sesskey = extractMoodleSesskey(html);
      const cookieHeader = parseMoodleCookieHeader(getResponse.headers);
      const postBody = new URLSearchParams({
        sesskey,
        _qf__login_signup_form: "1",
        username: normalizedUsername,
        password,
        email: normalizedEmail,
        email2: normalizedEmail,
        firstname: firstName,
        lastname: lastName,
        city: "",
        submitbutton: "Create my new account",
      });

      if (moodleCountryIso) {
        postBody.set("country", moodleCountryIso);
      }

      const postResponse = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          Origin: new URL(getBaseUrl()).origin,
          Referer: signupUrl,
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
          "User-Agent": "Edu/1.0",
        },
        body: postBody.toString(),
        redirect: "follow",
      });

      const responseText = await postResponse.text().catch(() => "");
      if (!postResponse.ok) {
        const detail = responseText.trim().slice(0, 300);
        throw new Error(detail ? `Moodle signup failed with status ${postResponse.status}: ${detail}` : `Moodle signup failed with status ${postResponse.status}`);
      }

      signupSucceeded = true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
      if (errorMessage.includes("already") || errorMessage.includes("taken")) {
        const userAlreadyCreated = await moodleUserExists(normalizedUsername);
        if (userAlreadyCreated) {
          signupSucceeded = true;
        }
      }

      if (!signupSucceeded) {
        throw error;
      }
    }

    if (!signupSucceeded) {
      const userAlreadyCreated = await moodleUserExists(normalizedUsername);
      if (!userAlreadyCreated) {
        throw new Error("Registration was submitted but Moodle did not confirm success");
      }
    }

    return {
      user: null,
      requiresEmailConfirmation: true,
      message: "Registration submitted. Please check your email and confirm your account before signing in.",
    };
  }

  const createParams = new URLSearchParams({
    "users[0][username]": normalizedUsername,
    "users[0][password]": input.password,
    "users[0][firstname]": input.firstname.trim(),
    "users[0][lastname]": input.lastname.trim(),
    "users[0][email]": normalizedEmail,
    "users[0][auth]": "manual",
    "users[0][preferences][0][type]": "auth_forcepasswordchange",
    "users[0][preferences][0][value]": "0",
  });
  const scholarshipCountry = normalizeScholarshipCountry(input.country);
  const creationCountryIso = scholarshipCountry ? countryToMoodleIso(scholarshipCountry) : undefined;
  if (creationCountryIso) {
    createParams.append("users[0][country]", creationCountryIso);
  }

  const result = await moodlePostWithTokenFallback<MoodleCreateUserRow[]>(
    "core_user_create_users",
    createParams,
  );

  const createdUser = Array.isArray(result) ? result[0] : undefined;
  if (!createdUser?.username) {
    throw new Error("Moodle did not return the created user");
  }

  if (createdUser.id) {
    try {
      await moodlePostWithTokenFallback(
        "core_user_update_users",
        new URLSearchParams({
          "users[0][id]": String(createdUser.id),
          "users[0][forcepasswordchange]": "0",
          "users[0][preferences][0][type]": "auth_forcepasswordchange",
          "users[0][preferences][0][value]": "0",
        }),
      );
    } catch (err) {
      console.warn("[moodle] Could not clear forcepasswordchange:", err instanceof Error ? err.message : err);
    }
  }

  // Small delay to ensure Moodle processes the update before login
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (createdUser.id) {
    // Pre-emptively create the user in the database so the role is preserved
    // and we don't rely on pendingRegistration which we skipped above.
    await prisma.user.upsert({
      where: { moodleUserId: createdUser.id },
      create: {
        moodleUserId: createdUser.id,
        username: normalizedUsername,
        role: input.role,
        email: normalizedEmail,
        firstName: input.firstname.trim() || null,
        lastName: input.lastname.trim() || null,
        lastLoginAt: new Date(),
      },
      update: {
        role: input.role,
      },
    });
  }

  const loginResult = await loginWithMoodle({
    username: createdUser.username,
    password: input.password,
  });

  return {
    user: loginResult.user,
    requiresEmailConfirmation: false,
    message: "Account created successfully. Your dashboard is ready.",
  };
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const data = await moodlePost<MoodleSiteInfo>(
    token,
    "core_webservice_get_site_info",
    new URLSearchParams(),
  );

  if (data.exception || !data.userid || !data.username || !data.fullname) {
    throw new Error(data.message || "Unable to load user profile");
  }

  const candidateTokens: string[] = [];
  try {
    candidateTokens.push(getAdminToken());
  } catch {
    // Continue with session token fallback
  }
  candidateTokens.push(token);

  let details: MoodleUserRecord | null = null;

  for (const currentToken of candidateTokens) {
    if (details?.email) break;

    try {
      const byId = await moodlePost<MoodleUserRecord[]>(
        currentToken,
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "id",
          "values[0]": String(data.userid),
        }),
      );
      const record = Array.isArray(byId) ? byId[0] || null : null;
      if (record) {
        details = record;
        if (record.email) break;
      }
    } catch {
      // Try the next lookup strategy
    }

    try {
      const byUsername = await moodlePost<MoodleUserRecord[]>(
        currentToken,
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "username",
          "values[0]": data.username,
        }),
      );
      const record = Array.isArray(byUsername) ? byUsername[0] || null : null;
      if (record) {
        details = record;
        if (record.email) break;
      }
    } catch {
      // Try the next lookup strategy
    }

    try {
      const byCriteria = await moodlePost<MoodleUsersResponse>(
        currentToken,
        "core_user_get_users",
        new URLSearchParams({
          "criteria[0][key]": "username",
          "criteria[0][value]": data.username,
        }),
      );
      const record = Array.isArray(byCriteria?.users) ? byCriteria.users[0] || null : null;
      if (record) {
        details = record;
        if (record.email) break;
      }
    } catch {
      // Ignore and continue fallback chain
    }
  }

  const extractedEmail = details?.email ||
    (await getPendingSignupByUsername(data.username))?.email ||
    (data.username.includes("@") ? data.username : null);

  const resolvedRole =
    data.userissiteadmin || data.username === "admin" || extractedEmail?.toLowerCase() === "edumeup52@gmail.com"
      ? "admin"
      : (await getStoredRoleByMoodleUserId(data.userid)) || resolveAppRole(data.userid, data.username, data.userissiteadmin);

  const syncedUser = await syncUserFromMoodleSession({
    moodleUserId: data.userid,
    username: data.username,
    role: resolvedRole,
    email: extractedEmail,
    firstName: details?.firstname || data.firstname || null,
    lastName: details?.lastname || data.lastname || null,
    profileImage: details?.profileimageurl || details?.profileimageurlsmall || data.userpictureurl || null,
  });

  await markPendingSignupConfirmed({
    username: data.username,
    moodleUserId: data.userid,
  });

  return {
    id: data.userid,
    username: data.username,
    fullname: details?.fullname || data.fullname,
    firstname: details?.firstname || data.firstname || null,
    lastname: details?.lastname || data.lastname || null,
    email: details?.email || syncedUser.email || (data.username.includes("@") ? data.username : null),
    role: syncedUser.role,
    profileImageUrl: details?.profileimageurl || details?.profileimageurlsmall || data.userpictureurl || null,
    city: details?.city || null,
    country: details?.country || null,
    phone: details?.phone1 || null,
    description: details?.description || null,
  };
}

export async function updateMoodleProfile(userId: number, input: {
  firstname: string;
  lastname: string;
  email: string;
  city?: string;
  country?: string;
  phone?: string;
  description?: string;
}, sessionToken?: string) {
  const params = new URLSearchParams({
    "users[0][id]": String(userId),
    "users[0][firstname]": input.firstname,
    "users[0][lastname]": input.lastname,
    "users[0][email]": input.email,
  });

  if (input.city) params.append("users[0][city]", input.city);
  if (input.country) params.append("users[0][country]", input.country);
  if (input.phone) params.append("users[0][phone1]", input.phone);
  if (input.description) params.append("users[0][description]", input.description);

  try {
    await moodlePost(getAdminToken(), "core_user_update_users", params);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!sessionToken || !message.toLowerCase().includes("invalid token")) {
      throw error;
    }
    await moodlePost(sessionToken, "core_user_update_users", params);
  }
  return true;
}

export async function setMoodleUserCustomField(userId: number, fieldName: string, value: string, sessionToken?: string) {
  const params = new URLSearchParams({
    "users[0][id]": String(userId),
    "users[0][customfields][0][type]": fieldName,
    "users[0][customfields][0][value]": value,
  });

  try {
    await moodlePost(getAdminToken(), "core_user_update_users", params);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!sessionToken || !message.toLowerCase().includes("invalid token")) {
      throw error;
    }
    await moodlePost(sessionToken, "core_user_update_users", params);
  }

  return true;
}

export async function changeMoodlePassword(input: {
  username: string;
  userId: number;
  currentPassword: string;
  newPassword: string;
}) {
  const verifyParams = new URLSearchParams({
    username: input.username,
    password: input.currentPassword,
    service: getServiceName(),
  });

  const verify = await moodleGet<MoodleLoginResponse>(`${getBaseUrl()}/login/token.php?${verifyParams.toString()}`);
  if (verify.error || !verify.token) {
    throw new Error("Current password is incorrect");
  }

  await moodlePost(
    getAdminToken(),
    "core_user_update_users",
    new URLSearchParams({
      "users[0][id]": String(input.userId),
      "users[0][password]": input.newPassword,
    }),
  );

  return { success: true };
}
