import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminSettingsProfileClient } from "@/components/admin/AdminSettingsProfileClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function SettingsProfilePage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminSettingsProfileClient
      store={context.store}
      tier={context.tier}
    />
  );
}
