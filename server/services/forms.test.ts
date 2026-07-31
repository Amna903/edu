import assert from "node:assert/strict";
import test from "node:test";
import { ensureFormsReady } from "./forms.js";

test("ensureFormsReady resolves without deadlocking during initial seed", async () => {
  const result = await Promise.race([
    ensureFormsReady().then(() => "resolved"),
    new Promise<string>((_, reject) => {
      setTimeout(() => reject(new Error("Timed out waiting for forms initialization")), 5000);
    }),
  ]);

  assert.equal(result, "resolved");
});
