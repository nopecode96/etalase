import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { env } from "@/lib/config/env";
import { ServiceResult, ok, fail } from "@/lib/core/response";

export const MABES_COOKIE_NAME = "mabes_session";
export const SESSION_DURATION_SEC = 60 * 60 * 24 * 7; // 7 days

const SECRET = env.AUTH_SECRET || "mabes-enterprise-secret-key-2026-rafa";

interface MabesPayload {
  userId: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN_MABES";
  exp: number;
}

/**
 * Creates a signed HMAC-SHA256 session token for Mabes.
 */
export function createMabesToken(payload: Omit<MabesPayload, "exp">): string {
  const fullPayload: MabesPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SEC,
  };

  const payloadStr = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(payloadStr)
    .digest("base64url");

  return `${payloadStr}.${signature}`;
}

/**
 * Verifies a signed Mabes session token.
 */
export function verifyMabesToken(token: string): MabesPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [payloadStr, signature] = parts;
    const expectedSig = crypto
      .createHmac("sha256", SECRET)
      .update(payloadStr)
      .digest("base64url");

    if (signature !== expectedSig) return null;

    const payload: MabesPayload = JSON.parse(
      Buffer.from(payloadStr, "base64url").toString("utf-8")
    );

    if (Date.now() / 1000 > payload.exp) return null;
    if (payload.role !== "SUPER_ADMIN" && payload.role !== "ADMIN_MABES") return null;

    return payload;
  } catch {
    return null;
  }
}

/**
 * Retrieves the authenticated Mabes user from the cookie and database.
 */
export async function getMabesUser() {
  const cookieStore = cookies();
  const token = cookieStore.get(MABES_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifyMabesToken(token);
  if (!payload?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      image: true,
      preferredLang: true,
      createdAt: true,
    },
  });

  if (!user) return null;
  if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN_MABES") return null;

  return serializePlain(user);
}

/**
 * Guard for server components and actions: strictly requires valid Mabes session.
 */
export async function requireMabesContext() {
  const user = await getMabesUser();
  if (!user) {
    redirect("/mabes/login");
  }
  return {
    user,
    role: user.role as "SUPER_ADMIN" | "ADMIN_MABES",
    isSuperAdmin: user.role === "SUPER_ADMIN",
  };
}
