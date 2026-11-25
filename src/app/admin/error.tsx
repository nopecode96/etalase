"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[AdminError]", error);
    // Auto-recover from stale Next.js chunk hashes after a fresh deploy
    if (
      error?.name === "ChunkLoadError" ||
      error?.message?.includes("Loading chunk") ||
      error?.message?.includes("Failed to fetch dynamically imported module")
    ) {
      const key = "etalase_chunk_reload";
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#E7E5E4] rounded-3xl p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-[#1C1917]">
          Halaman Perlu Dimuat Ulang
        </h2>
        <p className="text-xs text-[#57534E] leading-relaxed">
          Terjadi pembaruan sistem atau kendala pemuatan skrip di browser. Silakan muat ulang halaman untuk melanjutkan.
        </p>
        {error?.message && (
          <p className="text-[11px] font-mono bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-stone-600 break-words">
            {error.message}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white text-xs font-bold transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Muat Ulang Halaman</span>
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E7E5E4] bg-white hover:bg-stone-50 text-[#1C1917] text-xs font-semibold transition cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    </div>
  );
}
