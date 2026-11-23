"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ShieldCheck } from "lucide-react";

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

function LoginCard() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/onboarding";
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl });
    } catch {
      window.location.href = callbackUrl;
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] shadow-sm p-8 sm:p-10 text-center space-y-6">
      {/* Logo etalase.online */}
      <div className="flex justify-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-[#D94E28] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
            E
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#1C1917]">
            etalase<span className="text-[#D94E28]">.online</span>
          </span>
        </Link>
      </div>

      {/* Judul & Subjudul */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
          Masuk ke Etalase Anda
        </h1>
        <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
          Kelola produk, pesanan WhatsApp, dan analitik tokomu.
        </p>
      </div>

      {/* 1 Tombol Utama: Masuk dengan Google */}
      <div className="pt-2 space-y-3">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl border border-[#E7E5E4] bg-white hover:bg-[#FAF8F5] font-semibold text-[#1C1917] shadow-xs flex items-center justify-center gap-3 transition-all hover:border-[#D94E28]/40 hover:shadow-sm cursor-pointer disabled:opacity-60"
        >
          <GoogleIcon />
          <span className="text-sm">
            {loading ? "Menghubungkan..." : "Masuk dengan Google"}
          </span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-[#57534E] font-medium pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Keamanan autentikasi OAuth Google resmi</span>
        </div>
      </div>

      {/* Tautan Bawah: Belum punya etalase? Daftar Gratis */}
      <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-center gap-2 text-xs text-[#57534E]">
        <span>Belum punya etalase?</span>
        <Link
          href="/register"
          className="font-bold text-[#D94E28] hover:text-[#B83E1D] hover:underline"
        >
          Daftar Gratis
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center px-4 py-12 selection:bg-[#D94E28] selection:text-white">
      <Suspense
        fallback={
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E7E5E4] p-10 text-center animate-pulse text-[#57534E] text-xs">
            Memuat formulir masuk...
          </div>
        }
      >
        <LoginCard />
      </Suspense>
    </main>
  );
}
