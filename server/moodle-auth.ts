import type { AppRole, AuthUser, LoginInput, RegisterInput } from "../shared/schema.js";
import { env } from "./config.js";
import { getPendingSignupByUsername, getStoredRoleByMoodleUserId, markPendingSignupConfirmed, rememberPendingRegistrationRole, rememberPendingSignup, syncUserFromMoodleSession } from "./user-store.js";

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

function getAdminToken() {
  const token =
    env.moodle.adminUpdateToken ||
    env.moodle.adminManageToken ||
    env.moodle.adminToken ||
    env.moodle.token ||
    env.moodle.signupToken;
  if (!token) {
    throw new Error(
      "MOODLE_ADMIN_UPDATE, MOODLE_ADMIN_MANAGE, MOODLE_ADMIN_TOKEN, MOODLE_TOKEN, or MOODLE_SIGNUP_TOKEN is not configured",
    );
  }
  return token;
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
    throw new Error(data.message || `Moodle error in ${wsfunction}`);
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
    throw new Error(data.error || "Invalid username or password");
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

  await rememberPendingRegistrationRole(normalizedUsername, input.role);
  await rememberPendingSignup({
    username: normalizedUsername,
    email: normalizedEmail,
    firstName: input.firstname.trim(),
    lastName: input.lastname.trim(),
    role: input.role,
  });

  if (env.moodle.signupToken) {
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

  const result = await moodlePost<MoodleCreateUserRow[]>(
    getAdminToken(),
    "core_user_create_users",
    new URLSearchParams({
      "users[0][username]": normalizedUsername,
      "users[0][password]": input.password,
      "users[0][firstname]": input.firstname.trim(),
      "users[0][lastname]": input.lastname.trim(),
      "users[0][email]": normalizedEmail,
      "users[0][auth]": "manual",
    }),
  );

  const createdUser = Array.isArray(result) ? result[0] : undefined;
  if (!createdUser?.username) {
    throw new Error("Moodle did not return the created user");
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

  const resolvedRole =
    data.userissiteadmin || data.username === "admin"
      ? "admin"
      : (await getStoredRoleByMoodleUserId(data.userid)) || resolveAppRole(data.userid, data.username, data.userissiteadmin);

  const syncedUser = await syncUserFromMoodleSession({
    moodleUserId: data.userid,
    username: data.username,
    role: resolvedRole,
    email:
      details?.email ||
      (await getPendingSignupByUsername(data.username))?.email ||
      (data.username.includes("@") ? data.username : null),
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
