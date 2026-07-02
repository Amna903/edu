import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";

import { storage } from "../db/storage.js";
import { getLmsCourseById, getLmsCourses } from "../services/moodle/moodle.js";
import { upsertCourseCatalogFromMoodle, getUserCourseEnrollments } from "../repositories/course-store.js";
import { getUserCoursesForDashboard } from "../services/moodle/moodle-dashboard.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { moodlePostWithTokenFallback } from "../services/moodle/moodle-auth.js";
import { getMoodleAdminToken } from "../services/moodle/moodle-tokens.js";


export function registerAdminRoutes(app: Express, ctx: RouteContext) {
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

      const whereClause = {
        AND: [
          { username: { not: req.session.user.username } }, // Exclude current admin
          search
            ? {
                OR: [
                  { username: { contains: search, mode: "insensitive" as const } },
                  { email: { contains: search, mode: "insensitive" as const } },
                  { firstName: { contains: search, mode: "insensitive" as const } },
                  { lastName: { contains: search, mode: "insensitive" as const } },
                ],
              }
            : {},
        ],
      };

      // Get all users from Prisma with pagination and search
      const users = await prisma.user.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });

      const total = await prisma.user.count({
        where: whereClause,
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
      await (prisma as any).user.update({
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
        const moodleToken = getMoodleAdminToken();
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
      await (prisma as any).user.update({
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
          categoryId: course.categoryId,
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
      const courses = await getLmsCourses({ adminTokenOnly: true });
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
              categoryId: course.categoryId,
              categoryName: course.category,
              isVisible: course.visible,
              price: 0,
              lastSyncedAt: new Date(),
            },
            update: {
              fullname: course.title,
              summary: course.fullDescription,
              categoryId: course.categoryId,
              categoryName: course.category,
              isVisible: course.visible,
              lastSyncedAt: new Date(),
            },
          });
          coursesAffected++;
        }
      } else if (target === "USER_DIRECTORY") {
        const usersRes = await moodlePostWithTokenFallback<{ users: any[] }>(
          "core_user_get_users",
          new URLSearchParams({
            "criteria[0][key]": "email",
            "criteria[0][value]": "%%"
          }),
          [getMoodleAdminToken()],
        );
        const users = usersRes?.users || [];
        for (const user of users) {
          if (user.username === "admin" || user.username === req.session.user.username) {
            continue; // Skip the admin's own account
          }
          await (prisma as any).user.upsert({
            where: { moodleUserId: user.id },
            create: {
              moodleUserId: user.id,
              username: user.username,
              email: user.email || null,
              firstName: user.firstname || null,
              lastName: user.lastname || null,
              profileImage: user.profileimageurl || null,
              role: "student", // default role
              lastLoginAt: new Date(),
            },
            update: {
              username: user.username,
              email: user.email || null,
              firstName: user.firstname || null,
              lastName: user.lastname || null,
              profileImage: user.profileimageurl || null,
            },
          });
          coursesAffected++; // Reuse variable for users affected
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
        message: `Synced ${coursesAffected} ${target === "USER_DIRECTORY" ? "users" : "courses"} from Moodle`,
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
    const enrollments = await getUserCourseEnrollments(Number(req.params.userId));
    res.json(enrollments);
  });

}
