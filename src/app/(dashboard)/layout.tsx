import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import "@/app/globals.css";
import { logoutAction } from "@/actions/auth.actions";
import {
  isSaaSRole,
  isClientRole,
  canManageTenant,
  canManageBilling,
  canManageTechnical,
  canManageMarketing,
  canManageClientUsers,
  canManageClientSettings,
} from "@/lib/permissions";
import {
  LayoutDashboard,
  Package,
  Image,
  Users,
  Settings,
  Shield,
  CreditCard,
  Cpu,
  UserCheck,
  Megaphone,
  LogOut,
  Building,
} from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const role = session.role;
  const isSaaS = isSaaSRole(role);
  const isClient = isClientRole(role);

  // Label badge role pengguna
  const roleDisplayNames: Record<string, string> = {
    SAAS_SUPER_ADMIN: "SaaS Super Admin",
    SAAS_ADMIN: "SaaS Admin",
    SAAS_MARKETING: "SaaS Marketing",
    SAAS_FINANCE: "SaaS Finance",
    SAAS_TECHNICAL: "SaaS Technical",
    CLIENT_SUPER_ADMIN: "Owner Website",
    CLIENT_ADMIN: "Staf Website",
  };

  interface NavItem {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
  }

  const navItems: NavItem[] = [];

  // 1. Overview Dashboard (Semua role memiliki akses ke overview)
  navItems.push({
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  });

  // 2. Navigasi untuk Pengguna Internal SaaS
  if (isSaaS) {
    // Manajemen Tenant & Domain (Super Admin & Admin)
    if (canManageTenant(session)) {
      navItems.push({
        href: "/dashboard/admin",
        label: "Kelola Tenant",
        icon: Building,
      });
    }

    // Billing, Masa Aktif, dan Finansial (Super Admin & Finance)
    if (canManageBilling(session)) {
      navItems.push({
        href: "/dashboard/finance",
        label: "Billing & Langganan",
        icon: CreditCard,
      });
    }

    // Diagnostik Teknis, DNS, Domain SSL, Logs (Super Admin & Technical)
    if (canManageTechnical(session)) {
      navItems.push({
        href: "/dashboard/technical",
        label: "Diagnostik DNS & SSL",
        icon: Cpu,
      });
    }

    // Showcase & Calon Lead SaaS (Super Admin & Marketing)
    if (canManageMarketing(session)) {
      navItems.push({
        href: "/dashboard/marketing",
        label: "Marketing & Leads",
        icon: Megaphone,
      });
    }

    // Manajemen Akses Admin Global (Khusus Super Admin)
    if (role === "SAAS_SUPER_ADMIN") {
      navItems.push({
        href: "/dashboard/admin/users",
        label: "Akses Super Admin",
        icon: Shield,
      });
    }
  }

  // 3. Navigasi untuk Pengguna Tenant / Klien
  if (isClient) {
    // Katalog Unit/Produk (CLIENT_SUPER_ADMIN & CLIENT_ADMIN)
    navItems.push({
      href: "/dashboard/catalogs",
      label: "Katalog & Unit",
      icon: Package,
    });

    // Galeri Serah Terima / Foto (CLIENT_SUPER_ADMIN & CLIENT_ADMIN)
    navItems.push({
      href: "/dashboard/galleries",
      label: "Galeri Serah Terima",
      icon: Image,
    });

    // Data Prospek WhatsApp Masuk (CLIENT_SUPER_ADMIN & CLIENT_ADMIN)
    navItems.push({
      href: "/dashboard/leads",
      label: "Prospek Masuk",
      icon: Users,
    });

    // Manajemen Tim / Admin (Khusus CLIENT_SUPER_ADMIN)
    if (canManageClientUsers(session)) {
      navItems.push({
        href: "/dashboard/team",
        label: "Manajemen Tim / Admin",
        icon: UserCheck,
      });
    }

    // Pengaturan Identitas & Domain (Khusus CLIENT_SUPER_ADMIN)
    if (canManageClientSettings(session)) {
      navItems.push({
        href: "/dashboard/settings",
        label: "Pengaturan Website",
        icon: Settings,
      });
    }
  }

  return (
    <html lang="id">
      <body className="bg-gray-50">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            {/* Logo & Profil Info */}
            <div className="p-6 border-b border-gray-100">
              <h1 className="text-xl font-bold text-blue-600">etalase.online</h1>
              <p className="text-sm font-semibold text-gray-800 mt-2 truncate">
                {session.name}
              </p>
              <div className="mt-1">
                <span
                  className={`inline-block text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    isSaaS
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {roleDisplayNames[role] || role}
                </span>
              </div>
            </div>

            {/* Menu Navigasi Sesuai RBAC */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium"
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Tombol Logout */}
            <div className="p-4 border-t border-gray-100">
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium w-full"
                >
                  <LogOut size={18} />
                  Keluar
                </button>
              </form>
            </div>
          </aside>

          {/* Konten Utama */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
