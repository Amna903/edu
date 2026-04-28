import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../shared/schema.js";
import { env, isProduction } from "./config.js";

const { Pool } = pg;

if (!env.databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. For Neon on Vercel, use pooled DATABASE_URL and direct DIRECT_URL for migrations.",
  );
}

const pool = new Pool({
  connectionString: env.databaseUrl,
  max: isProduction() ? 1 : 10,
  idleTimeoutMillis: isProduction() ? 0 : 30000,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });

