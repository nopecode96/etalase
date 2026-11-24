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
