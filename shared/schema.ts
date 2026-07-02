import { z } from "zod";

// === SCHEMAS ===
export const insertOrderSchema = z.object({
  userId: z.string(),
  totalAmount: z.number().int(),
  status: z.string().optional().default("pending"),
  paymentStatus: z.string().optional().default("pending"),
  paymentProvider: z.string().nullable().optional(),
  paymentRef: z.string().nullable().optional(),
  invoiceNumber: z.string().nullable().optional(),
  paidAmount: z.number().int().optional().default(0),
  remainingAmount: z.number().int().optional().default(0),
  allowPartialPayment: z.boolean().optional().default(true),
  refundStatus: z.string().nullable().optional(),
  paymentNotes: z.array(z.object({
    status: z.string(),
    message: z.string(),
    createdAt: z.string(),
  })).optional().default([]),
});

export const insertOrderItemSchema = z.object({
  orderId: z.number().int(),
  programId: z.number().int(),
  price: z.number().int(),
});

export const insertInquirySchema = z.object({
  type: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  gradeLevel: z.string().nullable().optional(),
  subjectInterest: z.string().nullable().optional(),
  learningMode: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
});

export const insertResourceSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  subject: z.string().nullable().optional(),
  fileUrl: z.string(),
  thumbnailUrl: z.string().nullable().optional(),
  isFree: z.boolean().nullable().optional().default(true),
});

export const insertProgramSchema = z.object({
  title: z.string(),
  slug: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  category: z.string(),
  price: z.number().int().nullable().optional(),
  prices: z.record(z.number()).nullable().optional(),
  features: z.array(z.string()).nullable().optional(),
  isPopular: z.boolean().nullable().optional().default(false),
});

export const insertContactSubmissionSchema = z.object({
  consultationType: z.string(),
  name: z.string(),
  email: z.string(),
  country: z.string().nullable().optional(),
  subject: z.string().nullable().optional(),
  message: z.string().nullable().optional(),
  schoolName: z.string().nullable().optional(),
  studentCount: z.string().nullable().optional(),
  device: z.string().nullable().optional(),
  problemType: z.string().nullable().optional(),
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
  quantity: z.number().int().min(1).optional(),
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

export const schoolRosterStudentSchema = z.object({
  id: z.number(),
  studentId: z.number(),
  studentEmail: z.string().email(),
  studentName: z.string(),
  uploadedAt: z.string().datetime().nullable(),
  assignments: z.array(z.object({
    licenseId: z.string(),
    courseName: z.string(),
    assignedAt: z.string().datetime().nullable(),
  })).default([]),
});

export const schoolRosterListSchema = z.object({
  students: z.array(schoolRosterStudentSchema),
});

export const schoolAddStudentInputSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
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
  rosterIds: z.array(z.number().int().positive()),
});

