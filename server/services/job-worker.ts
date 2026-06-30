/**
 * 4.21 / 4.20 — Background Job Worker + Dead Letter Queue
 *
 * Polls the background_jobs table every 15 seconds.
 * On failure, retries up to maxAttempts. Exhausted jobs
 * move to dead_letter_jobs (DLQ) for inspection/manual replay.
 */
import { randomUUID } from "crypto";
import { prisma } from "../db/prisma.js";
import type { JobType, EnrollUserPayload, SendEmailPayload, PaymentEnrollRetryPayload } from "./job-queue.js";
import { env } from "../config/config.js";

const WORKER_ID = `worker-${randomUUID().slice(0, 8)}`;
const POLL_INTERVAL_MS = 15_000;
const LOCK_TIMEOUT_MS = 5 * 60 * 1000; // 5 min — stale lock

// ── Handlers ────────────────────────────────────────────────

async function handleEnrollUser(payload: EnrollUserPayload) {
  const { enrolUserInCourse } = await import("./moodle/moodle-commerce.js");
  const { createCourseEnrollment } = await import("../repositories/course-store.js");
  await enrolUserInCourse(payload.moodleUserId, payload.courseId);
  await createCourseEnrollment(payload.moodleUserId, payload.courseId);
  console.log(`[worker] enrolled user ${payload.moodleUserId} in course ${payload.courseId}`);
}

async function handleSendEmail(payload: SendEmailPayload) {
  if (!env.support.resendApiKey || !env.support.fromEmail) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.support.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.support.fromEmail,
      to: Array.isArray(payload.to) ? payload.to : [payload.to],
      cc: payload.cc,
      subject: payload.subject,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend API ${res.status}: ${detail.slice(0, 200)}`);
  }
}

async function handleMoodleSyncCourses() {
  const { getLmsCourses } = await import("./moodle/moodle.js");
  const courses = await getLmsCourses();
  for (const course of courses) {
    await (prisma as any).courseCatalog.upsert({
      where: { moodleCourseId: course.id },
      create: {
        moodleCourseId: course.id,
        shortname: course.slug,
        fullname: course.title,
        summary: course.fullDescription,
        categoryId: course.categoryId,
        categoryName: course.category,
        isVisible: course.visible,
        price: 0,
        lastSyncedAt: new Date(),
      },
      update: {
        fullname: course.title,
        summary: course.fullDescription,
        categoryId: course.categoryId,
        categoryName: course.category,
        isVisible: course.visible,
        lastSyncedAt: new Date(),
      },
    });
  }
  console.log(`[worker] synced ${courses.length} courses from Moodle`);
}

async function handlePaymentEnrollRetry(payload: PaymentEnrollRetryPayload) {
  const { enrolUserInCourse } = await import("./moodle/moodle-commerce.js");
  const { createCourseEnrollment } = await import("../repositories/course-store.js");
  const failures: string[] = [];
  for (const item of payload.items) {
    try {
      await enrolUserInCourse(Number(payload.userId), item.programId);
      await createCourseEnrollment(Number(payload.userId), item.programId);
    } catch (err) {
      failures.push(`course ${item.programId}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (failures.length) throw new Error(`Partial enrollment failures: ${failures.join("; ")}`);
  console.log(`[worker] retry-enrolled user ${payload.userId} in ${payload.items.length} courses`);
}

// ── Dispatch ────────────────────────────────────────────────

async function dispatchJob(type: string, payload: unknown) {
  switch (type as JobType) {
    case "ENROLL_USER":
      return handleEnrollUser(payload as EnrollUserPayload);
    case "SEND_EMAIL":
      return handleSendEmail(payload as SendEmailPayload);
    case "MOODLE_SYNC_COURSES":
      return handleMoodleSyncCourses();
    case "PAYMENT_ENROLL_RETRY":
      return handlePaymentEnrollRetry(payload as PaymentEnrollRetryPayload);
    default:
      console.warn(`[worker] unknown job type: ${type}`);
  }
}

