import crypto from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import { setMoodleUserCustomField } from "./moodle/moodle-auth.js";

type DiagnosticType = 1 | 2 | 3 | 4 | 5 | 6;

export type DiagnosticEligibility = {
  eligible: boolean;
  reason?: string;
  softGate?: boolean;
  freeUsed?: boolean;
  teacherAttempts?: number;
};

export type DiagnosticContent = {
  sessionToken: string;
  diagnosticType: DiagnosticType;
  subject: string | null;
  grade: string | null;
  variant: string | null;
  questions: Array<{
    id: string;
    prompt: string;
    type: "single-choice" | "multi-choice" | "text";
    options?: string[];
  }>;
};

export type DiagnosticResult = {
  sessionToken: string;
  diagnosticType: DiagnosticType;
  subject: string | null;
  grade: string | null;
  variant: string | null;
  score: number;
  cefrLevel: string | null;
  strengths: string[];
  gaps: string[];
  topics: Array<{ name: string; score: number; mastery: "Mastered" | "In Progress" | "Gap" }>;
  nextSteps: string[];
  remedialActions: Array<{ topic: string; action: string }>;
  freeUsed: boolean;
  paid: boolean;
};

const O_LEVEL_SUBJECTS = [
  "English Language",
  "English Literature",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "Computer Science",
  "Islamiyat",
];

const ATP_SUBJECTS = ["Physics", "Chemistry", "Biology"];

function parseGradeNumber(grade?: string | null) {
  if (!grade) return null;
  if (grade.startsWith("Grade 5")) return 5;
  const match = grade.match(/Grade\s+(\d+)/);
  if (!match) return null;
  const parsed = Number(match[1]);
  return Number.isFinite(parsed) ? parsed : null;
}

export function getEnglishVariant(grade?: string | null) {
  const gradeNumber = parseGradeNumber(grade);
  if (gradeNumber !== null && gradeNumber <= 7) {
    return "RC68_VARIANT";
  }
  return "ESL_BRIDGE_VARIANT";
}

export function getEnglishVariantLabel(grade?: string | null) {
  const gradeNumber = parseGradeNumber(grade);
  if (gradeNumber !== null && gradeNumber <= 7) {
    return "English Level Check - Reading & Vocabulary Assessment";
  }
  return "English Level Check - Language Proficiency Assessment";
}

function getClientIp(req: { headers: Record<string, unknown>; ip?: string; socket?: { remoteAddress?: string | null } }) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]?.trim() || req.ip || req.socket?.remoteAddress || "unknown";
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function normalizeDiagnosticType(diagnosticType: number): DiagnosticType {
  if (diagnosticType >= 1 && diagnosticType <= 6) return diagnosticType as DiagnosticType;
  return 1;
}

function buildQuestions(session: { diagnosticType: DiagnosticType; subject: string | null; grade: string | null; variant: string | null }) {
  const subject = session.subject || "Subject";

  if (session.diagnosticType === 2) {
    return [
      {
        id: "english-vocab-1",
        prompt: session.variant === "RC68_VARIANT" ? "Choose the word closest in meaning to 'careful'." : "Choose the word closest in meaning to 'careful'.",
        type: "single-choice" as const,
        options: ["careless", "mindful", "late", "rough"],
      },
      {
        id: "english-read-1",
        prompt: session.variant === "RC68_VARIANT" ? "Read the short passage and answer the question." : "Read the short passage and answer the question.",
        type: "text" as const,
      },
      {
        id: "english-write-1",
        prompt: session.variant === "RC68_VARIANT" ? "Write 2-3 sentences about your school day." : "Write a short paragraph describing your school day and what makes it effective.",
        type: "text" as const,
      },
    ];
  }

  if (session.diagnosticType === 4) {
    return ATP_SUBJECTS.map((item, index) => ({
      id: `atp-${index + 1}`,
      prompt: `ATP diagnostic question for ${item}: identify the correct concept and explain why it matters.`,
      type: "text" as const,
    }));
  }

  return [
    {
      id: `${session.diagnosticType}-1`,
      prompt: `Question 1 for ${subject}: identify the best answer from the choices below.`,
      type: "single-choice" as const,
      options: ["Option A", "Option B", "Option C", "Option D"],
    },
    {
      id: `${session.diagnosticType}-2`,
      prompt: `Question 2 for ${subject}: explain your answer in one or two sentences.`,
      type: "text" as const,
    },
    {
      id: `${session.diagnosticType}-3`,
      prompt: `Question 3 for ${subject}: select all topics that apply.`,
      type: "multi-choice" as const,
      options: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
    },
  ];
}

