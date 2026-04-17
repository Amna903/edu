const COUNTRY_CURRENCY: Record<string, string> = {
  PK: "PKR",
  US: "USD",
  GB: "GBP",
  AE: "AED",
  SA: "SAR",
};

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

  return "US";
}

export function getCurrencyCode(countryCode?: string): string {
  const code = (countryCode || detectCountryCode()).toUpperCase();
  return COUNTRY_CURRENCY[code] || "USD";
}

export function formatMoneyFromMinorUnits(amountInMinorUnits: number, countryCode?: string): string {
  const currency = getCurrencyCode(countryCode);
  const majorAmount = Number.isFinite(amountInMinorUnits) ? amountInMinorUnits / 100 : 0;

  if (currency === "PKR") {
    return `Rs ${majorAmount.toFixed(2)}`;
  }

  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(majorAmount);
}
