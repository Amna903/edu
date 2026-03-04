
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === LEAD GENERATION / INQUIRIES ===
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'diagnostic', 'enrollment', 'school_charter', 'tutor_application', 'contact'
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role"), // 'parent', 'student', 'school_admin', 'tutor'
  gradeLevel: text("grade_level"), // For students
  subjectInterest: text("subject_interest"),
  message: text("message"),
  status: text("status").default("new"), // 'new', 'contacted', 'resolved'
  createdAt: timestamp("created_at").defaultNow(),
});

// === RESOURCES LIBRARY ===
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'magic_sheet', 'workbook', 'planner', 'guide'
  subject: text("subject"), // 'physics', 'chemistry', 'math', 'general'
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isFree: boolean("is_free").default(true),
  downloadCount: integer("download_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// === PROGRAMS ===
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  category: text("category").notNull(), // 'pre_o_level', 'o_level', 'foundation'
  price: integer("price"), // Base price in USD cents
  prices: jsonb("prices").$type<Record<string, number>>(), // Map of country code to price in local currency cents
  features: jsonb("features").$type<string[]>(), // Array of feature strings
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// === ORDERS & ENROLLMENTS ===
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(), // Using session/temp id for now
  totalAmount: integer("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'completed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  programId: integer("program_id").notNull(),
  price: integer("price").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  programId: integer("program_id").notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

// === SCHEMAS ===
export const insertOrderSchema = createInsertSchema(orders).omit({ 
  id: true, 
  createdAt: true 
});
export const insertOrderItemSchema = createInsertSchema(orderItems).omit({ id: true });
export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({ 
  id: true, 
  enrolledAt: true 
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true, 
  createdAt: true, 
  status: true 
});

export const insertResourceSchema = createInsertSchema(resources).omit({ 
  id: true, 
  createdAt: true, 
  downloadCount: true 
});

export const insertProgramSchema = createInsertSchema(programs).omit({ 
  id: true, 
  createdAt: true 
});

// === TYPES ===
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Request types
export type CreateInquiryRequest = InsertInquiry;
export type CreateResourceRequest = InsertResource;
