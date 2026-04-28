
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { checkoutRequestSchema, insertInquirySchema, loginInputSchema, markNotificationReadInputSchema, parentLinkChildInputSchema, passwordChangeInputSchema, profileUpdateInputSchema, registerInputSchema } from "../shared/schema.js";
import { getLmsCourseById, getLmsCourseBySlug, getLmsCourses } from "./moodle.js";
import { changeMoodlePassword, fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "./moodle-auth.js";
import { enrolUserInCourse } from "./moodle-commerce.js";
import { getStudentActivityTimelineForDashboard, getStudentCertificatesForDashboard, getStudentGradesForDashboard, getUserCoursesForDashboard } from "./moodle-dashboard.js";
import { buildOrigin, createSafepayCheckout } from "./payments.js";
import { env } from "./config.js";
import { getStoredUserByMoodleUserId, linkParentToChild, syncUserFromMoodleSession } from "./user-store.js";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const notificationReadByUser = new Map<number, Set<number>>();

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
      const tickets = await storage.getInquiriesByEmail(input.email);
      tickets.slice(0, 5).forEach((ticket) => {
        notifications.push({
          id: notificationIdFromKey(`support-${input.userId}-${ticket.id}`),
          title: `Support ticket ${ticket.status === "new" ? "received" : ticket.status}`,
          message: ticket.subjectInterest || "Your support request has an update.",
          createdAt: ticket.createdAt ? new Date(ticket.createdAt).toISOString() : new Date().toISOString(),
          type: "support",
          actionUrl: "/dashboard/support",
        });
      });
    }

    return notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  // === INQUIRIES ===
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
        const fallbackProfile = await syncUserFromMoodleSession({
          moodleUserId: req.session.user.id,
          username: req.session.user.username,
          role: req.session.user.role,
          email: req.session.user.email || req.body?.email || null,
          firstName: req.body?.firstname || req.session.user.firstname || null,
          lastName: req.body?.lastname || req.session.user.lastname || null,
          profileImage: req.session.user.profileImageUrl || null,
        });

        const user = {
          ...req.session.user,
          firstname: fallbackProfile.firstName || req.session.user.firstname,
          lastname: fallbackProfile.lastName || req.session.user.lastname,
          email: fallbackProfile.email || req.session.user.email,
          city: req.body?.city || req.session.user.city || null,
          country: req.body?.country || req.session.user.country || null,
          phone: req.body?.phone || req.session.user.phone || null,
          description: req.body?.description || req.session.user.description || null,
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
      const input = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(input);
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

      const email = req.session.user.email;
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
      if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Only admin can reply to support tickets" });
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

      const authorName = req.session.user.fullname || req.session.user.username || "Support";
      const previousMessage = ticket.message ?? "";
      const mergedMessage = `${previousMessage}\n\n--- Support Reply (${authorName}) ---\n${replyMessage}`.trim();

      const updated = await storage.updateInquiry(ticketId, {
        message: mergedMessage,
        status: "contacted",
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

    const childIds = await getLinkedChildren(req.session.user.id);
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