export const bulkSeatAssignmentResponseSchema = z.object({
  success: z.literal(true),
  assigned: z.array(seatAssignmentSchema),
  failed: z.array(z.object({
    rosterId: z.number(),
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

export const schoolDashboardStatsSchema = z.object({
  generatedAt: z.string().datetime(),
  seatUtilizationPercent: z.number(),
  assignedSeats: z.number(),
  purchasedSeats: z.number(),
  atRiskFlags: z.number(),
  lastRiskSyncAt: z.string().datetime().nullable(),
  riskStudentsChecked: z.number(),
  atRiskStudents: z.array(z.object({
    studentId: z.number(),
    studentName: z.string(),
    studentEmail: z.string().email(),
    inactivityDays: z.number(),
    lowGrade: z.boolean(),
  })),
  classPdfCount: z.number(),
  teacherCpdLabel: z.string(),
  courseSeatSummary: z.array(z.object({
    courseName: z.string(),
    assignedSeats: z.number(),
    totalSeats: z.number(),
  })),
});

export const schoolArchiveSnapshotItemSchema = z.object({
  month: z.string(),
  summaryTitle: z.string(),
  availabilityNote: z.string(),
  stats: schoolDashboardStatsSchema,
});

export const schoolArchiveResponseSchema = z.object({
  months: z.array(schoolArchiveSnapshotItemSchema),
});

export const monthlyFormActionSchema = z.object({
  action: z.string(),
  owner: z.string(),
  dueDate: z.string().optional().default(""),
});

export const monthlyFormPayloadSchema = z.object({
  reportMonth: z.string().regex(/^\d{4}-\d{2}$/),
  teacherName: z.string().min(1),
  className: z.string().min(1),
  expectedStudents: z.number().int().min(0),
  submittedStudents: z.number().int().min(0),
  discrepancyReason: z.string().optional().default(""),
  topics: z.array(z.string()).default([]),
  topicRatings: z.array(z.string()).default([]),
  totalSessions: z.number().int().min(0),
  attendedSessions: z.number().int().min(0),
  averageMastery: z.number().min(0).max(100),
  assessmentAverage: z.number().min(0).max(100),
  homeworkCompletion: z.number().min(0).max(100),
  attendanceRate: z.number().min(0).max(100),
  atRiskStudents: z.number().int().min(0),
  parentContactStatus: z.string(),
  teacherNotes: z.string().optional().default(""),
  actions: z.array(monthlyFormActionSchema).default([]),
});

export const monthlyFormStatusSchema = z.enum(["draft", "submitted", "approved", "returned"]);

export const monthlyFormSubmissionSchema = z.object({
  id: z.string(),
  schoolUserId: z.number(),
  teacherUserId: z.number().nullable(),
  status: monthlyFormStatusSchema,
  reportMonth: z.string(),
  payload: monthlyFormPayloadSchema,
  reviewedByUserId: z.number().nullable(),
  reviewNotes: z.string().nullable(),
  reviewedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const submitMonthlyFormInputSchema = z.object({
  status: z.enum(["draft", "submitted"]).default("submitted"),
  payload: monthlyFormPayloadSchema,
});

export const reviewMonthlyFormInputSchema = z.object({
  status: z.enum(["approved", "returned"]),
  reviewNotes: z.string().optional().default(""),
});

export const monthlyFormSubmissionListSchema = z.object({
  submissions: z.array(monthlyFormSubmissionSchema),
});

export const schoolRiskSyncResponseSchema = z.object({
  success: z.literal(true),
  processedStudents: z.number(),
  flagsFound: z.number(),
  chunksProcessed: z.number(),
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
export type PaymentNote = {
  status: string;
  message: string;
  createdAt: string;
};

export type Inquiry = {
  id: number;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  role: string | null;
  gradeLevel: string | null;
  subjectInterest: string | null;
  learningMode: string | null;
  message: string | null;
  status: string | null;
  createdAt: Date | null;
};
export type InsertInquiry = z.infer<typeof insertInquirySchema>;

export type Resource = {
  id: number;
  title: string;
  description: string;
  category: string;
  subject: string | null;
  fileUrl: string;
  thumbnailUrl: string | null;
  isFree: boolean | null;
  downloadCount: number | null;
  createdAt: Date | null;
};
export type InsertResource = z.infer<typeof insertResourceSchema>;

export type Program = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number | null;
  prices: Record<string, number> | null;
  features: string[] | null;
  isPopular: boolean | null;
  createdAt: Date | null;
};
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
export type SchoolRosterStudent = z.infer<typeof schoolRosterStudentSchema>;
export type SchoolRosterList = z.infer<typeof schoolRosterListSchema>;
export type SchoolAddStudentInput = z.infer<typeof schoolAddStudentInputSchema>;
export type SeatAssignment = z.infer<typeof seatAssignmentSchema>;
export type BulkSeatAssignmentInput = z.infer<typeof bulkSeatAssignmentInputSchema>;
export type BulkSeatAssignmentResponse = z.infer<typeof bulkSeatAssignmentResponseSchema>;
export type LicenseUsageMetrics = z.infer<typeof licenseUsageMetricsSchema>;
export type SchoolUsageReport = z.infer<typeof schoolUsageReportSchema>;
export type SchoolDashboardStats = z.infer<typeof schoolDashboardStatsSchema>;
export type SchoolArchiveSnapshotItem = z.infer<typeof schoolArchiveSnapshotItemSchema>;
export type SchoolArchiveResponse = z.infer<typeof schoolArchiveResponseSchema>;
export type MonthlyFormPayload = z.infer<typeof monthlyFormPayloadSchema>;
export type MonthlyFormAction = z.infer<typeof monthlyFormActionSchema>;
export type MonthlyFormStatus = z.infer<typeof monthlyFormStatusSchema>;
export type MonthlyFormSubmission = z.infer<typeof monthlyFormSubmissionSchema>;
export type SubmitMonthlyFormInput = z.infer<typeof submitMonthlyFormInputSchema>;
export type ReviewMonthlyFormInput = z.infer<typeof reviewMonthlyFormInputSchema>;
export type MonthlyFormSubmissionList = z.infer<typeof monthlyFormSubmissionListSchema>;
export type SchoolRiskSyncResponse = z.infer<typeof schoolRiskSyncResponseSchema>;
export type DashboardNotification = z.infer<typeof dashboardNotificationSchema>;
export type DashboardNotificationList = z.infer<typeof dashboardNotificationListSchema>;
export type MarkNotificationReadInput = z.infer<typeof markNotificationReadInputSchema>;
export type RevenueReport = z.infer<typeof revenueReportSchema>;
export type EnrollmentReport = z.infer<typeof enrollmentReportSchema>;
export type ProgressAnalytics = z.infer<typeof progressAnalyticsSchema>;
export type UsageMetrics = z.infer<typeof usageMetricsSchema>;
export type AnalyticsQueryInput = z.infer<typeof analyticsQueryInputSchema>;
export type AnalyticsReport = z.infer<typeof analyticsReportSchema>;

export type Order = {
  id: number;
  userId: string;
  totalAmount: number;
  status: string;
  paymentStatus: string | null;
  paymentProvider: string | null;
  paymentRef: string | null;
  invoiceNumber: string | null;
  paidAmount: number | null;
  remainingAmount: number | null;
  allowPartialPayment: boolean | null;
  refundStatus: string | null;
  paymentNotes: PaymentNote[] | null;
  createdAt: Date | null;
};
export type InsertOrder = z.input<typeof insertOrderSchema>;

export type OrderItem = {
  id: number;
  orderId: number;
  programId: number;
  price: number;
};
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

// Request types
export type CreateInquiryRequest = InsertInquiry;
export type CreateResourceRequest = InsertResource;
