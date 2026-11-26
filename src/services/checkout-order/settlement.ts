import { PaymentProvider } from "@prisma/client";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";
import { logger } from "@/lib/core/logger";
import { sendMetaCapiEvent } from "@/lib/services/tracking-capi";
import { notifyTenantNewOrder } from "@/lib/services/telegram-service";
import { computePlanExpiryDate } from "@/services/payment/plan-lifecycle";

export interface SettlePlanOrderInput {
  orderNumber: string;
  paymentProvider: PaymentProvider;
  paymentRef?: string | null;
  grossAmount?: number;
  userEmail?: string | null;
  adminNotes?: string;
}

export async function settlePaidPlanOrder(
  input: SettlePlanOrderInput
): Promise<
  | { status: "NOT_FOUND" }
  | { status: "AMOUNT_MISMATCH"; expected: number; received: number }
  | { status: "ALREADY_APPROVED"; order: any; tier: string }
  | { status: "SETTLED"; order: any; tier: string }
> {
  const planOrder = await prisma.planOrder.findUnique({
    where: { orderNumber: input.orderNumber },
    include: { store: true },
  });

  if (!planOrder) {
    return { status: "NOT_FOUND" };
  }

  if (
    input.grossAmount !== undefined &&
    input.paymentProvider === "BORDERPAY_QRIS" &&
    Number(input.grossAmount) < Number(planOrder.amount)
  ) {
    return {
      status: "AMOUNT_MISMATCH",
      expected: Number(planOrder.amount),
      received: Number(input.grossAmount),
    };
  }

  const newTier = planOrder.planCode === "DFY" ? "DFY_BUSINESS" : "PRO";

  if (planOrder.status === "APPROVED") {
    return {
      status: "ALREADY_APPROVED",
      order: serializePlain(planOrder),
      tier: planOrder.store.tier || newTier,
    };
  }

  const nextExpiry = computePlanExpiryDate(
    planOrder.billingCycle,
    planOrder.store.planExpiresAt
  );

  const [updatedOrder] = await prisma.$transaction([
    prisma.planOrder.update({
      where: { id: planOrder.id },
      data: {
        status: "APPROVED",
        paymentMethod: input.paymentProvider,
        paidAt: new Date(),
        approvedAt: new Date(),
        adminNotes:
          input.adminNotes ||
          `Auto-verified via ${input.paymentProvider} (${input.paymentRef || "SETTLED"})`,
      },
    }),
    prisma.store.update({
      where: { id: planOrder.storeId },
      data: {
        tier: newTier,
        planExpiresAt: nextExpiry,
      },
    }),
  ]);

  logger.info(
    `PlanOrder ${planOrder.orderNumber} upgraded to ${newTier} via ${input.paymentProvider}`,
    "OrderSettlement"
  );

  try {
    await emitN8nEvent("tier.upgraded", {
      orderNumber: planOrder.orderNumber,
      storeId: planOrder.storeId,
      storeName: planOrder.store.name,
      storeSlug: planOrder.store.slug,
      userEmail: input.userEmail || undefined,
      planCode: planOrder.planCode,
      billingCycle: planOrder.billingCycle,
      amount: Number(planOrder.amount),
      paidVia: input.paymentProvider,
      paymentRef: input.paymentRef || undefined,
    });
  } catch (e) {
    logger.warn("Failed to emit tier.upgraded event", "OrderSettlement", e);
  }

  return {
    status: "SETTLED",
    order: serializePlain(updatedOrder),
    tier: newTier,
  };
}

export interface SettleOrderInput {
  orderRef: string;
  paymentProvider: PaymentProvider;
  paymentRef?: string | null;
  grossAmount?: number;
}

export async function settlePaidCustomerOrder(
  input: SettleOrderInput
): Promise<
  | { status: "NOT_FOUND" }
  | { status: "AMOUNT_MISMATCH"; expected: number; received: number }
  | { status: "ALREADY_PAID"; order: any }
  | { status: "SETTLED"; order: any }
> {
  const order = await prisma.order.findFirst({
    where: {
      OR: [{ orderCode: String(input.orderRef) }, { paymentRef: String(input.orderRef) }],
    },
    include: { store: true, product: true },
  });

  if (!order) {
    return { status: "NOT_FOUND" };
  }

  if (
    input.grossAmount !== undefined &&
    input.paymentProvider === "BORDERPAY_QRIS" &&
    Number(input.grossAmount) < Number(order.amount)
  ) {
    return {
      status: "AMOUNT_MISMATCH",
      expected: Number(order.amount),
      received: Number(input.grossAmount),
    };
  }

  if (order.status === "PAID") {
    return { status: "ALREADY_PAID", order: serializePlain(order) };
  }

  const [updatedOrder] = await prisma.$transaction([
    prisma.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        paymentProvider: input.paymentProvider,
        paymentRef: input.paymentRef || order.paymentRef,
      },
    }),
    prisma.store.update({
      where: { id: order.storeId },
      data: {
        walletBalance: {
          increment: order.netAmount,
        },
      },
    }),
  ]);

  logger.info(
    `Customer Order ${order.orderCode} marked as PAID via ${input.paymentProvider}`,
    "OrderSettlement"
  );

  await emitN8nEvent("order.paid", {
    orderId: order.id,
    orderCode: order.orderCode,
    storeId: order.storeId,
    storeSlug: order.store.slug,
    buyerName: order.buyerName,
    buyerWhatsapp: order.buyerWhatsapp,
    productTitle: order.product.title,
    productType: order.product.productType,
    digitalFileUrl: order.product.digitalFileUrl,
    amount: Number(order.amount),
    currency: order.currency,
    locale: order.store.locale,
    paymentProvider: input.paymentProvider,
  });

  notifyTenantNewOrder(order.storeId, {
    orderCode: order.orderCode,
    productTitle: order.product.title,
    amount: Number(order.amount),
    buyerName: order.buyerName,
    buyerWhatsapp: order.buyerWhatsapp,
    paymentMethod: input.paymentProvider,
  }).catch(() => {});

  if (order.store.tier !== "FREE" && order.store.metaPixelId && order.store.metaCapiToken) {
    await sendMetaCapiEvent({
      pixelId: order.store.metaPixelId,
      accessToken: order.store.metaCapiToken,
      eventName: "Purchase",
      eventId: order.orderCode,
      value: Number(order.amount),
      currency: order.currency || "IDR",
      email: order.buyerEmail,
      phone: order.buyerWhatsapp,
      contentIds: [order.productId],
      contentName: order.product.title,
    });
  }

  return { status: "SETTLED", order: serializePlain(updatedOrder) };
}
