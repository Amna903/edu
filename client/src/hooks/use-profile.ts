import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { PasswordChangeInput, ProfileUpdateInput } from "@shared/schema";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ProfileUpdateInput) => {
      const res = await fetch(api.auth.updateProfile.path, {
        method: api.auth.updateProfile.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Profile update failed");
      }
      return api.auth.updateProfile.responses[200].parse(body);
    },
    onSuccess: async (user) => {
      queryClient.setQueryData([api.auth.me.path], user);
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (input: PasswordChangeInput) => {
      const res = await fetch(api.auth.changePassword.path, {
        method: api.auth.changePassword.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Password change failed");
      }
      return api.auth.changePassword.responses[200].parse(body);
    },
  });
}
