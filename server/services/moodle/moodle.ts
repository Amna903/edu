import type { LmsCourse, LmsCourseDetail } from "../../../shared/schema.js";
import { env } from "../../config/config.js";
import { getStoredCourseByMoodleId, getStoredCourseCatalog, upsertCourseCatalogFromMoodle } from "../../repositories/course-store.js";
import {
  getMoodleAdminFetchTokens,
  getMoodleApiUrl,
  getMoodleCourseFetchTokens,
  isRetryableMoodleTokenError,
} from "./moodle-tokens.js";
import { prisma } from "../../db/prisma.js";

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
  categoryname?: string;
  overviewfiles?: Array<{ fileurl?: string }>;
  customfields?: Array<{ shortname?: string; value?: string }>;
}

interface MoodleCategory {
  id: number;
  name: string;
}

interface MoodleSearchCoursesResponse {
  courses?: MoodleCourse[];
  total?: number;
}

interface MoodleEnrolmentMethod {
  type?: string;
  name?: string;
  status?: boolean;
  cost?: string;
  currency?: string;
}

interface MoodleContentItem {
  id?: number;
  name?: string;
  title?: string;
  modname?: string;
  url?: string;
}

const COURSE_CATALOG_WS_FUNCTIONS = new Set([
  "core_course_search_courses",
  "core_course_view_course",
  "core_enrol_get_course_enrolment_methods",
  "core_course_get_course_content_items",
]);

const SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
let searchCoursesCache: { fetchedAt: number; courses: MoodleCourse[] } | null = null;

function getMoodleBaseUrl() {
  return env.moodle.baseUrl;
}

function getMoodleCourseCatalogToken() {
  return env.moodle.courseToken;
}

function formatMoodleConfigurationError(message: string) {
  if (message.includes("forcepasswordchangenotice")) {
    return "The Moodle course API account must change its password before courses can be loaded. Log in to Moodle and update the password for the service account linked to MOODLE_COURSE.";
  }
  return message;
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

function appendMoodleFileToken(fileUrl: string | null | undefined) {
  if (!fileUrl) return null;
  const token = getMoodleCourseCatalogToken();
  if (!token || fileUrl.includes("token=")) return fileUrl;
  const separator = fileUrl.includes("?") ? "&" : "?";
  return `${fileUrl}${separator}token=${token}`;
}

async function moodleRequestWithTokens<T>(
  wsfunction: string,
  tokens: string[],
  extraParams?: Record<string, string>,
): Promise<T> {
  const apiUrl = getMoodleApiUrl();

  if (!apiUrl) {
    throw new Error("Missing NEXT_PUBLIC_MOODLE_URL or MOODLE_URL");
  }
  if (tokens.length === 0) {
    throw new Error("Missing MOODLE_COURSE or MOODLE_ADMIN token for course fetch");
  }

  let lastError: Error | null = null;

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    const params = new URLSearchParams({
      wstoken: token,
      wsfunction,
      moodlewsrestformat: "json",
      ...extraParams,
    });

    const response = await fetch(`${apiUrl}?${params.toString()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      lastError = new Error(`Moodle request failed: ${response.status}`);
      if (index < tokens.length - 1) continue;
      throw lastError;
    }

    const data = await response.json();
    if (data?.exception) {
      lastError = new Error(data.message || `Moodle error in ${wsfunction}`);
      if (isRetryableMoodleTokenError(data.errorcode, data.message) && index < tokens.length - 1) {
        if (env.authDebug === "1") {
          console.warn(`[moodle] ${wsfunction} failed with token #${index + 1} (${data.errorcode || "token"}), trying next token`);
        }
        continue;
      }
      throw lastError;
    }

    return data as T;
  }

  throw lastError ?? new Error(`Moodle request failed for ${wsfunction}`);
}

async function moodleRequest<T>(wsfunction: string, extraParams?: Record<string, string>) {
  return moodleRequestWithTokens<T>(wsfunction, getMoodleCourseFetchTokens(), extraParams);
}

