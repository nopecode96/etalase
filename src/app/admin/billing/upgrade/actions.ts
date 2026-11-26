"use server";

import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { ServiceResult, ok, fail } from "@/lib/core/response";
import { notifyMabesUpgradePayment } from "@/lib/services/telegram-service";
import { createBorderpayInvoice, getBorderpayPaymentStatus } from "@/services/payment-borderpay";
import {
  createPaypalOrder,
  capturePaypalOrder,
  getPlanUsdPrice,
} from "@/services/payment-paypal";
import { getActiveBorderpayConfig } from "@/lib/config/env";
import { settlePaidPlanOrder } from "@/services/checkout-order/settlement";

export interface CreatePlanOrderInput {
  planCode: "PRO" | "DFY";
  billingCycle: "MONTHLY" | "YEARLY" | "ONE_TIME";
  paymentProvider: "BORDERPAY_QRIS" | "PAYPAL";
  returnUrl?: string;
  cancelUrl?: string;
}

/**
 * 1. Create a fresh upgrade invoice tied strictly to the verified tenant store.
 * Supports Borderpay QRIS and PayPal (Credit Card).
 */
export async function actionCreatePlanOrder(
  input: CreatePlanOrderInput
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireTenantContext();
    const { planCode, billingCycle, paymentProvider = "BORDERPAY_QRIS" } = input;

    let amount = 49000;
    let cycle = billingCycle;

    if (planCode === "DFY") {
      amount = 899000;
      cycle = "ONE_TIME";
    } else if (planCode === "PRO") {
      if (billingCycle === "YEARLY") {
        amount = 468000;
        cycle = "YEARLY";
      } else {
        amount = 49000;
        cycle = "MONTHLY";
      }
    }

    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `INV-UPG-${dateStr}-${randomSuffix}`;

    let paymentUrl = "";
    let qrString = "";
    let paypalOrderId = "";
    let paypalApproveUrl = "";
    let amountUsd = getPlanUsdPrice(planCode, cycle);

    if (paymentProvider === "PAYPAL") {
      // Create PayPal Order in USD (Credit Card only)
      const returnUrl =
        input.returnUrl ||
        `https://etalase.online/admin/billing/upgrade?status=paypal_success&orderNumber=${orderNumber}`;
      const cancelUrl =
        input.cancelUrl ||
        `https://etalase.online/admin/billing/upgrade?status=cancelled`;

      const paypalRes = await createPaypalOrder({
        orderCode: orderNumber,
        amountUsd,
        description: `${planCode === "DFY" ? "Terima Beres (Done-For-You)" : `PRO Plan (${cycle})`} - ${ctx.store.name}`,
        returnUrl,
        cancelUrl,
        customId: orderNumber,
      });

      if (!paypalRes.success || !paypalRes.data) {
        return fail("PAYMENT_FAILED", "Failed to initialize PayPal Credit Card session.");
      }

      paypalOrderId = paypalRes.data.orderId;
      paypalApproveUrl = paypalRes.data.approveUrl;
      paymentUrl = paypalApproveUrl;
    } else {
      // Borderpay QRIS invoice (IDR)
      const appUrl = (
        process.env.NEXT_PUBLIC_APP_URL ||
        `https://${process.env.NEXT_PUBLIC_ROOT_DOMAIN || "etalase.online"}`
      ).replace(/\/$/, "");
      const invoiceRes = await createBorderpayInvoice({
        orderCode: orderNumber,
        amount,
        currency: "IDR",
        customerName: ctx.user.name || ctx.store.name,
        customerWhatsapp: ctx.store.whatsapp || "6281234567890",
        customerEmail: ctx.user.email || undefined,
        description: `${planCode === "DFY" ? "Terima Beres (Done-For-You)" : `PRO Plan (${cycle})`} - ${ctx.store.name}`,
        feeBorneBy: "merchant", // 0% extra fee for tenant plan upgrade
        returnUrl: appUrl.startsWith("https://")
          ? `${appUrl}/admin/billing/upgrade?status=qris_return&orderNumber=${orderNumber}`
          : undefined,
      });

      if (!invoiceRes.success || !invoiceRes.data) {
        return fail(
          "PAYMENT_FAILED",
          (!invoiceRes.success && invoiceRes.error) ||
            "Failed to generate Borderpay QRIS invoice. Please try Credit Card (PayPal) or retry shortly."
        );
      }

      paymentUrl = invoiceRes.data.paymentUrl;
      qrString = invoiceRes.data.qrString || "";
    }

    const order = await prisma.planOrder.create({
      data: {
        orderNumber,
        storeId: ctx.storeId,
        planCode,
        billingCycle: cycle,
        amount,
        currency: paymentProvider === "PAYPAL" ? "USD" : "IDR",
        status: "PENDING",
        paymentMethod: paymentProvider,
        notes: JSON.stringify({
          paymentUrl,
          qrString,
          paypalOrderId,
          paypalApproveUrl,
          amountUsd,
        }),
      },
    });

    // Fire-and-forget: notify Mabes group of new plan upgrade order
    notifyMabesUpgradePayment({
      orderNumber,
      storeName: ctx.store.name,
      storeSlug: ctx.store.slug,
      planCode,
      billingCycle: cycle,
      amount,
      paymentMethod: paymentProvider,
    }).catch(() => {});

    return ok({
      order: serializePlain(order),
      paymentProvider,
      paymentUrl,
      qrString,
      paypalOrderId,
      paypalApproveUrl,
      amountUsd,
    });
  } catch (err: any) {
    console.error("actionCreatePlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to create upgrade order invoice.");
  }
}

