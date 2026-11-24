import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/session";
import { Shield, Users, DollarSign, Store, LogOut, ExternalLink, ArrowRight } from "lucide-react";
import { actionMabesLogout } from "./login/actions";
import { getMabesDashboardMetrics } from "@/services/mabes-admin";
import { formatCurrency, formatDate } from "@/lib/core/formatters";

export default async function MabesAdminPage() {
  const session = await auth();

  // Guard: If not super admin, redirect to internal Mabes email/password login
  const isSuperAdmin = (session?.user as unknown as { role?: string })?.role === "SUPER_ADMIN";
  if (!session || !isSuperAdmin) {
    redirect("/mabes/login");
  }

  const metricsRes = await getMabesDashboardMetrics();
  const metrics = (metricsRes.success && metricsRes.data ? metricsRes.data : {
    totalRealTenants: 0,
    totalUsers: 0,
    estimatedMRR: 0,
    pendingWithdrawals: 0,
    recentTenants: [],
    recentOrders: [],
  }) as any;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 px-6 py-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <div>
              <h1 className="font-bold text-white text-base leading-none">
                Mabes etalase.online
              </h1>
              <span className="text-xs text-slate-400">Pusat Kendali Super Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Super Admin: {session.user?.email}
            </span>

            <form action={actionMabesLogout}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition border border-slate-700"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-8 flex-1">
        {/* KPI Row (Filtered isDemo: false) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-blue-400" />
              Total Tenant Aktif
            </div>
            <div className="text-3xl font-extrabold text-white">
              {metrics.totalRealTenants}
            </div>
            <div className="text-xs text-slate-500 mt-1">Non-demo tenant riil</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              MRR Riil (Pro Tier)
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">
              {formatCurrency(metrics.estimatedMRR, "IDR", "id")}
            </div>
            <div className="text-xs text-slate-500 mt-1">Filter isDemo: false</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              User Google Terdaftar
            </div>
            <div className="text-3xl font-extrabold text-white">
              {metrics.totalUsers}
            </div>
            <div className="text-xs text-slate-500 mt-1">Terverifikasi Google OAuth</div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Antrean Payout
            </div>
            <div className="text-3xl font-extrabold text-amber-400">
              {metrics.pendingWithdrawals}
            </div>
            <div className="text-xs text-slate-500 mt-1">Semua dana telah diproses</div>
          </div>
        </div>

        {/* Global Feeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Tenants */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Tenant Terbaru Terdaftar</h2>
            <p className="text-xs text-slate-400 mb-4">Pendaftaran toko via Google Connect.</p>

            {metrics.recentTenants && metrics.recentTenants.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {metrics.recentTenants.map((t: any) => (
                  <div key={t.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{t.slug}.etalase.online</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                      {t.tier}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Belum ada tenant baru selain akun demo.
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Transaksi Lunas Terbaru</h2>
            <p className="text-xs text-slate-400 mb-4">Verifikasi otomatis Borderpay QRIS &amp; PayPal.</p>

            {metrics.recentOrders && metrics.recentOrders.length > 0 ? (
              <div className="divide-y divide-slate-800">
                {metrics.recentOrders.map((o: any) => (
                  <div key={o.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{o.orderCode}</div>
                      <div className="text-slate-400 text-[11px]">{o.buyerName}</div>
                    </div>
                    <span className="font-bold text-emerald-400">
                      {formatCurrency(o.amount, o.currency, "id")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Belum ada transaksi pembayaran lunas baru.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
