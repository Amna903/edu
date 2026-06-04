import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type {
  BulkLicensePurchaseInput,
  BulkLicensePurchaseResponse,
  BulkSeatAssignmentInput,
  BulkSeatAssignmentResponse,
  SchoolSeatPurchaseInput,
  SchoolStudentUpload,
  SchoolUsageReport,
  LicenseUsageMetrics,
} from "@shared/schema";

export function useStudentDashboard(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.student.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.student.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load student dashboard");
      return api.dashboard.student.responses[200].parse(await res.json());
    },
  });
}

export function useParentDashboard(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.parent.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.parent.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load parent dashboard");
      return api.dashboard.parent.responses[200].parse(await res.json());
    },
  });
}

export function useStudentCertificates(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.studentCertificates.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.studentCertificates.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load certificates");
      return api.dashboard.studentCertificates.responses[200].parse(await res.json());
    },
  });
}

export function useLinkChild() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (childMoodleUserId: number) => {
      const res = await fetch(api.dashboard.parentLinkChild.path, {
        method: api.dashboard.parentLinkChild.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childMoodleUserId }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || "Failed to link child");
      }
      return api.dashboard.parentLinkChild.responses[200].parse(await res.json());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.parent.path] });
    },
  });
}

export function useSchoolDashboard(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.school.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.school.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load school dashboard");
      return api.dashboard.school.responses[200].parse(await res.json());
    },
  });
}

export function useAdminDashboard(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.admin.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.admin.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load admin dashboard");
      return api.dashboard.admin.responses[200].parse(await res.json());
    },
  });
}

export function useAdminUsers(page = 1, limit = 20, search = "", enabled = true) {
  return useQuery({
    queryKey: [api.admin.users.path, page, limit, search],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
      });
      const res = await fetch(`${api.admin.users.path}?${params}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load users");
      return api.admin.users.responses[200].parse(await res.json());
    },
  });
}

export function useSuspendUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { userId: string; suspend: boolean }) => {
      const url = api.admin.suspendUser.path.replace(":id", input.userId);
      const res = await fetch(url, {
        method: api.admin.suspendUser.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to update user");
      return api.admin.suspendUser.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.users.path] });
    },
  });
}

export function useAssignRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { userId: string; role: string }) => {
      const url = api.admin.assignRole.path.replace(":id", input.userId);
      const res = await fetch(url, {
        method: api.admin.assignRole.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to assign role");
      return api.admin.assignRole.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.users.path] });
    },
  });
}

export function useResetPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { userId: string }) => {
      const url = api.admin.resetPassword.path.replace(":id", input.userId);
      const res = await fetch(url, {
        method: api.admin.resetPassword.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to reset password");
      return api.admin.resetPassword.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.users.path] });
    },
  });
}

export function useActivityLogs(page = 1, limit = 20, enabled = true) {
  return useQuery({
    queryKey: [api.admin.activityLogs.path, page, limit],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      const res = await fetch(`${api.admin.activityLogs.path}?${params}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load activity logs");
      return api.admin.activityLogs.responses[200].parse(await res.json());
    },
  });
}

export function useAdminCourses(page = 1, limit = 20, search = "", enabled = true) {
  return useQuery({
    queryKey: [api.admin.courses.path, page, limit, search],
    enabled,
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search && { search }),
      });
      const res = await fetch(`${api.admin.courses.path}?${params}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load courses");
      return api.admin.courses.responses[200].parse(await res.json());
    },
  });
}

export function useUpdateCoursePricing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { courseId: string; price: number }) => {
      const url = api.admin.updateCoursePricing.path.replace(":id", input.courseId);
      const res = await fetch(url, {
        method: api.admin.updateCoursePricing.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to update pricing");
      return api.admin.updateCoursePricing.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.courses.path] });
    },
  });
}

export function useUpdateCourseVisibility() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { courseId: string; isVisible: boolean }) => {
      const url = api.admin.updateCourseVisibility.path.replace(":id", input.courseId);
      const res = await fetch(url, {
        method: api.admin.updateCourseVisibility.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to update visibility");
      return api.admin.updateCourseVisibility.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.courses.path] });
    },
  });
}

export function useUpdateCourseCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { courseId: string; categoryId: number | null; categoryName: string | null }) => {
      const url = api.admin.updateCourseCategory.path.replace(":id", input.courseId);
      const res = await fetch(url, {
        method: api.admin.updateCourseCategory.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to update category");
      return api.admin.updateCourseCategory.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.courses.path] });
    },
  });
}

export function useSyncCourses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (target: "COURSE_CATALOG" | "USER_DIRECTORY" | "ENROLLMENTS") => {
      const res = await fetch(api.admin.syncCourses.path, {
        method: api.admin.syncCourses.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to sync courses");
      return api.admin.syncCourses.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.admin.courses.path] });
    },
  });
}

// Analytics Hooks
export function useRevenueAnalytics(period: "daily" | "weekly" | "monthly" | "yearly" = "monthly") {
  return useQuery({
    queryKey: [api.admin.analytics.revenue.path, period],
    queryFn: async () => {
      const res = await fetch(`${api.admin.analytics.revenue.path}?period=${period}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load revenue analytics");
      return api.admin.analytics.revenue.responses[200].parse(await res.json());
    },
  });
}

