import { Metadata } from "next";
import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { AdminUpgradeClient } from "@/components/admin/AdminUpgradeClient";

export const metadata: Metadata = {
  title: "Upgrade Storefront Plan — etalase.online",
  description: "Upgrade your storefront to PRO or Done-For-You with custom domain, low QRIS fees, and premium themes.",
};

interface UpgradePageProps {
  searchParams?: {
    plan?: string;
    cycle?: string;
    returnTo?: string;
  };
}

export default async function UpgradePage({ searchParams }: UpgradePageProps) {
  const context = await requireTenantContext();
  const store = serializePlain(context.store);
  const user = serializePlain(context.user);

  // Fetch any active pending or under review plan order for this store
  const activeOrder = await prisma.planOrder.findFirst({
    where: {
      storeId: context.store.id,
      status: {
        in: ["PENDING", "UNDER_REVIEW"],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminUpgradeClient
      store={store}
      user={user}
      currentTier={context.tier}
      initialPlan={searchParams?.plan || "pro"}
      initialCycle={searchParams?.cycle || "yearly"}
      returnTo={searchParams?.returnTo || "/admin"}
      existingOrder={activeOrder ? serializePlain(activeOrder) : null}
    />
  );
}
