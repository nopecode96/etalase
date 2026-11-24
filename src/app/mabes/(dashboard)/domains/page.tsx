import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesDomainsClient } from "@/components/mabes/MabesDomainsClient";

export const dynamic = "force-dynamic";

export default async function MabesDomainsPage() {
  await requireMabesContext();

  const stores = await prisma.store.findMany({
    where: {
      OR: [
        { customDomain: { not: null } },
        { tier: { in: ["PRO", "DFY_BUSINESS"] } },
      ],
    },
    orderBy: [
      { domainVerified: "asc" },
      { updatedAt: "desc" },
    ],
    include: {
      owner: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Custom Domain Mappings &amp; DNS Verification
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Inspect domain records, verify SSL &amp; CNAME configurations, and manage custom branded domain access for PRO &amp; DFY tenants.
        </p>
      </div>

      <MabesDomainsClient initialStores={serializePlain(stores) as any} />
    </div>
  );
}
