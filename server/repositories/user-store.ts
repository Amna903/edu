import type { AppRole } from "../../shared/schema.js";
import { prisma } from "../db/prisma.js";

type StoredRole = "admin" | "student" | "parent" | "school";

function normalizeRole(value?: string | null): StoredRole {
  if (value === "admin" || value === "parent" || value === "school" || value === "student") {
    return value;
  }
  return "student";
}

function isMissingUsersTableError(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  const code =
    typeof error === "object" && error && "code" in error
      ? String((error as { code?: unknown }).code).toUpperCase()
      : "";

  return code === "P2021" || (message.includes("public.users") && message.includes("does not exist"));
}

function buildEphemeralUser(input: {
  moodleUserId: number;
  username: string;
  role: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
}) {
  const role = normalizeRole(input.role);

  return {
    id: `ephemeral-${input.moodleUserId}`,
    moodleUserId: input.moodleUserId,
    username: input.username,
    email: input.email ?? null,
    firstName: input.firstName ?? null,
    lastName: input.lastName ?? null,
    profileImage: input.profileImage ?? null,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date(),
    isSuspended: false,
    lastPasswordResetAt: null,
    enrollments: [],
  };
}

let usersTableExistsPromise: Promise<boolean> | null = null;
let pendingSignupsTableExistsPromise: Promise<boolean> | null = null;

