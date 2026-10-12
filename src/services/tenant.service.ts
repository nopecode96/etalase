import { prisma } from "@/lib/prisma";
import type { Tenant } from "@/generated/prisma";

const PREVIEW_SLUG_MAP: Record<string, string> = {
  "bastian-sales": "bastian-sales.com",
  "bastian-rental": "bastian-rental.com",
  "properti-bandung": "properti-bandung.com",
  "kuliner-kita": "kuliner-kita.com",
  "jasaprofesional": "jasaprofesional.id",
};

/**
 * Resolves tenant data berdasarkan custom domain atau slug preview.
 * Di-cache dengan React cache() agar request dalam satu render tree hanya query sekali.
 */
export async function getTenantByDomain(
  domain: string
): Promise<Tenant | null> {
  const cleanDomain = domain.split(":")[0].toLowerCase();
  const targetDomain = PREVIEW_SLUG_MAP[cleanDomain] || cleanDomain;

  return prisma.tenant.findFirst({
    where: {
      OR: [
        { customDomain: targetDomain },
        { customDomain: cleanDomain },
      ],
      isActive: true,
    },
    include: {
      category: true,
    },
  });
}

/**
 * Resolves tenant dengan semua relasi untuk halaman penuh.
 */
export async function getTenantFullByDomain(domain: string) {
  const cleanDomain = domain.split(":")[0].toLowerCase();
  const targetDomain = PREVIEW_SLUG_MAP[cleanDomain] || cleanDomain;

  return prisma.tenant.findFirst({
    where: {
      OR: [
        { customDomain: targetDomain },
        { customDomain: cleanDomain },
      ],
      isActive: true,
    },
    include: {
      category: true,
      catalogs: {
        orderBy: [{ isFeatured: "desc" }, { orderIndex: "asc" }],
      },
      galleries: {
        orderBy: { orderIndex: "asc" },
      },
      testimonials: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
