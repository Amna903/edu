
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
  learningMode: text("learning_mode"), // 'online' | 'physical' for student enrollment
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

export const lmsCourseSchema = z.object({
  id: z.number(),
  slug: z.string(),
  shortName: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  category: z.string(),
  categoryName: z.string().nullable(),
  format: z.string().nullable(),
  imageUrl: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  price: z.number().nullable(),
  visible: z.boolean(),
  lmsCourseUrl: z.string(),
});

export const authUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  fullname: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  email: z.string().nullable(),
  role: z.string(),
  profileImageUrl: z.string().nullable(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export const appRoleSchema = z.enum(["admin", "student", "parent", "school"]);

export const loginInputSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerInputSchema = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  role: appRoleSchema.default("student"),
});

export const registerResponseSchema = z.object({
  success: z.literal(true),
  user: authUserSchema.nullable(),
  requiresEmailConfirmation: z.boolean().default(false),
  message: z.string(),
  dashboardPath: z.string().nullable().default(null),
});

export const checkoutItemSchema = z.object({
  programId: z.number(),
  title: z.string(),
  price: z.number(),
});

export const checkoutRequestSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "At least one item is required"),
  totalAmount: z.number().min(0),
  tracker: z.string().optional(),
});

export const orderHistoryItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  programId: z.number(),
});

export const orderHistorySchema = z.object({
  id: z.number(),
  userId: z.string(),
  totalAmount: z.number(),
  status: z.string(),
  createdAt: z.string(),
  items: z.array(orderHistoryItemSchema),
});

export const profileUpdateInputSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  city: z.string().optional().default(""),
  country: z.string().optional().default(""),
  phone: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const passwordChangeInputSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export const studentDashboardCourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  progress: z.number(),
  completed: z.boolean(),
  grade: z.string().nullable(),
  percentage: z.number().nullable(),
});

export const studentDashboardActivitySchema = z.object({
  id: z.number(),
  courseName: z.string(),
  moduleName: z.string(),
  timeCompleted: z.number(),
});

export const studentDashboardSchema = z.object({
  stats: z.object({
    enrolledCourses: z.number(),
    completedCourses: z.number(),
    averageProgress: z.number(),
  }),
  courses: z.array(studentDashboardCourseSchema),
  activities: z.array(studentDashboardActivitySchema),
});

export const studentCertificateSchema = z.object({
  id: z.number(),
  courseId: z.number(),
  courseName: z.string(),
  name: z.string(),
  url: z.string(),
  timeCreated: z.number(),
});

export const parentDashboardChildCourseSchema = z.object({
  id: z.number(),
  courseName: z.string(),
  progress: z.number(),
  grade: z.string(),
  percentage: z.number(),
});

export const parentDashboardChildSchema = z.object({
  id: z.number(),
  moodleUserId: z.number(),
  name: z.string(),
  email: z.string(),
  courses: z.array(parentDashboardChildCourseSchema),
});

export const parentLinkChildInputSchema = z.object({
  childMoodleUserId: z.number(),
});

export const parentDashboardSchema = z.object({
  children: z.array(parentDashboardChildSchema),
});

export const schoolDashboardLicenseSchema = z.object({
  courseId: z.number(),
  courseName: z.string(),
  assignedSeats: z.number(),
  totalSeats: z.number(),
});

export const schoolDashboardSchema = z.object({
  stats: z.object({
    purchasedSeats: z.number(),
    assignedSeats: z.number(),
    activeCourses: z.number(),
  }),
  licenses: z.array(schoolDashboardLicenseSchema),
});

export const adminDashboardSchema = z.object({
  stats: z.object({
    totalUsers: z.number(),
    totalOrders: z.number(),
    totalRevenue: z.number(),
    activeCourses: z.number(),
  }),
  courses: z.array(z.object({
    id: z.number(),
    title: z.string(),
    progress: z.number(),
  })),
});

export const paymentInitRequestSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "At least one item is required"),
  totalAmount: z.number().min(0),
});

export const paymentInitResponseSchema = z.object({
  checkoutUrl: z.string(),
  orderRef: z.string(),
});

export const paymentVerifyRequestSchema = z.object({
  orderRef: z.string().min(1, "Order reference is required"),
  tracker: z.string().optional(),
});

export const paymentVerifyResponseSchema = z.object({
  success: z.literal(true),
  orderId: z.number(),
});

// === TYPES ===
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type LmsCourse = z.infer<typeof lmsCourseSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AppRole = z.infer<typeof appRoleSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type CheckoutItem = z.infer<typeof checkoutItemSchema>;
export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
export type OrderHistory = z.infer<typeof orderHistorySchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateInputSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeInputSchema>;
export type StudentDashboard = z.infer<typeof studentDashboardSchema>;
export type StudentCertificate = z.infer<typeof studentCertificateSchema>;
export type ParentDashboard = z.infer<typeof parentDashboardSchema>;
export type SchoolDashboard = z.infer<typeof schoolDashboardSchema>;
export type AdminDashboard = z.infer<typeof adminDashboardSchema>;
export type PaymentInitRequest = z.infer<typeof paymentInitRequestSchema>;
export type PaymentInitResponse = z.infer<typeof paymentInitResponseSchema>;
export type PaymentVerifyRequest = z.infer<typeof paymentVerifyRequestSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Request types
export type CreateInquiryRequest = InsertInquiry;
export type CreateResourceRequest = InsertResource;
