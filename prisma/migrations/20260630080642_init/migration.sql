-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'student', 'parent', 'school');

-- CreateEnum
CREATE TYPE "SignupStatus" AS ENUM ('pending_confirmation', 'confirmed');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "moodleUserId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "profileImage" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "lastPasswordResetAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_signups" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "SignupStatus" NOT NULL DEFAULT 'pending_confirmation',
    "moodleUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "confirmedAt" TIMESTAMP(3),

    CONSTRAINT "pending_signups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent_child" (
    "id" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,
    "childId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parent_child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_roles" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registration_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_catalog" (
    "id" TEXT NOT NULL,
    "moodleCourseId" INTEGER NOT NULL,
    "shortname" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "summary" TEXT,
    "categoryId" INTEGER,
    "categoryName" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollments" (
    "id" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "course_catalog_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_activity_logs" (
    "id" TEXT NOT NULL,
    "targetUserId" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminUserId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,

    CONSTRAINT "admin_activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_countries" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registration_countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" SERIAL NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "type" TEXT NOT NULL DEFAULT 'contact',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "role" TEXT,
    "grade_level" TEXT,
    "subject_interest" TEXT,
    "learning_mode" TEXT,
    "status" TEXT DEFAULT 'new',

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,
    "payment_status" TEXT DEFAULT 'pending',
    "payment_provider" TEXT,
    "payment_ref" TEXT,
    "invoice_number" TEXT,
    "paid_amount" INTEGER,
    "remaining_amount" INTEGER,
    "allow_partial_payment" BOOLEAN,
    "refund_status" TEXT,
    "payment_notes" JSONB,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "program_id" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_payments" (
    "order_ref" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "amount_to_pay" INTEGER,
    "scholarship_code" TEXT,
    "tracker" TEXT,
    "order_id" INTEGER,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_payments_pkey" PRIMARY KEY ("order_ref")
);

-- CreateTable
CREATE TABLE "scholarship_codes" (
    "code" TEXT NOT NULL,
    "moodle_user_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "concession_percent" INTEGER NOT NULL,
    "region" TEXT NOT NULL,
    "expires_at" TIMESTAMP(6) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "used_at" TIMESTAMP(6),
    "used_by_user_id" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scholarship_codes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "registered_countries" (
    "moodle_user_id" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registered_countries_pkey" PRIMARY KEY ("moodle_user_id")
);

-- CreateTable
CREATE TABLE "dashboard_notification_reads" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,
    "read_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboard_notification_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_licenses" (
    "id" TEXT NOT NULL,
    "school_user_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "course_name" TEXT NOT NULL,
    "total_seats" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "purchase_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(6),

    CONSTRAINT "school_licenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_roster_students" (
    "id" SERIAL NOT NULL,
    "school_user_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "student_email" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "source_upload_id" TEXT NOT NULL,

    CONSTRAINT "school_roster_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_student_uploads" (
    "id" TEXT NOT NULL,
    "school_user_id" INTEGER NOT NULL,
    "filename" TEXT NOT NULL,
    "total_students" INTEGER NOT NULL,
    "processed_students" INTEGER NOT NULL,
    "failed_students" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "errors" JSONB DEFAULT '[]',
    "uploaded_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_student_uploads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school_seat_assignments" (
    "id" TEXT NOT NULL,
    "school_user_id" INTEGER NOT NULL,
    "license_id" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "student_email" TEXT NOT NULL,
    "student_name" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "school_seat_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edume_contact_submissions" (
    "id" SERIAL NOT NULL,
    "consultation_type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT,
    "subject" TEXT,
    "message" TEXT,
    "school_name" TEXT,
    "student_count" TEXT,
    "device" TEXT,
    "problem_type" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edume_contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_moodleUserId_key" ON "users"("moodleUserId");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "pending_signups_username_key" ON "pending_signups"("username");

-- CreateIndex
CREATE INDEX "pending_signups_status_idx" ON "pending_signups"("status");

-- CreateIndex
CREATE INDEX "parent_child_parentId_idx" ON "parent_child"("parentId");

-- CreateIndex
CREATE INDEX "parent_child_childId_idx" ON "parent_child"("childId");

-- CreateIndex
CREATE UNIQUE INDEX "parent_child_parentId_childId_key" ON "parent_child"("parentId", "childId");

-- CreateIndex
CREATE UNIQUE INDEX "registration_roles_username_key" ON "registration_roles"("username");

-- CreateIndex
CREATE INDEX "registration_roles_username_idx" ON "registration_roles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "course_catalog_moodleCourseId_key" ON "course_catalog"("moodleCourseId");

-- CreateIndex
CREATE INDEX "course_catalog_categoryId_idx" ON "course_catalog"("categoryId");

-- CreateIndex
CREATE INDEX "course_catalog_isVisible_idx" ON "course_catalog"("isVisible");

-- CreateIndex
CREATE INDEX "enrollments_user_id_idx" ON "enrollments"("user_id");

-- CreateIndex
CREATE INDEX "enrollments_course_catalog_id_idx" ON "enrollments"("course_catalog_id");

-- CreateIndex
CREATE UNIQUE INDEX "enrollments_user_id_course_catalog_id_key" ON "enrollments"("user_id", "course_catalog_id");

-- CreateIndex
CREATE INDEX "admin_activity_logs_adminUserId_idx" ON "admin_activity_logs"("adminUserId");

-- CreateIndex
CREATE INDEX "admin_activity_logs_targetUserId_idx" ON "admin_activity_logs"("targetUserId");

-- CreateIndex
CREATE INDEX "admin_activity_logs_action_idx" ON "admin_activity_logs"("action");

-- CreateIndex
CREATE UNIQUE INDEX "dashboard_notification_reads_user_id_notification_id_key" ON "dashboard_notification_reads"("user_id", "notification_id");

-- CreateIndex
CREATE INDEX "school_licenses_school_user_id_idx" ON "school_licenses"("school_user_id");

-- CreateIndex
CREATE INDEX "school_roster_students_school_user_id_idx" ON "school_roster_students"("school_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "school_roster_students_school_user_id_student_id_key" ON "school_roster_students"("school_user_id", "student_id");

-- CreateIndex
CREATE INDEX "school_student_uploads_school_user_id_idx" ON "school_student_uploads"("school_user_id");

-- CreateIndex
CREATE INDEX "school_seat_assignments_school_user_id_idx" ON "school_seat_assignments"("school_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "school_seat_assignments_license_id_student_id_key" ON "school_seat_assignments"("license_id", "student_id");

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_course_catalog_id_fkey" FOREIGN KEY ("course_catalog_id") REFERENCES "course_catalog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