export function useEnrollmentAnalytics(period: "daily" | "weekly" | "monthly" | "yearly" = "monthly") {
  return useQuery({
    queryKey: [api.admin.analytics.enrollments.path, period],
    queryFn: async () => {
      const res = await fetch(`${api.admin.analytics.enrollments.path}?period=${period}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load enrollment analytics");
      return api.admin.analytics.enrollments.responses[200].parse(await res.json());
    },
  });
}

export function useProgressAnalytics(period: "daily" | "weekly" | "monthly" | "yearly" = "monthly") {
  return useQuery({
    queryKey: [api.admin.analytics.progress.path, period],
    queryFn: async () => {
      const res = await fetch(`${api.admin.analytics.progress.path}?period=${period}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load progress analytics");
      return api.admin.analytics.progress.responses[200].parse(await res.json());
    },
  });
}

export function useUsageMetrics(period: "daily" | "weekly" | "monthly" | "yearly" = "monthly") {
  return useQuery({
    queryKey: [api.admin.analytics.usage.path, period],
    queryFn: async () => {
      const res = await fetch(`${api.admin.analytics.usage.path}?period=${period}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load usage metrics");
      return api.admin.analytics.usage.responses[200].parse(await res.json());
    },
  });
}

export function useAllAnalytics(period: "daily" | "weekly" | "monthly" | "yearly" = "monthly") {
  return useQuery({
    queryKey: [api.admin.analytics.all.path, period],
    queryFn: async () => {
      const res = await fetch(`${api.admin.analytics.all.path}?period=${period}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to load analytics");
      return api.admin.analytics.all.responses[200].parse(await res.json());
    },
  });
}

export function useSupportTickets(enabled = true) {
  return useQuery({
    queryKey: [api.inquiries.list.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.inquiries.list.path, { credentials: "include" });
      if (res.status === 401) return [];
      if (!res.ok) throw new Error("Failed to load support tickets");
      return api.inquiries.list.responses[200].parse(await res.json());
    },
  });
}

export function useSchoolSeatPurchase() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: SchoolSeatPurchaseInput) => {
      const res = await fetch(api.dashboard.schoolPurchaseSeats.path, {
        method: api.dashboard.schoolPurchaseSeats.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Failed to purchase seats");
      }

      return api.dashboard.schoolPurchaseSeats.responses[201].parse(body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.school.path] });
      await queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
  });
}

export function useSchoolBulkLicenses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BulkLicensePurchaseInput) => {
      const res = await fetch(api.dashboard.schoolBulkLicenses.path, {
        method: api.dashboard.schoolBulkLicenses.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Failed to purchase bulk licenses");
      }

      return api.dashboard.schoolBulkLicenses.responses[201].parse(body) as BulkLicensePurchaseResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.school.path] });
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.schoolUsageReport.path] });
    },
  });
}

export function useSchoolUploadStudents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { csvText: string; filename?: string }) => {
      const res = await fetch(api.dashboard.schoolUploadStudents.path, {
        method: api.dashboard.schoolUploadStudents.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Failed to upload students");
      }

      return api.dashboard.schoolUploadStudents.responses[201].parse(body) as SchoolStudentUpload;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.schoolUsageReport.path] });
    },
  });
}

export function useSchoolAssignSeats() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: BulkSeatAssignmentInput) => {
      const res = await fetch(api.dashboard.schoolAssignSeats.path, {
        method: api.dashboard.schoolAssignSeats.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Failed to assign seats");
      }

      return api.dashboard.schoolAssignSeats.responses[200].parse(body) as BulkSeatAssignmentResponse;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.school.path] });
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.schoolUsageReport.path] });
    },
  });
}

export function useSchoolUsageReport(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.schoolUsageReport.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.dashboard.schoolUsageReport.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load usage report");
      return api.dashboard.schoolUsageReport.responses[200].parse(await res.json()) as SchoolUsageReport;
    },
  });
}

export function useSchoolLicenseMetrics(licenseId: string, enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.schoolLicenseMetrics.path, licenseId],
    enabled: enabled && Boolean(licenseId),
    queryFn: async () => {
      const url = api.dashboard.schoolLicenseMetrics.path.replace(":licenseId", licenseId);
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load license metrics");
      return api.dashboard.schoolLicenseMetrics.responses[200].parse(await res.json()) as LicenseUsageMetrics;
    },
  });
}

export function useDashboardNotifications(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.notifications.path],
    enabled,
    refetchInterval: enabled ? 10000 : false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    queryFn: async () => {
      const res = await fetch(api.dashboard.notifications.path, { credentials: "include" });
      if (res.status === 401) return { notifications: [] };
      if (!res.ok) throw new Error("Failed to load notifications");
      return api.dashboard.notifications.responses[200].parse(await res.json());
    },
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      const res = await fetch(api.dashboard.markNotificationRead.path, {
        method: api.dashboard.markNotificationRead.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationId }),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Failed to mark notification as read");
      }

      return api.dashboard.markNotificationRead.responses[200].parse(body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.dashboard.notifications.path] });
    },
  });
}
