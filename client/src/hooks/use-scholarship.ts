import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useScholarshipEligibility(enabled: boolean) {
  return useQuery({
    queryKey: [api.scholarship.eligibility.path],
    enabled,
    queryFn: async () => {
      const res = await fetch(api.scholarship.eligibility.path, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 401) return null;
      if (!res.ok) throw new Error(data.message || "Failed to check eligibility");
      return api.scholarship.eligibility.responses[200].parse(data);
    },
  });
}

export function useScholarshipApply() {
  return useMutation({
    mutationFn: async (body: {
      gradeLevel: string;
      declarationAccepted: true;
    }) => {
      const res = await fetch(api.scholarship.apply.path, {
        method: api.scholarship.apply.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Scholarship application failed");
      }
      return api.scholarship.apply.responses[200].parse(data);
    },
  });
}

export function useScholarshipValidate() {
  return useMutation({
    mutationFn: async (code: string) => {
      const res = await fetch(api.scholarship.validate.path, {
        method: api.scholarship.validate.method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid scholarship code");
      }
      return api.scholarship.validate.responses[200].parse(data);
    },
  });
}