function buildResult(session: {
  sessionToken: string;
  diagnosticType: DiagnosticType;
  subject: string | null;
  grade: string | null;
  variant: string | null;
  paid: boolean;
  freeUsed: boolean;
}, answersCount: number): DiagnosticResult {
  const base = session.diagnosticType === 2 ? 72 : session.diagnosticType === 5 ? 81 : 68;
  const score = Math.max(42, Math.min(96, base + answersCount * 4));
  const cefrLevel = session.diagnosticType === 2 ? (score >= 88 ? "B2" : score >= 78 ? "B1+" : score >= 66 ? "B1" : "A2") : null;

  const subject = session.subject || (session.diagnosticType === 2 ? "English Level Check" : null);
  const topicLabel = subject || "Diagnostic";

  return {
    sessionToken: session.sessionToken,
    diagnosticType: session.diagnosticType,
    subject,
    grade: session.grade,
    variant: session.variant,
    score,
    cefrLevel,
    strengths: [
      `${topicLabel} foundations`,
      session.diagnosticType === 2 ? "Vocabulary recognition" : "Core concept retention",
      session.diagnosticType === 5 ? "Teacher-level subject knowledge" : "Structured response quality",
    ],
    gaps: [
      `${topicLabel} extension areas`,
      session.diagnosticType === 2 ? "Reading fluency" : "Applied problem solving",
      session.diagnosticType === 5 ? "Exam-standard explanation" : "Recall under timed conditions",
    ],
    topics: [
      { name: `${topicLabel} Topic A`, score: Math.max(40, score - 10), mastery: score >= 80 ? "Mastered" : score >= 60 ? "In Progress" : "Gap" },
      { name: `${topicLabel} Topic B`, score: Math.max(35, score - 15), mastery: score >= 78 ? "Mastered" : score >= 55 ? "In Progress" : "Gap" },
      { name: `${topicLabel} Topic C`, score: Math.max(30, score - 20), mastery: score >= 76 ? "Mastered" : score >= 50 ? "In Progress" : "Gap" },
    ],
    nextSteps: [
      `Revisit ${topicLabel} Topic A`,
      session.diagnosticType === 2 ? "Work on guided English reading practice" : "Complete targeted practice on the weakest topic",
      "Retake the diagnostic after revision",
    ],
    remedialActions: [
      { topic: `${topicLabel} Topic A`, action: "Review the foundational concept and do 10 focused practice items." },
      { topic: `${topicLabel} Topic B`, action: "Read the explanation, then answer a short written check." },
      { topic: `${topicLabel} Topic C`, action: "Use the recommended course links to close the gap." },
    ],
    freeUsed: session.freeUsed,
    paid: session.paid,
  };
}

export async function getDiagnosticEligibility(input: {
  diagnosticType: number;
  moodleUserId?: number | null;
  grade?: string | null;
  subject?: string | null;
  ip?: string | null;
}): Promise<DiagnosticEligibility> {
  const diagnosticType = normalizeDiagnosticType(input.diagnosticType);

  if (diagnosticType === 6) {
    return { eligible: false, reason: "school_contact_only" };
  }

  if (diagnosticType === 5) {
    if (!input.moodleUserId) {
      return { eligible: false, reason: "teacher_account_required" };
    }

    const flag = await prisma.edumeDiagnosticAccountFlags.findFirst({ where: { moodleUserId: input.moodleUserId } });
    const attempts = flag?.teacherT1Attempts ?? 0;
    if (attempts >= 2) {
      return { eligible: false, reason: "teacher_limit", teacherAttempts: attempts };
    }
    return { eligible: true, teacherAttempts: attempts };
  }

  const gradeNumber = parseGradeNumber(input.grade ?? null);
  if (gradeNumber === null || gradeNumber < 6) {
    return { eligible: false, reason: "grade_too_low" };
  }

  if (input.moodleUserId) {
    const flag = await prisma.edumeDiagnosticAccountFlags.findFirst({ where: { moodleUserId: input.moodleUserId } });
    if (flag?.freeDiagnosticUsed) {
      return { eligible: false, reason: "account_used", freeUsed: true };
    }
    return { eligible: true, freeUsed: Boolean(flag?.freeDiagnosticUsed) };
  }

  const ip = input.ip || "unknown";
  const existing = await prisma.edumeGuestDiagnostics.findFirst({ where: { ipAddress: ip, completed: true }, orderBy: { completedAt: "desc" } });

  if (existing) {
    return { eligible: false, reason: "ip_used", softGate: true, freeUsed: true };
  }

  return { eligible: true, freeUsed: false };
}

