import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isSaaSRole } from "@/lib/permissions";

export default async function LeadsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const isSaaS = isSaaSRole(session.role);

  const leads = await prisma.lead.findMany({
    where: isSaaS ? {} : { tenantId: session.tenantId ?? "" },
    orderBy: { createdAt: "desc" },
    include: {
      tenant: { select: { businessName: true, customDomain: true } },
    },
  });

  const statusLabels: Record<string, string> = {
    NEW: "Baru",
    CONTACTED: "Dihubungi",
    FOLLOW_UP: "Follow Up",
    DEAL: "Deal",
    LOST: "Tutup",
  };

  const statusColors: Record<string, string> = {
    NEW: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-yellow-100 text-yellow-700",
    FOLLOW_UP: "bg-orange-100 text-orange-700",
    DEAL: "bg-green-100 text-green-700",
    LOST: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Prospek</h1>
        <p className="text-gray-500 text-sm mt-1">
          {leads.length} prospek ditemukan
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Nama</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">No. HP</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Modul</th>
              {isSaaS && (
                <th className="text-left px-6 py-3 text-gray-600 font-medium">Tenant</th>
              )}
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Status</th>
              <th className="text-left px-6 py-3 text-gray-600 font-medium">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td
                  colSpan={isSaaS ? 6 : 5}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  Belum ada prospek masuk.
                </td>
              </tr>
            ) : (
              leads.map((lead: any) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                      {lead.moduleType.replace(/_/g, " ")}
                    </span>
                  </td>
                  {isSaaS && (
                    <td className="px-6 py-4 text-gray-600">
                      {lead.tenant.businessName}
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status] ?? "bg-gray-100 text-gray-600"}`}
                    >
                      {statusLabels[lead.status] ?? lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
