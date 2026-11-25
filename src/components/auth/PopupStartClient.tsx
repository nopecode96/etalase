"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { ShieldCheck, Loader2, AlertTriangle } from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";

interface PopupStartClientProps {
  callbackUrl: string;
  isGoogleConfigured: boolean;
}

export function PopupStartClient({
  callbackUrl,
  isGoogleConfigured,
}: PopupStartClientProps) {
  const [connecting, setConnecting] = useState(false);

  // Automatically trigger Google OAuth when configured
  useEffect(() => {
    if (isGoogleConfigured) {
      setConnecting(true);
      const popupCallbackUrl = `/auth/popup-callback?redirect=${encodeURIComponent(
        callbackUrl
      )}`;
      signIn("google", {
        callbackUrl: popupCallbackUrl,
      });
    }
  }, [isGoogleConfigured, callbackUrl]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-6 text-[#1C1917] select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-sm text-center space-y-5">
        {/* Header Branding */}
        <div className="flex justify-center">
          <EtalaseLogo size="md" />
        </div>

        {isGoogleConfigured ? (
          /* Connecting to real Google State */
          <div className="py-6 space-y-4">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center font-bold">
                <Loader2 className="w-6 h-6 animate-spin text-[#D94E28]" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#1C1917]">
                Connecting to Google...
              </h2>
              <p className="text-xs text-[#57534E]">
                Please complete your sign-in in this secure window.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Google OAuth 2.0 Security</span>
            </div>
          </div>
        ) : (
          /* Fail-closed when Google OAuth is not configured */
          <div className="space-y-4 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-bold mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#1C1917]">
                Google Login Tidak Tersedia
              </h2>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Autentikasi Google OAuth belum dikonfigurasi pada server. Silakan hubungi administrator untuk mengaktifkan{" "}
                <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-[11px]">AUTH_GOOGLE_ID</code> dan{" "}
                <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-[11px]">AUTH_GOOGLE_SECRET</code>.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 text-[10px] text-[#78716C]">
          etalase.online &bull; Rafa Kreasindo Teknologi
        </div>
      </div>
    </div>
  );
}
