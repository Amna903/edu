import { useEffect, useState } from "react";

const COUNTRY_CURRENCY: Record<string, string> = {
  PK: "PKR",
  US: "USD",
  GB: "GBP",
  AE: "AED",
  SA: "SAR",
};

const EUROZONE_COUNTRIES = [
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "PT", "FI",
  "GR", "LU", "SI", "SK", "EE", "LV", "LT", "CY", "MT", "HR",
];
for (const country of EUROZONE_COUNTRIES) {
  COUNTRY_CURRENCY[country] = "EUR";
}

function countryFromLocale(locale?: string | null): string | null {
  if (!locale) return null;
  const match = locale.match(/-([A-Za-z]{2})$/);
  return match ? match[1].toUpperCase() : null;
}

function detectCountryCode(): string {
  if (typeof navigator !== "undefined") {
    const locales = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
    for (const locale of locales) {
      const country = countryFromLocale(locale);
      if (country) return country;
    }
  }

  if (typeof Intl !== "undefined") {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    const country = countryFromLocale(locale);
    if (country) return country;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (timezone.includes("Karachi")) return "PK";
  }

  return "PK";
}

export function getCurrencyCode(countryCode?: string): string {
  const code = (countryCode || detectCountryCode()).toUpperCase();
  // Unmapped countries fall back to PKR (the real, always-accurate charge
  // currency) rather than guessing a foreign currency we can't convert to.
  return COUNTRY_CURRENCY[code] || "PKR";
}

// Live PKR exchange rates are for display only: courses are priced in PKR
// and PayFast Pakistan only ever settles in PKR, so the amount actually
// charged never changes. This just shows visitors a converted estimate.
type RatesState = { rates: Record<string, number>; updatedAt: number } | null;
let ratesState: RatesState = null;
let ratesFetch: Promise<void> | null = null;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((listener) => listener());
}

function loadExchangeRates(): Promise<void> {
  if (ratesFetch) return ratesFetch;

  ratesFetch = fetch("/api/currency/rates")
    .then((res) => (res.ok ? res.json() : null))
    .then((data: { rates?: Record<string, number> } | null) => {
      if (data?.rates) {
        ratesState = { rates: data.rates, updatedAt: Date.now() };
        notifySubscribers();
      }
    })
    .catch(() => {
      // Leave ratesState as-is; formatMoneyFromMinorUnits falls back to PKR.
    })
    .finally(() => {
      ratesFetch = null;
    });

  return ratesFetch;
}

// Call once near the app root so components using formatMoneyFromMinorUnits
// re-render automatically once live rates arrive.
export function useCurrencyRates() {
  const [, forceRerender] = useState(0);

  useEffect(() => {
    if (!ratesState) loadExchangeRates();
    const listener = () => forceRerender((n) => n + 1);
    subscribers.add(listener);
    return () => {
      subscribers.delete(listener);
    };
  }, []);
}

export function formatMoneyFromMinorUnits(amountInMinorUnits: number, countryCode?: string): string {
  const currency = getCurrencyCode(countryCode);
  const majorAmountPkr = Number.isFinite(amountInMinorUnits) ? amountInMinorUnits / 100 : 0;

  if (currency === "PKR") {
    return `Rs ${majorAmountPkr.toFixed(2)}`;
  }

  const rate = ratesState?.rates[currency];
  if (!rate) {
    if (!ratesState) loadExchangeRates();
    // No live rate yet (or unsupported currency) — show the real PKR amount
    // rather than mislabeling it with a foreign currency symbol.
    return `Rs ${majorAmountPkr.toFixed(2)}`;
  }

  const converted = majorAmountPkr * rate;
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(converted);
}
