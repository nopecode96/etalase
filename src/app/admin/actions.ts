"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { FeeBearer, PlanTier } from "@prisma/client";
import { slugify } from "@/lib/core/formatters";
import { calculateWithdrawalFee } from "@/services/payment/fee-calculator";
import { PAYMENT_RULES } from "@/lib/constants/pricing";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * Validates that current session owns the given storeId.
 */
async function assertStoreOwnership(storeId: string) {
  const user = await getCurrentUser();
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    select: { id: true, ownerId: true, tier: true, slug: true, isDemo: true, walletBalance: true },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // In non-demo stores with active user, ensure ownerId matches (or user is super admin)
  if (user && user.id) {
    const isSuperAdmin = (user as any).role === "SUPER_ADMIN";
    if (store.ownerId !== user.id && !isSuperAdmin && !store.isDemo) {
      throw new Error("Unauthorized store access");
    }
  }

  return { store, user };
}

/**
 * 1. Storefront & Appearance Customizer
 */
export async function actionUpdateStorefront(input: {
  storeId: string;
  templateId?: string;
  displayMode?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  accentColor?: string;
  socialLinks?: Record<string, string>;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    // Gate premium templates for FREE tier
    if (input.templateId && input.templateId !== "clean-minimal" && store.tier === PlanTier.FREE) {
      return {
        success: false,
        error: "Premium templates (Visual Menu Grid, Showroom Pro, Editorial Pastel) require a PRO plan. Please upgrade to unlock.",
      };
    }

    const currentAppearance =
      typeof store === "object" && (store as any).appearanceConfig
        ? (store as any).appearanceConfig
        : {};

    const updatedAppearance = {
      ...currentAppearance,
      accentColor: input.accentColor || currentAppearance.accentColor || "#D94E28",
      socialLinks: input.socialLinks || currentAppearance.socialLinks || {},
    };

    const updated = await prisma.store.update({
      where: { id: input.storeId },
      data: {
        templateId: input.templateId || undefined,
        displayMode: input.displayMode || undefined,
        avatarUrl: input.avatarUrl !== undefined ? input.avatarUrl : undefined,
        bannerUrl: input.bannerUrl !== undefined ? input.bannerUrl : undefined,
        appearanceConfig: updatedAppearance,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/admin/storefront");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update storefront" };
  }
}

/**
 * 2. Store Blocks (Vertical Content & Banner Blocks)
 */
export async function actionCreateStoreBlock(input: {
  storeId: string;
  type: string; // IMAGE_BANNER | FEATURED_PRODUCT | PRODUCT_GRID | LINK_BUTTON | TEXT_QUOTE
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  targetUrl?: string;
  productId?: string;
  badgeText?: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    // Count existing blocks to set sortOrder
    const blockCount = await prisma.storeBlock.count({
      where: { storeId: input.storeId },
    });

    const newBlock = await prisma.storeBlock.create({
      data: {
        storeId: input.storeId,
        type: input.type,
        title: input.title?.trim() || null,
        subtitle: input.subtitle?.trim() || null,
        imageUrl: input.imageUrl?.trim() || null,
        targetUrl: input.targetUrl?.trim() || null,
        productId: input.productId || null,
        badgeText: input.badgeText?.trim() || null,
        sortOrder: blockCount,
        isActive: true,
      },
    });

    revalidatePath("/admin/storefront");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(newBlock) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create block" };
  }
}

export async function actionUpdateStoreBlock(input: {
  blockId: string;
  storeId: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  targetUrl?: string;
  badgeText?: string;
  isActive?: boolean;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    const updated = await prisma.storeBlock.update({
      where: { id: input.blockId, storeId: input.storeId },
      data: {
        title: input.title !== undefined ? input.title.trim() : undefined,
        subtitle: input.subtitle !== undefined ? input.subtitle.trim() : undefined,
        imageUrl: input.imageUrl !== undefined ? input.imageUrl.trim() : undefined,
        targetUrl: input.targetUrl !== undefined ? input.targetUrl.trim() : undefined,
        badgeText: input.badgeText !== undefined ? input.badgeText.trim() : undefined,
        isActive: input.isActive !== undefined ? input.isActive : undefined,
      },
    });

    revalidatePath("/admin/storefront");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update block" };
  }
}

export async function actionReorderStoreBlocks(input: {
  storeId: string;
  blockIds: string[];
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    await prisma.$transaction(
      input.blockIds.map((id, index) =>
        prisma.storeBlock.update({
          where: { id, storeId: input.storeId },
          data: { sortOrder: index },
        })
      )
    );

    revalidatePath("/admin/storefront");
    revalidatePath(`/${store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reorder blocks" };
  }
}

export async function actionDeleteStoreBlock(input: {
  blockId: string;
  storeId: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    await prisma.storeBlock.delete({
      where: { id: input.blockId, storeId: input.storeId },
    });

    revalidatePath("/admin/storefront");
    revalidatePath(`/${store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete block" };
  }
}

/**
 * 3. Products & Simple Promo Management
 */
export async function actionSaveProduct(input: {
  storeId: string;
  productId?: string;
  title: string;
  slug?: string;
  description?: string;
  category?: string;
  images?: string[];
  price: number;
  compareAtPrice?: number | null;
  productType?: string;
  checkoutMode: "DIRECT_CHECKOUT" | "CHAT_ORDER" | "EXTERNAL_LINK";
  externalPlatform?: string | null;
  externalUrl?: string | null;
  chatMessage?: string | null;
  isFeatured?: boolean;
  isActive?: boolean;
  promoActive?: boolean;
  promoPrice?: number | null;
  promoDurationNote?: string | null;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    if (!input.title || input.title.trim().length === 0) {
      return { success: false, error: "Product title is required." };
    }

    if (input.price < 0) {
      return { success: false, error: "Price cannot be negative." };
    }

    // Auto-slugify
    const baseSlug = input.slug ? slugify(input.slug) : slugify(input.title);
    let finalSlug = baseSlug;

    if (!input.productId) {
      let counter = 1;
      while (true) {
        const existing = await prisma.product.findUnique({
          where: { storeId_slug: { storeId: input.storeId, slug: finalSlug } },
          select: { id: true },
        });
        if (!existing) break;
        finalSlug = `${baseSlug}-${counter++}`;
      }
    }

    // Handle promo price: if active promo, price can use promoPrice while compareAtPrice retains original price
    let effectivePrice = input.price;
    let effectiveCompare = input.compareAtPrice;

    if (input.promoActive && input.promoPrice && input.promoPrice > 0) {
      effectiveCompare = input.price;
      effectivePrice = input.promoPrice;
    }

    let result;
    if (input.productId) {
      result = await prisma.product.update({
        where: { id: input.productId, storeId: input.storeId },
        data: {
          title: input.title.trim(),
          slug: finalSlug,
          description: input.description,
          category: input.category || "General",
          images: input.images || [],
          price: effectivePrice,
          compareAtPrice: effectiveCompare,
          productType: (input.productType as any) || "DIGITAL",
          checkoutMode: input.checkoutMode,
          externalPlatform: (input.externalPlatform as any) || null,
          externalUrl: input.externalUrl || null,
          chatMessage: input.chatMessage || null,
          isFeatured: input.isFeatured ?? false,
          isActive: input.isActive ?? true,
        },
      });
    } else {
      result = await prisma.product.create({
        data: {
          storeId: input.storeId,
          title: input.title.trim(),
          slug: finalSlug,
          description: input.description,
          category: input.category || "General",
          images: input.images || [],
          price: effectivePrice,
          compareAtPrice: effectiveCompare,
          productType: (input.productType as any) || "DIGITAL",
          checkoutMode: input.checkoutMode,
          externalPlatform: (input.externalPlatform as any) || null,
          externalUrl: input.externalUrl || null,
          chatMessage: input.chatMessage || null,
          isFeatured: input.isFeatured ?? false,
          isActive: input.isActive ?? true,
        },
      });
    }

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(result) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save product" };
  }
}

export async function actionDeleteProduct(input: {
  productId: string;
  storeId: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    await prisma.product.delete({
      where: { id: input.productId, storeId: input.storeId },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin");
    revalidatePath(`/${store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete product" };
  }
}

/**
 * 4. Orders, Fee Bearer & Wallet Payouts
 */
export async function actionUpdateFeeBearer(input: {
  storeId: string;
  feeBorneBy: "CUSTOMER" | "MERCHANT";
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    const updated = await prisma.store.update({
      where: { id: input.storeId },
      data: {
        feeBorneBy: input.feeBorneBy === "MERCHANT" ? FeeBearer.MERCHANT : FeeBearer.CUSTOMER,
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update fee bearer" };
  }
}

export async function actionUpdateOrderStatus(input: {
  orderId: string;
  storeId: string;
  status: "PENDING" | "PAID" | "COMPLETED" | "FAILED";
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    const updated = await prisma.order.update({
      where: { id: input.orderId, storeId: input.storeId },
      data: {
        status: input.status as any,
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update order status" };
  }
}

export async function actionRequestWithdrawal(input: {
  storeId: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    const tierKey =
      store.tier === PlanTier.PRO ? "PRO" : store.tier === PlanTier.DFY_BUSINESS ? "DFY" : "FREE";
    const rules = PAYMENT_RULES[tierKey];

    // Minimum withdrawal validation (Rp 50.000)
    if (input.amount < rules.minWithdrawalAmountIdr) {
      return {
        success: false,
        error: `Minimum withdrawal amount is Rp ${rules.minWithdrawalAmountIdr.toLocaleString(
          "id-ID"
        )}.`,
      };
    }

    const currentBalance = Number(store.walletBalance || 0);
    if (input.amount > currentBalance) {
      return {
        success: false,
        error: `Insufficient balance. Available balance is Rp ${currentBalance.toLocaleString(
          "id-ID"
        )}.`,
      };
    }

    // Calculate fee
    const feeResult = await calculateWithdrawalFee(store.id, store.tier, input.amount);

    // Create withdrawal record and deduct wallet balance
    const [withdrawal] = await prisma.$transaction([
      prisma.withdrawal.create({
        data: {
          storeId: store.id,
          amount: input.amount,
          feeCharged: feeResult.fee,
          netAmount: feeResult.netAmount,
          currency: "IDR",
          destination: `${input.bankName.toUpperCase()} - ${input.accountNumber} (${input.accountHolder})`,
          status: "PENDING",
        },
      }),
      prisma.store.update({
        where: { id: store.id },
        data: {
          walletBalance: { decrement: input.amount },
        },
      }),
    ]);

    revalidatePath("/admin/orders");
    revalidatePath("/admin");
    return { success: true, data: serializePlain(withdrawal) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit withdrawal request" };
  }
}

/**
 * 5. Analytics & Marketing Pixels
 */
export async function actionUpdatePixels(input: {
  storeId: string;
  metaPixelId?: string;
  tiktokPixelId?: string;
  gaMeasurementId?: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    if (store.tier === PlanTier.FREE) {
      return {
        success: false,
        error: "Marketing Pixels (Meta, TikTok, GA4) are available exclusively on PRO and DFY tiers. Please upgrade your plan.",
      };
    }

    const updated = await prisma.store.update({
      where: { id: input.storeId },
      data: {
        metaPixelId: input.metaPixelId?.trim() || null,
        tiktokPixelId: input.tiktokPixelId?.trim() || null,
        gaMeasurementId: input.gaMeasurementId?.trim() || null,
      },
    });

    revalidatePath("/admin/analytics");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update pixels" };
  }
}

/**
 * 6. Store Settings & Custom Domain & Telegram Integration
 */
export async function actionUpdateStoreSettings(input: {
  storeId: string;
  name?: string;
  bio?: string;
  chatHandle?: string;
  locale?: string;
  currency?: string;
  customDomain?: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    // Custom domain gating for FREE tier
    if (input.customDomain && input.customDomain.trim() && store.tier === PlanTier.FREE) {
      return {
        success: false,
        error: "Custom domain connection is a PRO feature. Upgrade to attach your custom domain.",
      };
    }

    const cleanDomain = input.customDomain
      ? input.customDomain.trim().toLowerCase().replace(/^https?:\/\//, "")
      : null;

    const updated = await prisma.store.update({
      where: { id: input.storeId },
      data: {
        name: input.name !== undefined ? input.name.trim() : undefined,
        bio: input.bio !== undefined ? input.bio.trim() : undefined,
        chatHandle: input.chatHandle !== undefined ? input.chatHandle.trim() : undefined,
        locale: input.locale || undefined,
        currency: input.currency || undefined,
        customDomain: cleanDomain || null,
        domainVerified: cleanDomain ? false : false,
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/admin");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update settings" };
  }
}

export async function actionUpdateTelegramIntegration(input: {
  storeId: string;
  telegramToken: string;
  telegramChatId: string;
}): Promise<ActionResult> {
  try {
    const { store } = await assertStoreOwnership(input.storeId);

    const currentAppearance =
      typeof store === "object" && (store as any).appearanceConfig
        ? (store as any).appearanceConfig
        : {};

    const updatedAppearance = {
      ...currentAppearance,
      telegramIntegration: {
        botToken: input.telegramToken.trim(),
        chatId: input.telegramChatId.trim(),
        connectedAt: new Date().toISOString(),
        isConnected: Boolean(input.telegramToken.trim() && input.telegramChatId.trim()),
      },
    };

    const updated = await prisma.store.update({
      where: { id: input.storeId },
      data: {
        appearanceConfig: updatedAppearance,
      },
    });

    revalidatePath("/admin/settings");
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save Telegram integration" };
  }
}
