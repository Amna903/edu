const SUPPORTED_CURRENCIES = ["USD", "GBP", "AED", "SAR", "EUR"];
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const RATES_URL = "https://open.er-api.com/v6/latest/PKR";

type RatesCache = { rates: Record<string, number>; updatedAt: number };

let cache: RatesCache | null = null;

export async function getPkrExchangeRates(): Promise<RatesCache> {
  if (cache && Date.now() - cache.updatedAt < CACHE_TTL_MS) {
    return cache;
  }

  try {
    const response = await fetch(RATES_URL);
    const data = (await response.json()) as { result?: string; rates?: Record<string, number> };
    if (data.result !== "success" || !data.rates) {
      throw new Error("Unexpected exchange rate response");
    }

    const rates: Record<string, number> = { PKR: 1 };
    for (const code of SUPPORTED_CURRENCIES) {
      if (typeof data.rates[code] === "number") {
        rates[code] = data.rates[code];
      }
    }

    cache = { rates, updatedAt: Date.now() };
    return cache;
  } catch (err) {
    // Live rates are display-only (checkout always charges PKR), so on failure
    // fall back to stale cached rates, or PKR-only if we have never fetched.
    return cache ?? { rates: { PKR: 1 }, updatedAt: Date.now() };
  }
}
