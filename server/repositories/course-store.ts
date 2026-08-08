import { prisma } from "../db/prisma.js";
import { notifyCourseUpdate } from "../services/notifications.js";
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

function isMissingCourseCatalogTableError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: unknown }).code).toUpperCase()
      : "";

  return code === "P2021" || (message.includes("course_catalog") && message.includes("does not exist"));
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
  try {
    const rows = await prisma.courseCatalog.findMany();
    return new Map(rows.map((row) => [row.moodleCourseId, row]));
  } catch (error) {
    if (isMissingCourseCatalogTableError(error)) {
      return new Map();
    }

    throw error;
  }
}

export async function getStoredCourseByMoodleId(moodleCourseId: number) {
  try {
    return await prisma.courseCatalog.findUnique({
      where: { moodleCourseId },
    });
  } catch (error) {
    if (isMissingCourseCatalogTableError(error)) {
      return null;
    }

    throw error;
  }
}

export async function createCourseEnrollment(moodleUserId: number, moodleCourseId: number) {
  const [existingUser, existingCourseCatalog] = await Promise.all([
    getStoredUserByMoodleUserId(moodleUserId),
    getStoredCourseByMoodleId(moodleCourseId),
  ]);
  const user =
    existingUser ??
    await prisma.user.upsert({
      where: { moodleUserId },
      update: {},
      create: {
        moodleUserId,
        username: `moodle-user-${moodleUserId}`,
        role: "student",
      },
    });
  const courseCatalog =
    existingCourseCatalog ??
    await prisma.courseCatalog.upsert({
      where: { moodleCourseId },
      update: {},
      create: {
        moodleCourseId,
        shortname: `COURSE-${moodleCourseId}`,
        fullname: `Course ${moodleCourseId}`,
        price: 0,
      },
    });

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
  try {
    const existingCourse = await prisma.courseCatalog.findUnique({
      where: { moodleCourseId: course.id },
    });
    const extractedPrice = extractCoursePrice(course.customfields);
    const price = typeof existingCourse?.price === "number" && existingCourse.price > 0 ? existingCourse.price : extractedPrice;

    const nextTitle = course.fullname || course.shortname || `Course ${course.id}`;
    const changed = Boolean(existingCourse && (
      existingCourse.fullname !== nextTitle || existingCourse.summary !== (course.summary || null) || existingCourse.isVisible !== (course.visible !== 0)
    ));
    const saved = await prisma.courseCatalog.upsert({
      where: { moodleCourseId: course.id },
      update: {
        shortname: course.shortname || `COURSE-${course.id}`,
        fullname: nextTitle,
        summary: course.summary || null,
        categoryId: course.categoryid || null,
        categoryName: categoryName || null,
        isVisible: course.visible !== 0,
        price,
      },
      create: {
        moodleCourseId: course.id,
        shortname: course.shortname || `COURSE-${course.id}`,
        fullname: nextTitle,
        summary: course.summary || null,
        categoryId: course.categoryid || null,
        categoryName: categoryName || null,
        isVisible: course.visible !== 0,
        price,
      },
    });
    if (changed) {
      void notifyCourseUpdate({ courseId: saved.id, courseName: saved.fullname, message: `There is an update to ${saved.fullname}. Open your dashboard to review the latest details.` }).catch((error) =>
        console.error("Course update notification failed:", error),
      );
    }
    return saved;
  } catch (error) {
    if (isMissingCourseCatalogTableError(error)) {
      return null;
    }

    throw error;
  }
}
