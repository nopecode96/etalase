import React from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getAdminTenantContext } from "@/lib/admin/tenant-context";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminI18nProvider } from "@/components/admin/AdminI18nContext";
import { ADMIN_LOCALE_COOKIE, normalizeAdminLocale } from "@/lib/admin/admin-i18n";
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
  const cookieStore = cookies();
  const initialLocale = normalizeAdminLocale(
    cookieStore.get(ADMIN_LOCALE_COOKIE)?.value
  );

  return (
    <AdminI18nProvider initialLocale={initialLocale}>
      <AdminShell store={context.store} user={context.user}>
        {children}
        <GlobalToast />
      </AdminShell>
    </AdminI18nProvider>
  );
}
