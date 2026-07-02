import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { getStudentActivityTimelineForDashboard, getStudentGradesForDashboard } from "./moodle/moodle-dashboard.js";

type RiskReasons = {
  lowGrade: boolean;
  inactivityDays: number;
  lowGradeCourses: Array<{ courseId: number; courseName: string; percentage: number }>;
};

type StudentRiskResult = {
  studentId: number;
  isAtRisk: boolean;
  reasons: RiskReasons;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function backoffDelay(attempt: number) {
  const base = env.moodle.rateLimitBaseDelayMs;
  const cap = env.moodle.rateLimitMaxDelayMs;
  return Math.min(base * 2 ** attempt, cap);
}

function isRateLimitedError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  return message.includes("429") || message.includes("rate limit") || message.includes("too many requests");
}

async function withRateLimitRetry<T>(fn: () => Promise<T>): Promise<T> {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (!isRateLimitedError(error) || attempt >= env.moodle.rateLimitMaxRetries) {
        throw error;
      }
      await sleep(backoffDelay(attempt));
      attempt += 1;
    }
  }
}

function calculateRisk(studentId: number, grades: Array<any>, timeline: Array<any>): StudentRiskResult {
  const lowGradeCourses = grades
    .filter((item) => Number(item?.percentage || 0) > 0 && Number(item.percentage) < 50)
    .map((item) => ({
      courseId: Number(item.courseId || 0),
      courseName: String(item.courseName || "Unknown"),
      percentage: Number(item.percentage || 0),
    }));

  const latestActivity = timeline.reduce<number>((latest, entry) => {
    const time = Number(entry?.timeCompleted || 0);
    return time > latest ? time : latest;
  }, 0);
  const inactivityDays = latestActivity > 0
    ? Math.floor((Date.now() - latestActivity * 1000) / (24 * 60 * 60 * 1000))
    : 999;

  const reasons: RiskReasons = {
    lowGrade: lowGradeCourses.length > 0,
    inactivityDays,
    lowGradeCourses,
  };

  return {
    studentId,
    isAtRisk: reasons.lowGrade || inactivityDays > 7,
    reasons,
  };
}

export async function syncSchoolRiskFlags(schoolUserId: number, options?: { chunkSize?: number }) {
  const chunkSize = Math.min(Math.max(options?.chunkSize ?? 25, 1), 50);

  const assignedStudents = await prisma.$queryRawUnsafe<Array<{ student_id: number }>>(
    `SELECT DISTINCT student_id
     FROM school_seat_assignments
     WHERE school_user_id = $1
     ORDER BY student_id ASC`,
    schoolUserId,
  );

  let processedStudents = 0;
  let flagsFound = 0;
  let chunksProcessed = 0;

  for (let i = 0; i < assignedStudents.length; i += chunkSize) {
    const chunk = assignedStudents.slice(i, i + chunkSize);
    if (chunk.length === 0) continue;

    const results = await Promise.all(chunk.map(async (row) => {
      const studentId = Number(row.student_id);
      const [grades, timeline] = await Promise.all([
        withRateLimitRetry(() => getStudentGradesForDashboard(studentId)),
        withRateLimitRetry(() => getStudentActivityTimelineForDashboard("", studentId)),
      ]);
      return calculateRisk(studentId, grades, timeline);
    }));

    await prisma.$transaction(
      results.map((result) => prisma.$executeRawUnsafe(
        `UPDATE school_seat_assignments
         SET is_at_risk = $1,
             risk_reasons = $2::jsonb,
             last_risk_check_at = NOW()
         WHERE school_user_id = $3 AND student_id = $4`,
        result.isAtRisk,
        JSON.stringify(result.reasons),
        schoolUserId,
        result.studentId,
      )),
    );

    processedStudents += results.length;
    flagsFound += results.filter((entry) => entry.isAtRisk).length;
    chunksProcessed += 1;

    const jitterMs = Math.floor(300 + Math.random() * 500);
    await sleep(jitterMs);
  }

  return {
    success: true as const,
    processedStudents,
    flagsFound,
    chunksProcessed,
  };
}
