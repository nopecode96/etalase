import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesTeamClient } from "@/components/mabes/MabesTeamClient";

export const dynamic = "force-dynamic";

export default async function MabesTeamPage() {
  const ctx = await requireMabesContext();

  const team = await prisma.user.findMany({
    where: {
      role: {
        in: ["SUPER_ADMIN", "ADMIN_MABES"],
      },
    },
    orderBy: [
      { role: "asc" },
      { createdAt: "desc" },
    ],
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      preferredLang: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Mabes Team &amp; Access Control
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage internal platform administrators and operational staff permissions for Rafa Kreasindo Teknologi.
        </p>
      </div>

      <MabesTeamClient
        initialUsers={serializePlain(team) as any}
        currentUserId={ctx.user.id}
        isSuperAdmin={ctx.isSuperAdmin}
      />
    </div>
  );
}
