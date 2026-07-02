import type { Request as ExpressRequest } from "express";
import { z } from "zod";
import { storage } from "../db/storage.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { getLmsCourseById } from "../services/moodle/moodle.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { createCourseEnrollment } from "../repositories/course-store.js";
import { getStoredRoleByMoodleUserId, getStoredUserByMoodleUserId } from "../repositories/user-store.js";
import { randomUUID } from "crypto";
import { getStudentGradesForDashboard } from "../services/moodle/moodle-dashboard.js";
import {
  assertScholarshipCodeForUser,
  calculateOrderTotalWithScholarship,
} from "../services/scholarship.js";

export type RouteContext = ReturnType<typeof createRouteContext>;

export function createRouteContext() {
  const notificationReadByUser = new Map<number, Set<number>>();
  const contactRateLimitByIp = new Map<string, number[]>();
  const schoolLicensesByUser = new Map<number, Array<{
    id: string;
    schoolUserId: number;
    courseId: number;
    courseName: string;
    totalSeats: number;
    usedSeats: number;
    purchaseDate: string;
    expiresAt: string | null;
    orderId: number;
    assignedStudents: Array<{
      studentId: number;
      studentEmail: string;
      studentName: string;
      assignedAt: string;
    }>;
  }>>();
  const schoolUploadsByUser = new Map<number, Array<{
    id: string;
    filename: string;
    uploadedAt: string;
    totalStudents: number;
    processedStudents: number;
    failedStudents: number;
    status: "pending" | "processing" | "completed" | "failed";
    errors: Array<{ row: number; email?: string; error: string }>;
  }>>();
  const schoolRosterByUser = new Map<number, Map<number, {
    studentId: number;
    studentEmail: string;
    studentName: string;
    uploadedAt: string;
    sourceUploadId: string;
  }>>();
  const paymentEventsByOrderId = new Map<number, Array<{
    status: string;
    message: string;
    createdAt: string;
  }>>();

  const aiSupportWebhookUrl =
    process.env.AI_SUPPORT_WEBHOOK_URL ??
    "https://n8n.edumeup.com/webhook/f0a0ac6f-f667-404a-9b13-74d11dd68632";

  const quizAttemptWebhookUrl =
    process.env.QUIZ_ATTEMPT_WEBHOOK_URL ??
    "https://n8n.edumeup.com/webhook/d8a35fd3-b70d-493e-933c-f8126a16f3ac";

  const quizAttemptPayloadSchema = z
    .object({
      userid: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine(Boolean, {
        message: "userid is required",
      }),
      quizid: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine(Boolean, {
        message: "quizid is required",
      }),
      attemptid: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine(Boolean, {
        message: "attemptid is required",
      }),
      timefinish: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine(Boolean, {
        message: "timefinish is required",
      }),
      rawgrade: z.union([z.string(), z.number()]).transform((value) => String(value).trim()).refine(Boolean, {
        message: "rawgrade is required",
      }),
    })
    .passthrough();

  const extractAiReply = (payload: unknown): string => {
    if (!payload) return "";
    if (typeof payload === "string") return payload.trim();
    if (Array.isArray(payload)) {
      for (const item of payload) {
        const nested = extractAiReply(item);
        if (nested) return nested;
      }
      return "";
    }
    if (typeof payload === "object") {
      const record = payload as Record<string, unknown>;
      const keys = ["reply", "message", "response", "output", "text", "answer"];
      for (const key of keys) {
        const value = record[key];
        if (typeof value === "string" && value.trim()) return value.trim();
        const nested = extractAiReply(value);
        if (nested) return nested;
      }
    }
    return "";
  };

  const loadLinkedChildren = async (parentId: number) => {
    const { getLinkedChildren: resolveLinkedChildren } = await import("../repositories/user-store.js");
    return resolveLinkedChildren(parentId);
  };

  const getClientIp = (req: ExpressRequest) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string" && forwarded.trim()) {
      return forwarded.split(",")[0]?.trim() || req.ip || req.socket.remoteAddress || "unknown";
    }
    return req.ip || req.socket.remoteAddress || "unknown";
  };

  const getSchoolLicenses = async (schoolUserId: number) => {
    const [licenses, assignments] = await Promise.all([
      prisma.schoolLicenses.findMany({ where: { schoolUserId }, orderBy: { purchaseDate: 'desc' } }),
      prisma.schoolSeatAssignments.findMany({ where: { schoolUserId } }),
    ]);

    return licenses.map((license) => {
      const assignedStudents = assignments
        .filter((assignment) => assignment.licenseId === license.id)
        .map((assignment) => ({
          studentId: assignment.studentId,
          studentEmail: assignment.studentEmail,
          studentName: assignment.studentName,
          assignedAt: assignment.assignedAt ? assignment.assignedAt.toISOString() : new Date().toISOString(),
        }));

      return {
        id: license.id,
        schoolUserId: license.schoolUserId,
        courseId: license.courseId,
        courseName: license.courseName,
        totalSeats: license.totalSeats,
        usedSeats: assignedStudents.length,
        purchaseDate: license.purchaseDate ? license.purchaseDate.toISOString() : new Date().toISOString(),
        expiresAt: license.expiresAt ? license.expiresAt.toISOString() : null,
        orderId: license.orderId,
        assignedStudents,
      };
    });
  };

  const createSchoolLicense = async (license: {
    id: string;
    schoolUserId: number;
    courseId: number;
    courseName: string;
    totalSeats: number;
    orderId: number;
    expiresAt: string | null;
  }) => {
    await prisma.schoolLicenses.create({ data: {
      id: license.id,
      schoolUserId: license.schoolUserId,
      courseId: license.courseId,
      courseName: license.courseName,
      totalSeats: license.totalSeats,
      orderId: license.orderId,
      expiresAt: license.expiresAt ? new Date(license.expiresAt) : null,
    } });
  };

  const getSchoolRosterStudent = async (schoolUserId: number, studentId: number) => {
    const student = await prisma.schoolRosterStudents.findFirst({
      where: { schoolUserId, studentId }
    });
    return student || undefined;
  };

  const getSchoolUploads = async (schoolUserId: number) => {
    return prisma.schoolStudentUploads.findMany({
      where: { schoolUserId },
      orderBy: { uploadedAt: 'desc' }
    });
  };

  const parseSchoolStudentCsv = (csvText: string) => {
    const rows = csvText
      .split(/\r?\n/)
      .map((row) => row.trim())
      .filter(Boolean);

    const header = rows.shift() || "";
    const normalizedHeader = header.toLowerCase().split(",").map((value) => value.trim());
    const emailIndex = normalizedHeader.findIndex((value) => value === "email");
    const firstNameIndex = normalizedHeader.findIndex((value) => value === "firstname" || value === "first_name" || value === "first name");
    const lastNameIndex = normalizedHeader.findIndex((value) => value === "lastname" || value === "last_name" || value === "last name");
    const moodleIdIndex = normalizedHeader.findIndex((value) => value === "moodleuserid" || value === "moodle_user_id" || value === "moodle id");

    if (emailIndex === -1) {
      throw new Error("CSV must include an email column.");
    }

    const parsedRows = rows.map((row, index) => {
      const columns = row.split(",").map((column) => column.trim());
      const email = columns[emailIndex] || "";
      const firstName = firstNameIndex >= 0 ? columns[firstNameIndex] || "" : "";
      const lastName = lastNameIndex >= 0 ? columns[lastNameIndex] || "" : "";
      const moodleUserId = moodleIdIndex >= 0 ? Number(columns[moodleIdIndex]) : NaN;

      return {
        rowNumber: index + 2,
        email,
        name: [firstName, lastName].filter(Boolean).join(" ").trim() || email.split("@")[0] || `Student ${index + 1}`,
        moodleUserId: Number.isFinite(moodleUserId) && moodleUserId > 0 ? moodleUserId : undefined,
      };
    });

    return parsedRows;
  };

  const resolveCheckoutTotals = async (params: {
    items: { programId: number; title: string; price: number }[];
    totalAmount: number;
    scholarshipCode?: string;
    user?: { id: number; email?: string | null; country?: string | null };
  }) => {
    let scholarshipRecord;
    if (params.scholarshipCode) {
      if (!params.user) {
        throw new Error("You must be logged in to use a scholarship code.");
      }
      scholarshipRecord = await storage.getScholarshipCode(params.scholarshipCode);
      const registrationCountry = await storage.getRegisteredCountry(params.user.id);
      assertScholarshipCodeForUser(scholarshipRecord, params.user, registrationCountry);
    }

    const pricing = calculateOrderTotalWithScholarship(params.items, scholarshipRecord);
    if (pricing.total !== params.totalAmount) {
      throw new Error("Order total does not match the applied scholarship discount.");
    }

    return { pricing, scholarshipRecord };
  };

  const recordPaymentEvent = async (orderId: number, status: string, message: string) => {
    const events = paymentEventsByOrderId.get(orderId) ?? [];
    const entry = {
      status,
      message,
      createdAt: new Date().toISOString(),
    };
    events.push(entry);
    paymentEventsByOrderId.set(orderId, events);
    await storage.updateOrder(orderId, { paymentNotes: events });
    return entry;
  };

  const buildOrderHistoryResponse = async (order: any) => {
    const items = await storage.getOrderItemsByOrderId(order.id);
    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const course = await getLmsCourseById(item.programId);
        return {
          id: item.id,
          title: course?.title || `Course ${item.programId}`,
          price: item.price,
          programId: item.programId,
        };
      }),
    );

    const paymentNotes = paymentEventsByOrderId.get(order.id) ?? order.paymentNotes ?? [];
    const remainingAmount = typeof order.remainingAmount === "number" ? order.remainingAmount : Math.max(order.totalAmount - (order.paidAmount ?? 0), 0);
    return {
      id: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      status: order.status,
      paymentStatus: order.paymentStatus ?? order.status,
      paymentProvider: order.paymentProvider ?? null,
      paymentRef: order.paymentRef ?? null,
      invoiceNumber: order.invoiceNumber ?? null,
      paidAmount: order.paidAmount ?? 0,
      remainingAmount,
      allowPartialPayment: order.allowPartialPayment ?? true,
      refundStatus: order.refundStatus ?? null,
      canRetryPayment: ["failed", "pending", "cancelled"].includes(String(order.paymentStatus ?? order.status).toLowerCase()),
      refundable: ["completed", "partial"].includes(String(order.paymentStatus ?? order.status).toLowerCase()) && remainingAmount === 0,
      paymentNotes,
      createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
      items: detailedItems,
    };
  };

  const finalizePaidOrder = async (orderRef: string, userId: string, tracker?: string) => {
    const inferredUserId = userId || orderRef.match(/^PF-(\d+)-/)?.[1] || "";
    const pending = await storage.getPendingPayment(orderRef);
    if (!pending) {
      const allOrders = await storage.getOrdersByUserId(inferredUserId);
      const existing = allOrders.find((order) => order.paymentRef === orderRef);
      if (existing && ["paid", "partial", "completed"].includes(String(existing.paymentStatus ?? existing.status).toLowerCase())) {
        return existing.id;
      }
      throw new Error("Pending payment not found");
    }

    const orderId = pending.orderId ?? Number(orderRef.match(/(\d+)$/)?.[1] || 0);
    const existingOrder = Number.isFinite(orderId) && orderId > 0 ? await storage.getOrderById(orderId) : undefined;
    if (!existingOrder) {
      throw new Error("Payment order not found");
    }

    const paidAmount = pending.amountToPay ?? pending.totalAmount;
    const remainingAmount = Math.max(pending.totalAmount - paidAmount, 0);
    const completed = remainingAmount === 0;

    await storage.updateOrder(existingOrder.id, {
      status: completed ? "completed" : "partial",
      paymentStatus: completed ? "paid" : "partial",
      paymentProvider: "PayFast",
      paymentRef: orderRef,
      paidAmount,
      remainingAmount,
      refundStatus: null,
    });

    const purchaserId = Number(pending.userId);
    const purchaserRole = Number.isFinite(purchaserId) ? await getStoredRoleByMoodleUserId(purchaserId) : null;
    const isSchoolPurchase = purchaserRole === "school";

    const postPaymentFailures: string[] = [];
    for (const item of pending.items) {
      if (isSchoolPurchase) {
        try {
          const course = await getLmsCourseById(item.programId);
          const licenseId = `school-license-${existingOrder.id}-${item.programId}-${randomUUID().slice(0, 8)}`;
          await createSchoolLicense({
            id: licenseId,
            schoolUserId: purchaserId,
            courseId: item.programId,
            courseName: course?.title || `Course ${item.programId}`,
            totalSeats: item.quantity ?? 1,
            orderId: existingOrder.id,
            expiresAt: null,
          });
        } catch (licenseError) {
          const message = licenseError instanceof Error ? licenseError.message : String(licenseError);
          console.error(`Failed to create school license for user ${pending.userId} and course ${item.programId} after payment ${orderRef}:`, licenseError);
          postPaymentFailures.push(`course ${item.programId}: ${message}`);
        }
        continue;
      }

      try {
        await enrolUserInCourse(Number(pending.userId), item.programId);
        await createCourseEnrollment(Number(pending.userId), item.programId);
      } catch (enrolError) {
        const message = enrolError instanceof Error ? enrolError.message : String(enrolError);
        console.error(`Failed to enrol user ${pending.userId} in course ${item.programId} after payment ${orderRef}:`, enrolError);
        postPaymentFailures.push(`course ${item.programId}: ${message}`);
      }
    }

    if (pending.scholarshipCode) {
      await storage.markScholarshipCodeUsed(pending.scholarshipCode, pending.userId);
    }

    await recordPaymentEvent(existingOrder.id, completed ? "paid" : "partial", tracker ? `Verified by tracker ${tracker}` : "Payment verified");
    if (postPaymentFailures.length > 0) {
      await recordPaymentEvent(
        existingOrder.id,
        isSchoolPurchase ? "license_pending" : "enrolment_pending",
        isSchoolPurchase
          ? `Payment captured but license creation failed and needs manual retry — ${postPaymentFailures.join("; ")}`
          : `Payment captured but Moodle enrolment failed and needs manual retry — ${postPaymentFailures.join("; ")}`,
      );
    } else if (isSchoolPurchase) {
      await recordPaymentEvent(existingOrder.id, "license_created", "School licenses created after successful payment");
    }
    await storage.deletePendingPayment(orderRef);
    return existingOrder.id;
  };

  const notificationIdFromKey = (key: string) => {
    let hash = 0;
    for (let index = 0; index < key.length; index += 1) {
      hash = ((hash << 5) - hash + key.charCodeAt(index)) | 0;
    }
    return Math.abs(hash) + 1;
  };

  const buildDashboardNotifications = async (input: { userId: number; email: string | null }) => {
    const notifications: Array<{
      id: number;
      title: string;
      message: string;
      createdAt: string;
      type: "system" | "order" | "support" | "course";
      actionUrl?: string;
    }> = [];

    const userOrders = await storage.getOrdersByUserId(String(input.userId));
    userOrders.slice(0, 5).forEach((order) => {
      notifications.push({
        id: notificationIdFromKey(`order-${input.userId}-${order.id}`),
        title: `Order #${order.id} ${order.status === "completed" ? "completed" : "updated"}`,
        message: `Your order total is $${(order.totalAmount / 100).toFixed(2)}.`,
        createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
        type: "order",
        actionUrl: "/dashboard/orders",
      });
    });

    if (input.email) {
      // TODO: Support ticket notifications - currently disabled due to separate DB systems
      // const tickets = await storage.getInquiriesByEmail(input.email);
      // tickets.slice(0, 5).forEach((ticket) => {
      //   notifications.push({
      //     id: notificationIdFromKey(`support-${input.userId}-${ticket.id}`),
      //     title: `Support ticket ${ticket.status === "new" ? "received" : ticket.status}`,
      //     message: ticket.subjectInterest || "Your support request has an update.",
      //     createdAt: ticket.createdAt ? new Date(ticket.createdAt).toISOString() : new Date().toISOString(),
      //     type: "support",
      //     actionUrl: "/dashboard/support",
      //   });
      // });
    }

    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const escapeCsvValue = (value: string | number | boolean | null | undefined) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const buildParentReportCsv = async (input: { parentId: number; email: string | null }) => {
    const childIds = await loadLinkedChildren(input.parentId);
    const parentNotifications = await buildDashboardNotifications({ userId: input.parentId, email: input.email });

    const rows: Array<Array<string | number | boolean | null | undefined>> = [
      ["Section", "Child Name", "Child Email", "Child Moodle ID", "Course Name", "Progress %", "Grade", "Raw Percentage", "Generated At"],
    ];

    if (childIds.length === 0) {
      rows.push(["summary", "No linked children", "", "", "", "", "", "", new Date().toISOString()]);
      rows.push(["alerts", "Unread or recent alerts", String(parentNotifications.length), "", "", "", "", "", new Date().toISOString()]);
      return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
    }

    for (const childId of childIds) {
      const storedUser = await getStoredUserByMoodleUserId(childId);
      const childName = [storedUser?.firstName, storedUser?.lastName].filter(Boolean).join(" ") || storedUser?.username || `Child ${childId}`;
      const childEmail = storedUser?.email || "Linked from Moodle";

      try {
        const grades = await getStudentGradesForDashboard(childId);
        if (grades.length === 0) {
          rows.push(["child", childName, childEmail, childId, "No courses found", "0", "N/A", "0", new Date().toISOString()]);
          continue;
        }

        for (const grade of grades) {
          rows.push([
            "child-course",
            childName,
            childEmail,
            childId,
            grade.courseName,
            Math.round(grade.progress),
            grade.grade,
            Math.round(grade.percentage),
            new Date().toISOString(),
          ]);
        }
      } catch (error) {
        console.error(`Failed to build report rows for child ${childId}:`, error);
        rows.push(["child-error", childName, childEmail, childId, "Unable to load Moodle data", "", "", "", new Date().toISOString()]);
      }
    }

    rows.push(["alerts", "Alerts count", String(parentNotifications.length), "", "", "", "", "", new Date().toISOString()]);

    return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
  };

  const calculateTrendData = (
    items: any[],
    period: string,
    getValue: (item: any) => number
  ): Array<{ date: string; amount: number }> => {
    const trends: Record<string, number> = {};
    const now = new Date();

    for (const item of items) {
      const itemDate = item.createdAt ? new Date(item.createdAt) : now;
      let key: string;

      if (period === "daily") {
        key = itemDate.toISOString().split("T")[0];
      } else if (period === "weekly") {
        const weekStart = new Date(itemDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        key = weekStart.toISOString().split("T")[0];
      } else if (period === "yearly") {
        key = itemDate.getFullYear().toString();
      } else {
        // monthly (default)
        key = `${itemDate.getFullYear()}-${String(itemDate.getMonth() + 1).padStart(2, "0")}`;
      }

      trends[key] = (trends[key] || 0) + getValue(item);
    }

    return Object.entries(trends)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-12); // Last 12 periods
  };

  const calculateLoginTrend = (users: any[]): Array<{ date: string; activeUsers: number }> => {
    const trends: Record<string, Set<string>> = {};
    const now = new Date();

    for (let i = 0; i < 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      trends[dateStr] = new Set();
    }

    for (const user of users) {
      if (user.lastLoginAt) {
        const loginDate = new Date(user.lastLoginAt).toISOString().split("T")[0];
        if (trends[loginDate]) {
          trends[loginDate].add(user.id);
        }
      }
    }

    return Object.entries(trends)
      .map(([date, userSet]) => ({ date, activeUsers: userSet.size }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const publicContactSubmissionSchema = z.object({
    route: z.enum(["school_partnership", "general_enquiry", "technical_support"]),
    fullName: z.string().min(1).max(100),
    email: z.string().email(),
    honeypot: z.string().optional(),
    recaptchaToken: z.string().optional(),
    consultation_type: z.string().optional(),
    firstName: z.string().optional(),
    role: z.string().optional(),
    schoolName: z.string().optional(),
    country: z.string().optional(),
    studentCount: z.string().optional(),
    subject: z.string().optional(),
    userType: z.string().optional(),
    message: z.string().optional(),
    problemType: z.string().optional(),
    accountEmail: z.string().optional(),
    device: z.string().optional(),
    browser: z.string().optional(),
    attachmentName: z.string().optional(),
  });

  const sendTransactionalEmail = async (payload: {
    to: string | string[];
    subject: string;
    text: string;
    cc?: string[];
    replyTo?: string;
  }) => {
    if (!env.support.resendApiKey || !env.support.fromEmail) {
      return;
    }

    const response = await fetch("https://api.resend.com/emails", {
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

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(`Failed to send email (${response.status}) ${details}`.trim());
    }
  };

  const verifyRecaptchaScore = async (token?: string) => {
    if (!env.support.recaptchaSecretKey) return { ok: true, score: 1 };
    if (!token) return { ok: false, score: 0 };

    const params = new URLSearchParams();
    params.set("secret", env.support.recaptchaSecretKey);
    params.set("response", token);

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) return { ok: false, score: 0 };
    const payload = await response.json() as { success?: boolean; score?: number };
    return { ok: Boolean(payload.success), score: payload.score ?? 0 };
  };

  const checkWorkbookPaymentConfirmation = async (email: string) => {
    try {
      const result = await prisma.$queryRawUnsafe<Array<{ confirmed: boolean }>>(
        `SELECT true AS confirmed
         FROM edume_purchases
         WHERE lower(email) = lower($1)
           AND status IN ('paid', 'completed', 'confirmed')
         LIMIT 1`,
        email,
      );
      return Boolean(result[0]?.confirmed);
    } catch {
      return false;
    }
  };

  return {
    notificationReadByUser,
    contactRateLimitByIp,
    schoolLicensesByUser,
    schoolUploadsByUser,
    schoolRosterByUser,
    paymentEventsByOrderId,
    aiSupportWebhookUrl,
    quizAttemptWebhookUrl,
    quizAttemptPayloadSchema,
    extractAiReply,
    loadLinkedChildren,
    getClientIp,
    getSchoolLicenses,
    createSchoolLicense,
    getSchoolRosterStudent,
    getSchoolUploads,
    parseSchoolStudentCsv,
    resolveCheckoutTotals,
    recordPaymentEvent,
    buildOrderHistoryResponse,
    finalizePaidOrder,
    notificationIdFromKey,
    buildDashboardNotifications,
    escapeCsvValue,
    buildParentReportCsv,
    calculateTrendData,
    calculateLoginTrend,
    publicContactSubmissionSchema,
    sendTransactionalEmail,
    verifyRecaptchaScore,
    checkWorkbookPaymentConfirmation,
  };
}
