import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSettingsIntegrationsClient } from "@/components/admin/AdminSettingsIntegrationsClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function SettingsIntegrationsPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminSettingsIntegrationsClient
      store={context.store}
      tier={context.tier}
    />
  );
}
