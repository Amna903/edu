import type { CheckoutItem } from "../shared/schema.js";
import { env } from "./config.js";

type PayfastFields = Record<string, string>;

function getPayfastBaseUrl() {
  if (env.payfast.baseUrl) {
    return env.payfast.baseUrl.replace(/\/+$/, "");
  }

  return env.payfast.mode === "sandbox"
    ? "https://ipguat.apps.net.pk"
    : "https://ipg1.apps.net.pk";
}

function getPayfastTokenUrl() {
  return `${getPayfastBaseUrl()}/Ecommerce/api/Transaction/GetAccessToken`;
}

function getPayfastProcessUrl() {
  return `${getPayfastBaseUrl()}/Ecommerce/api/Transaction/PostTransaction`;
}

export function buildOrigin(host: string, proto?: string) {
  return `${proto || "http"}://${host}`;
}

function formatPayfastAmount(amountMinorUnits: number) {
  return (amountMinorUnits / 100).toFixed(2);
}

function formatOrderDate(date = new Date()) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    "-",
    pad(date.getMonth() + 1),
    "-",
    pad(date.getDate()),
    " ",
    pad(date.getHours()),
    ":",
    pad(date.getMinutes()),
    ":",
    pad(date.getSeconds()),
  ].join("");
}

function readAccessToken(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const record = payload as Record<string, unknown>;
  const token =
    record.ACCESS_TOKEN ??
    record.access_token ??
    record.token ??
    record.Token ??
    record.AUTH_TOKEN;

  return typeof token === "string" ? token.trim() : "";
}

async function requestPayfastAccessToken(params: {
  orderRef: string;
  amount: number;
}) {
  if (!env.payfast.merchantId || !env.payfast.securedKey) {
    throw new Error("PayFast Pakistan credentials are not configured");
  }

  const body = new URLSearchParams({
    MERCHANT_ID: env.payfast.merchantId,
    SECURED_KEY: env.payfast.securedKey,
    TXNAMT: formatPayfastAmount(params.amount),
    BASKET_ID: params.orderRef,
    CURRENCY_CODE: env.payfast.currencyCode,
  });

  const response = await fetch(getPayfastTokenUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  const text = await response.text();
  let payload: unknown = text;
  try {
    payload = JSON.parse(text);
  } catch {
    // Some gateway responses are plain text; include the short body in the error below.
  }

  const token = readAccessToken(payload);
  if (!response.ok || !token) {
    const detail =
      typeof payload === "string"
        ? payload.slice(0, 180)
        : JSON.stringify(payload).slice(0, 180);
    throw new Error(`PayFast token request failed${detail ? `: ${detail}` : ""}`);
  }

  return token;
}

export async function buildPayfastCheckoutFields(params: {
  orderRef: string;
  itemName: string;
  amount: number;
  origin: string;
  email?: string | null;
  returnPath?: string;
  cancelPath?: string;
  notifyPath?: string;
}) {
  const token = await requestPayfastAccessToken({
    orderRef: params.orderRef,
    amount: params.amount,
  });

  const successUrl = `${params.origin}${params.returnPath || "/payment-success"}?order_id=${encodeURIComponent(params.orderRef)}`;
  const failureUrl = `${params.origin}${params.cancelPath || "/cart"}?order_id=${encodeURIComponent(params.orderRef)}`;

  const fields: PayfastFields = {
    MERCHANT_ID: env.payfast.merchantId,
    MERCHANT_NAME: env.payfast.merchantName,
    TOKEN: token,
    PROCCODE: "00",
    TXNAMT: formatPayfastAmount(params.amount),
    CURRENCY_CODE: env.payfast.currencyCode,
    CUSTOMER_MOBILE_NO: "",
    CUSTOMER_EMAIL_ADDRESS: params.email || "",
    SIGNATURE: "",
    VERSION: "MERCHANT-CART-0.1",
    TXNDESC: params.itemName,
    SUCCESS_URL: successUrl,
    FAILURE_URL: failureUrl,
    BASKET_ID: params.orderRef,
    ORDER_DATE: formatOrderDate(),
    CHECKOUT_URL: successUrl,
    TRAN_TYPE: "ECOMM_PURCHASE",
    STORE_ID: "",
    RECURRING_TXN: "",
  };

  return {
    processUrl: getPayfastProcessUrl(),
    fields,
  };
}

export function buildPayfastItemName(items: CheckoutItem[]) {
  const quantity = items.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  if (items.length === 1) {
    return items[0]?.title || "EduMeUp Course";
  }

  return `${quantity} EduMeUp courses`;
}

export { getPayfastBaseUrl };
