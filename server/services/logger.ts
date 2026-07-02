/**
 * Centralized Error Logging & Login Attempt Logging (SRS §10)
 *
 * - Error logging: captures unhandled errors, API errors, and service failures
 * - Login attempt logging: records successful/failed logins with IP and user-agent
 * - Stored in DB via AdminActivityLog for admin visibility
 */

import { prisma } from "../db/prisma.js";

export type LogLevel = "info" | "warn" | "error" | "fatal";

export interface LoginAttemptOptions {
  username: string;
  ipAddress: string;
  userAgent?: string;
  success: boolean;
  failureReason?: string;
  moodleUserId?: number;
}

export interface ErrorLogOptions {
  context: string;
  error: unknown;
  userId?: number;
  metadata?: Record<string, unknown>;
}

/** Log a login attempt (success or failure). Stored in DB + console. */
export async function logLoginAttempt(opts: LoginAttemptOptions): Promise<void> {
  const action = opts.success ? "LOGIN_SUCCESS" : "LOGIN_FAILED";
  const details: Record<string, unknown> = {
    username: opts.username,
    ipAddress: opts.ipAddress,
    userAgent: opts.userAgent ?? null,
    success: opts.success,
  };
  if (opts.failureReason) {
    details.failureReason = opts.failureReason;
  }

  const logLine = `[auth] ${action} user=${opts.username} ip=${opts.ipAddress}${opts.failureReason ? ` reason=${opts.failureReason}` : ""}`;
  if (opts.success) {
    console.log(logLine);
  } else {
    console.warn(logLine);
  }

  try {
    await (prisma as any).adminActivityLog.create({
      data: {
        adminUserId: opts.moodleUserId ?? 0,
        targetUserId: opts.moodleUserId ? String(opts.moodleUserId) : null,
        action,
        details,
      },
    });
  } catch (dbErr) {
    // Never let logging crash the app
    console.error("[logger] Failed to persist login attempt log:", dbErr);
  }
}

/** Log an application error with context. Stored in DB + console. */
export async function logError(opts: ErrorLogOptions): Promise<void> {
  const errorMessage = opts.error instanceof Error ? opts.error.message : String(opts.error);
  const errorStack = opts.error instanceof Error ? (opts.error.stack ?? null) : null;

  console.error(`[error] ${opts.context}: ${errorMessage}`, opts.metadata ?? "");

  try {
    await (prisma as any).adminActivityLog.create({
      data: {
        adminUserId: opts.userId ?? 0,
        targetUserId: opts.userId ? String(opts.userId) : null,
        action: "SYSTEM_ERROR",
        details: {
          context: opts.context,
          error: errorMessage,
          stack: errorStack ? errorStack.slice(0, 2000) : null,
          ...(opts.metadata ?? {}),
        },
      },
    });
  } catch (dbErr) {
    console.error("[logger] Failed to persist error log:", dbErr);
  }
}

/** Attach global uncaught exception + unhandled rejection handlers. */
export function attachGlobalErrorHandlers(): void {
  process.on("uncaughtException", (err) => {
    logError({ context: "uncaughtException", error: err }).catch(() => undefined);
  });

  process.on("unhandledRejection", (reason) => {
    logError({ context: "unhandledRejection", error: reason }).catch(() => undefined);
  });
}
