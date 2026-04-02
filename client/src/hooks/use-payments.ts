import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { PaymentInitRequest, PaymentVerifyRequest } from "@shared/schema";

export function useInitPayment() {
  return useMutation({
    mutationFn: async (input: PaymentInitRequest) => {
      const res = await fetch(api.payments.init.path, {
        method: api.payments.init.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to initialize payment");
      return api.payments.init.responses[200].parse(body);
    },
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: async (input: PaymentVerifyRequest) => {
      const res = await fetch(api.payments.verify.path, {
        method: api.payments.verify.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to verify payment");
      return api.payments.verify.responses[200].parse(body);
    },
  });
}
