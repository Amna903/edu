import type { AppRole } from "@shared/schema";
import { prisma } from "./prisma.js";

type StoredRole = "admin" | "student" | "parent" | "school";

function normalizeRole(value?: string | null): StoredRole {
  if (value === "admin" || value === "parent" || value === "school" || value === "student") {
    return value;
  }
  return "student";
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

export async function syncUserFromMoodleSession(input: {
  moodleUserId: number;
  username: string;
  role: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImage?: string | null;
}) {
  const normalizedUsername = input.username.trim().toLowerCase();

  const [existingUser, pendingRegistration] = await Promise.all([
    prisma.user.findUnique({
      where: { moodleUserId: input.moodleUserId },
      select: { id: true, role: true },
    }),
    prisma.registrationRole.findUnique({
      where: { username: normalizedUsername },
    }),
  ]);

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
}

export async function getStoredRoleByMoodleUserId(moodleUserId: number): Promise<StoredRole | null> {
  const user = await prisma.user.findUnique({
    where: { moodleUserId },
    select: { role: true },
  });

  return user?.role ?? null;
}

export async function linkParentToChild(parentMoodleUserId: number, childMoodleUserId: number) {
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
}

export async function getLinkedChildren(parentMoodleUserId: number) {
  const rows = await prisma.parentChild.findMany({
    where: { parentId: parentMoodleUserId },
    orderBy: { createdAt: "asc" },
  });

  return rows.map((row) => row.childId);
}

export async function getStoredUserByMoodleUserId(moodleUserId: number) {
  return prisma.user.findUnique({
    where: { moodleUserId },
  });
}
