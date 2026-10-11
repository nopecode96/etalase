import { prisma } from "@/lib/prisma";
import type { Lead, LeadStatus } from "@/generated/prisma";

export interface CreateLeadInput {
  tenantId: string;
  name: string;
  phone: string;
  moduleType: string;
  sourceUrl?: string;
  detailsJson?: Record<string, unknown>;
}

/**
 * Simpan lead baru ke database.
 */
export async function createLead(input: CreateLeadInput): Promise<Lead> {
  return prisma.lead.create({
    data: {
      tenantId: input.tenantId,
      name: input.name.trim(),
      phone: input.phone.trim(),
      moduleType: input.moduleType,
      sourceUrl: input.sourceUrl,
      detailsJson: (input.detailsJson as any) ?? {},
      status: "NEW",
    },
  });
}

/**
 * Ambil semua leads untuk satu tenant, diurutkan dari terbaru.
 */
export async function getLeadsByTenant(
  tenantId: string,
  status?: LeadStatus
) {
  return prisma.lead.findMany({
    where: {
      tenantId,
      ...(status ? { status } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Update status lead.
 */
export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus,
  notes?: string
) {
  return prisma.lead.update({
    where: { id: leadId },
    data: {
      status,
      ...(notes !== undefined ? { notes } : {}),
    },
  });
}
