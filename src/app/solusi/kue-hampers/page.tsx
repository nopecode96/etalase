import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { GlobalHeader } from "@/components/saas/GlobalHeader";
import { GlobalFooter } from "@/components/saas/GlobalFooter";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageCircle,
  CalendarClock,
  Layers,
  QrCode,
  ShieldCheck,
} from "lucide-react";
import {
  generateLocalizedMetadata,
  generateBreadcrumbJsonLd,
  generateWebPageJsonLd,
  generateFaqJsonLd,
  BASE_URL,
} from "@/lib/seo/metadata-helper";
import { SupportedLocale, SUPPORTED_LOCALES } from "@/lib/config/constants";

interface KueHampersPageProps {
  searchParams?: {
    lang?: string;
  };
}

const PAGE_COPY: Record<
  SupportedLocale,
  {
    metaTitle: string;
    metaDesc: string;
    badge: string;
    h1: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustNote: string;
    demoLabel: string;
    showcaseTitle: string;
    showcaseDesc: string;
    compareTitle: string;
    compareOldTitle: string;
    compareNewTitle: string;
    oldPoints: string[];
    newPoints: string[];
    featuresTitle: string;
    features: { title: string; desc: string }[];
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    bottomTitle: string;
    bottomDesc: string;
  }
