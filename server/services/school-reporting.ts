import { prisma } from "../db/prisma.js";

type CourseSeatSummary = {
  courseName: string;
  assignedSeats: number;
  totalSeats: number;
};

export type SchoolDashboardStatsPayload = {
  generatedAt: string;
  seatUtilizationPercent: number;
  assignedSeats: number;
  purchasedSeats: number;
  atRiskFlags: number;
  lastRiskSyncAt: string | null;
  riskStudentsChecked: number;
  atRiskStudents: Array<{
    studentId: number;
    studentName: string;
    studentEmail: string;
    inactivityDays: number;
    lowGrade: boolean;
  }>;
  classPdfCount: number;
  teacherCpdLabel: string;
  courseSeatSummary: CourseSeatSummary[];
};

let ensuredReportingTables = false;

export async function ensureSchoolReportingTables() {
  if (ensuredReportingTables) return;

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS school_monthly_snapshots (
      id TEXT PRIMARY KEY,
      school_user_id INTEGER NOT NULL,
      snapshot_month VARCHAR(7) NOT NULL,
      snapshot_data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (school_user_id, snapshot_month)
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS school_form_submissions (
      id TEXT PRIMARY KEY,
      school_user_id INTEGER NOT NULL,
      teacher_user_id INTEGER,
      report_month VARCHAR(7) NOT NULL,
      status VARCHAR(16) NOT NULL,
      payload JSONB NOT NULL,
      reviewed_by_user_id INTEGER,
      review_notes TEXT,
      reviewed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS school_report_activity_logs (
      id TEXT PRIMARY KEY,
      school_user_id INTEGER NOT NULL,
      actor_user_id INTEGER NOT NULL,
      action VARCHAR(64) NOT NULL,
      details JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  ensuredReportingTables = true;
}

export async function buildSchoolDashboardStats(schoolUserId: number): Promise<SchoolDashboardStatsPayload> {
  const licenses = await prisma.schoolLicenses.findMany({
    where: { schoolUserId },
    select: { id: true, courseName: true, totalSeats: true },
  });
  const assignments = await prisma.schoolSeatAssignments.findMany({
    where: { schoolUserId },
    select: { licenseId: true, assignedAt: true },
  });

  const assignedByLicense = new Map<string, number>();
  for (const assignment of assignments) {
    assignedByLicense.set(assignment.licenseId, (assignedByLicense.get(assignment.licenseId) ?? 0) + 1);
  }

  const purchasedSeats = licenses.reduce((sum, license) => sum + license.totalSeats, 0);
  const assignedSeats = assignments.length;
  const seatUtilizationPercent = purchasedSeats > 0 ? Math.round((assignedSeats / purchasedSeats) * 100) : 0;

  const atRiskDistinct = await prisma.$queryRawUnsafe<Array<{ count: number }>>(
    `SELECT COUNT(DISTINCT student_id)::int AS count
     FROM school_seat_assignments
     WHERE school_user_id = $1 AND is_at_risk = TRUE`,
    schoolUserId,
  );
  const atRiskFlags = atRiskDistinct[0]?.count ?? 0;
  const riskSyncMeta = await prisma.$queryRawUnsafe<Array<{ last_sync: Date | null; checked_count: number }>>(
    `SELECT MAX(last_risk_check_at) AS last_sync, COUNT(DISTINCT student_id)::int AS checked_count
     FROM school_seat_assignments
     WHERE school_user_id = $1 AND last_risk_check_at IS NOT NULL`,
    schoolUserId,
  );
  const riskRows = await prisma.$queryRawUnsafe<Array<{
    student_id: number;
    student_name: string;
    student_email: string;
    risk_reasons: unknown;
    last_risk_check_at: Date | null;
  }>>(
    `SELECT DISTINCT ON (ssa.student_id)
       ssa.student_id,
       ssa.student_name,
       ssa.student_email,
       ssa.risk_reasons,
       ssa.last_risk_check_at
     FROM school_seat_assignments ssa
     WHERE ssa.school_user_id = $1 AND ssa.is_at_risk = TRUE
     ORDER BY ssa.student_id, ssa.last_risk_check_at DESC NULLS LAST`,
    schoolUserId,
  );
  const lastRiskSyncAt = riskSyncMeta[0]?.last_sync ? riskSyncMeta[0].last_sync.toISOString() : null;
  const riskStudentsChecked = riskSyncMeta[0]?.checked_count ?? 0;

  const courseSeatSummary = licenses.map((license) => ({
    courseName: license.courseName,
    assignedSeats: assignedByLicense.get(license.id) ?? 0,
    totalSeats: license.totalSeats,
  }));

  const reviewedForms = await prisma.$queryRawUnsafe<Array<{ count: number }>>(
    `SELECT COUNT(*)::int AS count FROM school_form_submissions WHERE school_user_id = $1 AND status = 'approved'`,
    schoolUserId,
  );

  return {
    generatedAt: new Date().toISOString(),
    seatUtilizationPercent,
    assignedSeats,
    purchasedSeats,
    atRiskFlags,
    lastRiskSyncAt,
    riskStudentsChecked,
    atRiskStudents: riskRows.map((row) => {
      const reasons = (row.risk_reasons ?? {}) as { inactivityDays?: number; lowGrade?: boolean };
      return {
        studentId: row.student_id,
        studentName: row.student_name,
        studentEmail: row.student_email,
        inactivityDays: Number(reasons.inactivityDays ?? 0),
        lowGrade: Boolean(reasons.lowGrade),
      };
    }),
    classPdfCount: reviewedForms[0]?.count ?? 0,
    teacherCpdLabel: "T1-T6",
    courseSeatSummary,
  };
}

export function monthKey(date: Date) {
  return date.toISOString().slice(0, 7);
}
