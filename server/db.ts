
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { env } from "./config";

const { Pool } = pg;

if (!env.databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. For Neon on Vercel, use the pooled URL for DATABASE_URL and the direct URL for DIRECT_URL.",
  );
}

  import * as schema from "../shared/schema.js";
  import { env, isProduction } from "./config.js";
  max: isProduction() ? 1 : 10,
  idleTimeoutMillis: isProduction() ? 0 : 30000,
});
export const db = drizzle(pool, { schema });
