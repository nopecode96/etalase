"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma, serializePlain } from "@/lib/db/prisma";
import {
  requireMabesContext,
  createMabesToken,
  MABES_COOKIE_NAME,
  SESSION_DURATION_SEC,
} from "@/lib/auth/mabes-guard";
import { ServiceResult, ok, fail } from "@/lib/core/response";
import { emitN8nEvent } from "@/lib/n8n/dispatcher";

/**
 * Mabes Email & Password Login Action
 */
export async function actionMabesLogin(formData: {
  email: string;
  password: string;
}): Promise<ServiceResult<{ redirectUrl: string }>> {
  try {
    const { email, password } = formData;
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !password) {
      return fail("INVALID_INPUT", "Email and password are required.");
    }

    const user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (!user) {
      return fail("UNAUTHORIZED", "Invalid email or password.");
    }

    if (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN_MABES") {
      return fail("FORBIDDEN", "Access denied. This portal is restricted to Mabes staff.");
    }

    if (!user.passwordHash) {
      return fail(
        "UNAUTHORIZED",
        "Account has no password set. Please contact system administrator."
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return fail("UNAUTHORIZED", "Invalid email or password.");
    }

    // Generate secure token
    const token = createMabesToken({
      userId: user.id,
      email: user.email,
      role: user.role as "SUPER_ADMIN" | "ADMIN_MABES",
    });

    const isProd = process.env.NODE_ENV === "production";
    cookies().set(MABES_COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: SESSION_DURATION_SEC,
      path: "/",
      domain: isProd ? ".etalase.online" : undefined,
    });

    return ok({ redirectUrl: "/mabes" });
  } catch (err: any) {
    console.error("actionMabesLogin error:", err);
    return fail("INTERNAL_ERROR", err.message || "Login failed.");
  }
}

/**
 * Mabes Logout Action
 */
export async function actionMabesLogout() {
  const isProd = process.env.NODE_ENV === "production";
  cookies().set(MABES_COOKIE_NAME, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    domain: isProd ? ".etalase.online" : undefined,
  });
  redirect("/mabes/login");
}

/**
 * 1. Toggle Tenant Active / Suspended Status
 */
export async function actionUpdateTenantStatus(
  storeId: string,
  isActive: boolean
): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { isActive },
    });

    revalidatePath("/mabes");
    revalidatePath("/mabes/tenants");
    return ok(serializePlain(updated), "UPDATED");
  } catch (err: any) {
    console.error("actionUpdateTenantStatus error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to update tenant status.");
  }
}

/**
 * 2. Update Tenant Plan Tier and/or Extend Expiry Period
 */
export async function actionUpdateTenantTier(
  storeId: string,
  tier: "FREE" | "PRO" | "DFY_BUSINESS",
  extendDays?: number
): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return fail("NOT_FOUND", "Store not found.");
    }

    let planExpiresAt: Date | null = store.planExpiresAt;

    if (extendDays) {
      if (extendDays === -1) {
        // Lifetime
        planExpiresAt = new Date("2099-12-31T23:59:59Z");
      } else {
        const baseDate = planExpiresAt && planExpiresAt > new Date() ? planExpiresAt : new Date();
        planExpiresAt = new Date(baseDate.getTime() + extendDays * 24 * 60 * 60 * 1000);
      }
    } else if (tier === "FREE") {
      planExpiresAt = null;
    }

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: {
        tier,
        planExpiresAt,
      },
    });

    revalidatePath("/mabes");
    revalidatePath("/mabes/tenants");
    return ok(serializePlain(updated), "UPDATED");
  } catch (err: any) {
    console.error("actionUpdateTenantTier error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to update tenant plan tier.");
  }
}

/**
 * 3. Approve and Activate Plan Upgrade Order (Atomically updates Order + Store Tier)
 */
