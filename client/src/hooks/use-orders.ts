import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { CheckoutRequest } from "@shared/schema";

export function useOrders() {
  return useQuery({
    queryKey: [api.orders.list.path],
    queryFn: async () => {
      const res = await fetch(api.orders.list.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to load orders");
      return api.orders.list.responses[200].parse(await res.json());
    },
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CheckoutRequest) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      const body = await res.json();
      if (!res.ok) {
        throw new Error(body.message || "Checkout failed");
      }

      return api.orders.create.responses[201].parse(body);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
  });
}
