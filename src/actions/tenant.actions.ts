"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/auth";
import { canManageTenant, canManageBilling } from "@/lib/permissions";

const TenantSchema = z.object({
  customDomain: z.string().min(3, "Domain minimal 3 karakter").toLowerCase(),
  businessName: z.string().min(2, "Nama bisnis minimal 2 karakter"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  sector: z.enum([
    "AUTOMOTIVE",
    "PROPERTY",
    "RENTAL",
    "RESTAURANT_CAFE",
    "GENERAL_SERVICE",
  ]),
  whatsappNumber: z
    .string()
    .min(10, "Nomor WhatsApp tidak valid")
    .regex(/^\d+$/, "Nomor WhatsApp hanya angka, tanpa + atau spasi"),
  contactEmail: z.string().email().optional(),
  address: z.string().optional(),
  googleMapsUrl: z.string().url().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160).optional(),
  seoKeywords: z.string().optional(),
  geoCity: z.string().optional(),
  geoRegion: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  themeColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  logoUrl: z.string().url().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  heroBannerUrl: z.string().url().optional(),
  isActive: z.boolean().optional().default(true),
  expiresAt: z.date().optional(),
});

export type TenantInput = z.infer<typeof TenantSchema>;

export interface TenantActionResult {
  success: boolean;
  error?: string;
  tenantId?: string;
}

/**
 * Server Action: Buat tenant baru (SAAS_SUPER_ADMIN & SAAS_ADMIN)
 */
export async function createTenantAction(
  input: TenantInput
): Promise<TenantActionResult> {
  const session = await requireSession();
  if (!canManageTenant(session)) {
    return { success: false, error: "Forbidden: Hak akses tidak mencukupi untuk membuat tenant." };
  }

  const parsed = TenantSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Input tidak valid",
    };
  }

  // Cek domain belum digunakan
  const existing = await prisma.tenant.findUnique({
    where: { customDomain: parsed.data.customDomain },
  });
  if (existing) {
    return { success: false, error: "Domain sudah terdaftar" };
  }

  const tenant = await prisma.tenant.create({
    data: parsed.data,
  });

  revalidatePath("/dashboard/admin");

  return { success: true, tenantId: tenant.id };
}

/**
 * Server Action: Update konfigurasi tenant
 * Klien (CLIENT_SUPER_ADMIN) bisa update tenant-nya sendiri.
 * SaaS team (SAAS_SUPER_ADMIN, SAAS_ADMIN) bisa update seluruh tenant.
 */
export async function updateTenantAction(
  tenantId: string,
  input: Partial<TenantInput>
): Promise<TenantActionResult> {
  const session = await requireSession();

  const isSaasManager = canManageTenant(session);
  const isTenantOwner = session.role === "CLIENT_SUPER_ADMIN" && session.tenantId === tenantId;

  if (!isSaasManager && !isTenantOwner) {
    return { success: false, error: "Forbidden: Anda tidak memiliki akses untuk mengubah tenant ini." };
  }

  await prisma.tenant.update({
    where: { id: tenantId },
    data: input,
  });

  revalidatePath(`/dashboard/settings`);
  revalidatePath(`/dashboard/admin`);

  return { success: true };
}

/**
 * Server Action: Toggle status aktif tenant (SAAS_SUPER_ADMIN & SAAS_ADMIN)
 */
export async function toggleTenantStatusAction(
  tenantId: string
): Promise<TenantActionResult> {
  const session = await requireSession();
  if (!canManageTenant(session)) {
    return { success: false, error: "Forbidden: Hanya tim manajemen SaaS yang dapat mengubah status tenant." };
  }

  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) return { success: false, error: "Tenant tidak ditemukan" };

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { isActive: !tenant.isActive },
  });

  revalidatePath("/dashboard/admin");

  return { success: true };
}

/**
 * Server Action: Update masa aktif tenant (SAAS_SUPER_ADMIN & SAAS_FINANCE)
 */
export async function updateTenantBillingAction(
  tenantId: string,
  expiresAt: Date | null
): Promise<TenantActionResult> {
  const session = await requireSession();
  if (!canManageBilling(session)) {
    return { success: false, error: "Forbidden: Hanya Finance dan Super Admin yang dapat mengubah billing/masa aktif." };
  }

  await prisma.tenant.update({
    where: { id: tenantId },
    data: { expiresAt },
  });

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/finance");

  return { success: true };
}
