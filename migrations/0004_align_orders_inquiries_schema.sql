-- Align legacy Prisma-created orders/inquiries tables with Drizzle schema (shared/schema.ts).
-- Safe to run multiple times (IF NOT EXISTS / conditional alters).

-- === INQUIRIES ===
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "type" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "email" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "role" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "grade_level" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "subject_interest" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "learning_mode" TEXT;
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "status" TEXT DEFAULT 'new';

UPDATE "inquiries"
SET
  "email" = COALESCE("email", "username"),
  "name" = COALESCE("name", "username", 'Unknown'),
  "type" = COALESCE("type", 'contact')
WHERE "email" IS NULL OR "name" IS NULL OR "type" IS NULL;

ALTER TABLE "inquiries" ALTER COLUMN "type" SET DEFAULT 'contact';
ALTER TABLE "inquiries" ALTER COLUMN "type" SET NOT NULL;
ALTER TABLE "inquiries" ALTER COLUMN "name" SET NOT NULL;
ALTER TABLE "inquiries" ALTER COLUMN "email" SET NOT NULL;

-- === ORDERS ===
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_status" TEXT DEFAULT 'pending';
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_provider" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_ref" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "invoice_number" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "paid_amount" INTEGER DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "remaining_amount" INTEGER DEFAULT 0;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "allow_partial_payment" BOOLEAN DEFAULT TRUE;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "refund_status" TEXT;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_notes" JSONB DEFAULT '[]'::jsonb;

-- Legacy Prisma used integer user_id; Drizzle expects text Moodle user id.
ALTER TABLE "orders" ALTER COLUMN "user_id" TYPE TEXT USING "user_id"::text;

UPDATE "orders"
SET "user_id" = COALESCE(NULLIF("user_id", ''), "username")
WHERE "user_id" IS NULL OR "user_id" = '';

ALTER TABLE "orders" ALTER COLUMN "username" DROP NOT NULL;

UPDATE "orders"
SET "total_amount" = 0
WHERE "total_amount" IS NULL;

ALTER TABLE "orders" ALTER COLUMN "total_amount" SET NOT NULL;