export async function actionApprovePlanOrder(
  orderId: string,
  adminNotes?: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const planOrder = await prisma.planOrder.findUnique({
      where: { id: orderId },
      include: { store: true },
    });

    if (!planOrder) {
      return fail("NOT_FOUND", "Plan upgrade order not found.");
    }

    const newTier = planOrder.planCode === "DFY" ? "DFY_BUSINESS" : "PRO";
    const daysToAdd = planOrder.billingCycle === "YEARLY" ? 365 : planOrder.billingCycle === "ONE_TIME" ? 365 : 30;

    const currentExpiry = planOrder.store.planExpiresAt && planOrder.store.planExpiresAt > new Date()
      ? planOrder.store.planExpiresAt
      : new Date();

    const newExpiry = new Date(currentExpiry.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    const [updatedOrder, updatedStore] = await prisma.$transaction([
      prisma.planOrder.update({
        where: { id: planOrder.id },
        data: {
          status: "APPROVED",
          approvedAt: new Date(),
          paidAt: planOrder.paidAt || new Date(),
          adminNotes: adminNotes || `Approved by Mabes staff: ${ctx.user.email}`,
        },
      }),
      prisma.store.update({
        where: { id: planOrder.storeId },
        data: {
          tier: newTier,
          planExpiresAt: newExpiry,
        },
      }),
    ]);

    try {
      emitN8nEvent("tier.upgraded", {
        orderNumber: planOrder.orderNumber,
        storeId: planOrder.storeId,
        storeName: planOrder.store.name,
        storeSlug: planOrder.store.slug,
        planCode: planOrder.planCode,
        billingCycle: planOrder.billingCycle,
        amount: Number(planOrder.amount),
        approvedBy: ctx.user.email,
        expiryDate: newExpiry.toISOString(),
      });
    } catch (e) {
      console.warn("n8n notification failed:", e);
    }

    revalidatePath("/mabes");
    revalidatePath("/mabes/billing");
    revalidatePath("/mabes/tenants");
    return ok(serializePlain({ order: updatedOrder, store: updatedStore }), "SAVED");
  } catch (err: any) {
    console.error("actionApprovePlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to approve plan order.");
  }
}

/**
 * 4. Reject Plan Upgrade Order
 */
export async function actionRejectPlanOrder(
  orderId: string,
  reason: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const planOrder = await prisma.planOrder.findUnique({
      where: { id: orderId },
    });

    if (!planOrder) {
      return fail("NOT_FOUND", "Plan upgrade order not found.");
    }

    const updated = await prisma.planOrder.update({
      where: { id: orderId },
      data: {
        status: "REJECTED",
        adminNotes: `Rejected by ${ctx.user.email}: ${reason}`,
      },
    });

    revalidatePath("/mabes");
    revalidatePath("/mabes/billing");
    return ok(serializePlain(updated), "SAVED");
  } catch (err: any) {
    console.error("actionRejectPlanOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to reject plan order.");
  }
}

/**
 * 5. Approve Merchant Withdrawal Payout (Atomic Balance Adjustment)
 */
export async function actionApprovePayout(
  payoutId: string,
  reference?: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const payout = await prisma.withdrawal.findUnique({
      where: { id: payoutId },
      include: { store: true },
    });

    if (!payout) {
      return fail("NOT_FOUND", "Payout record not found.");
    }

    if (payout.status !== "PENDING") {
      return fail("INVALID_INPUT", `Payout already marked as ${payout.status}.`);
    }

    const updated = await prisma.withdrawal.update({
      where: { id: payoutId },
      data: {
        status: "APPROVED",
        adminNotes: reference
          ? `Transferred via ref #${reference} by ${ctx.user.email}`
          : `Transferred by ${ctx.user.email}`,
      },
    });

    revalidatePath("/mabes");
    revalidatePath("/mabes/payouts");
    return ok(serializePlain(updated), "SAVED");
  } catch (err: any) {
    console.error("actionApprovePayout error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to approve payout.");
  }
}

/**
 * 6. Reject Merchant Withdrawal Payout (Refunds Balance to Merchant Wallet)
 */
