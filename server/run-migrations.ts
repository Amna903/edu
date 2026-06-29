import { runPendingMigrations } from "./migrate.js";

runPendingMigrations().catch((error) => {
  console.error("[migrate] Failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
