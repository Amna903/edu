import { env } from "./config.js";

function getMoodleBaseUrl() {
  const baseUrl = env.moodle.baseUrl;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  return baseUrl;
}

function getCourseToken() {
  const token = env.moodle.courseToken;
  if (!token) throw new Error("MOODLE_COURSE is not configured");
  return token;
}

export async function enrolUserInCourse(userId: number, courseId: number) {
  const payload = new URLSearchParams({
    wstoken: getCourseToken(),
    wsfunction: "enrol_manual_enrol_users",
    moodlewsrestformat: "json",
    "enrolments[0][roleid]": "5",
    "enrolments[0][userid]": String(userId),
    "enrolments[0][courseid]": String(courseId),
  });

  const response = await fetch(`${getMoodleBaseUrl()}/webservice/rest/server.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload.toString(),
  });

  if (!response.ok) {
    throw new Error(`Enrollment failed with status ${response.status}`);
  }

  const data = await response.json();
  if (data?.exception || data?.errorcode) {
    throw new Error(data.message || "Moodle enrollment failed");
  }

  return { success: true };
}