export async function createDiagnosticSession(input: {
  diagnosticType: number;
  moodleUserId?: number | null;
  ip: string;
  grade?: string | null;
  subject?: string | null;
  paid?: boolean;
}) {
  const diagnosticType = normalizeDiagnosticType(input.diagnosticType);
  const eligibility = await getDiagnosticEligibility({
    diagnosticType,
    moodleUserId: input.moodleUserId ?? null,
    grade: input.grade ?? null,
    subject: input.subject ?? null,
    ip: input.ip,
  });

  if (!eligibility.eligible) {
    return eligibility;
  }

  const sessionToken = crypto.randomUUID();
  const variant = diagnosticType === 2 ? getEnglishVariant(input.grade ?? null) : null;

  await prisma.edumeDiagnosticSessions.create({ data: {
    sessionToken,
    moodleUserId: input.moodleUserId ?? null,
    ipAddress: input.ip,
    diagnosticType,
    subject: input.subject ?? null,
    grade: input.grade ?? null,
    variant,
    paid: input.paid ?? false,
    status: "started",
  } });

  if (input.moodleUserId) {
    await prisma.edumeDiagnosticAccountFlags.upsert({ where: { moodleUserId: input.moodleUserId }, create: {
      moodleUserId: input.moodleUserId,
      freeDiagnosticUsed: false,
      teacherT1Attempts: 0,
    }, update: { updatedAt: new Date() } });
  }

  const guestExists = await prisma.edumeGuestDiagnostics.findFirst({ where: { sessionToken } });
  if (!guestExists) {
    await prisma.edumeGuestDiagnostics.create({ data: {
    ipAddress: input.ip,
    subject: input.subject ?? "",
    diagnosticType: String(diagnosticType),
    sessionToken,
    moodleUserId: input.moodleUserId ?? null,
    completed: false,
  } });
  }

  return {
    eligible: true,
    sessionToken,
    variant,
    diagnosticType,
  };
}

export async function getDiagnosticContent(sessionToken: string): Promise<DiagnosticContent | null> {
  const session = await prisma.edumeDiagnosticSessions.findFirst({ where: { sessionToken: sessionToken } });
  if (!session) return null;

  return {
    sessionToken,
    diagnosticType: normalizeDiagnosticType(session.diagnosticType),
    subject: session.subject,
    grade: session.grade,
    variant: session.variant,
    questions: buildQuestions({
      diagnosticType: normalizeDiagnosticType(session.diagnosticType),
      subject: session.subject,
      grade: session.grade,
      variant: session.variant,
    }),
  };
}

export async function saveDiagnosticAnswer(input: {
  sessionToken: string;
  questionId: string;
  answer: unknown;
}) {
  await prisma.edumeDiagnosticAnswers.create({ data: {
    sessionToken: input.sessionToken,
    questionId: input.questionId,
    answer: input.answer as Prisma.InputJsonValue,
  } });
  return true;
}