export async function actionRejectPayout(
  payoutId: string,
  reason: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const payout = await prisma.withdrawal.findUnique({
      where: { id: payoutId },
      include: { store: true },
    });

    if (!payout) {
      return fail("NOT_FOUND", "Payout record not found.");
    }

    if (payout.status !== "PENDING") {
      return fail("INVALID_INPUT", `Payout already marked as ${payout.status}.`);
    }

    // Atomically refund walletBalance and set status REJECTED
    const [updatedPayout] = await prisma.$transaction([
      prisma.withdrawal.update({
        where: { id: payoutId },
        data: {
          status: "REJECTED",
          adminNotes: `Rejected by ${ctx.user.email}: ${reason}`,
        },
      }),
      prisma.store.update({
        where: { id: payout.storeId },
        data: {
          walletBalance: {
            increment: payout.amount,
          },
        },
      }),
    ]);

    revalidatePath("/mabes");
    revalidatePath("/mabes/payouts");
    return ok(serializePlain(updatedPayout), "SAVED");
  } catch (err: any) {
    console.error("actionRejectPayout error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to reject payout.");
  }
}

/**
 * 7. Verify or Toggle Custom Domain Status
 */
export async function actionVerifyDomain(
  storeId: string,
  domainVerified: boolean
): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { domainVerified },
    });

    revalidatePath("/mabes/domains");
    revalidatePath("/mabes/tenants");
    return ok(serializePlain(updated), "UPDATED");
  } catch (err: any) {
    console.error("actionVerifyDomain error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to verify domain.");
  }
}

/**
 * 8. Create Mabes Staff Account
 */
export async function actionCreateMabesStaff(formData: {
  name: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN" | "ADMIN_MABES";
}): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();
    if (!ctx.isSuperAdmin) {
      return fail("FORBIDDEN", "Only Super Admin can provision new Mabes staff accounts.");
    }

    const { name, email, password, role } = formData;
    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail || !password || password.length < 8) {
      return fail("INVALID_INPUT", "Email and strong password (min 8 chars) required.");
    }

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return fail("SLUG_TAKEN", "An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: cleanEmail,
        name: name.trim() || cleanEmail.split("@")[0],
        role,
        passwordHash,
        preferredLang: "en",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    revalidatePath("/mabes/team");
    return ok(serializePlain(newUser), "CREATED");
  } catch (err: any) {
    console.error("actionCreateMabesStaff error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to create staff account.");
  }
}

/**
 * 9. Delete Mabes Staff Account (Protected against deleting self or last Super Admin)
 */
export async function actionDeleteMabesStaff(
  targetUserId: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();
    if (!ctx.isSuperAdmin) {
      return fail("FORBIDDEN", "Only Super Admin can delete Mabes staff accounts.");
    }

    if (targetUserId === ctx.user.id) {
      return fail("INVALID_INPUT", "Security policy violation: You cannot delete your own account.");
    }

    const target = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    if (!target) {
      return fail("NOT_FOUND", "User not found.");
    }

    if (target.role === "SUPER_ADMIN") {
      const superAdminCount = await prisma.user.count({
        where: { role: "SUPER_ADMIN" },
      });
      if (superAdminCount <= 1) {
        return fail("FORBIDDEN", "Cannot delete the last remaining Super Admin.");
      }
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    });

    revalidatePath("/mabes/team");
    return ok({ deleted: true }, "DELETED");
  } catch (err: any) {
    console.error("actionDeleteMabesStaff error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to delete staff account.");
  }
}

/**
 * 10. Update Platform Global Settings (Rafa Kreasindo Teknologi)
 */
export async function actionUpdatePlatformSettings(
  settings: Record<string, string>
): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    for (const [key, value] of Object.entries(settings)) {
      await prisma.platformSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      });
    }

    revalidatePath("/mabes");
    revalidatePath("/mabes/settings");
    return ok({ updated: true }, "SAVED");
  } catch (err: any) {
    console.error("actionUpdatePlatformSettings error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to update platform settings.");
  }
}

