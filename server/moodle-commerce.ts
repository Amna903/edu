import { getMoodleApiUrl, getMoodleCourseFetchTokens, isRetryableMoodleTokenError } from "./moodle-tokens.js";

export async function enrolUserInCourse(userId: number, courseId: number) {
  const apiUrl = getMoodleApiUrl();
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  }

  const tokens = getMoodleCourseFetchTokens();
  if (!tokens.length) {
    throw new Error("MOODLE_COURSE or MOODLE_ADMIN_TOKEN is not configured");
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
      lastError = new Error(data.message || "Moodle enrollment failed");
      if (isRetryableMoodleTokenError(data.errorcode, data.message)) {
        continue;
      }
      throw lastError;
    }

    return { success: true };
  }

  throw lastError ?? new Error("Moodle enrollment failed");
}
