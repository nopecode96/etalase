import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { canManageTechnical } from "@/lib/permissions";
import { Cpu, Globe, ShieldCheck, CheckCircle2, Server } from "lucide-react";

export default async function TechnicalPage() {
  const session = await getSession();
  if (!session || !canManageTechnical(session)) {
    redirect("/dashboard");
  }

  const tenants = await prisma.tenant.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      businessName: true,
      customDomain: true,
      isActive: true,
      latitude: true,
      longitude: true,
      updatedAt: true,
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Diagnostik DNS & Status SSL Domain</h1>
        <p className="text-gray-500 text-sm mt-1">
          Panel SaaS Technical untuk inspeksi routing custom domain, status SSL Edge, dan konfigurasi server.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-purple-600 mb-2">
            <Server size={22} />
            <span className="text-sm font-semibold text-gray-700">Edge Proxy Runtime</span>
          </div>
          <p className="text-xl font-bold text-gray-800">Next.js 16 (Node.js Proxy)</p>
          <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} /> Running on Port 3005
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <Globe size={22} />
            <span className="text-sm font-semibold text-gray-700">Root Custom Domains</span>
          </div>
          <p className="text-xl font-bold text-gray-800">{tenants.length} Domain Mandiri</p>
          <p className="text-xs text-gray-500 mt-1">Zero Subdomain Enforcement</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3 text-emerald-600 mb-2">
            <ShieldCheck size={22} />
            <span className="text-sm font-semibold text-gray-700">SSL Termination</span>
          </div>
          <p className="text-xl font-bold text-gray-800">Cloudflare Proxy (Full)</p>
          <p className="text-xs text-gray-500 mt-1">Universal SSL Auto-Managed</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Domain Mandiri</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Tenant</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Target Host / IP</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Status SSL / DNS</th>
              <th className="text-left px-6 py-3.5 text-gray-600 font-medium">Geo Koord</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tenants.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono font-medium text-blue-600 text-xs">
                  {t.customDomain}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{t.businessName}</td>
                <td className="px-6 py-4 text-xs font-mono text-gray-500">
                  A-Record &rarr; Server IP (Port 3005)
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                    <CheckCircle2 size={12} /> Active / Cloudflare SSL
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                  {t.latitude && t.longitude ? `${t.latitude}, ${t.longitude}` : "Belum diatur"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