export async function completeDiagnosticSession(input: { sessionToken: string }) {
  const session = await prisma.edumeDiagnosticSessions.findFirst({ where: { sessionToken: input.sessionToken } });

  if (!session) {
    throw new Error("Diagnostic session not found");
  }

  const answers = await prisma.edumeDiagnosticAnswers.findMany({ where: { sessionToken: input.sessionToken } });

  const result = buildResult(
    {
      sessionToken: session.sessionToken,
      diagnosticType: normalizeDiagnosticType(session.diagnosticType),
      subject: session.subject,
      grade: session.grade,
      variant: session.variant,
      paid: session.paid,
      freeUsed: !session.paid,
    },
    answers.length,
  );

  await prisma.edumeDiagnosticSessions.updateMany({ where: { sessionToken: input.sessionToken }, data: {
      status: "completed",
      completedAt: new Date(),
      resultJson: result as Prisma.InputJsonValue,
    } });

  await prisma.edumeGuestDiagnostics.updateMany({ where: { sessionToken: input.sessionToken }, data: {
      completed: true,
      completedAt: new Date(),
    } });

  if (session.moodleUserId) {
    if (session.diagnosticType === 5) {
      const existing = await prisma.edumeDiagnosticAccountFlags.findFirst({ where: { moodleUserId: session.moodleUserId } });
      const nextAttempts = (existing?.teacherT1Attempts ?? 0) + 1;
      await prisma.edumeDiagnosticAccountFlags.upsert({ where: { moodleUserId: session.moodleUserId }, create: {
        moodleUserId: session.moodleUserId,
        freeDiagnosticUsed: existing?.freeDiagnosticUsed ?? false,
        teacherT1Attempts: nextAttempts,
        updatedAt: new Date(),
      }, update: {
          teacherT1Attempts: nextAttempts,
          updatedAt: new Date(),
        } });
    } else {
      await prisma.edumeDiagnosticAccountFlags.upsert({ where: { moodleUserId: session.moodleUserId }, create: {
        moodleUserId: session.moodleUserId,
        freeDiagnosticUsed: true,
        teacherT1Attempts: 0,
        updatedAt: new Date(),
      }, update: {
          freeDiagnosticUsed: true,
          updatedAt: new Date(),
        } });

      await setMoodleUserCustomField(session.moodleUserId, "free_diagnostic_used", "1").catch(() => undefined);
    }
  }

  if (!session.moodleUserId && session.diagnosticType !== 5) {
    await prisma.edumeGuestDiagnostics.updateMany({ where: { sessionToken: input.sessionToken }, data: { completed: true, completedAt: new Date() } });
  }

  return {
    reportId: input.sessionToken,
    redirectUrl: `/diagnostics/results/${input.sessionToken}`,
    result,
  };
}

export async function getDiagnosticResults(sessionToken: string): Promise<DiagnosticResult | null> {
  const session = await prisma.edumeDiagnosticSessions.findFirst({ where: { sessionToken: sessionToken } });
  if (!session) return null;

  if (session.resultJson) {
    return session.resultJson as DiagnosticResult;
  }

  const answers = await prisma.edumeDiagnosticAnswers.findMany({ where: { sessionToken: sessionToken } });
  return buildResult(
    {
      sessionToken: session.sessionToken,
      diagnosticType: normalizeDiagnosticType(session.diagnosticType),
      subject: session.subject,
      grade: session.grade,
      variant: session.variant,
      paid: session.paid,
      freeUsed: !session.paid,
    },
    answers.length,
  );
}

export async function linkGuestDiagnosticToAccount(input: { moodleUserId: number; ip: string }) {
  const completedGuestDiagnostic = await prisma.edumeGuestDiagnostics.findFirst({ where: { ipAddress: input.ip, completed: true }, orderBy: { completedAt: "desc" } });

  if (!completedGuestDiagnostic) {
    return false;
  }

  await prisma.edumeDiagnosticAccountFlags.upsert({ where: { moodleUserId: input.moodleUserId }, create: {
    moodleUserId: input.moodleUserId,
    freeDiagnosticUsed: true,
    teacherT1Attempts: 0,
    updatedAt: new Date(),
  }, update: {
      freeDiagnosticUsed: true,
      updatedAt: new Date(),
    } });

  await setMoodleUserCustomField(input.moodleUserId, "free_diagnostic_used", "1").catch(() => undefined);
  return true;
}

export async function getGuestDiagnosticInfo(sessionToken: string) {
  return prisma.edumeGuestDiagnostics.findFirst({ where: { sessionToken: sessionToken } });
}

export function getDiagnosticRouteTitle(diagnosticType: number) {
  switch (normalizeDiagnosticType(diagnosticType)) {
    case 2:
      return "English Level Check";
    case 3:
      return "O-Level Subject Diagnostic";
    case 4:
      return "ATP Diagnostic";
    case 5:
      return "Teacher Subject Knowledge Diagnostic";
    case 6:
      return "School Class-Level Diagnostic";
    default:
      return "O-Level Bridge Diagnostic";
  }
}