/**
 * 11. Reconcile Customer Order (Manual Gateway Resolution)
 */
export async function actionReconcileOrder(
  orderId: string,
  reference: string
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { store: true, product: true },
    });

    if (!order) {
      return fail("NOT_FOUND", "Customer order not found.");
    }

    if (order.status === "PAID") {
      return fail("INVALID_INPUT", "Order is already marked as PAID.");
    }

    const [updatedOrder] = await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          paymentRef: reference || `MANUAL-${Date.now()}`,
          buyerNotes: order.buyerNotes
            ? `${order.buyerNotes} | Reconciled by ${ctx.user.email}`
            : `Reconciled by ${ctx.user.email}`,
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
      prisma.automationLog.create({
        data: {
          event: "order.reconciled",
          channel: "BORDERPAY",
          status: "SUCCESS",
          payload: {
            orderCode: order.orderCode,
            storeId: order.storeId,
            amount: Number(order.amount),
            netAmount: Number(order.netAmount),
            reconciledBy: ctx.user.email,
            reference,
          },
        },
      }),
    ]);

    try {
      emitN8nEvent("order.paid", {
        orderId: order.id,
        orderCode: order.orderCode,
        storeId: order.storeId,
        storeSlug: order.store.slug,
        productTitle: order.product.title,
        amount: Number(order.amount),
        buyerWhatsapp: order.buyerWhatsapp,
        buyerName: order.buyerName,
      });
    } catch (e) {
      console.warn("n8n order.paid dispatch error:", e);
    }

    revalidatePath("/mabes");
    revalidatePath("/mabes/orders");
    return ok(serializePlain(updatedOrder), "SAVED");
  } catch (err: any) {
    console.error("actionReconcileOrder error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to reconcile order.");
  }
}

/**
 * 12. Update Terima Beres (DFY) Project Stage
 */
export async function actionUpdateDfyStage(formData: {
  storeId: string;
  stage: string;
  notes?: string;
  assignedTo?: string;
  assetsUrl?: string;
}): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();
    const { storeId, stage, notes, assignedTo, assetsUrl } = formData;

    const isCompleted = stage === "COMPLETED";

    const project = await prisma.dfyProject.upsert({
      where: { storeId },
      update: {
        stage,
        notes,
        assignedTo: assignedTo || ctx.user.email,
        assetsUrl,
        completedAt: isCompleted ? new Date() : undefined,
      },
      create: {
        storeId,
        stage,
        notes,
        assignedTo: assignedTo || ctx.user.email,
        assetsUrl,
        completedAt: isCompleted ? new Date() : undefined,
      },
      include: {
        store: true,
      },
    });

    await prisma.automationLog.create({
      data: {
        event: "dfy.stage_updated",
        channel: "SYSTEM",
        status: "SUCCESS",
        payload: {
          storeSlug: project.store.slug,
          stage,
          assignedTo: project.assignedTo,
          updatedBy: ctx.user.email,
        },
      },
    });

    revalidatePath("/mabes");
    revalidatePath("/mabes/dfy");
    return ok(serializePlain(project), "SAVED");
  } catch (err: any) {
    console.error("actionUpdateDfyStage error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to update DFY stage.");
  }
}

/**
 * 13. Trigger Test Automation Event (n8n Microservice Tester)
 */
export async function actionTriggerTestEvent(
  event: any,
  payload: Record<string, any>
): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    await emitN8nEvent(event, {
      ...payload,
      triggeredBy: ctx.user.email,
      isTest: true,
      timestamp: new Date().toISOString(),
    });

    const log = await prisma.automationLog.create({
      data: {
        event,
        channel: "N8N",
        status: "SUCCESS",
        payload: {
          ...payload,
          triggeredBy: ctx.user.email,
          test: true,
        },
        response: "Dispatched to n8n fire-and-forget queue",
      },
    });

    revalidatePath("/mabes/automations");
    return ok(serializePlain(log), "SAVED");
  } catch (err: any) {
    console.error("actionTriggerTestEvent error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to dispatch test event.");
  }
}

