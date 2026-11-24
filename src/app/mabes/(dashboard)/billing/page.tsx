import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesBillingClient } from "@/components/mabes/MabesBillingClient";

export const dynamic = "force-dynamic";

export default async function MabesBillingPage() {
  await requireMabesContext();

  const orders = await prisma.planOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      store: {
        select: {
          name: true,
          slug: true,
          tier: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Upgrade Orders &amp; Billing Verifications
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review, approve, and manage tenant subscription upgrades across Borderpay QRIS and PayPal channels.
        </p>
      </div>

      <MabesBillingClient initialOrders={serializePlain(orders) as any} />
    </div>
  );
}
