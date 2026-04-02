import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, type LoginRequest, type RegisterRequest, type RegisterResponse } from "@shared/routes";

export function useAuthUser() {
  return useQuery({
    queryKey: [api.auth.me.path],
    queryFn: async () => {
      const res = await fetch(api.auth.me.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to load session");
      return api.auth.me.responses[200].parse(await res.json());
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      const res = await fetch(api.auth.login.path, {
        method: api.auth.login.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Login failed");
      }

      return api.auth.login.responses[200].parse(body);
    },
    onSuccess: (user) => {
      queryClient.setQueryData([api.auth.me.path], user);
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: RegisterRequest) => {
      const res = await fetch(api.auth.register.path, {
        method: api.auth.register.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Registration failed");
      }

      const parsed = api.auth.register.responses[201].safeParse(body);
      if (parsed.success) {
        return parsed.data;
      }

      const legacyUser = api.auth.me.responses[200].safeParse(body);
      if (legacyUser.success) {
        return {
          success: true,
          user: legacyUser.data,
          requiresEmailConfirmation: false,
          message: "Account created successfully. Your dashboard is ready.",
          dashboardPath: `/dashboard/${legacyUser.data.role}`,
        } satisfies RegisterResponse;
      }

      throw new Error(
        parsed.error.errors[0]?.message || "Registration response format was invalid",
      );
    },
    onSuccess: (result: RegisterResponse) => {
      queryClient.setQueryData([api.auth.me.path], result.user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.auth.logout.path, {
        method: api.auth.logout.method,
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      return api.auth.logout.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.setQueryData([api.auth.me.path], null);
    },
  });
}
