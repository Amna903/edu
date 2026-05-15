import { randomBytes } from "crypto";
import {
  applyConcessionDiscount,
  getCountryConcession,
  resolveConcessionFromProfileCountry,
  type ConcessionRegion,
} from "../shared/scholarship-concessions.js";
import type { AuthUser, CheckoutItem } from "../shared/schema.js";
import type { IStorage } from "./storage.js";

export interface ScholarshipCodeRecord {
  code: string;
  moodleUserId: number;
  email: string;
  name: string;
  country: string;
  concessionPercent: number;
  region: ConcessionRegion;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  usedByUserId?: string;
}

const CODE_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function randomSegment(length: number): string {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length)
    .toUpperCase();
}

export function generateScholarshipCode(percent: number): string {
  return `EDU${percent}-${randomSegment(6)}`;
}

export async function resolveScholarshipCountryForUser(
  storage: IStorage,
  user: AuthUser,
): Promise<{ country: string; percent: number; region: ConcessionRegion } | null> {
  const registrationCountry = await storage.getRegisteredCountry(user.id);
  const resolved = resolveConcessionFromProfileCountry(
    user.country,
    registrationCountry,
  );
  if (!resolved) return null;
  return {
    country: resolved.country,
    percent: resolved.percent,
    region: resolved.region,
  };
}

export function createScholarshipCodeRecord(params: {
  moodleUserId: number;
  email: string;
  name: string;
  country: string;
}): ScholarshipCodeRecord {
  const concession = getCountryConcession(params.country);
  if (!concession) {
    throw new Error("Your country is not on the Global Access Scholarship list.");
  }

  const now = new Date();
  return {
    code: generateScholarshipCode(concession.percent),
    moodleUserId: params.moodleUserId,
    email: params.email.toLowerCase().trim(),
    name: params.name.trim(),
    country: concession.country,
    concessionPercent: concession.percent,
    region: concession.region,
    createdAt: now,
    expiresAt: new Date(now.getTime() + CODE_TTL_MS),
    used: false,
  };
}

export function assertScholarshipCodeForUser(
  record: ScholarshipCodeRecord | undefined,
  user: { id: number; email?: string | null; country?: string | null },
  registrationCountry?: string | null,
): asserts record is ScholarshipCodeRecord {
  if (!record) {
    throw new Error("Invalid or expired scholarship code.");
  }
  if (record.used) {
    throw new Error("This scholarship code has already been used.");
  }
  if (record.expiresAt.getTime() < Date.now()) {
    throw new Error("This scholarship code has expired.");
  }
  if (record.moodleUserId !== user.id) {
    throw new Error("This scholarship code belongs to another account and cannot be used.");
  }

  const userEmail = user.email?.toLowerCase().trim();
  if (userEmail && record.email !== userEmail) {
    throw new Error("This scholarship code does not match your account email.");
  }

  const buyerCountry = resolveConcessionFromProfileCountry(
    user.country,
    registrationCountry,
  );
  if (!buyerCountry || buyerCountry.country !== record.country) {
    throw new Error(
      "Your account country does not match the country on this scholarship. Concessions are only valid for buyers in the eligible country on their profile.",
    );
  }
}

export function calculateOrderTotalWithScholarship(
  items: CheckoutItem[],
  scholarship?: ScholarshipCodeRecord,
): { subtotal: number; discount: number; total: number } {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  if (!scholarship) {
    return { subtotal, discount: 0, total: subtotal };
  }
  const total = applyConcessionDiscount(subtotal, scholarship.concessionPercent);
  return { subtotal, discount: subtotal - total, total };
}
