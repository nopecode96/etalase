import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { User, UserRole } from "@/generated/prisma";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  tenantId: string | null;
}

/**
 * Baca session dari cookie sederhana berbasis user ID.
 * Untuk produksi, gunakan JWT atau library seperti iron-session / Auth.js.
 */
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("session_user_id")?.value;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      tenantId: true,
    },
  });

  return user ?? null;
}

/**
 * Pastikan user sudah login. Throw error jika belum.
 */
export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Silakan login terlebih dahulu.");
  }
  return session;
}

/**
 * Pastikan user adalah SAAS_SUPER_ADMIN.
 */
export async function requireSuperAdmin(): Promise<SessionUser> {
  const session = await requireSession();
  if (session.role !== "SAAS_SUPER_ADMIN") {
    throw new Error("Forbidden: Hanya SaaS Super Admin yang dapat mengakses ini.");
  }
  return session;
}

/**
 * Buat session cookie setelah login berhasil.
 */
export async function createSession(user: Pick<User, "id">): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session_user_id", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });
}

/**
 * Hapus session cookie saat logout.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session_user_id");
}
