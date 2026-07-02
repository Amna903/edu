import type { Express } from "express";
import type { Server } from "http";
import { createRouteContext } from "./context.js";
import { registerMiscRoutes } from "./misc.routes.js";
import { registerAuthRoutes } from "./auth.routes.js";
import { registerDiagnosticsRoutes } from "./diagnostics.routes.js";
import { registerDashboardRoutes } from "./dashboard.routes.js";
import { registerPaymentRoutes } from "./payment.routes.js";
import { registerAdminRoutes } from "./admin.routes.js";
import { registerFeatureRoutes } from "./features.routes.js";
import { storage } from "../db/storage.js";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  const ctx = createRouteContext();

  registerMiscRoutes(app, ctx);
  registerAuthRoutes(app, ctx);
  registerDiagnosticsRoutes(app, ctx);
  registerDashboardRoutes(app, ctx);
  registerPaymentRoutes(app, ctx);
  registerAdminRoutes(app, ctx);
  registerFeatureRoutes(app);

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPrograms = await storage.getPrograms();
  if (existingPrograms.length === 0) {
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
    await storage.createResource({
      title: "Physics Magic Sheet: Forces & Motion",
      description: "One-page visual summary of all key formulas and concepts for O-Level Physics: Forces.",
      category: "magic_sheet",
      subject: "physics",
      fileUrl: "#",
      thumbnailUrl: "https://placehold.co/400x600?text=Physics+Magic+Sheet",
      isFree: true
    });

    await storage.createResource({
      title: "Chemistry Workbook: Atomic Structure",
      description: "Complete topic workbook with worked examples, guided practice, and independent questions.",
      category: "workbook",
      subject: "chemistry",
      fileUrl: "#",
      thumbnailUrl: "https://placehold.co/400x600?text=Chemistry+Workbook",
      isFree: true
    });

    await storage.createResource({
      title: "O-Level Survival Guide for Parents",
      description: "Free 20-page PDF: What you MUST know before O-Level starts.",
      category: "guide",
      subject: "general",
      fileUrl: "#",
      thumbnailUrl: "https://placehold.co/400x600?text=Parent+Guide",
      isFree: true
    });
  }
}
