import type { PrismaClient } from "@prisma/client";

const MAX_INT4 = 2_147_483_647;

export async function allocatePlaceholderStudentId(
  prisma: PrismaClient,
  schoolUserId: number,
  moodleUserId?: number,
) {
  if (moodleUserId && moodleUserId > 0 && moodleUserId <= MAX_INT4) {
    const existing = await prisma.schoolRosterStudents.findFirst({
      where: { schoolUserId, studentId: moodleUserId },
    });
    if (!existing) return moodleUserId;
  }

  for (let attempt = 0; attempt < 25; attempt += 1) {
    const candidate = Math.floor(100_000_000 + Math.random() * 2_000_000_000);
    const existing = await prisma.schoolRosterStudents.findFirst({
      where: { schoolUserId, studentId: candidate },
    });
    if (!existing) return candidate;
  }

  throw new Error("Could not allocate a roster student id. Please try again.");
}
