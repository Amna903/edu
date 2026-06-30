/**
 * 4.22 — Course Search Hook
 * Calls /api/search/courses with debounced query, filters, and pagination.
 */
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";

export interface CourseSearchResult {
  id: string;
  moodleCourseId: number;
  title: string;
  shortname: string;
  summary: string | null;
  category: string | null;
  price: number;
  isVisible: boolean;
  lastSyncedAt: string | null;
}

export interface CourseSearchResponse {
  courses: CourseSearchResult[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
}

export function useCourseSearch(options: {
  q?: string;
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
} = {}) {
  const { q = "", category = "", sort = "title", page = 1, limit = 20, enabled = true } = options;

  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  params.set("page", String(page));
  params.set("limit", String(limit));

  return useQuery<CourseSearchResponse>({
    queryKey: ["/api/search/courses", q, category, sort, page, limit],
    enabled,
    staleTime: 30_000,
    queryFn: async () => {
      const res = await fetch(`/api/search/courses?${params}`);
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    },
  });
}

/** Debounce helper hook */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}
