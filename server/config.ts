import fs from "fs";
import path from "path";

// In a bundled environment, process.cwd() reliably points to the project root
const ROOT_DIR = process.cwd();

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    if (!key || process.env[key] !== undefined) continue;

    let value = line.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

// Locate env files from the project root regardless of build structure
loadEnvFile(path.resolve(ROOT_DIR, ".env"));
loadEnvFile(path.resolve(ROOT_DIR, ".env.local"));

function toInt(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function splitCsv(value: string | undefined) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function firstDefined(...values: Array<string | undefined>) {
  for (const value of values) {
    if (value && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: toInt(process.env.PORT, 3001),
  databaseUrl: firstDefined(
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.NEON_DATABASE_URL,
  ),
  databaseUrlDirect: firstDefined(
    process.env.DIRECT_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.NEON_DATABASE_URL_UNPOOLED,
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.NEON_DATABASE_URL,
  ),
  sessionSecret: process.env.SESSION_SECRET || "edu-dev-session-secret",

  debug: process.env.DEBUG || "",
  debugMiddleware: process.env.DEBUG_MIDDLEWARE || "",
  authDebug: process.env.AUTH_DEBUG || "",

  moodle: {
    baseUrl: (process.env.NEXT_PUBLIC_MOODLE_URL || "").replace(/\/+$/, ""),
    publicService: process.env.NEXT_PUBLIC_MOODLE_SERVICE || "moodle_mobile_app",
    serviceName: process.env.MOODLE_SERVICE_NAME || process.env.NEXT_PUBLIC_MOODLE_SERVICE || "moodle_mobile_app",
    token: process.env.MOODLE_TOKEN || "",
    adminToken: process.env.MOODLE_ADMIN_TOKEN || "",
    adminManageToken: process.env.MOODLE_ADMIN_MANAGE || "",
    adminUpdateToken: process.env.MOODLE_ADMIN_UPDATE || "",
    signupToken: process.env.MOODLE_SIGNUP_TOKEN || "",
    roleAdminId: process.env.MOODLE_ROLE_ADMIN_ID || "",
    roleParentId: process.env.MOODLE_ROLE_PARENT_ID || "",
    roleSchoolId: process.env.MOODLE_ROLE_SCHOOL_ID || "",
    roleStudentId: process.env.MOODLE_ROLE_STUDENT_ID || "",
    systemContextId: process.env.MOODLE_SYSTEM_CONTEXT_ID || "",
    syncCronSecret: process.env.MOODLE_SYNC_CRON_SECRET || "",
    syncCourseCatalogMinutes: toInt(process.env.MOODLE_SYNC_COURSE_CATALOG_MINUTES, 60),
    syncEnrollmentsMinutes: toInt(process.env.MOODLE_SYNC_ENROLLMENTS_MINUTES, 30),
    syncUserDirectoryMinutes: toInt(process.env.MOODLE_SYNC_USER_DIRECTORY_MINUTES, 120),
    syncUsersPageSize: toInt(process.env.MOODLE_SYNC_USERS_PAGE_SIZE, 200),
    syncUsersMaxPages: toInt(process.env.MOODLE_SYNC_USERS_MAX_PAGES, 50),
    rateLimitMaxRetries: toInt(process.env.MOODLE_RATE_LIMIT_MAX_RETRIES, 3),
    rateLimitBaseDelayMs: toInt(process.env.MOODLE_RATE_LIMIT_BASE_DELAY_MS, 600),
    rateLimitMaxDelayMs: toInt(process.env.MOODLE_RATE_LIMIT_MAX_DELAY_MS, 8000),
    parentUserIds: splitCsv(process.env.MOODLE_PARENT_USER_IDS),
    schoolUserIds: splitCsv(process.env.MOODLE_SCHOOL_USER_IDS),
    adminUserIds: splitCsv(process.env.MOODLE_ADMIN_USER_IDS),
  },

  safepay: {
    publicKey: process.env.SAFEPAY_PUBLIC_KEY || "",
    baseUrl: process.env.SAFEPAY_BASE_URL || "https://sandbox.api.getsafepay.com",
  },

  app: {
    publicUrl: process.env.NEXT_PUBLIC_URL || "",
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: process.env.AWS_REGION || "",
    s3BucketName: process.env.AWS_S3_BUCKET_NAME || "",
  },

  support: {
    resendApiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.SUPPORT_FROM_EMAIL || "",
  },
} as const;

export function isProduction() {
  return env.nodeEnv === "production";
}

export function logEnvPresence() {
  if (env.authDebug !== "1") return;

  console.log("[env] loaded", {
    envFileChecked: true,
    moodleBaseUrl: Boolean(env.moodle.baseUrl),
    moodleToken: Boolean(env.moodle.token),
    moodleAdminToken: Boolean(env.moodle.adminToken),
    moodleSignupToken: Boolean(env.moodle.signupToken),
    moodleAdminManage: Boolean(env.moodle.adminManageToken),
    databaseUrl: Boolean(env.databaseUrl),
    databaseUrlDirect: Boolean(env.databaseUrlDirect),
    sessionSecret: Boolean(env.sessionSecret),
  });
}