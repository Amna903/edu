import { getMoodleAdminFetchTokens, getMoodleApiUrl, isRetryableMoodleTokenError } from "./moodle-tokens.js";

export async function enrolUserInCourse(userId: number, courseId: number) {
  const apiUrl = getMoodleApiUrl();
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  }

  // Use admin token for school seat assignment enrollment to avoid permission mismatch.
  const tokens = getMoodleAdminFetchTokens();
  if (!tokens.length) {
    throw new Error("MOODLE_ADMIN_TOKEN is not configured");
  }

  let lastError: Error | null = null;

  for (const token of tokens) {
    const payload = new URLSearchParams({
      wstoken: token,
      wsfunction: "enrol_manual_enrol_users",
      moodlewsrestformat: "json",
      "enrolments[0][roleid]": "5",
      "enrolments[0][userid]": String(userId),
      "enrolments[0][courseid]": String(courseId),
    });

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      lastError = new Error(`Enrollment failed with status ${response.status}`);
      continue;
    }

    const data = await response.json();
    if (data?.exception || data?.errorcode) {
      const normalizedMessage = String(data?.message || "").toLowerCase();
      const normalizedErrorCode = String(data?.errorcode || "").toLowerCase();
      if (normalizedMessage.includes("message was not sent")) {
        // Moodle sometimes returns this even when operation succeeded if SMTP is misconfigured.
        return { success: true };
      }
      const alreadyEnrolled =
        normalizedErrorCode.includes("enrol")
        && normalizedErrorCode.includes("exist")
        || normalizedMessage.includes("already enrolled")
        || normalizedMessage.includes("already enroled");
      if (alreadyEnrolled) {
        return { success: true };
      }

      const safeMessage =
        (typeof data?.message === "string" && data.message.trim()) ||
        (typeof data?.errorcode === "string" && `Moodle enrollment failed (${data.errorcode})`) ||
        "Moodle enrollment failed (unknown Moodle error)";
      lastError = new Error(safeMessage);
      if (isRetryableMoodleTokenError(data.errorcode, data.message)) {
        continue;
      }
      throw lastError;
    }

    return { success: true };
  }

  throw lastError ?? new Error("Moodle enrollment failed");
}
