"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { canManageClientUsers } from "@/lib/permissions";

const CreateClientUserSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["CLIENT_SUPER_ADMIN", "CLIENT_ADMIN"]).default("CLIENT_ADMIN"),
  tenantId: z.string().optional(), // opsional jika dipanggil oleh CLIENT_SUPER_ADMIN, otomatis diisi dari session
});

const UpdateClientUserSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2, "Nama minimal 2 karakter").optional(),
  email: z.string().email("Format email tidak valid").optional(),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  role: z.enum(["CLIENT_SUPER_ADMIN", "CLIENT_ADMIN"]).optional(),
});

export interface UserActionResult {
  success: boolean;
  error?: string;
  userId?: string;
}

/**
 * Server Action: Buat akun CLIENT_ADMIN baru
 * Dipanggil oleh CLIENT_SUPER_ADMIN untuk stafnya, atau oleh SAAS_SUPER_ADMIN.
 */
export async function createClientUserAction(
  input: z.infer<typeof CreateClientUserSchema>
): Promise<UserActionResult> {
  const session = await requireSession();

  // Tentukan target tenant
  const targetTenantId =
    session.role === "CLIENT_SUPER_ADMIN" ? session.tenantId : (input.tenantId || session.tenantId);

  if (!targetTenantId) {
    return { success: false, error: "Tenant ID tidak valid atau belum dipilih." };
  }

  // Validasi otorisasi
  if (!canManageClientUsers(session, targetTenantId)) {
    return { success: false, error: "Forbidden: Anda tidak memiliki akses untuk menambah user di tenant ini." };
  }

  const parsed = CreateClientUserSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input tidak valid",
    };
  }

  // Cek keunikan email
  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  if (existing) {
    return { success: false, error: "Email sudah terdaftar di sistem." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  const newUser = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash,
      role: parsed.data.role,
      tenantId: targetTenantId,
    },
  });

  revalidatePath("/dashboard/team");

  return { success: true, userId: newUser.id };
}

/**
 * Server Action: Update akun anggota tim klien
 */
export async function updateClientUserAction(
  input: z.infer<typeof UpdateClientUserSchema>
): Promise<UserActionResult> {
  const session = await requireSession();

  const targetUser = await prisma.user.findUnique({
    where: { id: input.userId },
  });

  if (!targetUser) {
    return { success: false, error: "User tidak ditemukan." };
  }

  // Validasi hak akses terhadap tenant dari target user
  if (!canManageClientUsers(session, targetUser.tenantId || undefined)) {
    return { success: false, error: "Forbidden: Anda tidak berhak mengubah akun ini." };
  }

  const updateData: Record<string, unknown> = {};
  if (input.name) updateData.name = input.name;
  if (input.email) {
    // Cek duplikasi email
    const duplicate = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });
    if (duplicate && duplicate.id !== input.userId) {
      return { success: false, error: "Email sudah digunakan oleh akun lain." };
    }
    updateData.email = input.email.toLowerCase();
  }
  if (input.password) {
    updateData.passwordHash = await bcrypt.hash(input.password, 12);
  }
  if (input.role) {
    updateData.role = input.role;
  }

  await prisma.user.update({
    where: { id: input.userId },
    data: updateData,
  });

  revalidatePath("/dashboard/team");

  return { success: true };
}

/**
 * Server Action: Hapus akun anggota tim klien
 */
export async function deleteClientUserAction(
  userId: string
): Promise<UserActionResult> {
  const session = await requireSession();

  // Cegah menghapus akun sendiri
  if (session.id === userId) {
    return { success: false, error: "Tidak dapat menghapus akun Anda sendiri." };
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!targetUser) {
    return { success: false, error: "User tidak ditemukan." };
  }

  if (!canManageClientUsers(session, targetUser.tenantId || undefined)) {
    return { success: false, error: "Forbidden: Anda tidak berhak menghapus akun ini." };
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  revalidatePath("/dashboard/team");

  return { success: true };
}
