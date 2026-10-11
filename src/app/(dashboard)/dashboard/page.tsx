import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSaaSRole } from "@/lib/permissions";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const isSaaS = isSaaSRole(session.role);

  // Stats query berdasarkan role
  let stats;
  if (isSaaS) {
    const [totalTenants, totalLeads, newLeads] = await Promise.all([
      prisma.tenant.count({ where: { isActive: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { status: "NEW" } }),
    ]);
    stats = { totalTenants, totalLeads, newLeads };
  } else if (session.tenantId) {
    const [totalLeads, newLeads, totalCatalogs] = await Promise.all([
      prisma.lead.count({ where: { tenantId: session.tenantId } }),
      prisma.lead.count({ where: { tenantId: session.tenantId, status: "NEW" } }),
      prisma.catalogItem.count({ where: { tenantId: session.tenantId } }),
    ]);
    stats = { totalLeads, newLeads, totalCatalogs };
  }

  // Leads terbaru
  const recentLeads = isSaaS
    ? await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { tenant: { select: { businessName: true } } },
      })
    : session.tenantId
    ? await prisma.lead.findMany({
        where: { tenantId: session.tenantId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { tenant: { select: { businessName: true } } },
      })
    : [];

  const roleLabels: Record<string, string> = {
    SAAS_SUPER_ADMIN: "SaaS Super Admin",
    SAAS_ADMIN: "SaaS Admin Operasional",
    SAAS_MARKETING: "SaaS Marketing Specialist",
    SAAS_FINANCE: "SaaS Finance Specialist",
    SAAS_TECHNICAL: "SaaS Technical Specialist",
    CLIENT_SUPER_ADMIN: "Owner Website",
    CLIENT_ADMIN: "Staf Website Klien",
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Selamat datang, {session.name}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          {roleLabels[session.role] || session.role}
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {"totalTenants" in stats && (
            <StatCard label="Total Tenant Aktif" value={stats.totalTenants} color="blue" />
          )}
          {"totalCatalogs" in stats && (
            <StatCard label="Item Katalog" value={stats.totalCatalogs} color="purple" />
          )}
          <StatCard label="Total Prospek" value={stats.totalLeads} color="green" />
          <StatCard
            label="Prospek Baru"
            value={stats.newLeads}
            color="orange"
            badge
          />
        </div>
      )}

      {/* Leads Terbaru */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Prospek Terbaru
        </h2>
        {recentLeads.length === 0 ? (
          <p className="text-gray-400 text-sm">Belum ada prospek masuk.</p>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead: any) => (
              <div
                key={lead.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800 text-sm">{lead.name}</p>
                  <p className="text-xs text-gray-500">
                    {lead.phone} · {lead.moduleType}
                    {isSaaS && ` · ${lead.tenant.businessName}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <LeadStatusBadge status={lead.status} />
                  <p className="text-xs text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  badge,
}: {
  label: string;
  value: number;
  color: "blue" | "green" | "orange" | "purple";
  badge?: boolean;
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
    purple: "bg-purple-50 text-purple-700",
  };
  return (
    <div className={`${colorMap[color]} rounded-2xl p-5`}>
      <p className="text-3xl font-bold">
        {value}
        {badge && value > 0 && (
          <span className="text-sm font-normal ml-1">baru</span>
        )}
      </p>
      <p className="text-sm mt-1 opacity-80">{label}</p>
    </div>
  );
}

function LeadStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-yellow-100 text-yellow-700",
    FOLLOW_UP: "bg-orange-100 text-orange-700",
    DEAL: "bg-green-100 text-green-700",
    LOST: "bg-red-100 text-red-700",
  };
  const labels: Record<string, string> = {
    NEW: "Baru",
    CONTACTED: "Dihubungi",
    FOLLOW_UP: "Follow Up",
    DEAL: "Deal",
    LOST: "Tutup",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {labels[status] ?? status}
    </span>
  );
}
