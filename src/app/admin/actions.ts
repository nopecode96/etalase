"use server";

import { revalidatePath } from "next/cache";
import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { FeeBearer, PlanTier } from "@prisma/client";
import { slugify } from "@/lib/core/formatters";
import { calculateWithdrawalFee } from "@/services/payment/fee-calculator";
import { PAYMENT_RULES } from "@/lib/constants/pricing";
import { notifyMabesWithdrawalRequest } from "@/lib/services/telegram-service";

type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

/**
 * 1. Storefront & Appearance Customizer
 * STRICT MULTI-TENANT ISOLATION: storeId is verified against active session.
 */
export async function actionUpdateStorefront(input: {
  storeId?: string;
  templateId?: string;
  displayMode?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  accentColor?: string;
  socialLinks?: any;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const store = ctx.store;
    const verifiedStoreId = ctx.storeId;

    // Gate premium templates for FREE tier
    if (input.templateId && input.templateId !== "clean-minimal" && store.tier === PlanTier.FREE) {
      return {
        success: false,
        error: "Premium templates require a PRO plan. Please upgrade to unlock.",
      };
    }

    const currentAppearance =
      typeof store === "object" && (store as any).appearanceConfig
        ? (store as any).appearanceConfig
        : {};

    let finalSocialLinks: any = currentAppearance.socialLinks || [];
    if (input.socialLinks !== undefined) {
      if (Array.isArray(input.socialLinks)) {
        finalSocialLinks = input.socialLinks
          .filter((item: any) => item && typeof item === "object" && item.handleOrUrl && String(item.handleOrUrl).trim())
          .slice(0, 8)
          .map((item: any, idx: number) => ({
            id: item.id || `social-${idx}-${Date.now()}`,
            platform: item.platform,
            handleOrUrl: String(item.handleOrUrl).trim(),
            sortOrder: idx,
          }));
      } else if (typeof input.socialLinks === "object") {
        finalSocialLinks = input.socialLinks;
      }
    }

    const updatedAppearance = {
      ...currentAppearance,
      accentColor: input.accentColor || currentAppearance.accentColor || "#D94E28",
      socialLinks: finalSocialLinks,
    };

    const updated = await prisma.store.update({
      where: { id: verifiedStoreId },
      data: {
        templateId: input.templateId || undefined,
        displayMode: input.displayMode || undefined,
        avatarUrl: input.avatarUrl !== undefined ? input.avatarUrl : undefined,
        bannerUrl: input.bannerUrl !== undefined ? input.bannerUrl : undefined,
        appearanceConfig: updatedAppearance,
      },
    });

    revalidatePath("/admin");
    revalidatePath(`/${store.slug}`);
    revalidatePath("/admin/storefront");
    revalidatePath("/admin/storefront/theme");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update storefront" };
  }
}

/**
 * 2. Store Blocks (Vertical Content & Banner Blocks)
 * STRICT MULTI-TENANT ISOLATION: Blocks are created and mutated strictly within ctx.storeId.
 */
export async function actionCreateStoreBlock(input: {
  storeId?: string;
  type: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  targetUrl?: string;
  productId?: string;
  badgeText?: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    // Count existing blocks in this tenant's store
    const blockCount = await prisma.storeBlock.count({
      where: { storeId: verifiedStoreId },
    });

    // If productId is provided, verify it belongs to this tenant
    let verifiedProductId: string | null = null;
    if (input.productId) {
      const product = await prisma.product.findFirst({
        where: { id: input.productId, storeId: verifiedStoreId },
        select: { id: true },
      });
      if (product) {
        verifiedProductId = product.id;
      }
    }

    const newBlock = await prisma.storeBlock.create({
      data: {
        storeId: verifiedStoreId,
        type: input.type,
        title: input.title?.trim() || null,
        subtitle: input.subtitle?.trim() || null,
        imageUrl: input.imageUrl?.trim() || null,
        targetUrl: input.targetUrl?.trim() || null,
        productId: verifiedProductId,
        badgeText: input.badgeText?.trim() || null,
        sortOrder: blockCount,
        isActive: true,
      },
    });

    revalidatePath("/admin/storefront");
    revalidatePath("/admin/storefront/blocks");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true, data: serializePlain(newBlock) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create block" };
  }
}

