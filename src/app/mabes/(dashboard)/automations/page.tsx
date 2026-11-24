import React from "react";
import { prisma, serializePlain } from "@/lib/db/prisma";
import { requireMabesContext } from "@/lib/auth/mabes-guard";
import { env } from "@/lib/config/env";
import { MabesAutomationsClient } from "@/components/mabes/MabesAutomationsClient";

export const dynamic = "force-dynamic";

export default async function MabesAutomationsPage() {
  await requireMabesContext();

  const [logs, botTokenSetting, chatIdSetting] = await Promise.all([
    prisma.automationLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.platformSetting.findUnique({ where: { key: "telegram_mabes_bot_token" } }),
    prisma.platformSetting.findUnique({ where: { key: "telegram_mabes_chat_id" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Automations, Event Dispatcher &amp; Webhooks Hub
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Orchestration command deck for n8n workflows, Borderpay/PayPal callbacks, and Telegram mobile operational broadcasts.
        </p>
      </div>

      <MabesAutomationsClient
        initialLogs={serializePlain(logs) as any}
        n8nBaseUrl={env.N8N_WEBHOOK_BASE_URL}
        telegramChatId={chatIdSetting?.value}
        hasTelegramToken={!!botTokenSetting?.value}
      />
    </div>
  );
}
