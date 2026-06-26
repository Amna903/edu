import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePrograms() {
  return useQuery({
    queryKey: [api.lmsCourses.list.path],
    queryFn: async () => {
      const res = await fetch(api.lmsCourses.list.path, { credentials: "include" });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error((body && typeof body.message === "string" && body.message) || "Failed to fetch courses from Moodle");
      }
      return api.lmsCourses.list.responses[200].parse(await res.json());
    },
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: [api.lmsCourses.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.lmsCourses.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error((body && typeof body.message === "string" && body.message) || "Failed to fetch program details");
      }
      return api.lmsCourses.get.responses[200].parse(await res.json());
    },
  });
}

export function useCourseDetail(courseId: number | null, enabled: boolean) {
  return useQuery({
    queryKey: [api.lmsCourses.getDetail.path, courseId],
    enabled: enabled && typeof courseId === "number" && courseId > 0,
    queryFn: async () => {
      const url = buildUrl(api.lmsCourses.getDetail.path, { id: String(courseId) });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error((body && typeof body.message === "string" && body.message) || "Failed to fetch course details");
      }
      return api.lmsCourses.getDetail.responses[200].parse(await res.json());
    },
  });
}

export function useFreeEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: number) => {
      const res = await fetch(api.enrollments.free.path, {
        method: api.enrollments.free.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error((body && typeof body.message === "string" && body.message) || "Failed to enroll in course");
      }

      return api.enrollments.free.responses[200].parse(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.student.path] });
    },
  });
}
