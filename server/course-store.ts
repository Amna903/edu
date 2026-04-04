import { prisma } from "./prisma.js";

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

export async function upsertCourseCatalogFromMoodle(course: MoodleCoursePayload, categoryName?: string | null) {
  const price = extractCoursePrice(course.customfields);

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
