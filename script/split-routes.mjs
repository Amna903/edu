import fs from "fs";
import path from "path";

const root = process.cwd();
const srcPath = path.join(root, "server/routes.ts");
const routesDir = path.join(root, "server/routes");
const src = fs.readFileSync(srcPath, "utf8");
const lines = src.split(/\r?\n/);

const helperStart = lines.findIndex((l) => l.includes("const aiSupportWebhookUrl"));
const helperEnd = lines.findIndex((l, i) => i > helperStart && l.trim() === "// === INQUIRIES ===");
const helperLines = lines.slice(helperStart, helperEnd);

const contextFile = `import type { Request as ExpressRequest } from "express";
import { z } from "zod";
import { storage } from "../db/storage.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { db } from "../db/db.js";
import { getLmsCourseById } from "../services/moodle/moodle.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { createCourseEnrollment } from "../repositories/course-store.js";
import { getStoredUserByMoodleUserId } from "../repositories/user-store.js";
import { getStudentGradesForDashboard } from "../services/moodle/moodle-dashboard.js";
import {
  assertScholarshipCodeForUser,
  calculateOrderTotalWithScholarship,
} from "../services/scholarship.js";

export type RouteContext = ReturnType<typeof createRouteContext>;

export function createRouteContext() {
${helperLines.join("\n")}
  return {
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
  };
}
`;

fs.writeFileSync(path.join(routesDir, "context.ts"), contextFile);

const routeSections = {
  "misc.routes.ts": { start: "// === INQUIRIES ===", end: 'app.get("/api/auth/verify-partner-code"' },
  "auth.routes.ts": { start: 'app.get("/api/auth/verify-partner-code"', end: "app.get(api.diagnostics.eligibility.path" },
  "diagnostics.routes.ts": { start: "app.get(api.diagnostics.eligibility.path", end: "app.get(api.dashboard.studentCertificates.path" },
  "dashboard.routes.ts": { start: "app.get(api.dashboard.studentCertificates.path", end: "// === SCHOLARSHIP / COUNTRY CONCESSIONS ===" },
  "payment.routes.ts": { start: "// === SCHOLARSHIP / COUNTRY CONCESSIONS ===", end: "app.get(api.dashboard.admin.path" },
  "admin.routes.ts": { start: "app.get(api.dashboard.admin.path", end: "return httpServer;" },
};

function findLineIndex(needle, from = 0) {
  const idx = lines.findIndex((l, i) => i >= from && l.includes(needle));
  if (idx === -1) throw new Error(`Marker not found: ${needle}`);
  return idx;
}

const commonImports = `import type { Express } from "express";
import { z } from "zod";
import { api } from "../../shared/routes.js";
import type { RouteContext } from "./context.js";
`;

let from = helperEnd;
for (const [filename, markers] of Object.entries(routeSections)) {
  const startIdx = findLineIndex(markers.start, from);
  const endIdx = findLineIndex(markers.end, startIdx + 1);
  const body = lines.slice(startIdx, endIdx).join("\n");
  from = endIdx;

  const fnName = filename.replace(".routes.ts", "").replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const registerName = `register${fnName.charAt(0).toUpperCase()}${fnName.slice(1)}Routes`;

  const fileContent = `${commonImports}

export function ${registerName}(app: Express, ctx: RouteContext) {
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

${body}
}
`;

  fs.writeFileSync(path.join(routesDir, filename), fileContent);
  console.log(`Wrote ${filename} (${endIdx - startIdx} lines)`);
}

const indexFile = `import type { Express } from "express";
import type { Server } from "http";
import { createRouteContext } from "./context.js";
import { registerMiscRoutes } from "./misc.routes.js";
import { registerAuthRoutes } from "./auth.routes.js";
import { registerDiagnosticsRoutes } from "./diagnostics.routes.js";
import { registerDashboardRoutes } from "./dashboard.routes.js";
import { registerPaymentRoutes } from "./payment.routes.js";
import { registerAdminRoutes } from "./admin.routes.js";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  const ctx = createRouteContext();

  registerMiscRoutes(app, ctx);
  registerAuthRoutes(app, ctx);
  registerDiagnosticsRoutes(app, ctx);
  registerDashboardRoutes(app, ctx);
  registerPaymentRoutes(app, ctx);
  registerAdminRoutes(app, ctx);

  return httpServer;
}
`;

fs.writeFileSync(path.join(routesDir, "index.ts"), indexFile);
console.log("Wrote index.ts");
