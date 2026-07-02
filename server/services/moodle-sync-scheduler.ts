/**
 * Moodle Sync Jobs Scheduler (SRS §4.21)
 *
 * Enqueues recurring Moodle sync jobs on a configurable interval:
 *   - MOODLE_SYNC_COURSES  — syncs course catalog from Moodle
 *   - MOODLE_SYNC_USERS    — syncs user directory from Moodle
 *   - PAYMENT_VERIFY       — re-checks pending/initiated payments
 *
 * Runs only on the primary (non-serverless) process.
 * Uses the existing DB-backed job queue so the worker picks them up.
 */

import { enqueueJob } from "./job-queue.js";
import { prisma } from "../db/prisma.js";
import { env } from "../config/config.js";
import { logError } from "./logger.js";

let syncTimer: ReturnType<typeof setInterval> | null = null;
let paymentVerifyTimer: ReturnType<typeof setInterval> | null = null;

/** Enqueue a Moodle course-catalog sync job (deduplicates if one is already pending). */
async function scheduleMoodleCoursesSync(): Promise<void> {
  try {
    // Skip if a pending/running sync job already exists
    const existing = await prisma.backgroundJob.findFirst({
      where: { type: "MOODLE_SYNC_COURSES", status: { in: ["pending", "running"] } },
    });
    if (existing) return;

    await enqueueJob("MOODLE_SYNC_COURSES", { triggeredBy: "scheduler" });
    console.log("[sync-scheduler] enqueued MOODLE_SYNC_COURSES");
  } catch (err) {
    logError({ context: "moodle-sync-scheduler:courses", error: err }).catch(() => undefined);
  }
}

/** Enqueue a Moodle user-directory sync job. */
async function scheduleMoodleUsersSync(): Promise<void> {
  try {
    const existing = await prisma.backgroundJob.findFirst({
      where: { type: "MOODLE_SYNC_USERS", status: { in: ["pending", "running"] } },
    });
    if (existing) return;

    await enqueueJob("MOODLE_SYNC_USERS", { triggeredBy: "scheduler" });
    console.log("[sync-scheduler] enqueued MOODLE_SYNC_USERS");
  } catch (err) {
    logError({ context: "moodle-sync-scheduler:users", error: err }).catch(() => undefined);
  }
}

/**
 * Re-check orders that have been in "initiated" or "pending" state for more
 * than 10 minutes — enqueue a PAYMENT_VERIFY job for each.
 */
async function schedulePaymentVerification(): Promise<void> {
  try {
    const staleThreshold = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago

    const staleOrders = await prisma.orders.findMany({
      where: {
        paymentStatus: { in: ["initiated", "pending"] },
        createdAt: { lt: staleThreshold },
      },
      select: { id: true, userId: true, paymentRef: true },
      take: 20,
    });

    for (const order of staleOrders) {
      if (!order.paymentRef) continue;

      // Avoid duplicate verify jobs
      const existingJob = await prisma.backgroundJob.findFirst({
        where: {
          type: "PAYMENT_VERIFY",
          status: { in: ["pending", "running"] },
          payload: { path: ["orderId"], equals: order.id },
        },
      });
      if (existingJob) continue;

      await enqueueJob("PAYMENT_VERIFY", {
        orderId: order.id,
        orderRef: order.paymentRef,
        userId: order.userId ?? "",
      });
      console.log(`[sync-scheduler] enqueued PAYMENT_VERIFY for order ${order.id}`);
    }
  } catch (err) {
    logError({ context: "moodle-sync-scheduler:payment-verify", error: err }).catch(() => undefined);
  }
}

/** Start the sync scheduler. Safe to call multiple times — only starts once. */
export function startSyncScheduler(): void {
  if (syncTimer) return;

  const courseSyncMs = (env.moodle.syncCourseCatalogMinutes || 60) * 60 * 1000;
  const userSyncMs = (env.moodle.syncUserDirectoryMinutes || 120) * 60 * 1000;
  const paymentVerifyMs = 5 * 60 * 1000; // every 5 minutes

  // Run once at startup
  scheduleMoodleCoursesSync().catch(() => undefined);
  schedulePaymentVerification().catch(() => undefined);

  syncTimer = setInterval(() => {
    scheduleMoodleCoursesSync().catch(() => undefined);
  }, courseSyncMs);

  // Users sync on a separate (longer) interval
  setInterval(() => {
    scheduleMoodleUsersSync().catch(() => undefined);
  }, userSyncMs);

  paymentVerifyTimer = setInterval(() => {
    schedulePaymentVerification().catch(() => undefined);
  }, paymentVerifyMs);

  console.log(
    `[sync-scheduler] started — courses every ${env.moodle.syncCourseCatalogMinutes}min, users every ${env.moodle.syncUserDirectoryMinutes}min, payment-verify every 5min`,
  );
}

export function stopSyncScheduler(): void {
  if (syncTimer) { clearInterval(syncTimer); syncTimer = null; }
  if (paymentVerifyTimer) { clearInterval(paymentVerifyTimer); paymentVerifyTimer = null; }
}
