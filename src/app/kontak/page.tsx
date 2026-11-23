"use client";

import React from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  MessageCircle,
  Mail,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function KontakPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <section className="pt-16 pb-12 px-4 sm:px-6 text-center max-w-3xl mx-auto">
        <ScrollReveal direction="up" delay={50}>
          <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Respon Cepat &bull; Tim Resmi Indonesia</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
            Kami Siap Membantu Bisnis Anda Berkembang.
          </h1>
          <p className="text-[#57534E] text-base sm:text-lg leading-relaxed">
            Punya pertanyaan teknis, butuh bantuan setup terima beres, atau ingin kerja sama kemitraan? Hubungi saluran resmi kami di bawah ini.
          </p>
        </ScrollReveal>
      </section>

      <section className="pb-24 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: WhatsApp CS Utama & Konsultasi DFY */}
          <div className="bg-white border-2 border-[#D94E28] rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] px-3 py-1 rounded-full">
                Jalur Cepat WhatsApp
              </span>

              <h2 className="text-2xl font-bold text-[#1C1917]">
                Customer Support &amp; Konsultasi DFY
              </h2>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Tanya langsung ke tim customer service kami. Baik kendala akun, bantuan setting domain, atau memesan paket Terima Beres (DFY).
              </p>

              <div className="p-4 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl space-y-2 text-xs text-[#57534E]">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <Clock className="w-4 h-4 text-[#D94E28]" />
                  <span>Jam Operasional Layanan Chat:</span>
                </div>
                <div className="pl-6 space-y-0.5">
                  <div>Senin - Sabtu: <strong>08:00 - 21:00 WIB</strong></div>
                  <div>Minggu &amp; Libur Nasional: <strong>10:00 - 17:00 WIB</strong></div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281288003005?text=Halo%20tim%20etalase.online,%20saya%20ingin%20konsultasi"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#D94E28] hover:bg-[#B83E1D] text-white py-3.5 rounded-xl font-bold text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Sekarang (+62 812-8800-3005)</span>
            </a>
          </div>

          {/* Card 2: Saluran Email Resmi Per Divisi */}
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-10 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#57534E] bg-stone-100 px-3 py-1 rounded-full">
                Email Resmi Per Divisi
              </span>

              <h2 className="text-2xl font-bold text-[#1C1917]">
                Kirim Surat Elektronik
              </h2>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Untuk korespondensi resmi, kerja sama institusi, dan urusan penagihan resmi:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href="mailto:halo@etalase.online"
                  className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#D94E28]" />
                    <div>
                      <div className="font-bold text-[#1C1917]">halo@etalase.online</div>
                      <div className="text-[11px] text-[#57534E]">Pertanyaan Umum &amp; Akun</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-[#D94E28] transition" />
                </a>

                <a
                  href="mailto:sales@etalase.online"
                  className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-bold text-[#1C1917]">sales@etalase.online</div>
                      <div className="text-[11px] text-[#57534E]">Kemitraan Komunitas &amp; Enterprise</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-blue-600 transition" />
                </a>

                <a
                  href="mailto:billing@etalase.online"
                  className="p-3.5 bg-[#FAF8F5] border border-[#E7E5E4] rounded-2xl flex items-center justify-between text-xs hover:border-[#D94E28] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-[#1C1917]">billing@etalase.online</div>
                      <div className="text-[11px] text-[#57534E]">Faktur Pajak &amp; Verifikasi Pembayaran</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-300 group-hover:text-emerald-600 transition" />
                </a>
              </div>
            </div>

            <div className="text-[11px] text-[#57534E] pt-4 border-t border-[#E7E5E4]">
              Alamat Kantor Operasional: Bandung Digital Hub, Jawa Barat, Indonesia.
            </div>
          </div>
        </div>
      </section>

      <GlobalFooter />
    </div>
  );
}
