import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";

import { randomUUID } from "crypto";
import { storage } from "../db/storage.js";
import { checkoutRequestSchema, markNotificationReadInputSchema, parentLinkChildInputSchema } from "../../shared/schema.js";
import { getLmsCourseById } from "../services/moodle/moodle.js";
import { createCourseEnrollment, getUserCourseEnrollments } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { ensureMoodleStudentByEmail } from "../services/moodle/moodle-auth.js";
import {
  getStudentActivityTimelineForDashboard,
  getStudentGradesForDashboard,
  getUserCoursesForDashboard,
} from "../services/moodle/moodle-dashboard.js";
import { getStoredUserByMoodleUserId, linkParentToChild } from "../repositories/user-store.js";
import { buildOrigin, buildPayfastCheckoutFields, buildPayfastItemName } from "../services/payments.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import {
  assertScholarshipCodeForUser,
  createScholarshipCodeRecord,
  resolveScholarshipCountryForUser,
} from "../services/scholarship.js";
import { normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";
import { allocatePlaceholderStudentId } from "../services/school-roster.js";
import { buildSchoolDashboardStats, ensureSchoolReportingTables, monthKey } from "../services/school-reporting.js";
import { syncSchoolRiskFlags } from "../services/moodle-risk-sync.js";


export function registerPaymentRoutes(app: Express, ctx: RouteContext) {
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

  // === SCHOLARSHIP / COUNTRY CONCESSIONS ===
  app.get(api.scholarship.eligibility.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const concession = await resolveScholarshipCountryForUser(storage, req.session.user);
    if (!concession) {
      return res.json({
        eligible: false,
        country: normalizeScholarshipCountry((req.session.user as { country?: string | null }).country),
        concessionPercent: null,
        region: null,
        message:
          "Your account country is not on the scholarship list, or country is not set on your profile. Use the same country you registered with.",
      });
    }

    return res.json({
      eligible: true,
      country: concession.country,
      concessionPercent: concession.percent,
      region: concession.region,
    });
  });

  app.post(api.scholarship.apply.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Please log in to apply for a scholarship." });
      }

      const input = api.scholarship.apply.input.parse(req.body);
      const user = req.session.user;
      const concession = await resolveScholarshipCountryForUser(storage, user);

      if (!concession) {
        return res.status(400).json({
          message:
            "Your account country is not eligible, or no country is saved on your profile. Register with an eligible country or update your profile — you cannot pick a different country here.",
        });
      }

      const existing = await storage.getActiveScholarshipCodeForUser(user.id);
      if (existing) {
        return res.json({
          eligible: true,
          country: existing.country,
          concessionPercent: existing.concessionPercent,
          region: existing.region,
          code: existing.code,
          expiresAt: existing.expiresAt.toISOString(),
        });
      }

      const displayName =
        user.fullname ||
        [user.firstname, user.lastname].filter(Boolean).join(" ") ||
        user.username;
      const email = user.email || "";

      const record = createScholarshipCodeRecord({
        moodleUserId: user.id,
        name: displayName,
        email,
        country: concession.country,
      });
      await storage.saveScholarshipCode(record);

      await storage.createInquiry({
        type: "scholarship_application",
        name: displayName,
        email,
        role: "student",
        gradeLevel: input.gradeLevel,
        subjectInterest: `Global Access Scholarship — ${concession.percent}% (${concession.region})`,
        message: `Verified account country: ${concession.country}. User ID: ${user.id}. Code: ${record.code}`,
        phone: null,
        learningMode: null,
      });

      res.json({
        eligible: true,
        country: record.country,
        concessionPercent: record.concessionPercent,
        region: record.region,
        code: record.code,
        expiresAt: record.expiresAt.toISOString(),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(400).json({
        message: err instanceof Error ? err.message : "Scholarship application failed",
      });
    }
  });

  app.post(api.scholarship.validate.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Please log in to apply a scholarship code." });
      }

      const { code } = api.scholarship.validate.input.parse(req.body);
      const record = await storage.getScholarshipCode(code);
      const registrationCountry = await storage.getRegisteredCountry(req.session.user.id);
      assertScholarshipCodeForUser(record, req.session.user, registrationCountry);

      res.json({
        valid: true,
        code: record!.code,
        country: record!.country,
        concessionPercent: record!.concessionPercent,
        region: record!.region,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      res.status(404).json({
        message: err instanceof Error ? err.message : "Invalid scholarship code",
      });
    }
  });

  // === ORDERS & CART ===
  app.post("/api/orders", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { items, totalAmount, scholarshipCode } = checkoutRequestSchema.parse(req.body);
      const userId = String(req.session.user.id);

      const { scholarshipRecord } = await resolveCheckoutTotals({
        items,
        totalAmount,
        scholarshipCode,
        user: req.session.user,
      });

      const order = await storage.createOrder({
        userId,
        totalAmount,
        status: "completed",
        paymentStatus: "paid",
        paymentProvider: "Internal",
        paidAmount: totalAmount,
        remainingAmount: 0,
        allowPartialPayment: false,
        paymentNotes: [],
      });
      const isSchoolPurchase = req.session.user.role === "school";
      const postCheckoutFailures: string[] = [];

      for (const item of items) {
        if (isSchoolPurchase) {
          try {
            const course = await getLmsCourseById(item.programId);
            const licenseId = `school-license-${order.id}-${item.programId}-${randomUUID().slice(0, 8)}`;
            await createSchoolLicense({
              id: licenseId,
              schoolUserId: req.session.user.id,
              courseId: item.programId,
              courseName: course?.title || `Course ${item.programId}`,
              totalSeats: item.quantity ?? 1,
              orderId: order.id,
              expiresAt: null,
            });
          } catch (licenseError) {
            const message = licenseError instanceof Error ? licenseError.message : String(licenseError);
            console.error(`Failed to create school license for user ${req.session.user.id} course ${item.programId} order ${order.id}:`, licenseError);
            postCheckoutFailures.push(`course ${item.programId}: ${message}`);
          }
        } else {
          try {
            await enrolUserInCourse(req.session.user.id, item.programId);
            await createCourseEnrollment(req.session.user.id, item.programId);
          } catch (enrolError) {
            const message = enrolError instanceof Error ? enrolError.message : String(enrolError);
            console.error(`Failed to enrol user ${req.session.user.id} in course ${item.programId} for order ${order.id}:`, enrolError);
            postCheckoutFailures.push(`course ${item.programId}: ${message}`);
          }
        }

        await storage.createOrderItem({
          orderId: order.id,
          programId: item.programId,
          price: item.price * (item.quantity ?? 1)
        });
      }

      if (scholarshipRecord) {
        await storage.markScholarshipCodeUsed(scholarshipRecord.code, userId);
      }

      if (postCheckoutFailures.length > 0) {
        await recordPaymentEvent(
          order.id,
          isSchoolPurchase ? "license_pending" : "enrolment_pending",
          isSchoolPurchase
            ? `Order paid but license creation failed and needs manual retry — ${postCheckoutFailures.join("; ")}`
            : `Order paid but Moodle enrolment failed and needs manual retry — ${postCheckoutFailures.join("; ")}`,
        );
      } else if (isSchoolPurchase) {
        await recordPaymentEvent(order.id, "license_created", "School licenses created after successful checkout");
      }

      res.status(201).json(await buildOrderHistoryResponse(order));
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

      const { items, totalAmount, amountToPay, scholarshipCode } = api.payments.init.input.parse(req.body);
      const amountRequested = typeof amountToPay === "number" ? amountToPay : totalAmount;

      await resolveCheckoutTotals({
        items,
        totalAmount,
        scholarshipCode,
        user: req.session.user,
      });

      if (amountRequested <= 0 || amountRequested > totalAmount) {
        return res.status(400).json({ message: "Partial payment amount must be between 0 and the order total." });
      }

      const isSingleCourse = items.length === 1;
      const orderRef = `PF-${req.session.user.id}-${Date.now()}${isSingleCourse ? `-${items[0].programId}` : ""}`;
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      const pendingOrder = await storage.createOrder({
        userId: String(req.session.user.id),
        totalAmount,
        status: amountRequested >= totalAmount ? "pending" : "partial",
        paymentStatus: "initiated",
        paymentProvider: "PayFast",
        paymentRef: orderRef,
        invoiceNumber,
        paidAmount: 0,
        remainingAmount: totalAmount,
        allowPartialPayment: true,
        refundStatus: null,
        paymentNotes: [],
      });
      await recordPaymentEvent(pendingOrder.id, "initiated", `PayFast checkout created for ${amountRequested >= totalAmount ? "full" : "partial"} payment`);
      for (const item of items) {
        await storage.createOrderItem({
          orderId: pendingOrder.id,
          programId: item.programId,
          price: item.price * (item.quantity ?? 1),
        });
      }
      await storage.createPendingPayment({
        orderRef,
        userId: String(req.session.user.id),
        items,
        totalAmount,
        amountToPay: amountRequested,
        scholarshipCode,
        orderId: pendingOrder.id,
        createdAt: new Date(),
      });

      const origin = buildOrigin(req.get("host") || "localhost:3001", req.protocol);

      res.json({
        checkoutUrl: `${origin}/api/payments/payfast/checkout/${encodeURIComponent(orderRef)}`,
        orderRef,
        provider: "PayFast",
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

  app.get("/api/payments/payfast/checkout/:orderRef", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send("Not authenticated");
      }

      const orderRef = typeof req.params.orderRef === "string" ? req.params.orderRef : "";
      const pending = await storage.getPendingPayment(orderRef);
      if (!pending || pending.userId !== String(req.session.user.id)) {
        return res.status(404).send("Payment session not found");
      }

      const origin = buildOrigin(req.get("host") || "localhost:3001", req.protocol);
      const payment = await buildPayfastCheckoutFields({
        orderRef,
        itemName: buildPayfastItemName(pending.items),
        amount: pending.amountToPay ?? pending.totalAmount,
        origin,
        email: req.session.user.email || undefined,
        returnPath: "/payment-success",
        cancelPath: "/cart",
        notifyPath: "/api/webhook/payfast",
      });

      const escapeHtml = (value: string) =>
        value
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");

      const fields = Object.entries(payment.fields)
        .map(([name, value]) => `<input type="hidden" name="${escapeHtml(name)}" value="${escapeHtml(String(value))}" />`)
        .join("\n");

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecting to PayFast…</title>
  </head>
  <body>
    <form id="payfast-checkout" action="${payment.processUrl}" method="post">
      ${fields}
      <noscript>
        <button type="submit">Continue to PayFast</button>
      </noscript>
    </form>
    <script>
      document.getElementById("payfast-checkout").submit();
    </script>
  </body>
</html>`);
    } catch (err) {
      res.status(500).send(err instanceof Error ? err.message : "Failed to start PayFast checkout");
    }
  });

  app.post(api.payments.verify.path, async (req, res) => {
try {
    const { orderRef, tracker } = api.payments.verify.input.parse(req.body);
    
    // 1. Fetch pending info to get user identity if session is absent
    const pending = await storage.getPendingPayment(orderRef);
    const targetUserId = req.session.user?.id ? String(req.session.user.id) : (pending?.userId ? String(pending.userId) : "");

    // 2. Pass execution smoothly to finalizer
    const orderId = await finalizePaidOrder(orderRef, targetUserId, tracker);
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
      const payload = req.body ?? {};
      const orderRef =
        typeof payload.BASKET_ID === "string"
          ? payload.BASKET_ID
          : typeof payload.basket_id === "string"
            ? payload.basket_id
            : typeof payload.m_payment_id === "string"
              ? payload.m_payment_id
              : typeof payload.order_id === "string"
                ? payload.order_id
                : "";
      const rawPaymentStatus =
        typeof payload.payment_status === "string"
          ? payload.payment_status
          : typeof payload.TRANSACTION_STATUS === "string"
            ? payload.TRANSACTION_STATUS
            : typeof payload.transaction_status === "string"
              ? payload.transaction_status
              : typeof payload.RESPONSE_CODE === "string"
                ? payload.RESPONSE_CODE
                : "";
      const paymentStatus = rawPaymentStatus.toLowerCase();
      const amountGross = typeof payload.amount_gross === "string" ? Number(payload.amount_gross) : Number(payload.amount_gross ?? payload.TXNAMT ?? 0);
      const tracker =
        typeof payload.tracker === "string"
          ? payload.tracker
          : typeof payload.pf_payment_id === "string"
            ? payload.pf_payment_id
            : typeof payload.TXNREF === "string"
              ? payload.TXNREF
              : undefined;
      const pending = orderRef ? await storage.getPendingPayment(orderRef) : undefined;

      if (!orderRef) {
        return res.status(200).json({ status: "ignored" });
      }

      if (paymentStatus === "complete" || paymentStatus === "successful" || paymentStatus === "success" || paymentStatus === "paid" || paymentStatus === "00") {
        await finalizePaidOrder(orderRef, pending?.userId ? String(pending.userId) : "", tracker);
        return res.json({ status: "success" });
      }

      if (pending) {
        const existingOrder = pending.orderId ? await storage.getOrderById(pending.orderId) : undefined;
        if (existingOrder) {
          const updatedStatus = paymentStatus === "failed" ? "failed" : paymentStatus === "cancelled" ? "cancelled" : "pending";
          await storage.updateOrder(existingOrder.id, {
            status: updatedStatus,
            paymentStatus: updatedStatus,
            paymentProvider: "PayFast",
            paymentRef: orderRef,
            remainingAmount: pending.totalAmount - (pending.amountToPay ?? pending.totalAmount),
          });
          await recordPaymentEvent(existingOrder.id, updatedStatus, `PayFast webhook reported ${updatedStatus}${Number.isFinite(amountGross) ? ` (${amountGross})` : ""}`);
        }
      }

      return res.json({ status: "ignored" });
    } catch (err) {
      res.status(500).json({ status: "failed" });
    }
  });

  app.post("/api/webhook/quiz-attempt", async (req, res) => {
    try {
      const sourcePayload =
        req.body && typeof req.body.data === "object" && req.body.data !== null
          ? req.body.data
          : req.body;

      const payload = quizAttemptPayloadSchema.parse(sourcePayload);

      const parseDestinationPreview = (rawText: string) => {
        const destinationResponse = rawText.trim()
          ? (() => {
              try {
                return JSON.parse(rawText);
              } catch {
                return rawText;
              }
            })()
          : null;

        return destinationResponse === null
          ? null
          : typeof destinationResponse === "string"
            ? destinationResponse.slice(0, 500)
            : JSON.stringify(destinationResponse).slice(0, 500);
      };

      const sendGet = async () => {
        const getUrl = new URL(quizAttemptWebhookUrl);
        Object.entries(payload).forEach(([key, value]) => {
          getUrl.searchParams.set(key, String(value));
        });

        const response = await fetch(getUrl.toString(), {
          method: "GET",
          headers: { Accept: "application/json, text/plain, */*" },
        });
        const rawText = await response.text();
        return {
          response,
          destinationPreview: parseDestinationPreview(rawText),
        };
      };

      const sendPost = async () => {
        const response = await fetch(quizAttemptWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json, text/plain, */*",
          },
          body: JSON.stringify(payload),
        });
        const rawText = await response.text();
        return {
          response,
          destinationPreview: parseDestinationPreview(rawText),
        };
      };

      const getAttempt = await sendGet();
      if (getAttempt.response.ok) {
        console.info("[quiz-webhook] forwarded", {
          userid: payload.userid,
          quizid: payload.quizid,
          attemptid: payload.attemptid,
          deliveryMethod: "GET",
          destinationStatus: getAttempt.response.status,
          destinationResponse: getAttempt.destinationPreview,
        });

        return res.json({
          status: "success",
          forwarded: true,
          deliveryMethod: "GET",
          destinationStatus: getAttempt.response.status,
          destinationResponse: getAttempt.destinationPreview,
        });
      }

      const postAttempt = await sendPost();
      if (postAttempt.response.ok) {
        console.info("[quiz-webhook] forwarded", {
          userid: payload.userid,
          quizid: payload.quizid,
          attemptid: payload.attemptid,
          deliveryMethod: "POST_FALLBACK",
          destinationStatus: postAttempt.response.status,
          destinationResponse: postAttempt.destinationPreview,
        });

        return res.json({
          status: "success",
          forwarded: true,
          deliveryMethod: "POST_FALLBACK",
          destinationStatus: postAttempt.response.status,
          destinationResponse: postAttempt.destinationPreview,
          initialGetStatus: getAttempt.response.status,
          initialGetResponse: getAttempt.destinationPreview,
        });
      }

      console.error("[quiz-webhook] destination rejected", {
        userid: payload.userid,
        quizid: payload.quizid,
        attemptid: payload.attemptid,
        getStatus: getAttempt.response.status,
        getResponse: getAttempt.destinationPreview,
        postStatus: postAttempt.response.status,
        postResponse: postAttempt.destinationPreview,
      });

      return res.status(502).json({
        status: "failed",
        message: "Quiz webhook destination rejected both GET and POST fallback",
        getStatus: getAttempt.response.status,
        getResponse: getAttempt.destinationPreview,
        postStatus: postAttempt.response.status,
        postResponse: postAttempt.destinationPreview,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          status: "failed",
          message: err.errors[0]?.message || "Invalid quiz attempt payload",
          field: err.errors[0]?.path.join("."),
        });
      }

      return res.status(500).json({
        status: "failed",
        message: err instanceof Error ? err.message : "Failed to forward quiz attempt webhook",
      });
    }
  });

  app.get(api.orders.list.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const orders = await storage.getOrdersByUserId(String(req.session.user.id));
    const response = await Promise.all(orders.map((order) => buildOrderHistoryResponse(order)));

    res.json(response);
  });

  app.post("/api/orders/:id/refund", async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const orderId = Number(req.params.id);
      if (!Number.isFinite(orderId) || orderId <= 0) {
        return res.status(400).json({ message: "Invalid order id" });
      }

      const order = await storage.getOrderById(orderId);
      if (!order || order.userId !== String(req.session.user.id)) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (![ "paid", "partial", "completed" ].includes(String(order.paymentStatus ?? order.status).toLowerCase())) {
        return res.status(400).json({ message: "Only paid orders can be refunded" });
      }

      await storage.updateOrder(order.id, {
        refundStatus: "requested",
        status: "refund_requested",
        paymentStatus: "refund_requested",
      });
      await recordPaymentEvent(order.id, "refund_requested", "Refund requested from student dashboard");
      return res.json({ success: true, message: "Refund request submitted" });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to request refund" });
    }
  });

  app.get(api.dashboard.notifications.path, async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const notifications = await buildDashboardNotifications({
      userId: req.session.user.id,
      email: req.session.user.email,
    });

    const readRows = await prisma.dashboardNotificationReads.findMany({
      where: { userId: req.session.user.id },
    });
    const readIds = new Set(readRows.map((row) => row.notificationId));

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
    const existingRead = await prisma.dashboardNotificationReads.findFirst({
      where: { userId: req.session.user.id, notificationId },
    });
    if (!existingRead) {
      await prisma.dashboardNotificationReads.create({
        data: { userId: req.session.user.id, notificationId },
      });
    }

    res.json({ success: true });
  });

  app.get(api.dashboard.student.path, async (req, res) => {
    if (!req.session.user || !req.session.moodleToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    if (req.session.user.role === "school") {
      return res.json({
        stats: {
          enrolledCourses: 0,
          completedCourses: 0,
          averageProgress: 0,
        },
        courses: [],
        activities: [],
      });
    }
    if (req.session.user.role !== "student") {
      return res.status(403).json({ message: "Student access required" });
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

    const schoolUserId = req.session.user.id;
    const trackedLicenses = await getSchoolLicenses(schoolUserId);
    const orders = await storage.getOrdersByUserId(String(schoolUserId));
    if (trackedLicenses.length === 0 && orders.length > 0) {
      const legacyLicenses = await Promise.all(
        orders.map(async (order) => {
          const items = await storage.getOrderItemsByOrderId(order.id);
          return Promise.all(
            items.map(async (item, index) => {
              const course = await getLmsCourseById(item.programId);
              return {
                id: `school-order-${order.id}-${item.programId}-${index}`,
                schoolUserId,
                courseId: item.programId,
                courseName: course?.title || `Course ${item.programId}`,
                totalSeats: 1,
                usedSeats: 0,
                purchaseDate: order.createdAt ? new Date(order.createdAt).toISOString() : new Date().toISOString(),
                expiresAt: null,
                orderId: order.id,
                assignedStudents: [],
              };
            }),
          );
        }),
      );

      for (const legacyLicense of legacyLicenses.flat()) {
        await createSchoolLicense({
          id: legacyLicense.id,
          schoolUserId,
          courseId: legacyLicense.courseId,
          courseName: legacyLicense.courseName,
          totalSeats: legacyLicense.totalSeats,
          orderId: legacyLicense.orderId,
          expiresAt: legacyLicense.expiresAt,
        });
      }
      trackedLicenses.push(...legacyLicenses.flat());
    }

    const flatLicenses = trackedLicenses.map((license) => ({
      id: license.id,
      courseId: license.courseId,
      courseName: license.courseName,
      assignedSeats: license.usedSeats,
      totalSeats: license.totalSeats,
    }));

    res.json({
      stats: {
        purchasedSeats: flatLicenses.reduce((sum, license) => sum + license.totalSeats, 0),
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

      const licenseId = `school-license-${order.id}-${course.id}`;
      await createSchoolLicense({
        id: licenseId,
        schoolUserId: req.session.user.id,
        courseId: course.id,
        courseName: course.title,
        totalSeats: input.seats,
        orderId: order.id,
        expiresAt: null,
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

  app.post(api.dashboard.schoolBulkLicenses.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const input = api.dashboard.schoolBulkLicenses.input.parse(req.body);
      const course = await getLmsCourseById(input.courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (typeof course.price !== "number" || course.price <= 0) {
        return res.status(400).json({ message: "This course is not configured for bulk license purchase" });
      }

      const totalAmount = course.price * input.quantity;
      const order = await storage.createOrder({
        userId: String(req.session.user.id),
        totalAmount,
        status: "completed",
      });

      const license = {
        id: `school-license-${order.id}-${course.id}-${randomUUID().slice(0, 8)}`,
        schoolUserId: req.session.user.id,
        courseId: course.id,
        courseName: course.title,
        totalSeats: input.quantity,
        usedSeats: 0,
        purchaseDate: new Date().toISOString(),
        expiresAt: null,
        orderId: order.id,
        assignedStudents: [],
      };
      await createSchoolLicense({
        id: license.id,
        schoolUserId: license.schoolUserId,
        courseId: license.courseId,
        courseName: license.courseName,
        totalSeats: license.totalSeats,
        orderId: license.orderId,
        expiresAt: license.expiresAt,
      });

      for (let index = 0; index < input.quantity; index += 1) {
        await storage.createOrderItem({
          orderId: order.id,
          programId: course.id,
          price: course.price,
        });
      }

      res.status(201).json({
        success: true,
        licenses: [
          {
            id: license.id,
            courseId: license.courseId,
            courseName: license.courseName,
            totalSeats: license.totalSeats,
            usedSeats: license.usedSeats,
            availableSeats: license.totalSeats - license.usedSeats,
            expiresAt: license.expiresAt,
            purchaseDate: license.purchaseDate,
          },
        ],
        totalAmount,
        orderId: String(order.id),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to purchase bulk licenses" });
    }
  });

  app.get(api.dashboard.schoolRoster.path, async (req, res) => {
    if (!req.session.user || req.session.user.role !== "school") {
      return res.status(403).json({ message: "School access required" });
    }

    try {
      const [students, licenses] = await Promise.all([
        prisma.schoolRosterStudents.findMany({
          where: { schoolUserId: req.session.user.id },
          orderBy: { uploadedAt: "desc" },
        }),
        getSchoolLicenses(req.session.user.id),
      ]);

      const assignmentsByEmail = new Map<string, Array<{
        licenseId: string;
        courseName: string;
        assignedAt: string | null;
      }>>();
      for (const license of licenses) {
        for (const assignedStudent of license.assignedStudents) {
          const email = assignedStudent.studentEmail.trim().toLowerCase();
          const existing = assignmentsByEmail.get(email) ?? [];
          existing.push({
            licenseId: license.id,
            courseName: license.courseName,
            assignedAt: assignedStudent.assignedAt,
          });
          assignmentsByEmail.set(email, existing);
        }
      }

      res.json({
        students: students.map((student) => {
          const studentEmail = student.studentEmail.trim().toLowerCase();
          return {
            id: student.id,
            studentId: student.studentId,
            studentEmail: student.studentEmail,
            studentName: student.studentName,
            uploadedAt: student.uploadedAt ? student.uploadedAt.toISOString() : null,
            assignments: assignmentsByEmail.get(studentEmail) ?? [],
          };
        }),
      });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load student roster" });
    }
  });

  app.post(api.dashboard.schoolAddStudent.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const input = api.dashboard.schoolAddStudent.input.parse(req.body);
      const email = input.email.trim().toLowerCase();
      const studentName = [input.firstName.trim(), input.lastName.trim()].filter(Boolean).join(" ").trim();

      const existing = await prisma.schoolRosterStudents.findFirst({
        where: { schoolUserId: req.session.user.id, studentEmail: email },
      });
      if (existing) {
        return res.status(400).json({ message: "A student with this email is already on your roster." });
      }

      const studentId = await allocatePlaceholderStudentId(prisma, req.session.user.id);
      const created = await prisma.schoolRosterStudents.create({
        data: {
          schoolUserId: req.session.user.id,
          studentId,
          studentEmail: email,
          studentName,
          sourceUploadId: `manual-${randomUUID()}`,
        },
      });

      res.status(201).json({
        id: created.id,
        studentId: created.studentId,
        studentEmail: created.studentEmail,
        studentName: created.studentName,
        uploadedAt: created.uploadedAt ? created.uploadedAt.toISOString() : null,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to add student" });
    }
  });

  app.post(api.dashboard.schoolUploadStudents.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const input = api.dashboard.schoolUploadStudents.input.parse(req.body);
      const parsedRows = parseSchoolStudentCsv(input.csvText);
      const uploadId = `upload-${randomUUID()}`;
      const errors: Array<{ row: number; email?: string; error: string }> = [];
      let processedStudents = 0;

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      for (const row of parsedRows) {
        const normalizedEmail = row.email.trim().toLowerCase();
        if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
          errors.push({ row: row.rowNumber, error: "Invalid email address." });
          continue;
        }

        const studentId = await allocatePlaceholderStudentId(
          prisma,
          req.session.user.id,
          row.moodleUserId,
        );
        const existingStudent = await prisma.schoolRosterStudents.findFirst({
          where: { schoolUserId: req.session.user.id, studentEmail: normalizedEmail },
        });
        if (existingStudent) {
          await prisma.schoolRosterStudents.update({
            where: { id: existingStudent.id },
            data: {
              studentEmail: normalizedEmail,
              studentName: row.name,
              sourceUploadId: uploadId,
              uploadedAt: new Date(),
            },
          });
        } else {
          await prisma.schoolRosterStudents.create({
            data: {
              schoolUserId: req.session.user.id,
              studentId,
              studentEmail: normalizedEmail,
              studentName: row.name,
              sourceUploadId: uploadId,
            },
          });
        }
        processedStudents++;
      }

      const uploadRecord = {
        id: uploadId,
        filename: input.filename || "students.csv",
        uploadedAt: new Date().toISOString(),
        totalStudents: parsedRows.length,
        processedStudents,
        failedStudents: errors.length,
        status: errors.length > 0 && processedStudents === 0 ? "failed" as const : "completed" as const,
        errors,
      };

      await prisma.schoolStudentUploads.create({
        data: {
          id: uploadRecord.id,
          schoolUserId: req.session.user.id,
          filename: uploadRecord.filename,
          totalStudents: uploadRecord.totalStudents,
          processedStudents: uploadRecord.processedStudents,
          failedStudents: uploadRecord.failedStudents,
          status: uploadRecord.status,
          errors: uploadRecord.errors as any,
        },
      });

      res.status(201).json(uploadRecord);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to upload students" });
    }
  });

  app.get(api.dashboard.schoolUploadStatus.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const uploadId = String(req.params.uploadId || "");
      const upload = (await getSchoolUploads(req.session.user.id)).find((entry) => entry.id === uploadId);
      if (!upload) {
        return res.status(404).json({ message: "Upload not found" });
      }

      res.json({
        id: upload.id,
        filename: upload.filename,
        uploadedAt: upload.uploadedAt ? upload.uploadedAt.toISOString() : new Date().toISOString(),
        totalStudents: upload.totalStudents,
        processedStudents: upload.processedStudents,
        failedStudents: upload.failedStudents,
        status: upload.status,
        errors: upload.errors ?? [],
      });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load upload status" });
    }
  });

  app.post(api.dashboard.schoolAssignSeats.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const input = api.dashboard.schoolAssignSeats.input.parse(req.body);
      const license = (await getSchoolLicenses(req.session.user.id)).find((entry) => entry.id === input.licenseId);
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }

      const assigned: Array<{
        id: string;
        licenseId: string;
        studentMoodleId: number;
        studentEmail: string;
        studentName: string;
        assignedAt: string;
      }> = [];
      const failed: Array<{ rosterId: number; error: string }> = [];

      for (const rosterId of input.rosterIds) {
        if (license.usedSeats + assigned.length >= license.totalSeats) {
          failed.push({ rosterId, error: "No seats remaining on this license." });
          continue;
        }

        const student = await prisma.schoolRosterStudents.findFirst({
          where: { id: rosterId, schoolUserId: req.session.user.id },
        });
        if (!student) {
          failed.push({ rosterId, error: "Student is not in this school's roster." });
          continue;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedEmail = student.studentEmail.trim().toLowerCase();
        if (!emailPattern.test(normalizedEmail)) {
          failed.push({ rosterId, error: "Student email is invalid." });
          continue;
        }

        if (
          license.assignedStudents.some((entry) => entry.studentEmail === normalizedEmail)
          || assigned.some((entry) => entry.studentEmail.toLowerCase() === normalizedEmail)
        ) {
          failed.push({ rosterId, error: "Student already assigned to this license." });
          continue;
        }

        let moodleUserId = student.studentId;
        try {
          const moodleUser = await ensureMoodleStudentByEmail({
            email: normalizedEmail,
            fullName: student.studentName,
          });
          moodleUserId = moodleUser.moodleUserId;
        } catch (error) {
          failed.push({
            rosterId,
            error: error instanceof Error ? error.message : "Could not create Moodle user.",
          });
          continue;
        }

        try {
          await enrolUserInCourse(moodleUserId, license.courseId);
        } catch (error) {
          // If Moodle throws noisy messaging errors, verify whether enrollment is already present.
          const enrollments = await getUserCourseEnrollments(moodleUserId).catch(() => []);
          const alreadyEnrolled = enrollments.some((entry) => entry.programId === license.courseId);
          if (!alreadyEnrolled) {
            failed.push({
              rosterId,
              error: error instanceof Error ? error.message : "Could not enroll Moodle user.",
            });
            continue;
          }
        }

        await createCourseEnrollment(moodleUserId, license.courseId).catch(() => undefined);

        const assignedAt = new Date().toISOString();
        const assignment = {
          id: `assignment-${license.id}-${moodleUserId}`,
          schoolUserId: req.session.user.id,
          licenseId: license.id,
          studentId: moodleUserId,
          studentEmail: student.studentEmail,
          studentName: student.studentName,
        };

        await prisma.schoolSeatAssignments.upsert({
          where: {
            licenseId_studentId: {
              licenseId: assignment.licenseId,
              studentId: assignment.studentId,
            },
          },
          update: {
            studentEmail: assignment.studentEmail,
            studentName: assignment.studentName,
          },
          create: assignment,
        });
        assigned.push({
          id: assignment.id,
          licenseId: license.id,
          studentMoodleId: moodleUserId,
          studentEmail: student.studentEmail,
          studentName: student.studentName,
          assignedAt,
        });
      }

      res.json({ success: true, assigned, failed });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to assign seats" });
    }
  });

  app.get(api.dashboard.schoolUsageReport.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const licenses = await getSchoolLicenses(req.session.user.id);
      const totalLicenses = licenses.length;
      const totalSeats = licenses.reduce((sum, license) => sum + license.totalSeats, 0);
      const usedSeats = licenses.reduce((sum, license) => sum + license.usedSeats, 0);
      const availableSeats = Math.max(totalSeats - usedSeats, 0);
      const utilizationRate = totalSeats > 0 ? Math.round((usedSeats / totalSeats) * 100) : 0;

      res.json({
        reportGeneratedAt: new Date().toISOString(),
        totalLicenses,
        totalSeats,
        usedSeats,
        availableSeats,
        utilizationRate,
        licenses: licenses.map((license) => ({
          licenseId: license.id,
          courseId: license.courseId,
          courseName: license.courseName,
          totalSeats: license.totalSeats,
          assignedSeats: license.usedSeats,
          activeUsers: license.usedSeats,
          lastAccessDates: license.assignedStudents.map((student) => ({
            studentId: student.studentId,
            lastAccessAt: student.assignedAt,
            enrollmentProgress: license.totalSeats > 0 ? Math.round((license.usedSeats / license.totalSeats) * 100) : 0,
          })),
        })),
        studentActivity: {
          activeStudents: usedSeats,
          inactiveStudents: Math.max(totalSeats - usedSeats, 0),
          totalEnrolled: usedSeats,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to generate usage report" });
    }
  });

  app.get(api.dashboard.schoolLicenseMetrics.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      const license = (await getSchoolLicenses(req.session.user.id)).find((entry) => entry.id === String(req.params.licenseId));
      if (!license) {
        return res.status(404).json({ message: "License not found" });
      }

      res.json({
        licenseId: license.id,
        courseId: license.courseId,
        courseName: license.courseName,
        totalSeats: license.totalSeats,
        assignedSeats: license.usedSeats,
        activeUsers: license.usedSeats,
        lastAccessDates: license.assignedStudents.map((student) => ({
          studentId: student.studentId,
          lastAccessAt: student.assignedAt,
          enrollmentProgress: license.totalSeats > 0 ? Math.round((license.usedSeats / license.totalSeats) * 100) : 0,
        })),
      });
    } catch (err) {
      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load license metrics" });
    }
  });

  app.get(api.schoolReports.dashboardStats.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      await ensureSchoolReportingTables();
      const stats = await buildSchoolDashboardStats(req.session.user.id);
      return res.json(stats);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load school stats" });
    }
  });

  app.get(api.schoolReports.archive.path, async (req, res) => {
    try {
      if (!req.session.user || req.session.user.role !== "school") {
        return res.status(403).json({ message: "School access required" });
      }

      await ensureSchoolReportingTables();
      const requested = typeof req.query.month === "string" ? req.query.month : undefined;
      const months = requested ? [requested] : Array.from({ length: 24 }, (_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - index);
        return monthKey(date);
      });

      const rows = [] as Array<{ month: string; summaryTitle: string; availabilityNote: string; stats: Awaited<ReturnType<typeof buildSchoolDashboardStats>> }>;
      for (const month of months) {
        const existing = await prisma.$queryRawUnsafe<Array<{ snapshot_data: unknown }>>(
          `SELECT snapshot_data FROM school_monthly_snapshots WHERE school_user_id = $1 AND snapshot_month = $2 LIMIT 1`,
          req.session.user.id,
          month,
        );

        let stats = existing[0]?.snapshot_data as Awaited<ReturnType<typeof buildSchoolDashboardStats>> | undefined;
        if (!stats) {
          stats = await buildSchoolDashboardStats(req.session.user.id);
          await prisma.$executeRawUnsafe(
            `INSERT INTO school_monthly_snapshots (id, school_user_id, snapshot_month, snapshot_data, created_at, updated_at)
             VALUES ($1, $2, $3, $4::jsonb, NOW(), NOW())
             ON CONFLICT (school_user_id, snapshot_month)
             DO UPDATE SET snapshot_data = EXCLUDED.snapshot_data, updated_at = NOW()`,
            randomUUID(),
            req.session.user.id,
            month,
            JSON.stringify(stats),
          );
        }

        rows.push({
          month,
          summaryTitle: "Seat Utilization",
          availabilityNote: "24 months accessible",
          stats,
        });
      }

      return res.json({ months: rows });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load report archive" });
    }
  });

  app.post(api.forms.submit.path, async (req, res) => {
    try {
      if (!req.session.user || !["teacher", "school", "admin"].includes(req.session.user.role)) {
        return res.status(403).json({ message: "Teacher, school, or admin access required" });
      }

      await ensureSchoolReportingTables();
      const input = api.forms.submit.input.parse(req.body);
      const schoolUserId = req.session.user.role === "school" ? req.session.user.id : req.session.user.id;
      const submissionId = randomUUID();

      const created = await prisma.$transaction(async (tx) => {
        await tx.$executeRawUnsafe(
          `INSERT INTO school_form_submissions
           (id, school_user_id, teacher_user_id, report_month, status, payload, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6::jsonb, NOW(), NOW())`,
          submissionId,
          schoolUserId,
          req.session.user?.id ?? null,
          input.payload.reportMonth,
          input.status,
          JSON.stringify(input.payload),
        );

        await tx.$executeRawUnsafe(
          `INSERT INTO school_report_activity_logs (id, school_user_id, actor_user_id, action, details, created_at)
           VALUES ($1, $2, $3, $4, $5::jsonb, NOW())`,
          randomUUID(),
          schoolUserId,
          req.session.user!.id,
          "FORM_SUBMITTED",
          JSON.stringify({ submissionId, status: input.status, month: input.payload.reportMonth }),
        );

        const rows = await tx.$queryRawUnsafe<Array<{
          id: string;
          school_user_id: number;
          teacher_user_id: number | null;
          report_month: string;
          status: string;
          payload: unknown;
          reviewed_by_user_id: number | null;
          review_notes: string | null;
          reviewed_at: Date | null;
          created_at: Date;
          updated_at: Date;
        }>>(`SELECT * FROM school_form_submissions WHERE id = $1`, submissionId);
        return rows[0];
      });

      return res.status(201).json({
        id: created.id,
        schoolUserId: created.school_user_id,
        teacherUserId: created.teacher_user_id,
        status: created.status,
        reportMonth: created.report_month,
        payload: created.payload,
        reviewedByUserId: created.reviewed_by_user_id,
        reviewNotes: created.review_notes,
        reviewedAt: created.reviewed_at ? created.reviewed_at.toISOString() : null,
        createdAt: created.created_at.toISOString(),
        updatedAt: created.updated_at.toISOString(),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to submit form" });
    }
  });

  app.get(api.forms.list.path, async (req, res) => {
    try {
      if (!req.session.user || !["teacher", "school", "admin"].includes(req.session.user.role)) {
        return res.status(403).json({ message: "Teacher, school, or admin access required" });
      }

      await ensureSchoolReportingTables();
      const month = typeof req.query.month === "string" ? req.query.month : undefined;
      const status = typeof req.query.status === "string" ? req.query.status : undefined;

      const rows = await prisma.$queryRawUnsafe<Array<{
        id: string;
        school_user_id: number;
        teacher_user_id: number | null;
        report_month: string;
        status: string;
        payload: unknown;
        reviewed_by_user_id: number | null;
        review_notes: string | null;
        reviewed_at: Date | null;
        created_at: Date;
        updated_at: Date;
      }>>(
        `SELECT *
         FROM school_form_submissions
         WHERE school_user_id = $1
           AND ($2::text IS NULL OR report_month = $2::text)
           AND ($3::text IS NULL OR status = $3::text)
         ORDER BY created_at DESC`,
        req.session.user.id,
        month ?? null,
        status ?? null,
      );

      return res.json({
        submissions: rows.map((row) => ({
          id: row.id,
          schoolUserId: row.school_user_id,
          teacherUserId: row.teacher_user_id,
          status: row.status,
          reportMonth: row.report_month,
          payload: row.payload,
          reviewedByUserId: row.reviewed_by_user_id,
          reviewNotes: row.review_notes,
          reviewedAt: row.reviewed_at ? row.reviewed_at.toISOString() : null,
          createdAt: row.created_at.toISOString(),
          updatedAt: row.updated_at.toISOString(),
        })),
      });
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to list form submissions" });
    }
  });

  app.put(api.forms.review.path, async (req, res) => {
    try {
      if (!req.session.user || !["school", "admin"].includes(req.session.user.role)) {
        return res.status(403).json({ message: "School or admin access required" });
      }

      await ensureSchoolReportingTables();
      const input = api.forms.review.input.parse(req.body);
      const submissionId = req.params.id;

      const updated = await prisma.$transaction(async (tx) => {
        const existing = await tx.$queryRawUnsafe<Array<{ id: string; school_user_id: number; payload: unknown; report_month: string }>>(
          `SELECT id, school_user_id, payload, report_month FROM school_form_submissions WHERE id = $1 LIMIT 1`,
          submissionId,
        );
        if (!existing[0]) {
          return null;
        }

        await tx.$executeRawUnsafe(
          `UPDATE school_form_submissions
           SET status = $2, reviewed_by_user_id = $3, review_notes = $4, reviewed_at = NOW(), updated_at = NOW()
           WHERE id = $1`,
          submissionId,
          input.status,
          req.session.user!.id,
          input.reviewNotes || null,
        );

        await tx.$executeRawUnsafe(
          `INSERT INTO school_report_activity_logs (id, school_user_id, actor_user_id, action, details, created_at)
           VALUES ($1, $2, $3, $4, $5::jsonb, NOW())`,
          randomUUID(),
          existing[0].school_user_id,
          req.session.user!.id,
          "FORM_REVIEWED",
          JSON.stringify({ submissionId, status: input.status, reviewNotes: input.reviewNotes || "" }),
        );

        const rows = await tx.$queryRawUnsafe<Array<{
          id: string;
          school_user_id: number;
          teacher_user_id: number | null;
          report_month: string;
          status: string;
          payload: unknown;
          reviewed_by_user_id: number | null;
          review_notes: string | null;
          reviewed_at: Date | null;
          created_at: Date;
          updated_at: Date;
        }>>(`SELECT * FROM school_form_submissions WHERE id = $1`, submissionId);
        return rows[0];
      });

      if (!updated) {
        return res.status(404).json({ message: "Form submission not found" });
      }

      return res.json({
        id: updated.id,
        schoolUserId: updated.school_user_id,
        teacherUserId: updated.teacher_user_id,
        status: updated.status,
        reportMonth: updated.report_month,
        payload: updated.payload,
        reviewedByUserId: updated.reviewed_by_user_id,
        reviewNotes: updated.review_notes,
        reviewedAt: updated.reviewed_at ? updated.reviewed_at.toISOString() : null,
        createdAt: updated.created_at.toISOString(),
        updatedAt: updated.updated_at.toISOString(),
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to review form" });
    }
  });

  app.post(api.schoolReports.syncRisk.path, async (req, res) => {
    try {
      if (!req.session.user || !["school", "admin"].includes(req.session.user.role)) {
        return res.status(403).json({ message: "School or admin access required" });
      }

      const result = await syncSchoolRiskFlags(req.session.user.id);
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to sync risk flags" });
    }
  });

}
