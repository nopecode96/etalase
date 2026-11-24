import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminOverviewClient } from "@/components/admin/AdminOverviewClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminOverviewPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminOverviewClient
      store={context.store}
      tier={context.tier}
      rules={context.rules}
      monthlyWithdrawalsCount={context.monthlyWithdrawalsCount}
      remainingFreeWithdrawals={context.remainingFreeWithdrawals}
    />
  );
}
