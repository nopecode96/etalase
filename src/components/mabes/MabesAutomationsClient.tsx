"use client";

import React, { useState, useTransition } from "react";
import {
  Cpu,
  Send,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Loader2,
  Terminal,
  Activity,
  Server,
  Layers,
  ShieldCheck,
  Bot,
} from "lucide-react";
import {
  actionTriggerTestEvent,
  actionSendTestTelegramAlert,
  actionGetTelegramWebhookStatus,
} from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";
import { formatDate } from "@/lib/core/formatters";

interface AutomationLogItem {
  id: string;
  event: string;
  channel: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  payload?: any;
  response?: string | null;
  error?: string | null;
  createdAt: string;
}

interface MabesAutomationsClientProps {
  initialLogs: AutomationLogItem[];
  n8nBaseUrl: string;
  telegramChatId?: string | null;
  hasTelegramToken: boolean;
}

const TEST_EVENTS = [
  {
    event: "order.paid",
    label: "Customer Order Settled (order.paid)",
    desc: "Triggers WhatsApp invoice PDF generator & merchant push alert",
    sample: { orderCode: "ETL-TEST-9901", amount: 150000, buyerWhatsapp: "6281299998888" },
  },
  {
    event: "tier.upgraded",
    label: "Tenant Plan Upgraded (tier.upgraded)",
    desc: "Triggers welcome PRO onboarding drip sequence & Telegram alert",
    sample: { storeSlug: "testmerchant", planCode: "PRO", amount: 49000 },
  },
  {
    event: "tenant.created",
    label: "New Store Registered (tenant.created)",
    desc: "Triggers Ops-01 onboarding workflow & WhatsApp greeting",
    sample: { storeSlug: "kopibaru", storeName: "Kopi Baru", ownerId: "usr_test" },
  },
  {
    event: "withdrawal.requested",
    label: "Payout Requested (withdrawal.requested)",
    desc: "Triggers instant finance alert for manual bank disbursal",
    sample: { storeSlug: "kopibaru", amount: 500000, destination: "BCA 1234567890" },
  },
] as const;

