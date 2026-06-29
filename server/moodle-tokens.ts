import { env } from "./config.js";

function uniqueTokens(tokens: string[]) {
  return tokens.filter(Boolean).filter((token, index, self) => self.indexOf(token) === index);
}

export function getMoodleAdminFetchTokens(): string[] {
  return uniqueTokens([
    env.moodle.adminManageToken,
    env.moodle.adminToken,
    env.moodle.adminUpdateToken,
    env.moodle.token,
  ]);
}

export function getMoodleCourseFetchTokens(): string[] {
  const courseToken = env.moodle.courseToken;
  const adminTokens = getMoodleAdminFetchTokens();
  if (courseToken) {
    return uniqueTokens([courseToken, ...adminTokens]);
  }
  return adminTokens;
}

export function isRetryableMoodleTokenError(errorCode?: string, message?: string) {
  const normalizedCode = (errorCode || "").toLowerCase();
  const normalizedMessage = (message || "").toLowerCase();
  return (
    normalizedCode === "invalidtoken" ||
    normalizedCode === "accessexception" ||
    normalizedMessage.includes("invalid token") ||
    normalizedMessage.includes("token not found")
  );
}

export function getMoodleApiUrl() {
  const directUrl = process.env.MOODLE_URL || "";
  if (directUrl.includes("/webservice/rest/server.php")) {
    return directUrl.split("?")[0];
  }
  const baseUrl = env.moodle.baseUrl;
  return baseUrl ? `${baseUrl}/webservice/rest/server.php` : "";
}