async function hasUsersTable() {
  if (!usersTableExistsPromise) {
    usersTableExistsPromise = prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT to_regclass('public.users') IS NOT NULL AS "exists"
    `
      .then((rows) => Boolean(rows?.[0]?.exists))
      .catch(() => false);
  }

  return usersTableExistsPromise;
}

async function hasPendingSignupsTable() {
  if (!pendingSignupsTableExistsPromise) {
    pendingSignupsTableExistsPromise = prisma.$queryRaw<{ exists: boolean }[]>`
      SELECT to_regclass('public.pending_signups') IS NOT NULL AS "exists"
    `
      .then((rows) => Boolean(rows?.[0]?.exists))
      .catch(() => false);
  }

  return pendingSignupsTableExistsPromise;
}

export async function rememberPendingRegistrationRole(username: string, role: AppRole) {
  await prisma.registrationRole.upsert({
    where: { username: username.trim().toLowerCase() },
    update: { role },
    create: {
      username: username.trim().toLowerCase(),
      role,
    },
  });
}

export async function rememberPendingSignup(input: {
  username: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: AppRole;
}) {
  if (!(await hasPendingSignupsTable())) {
    return;
  }

  const normalizedUsername = input.username.trim().toLowerCase();
  const normalizedEmail = input.email.trim().toLowerCase();

  await prisma.pendingSignup.upsert({
    where: { username: normalizedUsername },
    update: {
      email: normalizedEmail,
      firstName: input.firstName ?? undefined,
      lastName: input.lastName ?? undefined,
      role: input.role,
      status: "pending_confirmation",
      confirmedAt: null,
    },
    create: {
      username: normalizedUsername,
      email: normalizedEmail,
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      role: input.role,
      status: "pending_confirmation",
    },
  });
}

export async function getPendingSignupByUsername(username: string) {
  if (!(await hasPendingSignupsTable())) {
    return null;
  }

  return prisma.pendingSignup.findUnique({
    where: { username: username.trim().toLowerCase() },
  });
}

export async function markPendingSignupConfirmed(input: { username: string; moodleUserId?: number }) {
  if (!(await hasPendingSignupsTable())) {
    return;
  }

  const normalizedUsername = input.username.trim().toLowerCase();

  await prisma.pendingSignup.updateMany({
    where: { username: normalizedUsername },
    data: {
      status: "confirmed",
      moodleUserId: input.moodleUserId ?? undefined,
      confirmedAt: new Date(),
    },
  }).catch(() => undefined);
}

export async function syncUserFromMoodleSession(input: {
  moodleUserId: number;
  username: string;
  role: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
  allowAutoCreate?: boolean;
}) {
  const normalizedUsername = input.username.trim().toLowerCase();

  if (!(await hasUsersTable())) {
    return buildEphemeralUser(input);
  }

  try {
    let existingUser = await prisma.user.findUnique({
      where: { moodleUserId: input.moodleUserId },
      select: { id: true, role: true },
    });

    if (!existingUser) {
      // Auto-heal: If Moodle ID changed, find them by username OR email
      const userByUsernameOrEmail = await prisma.user.findFirst({
        where: {
          OR: [
            { username: normalizedUsername },
            { email: normalizedUsername },
            ...(input.email ? [{ email: input.email.trim().toLowerCase() }] : []),
          ],
        },
        select: { id: true, role: true },
      });

      if (userByUsernameOrEmail) {
        // Update their moodleUserId in our DB so they don't lose their role
        existingUser = await prisma.user.update({
          where: { id: userByUsernameOrEmail.id },
          data: { moodleUserId: input.moodleUserId },
          select: { id: true, role: true },
        });
      }
    }

    // Keep login strict by default, but allow controlled auto-create flows (e.g. school seat assignment).
    if (!existingUser && !input.allowAutoCreate && input.role !== "admin") {
      console.log("User not found in local DB, but Moodle auth succeeded. User is not admin, rejecting.");
      throw new Error("No user associated with these credentials.");
    } else if (!existingUser && input.role === "admin") {
      console.log("Admin user found in Moodle but not in local DB! Auto-creating local admin record with Moodle ID:", input.moodleUserId);
    }

    const pendingRegistration = await prisma.registrationRole.findUnique({
      where: { username: normalizedUsername },
    });

    let finalRole: StoredRole = normalizeRole(input.role);

    if (pendingRegistration) {
      finalRole = pendingRegistration.role;
    } else if (existingUser && existingUser.role !== "student") {
      finalRole = existingUser.role;
    }

    const user = await prisma.user.upsert({
      where: { moodleUserId: input.moodleUserId },
      create: {
        moodleUserId: input.moodleUserId,
        username: normalizedUsername,
        role: finalRole,
        email: input.email ?? null,
        firstName: input.firstName ?? null,
        lastName: input.lastName ?? null,
        profileImage: input.profileImage ?? null,
        lastLoginAt: new Date(),
      },
      update: {
        username: normalizedUsername,
        role: finalRole,
        email: input.email ?? undefined,
        firstName: input.firstName ?? undefined,
        lastName: input.lastName ?? undefined,
        profileImage: input.profileImage ?? undefined,
        lastLoginAt: new Date(),
      },
    });

    if (pendingRegistration) {
      await prisma.registrationRole.delete({
        where: { id: pendingRegistration.id },
      }).catch(() => undefined);
    }

    return user;
  } catch (error) {
    if (isMissingUsersTableError(error)) {
      return buildEphemeralUser(input);
    }

    throw error;
  }
}

export async function getStoredRoleByMoodleUserId(moodleUserId: number): Promise<StoredRole | null> {
  if (!(await hasUsersTable())) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { moodleUserId },
      select: { role: true },
    });

    return user?.role ?? null;
  } catch (error) {
    if (isMissingUsersTableError(error)) {
      return null;
    }

    throw error;
  }
}

const inMemoryParentChildLinks = new Map<number, Set<number>>();

export async function linkParentToChild(parentMoodleUserId: number, childMoodleUserId: number) {
  try {
    await prisma.parentChild.upsert({
      where: {
        parentId_childId: {
          parentId: parentMoodleUserId,
          childId: childMoodleUserId,
        },
      },
      update: {},
      create: {
        parentId: parentMoodleUserId,
        childId: childMoodleUserId,
      },
    });
  } catch (error) {
    console.warn("Prisma parentChild upsert failed, using memory fallback:", error);
  }

  const existing = inMemoryParentChildLinks.get(parentMoodleUserId) ?? new Set<number>();
  existing.add(childMoodleUserId);
  inMemoryParentChildLinks.set(parentMoodleUserId, existing);
}

export async function getLinkedChildren(parentMoodleUserId: number) {
  const result = new Set<number>();

  try {
    const rows = await prisma.parentChild.findMany({
      where: { parentId: parentMoodleUserId },
      orderBy: { createdAt: "asc" },
    });
    for (const row of rows) {
      if (row.childId) result.add(row.childId);
    }
  } catch {
    // Non-fatal
  }

  const inMem = inMemoryParentChildLinks.get(parentMoodleUserId);
  if (inMem) {
    inMem.forEach((childId) => {
      result.add(childId);
    });
  }

  return Array.from(result);
}

export async function getStoredUserByMoodleUserId(moodleUserId: number) {
  if (!(await hasUsersTable())) {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: { moodleUserId },
    });
  } catch (error) {
    if (isMissingUsersTableError(error)) {
      return null;
    }

    throw error;
  }
}

export async function findChildUserByEmailOrIdentifier(identifier: string): Promise<number> {
  const rawInput = identifier.trim().toLowerCase();
  if (!rawInput) {
    throw new Error("Please enter your child's email address.");
  }

  const isNumeric = /^\d+$/.test(rawInput);
  const numericId = isNumeric ? parseInt(rawInput, 10) : null;
  const emailPrefix = rawInput.includes("@") ? rawInput.split("@")[0] : rawInput;

  // 1. Search local PostgreSQL User table & check role
  if (await hasUsersTable()) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: { equals: rawInput, mode: "insensitive" } },
            { username: { equals: rawInput, mode: "insensitive" } },
            { username: { equals: emailPrefix, mode: "insensitive" } },
            ...(numericId ? [{ moodleUserId: numericId }] : []),
          ],
        },
      });

      if (user) {
        if (user.role && user.role !== "student") {
          throw new Error(`The account registered with email "${identifier}" is a ${user.role} account. Only student accounts can be linked.`);
        }
        if (user.moodleUserId) {
          return user.moodleUserId;
        }
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("Only student accounts can be linked")) {
        throw error;
      }
      if (!isMissingUsersTableError(error)) {
        console.error("Local user lookup failed:", error);
      }
    }
  }

  // 2. Search Moodle via Moodle API Web Services
  try {
    const { moodlePostWithTokenFallback } = await import("../services/moodle/moodle-auth.js");

    if (rawInput.includes("@")) {
      const byEmail = await moodlePostWithTokenFallback<Array<{ id: number }>>(
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "email",
          "values[0]": rawInput,
        })
      ).catch(() => null);

      if (Array.isArray(byEmail) && byEmail.length > 0 && byEmail[0]?.id) {
        return byEmail[0].id;
      }
    }

    const byUsername = await moodlePostWithTokenFallback<Array<{ id: number }>>(
      "core_user_get_users_by_field",
      new URLSearchParams({
        field: "username",
        "values[0]": rawInput,
      })
    ).catch(() => null);

    if (Array.isArray(byUsername) && byUsername.length > 0 && byUsername[0]?.id) {
      return byUsername[0].id;
    }

    if (emailPrefix !== rawInput) {
      const byPrefix = await moodlePostWithTokenFallback<Array<{ id: number }>>(
        "core_user_get_users_by_field",
        new URLSearchParams({
          field: "username",
          "values[0]": emailPrefix,
        })
      ).catch(() => null);

      if (Array.isArray(byPrefix) && byPrefix.length > 0 && byPrefix[0]?.id) {
        return byPrefix[0].id;
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.includes("Only student accounts can be linked")) {
      throw error;
    }
  }

  if (numericId && numericId > 0) {
    return numericId;
  }

  throw new Error(`No student account found registered with email "${identifier}". Please verify the email address.`);
}
