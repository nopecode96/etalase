import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSettingsClient } from "@/components/admin/AdminSettingsClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminSettingsPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminSettingsClient
      store={context.store}
      tier={context.tier}
    />
  );
}
