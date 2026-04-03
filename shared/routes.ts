
import { z } from 'zod';
import { insertInquirySchema, insertResourceSchema, inquiries, resources, programs, lmsCourseSchema, authUserSchema, loginInputSchema, registerInputSchema, checkoutRequestSchema, orderHistorySchema, passwordChangeInputSchema, profileUpdateInputSchema, studentDashboardSchema, parentDashboardSchema, schoolDashboardSchema, adminDashboardSchema, parentLinkChildInputSchema, paymentInitRequestSchema, paymentInitResponseSchema, paymentVerifyRequestSchema, paymentVerifyResponseSchema, registerResponseSchema, studentCertificateSchema, schoolSeatPurchaseInputSchema, dashboardNotificationListSchema, markNotificationReadInputSchema, markNotificationReadResponseSchema } from './schema';

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
      path: '/api/webhook/safepay' as const,
      responses: {
        200: z.object({ status: z.string() }),
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
