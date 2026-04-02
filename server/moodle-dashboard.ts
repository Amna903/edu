import { env } from "./config";

function getAdminToken() {
  return env.moodle.adminToken || "";
}

function getBaseUrl() {
  const baseUrl = env.moodle.baseUrl;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_MOODLE_URL is not configured");
  return baseUrl;
}

async function moodleWebserviceGetLocal<T>(token: string, wsfunction: string, params: URLSearchParams) {
  const payload = new URLSearchParams({
    wstoken: token,
    wsfunction,
    moodlewsrestformat: "json",
  });
  params.forEach((value, key) => payload.append(key, value));

  const response = await fetch(`${getBaseUrl()}/webservice/rest/server.php?${payload.toString()}`, {
    method: "GET",
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

export async function getUserCoursesForDashboard(token: string, userId: number) {
  const effectiveToken = token || getAdminToken();
  const data = await moodleWebserviceGetLocal<any>(
    effectiveToken,
    "core_enrol_get_users_courses",
    new URLSearchParams({ userid: String(userId) }),
  );
  return Array.isArray(data) ? data : [];
}

export async function getStudentGradesForDashboard(userId: number) {
  const adminToken = getAdminToken();
  if (!adminToken) return [];
  const courses = await getUserCoursesForDashboard(adminToken, userId);

  const grades = await Promise.all(
    courses.map(async (course: any) => {
      try {
        const gradeData = await moodleWebserviceGetLocal<any>(
          adminToken,
          "gradereport_user_get_grade_items",
          new URLSearchParams({
            courseid: String(course.id),
            userid: String(userId),
          }),
        );
        const finalGradeItem = gradeData?.usergrades?.[0]?.gradeitems?.find((item: any) => item.itemtype === "course");
        const rawPercentage = finalGradeItem?.percentageformatted || "";
        const cleanPercentage = parseFloat(String(rawPercentage).replace(/[^\d.]/g, ""));
        return {
          courseId: course.id,
          courseName: course.fullname,
          grade: finalGradeItem?.gradeformatted && finalGradeItem.gradeformatted !== "-" ? finalGradeItem.gradeformatted : "N/A",
          percentage: Number.isNaN(cleanPercentage) ? 0 : cleanPercentage,
          progress: course.progress || 0,
        };
      } catch {
        return {
          courseId: course.id,
          courseName: course.fullname,
          grade: "N/A",
          percentage: 0,
          progress: course.progress || 0,
        };
      }
    }),
  );

  return grades;
}

export async function getStudentActivityTimelineForDashboard(token: string, userId: number) {
  const effectiveToken = token || getAdminToken();
  const courses = await getUserCoursesForDashboard(effectiveToken, userId);
  const timeline: Array<{ id: number; courseName: string; moduleName: string; timeCompleted: number }> = [];

  await Promise.all(
    courses.map(async (course: any) => {
      try {
        const [statusData, contentsData] = await Promise.all([
          moodleWebserviceGetLocal<any>(
            effectiveToken,
            "core_completion_get_activities_completion_status",
            new URLSearchParams({ courseid: String(course.id), userid: String(userId) }),
          ),
          moodleWebserviceGetLocal<any>(
            effectiveToken,
            "core_course_get_contents",
            new URLSearchParams({ courseid: String(course.id) }),
          ),
        ]);

        const moduleNameMap: Record<number, string> = {};
        if (Array.isArray(contentsData)) {
          contentsData.forEach((section: any) => {
            (section.modules || []).forEach((mod: any) => {
              moduleNameMap[mod.id] = mod.name;
            });
          });
        }

        (statusData?.statuses || []).forEach((status: any) => {
          if (status.state > 0) {
            timeline.push({
              id: status.cmid,
              courseName: course.fullname,
              moduleName: moduleNameMap[status.cmid] || status.modname || "Lesson Module",
              timeCompleted: status.timecompleted > 0 ? status.timecompleted : Math.floor(Date.now() / 1000),
            });
          }
        });
      } catch {
        return;
      }
    }),
  );

  return timeline.sort((a, b) => b.timeCompleted - a.timeCompleted).slice(0, 5);
}

export async function getStudentCertificatesForDashboard(token: string, userId: number) {
  const effectiveToken = token || getAdminToken();
  const courses = await getUserCoursesForDashboard(effectiveToken, userId);
  const certificates: Array<{
    id: number;
    courseId: number;
    courseName: string;
    name: string;
    url: string;
    timeCreated: number;
  }> = [];

  await Promise.all(
    courses.map(async (course: any) => {
      try {
        const badgeData = await moodleWebserviceGetLocal<any>(
          effectiveToken,
          "core_badges_get_user_badges",
          new URLSearchParams({
            userid: String(userId),
            courseid: String(course.id),
          }),
        );

        (badgeData?.badges || []).forEach((badge: any) => {
          certificates.push({
            id: badge.id,
            courseId: course.id,
            courseName: course.fullname,
            name: badge.name || `${course.fullname} Certificate`,
            url: badge.badgeurl || `${getBaseUrl()}/badges/mybadges.php`,
            timeCreated: badge.dateissued || Math.floor(Date.now() / 1000),
          });
        });
      } catch {
        return;
      }
    }),
  );

  return certificates.sort((a, b) => b.timeCreated - a.timeCreated);
}