> = {
  id: {
    metaTitle:
      "Katalog Online Kue Kering & Hampers Natal / Lebaran — Gratis, 0% Komisi Chat | etalase.online",
    metaDesc:
      "Buat katalog kue kering, nastar, kastengel, dan hampers Natal/Lebaran dalam 5 menit. Mendukung label Pre-Order (PO), varian ukuran toples, kuota stok, dan order langsung ke WhatsApp (0% komisi).",
    badge: "Solusi Penjual Kue & Hampers Musiman",
    h1: "Katalog Kue & Hampers Siap Order di WhatsApp — Tanpa Kirim Foto Satu-Satu.",
    subtitle:
      "Rapikan daftar harga nastar, kastengel, dan paket hampers dalam 1 link. Dilengkapi tanda Pre-Order (PO), varian ukuran toples, kuota stok, dan pesan WhatsApp otomatis. Gratis untuk mulai.",
    ctaPrimary: "Buat Katalog Kue Gratis",
    ctaSecondary: "Lihat Contoh Toko Kue",
    trustNote: "Gratis selamanya • 0% komisi order WhatsApp • Mulai dalam hitungan menit",
    demoLabel: "Contoh tampilan toko",
    showcaseTitle: "Tampilan Rapi untuk Kue Kering, Parcel & Hampers",
    showcaseDesc:
      "Pembeli bisa langsung melihat foto produk, pilihan varian ukuran toples, jadwal kirim PO, dan harga tanpa perlu bertanya berulang kali di chat.",
    compareTitle: "Kenapa Penjual Kue Beralih dari Kirim PDF/Foto ke Etalase?",
    compareOldTitle: "Cara Lama (PDF / Foto Satu-Satu di WA)",
    compareNewTitle: "Pakai Katalog etalase.online",
    oldPoints: [
      "Chat menumpuk karena pembeli terus tanya harga & ukuran toples",
      "Harus kirim ulang banyak foto setiap ada calon pembeli baru",
      "Sulit update kuota PO saat batch sudah penuh",
      "Rekap varian dan nama pembeli rawan salah catat",
    ],
    newPoints: [
      "1 link bio berisi semua varian kue, harga, dan jadwal PO yang jelas",
      "Badge Pre-Order (PO) + estimasi kirim tampil otomatis di katalog",
      "Kuota stok bisa dibatasi agar tidak over-order saat peak season",
      "Order masuk ke WhatsApp sudah rapi (0% komisi) atau via QRIS instan",
    ],
    featuresTitle: "Fitur Nyata yang Langsung Terpakai Saat Musim Natal & Lebaran",
    features: [
      {
        title: "Mode Pre-Order (PO) & Estimasi Kirim",
        desc: "Aktifkan penanda Pre-Order dan tulis jadwal pengiriman (misal: Batch 1 kirim 18 Des) langsung di produk.",
      },
      {
        title: "Varian Ukuran Toples & Paket",
        desc: "Tambahkan pilihan seperti Toples 250gr, Toples 500gr, atau Paket Hampers tanpa perlu membuat produk terpisah.",
      },
      {
        title: "Order WhatsApp 0% Komisi",
        desc: "Semua pesanan lewat WhatsApp masuk utuh ke rekening Anda tanpa potongan komisi sepeser pun.",
      },
      {
        title: "Opsi QRIS Instan (Transparan)",
        desc: "Jika ingin terima pembayaran QRIS otomatis, biaya transaksi mulai 2% (PRO) atau 4,5% (Free) dengan pilihan ditanggung penjual atau pembeli.",
      },
    ],
    faqTitle: "Pertanyaan yang Sering Ditanyakan Penjual Kue",
    faqs: [
      {
        question: "Apakah benar gratis untuk mulai jualan kue dan hampers?",
        answer:
          "Ya. Paket Gratis Rp 0 selamanya sudah termasuk 1 subdomain (namatoko.etalase.online), produk tanpa batas, mode Pre-Order (PO), varian ukuran, dan order WhatsApp dengan 0% komisi.",
      },
      {
        question: "Bagaimana cara mengatur jadwal Pre-Order (PO) kue Natal atau Lebaran?",
        answer:
          "Saat menambah atau mengedit produk di dashboard, Anda cukup mengaktifkan centang 'Produk Pre-Order (PO)', mengisi jadwal/estimasi kirim (misal: Batch 1 kirim 18 Des), dan mengisi kuota stok jika ingin dibatasi.",
      },
      {
        question: "Berapa biaya jika pembeli membayar menggunakan QRIS?",
        answer:
          "Order langsung via chat WhatsApp dikenakan 0% komisi. Untuk pembayaran QRIS otomatis, biaya transaksi adalah 4,5% (paket Free) atau 2% (paket PRO), dengan minimum pencairan saldo Rp 50.000.",
      },
      {
        question: "Apakah katalognya bisa dipakai lagi setelah Natal selesai?",
        answer:
          "Bisa. Anda tinggal menyembunyikan produk edisi Natal lalu mengaktifkan produk edisi Imlek atau Lebaran di link toko yang sama.",
      },
    ],
    bottomTitle: "Siap Terima Order Kue & Hampers Lebih Rapi?",
    bottomDesc:
      "Daftar gratis sekarang. Anda bisa langsung mengisi produk kue pertama dalam hitungan menit dan membagikan link toko ke bio Instagram atau status WhatsApp.",
  },
  en: {
    metaTitle:
      "Online Catalog for Festive Cookies & Hampers — Free, 0% Chat Commission | etalase.online",
    metaDesc:
      "Create a clean online catalog for festive cookies, cakes, and gift hampers in 5 minutes. Includes Pre-Order (PO) badges, jar size variants, stock limits, and 0% commission WhatsApp orders.",
    badge: "Solution for Bakers & Hamper Sellers",
    h1: "Cookie & Hamper Catalog Ready for WhatsApp Orders — Without Sending Photos One by One.",
    subtitle:
      "Organize cookie prices, jar sizes, and festive hamper packages in 1 link. Built-in Pre-Order (PO) schedule labels, variants, stock quotas, and structured WhatsApp messages. Free to start.",
    ctaPrimary: "Create Free Cookie Catalog",
    ctaSecondary: "View Sample Bakery Store",
    trustNote: "Free forever • 0% WhatsApp order commission • Setup < 5 min",
    demoLabel: "Sample store preview",
    showcaseTitle: "Clean Presentation for Festive Cookies & Gift Hampers",
    showcaseDesc:
      "Buyers can immediately browse product photos, jar size options, Pre-Order shipping batches, and pricing without asking repeatedly in chat.",
    compareTitle: "Why Bakers Switch from PDFs to etalase.online",
    compareOldTitle: "Old Way (PDF / Individual Photos on WA)",
    compareNewTitle: "With etalase.online Catalog",
    oldPoints: [
      "Endless chats asking for price lists and jar sizes",
      "Resending dozens of photos to every new buyer",
      "Hard to communicate sold-out Pre-Order batches",
      "Manual order recaps prone to mix-ups",
    ],
    newPoints: [
      "1 bio link with all cookie variants, prices, and PO dates",
      "Automatic Pre-Order (PO) badge & shipping estimate on cards",
      "Stock quota limits to prevent peak-season over-booking",
      "Structured WhatsApp orders (0% commission) or instant QRIS",
    ],
    featuresTitle: "Real Features Built for Holiday Peak Season",
    features: [
      {
        title: "Pre-Order (PO) Mode & Dispatch Schedule",
        desc: "Toggle Pre-Order on any product and display your batch shipping estimate directly to buyers.",
      },
      {
        title: "Jar Size & Package Variants",
        desc: "Add options like 250g Jar, 500g Jar, or Gift Box sets without duplicating product listings.",
      },
      {
        title: "0% Commission WhatsApp Orders",
        desc: "Orders sent via WhatsApp go directly to you with zero platform commission.",
      },
      {
        title: "Transparent Instant QRIS Option",
        desc: "Accept automated QRIS payments starting at 2% (PRO) or 4.5% (Free) with flexible fee bearer settings.",
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "Is it really free to start selling cookies and hampers?",
        answer:
          "Yes. The Free plan (Rp 0 forever) includes 1 subdomain, unlimited products, Pre-Order (PO) mode, variants, and 0% commission WhatsApp orders.",
      },
      {
        question: "How do I manage Pre-Order (PO) batches?",
        answer:
          "In the product form, enable 'Produk Pre-Order (PO)', enter your dispatch estimate (e.g., Batch 1 ships Dec 18), and optionally set a stock quota.",
      },
      {
        question: "What are the QRIS transaction fees?",
        answer:
          "Direct WhatsApp chat orders have 0% commission. Automated QRIS payments carry a 4.5% fee on Free or 2% on PRO.",
      },
    ],
    bottomTitle: "Ready for Cleaner Holiday Cookie Orders?",
    bottomDesc:
      "Sign up free now and publish your first cookie & hamper catalog in minutes.",
  },
  ms: {
    metaTitle:
      "Katalog Dalam Talian Kuih Raya & Hamper — Percuma, 0% Komisen Chat | etalase.online",
    metaDesc:
      "Bina katalog kuih raya, biskut, dan hamper dalam 5 minit. Lengkap dengan label Pre-Order (PO), pilihan saiz balang, kuota stok, dan pesanan WhatsApp 0% komisen.",
    badge: "Solusi Penjual Kuih & Hamper",
    h1: "Katalog Kuih & Hamper Sedia Tempah di WhatsApp — Tanpa Hantar Gambar Satu-Satu.",
    subtitle:
      "Susun harga kuih, saiz balang, dan pakej hamper dalam 1 pautan. Lengkap dengan label Pre-Order (PO), varian, dan kuota stok. Percuma untuk bermula.",
    ctaPrimary: "Cipta Katalog Percuma",
    ctaSecondary: "Lihat Contoh Kedai",
    trustNote: "Percuma selamanya • 0% komisen WhatsApp • Setup < 5 minit",
    demoLabel: "Contoh paparan kedai",
    showcaseTitle: "Paparan Kemas untuk Biskut & Hamper Perayaan",
    showcaseDesc:
      "Pembeli boleh terus melihat gambar, saiz balang, jadual PO, dan harga tanpa perlu bertanya berulang kali.",
    compareTitle: "Kenapa Penjual Kuih Beralih ke etalase.online?",
    compareOldTitle: "Cara Lama (PDF / Gambar Satu-Satu)",
    compareNewTitle: "Guna Katalog etalase.online",
    oldPoints: [
      "Chat bertimbun kerana pembeli tanya harga berulang kali",
      "Perlu hantar semula banyak gambar kepada setiap pelanggan",
      "Sukar kemas kini kuota PO apabila batch sudah penuh",
      "Rekap pesanan manual mudah tersilap",
    ],
    newPoints: [
      "1 pautan bio dengan semua varian kuih & jadual PO",
      "Label Pre-Order (PO) & anggaran penghantaran automatik",
      "Had kuota stok untuk elak tempahan berlebihan",
      "Pesanan terus ke WhatsApp (0% komisen) atau QRIS pantas",
    ],
    featuresTitle: "Ciri Sebenar untuk Musim Perayaan",
    features: [
      {
        title: "Mod Pre-Order (PO) & Jadual Hantar",
        desc: "Aktifkan penanda Pre-Order dan paparkan tarikh penghantaran batch terus pada produk.",
      },
      {
        title: "Varian Saiz Balang & Pakej",
        desc: "Tambah pilihan saiz tanpa perlu membuat produk berulang kali.",
      },
      {
        title: "Pesanan WhatsApp 0% Komisen",
        desc: "Semua pesanan WhatsApp masuk terus tanpa potongan komisen.",
      },
      {
        title: "Pilihan QRIS Pantas",
        desc: "Terima bayaran QRIS automatik bermula 2% (PRO) atau 4.5% (Free).",
      },
    ],
    faqTitle: "Soalan Lazim Penjual Kuih",
    faqs: [
      {
        question: "Adakah ia benar-benar percuma untuk bermula?",
        answer:
          "Ya. Pakej Percuma termasuk 1 subdomain, produk tanpa had, mod Pre-Order (PO), varian, dan pesanan WhatsApp 0% komisen.",
      },
      {
        question: "Bagaimana cara menguruskan Pre-Order (PO)?",
        answer:
          "Aktifkan pilihan Pre-Order pada borang produk dan masukkan anggaran tarikh penghantaran serta kuota stok.",
      },
    ],
    bottomTitle: "Sedia Terima Tempahan Kuih & Hamper?",
    bottomDesc: "Daftar percuma sekarang dan terbitkan katalog anda dalam beberapa minit.",
  },
  th: {
    metaTitle:
      "แคตตาล็อกออนไลน์สำหรับร้านขนมและกระเช้าของขวัญ — ฟรี ค่าคอมฯ แชท 0% | etalase.online",
    metaDesc:
      "สร้างแคตตาล็อกคุกกี้ ขนม และกระเช้าของขวัญเทศกาลใน 5 นาที รองรับป้าย Pre-Order (PO) ตัวเลือกขนาด โควต้าสต็อก และสั่งซื้อผ่าน WhatsApp",
    badge: "โซลูชันสำหรับร้านขนมและกระเช้า",
    h1: "แคตตาล็อกขนมและกระเช้าพร้อมสั่งผ่าน WhatsApp — ไม่ต้องส่งรูปทีละรูป",
    subtitle:
      "รวมราคาขนม ขนาดบรรจุ และชุดกระเช้าไว้ในลิงก์เดียว พร้อมป้าย Pre-Order (PO) ตัวเลือกขนาด และโควต้าสต็อก เริ่มต้นฟรี",
    ctaPrimary: "สร้างแคตตาล็อกฟรี",
    ctaSecondary: "ดูตัวอย่างร้านค้า",
    trustNote: "ฟรีตลอดไป • ค่าคอมฯ แชท 0% • ตั้งค่า < 5 นาที",
    demoLabel: "ตัวอย่างหน้าตาหน้าร้าน",
    showcaseTitle: "หน้าร้านเป็นระเบียบสำหรับขนมและกระเช้าเทศกาล",
    showcaseDesc:
      "ลูกค้าดูรูปสินค้า ขนาดกล่อง รอบจัดส่ง PO และราคาได้ทันทีโดยไม่ต้องถามซ้ำในแชท",
    compareTitle: "ทำไมร้านขนมถึงเปลี่ยนมาใช้ etalase.online",
    compareOldTitle: "แบบเดิม (ส่ง PDF / รูปทีละรูป)",
    compareNewTitle: "ใช้แคตตาล็อก etalase.online",
    oldPoints: [
      "แชทล้นเพราะลูกค้าถามราคาและขนาดซ้ำๆ",
      "ต้องส่งรูปเดิมซ้ำให้ลูกค้าใหม่ทุกคน",
      "อัปเดตโควต้ารอบ PO ยากเมื่อเต็มแล้ว",
      "สรุปออเดอร์ด้วยมือเสี่ยงตกหล่น",
    ],
    newPoints: [
      "1 ลิงก์ไบโอรวมครบทุกตัวเลือกและรอบ PO",
      "แสดงป้าย Pre-Order (PO) และกำหนดจัดส่งอัตโนมัติ",
      "จำกัดโควต้าสต็อกได้ ป้องกันรับออเดอร์เกิน",
      "ส่งออเดอร์เข้า WhatsApp อย่างเป็นระเบียบ (ค่าคอมฯ 0%)",
    ],
    featuresTitle: "ฟีเจอร์จริงพร้อมใช้สำหรับช่วงเทศกาล",
    features: [
      {
        title: "โหมด Pre-Order (PO) และรอบจัดส่ง",
        desc: "เปิดป้าย Pre-Order พร้อมระบุรอบจัดส่งบนหน้าสินค้าได้ทันที",
      },
      {
        title: "ตัวเลือกขนาดและชุดกระเช้า",
        desc: "เพิ่มตัวเลือกขนาดหรือแพ็กเกจได้ในสินค้าเดียว",
      },
      {
        title: "สั่งผ่าน WhatsApp ค่าคอมฯ 0%",
        desc: "ออเดอร์ผ่านแชทไม่มีค่าธรรมเนียมแพลตฟอร์ม",
      },
      {
        title: "รองรับ QRIS อัตโนมัติ",
        desc: "ค่าธรรมเนียม QRIS เริ่มต้น 2% (PRO) หรือ 4.5% (Free)",
      },
    ],
    faqTitle: "คำถามที่พบบ่อย",
    faqs: [
      {
        question: "เริ่มต้นใช้งานฟรีจริงหรือไม่?",
        answer:
          "จริง แพ็กเกจฟรีรวมซับโดเมน สินค้าไม่จำกัด โหมด Pre-Order ตัวเลือกสินค้า และสั่งผ่านแชท 0% คอมมิชชัน",
      },
    ],
    bottomTitle: "พร้อมรับออเดอร์ขนมและกระเช้าให้เป็นระบบขึ้นหรือยัง?",
    bottomDesc: "สมัครฟรีวันนี้และสร้างแคตตาล็อกแรกของคุณได้ในไม่กี่นาที",
  },
  vi: {
    metaTitle:
      "Danh mục Online cho Tiệm Bánh & Giỏ Quà Tết — Miễn phí, 0% Hoa hồng | etalase.online",
    metaDesc:
      "Tạo danh mục bánh quy, bánh ngọt và giỏ quà lễ hội trong 5 phút. Hỗ trợ nhãn Pre-Order (PO), phân loại kích cỡ, giới hạn tồn kho và đặt hàng qua WhatsApp.",
    badge: "Giải pháp cho Tiệm Bánh & Giỏ Quà",
    h1: "Danh mục Bánh & Giỏ Quà Chốt Đơn Qua WhatsApp — Không Cần Gửi Từng Ảnh.",
    subtitle:
      "Sắp xếp bảng giá bánh, kích cỡ hộp và giỏ quà trong 1 đường link. Tích hợp nhãn Pre-Order (PO), phân loại và giới hạn số lượng. Bắt đầu miễn phí.",
    ctaPrimary: "Tạo Danh Mục Miễn Phí",
    ctaSecondary: "Xem Cửa Hàng Mẫu",
    trustNote: "Miễn phí mãi mãi • 0% hoa hồng đơn chat • Tạo < 5 phút",
    demoLabel: "Ví dụ giao diện cửa hàng",
    showcaseTitle: "Hiển Thị Chuyên Nghiệp Cho Bánh & Quà Tặng",
    showcaseDesc:
      "Khách hàng dễ dàng xem ảnh, chọn kích cỡ hộp, lịch giao hàng PO và giá bán mà không cần hỏi lại nhiều lần.",
    compareTitle: "Vì Sao Tiệm Bánh Chuyển Sang etalase.online?",
    compareOldTitle: "Cách Cũ (Gửi PDF / Ảnh Lẻ)",
    compareNewTitle: "Dùng Danh Mục etalase.online",
    oldPoints: [
      "Quá tải tin nhắn hỏi giá và kích cỡ hộp",
      "Phải gửi lại nhiều ảnh cho từng khách mới",
      "Khó báo hết suất đặt trước PO khi đã đủ đơn",
      "Tổng hợp đơn thủ công dễ nhầm lẫn",
    ],
    newPoints: [
      "1 link bio chứa đầy đủ phân loại và lịch PO rõ ràng",
      "Tự động hiện nhãn Pre-Order (PO) & thời gian giao",
      "Giới hạn tồn kho tránh quá tải mùa cao điểm",
      "Đơn hàng gửi qua WhatsApp gọn gàng (0% hoa hồng)",
    ],
    featuresTitle: "Tính Năng Thực Tế Cho Mùa Lễ Hội",
    features: [
      {
        title: "Chế Độ Pre-Order (PO) & Lịch Giao",
        desc: "Bật nhãn đặt trước và ghi rõ đợt giao hàng ngay trên từng sản phẩm.",
      },
      {
        title: "Phân Loại Kích Cỡ & Hộp Quà",
        desc: "Thêm nhiều lựa chọn kích cỡ trong cùng một sản phẩm.",
      },
      {
        title: "Đặt Hàng WhatsApp 0% Hoa Hồng",
        desc: "Nhận đơn trực tiếp qua chat mà không mất phí hoa hồng.",
      },
      {
        title: "Tùy Chọn Thanh Toán QRIS",
        desc: "Phí giao dịch QRIS minh bạch từ 2% (PRO) hoặc 4.5% (Free).",
      },
    ],
    faqTitle: "Câu Hỏi Thường Gặp",
    faqs: [
      {
        question: "Có thực sự miễn phí để bắt đầu không?",
        answer:
          "Có. Gói Miễn phí bao gồm 1 tên miền phụ, không giới hạn sản phẩm, chế độ Pre-Order (PO), phân loại và đơn WhatsApp 0% hoa hồng.",
      },
    ],
    bottomTitle: "Sẵn Sàng Nhận Đơn Bánh & Quà Tặng Gọn Gàng Hơn?",
    bottomDesc: "Đăng ký miễn phí ngay hôm nay và hoàn thiện danh mục trong vài phút.",
  },
};

