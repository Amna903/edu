-- CreateTable
CREATE TABLE "edume_diagnostic_sessions" (
    "session_token" TEXT NOT NULL,
    "moodle_user_id" INTEGER,
    "ip_address" TEXT,
    "diagnostic_type" INTEGER NOT NULL,
    "subject" TEXT,
    "grade" TEXT,
    "variant" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "result_json" JSONB,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edume_diagnostic_sessions_pkey" PRIMARY KEY ("session_token")
);

-- CreateTable
CREATE TABLE "edume_guest_diagnostics" (
    "id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "subject" TEXT,
    "diagnostic_type" TEXT NOT NULL,
    "moodle_user_id" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edume_guest_diagnostics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edume_diagnostic_answers" (
    "id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edume_diagnostic_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edume_diagnostic_account_flags" (
    "id" SERIAL NOT NULL,
    "moodle_user_id" INTEGER NOT NULL,
    "free_diagnostic_used" BOOLEAN NOT NULL DEFAULT false,
    "teacher_t1_attempts" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "edume_diagnostic_account_flags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "edume_diagnostic_account_flags_moodle_user_id_key" ON "edume_diagnostic_account_flags"("moodle_user_id");
