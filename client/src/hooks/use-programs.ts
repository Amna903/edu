import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { LmsCourse } from "@shared/schema";

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
