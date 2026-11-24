"use client";

import React, { useState, useTransition } from "react";
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Loader2,
  Copy,
  Check,
  Server,
  Info,
} from "lucide-react";
import { actionVerifyDomain } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface StoreDomainItem {
  id: string;
  name: string;
  slug: string;
  tier: "FREE" | "PRO" | "DFY_BUSINESS";
  customDomain: string | null;
  domainVerified: boolean;
  createdAt: string;
  owner: {
    name?: string | null;
    email: string;
  };
}

interface MabesDomainsClientProps {
  initialStores: StoreDomainItem[];
}

export function MabesDomainsClient({ initialStores }: MabesDomainsClientProps) {
  const [stores, setStores] = useState<StoreDomainItem[]>(initialStores);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"ALL" | "VERIFIED" | "PENDING" | "UNASSIGNED">("ALL");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [activeStoreId, setActiveStoreId] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleToggleVerification = (storeId: string, currentStatus: boolean) => {
    setActiveStoreId(storeId);
    startTransition(async () => {
      const res = await actionVerifyDomain(storeId, !currentStatus);
      setActiveStoreId(null);
      if (res.success) {
        setStores((prev) =>
          prev.map((s) => (s.id === storeId ? { ...s, domainVerified: !currentStatus } : s))
        );
        showToast(
          !currentStatus ? "Domain verified and activated!" : "Domain verification revoked.",
          "success"
        );
      } else {
        showToast(res.error || "Failed to update domain status.", "error");
      }
    });
  };

  const filteredStores = stores.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()) ||
      (s.customDomain && s.customDomain.toLowerCase().includes(search.toLowerCase())) ||
      s.owner.email.toLowerCase().includes(search.toLowerCase());

    if (!matchSearch) return false;

    if (filter === "VERIFIED") return s.customDomain && s.domainVerified;
    if (filter === "PENDING") return s.customDomain && !s.domainVerified;
    if (filter === "UNASSIGNED") return !s.customDomain;
    return true;
  });

  const verifiedCount = stores.filter((s) => s.customDomain && s.domainVerified).length;
  const pendingCount = stores.filter((s) => s.customDomain && !s.domainVerified).length;

  return (
    <div className="space-y-6">
      {/* Top DNS Instructions Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-semibold text-white">Platform DNS Resolution Specifications</h2>
              <span className="text-[11px] text-slate-400">Target host for merchant CNAME / A records</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              When PRO / DFY merchants point their custom domain (e.g. <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">brand.com</code> or <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">shop.brand.com</code>), instruct them to configure DNS records in their registrar:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Subdomains (CNAME Record)</span>
                  <code className="text-xs text-indigo-300 font-mono">cname.etalase.online</code>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("cname.etalase.online", "cname")}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition"
                >
                  {copiedKey === "cname" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "cname" ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Apex Domain (A Record)</span>
                  <code className="text-xs text-indigo-300 font-mono">178.128.214.218</code>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("178.128.214.218", "a_record")}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition"
                >
                  {copiedKey === "a_record" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === "a_record" ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search custom domain, store name, slug, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setFilter("ALL")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 ${
              filter === "ALL"
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            All Eligible ({stores.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("VERIFIED")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 flex items-center gap-1.5 ${
              filter === "VERIFIED"
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified ({verifiedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("PENDING")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 flex items-center gap-1.5 ${
              filter === "PENDING"
                ? "bg-amber-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Pending DNS ({pendingCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("UNASSIGNED")}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition shrink-0 ${
              filter === "UNASSIGNED"
                ? "bg-slate-700 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            Unassigned
          </button>
        </div>
      </div>

      {/* Domain Table Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Custom Domain</th>
                <th className="px-4 py-3">Store &amp; Tenant</th>
                <th className="px-4 py-3">Plan Tier</th>
                <th className="px-4 py-3">DNS Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                    <Globe className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No domain records found</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Try adjusting your search query or status filter.</p>
                  </td>
                </tr>
              ) : (
                filteredStores.map((s) => {
                  const hasCustom = !!s.customDomain;
                  const isBusy = isPending && activeStoreId === s.id;

                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3.5">
                        {hasCustom ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-white font-mono">{s.customDomain}</span>
                              <a
                                href={`https://${s.customDomain}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-400 hover:text-indigo-400 transition"
                                title="Open in new tab"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              Proxied via CNAME/A
                            </span>
                          </div>
                        ) : (
                          <div className="text-slate-500 italic flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5" />
                            <span>Not yet assigned</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-200">{s.name}</p>
                          <a
                            href={`https://${s.slug}.etalase.online`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-slate-400 hover:text-indigo-400 font-mono transition flex items-center gap-1"
                          >
                            {s.slug}.etalase.online
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                          <p className="text-[10px] text-slate-500">{s.owner.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${
                            s.tier === "DFY_BUSINESS"
                              ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                              : s.tier === "PRO"
                              ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {s.tier === "DFY_BUSINESS" ? "DFY PRO" : s.tier}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {hasCustom ? (
                          s.domainVerified ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              DNS Active &amp; Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/30">
                              <AlertCircle className="w-3 h-3 text-amber-400" />
                              Pending Verification
                            </span>
                          )
                        ) : (
                          <span className="text-[10px] text-slate-500">Awaiting Merchant Input</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {hasCustom ? (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => handleToggleVerification(s.id, s.domainVerified)}
                            className={`px-3 py-1 rounded text-[11px] font-medium border transition inline-flex items-center gap-1.5 ${
                              s.domainVerified
                                ? "bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border-slate-700 hover:border-rose-800"
                                : "bg-emerald-600 hover:bg-emerald-500 text-white border-transparent shadow-sm"
                            }`}
                          >
                            {isBusy ? (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Updating...
                              </>
                            ) : s.domainVerified ? (
                              "Revoke DNS"
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                Verify &amp; Activate
                              </>
                            )}
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
