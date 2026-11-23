"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      <GlobalHeader />
      <div className="py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <ScrollReveal direction="up" delay={50}>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Wrench className="w-3.5 h-3.5 text-[#D94E28]" />
                <span>Free Growth Tools untuk Kreator &amp; Seller SEA</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917]">
                Alat Bantu Gratis untuk Akselerasi Bisnis Anda.
              </h1>
              <p className="text-[#57534E] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Koleksi kalkulator profit dan generator link multi-channel gratis untuk mempercepat penjualan langsung Anda di Asia Tenggara.
              </p>
            </div>
          </ScrollReveal>

          {/* Tool 1: Multi-Channel Chat Link Generator */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3]">
                  Tool #1 &bull; Multi-Channel SEA
                </span>
                <h2 className="text-2xl font-bold text-[#1C1917] mt-3">
                  Direct Chat Order Link Generator
                </h2>
                <p className="text-[#57534E] text-sm mt-1">
                  Buat link chat otomatis (WhatsApp, Zalo, LINE) yang siap dipasang di bio media sosial Anda.
                </p>
              </div>

              <form onSubmit={handleGenerateChatLink} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Pilih Saluran Chat
                    </label>
                    <select
                      value={channel}
                      onChange={(e) => setChannel(e.target.value as any)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                    >
                      <option value="whatsapp">WhatsApp (ID, MY, SG)</option>
                      <option value="zalo">Zalo (Vietnam)</option>
                      <option value="line">LINE (Thailand)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Nomor HP (Contoh: 628123456789)
                    </label>
                    <input
                      type="text"
                      placeholder="628xxxxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Format Pesan Pembuka
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-[#1C1917] text-sm focus:outline-none focus:ring-2 focus:ring-[#D94E28]/20"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#D94E28] hover:bg-[#B83E1D] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs"
                >
                  Generate Link Chat
                </button>
              </form>

              {generatedLink && (
                <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-[#1C1917]">Link Anda Siap Dipakai:</div>
                  <div className="p-3 bg-white border border-[#E7E5E4] rounded-xl text-xs font-mono text-[#D94E28] break-all select-all">
                    {generatedLink}
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Tool 2: Fee Savings Calculator */}
          <ScrollReveal direction="up" delay={150}>
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Tool #2 &bull; Kalkulator Penghematan
                </span>
                <h2 className="text-2xl font-bold text-[#1C1917] mt-3">
                  Kalkulator Potongan Marketplace vs Direct Storefront
                </h2>
                <p className="text-[#57534E] text-sm mt-1">
                  Bandingkan berapa juta rupiah yang bisa Anda hemat tiap bulan dengan direct checkout di etalase.online (0.7% QRIS Instan) vs potongan 10–12% marketplace.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-2">
                    Omset Penjualan Bulanan: <span className="text-[#D94E28] text-base font-bold">Rp {monthlyGmv.toLocaleString("id-ID")}</span>
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="1000000"
                    value={monthlyGmv}
                    onChange={(e) => setMonthlyGmv(Number(e.target.value))}
                    className="w-full accent-[#D94E28] cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 bg-red-50/60 border border-red-200 rounded-2xl">
                    <p className="text-xs text-red-800">Potongan Marketplace (~10%)</p>
                    <p className="text-xl font-bold text-red-700 mt-1">
                      Rp {marketplaceFee.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl">
                    <p className="text-xs text-[#57534E]">Biaya etalase QRIS (0.7%)</p>
                    <p className="text-xl font-bold text-[#1C1917] mt-1">
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

              <div className="pt-4 border-t border-[#E7E5E4] text-center">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center gap-2 bg-[#D94E28] hover:bg-[#B83E1D] text-white font-bold px-8 py-3.5 rounded-xl transition shadow-xs text-sm"
                >
                  <span>Mulai Simpan Profit Anda dengan etalase.online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}
