CREATE TABLE IF NOT EXISTS "pending_payments" (
  "order_ref" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "items" JSONB NOT NULL,
  "total_amount" INTEGER NOT NULL,
  "amount_to_pay" INTEGER,
  "scholarship_code" TEXT,
  "tracker" TEXT,
  "order_id" INTEGER,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "scholarship_codes" (
  "code" TEXT PRIMARY KEY,
  "moodle_user_id" INTEGER NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "concession_percent" INTEGER NOT NULL,
  "region" TEXT NOT NULL,
  "expires_at" TIMESTAMP NOT NULL,
  "used" BOOLEAN NOT NULL DEFAULT FALSE,
  "used_at" TIMESTAMP,
  "used_by_user_id" TEXT,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "registered_countries" (
  "moodle_user_id" INTEGER PRIMARY KEY,
  "country" TEXT NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "registration_countries" (
  "username" TEXT PRIMARY KEY,
  "country" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "dashboard_notification_reads" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL,
  "notification_id" INTEGER NOT NULL,
  "read_at" TIMESTAMP DEFAULT NOW(),
  UNIQUE ("user_id", "notification_id")
);

CREATE TABLE IF NOT EXISTS "school_licenses" (
  "id" TEXT PRIMARY KEY,
  "school_user_id" INTEGER NOT NULL,
  "course_id" INTEGER NOT NULL,
  "course_name" TEXT NOT NULL,
  "total_seats" INTEGER NOT NULL,
  "order_id" INTEGER NOT NULL,
  "purchase_date" TIMESTAMP DEFAULT NOW(),
  "expires_at" TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "school_licenses_school_user_id_idx" ON "school_licenses" ("school_user_id");

CREATE TABLE IF NOT EXISTS "school_roster_students" (
  "id" SERIAL PRIMARY KEY,
  "school_user_id" INTEGER NOT NULL,
  "student_id" INTEGER NOT NULL,
  "student_email" TEXT NOT NULL,
  "student_name" TEXT NOT NULL,
  "uploaded_at" TIMESTAMP DEFAULT NOW(),
  "source_upload_id" TEXT NOT NULL,
  UNIQUE ("school_user_id", "student_id")
);

CREATE INDEX IF NOT EXISTS "school_roster_students_school_user_id_idx" ON "school_roster_students" ("school_user_id");

CREATE TABLE IF NOT EXISTS "school_student_uploads" (
  "id" TEXT PRIMARY KEY,
  "school_user_id" INTEGER NOT NULL,
  "filename" TEXT NOT NULL,
  "total_students" INTEGER NOT NULL,
  "processed_students" INTEGER NOT NULL,
  "failed_students" INTEGER NOT NULL,
  "status" TEXT NOT NULL,
  "errors" JSONB DEFAULT '[]'::jsonb,
  "uploaded_at" TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "school_student_uploads_school_user_id_idx" ON "school_student_uploads" ("school_user_id");

CREATE TABLE IF NOT EXISTS "school_seat_assignments" (
  "id" TEXT PRIMARY KEY,
  "school_user_id" INTEGER NOT NULL,
  "license_id" TEXT NOT NULL,
  "student_id" INTEGER NOT NULL,
  "student_email" TEXT NOT NULL,
  "student_name" TEXT NOT NULL,
  "assigned_at" TIMESTAMP DEFAULT NOW(),
  UNIQUE ("license_id", "student_id")
);

CREATE INDEX IF NOT EXISTS "school_seat_assignments_school_user_id_idx" ON "school_seat_assignments" ("school_user_id");
