import { Metadata } from "next";
import { requireTenantContext } from "@/lib/auth/tenant-guard";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { AdminUpgradeClient } from "@/components/admin/AdminUpgradeClient";
import { getActiveBorderpayConfig } from "@/lib/config/env";

export const metadata: Metadata = {
  title: "Upgrade Storefront Plan — etalase.online",
  description: "Upgrade your storefront to PRO or Done-For-You with custom domain, low QRIS fees, and premium themes.",
};

interface UpgradePageProps {
  searchParams?: {
    plan?: string;
    cycle?: string;
    returnTo?: string;
    status?: string;
    token?: string;
    orderNumber?: string;
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

  const isBorderpayLive = getActiveBorderpayConfig().isLive;
  const allowSandbox =
    !isBorderpayLive &&
    (process.env.NODE_ENV !== "production" ||
      process.env.ALLOW_PAYMENT_SANDBOX === "true");

  // Do not show stale sandbox simulator orders when live gateway is active
  let sanitizedOrder = activeOrder ? serializePlain(activeOrder) : null;
  if (!allowSandbox && sanitizedOrder?.notes) {
    try {
      const notesObj = JSON.parse(sanitizedOrder.notes);
      if (notesObj?.qrString?.startsWith("SANDBOX_QRIS_SIMULATOR_")) {
        sanitizedOrder = null;
      }
    } catch {}
  }

  return (
    <AdminUpgradeClient
      store={store}
      user={user}
      currentTier={context.tier}
      initialPlan={searchParams?.plan || "pro"}
      initialCycle={searchParams?.cycle || "yearly"}
      returnTo={searchParams?.returnTo || "/admin"}
      existingOrder={sanitizedOrder}
      paypalStatus={searchParams?.status}
      paypalToken={searchParams?.token}
      paypalOrderNumber={searchParams?.orderNumber}
      allowSandbox={allowSandbox}
    />
  );
}
