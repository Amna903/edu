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

}
