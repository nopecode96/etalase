import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createLead } from "@/services/lead.service";
import { prisma } from "@/lib/prisma";
import { createLeadWhatsAppUrl } from "@/lib/whatsapp";

/**
 * POST /api/leads
 *
 * Endpoint alternatif (Route Handler) untuk pencatatan lead.
 * Menerima JSON body, simpan ke DB, return URL WhatsApp.
 *
 * Digunakan jika form ingin menggunakan fetch langsung daripada Server Action.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId, name, phone, moduleType, sourceUrl, details } = body;

    if (!tenantId || !name || !phone || !moduleType) {
      return NextResponse.json(
        { success: false, error: "Field wajib: tenantId, name, phone, moduleType" },
        { status: 400 }
      );
    }

    // Verifikasi tenant
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId, isActive: true },
      select: { id: true, businessName: true, whatsappNumber: true },
    });

    if (!tenant) {
      return NextResponse.json(
        { success: false, error: "Tenant tidak ditemukan" },
        { status: 404 }
      );
    }

    // Simpan lead
    const lead = await createLead({
      tenantId,
      name,
      phone,
      moduleType,
      sourceUrl,
      detailsJson: details,
    });

    // Bangun URL WhatsApp
    const whatsappUrl = createLeadWhatsAppUrl({
      tenant,
      moduleType,
      name,
      phone,
      details: details ?? {},
    });

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      whatsappUrl,
    });
  } catch (error) {
    console.error("[/api/leads] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
