import { prisma } from "@/lib/prisma";
import type { Tenant } from "@/generated/prisma";

/**
 * Resolves tenant data berdasarkan custom domain (host header).
 * Di-cache dengan React cache() agar request dalam satu render tree hanya query sekali.
 */
export async function getTenantByDomain(
  domain: string
): Promise<Tenant | null> {
  // Normalisasi: hilangkan port jika ada (misal: localhost:3000)
  const cleanDomain = domain.split(":")[0];

  return prisma.tenant.findUnique({
    where: {
      customDomain: cleanDomain,
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
  const cleanDomain = domain.split(":")[0];

  return prisma.tenant.findUnique({
    where: {
      customDomain: cleanDomain,
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
