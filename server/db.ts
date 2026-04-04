
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { env, isProduction } from "./config";

const { Pool } = pg;

if (!env.databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. For Neon on Vercel, use the pooled URL for DATABASE_URL and the direct URL for DIRECT_URL.",
  );
}

export const pool = new Pool({
  connectionString: env.databaseUrl,
  max: isProduction() ? 1 : 10,
  idleTimeoutMillis: isProduction() ? 0 : 30000,
});
export const db = drizzle(pool, { schema });
