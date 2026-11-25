import { redirect } from "next/navigation";
import { getCurrentUser } from "./session";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { PlanTier } from "@prisma/client";
import { PAYMENT_RULES } from "@/lib/constants/pricing";

export interface TenantContext {
  user: {
    id: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    role?: string;
  };
  store: any;
  storeId: string;
  tier: "FREE" | "PRO" | "DFY";
  rules: typeof PAYMENT_RULES["FREE"] | typeof PAYMENT_RULES["PRO"] | typeof PAYMENT_RULES["DFY"];
  monthlyWithdrawalsCount: number;
  remainingFreeWithdrawals: number;
}

/**
 * STRICT MULTI-TENANT CONTEXT GUARD (ZERO DATA LEAKAGE)
 *
 * 1. Single source of truth from verified authentication session.
 * 2. Fetches Store from PostgreSQL based on user.id (NEVER trusts client input).
 * 3. Enforces 403 Forbidden on any cross-tenant mismatch.
 */
export async function requireTenantContext(targetStoreId?: string): Promise<TenantContext> {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    if (typeof window === "undefined") {
      // In Server Components, clean redirect to login
      try {
        redirect("/login?callbackUrl=/admin");
      } catch (err: any) {
        // Next.js redirect throws NEXT_REDIRECT, let it bubble
        if (err?.digest?.startsWith?.("NEXT_REDIRECT")) {
          throw err;
        }
      }
    }
    throw new Error("UNAUTHORIZED: Active session required. Please sign in.");
  }

  const isSuperAdmin = (user as any).role === "SUPER_ADMIN";

  let store: any = null;

  if (isSuperAdmin && targetStoreId) {
    store = await prisma.store.findUnique({
      where: { id: targetStoreId },
      include: {
        products: {
          orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        },
        storeBlocks: {
          orderBy: { sortOrder: "asc" },
        },
        orders: {
          orderBy: { createdAt: "desc" },
          take: 200,
        },
        withdrawals: {
          orderBy: { createdAt: "desc" },
          take: 100,
        },
      },
    });
  } else {
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
          take: 200,
        },
        withdrawals: {
          orderBy: { createdAt: "desc" },
          take: 100,
        },
      },
    });
  }

  // If user has no store in PostgreSQL, redirect to /onboarding
  if (!store) {
    try {
      redirect("/onboarding");
    } catch (err: any) {
      if (err?.digest?.startsWith?.("NEXT_REDIRECT")) {
        throw err;
      }
    }
    throw new Error("NO_STORE: Please complete onboarding to create your storefront.");
  }

  // Cross-tenant data security check:
  // Reject access if client tried to manipulate targetStoreId
  if (targetStoreId && targetStoreId !== store.id && !isSuperAdmin) {
    throw new Error("FORBIDDEN: Cross-tenant data access violation. Access denied.");
  }

  // Calculate monthly withdrawal quota usage for active store
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
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      role: (user as any).role || "USER",
    },
    store: serializePlain(store),
    storeId: store.id,
    tier: tierKey,
    rules,
    monthlyWithdrawalsCount,
    remainingFreeWithdrawals,
  };
}
