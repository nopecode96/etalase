"use client";

import React, { useState, useTransition } from "react";
import {
  Building2,
  CreditCard,
  Landmark,
  Wallet,
  Send,
  Save,
  Loader2,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
} from "lucide-react";
import { actionUpdatePlatformSettings, actionSendTestTelegramAlert } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface MabesSettingsClientProps {
  initialSettings: Record<string, string>;
}

export function MabesSettingsClient({ initialSettings }: MabesSettingsClientProps) {
  const [settings, setSettings] = useState<Record<string, string>>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [isTestPending, startTestTransition] = useTransition();

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSendTestAlert = () => {
    startTestTransition(async () => {
      const res = await actionSendTestTelegramAlert();
      if (res.success) {
        showToast(res.message || "Test alert delivered to Mabes Telegram group!", "success");
      } else {
        showToast(res.error || "Failed to send test alert.", "error");
      }
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await actionUpdatePlatformSettings(settings);
      if (res.success) {
        showToast(res.message || "Platform configurations saved and updated successfully!", "success");
      } else {
        showToast(res.error || "Failed to update platform settings.", "error");
      }
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {/* 1. Corporate Entity & Legal */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Platform Entity &amp; Legal Identity</h2>
            <p className="text-[11px] text-slate-400">
              Corporate organization branding and official support channels.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Legal Corporate Name
            </label>
            <input
              type="text"
              value={settings.company_name || ""}
              onChange={(e) => handleChange("company_name", e.target.value)}
              placeholder="PT Rafa Kreasindo Teknologi"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Public Platform Name
            </label>
            <input
              type="text"
              value={settings.platform_name || ""}
              onChange={(e) => handleChange("platform_name", e.target.value)}
              placeholder="etalase.online"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium font-mono"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-300 mb-1">
              Platform Support Link / Telegram Channel
            </label>
            <input
              type="text"
              value={settings.support_telegram || ""}
              onChange={(e) => handleChange("support_telegram", e.target.value)}
              placeholder="https://t.me/rafakreasindo"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-medium font-mono"
            />
          </div>
        </div>
      </div>

      {/* 2. Subscription Pricing Engine */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Subscription Pricing Tariffs (IDR)</h2>
            <p className="text-[11px] text-slate-400">
              Set standard public pricing for PRO monthly, PRO yearly, and Terima Beres (DFY) packages.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              PRO Monthly Plan (IDR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
              <input
                type="number"
                value={settings.pro_monthly_idr || "49000"}
                onChange={(e) => handleChange("pro_monthly_idr", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Default: Rp 49.000 / month</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              PRO Yearly Plan (IDR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
              <input
                type="number"
                value={settings.pro_yearly_idr || "468000"}
                onChange={(e) => handleChange("pro_yearly_idr", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Default: Rp 468.000 / year (Save 20%)</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Terima Beres (DFY) Business
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
              <input
                type="number"
                value={settings.dfy_idr || "899000"}
                onChange={(e) => handleChange("dfy_idr", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Default: Rp 899.000 (1 Year PRO + Setup)</p>
          </div>
        </div>
      </div>

      {/* 3. Official Billing Settlement Accounts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Official Bank Accounts for Manual Transfers</h2>
            <p className="text-[11px] text-slate-400">
              Corporate bank account details displayed to tenants on manual upgrade checkout.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Official BCA Account Number
            </label>
            <input
              type="text"
              value={settings.official_bca_account || ""}
              onChange={(e) => handleChange("official_bca_account", e.target.value)}
              placeholder="8730928172"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Official BCA Account Holder Name
            </label>
            <input
              type="text"
              value={settings.official_bca_holder || ""}
              onChange={(e) => handleChange("official_bca_holder", e.target.value)}
              placeholder="PT RAFA KREASINDO TEKNOLOGI"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Merchant Payout Rules */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Merchant Payout Engine &amp; Tariffs</h2>
            <p className="text-[11px] text-slate-400">
              Configure free withdrawal quotas and administrative disbursement fees.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Free Monthly Withdrawals Quota (per PRO store)
            </label>
            <input
              type="number"
              value={settings.free_withdrawals_per_month || "4"}
              onChange={(e) => handleChange("free_withdrawals_per_month", e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">Number of zero-fee disbursals granted per cycle.</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Standard Disbursal Admin Fee (IDR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
              <input
                type="number"
                value={settings.withdrawal_fee_idr || "4500"}
                onChange={(e) => handleChange("withdrawal_fee_idr", e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Charged on withdrawals exceeding free monthly quota.</p>
          </div>
        </div>
      </div>

      {/* 5. Mabes Telegram Operational Bot */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">Mabes Telegram Realtime Alert Bot</h2>
            <p className="text-[11px] text-slate-400">
              Receive instant alerts on upgrade orders, proofs of payment, and payout requests.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-slate-300">
                Telegram Mabes Group Chat ID
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                Contoh: -1002345678901 atau 123456789
              </span>
            </div>
            <input
              type="text"
              value={settings.telegram_mabes_chat_id || ""}
              onChange={(e) => handleChange("telegram_mabes_chat_id", e.target.value)}
              placeholder="-1002345678901"
              className={`w-full px-3 py-2 bg-slate-950 border rounded-lg text-white font-mono focus:outline-none transition ${
                (settings.telegram_mabes_chat_id || "").toLowerCase().includes("bot")
                  ? "border-amber-500 focus:border-amber-400"
                  : "border-slate-800 focus:border-sky-500"
              }`}
            />
            {(settings.telegram_mabes_chat_id || "").toLowerCase().includes("bot") ? (
              <p className="text-[11px] text-amber-400 mt-1.5 flex items-start gap-1 leading-snug">
                <span>⚠️</span>
                <span>
                  <strong>Perhatian:</strong> Nilai saat ini berupa username bot (<code>{settings.telegram_mabes_chat_id}</code>). Bot tidak bisa mengirim pesan ke dirinya sendiri. Masukkan angka ID pengguna atau ID grup Mabes. Ketik <code>/id</code> ke bot di Telegram untuk mengetahui ID Chat Anda.
                </span>
              </p>
            ) : (
              <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                Ketik <code>/id</code> ke bot Telegram resmi atau tambahkan bot ke grup Mabes untuk mendapatkan ID Chat numerik.
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Telegram Bot Token (from @BotFather)
            </label>
            <input
              type="password"
              value={settings.telegram_mabes_bot_token || ""}
              onChange={(e) => handleChange("telegram_mabes_bot_token", e.target.value)}
              placeholder="123456789:ABCdefGHIjklMNOpqrSTUvwxyz"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono focus:outline-none focus:border-sky-500"
            />
            <p className="text-[11px] text-slate-400 mt-1.5 leading-snug">
              Token resmi dari <code>@BotFather</code>. Webhook otomatis didaftarkan saat disimpan.
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            <span>Webhook destination: </span>
            <code className="text-sky-300 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
              /api/telegram/webhook
            </code>
          </div>

          <button
            type="button"
            disabled={isTestPending || !settings.telegram_mabes_bot_token || !settings.telegram_mabes_chat_id}
            onClick={handleSendTestAlert}
            className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-40 shrink-0"
          >
            {isTestPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Sending Test Alert...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Alert to Mabes Group</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-4 z-20 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>Settings changes apply immediately platform-wide upon saving.</span>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/20 transition disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving Settings...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Configuration
            </>
          )}
        </button>
      </div>
    </form>
  );
}
