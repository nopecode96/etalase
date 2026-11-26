import { prisma, serializePlain } from "@/lib/db/prisma";
import { RESERVED_SLUGS } from "@/lib/config/constants";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { notifyMabesNewTenant } from "@/lib/services/telegram-service";
import { validateSubdomainFormat } from "@/lib/core/formatters";

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

export interface SlugCheckResult {
  available: boolean;
  slug: string;
  reason?: "format" | "length" | "reserved" | "taken";
  suggestion?: string;
  message?: string;
}

const SUGGESTION_SUFFIXES = ["-studio", "-id", "-shop", "-store", "-online"];

async function findAvailableSuggestion(baseSlug: string): Promise<string | undefined> {
  const candidates = SUGGESTION_SUFFIXES.map((suffix) => {
    const maxBaseLen = Math.max(3, 30 - suffix.length);
    const trimmedBase = baseSlug.slice(0, maxBaseLen).replace(/-+$/, "");
    return `${trimmedBase}${suffix}`;
  }).filter(
    (candidate) =>
      candidate.length >= 3 &&
      candidate.length <= 30 &&
      !(RESERVED_SLUGS as readonly string[]).includes(candidate)
  );

  if (candidates.length === 0) return undefined;

  const takenRows = await prisma.store.findMany({
    where: { slug: { in: candidates } },
    select: { slug: true },
  });
  const takenSet = new Set(takenRows.map((row) => row.slug));
  return candidates.find((candidate) => !takenSet.has(candidate));
}

/**
 * Validates whether a store slug follows format rules, isn't reserved, and is available.
 */
export async function checkSlugAvailability(rawSlug: string): Promise<ServiceResult<SlugCheckResult>> {
  return withErrorHandler<SlugCheckResult>(async () => {
    const formatCheck = validateSubdomainFormat(rawSlug);
    if (!formatCheck.valid) {
      return ok({
        available: false,
        slug: formatCheck.slug,
        reason: formatCheck.reason || "format",
        message: formatCheck.message,
      });
    }

    const slug = formatCheck.slug;

    if ((RESERVED_SLUGS as readonly string[]).includes(slug)) {
      const suggestion = await findAvailableSuggestion(`${slug}-store`);
      return ok({
        available: false,
        slug,
        reason: "reserved",
        suggestion,
        message: `Kata "${slug}" dicadangkan oleh sistem.`,
      });
    }

    const existing = await prisma.store.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (existing) {
      const suggestion = await findAvailableSuggestion(slug);
      return ok({
        available: false,
        slug,
        reason: "taken",
        suggestion,
        message: suggestion
          ? `Sudah dipakai, coba ${suggestion}`
          : "Subdomain sudah dipakai, silakan pilih nama lain.",
      });
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
    if (!slugCheck.data.available) {
      return fail(
        slugCheck.data.reason === "reserved"
          ? "SLUG_RESERVED"
          : slugCheck.data.reason === "taken"
          ? "SLUG_TAKEN"
          : "INVALID_INPUT",
        slugCheck.data.message || "Subdomain tidak dapat digunakan."
      );
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

    // Fire-and-forget: notify Mabes group via Telegram
    prisma.user
      .findUnique({ where: { id: userId }, select: { email: true } })
      .then((owner) => {
        if (owner?.email) {
          notifyMabesNewTenant({
            storeName: newStore.name,
            storeSlug: newStore.slug,
            ownerEmail: owner.email,
            tier: newStore.tier,
            chatHandle: newStore.chatHandle,
          }).catch(() => {});
        }
      })
      .catch(() => {});

    return ok(serializePlain(newStore), "CREATED");
  });
}
