import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { PlanTier, Store } from "@prisma/client";
import { PAYMENT_RULES } from "@/lib/constants/pricing";

export interface AdminTenantContext {
  user: {
    id?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    role?: string;
  };
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  monthlyWithdrawalsCount: number;
  remainingFreeWithdrawals: number;
  rules: typeof PAYMENT_RULES["FREE"] | typeof PAYMENT_RULES["PRO"] | typeof PAYMENT_RULES["DFY"];
}

/**
 * Resolves the authenticated tenant and their isolated store.
 * Supports slug override for Super Admin and local dev preview.
 */
export async function getAdminTenantContext(slugParam?: string): Promise<AdminTenantContext> {
  const user = await getCurrentUser();

  let store: any = null;

  if (user && user.id) {
    // If specific slug requested by user (or super admin), check ownership
    if (slugParam) {
      store = await prisma.store.findFirst({
        where: {
          slug: slugParam,
          OR: [
            { ownerId: user.id },
            { owner: { role: "SUPER_ADMIN" } },
          ],
        },
        include: {
          products: {
            orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          },
          storeBlocks: {
            orderBy: { sortOrder: "asc" },
          },
          orders: {
            orderBy: { createdAt: "desc" },
            take: 50,
          },
          withdrawals: {
            orderBy: { createdAt: "desc" },
            take: 20,
          },
        },
      });
    }

    // Default to user's first store
    if (!store) {
      store = await prisma.store.findFirst({
        where: { ownerId: user.id },
        include: {
          products: {
            orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          },
          storeBlocks: {
            orderBy: { sortOrder: "asc" },
          },
          orders: {
            orderBy: { createdAt: "desc" },
            take: 50,
          },
          withdrawals: {
            orderBy: { createdAt: "desc" },
            take: 20,
          },
        },
      });
    }
  }

  // Fallback for development / preview when no session or initial setup
  if (!store) {
    // Try to find a demo or rafa store in DB
    const fallbackSlug = slugParam || "rafa";
    store = await prisma.store.findFirst({
      where: {
        OR: [
          { slug: fallbackSlug },
          { slug: "demo" },
        ],
      },
      include: {
        products: {
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        },
        storeBlocks: {
          orderBy: { sortOrder: "asc" },
        },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 50,
        },
        withdrawals: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    // If still no store in DB, redirect to onboarding or login in production
    if (!store) {
      if (process.env.NODE_ENV === "production" && !user) {
        redirect("/login?callbackUrl=/admin");
      }
      redirect("/onboarding");
    }
  }

  // Calculate monthly withdrawal quota usage
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyWithdrawalsCount = await prisma.withdrawal.count({
    where: {
      storeId: store.id,
      createdAt: { gte: startOfMonth },
      status: { in: ["PENDING", "APPROVED", "SUCCESS", "COMPLETED"] },
    },
  });

  const tierKey: "FREE" | "PRO" | "DFY" =
    store.tier === PlanTier.PRO
      ? "PRO"
      : store.tier === PlanTier.DFY_BUSINESS
      ? "DFY"
      : "FREE";

  const rules = PAYMENT_RULES[tierKey];
  const remainingFreeWithdrawals = Math.max(
    0,
    rules.freeWithdrawalsPerMonth - monthlyWithdrawalsCount
  );

  return {
    user: user || {
      id: store.ownerId,
      name: store.name,
      email: "owner@etalase.online",
      role: "USER",
    },
    store: serializePlain(store),
    tier: tierKey,
    monthlyWithdrawalsCount,
    remainingFreeWithdrawals,
    rules,
  };
}
