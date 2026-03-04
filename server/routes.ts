
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === INQUIRIES ===
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

  // === ORDERS & CART ===
  app.post("/api/orders", async (req, res) => {
    try {
      const { userId, items, totalAmount } = req.body;
      const order = await storage.createOrder({ userId, totalAmount, status: "completed" });
      
      for (const item of items) {
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
      
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: "Failed to process order" });
    }
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
