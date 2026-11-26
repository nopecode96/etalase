import { PlanTier } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { isStorePlanExpired } from "@/services/payment/plan-lifecycle";

export function normalizeCustomHost(rawDomain: string): string {
  return decodeURIComponent(rawDomain || "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .split("/")[0]
    .split(":")[0];
}

export async function resolveStoreSlugByCustomDomain(
  rawDomain: string
): Promise<{ slug: string; storeId: string } | null> {
  const host = normalizeCustomHost(rawDomain);
  if (!host) return null;

  const bareHost = host.startsWith("www.") ? host.slice(4) : host;
  const candidates = Array.from(new Set([host, bareHost, `www.${bareHost}`]));

  const store = await prisma.store.findFirst({
    where: {
      customDomain: { in: candidates },
      isActive: true,
    },
    select: {
      id: true,
      slug: true,
      tier: true,
      planExpiresAt: true,
    },
  });

  if (!store) return null;

  if (store.tier === PlanTier.FREE || isStorePlanExpired(store.tier, store.planExpiresAt)) {
    return null;
  }

  return { slug: store.slug, storeId: store.id };
}
