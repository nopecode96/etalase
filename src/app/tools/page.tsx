"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketingNavbar } from "@/components/layout/MarketingNavbar";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Wrench, ArrowRight, MessageCircle, DollarSign, Sparkles } from "lucide-react";

export default function FreeToolsPage() {
  // Tool 1: Chat Link Generator
  const [channel, setChannel] = useState<"whatsapp" | "zalo" | "line">("whatsapp");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("Halo, saya ingin bertanya tentang produk...");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateChatLink = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    let url = "";

    if (channel === "whatsapp") {
      url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    } else if (channel === "zalo") {
      url = `https://zalo.me/${cleanPhone}`;
    } else {
      url = `https://line.me/ti/p/~${phone}`;
    }

    setGeneratedLink(url);
  };

  // Tool 2: Fee Savings Calculator
  const [monthlyGmv, setMonthlyGmv] = useState(10000000); // 10 juta IDR default
  const marketplaceFee = monthlyGmv * 0.10; // 10% average Shopee/TikTok
  const etalaseBorderpayFee = monthlyGmv * 0.007; // 0.7% QRIS standard
  const estimatedSavings = marketplaceFee - etalaseBorderpayFee;

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 flex flex-col">
      <MarketingNavbar />
      <div className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <ScrollReveal direction="up" delay={50}>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>Free Growth Tools untuk Kreator &amp; Seller SEA</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
                Alat Bantu Gratis untuk Akselerasi Bisnis Anda.
              </h1>
              <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Koleksi kalkulator profit dan generator link multi-channel gratis untuk mempercepat penjualan langsung Anda di Asia Tenggara.
              </p>
            </div>
          </ScrollReveal>

          {/* Tool 1: Multi-Channel Chat Link Generator */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Tool #1 • Multi-Channel SEA
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3">
                  Direct Chat Order Link Generator
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Buat link chat otomatis (WhatsApp, Zalo, LINE) yang siap dipasang di bio media sosial Anda.
                </p>
              </div>

              <form onSubmit={handleGenerateChatLink} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Pilih Saluran Chat
                    </label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="whatsapp">WhatsApp (ID, MY, SG)</option>
                      <option value="zalo">Zalo (Vietnam)</option>
                      <option value="line">LINE (Thailand)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Nomor HP (Contoh: 628123456789)
                    </label>
                    <input
                      type="text"
                      placeholder="628xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Draf Pesan Otomatis Pembeli
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition shadow-sm"
                >
                  Generate Link Sekarang
                </button>
              </form>

              {generatedLink && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <p className="text-xs text-slate-600 font-medium">Link Siap Pakai:</p>
                  <div className="flex items-center justify-between gap-2 overflow-hidden">
                    <code className="text-blue-600 text-sm truncate font-mono">{generatedLink}</code>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(generatedLink)}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-800 shrink-0 shadow-xs"
                    >
                      Salin Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Tool 2: Fee Savings Calculator */}
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Tool #2 • Kalkulator Penghematan
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-3">
                  Kalkulator Potongan Marketplace vs Direct Storefront
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Bandingkan berapa juta rupiah yang bisa Anda hemat tiap bulan dengan direct checkout di etalase.online (0.7% QRIS Instan) vs potongan 10–12% marketplace.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Omset Penjualan Bulanan: <span className="text-blue-600 text-base">Rp {monthlyGmv.toLocaleString("id-ID")}</span>
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="1000000"
                    value={monthlyGmv}
                    onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                    <p className="text-xs text-rose-800">Potongan Marketplace (~10%)</p>
                    <p className="text-xl font-bold text-rose-700 mt-1">
                      Rp {marketplaceFee.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <p className="text-xs text-slate-600">Biaya etalase QRIS (0.7%)</p>
                    <p className="text-xl font-bold text-slate-900 mt-1">
                      Rp {etalaseBorderpayFee.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <p className="text-xs text-emerald-800 font-semibold">Uang yang Anda Hemat:</p>
                    <p className="text-2xl font-black text-emerald-700 mt-1">
                      Rp {estimatedSavings.toLocaleString("id-ID")} /bln
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-center">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl transition shadow-sm text-sm"
                >
                  <span>Mulai Simpan Profit Anda dengan etalase.online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <MarketingFooter />
    </div>
  );
}
