
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { checkoutRequestSchema, contactSubmissions, insertInquirySchema, loginInputSchema, markNotificationReadInputSchema, parentLinkChildInputSchema, passwordChangeInputSchema, profileUpdateInputSchema, registerInputSchema } from "../shared/schema.js";
import { getLmsCourseById, getLmsCourseBySlug, getLmsCourses } from "./moodle.js";
import { changeMoodlePassword, fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "./moodle-auth.js";
import { enrolUserInCourse } from "./moodle-commerce.js";
import { getStudentActivityTimelineForDashboard, getStudentCertificatesForDashboard, getStudentGradesForDashboard, getUserCoursesForDashboard } from "./moodle-dashboard.js";
import { buildOrigin, createSafepayCheckout } from "./payments.js";
import { env } from "./config.js";
import { prisma } from "./prisma.js";
import { db } from "./db.js";
import { getStoredUserByMoodleUserId, linkParentToChild, syncUserFromMoodleSession } from "./user-store.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const notificationReadByUser = new Map<number, Set<number>>();
  const contactRateLimitByIp = new Map<string, number[]>();

  const aiSupportWebhookUrl =
    process.env.AI_SUPPORT_WEBHOOK_URL ??
    "https://n8n.edumeup.com/webhook/f0a0ac6f-f667-404a-9b13-74d11dd68632";

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
    const { getLinkedChildren: resolveLinkedChildren } = await import("./user-store.js");
    return resolveLinkedChildren(parentId);
  };

  const finalizePaidOrder = async (orderRef: string, tracker?: string) => {
    const pending = await storage.getPendingPayment(orderRef);
    if (!pending) {
      throw new Error("Pending payment not found");
    }

    const existingOrders = await storage.getOrdersByUserId(pending.userId);
    const alreadyCreated = existingOrders.find((order) => order.status === "completed" && String(order.id) === orderRef.split("-").at(-1));
    if (alreadyCreated) {
      return alreadyCreated.id;
    }

    const order = await storage.createOrder({
      userId: pending.userId,
      totalAmount: pending.totalAmount,
      status: "completed",
    });

    for (const item of pending.items) {
      await enrolUserInCourse(Number(pending.userId), item.programId);
      await storage.createOrderItem({
        orderId: order.id,
        programId: item.programId,
        price: item.price,
      });
      await storage.createEnrollment({
        userId: pending.userId,
        programId: item.programId,
      });
    }

    await storage.deletePendingPayment(orderRef);
    return order.id;
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

      await db.insert(contactSubmissions).values({
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
      });

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

  app.get("/api/auth/verify-partner-code", async (req, res) => {
    const rawCode = typeof req.query.code === "string" ? req.query.code.trim().toUpperCase() : "";
    if (!rawCode) {
      return res.status(400).json({ message: "Partner code is required" });
    }

    // TODO: replace with edume_school_partners table lookup.
    const partnerCodes: Record<string, { schoolName: string }> = {
      SCH123: { schoolName: "EduMeUp Partner School" },
      CAMB2026: { schoolName: "Cambridge Excellence School" },
      OLVL001: { schoolName: "Global O-Level Academy" },
    };

    const match = partnerCodes[rawCode];
    if (!match) {
      return res.json({ valid: false });
    }

    return res.json({
      valid: true,
      schoolName: match.schoolName,
    });
  });

  app.post(api.auth.login.path, async (req, res) => {
    try {
      const input = loginInputSchema.parse(req.body);
      const result = await loginWithMoodle(input);
      req.session.moodleToken = result.token;
      req.session.moodlePrivateToken = result.privateToken ?? undefined;
      req.session.user = result.user;
      res.json(result.user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      return res.status(400).json({
        message: err instanceof Error ? err.message : "Login failed",
      });
    }
  });

  app.post(api.auth.register.path, async (req, res) => {
    try {
      const input = registerInputSchema.parse(req.body);
      const result = await registerWithMoodle(input);

      if (result.user) {
        const loginResult = await loginWithMoodle({
          username: input.username,
          password: input.password,
        });
        req.session.moodleToken = loginResult.token;
        req.session.moodlePrivateToken = loginResult.privateToken ?? undefined;
        req.session.user = loginResult.user;
      }

      res.status(201).json({
        success: true,
        user: result.user,
        requiresEmailConfirmation: result.requiresEmailConfirmation,
        message: result.message,
        dashboardPath: result.user ? `/dashboard/${result.user.role}` : null,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      return res.status(400).json({
        message: err instanceof Error ? err.message : "Registration failed",
      });
    }
  });

  app.get(api.auth.me.path, async (req, res) => {
    try {
      if (!req.session.moodleToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await fetchCurrentUser(req.session.moodleToken);
      req.session.user = user;
      res.json(user);
    } catch (err) {
      req.session.destroy(() => undefined);
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.get(api.dashboard.studentCertificates.path, async (req, res) => {
    try {
      if (!req.session.user || !req.session.moodleToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const certificates = await getStudentCertificatesForDashboard(req.session.moodleToken, req.session.user.id);
      res.json(certificates);
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load certificates" });
    }
  });

  app.post(api.auth.logout.path, async (req, res) => {
    req.session.destroy(() => undefined);
    res.json({ success: true });
  });

  app.post("/api/support/ai", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ error: "Not authenticated" });
      }

      if (req.session.user.role !== "student") {
        return res.status(403).json({ error: "Only students can use AI support chat" });
      }

      const msg = typeof req.body?.msg === "string" ? req.body.msg.trim() : "";
      if (!msg) {
        return res.status(400).json({ error: "Message is required" });
      }

      const webhookUrl = new URL(aiSupportWebhookUrl);
      webhookUrl.searchParams.set("student_id", String(req.session.user.id));
      webhookUrl.searchParams.set("msg", msg);

      const webhookResponse = await fetch(webhookUrl.toString(), {
        method: "GET",
        headers: { Accept: "application/json, text/plain, */*" },
      });

      const rawText = await webhookResponse.text();
      let payload: unknown = rawText;
      if (rawText.trim()) {
        try {
          payload = JSON.parse(rawText);
        } catch {
          payload = rawText;
        }
      }

      if (!webhookResponse.ok) {
        return res.status(502).json({
          error: "AI support service is unavailable",
          status: webhookResponse.status,
          contentType: webhookResponse.headers.get("content-type") ?? null,
          details: typeof payload === "string" ? payload : undefined,
        });
      }

      const reply = extractAiReply(payload);
      if (!reply) {
        return res.status(502).json({
          error: "AI service returned no reply text",
          status: webhookResponse.status,
          contentType: webhookResponse.headers.get("content-type") ?? null,
          details: typeof payload === "string" ? payload.slice(0, 500) : JSON.stringify(payload).slice(0, 500),
        });
      }

      return res.json({ ok: true, reply });
    } catch (err) {
      return res.status(500).json({
        error: err instanceof Error ? err.message : "Failed to reach AI service",
      });
    }
  });

  app.post(api.auth.updateProfile.path, async (req, res) => {
    try {
      if (!req.session.user || !req.session.moodleToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const input = profileUpdateInputSchema.parse(req.body);
      const usernameAsEmail = /\S+@\S+\.\S+/.test(req.session.user.username) ? req.session.user.username : "";
      const lockedEmail = req.session.user.email || input.email || usernameAsEmail;
      if (!lockedEmail) {
        return res.status(400).json({ message: "Email is missing for this account. Please contact support." });
      }
      await updateMoodleProfile(req.session.user.id, {
        firstname: input.firstname,
        lastname: input.lastname,
        email: lockedEmail,
        city: input.city,
        country: input.country,
        phone: input.phone,
        description: input.description,
      }, req.session.moodleToken);

      const user = await fetchCurrentUser(req.session.moodleToken);
      req.session.user = user;
      res.json(user);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      const message = err instanceof Error ? err.message : "Profile update failed";
      if (req.session.user) {
        const currentUser = req.session.user as any;
        const fallbackProfile = await syncUserFromMoodleSession({
          moodleUserId: currentUser.id,
          username: currentUser.username,
          role: currentUser.role,
          email: currentUser.email || req.body?.email || null,
          firstName: req.body?.firstname || currentUser.firstname || null,
          lastName: req.body?.lastname || currentUser.lastname || null,
          profileImage: currentUser.profileImageUrl || null,
        });

        const user = {
          ...currentUser,
          firstname: fallbackProfile.firstName || currentUser.firstname,
          lastname: fallbackProfile.lastName || currentUser.lastname,
          email: fallbackProfile.email || currentUser.email,
          city: req.body?.city || currentUser.city || null,
          country: req.body?.country || currentUser.country || null,
          phone: req.body?.phone || currentUser.phone || null,
          description: req.body?.description || currentUser.description || null,
        };
        req.session.user = user;
        return res.json(user);
      }

      return res.status(400).json({
        message,
      });
    }
  });

  app.post(api.auth.changePassword.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const input = passwordChangeInputSchema.parse(req.body);
      await changeMoodlePassword({
        username: req.session.user.username,
        userId: req.session.user.id,
        currentPassword: input.currentPassword,
        newPassword: input.newPassword,
      });

      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      return res.status(400).json({
        message: err instanceof Error ? err.message : "Password change failed",
      });
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const input = insertInquirySchema.parse(req.body);
      // Ensure the email matches the authenticated user's email
      const inquiryData = { ...input, email: req.session.user.email || input.email };
      const inquiry = await storage.createInquiry(inquiryData);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.inquiries.list.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      if (req.session.user.role === "admin") {
        const allInquiries = await storage.getAllInquiries();
        return res.json(allInquiries);
      }

      const email = req.session.user.email?.toLowerCase();
      if (!email) {
        return res.json([]);
      }

      const inquiries = await storage.getInquiriesByEmail(email);
      res.json(inquiries);
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load support tickets" });
    }
  });

  app.post("/api/inquiries/:id/reply", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const ticketId = Number(req.params.id);
      if (!Number.isFinite(ticketId)) {
        return res.status(400).json({ message: "Invalid ticket id" });
      }

      const replyMessage = typeof req.body?.message === "string" ? req.body.message.trim() : "";
      if (!replyMessage) {
        return res.status(400).json({ message: "Reply message is required" });
      }

      const ticket = await storage.getInquiryById(ticketId);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      const userEmail = req.session.user.email?.toLowerCase() || "";
      const ticketEmail = ticket.email?.toLowerCase() || "";
      const isAdmin = req.session.user.role === "admin";
      const isOwner = userEmail && ticketEmail && userEmail === ticketEmail;

      if (!isAdmin && !isOwner) {
        return res.status(403).json({ message: "You are not allowed to reply to this ticket" });
      }

      const authorName = req.session.user.fullname || req.session.user.username || (isAdmin ? "Support" : "Customer");
      const previousMessage = ticket.message ?? "";
      const replyPrefix = isAdmin ? "Support Reply" : "Customer Reply";
      const mergedMessage = previousMessage
        ? `${previousMessage}\n\n--- ${replyPrefix} (${authorName}) ---\n${replyMessage}`.trim()
        : `${replyMessage}`;

      const updated = await storage.updateInquiry(ticketId, {
        message: mergedMessage,
        status: isAdmin ? "contacted" : "new",
      });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to send reply" });
    }
  });

  // === RESOURCES ===
  app.get(api.resources.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const subject = req.query.subject as string | undefined;
    const resources = await storage.getResources(category, subject);
    res.json(resources);
  });

  app.get(api.resources.get.path, async (req, res) => {
    const resource = await storage.getResource(Number(req.params.id));
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  });

  // === PROGRAMS ===
  app.get(api.programs.list.path, async (req, res) => {
    const programs = await storage.getPrograms();
    res.json(programs);
  });

  app.get(api.programs.get.path, async (req, res) => {
    console.log("Fetching program with slug:", req.params.slug);
    const program = await storage.getProgramBySlug(req.params.slug);
    console.log("Program found:", program);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    res.json(program);
  });

  app.get(api.lmsCourses.list.path, async (_req, res) => {
    try {
      const courses = await getLmsCourses();
      res.json(courses);
    } catch (error) {
      console.error("Failed to fetch LMS courses:", error);
      res.status(500).json({ message: "Failed to fetch LMS courses" });
    }
  });

  app.get(api.lmsCourses.get.path, async (req, res) => {
    try {
      const course = await getLmsCourseBySlug(req.params.slug);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Failed to fetch LMS course:", error);
      res.status(500).json({ message: "Failed to fetch LMS course" });
    }
  });

  // === ORDERS & CART ===
  app.post("/api/orders", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { items, totalAmount } = checkoutRequestSchema.parse(req.body);
      const userId = String(req.session.user.id);
      const order = await storage.createOrder({ userId, totalAmount, status: "completed" });
      const isSchoolPurchase = req.session.user.role === "school";

      for (const item of items) {
        if (!isSchoolPurchase) {
          await enrolUserInCourse(req.session.user.id, item.programId);
        }

        await storage.createOrderItem({
          orderId: order.id,
          programId: item.programId,
          price: item.price
        });

        if (!isSchoolPurchase) {
          await storage.createEnrollment({
            userId,
            programId: item.programId
          });
        }
      }

      const response = {
        id: order.id,
        userId: order.userId,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
        items: items.map((item) => ({
          id: item.programId,
          title: item.title,
          price: item.price,
          programId: item.programId,
        })),
      };

      res.status(201).json(response);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to process order" });
    }
  });

  app.post(api.payments.init.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { items, totalAmount } = api.payments.init.input.parse(req.body);
      const isSingleCourse = items.length === 1;
      const orderRef = isSingleCourse
        ? `${items[0].programId}-${req.session.user.id}`
        : `${req.session.user.id}-${Date.now()}`;
      await storage.createPendingPayment({
        orderRef,
        userId: String(req.session.user.id),
        items,
        totalAmount,
        createdAt: new Date(),
      });

      const origin = env.app.publicUrl || buildOrigin(req.get("host") || "localhost:3001", req.protocol);
      const payment = await createSafepayCheckout({
        orderRef,
        items,
        totalAmount,
        origin,
        cancelPath: "/cart",
      });

      res.json({
        checkoutUrl: payment.checkoutUrl,
        orderRef,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: err instanceof Error ? err.message : "Payment init failed" });
    }
  });

  app.post(api.payments.verify.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { orderRef, tracker } = api.payments.verify.input.parse(req.body);
      const orderId = await finalizePaidOrder(orderRef, tracker);
      res.json({ success: true, orderId });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({ message: err instanceof Error ? err.message : "Payment verification failed" });
    }
  });

  app.post(api.payments.webhook.path, async (req, res) => {
    try {
      const notification = req.body?.data?.notification;
      const state = notification?.state;
      const orderRef = notification?.metadata?.order_id;
      const tracker = notification?.tracker;

      if (state === "PAID" && orderRef) {
        await finalizePaidOrder(orderRef, tracker);
        return res.json({ status: "success" });
      }

      return res.json({ status: "ignored" });
    } catch (err) {
      res.status(500).json({ status: "failed" });
    }
  });

  app.get(api.orders.list.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const orders = await storage.getOrdersByUserId(String(req.session.user.id));
    const response = await Promise.all(
      orders.map(async (order) => {
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

        return {
          id: order.id,
          userId: order.userId,
          totalAmount: order.totalAmount,
          status: order.status,
          createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
          items: detailedItems,
        };
      }),
    );

    res.json(response);
  });

  app.get(api.dashboard.notifications.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const notifications = await buildDashboardNotifications({
      userId: req.session.user.id,
      email: req.session.user.email,
    });

    const readIds = notificationReadByUser.get(req.session.user.id) ?? new Set<number>();

    res.json({
      notifications: notifications.map((notification) => ({
        ...notification,
        isRead: readIds.has(notification.id),
      })),
    });
  });

  app.patch(api.dashboard.markNotificationRead.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { notificationId } = markNotificationReadInputSchema.parse(req.body);
    const existingIds = notificationReadByUser.get(req.session.user.id) ?? new Set<number>();
    existingIds.add(notificationId);
    notificationReadByUser.set(req.session.user.id, existingIds);

    res.json({ success: true });
  });

  app.get(api.dashboard.student.path, async (req, res) => {
    if (!req.session.user || !req.session.moodleToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    let courses: any[] = [];
    let grades: any[] = [];
    let activities: any[] = [];

    const moodleUrl = env.moodle.baseUrl;

    try {
      const [coursesRes, gradesRes, activitiesRes] = await Promise.all([
        getUserCoursesForDashboard(req.session.moodleToken, req.session.user.id),
        getStudentGradesForDashboard(req.session.user.id, req.session.moodleToken),
        getStudentActivityTimelineForDashboard(req.session.moodleToken, req.session.user.id),
      ]);
      courses = coursesRes;
      grades = gradesRes;
      activities = activitiesRes;
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      // Try to at least get courses if the Promise.all failed
      try {
        courses = await getUserCoursesForDashboard(req.session.moodleToken, req.session.user.id);
      } catch (innerErr) {
        console.error("Fallback courses fetch error:", innerErr);
      }
    }

    const courseRows = courses.map((course: any) => {
      const grade = grades.find((item) => item.courseId === course.id);
      return {
        id: course.id,
        title: course.fullname,
        shortName: course.shortname || "",
        progress: course.progress || 0,
        completed: Boolean(course.completed),
        grade: grade?.grade || null,
        percentage: grade?.percentage ?? null,
        imageUrl: (() => {
          const rawUrl = course.courseimage || (course.overviewfiles && course.overviewfiles[0]?.fileurl) || null;
          if (rawUrl && rawUrl.includes("webservice/pluginfile.php")) {
            return `${rawUrl}${rawUrl.includes("?") ? "&" : "?"}wstoken=${req.session.moodleToken}`;
          }
          return rawUrl;
        })(),
        lmsCourseUrl: `${moodleUrl}/course/view.php?id=${course.id}`,
      };
    });

    const averageProgress = courseRows.length === 0
      ? 0
      : Math.round(courseRows.reduce((sum, course) => sum + course.progress, 0) / courseRows.length);

    res.json({
      stats: {
        enrolledCourses: courseRows.length,
        completedCourses: courseRows.filter((course) => course.completed).length,
        averageProgress,
      },
      courses: courseRows,
      activities,
    });
  });

  app.post(api.dashboard.parentLinkChild.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "parent") {
      return res.status(403).json({ message: "Parent access required" });
    }

    const input = parentLinkChildInputSchema.parse(req.body);
    await linkParentToChild(req.session.user.id, input.childMoodleUserId);
    res.json({ success: true });
  });

  app.get(api.dashboard.parent.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "parent") {
      return res.status(403).json({ message: "Parent access required" });
    }

    const childIds = await loadLinkedChildren(req.session.user.id);
    const children = await Promise.all(
      childIds.map(async (childId) => {
        try {
          const grades = await getStudentGradesForDashboard(childId);
          const storedUser = await getStoredUserByMoodleUserId(childId);
          return {
            id: childId,
            moodleUserId: childId,
            name: [storedUser?.firstName, storedUser?.lastName].filter(Boolean).join(" ") || storedUser?.username || `Child ${childId}`,
            email: storedUser?.email || "Linked from Moodle",
            courses: grades.map((grade) => ({
              id: grade.courseId,
              courseName: grade.courseName,
              progress: grade.progress,
              grade: grade.grade,
              percentage: grade.percentage,
            })),
          };
        } catch (err) {
          console.error(`Failed to fetch dashboard data for child ${childId}:`, err);
          const storedUser = await getStoredUserByMoodleUserId(childId);
          return {
            id: childId,
            moodleUserId: childId,
            name: [storedUser?.firstName, storedUser?.lastName].filter(Boolean).join(" ") || storedUser?.username || `Child ${childId}`,
            email: storedUser?.email || "Linked from Moodle",
            courses: [],
          };
        }
      }),
    );

    res.json({ children });
  });

  app.get(api.dashboard.parentReport.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "parent") {
      return res.status(403).json({ message: "Parent access required" });
    }

    try {
      const csv = await buildParentReportCsv({
        parentId: req.session.user.id,
        email: req.session.user.email,
      });

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="parent-dashboard-report-${req.session.user.id}.csv"`);
      res.send(`\ufeff${csv}`);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Failed to generate report" });
    }
  });

  app.get(api.dashboard.school.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "school") {
      return res.status(403).json({ message: "School access required" });
    }

    const orders = await storage.getOrdersByUserId(String(req.session.user.id));
    const licenses = await Promise.all(
      orders.map(async (order) => {
        const items = await storage.getOrderItemsByOrderId(order.id);
        return Promise.all(
          items.map(async (item) => {
            const course = await getLmsCourseById(item.programId);
            return {
              courseId: item.programId,
              courseName: course?.title || `Course ${item.programId}`,
              assignedSeats: 1,
              totalSeats: 1,
            };
          }),
        );
      }),
    );

    const flatLicenses = licenses.flat();
    res.json({
      stats: {
        purchasedSeats: flatLicenses.length,
        assignedSeats: flatLicenses.reduce((sum, license) => sum + license.assignedSeats, 0),
        activeCourses: new Set(flatLicenses.map((license) => license.courseId)).size,
      },
      licenses: flatLicenses,
    });
  });

  app.post(api.dashboard.schoolPurchaseSeats.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const input = api.dashboard.schoolPurchaseSeats.input.parse(req.body);
      const course = await getLmsCourseById(input.courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (typeof course.price !== "number" || course.price <= 0) {
        return res.status(400).json({ message: "This course is not configured for seat purchase" });
      }

      const totalAmount = course.price * input.seats;
      const order = await storage.createOrder({
        userId: String(req.session.user.id),
        totalAmount,
        status: "completed",
      });

      for (let index = 0; index < input.seats; index += 1) {
        await storage.createOrderItem({
          orderId: order.id,
          programId: course.id,
          price: course.price,
        });
      }

      res.status(201).json({ success: true, orderId: order.id });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to purchase seats" });
    }
  });

  app.get(api.dashboard.admin.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const courses = await getUserCoursesForDashboard(req.session.moodleToken || "", req.session.user.id);
    const allOrders = await storage.getOrdersByUserId(String(req.session.user.id));
    res.json({
      stats: {
        totalUsers: 1,
        totalOrders: allOrders.length,
        totalRevenue: allOrders.reduce((sum, order) => sum + order.totalAmount, 0),
        activeCourses: courses.length,
      },
      courses: courses.map((course: any) => ({
        id: course.id,
        title: course.fullname,
        progress: course.progress || 0,
      })),
    });
  });

  // Admin User Management Endpoints
  app.get(api.admin.users.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
      const search = (req.query.search as string) || "";
      const offset = (page - 1) * limit;

      // Get all users from Prisma with pagination and search
      const users = await prisma.user.findMany({
        where: search
          ? {
              OR: [
                { username: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await prisma.user.count({
        where: search
          ? {
              OR: [
                { username: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { firstName: { contains: search, mode: "insensitive" } },
                { lastName: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      });

      res.json({
        users: users.map((user: any) => ({
          id: user.id,
          moodleUserId: user.moodleUserId,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isSuspended: user.isSuspended,
          lastLoginAt: user.lastLoginAt?.toISOString() || null,
          createdAt: user.createdAt.toISOString(),
        })),
        total,
        page,
        limit,
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch users",
      });
    }
  });

  app.post(api.admin.suspendUser.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { userId, suspend } = api.admin.suspendUser.input.parse(req.body);

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user suspension status
      await prisma.user.update({
        where: { id: userId },
        data: { isSuspended: suspend },
      });

      // Log admin activity
      await (prisma as any).adminActivityLog.create({
        data: {
          adminUserId: req.session.user.id,
          targetUserId: userId,
          action: suspend ? "USER_SUSPENDED" : "USER_UNSUSPENDED",
          details: { reason: req.body.reason || "No reason provided" },
        },
      });

      res.json({
        success: true,
        message: suspend ? "User suspended successfully" : "User unsuspended successfully",
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to suspend user",
      });
    }
  });

  app.post(api.admin.assignRole.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { userId, role } = api.admin.assignRole.input.parse(req.body);

      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user role
      await prisma.user.update({
        where: { id: userId },
        data: { role },
      });

      // Log admin activity
      await (prisma as any).adminActivityLog.create({
        data: {
          adminUserId: req.session.user.id,
          targetUserId: userId,
          action: "ROLE_ASSIGNED",
          details: { previousRole: user.role, newRole: role },
        },
      });

      res.json({
        success: true,
        message: `User role updated to ${role} successfully`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to assign role",
      });
    }
  });

  app.post(api.admin.resetPassword.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { userId } = api.admin.resetPassword.input.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate temporary password
      const tempPassword = Math.random().toString(36).slice(-12);

      try {
        // Reset password in Moodle using admin token
        const moodleToken = process.env.MOODLE_ADMIN_TOKEN || "";
        if (moodleToken) {
          // Call Moodle API to reset password
          const response = await fetch(
            `${env.moodle.baseUrl}/webservice/rest/server.php`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                wstoken: moodleToken,
                wsfunction: "core_user_update_users",
                moodlewsrestformat: "json",
                "users[0][id]": String(user.moodleUserId),
                "users[0][password]": tempPassword,
              }).toString(),
            }
          );

          if (!response.ok) {
            console.error("Moodle password reset failed");
          }
        }
      } catch (moodleErr) {
        console.error("Error resetting password in Moodle:", moodleErr);
      }

      // Update password reset tracking
      await prisma.user.update({
        where: { id: userId },
        data: {
          lastPasswordResetAt: new Date(),
        },
      });

      // Log admin activity
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            targetUserId: userId,
            action: "PASSWORD_RESET",
            details: { tempPassword: `***${tempPassword.slice(-4)}` },
          },
        });
      } catch (logErr) {
        console.error("Failed to log admin activity:", logErr);
      }

      res.json({
        success: true,
        message: `Password reset successfully. Temporary password: ${tempPassword}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to reset password",
      });
    }
  });

  app.get(api.admin.activityLogs.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
      const offset = (page - 1) * limit;

      const logs = await (prisma as any).adminActivityLog.findMany({
        include: {
          adminUser: true,
          targetUser: true,
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await (prisma as any).adminActivityLog.count();

      res.json({
        logs: logs.map((log: any) => ({
          id: log.id,
          action: log.action,
          adminUsername: log.adminUser.username,
          targetUsername: log.targetUser?.username || null,
          details: log.details,
          createdAt: log.createdAt.toISOString(),
        })),
        total,
        page,
        limit,
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch activity logs",
      });
    }
  });

  // Admin Course Management Endpoints
  app.get(api.admin.courses.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const page = Math.max(1, parseInt(req.query.page as string) || 1);
      const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
      const search = (req.query.search as string) || "";
      const offset = (page - 1) * limit;

      const courses = await (prisma as any).courseCatalog.findMany({
        where: search
          ? {
              OR: [
                { fullname: { contains: search, mode: "insensitive" } },
                { shortname: { contains: search, mode: "insensitive" } },
                { categoryName: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await (prisma as any).courseCatalog.count({
        where: search
          ? {
              OR: [
                { fullname: { contains: search, mode: "insensitive" } },
                { shortname: { contains: search, mode: "insensitive" } },
                { categoryName: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
      });

      res.json({
        courses: courses.map((course: any) => ({
          id: course.id,
          moodleCourseId: course.moodleCourseId,
          shortname: course.shortname,
          fullname: course.fullname,
          summary: course.summary,
          categoryName: course.categoryName,
          isVisible: course.isVisible,
          price: parseFloat(course.price.toString()),
          lastSyncedAt: course.lastSyncedAt?.toISOString() || null,
          createdAt: course.createdAt.toISOString(),
        })),
        total,
        page,
        limit,
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch courses",
      });
    }
  });

  app.post(api.admin.updateCoursePricing.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { courseId, price } = api.admin.updateCoursePricing.input.parse(req.body);

      const course = await (prisma as any).courseCatalog.findUnique({ where: { id: courseId } });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await (prisma as any).courseCatalog.update({
        where: { id: courseId },
        data: { price },
      });

      // Log admin activity
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            action: "COURSE_PRICING_UPDATED",
            details: { courseId, previousPrice: parseFloat(course.price.toString()), newPrice: price },
          },
        });
      } catch (logErr) {
        console.error("Failed to log admin activity:", logErr);
      }

      res.json({
        success: true,
        message: `Course pricing updated to $${price.toFixed(2)}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to update course pricing",
      });
    }
  });

  app.post(api.admin.updateCourseVisibility.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { courseId, isVisible } = api.admin.updateCourseVisibility.input.parse(req.body);

      const course = await (prisma as any).courseCatalog.findUnique({ where: { id: courseId } });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await (prisma as any).courseCatalog.update({
        where: { id: courseId },
        data: { isVisible },
      });

      // Log admin activity
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            action: "COURSE_VISIBILITY_UPDATED",
            details: { courseId, isVisible },
          },
        });
      } catch (logErr) {
        console.error("Failed to log admin activity:", logErr);
      }

      res.json({
        success: true,
        message: `Course ${isVisible ? "published" : "hidden"} successfully`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to update course visibility",
      });
    }
  });

  app.post(api.admin.updateCourseCategory.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { courseId, categoryId, categoryName } = api.admin.updateCourseCategory.input.parse(req.body);

      const course = await (prisma as any).courseCatalog.findUnique({ where: { id: courseId } });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await (prisma as any).courseCatalog.update({
        where: { id: courseId },
        data: { categoryId, categoryName },
      });

      // Log admin activity
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            action: "COURSE_CATEGORY_UPDATED",
            details: { courseId, categoryId, categoryName },
          },
        });
      } catch (logErr) {
        console.error("Failed to log admin activity:", logErr);
      }

      res.json({
        success: true,
        message: `Course category updated to ${categoryName || "uncategorized"}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to update course category",
      });
    }
  });

  app.post(api.admin.syncCourses.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const { target } = api.admin.syncCourses.input.parse(req.body);

      // Sync courses from Moodle based on target
      const courses = await getLmsCourses();
      let coursesAffected = 0;

      if (target === "COURSE_CATALOG") {
        // Update or create courses in database
        for (const course of courses) {
          await (prisma as any).courseCatalog.upsert({
            where: { moodleCourseId: course.id },
            create: {
              moodleCourseId: course.id,
              shortname: course.slug,
              fullname: course.title,
              summary: course.fullDescription,
              categoryName: course.category,
              isVisible: course.visible,
              price: 0,
              lastSyncedAt: new Date(),
            },
            update: {
              fullname: course.title,
              summary: course.fullDescription,
              categoryName: course.category,
              lastSyncedAt: new Date(),
            },
          });
          coursesAffected++;
        }
      }

      // Log admin activity
      try {
        await (prisma as any).adminActivityLog.create({
          data: {
            adminUserId: req.session.user.id,
            action: "COURSES_SYNCED",
            details: { target, coursesAffected },
          },
        });
      } catch (logErr) {
        console.error("Failed to log admin activity:", logErr);
      }

      res.json({
        success: true,
        message: `Synced ${coursesAffected} courses from Moodle`,
        coursesAffected,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to sync courses",
      });
    }
  });

  // === ADMIN ANALYTICS & REPORTING ===
  app.get(api.admin.analytics.revenue.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const period = (req.query.period as string) || "monthly";
      
      // Get all orders - use storage interface for complete data
      const allOrders: any[] = [];
      const allUsers = await prisma.user.findMany();
      
      for (const user of allUsers) {
        const userOrders = await storage.getOrdersByUserId(user.id);
        allOrders.push(...userOrders);
      }

      const totalRevenue = allOrders.reduce((sum: number, order: any): number => sum + parseFloat(order.totalAmount.toString()), 0 as number);
      const totalOrders = allOrders.length;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate trend data
      const trend = calculateTrendData(allOrders, period, (order: any) => parseFloat(order.totalAmount.toString()));

      // Get top courses by revenue
      const courseRevenue: Record<string, any> = {};
      
      for (const order of allOrders) {
        const items = await storage.getOrderItemsByOrderId(order.id as unknown as number);
        for (const item of items) {
          const key = (item as any).programId?.toString() || "unknown";
          if (!courseRevenue[key]) {
            courseRevenue[key] = {
              courseId: key,
              revenue: 0,
              orderCount: 0,
              name: `Course ${key}`,
            };
          }
          courseRevenue[key].revenue += parseFloat((item as any).price?.toString() || "0");
          courseRevenue[key].orderCount += 1;
        }
      }

      const topCourses = Object.values(courseRevenue)
        .sort((a: any, b: any): number => b.revenue - a.revenue)
        .slice(0, 10)
        .map((c: any) => ({
          id: c.courseId,
          name: c.name,
          revenue: c.revenue,
          orderCount: c.orderCount,
        }));

      res.json({
        totalRevenue,
        averageOrderValue,
        totalOrders,
        trend,
        topCourses,
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch revenue analytics",
      });
    }
  });

  app.get(api.admin.analytics.enrollments.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const period = (req.query.period as string) || "monthly";

      const enrollments = await (prisma as any).userCourseEnrollment.findMany({
        include: { user: true, courseCatalog: true },
      });

      const totalEnrollments = enrollments.length;
      const activeEnrollments = enrollments.filter((e: any) => e.isActive).length;
      const completedEnrollments = enrollments.filter((e: any) => (e.progress || 0) === 100).length;
      const completionRate = totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0;

      // Calculate trend
      const trend = calculateTrendData(
        enrollments,
        period,
        (enrollment: any): number => 1
      );

      // Get top courses by enrollment
      const courseEnrollments: Record<string, { courseId: string; enrollmentCount: number; completionCount: number; name: string }> = {};

      for (const enrollment of enrollments) {
        const key = enrollment.courseCatalogId;
        if (!courseEnrollments[key]) {
          courseEnrollments[key] = {
            courseId: key,
            enrollmentCount: 0,
            completionCount: 0,
            name: enrollment.courseCatalog?.fullname || "Unknown Course",
          };
        }
        courseEnrollments[key].enrollmentCount += 1;
        if ((enrollment.progress || 0) === 100) {
          courseEnrollments[key].completionCount += 1;
        }
      }

      const topCourses = Object.values(courseEnrollments)
        .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
        .slice(0, 10)
        .map((c) => ({
          id: c.courseId,
          name: c.name,
          enrollmentCount: c.enrollmentCount,
          completionCount: c.completionCount,
        }));

      // Enrollments by role
      const enrollmentByRole = {
        students: enrollments.filter((e: any) => e.user?.role === "student").length,
        parents: enrollments.filter((e: any) => e.user?.role === "parent").length,
        schools: enrollments.filter((e: any) => e.user?.role === "school").length,
      };

      res.json({
        totalEnrollments,
        activeEnrollments,
        completionRate: Math.round(completionRate),
        trend,
        topCourses,
        enrollmentByRole,
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch enrollment analytics",
      });
    }
  });

  app.get(api.admin.analytics.progress.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const enrollments = await (prisma as any).userCourseEnrollment.findMany({
        include: { courseCatalog: true },
      });

      const totalStudentsTracked = new Set(enrollments.map((e: any) => e.userId)).size;
      const completedCourses = enrollments.filter((e: any) => (e.progress || 0) === 100).length;
      const inProgressCourses = enrollments.filter((e: any) => (e.progress || 0) > 0 && (e.progress || 0) < 100).length;
      const notStartedCourses = enrollments.filter((e: any) => (e.progress || 0) === 0).length;

      const totalProgress = enrollments.reduce((sum: number, e: any): number => sum + (e.progress || 0), 0 as number);
      const averageCourseProgress = enrollments.length > 0 ? Math.round(totalProgress / enrollments.length) : 0;

      // Progress distribution
      const progressDistribution = [
        { range: "0-25%", count: enrollments.filter((e: any) => (e.progress || 0) <= 25).length },
        { range: "25-50%", count: enrollments.filter((e: any) => (e.progress || 0) > 25 && (e.progress || 0) <= 50).length },
        { range: "50-75%", count: enrollments.filter((e: any) => (e.progress || 0) > 50 && (e.progress || 0) <= 75).length },
        { range: "75-100%", count: enrollments.filter((e: any) => (e.progress || 0) > 75).length },
      ];

      const progressDistributionWithPercentage = progressDistribution.map((p) => ({
        ...p,
        percentage: enrollments.length > 0 ? Math.round((p.count / enrollments.length) * 100) : 0,
      }));

      // Top performing courses
      const courseProgress: Record<string, { courseId: string; averageProgress: number; studentCount: number; name: string }> = {};

      for (const enrollment of enrollments) {
        const key = enrollment.courseCatalogId;
        if (!courseProgress[key]) {
          courseProgress[key] = {
            courseId: key,
            averageProgress: 0,
            studentCount: 0,
            name: enrollment.courseCatalog?.fullname || "Unknown Course",
          };
        }
        courseProgress[key].averageProgress += enrollment.progress || 0;
        courseProgress[key].studentCount += 1;
      }

      // Calculate averages
      Object.values(courseProgress).forEach((c) => {
        c.averageProgress = Math.round(c.averageProgress / c.studentCount);
      });

      const topPerformingCourses = Object.values(courseProgress)
        .sort((a: any, b: any): number => b.averageProgress - a.averageProgress)
        .slice(0, 10)
        .map((c: any) => ({
          id: c.courseId,
          name: c.name,
          averageProgress: c.averageProgress,
          studentCount: c.studentCount,
        }));

      // Average completion time (estimated from enrollments)
      const enrolledDates = enrollments
        .filter((e: any) => e.enrolledAt)
        .map((e: any) => ({
          date: new Date(e.enrolledAt),
          progress: e.progress || 0,
        }));

      const averageCompletionTime = enrolledDates.length > 0
        ? Math.round(
            enrolledDates.reduce((sum: number, e: any): number => sum + (e.progress === 100 ? Math.floor((Date.now() - e.date.getTime()) / (1000 * 60 * 60 * 24)) : 0), 0 as number) /
              enrolledDates.filter((e: any): boolean => e.progress === 100).length
          )
        : 0;

      // Course progress by category
      const categoryProgress: Record<string, { category: string; averageProgress: number; courseCount: number }> = {};

      for (const enrollment of enrollments) {
        const category = enrollment.courseCatalog?.categoryName || "Uncategorized";
        if (!categoryProgress[category]) {
          categoryProgress[category] = {
            category,
            averageProgress: 0,
            courseCount: 0,
          };
        }
        categoryProgress[category].averageProgress += enrollment.progress || 0;
        categoryProgress[category].courseCount += 1;
      }

      Object.values(categoryProgress).forEach((c) => {
        c.averageProgress = Math.round(c.averageProgress / c.courseCount);
      });

      res.json({
        averageCourseProgress,
        totalStudentsTracked,
        completedCourses,
        inProgressCourses,
        notStartedCourses,
        progressDistribution: progressDistributionWithPercentage,
        topPerformingCourses,
        averageCompletionTime,
        courseProgressByCategory: Object.values(categoryProgress),
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch progress analytics",
      });
    }
  });

  app.get(api.admin.analytics.usage.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const users = await prisma.user.findMany();

      const totalRegisteredUsers = users.length;
      const activeUsers = users.filter((u: any): boolean => u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000);
      const totalActiveUsers = activeUsers.length;
      const dailyActiveUsers = users.filter((u) => u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 24 * 60 * 60 * 1000).length;
      const monthlyActiveUsers = activeUsers.length;
      const thisMonthStart = new Date();
      thisMonthStart.setDate(1);
      thisMonthStart.setHours(0, 0, 0, 0);
      const newUsersThisMonth = users.filter((u) => u.createdAt > thisMonthStart).length;

      // Last login trend (last 30 days)
      const lastLoginTrend = calculateLoginTrend(users);

      // User activity by role
      const userActivityByRole = {
        students: {
          active: users.filter((u) => u.role === "student" && u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length,
          total: users.filter((u) => u.role === "student").length,
        },
        parents: {
          active: users.filter((u) => u.role === "parent" && u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length,
          total: users.filter((u) => u.role === "parent").length,
        },
        schools: {
          active: users.filter((u) => u.role === "school" && u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length,
          total: users.filter((u) => u.role === "school").length,
        },
        admins: {
          active: users.filter((u) => u.role === "admin" && u.lastLoginAt && new Date(u.lastLoginAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length,
          total: users.filter((u) => u.role === "admin").length,
        },
      };

      // Course access metrics
      const enrollments = await (prisma as any).userCourseEnrollment.findMany({
        include: { courseCatalog: true },
      });

      const courseAccessMetrics: Record<string, { courseId: string; name: string; accessCount: number; uniqueUsers: Set<string> }> = {};

      for (const enrollment of enrollments) {
        const key = enrollment.courseCatalogId;
        if (!courseAccessMetrics[key]) {
          courseAccessMetrics[key] = {
            courseId: key,
            name: enrollment.courseCatalog?.fullname || "Unknown Course",
            accessCount: 0,
            uniqueUsers: new Set(),
          };
        }
        courseAccessMetrics[key].accessCount += 1;
        courseAccessMetrics[key].uniqueUsers.add(enrollment.userId);
      }

      const courseAccessList = Object.values(courseAccessMetrics)
        .sort((a: any, b: any): number => b.accessCount - a.accessCount)
        .slice(0, 10)
        .map((c: any) => ({
          id: c.courseId,
          name: c.name,
          accessCount: c.accessCount,
          uniqueUsers: c.uniqueUsers.size,
        }));

      // Admin action metrics
      const adminActions = await (prisma as any).adminActivityLog.findMany({
        orderBy: { createdAt: "desc" },
      });

      const adminActionMetrics: Record<string, { action: string; count: number; lastOccurred: string }> = {};

      for (const action of adminActions) {
        if (!adminActionMetrics[action.action]) {
          adminActionMetrics[action.action] = {
            action: action.action,
            count: 0,
            lastOccurred: "",
          };
        }
        adminActionMetrics[action.action].count += 1;
        if (!adminActionMetrics[action.action].lastOccurred || new Date(action.createdAt) > new Date(adminActionMetrics[action.action].lastOccurred)) {
          adminActionMetrics[action.action].lastOccurred = action.createdAt.toISOString();
        }
      }

      res.json({
        totalActiveUsers,
        totalRegisteredUsers,
        newUsersThisMonth,
        monthlyActiveUsers,
        dailyActiveUsers,
        lastLoginTrend,
        userActivityByRole,
        courseAccessMetrics: courseAccessList,
        adminActionMetrics: Object.values(adminActionMetrics),
      });
    } catch (err) {
      res.status(500).json({
        message: err instanceof Error ? err.message : "Failed to fetch usage metrics",
      });
    }
  });

  app.get(api.admin.analytics.all.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      // Call all analytics endpoints and combine results
      const [revenueRes, enrollmentsRes, progressRes, usageRes] = await Promise.all([
        fetch(`http://localhost:${process.env.PORT || 3001}${api.admin.analytics.revenue.path}`, {
          headers: { Cookie: `sessionId=${(req.session as any).id}` },
        }),
        fetch(`http://localhost:${process.env.PORT || 3001}${api.admin.analytics.enrollments.path}`, {
          headers: { Cookie: `sessionId=${(req.session as any).id}` },
        }),
        fetch(`http://localhost:${process.env.PORT || 3001}${api.admin.analytics.progress.path}`, {
          headers: { Cookie: `sessionId=${(req.session as any).id}` },
        }),
        fetch(`http://localhost:${process.env.PORT || 3001}${api.admin.analytics.usage.path}`, {
          headers: { Cookie: `sessionId=${(req.session as any).id}` },
        }),
      ]);

      const revenue = await revenueRes.json();
      const enrollments = await enrollmentsRes.json();
      const progress = await progressRes.json();
      const usage = await usageRes.json();

      res.json({
        revenue,
        enrollments,
        progress,
        usage,
      });
    } catch (err) {
      // Fallback: return empty analytics if internal fetch fails
      res.json({
        revenue: { totalRevenue: 0, averageOrderValue: 0, totalOrders: 0, trend: [], topCourses: [] },
        enrollments: { totalEnrollments: 0, activeEnrollments: 0, completionRate: 0, trend: [], topCourses: [], enrollmentByRole: {} },
        progress: { averageCourseProgress: 0, totalStudentsTracked: 0, completedCourses: 0, inProgressCourses: 0, notStartedCourses: 0, progressDistribution: [], topPerformingCourses: [], averageCompletionTime: 0, courseProgressByCategory: [] },
        usage: { totalActiveUsers: 0, totalRegisteredUsers: 0, newUsersThisMonth: 0, monthlyActiveUsers: 0, dailyActiveUsers: 0, lastLoginTrend: [], userActivityByRole: {}, courseAccessMetrics: [], adminActionMetrics: [] },
      });
    }
  });

  app.get("/api/enrollments/:userId", async (req, res) => {
    const enrollments = await storage.getUserEnrollments(req.params.userId);
    res.json(enrollments);
  });

  // Initialize seed data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPrograms = await storage.getPrograms();
  if (existingPrograms.length === 0) {
    // Seed Programs based on "Our_Programs.docx"
    await storage.createProgram({
      title: "Pre-O-Level Victory Program",
      slug: "pre-o-level-victory",
      category: "pre_o_level",
      shortDescription: "12-Month Teacher-Led Complete O-Level Preparation",
      fullDescription: "Ideal for Grade 7-8 students entering O-Level within 12 months. Includes live teacher-led classes, 30-40% O-Level syllabus coverage, and complete diagnostic & remedial plans.",
      price: 36000,
      prices: { "PK": 36000, "GB": 30000, "US": 36000 },
      features: [
        "Complete Diagnostic & Remedial",
        "ALL 5 Bridge Courses Included",
        "Live Teacher-Led Classes (3 hrs/day)",
        "24/7 AI Chatbot Support",
        "Parent Progress Dashboard"
      ],
      isPopular: true
    });

    await storage.createProgram({
      title: "Complete O-Level Mastery",
      slug: "complete-o-level-mastery",
      category: "o_level",
      shortDescription: "Comprehensive 2-year program for O-Level success.",
      fullDescription: "Full coverage of all O-Level subjects with guaranteed results. Includes access to all resources, mock exams, and personalized feedback.",
      price: 45000,
      features: [
        "Full Syllabus Coverage",
        "10+ Years Past Paper Practice",
        "Mock Exams with Solutions",
        "Guaranteed Results"
      ],
      isPopular: false
    });
  }

  const existingResources = await storage.getResources();
  if (existingResources.length === 0) {
    // Seed Resources based on "Free_Resource_Zone.docx"
    await storage.createResource({
      title: "Physics Magic Sheet: Forces & Motion",
      description: "One-page visual summary of all key formulas and concepts for O-Level Physics: Forces.",
      category: "magic_sheet",
      subject: "physics",
      fileUrl: "#", // Placeholder
      thumbnailUrl: "https://placehold.co/400x600?text=Physics+Magic+Sheet",
      isFree: true
    });

    await storage.createResource({
      title: "Chemistry Workbook: Atomic Structure",
      description: "Complete topic workbook with worked examples, guided practice, and independent questions.",
      category: "workbook",
      subject: "chemistry",
      fileUrl: "#", // Placeholder
      thumbnailUrl: "https://placehold.co/400x600?text=Chemistry+Workbook",
      isFree: true
    });

    await storage.createResource({
      title: "O-Level Survival Guide for Parents",
      description: "Free 20-page PDF: What you MUST know before O-Level starts.",
      category: "guide",
      subject: "general",
      fileUrl: "#", // Placeholder
      thumbnailUrl: "https://placehold.co/400x600?text=Parent+Guide",
      isFree: true
    });
  }
}

