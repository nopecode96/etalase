import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, ServiceResult } from "@/lib/core/response";
import { MSG } from "@/lib/core/messages";

export interface CourseModuleItem {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isFreePreview?: boolean;
}

export interface CourseAccessData {
  hasAccess: boolean;
  productTitle: string;
  description?: string | null;
  modules: CourseModuleItem[];
  eventDate?: Date | string | null;
  eventLocation?: string | null;
}

/**
 * Validates buyer access to video course modules.
 * Only unlocks full video URLs if a PAID order exists for the given buyerWhatsapp or user.
 */
export async function getCourseContent(
  storeSlug: string,
  productSlug: string,
  buyerWhatsapp?: string,
  orderNumber?: string
): Promise<ServiceResult<CourseAccessData>> {
  try {
    const store = await prisma.store.findUnique({
      where: { slug: storeSlug },
    });

    if (!store) {
      return fail("NOT_FOUND");
    }

    const product = await prisma.product.findUnique({
      where: {
        storeId_slug: { storeId: store.id, slug: productSlug },
      },
    });

    if (!product) {
      return fail("NOT_FOUND");
    }

    const rawModules = Array.isArray(product.courseModules)
      ? (product.courseModules as unknown as CourseModuleItem[])
      : [];

    let hasAccess = false;

    if (orderNumber) {
      const paidByOrder = await prisma.order.findFirst({
        where: {
          storeId: store.id,
          productId: product.id,
          orderCode: orderNumber.trim(),
          status: { in: ["PAID", "COMPLETED"] },
        },
      });
      if (paidByOrder) {
        hasAccess = true;
      }
    }

    if (!hasAccess && buyerWhatsapp) {
      const cleanPhone = buyerWhatsapp.replace(/[^0-9]/g, "");
      const paidOrder = await prisma.order.findFirst({
        where: {
          storeId: store.id,
          productId: product.id,
          buyerWhatsapp: cleanPhone,
          status: { in: ["PAID", "COMPLETED"] },
        },
      });

      if (paidOrder) {
        hasAccess = true;
      }
    }

    // Mask video URLs if user hasn't paid and module is not free preview
    const sanitizedModules = rawModules.map((m) => ({
      id: m.id,
      title: m.title,
      duration: m.duration,
      isFreePreview: !!m.isFreePreview,
      videoUrl: hasAccess || m.isFreePreview ? m.videoUrl : undefined,
    }));

    return ok(
      {
        hasAccess,
        productTitle: product.title,
        description: product.description,
        modules: sanitizedModules,
        eventDate: product.eventDate,
        eventLocation: product.eventLocation,
      },
      "SAVED"
    );
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

/**
 * Books an appointment / 1-on-1 consultation slot.
 */
export async function bookAppointmentSlot(params: {
  storeSlug: string;
  productSlug: string;
  buyerName: string;
  buyerWhatsapp: string;
  buyerEmail?: string;
  bookedSlot: string;
  notes?: string;
}): Promise<ServiceResult<{ orderCode: string; bookedSlot: string }>> {
  try {
    const store = await prisma.store.findUnique({
      where: { slug: params.storeSlug },
    });

    if (!store) {
      return fail("NOT_FOUND");
    }

    const product = await prisma.product.findUnique({
      where: {
        storeId_slug: { storeId: store.id, slug: params.productSlug },
      },
    });

    if (!product) {
      return fail("NOT_FOUND");
    }

    const orderCode = `BOOK-${Date.now().toString(36).toUpperCase()}`;
    const cleanPhone = params.buyerWhatsapp.replace(/[^0-9]/g, "");

    const order = await prisma.order.create({
      data: {
        orderCode,
        storeId: store.id,
        productId: product.id,
        buyerName: params.buyerName,
        buyerWhatsapp: cleanPhone,
        buyerEmail: params.buyerEmail,
        bookedSlot: params.bookedSlot,
        buyerNotes: params.notes,
        currency: store.currency,
        amount: product.price,
        netAmount: product.price,
        status: "PENDING",
      },
    });

    return ok(
      {
        orderCode: order.orderCode,
        bookedSlot: params.bookedSlot,
      },
      "CREATED"
    );
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

/**
 * Creates a creator support / tipping order.
 */
export async function createSupportTipOrder(params: {
  storeSlug: string;
  supporterName: string;
  supporterWhatsapp: string;
  amount: number;
  message?: string;
}): Promise<ServiceResult<{ orderCode: string; amount: number }>> {
  try {
    const store = await prisma.store.findUnique({
      where: { slug: params.storeSlug },
    });

    if (!store) {
      return fail("NOT_FOUND");
    }

    // Find or create default tip product for the store
    let tipProduct = await prisma.product.findFirst({
      where: {
        storeId: store.id,
        productType: "SUPPORT_TIP",
      },
    });

    if (!tipProduct) {
      tipProduct = await prisma.product.create({
        data: {
          storeId: store.id,
          title: "Dukungan & Traktir Kreator",
          slug: "support-tip",
          productType: "SUPPORT_TIP",
          price: params.amount,
          description: "Kirim apresiasi atau traktir kopi untuk kreator.",
        },
      });
    }

    const orderCode = `TIP-${Date.now().toString(36).toUpperCase()}`;
    const cleanPhone = params.supporterWhatsapp.replace(/[^0-9]/g, "");

    const order = await prisma.order.create({
      data: {
        orderCode,
        storeId: store.id,
        productId: tipProduct.id,
        buyerName: params.supporterName,
        buyerWhatsapp: cleanPhone,
        buyerNotes: params.message,
        currency: store.currency,
        amount: params.amount,
        netAmount: params.amount,
        status: "PENDING",
      },
    });

    return ok(
      {
        orderCode: order.orderCode,
        amount: Number(order.amount),
      },
      "CREATED"
    );
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}

/**
 * Records internal affiliate commission for a paid order.
 */
export async function recordAffiliateReferral(params: {
  storeId: string;
  orderId: string;
  affiliateCode: string;
  orderAmount: number;
}): Promise<ServiceResult<{ commission: number }>> {
  try {
    const store = await prisma.store.findUnique({
      where: { id: params.storeId },
    });

    const rate = store?.affiliateCommission ? Number(store.affiliateCommission) / 100 : 0.1;
    const commission = params.orderAmount * rate;

    await prisma.affiliateReferral.create({
      data: {
        storeId: params.storeId,
        orderId: params.orderId,
        affiliateCode: params.affiliateCode,
        commissionAmount: commission,
        status: "PENDING",
      },
    });

    return ok({ commission }, "SAVED");
  } catch (error) {
    return fail("INTERNAL_ERROR", undefined, error);
  }
}
