import fs from "fs";
import path from "path";
import pg from "pg";
import { env } from "./config.js";

const MIGRATION_FILES = [
  "0004_align_orders_inquiries_schema.sql",
];

export async function runPendingMigrations() {
  if (!env.databaseUrlDirect) {
    console.warn("[migrate] Skipping migrations: DIRECT_URL / DATABASE_URL not set");
    return;
  }

  const pool = new pg.Pool({
    connectionString: env.databaseUrlDirect,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "schema_migrations" (
        "id" TEXT PRIMARY KEY,
        "applied_at" TIMESTAMP DEFAULT NOW()
      )
    `);

    for (const fileName of MIGRATION_FILES) {
      const filePath = path.resolve(process.cwd(), "migrations", fileName);
      if (!fs.existsSync(filePath)) {
        console.warn(`[migrate] Skipping missing file: ${fileName}`);
        continue;
      }

      const applied = await pool.query(`SELECT 1 FROM "schema_migrations" WHERE "id" = $1 LIMIT 1`, [fileName]);
      if (applied.rowCount && applied.rowCount > 0) {
        continue;
      }

      const sql = fs.readFileSync(filePath, "utf8");
      console.log(`[migrate] Applying: ${fileName}`);
      await pool.query(sql);
      await pool.query(`INSERT INTO "schema_migrations" ("id") VALUES ($1)`, [fileName]);
      console.log(`[migrate] Applied: ${fileName}`);
    }
  } finally {
    await pool.end();
  }
}
