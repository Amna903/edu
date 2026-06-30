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
import {
  getStudentActivityTimelineForDashboard,
  getStudentGradesForDashboard,
  getUserCoursesForDashboard,
} from "../services/moodle/moodle-dashboard.js";
import { getStoredUserByMoodleUserId, linkParentToChild } from "../repositories/user-store.js";
import { buildOrigin, buildPayfastCheckoutFields, buildPayfastItemName } from "../services/payments.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { prisma } from "../db/prisma.js";
import {
  assertScholarshipCodeForUser,
  createScholarshipCodeRecord,
  resolveScholarshipCountryForUser,
} from "../services/scholarship.js";
import { normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";


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
      const enrolmentFailures: string[] = [];

      for (const item of items) {
        if (!isSchoolPurchase) {
          try {
            await enrolUserInCourse(req.session.user.id, item.programId);
            await createCourseEnrollment(req.session.user.id, item.programId);
          } catch (enrolError) {
            const message = enrolError instanceof Error ? enrolError.message : String(enrolError);
            console.error(`Failed to enrol user ${req.session.user.id} in course ${item.programId} for order ${order.id}:`, enrolError);
            enrolmentFailures.push(`course ${item.programId}: ${message}`);
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

      if (enrolmentFailures.length > 0) {
        await recordPaymentEvent(
          order.id,
          "enrolment_pending",
          `Order paid but Moodle enrolment failed and needs manual retry — ${enrolmentFailures.join("; ")}`,
        );
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

      for (const row of parsedRows) {
        if (!row.email || !row.email.includes("@")) {
          errors.push({ row: row.rowNumber, error: "Invalid email address." });
          continue;
        }

        const studentId = row.moodleUserId || Number.parseInt(`${Date.now()}${row.rowNumber}`, 10);
        const existingStudent = await prisma.schoolRosterStudents.findFirst({
          where: { schoolUserId: req.session.user.id, studentId },
        });
        if (existingStudent) {
          await prisma.schoolRosterStudents.update({
            where: { id: existingStudent.id },
            data: {
              studentEmail: row.email.toLowerCase(),
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
              studentEmail: row.email.toLowerCase(),
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
      const failed: Array<{ studentId: number; error: string }> = [];

      for (const studentId of input.studentIds) {
        if (license.usedSeats + assigned.length >= license.totalSeats) {
          failed.push({ studentId, error: "No seats remaining on this license." });
          continue;
        }

        const student = await getSchoolRosterStudent(req.session.user.id, studentId);
        if (!student) {
          failed.push({ studentId, error: "Student is not in this school's roster." });
          continue;
        }

        if (license.assignedStudents.some((entry) => entry.studentId === studentId) || assigned.some((entry) => entry.studentMoodleId === studentId)) {
          failed.push({ studentId, error: "Student already assigned to this license." });
          continue;
        }

        const assignedAt = new Date().toISOString();
        const assignment = {
          id: `assignment-${license.id}-${studentId}`,
          schoolUserId: req.session.user.id,
          licenseId: license.id,
          studentId,
          studentEmail: student.studentEmail,
          studentName: student.studentName,
        };

        await prisma.schoolSeatAssignments.create({ data: assignment });
        assigned.push({
          id: assignment.id,
          licenseId: license.id,
          studentMoodleId: studentId,
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

}
