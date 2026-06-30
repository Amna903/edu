/**
 * 4.21 — DB-backed Background Job Queue
 * No Redis/BullMQ required — uses PostgreSQL via Prisma.
 * Works on serverless (Neon) and traditional deployments.
 */
import { prisma } from "../db/prisma.js";

export type JobType =
  | "ENROLL_USER"
  | "SEND_EMAIL"
  | "MOODLE_SYNC_COURSES"
  | "MOODLE_SYNC_USERS"
  | "PAYMENT_VERIFY"
  | "PAYMENT_ENROLL_RETRY";

export interface EnrollUserPayload {
  moodleUserId: number;
  courseId: number;
  orderId: number;
  userId: string;
}

export interface SendEmailPayload {
  to: string | string[];
  subject: string;
  text: string;
  cc?: string[];
  replyTo?: string;
}

export interface MoodleSyncPayload {
  triggeredBy?: string;
}

export interface PaymentEnrollRetryPayload {
  orderId: number;
  userId: string;
  items: Array<{ programId: number; title: string; price: number }>;
}

export type JobPayload =
  | EnrollUserPayload
  | SendEmailPayload
  | MoodleSyncPayload
  | PaymentEnrollRetryPayload
  | Record<string, unknown>;

/** Enqueue a job to run immediately (or at a future time). */
export async function enqueueJob(
  type: JobType,
  payload: JobPayload,
  options: { runAt?: Date; maxAttempts?: number } = {}
): Promise<string> {
  const job = await prisma.backgroundJob.create({
    data: {
      type,
      payload: payload as any,
      status: "pending",
      runAt: options.runAt ?? new Date(),
      maxAttempts: options.maxAttempts ?? 3,
    },
  });
  return job.id;
}