/**
 * 2. Capture and confirm an approved PayPal payment.
 * Automatically activates the tenant tier immediately.
 */
export async function actionCapturePaypalPlanOrder(input: {
  paypalOrderId: string;
  orderNumber: string;
}): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireTenantContext();
    const { paypalOrderId, orderNumber } = input;

    const planOrder = await prisma.planOrder.findFirst({
      where: {
        orderNumber,
        storeId: ctx.storeId,
      },
      include: { store: true },
    });

    if (!planOrder) {
      return fail("NOT_FOUND", "Plan upgrade order not found or unauthorized.");
    }

    if (planOrder.status === "APPROVED") {
      return ok({ status: "APPROVED", tier: planOrder.planCode });
    }

    // Capture payment with PayPal REST API
    const captureRes = await capturePaypalOrder(paypalOrderId);
    if (!captureRes.success && captureRes.error !== "ORDER_ALREADY_CAPTURED") {
      return fail("PAYMENT_FAILED", "Payment capture failed on PayPal.");
    }

    const settlement = await settlePaidPlanOrder({
      orderNumber: planOrder.orderNumber,
      paymentProvider: "PAYPAL",
      paymentRef: paypalOrderId,
      userEmail: ctx.user.email,
      adminNotes: `Captured via PayPal Order ID ${paypalOrderId}`,
    });

    if (settlement.status !== "SETTLED" && settlement.status !== "ALREADY_APPROVED") {
      return fail("PAYMENT_FAILED", "Plan upgrade settlement rejected.");
    }

    return ok({
      status: "APPROVED",
      tier: settlement.tier,
      order: settlement.order,
    });
  } catch (err: any) {
    console.error("actionCapturePaypalPlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to capture PayPal payment.");
  }
}

/**
 * 3. Polling check for PlanOrder status (checks DB + queries Borderpay REST API if pending).
 */
export async function actionCheckPlanOrderStatus(
  orderId: string
): Promise<ServiceResult<{ status: string; planCode: string; tier: string }>> {
  try {
    const ctx = await requireTenantContext();

    const order = await prisma.planOrder.findFirst({
      where: {
        id: orderId,
        storeId: ctx.storeId,
      },
      include: { store: true },
    });

    if (!order) {
      return fail("NOT_FOUND", "Order not found.");
    }

    if (
      order.status === "PENDING" &&
      order.paymentMethod === "BORDERPAY_QRIS"
    ) {
      const bpCheck = await getBorderpayPaymentStatus(order.orderNumber);
      if (bpCheck.success && bpCheck.data?.found && bpCheck.data.status === "paid") {
        const authoritativeAmount =
          bpCheck.data.orderAmount ?? bpCheck.data.customerPays;
        const settlement = await settlePaidPlanOrder({
          orderNumber: order.orderNumber,
          paymentProvider: "BORDERPAY_QRIS",
          paymentRef: bpCheck.data.referenceId,
          grossAmount: authoritativeAmount,
          userEmail: ctx.user.email,
          adminNotes: `Auto-verified via Borderpay Status API (${bpCheck.data.referenceId})`,
        });

        if (
          settlement.status === "SETTLED" ||
          settlement.status === "ALREADY_APPROVED"
        ) {
          return ok({
            status: "APPROVED",
            planCode: order.planCode,
            tier: settlement.tier,
          });
        }
      }
    }

    return ok({
      status: order.status,
      planCode: order.planCode,
      tier: order.store.tier,
    });
  } catch (err: any) {
    console.error("actionCheckPlanOrderStatus error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to check order status.");
  }
}

/**
 * 4. Sandbox simulator for Borderpay QRIS instant testing (strictly non-live & non-prod).
 */
export async function actionSimulateBorderpaySuccess(
  orderId: string
): Promise<ServiceResult<any>> {
  try {
    if (
      getActiveBorderpayConfig().isLive ||
      (process.env.NODE_ENV === "production" &&
        process.env.ALLOW_PAYMENT_SANDBOX !== "true")
    ) {
      return fail(
        "FORBIDDEN",
        "Sandbox payment simulation is disabled in live production."
      );
    }

    const ctx = await requireTenantContext();

    const planOrder = await prisma.planOrder.findFirst({
      where: {
        id: orderId,
        storeId: ctx.storeId,
      },
      include: { store: true },
    });

    if (!planOrder) {
      return fail("NOT_FOUND", "Order not found or unauthorized.");
    }

    const settlement = await settlePaidPlanOrder({
      orderNumber: planOrder.orderNumber,
      paymentProvider: "BORDERPAY_QRIS",
      paymentRef: "BORDERPAY_QRIS_SIMULATOR",
      userEmail: ctx.user.email,
      adminNotes: "Auto-approved via Borderpay Sandbox Simulator",
    });

    if (settlement.status !== "SETTLED" && settlement.status !== "ALREADY_APPROVED") {
      return fail("PAYMENT_FAILED", "Plan upgrade simulation failed.");
    }

    return ok({
      status: "APPROVED",
      tier: settlement.tier,
      order: settlement.order,
    });
  } catch (err: any) {
    console.error("actionSimulateBorderpaySuccess error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to simulate Borderpay payment.");
  }
}

/**
 * 5. Retrieve active order.
 */
export async function actionGetActivePlanOrder(): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireTenantContext();

    const order = await prisma.planOrder.findFirst({
      where: {
        storeId: ctx.storeId,
        status: {
          in: ["PENDING", "UNDER_REVIEW"],
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return ok(order ? serializePlain(order) : null);
  } catch (err: any) {
    console.error("actionGetActivePlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to fetch active plan order.");
  }
}
