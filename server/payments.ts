import crypto from "crypto";
import type { CheckoutItem } from "../shared/schema.js";
import { env } from "./config.js";

type PayfastFields = Record<string, string>;

function getPayfastBaseUrl() {
  if (env.payfast.mode === "live") {
    return "https://www.payfast.co.za";
  }

  return env.payfast.baseUrl || "https://sandbox.payfast.co.za";
}

function getPayfastProcessUrl() {
  return `${getPayfastBaseUrl().replace(/\/+$/, "")}/eng/process`;
}

export function buildOrigin(host: string, proto?: string) {
  return `${proto || "http"}://${host}`;
}

function generateSignature(data: PayfastFields, passphrase?: string) {
  const output = Object.keys(data)
    .sort()
    .filter((key) => data[key] !== "")
    .map((key) => `${key}=${encodeURIComponent(data[key].trim())}`)
    .join("&");

  return typeof passphrase === "string" && passphrase.trim()
    ? `${output}&passphrase=${encodeURIComponent(passphrase.trim())}`
    : output;
}

function generateSignatureHash(data: PayfastFields, passphrase?: string) {
  const serialized = generateSignature(data, passphrase);
  return crypto.createHash("md5").update(serialized).digest("hex");
}

export function buildPayfastCheckoutFields(params: {
  orderRef: string;
  itemName: string;
  amount: number;
  origin: string;
  email?: string | null;
  returnPath?: string;
  cancelPath?: string;
  notifyPath?: string;
}) {
  if (!env.payfast.merchantId || !env.payfast.merchantKey) {
    throw new Error("PayFast credentials are not configured");
  }

  const fields: PayfastFields = {
    merchant_id: env.payfast.merchantId,
    merchant_key: env.payfast.merchantKey,
    return_url: `${params.origin}${params.returnPath || "/payment-success"}?order_id=${encodeURIComponent(params.orderRef)}`,
    cancel_url: `${params.origin}${params.cancelPath || "/cart"}?order_id=${encodeURIComponent(params.orderRef)}`,
    notify_url: `${params.origin}${params.notifyPath || "/api/webhook/payfast"}`,
    m_payment_id: params.orderRef,
    amount: params.amount.toFixed(2),
    item_name: params.itemName,
    email_address: params.email || "",
  };

  const signature = generateSignatureHash(fields, env.payfast.passphrase || undefined);

  return {
    processUrl: getPayfastProcessUrl(),
    fields: {
      ...fields,
      signature,
    },
  };
}

export function buildPayfastItemName(items: CheckoutItem[]) {
  if (items.length === 1) {
    return items[0]?.title || "EduMeUp Course";
  }

  return `${items.length} EduMeUp courses`;
}

export { getPayfastBaseUrl };
