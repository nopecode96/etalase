"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  Search,
  HelpCircle,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Globe,
  MessageCircle,
  Mail,
} from "lucide-react";
import { SupportedLocale } from "@/lib/config/constants";

interface FaqItem {
  q: string;
  tag: string;
  a: string;
}

interface CategoryItem {
  title: string;
  desc: string;
}

interface BantuanTranslation {
  badge: string;
  h1: string;
  subtitle: string;
  searchPlaceholder: string;
  categories: [CategoryItem, CategoryItem, CategoryItem, CategoryItem];
  faqSectionBadge: string;
  faqSectionTitle: string;
  faqs: FaqItem[];
  noResult: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
}

export const BANTUAN_TRANSLATIONS: Record<SupportedLocale, BantuanTranslation> = {
  id: {
    badge: "Pusat Bantuan & Knowledgebase",
    h1: "Ada yang Bisa Kami Bantu?",
    subtitle:
      "Temukan jawaban cepat seputar pengaturan etalase, pengiriman WhatsApp otomatis, hingga pembayaran QRIS.",
    searchPlaceholder: "Cari topik bantuan (contoh: QRIS, domain, file download)...",
    categories: [
      {
        title: "Panduan Memulai",
        desc: "Langkah pertama mendaftar, mengklaim subdomain, dan mengisi profil toko.",
      },
      {
        title: "Pembayaran & FinTech",
        desc: "Aktivasi QRIS, penarikan saldo, verifikasi transaksi, dan mata uang SEA.",
      },
      {
        title: "Otomasi WhatsApp",
        desc: "Pengaturan auto-delivery file, format chat order, dan notifikasi pesanan.",
      },
      {
        title: "Domain & Kustomisasi",
        desc: "Menghubungkan domain sendiri, pemilihan warna, dan font template.",
      },
    ],
    faqSectionBadge: "Pertanyaan Populer",
    faqSectionTitle: "FAQ yang Paling Sering Ditanyakan",
    faqs: [
      {
        q: "Apakah benar etalase.online bisa digunakan secara gratis selamanya?",
        tag: "POPULER",
        a: "Benar sekali. Paket Gratis etalase.online berlaku selamanya tanpa batas waktu trial. Anda mendapatkan 1 subdomain mandiri (namamu.etalase.online), produk & tautan tanpa batas (unlimited), dan 0% komisi transaksi di jalur pemesanan chat WhatsApp.",
      },
      {
        q: "Bagaimana cara kerja pengiriman file otomatis ke WhatsApp pembeli?",
        tag: "OTOMASI",
        a: "Begitu pembeli menyelesaikan pembayaran via QRIS Instan, sistem cloud kami langsung mendeteksi status lunas dan mengirimkan pesan WhatsApp resmi berisi invoice dan link download file eksklusif ke nomor pembeli dalam 2 detik.",
      },
      {
        q: "Apakah saya bisa menggunakan nama domain sendiri (contoh: tokoanda.com)?",
        tag: "POPULER",
        a: "Bisa! Di Paket Pro, Anda dapat menyambungkan domain pribadi (.com, .id, .shop, dll.) langsung ke etalase Anda. Kami menyediakan sertifikat SSL/HTTPS gratis dan panduan DNS super mudah.",
      },
      {
        q: "Bagaimana cara mencairkan uang hasil penjualan QRIS?",
        tag: "KEUANGAN",
        a: "Seluruh dana penjualan yang masuk melalui QRIS tercatat real-time di dashboard tokomu. Anda dapat melakukan penarikan saldo (payout) ke seluruh rekening bank di Indonesia (BCA, Mandiri, BRI, BNI) atau e-wallet setiap hari kerja.",
      },
      {
        q: "Apakah etalase.online cocok untuk usaha fisik seperti kafe dan sales mobil?",
        tag: "FITUR",
        a: "Sangat cocok! Kami memiliki template khusus 'Visual Menu Grid' untuk buku menu kafe QR meja, dan template 'Showroom Pro' untuk sales mobil/properti dengan chip spesifikasi unit dan tombol tanya simulasi DP via chat.",
      },
    ],
    noResult: "Tidak ada topik bantuan yang cocok dengan pencarian Anda.",
    ctaTitle: "Belum menemukan jawaban yang Anda cari?",
    ctaDesc:
      "Tim bantuan resmi Rafa Kreasindo Teknologi siap memandu Anda melalui tiket email terpadu.",
    ctaBtn: "Hubungi Tim Bantuan",
  },
  en: {
    badge: "Help Center & Knowledgebase",
    h1: "How Can We Help You Today?",
    subtitle:
      "Find rapid answers regarding storefront setup, automated WhatsApp file delivery, and regional checkout integrations.",
    searchPlaceholder: "Search help topics (e.g. QR payments, domain setup, file downloads)...",
    categories: [
      {
        title: "Getting Started",
        desc: "Initial registration, claiming your sovereign subdomain, and profile configuration.",
      },
      {
        title: "FinTech & Settlements",
        desc: "Instant QR activation, payout requests, transaction tracking, and SEA currencies.",
      },
      {
        title: "WhatsApp Automation",
        desc: "Automated digital asset delivery, chat order formats, and admin alert settings.",
      },
      {
        title: "Domain & Branding",
        desc: "Connecting custom apex domains, color palettes, and template customizations.",
      },
    ],
    faqSectionBadge: "Popular Topics",
    faqSectionTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Is etalase.online genuinely free forever?",
        tag: "POPULAR",
        a: "Absolutely. The Free tier of etalase.online has no trial expirations. You receive 1 dedicated subdomain (yourname.etalase.online), unlimited products and links, and 0% platform commission on all direct chat orders.",
      },
      {
        q: "How does automated WhatsApp file delivery work?",
        tag: "AUTOMATION",
        a: "As soon as a buyer completes payment, our cloud engine detects the settled status and dispatches an official WhatsApp message containing the receipt and an authenticated file download link within 2 seconds.",
      },
      {
        q: "Can I connect my own custom apex domain (e.g., yourbrand.com)?",
        tag: "POPULAR",
        a: "Yes! On the Pro plan, you can map your custom domain (.com, .store, .net, etc.) directly to your storefront. We provide automated SSL certificates and simple 1-click DNS guides.",
      },
      {
        q: "How do I withdraw revenue from instant QR checkouts?",
        tag: "PAYOUTS",
        a: "All settled customer payments appear in real time on your dashboard. You can request payouts directly to local bank accounts with 4 free monthly payouts included on Pro.",
      },
      {
        q: "Is etalase.online suited for physical dining or automotive sales?",
        tag: "FEATURES",
        a: "Definitely! We provide dedicated archetypes like 'Visual Menu Grid' for contactless QR restaurant ordering, and 'Showroom Pro' for vehicle and property dealers with built-in financing calculators.",
      },
    ],
    noResult: "No help topics matched your search query.",
    ctaTitle: "Still haven't found what you need?",
    ctaDesc:
      "The official engineering and merchant support team at Rafa Kreasindo Teknologi is ready to assist.",
    ctaBtn: "Contact Support Team",
  },
  ms: {
    badge: "Pusat Bantuan & Pangkalan Pengetahuan",
    h1: "Apa yang Boleh Kami Bantu?",
    subtitle:
      "Dapatkan jawapan pantas tentang persediaan etalase, penghantaran WhatsApp automatik, dan bayaran tanpa tunai.",
    searchPlaceholder: "Cari topik bantuan (contoh: bayaran QR, domain, muat turun fail)...",
    categories: [
      {
        title: "Panduan Mula",
        desc: "Langkah awal pendaftaran, tuntutan subdomain dan profil perniagaan.",
      },
      {
        title: "Kewangan & Bayaran",
        desc: "Pengaktifan QR, pengeluaran baki, penjejakan transaksi, dan mata wang serantau.",
      },
      {
        title: "Automasi WhatsApp",
        desc: "Penghantaran fail automatik, format pesanan chat, dan notifikasi pentadbir.",
      },
      {
        title: "Domain & Penyesuaian",
        desc: "Menyambungkan domain sendiri, pemilihan warna dan fon templat.",
      },
    ],
    faqSectionBadge: "Soalan Lazim",
    faqSectionTitle: "Soalan yang Kerap Ditanya",
    faqs: [
      {
        q: "Adakah etalase.online benar-benar percuma selamanya?",
        tag: "POPULAR",
        a: "Tepat sekali. Pelan Percuma tiada tarikh luput. Anda mendapat 1 subdomain sendiri (namamu.etalase.online), produk & pautan tanpa had, serta 0% komisen untuk pesanan WhatsApp.",
      },
      {
        q: "Bagaimanakah penghantaran fail automatik ke WhatsApp berfungsi?",
        tag: "AUTOMASI",
        a: "Sebaik sahaja pembeli menyelesaikan bayaran, pelayan awan kami mengesahkan bayaran dan menghantar mesej WhatsApp rasmi bersama resit dan pautan muat turun dalam 2 saat.",
      },
      {
        q: "Bolehkah saya menggunakan domain sendiri (contoh: kedaianda.com)?",
        tag: "POPULAR",
        a: "Boleh! Pada Pelan Pro, anda boleh menyambungkan domain peribadi (.com, .my, .shop) dengan sijil SSL percuma dan panduan DNS yang mudah.",
      },
      {
        q: "Bagaimanakah cara mengeluarkan baki hasil jualan?",
        tag: "KEWANGAN",
        a: "Semua dana jualan dicatat secara langsung di papan pemuka anda. Anda boleh membuat pengeluaran baki terus ke akaun bank tempatan pada bila-bila masa.",
      },
      {
        q: "Adakah etalase.online sesuai untuk kafe atau jualan kereta?",
        tag: "CIRI-CIRI",
        a: "Sangat sesuai! Kami menyediakan templat 'Visual Menu Grid' untuk menu QR meja kafe, dan 'Showroom Pro' untuk jurujual kenderaan dengan simulasi wang muka.",
      },
    ],
    noResult: "Tiada topik bantuan yang sepadan dengan carian anda.",
    ctaTitle: "Masih belum menjumpai jawapan yang dicari?",
    ctaDesc:
      "Pasukan sokongan rasmi Rafa Kreasindo Teknologi sedia membantu anda melalui tiket sokongan.",
    ctaBtn: "Hubungi Pasukan Bantuan",
  },
  th: {
    badge: "ศูนย์ช่วยเหลือและฐานความรู้",
    h1: "มีอะไรให้เราช่วยคุณในวันนี้?",
    subtitle:
      "ค้นหาคำตอบอย่างรวดเร็วเกี่ยวกับการตั้งค่าหน้าร้าน ระบบส่งไฟล์ทาง WhatsApp อัตโนมัติ และการรับชำระเงิน",
    searchPlaceholder: "ค้นหาหัวข้อช่วยเหลือ (เช่น การชำระเงิน, โดเมน, ดาวน์โหลดไฟล์)...",
    categories: [
      {
        title: "คู่มือเริ่มต้นใช้งาน",
        desc: "ขั้นตอนแรกในการสมัคร รับซับโดเมนส่วนตัว และตั้งค่าโปรไฟล์ร้านค้า",
      },
      {
        title: "การเงินและการชำระเงิน",
        desc: "เปิดใช้ระบบ QR, การถอนเงินเข้าบัญชี, การตรวจสอบยอด และสกุลเงินในภูมิภาค",
      },
      {
        title: "ระบบอัตโนมัติ WhatsApp",
        desc: "การตั้งค่าส่งไฟล์อัตโนมัติ รูปแบบข้อความสั่งซื้อ และการแจ้งเตือนแอดมิน",
      },
      {
        title: "โดเมนและการปรับแต่ง",
        desc: "การเชื่อมต่อโดเมนของคุณเอง การเลือกชุดสี และแบบอักษรหน้าร้าน",
      },
    ],
    faqSectionBadge: "หัวข้อยอดนิยม",
    faqSectionTitle: "คำถามที่พบบ่อย (FAQ)",
    faqs: [
      {
        q: "etalase.online สามารถใช้งานได้ฟรีตลอดชีพจริงหรือไม่?",
        tag: "ยอดนิยม",
        a: "จริงแน่นอน แพ็กเกจฟรีไม่มีกำหนดระยะเวลาทดลองใช้ คุณจะได้รับ 1 ซับโดเมนส่วนตัว (yourname.etalase.online), เพิ่มสินค้าและลิงก์ได้ไม่จำกัด และไม่มีค่าคอมมิชชันสำหรับการสั่งซื้อผ่านแชต",
      },
      {
        q: "ระบบส่งมอบไฟล์อัตโนมัติไปยัง WhatsApp ทำงานอย่างไร?",
        tag: "ระบบอัตโนมัติ",
        a: "ทันทีที่ลูกค้าชำระเงินเสร็จสิ้น ระบบคลาวด์ของเราจะตรวจจับยอดเงินและส่งข้อความ WhatsApp อย่างเป็นทางการพร้อมใบเสร็จและลิงก์ดาวน์โหลดไฟล์ไปยังเบอร์ผู้ซื้อภายใน 2 วินาที",
      },
      {
        q: "ฉันสามารถเชื่อมต่อชื่อโดเมนของตนเอง (เช่น yourbrand.com) ได้หรือไม่?",
        tag: "ยอดนิยม",
        a: "ได้แน่นอน! ในแพ็กเกจ Pro คุณสามารถเชื่อมต่อโดเมนส่วนตัว (.com, .net, .co.th ฯลฯ) เข้ากับหน้าร้านได้โดยตรง พร้อมระบบ SSL ฟรีและการตั้งค่า DNS ที่ง่ายดาย",
      },
      {
        q: "ฉันจะถอนเงินรายได้จากการขายเข้าบัญชีธนาคารได้อย่างไร?",
        tag: "การเงิน",
        a: "รายได้จากการชำระเงินผ่าน QR จะแสดงผลแบบเรียลไทม์บนแดชบอร์ด คุณสามารถกดถอนเงินเข้าบัญชีธนาคารในประเทศได้ทันที พร้อมสิทธิ์ถอนฟรี 4 ครั้งต่อเดือนในแพ็กเกจ Pro",
      },
      {
        q: "etalase.online เหมาะสำหรับร้านอาหาร คาเฟ่ หรือโชว์รูมรถยนต์หรือไม่?",
        tag: "ฟีเจอร์",
        a: "เหมาะสมอย่างยิ่ง! เรามีเทมเพลต 'Visual Menu Grid' สำหรับสแกนสั่งอาหารที่โต๊ะผ่าน QR Code และเทมเพลต 'Showroom Pro' สำหรับฝ่ายขายรถยนต์พร้อมระบบคำนวณเงินดาวน์",
      },
    ],
    noResult: "ไม่พบหัวข้อความช่วยเหลือที่ตรงกับการค้นหาของคุณ",
    ctaTitle: "ยังไม่พบคำตอบที่คุณกำลังมองหาใช่หรือไม่?",
    ctaDesc:
      "ทีมงานฝ่ายสนับสนุนอย่างเป็นทางการของ Rafa Kreasindo Teknologi พร้อมดูแลคุณเสมอ",
    ctaBtn: "ติดต่อฝ่ายสนับสนุน",
  },
  vi: {
    badge: "Trung Tâm Trợ Giúp & Tri Thức",
    h1: "Chúng Tôi Có Thể Giúp Gì Cho Bạn?",
    subtitle:
      "Tìm kiếm câu trả lời nhanh chóng về thiết lập storefront, tự động gửi file qua WhatsApp và cổng thanh toán.",
    searchPlaceholder: "Tìm kiếm chủ đề (ví dụ: thanh toán QR, tên miền, tải file)...",
    categories: [
      {
        title: "Bắt Đầu Nhanh",
        desc: "Các bước đầu tiên đăng ký, nhận tên miền phụ và cấu hình hồ sơ cửa hàng.",
      },
      {
        title: "Tài Chính & Thanh Toán",
        desc: "Kích hoạt mã QR tức thì, rút tiền về tài khoản, kiểm tra giao dịch và tiền tệ.",
      },
      {
        title: "Tự Động Hóa WhatsApp",
        desc: "Thiết lập gửi file tự động, định dạng tin nhắn đặt hàng và thông báo quản trị.",
      },
      {
        title: "Tên Miền & Tùy Biến",
        desc: "Kết nối tên miền riêng, tùy chỉnh bảng màu và phông chữ giao diện.",
      },
    ],
    faqSectionBadge: "Chủ Đề Phổ Biến",
    faqSectionTitle: "Các Câu Hỏi Thường Gặp",
    faqs: [
      {
        q: "etalase.online có thực sự miễn phí vĩnh viễn không?",
        tag: "PHỔ BIẾN",
        a: "Hoàn toàn chính xác. Gói Miễn Phí không giới hạn thời gian dùng thử. Bạn nhận được 1 tên miền phụ riêng biệt (yourname.etalase.online), không giới hạn sản phẩm & liên kết, và 0% phí hoa hồng đối với đơn hàng qua chat.",
      },
      {
        q: "Cơ chế tự động gửi file qua WhatsApp hoạt động ra sao?",
        tag: "TỰ ĐỘNG HÓA",
        a: "Ngay khi người mua hoàn tất thanh toán qua mã QR, hệ thống đám mây sẽ xác nhận giao dịch và tự động gửi tin nhắn WhatsApp chứa hóa đơn kèm liên kết tải tệp độc quyền trong 2 giây.",
      },
      {
        q: "Tôi có thể kết nối tên miền riêng (ví dụ: yourbrand.com) không?",
        tag: "PHỔ BIẾN",
        a: "Có! Với gói Pro, bạn có thể trỏ tên miền cá nhân (.com, .vn, .store, v.v.) trực tiếp vào storefront. Chúng tôi cung cấp chứng chỉ SSL miễn phí và hướng dẫn DNS nhanh chóng.",
      },
      {
        q: "Cách rút tiền doanh thu về tài khoản ngân hàng như thế nào?",
        tag: "RÚT TIỀN",
        a: "Toàn bộ tiền hàng thanh toán qua QR được cập nhật tức thì trên bảng điều khiển. Bạn có thể gửi lệnh rút tiền về tài khoản ngân hàng nội địa với 4 lần rút miễn phí mỗi tháng trên gói Pro.",
      },
      {
        q: "etalase.online có phù hợp với quán cafe hoặc showroom ô tô không?",
        tag: "TÍNH NĂNG",
        a: "Rất phù hợp! Chúng tôi cung cấp mẫu 'Visual Menu Grid' dành cho thực đơn QR tại bàn của quán cafe, và mẫu 'Showroom Pro' dành cho tư vấn viên ô tô/bất động sản kèm công cụ tính trả góp.",
      },
    ],
    noResult: "Không tìm thấy nội dung hỗ trợ phù hợp với từ khóa của bạn.",
    ctaTitle: "Vẫn chưa tìm thấy thông tin bạn cần?",
    ctaDesc:
      "Đội ngũ hỗ trợ kỹ thuật chính thức của Rafa Kreasindo Teknologi luôn sẵn sàng đồng hành cùng bạn.",
    ctaBtn: "Liên Hệ Bộ Phận Hỗ Trợ",
  },
};

