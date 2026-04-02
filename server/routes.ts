
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { checkoutRequestSchema, insertInquirySchema, loginInputSchema, parentLinkChildInputSchema, passwordChangeInputSchema, profileUpdateInputSchema, registerInputSchema } from "@shared/schema";
import { getLmsCourseById, getLmsCourseBySlug, getLmsCourses } from "./moodle";
import { changeMoodlePassword, fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "./moodle-auth";
import { enrolUserInCourse } from "./moodle-commerce";
import { getStudentActivityTimelineForDashboard, getStudentCertificatesForDashboard, getStudentGradesForDashboard, getUserCoursesForDashboard } from "./moodle-dashboard";
import { buildOrigin, createSafepayCheckout } from "./payments";
import { env } from "./config";
import { getLinkedChildren, getStoredUserByMoodleUserId, linkParentToChild } from "./user-store";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
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

  app.post(api.auth.updateProfile.path, async (req, res) => {
    try {
      if (!req.session.user || !req.session.moodleToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const input = profileUpdateInputSchema.parse(req.body);
      await updateMoodleProfile(req.session.user.id, {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        city: input.city,
        country: input.country,
        phone: input.phone,
        description: input.description,
      });

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

      return res.status(400).json({
        message: err instanceof Error ? err.message : "Profile update failed",
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
      
      for (const item of items) {
        await enrolUserInCourse(req.session.user.id, item.programId);

        await storage.createOrderItem({
          orderId: order.id,
          programId: item.programId,
          price: item.price
        });
        
        await storage.createEnrollment({
          userId,
          programId: item.programId
        });
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

  app.get(api.dashboard.student.path, async (req, res) => {
    if (!req.session.user || !req.session.moodleToken) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const [courses, grades, activities] = await Promise.all([
      getUserCoursesForDashboard(req.session.moodleToken, req.session.user.id),
      getStudentGradesForDashboard(req.session.user.id),
      getStudentActivityTimelineForDashboard(req.session.moodleToken, req.session.user.id),
    ]);

    const courseRows = courses.map((course: any) => {
      const grade = grades.find((item) => item.courseId === course.id);
      return {
        id: course.id,
        title: course.fullname,
        progress: course.progress || 0,
        completed: Boolean(course.completed),
        grade: grade?.grade || null,
        percentage: grade?.percentage ?? null,
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
