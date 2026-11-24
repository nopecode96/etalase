import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesPayoutsClient } from "@/components/mabes/MabesPayoutsClient";

export const dynamic = "force-dynamic";

export default async function MabesPayoutsPage() {
  await requireMabesContext();

  const payouts = await prisma.withdrawal.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      store: {
        select: {
          name: true,
          slug: true,
          walletBalance: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Payouts &amp; Merchant Withdrawals
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Review, disburse, or refund merchant balance payout requests across Southeast Asian banking and e-wallet destinations.
        </p>
      </div>

      <MabesPayoutsClient initialPayouts={serializePlain(payouts) as any} />
    </div>
  );
}
