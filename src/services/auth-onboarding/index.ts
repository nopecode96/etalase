import { prisma, serializePlain } from "@/lib/db/prisma";
import { RESERVED_SLUGS } from "@/lib/config/constants";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { slugify } from "@/lib/core/formatters";

export interface OnboardingInput {
  name?: string;
  slug: string;
  templateId?: string;
  locale?: string;
  currency?: string;
  category?: string;
  whatsappCountryCode?: string;
  whatsappNumber?: string;
}

/**
 * Validates whether a store slug is available and legal.
 */
export async function checkSlugAvailability(rawSlug: string): Promise<ServiceResult<{ available: boolean; slug: string }>> {
  return withErrorHandler(async () => {
    const slug = slugify(rawSlug);

    if (!slug || slug.length < 3) {
      return fail("INVALID_INPUT", "Slug minimal terdiri dari 3 karakter alfanumerik.");
    }

    if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
      return fail("SLUG_RESERVED");
    }

    const existing = await prisma.store.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      return fail("SLUG_TAKEN");
    }

    return ok({ available: true, slug });
  });
}

/**
 * Creates the initial store for an onboarded user and triggers ops-01 webhook.
 */
export async function createInitialStore(
  userId: string,
  input: OnboardingInput
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const slugCheck = await checkSlugAvailability(input.slug);
    if (!slugCheck.success) {
      return slugCheck;
    }

    const cleanSlug = slugCheck.data.slug;

    // Normalize WhatsApp handle
    let cleanWhatsapp: string | null = null;
    if (input.whatsappNumber) {
      const code = (input.whatsappCountryCode || "+62").replace("+", "");
      const num = input.whatsappNumber.replace(/^0+/, "").replace(/[^0-9]/g, "");
      cleanWhatsapp = `${code}${num}`;
    }

    const storeName = input.name?.trim() || (cleanSlug.charAt(0).toUpperCase() + cleanSlug.slice(1));
    const storeBio = input.category ? `Etalase resmi ${input.category}` : "Selamat datang di etalase online kami.";

    const newStore = await prisma.store.create({
      data: {
        ownerId: userId,
        slug: cleanSlug,
        name: storeName,
        bio: storeBio,
        templateId: input.templateId || "clean-minimal",
        locale: input.locale || "id",
        currency: input.currency || "IDR",
        tier: "FREE",
        chatChannel: "WHATSAPP",
        chatHandle: cleanWhatsapp,
        chatChannels: cleanWhatsapp ? [{ channel: "WHATSAPP", handle: cleanWhatsapp, isPrimary: true }] : undefined,
      },
    });

    // Fire-and-forget: notify n8n Ops-01 onboarding drip flow
    await emitN8nEvent("tenant.created", {
      storeId: newStore.id,
      storeSlug: newStore.slug,
      storeName: newStore.name,
      ownerId: userId,
      locale: newStore.locale,
      currency: newStore.currency,
      templateId: newStore.templateId,
    });

    return ok(serializePlain(newStore), "CREATED");
  });
}