// ── Core poll loop ───────────────────────────────────────────

async function processNextBatch() {
  // Release stale locks first (worker crashed mid-job)
  const staleThreshold = new Date(Date.now() - LOCK_TIMEOUT_MS);
  await prisma.backgroundJob.updateMany({
    where: { status: "running", lockedAt: { lt: staleThreshold } },
    data: { status: "pending", lockedAt: null, lockedBy: null },
  });

  // Fetch up to 5 pending jobs due now
  const jobs = await prisma.backgroundJob.findMany({
    where: { status: "pending", runAt: { lte: new Date() } },
    orderBy: { runAt: "asc" },
    take: 5,
  });

  for (const job of jobs) {
    // Optimistic lock — mark as running
    const locked = await prisma.backgroundJob.updateMany({
      where: { id: job.id, status: "pending" },
      data: { status: "running", lockedAt: new Date(), lockedBy: WORKER_ID },
    });
    if (locked.count === 0) continue; // Another worker grabbed it

    try {
      await dispatchJob(job.type, job.payload);
      await prisma.backgroundJob.update({
        where: { id: job.id },
        data: { status: "done", doneAt: new Date(), errorMsg: null },
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      const nextAttempts = job.attempts + 1;
      console.error(`[worker] job ${job.id} (${job.type}) failed (attempt ${nextAttempts}/${job.maxAttempts}): ${errorMsg}`);

      if (nextAttempts >= job.maxAttempts) {
        // Move to Dead Letter Queue (4.20)
        await prisma.deadLetterJob.create({
          data: {
            type: job.type,
            payload: job.payload,
            attempts: nextAttempts,
            lastError: errorMsg.slice(0, 2000),
            originalId: job.id,
          },
        });
        await prisma.backgroundJob.update({
          where: { id: job.id },
          data: {
            status: "failed",
            attempts: nextAttempts,
            errorMsg: `MOVED TO DLQ: ${errorMsg.slice(0, 500)}`,
          },
        });
        console.warn(`[worker] job ${job.id} exhausted retries → DLQ`);
      } else {
        // Exponential backoff: 1min, 5min, 15min
        const delayMs = Math.min(60_000 * Math.pow(5, nextAttempts - 1), 15 * 60_000);
        await prisma.backgroundJob.update({
          where: { id: job.id },
          data: {
            status: "pending",
            attempts: nextAttempts,
            errorMsg: errorMsg.slice(0, 500),
            lockedAt: null,
            lockedBy: null,
            runAt: new Date(Date.now() + delayMs),
          },
        });
      }
    }
  }
}

// ── Public API ───────────────────────────────────────────────

let workerTimer: ReturnType<typeof setInterval> | null = null;

export function startJobWorker() {
  if (workerTimer) return;
  console.log(`[worker] starting — id=${WORKER_ID}, poll every ${POLL_INTERVAL_MS / 1000}s`);
  // Run once immediately, then on interval
  processNextBatch().catch((err) => console.error("[worker] init poll error:", err));
  workerTimer = setInterval(() => {
    processNextBatch().catch((err) => console.error("[worker] poll error:", err));
  }, POLL_INTERVAL_MS);
}

export function stopJobWorker() {
  if (workerTimer) {
    clearInterval(workerTimer);
    workerTimer = null;
  }
}

/** Replay a DLQ job by re-enqueuing it. */
export async function replayDeadLetterJob(dlqId: string): Promise<string> {
  const { enqueueJob } = await import("./job-queue.js");
  const dlq = await prisma.deadLetterJob.findUnique({ where: { id: dlqId } });
  if (!dlq) throw new Error("DLQ job not found");
  const newId = await enqueueJob(dlq.type as JobType, dlq.payload as any);
  await prisma.deadLetterJob.delete({ where: { id: dlqId } });
  return newId;
}
