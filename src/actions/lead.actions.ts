"use server";

import { z } from "zod";
import { createLead } from "@/services/lead.service";
import { prisma } from "@/lib/prisma";
import { createLeadWhatsAppUrl } from "@/lib/whatsapp";
import type { LeadStatus } from "@/generated/prisma";

const MODULE_TYPES = [
  "INSTALLMENT_SIMULATION",
  "TABLE_RESERVATION",
  "RESTAURANT_RESERVATION",
  "RENTAL_BOOKING",
  "GENERAL_INQUIRY",
  "PROPERTY_INQUIRY",
  "KPR_SIMULATION",
  "SITE_VISIT_BOOKING",
  "LAUNDRY_PICKUP",
] as const;

type ModuleType = (typeof MODULE_TYPES)[number];

/**
 * Skema validasi input lead
 */
const LeadInputSchema = z.object({
  tenantId: z.string().min(1, "Tenant ID wajib diisi"),
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z
    .string()
    .min(9, "Nomor HP tidak valid")
    .regex(/^[0-9+\-\s()]+$/, "Format nomor HP tidak valid"),
  moduleType: z.enum(MODULE_TYPES),
  sourceUrl: z.string().optional(),
  details: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
});

export type LeadActionInput = z.infer<typeof LeadInputSchema>;

export interface LeadActionResult {
  success: boolean;
  whatsappUrl?: string;
  leadId?: string;
  error?: string;
  fieldErrors?: Partial<Record<keyof LeadActionInput, string[]>>;
}

/**
 * Server Action: Validasi input, simpan lead ke DB, return URL WhatsApp.
 * Dipanggil dari client component atau form, lalu browser di-redirect ke URL WhatsApp.
 */
export async function submitLeadAction(
  input: LeadActionInput
): Promise<LeadActionResult> {
  // 1. Validasi input
  const parsed = LeadInputSchema.safeParse(input);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      error: "Input tidak valid",
      fieldErrors: flat.fieldErrors as Partial<Record<keyof LeadActionInput, string[]>>,
    };
  }

  const { tenantId, name, phone, moduleType, sourceUrl, details } = parsed.data;

  // 2. Verifikasi tenant ada dan aktif
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId, isActive: true },
    select: {
      id: true,
      businessName: true,
      whatsappNumber: true,
    },
  });

  if (!tenant) {
    return {
      success: false,
      error: "Tenant tidak ditemukan atau tidak aktif",
    };
  }

  // 3. Simpan lead ke database
  const lead = await createLead({
    tenantId,
    name,
    phone,
    moduleType,
    sourceUrl,
    detailsJson: details as Record<string, unknown> | undefined,
  });

  // 4. Bangun URL WhatsApp
  const whatsappUrl = createLeadWhatsAppUrl({
    tenant,
    moduleType: moduleType as ModuleType,
    name,
    phone,
    details: (details as Record<string, string | number | undefined>) ?? {},
  });

  return {
    success: true,
    leadId: lead.id,
    whatsappUrl,
  };
}

/**
 * Server Action: Update status lead (untuk dashboard klien)
 */
const UpdateLeadStatusSchema = z.object({
  leadId: z.string().min(1),
  status: z.enum(["NEW", "CONTACTED", "FOLLOW_UP", "DEAL", "LOST"] as const),
  notes: z.string().optional(),
});

export async function updateLeadStatusAction(
  input: z.infer<typeof UpdateLeadStatusSchema>
): Promise<{ success: boolean; error?: string }> {
  const parsed = UpdateLeadStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Input tidak valid" };
  }

  await prisma.lead.update({
    where: { id: parsed.data.leadId },
    data: {
      status: parsed.data.status as LeadStatus,
      ...(parsed.data.notes !== undefined
        ? { notes: parsed.data.notes }
        : {}),
    },
  });

  return { success: true };
}