export function BantuanClient({ locale }: { locale: SupportedLocale }) {
  const t = BANTUAN_TRANSLATIONS[locale] || BANTUAN_TRANSLATIONS.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredFaqs = t.faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const categoryIcons = [BookOpen, ShieldCheck, MessageCircle, Globe];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <GlobalHeader />

      <main className="flex-1">
        {/* Header Pusat Bantuan & Search Bar */}
        <section className="pt-16 pb-14 px-4 sm:px-6 text-center max-w-4xl mx-auto">
          <ScrollReveal direction="up" delay={50}>
            <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] mb-4">
              {t.h1}
            </h1>
            <p className="text-[#57534E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            {/* Search Bar Input */}
            <div className="max-w-xl mx-auto mt-8 relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#E7E5E4] rounded-2xl pl-12 pr-4 py-3.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/50 focus:outline-none focus:border-[#D94E28] focus:ring-2 focus:ring-[#D94E28]/15 shadow-sm transition"
              />
            </div>
          </ScrollReveal>
        </section>

        {/* 4 Kategori Bantuan */}
        <section className="pb-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.categories.map((c, idx) => {
              const Icon = categoryIcons[idx] || HelpCircle;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E7E5E4] rounded-2xl p-6 shadow-2xs hover:shadow-xs hover:border-[#D94E28]/40 transition space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FDF0EC] text-[#D94E28] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#1C1917]">{c.title}</h3>
                  <p className="text-xs text-[#57534E] leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Top 5 FAQ Accordion */}
        <section className="pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D94E28]">
              {t.faqSectionBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {t.faqSectionTitle}
            </h2>
          </div>

          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#57534E] bg-white rounded-2xl border border-[#E7E5E4]">
                {t.noResult}
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1C1917] hover:text-[#D94E28] transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FDF0EC] text-[#D94E28] px-2 py-0.5 rounded-md shrink-0">
                          {faq.tag}
                        </span>
                        <span className="truncate">{faq.q}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-stone-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#D94E28]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#57534E] leading-relaxed border-t border-stone-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* CTA Bantuan Tambahan */}
        <section className="pb-24 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 sm:p-10 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917]">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md mx-auto leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="pt-2">
              <Link
                href={getLocalizedHref("/kontak")}
                className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-6 py-3 rounded-xl text-xs sm:text-sm transition shadow-xs inline-flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>{t.ctaBtn}</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
