import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function usePrograms() {
  return useQuery({
    queryKey: [api.programs.list.path],
    queryFn: async () => {
      const res = await fetch(api.programs.list.path);
      if (!res.ok) throw new Error("Failed to fetch programs");
      return api.programs.list.responses[200].parse(await res.json());
    },
  });
}

export function useProgram(slug: string) {
  return useQuery({
    queryKey: [api.programs.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.programs.get.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch program details");
      return api.programs.get.responses[200].parse(await res.json());
    },
  });
}
