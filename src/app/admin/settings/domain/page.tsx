import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSettingsDomainClient } from "@/components/admin/AdminSettingsDomainClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function SettingsDomainPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminSettingsDomainClient
      store={context.store}
      tier={context.tier}
    />
  );
}
