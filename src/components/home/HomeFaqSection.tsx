import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";
import { generateFaqJsonLd } from "@/lib/seo/metadata-helper";

interface FaqItem {
  question: string;
  answer: string;
}

interface HomeFaqCopy {
  badge: string;
  title: string;
  subtitle: string;
  moreFaqCta: string;
  faqs: FaqItem[];
}

const HOME_FAQ_COPY: Record<SupportedLocale, HomeFaqCopy> = {
  id: {
    badge: "Pertanyaan Umum (FAQ)",
    title: "Jawaban Jujur Sebelum Anda Mulai",
    subtitle: "Transparansi penuh soal biaya QRIS, pencairan saldo, batasan paket Gratis, hingga keamanan dana toko.",
    moreFaqCta: "Lihat Pusat Bantuan & Panduan Lengkap",
    faqs: [
      {
        question: "Berapa fee QRIS dan biaya order di etalase.online?",
        answer:
          "Order langsung via chat WhatsApp dikenakan 0% komisi di semua paket. Untuk pembayaran QRIS instan otomatis, paket Gratis dikenai fee 4,5% (minimum transaksi Rp 15.000) dan paket PRO dikenai fee 2% (minimum transaksi Rp 25.000). Anda juga bisa mengaktifkan opsi Convenience Fee agar biaya transaksi ditanggung oleh pembeli.",
      },
      {
        question: "Kapan uang bisa dicairkan, dan berapa minimum pencairannya?",
        answer:
          "Saldo penjualan QRIS dapat diajukan pencairan kapan saja setelah melewati minimum penarikan Rp 50.000. Dana diproses ke rekening bank lokal Anda maksimal 1x24 jam di hari kerja. Paket PRO mendapat gratis biaya pencairan 4x per bulan (selanjutnya Rp 2.500/penarikan), sedangkan paket Gratis dikenakan Rp 5.000 per penarikan.",
      },
      {
        question: "Apa saja batas paket Gratis selamanya?",
        answer:
          "Paket Gratis tetap mendukung jumlah produk & link tanpa batas (Unlimited), 0% komisi order chat WhatsApp, 1 subdomain .etalase.online, serta akses penuh ke 1 template dasar (Clean Minimal). Fitur lanjutan seperti 14 variasi template lengkap, custom domain, Meta/TikTok Pixel, penghapusan branding bawah, dan diskon biaya QRIS ke 2% tersedia di paket PRO (Rp 49.000/bulan atau Rp 39.000/bulan jika tahunan).",
      },
      {
        question: "Apakah bisa berhenti berlangganan paket PRO kapan saja?",
        answer:
          "Ya, Anda dapat berhenti berlangganan atau tidak memperpanjang paket PRO kapan saja tanpa kontrak mengikat atau penalti pembatalan. Jika paket PRO berakhir, toko dan produk Anda tetap aktif di paket Gratis tanpa kehilangan data pesanan. Kami juga menyediakan kebijakan jaminan pengembalian dana 7 hari untuk langganan baru sesuai Ketentuan Refund.",
      },
      {
        question: "Bagaimana keamanan dana hasil penjualan QRIS saya?",
        answer:
          "Seluruh lalu lintas pembayaran QRIS diproses melalui mitra Payment Gateway berizin Penyelenggara Jasa Pembayaran (PJP) Bank Indonesia. Setiap notifikasi transaksi diverifikasi secara kriptografis, seluruh koneksi dilindungi enkripsi HTTPS/TLS, dan pencairan dana hanya dikirim ke rekening bank yang namanya sesuai dengan verifikasi pemilik toko.",
      },
    ],
  },
  en: {
    badge: "Frequently Asked Questions",
    title: "Clear Answers Before You Start",
    subtitle: "Full transparency on QRIS fees, payouts, Free plan limits, cancellation, and fund security.",
    moreFaqCta: "Visit Full Help Center",
    faqs: [
      {
        question: "What are the QRIS fees and chat order commissions?",
        answer:
          "Direct WhatsApp chat orders carry 0% commission on all plans. For automated instant QRIS checkout, the Free plan has a 4.5% fee (minimum order Rp 15,000) and the PRO plan has a 2% fee (minimum order Rp 25,000). You may also enable the Convenience Fee option so buyers cover the processing fee.",
      },
      {
        question: "When can funds be withdrawn, and what is the minimum payout?",
        answer:
          "You can request a bank payout once your available balance reaches Rp 50,000. Payouts settle within 1 business day (max 24 hours on working days). PRO includes 4 free payouts per month (Rp 2,500 afterward), while the Free plan carries a Rp 5,000 payout fee.",
      },
      {
        question: "What are the limits of the Free Forever plan?",
        answer:
          "The Free plan includes Unlimited products & links, 0% chat order commission, one .etalase.online subdomain, and 1 core template (Clean Minimal). Advanced features including all 14 template designs across 4 archetypes, custom domains, Meta/TikTok Pixel & GA4, watermark removal, and 2% QRIS fees are unlocked in PRO (Rp 49,000/month or Rp 39,000/mo billed annually).",
      },
      {
        question: "Can I cancel my PRO subscription at any time?",
        answer:
          "Yes, you can cancel or choose not to renew PRO anytime with zero lock-in contracts. When PRO expires, your storefront and catalog safely downgrade to Free without deleting your products or order history, plus a 7-day refund guarantee on eligible new upgrades.",
      },
      {
        question: "How is my payout and QRIS sales balance secured?",
        answer:
          "QRIS checkouts run exclusively through Bank Indonesia-licensed payment gateway partners with cryptographic webhook signature verification, HTTPS/TLS encryption across all endpoints, and payouts restricted to verified merchant bank accounts.",
      },
    ],
  },
  ms: {
    badge: "Soalan Lazim (FAQ)",
    title: "Jawapan Jelas Sebelum Anda Bermula",
    subtitle: "Ketelusan penuh mengenai caj QRIS, pengeluaran wang, had pelan Percuma, pembatalan, dan keselamatan dana.",
    moreFaqCta: "Lihat Pusat Bantuan Penuh",
    faqs: [
      {
        question: "Berapakah caj QRIS dan komisen pesanan di etalase.online?",
        answer:
          "Pesanan terus melalui chat WhatsApp dikenakan 0% komisen untuk semua pelan. Untuk bayaran QRIS automatik, pelan Percuma dikenakan caj 4.5% (minimum Rp 15.000) dan pelan PRO dikenakan 2% (minimum Rp 25.000), dengan pilihan Convenience Fee ditanggung pembeli.",
      },
      {
        question: "Bilakah baki boleh dikeluarkan dan apakah minimum pengeluaran?",
        answer:
          "Pengeluaran boleh dimohon apabila baki mencapai minimum Rp 50.000 dan diproses dalam tempoh maksimum 1x24 jam hari bekerja. Pelan PRO mendapat 4x pengeluaran percuma setiap bulan (selepas itu Rp 2.500), manakala pelan Percuma ialah Rp 5.000 setiap pengeluaran.",
      },
      {
        question: "Apakah had pelan Percuma selamanya?",
        answer:
          "Pelan Percuma merangkumi produk & pautan tanpa had (Unlimited), 0% komisen pesanan WhatsApp, 1 subdomain .etalase.online, dan 1 templat asas (Clean Minimal). Kesemua 14 variasi templat, domain kustom, Meta/TikTok Pixel & GA4, dan caj QRIS 2% tersedia dalam PRO (Rp 49.000/bulan).",
      },
      {
        question: "Bolehkah saya berhenti melanggan PRO pada bila-bila masa?",
        answer:
          "Ya, tiada kontrak mengikat. Anda boleh menghentikan pembaharuan PRO bila-bila masa dan kedai anda akan kekal aktif di pelan Percuma tanpa kehilangan data produk.",
      },
      {
        question: "Bagaimanakah keselamatan dana jualan QRIS saya dijamin?",
        answer:
          "Semua transaksi QRIS diproses melalui rakan gerbang pembayaran berlesen Bank Indonesia dengan pengesahan tandatangan kriptografi, penyulitan HTTPS/TLS, serta pengeluaran ke akaun bank pemilik kedai yang disahkan.",
      },
    ],
  },
  th: {
    badge: "คำถามที่พบบ่อย (FAQ)",
    title: "คำตอบที่ชัดเจนก่อนเริ่มต้นใช้งาน",
    subtitle: "โปร่งใสครบถ้วนเรื่องค่าธรรมเนียม QRIS การถอนเงิน ข้อจำกัดแพ็กเกจฟรี และการรักษาความปลอดภัย",
    moreFaqCta: "ไปยังศูนย์ช่วยเหลือทั้งหมด",
    faqs: [
      {
        question: "ค่าธรรมเนียม QRIS และค่าคอมมิชชันออเดอร์อยู่ที่เท่าไร?",
        answer:
          "ออเดอร์ทางแชต WhatsApp คิดค่าคอมมิชชัน 0% ในทุกแพ็กเกจ สำหรับการชำระเงิน QRIS อัตโนมัติ แพ็กเกจฟรีคิด 4.5% (ขั้นต่ำ Rp 15,000) และแพ็กเกจ PRO คิด 2% (ขั้นต่ำ Rp 25,000) โดยสามารถตั้งให้ผู้ซื้อเป็นผู้จ่ายค่าธรรมเนียมได้",
      },
      {
        question: "ถอนเงินเข้าบัญชีได้เมื่อไร และยอดขั้นต่ำเท่าไร?",
        answer:
          "ถอนเงินได้เมื่อมียอดขั้นต่ำ Rp 50,000 โดยโอนเข้าบัญชีภายใน 1 วันทำการ (ไม่เกิน 24 ชม.) แพ็กเกจ PRO ฟรีค่าถอน 4 ครั้ง/เดือน (หลังจากนั้น Rp 2,500) ส่วนแพ็กเกจฟรีคิด Rp 5,000 ต่อครั้ง",
      },
      {
        question: "แพ็กเกจฟรีมีข้อจำกัดอะไรบ้าง?",
        answer:
          "แพ็กเกจฟรีลงสินค้าและลิงก์ได้ไม่จำกัด (Unlimited), ค่าคอมมิชชันแชต 0%, ซับโดเมน .etalase.online และเทมเพลตพื้นฐาน 1 แบบ (Clean Minimal) ส่วนเทมเพลตทั้ง 14 แบบ โดเมนส่วนตัว Meta/TikTok Pixel & GA4 และ QRIS 2% อยู่ในแพ็กเกจ PRO (Rp 49,000/เดือน)",
      },
      {
        question: "สามารถยกเลิกแพ็กเกจ PRO ได้ทุกเมื่อหรือไม่?",
        answer:
          "ได้ทันทีโดยไม่มีสัญญาผูกมัด เมื่อสิ้นสุดรอบบิล หน้าร้านและรายการสินค้าจะกลับสู่แพ็กเกจฟรีโดยข้อมูลไม่สูญหาย",
      },
      {
        question: "ความปลอดภัยของยอดขายและเงินทุนเป็นอย่างไร?",
        answer:
          "การชำระเงินผ่าน QRIS ดำเนินการผ่านพาร์ทเนอร์ Payment Gateway ที่ได้รับอนุญาตจากธนาคารกลางอินโดนีเซีย พร้อมการเข้ารหัส HTTPS/TLS และการตรวจสอบ Webhook Signature ก่อนบันทึกยอดทุกครั้ง",
      },
    ],
  },
  vi: {
    badge: "Câu Hỏi Thường Gặp (FAQ)",
    title: "Giải Đáp Minh Bạch Trước Khi Bắt Đầu",
    subtitle: "Thông tin rõ ràng về phí QRIS, hạn mức rút tiền, giới hạn gói Miễn Phí và bảo mật dòng tiền.",
    moreFaqCta: "Xem Trung Tâm Hỗ Trợ Đầy Đủ",
    faqs: [
      {
        question: "Phí giao dịch QRIS và hoa hồng đơn hàng là bao nhiêu?",
        answer:
          "Đơn đặt qua chat WhatsApp luôn có mức phí 0% hoa hồng. Với thanh toán QR tự động, gói Miễn Phí áp dụng phí 4,5% (đơn tối thiểu Rp 15.000) và gói PRO là 2% (tối thiểu Rp 25.000), kèm tùy chọn để người mua thanh toán phí tiện lợi.",
      },
      {
        question: "Khi nào có thể rút tiền và mức rút tối thiểu là bao nhiêu?",
        answer:
          "Bạn có thể yêu cầu rút tiền khi số dư đạt tối thiểu Rp 50.000. Tiền được chuyển về tài khoản ngân hàng trong tối đa 24 giờ ngày làm việc. Gói PRO miễn phí rút 4 lần/tháng (sau đó Rp 2.500), gói Miễn Phí thu Rp 5.000 mỗi lần rút.",
      },
      {
        question: "Gói Miễn Phí có giới hạn gì?",
        answer:
          "Gói Miễn Phí hỗ trợ không giới hạn số lượng sản phẩm & liên kết, 0% hoa hồng đơn chat WhatsApp, tên miền phụ .etalase.online và 1 giao diện cơ bản (Clean Minimal). Toàn bộ 14 mẫu giao diện, tên miền riêng, Meta/TikTok Pixel & GA4 và mức phí QR 2% nằm trong gói PRO (Rp 49.000/tháng).",
      },
      {
        question: "Tôi có thể hủy gói PRO bất cứ lúc nào không?",
        answer:
          "Có, không ràng buộc hợp đồng dài hạn. Khi gói PRO kết thúc, cửa hàng tự động chuyển về gói Miễn Phí mà không mất dữ liệu sản phẩm hay lịch sử đơn hàng.",
      },
      {
        question: "Tiền bán hàng qua QRIS được bảo mật như thế nào?",
        answer:
          "Mọi giao dịch QRIS được xử lý qua đối tác cổng thanh toán được Ngân hàng Trung ương Indonesia cấp phép, xác thực chữ ký mật mã cho từng webhook và mã hóa HTTPS/TLS toàn trình.",
      },
    ],
  },
};

export function HomeFaqSection({ locale = "id" }: { locale?: SupportedLocale }) {
  const copy = HOME_FAQ_COPY[locale] || HOME_FAQ_COPY.id;
  const faqJsonLd = generateFaqJsonLd(copy.faqs);
  const bantuanHref = locale === "id" ? "/bantuan" : `/${locale}/bantuan`;

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto w-full"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="text-center space-y-3 mb-10 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3.5 py-1 rounded-full">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{copy.badge}</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
          {copy.title}
        </h2>
        <p className="text-sm sm:text-base text-[#57534E] max-w-2xl mx-auto leading-relaxed">
          {copy.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {copy.faqs.map((item, idx) => (
          <article
            key={idx}
            className="bg-white border border-[#E7E5E4] rounded-2xl p-5 sm:p-6 shadow-2xs"
          >
            <h3 className="text-sm sm:text-base font-bold text-[#1C1917] mb-2">
              {item.question}
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
              {item.answer}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href={bantuanHref}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D94E28] hover:text-[#B83E1D] hover:underline"
        >
          <span>{copy.moreFaqCta}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
