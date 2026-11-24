import React from "react";
import { prisma } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { MabesSettingsClient } from "@/components/mabes/MabesSettingsClient";

export const dynamic = "force-dynamic";

export default async function MabesSettingsPage() {
  await requireMabesContext();

  const settingsList = await prisma.platformSetting.findMany({
    orderBy: { key: "asc" },
  });

  const settingsMap: Record<string, string> = {};
  for (const s of settingsList) {
    settingsMap[s.key] = s.value;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Platform Configuration &amp; Global Defaults
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure Rafa Kreasindo Teknologi platform parameters, pricing tariffs, payout thresholds, and Telegram bot alerts.
        </p>
      </div>

      <MabesSettingsClient initialSettings={settingsMap} />
    </div>
  );
}
