"use server";

import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { ServiceResult, ok, fail } from "@/lib/core/response";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";

export interface CreatePlanOrderInput {
  planCode: "PRO" | "DFY";
  billingCycle: "MONTHLY" | "YEARLY" | "ONE_TIME";
}

export interface SubmitPaymentProofInput {
  orderId: string;
  proofUrl: string;
  notes?: string;
}

/**
 * 1. Create a fresh upgrade invoice tied strictly to the verified tenant store.
 */
export async function actionCreatePlanOrder(
  input: CreatePlanOrderInput
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireTenantContext();
    const { planCode, billingCycle } = input;

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

    const order = await prisma.planOrder.create({
      data: {
        orderNumber,
        storeId: ctx.storeId,
        planCode,
        billingCycle: cycle,
        amount,
        currency: "IDR",
        status: "PENDING",
        paymentMethod: "QRIS",
      },
    });

    return ok(serializePlain(order));
  } catch (err: any) {
    console.error("actionCreatePlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to create upgrade order invoice.");
  }
}

/**
 * 2. Submit payment proof receipt for review.
 * Strictly checks compound ownership { id: orderId, storeId: ctx.storeId }
 */
export async function actionSubmitPaymentProof(
  input: SubmitPaymentProofInput
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireTenantContext();

    if (!input.orderId || !input.proofUrl) {
      return fail("INVALID_INPUT", "Order ID and payment proof image are required.");
    }

    const existing = await prisma.planOrder.findFirst({
      where: {
        id: input.orderId,
        storeId: ctx.storeId,
      },
    });

    if (!existing) {
      return fail("NOT_FOUND", "Upgrade order not found or unauthorized.");
    }

    if (existing.status === "APPROVED") {
      return fail("INVALID_INPUT", "This upgrade order has already been verified and activated.");
    }

    const updated = await prisma.planOrder.update({
      where: { id: existing.id },
      data: {
        proofUrl: input.proofUrl,
        notes: input.notes?.trim() || null,
        status: "UNDER_REVIEW",
        paidAt: new Date(),
      },
    });

    // Fire-and-forget push notification to Mabes Super Admin / Telegram flow
    try {
      emitN8nEvent("tier.upgraded", {
        orderNumber: updated.orderNumber,
        storeId: ctx.storeId,
        storeName: ctx.store.name,
        storeSlug: ctx.store.slug,
        userEmail: ctx.user.email,
        planCode: updated.planCode,
        billingCycle: updated.billingCycle,
        amount: Number(updated.amount),
        proofUrl: updated.proofUrl,
        notes: updated.notes,
        submittedAt: new Date().toISOString(),
      });
    } catch (evtErr) {
      console.warn("Failed to dispatch n8n notification event for plan order:", evtErr);
    }

    return ok(serializePlain(updated));
  } catch (err: any) {
    console.error("actionSubmitPaymentProof error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to submit payment confirmation.");
  }
}

/**
 * 3. Retrieve the latest pending or under review order for the active tenant.
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
