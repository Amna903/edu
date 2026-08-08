import { randomUUID } from "crypto";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";

export type InAppNotification = {
  id: string; userId: number; title: string; message: string; type: "order" | "course" | "system"; actionUrl: string | null; createdAt: string;
};

let ready: Promise<void> | null = null;
async function ensureReady() {
  if (!ready) ready = (async () => {
    await prisma.$executeRawUnsafe(`CREATE TABLE IF NOT EXISTS app_notifications (
      id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, title TEXT NOT NULL, message TEXT NOT NULL,
      type TEXT NOT NULL, action_url TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS app_notifications_user_created_idx ON app_notifications(user_id, created_at DESC)`);
  })();
  return ready;
}

export async function createInAppNotification(input: Omit<InAppNotification, "id" | "createdAt">) {
  await ensureReady();
  const id = randomUUID();
  const now = new Date();
  await prisma.$executeRawUnsafe(`INSERT INTO app_notifications (id, user_id, title, message, type, action_url, created_at) VALUES ($1,$2,$3,$4,$5,$6,$7)`, id, input.userId, input.title, input.message, input.type, input.actionUrl, now);
  return { ...input, id, createdAt: now.toISOString() };
}

export async function listInAppNotifications(userId: number): Promise<InAppNotification[]> {
  await ensureReady();
  const rows = await prisma.$queryRawUnsafe<Array<{ id: string; user_id: number; title: string; message: string; type: "order" | "course" | "system"; action_url: string | null; created_at: Date }>>(
    `SELECT * FROM app_notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 30`, userId);
  return rows.map((row) => ({ id: row.id, userId: row.user_id, title: row.title, message: row.message, type: row.type, actionUrl: row.action_url, createdAt: row.created_at.toISOString() }));
}

export async function sendNotificationEmail(input: { to: string | null | undefined; subject: string; text: string }) {
  if (!input.to || !env.support.resendApiKey || !env.support.fromEmail) return;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST", headers: { Authorization: `Bearer ${env.support.resendApiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env.support.fromEmail, to: [input.to], subject: input.subject, text: input.text }),
  });
  if (!response.ok) throw new Error(`Notification email failed (${response.status})`);
}

export async function notifyPayment(input: { userId: number; email?: string | null; orderId: number; completed: boolean }) {
  const status = input.completed ? "completed" : "partially paid";
  const title = `Payment ${status}`;
  const message = `Your payment for order #${input.orderId} is ${status}.`;
  await createInAppNotification({ userId: input.userId, title, message, type: "order", actionUrl: "/dashboard/orders" });
  await sendNotificationEmail({ to: input.email, subject: `EduMeUp: ${title}`, text: `${message}\n\nView your order in your EduMeUp dashboard.` });
}

export async function notifyCourseUpdate(input: { courseId: string; courseName: string; message: string }) {
  const recipients = await prisma.userCourseEnrollment.findMany({ where: { courseCatalogId: input.courseId }, include: { user: true } });
  await Promise.all(recipients.map(async ({ user }) => {
    const title = `Course update: ${input.courseName}`;
    await createInAppNotification({ userId: user.moodleUserId, title, message: input.message, type: "course", actionUrl: "/dashboard/student" });
    await sendNotificationEmail({ to: user.email, subject: `EduMeUp: ${title}`, text: `${input.message}\n\nOpen your dashboard to continue learning.` });
  }));
}
