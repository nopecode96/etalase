"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PlayCircle, Lock, CheckCircle2, Phone, ShieldCheck, ArrowLeft } from "lucide-react";
import { CourseAccessData, CourseModuleItem } from "@/services/creator-features";
import { actionVerifyCourseAccess } from "@/lib/actions/creator-actions";

interface LearnClientProps {
  storeSlug: string;
  productSlug: string;
  initialData: CourseAccessData;
}

export default function LearnClient({ storeSlug, productSlug, initialData }: LearnClientProps) {
  const [data, setData] = useState<CourseAccessData>(initialData);
  const [activeModule, setActiveModule] = useState<CourseModuleItem>(
    initialData.modules[0] || null
  );
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleVerifyAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");

    try {
      const res = await actionVerifyCourseAccess({
        storeSlug,
        productSlug,
        buyerWhatsapp: whatsapp,
      });

      if (res.success && res.data?.hasAccess) {
        setData(res.data);
        if (res.data.modules.length > 0) {
          setActiveModule(res.data.modules[0]);
        }
      } else {
        setAuthError("Nomor WhatsApp belum terdaftar sebagai pembeli lunas untuk kursus ini.");
      }
    } catch {
      setAuthError("Gagal memverifikasi akses. Pastikan nomor WhatsApp benar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-4 py-3 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href={`/${storeSlug}`}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Toko</span>
          </Link>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Member Area E-Learning</span>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative flex items-center justify-center">
            {activeModule?.videoUrl ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-center">
                <PlayCircle className="w-16 h-16 text-emerald-500 animate-pulse mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">{activeModule.title}</h3>
                <p className="text-xs text-slate-400">Durasi Video: {activeModule.duration}</p>
                <div className="mt-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-full">
                  Materi Sedang Aktif
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900/80">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Materi Video Terkunci</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Masukkan nomor WhatsApp pembeli Anda di bawah untuk membuka seluruh kurikulum materi kursus ini.
                </p>
                <Link
                  href={`/${storeSlug}/checkout/${productSlug}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
                >
                  Beli Kursus untuk Akses Penuh
                </Link>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">{data.productTitle}</h1>
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              {data.description || "Pelajari materi langkah demi langkah untuk memaksimalkan hasil Anda."}
            </p>
          </div>

          {/* Access verification card if not yet unlocked */}
          {!data.hasAccess && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verifikasi Kepemilikan Kursus</span>
              </h4>
              <p className="text-xs text-slate-400">
                Sudah bayar via Borderpay QRIS atau PayPal? Masukkan nomor WhatsApp yang digunakan saat checkout:
              </p>
              <form onSubmit={handleVerifyAccess} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="08123456789 atau 628..."
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-white text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50"
                >
                  {loading ? "Mengecek..." : "Buka Akses"}
                </button>
              </form>
              {authError && <p className="text-xs text-rose-400 font-medium">{authError}</p>}
            </div>
          )}
        </div>

        {/* Curriculum Column */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 h-fit space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Daftar Materi Modul</h3>
            <span className="text-xs font-mono text-slate-400">{data.modules.length} Pelajaran</span>
          </div>

          <div className="space-y-2">
            {data.modules.length === 0 && (
              <p className="text-xs text-slate-400 py-4 text-center">
                Belum ada modul video yang ditambahkan oleh kreator.
              </p>
            )}
            {data.modules.map((mod, idx) => {
              const isSelected = activeModule?.id === mod.id;
              const isPlayable = data.hasAccess || mod.isFreePreview;

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300"
                      : "bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isPlayable ? (
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-400" : "text-slate-500"}`}
                      />
                    ) : (
                      <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-medium leading-snug">{mod.title}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{mod.duration}</div>
                    </div>
                  </div>

                  {mod.isFreePreview && !data.hasAccess && (
                    <span className="text-[9px] font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                      PREVIEW
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
