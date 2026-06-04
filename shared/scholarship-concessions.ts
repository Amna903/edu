/**
 * Country-based Global Access Scholarship concessions.
 * Source: client concession list (African 30%, Asia/Americas 15%).
 * When a country appears in multiple lists, the higher concession applies.
 */

export type ConcessionRegion = "africa" | "asia" | "americas";

export interface CountryConcession {
  country: string;
  percent: 15 | 30;
  region: ConcessionRegion;
}

const AFRICA_30: readonly string[] = [
  "South Sudan",
  "Chad",
  "Niger",
  "Central African Rep.",
  "Burundi",
  "Mali",
  "Burkina Faso",
  "Somalia",
  "Ethiopia",
  "DR Congo",
  "Bangladesh",
  "Sierra Leone",
  "Mozambique",
  "Madagascar",
  "Malawi",
  "Liberia",
  "Sudan",
  "Tanzania",
  "Uganda",
  "Angola",
  "Benin",
  "Djibouti",
  "Eritrea",
  "Gambia",
  "Guinea",
  "Guinea-Bissau",
  "Lesotho",
  "Mauritania",
  "Rwanda",
  "Sao Tome & Principe",
  "Senegal",
  "Togo",
  "Kiribati",
  "Solomon Islands",
  "Tuvalu",
  "Comoros",
] as const;

const ASIA_15: readonly string[] = [
  "Afghanistan",
  "Bangladesh",
  "Bhutan",
  "Cambodia",
  "Lao People's Democratic Republic",
  "Myanmar",
  "Nepal",
  "Pakistan",
  "Yemen",
] as const;

const AMERICAS_15: readonly string[] = ["Haiti"] as const;

function buildConcessionList(): CountryConcession[] {
  const byCountry = new Map<string, CountryConcession>();

  const setCountry = (country: string, percent: 15 | 30, region: ConcessionRegion) => {
    const existing = byCountry.get(country);
    if (!existing || percent > existing.percent) {
      byCountry.set(country, { country, percent, region });
    }
  };

  for (const country of AFRICA_30) {
    setCountry(country, 30, "africa");
  }
  for (const country of ASIA_15) {
    setCountry(country, 15, "asia");
  }
  for (const country of AMERICAS_15) {
    setCountry(country, 15, "americas");
  }

  return Array.from(byCountry.values()).sort((a, b) =>
    a.country.localeCompare(b.country),
  );
}

export const SCHOLARSHIP_CONCESSIONS = buildConcessionList();

export const SCHOLARSHIP_COUNTRY_OPTIONS = SCHOLARSHIP_CONCESSIONS.map(
  (c) => c.country,
);

const concessionByCountry = new Map(
  SCHOLARSHIP_CONCESSIONS.map((c) => [c.country, c]),
);

export function getCountryConcession(
  country: string,
): CountryConcession | undefined {
  return concessionByCountry.get(country);
}

export function getConcessionPercent(country: string): number | null {
  return getCountryConcession(country)?.percent ?? null;
}

export function isScholarshipEligibleCountry(country: string): boolean {
  return concessionByCountry.has(country);
}

export function applyConcessionDiscount(
  amountMinorUnits: number,
  percent: number,
): number {
  const discount = Math.round((amountMinorUnits * percent) / 100);
  return Math.max(0, amountMinorUnits - discount);
}

export function formatConcessionLabel(percent: number): string {
  return `${percent}% concession`;
}

/** Moodle stores ISO 3166-1 alpha-2; registration uses full names from our list. */
const SCHOLARSHIP_COUNTRY_TO_MOODLE_ISO: Record<string, string> = {
  "South Sudan": "SS",
  Chad: "TD",
  Niger: "NE",
  "Central African Rep.": "CF",
  Burundi: "BI",
  Mali: "ML",
  "Burkina Faso": "BF",
  Somalia: "SO",
  Ethiopia: "ET",
  "DR Congo": "CD",
  Bangladesh: "BD",
  "Sierra Leone": "SL",
  Mozambique: "MZ",
  Madagascar: "MG",
  Malawi: "MW",
  Liberia: "LR",
  Sudan: "SD",
  Tanzania: "TZ",
  Uganda: "UG",
  Angola: "AO",
  Benin: "BJ",
  Djibouti: "DJ",
  Eritrea: "ER",
  Gambia: "GM",
  Guinea: "GN",
  "Guinea-Bissau": "GW",
  Lesotho: "LS",
  Mauritania: "MR",
  Rwanda: "RW",
  "Sao Tome & Principe": "ST",
  Senegal: "SN",
  Togo: "TG",
  Kiribati: "KI",
  "Solomon Islands": "SB",
  Tuvalu: "TV",
  Comoros: "KM",
  Afghanistan: "AF",
  Bhutan: "BT",
  Cambodia: "KH",
  "Lao People's Democratic Republic": "LA",
  Myanmar: "MM",
  Nepal: "NP",
  Pakistan: "PK",
  Yemen: "YE",
  Haiti: "HT",
};

const MOODLE_ISO_TO_SCHOLARSHIP_COUNTRY = Object.fromEntries(
  Object.entries(SCHOLARSHIP_COUNTRY_TO_MOODLE_ISO).map(([name, iso]) => [
    iso.toUpperCase(),
    name,
  ]),
) as Record<string, string>;

export function countryToMoodleIso(country: string): string | undefined {
  const normalized = normalizeScholarshipCountry(country);
  if (!normalized) return undefined;
  return SCHOLARSHIP_COUNTRY_TO_MOODLE_ISO[normalized];
}

/** Map Moodle/profile country value to a canonical scholarship list country name. */
export function normalizeScholarshipCountry(
  value: string | null | undefined,
): string | null {
  if (!value?.trim()) return null;
  const trimmed = value.trim();
  if (concessionByCountry.has(trimmed)) return trimmed;

  const upper = trimmed.toUpperCase();
  if (MOODLE_ISO_TO_SCHOLARSHIP_COUNTRY[upper]) {
    return MOODLE_ISO_TO_SCHOLARSHIP_COUNTRY[upper];
  }

  const caseInsensitive = SCHOLARSHIP_COUNTRY_OPTIONS.find(
    (c) => c.toLowerCase() === trimmed.toLowerCase(),
  );
  return caseInsensitive ?? null;
}

export function resolveConcessionFromProfileCountry(
  profileCountry: string | null | undefined,
  registrationCountry?: string | null,
) {
  const country =
    normalizeScholarshipCountry(profileCountry) ??
    normalizeScholarshipCountry(registrationCountry);
  if (!country) return null;
  const concession = getCountryConcession(country);
  return concession ? { ...concession, country } : null;
}
