import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";
import { storage } from "../db/storage.js";
import {
  markNotificationReadInputSchema,
  parentLinkChildInputSchema,
  profileUpdateInputSchema,
  passwordChangeInputSchema,
  insertInquirySchema,
} from "../../shared/schema.js";
import { uploadSingleImage, handleUserProfileImageUpload, isS3Configured } from "../services/s3-upload.js";
import { getLmsCourseById, getLmsCourses, getLmsCourseBySlug, getLmsCourseDetail } from "../services/moodle/moodle.js";
import { createCourseEnrollment, getUserCourseEnrollments } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { changeMoodlePassword, fetchCurrentUser, updateMoodleProfile } from "../services/moodle/moodle-auth.js";
import { countryToMoodleIso, normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";
import {
  getStudentActivityTimelineForDashboard,
  getStudentCertificatesForDashboard,
  getStudentGradesForDashboard,
  getUserCoursesForDashboard,
} from "../services/moodle/moodle-dashboard.js";
import { buildOrigin } from "../services/payments.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { getStoredUserByMoodleUserId, linkParentToChild, syncUserFromMoodleSession } from "../repositories/user-store.js";


export function registerDashboardRoutes(app: Express, ctx: RouteContext) {
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

  app.post("/api/profile/upload-image", uploadSingleImage, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }


      if (!isS3Configured()) {
        return res.json({ configured: false });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Upload process
      const result = await handleUserProfileImageUpload(
        req.session.user.id,
        req.file,
        req.session.user,
        req.session.moodleToken
      );
      // Upload ke baad DB se fetch karein
      const updatedUser = await prisma.user.findUnique({
        where: { moodleUserId: req.session.user.id },
        select: { id: true, username: true, profileImage: true }
      });
      console.log("✅ [Profile Image] DB after update:", updatedUser);
      if (!result.success) {
        return res.status(result.status).json({ message: result.message });
      }

      return res.json({
        url: result.imageUrl,
        message: "Profile image updated successfully"
      });

    } catch (error) {
      console.error("[Profile Image] Route Error:", error);
      return res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to upload profile image",
      });
    }
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
      console.log("🔍 [Profile Update] Input received:", {
        firstname: input.firstname,
        lastname: input.lastname,
        city: input.city,
        country: input.country,
        phone: input.phone,
        description: input.description,
      });

      const usernameAsEmail = /\S+@\S+\.\S+/.test(req.session.user.username) ? req.session.user.username : "";
      const lockedEmail = req.session.user.email || input.email || usernameAsEmail;
      if (!lockedEmail) {
        return res.status(400).json({ message: "Email is missing for this account. Please contact support." });
      }

      // 1. Moodle ke liye ISO convert karein
      const isoCountry = countryToMoodleIso(input.country);
      console.log("🔍 [Profile Update] Country conversion:", {
        inputCountry: input.country,
        isoCountry: isoCountry,
        finalCountry: isoCountry || input.country,
      });

      console.log("🔍 [Profile Update] Calling updateMoodleProfile with country:", isoCountry || input.country);
      await updateMoodleProfile(
        req.session.user.id,
        {
          firstname: input.firstname,
          lastname: input.lastname,
          email: lockedEmail,
          city: input.city,
          country: isoCountry || input.country,
          phone: input.phone,
          description: input.description,
        },
        req.session.moodleToken
      );
      console.log("✅ [Profile Update] updateMoodleProfile completed successfully");

      // 2. Local DB mein country save karein
      const scholarshipCountry = normalizeScholarshipCountry(input.country);
      if (scholarshipCountry) {
        console.log("🔍 [Profile Update] Saving country to local DB:", {
          moodleUserId: req.session.user.id,
          country: scholarshipCountry,
        });
        await storage.setRegisteredCountry(req.session.user.id, scholarshipCountry).catch((error) => {
          console.warn(
            "[dashboard] Failed to persist registered country after profile update:",
            error instanceof Error ? error.message : String(error),
          );
        });
        console.log("✅ [Profile Update] Local DB save completed");
      } else {
        console.log("ℹ️ [Profile Update] No scholarship country to save (normalize returned null)");
      }

      // 3. Moodle se fresh user data fetch karein
      console.log("🔍 [Profile Update] Fetching updated user from Moodle...");
      const user = await fetchCurrentUser(req.session.moodleToken);
      console.log("✅ [Profile Update] User fetched from Moodle:", {
        id: user.id,
        username: user.username,
        country: user.country,
        city: user.city,
      });

      req.session.user = user;
      res.json(user);
    } catch (err) {
      console.error("❌ [Profile Update] Error occurred:", err);
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
        console.log("🔄 [Profile Update] Fallback user set:", { country: user.country });
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
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to fetch LMS courses",
      });
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

  app.get(api.lmsCourses.getDetail.path, async (req, res) => {
    try {
      const courseId = Number.parseInt(req.params.id, 10);
      if (!Number.isFinite(courseId) || courseId <= 0) {
        return res.status(400).json({ message: "Invalid course id" });
      }

      const course = await getLmsCourseDetail(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json(course);
    } catch (error) {
      console.error("Failed to fetch LMS course detail:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "Failed to fetch LMS course detail",
      });
    }
  });

  app.post(api.enrollments.free.path, async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { courseId } = api.enrollments.free.input.parse(req.body);
      const course = await getLmsCourseById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (typeof course.price === "number" && course.price > 0) {
        return res.status(400).json({ message: "This course requires payment" });
      }

      const existing = await getUserCourseEnrollments(req.session.user.id);
      if (existing.some((entry: { programId: number }) => entry.programId === courseId)) {
        return res.json({ success: true, message: "You are already enrolled in this course." });
      }

      try {
        await enrolUserInCourse(req.session.user.id, courseId);
      } catch (moodleError) {
        console.error(`[moodle] Failed to enrol user in Moodle course ${courseId}:`, moodleError);
        return res.status(502).json({ message: "Failed to enrol in the course. Please try again." });
      }
      await createCourseEnrollment(req.session.user.id, courseId);

      res.json({ success: true, message: "Successfully enrolled in the course." });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: err instanceof Error ? err.message : "Failed to enroll in course" });
    }
  });

 // ==========================================
  // SSO LOGIC START: COURSE LOGIN
  // ==========================================
  app.get("/api/dashboard/student/course-login/:id", async (req, res) => {
    try {
      const courseId = Number(req.params.id);
      if (!Number.isFinite(courseId)) {
        return res.status(400).json({ message: "Invalid course id" });
      }

      const fallbackUrl = `${env.moodle.baseUrl}/course/view.php?id=${courseId}`;

      if (!req.session.user || !req.session.moodleToken) {
        console.error("❌ [SSO Course] Failed: User or moodleToken missing in session.");
        return res.redirect(fallbackUrl);
      }

      if (!req.session.moodlePrivateToken) {
        console.error("❌ [SSO Course] Failed: moodlePrivateToken missing in session.");
        return res.redirect(fallbackUrl);
      }

      // 🔥 FIX: Removed 'userid' from params
      const params = new URLSearchParams({
        wstoken: req.session.moodleToken,
        wsfunction: "tool_mobile_get_autologin_key",
        moodlewsrestformat: "json",
        privatetoken: req.session.moodlePrivateToken,
      });

      const response = await fetch(`${env.moodle.baseUrl}/webservice/rest/server.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "MoodleMobile",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        console.error(`❌ [SSO Course Error] HTTP ${response.status} from Moodle`);
        return res.redirect(fallbackUrl);
      }

      const data = await response.json();
      if (data.exception || !data.autologinurl) {
        console.error("❌ [SSO Course Error] Moodle returned an exception:", data);
        return res.redirect(fallbackUrl);
      }

      const autologinUrl = new URL(data.autologinurl);
      if (!autologinUrl.searchParams.has('userid') && req.session.user?.id) {
        autologinUrl.searchParams.set('userid', req.session.user.id.toString());
      }
      if (!autologinUrl.searchParams.has('key') && data.key) {
        autologinUrl.searchParams.set('key', data.key);
      }
      autologinUrl.searchParams.set('wantsurl', `/course/view.php?id=${courseId}`);
      const finalUrl = autologinUrl.toString();
      console.log(`✅ [SSO Course] Success! Redirecting to:`, finalUrl);
      return res.redirect(finalUrl);

    } catch (err) {
      console.error("❌ [SSO Course Error] Try/Catch triggered:", err);
      const courseId = req.params.id;
      const fallbackUrl = `${env.moodle.baseUrl}/course/view.php?id=${courseId}`;
      return res.redirect(fallbackUrl);
    }
  });
 // ==========================================
  // SSO LOGIC START: MAIN SSO LOGIN
  // ==========================================
  app.get("/api/dashboard/student/sso-login", async (req, res) => {
    try {
      const fallbackUrl = `${env.moodle.baseUrl}/my`;

      if (!req.session.user || !req.session.moodleToken) {
        console.error("❌ [SSO Main] Failed: User or moodleToken missing in session.");
        return res.redirect(fallbackUrl);
      }

      if (!req.session.moodlePrivateToken) {
        console.error("❌ [SSO Main] Failed: moodlePrivateToken missing in session.");
        return res.redirect(fallbackUrl);
      }

      // 🔥 FIX: Removed 'userid' from params
      const params = new URLSearchParams({
        wstoken: req.session.moodleToken,
        wsfunction: "tool_mobile_get_autologin_key",
        moodlewsrestformat: "json",
        privatetoken: req.session.moodlePrivateToken,
      });

      const response = await fetch(`${env.moodle.baseUrl}/webservice/rest/server.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "MoodleMobile",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        console.error(`❌ [SSO Main Error] HTTP ${response.status} from Moodle`);
        return res.redirect(fallbackUrl);
      }

      const data = await response.json();
      if (data.exception || !data.autologinurl) {
        console.error("❌ [SSO Main Error] Moodle exception:", data);
        return res.redirect(fallbackUrl);
      }

      const autologinUrl = new URL(data.autologinurl);
      if (!autologinUrl.searchParams.has('userid') && req.session.user?.id) {
        autologinUrl.searchParams.set('userid', req.session.user.id.toString());
      }
      if (!autologinUrl.searchParams.has('key') && data.key) {
        autologinUrl.searchParams.set('key', data.key);
      }
      autologinUrl.searchParams.set('wantsurl', '/my/');
      const finalUrl = autologinUrl.toString();
      console.log(`✅ [SSO Main] Success! Redirecting sso-login to:`, finalUrl);
      return res.redirect(finalUrl);

    } catch (err) {
      console.error("❌ [SSO Main Error] Try/Catch triggered:", err);
      const fallbackUrl = `${env.moodle.baseUrl}/my`;
      return res.redirect(fallbackUrl);
    }
  });
}