import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { isTemplateAllowedForTier } from "@/lib/constants/pricing";
import { ChatChannel } from "@prisma/client";

export interface UpdateStoreProfileInput {
  name?: string;
  bio?: string | null;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  locale?: string;
  currency?: string;
  chatChannel?: ChatChannel;
  chatHandle?: string | null;
  chatChannels?: Array<{ channel: string; handle: string; isPrimary?: boolean }>;
  mapsUrl?: string | null;
  googleReviewUrl?: string | null;
  templateId?: string;
}

export async function updateStoreProfile(
  storeId: string,
  input: UpdateStoreProfileInput
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return fail("NOT_FOUND", "Toko tidak ditemukan.");
    }

    if (input.templateId && !isTemplateAllowedForTier(input.templateId, store.tier)) {
      return fail("FORBIDDEN", "Template premium hanya tersedia untuk paket PRO. Silakan upgrade paket toko Anda.");
    }

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: {
        name: input.name?.trim(),
        bio: input.bio,
        avatarUrl: input.avatarUrl,
        bannerUrl: input.bannerUrl,
        locale: input.locale,
        currency: input.currency,
        chatChannel: input.chatChannel,
        chatHandle: input.chatHandle,
        chatChannels: input.chatChannels ? JSON.parse(JSON.stringify(input.chatChannels)) : undefined,
        mapsUrl: input.mapsUrl,
        googleReviewUrl: input.googleReviewUrl,
        templateId: input.templateId,
      },
    });

    return ok(serializePlain(updated), "UPDATED");
  });
}

export async function getStoreBySlug(slug: string): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const store = await prisma.store.findUnique({
      where: { slug },
      include: {
        products: {
          where: { isActive: true },
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        },
      },
    });

    if (!store) {
      return fail("NOT_FOUND", "Toko tidak ditemukan.");
    }

    return ok(serializePlain(store), "SAVED");
  });
}
