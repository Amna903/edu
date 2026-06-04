ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isSuspended" BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastPasswordResetAt" TIMESTAMP;

CREATE TABLE IF NOT EXISTS "UserCourseEnrollment" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "courseCatalogId" TEXT NOT NULL,
  "progress" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT TRUE,
  "enrolledAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE ("userId", "courseCatalogId")
);

CREATE INDEX IF NOT EXISTS "UserCourseEnrollment_userId_idx" ON "UserCourseEnrollment" ("userId");
CREATE INDEX IF NOT EXISTS "UserCourseEnrollment_courseCatalogId_idx" ON "UserCourseEnrollment" ("courseCatalogId");

CREATE TABLE IF NOT EXISTS "AdminActivityLog" (
  "id" TEXT PRIMARY KEY,
  "adminUserId" INTEGER NOT NULL,
  "targetUserId" TEXT,
  "action" TEXT NOT NULL,
  "details" JSONB,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "AdminActivityLog_adminUserId_idx" ON "AdminActivityLog" ("adminUserId");
CREATE INDEX IF NOT EXISTS "AdminActivityLog_targetUserId_idx" ON "AdminActivityLog" ("targetUserId");
CREATE INDEX IF NOT EXISTS "AdminActivityLog_action_idx" ON "AdminActivityLog" ("action");