export async function actionUpdateStoreBlock(input: {
  blockId: string;
  storeId?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  targetUrl?: string;
  badgeText?: string;
  isActive?: boolean;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    // Strict ownership verification: block MUST belong to this tenant
    const existing = await prisma.storeBlock.findFirst({
      where: { id: input.blockId, storeId: verifiedStoreId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Store block not found or access denied." };
    }

    const updated = await prisma.storeBlock.update({
      where: { id: existing.id },
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
    revalidatePath("/admin/storefront/blocks");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update block" };
  }
}

export async function actionReorderStoreBlocks(input: {
  storeId?: string;
  blockIds: string[];
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    // Verify all requested blocks strictly belong to this tenant
    const tenantBlocks = await prisma.storeBlock.findMany({
      where: { id: { in: input.blockIds }, storeId: verifiedStoreId },
      select: { id: true },
    });

    const tenantBlockIdSet = new Set(tenantBlocks.map((b) => b.id));
    const validBlockIds = input.blockIds.filter((id) => tenantBlockIdSet.has(id));

    await prisma.$transaction(
      validBlockIds.map((id, index) =>
        prisma.storeBlock.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    revalidatePath("/admin/storefront");
    revalidatePath("/admin/storefront/blocks");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reorder blocks" };
  }
}

export async function actionDeleteStoreBlock(input: {
  blockId: string;
  storeId?: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    const existing = await prisma.storeBlock.findFirst({
      where: { id: input.blockId, storeId: verifiedStoreId },
      select: { id: true },
    });

    if (!existing) {
      return { success: false, error: "Store block not found or access denied." };
    }

    await prisma.storeBlock.delete({
      where: { id: existing.id },
    });

    revalidatePath("/admin/storefront");
    revalidatePath("/admin/storefront/blocks");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete block" };
  }
}

/**
 * 3. Products & Simple Promo Management
 * STRICT MULTI-TENANT ISOLATION: Products are created, updated, and deleted strictly within ctx.storeId.
 */
export async function actionSaveProduct(input: {
  storeId?: string;
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
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

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
        const existingSlug = await prisma.product.findUnique({
          where: { storeId_slug: { storeId: verifiedStoreId, slug: finalSlug } },
          select: { id: true },
        });
        if (!existingSlug) break;
        finalSlug = `${baseSlug}-${counter++}`;
      }
    }

    // Handle promo price: if active promo, price uses promoPrice while compareAtPrice retains original price
    let effectivePrice = input.price;
    let effectiveCompare = input.compareAtPrice;

    if (input.promoActive && input.promoPrice && input.promoPrice > 0) {
      effectiveCompare = input.price;
      effectivePrice = input.promoPrice;
    }

    let result;
    if (input.productId) {
      // Compound check: verify product belongs to this tenant
      const existingProduct = await prisma.product.findFirst({
        where: { id: input.productId, storeId: verifiedStoreId },
        select: { id: true },
      });

      if (!existingProduct) {
        return { success: false, error: "Product not found or access denied." };
      }

      result = await prisma.product.update({
        where: { id: existingProduct.id },
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
          storeId: verifiedStoreId,
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
    revalidatePath("/admin/products/promos");
    revalidatePath("/admin");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true, data: serializePlain(result) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save product" };
  }
}

export async function actionDeleteProduct(input: {
  productId: string;
  storeId?: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    const existingProduct = await prisma.product.findFirst({
      where: { id: input.productId, storeId: verifiedStoreId },
      select: { id: true },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found or access denied." };
    }

    await prisma.product.delete({
      where: { id: existingProduct.id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/admin/products/promos");
    revalidatePath("/admin");
    revalidatePath(`/${ctx.store.slug}`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to delete product" };
  }
}

/**
 * 4. Orders, Fee Bearer & Wallet Payouts
 * STRICT MULTI-TENANT ISOLATION: Wallet, orders, and payouts are bound strictly to ctx.storeId.
 */
export async function actionUpdateFeeBearer(input: {
  storeId?: string;
  feeBorneBy: "CUSTOMER" | "MERCHANT";
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    const updated = await prisma.store.update({
      where: { id: verifiedStoreId },
      data: {
        feeBorneBy: input.feeBorneBy === "MERCHANT" ? FeeBearer.MERCHANT : FeeBearer.CUSTOMER,
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath("/admin/orders/payouts");
    revalidatePath("/admin");
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update fee bearer" };
  }
}

export async function actionUpdateOrderStatus(input: {
  orderId: string;
  storeId?: string;
  status: "PENDING" | "PAID" | "COMPLETED" | "FAILED";
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const verifiedStoreId = ctx.storeId;

    const existingOrder = await prisma.order.findFirst({
      where: { id: input.orderId, storeId: verifiedStoreId },
      select: { id: true },
    });

    if (!existingOrder) {
      return { success: false, error: "Order not found or access denied." };
    }

    const updated = await prisma.order.update({
      where: { id: existingOrder.id },
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
  storeId?: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const store = ctx.store;
    const verifiedStoreId = ctx.storeId;

    const rules = ctx.rules;

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
    const feeResult = await calculateWithdrawalFee(verifiedStoreId, store.tier, input.amount);

    // Create withdrawal record and deduct wallet balance
    const [withdrawal] = await prisma.$transaction([
      prisma.withdrawal.create({
        data: {
          storeId: verifiedStoreId,
          amount: input.amount,
          feeCharged: feeResult.fee,
          netAmount: feeResult.netAmount,
          currency: "IDR",
          destination: `${input.bankName.toUpperCase()} - ${input.accountNumber} (${input.accountHolder})`,
          status: "PENDING",
        },
      }),
      prisma.store.update({
        where: { id: verifiedStoreId },
        data: {
          walletBalance: { decrement: input.amount },
        },
      }),
    ]);

    // Fire-and-forget: notify Mabes group of payout request
    notifyMabesWithdrawalRequest({
      storeName: store.name,
      storeSlug: store.slug,
      amount: input.amount,
      netAmount: feeResult.netAmount,
      destination: `${input.bankName.toUpperCase()} - ${input.accountNumber} (${input.accountHolder})`,
    }).catch(() => {});

    revalidatePath("/admin/orders");
    revalidatePath("/admin/orders/payouts");
    revalidatePath("/admin");
    return { success: true, data: serializePlain(withdrawal) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to submit withdrawal request" };
  }
}

/**
 * 5. Analytics & Marketing Pixels
 * STRICT MULTI-TENANT ISOLATION: Pixels and analytics are updated strictly on ctx.storeId.
 */
export async function actionUpdatePixels(input: {
  storeId?: string;
  metaPixelId?: string;
  tiktokPixelId?: string;
  gaMeasurementId?: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const store = ctx.store;
    const verifiedStoreId = ctx.storeId;

    if (store.tier === PlanTier.FREE) {
      return {
        success: false,
        error: "Marketing Pixels (Meta, TikTok, GA4) are available exclusively on PRO and DFY tiers. Please upgrade your plan.",
      };
    }

    const updated = await prisma.store.update({
      where: { id: verifiedStoreId },
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
 * 6. Store Settings, Custom Domain & Telegram Integration
 * STRICT MULTI-TENANT ISOLATION: Settings & integrations are saved strictly to ctx.storeId.
 */
export async function actionUpdateStoreSettings(input: {
  storeId?: string;
  name?: string;
  bio?: string;
  chatHandle?: string;
  locale?: string;
  currency?: string;
  customDomain?: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const store = ctx.store;
    const verifiedStoreId = ctx.storeId;

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
      where: { id: verifiedStoreId },
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
    revalidatePath("/admin/settings/profile");
    revalidatePath("/admin/settings/domain");
    revalidatePath("/admin");
    revalidatePath(`/${store.slug}`);
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update settings" };
  }
}

export async function actionUpdateTelegramIntegration(input: {
  storeId?: string;
  telegramToken: string;
  telegramChatId: string;
}): Promise<ActionResult> {
  try {
    const ctx = await requireTenantContext(input.storeId);
    const store = ctx.store;
    const verifiedStoreId = ctx.storeId;

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
      where: { id: verifiedStoreId },
      data: {
        appearanceConfig: updatedAppearance,
      },
    });

    revalidatePath("/admin/settings");
    revalidatePath("/admin/settings/integrations");
    return { success: true, data: serializePlain(updated) };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to save Telegram integration" };
  }
}
