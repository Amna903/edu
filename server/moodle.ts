import type { LmsCourse } from "../shared/schema.js";
import { env } from "./config.js";
import { getStoredCourseByMoodleId, getStoredCourseCatalog, upsertCourseCatalogFromMoodle } from "./course-store.js";

interface MoodleCourse {
  id: number;
  fullname?: string;
  shortname?: string;
  summary?: string;
  startdate?: number;
  enddate?: number;
  format?: string;
  visible?: number;
  categoryid?: number;
  overviewfiles?: Array<{ fileurl?: string }>;
  customfields?: Array<{ shortname?: string; value?: string }>;
}

interface MoodleCategory {
  id: number;
  name: string;
}

function getMoodleBaseUrl() {
  return env.moodle.baseUrl;
}

function getMoodleToken() {
  // Use adminManageToken instead of manageToken
  return env.moodle.adminManageToken || env.moodle.token || env.moodle.adminToken || "";
}
function stripHtml(value: string | undefined) {
  return (value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toIsoDate(timestamp?: number) {
  if (!timestamp) return null;
  return new Date(timestamp * 1000).toISOString();
}

function slugifyCourse(value: string, id: number) {
  const base = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || `course-${id}`;
}

function mapCategory(categoryName: string | null) {
  const normalized = (categoryName || "").toLowerCase();

  if (
    normalized.includes("pakistan") ||
    normalized.includes("matric") ||
    normalized.includes("fsc") ||
    normalized.includes("ics") ||
    normalized.includes("ecat")
  ) {
    return "pakistan_board";
  }

  if (normalized.includes("foundation") || normalized.includes("bridge")) {
    return "foundation";
  }

  if (
    normalized.includes("o-level") ||
    normalized.includes("olevel") ||
    normalized.includes("cambridge")
  ) {
    return "o_level";
  }

  return "all_courses";
}

async function moodleRequest<T>(wsfunction: string, extraParams?: Record<string, string>) {
  const baseUrl = getMoodleBaseUrl();
  const token = getMoodleToken();

  if (!baseUrl || !token) {
    throw new Error("Missing NEXT_PUBLIC_MOODLE_URL or MOODLE_TOKEN");
  }

  const params = new URLSearchParams({
    wstoken: token,
    wsfunction,
    moodlewsrestformat: "json",
    ...extraParams,
  });

  const response = await fetch(`${baseUrl}/webservice/rest/server.php?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Moodle request failed: ${response.status}`);
  }

  const data = await response.json();
  if (data?.exception) {
    throw new Error(data.message || `Moodle error in ${wsfunction}`);
  }

  return data as T;
}

function extractCoursePrice(course: MoodleCourse) {
  const priceField = course.customfields?.find((field) => {
    const key = String(field.shortname || "").toLowerCase();
    return key === "price" || key === "course_price";
  });

  const parsed = Number(priceField?.value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toLmsCourse(
  course: MoodleCourse,
  categoryMap: Map<number, string>,
  baseUrl: string,
  storedPrice?: number | null,
): LmsCourse {
  const categoryName = categoryMap.get(course.categoryid || -1) || null;
  const description = stripHtml(course.summary);
  const imageUrl = course.overviewfiles?.[0]?.fileurl || null;
  const moodlePrice = extractCoursePrice(course);
  const effectivePrice = typeof storedPrice === "number" && storedPrice > 0 ? storedPrice : moodlePrice;

  return {
    id: course.id,
    slug: slugifyCourse(course.shortname || course.fullname || `course-${course.id}`, course.id),
    shortName: course.shortname || `COURSE-${course.id}`,
    title: course.fullname || course.shortname || `Course ${course.id}`,
    shortDescription: description || "Explore this course inside the LMS.",
    fullDescription: description || "This course is available through the connected Moodle LMS.",
    category: mapCategory(categoryName),
    categoryName,
    format: course.format || null,
    imageUrl,
    startDate: toIsoDate(course.startdate),
    endDate: toIsoDate(course.enddate),
    price: effectivePrice > 0 ? Math.round(effectivePrice * 100) : 0,
    visible: course.visible !== 0,
    lmsCourseUrl: `${baseUrl}/course/view.php?id=${course.id}`,
  };
}

export async function getLmsCourses(): Promise<LmsCourse[]> {
  const baseUrl = getMoodleBaseUrl();
  const [courses, categories] = await Promise.all([
    moodleRequest<MoodleCourse[]>("core_course_get_courses"),
    moodleRequest<MoodleCategory[]>("core_course_get_categories"),
  ]);

  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));
  const storedCatalog = await getStoredCourseCatalog();

  const visibleCourses = courses
    .filter((course) => course.format !== "site" && course.visible !== 0)
    .map((course) => {
      const categoryName = categoryMap.get(course.categoryid || -1) || null;
      void upsertCourseCatalogFromMoodle(course, categoryName);
      return toLmsCourse(course, categoryMap, baseUrl, storedCatalog.get(course.id)?.price);
    });

  return visibleCourses;
}

export async function getLmsCourseBySlug(slug: string): Promise<LmsCourse | undefined> {
  const courses = await getLmsCourses();
  return courses.find((course) => course.slug === slug);
}

export async function getLmsCourseById(id: number): Promise<LmsCourse | undefined> {
  const baseUrl = getMoodleBaseUrl();
  const [result, categories, storedCourse] = await Promise.all([
    moodleRequest<{ courses?: MoodleCourse[] }>("core_course_get_courses_by_field", {
      field: "id",
      value: String(id),
    }),
    moodleRequest<MoodleCategory[]>("core_course_get_categories"),
    getStoredCourseByMoodleId(id),
  ]);

  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));
  const course = result.courses?.[0];
  if (!course) return undefined;

  const categoryName = categoryMap.get(course.categoryid || -1) || null;
  await upsertCourseCatalogFromMoodle(course, categoryName);
  return toLmsCourse(course, categoryMap, baseUrl, storedCourse?.price);
}