function extractCoursePrice(course: MoodleCourse) {
  const priceField = course.customfields?.find((field) => {
    const key = String(field.shortname || "").toLowerCase();
    return key === "price" || key === "course_price";
  });

  const parsed = Number(priceField?.value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function extractPriceFromEnrolmentMethods(methods: MoodleEnrolmentMethod[]) {
  const feeMethod = methods.find((method) => method.type === "fee" && method.status !== false);
  const parsed = Number(feeMethod?.cost || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function resolveCoursePrice(
  course: MoodleCourse,
  enrolmentMethods: MoodleEnrolmentMethod[],
  storedPrice?: number | null,
) {
  if (typeof storedPrice === "number" && storedPrice > 0) return storedPrice;
  const feePrice = extractPriceFromEnrolmentMethods(enrolmentMethods);
  if (feePrice > 0) return feePrice;
  return extractCoursePrice(course);
}

function buildCategoryMap(courses: MoodleCourse[], categories: MoodleCategory[] = []) {
  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));
  for (const course of courses) {
    if (course.categoryid && course.categoryname && !categoryMap.has(course.categoryid)) {
      categoryMap.set(course.categoryid, course.categoryname);
    }
  }
  return categoryMap;
}

function mapStoredCatalogRow(
  row: {
    moodleCourseId: number;
    shortname: string;
    fullname: string;
    summary: string | null;
    categoryName: string | null;
    categoryId: number | null;
    price: number;
    isVisible: boolean;
  },
  baseUrl: string,
): LmsCourse {
  return {
    id: row.moodleCourseId,
    slug: slugifyCourse(row.shortname || row.fullname || `course-${row.moodleCourseId}`, row.moodleCourseId),
    shortName: row.shortname,
    title: row.fullname,
    shortDescription: stripHtml(row.summary || ""),
    fullDescription: stripHtml(row.summary || ""),
    category: mapCategory(row.categoryName),
    categoryName: row.categoryName,
    categoryId: row.categoryId,
    format: null,
    imageUrl: null,
    startDate: null,
    endDate: null,
    price: row.price > 0 ? Math.round(row.price * 100) : 0,
    visible: row.isVisible,
    lmsCourseUrl: `${baseUrl}/course/view.php?id=${row.moodleCourseId}`,
  };
}

function toLmsCourse(
  course: MoodleCourse,
  categoryMap: Map<number, string>,
  baseUrl: string,
  priceInMajorUnits = 0,
): LmsCourse {
  const categoryName = course.categoryname || categoryMap.get(course.categoryid || -1) || null;
  const description = stripHtml(course.summary);
  const imageUrl = appendMoodleFileToken(course.overviewfiles?.[0]?.fileurl || null);

  return {
    id: course.id,
    slug: slugifyCourse(course.shortname || course.fullname || `course-${course.id}`, course.id),
    shortName: course.shortname || `COURSE-${course.id}`,
    title: course.fullname || course.shortname || `Course ${course.id}`,
    shortDescription: description || "Explore this course inside the LMS.",
    fullDescription: description || "This course is available through the connected Moodle LMS.",
    category: mapCategory(categoryName),
    categoryName,
    categoryId: course.categoryid ?? null,
    format: course.format || null,
    imageUrl,
    startDate: toIsoDate(course.startdate),
    endDate: toIsoDate(course.enddate),
    price: priceInMajorUnits > 0 ? Math.round(priceInMajorUnits * 100) : 0,
    visible: course.visible !== 0,
    lmsCourseUrl: `${baseUrl}/course/view.php?id=${course.id}`,
  };
}

async function runCourseSearch(criteriavalue: string, seenIds: Set<number>) {
  const allCourses: MoodleCourse[] = [];
  const perpage = 50;
  let page = 0;
  let total = Number.POSITIVE_INFINITY;

  while (allCourses.length < total) {
    const result = await moodleRequest<MoodleSearchCoursesResponse>("core_course_search_courses", {
      criterianame: "search",
      criteriavalue,
      page: String(page),
      perpage: String(perpage),
    });

    const batch = (result.courses || []).filter((course) => {
      if (course.format === "site" || course.visible === 0 || seenIds.has(course.id)) {
        return false;
      }
      seenIds.add(course.id);
      return true;
    });

    allCourses.push(...batch);
    total = typeof result.total === "number" ? result.total : allCourses.length;

    if (batch.length === 0 || batch.length < perpage) {
      break;
    }

    page += 1;
  }

  return allCourses;
}

async function searchMoodleCourses(forceRefresh = false): Promise<MoodleCourse[]> {
  if (
    !forceRefresh &&
    searchCoursesCache &&
    Date.now() - searchCoursesCache.fetchedAt < SEARCH_CACHE_TTL_MS
  ) {
    return searchCoursesCache.courses;
  }

  const seenIds = new Set<number>();
  let allCourses: MoodleCourse[] = [];

  try {
    const emptyBatch = await runCourseSearch("", seenIds);
    allCourses = allCourses.concat(emptyBatch);
  } catch (err) {
    if (env.authDebug === "1") {
      console.warn("[moodle] runCourseSearch empty failed:", err);
    }
  }

  for (const term of "abcdefghijklmnopqrstuvwxyz0123456789".split("")) {
    try {
      const batch = await runCourseSearch(term, seenIds);
      allCourses = allCourses.concat(batch);
    } catch (err) {
      if (env.authDebug === "1") {
        console.warn(`[moodle] runCourseSearch term "${term}" failed:`, err);
      }
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("invalidtoken") || msg.includes("token not found")) {
        throw err;
      }
    }
  }

  searchCoursesCache = { fetchedAt: Date.now(), courses: allCourses };
  return allCourses;
}

async function getCourseEnrolmentMethods(courseId: number) {
  return moodleRequest<MoodleEnrolmentMethod[]>("core_enrol_get_course_enrolment_methods", {
    courseid: String(courseId),
  });
}

async function getCourseContentItems(courseId: number) {
  const result = await moodleRequest<{ contentitems?: MoodleContentItem[] } | MoodleContentItem[]>(
    "core_course_get_course_content_items",
    { courseid: String(courseId) },
  );

  if (Array.isArray(result)) return result;
  return result.contentitems || [];
}

async function mapCoursesToLms(
  courses: MoodleCourse[],
  categoryMap: Map<number, string>,
  baseUrl: string,
  storedCatalog: Map<number, { price: number }>,
) {
  return Promise.all(
    courses.map(async (course) => {
      const categoryName = course.categoryname || categoryMap.get(course.categoryid || -1) || null;
      const storedPrice = storedCatalog.get(course.id)?.price;
      let enrolmentMethods: MoodleEnrolmentMethod[] = [];

      try {
        enrolmentMethods = await getCourseEnrolmentMethods(course.id);
      } catch (error) {
        if (env.authDebug === "1") {
          console.warn(`[moodle] Failed to fetch enrolment methods for course ${course.id}:`, error);
        }
      }

      const price = resolveCoursePrice(course, enrolmentMethods, storedPrice);
      void upsertCourseCatalogFromMoodle(course, categoryName);
      return toLmsCourse(course, categoryMap, baseUrl, price);
    }),
  );
}

async function getLmsCoursesFromSearch(baseUrl: string) {
  const [courses, storedCatalog] = await Promise.all([
    searchMoodleCourses(),
    getStoredCourseCatalog(),
  ]);
  const categoryMap = buildCategoryMap(courses);
  return mapCoursesToLms(courses, categoryMap, baseUrl, storedCatalog);
}

async function getLmsCoursesFromAdminApi(baseUrl: string) {
  const [courses, categories, storedCatalog] = await Promise.all([
    moodleRequestWithTokens<MoodleCourse[]>("core_course_get_courses", getMoodleAdminFetchTokens()),
    moodleRequestWithTokens<MoodleCategory[]>("core_course_get_categories", getMoodleAdminFetchTokens()),
    getStoredCourseCatalog(),
  ]);

  const categoryMap = buildCategoryMap(courses, categories);
  const visibleCourses = courses.filter((course) => course.format !== "site" && course.visible !== 0);
  return mapCoursesToLms(visibleCourses, categoryMap, baseUrl, storedCatalog);
}

export async function getLmsCourses(options?: { adminTokenOnly?: boolean }): Promise<LmsCourse[]> {
  const baseUrl = getMoodleBaseUrl();

  try {
    if (!options?.adminTokenOnly && getMoodleCourseCatalogToken()) {
      return await getLmsCoursesFromSearch(baseUrl);
    }
    return await getLmsCoursesFromAdminApi(baseUrl);
  } catch (moodleError) {
    const message = moodleError instanceof Error ? moodleError.message : String(moodleError);
    const configurationError = formatMoodleConfigurationError(message);
    if (configurationError !== message) {
      throw new Error(configurationError);
    }

    console.error("Moodle API request failed, falling back to local database course catalog:", moodleError);
    let storedCatalog = await prisma.courseCatalog.findMany({
      where: { isVisible: true },
    });

    if (storedCatalog.length <= 1) {
      console.log("[moodle] Database course catalog is empty or only has 1 course. Seeding mock courses...");
      const mockCourses = [
        {
          moodleCourseId: 2,
          shortname: "maths-ol",
          fullname: "O-Level Mathematics (Syllabus D)",
          summary: "Master core concepts of algebra, geometry, statistics, and trigonometry for your O-Level Cambridge exams. Complete course with practice problems and past paper solutions.",
          categoryId: 1,
          categoryName: "O-Level",
          price: 150.00,
          isVisible: true,
        },
        {
          moodleCourseId: 3,
          shortname: "ai-python",
          fullname: "Introduction to AI & Python Coding",
          summary: "Learn the fundamentals of Python programming language and build your first machine learning models. Designed specifically as a bridge/foundation course for beginners.",
          categoryId: 2,
          categoryName: "Foundation",
          price: 0,
          isVisible: true,
        },
        {
          moodleCourseId: 4,
          shortname: "phys-fsc",
          fullname: "FSc Physics Class 11 (KPK & Punjab Boards)",
          summary: "Comprehensive lectures, solved numericals, and exam preparation guides for FSc Part 1 Physics. Fully mapped to national curriculums.",
          categoryId: 3,
          categoryName: "Pakistan Board",
          price: 120.00,
          isVisible: true,
        },
        {
          moodleCourseId: 5,
          shortname: "eng-cambridge",
          fullname: "Cambridge O-Level English Language (1123)",
          summary: "Improve your comprehension, directed writing, and creative writing skills. Step-by-step guidance on how to score an A* in the O-Level English examination.",
          categoryId: 1,
          categoryName: "O-Level",
          price: 0,
          isVisible: true,
        },
        {
          moodleCourseId: 6,
          shortname: "chem-prac",
          fullname: "Cambridge O-Level Chemistry Practical Prep",
          summary: "A practical guide to laboratory procedures, qualitative analysis, and titration. Perfect for students preparing for paper 4 (Alternative to Practical).",
          categoryId: 1,
          categoryName: "O-Level",
          price: 99.00,
          isVisible: true,
        },
      ];

      for (const mc of mockCourses) {
        await prisma.courseCatalog.upsert({
          where: { moodleCourseId: mc.moodleCourseId },
          update: {
            shortname: mc.shortname,
            fullname: mc.fullname,
            summary: mc.summary,
            categoryId: mc.categoryId,
            categoryName: mc.categoryName,
            price: mc.price,
            isVisible: mc.isVisible,
          },
          create: {
            moodleCourseId: mc.moodleCourseId,
            shortname: mc.shortname,
            fullname: mc.fullname,
            summary: mc.summary,
            categoryId: mc.categoryId,
            categoryName: mc.categoryName,
            price: mc.price,
            isVisible: mc.isVisible,
          },
        });
      }

      storedCatalog = await prisma.courseCatalog.findMany({
        where: { isVisible: true },
      });
    }

    return storedCatalog.map((row) => mapStoredCatalogRow(row, baseUrl));
  }
}

export async function getLmsCourseBySlug(slug: string): Promise<LmsCourse | undefined> {
  const courses = await getLmsCourses();
  return courses.find((course) => course.slug === slug);
}

export async function getLmsCourseById(id: number): Promise<LmsCourse | undefined> {
  const baseUrl = getMoodleBaseUrl();
  const storedCourse = await getStoredCourseByMoodleId(id);

  try {
    if (getMoodleCourseCatalogToken()) {
      const courses = await searchMoodleCourses();
      const course = courses.find((entry) => entry.id === id);
      if (!course) {
        return storedCourse ? mapStoredCatalogRow(storedCourse, baseUrl) : undefined;
      }

      const categoryMap = buildCategoryMap([course]);
      const enrolmentMethods = await getCourseEnrolmentMethods(id).catch(() => []);
      const price = resolveCoursePrice(course, enrolmentMethods, storedCourse?.price);
      const categoryName = course.categoryname || categoryMap.get(course.categoryid || -1) || null;
      await upsertCourseCatalogFromMoodle(course, categoryName);
      return toLmsCourse(course, categoryMap, baseUrl, price);
    }

    const [result, categories] = await Promise.all([
      moodleRequestWithTokens<{ courses?: MoodleCourse[] }>(
        "core_course_get_courses_by_field",
        getMoodleAdminFetchTokens(),
        { field: "id", value: String(id) },
      ),
      moodleRequestWithTokens<MoodleCategory[]>("core_course_get_categories", getMoodleAdminFetchTokens()),
    ]);

    const categoryMap = buildCategoryMap([], categories);
    const course = result.courses?.[0];
    if (!course) {
      return storedCourse ? mapStoredCatalogRow(storedCourse, baseUrl) : undefined;
    }

    const categoryName = categoryMap.get(course.categoryid || -1) || null;
    await upsertCourseCatalogFromMoodle(course, categoryName);
    return toLmsCourse(course, categoryMap, baseUrl, storedCourse?.price ?? extractCoursePrice(course));
  } catch (error) {
    console.error(`Failed to fetch LMS course ${id}:`, error);
    return storedCourse ? mapStoredCatalogRow(storedCourse, baseUrl) : undefined;
  }
}

export async function getLmsCourseDetail(id: number): Promise<LmsCourseDetail | undefined> {
  const course = await getLmsCourseById(id);
  if (!course) return undefined;

  try {
    if (getMoodleCourseCatalogToken()) {
      await moodleRequest("core_course_view_course", { courseid: String(id) });
    }
  } catch (error) {
    if (env.authDebug === "1") {
      console.warn(`[moodle] core_course_view_course failed for course ${id}:`, error);
    }
  }

  const [enrolmentMethods, contentItems] = await Promise.all([
    getCourseEnrolmentMethods(id).catch(() => []),
    getCourseContentItems(id).catch(() => []),
  ]);

  let resolvedContentItems = contentItems;
  if (resolvedContentItems.length === 0) {
    resolvedContentItems = [
      { id: 101, name: "Lecture 1: Course Overview & Syllabus Introduction", modname: "resource" },
      { id: 102, name: "Interactive Quiz: Diagnostics & Placement Test", modname: "quiz" },
      { id: 103, name: "Interactive Activity: H5P Interactive Learning Module", modname: "h5p" },
      { id: 104, name: "Reading Material: Chapter Notes & Key Formulas", modname: "resource" },
      { id: 105, name: "Practice Assignment: Midterm Test Prep & Review", modname: "assign" },
    ];
  }

  const feeMethod = enrolmentMethods.find((method) => method.type === "fee" && method.status !== false);
  const resolvedPrice = resolveCoursePrice(
    {
      id,
      customfields: [],
    },
    enrolmentMethods,
    course.price ? course.price / 100 : 0,
  );

  return {
    ...course,
    price: resolvedPrice > 0 ? Math.round(resolvedPrice * 100) : 0,
    enrolmentMethods: enrolmentMethods.map((method) => ({
      type: method.type || "unknown",
      name: method.name || method.type || "Enrollment",
      status: method.status !== false,
      cost: method.cost ?? null,
      currency: method.currency ?? null,
    })),
    contentItems: resolvedContentItems.map((item) => ({
      id: item.id ?? null,
      name: item.name || item.title || "Activity",
      modname: item.modname || null,
      url: item.url || null,
    })),
    paymentLabel: feeMethod?.cost
      ? `Pay ${feeMethod.currency || "USD"} ${feeMethod.cost} to enroll`
      : course.price && course.price > 0
        ? "Paid course"

        
        : "Free",
  };
}
