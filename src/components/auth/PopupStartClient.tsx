"use client";

import React, { useEffect, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import {
  ShieldCheck,
  Loader2,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { EtalaseLogo } from "@/components/brand/EtalaseLogo";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

interface PopupStartClientProps {
  callbackUrl: string;
  isGoogleConfigured: boolean;
}

export function PopupStartClient({
  callbackUrl,
  isGoogleConfigured,
}: PopupStartClientProps) {
  const [connecting, setConnecting] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isPendingDemo, startDemoTransition] = useTransition();

  // If Google is properly configured with a real Client ID, automatically trigger Google OAuth
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

  // Handle Demo / Sandbox login fallback when Google Cloud keys are not yet inserted
  const handleDemoLogin = () => {
    startDemoTransition(async () => {
      try {
        const res = await signIn("tenant-demo", {
          redirect: false,
          email: "demo.merchant@etalase.online",
          name: "Demo Merchant",
        });

        if (res?.ok || !res?.error) {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(
              { type: "ETALASE_AUTH_SUCCESS", url: callbackUrl },
              window.location.origin
            );
          }
          setTimeout(() => {
            window.close();
          }, 300);
        }
      } catch (err) {
        console.error("Demo login error:", err);
      }
    });
  };

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
          /* Unconfigured Google Credentials Safe Fallback (Prevents 400 Error) */
          <div className="space-y-4 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mx-auto">
              <GoogleIcon />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>Google OAuth Setup Mode</span>
              </div>
              <h2 className="text-base font-bold text-[#1C1917] pt-1">
                Google Client ID Belum Dikonfigurasi
              </h2>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Untuk mencegah error 400 dari Google, Anda dapat langsung masuk dengan <strong>Akun Uji Coba (Demo Merchant)</strong> atau memasukkan Google Client ID resmi ke file <code className="font-mono bg-stone-100 px-1 py-0.5 rounded text-[11px]">.env</code>.
              </p>
            </div>

            {/* 1-Click Sandbox Test Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={isPendingDemo}
              className="w-full py-3 px-4 rounded-xl bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition disabled:opacity-60 cursor-pointer"
            >
              {isPendingDemo ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>Masuk dengan Akun Uji Coba (1-Click)</span>
            </button>

            {/* Setup Instructions Accordion */}
            <div className="text-left border border-[#E7E5E4] rounded-2xl overflow-hidden bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="w-full p-3 text-xs font-semibold text-[#1C1917] flex items-center justify-between hover:bg-stone-100 transition"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#D94E28]" />
                  <span>Cara Pasang Google OAuth Resmi</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#78716C] transition-transform ${
                    showGuide ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showGuide && (
                <div className="p-3.5 pt-0 text-[11px] text-[#57534E] space-y-2 border-t border-[#E7E5E4] bg-white">
                  <p>1. Buka <strong>Google Cloud Console</strong> &rarr; Credentials.</p>
                  <p>2. Buat <strong>OAuth 2.0 Client ID</strong> (Web Application).</p>
                  <p>3. Masukkan <strong>Authorized redirect URIs</strong>:</p>
                  <code className="block bg-stone-100 p-1.5 rounded font-mono text-[10px] break-all text-[#D94E28]">
                    https://etalase.online/api/auth/callback/google
                  </code>
                  <p>4. Simpan ke <code className="font-mono text-stone-800">.env</code>:</p>
                  <pre className="bg-stone-900 text-stone-100 p-2 rounded text-[10px] font-mono overflow-x-auto">
{`AUTH_GOOGLE_ID="your-client-id"
AUTH_GOOGLE_SECRET="your-client-secret"`}
                  </pre>
                </div>
              )}
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
