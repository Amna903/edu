import { defineConfig } from "drizzle-kit";
import { env } from "./server/config";

if (!env.databaseUrlDirect) {
  throw new Error(
    "DATABASE_URL or DIRECT_URL must be set for Drizzle migrations",
  );
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.databaseUrlDirect,
  },
});
