import type { AppRole, AuthUser, LoginInput, RegisterInput } from "../../../shared/schema.js";
import { countryToMoodleIso, normalizeScholarshipCountry } from "../../../shared/scholarship-concessions.js";
import { env } from "../../config/config.js";
import { getPendingSignupByUsername, getStoredRoleByMoodleUserId, markPendingSignupConfirmed, rememberPendingRegistrationRole, rememberPendingSignup, syncUserFromMoodleSession } from "../../repositories/user-store.js";
import { prisma } from "../../db/prisma.js";

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

function getBaseUrl() {
  const baseUrl = env.moodle.baseUrl;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  return baseUrl;
}

function getServiceName() {
  return env.moodle.publicService || "moodle_mobile_app";
}

function getAdminTokenCandidates() {
  return [
    env.moodle.adminUpdateToken,
    env.moodle.adminManageToken,
    env.moodle.adminToken,
    env.moodle.token,
    env.moodle.signupToken,
  ].filter((token, index, tokens) => Boolean(token) && tokens.indexOf(token) === index) as string[];
}

function getAdminToken() {
  const token = getAdminTokenCandidates()[0];
  if (!token) {
    throw new Error(
      "MOODLE_ADMIN_UPDATE, MOODLE_ADMIN_MANAGE, MOODLE_ADMIN_TOKEN, MOODLE_TOKEN, or MOODLE_SIGNUP_TOKEN is not configured",
    );
  }
  return token;
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
    throw new Error(
      "MOODLE_ADMIN_UPDATE, MOODLE_ADMIN_MANAGE, MOODLE_ADMIN_TOKEN, or MOODLE_TOKEN is not configured",
    );
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

function isFunctionNotAllowedError(error: unknown) {
  const message = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return message.includes("not allowed") || message.includes("accessexception") || message.includes("access control exception");
}

export interface MoodleDirectoryUser {
  id: number;
  username: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  profileimageurl: string | null;
}

function normalizeDirectoryUsers(records: MoodleUserRecord[]): MoodleDirectoryUser[] {
  const byId = new Map<number, MoodleDirectoryUser>();
  for (const record of records) {
    if (!record || typeof record.id !== "number" || !record.username) continue;
    if (record.username === "guest") continue;
    if (byId.has(record.id)) continue;
    byId.set(record.id, {
      id: record.id,
      username: record.username,
      email: record.email || null,
      firstname: record.firstname || null,
      lastname: record.lastname || null,
      profileimageurl: record.profileimageurl || null,
    });
  }
  return Array.from(byId.values());
}

/**
 * Fetches the full Moodle user directory.
 *
 * Tries multiple listing functions in order because Moodle web-service tokens
 * only expose the functions explicitly added to their service definition.
 * Debug logs are printed at each step so you can see exactly which Moodle
 * function succeeded or failed in the server terminal.
 */
export async function fetchAllMoodleUsers(): Promise<MoodleDirectoryUser[]> {
  console.log("[sync-users] ── starting Moodle user directory fetch ──");
  console.log("[sync-users] Moodle base URL:", getBaseUrl() || "(not set — check NEXT_PUBLIC_MOODLE_URL)");

  const tokens = getAdminTokenCandidates();
  console.log("[sync-users] Admin token candidates available:", tokens.length, "(values hidden)");
  if (tokens.length === 0) {
    throw new Error(
      "[sync-users] No Moodle admin token configured. Set MOODLE_ADMIN_TOKEN (or MOODLE_TOKEN) in your .env file.",
    );
  }

  const attempts: Array<{
    label: string;
    wsfunction: string;
    params: URLSearchParams;
    extract: (data: any) => MoodleUserRecord[];
  }> = [
    {
      label: "core_user_get_users (email wildcard %)",
      wsfunction: "core_user_get_users",
      params: new URLSearchParams({
        "criteria[0][key]": "email",
        "criteria[0][value]": "%",
      }),
      extract: (data) => (data?.users ?? []) as MoodleUserRecord[],
    },
    {
      label: "core_user_get_users (auth=manual)",
      wsfunction: "core_user_get_users",
      params: new URLSearchParams({
        "criteria[0][key]": "auth",
        "criteria[0][value]": "manual",
      }),
      extract: (data) => (data?.users ?? []) as MoodleUserRecord[],
    },
    {
      label: "core_user_get_users_by_field (id range 2-500)",
      wsfunction: "core_user_get_users_by_field",
      params: (() => {
        const p = new URLSearchParams({ field: "id" });
        for (let id = 2; id <= 500; id++) p.append(`values[${id - 2}]`, String(id));
        return p;
      })(),
      extract: (data) => (Array.isArray(data) ? data : []) as MoodleUserRecord[],
    },
  ];

  let lastNotAllowedError: Error | null = null;

  for (const attempt of attempts) {
    console.log(`[sync-users] trying: ${attempt.label}`);
    try {
      const data = await moodlePostWithTokenFallback<any>(attempt.wsfunction, attempt.params);

      // Moodle sometimes returns an error object instead of throwing
      if (data && typeof data === "object" && data.exception) {
        console.warn(`[sync-users] Moodle returned exception for "${attempt.label}":`, data.errorcode, "-", data.message);
        const err = new Error(String(data.message));
        if (isFunctionNotAllowedError(err)) {
          lastNotAllowedError = err;
          continue;
        }
        throw err;
      }

      const records = attempt.extract(data);
      console.log(`[sync-users] "${attempt.label}" → raw records returned:`, records.length);

      const users = normalizeDirectoryUsers(records);
      console.log(`[sync-users] "${attempt.label}" → normalized users:`, users.length);

      if (users.length > 0) {
        console.log(`[sync-users] ✓ success via "${attempt.label}" — ${users.length} users ready to upsert`);
        return users;
      }

      console.warn(`[sync-users] "${attempt.label}" returned 0 users — trying next method`);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.warn(`[sync-users] "${attempt.label}" threw:`, err.message);
      if (isFunctionNotAllowedError(err)) {
        lastNotAllowedError = err;
        console.warn(`[sync-users] → function not enabled on this token's service, trying next method`);
        continue;
      }
      console.error(`[sync-users] unexpected error in "${attempt.label}":`, err);
      throw err;
    }
  }

  if (lastNotAllowedError) {
    const msg =
      "Moodle blocked all user-listing functions for this token. " +
      "In Moodle: Site administration → Server → Web services → External services → " +
      "edit the service linked to your admin token → Add functions → add 'core_user_get_users'. " +
      "Then click Sync Users again.";
    console.error("[sync-users] ✗ all attempts blocked:", msg);
    throw new Error(msg);
  }

  console.warn("[sync-users] all methods returned 0 users — nothing to sync");
  return [];
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
    throw new Error(`Moodle request failed with status ${response.status}`);
  }

  const data = await response.json();
  if (data?.exception || data?.errorcode) {
    throw new Error(formatMoodleAuthError(data.message || `Moodle error in ${wsfunction}`));
  }

  return data as T;
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

export async function loginWithMoodle(input: LoginInput): Promise<{ token: string; privateToken: string | null; user: AuthUser }> {
  const params = new URLSearchParams({
    username: input.username.trim(),
    password: input.password,
    service: getServiceName(),
  });

  const data = await moodleGet<MoodleLoginResponse>(`${getBaseUrl()}/login/token.php?${params.toString()}`);
  if (data.error || !data.token) {
    throw new Error(formatMoodleAuthError(data.error || "Invalid username or password", "login"));
  }

  const user = await fetchCurrentUser(data.token);
  return {
    token: data.token,
    privateToken: data.privatetoken || null,
    user,
  };
}

export async function registerWithMoodle(input: RegisterInput): Promise<RegisterWithMoodleResult> {
  const normalizedUsername = input.username.trim().toLowerCase();
  const normalizedEmail = input.email.trim().toLowerCase();

  const skipEmailConfirmation = !env.moodle.signupToken || env.moodle.skipEmailConfirmation;

  if (!skipEmailConfirmation) {
    await rememberPendingRegistrationRole(normalizedUsername, input.role);
    await rememberPendingSignup({
      username: normalizedUsername,
      email: normalizedEmail,
      firstName: input.firstname.trim(),
      lastName: input.lastname.trim(),
      role: input.role,
    });
  }

  if (!skipEmailConfirmation) {
    let signupSucceeded = false;
    try {
      const signupResponse = await moodlePost<MoodleSignupResponse | boolean>(
        env.moodle.signupToken,
        "auth_email_signup_user",
        new URLSearchParams({
          username: normalizedUsername,
          password: input.password,
          firstname: input.firstname.trim(),
          lastname: input.lastname.trim(),
          email: normalizedEmail,
        }),
      );

      signupSucceeded =
        signupResponse === true ||
        (typeof signupResponse === "object" && signupResponse !== null && signupResponse.success === true);

      if (!signupSucceeded) {
        console.log("[moodle] Signup response:", signupResponse);
      }
    } catch (error) {
      const userAlreadyCreated = await moodleUserExists(normalizedUsername);
      if (userAlreadyCreated) {
        signupSucceeded = true;
      } else {
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
  const moodleCountryIso = scholarshipCountry ? countryToMoodleIso(scholarshipCountry) : undefined;
  if (moodleCountryIso) {
    createParams.append("users[0][country]", moodleCountryIso);
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
