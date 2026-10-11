import type { Tenant, BusinessSector } from "@/generated/prisma";

/**
 * Bangun pesan WhatsApp terstruktur berdasarkan modul form.
 */
export function buildWhatsAppMessage(params: {
  moduleType:
    | "INSTALLMENT_SIMULATION"
    | "TABLE_RESERVATION"
    | "RENTAL_BOOKING"
    | "GENERAL_INQUIRY";
  name: string;
  phone: string;
  details: Record<string, string | number | undefined>;
  businessName: string;
}): string {
  const { moduleType, name, phone, details, businessName } = params;

  const header = `Halo *${businessName}* 👋\n\nSaya ingin menghubungi Anda.`;
  const senderInfo = `\n\n*Nama:* ${name}\n*No. HP:* ${phone}`;

  let body = "";

  switch (moduleType) {
    case "INSTALLMENT_SIMULATION": {
      body = `\n\n📋 *SIMULASI KREDIT*`;
      if (details.unit) body += `\n• Unit: ${details.unit}`;
      if (details.dp) body += `\n• DP: ${details.dp}`;
      if (details.tenor) body += `\n• Tenor: ${details.tenor} bulan`;
      if (details.cicilan) body += `\n• Est. Cicilan: ${details.cicilan}/bulan`;
      break;
    }
    case "TABLE_RESERVATION": {
      body = `\n\n🍽️ *RESERVASI MEJA*`;
      if (details.date) body += `\n• Tanggal: ${details.date}`;
      if (details.time) body += `\n• Jam: ${details.time}`;
      if (details.persons) body += `\n• Jumlah Tamu: ${details.persons} orang`;
      if (details.notes) body += `\n• Catatan: ${details.notes}`;
      break;
    }
    case "RENTAL_BOOKING": {
      body = `\n\n🚗 *PEMESANAN RENTAL*`;
      if (details.vehicle) body += `\n• Kendaraan: ${details.vehicle}`;
      if (details.startDate) body += `\n• Mulai: ${details.startDate}`;
      if (details.endDate) body += `\n• Selesai: ${details.endDate}`;
      if (details.duration) body += `\n• Durasi: ${details.duration} hari`;
      break;
    }
    case "GENERAL_INQUIRY":
    default: {
      body = `\n\n💬 *INQUIRY UMUM*`;
      if (details.subject) body += `\n• Perihal: ${details.subject}`;
      if (details.message) body += `\n• Pesan: ${details.message}`;
      break;
    }
  }

  return `${header}${senderInfo}${body}\n\nMohon bantuannya. Terima kasih! 🙏`;
}

/**
 * Buat URL WhatsApp yang siap dibuka browser.
 * @param waNumber - Nomor WhatsApp tanpa simbol + (misal: 6281234567890)
 * @param message  - Teks pesan yang sudah dibangun
 */
export function buildWhatsAppUrl(waNumber: string, message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${waNumber}?text=${encoded}`;
}

/**
 * Helper lengkap: bangun pesan + URL sekaligus.
 */
export function createLeadWhatsAppUrl(params: {
  tenant: Pick<Tenant, "whatsappNumber" | "businessName">;
  moduleType:
    | "INSTALLMENT_SIMULATION"
    | "TABLE_RESERVATION"
    | "RENTAL_BOOKING"
    | "GENERAL_INQUIRY";
  name: string;
  phone: string;
  details: Record<string, string | number | undefined>;
}): string {
  const message = buildWhatsAppMessage({
    moduleType: params.moduleType,
    name: params.name,
    phone: params.phone,
    details: params.details,
    businessName: params.tenant.businessName,
  });
  return buildWhatsAppUrl(params.tenant.whatsappNumber, message);
}
