import fs from "fs";
import path from "path";

const routesDir = path.join(process.cwd(), "server/routes");

const importBlocks = {
  "misc.routes.ts": `import { randomUUID } from "crypto";
import { storage } from "../db/storage.js";
import {
  insertInquirySchema,
} from "../../shared/schema.js";
import { getLmsCourseById, getLmsCourseBySlug, getLmsCourseDetail, getLmsCourses } from "../services/moodle/moodle.js";
import { createCourseEnrollment, getUserCourseEnrollments } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { db } from "../db/db.js";
`,

  "auth.routes.ts": `import { storage } from "../db/storage.js";
import {
  loginInputSchema,
  passwordChangeInputSchema,
  profileUpdateInputSchema,
  registerInputSchema,
} from "../../shared/schema.js";
import { changeMoodlePassword, fetchCurrentUser, loginWithMoodle, registerWithMoodle, updateMoodleProfile } from "../services/moodle/moodle-auth.js";
import { linkGuestDiagnosticToAccount } from "../services/diagnostics.js";
import { syncUserFromMoodleSession } from "../repositories/user-store.js";
import { countryToMoodleIso, normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";
`,

  "diagnostics.routes.ts": `import {
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
`,

  "dashboard.routes.ts": `import { randomUUID } from "crypto";
import { storage } from "../db/storage.js";
import {
  markNotificationReadInputSchema,
  parentLinkChildInputSchema,
} from "../../shared/schema.js";
import { getLmsCourseById } from "../services/moodle/moodle.js";
import { createCourseEnrollment } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import {
  getStudentActivityTimelineForDashboard,
  getStudentCertificatesForDashboard,
  getStudentGradesForDashboard,
  getUserCoursesForDashboard,
} from "../services/moodle/moodle-dashboard.js";
import { buildOrigin } from "../services/payments.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { db } from "../db/db.js";
import { getStoredUserByMoodleUserId, linkParentToChild } from "../repositories/user-store.js";
`,

  "payment.routes.ts": `import { randomUUID } from "crypto";
import { storage } from "../db/storage.js";
import { checkoutRequestSchema } from "../../shared/schema.js";
import { getLmsCourseById } from "../services/moodle/moodle.js";
import { createCourseEnrollment } from "../repositories/course-store.js";
import { enrolUserInCourse } from "../services/moodle/moodle-commerce.js";
import { buildOrigin, buildPayfastCheckoutFields, buildPayfastItemName } from "../services/payments.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { db } from "../db/db.js";
import {
  assertScholarshipCodeForUser,
  createScholarshipCodeRecord,
  resolveScholarshipCountryForUser,
} from "../services/scholarship.js";
import { normalizeScholarshipCountry } from "../../shared/scholarship-concessions.js";
`,

  "admin.routes.ts": `import { storage } from "../db/storage.js";
import { getLmsCourseById, getLmsCourses } from "../services/moodle/moodle.js";
import { upsertCourseCatalogFromMoodle } from "../repositories/course-store.js";
import { env } from "../config/config.js";
import { prisma } from "../db/prisma.js";
import { db } from "../db/db.js";
`,
};

for (const [filename, extraImports] of Object.entries(importBlocks)) {
  const filePath = path.join(routesDir, filename);
  let content = fs.readFileSync(filePath, "utf8");
  const marker = `import type { RouteContext } from "./context.js";\n`;
  if (!content.includes(marker)) continue;
  content = content.replace(
    marker,
    `${marker}\n${extraImports}`,
  );
  fs.writeFileSync(filePath, content);
  console.log(`Updated imports in ${filename}`);
}
