import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";

import { randomUUID } from "crypto";
import { storage } from "../db/storage.js";
import {
  insertInquirySchema,
} from "../../shared/schema.js";
import { getLmsCourseById, getLmsCourseBySlug, getLmsCourseDetail, getLmsCourses } from "../services/moodle/moodle.js";
import { createCourseEnrollment, getUserCourseEnrollments } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";


export function registerMiscRoutes(app: Express, ctx: RouteContext) {
  const {
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
  } = ctx;

  // === INQUIRIES ===
  app.post("/api/contact-submissions", async (req, res) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || "unknown";
      const now = Date.now();
      const oneHourAgo = now - (60 * 60 * 1000);
      const recent = (contactRateLimitByIp.get(ip) || []).filter((ts) => ts > oneHourAgo);
      if (recent.length >= 3) {
        return res.status(429).json({ message: "Too many submissions. Please try again in one hour." });
      }

      const input = publicContactSubmissionSchema.parse(req.body);
      if (input.honeypot && input.honeypot.trim()) {
        return res.status(200).json({ success: true });
      }

      const recaptcha = await verifyRecaptchaScore(input.recaptchaToken);
      if (!recaptcha.ok || recaptcha.score < 0.3) {
        return res.status(400).json({ message: "We could not verify your submission. Please try again." });
      }

      recent.push(now);
      contactRateLimitByIp.set(ip, recent);

      const subjectByRoute = {
        school_partnership: `[School Enquiry] ${input.schoolName || "Unknown School"} — ${input.country || "Unknown Country"}`,
        general_enquiry: input.subject || "General Enquiry",
        technical_support: `[TECH] ${input.problemType || "Technical Support"}`,
      } as const;

      const workbookPaidConfirmed =
        input.route === "technical_support" &&
        input.problemType === "Workbook or past paper download issue" &&
        await checkWorkbookPaymentConfirmation(input.accountEmail || input.email);

      const urgentSupport = input.route === "technical_support" && (
        ["Payment issue", "Cannot log in", "Course access problem"].includes(input.problemType || "") ||
        workbookPaidConfirmed
      );
      const subject = urgentSupport
        ? `[URGENT] ${subjectByRoute.technical_support}`
        : subjectByRoute[input.route];
      const prioritySupport = input.route === "general_enquiry" && (
        input.userType === "Teacher" || input.subject === "Technical Problem"
      );
      const routedSubject = prioritySupport ? `[PRIORITY] ${subject}` : subject;

      const details = [
        `consultation_type=${input.route}`,
        input.userType ? `user_type=${input.userType}` : "",
        input.role ? `role=${input.role}` : "",
        input.schoolName ? `school_name=${input.schoolName}` : "",
        input.studentCount ? `student_count=${input.studentCount}` : "",
        input.problemType ? `problem_type=${input.problemType}` : "",
        input.accountEmail ? `account_email=${input.accountEmail}` : "",
        input.device ? `device=${input.device}` : "",
        input.browser ? `browser=${input.browser}` : "",
        input.attachmentName ? `attachment=${input.attachmentName}` : "",
      ].filter(Boolean).join("\n");

      await storage.createInquiry({
        type: "contact",
        name: input.fullName,
        email: input.email.toLowerCase(),
        phone: null,
        role: input.userType || input.role || null,
        gradeLevel: "",
        subjectInterest: routedSubject,
        learningMode: input.route,
        message: [details, input.message || ""].filter(Boolean).join("\n\n"),
      });

      await prisma.edumeContactSubmissions.create({ data: {
        consultationType: input.route,
        name: input.fullName,
        email: input.email.toLowerCase(),
        country: input.country || null,
        subject: routedSubject,
        message: input.message || null,
        schoolName: input.schoolName || null,
        studentCount: input.studentCount || null,
        device: input.device || null,
        problemType: input.problemType || null,
      } });

      const body = [
        `Name: ${input.fullName}`,
        `Email: ${input.email}`,
        input.userType ? `User Type: ${input.userType}` : "",
        input.role ? `Role: ${input.role}` : "",
        input.schoolName ? `School: ${input.schoolName}` : "",
        input.country ? `Country: ${input.country}` : "",
        input.studentCount ? `Cambridge Students: ${input.studentCount}` : "",
        input.subject ? `Subject: ${input.subject}` : "",
        input.problemType ? `Problem Type: ${input.problemType}` : "",
        input.accountEmail ? `Account Email: ${input.accountEmail}` : "",
        input.device ? `Device: ${input.device}` : "",
        input.browser ? `Browser: ${input.browser}` : "",
        input.attachmentName ? `Attachment: ${input.attachmentName}` : "",
        "",
        "Message:",
        input.message || "(no message provided)",
      ].filter(Boolean).join("\n");

      if (input.route === "school_partnership") {
        await sendTransactionalEmail({
          to: env.support.schoolInboxEmail,
          subject: subjectByRoute.school_partnership,
          text: body,
          replyTo: input.email,
        });

        await sendTransactionalEmail({
          to: input.email,
          subject: "EduMeUp School Strategy Session — We will be in touch shortly",
          text: `Dear ${input.firstName || "there"},

Thank you for requesting an EduMeUp School Strategy Session.
Our Chief Adviser will contact you personally within 1 working day with available session times.

Before the call, you may review school partnership details here:
https://edumeup.com/for-schools

Best regards,
EduMeUp`,
        });
      }

      if (input.route === "general_enquiry") {
        await sendTransactionalEmail({
          to: env.support.supportInboxEmail,
          subject: routedSubject,
          text: body,
          replyTo: input.email,
        });
      }

      if (input.route === "technical_support") {
        const cc: string[] = [];
        if ((input.problemType === "Payment issue" || urgentSupport) && env.support.financeCcEmail) {
          cc.push(env.support.financeCcEmail);
        }
        if (workbookPaidConfirmed && env.support.developerCcEmail) {
          cc.push(env.support.developerCcEmail);
        }
        await sendTransactionalEmail({
          to: env.support.supportInboxEmail,
          cc,
          subject,
          text: body,
          replyTo: input.email,
        });
      }

      return res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to submit contact form" });
    }
  });

  // ── 4.22 — Public Course Search ─────────────────────────────
  // GET /api/search/courses?q=physics&category=O-Level&sort=title&page=1&limit=20
  app.get("/api/search/courses", async (req, res) => {
    try {
      const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const category = typeof req.query.category === "string" ? req.query.category.trim() : "";
      const sort = typeof req.query.sort === "string" ? req.query.sort : "title";
      const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
      const limit = Math.min(50, Math.max(1, parseInt(String(req.query.limit || "20"), 10)));
      const offset = (page - 1) * limit;

      const validSorts: Record<string, object> = {
        title: { fullname: "asc" as const },
        price_asc: { price: "asc" as const },
        price_desc: { price: "desc" as const },
        newest: { createdAt: "desc" as const },
      };
      const orderBy = validSorts[sort] ?? { fullname: "asc" as const };

      const where: any = { isVisible: true };
      if (q) {
        where.OR = [
          { fullname: { contains: q, mode: "insensitive" } },
          { shortname: { contains: q, mode: "insensitive" } },
          { summary: { contains: q, mode: "insensitive" } },
          { categoryName: { contains: q, mode: "insensitive" } },
        ];
      }
      if (category) {
        where.categoryName = { contains: category, mode: "insensitive" };
      }

      const [courses, total] = await Promise.all([
        (prisma as any).courseCatalog.findMany({ where, orderBy, skip: offset, take: limit }),
        (prisma as any).courseCatalog.count({ where }),
      ]);

      // Fetch distinct categories for filter UI
      const categories = await (prisma as any).courseCatalog.findMany({
        where: { isVisible: true, categoryName: { not: null } },
        select: { categoryName: true },
        distinct: ["categoryName"],
        orderBy: { categoryName: "asc" },
      });

      return res.json({
        courses: courses.map((c: any) => ({
          id: c.id,
          moodleCourseId: c.moodleCourseId,
          title: c.fullname,
          shortname: c.shortname,
          summary: c.summary,
          category: c.categoryName,
          price: parseFloat(c.price.toString()),
          isVisible: c.isVisible,
          lastSyncedAt: c.lastSyncedAt?.toISOString() ?? null,
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        categories: categories.map((c: any) => c.categoryName).filter(Boolean),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Search failed" });
    }
  });

  // GET /api/search/users — admin only, full-text across name/email/username
  app.get("/api/search/users", async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
      const role = typeof req.query.role === "string" ? req.query.role.trim() : "";
      const page = Math.max(1, parseInt(String(req.query.page || "1"), 10));
      const limit = Math.min(100, Math.max(1, parseInt(String(req.query.limit || "20"), 10)));
      const offset = (page - 1) * limit;

      const where: any = {};
      if (q) {
        where.OR = [
          { username: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
        ];
      }
      if (role && ["admin", "student", "parent", "school"].includes(role)) {
        where.role = role;
      }

      const [users, total] = await Promise.all([
        prisma.user.findMany({ where, orderBy: { createdAt: "desc" }, skip: offset, take: limit }),
        prisma.user.count({ where }),
      ]);

      return res.json({
        users: users.map((u: any) => ({
          id: u.id,
          moodleUserId: u.moodleUserId,
          username: u.username,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          role: u.role,
          isSuspended: u.isSuspended,
          lastLoginAt: u.lastLoginAt?.toISOString() ?? null,
          createdAt: u.createdAt.toISOString(),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Search failed" });
    }
  });

  // GET /api/admin/dlq — view dead letter queue jobs
  app.get("/api/admin/dlq", async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const jobs = await prisma.deadLetterJob.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      return res.json({ jobs });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to fetch DLQ" });
    }
  });

  // POST /api/admin/dlq/:id/replay — re-enqueue a DLQ job
  app.post("/api/admin/dlq/:id/replay", async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const { replayDeadLetterJob } = await import("../services/job-worker.js");
      const newId = await replayDeadLetterJob(req.params.id);
      return res.json({ success: true, newJobId: newId });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Replay failed" });
    }
  });

  // GET /api/admin/jobs — view background job queue status
  app.get("/api/admin/jobs", async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    try {
      const status = typeof req.query.status === "string" ? req.query.status : undefined;
      const where = status ? { status } : {};
      const [jobs, counts] = await Promise.all([
        prisma.backgroundJob.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 }),
        prisma.backgroundJob.groupBy({ by: ["status"], _count: { id: true } }),
      ]);
      return res.json({
        jobs,
        summary: Object.fromEntries(counts.map((c: any) => [c.status, c._count.id])),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to fetch jobs" });
    }
  });

}
