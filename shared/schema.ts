
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
  paymentStatus: text("payment_status").default("pending"),
  paymentProvider: text("payment_provider"),
  paymentRef: text("payment_ref"),
  invoiceNumber: text("invoice_number"),
  paidAmount: integer("paid_amount").default(0),
  remainingAmount: integer("remaining_amount").default(0),
  allowPartialPayment: boolean("allow_partial_payment").default(true),
  refundStatus: text("refund_status"),
  paymentNotes: jsonb("payment_notes").$type<Array<{
    status: string;
    message: string;
    createdAt: string;
  }>>().default([]),
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

export const pendingPayments = pgTable("pending_payments", {
  orderRef: text("order_ref").primaryKey(),
  userId: text("user_id").notNull(),
  items: jsonb("items").$type<Array<{ programId: number; title: string; price: number }>>().notNull(),
  totalAmount: integer("total_amount").notNull(),
  amountToPay: integer("amount_to_pay"),
  scholarshipCode: text("scholarship_code"),
  tracker: text("tracker"),
  orderId: integer("order_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scholarshipCodes = pgTable("scholarship_codes", {
  code: text("code").primaryKey(),
  moodleUserId: integer("moodle_user_id").notNull(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  concessionPercent: integer("concession_percent").notNull(),
  region: text("region").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  used: boolean("used").notNull().default(false),
  usedAt: timestamp("used_at"),
  usedByUserId: text("used_by_user_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const registeredCountries = pgTable("registered_countries", {
  moodleUserId: integer("moodle_user_id").primaryKey(),
  country: text("country").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const registrationCountries = pgTable("registration_countries", {
  username: text("username").primaryKey(),
  country: text("country").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dashboardNotificationReads = pgTable("dashboard_notification_reads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  notificationId: integer("notification_id").notNull(),
  readAt: timestamp("read_at").defaultNow(),
});

export const schoolLicenses = pgTable("school_licenses", {
  id: text("id").primaryKey(),
  schoolUserId: integer("school_user_id").notNull(),
  courseId: integer("course_id").notNull(),
  courseName: text("course_name").notNull(),
  totalSeats: integer("total_seats").notNull(),
  orderId: integer("order_id").notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const schoolRosterStudents = pgTable("school_roster_students", {
  id: serial("id").primaryKey(),
  schoolUserId: integer("school_user_id").notNull(),
  studentId: integer("student_id").notNull(),
  studentEmail: text("student_email").notNull(),
  studentName: text("student_name").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  sourceUploadId: text("source_upload_id").notNull(),
});

export const schoolStudentUploads = pgTable("school_student_uploads", {
  id: text("id").primaryKey(),
  schoolUserId: integer("school_user_id").notNull(),
  filename: text("filename").notNull(),
  totalStudents: integer("total_students").notNull(),
  processedStudents: integer("processed_students").notNull(),
  failedStudents: integer("failed_students").notNull(),
  status: text("status").notNull(),
  errors: jsonb("errors").$type<Array<{ row: number; email?: string; error: string }>>().default([]),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const schoolSeatAssignments = pgTable("school_seat_assignments", {
  id: text("id").primaryKey(),
  schoolUserId: integer("school_user_id").notNull(),
  licenseId: text("license_id").notNull(),
  studentId: integer("student_id").notNull(),
  studentEmail: text("student_email").notNull(),
  studentName: text("student_name").notNull(),
  assignedAt: timestamp("assigned_at").defaultNow(),
});

export const contactSubmissions = pgTable("edume_contact_submissions", {
  id: serial("id").primaryKey(),
  consultationType: text("consultation_type").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  country: text("country"),
  subject: text("subject"),
  message: text("message"),
  schoolName: text("school_name"),
  studentCount: text("student_count"),
  device: text("device"),
  problemType: text("problem_type"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === DIAGNOSTICS ===
export const diagnosticGuestDiagnostics = pgTable("edume_guest_diagnostics", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address").notNull(),
  subject: text("subject").notNull(),
  diagnosticType: text("diagnostic_type").notNull(),
  startedAt: timestamp("started_at").defaultNow(),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
  sessionToken: text("session_token").notNull().unique(),
  moodleUserId: integer("moodle_user_id"),
});

export const diagnosticAccountFlags = pgTable("edume_diagnostic_account_flags", {
  moodleUserId: integer("moodle_user_id").primaryKey(),
  freeDiagnosticUsed: boolean("free_diagnostic_used").notNull().default(false),
  teacherT1Attempts: integer("teacher_t1_attempts").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const diagnosticSessions = pgTable("edume_diagnostic_sessions", {
  id: serial("id").primaryKey(),
  sessionToken: text("session_token").notNull().unique(),
  moodleUserId: integer("moodle_user_id"),
  ipAddress: text("ip_address").notNull(),
  diagnosticType: integer("diagnostic_type").notNull(),
  subject: text("subject"),
  grade: text("grade"),
  variant: text("variant"),
  paid: boolean("paid").notNull().default(false),
  status: text("status").notNull().default("started"),
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  resultJson: jsonb("result_json").$type<Record<string, unknown> | null>(),
});

export const diagnosticAnswers = pgTable("edume_diagnostic_answers", {
  id: serial("id").primaryKey(),
  sessionToken: text("session_token").notNull(),
  questionId: text("question_id").notNull(),
  answer: jsonb("answer").$type<unknown>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
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

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const diagnosticTypeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
]);

export const diagnosticEligibilityInputSchema = z.object({
  diagnosticType: diagnosticTypeSchema,
  grade: z.string().optional(),
  subject: z.string().optional(),
});

export const diagnosticEligibilityResponseSchema = z.object({
  eligible: z.boolean(),
  reason: z.string().optional(),
  softGate: z.boolean().optional(),
  freeUsed: z.boolean().optional(),
  teacherAttempts: z.number().optional(),
});

export const diagnosticStartInputSchema = z.object({
  diagnosticType: diagnosticTypeSchema,
  subject: z.string().optional(),
  grade: z.string().optional(),
  paid: z.boolean().optional(),
});

export const diagnosticStartResponseSchema = z.object({
  eligible: z.boolean(),
  reason: z.string().optional(),
  softGate: z.boolean().optional(),
  sessionToken: z.string().optional(),
  redirectUrl: z.string().optional(),
  variant: z.string().optional(),
  diagnosticType: diagnosticTypeSchema.optional(),
});

export const diagnosticContentRequestSchema = z.object({
  sessionToken: z.string().min(1),
});

export const diagnosticQuestionSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  type: z.enum(["single-choice", "multi-choice", "text"]),
  options: z.array(z.string()).optional(),
});

export const diagnosticContentResponseSchema = z.object({
  sessionToken: z.string(),
  diagnosticType: diagnosticTypeSchema,
  subject: z.string().nullable(),
  grade: z.string().nullable(),
  variant: z.string().nullable(),
  questions: z.array(diagnosticQuestionSchema),
});

export const diagnosticAnswerInputSchema = z.object({
  sessionToken: z.string().min(1),
  questionId: z.string().min(1),
  answer: z.unknown(),
  timestamp: z.string().optional(),
});

export const diagnosticCompleteInputSchema = z.object({
  sessionToken: z.string().min(1),
});

export const diagnosticResultTopicSchema = z.object({
  name: z.string(),
  score: z.number(),
  mastery: z.enum(["Mastered", "In Progress", "Gap"]),
});

export const diagnosticResultSchema = z.object({
  sessionToken: z.string(),
  diagnosticType: diagnosticTypeSchema,
  subject: z.string().nullable(),
  grade: z.string().nullable(),
  variant: z.string().nullable(),
  score: z.number(),
  cefrLevel: z.string().nullable(),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  topics: z.array(diagnosticResultTopicSchema),
  nextSteps: z.array(z.string()),
  remedialActions: z.array(z.object({ topic: z.string(), action: z.string() })),
  freeUsed: z.boolean(),
  paid: z.boolean(),
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
  categoryId: z.number().nullable(),
  format: z.string().nullable(),
  imageUrl: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  price: z.number().nullable(),
  visible: z.boolean(),
  lmsCourseUrl: z.string(),
});

export const lmsCourseEnrolmentMethodSchema = z.object({
  type: z.string(),
  name: z.string(),
  status: z.boolean(),
  cost: z.string().nullable(),
  currency: z.string().nullable(),
});

export const lmsCourseContentItemSchema = z.object({
  id: z.number().nullable(),
  name: z.string(),
  modname: z.string().nullable(),
  url: z.string().nullable(),
});

export const lmsCourseDetailSchema = lmsCourseSchema.extend({
  enrolmentMethods: z.array(lmsCourseEnrolmentMethodSchema),
  contentItems: z.array(lmsCourseContentItemSchema),
  paymentLabel: z.string(),
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
  country: z.string().min(1, "Country is required"),
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
  scholarshipCode: z.string().optional(),
});

export const freeEnrollInputSchema = z.object({
  courseId: z.number().int().positive(),
});

export const freeEnrollResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
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
  paymentStatus: z.string().optional(),
  paymentProvider: z.string().nullable().optional(),
  paymentRef: z.string().nullable().optional(),
  invoiceNumber: z.string().nullable().optional(),
  paidAmount: z.number().optional(),
  remainingAmount: z.number().optional(),
  allowPartialPayment: z.boolean().optional(),
  refundStatus: z.string().nullable().optional(),
  canRetryPayment: z.boolean().optional(),
  refundable: z.boolean().optional(),
  paymentNotes: z.array(z.object({
    status: z.string(),
    message: z.string(),
    createdAt: z.string(),
  })).optional(),
  createdAt: z.string(),
  items: z.array(orderHistoryItemSchema),
});

export const profileUpdateInputSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required").optional(),
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
  shortName: z.string(),
  progress: z.number(),
  completed: z.boolean(),
  grade: z.string().nullable(),
  percentage: z.number().nullable(),
  imageUrl: z.string().nullable().optional(),
  lmsCourseUrl: z.string().optional(),
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
  id: z.string(),
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

export const adminUserListItemSchema = z.object({
  id: z.string(),
  moodleUserId: z.number(),
  username: z.string(),
  email: z.string().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  role: appRoleSchema,
  isSuspended: z.boolean(),
  lastLoginAt: z.string().nullable(),
  createdAt: z.string(),
});

export const adminUsersListSchema = z.object({
  users: z.array(adminUserListItemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const adminActivityLogSchema = z.object({
  id: z.string(),
  action: z.enum([
    "USER_SUSPENDED",
    "USER_UNSUSPENDED",
    "PASSWORD_RESET",
    "ROLE_ASSIGNED",
    "COURSES_SYNCED",
    "COURSE_PRICING_UPDATED",
    "COURSE_VISIBILITY_UPDATED",
    "COURSE_CATEGORY_UPDATED",
  ]),
  adminUsername: z.string(),
  targetUsername: z.string().nullable(),
  details: z.record(z.any()).nullable(),
  createdAt: z.string(),
});

export const adminActivityLogsListSchema = z.object({
  logs: z.array(adminActivityLogSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const adminSuspendUserInputSchema = z.object({
  userId: z.string(),
  suspend: z.boolean(),
});

export const adminAssignRoleInputSchema = z.object({
  userId: z.string(),
  role: appRoleSchema,
});

export const adminResetPasswordInputSchema = z.object({
  userId: z.string(),
});

export const adminActionResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
});

export const adminCourseListItemSchema = z.object({
  id: z.string(),
  moodleCourseId: z.number(),
  shortname: z.string(),
  fullname: z.string(),
  summary: z.string().nullable(),
  categoryId: z.number().nullable(),
  categoryName: z.string().nullable(),
  isVisible: z.boolean(),
  price: z.number(),
  lastSyncedAt: z.string().nullable(),
  createdAt: z.string(),
});

export const adminCoursesListSchema = z.object({
  courses: z.array(adminCourseListItemSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export const adminUpdateCoursePricingInputSchema = z.object({
  courseId: z.string(),
  price: z.number().min(0),
});

export const adminUpdateCourseVisibilityInputSchema = z.object({
  courseId: z.string(),
  isVisible: z.boolean(),
});

export const adminUpdateCourseCategoryInputSchema = z.object({
  courseId: z.string(),
  categoryId: z.number().nullable(),
  categoryName: z.string().nullable(),
});

export const adminSyncCoursesInputSchema = z.object({
  target: z.enum(["COURSE_CATALOG", "USER_DIRECTORY", "ENROLLMENTS"]),
});

export const adminSyncCoursesResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  coursesAffected: z.number(),
});

export const scholarshipApplyInputSchema = z.object({
  gradeLevel: z.string().min(1, "Grade is required"),
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must confirm the declaration" }),
  }),
});

export const scholarshipEligibilityResponseSchema = z.object({
  eligible: z.boolean(),
  country: z.string().nullable(),
  concessionPercent: z.number().nullable(),
  region: z.enum(["africa", "asia", "americas"]).nullable(),
  message: z.string().optional(),
});

export const scholarshipApplyResponseSchema = z.object({
  eligible: z.literal(true),
  country: z.string(),
  concessionPercent: z.number(),
  region: z.enum(["africa", "asia", "americas"]),
  code: z.string(),
  expiresAt: z.string(),
});

export const scholarshipValidateInputSchema = z.object({
  code: z.string().min(1, "Discount code is required"),
});

export const scholarshipValidateResponseSchema = z.object({
  valid: z.literal(true),
  code: z.string(),
  country: z.string(),
  concessionPercent: z.number(),
  region: z.enum(["africa", "asia", "americas"]),
});

export const paymentInitRequestSchema = z.object({
  items: z.array(checkoutItemSchema).min(1, "At least one item is required"),
  totalAmount: z.number().min(0),
  amountToPay: z.number().min(0).optional(),
  scholarshipCode: z.string().optional(),
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

export const schoolSeatPurchaseInputSchema = z.object({
  courseId: z.number().int().positive(),
  seats: z.number().int().min(1),
});

// School License Management Schemas
export const bulkLicensePurchaseInputSchema = z.object({
  courseId: z.number().int().positive(),
  quantity: z.number().int().min(1),
});

export const licenseDetailSchema = z.object({
  id: z.string(),
  courseId: z.number(),
  courseName: z.string(),
  totalSeats: z.number(),
  usedSeats: z.number(),
  availableSeats: z.number(),
  expiresAt: z.string().datetime().nullable(),
  purchaseDate: z.string().datetime(),
});

export const bulkLicensePurchaseResponseSchema = z.object({
  success: z.literal(true),
  licenses: z.array(licenseDetailSchema),
  totalAmount: z.number(),
  orderId: z.string(),
});

export const schoolStudentUploadSchema = z.object({
  id: z.string(),
  filename: z.string(),
  uploadedAt: z.string().datetime(),
  totalStudents: z.number(),
  processedStudents: z.number(),
  failedStudents: z.number(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  errors: z.array(z.object({
    row: z.number(),
    email: z.string().optional(),
    error: z.string(),
  })).optional(),
});

export const csvStudentInputSchema = z.object({
  // Will be validated server-side from CSV file content
  // Each row should have: email, firstName, lastName, moodleUserId (optional)
});

export const seatAssignmentSchema = z.object({
  id: z.string(),
  licenseId: z.string(),
  studentMoodleId: z.number(),
  studentEmail: z.string().email(),
  studentName: z.string(),
  assignedAt: z.string().datetime(),
});

export const bulkSeatAssignmentInputSchema = z.object({
  licenseId: z.string(),
  studentIds: z.array(z.number().int().positive()),
});

export const bulkSeatAssignmentResponseSchema = z.object({
  success: z.literal(true),
  assigned: z.array(seatAssignmentSchema),
  failed: z.array(z.object({
    studentId: z.number(),
    error: z.string(),
  })),
});

export const licenseUsageMetricsSchema = z.object({
  licenseId: z.string(),
  courseId: z.number(),
  courseName: z.string(),
  totalSeats: z.number(),
  assignedSeats: z.number(),
  activeUsers: z.number(),
  lastAccessDates: z.array(z.object({
    studentId: z.number(),
    lastAccessAt: z.string().datetime().nullable(),
    enrollmentProgress: z.number(),
  })),
});

export const schoolUsageReportSchema = z.object({
  reportGeneratedAt: z.string().datetime(),
  totalLicenses: z.number(),
  totalSeats: z.number(),
  usedSeats: z.number(),
  availableSeats: z.number(),
  utilizationRate: z.number(), // percentage
  licenses: z.array(licenseUsageMetricsSchema),
  studentActivity: z.object({
    activeStudents: z.number(),
    inactiveStudents: z.number(),
    totalEnrolled: z.number(),
  }),
});

export const dashboardNotificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string(),
  createdAt: z.string(),
  isRead: z.boolean(),
  actionUrl: z.string().optional(),
  type: z.enum(["system", "order", "support", "course"]),
});

export const dashboardNotificationListSchema = z.object({
  notifications: z.array(dashboardNotificationSchema),
});

export const markNotificationReadInputSchema = z.object({
  notificationId: z.number(),
});

export const markNotificationReadResponseSchema = z.object({
  success: z.literal(true),
});

// === ANALYTICS & REPORTING ===
export const revenueStatItemSchema = z.object({
  date: z.string(),
  amount: z.number(),
});

export const revenueReportSchema = z.object({
  totalRevenue: z.number(),
  averageOrderValue: z.number(),
  totalOrders: z.number(),
  trend: z.array(revenueStatItemSchema),
  topCourses: z.array(z.object({
    id: z.string(),
    name: z.string(),
    revenue: z.number(),
    orderCount: z.number(),
  })),
});

export const enrollmentStatItemSchema = z.object({
  date: z.string(),
  count: z.number(),
});

export const enrollmentReportSchema = z.object({
  totalEnrollments: z.number(),
  activeEnrollments: z.number(),
  completionRate: z.number(),
  trend: z.array(enrollmentStatItemSchema),
  topCourses: z.array(z.object({
    id: z.string(),
    name: z.string(),
    enrollmentCount: z.number(),
    completionCount: z.number(),
  })),
  enrollmentByRole: z.object({
    students: z.number(),
    parents: z.number(),
    schools: z.number(),
  }),
});

export const progressAnalyticsSchema = z.object({
  averageCourseProgress: z.number(),
  totalStudentsTracked: z.number(),
  completedCourses: z.number(),
  inProgressCourses: z.number(),
  notStartedCourses: z.number(),
  progressDistribution: z.array(z.object({
    range: z.string(), // e.g., "0-25%", "25-50%"
    count: z.number(),
    percentage: z.number(),
  })),
  topPerformingCourses: z.array(z.object({
    id: z.string(),
    name: z.string(),
    averageProgress: z.number(),
    studentCount: z.number(),
  })),
  averageCompletionTime: z.number(), // in days
  courseProgressByCategory: z.array(z.object({
    category: z.string(),
    averageProgress: z.number(),
    courseCount: z.number(),
  })),
});

export const usageMetricsSchema = z.object({
  totalActiveUsers: z.number(),
  totalRegisteredUsers: z.number(),
  newUsersThisMonth: z.number(),
  monthlyActiveUsers: z.number(),
  dailyActiveUsers: z.number(),
  lastLoginTrend: z.array(z.object({
    date: z.string(),
    activeUsers: z.number(),
  })),
  userActivityByRole: z.object({
    students: z.object({
      active: z.number(),
      total: z.number(),
    }),
    parents: z.object({
      active: z.number(),
      total: z.number(),
    }),
    schools: z.object({
      active: z.number(),
      total: z.number(),
    }),
    admins: z.object({
      active: z.number(),
      total: z.number(),
    }),
  }),
  courseAccessMetrics: z.array(z.object({
    id: z.string(),
    name: z.string(),
    accessCount: z.number(),
    uniqueUsers: z.number(),
  })),
  adminActionMetrics: z.array(z.object({
    action: z.string(),
    count: z.number(),
    lastOccurred: z.string(),
  })),
});

export const analyticsQueryInputSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  courseId: z.string().optional(),
  period: z.enum(["daily", "weekly", "monthly", "yearly"]).optional().default("monthly"),
});

export const analyticsReportSchema = z.object({
  revenue: revenueReportSchema,
  enrollments: enrollmentReportSchema,
  progress: progressAnalyticsSchema,
  usage: usageMetricsSchema,
});

// === TYPES ===
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Resource = typeof resources.$inferSelect;
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type LmsCourse = z.infer<typeof lmsCourseSchema>;
export type LmsCourseDetail = z.infer<typeof lmsCourseDetailSchema>;
export type AuthUser = z.infer<typeof authUserSchema>;
export type AppRole = z.infer<typeof appRoleSchema>;
export type LoginInput = z.infer<typeof loginInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;
export type CheckoutItem = z.infer<typeof checkoutItemSchema>;
export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;
export type FreeEnrollInput = z.infer<typeof freeEnrollInputSchema>;
export type FreeEnrollResponse = z.infer<typeof freeEnrollResponseSchema>;
export type OrderHistory = z.infer<typeof orderHistorySchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateInputSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeInputSchema>;
export type StudentDashboard = z.infer<typeof studentDashboardSchema>;
export type StudentCertificate = z.infer<typeof studentCertificateSchema>;
export type ParentDashboard = z.infer<typeof parentDashboardSchema>;
export type SchoolDashboard = z.infer<typeof schoolDashboardSchema>;
export type AdminDashboard = z.infer<typeof adminDashboardSchema>;
export type AdminUserListItem = z.infer<typeof adminUserListItemSchema>;
export type AdminUsersList = z.infer<typeof adminUsersListSchema>;
export type AdminActivityLog = z.infer<typeof adminActivityLogSchema>;
export type AdminActivityLogsList = z.infer<typeof adminActivityLogsListSchema>;
export type AdminSuspendUserInput = z.infer<typeof adminSuspendUserInputSchema>;
export type AdminAssignRoleInput = z.infer<typeof adminAssignRoleInputSchema>;
export type AdminResetPasswordInput = z.infer<typeof adminResetPasswordInputSchema>;
export type AdminActionResponse = z.infer<typeof adminActionResponseSchema>;
export type AdminCourseListItem = z.infer<typeof adminCourseListItemSchema>;
export type AdminCoursesList = z.infer<typeof adminCoursesListSchema>;
export type AdminUpdateCoursePricingInput = z.infer<typeof adminUpdateCoursePricingInputSchema>;
export type AdminUpdateCourseVisibilityInput = z.infer<typeof adminUpdateCourseVisibilityInputSchema>;
export type AdminUpdateCourseCategoryInput = z.infer<typeof adminUpdateCourseCategoryInputSchema>;
export type AdminSyncCoursesInput = z.infer<typeof adminSyncCoursesInputSchema>;
export type AdminSyncCoursesResponse = z.infer<typeof adminSyncCoursesResponseSchema>;
export type PaymentInitRequest = z.infer<typeof paymentInitRequestSchema>;
export type PaymentInitResponse = z.infer<typeof paymentInitResponseSchema>;
export type PaymentVerifyRequest = z.infer<typeof paymentVerifyRequestSchema>;
export type SchoolSeatPurchaseInput = z.infer<typeof schoolSeatPurchaseInputSchema>;
export type BulkLicensePurchaseInput = z.infer<typeof bulkLicensePurchaseInputSchema>;
export type LicenseDetail = z.infer<typeof licenseDetailSchema>;
export type BulkLicensePurchaseResponse = z.infer<typeof bulkLicensePurchaseResponseSchema>;
export type SchoolStudentUpload = z.infer<typeof schoolStudentUploadSchema>;
export type SeatAssignment = z.infer<typeof seatAssignmentSchema>;
export type BulkSeatAssignmentInput = z.infer<typeof bulkSeatAssignmentInputSchema>;
export type BulkSeatAssignmentResponse = z.infer<typeof bulkSeatAssignmentResponseSchema>;
export type LicenseUsageMetrics = z.infer<typeof licenseUsageMetricsSchema>;
export type SchoolUsageReport = z.infer<typeof schoolUsageReportSchema>;
export type DashboardNotification = z.infer<typeof dashboardNotificationSchema>;
export type DashboardNotificationList = z.infer<typeof dashboardNotificationListSchema>;
export type MarkNotificationReadInput = z.infer<typeof markNotificationReadInputSchema>;
export type RevenueReport = z.infer<typeof revenueReportSchema>;
export type EnrollmentReport = z.infer<typeof enrollmentReportSchema>;
export type ProgressAnalytics = z.infer<typeof progressAnalyticsSchema>;
export type UsageMetrics = z.infer<typeof usageMetricsSchema>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQueryInputSchema>;
export type AnalyticsReport = z.infer<typeof analyticsReportSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Request types
export type CreateInquiryRequest = InsertInquiry;
export type CreateResourceRequest = InsertResource;