export async function generateMetadata({
  searchParams,
}: KueHampersPageProps): Promise<Metadata> {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";
  const copy = PAGE_COPY[locale] || PAGE_COPY.id;

  return generateLocalizedMetadata({
    path: "/solusi/kue-hampers",
    locale,
    title: copy.metaTitle,
    description: copy.metaDesc,
    imageUrl: `${BASE_URL}/images/hampers/hampers-box.webp`,
    type: "website",
    keywords: [
      "katalog kue kering online",
      "katalog hampers lebaran natal",
      "website jualan kue whatsapp",
      "pre order kue kering",
      "etalase toko kue gratis",
    ],
  });
}

export default async function KueHampersSolutionPage({
  searchParams,
}: KueHampersPageProps) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const copy = PAGE_COPY[locale] || PAGE_COPY.id;

  const getLocalizedHref = (basePath: string) => {
    if (locale === "id") return basePath;
    return `/${locale}${basePath}`;
  };

  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: locale === "id" ? "Beranda" : "Home", url: getLocalizedHref("/") },
    { name: locale === "id" ? "Solusi" : "Solutions", url: getLocalizedHref("/solusi") },
    { name: "Kue & Hampers", url: getLocalizedHref("/solusi/kue-hampers") },
  ]);

  const webPageJsonLd = generateWebPageJsonLd({
    url: getLocalizedHref("/solusi/kue-hampers"),
    name: copy.h1,
    description: copy.metaDesc,
    locale,
  });

  const faqJsonLd = generateFaqJsonLd(copy.faqs);

  const featureIcons = [CalendarClock, Layers, MessageCircle, QrCode];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5] text-[#1C1917]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <GlobalHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-10 pb-14 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-[#57534E] flex items-center gap-2 mb-6"
          >
            <Link href={getLocalizedHref("/")} className="hover:text-[#D94E28] transition">
              {locale === "id" ? "Beranda" : "Home"}
            </Link>
            <span>/</span>
            <Link href={getLocalizedHref("/solusi")} className="hover:text-[#D94E28] transition">
              {locale === "id" ? "Solusi" : "Solutions"}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#1C1917]">Kue &amp; Hampers</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 bg-[#FDF0EC] border border-[#FADCD3] text-[#D94E28] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{copy.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.15]">
                {copy.h1}
              </h1>

              <p className="text-[#57534E] text-base sm:text-lg leading-relaxed">
                {copy.subtitle}
              </p>

              <p className="text-xs sm:text-sm font-semibold text-[#D94E28] bg-[#FDF0EC] border border-[#FADCD3] px-3.5 py-2 rounded-xl inline-block">
                {locale === "id"
                  ? "Siap buka PO Natal minggu ini? Toko kamu bisa online malam ini."
                  : "Opening holiday Pre-Orders this week? Your store can go live tonight."}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href={`${getLocalizedHref("/register")}?segmen=kue-hampers`}
                  className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition shadow-sm inline-flex items-center justify-center gap-2"
                >
                  <span>{copy.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://digital.etalase.online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-stone-50 border border-[#E7E5E4] text-[#1C1917] font-semibold px-5 py-3.5 rounded-xl text-sm transition inline-flex items-center justify-center"
                >
                  {copy.ctaSecondary}
                </a>
              </div>

              <p className="text-xs text-[#57534E] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{copy.trustNote}</span>
              </p>
            </div>

            {/* Real Visual Showcase */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-[#E7E5E4] rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#57534E]">
                  <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] px-2.5 py-1 rounded-full">
                    {copy.demoLabel}
                  </span>
                  <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                    PO • Batch Natal &amp; Lebaran
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 relative rounded-2xl overflow-hidden border border-[#E7E5E4] aspect-[16/10]">
                    <Image
                      src="/images/hampers/hampers-box.webp"
                      alt="Contoh tampilan kotak hampers kue kering dengan pita satin"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 540px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[#E7E5E4] aspect-[4/3]">
                    <Image
                      src="/images/hampers/nastar-kastengel.webp"
                      alt="Contoh tampilan toples kue kering nastar dan kastengel"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 50vw, 260px"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-[#E7E5E4] aspect-[4/3]">
                    <Image
                      src="/images/hampers/bakery-packing.webp"
                      alt="Contoh persiapan pengiriman pre-order kue kering dan hampers"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 50vw, 260px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs text-[#57534E] leading-relaxed pt-1">
                  {copy.showcaseDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Catalog Preview Mockup */}
        <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#E7E5E4] text-[#57534E] px-3 py-1 rounded-full text-xs font-semibold">
                {copy.demoLabel} • digital.etalase.online
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                {locale === "id"
                  ? "Begini Tampilan Katalog Kue Anda di HP Pembeli"
                  : "How Your Cookie Catalog Looks on Buyers' Phones"}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                {locale === "id"
                  ? "Pembeli langsung melihat foto produk, pilihan varian ukuran toples, badge Pre-Order (PO), dan tombol pesan ke WhatsApp—tanpa perlu tanya harga satu per satu."
                  : "Buyers see product photos, jar size options, Pre-Order (PO) badges, and a direct WhatsApp order button in one clean mobile view."}
              </p>
              <a
                href="https://digital.etalase.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D94E28] hover:underline"
              >
                <span>{copy.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[320px] bg-[#1C1917] rounded-[2.2rem] p-3 shadow-xl border-4 border-stone-800">
                <div className="bg-[#FAF8F5] rounded-[1.6rem] overflow-hidden p-4 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-[#57534E] border-b border-[#E7E5E4] pb-2">
                    <span className="font-bold text-[#1C1917]">Dapur Bunda</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                      PO Natal
                    </span>
                  </div>

                  <div className="bg-white border border-[#E7E5E4] rounded-2xl p-3 space-y-2">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                      <Image
                        src="/images/hampers/nastar-kastengel.webp"
                        alt="Nastar Wisman Klasik contoh tampilan HP"
                        fill
                        loading="lazy"
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">Nastar Wisman Klasik</div>
                        <div className="text-[10px] text-amber-700 font-semibold">
                          PO • Kirim 18 Des • Sisa 40
                        </div>
                      </div>
                      <div className="text-xs font-extrabold text-[#D94E28]">Rp 85.000</div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      <span className="text-[10px] font-semibold bg-[#FDF0EC] text-[#D94E28] border border-[#FADCD3] px-2 py-0.5 rounded-lg">
                        Toples 250gr
                      </span>
                      <span className="text-[10px] font-semibold bg-stone-100 text-[#57534E] px-2 py-0.5 rounded-lg">
                        Toples 500gr
                      </span>
                    </div>
                    <div className="w-full bg-emerald-600 text-white text-[11px] font-bold py-2 rounded-xl text-center">
                      Pesan via WhatsApp (0% Komisi)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison: PDF/WA vs Etalase */}
        <section className="py-14 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] text-center mb-8">
            {copy.compareTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-[#1C1917]">{copy.compareOldTitle}</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#57534E]">
                {copy.oldPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-[#D94E28] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-[#D94E28]">{copy.compareNewTitle}</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#1C1917]">
                {copy.newPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Real Features Grid */}
        <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] text-center mb-8">
            {copy.featuresTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {copy.features.map((feat, idx) => {
              const Icon = featureIcons[idx] || CheckCircle2;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E7E5E4] rounded-3xl p-6 space-y-2.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#FDF0EC] border border-[#FADCD3] flex items-center justify-center text-[#D94E28]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C1917]">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section (AEO / GEO) */}
        <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] text-center mb-8">
            {copy.faqTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {copy.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E7E5E4] rounded-2xl p-6 space-y-2"
              >
                <h3 className="text-sm font-bold text-[#1C1917]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
          <div className="bg-[#FDF0EC] border border-[#FADCD3] rounded-3xl p-8 sm:p-12 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {copy.bottomTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-xl mx-auto leading-relaxed">
              {copy.bottomDesc}
            </p>
            <div className="pt-2">
              <Link
                href={`${getLocalizedHref("/register")}?segmen=kue-hampers`}
                className="bg-[#D94E28] hover:bg-[#B83E1D] text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition shadow-sm inline-flex items-center gap-2"
              >
                <span>{copy.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </div>
  );
}
