import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesOrdersClient } from "@/components/mabes/MabesOrdersClient";

export const dynamic = "force-dynamic";

export default async function MabesOrdersPage() {
  await requireMabesContext();

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      store: {
        select: {
          name: true,
          slug: true,
        },
      },
      product: {
        select: {
          title: true,
          price: true,
        },
      },
    },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Global Customer Transactions &amp; Settlement Audit
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Realtime monitor of customer purchases across all merchant storefronts via Borderpay QRIS and PayPal.
        </p>
      </div>

      <MabesOrdersClient initialOrders={serializePlain(orders) as any} />
    </div>
  );
}
