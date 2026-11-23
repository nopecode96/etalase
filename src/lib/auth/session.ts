import NextAuth from "next-auth";
import { authConfig } from "./config";
import { prisma } from "../db/prisma";
import { env } from "../config/env";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

/**
 * Returns current session user or null
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

/**
 * Guard: Requires user to be authenticated and the owner of the given store slug
 */
export async function requireStoreOwner(slug: string) {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    throw new Error("UNAUTHORIZED");
  }

  const store = await prisma.store.findUnique({
    where: { slug },
    select: { id: true, ownerId: true, tier: true, isDemo: true },
  });

  if (!store) {
    throw new Error("NOT_FOUND");
  }

  // Super admin can manage any store; otherwise owner must match
  const isSuperAdmin = (user as unknown as { role?: string }).role === "SUPER_ADMIN";
  if (store.ownerId !== user.id && !isSuperAdmin) {
    throw new Error("FORBIDDEN");
  }

  return { user, store };
}

/**
 * Guard: Requires user to be SUPER_ADMIN
 */
export async function requireSuperAdmin() {
  const user = await getCurrentUser();
  if (!user || !user.email) {
    throw new Error("UNAUTHORIZED");
  }

  const superAdminEmails = env.SUPER_ADMIN_EMAILS.split(",").map((e) =>
    e.trim().toLowerCase()
  );

  const isSuperAdmin =
    (user as unknown as { role?: string }).role === "SUPER_ADMIN" ||
    superAdminEmails.includes(user.email.toLowerCase());

  if (!isSuperAdmin) {
    throw new Error("FORBIDDEN");
  }

  return user;
}
