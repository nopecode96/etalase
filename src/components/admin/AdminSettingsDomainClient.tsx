"use client";

import React, { useState, useTransition } from "react";
import {
  Globe,
  Lock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Save,
  Loader2,
  Sparkles,
} from "lucide-react";
import { actionUpdateStoreSettings } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminSettingsDomainClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminSettingsDomainClient({
  store,
  tier,
}: AdminSettingsDomainClientProps) {
  const [isPending, startTransition] = useTransition();
  const [domain, setDomain] = useState(store.customDomain || "");
  const [copiedTarget, setCopiedTarget] = useState(false);

  const isFree = tier === "FREE";

  const handleCopyTarget = () => {
    navigator.clipboard.writeText("cname.etalase.online");
    setCopiedTarget(true);
    setTimeout(() => setCopiedTarget(false), 2000);
    showToast("CNAME target copied to clipboard!", "info");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFree) {
      showToast("Custom domains require an active PRO subscription.", "error");
      return;
    }

    startTransition(async () => {
      const res = await actionUpdateStoreSettings({
        storeId: store.id,
        customDomain: domain,
      });

      if (res.success) {
        showToast("Custom domain updated successfully!", "success");
      } else {
        showToast(res.error || "Failed to update domain", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div className="pb-6 border-b border-[#E7E5E4]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
          Custom Domain
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Connect your custom domain name (e.g.{" "}
          <code className="text-[#D94E28] font-mono">yourbrand.com</code>) to replace the default{" "}
          <code className="font-mono">{store.slug}.etalase.online</code> subdomain.
        </p>
      </div>

      {isFree ? (
        <div className="bg-white rounded-3xl border border-amber-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider mb-1">
                PRO Feature
              </div>
              <h2 className="text-lg font-bold text-[#1C1917]">
                Connect Your Own Branded Domain
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
            Free accounts operate on our high-speed subdomain (
            <span className="font-mono text-[#1C1917] font-semibold">
              {store.slug}.etalase.online
            </span>
            ). Upgrade to PRO or DFY to unlock custom domain mapping with free automated SSL certificates, zero marketplace branding, and instant DNS routing.
          </p>

          <div className="pt-2">
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upgrade to PRO (Rp 99.000/mo)</span>
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1C1917]">
              Custom Domain Name
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="shop.yourbrand.com or yourbrand.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-mono focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2 disabled:opacity-50"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save Domain</span>
              </button>
            </div>
            <p className="text-[11px] text-[#78716C]">
              Do not include <code className="font-mono">https://</code> or trailing slashes.
            </p>
          </div>

          {/* DNS Instructions */}
          <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider">
              DNS Configuration Instructions
            </h3>
            <p className="text-xs text-[#57534E] leading-relaxed">
              Add the following CNAME record in your domain registrar (Cloudflare, Namecheap, Niagahoster, DomaiNesia, GoDaddy):
            </p>

            <div className="bg-white border border-[#E7E5E4] rounded-xl overflow-hidden text-xs">
              <div className="grid grid-cols-3 bg-stone-50 p-2.5 font-bold text-[#57534E] border-b border-[#E7E5E4]">
                <div>Record Type</div>
                <div>Host / Name</div>
                <div>Target / Value</div>
              </div>
              <div className="grid grid-cols-3 p-3 items-center font-mono text-[#1C1917]">
                <div className="font-semibold text-amber-700">CNAME</div>
                <div>@ (or subdomain)</div>
                <div className="flex items-center justify-between">
                  <span>cname.etalase.online</span>
                  <button
                    type="button"
                    onClick={handleCopyTarget}
                    className="p-1 rounded hover:bg-stone-100 text-[#78716C] transition"
                  >
                    {copiedTarget ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-[#78716C]">
              <AlertCircle className="w-3.5 h-3.5 text-[#D94E28] shrink-0 mt-0.5" />
              <span>
                DNS propagation usually takes between 5 to 60 minutes. SSL certificates are provisioned automatically once the DNS record is verified.
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
