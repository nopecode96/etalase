import React from "react";
import type { Metadata } from "next";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlobalToast } from "@/components/ui/GlobalToast";

export const metadata: Metadata = {
  title: "Tenant Admin Console — etalase.online",
  description: "Manage your storefront products, orders, payouts, and marketing analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const context = await getAdminTenantContext();

  return (
    <AdminShell store={context.store} user={context.user}>
      {children}
      <GlobalToast />
    </AdminShell>
  );
}
