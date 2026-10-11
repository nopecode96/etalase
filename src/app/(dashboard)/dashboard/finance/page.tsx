import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canManageBilling } from "@/lib/permissions";
import { CreditCard, Calendar, CheckCircle, AlertTriangle } from "lucide-react";

export default async function FinancePage() {
  const session = await getSession();
  if (!session || !canManageBilling(session)) {
    redirect("/dashboard");
  }

  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      businessName: true,
      customDomain: true,
      isActive: true,
      expiresAt: true,
      createdAt: true,
      category: { select: { name: true } },
    },
  });

  const activeSubscriptions = tenants.filter(
    (t) => t.isActive && (!t.expiresAt || new Date(t.expiresAt) > new Date())
  ).length;

  const expiringSoon = tenants.filter((t) => {
    if (!t.expiresAt) return false;
    const diffDays = Math.ceil(
      (new Date(t.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays >= 0 && diffDays <= 14;
  }).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Billing & Manajemen Langganan</h1>
        <p className="text-gray-500 text-sm mt-1">
          Panel SaaS Finance untuk memantau masa aktif domain, tagihan, dan status langganan tenant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <CreditCard size={22} />
            <span className="text-sm font-semibold text-gray-700">Total Tenant Terdaftar</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{tenants.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-green-600 mb-2">
            <CheckCircle size={22} />
            <span className="text-sm font-semibold text-gray-700">Langganan Aktif</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{activeSubscriptions}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-amber-600 mb-2">
            <AlertTriangle size={22} />
            <span className="text-sm font-semibold text-gray-700">Masa Aktif Hampir Habis (&le; 14 Hari)</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{expiringSoon}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Tenant</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Domain</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Kategori</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Status Langganan</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Masa Aktif (Expires)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tenants.map((tenant) => {
              const isExpired = tenant.expiresAt && new Date(tenant.expiresAt) < new Date();
              return (
                <tr key={tenant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-800">{tenant.businessName}</td>
                  <td className="px-6 py-4 text-blue-600 font-mono text-xs">{tenant.customDomain}</td>
                  <td className="px-6 py-4 text-gray-600">{tenant.category.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        !tenant.isActive
                          ? "bg-gray-100 text-gray-600"
                          : isExpired
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {!tenant.isActive ? "Nonaktif" : isExpired ? "Kadaluarsa" : "Aktif"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {tenant.expiresAt ? (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        {new Date(tenant.expiresAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Lifetime / Belum Diatur</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
