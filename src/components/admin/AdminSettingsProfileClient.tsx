"use client";

import React, { useState, useTransition } from "react";
import {
  Store as StoreIcon,
  Save,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { actionUpdateStoreSettings } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminSettingsProfileClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminSettingsProfileClient({ store }: AdminSettingsProfileClientProps) {
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(store.name || "");
  const [bio, setBio] = useState(store.bio || "");
  const [chatHandle, setChatHandle] = useState(store.chatHandle || "");
  const [locale, setLocale] = useState(store.locale || "id");
  const [currency, setCurrency] = useState(store.currency || "IDR");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await actionUpdateStoreSettings({
        storeId: store.id,
        name,
        bio,
        chatHandle,
        locale,
        currency,
      });

      if (res.success) {
        showToast("Store profile updated successfully!", "success");
      } else {
        showToast(res.error || "Failed to update profile", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div className="pb-6 border-b border-[#E7E5E4]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
          Store Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Configure your business name, bio tagline, seller WhatsApp number, and display currency.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Store Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1C1917]">
              Store Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-semibold"
            />
          </div>

          {/* Subdomain (Read-Only) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#78716C]">
              Subdomain URL
            </label>
            <input
              type="text"
              readOnly
              disabled
              value={`${store.slug}.etalase.online`}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-stone-100 text-stone-500 font-mono"
            />
          </div>

          {/* WhatsApp Handle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1C1917]">
              Seller WhatsApp (Country Code + Number) *
            </label>
            <input
              type="text"
              required
              value={chatHandle}
              onChange={(e) => setChatHandle(e.target.value)}
              placeholder="6281234567890"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
            />
            <p className="text-[10px] text-[#78716C]">
              Direct destination for 0% commission &quot;Order by Chat&quot; inquiries.
            </p>
          </div>

          {/* Currency */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#1C1917]">
              Display Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] bg-white font-semibold"
            >
              <option value="IDR">IDR (Rp) — Indonesian Rupiah</option>
              <option value="THB">THB (฿) — Thai Baht</option>
              <option value="MYR">MYR (RM) — Malaysian Ringgit</option>
              <option value="VND">VND (₫) — Vietnamese Dong</option>
              <option value="USD">USD ($) — US Dollar</option>
              <option value="SGD">SGD (S$) — Singapore Dollar</option>
              <option value="PHP">PHP (₱) — Philippine Peso</option>
            </select>
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1C1917]">
            Store Bio / Tagline
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Official digital store for tutorials, presets, and 1-on-1 coaching."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4]"
          />
        </div>

        <div className="flex justify-end pt-2 border-t border-[#E7E5E4]">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
