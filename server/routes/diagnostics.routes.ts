import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";

import {
  diagnosticEligibilityInputSchema,
  diagnosticStartInputSchema,
  diagnosticAnswerInputSchema,
  diagnosticCompleteInputSchema,
} from "../../shared/schema.js";
import {
  completeDiagnosticSession,
  createDiagnosticSession,
  getDiagnosticContent,
  getDiagnosticEligibility,
  getDiagnosticResults,
  saveDiagnosticAnswer,
} from "../services/diagnostics.js";


export function registerDiagnosticsRoutes(app: Express, ctx: RouteContext) {
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

  app.get(api.diagnostics.eligibility.path, async (req, res) => {
    try {
      const parsed = diagnosticEligibilityInputSchema.partial().safeParse({
        diagnosticType: req.query.diagnosticType ? Number(req.query.diagnosticType) : req.query.type ? Number(req.query.type) : undefined,
        grade: typeof req.query.grade === "string" ? req.query.grade : undefined,
        subject: typeof req.query.subject === "string" ? req.query.subject : undefined,
      });

      if (!parsed.success) {
        return res.status(400).json({ message: parsed.error.errors[0]?.message || "Invalid request" });
      }

      const diagnosticType = Number((req.query.diagnosticType ?? req.query.type) || 1);
      const eligibility = await getDiagnosticEligibility({
        diagnosticType,
        moodleUserId: req.session.user?.id ?? null,
        grade: parsed.data.grade ?? null,
        subject: parsed.data.subject ?? null,
        ip: getClientIp(req),
      });

      return res.json(eligibility);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to check eligibility" });
    }
  });

  app.post(api.diagnostics.start.path, async (req, res) => {
    try {
      const input = diagnosticStartInputSchema.parse(req.body);

      const session = await createDiagnosticSession({
        diagnosticType: input.diagnosticType,
        moodleUserId: req.session.user?.id ?? null,
        ip: getClientIp(req),
        grade: input.grade ?? null,
        subject: input.subject ?? null,
        paid: input.paid ?? false,
      });

      if (!session.eligible || !("sessionToken" in session)) {
        return res.json(session);
      }

      return res.json({
        eligible: true,
        sessionToken: session.sessionToken,
        variant: session.variant ?? null,
        diagnosticType: session.diagnosticType,
        redirectUrl: `/diagnostics/results/${session.sessionToken}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to start diagnostic" });
    }
  });

  app.get(api.diagnostics.content.path, async (req, res) => {
    try {
      const sessionToken = typeof req.params.sessionToken === "string" ? req.params.sessionToken : "";
      const content = await getDiagnosticContent(sessionToken);
      if (!content) {
        return res.status(404).json({ message: "Diagnostic session not found" });
      }

      return res.json(content);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load diagnostic content" });
    }
  });

  app.post(api.diagnostics.answer.path, async (req, res) => {
    try {
      const input = diagnosticAnswerInputSchema.parse(req.body);
      await saveDiagnosticAnswer({
        sessionToken: input.sessionToken,
        questionId: input.questionId,
        answer: input.answer,
      });
      return res.json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to save answer" });
    }
  });

  app.post(api.diagnostics.complete.path, async (req, res) => {
    try {
      const input = diagnosticCompleteInputSchema.parse(req.body);
      const result = await completeDiagnosticSession({ sessionToken: input.sessionToken });
      return res.json({ reportId: result.reportId, redirectUrl: result.redirectUrl });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to complete diagnostic" });
    }
  });

  app.get(api.diagnostics.results.path, async (req, res) => {
    try {
      const sessionToken = typeof req.params.sessionToken === "string" ? req.params.sessionToken : "";
      const result = await getDiagnosticResults(sessionToken);
      if (!result) {
        return res.status(404).json({ message: "Diagnostic results not found" });
      }
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to load diagnostic results" });
    }
  });

  app.post(api.diagnostics.paidStart.path, async (req, res) => {
    try {
      const input = diagnosticStartInputSchema.parse(req.body);
      const session = await createDiagnosticSession({
        diagnosticType: input.diagnosticType,
        moodleUserId: req.session.user?.id ?? null,
        ip: getClientIp(req),
        grade: input.grade ?? null,
        subject: input.subject ?? null,
        paid: true,
      });

      if (!session.eligible || !("sessionToken" in session)) {
        return res.json(session);
      }

      return res.json({
        eligible: true,
        sessionToken: session.sessionToken,
        variant: session.variant ?? null,
        diagnosticType: session.diagnosticType,
        redirectUrl: `/diagnostics/results/${session.sessionToken}`,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message, field: err.errors[0].path.join(".") });
      }
      return res.status(500).json({ message: err instanceof Error ? err.message : "Failed to start paid diagnostic" });
    }
  });

}
