"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, Mail, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { actionMabesLogin } from "@/app/mabes/actions";
import { showToast } from "@/components/ui/GlobalToast";

export function MabesLoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("superadmin@etalase.online");
  const [password, setPassword] = useState("Lifecode96");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      const res = await actionMabesLogin({ email, password });
      if (res.success && res.data) {
        showToast("Authenticated as Mabes Operator", "success");
        router.push(res.data.redirectUrl);
        router.refresh();
      } else {
        const err = !res.success ? res.error : "Failed to sign in";
        setErrorMessage(err);
        showToast(err, "error");
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 selection:bg-rose-500 selection:text-white">
      {/* Background radial gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-rose-500 shadow-inner">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              Mabes Console &bull; Internal Only
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Platform Headquarters
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Rafa Kreasindo Teknologi &bull; SaaS Operations
            </p>
          </div>
        </div>

        {/* Error notification if any */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@etalase.online"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Enter Mabes Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security watermark footer */}
        <div className="pt-2 border-t border-slate-800 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>Strict Access Control &bull; Audit Trail Logged</span>
        </div>
      </div>
    </div>
  );
}
