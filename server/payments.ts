import type { CheckoutItem } from "@shared/schema";
import { env } from "./config.js";

interface SafepayInitResponse {
  status?: { message?: string };
  data?: { token?: string };
}

function getPublicKey() {
  const key = env.safepay.publicKey || "";
  if (!key) throw new Error("SAFEPAY_PUBLIC_KEY is not configured");
  return key;
}

function getSafepayBaseUrl() {
  return env.safepay.baseUrl || "https://sandbox.api.getsafepay.com";
}

function buildOrigin(host: string, proto?: string) {
  return `${proto || "http"}://${host}`;
}

export async function createSafepayCheckout(params: {
  orderRef: string;
  items: CheckoutItem[];
  totalAmount: number;
  origin: string;
  cancelPath?: string;
}) {
  const response = await fetch(`${getSafepayBaseUrl()}/order/v1/init`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client: getPublicKey(),
      amount: Number(params.totalAmount / 100),
      currency: "PKR",
      environment: "sandbox",
      mode: "payment",
      intent: "CYBERSOURCE",
      redirect_url: `${params.origin}/payment-success`,
      cancel_url: `${params.origin}${params.cancelPath || "/cart"}`,
      metadata: {
        order_id: params.orderRef,
        item_count: params.items.length,
      },
      configuration: {
        success_url: `${params.origin}/payment-success`,
        auto_redirect: true,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Safepay init failed with status ${response.status}`);
  }

  const data = (await response.json()) as SafepayInitResponse;
  if (!data.data?.token) {
    throw new Error(data.status?.message || "No Safepay token received");
  }

  const checkoutUrl =
    `${getSafepayBaseUrl()}/checkout?env=sandbox` +
    `&beacon=${data.data.token}` +
    `&client_id=${getPublicKey()}` +
    `&order_id=${params.orderRef}`;

  return { checkoutUrl };
}

export { buildOrigin };