/**
 * 14. Send Test Telegram Alert from Mabes
 */
export async function actionSendTestTelegramAlert(): Promise<ServiceResult<any>> {
  try {
    const ctx = await requireMabesContext();

    const [botTokenSetting, chatIdSetting] = await Promise.all([
      prisma.platformSetting.findUnique({ where: { key: "telegram_mabes_bot_token" } }),
      prisma.platformSetting.findUnique({ where: { key: "telegram_mabes_chat_id" } }),
    ]);

    const token = botTokenSetting?.value;
    const chatId = chatIdSetting?.value;

    if (!token || !chatId) {
      await prisma.automationLog.create({
        data: {
          event: "telegram.test_alert",
          channel: "TELEGRAM",
          status: "FAILED",
          error: "Telegram bot token or Chat ID is missing in Platform Settings.",
        },
      });
      return fail("INVALID_INPUT", "Configure telegram_mabes_bot_token and telegram_mabes_chat_id in Platform Settings first.");
    }

    const message = `🔔 *[Mabes Alert Test]*\n\nPlatform: etalase.online\nTriggered by: ${ctx.user.email}\nTimestamp: ${new Date().toLocaleString("id-ID")}\n\n✅ Automation dispatcher connected successfully.`;

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    const resJson = await telegramRes.json();

    await prisma.automationLog.create({
      data: {
        event: "telegram.test_alert",
        channel: "TELEGRAM",
        status: telegramRes.ok ? "SUCCESS" : "FAILED",
        payload: { chatId, sender: ctx.user.email },
        response: JSON.stringify(resJson),
        error: telegramRes.ok ? null : resJson?.description,
      },
    });

    if (!telegramRes.ok) {
      return fail("INTERNAL_ERROR", resJson?.description || "Telegram API rejected message.");
    }

    revalidatePath("/mabes/automations");
    return ok({ sent: true }, "SAVED");
  } catch (err: any) {
    console.error("actionSendTestTelegramAlert error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to send test alert.");
  }
}

/**
 * 15. Toggle Post Publication Status
 */
export async function actionTogglePostPublish(
  postId: string,
  isPublished: boolean
): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        isPublished,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    revalidatePath("/mabes/blog");
    return ok(serializePlain(updated), "UPDATED");
  } catch (err: any) {
    console.error("actionTogglePostPublish error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to update publication status.");
  }
}

/**
 * 16. Create or Update Blog Post
 */
export async function actionSaveBlogPost(data: {
  id?: string;
  slug: string;
  category: string;
  authorName: string;
  coverImage?: string;
  isPublished: boolean;
  title: string;
  excerpt: string;
  content: string;
  locale?: string;
}): Promise<ServiceResult<any>> {
  try {
    await requireMabesContext();

    const { id, slug, category, authorName, coverImage, isPublished, title, excerpt, content, locale = "id" } = data;

    let post;
    if (id) {
      post = await prisma.post.update({
        where: { id },
        data: {
          slug,
          category,
          authorName,
          coverImage,
          isPublished,
          publishedAt: isPublished ? new Date() : undefined,
          translations: {
            upsert: {
              where: { postId_locale: { postId: id, locale } },
              update: { title, excerpt, content, isPublished },
              create: { title, excerpt, content, locale, isPublished },
            },
          },
        },
      });
    } else {
      post = await prisma.post.create({
        data: {
          slug,
          category,
          authorName,
          coverImage,
          isPublished,
          publishedAt: isPublished ? new Date() : null,
          translations: {
            create: {
              title,
              excerpt,
              content,
              locale,
              isPublished,
            },
          },
        },
      });
    }

    revalidatePath("/mabes/blog");
    return ok(serializePlain(post), "SAVED");
  } catch (err: any) {
    console.error("actionSaveBlogPost error:", err);
    return fail("INTERNAL_ERROR", err.message || "Failed to save blog post.");
  }
}
