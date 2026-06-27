import { prisma } from "./prisma.js";
import { getStoredUserByMoodleUserId } from "./user-store.js";

interface MoodleCustomField {
  shortname?: string;
  value?: string;
}

interface MoodleCoursePayload {
  id: number;
  fullname?: string;
  shortname?: string;
  summary?: string;
  categoryid?: number;
  visible?: number;
  customfields?: MoodleCustomField[];
}

function extractCoursePrice(customfields?: MoodleCustomField[]) {
  const priceField = customfields?.find((field) => {
    const key = String(field.shortname || "").toLowerCase();
    return key === "price" || key === "course_price";
  });

  const parsed = Number(priceField?.value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function getStoredCourseCatalog() {
  const rows = await prisma.courseCatalog.findMany();
  return new Map(rows.map((row) => [row.moodleCourseId, row]));
}

export async function getStoredCourseByMoodleId(moodleCourseId: number) {
  return prisma.courseCatalog.findUnique({
    where: { moodleCourseId },
  });
}

export async function createCourseEnrollment(moodleUserId: number, moodleCourseId: number) {
  const [user, courseCatalog] = await Promise.all([
    getStoredUserByMoodleUserId(moodleUserId),
    getStoredCourseByMoodleId(moodleCourseId),
  ]);
  if (!user) {
    throw new Error(`User account not found for Moodle user ${moodleUserId}`);
  }
  if (!courseCatalog) {
    throw new Error(`Course catalog entry not found for Moodle course ${moodleCourseId}`);
  }

  return prisma.userCourseEnrollment.upsert({
    where: { userId_courseCatalogId: { userId: user.id, courseCatalogId: courseCatalog.id } },
    update: {},
    create: { userId: user.id, courseCatalogId: courseCatalog.id },
  });
}

export async function getUserCourseEnrollments(moodleUserId: number) {
  const user = await getStoredUserByMoodleUserId(moodleUserId);
  if (!user) {
    return [];
  }

  const rows = await prisma.userCourseEnrollment.findMany({
    where: { userId: user.id },
    include: { courseCatalog: true },
    orderBy: { enrolledAt: "desc" },
  });

  return rows.map((row) => ({
    ...row,
    programId: row.courseCatalog.moodleCourseId,
  }));
}

export async function upsertCourseCatalogFromMoodle(course: MoodleCoursePayload, categoryName?: string | null) {
  const existingCourse = await prisma.courseCatalog.findUnique({
    where: { moodleCourseId: course.id },
  });
  const extractedPrice = extractCoursePrice(course.customfields);
  const price = typeof existingCourse?.price === "number" && existingCourse.price > 0 ? existingCourse.price : extractedPrice;

  return prisma.courseCatalog.upsert({
    where: { moodleCourseId: course.id },
    update: {
      shortname: course.shortname || `COURSE-${course.id}`,
      fullname: course.fullname || course.shortname || `Course ${course.id}`,
      summary: course.summary || null,
      categoryId: course.categoryid || null,
      categoryName: categoryName || null,
      isVisible: course.visible !== 0,
      price,
    },
    create: {
      moodleCourseId: course.id,
      shortname: course.shortname || `COURSE-${course.id}`,
      fullname: course.fullname || course.shortname || `Course ${course.id}`,
      summary: course.summary || null,
      categoryId: course.categoryid || null,
      categoryName: categoryName || null,
      isVisible: course.visible !== 0,
      price,
    },
  });
}
