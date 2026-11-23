"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, AlertCircle, Loader2 } from "lucide-react";
import { actionCheckSlug, actionCreateStore } from "./actions";
import { showServiceResultToast } from "@/components/ui/GlobalToast";

export default function OnboardingPage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [slugMessage, setSlugMessage] = useState("");
  const [templateId, setTemplateId] = useState("clean-minimal");
  const [loading, setLoading] = useState(false);

  const handleSlugChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setSlug(raw);

    if (raw.trim().length < 3) {
      setSlugStatus("idle");
      setSlugMessage("");
      return;
    }

    setSlugStatus("checking");
    const check = await actionCheckSlug(raw);
    if (check.success && check.data.available) {
      setSlugStatus("available");
      setSlugMessage(`✓ ${check.data.slug}.etalase.online tersedia!`);
    } else {
      setSlugStatus("unavailable");
      setSlugMessage(!check.success ? check.error : "Slug tidak tersedia");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !slug) return;

    setLoading(true);
    const result = await actionCreateStore({
      name: storeName,
      slug,
      templateId,
    });

    setLoading(false);
    showServiceResultToast(result);

    if (result.success && result.data) {
      const createdSlug = (result.data as { slug: string }).slug;
      router.push(`/${createdSlug}/admin`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 mb-6 font-medium transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            etalase<span className="text-blue-600">.online</span>
          </span>
        </div>

        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          Klaim Alamat Etalase Anda
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Hanya butuh nama toko dan alamat URL untuk mulai jualan.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-3xl sm:px-10">
          {/* Google Connect Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => alert("Fitur Google Connect aktif. Silakan hubungkan client ID Google di .env")}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl shadow-sm text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
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
              <span>Masuk dengan Google (1-Klik)</span>
            </button>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-400">Atau lengkapi info toko</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nama Toko / Brand
              </label>
              <input
                type="text"
                required
                value={storeName}
                onChange={(e) => {
                  setStoreName(e.target.value);
                  if (!slug) {
                    handleSlugChange({
                      target: { value: e.target.value },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
                placeholder="Misal: Studio Rafa, Warung Kopi Senja"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Alamat URL Etalase
              </label>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={handleSlugChange}
                  placeholder="namatoko"
                  className="flex-1 px-3.5 py-2.5 text-sm focus:outline-none"
                />
                <span className="bg-slate-100 text-slate-500 text-xs px-3 py-2.5 flex items-center border-l border-slate-200 font-mono">
                  .etalase.online
                </span>
              </div>
              {slugStatus !== "idle" && (
                <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                  {slugStatus === "checking" && (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Memeriksa ketersediaan...
                    </span>
                  )}
                  {slugStatus === "available" && (
                    <span className="text-emerald-600 flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" /> {slugMessage}
                    </span>
                  )}
                  {slugStatus === "unavailable" && (
                    <span className="text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" /> {slugMessage}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilih Template Dasar
              </label>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {[
                  { id: "clean-minimal", label: "Clean" },
                  { id: "classic-dark", label: "Dark" },
                  { id: "catalog-grid", label: "Grid" },
                ].map((tpl) => (
                  <button
                    type="button"
                    key={tpl.id}
                    onClick={() => setTemplateId(tpl.id)}
                    className={`p-2.5 rounded-xl border font-semibold transition ${
                      templateId === tpl.id
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || slugStatus === "unavailable"}
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Buka Etalase Sekarang"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
