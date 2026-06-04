
import { z } from 'zod';
import { insertInquirySchema, insertResourceSchema, inquiries, resources, programs, lmsCourseSchema, authUserSchema, loginInputSchema, registerInputSchema, checkoutRequestSchema, orderHistorySchema, passwordChangeInputSchema, profileUpdateInputSchema, studentDashboardSchema, parentDashboardSchema, schoolDashboardSchema, adminDashboardSchema, adminUsersListSchema, adminActivityLogsListSchema, adminSuspendUserInputSchema, adminAssignRoleInputSchema, adminResetPasswordInputSchema, adminActionResponseSchema, adminCoursesListSchema, adminUpdateCoursePricingInputSchema, adminUpdateCourseVisibilityInputSchema, adminUpdateCourseCategoryInputSchema, adminSyncCoursesInputSchema, adminSyncCoursesResponseSchema, parentLinkChildInputSchema, paymentInitRequestSchema, paymentInitResponseSchema, paymentVerifyRequestSchema, paymentVerifyResponseSchema, registerResponseSchema, studentCertificateSchema, schoolSeatPurchaseInputSchema, dashboardNotificationListSchema, markNotificationReadInputSchema, markNotificationReadResponseSchema, revenueReportSchema, enrollmentReportSchema, progressAnalyticsSchema, usageMetricsSchema, analyticsQueryInputSchema, analyticsReportSchema, bulkLicensePurchaseInputSchema, bulkLicensePurchaseResponseSchema, schoolStudentUploadSchema, bulkSeatAssignmentInputSchema, bulkSeatAssignmentResponseSchema, licenseUsageMetricsSchema, schoolUsageReportSchema, diagnosticEligibilityInputSchema, diagnosticEligibilityResponseSchema, diagnosticStartInputSchema, diagnosticStartResponseSchema, diagnosticContentRequestSchema, diagnosticContentResponseSchema, diagnosticAnswerInputSchema, diagnosticCompleteInputSchema, diagnosticResultSchema, scholarshipApplyInputSchema, scholarshipApplyResponseSchema, scholarshipValidateInputSchema, scholarshipValidateResponseSchema, scholarshipEligibilityResponseSchema } from './schema.js';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/inquiries' as const,
      responses: {
        200: z.array(z.custom<typeof inquiries.$inferSelect>()),
        401: errorSchemas.notFound,
      },
    },
  },
  resources: {
    list: {
      method: 'GET' as const,
      path: '/api/resources' as const,
      input: z.object({
        category: z.string().optional(),
        subject: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof resources.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/resources/:id' as const,
      responses: {
        200: z.custom<typeof resources.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  programs: {
    list: {
      method: 'GET' as const,
      path: '/api/programs' as const,
      responses: {
        200: z.array(z.custom<typeof programs.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/programs/:slug' as const,
      responses: {
        200: z.custom<typeof programs.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  lmsCourses: {
    list: {
      method: 'GET' as const,
      path: '/api/lms/courses' as const,
      responses: {
        200: z.array(lmsCourseSchema),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/lms/courses/:slug' as const,
      responses: {
        200: lmsCourseSchema,
        404: errorSchemas.notFound,
      },
    },
  },
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/auth/login' as const,
      input: loginInputSchema,
      responses: {
        200: authUserSchema,
        400: errorSchemas.validation,
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register' as const,
      input: registerInputSchema,
      responses: {
        201: registerResponseSchema,
        400: errorSchemas.validation,
      },
    },
    me: {
      method: 'GET' as const,
      path: '/api/auth/me' as const,
      responses: {
        200: authUserSchema,
        401: errorSchemas.notFound,
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout' as const,
      responses: {
        200: z.object({ success: z.literal(true) }),
      },
    },
    updateProfile: {
      method: 'POST' as const,
      path: '/api/profile/update' as const,
      input: profileUpdateInputSchema,
      responses: {
        200: authUserSchema,
        400: errorSchemas.validation,
      },
    },
    changePassword: {
      method: 'POST' as const,
      path: '/api/profile/change-password' as const,
      input: passwordChangeInputSchema,
      responses: {
        200: z.object({ success: z.literal(true) }),
        400: errorSchemas.validation,
      },
    },
  },
  diagnostics: {
    eligibility: {
      method: 'GET' as const,
      path: '/api/diagnostic/eligibility' as const,
      input: diagnosticEligibilityInputSchema.partial().optional(),
      responses: {
        200: diagnosticEligibilityResponseSchema,
      },
    },
    start: {
      method: 'POST' as const,
      path: '/api/diagnostic/start' as const,
      input: diagnosticStartInputSchema,
      responses: {
        200: diagnosticStartResponseSchema,
      },
    },
    content: {
      method: 'GET' as const,
      path: '/api/diagnostic/content/:sessionToken' as const,
      responses: {
        200: diagnosticContentResponseSchema,
      },
    },
    answer: {
      method: 'POST' as const,
      path: '/api/diagnostic/answer' as const,
      input: diagnosticAnswerInputSchema,
      responses: {
        200: z.object({ success: z.literal(true) }),
      },
    },
    complete: {
      method: 'POST' as const,
      path: '/api/diagnostic/complete' as const,
      input: diagnosticCompleteInputSchema,
      responses: {
        200: z.object({ reportId: z.string(), redirectUrl: z.string() }),
      },
    },
    results: {
      method: 'GET' as const,
      path: '/api/diagnostic/results/:sessionToken' as const,
      responses: {
        200: diagnosticResultSchema,
      },
    },
    paidStart: {
      method: 'POST' as const,
      path: '/api/diagnostic/paid-start' as const,
      input: diagnosticStartInputSchema,
      responses: {
        200: diagnosticStartResponseSchema,
      },
    },
  },
  orders: {
    create: {
      method: 'POST' as const,
      path: '/api/orders' as const,
      input: checkoutRequestSchema,
      responses: {
        201: orderHistorySchema,
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/orders' as const,
      responses: {
        200: z.array(orderHistorySchema),
        401: errorSchemas.notFound,
      },
    },
  },
  dashboard: {
    student: {
      method: 'GET' as const,
      path: '/api/dashboard/student' as const,
      responses: {
        200: studentDashboardSchema,
      },
    },
    studentCertificates: {
      method: 'GET' as const,
      path: '/api/dashboard/student/certificates' as const,
      responses: {
        200: z.array(studentCertificateSchema),
      },
    },
    parent: {
      method: 'GET' as const,
      path: '/api/dashboard/parent' as const,
      responses: {
        200: parentDashboardSchema,
      },
    },
    parentLinkChild: {
      method: 'POST' as const,
      path: '/api/dashboard/parent/link-child' as const,
      input: parentLinkChildInputSchema,
      responses: {
        200: z.object({ success: z.literal(true) }),
      },
    },
    parentReport: {
      method: 'GET' as const,
      path: '/api/dashboard/parent/report.csv' as const,
    },
    school: {
      method: 'GET' as const,
      path: '/api/dashboard/school' as const,
      responses: {
        200: schoolDashboardSchema,
      },
    },
    schoolPurchaseSeats: {
      method: 'POST' as const,
      path: '/api/dashboard/school/purchase-seats' as const,
      input: schoolSeatPurchaseInputSchema,
      responses: {
        201: z.object({ success: z.literal(true), orderId: z.number() }),
      },
    },
    schoolBulkLicenses: {
      method: 'POST' as const,
      path: '/api/dashboard/school/bulk-licenses' as const,
      input: bulkLicensePurchaseInputSchema,
      responses: {
        201: bulkLicensePurchaseResponseSchema,
        400: errorSchemas.validation,
      },
    },
    schoolUploadStudents: {
      method: 'POST' as const,
      path: '/api/dashboard/school/upload-students' as const,
      input: z.object({
        csvText: z.string().min(1),
        filename: z.string().optional(),
      }),
      responses: {
        201: schoolStudentUploadSchema,
        400: errorSchemas.validation,
      },
    },
    schoolUploadStatus: {
      method: 'GET' as const,
      path: '/api/dashboard/school/upload-status/:uploadId' as const,
      responses: {
        200: schoolStudentUploadSchema,
        404: errorSchemas.notFound,
      },
    },
    schoolAssignSeats: {
      method: 'POST' as const,
      path: '/api/dashboard/school/assign-seats' as const,
      input: bulkSeatAssignmentInputSchema,
      responses: {
        200: bulkSeatAssignmentResponseSchema,
        400: errorSchemas.validation,
      },
    },
    schoolUsageReport: {
      method: 'GET' as const,
      path: '/api/dashboard/school/usage-report' as const,
      responses: {
        200: schoolUsageReportSchema,
      },
    },
    schoolLicenseMetrics: {
      method: 'GET' as const,
      path: '/api/dashboard/school/license/:licenseId/metrics' as const,
      responses: {
        200: licenseUsageMetricsSchema,
        404: errorSchemas.notFound,
      },
    },
    admin: {
      method: 'GET' as const,
      path: '/api/dashboard/admin' as const,
      responses: {
        200: adminDashboardSchema,
      },
    },
    notifications: {
      method: 'GET' as const,
      path: '/api/dashboard/notifications' as const,
      responses: {
        200: dashboardNotificationListSchema,
        401: errorSchemas.notFound,
      },
    },
    markNotificationRead: {
      method: 'PATCH' as const,
      path: '/api/dashboard/notifications/read' as const,
      input: markNotificationReadInputSchema,
      responses: {
        200: markNotificationReadResponseSchema,
        401: errorSchemas.notFound,
      },
    },
  },
  scholarship: {
    eligibility: {
      method: 'GET' as const,
      path: '/api/scholarship/eligibility' as const,
      responses: {
        200: scholarshipEligibilityResponseSchema,
        401: errorSchemas.notFound,
      },
    },
    apply: {
      method: 'POST' as const,
      path: '/api/scholarship/apply' as const,
      input: scholarshipApplyInputSchema,
      responses: {
        200: scholarshipApplyResponseSchema,
        400: errorSchemas.validation,
      },
    },
    validate: {
      method: 'POST' as const,
      path: '/api/scholarship/validate' as const,
      input: scholarshipValidateInputSchema,
      responses: {
        200: scholarshipValidateResponseSchema,
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
  },
  payments: {
    init: {
      method: 'POST' as const,
      path: '/api/payments/init' as const,
      input: paymentInitRequestSchema,
      responses: {
        200: paymentInitResponseSchema,
      },
    },
    verify: {
      method: 'POST' as const,
      path: '/api/verify-payment' as const,
      input: paymentVerifyRequestSchema,
      responses: {
        200: paymentVerifyResponseSchema,
      },
    },
    webhook: {
      method: 'POST' as const,
      path: '/api/webhook/payfast' as const,
      responses: {
        200: z.object({ status: z.string() }),
      },
    },
  },
  admin: {
    users: {
      method: 'GET' as const,
      path: '/api/admin/users' as const,
      responses: {
        200: adminUsersListSchema,
        403: errorSchemas.validation,
      },
    },
    suspendUser: {
      method: 'POST' as const,
      path: '/api/admin/users/:id/suspend' as const,
      input: adminSuspendUserInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    assignRole: {
      method: 'POST' as const,
      path: '/api/admin/users/:id/role' as const,
      input: adminAssignRoleInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    resetPassword: {
      method: 'POST' as const,
      path: '/api/admin/users/:id/reset-password' as const,
      input: adminResetPasswordInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    activityLogs: {
      method: 'GET' as const,
      path: '/api/admin/activity-logs' as const,
      responses: {
        200: adminActivityLogsListSchema,
        403: errorSchemas.validation,
      },
    },
    courses: {
      method: 'GET' as const,
      path: '/api/admin/courses' as const,
      responses: {
        200: adminCoursesListSchema,
        403: errorSchemas.validation,
      },
    },
    updateCoursePricing: {
      method: 'POST' as const,
      path: '/api/admin/courses/:id/pricing' as const,
      input: adminUpdateCoursePricingInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    updateCourseVisibility: {
      method: 'POST' as const,
      path: '/api/admin/courses/:id/visibility' as const,
      input: adminUpdateCourseVisibilityInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    updateCourseCategory: {
      method: 'POST' as const,
      path: '/api/admin/courses/:id/category' as const,
      input: adminUpdateCourseCategoryInputSchema,
      responses: {
        200: adminActionResponseSchema,
        403: errorSchemas.validation,
      },
    },
    syncCourses: {
      method: 'POST' as const,
      path: '/api/admin/courses/sync' as const,
      input: adminSyncCoursesInputSchema,
      responses: {
        200: adminSyncCoursesResponseSchema,
        403: errorSchemas.validation,
      },
    },
    analytics: {
      revenue: {
        method: 'GET' as const,
        path: '/api/admin/analytics/revenue' as const,
        input: analyticsQueryInputSchema.optional(),
        responses: {
          200: revenueReportSchema,
          403: errorSchemas.validation,
        },
      },
      enrollments: {
        method: 'GET' as const,
        path: '/api/admin/analytics/enrollments' as const,
        input: analyticsQueryInputSchema.optional(),
        responses: {
          200: enrollmentReportSchema,
          403: errorSchemas.validation,
        },
      },
      progress: {
        method: 'GET' as const,
        path: '/api/admin/analytics/progress' as const,
        input: analyticsQueryInputSchema.optional(),
        responses: {
          200: progressAnalyticsSchema,
          403: errorSchemas.validation,
        },
      },
      usage: {
        method: 'GET' as const,
        path: '/api/admin/analytics/usage' as const,
        input: analyticsQueryInputSchema.optional(),
        responses: {
          200: usageMetricsSchema,
          403: errorSchemas.validation,
        },
      },
      all: {
        method: 'GET' as const,
        path: '/api/admin/analytics' as const,
        input: analyticsQueryInputSchema.optional(),
        responses: {
          200: analyticsReportSchema,
          403: errorSchemas.validation,
        },
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateInquiryInput = z.infer<typeof api.inquiries.create.input>;
export type ResourceResponse = z.infer<typeof api.resources.get.responses[200]>;
export type ProgramResponse = z.infer<typeof api.programs.get.responses[200]>;
export type LmsCourseResponse = z.infer<typeof api.lmsCourses.get.responses[200]>;
export type LoginRequest = z.infer<typeof api.auth.login.input>;
export type RegisterRequest = z.infer<typeof api.auth.register.input>;
export type RegisterResponse = z.infer<typeof api.auth.register.responses[201]>;
