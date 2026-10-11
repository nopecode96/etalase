"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

/**
 * Server Action: Login pengguna (Super Admin & Klien)
 */
export async function loginAction(
  input: z.infer<typeof LoginSchema>
): Promise<AuthActionResult> {
  const parsed = LoginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input tidak valid",
    };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return { success: false, error: "Email atau password salah" };
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    return { success: false, error: "Email atau password salah" };
  }

  await createSession(user);
  return { success: true };
}

/**
 * Server Action: Logout
 */
export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
