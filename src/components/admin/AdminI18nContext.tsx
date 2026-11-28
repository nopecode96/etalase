"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_DICT,
  ADMIN_LOCALE_COOKIE,
  AdminLocale,
  AdminTranslations,
  normalizeAdminLocale,
} from "@/lib/admin/admin-i18n";

interface AdminI18nContextValue {
  locale: AdminLocale;
  t: AdminTranslations;
  setLocale: (next: AdminLocale) => void;
}

const AdminI18nContext = createContext<AdminI18nContextValue>({
  locale: "id",
  t: ADMIN_DICT.id,
  setLocale: () => {},
});

export function AdminI18nProvider({
  initialLocale = "id",
  children,
}: {
  initialLocale?: AdminLocale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<AdminLocale>(
    normalizeAdminLocale(initialLocale)
  );

  const setLocale = (next: AdminLocale) => {
    const valid = normalizeAdminLocale(next);
    setLocaleState(valid);
    try {
      localStorage.setItem(ADMIN_LOCALE_COOKIE, valid);
      document.cookie = `${ADMIN_LOCALE_COOKIE}=${valid}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
    router.refresh();
  };

  return (
    <AdminI18nContext.Provider
      value={{
        locale,
        t: ADMIN_DICT[locale] || ADMIN_DICT.id,
        setLocale,
      }}
    >
      {children}
    </AdminI18nContext.Provider>
  );
}

export function useAdminI18n() {
  return useContext(AdminI18nContext);
}
