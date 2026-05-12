CREATE TABLE IF NOT EXISTS "edume_guest_diagnostics" (
  "id" SERIAL PRIMARY KEY,
  "ip_address" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "diagnostic_type" TEXT NOT NULL,
  "started_at" TIMESTAMP DEFAULT NOW(),
  "completed" BOOLEAN NOT NULL DEFAULT FALSE,
  "completed_at" TIMESTAMP,
  "session_token" TEXT NOT NULL UNIQUE,
  "moodle_user_id" INTEGER
);

CREATE TABLE IF NOT EXISTS "edume_diagnostic_account_flags" (
  "moodle_user_id" INTEGER PRIMARY KEY,
  "free_diagnostic_used" BOOLEAN NOT NULL DEFAULT FALSE,
  "teacher_t1_attempts" INTEGER NOT NULL DEFAULT 0,
  "updated_at" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "edume_diagnostic_sessions" (
  "id" SERIAL PRIMARY KEY,
  "session_token" TEXT NOT NULL UNIQUE,
  "moodle_user_id" INTEGER,
  "ip_address" TEXT NOT NULL,
  "diagnostic_type" INTEGER NOT NULL,
  "subject" TEXT,
  "grade" TEXT,
  "variant" TEXT,
  "paid" BOOLEAN NOT NULL DEFAULT FALSE,
  "status" TEXT NOT NULL DEFAULT 'started',
  "started_at" TIMESTAMP DEFAULT NOW(),
  "completed_at" TIMESTAMP,
  "result_json" JSONB
);

CREATE TABLE IF NOT EXISTS "edume_diagnostic_answers" (
  "id" SERIAL PRIMARY KEY,
  "session_token" TEXT NOT NULL,
  "question_id" TEXT NOT NULL,
  "answer" JSONB NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);
