import { prisma } from "../db/prisma.js";

const tableCache = new Map<string, Promise<boolean>>();

async function tableExists(tableName: string): Promise<boolean> {
  const cached = tableCache.get(tableName);
  if (cached) return cached;

  const probe = prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT to_regclass(${`public.${tableName}`}) IS NOT NULL AS "exists"
  `
    .then((rows) => rows[0]?.exists ?? false)
    .catch(() => false);

  tableCache.set(tableName, probe);
  return probe;
}

export async function canUseAdminActivityLogs(): Promise<boolean> {
  return tableExists("admin_activity_logs");
}

export async function canUseBackgroundJobs(): Promise<boolean> {
  return tableExists("background_jobs");
}

export async function canUseDeadLetterJobs(): Promise<boolean> {
  return tableExists("dead_letter_jobs");
}

export async function canUseOrders(): Promise<boolean> {
  return tableExists("orders");
}