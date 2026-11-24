"use client";

import React, { useState, useTransition } from "react";
import {
  Settings,
  Globe,
  Lock,
  Sparkles,
  Save,
  Loader2,
  ExternalLink,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Info,
} from "lucide-react";
import {
  actionUpdateStoreSettings,
  actionUpdateTelegramIntegration,
} from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminSettingsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
}

export function AdminSettingsClient({ store, tier }: AdminSettingsClientProps) {
  const isFree = tier === "FREE";
  const [isPending, startTransition] = useTransition();

  // Store Identity State
  const [name, setName] = useState(store.name || "");
  const [bio, setBio] = useState(store.bio || "");
  const [chatHandle, setChatHandle] = useState(store.chatHandle || "");
  const [locale, setLocale] = useState(store.locale || "id");
  const [currency, setCurrency] = useState(store.currency || "IDR");

  // Custom Domain State
  const [customDomain, setCustomDomain] = useState(store.customDomain || "");

  // Telegram Integration State
  const appearance = typeof store.appearanceConfig === "object" ? store.appearanceConfig : {};
  const telegramData = appearance?.telegramIntegration || {};
  const [telegramToken, setTelegramToken] = useState(telegramData.botToken || "");
  const [telegramChatId, setTelegramChatId] = useState(telegramData.chatId || "");
  const isTelegramConnected = Boolean(telegramData.isConnected);

  // Handle Save Identity & Domain
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await actionUpdateStoreSettings({
        storeId: store.id,
        name,
        bio,
        chatHandle,
        locale,
        currency,
        customDomain: isFree ? undefined : customDomain,
      });

      if (res.success) {
        showToast("Store settings saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to update settings", "error");
      }
    });
  };

  // Handle Save Telegram Integration
  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await actionUpdateTelegramIntegration({
        storeId: store.id,
        telegramToken,
        telegramChatId,
      });

      if (res.success) {
        showToast("Telegram integration saved and ready!", "success");
      } else {
        showToast(res.error || "Failed to save Telegram credentials", "error");
      }
    });
  };

  // Copy CNAME helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied: ${text}`, "success");
  };

  return (
    <div className="space-y-10 animate-fade-in w-full">
      {/* Header */}
      <div className="pb-6 border-b border-[#E7E5E4]">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
          Settings &amp; Integrations
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Configure store identity, regional currencies, custom domain, and Telegram order alerts.
        </p>
      </div>

      {/* 1. Store Identity Form */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-6">
        <div>
          <h2 className="text-base font-bold text-[#1C1917]">
            1. Store Identity &amp; Regional Setup
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Basic details shown on your public storefront and WhatsApp customer interactions.
          </p>
        </div>

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
              Permanent Subdomain
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
              Seller WhatsApp Number (with Country Code) *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={chatHandle}
                onChange={(e) => setChatHandle(e.target.value)}
                placeholder="6281234567890"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
              />
            </div>
            <p className="text-[10px] text-[#78716C]">
              Used to receive 0% commission &quot;Order by Chat&quot; messages directly to your WhatsApp.
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

        {/* Bio Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-[#1C1917]">
            Short Bio / Tagline
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Official digital store for tutorials, presets, and 1-on-1 coaching."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4]"
          />
        </div>

        {/* 2. Custom Domain Gated Card */}
        <div className="pt-6 border-t border-[#E7E5E4] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D94E28]" />
              <h3 className="text-sm font-bold text-[#1C1917]">
                Custom Domain (yourbrand.com)
              </h3>
            </div>
            {isFree ? (
              <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                <Lock className="w-3 h-3" />
                <span>PRO Only</span>
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                Unlocked
              </span>
            )}
          </div>

          {isFree ? (
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#FADCD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-[#57534E]">
                Connect your own domain (e.g. <strong>store.yourbrand.com</strong>) to build brand credibility and strengthen SEO rank.
              </p>
              <a
                href="/pricing"
                className="px-4 py-2 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs shrink-0 transition"
              >
                Upgrade to PRO
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#1C1917]">
                  Custom Domain Name
                </label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="store.mybrand.com"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
                />
              </div>

              {/* DNS Instructions */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] space-y-2 text-xs">
                <p className="font-bold text-[#1C1917] flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#D94E28]" />
                  <span>DNS CNAME Configuration Guide</span>
                </p>
                <p className="text-[11px] text-[#57534E]">
                  In your domain provider (Cloudflare, Niagahoster, GoDaddy, Namecheap), add the following DNS record:
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] font-mono text-[11px] flex items-center justify-between">
                  <span>Type: <strong>CNAME</strong> &bull; Target: <strong>cname.etalase.online</strong></span>
                  <button
                    type="button"
                    onClick={() => handleCopy("cname.etalase.online")}
                    className="p-1 text-stone-500 hover:text-[#D94E28]"
                    title="Copy Target"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>

      {/* 3. Integrations Slot: Telegram Order Notifications */}
      <section className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1C1917]">
                Telegram Order Notifications
              </h2>
              <p className="text-xs text-[#57534E]">
                Get instant ping on your phone or team group when an order is placed.
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
              isTelegramConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-stone-100 text-stone-600"
            }`}
          >
            {isTelegramConnected ? "Connected" : "Not Connected"}
          </span>
        </div>

        <form onSubmit={handleSaveTelegram} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Telegram Bot Token (from @BotFather)
              </label>
              <input
                type="password"
                value={telegramToken}
                onChange={(e) => setTelegramToken(e.target.value)}
                placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Telegram Chat ID (Personal or Group ID)
              </label>
              <input
                type="text"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                placeholder="e.g. 123456789 or -1001234567890"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E7E5E4] font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#57534E] space-y-1">
            <p className="font-bold text-[#1C1917]">How to get Telegram credentials:</p>
            <p className="text-[11px] leading-relaxed">
              1. Open Telegram &gt; message <strong>@BotFather</strong> &gt; send <code>/newbot</code> to get your <strong>Bot Token</strong>.<br />
              2. Open <strong>@userinfobot</strong> to get your personal <strong>Chat ID</strong> (or invite your bot to a group and fetch Group ID).
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Telegram Credentials</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
