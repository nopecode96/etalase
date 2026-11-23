import { prisma, serializePlain } from "@/lib/db/prisma";
import { ok, fail, withErrorHandler, ServiceResult } from "@/lib/core/response";
import { PlanTier } from "@prisma/client";

export async function getMabesDashboardMetrics(): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    // 1. Total real tenants (exclude demo accounts)
    const totalRealTenants = await prisma.store.count({
      where: { isDemo: false },
    });

    // 2. Total registered Google users
    const totalUsers = await prisma.user.count();

    // 3. MRR Calculation (Filtered isDemo: false)
    const proTenantsCount = await prisma.store.count({
      where: { isDemo: false, tier: "PRO", isActive: true },
    });
    const dfyTenantsCount = await prisma.store.count({
      where: { isDemo: false, tier: "DFY_BUSINESS", isActive: true },
    });
    // PRO: Rp 79,000/bln, DFY: Rp 100,000/bln amortized
    const estimatedMRR = proTenantsCount * 79000 + dfyTenantsCount * 100000;

    // 4. Pending Withdrawals
    const pendingWithdrawals = await prisma.withdrawal.count({
      where: { status: "PENDING" },
    });

    // 5. Recent Tenants
    const recentTenants = await prisma.store.findMany({
      where: { isDemo: false },
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        slug: true,
        tier: true,
        locale: true,
        createdAt: true,
      },
    });

    // 6. Recent Paid Orders
    const recentOrders = await prisma.order.findMany({
      where: { status: "PAID" },
      take: 5,
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        orderCode: true,
        amount: true,
        currency: true,
        buyerName: true,
        updatedAt: true,
      },
    });

    return ok(
      serializePlain({
        totalRealTenants,
        totalUsers,
        estimatedMRR,
        pendingWithdrawals,
        recentTenants,
        recentOrders,
      }),
      "SAVED"
    );
  });
}

export async function toggleTenantTier(
  storeId: string,
  newTier: PlanTier
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { tier: newTier },
    });
    return ok(serializePlain(updated), "UPDATED");
  });
}

export async function toggleTenantStatus(
  storeId: string,
  isActive: boolean
): Promise<ServiceResult<unknown>> {
  return withErrorHandler(async () => {
    const updated = await prisma.store.update({
      where: { id: storeId },
      data: { isActive },
    });
    return ok(serializePlain(updated), "UPDATED");
  });
}