export function MabesAutomationsClient({
  initialLogs,
  n8nBaseUrl,
  telegramChatId,
  hasTelegramToken,
}: MabesAutomationsClientProps) {
  const [logs, setLogs] = useState<AutomationLogItem[]>(initialLogs);
  const [selectedEvent, setSelectedEvent] = useState<string>("order.paid");
  const [isPending, startTransition] = useTransition();
  const [isTelegramPending, startTelegramTransition] = useTransition();
  const [isCheckingWebhook, startCheckingWebhook] = useTransition();
  const [webhookStatus, setWebhookStatus] = useState<any>(null);

  const isChatIdInvalid = Boolean(
    telegramChatId &&
      ((telegramChatId.toLowerCase().includes("bot") && !telegramChatId.startsWith("-100")) ||
        !/^[-0-9]+$/.test(telegramChatId))
  );
  const isChatIdConfigured = Boolean(telegramChatId && !isChatIdInvalid);

  const handleCheckWebhook = () => {
    startCheckingWebhook(async () => {
      const res = await actionGetTelegramWebhookStatus();
      if (res.success && res.data) {
        setWebhookStatus(res.data);
        if (res.data.success) {
          showToast("Webhook info retrieved from Telegram API!", "success");
        } else {
          showToast(res.data.description || "Webhook status alert.", "info");
        }
      } else {
        const err = !res.success ? res.error : "Failed to check webhook status.";
        showToast(err, "error");
      }
    });
  };

  const handleDispatchTest = (e: React.FormEvent) => {
    e.preventDefault();
    const config = TEST_EVENTS.find((ev) => ev.event === selectedEvent);
    if (!config) return;

    startTransition(async () => {
      const res = await actionTriggerTestEvent(config.event, config.sample);
      if (res.success) {
        if (res.data) setLogs((prev) => [res.data, ...prev]);
        showToast(`Dispatched test event: ${config.event}`, "success");
      } else {
        showToast(res.error || "Failed to dispatch event.", "error");
      }
    });
  };

  const handleTestTelegram = () => {
    startTelegramTransition(async () => {
      const res = await actionSendTestTelegramAlert();
      if (res.success) {
        showToast("Test ping successfully delivered to Mabes Telegram group!", "success");
        // refresh local logs list
        const newLog: AutomationLogItem = {
          id: `temp-${Date.now()}`,
          event: "telegram.test_alert",
          channel: "TELEGRAM",
          status: "SUCCESS",
          response: "Delivered to chat",
          createdAt: new Date().toISOString(),
        };
        setLogs((prev) => [newLog, ...prev]);
      } else {
        showToast(res.error || "Failed to deliver Telegram test alert.", "error");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* 4 Health & Service Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. n8n Node Service */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Workflow Engine
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-sm font-bold text-white">n8n Automation</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 truncate">
            {n8nBaseUrl}
          </p>
        </div>

        {/* 2. Borderpay QRIS Webhook */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              QRIS Gateway
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ACTIVE
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="text-sm font-bold text-white">Borderpay Callback</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 truncate">
            /pay/qris/callback
          </p>
        </div>

        {/* 3. PayPal Webhook */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Global Gateway
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              READY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="text-sm font-bold text-white">PayPal IPN Webhook</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 truncate">
            /paypal/webhook
          </p>
        </div>

        {/* 4. Telegram Alert Bot */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Ops Channel
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                hasTelegramToken
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
            >
              {hasTelegramToken ? "CONFIGURED" : "TOKEN NEEDED"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-sky-400 shrink-0" />
            <span className="text-sm font-bold text-white">Mabes Telegram Bot</span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 truncate">
            {telegramChatId ? `Chat: ${telegramChatId}` : "No Chat ID"}
          </p>
        </div>
      </div>

      {/* Interactive Automation Test Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: n8n Dispatcher Tester */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Play className="w-4 h-4 fill-indigo-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">n8n Event Dispatch Simulator</h2>
                <p className="text-[11px] text-slate-400">
                  Emit live payloads to test downstream WhatsApp, drip marketing, and billing triggers.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleDispatchTest} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Select Platform Automation Trigger
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TEST_EVENTS.map((ev) => (
                  <button
                    key={ev.event}
                    type="button"
                    onClick={() => setSelectedEvent(ev.event)}
                    className={`p-3 rounded-lg border text-left transition ${
                      selectedEvent === ev.event
                        ? "bg-indigo-500/15 border-indigo-500 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="font-semibold block text-white">{ev.label}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{ev.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-[11px]">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                Sample Payload to be dispatched
              </span>
              <pre className="text-indigo-300 overflow-x-auto">
                {JSON.stringify(
                  TEST_EVENTS.find((e) => e.event === selectedEvent)?.sample,
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="flex items-center justify-end pt-1">
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-sm transition disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Dispatch to n8n Webhook
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Telegram Bot Quick Tester */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white">Telegram Mabes Alert</h2>
                <p className="text-[11px] text-slate-400">Direct bot broadcast test</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sends an immediate test message through your configured Telegram Bot to verify that operations staff receives instant mobile notifications when upgrades and payouts occur.
            </p>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] space-y-1.5 font-mono">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 block text-[10px] uppercase">Target Chat ID</span>
                {isChatIdConfigured ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    CONFIGURED
                  </span>
                ) : isChatIdInvalid ? (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    INVALID CHAT ID
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    NOT CONFIGURED
                  </span>
                )}
              </div>
              <span className={`font-semibold block ${isChatIdInvalid ? "text-rose-400" : "text-white"}`}>
                {telegramChatId || "Not configured"}
              </span>
              {isChatIdInvalid && (
                <p className="text-[10px] text-rose-400 font-sans leading-tight">
                  Chat ID cannot be a bot username. Use numeric user ID or group ID (e.g. -100xxxxxxxxxx).
                </p>
              )}
            </div>

            {/* Webhook Diagnostic Card */}
            {webhookStatus && (
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] space-y-1 font-mono">
                <div className="flex items-center justify-between text-[10px] uppercase text-slate-400">
                  <span>Webhook Info</span>
                  <span className={webhookStatus.success ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {webhookStatus.success ? "ACTIVE" : "ERROR"}
                  </span>
                </div>
                <div className="truncate text-slate-300">
                  <span className="text-slate-500">URL:</span> {webhookStatus.url || "None"}
                </div>
                <div className="text-slate-300">
                  <span className="text-slate-500">Pending:</span> {webhookStatus.pendingUpdateCount ?? 0}
                </div>
                {webhookStatus.lastErrorMessage && (
                  <div className="text-rose-400 font-sans text-[10px] leading-tight">
                    Err: {webhookStatus.lastErrorMessage} ({webhookStatus.lastErrorDate})
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              disabled={isTelegramPending || !hasTelegramToken || !isChatIdConfigured}
              onClick={handleTestTelegram}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
            >
              {isTelegramPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Sending Ping...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Send Instant Test Ping
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isCheckingWebhook || !hasTelegramToken}
              onClick={handleCheckWebhook}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700/80 transition disabled:opacity-50"
            >
              {isCheckingWebhook ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Checking Webhook...
                </>
              ) : (
                <>
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Check Webhook Status
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Live Automation Audit Logs */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm space-y-3">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Automation &amp; Webhook Audit Stream
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {logs.length} logged events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-4 py-3">Event Name</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payload Preview</th>
                <th className="px-4 py-3">Response / Error</th>
                <th className="px-4 py-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500 font-sans">
                    <Activity className="w-8 h-8 mx-auto mb-2 text-slate-600 stroke-[1.5]" />
                    <p className="font-medium text-slate-400">No automation events recorded yet</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Trigger a test dispatch above or perform actions in tenant/billing.
                    </p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="px-4 py-3 text-indigo-300 font-bold">
                      {log.event}
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {log.channel}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          log.status === "SUCCESS"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        {log.status === "SUCCESS" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {log.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate text-[10px]">
                      {log.payload ? JSON.stringify(log.payload) : "—"}
                    </td>

                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate text-[10px]">
                      {log.error ? (
                        <span className="text-rose-400 font-medium">{log.error}</span>
                      ) : (
                        log.response || "OK"
                      )}
                    </td>

                    <td className="px-4 py-3 text-right text-slate-500 text-[10px]">
                      {formatDate(log.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
