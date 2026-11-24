import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesTenantsClient } from "@/components/mabes/MabesTenantsClient";

export const dynamic = "force-dynamic";

export default async function MabesTenantsPage() {
  await requireMabesContext();

  const tenants = await prisma.store.findMany({
    where: { isDemo: false },
    orderBy: { createdAt: "desc" },
    include: {
      owner: {
        select: { email: true, name: true },
      },
      _count: {
        select: { products: true, orders: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Tenant Storefront Management
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Master registry of all active and registered storefronts on etalase.online infrastructure.
        </p>
      </div>

      <MabesTenantsClient initialTenants={serializePlain(tenants) as any} />
    </div>
  );
}
