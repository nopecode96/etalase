"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Saya gaptek dan tidak paham komputer, apakah dibantu?",
      a: "Tentu saja! Anda tidak perlu mengerti koding atau teknis rumit. Cukup kirimkan foto produk, daftar harga, dan nomor WhatsApp via obrolan chat. Tim kami yang akan menyiapkan seluruh isi website Anda dari awal sampai siap jualan.",
    },
    {
      q: "Apakah nanti saya bisa mengganti harga atau foto unit sendiri?",
      a: "Sangat bisa. Anda akan mendapatkan akses ke halaman dasbor khusus yang sangat mudah digunakan langsung dari handphone. Mengubah harga atau menambah foto baru semudah membuat status di media sosial. Selain itu, Anda juga bisa meminta bantuan tim kami untuk update materi berkala.",
    },
    {
      q: "Bagaimana proses perpanjangannya di tahun berikutnya?",
      a: "Sangat terjangkau, cukup Rp 1.700.000 / tahun (hanya sekitar Rp 140 ribuan per bulan). Biaya ini mencakup perpanjangan otomatis nama domain resmi Anda (.com / .id), pemeliharaan sistem agar selalu online, penyimpanan data kontak prospek tanpa batas, dan bantuan update konten berkala.",
    },
    {
      q: "Apakah ada potongan komisi dari setiap penjualan saya?",
      a: "Tidak ada potongan sepeser pun. Kami bukan marketplace atau platform perantara. 100% hasil penjualan dan keuntungan transaksi adalah milik Anda seutuhnya.",
    },
    {
      q: "Berapa lama proses pembuatan website sampai online?",
      a: "Rata-rata hanya membutuhkan 1 hingga 2 hari kerja setelah materi (foto dan daftar harga) Anda kirimkan kepada tim kami.",
    },
    {
      q: "Apakah calon pembeli bisa langsung menghubungi WhatsApp saya?",
      a: "Ya! Setiap tombol 'Tanya via WhatsApp' atau formulir simulasi yang diisi pembeli akan langsung membuka chat WhatsApp ke nomor Anda dengan format pesan yang sudah rapi dan jelas.",
    },
  ];

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            <HelpCircle size={16} />
            <span>Pertanyaan yang Sering Diajukan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Jawaban Pertanyaan Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-4 leading-relaxed font-normal">
            Punya keraguan sebelum mulai? Simak jawaban atas pertanyaan umum dari rekan-rekan bisnis berikut:
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-600 border-blue-200" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 bg-white text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
