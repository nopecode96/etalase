import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesDfyClient } from "@/components/mabes/MabesDfyClient";

export const dynamic = "force-dynamic";

export default async function MabesDfyPage() {
  await requireMabesContext();

  // Find stores that are DFY_BUSINESS tier or have a DfyProject record
  const dfyStores = await prisma.store.findMany({
    where: {
      OR: [
        { tier: "DFY_BUSINESS" },
        { dfyProject: { isNot: null } },
      ],
    },
    include: {
      owner: {
        select: {
          email: true,
          name: true,
        },
      },
      dfyProject: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const projects = dfyStores.map((s) => ({
    id: s.dfyProject?.id,
    storeId: s.id,
    stage: (s.dfyProject?.stage || "NEW") as any,
    assignedTo: s.dfyProject?.assignedTo,
    notes: s.dfyProject?.notes,
    assetsUrl: s.dfyProject?.assetsUrl,
    completedAt: s.dfyProject?.completedAt ? s.dfyProject.completedAt.toISOString() : null,
    createdAt: s.dfyProject?.createdAt ? s.dfyProject.createdAt.toISOString() : s.createdAt.toISOString(),
    store: {
      id: s.id,
      name: s.name,
      slug: s.slug,
      tier: s.tier,
      chatHandle: s.chatHandle,
      customDomain: s.customDomain,
      owner: {
        email: s.owner.email,
        name: s.owner.name,
      },
    },
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Terima Beres (DFY) Client Pipeline &amp; Fulfillment
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          End-to-end design, catalog configuration, and domain setup tracking for DFY Business subscribers (Rp 899.000).
        </p>
      </div>

      <MabesDfyClient initialProjects={serializePlain(projects) as any} />
    </div>
  );
}
