import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSettingsIntegrationsClient } from "@/components/admin/AdminSettingsIntegrationsClient";
import { getTelegramConfig } from "@/lib/services/telegram-service";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function SettingsIntegrationsPage({ searchParams }: AdminPageProps) {
  const [context, telegramConfig] = await Promise.all([
    getAdminTenantContext(searchParams?.slug),
    getTelegramConfig(),
  ]);

  return (
    <AdminSettingsIntegrationsClient
      store={context.store}
      tier={context.tier}
      platformBotUsername={telegramConfig.botUsername || "etalaseonline_bot"}
    />
  );
}
