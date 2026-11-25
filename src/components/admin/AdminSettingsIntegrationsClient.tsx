"use client";

import React, { useState, useTransition } from "react";
import {
  Send,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { actionUpdateTelegramIntegration } from "@/app/admin/actions";
import { showToast } from "@/components/ui/GlobalToast";

interface AdminSettingsIntegrationsClientProps {
  store: any;
  tier: "FREE" | "PRO" | "DFY";
  platformBotUsername?: string;
}

export function AdminSettingsIntegrationsClient({
  store,
  tier,
  platformBotUsername = "etalaseonline_bot",
}: AdminSettingsIntegrationsClientProps) {
  const [isPending, startTransition] = useTransition();

  const telegramConfig =
    typeof store.appearanceConfig === "object" && store.appearanceConfig?.telegramIntegration
      ? store.appearanceConfig.telegramIntegration
      : null;

  const [botToken, setBotToken] = useState(telegramConfig?.botToken || "");
  const [chatId, setChatId] = useState(telegramConfig?.chatId || "");
  const isConnected = Boolean(telegramConfig?.isConnected);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await actionUpdateTelegramIntegration({
        storeId: store.id,
        telegramToken: botToken,
        telegramChatId: chatId,
      });

      if (res.success) {
        showToast("Telegram integration saved successfully!", "success");
      } else {
        showToast(res.error || "Failed to save Telegram credentials", "error");
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in w-full">
      <div className="pb-6 border-b border-[#E7E5E4]">
        <h1 className="text-2xl font-bold tracking-tight text-[#1C1917]">
          Integrations
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] mt-1">
          Connect automated push channels to receive immediate order and payment notifications.
        </p>
      </div>

      {/* Telegram Card */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#1C1917]">
                  Telegram Order Bot
                </h2>
                {isConnected ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
                    Not Configured
                  </span>
                )}
              </div>
              <p className="text-xs text-[#57534E] mt-0.5">
                Instant smartphone push notifications on every new QRIS settlement & chat checkout.
              </p>
            </div>
          </div>
        </div>

        {/* 1-Click Telegram Connect (Recommended) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50/40 border border-sky-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-950 uppercase tracking-wide">
                1-Click Instant Connect (Recommended)
              </span>
              <span className="text-[10px] font-bold bg-sky-200/60 text-sky-800 px-1.5 py-0.5 rounded">
                Official Bot
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed max-w-lg">
              {isConnected
                ? `Your store is connected to Telegram ${telegramConfig?.telegramUser || "Active"} (Chat ID: ${chatId}). You will receive instant notifications for every new paid order.`
                : `Click the button on the right to open our official Telegram Bot (@${platformBotUsername}) and automatically link your store in 1 click—no manual bot setup required.`}
            </p>
          </div>

          <a
            href={`https://t.me/${platformBotUsername}?start=bind_${store.id}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>{isConnected ? "Re-link Telegram" : "Connect Telegram (1-Click)"}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Advanced Manual Custom Bot Option */}
        <div className="pt-2 border-t border-[#E7E5E4] space-y-4">
          <span className="text-xs font-bold text-[#1C1917] block">
            Or Use Custom Dedicated Bot (Advanced)
          </span>

          <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Bot Token *
              </label>
              <input
                type="password"
                placeholder="8112345678:AAH..."
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-mono focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#1C1917]">
                Chat ID / Channel ID *
              </label>
              <input
                type="text"
                placeholder="123456789 or -100..."
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E7E5E4] font-mono focus:border-[#D94E28] focus:ring-1 focus:ring-[#D94E28] outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
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
              <span>Save Telegram Credentials</span>
            </button>
          </div>
        </form>
      </div>

        {/* Telegram 4-step setup guide */}
        <div className="p-5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-1.5">
            <BellRing className="w-3.5 h-3.5 text-[#D94E28]" />
            <span>How to Setup Your Telegram Bot (2 Minutes):</span>
          </h3>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-[#57534E] leading-relaxed">
            <li>
              Open <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-sky-600 font-semibold hover:underline">@BotFather</a> in Telegram and type <code className="bg-stone-200 px-1 py-0.5 rounded text-[11px] font-mono">/newbot</code>.
            </li>
            <li>
              Follow instructions to name your bot and copy the <strong>HTTP API Token</strong> into the Bot Token field above.
            </li>
            <li>
              Start a chat with your newly created bot and click <strong>START</strong>.
            </li>
            <li>
              Forward any message from your bot to <a href="https://t.me/userinfobot" target="_blank" rel="noreferrer" className="text-sky-600 font-semibold hover:underline">@userinfobot</a> to discover your numerical <strong>Id (Chat ID)</strong>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
