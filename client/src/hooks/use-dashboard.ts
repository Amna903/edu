import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { SchoolSeatPurchaseInput } from "@shared/schema";

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

export function useDashboardNotifications(enabled = true) {
  return useQuery({
    queryKey: [api.dashboard.notifications.path],
    enabled,
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
