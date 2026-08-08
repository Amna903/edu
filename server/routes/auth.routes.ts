import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";
import { prisma } from "../db/prisma.js";

import { storage } from "../db/storage.js";
import {
  loginInputSchema,

  registerInputSchema
} from "../../shared/schema.js";
import { fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "../services/moodle/moodle-auth.js";
import { env } from "../config/config.js";
import { linkGuestDiagnosticToAccount } from "../services/diagnostics.js";
import { countryToMoodleIso, normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";


export function registerAuthRoutes(app: Express, ctx: RouteContext) {
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
      "1234": { schoolName: "Test School (Dev Only)" }, // TODO: remove before production
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
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"];
    try {
      const input = loginInputSchema.parse(req.body);
      const result = await loginWithMoodle(input);

      // §10 — Log successful login
      import("../services/logger.js").then(({ logLoginAttempt }) => {
        logLoginAttempt({
          username: input.username,
          ipAddress: ip,
          userAgent,
          success: true,
          moodleUserId: result.user.id,
        }).catch(() => undefined);
      }).catch(() => undefined);

      // ==========================================
      // SSO LOGIC START: DO NOT CHANGE
      // ==========================================
      req.session.moodleToken = result.token;
      req.session.moodlePrivateToken = result.privateToken ?? undefined;
      req.session.user = result.user;
      // ==========================================
      // SSO LOGIC END
      // ==========================================

      const pendingCountry = await storage.takeRegistrationCountryForUsername(result.user.username);
      if (pendingCountry) {
        await storage.setRegisteredCountry(result.user.id, pendingCountry).catch((error) => {
          console.warn(
            "[auth] Failed to persist registered country after login:",
            error instanceof Error ? error.message : String(error),
          );
        });
        const iso = countryToMoodleIso(pendingCountry);
        if (iso && !result.user.country) {
          await updateMoodleProfile(
            result.user.id,
            {
              firstname: result.user.firstname || "",
              lastname: result.user.lastname || "",
              email: result.user.email || input.username,
              country: iso,
            },
            result.token,
          ).catch(() => undefined);
          req.session.user = await fetchCurrentUser(result.token).catch(() => result.user);
        }
      }

      await linkGuestDiagnosticToAccount({ moodleUserId: result.user.id, ip: getClientIp(req) }).catch(() => undefined);
      res.json(req.session.user);
    } catch (err) {
      // §10 — Log failed login
      const input = req.body as { username?: string };
      if (input.username) {
        import("../services/logger.js").then(({ logLoginAttempt }) => {
          logLoginAttempt({
            username: input.username as string,
            ipAddress: ip,
            userAgent,
            success: false,
            failureReason: err instanceof Error ? err.message : "Unknown error",
          }).catch(() => undefined);
        }).catch(() => undefined);
      }

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
        // ==========================================
        // SSO LOGIC START: DO NOT CHANGE
        // ==========================================
        req.session.moodleToken = loginResult.token;
        req.session.moodlePrivateToken = loginResult.privateToken ?? undefined;
        req.session.user = loginResult.user;
        // ==========================================
        // SSO LOGIC END
        // ==========================================
        const scholarshipCountry = normalizeScholarshipCountry(input.country);
        if (scholarshipCountry) {
          await storage.setRegisteredCountry(loginResult.user.id, scholarshipCountry).catch((error) => {
            console.warn(
              "[auth] Failed to persist registered country after signup:",
              error instanceof Error ? error.message : String(error),
            );
          });
          const iso = countryToMoodleIso(scholarshipCountry);
          if (iso && req.session.moodleToken) {
            await updateMoodleProfile(
              loginResult.user.id,
              {
                firstname: loginResult.user.firstname || input.firstname,
                lastname: loginResult.user.lastname || input.lastname,
                email: loginResult.user.email || input.email,
                country: iso,
              },
              req.session.moodleToken,
            ).catch(() => undefined);
            const refreshed = await fetchCurrentUser(req.session.moodleToken).catch(() => loginResult.user);
            req.session.user = refreshed;
          }
        }
        await linkGuestDiagnosticToAccount({ moodleUserId: loginResult.user.id, ip: getClientIp(req) }).catch(() => undefined);
      } else {
        const scholarshipCountry = normalizeScholarshipCountry(input.country);
        if (scholarshipCountry) {
          await storage.setRegistrationCountryForUsername(input.username, scholarshipCountry).catch((error) => {
            console.warn(
              "[auth] Failed to persist pending registration country:",
              error instanceof Error ? error.message : String(error),
            );
          });
        }
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

      const rawMsg = err instanceof Error ? err.message : "Registration failed";
      const friendlyMsg = rawMsg.includes("forcepasswordchange")
        ? "Account was created but automatic sign-in failed due to a Moodle password policy. Please ask your administrator to disable 'Force password change' in Moodle Site Policies, or try logging in manually."
        : rawMsg;

      return res.status(400).json({
        message: friendlyMsg,
      });
    }
  });

  app.get(api.auth.me.path, async (req, res) => {
    try {
      if (!req.session.moodleToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // const user = await fetchCurrentUser(req.session.moodleToken);
      // 1. Moodle se fetch
    const moodleUser = await fetchCurrentUser(req.session.moodleToken);
    console.log("📸 Moodle user:", moodleUser.id, "profileImage:", moodleUser.profileImageUrl);
    
    // 2. Local DB se fetch
    const localUser = await prisma.user.findUnique({
      where: { moodleUserId: moodleUser.id },
      select: { profileImage: true },
    });
    console.log("📸 Local DB profileImage:", localUser?.profileImage);

    // 3. Merge & Proxy Moodle pluginfile image URLs
    const rawPicUrl = localUser?.profileImage || moodleUser.profileImageUrl;
    let finalProfileImage = rawPicUrl;
    if (rawPicUrl && rawPicUrl.includes("pluginfile.php")) {
      finalProfileImage = `/api/user/picture-proxy?url=${encodeURIComponent(rawPicUrl)}`;
    }

    const user = {
      ...moodleUser,
      profileImage: finalProfileImage,
      profileImageUrl: finalProfileImage,
    };
    console.log("📸 Final response profile image:", user.profileImage);
      req.session.user = user;
      await linkGuestDiagnosticToAccount({ moodleUserId: user.id, ip: getClientIp(req) }).catch(() => undefined);
      res.json(user);
    } catch (err) {
      req.session.destroy(() => undefined);
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // ==========================================
  // OPENCODE: Forgot password (SRS 1.5) — programmatically triggers Moodle's
  // built-in forgot-password flow. The server POSTs to Moodle's forgot_password.php
  // on behalf of the user, so Moodle sends the reset email using its own SMTP.
  // The user stays on the EduMeUp app and never sees the Moodle page.
  // ==========================================
  app.post("/api/auth/forgot", async (req, res) => {
    try {
      const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const moodleBase = env.moodle.baseUrl?.replace(/\/+$/, "");
      if (!moodleBase) {
        return res.status(500).json({ message: "Moodle base URL is not configured" });
      }

      // Step 1: GET the forgot password page to obtain the sesskey and logintoken
      const forgotPageUrl = `${moodleBase}/login/forgot_password.php`;
      const pageResponse = await fetch(forgotPageUrl, {
        method: "GET",
        headers: { "User-Agent": "EduMeUp/1.0" },
        redirect: "follow",
      });

      const pageHtml = await pageResponse.text();
      const cookies = pageResponse.headers.getSetCookie?.() || [];
      const cookieHeader = cookies.map((c) => c.split(";")[0]).join("; ");

      // Extract sesskey
      const sesskeyMatch = pageHtml.match(/name="sesskey"\s+value="([^"]+)"/);
      const sesskey = sesskeyMatch?.[1] || "";

      // Extract logintoken
      const logintokenMatch = pageHtml.match(/name="logintoken"\s+value="([^"]+)"/);
      const logintoken = logintokenMatch?.[1] || "";

      if (!sesskey) {
        console.warn("[forgot-password] Could not extract sesskey from Moodle page");
        // Still return success to not reveal account existence
        return res.json({ success: true });
      }

      // Step 2: POST the form data to Moodle's forgot_password.php
      const formBody = new URLSearchParams();
      formBody.set("sesskey", sesskey);
      if (logintoken) formBody.set("logintoken", logintoken);
      formBody.set("email", email.trim());

      const submitResponse = await fetch(forgotPageUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "EduMeUp/1.0",
          Cookie: cookieHeader,
        },
        body: formBody.toString(),
        redirect: "follow",
      });

      if (env.authDebug === "1") {
        const responseText = await submitResponse.text();
        console.log(`[forgot-password] Moodle response status: ${submitResponse.status}, body snippet: ${responseText.substring(0, 300)}`);
      }

      // Always return success (don't reveal whether email exists)
      res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      console.error("[forgot-password] error:", err);
      res.status(500).json({ message: "Failed to send password reset email" });
    }
  });

}
