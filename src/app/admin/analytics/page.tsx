import React from "react";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminAnalyticsClient } from "@/components/admin/AdminAnalyticsClient";

interface AdminPageProps {
  searchParams?: {
    slug?: string;
  };
}

export default async function AdminAnalyticsPage({ searchParams }: AdminPageProps) {
  const context = await getAdminTenantContext(searchParams?.slug);

  return (
    <AdminAnalyticsClient
      store={context.store}
      tier={context.tier}
    />
  );
}
