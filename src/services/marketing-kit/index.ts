import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { env } from "@/lib/config/env";

export interface MarketingKitPayload {
  storeName: string;
  storeSlug: string;
  storeUrl: string;
  avatarUrl?: string | null;
  bio?: string | null;
  qrVisitUrl: string;
  qrReviewUrl?: string | null;
  googleReviewUrl?: string | null;
  mapsUrl?: string | null;
  topProducts: Array<{
    title: string;
    price: number;
  }>;
}

export async function getMarketingKitData(
  slug: string
): Promise<ServiceResult<MarketingKitPayload>> {
  return withErrorHandler(async () => {
    const store = await prisma.store.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          take: 3,
          orderBy: [{ isFeatured: "desc" }, { clicks: "desc" }],
        },
      },
    });

    if (!store) {
      return fail("NOT_FOUND", "Toko tidak ditemukan.");
    }

    const rootDomain = env.NEXT_PUBLIC_ROOT_DOMAIN;
    const storeUrl = `https://${store.slug}.${rootDomain}`;

    const qrVisitUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
      storeUrl
    )}`;

    const qrReviewUrl = store.googleReviewUrl
      ? `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
          store.googleReviewUrl
        )}`
      : null;

    const payload: MarketingKitPayload = {
      storeName: store.name,
      storeSlug: store.slug,
      storeUrl,
      avatarUrl: store.avatarUrl,
      bio: store.bio,
      qrVisitUrl,
      qrReviewUrl,
      googleReviewUrl: store.googleReviewUrl,
      mapsUrl: store.mapsUrl,
      topProducts: store.products.map((p) => ({
        title: p.title,
        price: Number(p.price),
      })),
    };

    return ok(payload, "SAVED");
  });
}
