import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";

import { storage } from "../db/storage.js";
import {
  loginInputSchema,

  registerInputSchema
} from "../../shared/schema.js";
import {  fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "../services/moodle/moodle-auth.js";
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

      req.session.moodleToken = result.token;
      req.session.moodlePrivateToken = result.privateToken ?? undefined;
      req.session.user = result.user;

      const pendingCountry = await storage.takeRegistrationCountryForUsername(result.user.username);
      if (pendingCountry) {
        await storage.setRegisteredCountry(result.user.id, pendingCountry);
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
        req.session.moodleToken = loginResult.token;
        req.session.moodlePrivateToken = loginResult.privateToken ?? undefined;
        req.session.user = loginResult.user;
        const scholarshipCountry = normalizeScholarshipCountry(input.country);
        if (scholarshipCountry) {
          await storage.setRegisteredCountry(loginResult.user.id, scholarshipCountry);
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
          await storage.setRegistrationCountryForUsername(input.username, scholarshipCountry);
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

      const user = await fetchCurrentUser(req.session.moodleToken);
      req.session.user = user;
      await linkGuestDiagnosticToAccount({ moodleUserId: user.id, ip: getClientIp(req) }).catch(() => undefined);
      res.json(user);
    } catch (err) {
      req.session.destroy(() => undefined);
      res.status(401).json({ message: "Not authenticated" });
    }
  });

}
