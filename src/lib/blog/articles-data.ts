import { SupportedLocale } from "@/lib/config/constants";
import { EDITORIAL_TEAM_MAP } from "@/lib/seo/metadata-helper";

export interface ArticleTranslation {
  title: string;
  summary: string;
  category: string;
  readTime: string;
  directAnswer: string;
  keyTakeaways: string[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  sections: {
    heading: string;
    directAnswer?: string;
    content: string[];
    bulletPoints?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface ArticleData {
  slug: string;
  datePublished: string;
  dateModified: string;
  image: {
    url: string;
    width: number;
    height: number;
    alt: Record<SupportedLocale, string>;
    caption: Record<SupportedLocale, string>;
  };
  author: {
    name: Record<SupportedLocale, string>;
    role: Record<SupportedLocale, string>;
    bio: Record<SupportedLocale, string>;
    avatar: string;
  };
  translations: Record<SupportedLocale, ArticleTranslation>;
}

export const ARTICLES_DATA: ArticleData[] = [
  {
    slug: "cara-jual-produk-digital-2027",
    datePublished: "2026-11-20T08:00:00+07:00",
    dateModified: "2026-11-23T14:30:00+07:00",
    image: {
      url: "/images/blog/cover-digital-products.jpg",
      width: 1200,
      height: 675,
      alt: {
        id: "Kreator konten menyusun e-book dan template digital di laptop untuk dijual otomatis via WhatsApp di etalase.online",
        en: "Digital creator drafting e-books and templates on laptop for automated WhatsApp delivery via etalase.online",
        ms: "Pencipta digital menyusun e-buku dan templat pada komputer riba untuk jualan automatik WhatsApp",
        th: "ครีเอเตอร์สร้างอีบุ๊กและเทมเพลตดิจิทัลเพื่อส่งมอบอัตโนมัติผ่าน WhatsApp บน etalase.online",
        vi: "Nhà sáng tạo số thiết kế e-book và template để gửi tự động qua WhatsApp trên etalase.online",
      },
      caption: {
        id: "Alur penjualan produk digital otomatis: Pembeli bayar via QRIS, file terkirim dalam 3 detik ke WhatsApp.",
        en: "Automated digital product pipeline: Buyer pays with instant QRIS, asset delivered to WhatsApp in 3 seconds.",
        ms: "Aliran jualan digital automatik: Pembeli bayar QRIS, fail dihantar ke WhatsApp dalam 3 saat.",
        th: "ขั้นตอนการขายดิจิทัลอัตโนมัติ: ผู้ซื้อชำระผ่าน QRIS ไฟล์ส่งถึง WhatsApp ภายใน 3 วินาที",
        vi: "Quy trình bán sản phẩm số tự động: Người mua thanh toán QRIS, nhận tài liệu qua WhatsApp sau 3 giây.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Spesialis Pertumbuhan E-Commerce SEA",
        en: "SEA E-Commerce Growth Specialist",
        ms: "Pakar Pertumbuhan E-Dagang SEA",
        th: "ผู้เชี่ยวชาญการเติบโตอีคอมเมิร์ซเอเชียตะวันออกเฉียงใต้",
        vi: "Chuyên gia Tăng trưởng Thương mại Điện tử Đông Nam Á",
      },
      bio: {
        id: "Praktisi e-commerce dan arsitek transaksi chat dengan rekam jejak membantu lebih dari 10.000 kreator di Asia Tenggara memaksimalkan margin keuntungan.",
        en: "E-commerce practitioner and chat commerce architect helping over 10,000 creators across Southeast Asia maximize their margins.",
        ms: "Pengamal e-dagang dan arkitek perdagangan chat yang membantu lebih 10,000 pencipta memaksimumkan margin keuntungan.",
        th: "ผู้เชี่ยวชาญด้านการค้าผ่านแชตที่ช่วยครีเอเตอร์กว่า 10,000 รายทั่วเอเชียตะวันออกเฉียงใต้เพิ่มกำไรสูงสุด",
        vi: "Chuyên gia thương mại trò chuyện giúp hơn 10.000 nhà sáng tạo tối ưu hóa biên lợi nhuận tại Đông Nam Á.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "5 Cara Menghasilkan 10 Juta Pertama dari Produk Digital Tanpa Modal Iklan",
        summary: "Panduan teknis langkah demi langkah mengubah keahlian, template Canva, dan e-book PDF menjadi aset digital berulang dengan sistem pengiriman otomatis via WhatsApp.",
        category: "Produk Digital",
        readTime: "5 min baca",
        directAnswer: "Cara menghasilkan 10 juta pertama dari produk digital tanpa modal iklan adalah dengan mengemas keahlian spesifik menjadi produk mikro (e-book, Canva/Notion template, atau preset), menampilkannya di etalase bio link mobile-first yang cepat, dan mengotomasi pengiriman file ke WhatsApp pembeli secara instan setelah pembayaran QRIS terkonfirmasi.",
        keyTakeaways: [
          "Mulai dari 'Micro-Asset' yang menyelesaikan 1 masalah spesifik dalam waktu kurang dari 30 menit.",
          "Gunakan etalase web mobile-first dengan loading di bawah 1 detik untuk menekan drop-off calon pembeli.",
          "Pilih jalur pengiriman otomatis via WhatsApp (3 detik) agar pembeli langsung merasakan kepuasan instan.",
          "Pertahankan margin utuh 100% dengan platform berbiaya 0% komisi order chat seperti etalase.online.",
        ],
        table: {
          caption: "Perbandingan Jalur Penjualan Produk Digital di Asia Tenggara",
          headers: ["Kriteria Evaluasi", "Etalase.online Storefront", "Marketplace Konvensional", "Link Bio Konvensional"],
          rows: [
            ["Komisi Transaksi", "0% Order Chat (2% QRIS BorderPay)", "8% - 15% dari total omset", "Bukan sistem checkout"],
            ["Waktu Kirim File", "Otomatis ke WhatsApp (3 Detik)", "Manual via chat marketplace", "Manual kirim email/gdrive"],
            ["Kepemilikan Data Pembeli", "100% Milik Anda (Nomor WA & Nama)", "Dianonimkan platform", "Hanya analitik klik tautan"],
            ["Batas Jumlah Produk", "Unlimited Tanpa Batas (Paket Gratis)", "Terbatas algoritma katalog", "Terbatas 5-10 tombol teks"],
          ],
        },
        sections: [
          {
            heading: "1. Mengapa Produk Digital Menjadi Pilihan Monetisasi Paling Menjanjikan di 2027?",
            directAnswer: "Produk digital memiliki margin laba bersih hingga 95% karena tidak membutuhkan biaya gudang, pengemasan, maupun kurir pengiriman fisik.",
            content: [
              "Di pasar Asia Tenggara yang memiliki penetrasi pengguna ponsel pintar lebih dari 88%, tren konsumsi edukasi mikro melonjak drastis. Konsumen tidak lagi mencari kursus video 40 jam yang membosankan. Mereka rela membayar Rp 39.000 hingga Rp 199.000 untuk template kerja Notion, e-book ringkas 25 halaman, atau preset warna Lightroom yang langsung memberikan hasil dalam 15 menit.",
              "Keuntungan terbesar kreator lokal adalah skalabilitas: Anda hanya membuat produk satu kali, dan dapat menjualnya ribuan kali tanpa menambah biaya produksi sepeser pun.",
            ],
            bulletPoints: [
              "Nol biaya cetak, nol risiko stok kadaluarsa, dan nol biaya retur barang.",
              "Transaksi selesai di genggaman ponsel menggunakan QRIS instan.",
              "Cocok untuk kreator konten edukasi, desainer, akuntan, guru privat, dan konsultan.",
            ],
          },
          {
            heading: "2. Menentukan 'One Big Pain Point' yang Dicari Pembeli",
            directAnswer: "Produk digital yang laris manis bukanlah yang membahas topik umum, melainkan yang memecahkan satu hambatan teknis yang menyita waktu pembeli.",
            content: [
              "Daripada membuat e-book umum 'Cara Sukses Berbisnis', buatlah panduan taktis seperti 'Template Spreadsheet Hitung HPP Kuliner & Margin BorderPay'. Calon pembeli langsung memahami nilai ekonomis dari produk tersebut dibanding waktu berhari-hari yang harus mereka habiskan untuk menyusunnya sendiri.",
            ],
          },
          {
            heading: "3. Mekanisme Checkout Instan: Mengapa Otomasi WhatsApp Mengalahkan Email?",
            directAnswer: "Tingkat keterbukaan (open rate) WhatsApp di Asia Tenggara mencapai 98%, berbanding terbalik dengan email yang rata-rata hanya dibuka di bawah 20%.",
            content: [
              "Ketika seorang pembeli mentransfer uang di tengah malam, menunggu email masuk ke folder promosi atau spam memicu kepanikan dan komplain. Dengan sistem etalase.online, begitu QRIS diverifikasi oleh payment gateway, bot sistem langsung mengirim tautan unduhan dan tanda terima resmi ke nomor WhatsApp pembeli dalam 3 detik.",
              "Kepuasan instan ini membangun kepercayaan luar biasa dan mendorong pembeli memberikan ulasan positif serta membeli produk kedua Anda.",
            ],
          },
          {
            heading: "4. Strategi Distribusi Organik Tanpa Membakar Anggaran Iklan",
            directAnswer: "Gunakan formula 'Hook Edukasi + Call-to-Action ke Subdomain Mandiri' di bio TikTok, Reels Instagram, dan YouTube Shorts.",
            content: [
              "Berikan 20% solusi di video konten pendek Anda, lalu arahkan penonton untuk mengambil panduan lengkap atau template kerja di tautan bio Anda (misal `namaanda.etalase.online`). Tampilan etalase yang rapi dengan cover banner, foto produk tajam, dan harga coret terbukti meningkatkan rasio klik-ke-bayar hingga 3,4 kali lipat dibanding daftar link teks abu-abu yang membosankan.",
            ],
          },
        ],
        faqs: [
          {
            question: "Apakah etalase.online mengenakan biaya komisi untuk penjualan produk digital?",
            answer: "Tidak ada komisi sama sekali (0%) untuk pesanan yang diproses via WhatsApp. Untuk transaksi checkout langsung via QRIS otomatis BorderPay, platform fee hanya 2% (Pro) atau 4.5% (Free), dan biaya ini dapat diatur untuk ditanggung oleh pembeli (Convenience Fee) sehingga margin keuntungan kreator tetap 100% utuh.",
          },
          {
            question: "Format file produk digital apa saja yang didukung untuk pengiriman otomatis?",
            answer: "Anda dapat membagikan tautan unduhan dokumen PDF, template Canva, workspace Notion, berkas ZIP, preset foto/video Google Drive, hingga tautan akses video webinar pribadi.",
          },
          {
            question: "Berapa lama waktu yang dibutuhkan untuk mengatur etalase produk digital pertama?",
            answer: "Kurang dari 3 menit. Cukup daftar dengan akun Google, pilih nama subdomain, unggah judul produk serta tautan file unduhan, dan etalase Anda langsung live siap menerima pesanan.",
          },
        ],
      },
      en: {
        title: "5 Steps to Earn Your First $1,000 from Digital Products Without Paid Ads",
        summary: "A step-by-step technical guide to turning skills, Canva templates, and PDF guides into recurring digital revenue with automated WhatsApp fulfillment.",
        category: "Digital Products",
        readTime: "5 min read",
        directAnswer: "To generate your first $1,000 from digital products without ad spend, package a specific micro-skill into a high-utility asset (e-book, Notion template, or preset), showcase it on a lightning-fast mobile bio link storefront, and automate immediate delivery to the buyer's WhatsApp upon instant QRIS payment verification.",
        keyTakeaways: [
          "Focus on micro-assets that solve 1 specific friction point in under 30 minutes.",
          "Use a mobile-first web storefront loading under 1 second to eliminate drop-offs.",
          "Automate WhatsApp delivery within 3 seconds for instant gratification.",
          "Keep 100% of your margins by avoiding marketplace commission fees with etalase.online.",
        ],
        table: {
          caption: "Southeast Asia Digital Product Sales Channels Compared",
          headers: ["Evaluation Metric", "Etalase.online Storefront", "Traditional Marketplaces", "Standard Bio Links"],
          rows: [
            ["Sales Commission", "0% Chat Orders (2% QRIS BorderPay)", "8% - 15% revenue deduction", "Not a checkout tool"],
            ["Fulfillment Speed", "Automated to WhatsApp (3 Sec)", "Manual marketplace chat", "Manual email dispatch"],
            ["Customer Data Ownership", "100% Yours (WA number & name)", "Masked / platform-owned", "Click metrics only"],
            ["Product Catalog Limit", "Unlimited (Free Tier)", "Restricted by platform rules", "Limited text links"],
          ],
        },
        sections: [
          {
            heading: "1. Why Digital Products Offer Unmatched Margins in 2027",
            directAnswer: "Digital products deliver up to 95% net profit margins because they carry zero warehousing, packaging, or postal shipping costs.",
            content: [
              "With smartphone adoption surpassing 88% in Southeast Asia, the demand for practical micro-learning has exploded. Buyers are moving away from lengthy 40-hour courses in favor of instantly actionable Notion systems, 25-page operational playbooks, and photo presets.",
              "As a creator, your advantage is boundless scalability: create once, sell infinitely with zero recurring production overhead.",
            ],
          },
          {
            heading: "2. The WhatsApp Delivery Advantage over Email",
            directAnswer: "WhatsApp boasts an open rate of 98% across Southeast Asia, compared to email open rates that typically languish below 20%.",
            content: [
              "When an overseas or local buyer checks out at midnight, waiting for a confirmation email in their spam folder creates anxiety. etalase.online triggers instant WhatsApp delivery with download links and receipts within 3 seconds of verified settlement.",
            ],
          },
        ],
        faqs: [
          {
            question: "Does etalase.online charge commissions on chat orders?",
            answer: "No commission (0%) is charged on WhatsApp chat orders. Direct QRIS checkouts carry only a nominal 2% (Pro) or 4.5% (Free) fee, which can be passed to buyers as a convenience fee to preserve 100% of creator profit.",
          },
          {
            question: "What digital asset formats can be fulfilled automatically?",
            answer: "PDF files, Canva shared links, Notion workspaces, cloud storage URLs (Google Drive/Dropbox), ZIP files, and private webinar access links.",
          },
        ],
      },
      ms: {
        title: "5 Langkah Menjana RM3,000 Pertama Daripada Produk Digital Tanpa Modal Iklan",
        summary: "Panduan teknikal mengubah kemahiran, templat Canva dan e-buku menjadi aset digital berulang dengan penghantaran automatik via WhatsApp.",
        category: "Produk Digital",
        readTime: "5 min baca",
        directAnswer: "Cara menjana RM3,000 pertama daripada produk digital tanpa iklan berbayar adalah dengan mempakejkan kemahiran khusus menjadi produk mikro, mempamerkannya di etalase bio link mobile pantas, dan mengautomasikan penghantaran fail terus ke WhatsApp pembeli sebaik bayaran disahkan.",
        keyTakeaways: [
          "Bina produk mikro yang menyelesaikan satu masalah spesifik dalam 30 minit.",
          "Gunakan etalase web mobile-first dengan kepantasan bawah 1 saat.",
          "Hantar fail automatik ke WhatsApp dalam masa 3 saat.",
          "Kekalkan margin penuh 100% tanpa potongan komisi pasaran konvensional.",
        ],
        sections: [
          {
            heading: "1. Mengapa Produk Digital Sangat Menguntungkan?",
            directAnswer: "Produk digital menawarkan margin keuntungan bersih sehingga 95% tanpa kos penghantaran fizikal atau inventori.",
            content: [
              "Di pasaran Asia Tenggara termasuk Malaysia, pembeli lebih gemar membeli panduan ringkas dan templat berguna yang boleh digunakan serta-merta.",
            ],
          },
        ],
        faqs: [
          {
            question: "Adakah terdapat yuran komisen bagi jualan chat WhatsApp?",
            answer: "Tiada komisen (0%) untuk pesanan melalui WhatsApp. Untuk checkout QRIS automatik, yuran serendah 2% sahaja dan boleh ditanggung pembeli.",
          },
        ],
      },
      th: {
        title: "5 ขั้นตอนสร้างรายได้ 25,000 บาทแรกจากสินค้าดิจิทัลโดยไม่ต้องลงโฆษณา",
        summary: "คู่มือเปลี่ยนทักษะ เทมเพลต Canva และอีบุ๊กให้เป็นรายได้ต่อเนื่อง ด้วยระบบจัดส่งอัตโนมัติผ่าน WhatsApp และ QRIS",
        category: "สินค้าดิจิทัล",
        readTime: "5 นาทีอ่าน",
        directAnswer: "วิธีสร้างรายได้ 25,000 บาทแรกจากสินค้าดิจิทัลโดยไม่เสียค่าโฆษณา คือการสรุปทักษะเฉพาะทางเป็นเทมเพลตหรืออีบุ๊ก จัดแสดงบนหน้าร้านไบโอลิงก์ที่โหลดเร็ว และส่งลิงก์ดาวน์โหลดถึง WhatsApp ทันทีเมื่อชำระเงินผ่าน QRIS สำเร็จ",
        keyTakeaways: [
          "เริ่มจาก Micro-Asset ที่แก้ปัญหาชัดเจนใน 30 นาที",
          "ใช้หน้าร้านบนมือถือที่โหลดเร็วกว่า 1 วินาที",
          "ส่งมอบไฟล์อัตโนมัติผ่าน WhatsApp ใน 3 วินาที",
          "กำไรเต็ม 100% ด้วยระบบ 0% ค่าคอมมิชชันแชต",
        ],
        sections: [
          {
            heading: "1. ความได้เปรียบของสินค้าดิจิทัลในตลาดเอเชียตะวันออกเฉียงใต้",
            directAnswer: "สินค้าดิจิทัลให้อัตรากำไรสุทธิสูงถึง 95% โดยไม่มีต้นทุนสต็อกหรือค่าจัดส่งพัสดุ",
            content: [
              "ผู้ซื้อในยุคปัจจุบันต้องการวิธีแก้ปัญหาที่รวดเร็ว เช่น เทมเพลต Notion หรือพรีเซ็ตแต่งภาพ พร้อมดาวน์โหลดทันทีหลังสแกนจ่าย",
            ],
          },
        ],
        faqs: [
          {
            question: "etalase.online หักค่าคอมมิชชันคำสั่งซื้อทางแชตหรือไม่?",
            answer: "ไม่มีการหักค่าคอมมิชชันใดๆ (0%) สำหรับออเดอร์แชต WhatsApp",
          },
        ],
      },
      vi: {
        title: "5 Bước Kiếm 15 Triệu Đầu Tiên Từ Sản Phẩm Số Không Cần Chi Phí Quảng Cáo",
        summary: "Hướng dẫn kỹ thuật biến chuyên môn, template Canva và e-book thành tài sản số thu nhập đều đặn với hệ thống gửi tự động qua WhatsApp.",
        category: "Sản phẩm số",
        readTime: "5 phút đọc",
        directAnswer: "Cách tạo 15 triệu đầu tiên từ sản phẩm số mà không tốn tiền quảng cáo là đóng gói kiến thức thành tài liệu hữu ích (e-book, template Canva), giới thiệu trên trang bio link storefront di động tải nhanh, và gửi tự động vào WhatsApp của khách ngay sau khi thanh toán QR hoàn tất.",
        keyTakeaways: [
          "Tạo micro-asset giải quyết dứt điểm 1 vấn đề cụ thể trong 30 phút.",
          "Dùng storefront tối ưu trên di động với tốc độ tải trang dưới 1 giây.",
          "Giao file tự động qua WhatsApp chỉ trong 3 giây.",
          "Bảo toàn 100% biên lợi nhuận với 0% hoa hồng đơn chat.",
        ],
        sections: [
          {
            heading: "1. Tại sao sản phẩm số là cơ hội vàng tại Đông Nam Á?",
            directAnswer: "Sản phẩm số mang lại tỷ suất lợi nhuận ròng lên đến 95% do hoàn toàn không tốn chi phí kho bãi và vận chuyển.",
            content: [
              "Khách hàng ngày nay sẵn sàng chi tiền cho các tài liệu thực chiến giúp họ tiết kiệm hàng chục giờ mày mò.",
            ],
          },
        ],
        faqs: [
          {
            question: "Nền tảng etalase.online có thu phí hoa hồng đơn hàng chat không?",
            answer: "Hoàn toàn 0% hoa hồng cho các đơn hàng xử lý qua WhatsApp.",
          },
        ],
      },
    },
  },
  {
    slug: "strategi-closing-sales-mobil-chat",
    datePublished: "2026-11-18T09:00:00+07:00",
    dateModified: "2026-11-23T15:00:00+07:00",
    image: {
      url: "/images/blog/cover-showroom-sales.jpg",
      width: 1200,
      height: 675,
      alt: {
        id: "Showroom mobil digital di layar smartphone yang menghubungkan calon pembeli langsung ke WhatsApp sales executive",
        en: "Mobile digital car showroom connecting prospective buyers directly to dealership sales executive via WhatsApp",
        ms: "Bilik pameran kereta digital di telefon pintar menghubungkan pembeli ke WhatsApp eksekutif jualan",
        th: "โชว์รูมรถยนต์ดิจิทัลบนสมาร์ตโฟนเชื่อมต่อผู้ซื้อไปยัง WhatsApp ของพนักงานขายทันที",
        vi: "Showroom ô tô kỹ thuật số trên điện thoại kết nối khách hàng trực tiếp đến WhatsApp nhân viên kinh doanh",
      },
      caption: {
        id: "Showroom Pro Archetype: Memudahkan simulasi DP dan booking test drive dalam 1 klik tanpa unduh PDF 25MB.",
        en: "Showroom Pro Archetype: Enables 1-click test drive bookings and down-payment inquiries without bulky PDF downloads.",
        ms: "Showroom Pro Archetype: Tempahan pandu uji dan simulasi bayaran pendahuluan dalam 1 klik.",
        th: "Showroom Pro Archetype: จองทดลองขับและคำนวณค่างวดได้ในคลิกเดียวโดยไม่ต้องโหลดไฟล์ PDF หนักๆ",
        vi: "Showroom Pro Archetype: Đặt lịch lái thử và tư vấn trả góp 1 chạm mà không cần tải tài liệu PDF nặng nề.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Konsultan Konversi Penjualan Otomotif & Properti",
        en: "Automotive & Property Sales Conversion Consultant",
        ms: "Konsultan Penukaran Jualan Automotif & Hartanah",
        th: "ที่ปรึกษาการปิดการขายยานยนต์และอสังหาริมทรัพย์",
        vi: "Tư vấn Chuyển đổi Bán hàng Ô tô & Bất động sản",
      },
      bio: {
        id: "Membimbing ratusan konsultan sales otomotif dan agen properti terkemuka di Asia Tenggara mendigitalisasi katalog jualan ke format mobile berkonversi tinggi.",
        en: "Guiding leading automotive and real estate consultants in Southeast Asia to modernize catalogs into high-converting mobile experiences.",
        ms: "Membimbing perunding jualan automotif dan ejen hartanah mendigitalkan katalog jualan.",
        th: "ให้คำปรึกษาแก่ที่ปรึกษาการขายรถยนต์และอสังหาริมทรัพย์ชั้นนำในการสร้างแคตตาล็อกดิจิทัล",
        vi: "Đồng hành cùng hàng trăm tư vấn viên ô tô và môi giới bất động sản chuyển đổi số danh mục sản phẩm.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Rahasia Closing 12 Unit Mobil Per Bulan dengan Katalog Online & WhatsApp",
        summary: "Bagaimana konsultan otomotif senior mengganti brosur PDF yang berat dengan showroom mobile yang ringan dan menghasilkan prospek test drive berkualitas.",
        category: "Sales & Properti",
        readTime: "4 min baca",
        directAnswer: "Rahasia konsultan otomotif sukses menutup 12 unit mobil per bulan adalah mengganti brosur PDF statis berukuran 25 MB dengan etalase showroom visual mobile yang ringan, lengkap dengan tombol pesan pra-isi ke WhatsApp untuk simulasi kredit dan booking test drive dalam 1 klik.",
        keyTakeaways: [
          "Brosur PDF ukuran besar sering gagal dibuka karena sinyal internet lambat atau kuota habis.",
          "Etalase web Showroom Pro memuat spesifikasi, galeri foto, dan simulasi DP dalam waktu 0,8 detik.",
          "Setiap tombol 'Tanya Sales' langsung membuka WhatsApp dengan format pesan nama unit otomatis.",
          "Sales dapat melacak unit mana yang paling sering diklik calon pembeli secara real-time.",
        ],
        table: {
          caption: "Perbandingan Efektivitas Penjualan: Showroom Etalase vs Brosur PDF Tradisional",
          headers: ["Parameter", "Showroom Mobile Etalase.online", "Brosur PDF Tradisional"],
          rows: [
            ["Kecepatan Buka Halaman", "Kurang dari 1 detik di semua smartphone", "5-15 detik unduh file 25 MB"],
            ["Rasio Respon Chat", "Tinggi (Tombol langsung ke WhatsApp)", "Rendah (Calon pembeli harus catat nomor manual)"],
            ["Pembaruan Harga & Promo", "Real-time dari dashboard ponsel", "Wajib cetak atau kirim ulang file PDF baru"],
            ["Kesan Profesional", "Tampilan premium ber-subdomain resmi", "Terkesan kaku dan menghabiskan memori pembeli"],
          ],
        },
        sections: [
          {
            heading: "1. Mengapa Brosur PDF Membunuh Minat Calon Pembeli Anda?",
            directAnswer: "Brosur PDF membutuhkan pengunduhan data besar dan memaksa calon pembeli memperbesar layar (zoom-in) secara canggung di layar ponsel.",
            content: [
              "Studi perilaku konsumen Asia Tenggara menunjukkan lebih dari 62% prospek membatalkan niat bertanya jika harus mengunduh file dokumen di atas 10 MB. Pembeli menginginkan navigasi mulus layaknya membuka aplikasi media sosial: melihat foto eksterior-interior, membaca rangkuman promo DP ringan, lalu langsung menekan tombol chat WhatsApp.",
            ],
          },
          {
            heading: "2. Mengunci Prospek Panas dengan Template 'Showroom Pro'",
            directAnswer: "Arketipe Showroom Pro dirancang dengan tata letak visual bersih, badge status 'Unit Tersedia', dan tombol aksi tunggal yang terhubung ke nomor sales.",
            content: [
              "Dengan mengelompokkan kendaraan berdasarkan kategori (SUV, Sedan, MPV Listrik) serta menyertakan perkiraan angsuran bulanan, calon pembeli datang ke obrolan WhatsApp dalam kondisi teredukasi dan siap membuat janji temu test drive.",
            ],
          },
        ],
        faqs: [
          {
            question: "Apakah etalase ini bisa dipakai untuk agen properti dan sales motor?",
            answer: "Sangat bisa. Arketipe Showroom Pro cocok untuk semua produk bernilai tinggi (high-ticket items) seperti properti perumahan, mobil baru/bekas, sepeda motor, alat berat, hingga sewa genset industri.",
          },
          {
            question: "Bagaimana cara menghubungkan katalog showroom ke nomor WhatsApp pribadi?",
            answer: "Cukup masukkan nomor WhatsApp aktif Anda dengan kode negara (contoh: 628123456789) di pengaturan toko etalase.online. Seluruh tombol 'Hubungi Sales' atau 'Simulasi DP' akan otomatis mengarahkan pembeli ke chat Anda dengan template teks pra-isi.",
          },
        ],
      },
      en: {
        title: "How an Automotive Consultant Closes 12 Vehicles Monthly via Mobile Showroom & WhatsApp",
        summary: "How senior auto sales professionals replace bulky 25MB PDF brochures with lightweight mobile showrooms to drive qualified test drive bookings.",
        category: "Sales & Showroom",
        readTime: "4 min read",
        directAnswer: "The secret to closing 12 vehicles per month lies in ditching static 25MB PDF specs for a responsive mobile showroom featuring pre-filled WhatsApp action buttons for instant test-drive scheduling and finance simulation.",
        keyTakeaways: [
          "Heavy PDFs cause high drop-off rates due to mobile bandwidth constraints.",
          "The Showroom Pro archetype loads vehicle specs and high-res photos under 0.8s.",
          "Pre-filled WhatsApp inquiries specify vehicle model automatically.",
        ],
        sections: [
          {
            heading: "1. The Demise of the 25MB PDF Brochure",
            directAnswer: "Over 62% of Southeast Asian mobile prospects abandon downloads when asked to pull files larger than 10MB.",
            content: [
              "Modern buyers want intuitive visual carousels, down payment summaries, and immediate WhatsApp connectivity.",
            ],
          },
        ],
        faqs: [
          {
            question: "Can real estate brokers also use this setup?",
            answer: "Yes, the Showroom Pro template is ideal for high-ticket real estate listings, luxury developments, and automotive dealerships.",
          },
        ],
      },
      ms: {
        title: "Rahsia Menutup Jualan 12 Unit Kereta Sebulan Melalui Katalog Mudah Alih & WhatsApp",
        summary: "Bagaimana perunding automotif menggantikan brosur PDF berat dengan bilik pameran mudah alih yang pantas untuk tempahan pandu uji.",
        category: "Jualan & Bilik Pameran",
        readTime: "4 min baca",
        directAnswer: "Kunci kejayaan jualan automotif adalah menggantikan PDF berat dengan bilik pameran mudah alih interaktif yang disambungkan terus ke WhatsApp dengan mesej pra-isi.",
        keyTakeaways: [
          "Laman mudah alih dibuka dalam masa bawah 1 saat.",
          "Mesej WhatsApp pra-isi mempercepatkan janji temu pandu uji.",
        ],
        sections: [
          {
            heading: "1. Mengapa Brosur PDF Merugikan Peluang Jualan Anda?",
            directAnswer: "Brosur PDF menyukarkan prospek membaca teks kecil pada skrin telefon pintar.",
            content: ["Bilik pameran digital yang ringan membolehkan pelanggan melihat gambar dan ansuran bulanan dengan pantas."],
          },
        ],
        faqs: [
          {
            question: "Bolehkah ejen hartanah menggunakannya?",
            answer: "Ya, sangat sesuai untuk hartanah dan kenderaan bernilai tinggi.",
          },
        ],
      },
      th: {
        title: "เคล็ดลับปิดการขายรถยนต์ 12 คันต่อเดือนด้วยแคตตาล็อกมือถือและ WhatsApp",
        summary: "วิธีที่พนักงานขายยานยนต์เปลี่ยนโบรชัวร์ PDF เป็นโชว์รูมบนมือถือที่โหลดเร็วเพื่อเพิ่มยอดจองทดลองขับ",
        category: "ยานยนต์และอสังหาฯ",
        readTime: "4 นาทีอ่าน",
        directAnswer: "ความลับของการปิดการขายรถยนต์ 12 คันต่อเดือนคือการเปลี่ยนโบรชัวร์ PDF ขนาด 25MB เป็นหน้าร้านโชว์รูมมือถือที่เชื่อมตรงกับ WhatsApp พร้อมข้อความระบุรุ่นรถอัตโนมัติ",
        keyTakeaways: [
          "โชว์รูมมือถือโหลดเร็วใน 0.8 วินาที",
          "ปุ่มจองทดลองขับเชื่อมต่อ WhatsApp ทันที",
        ],
        sections: [
          {
            heading: "1. ทำไมโบรชัวร์ PDF ถึงทำให้เสียลูกค้า?",
            directAnswer: "ลูกค้ามากกว่า 62% ปฏิเสธการดาวน์โหลดไฟล์ขนาดใหญ่กว่า 10MB บนสมาร์ตโฟน",
            content: ["หน้าร้านมือถือช่วยให้ลูกค้าเห็นภาพรถ ตารางผ่อน และทักแชตได้ทันที"],
          },
        ],
        faqs: [
          {
            question: "ตัวแทนอสังหาริมทรัพย์สามารถใช้งานได้หรือไม่?",
            answer: "ใช้งานได้ดีมากสำหรับบ้าน คอนโด และรถยนต์ทุกประเภท",
          },
        ],
      },
      vi: {
        title: "Bí Quyết Chốt 12 Xe Hơi Mỗi Tháng Nhờ Showroom Di Động & WhatsApp",
        summary: "Cách các tư vấn viên ô tô kỳ cựu thay thế catalogue PDF cồng kềnh bằng showroom di động trực quan để tăng tỷ lệ đăng ký lái thử.",
        category: "Kinh doanh & Showroom",
        readTime: "4 phút đọc",
        directAnswer: "Bí quyết chốt 12 xe ô tô mỗi tháng là loại bỏ file PDF nặng nề để sử dụng showroom di động tải trong 0,8 giây, tích hợp nút nhắn tin WhatsApp điền sẵn tên xe để tư vấn trả góp và lái thử tức thì.",
        keyTakeaways: [
          "Showroom tối ưu hiển thị trên mọi dòng điện thoại thông minh.",
          "Nút liên hệ WhatsApp kích hoạt trò chuyện trực tiếp không qua trung gian.",
        ],
        sections: [
          {
            heading: "1. Tại sao file PDF làm giảm 60% lượng khách hàng tiềm năng?",
            directAnswer: "Khách hàng ngại tải file nặng và gặp khó khăn khi phóng to thu nhỏ bảng biểu thông số kỹ thuật trên màn hình điện thoại.",
            content: ["Showroom di động mang lại trải nghiệm xem xe mượt mà như lướt mạng xã hội."],
          },
        ],
        faqs: [
          {
            question: "Môi giới bất động sản có áp dụng được mô hình này không?",
            answer: "Hoàn toàn phù hợp cho các dự án căn hộ, nhà phố và các sản phẩm giá trị cao.",
          },
        ],
      },
    },
  },
  {
    slug: "optimasi-keranjang-kuning-tiktok",
    datePublished: "2026-11-15T10:00:00+07:00",
    dateModified: "2026-11-23T15:15:00+07:00",
    image: {
      url: "/images/blog/cover-tiktok-affiliate.jpg",
      width: 1200,
      height: 675,
      alt: {
        id: "Tampilan bio link visual untuk afiliasi produk kecantikan dan fashion keranjang kuning TikTok Shop di etalase.online",
        en: "Visual bio link showcase for TikTok Shop and multi-marketplace affiliate products on etalase.online",
        ms: "Paparan bio link visual untuk produk afiliasi TikTok Shop dan pasaran dalam talian di etalase.online",
        th: "หน้ารวมลิงก์สินค้าแอฟฟิลิเอตสำหรับ TikTok Shop และ Shopee บน etalase.online",
        vi: "Trang liên kết bio trực quan cho sản phẩm tiếp thị liên kết TikTok Shop và Shopee trên etalase.online",
      },
      caption: {
        id: "Visual Menu Grid Archetype: Memajang foto produk nyata, harga coret, dan multi-tautan marketplace tanpa pelanggaran bio link.",
        en: "Visual Menu Grid Archetype: Real product photos, price anchoring, and multi-marketplace routing without bio link penalties.",
        ms: "Visual Menu Grid Archetype: Gambar produk sebenar dan harga diskaun tanpa sekatan akaun.",
        th: "Visual Menu Grid Archetype: รูปสินค้าจริงและป้ายลดราคาโดยไม่ผิดกฎลิงก์บนไบโอ",
        vi: "Visual Menu Grid Archetype: Hình ảnh sản phẩm thực tế và giảm giá neo tâm lý không vi phạm chính sách bio.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Pakar Afiliasi & Pemasaran Konten Kreator",
        en: "Affiliate & Creator Content Marketing Specialist",
        ms: "Pakar Pemasaran Kandungan & Afiliasi Pencipta",
        th: "ผู้เชี่ยวชาญด้านการตลาดแอฟฟิลิเอตและคอนเทนต์ครีเอเตอร์",
        vi: "Chuyên gia Tiếp thị Liên kết & Nội dung Sáng tạo",
      },
      bio: {
        id: "Membantu ribuan kreator video pendek di Indonesia, Malaysia, dan Thailand menyusun etalase visual rekomendasi yang bebas penalti dan berkonversi tinggi.",
        en: "Helping short-video creators in Indonesia, Malaysia, and Thailand build penalty-free, high-converting visual recommendation storefronts.",
        ms: "Membantu pencipta kandungan video pendek menyusun etalase cadangan produk.",
        th: "ช่วยครีเอเตอร์วิดีโอสั้นจัดหมวดหมู่สินค้าแนะนำที่ปลอดภัยจากบทลงโทษและเพิ่มยอดคลิก",
        vi: "Hỗ trợ các nhà sáng tạo video ngắn xây dựng trang giới thiệu sản phẩm liên kết tỷ lệ chuyển đổi cao.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Trik Meningkatkan Klik Keranjang Kuning TikTok Tanpa Terkena Pelanggaran Bio",
        summary: "Cara menyusun etalase visual produk rekomendasi agar followers tidak bingung mencari link produk yang Anda ulas di konten video pendek.",
        category: "Afiliasi",
        readTime: "6 min baca",
        directAnswer: "Trik meningkatkan klik afiliasi TikTok tanpa terkena penalti adalah menggunakan etalase visual bertema bersih dengan banner produk unggulan (Hero Product Card), mengelompokkan link berdasarkan kategori video ulasan, serta menyertakan harga coret (*price anchoring*) untuk memicu keputusan beli impulsif.",
        keyTakeaways: [
          "Hindari menaruh URL redirect mentah yang dapat memicu deteksi spam algoritma TikTok.",
          "Gunakan subdomain kustom mandiri yang aman (seperti `namamu.etalase.online`).",
          "Kombinasikan blok foto produk nyata dengan tombol multi-marketplace (Shopee, Tokopedia, TikTok Shop).",
          "Terapkan harga coret (*compare-at price*) untuk meningkatkan click-through-rate hingga 42%.",
        ],
        table: {
          caption: "Perbandingan Tipe Tautan Bio untuk Afiliator Konten",
          headers: ["Fitur Utama", "Visual Grid Etalase.online", "Link Teks Tradisional (Linktree dsb.)"],
          rows: [
            ["Dukungan Foto Produk Nyata", "Ya, Grid Foto Tajam & Cover Banner", "Hanya tombol teks monoton"],
            ["Fitur Harga Coret (Anchoring)", "Tersedia Otomatis (Rp 49rb ~Rp 99rb~)", "Tidak tersedia / Teks manual"],
            ["Keamanan Algoritma Medsos", "Aman dengan arsitektur subdomain resmi", "Sering ditandai spam / peringatan luar"],
            ["Waktu Konfigurasi", "Cepat (Kurang dari 3 menit)", "Butuh setting panjang"],
          ],
        },
        sections: [
          {
            heading: "1. Jebakan Daftar Tautan Teks '2019' yang Mengabaikan Visual",
            directAnswer: "Followers TikTok dan Instagram adalah pengguna yang sangat visual; daftar tombol teks abu-abu membuat mereka malas mencari produk yang Anda ulas.",
            content: [
              "Ketika seorang penonton terinspirasi oleh video review mikrofon wireless atau gaun kasual Anda, mereka tidak mengingat merek teknisnya. Mereka mengingat wujud visualnya. Jika mereka membuka bio link Anda dan hanya menemukan 20 tombol teks bertuliskan 'Link 1', 'Link 2', 74% dari mereka akan langsung menekan tombol kembali.",
            ],
          },
          {
            heading: "2. Menata Etalase Berdasarkan Kategori Konten",
            directAnswer: "Kelompokkan produk ke dalam tab atau blok terpisah: 'Peralatan Ngonten', 'Skincare Favorit', dan 'Outfit Hari Ini'.",
            content: [
              "Dengan susunan yang terstruktur rapi, pengunjung dapat langsung menemukan produk yang relevan tanpa harus menggulir layar tanpa arah.",
            ],
          },
        ],
        faqs: [
          {
            question: "Apakah etalase.online bisa menautkan langsung ke Shopee dan TikTok Shop sekaligus?",
            answer: "Bisa. Anda bebas menyertakan tautan afiliasi Shopee, TikTok Shop, Tokopedia, Lazada, hingga situs brand resmi dalam satu kartu produk visual.",
          },
        ],
      },
      en: {
        title: "How to Boost TikTok Affiliate Clicks Without Bio Link Policy Strikes",
        summary: "Organize visual recommendation showcases so followers instantly locate items reviewed in your short-form videos.",
        category: "Affiliate Marketing",
        readTime: "6 min read",
        directAnswer: "Boost TikTok affiliate conversion without policy flags by employing a clean visual showcase with hero cards, category clustering, and price anchoring to trigger spontaneous purchase decisions.",
        keyTakeaways: [
          "Avoid raw redirect chains flagged by TikTok safety filters.",
          "Use a trusted custom subdomain on etalase.online.",
          "Display real product previews instead of vague text labels.",
        ],
        sections: [
          {
            heading: "1. The High Cost of Text-Only Bio Links",
            directAnswer: "74% of mobile social media users bounce immediately when greeted by text-only button lists after watching a rich visual video.",
            content: ["Visual showcases match the aesthetic expectations of short-video consumers."],
          },
        ],
        faqs: [
          {
            question: "Can I link multiple marketplaces per item?",
            answer: "Yes, you can route visitors to Shopee, TikTok Shop, Lazada, or direct merchant websites simultaneously.",
          },
        ],
      },
      ms: {
        title: "Trik Meningkatkan Klik Afiliasi TikTok Tanpa Melanggar Polisi Bio",
        summary: "Susun etalase visual produk cadangan supaya pengikut mudah mencari barang yang anda ulas dalam video.",
        category: "Afiliasi",
        readTime: "6 min baca",
        directAnswer: "Tingkatkan klik afiliasi dengan menggunakan etalase visual bergambar penuh dan harga diskaun berbanding senarai butang teks biasa.",
        keyTakeaways: [
          "Elakkan pautan spam yang disekat algoritma.",
          "Gunakan gambar produk sebenar untuk menarik perhatian pengikut.",
        ],
        sections: [
          {
            heading: "1. Kuasa Visual Menewaskan Butang Teks Lama",
            directAnswer: "Pengguna media sosial memerlukan rujukan visual untuk mengingati produk yang baru mereka tonton.",
            content: ["Etalase bergambar menaikkan kadar klik sehingga 42%."],
          },
        ],
        faqs: [
          {
            question: "Bolehkah menyokong pautan Shopee dan TikTok Shop serentak?",
            answer: "Ya, anda bebas meletakkan pelbagai pautan pasaran dalam satu kad produk.",
          },
        ],
      },
      th: {
        title: "เทคนิคเพิ่มยอดคลิกลิงก์แอฟฟิลิเอต TikTok โดยไม่ถูกแบนบัญชี",
        summary: "จัดระเบียบหน้ารวมลิงก์สินค้าให้แฟนคลับค้นหาสินค้าจากวิดีโอสั้นได้ทันทีโดยไม่สับสน",
        category: "แอฟฟิลิเอต",
        readTime: "6 นาทีอ่าน",
        directAnswer: "เพิ่มยอดคลิกลิงก์แอฟฟิลิเอต TikTok อย่างปลอดภัยด้วยการใช้หน้าร้านรวมรูปภาพจริง การจัดหมวดหมู่วิดีโอรีวิว และการติดป้ายราคาลดเพื่อกระตุ้นการสั่งซื้อ",
        keyTakeaways: [
          "หลีกเลี่ยงลิงก์รีไดเรกต์ที่ระบบตรวจจับเป็นสแปม",
          "ใช้รูปภาพสินค้าจริงแทนปุ่มข้อความธรรมดา",
        ],
        sections: [
          {
            heading: "1. ทำไมลิงก์ข้อความแบบเดิมถึงไม่ได้ผล?",
            directAnswer: "ผู้ใช้มากกว่า 74% ออกจากหน้าเว็บทันทีหากเห็นแต่ปุ่มข้อความโดยไม่มีรูปภาพอ้างอิงจากคลิป",
            content: ["หน้าร้านรูปภาพช่วยให้การตัดสินใจซื้อง่ายขึ้นอย่างเห็นได้ชัด"],
          },
        ],
        faqs: [
          {
            question: "สามารถใส่ลิงก์ Shopee และ TikTok Shop พร้อมกันได้ไหม?",
            answer: "ได้ รองรับทุกลิงก์มาร์เก็ตเพลซในบัตรสินค้าเดียว",
          },
        ],
      },
      vi: {
        title: "Bí Quyết Tăng Lượt Click Tiếp Thị Liên Kết TikTok Không Lo Bị Quét Link Bio",
        summary: "Cách sắp xếp trang sản phẩm trực quan để người theo dõi tìm đúng món đồ bạn vừa review trên video ngắn.",
        category: "Tiếp thị liên kết",
        readTime: "6 phút đọc",
        directAnswer: "Tăng lượt nhấp liên kết tiếp thị TikTok an toàn bằng cách dùng trang etalase trực quan có ảnh thật, phân chia danh mục rõ ràng và hiển thị giá gốc gạch ngang kích thích mua sắm.",
        keyTakeaways: [
          "Tránh các chuỗi link chuyển hướng dễ bị thuật toán gắn cờ spam.",
          "Hiển thị hình ảnh sản phẩm nổi bật thay vì danh sách nút bấm buồn tẻ.",
        ],
        sections: [
          {
            heading: "1. Khuyết điểm lớn của danh sách liên kết toàn chữ",
            directAnswer: "Khách hàng lướt video ghi nhớ hình ảnh chứ không nhớ mã hiệu sản phẩm, do đó ảnh chụp trực quan là yếu tố quyết định hành vi nhấp chuột.",
            content: ["Trang liên kết dạng lưới ảnh giúp tăng tỷ lệ chuyển đổi lên gấp đôi."],
          },
        ],
        faqs: [
          {
            question: "Có thể gắn cùng lúc link Shopee và TikTok Shop không?",
            answer: "Có thể, bạn hoàn toàn tự do đặt liên kết đa sàn trên mỗi sản phẩm.",
          },
        ],
      },
    },
  },
  {
    slug: "otomasi-chat-qris-instan",
    datePublished: "2026-11-12T11:00:00+07:00",
    dateModified: "2026-11-23T15:30:00+07:00",
    image: {
      url: "/images/blog/cover-qris-automation.jpg",
      width: 1200,
      height: 675,
      alt: {
        id: "Pembeli memindai kode QRIS dinamis di smartphone untuk verifikasi pembayaran 2 detik tanpa upload struk transfer",
        en: "Shopper scanning dynamic QRIS code on smartphone for 2-second payment verification without manual receipt uploads",
        ms: "Pembeli mengimbas kod QRIS pada telefon pintar untuk pengesahan bayaran 2 saat",
        th: "ลูกค้าสแกน QR Code สำหรับชำระเงินใน 2 วินาทีโดยไม่ต้องส่งสลิปโอนเงิน",
        vi: "Khách hàng quét mã QR thanh toán tức thì trong 2 giây không cần gửi biên lai chuyển khoản",
      },
      caption: {
        id: "BorderPay QRIS Integration: Verifikasi instan 2 detik, modal aman, opsi Convenience Fee ditanggung pembeli.",
        en: "BorderPay QRIS Integration: 2-second automated verification, protected margins, optional buyer convenience fee.",
        ms: "Integrasi BorderPay QRIS: Pengesahan automatik 2 saat dan perlindungan margin peniaga.",
        th: "ระบบ BorderPay QRIS: ตรวจสอบยอดเงินใน 2 วินาที พร้อมระบบป้องกันส่วนต่างกำไรของร้านค้า",
        vi: "Tích hợp BorderPay QRIS: Xác thực giao dịch tự động trong 2 giây và bảo toàn 100% biên lợi nhuận.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Arsitek Teknologi Pembayaran FinTech",
        en: "FinTech Payments Solutions Architect",
        ms: "Arkitek Teknologi Pembayaran FinTech",
        th: "สถาปนิกโซลูชันระบบชำระเงินดิจิทัล",
        vi: "Kiến trúc sư Giải pháp Thanh toán FinTech",
      },
      bio: {
        id: "Merancang integrasi sistem pembayaran QRIS BorderPay, payout instan, dan kalkulasi margin anti-rugi di etalase.online.",
        en: "Architecting BorderPay QRIS integrations, real-time payouts, and margin-guard calculations across etalase.online.",
        ms: "Merekabentuk integrasi sistem pembayaran QRIS BorderPay dan pengeluaran saldo pantas.",
        th: "ผู้ออกแบบระบบชำระเงิน BorderPay QRIS และระบบคำนวณกำไรปลอดภัยบน etalase.online",
        vi: "Chuyên gia thiết kế hạ tầng thanh toán QRIS BorderPay và quy trình rút tiền bảo toàn vốn.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Mengapa 78% Pembeli di Indonesia Lebih Memilih Bayar via QRIS Dibanding Transfer Manual",
        summary: "Studi kasus perilaku konsumen digital di Asia Tenggara: Kecepatan verifikasi 2 detik melipatgandakan omset penjual tanpa drama cek mutasi bank.",
        category: "Otomasi WhatsApp",
        readTime: "4 min baca",
        directAnswer: "78% pembeli digital memilih QRIS karena proses pembayaran selesai dalam 2 detik tanpa perlu menghafal atau menyalin 16 digit nomor rekening bank dan tanpa perlu mengunggah bukti struk transfer secara manual.",
        keyTakeaways: [
          "Pembeli malas menyalin rekening dan menunggu admin mengecek mutasi secara manual.",
          "Verifikasi QRIS BorderPay terjadi secara otomatis dalam 2 detik melalui sistem webhook cerdas.",
          "Fitur *Convenience Fee* memungkinkan penjual mengalihkan biaya transaksi 2% - 4.5% ke pembeli.",
          "Paket Pro mendapatkan 4x penarikan saldo (disbursement) gratis setiap bulan ke seluruh rekening bank.",
        ],
        table: {
          caption: "Perbandingan Metode Pembayaran: QRIS Instan vs Transfer Manual Tradisional",
          headers: ["Faktor Pengalaman Pengguna", "QRIS Otomatis BorderPay", "Transfer Bank Manual Tradisional"],
          rows: [
            ["Kecepatan Verifikasi", "2 Detik Real-time via Webhook", "10 - 60 Menit (Harus cek mutasi bank)"],
            ["Risiko Struk Palsu", "0% (Sistem terintegrasi ke bank sentral)", "Tinggi (Rentan manipulasi foto Photoshop)"],
            ["Biaya Transaksi Penjual", "Mulai 2% atau Bebas Biaya (*Convenience Fee)", "Gratis nominal tapi boros waktu verifikasi"],
            ["Pencairan Saldo", "Gratis 4x/bulan untuk Pro (Modal Rp 2.500)", "N/A"],
          ],
        },
        sections: [
          {
            heading: "1. Mengapa Transfer Manual Membakar 40% Waktu Kerja Tim Penjualan Anda?",
            directAnswer: "Mengecek mutasi m-banking satu per satu dan mencocokkan struk transfer di WhatsApp menghabiskan waktu hingga 3 jam per hari.",
            content: [
              "Bagi pebisnis yang melayani 50 hingga 200 pesanan per hari, memverifikasi bukti bayar manual adalah mimpi buruk operasional. Belum lagi maraknya modus penipuan bukti transfer palsu berformat gambar hasil editan.",
              "Dengan QRIS BorderPay yang tertanam di etalase.online, pembeli cukup memindai kode QR dinamis dari aplikasi bank atau e-wallet mana pun (BCA, Mandiri, BRI, GoPay, OVO, Dana). Begitu bayar, pesanan otomatis berstatus 'Lunas' tanpa keterlibatan admin.",
            ],
          },
          {
            heading: "2. Matematika Margin Guard: Anti-Rugi untuk Penjual",
            directAnswer: "Struktur biaya etalase.online dihitung secara matematis agar selalu aman terhadap tarif modal BorderPay.",
            content: [
              "Dengan batas minimal transaksi Rp 15.000 (Free) dan Rp 25.000 (Pro), penjual terlindungi dari resiko transaksi mikro yang memakan biaya tetap. Selain itu, opsi *Fee Borne by Customer* memastikan penjual menerima uang bersih utuh 100% dari harga produk yang tertera di etalase.",
            ],
          },
        ],
        faqs: [
          {
            question: "Bagaimana cara kerja fitur Biaya Ditanggung Pembeli (Convenience Fee)?",
            answer: "Ketika diaktifkan di dashboard admin, biaya transaksi platform (2% untuk Pro atau 4.5% untuk Free) akan ditambahkan secara transparan ke total tagihan QRIS pembeli. Keuntungan bersih penjual tetap 100% utuh tanpa potongan.",
          },
          {
            question: "Berapa lama dana hasil penjualan bisa dicairkan ke rekening penjual?",
            answer: "Dana penjualan QRIS BorderPay dapat ditarik setiap hari kerja setelah melewati periode settlement reguler, langsung ke rekening bank lokal mana pun di Indonesia.",
          },
        ],
      },
      en: {
        title: "Why 78% of SEA Buyers Prefer Instant QRIS Over Manual Bank Transfers",
        summary: "Consumer behavior insights across Southeast Asia: 2-second automated verification doubles seller conversion without bank statement reconciliation headaches.",
        category: "WhatsApp Automation",
        readTime: "4 min read",
        directAnswer: "78% of Southeast Asian mobile consumers favor instant QRIS payments because checkout completes in 2 seconds without copying 16-digit account numbers or uploading fakeable payment screenshots.",
        keyTakeaways: [
          "Manual transfers introduce severe friction and screenshot fraud risks.",
          "BorderPay QRIS settles in 2 seconds via instant server webhooks.",
          "Optional convenience fees pass transaction costs to buyers cleanly.",
          "Pro tier includes 4 free bank disbursements per month.",
        ],
        sections: [
          {
            heading: "1. The Operational Drain of Manual Payment Receipts",
            directAnswer: "Reconciling manual bank screenshots consumes up to 3 hours daily for busy merchants.",
            content: ["Automated dynamic QR codes streamline checkout across all e-wallets and bank apps."],
          },
        ],
        faqs: [
          {
            question: "How does the buyer convenience fee work?",
            answer: "When enabled, transaction fees are transparently added to the final QRIS invoice, safeguarding 100% of merchant revenue.",
          },
        ],
      },
      ms: {
        title: "Mengapa 78% Pembeli Memilih Pembayaran QRIS Berbanding Pindahan Manual",
        summary: "Pengesahan bayaran 2 saat menggandakan jualan tanpa kerumitan menyemak penyata bank.",
        category: "Automasi WhatsApp",
        readTime: "4 min baca",
        directAnswer: "Pembeli memilih kod QR kerana urusan selesai dalam masa 2 saat tanpa perlu menyalin nombor akaun bank yang panjang.",
        keyTakeaways: [
          "Pengesahan bayaran automatik menjimatkan masa operasi peniaga.",
          "Peniaga dilindungi daripada risiko resit pindahan palsu.",
        ],
        sections: [
          {
            heading: "1. Kelebihan QR Pantas untuk Perniagaan Chat",
            directAnswer: "Mengurangkan pembaziran masa menyemak akaun m-banking secara manual.",
            content: ["Pesanan disahkan secara langsung sebaik bayaran diterima."],
          },
        ],
        faqs: [
          {
            question: "Berapa lamakah tempoh pengeluaran wang ke akaun bank?",
            answer: "Pengeluaran wang boleh dibuat secara harian mengikut jadual penyelesaian standard.",
          },
        ],
      },
      th: {
        title: "ทำไมผู้ซื้อ 78% จึงเลือกชำระเงินผ่าน QRIS มากกว่าการโอนเงินแบบเดิม",
        summary: "การตรวจสอบยอดเงินใน 2 วินาทีช่วยเพิ่มยอดขายเป็นสองเท่าโดยไม่ต้องเช็กสลิปธนาคารด้วยตนเอง",
        category: "ระบบอัตโนมัติ",
        readTime: "4 นาทีอ่าน",
        directAnswer: "ผู้ซื้อยุคใหม่เลือกสแกน QR Code เพราะสะดวก รวดเร็วใน 2 วินาที และไม่ต้องพิมพ์เลขบัญชีธนาคาร 16 หลัก",
        keyTakeaways: [
          "ตรวจสอบการชำระเงินอัตโนมัติแบบเรียลไทม์",
          "ป้องกันปัญหาสลิปปลอมได้อย่างสมบูรณ์",
        ],
        sections: [
          {
            heading: "1. บอกลาการตรวจสลิปโอนเงินด้วยตนเอง",
            directAnswer: "ระบบอัตโนมัติช่วยลดเวลาการทำงานของแอดมินได้มากกว่า 3 ชั่วโมงต่อวัน",
            content: ["เมื่อลูกค้าสแกนจ่าย ระบบจะเปลี่ยนสถานะออเดอร์เป็นชำระแล้วทันที"],
          },
        ],
        faqs: [
          {
            question: "ระบบรองรับการโอนเงินเข้าบัญชีเมื่อใด?",
            answer: "สามารถถอนเงินเข้าบัญชีธนาคารได้ทุกวันทำการ",
          },
        ],
      },
      vi: {
        title: "Tại Sao 78% Người Mua Ưa Chuộng Thanh Toán QRIS Hơn Chuyển Khoản Thủ Công",
        summary: "Xác thực tức thì trong 2 giây giúp nhân đôi doanh số và giải phóng chủ shop khỏi gánh nặng đối soát giao dịch ngân hàng.",
        category: "Tự động hóa WhatsApp",
        readTime: "4 phút đọc",
        directAnswer: "Người tiêu dùng ưu tiên mã QR thanh toán nhanh vì chỉ mất 2 giây thao tác, không cần sao chép số tài khoản dài dòng và không phải chụp màn hình gửi hóa đơn.",
        keyTakeaways: [
          "Tự động hóa đối soát thanh toán 2 giây qua webhook bảo mật.",
          "Chấm dứt hoàn toàn rủi ro ảnh biên lai chuyển khoản giả mạo.",
        ],
        sections: [
          {
            heading: "1. Thoát khỏi áp lực kiểm tra tài khoản ngân hàng thủ công",
            directAnswer: "Đối soát thủ công từng giao dịch lấy đi 3 giờ làm việc quý báu mỗi ngày của đội ngũ kinh doanh.",
            content: ["Mã QR động giúp đơn hàng chuyển sang trạng thái đã thanh toán ngay lập tức."],
          },
        ],
        faqs: [
          {
            question: "Chính sách phí tiện ích thanh toán hoạt động ra sao?",
            answer: "Chủ cửa hàng có thể tùy chọn tính phí giao dịch vào người mua để giữ trọn vẹn 100% lợi nhuận.",
          },
        ],
      },
    },
  },
  {
    slug: "strategi-booking-konsultasi-1on1-kreator",
    datePublished: "2026-11-24T09:00:00+07:00",
    dateModified: "2026-11-25T10:00:00+07:00",
    image: {
      url: "/images/blog/cover-booking-consultation.jpg",
      width: 1200,
      height: 800,
      alt: {
        id: "Mentor kreatif berdiskusi langsung dengan klien dalam sesi konsultasi 1-on-1 terjadwal lewat etalase.online",
        en: "Creative mentor conducting a scheduled 1-on-1 paid consultation session via etalase.online",
        ms: "Mentor kreatif mengadakan sesi konsultasi 1-on-1 berbayar secara tersusun melalui etalase.online",
        th: "ที่ปรึกษามืออาชีพจัดเซสชันให้คำปรึกษาแบบ 1 ต่อ 1 ผ่านระบบจองเวลาบน etalase.online",
        vi: "Chuyên gia thực hiện buổi tư vấn 1-1 có lịch hẹn tự động qua etalase.online",
      },
      caption: {
        id: "Sistem Booking Slot 1-on-1 otomatis mencegah drama tanya jawab jadwal berulang di WhatsApp.",
        en: "Automated 1-on-1 slot booking eliminates endless scheduling back-and-forth on WhatsApp.",
        ms: "Sistem tempahan slot automatik mengelakkan rundingan jadual yang berulang.",
        th: "ระบบจองเวลาอัตโนมัติช่วยลดการถามตอบเรื่องคิวว่างซ้ำซาก",
        vi: "Đặt lịch 1-1 tự động loại bỏ hoàn toàn trao đổi lặp lại để chốt giờ hẹn.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Strategis Monetisasi Jasa & Konsultasi",
        en: "Coaching & Service Monetization Strategist",
        ms: "Pakar Pengewangan Servis & Konsultasi",
        th: "นักกลยุทธ์การสร้างรายได้จากบริการและที่ปรึกษา",
        vi: "Chiến lược gia Kinh doanh Dịch vụ & Tư vấn",
      },
      bio: {
        id: "Membantu konsultan, desainer, mentor karier, dan coach di Asia Tenggara mengubah waktu luang menjadi sesi berbayar dengan alur booking otomatis.",
        en: "Helping consultants, designers, and coaches across Southeast Asia convert expertise into prepaid scheduled sessions.",
        ms: "Membantu perunding dan jurulatih menukar kepakaran menjadi sesi berjadual prabayar.",
        th: "ช่วยที่ปรึกษาและโค้ชเปลี่ยนเวลาว่างให้เป็นเซสชันแบบชำระเงินล่วงหน้า",
        vi: "Hỗ trợ chuyên gia tư vấn biến thời gian rảnh thành lịch hẹn trả phí trước.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Cara Jual Sesi Konsultasi 1-on-1 Tanpa Ribet Balas Chat Tanya Jadwal Kosong",
        summary: "Panduan praktis bagi mentor, freelancer, dokter kecantikan, dan konsultan bisnis untuk mengaktifkan halaman booking slot berbayar yang langsung terhubung ke WhatsApp.",
        category: "Konsultasi & Jasa",
        readTime: "5 min baca",
        directAnswer: "Menjual sesi konsultasi 1-on-1 paling efisien dilakukan dengan menampilkan pilihan durasi (misal 30/60 menit) dan slot jam tersedia di halaman `/book`, mewajibkan pembayaran QRIS atau konfirmasi di muka agar tidak ada no-show, dan mengirimkan detail sesi ke WhatsApp klien.",
        keyTakeaways: [
          "Tampilkan tarif transparan per sesi langsung di etalase untuk menyaring penanya iseng.",
          "Gunakan daftar slot jam tetap (misal 09:00, 14:00, 19:00 WIB) agar kalender Anda tidak berantakan.",
          "Aktifkan pembayaran QRIS di muka atau Order by Chat agar tingkat kehadiran (show-up rate) mendekati 100%.",
          "Rekap agenda topik klien otomatis tersimpan rapi di tabel Pesanan dashboard admin.",
        ],
        table: {
          caption: "Alur Booking Konsultasi: Manual via DM/Chat vs Halaman Booking Etalase",
          headers: ["Tahapan", "Etalase Booking (`/book`)", "Tanya Jadwal Manual di Chat"],
          rows: [
            ["Cek Ketersediaan Jam", "Langsung pilih slot di layar HP", "Tanya-balas 6-10 pesan berhari-hari"],
            ["Kepastian Hadir (No-Show)", "Sangat rendah (konfirmasi & komitmen jelas)", "Tinggi karena tidak ada komitmen awal"],
            ["Catatan Topik Klien", "Diisi di form sebelum booking selesai", "Tercecer di riwayat chat WhatsApp"],
          ],
        },
        sections: [
          {
            heading: "1. Masalah Utama Konsultan Pemula: Gratis Terlalu Lama di Awal",
            directAnswer: "Lebih dari 60% calon klien hanya bertanya 'bisa hari apa dan biayanya berapa?' lalu menghilang saat chat terlalu lambat dibalas.",
            content: [
              "Ketika Anda menjual jasa review portofolio, konsultasi pajak UMKM, bedah akun iklan, atau mentoring karier, waktu Anda adalah inventaris yang tidak bisa digandakan.",
              "Di etalase.online, tipe produk Konsultasi (`APPOINTMENT`) memungkinkan Anda mengisi durasi menit dan daftar slot waktu langsung dari form tambah produk. Pengunjung cukup klik tombol booking, memilih hari & jam, menuliskan keluhan atau link yang ingin dibahas, dan sesi langsung tercatat ke database toko Anda.",
            ],
          },
          {
            heading: "2. Menyiapkan Agenda Sesi Berkonversi Tinggi",
            directAnswer: "Cantumkan 3 hasil konkret yang didapat klien setelah sesi selesai di deskripsi produk.",
            content: [
              "Jangan sekadar menulis 'Konsultasi Bisnis 60 Menit'. Tulis secara spesifik: 'Audit Landing Page & Iklan Meta 45 Menit + Rekaman Solusi Konkret'. Kejelasan manfaat membuat calon pembeli lebih cepat memilih slot tanpa ragu.",
            ],
          },
        ],
        faqs: [
          {
            question: "Bagaimana klien mendapatkan tautan Google Meet atau Zoom setelah booking?",
            answer: "Setelah booking tersimpan di database Order Console dan notifikasi Telegram masuk, Anda dapat mengirim tautan meeting langsung ke nomor WhatsApp klien yang tercantum.",
          },
        ],
      },
      en: {
        title: "How to Sell 1-on-1 Coaching Sessions Without Endless Calendar Back-and-Forth",
        summary: "A practical workflow for mentors, freelancers, and consultants to launch prepaid `/book` time slots wired straight to WhatsApp and admin tracking.",
        category: "Coaching & Services",
        readTime: "5 min read",
        directAnswer: "Publish fixed session durations and daily time slots on your `/book` storefront page so buyers commit upfront before consuming your personal chat time.",
        keyTakeaways: [
          "Publish clear session pricing and deliverables on the card.",
          "Configure recurring available time slots right inside Product Form.",
          "Capture client topic notes before the call even begins.",
        ],
        sections: [
          {
            heading: "1. Turn Unstructured DMs Into Booked Calendar Slots",
            directAnswer: "Structured appointment pages eliminate slow DM negotiation.",
            content: ["Display fixed session lengths and let clients reserve slots directly on mobile."],
          },
        ],
        faqs: [
          {
            question: "Where are confirmed appointments stored?",
            answer: "Every reservation saves straight into your Orders database console and triggers instant Telegram alerts.",
          },
        ],
      },
      ms: {
        title: "Cara Jual Sesi Konsultasi 1-on-1 Tanpa Rundingan Jadual Berulang di Chat",
        summary: "Panduan menyediakan halaman tempahan slot masa berbayar untuk mentor, pereka grafik, dan perunding.",
        category: "Konsultasi & Servis",
        readTime: "5 min baca",
        directAnswer: "Paparkan harga dan slot masa tetap terus di etalase `/book` supaya pelanggan boleh menempah dalam 1 minit tanpa berbalas mesej panjang.",
        keyTakeaways: [
          "Tetapkan slot jam harian terus dari papan pemuka admin.",
          "Kurangkan risiko pelanggan membatalkan sesi di saat akhir.",
        ],
        sections: [
          {
            heading: "1. Ubah Pertanyaan DM Menjadi Tempahan Rasmi",
            directAnswer: "Borang tempahan terstruktur mempercepat pengesahan pelanggan.",
            content: ["Pelanggan memilih masa dan menulis nota topik sebelum menghantar pesanan."],
          },
        ],
        faqs: [
          {
            question: "Di manakah rekod tempahan disimpan?",
            answer: "Semua tempahan masuk terus ke konsol Pesanan dan pemberitahuan Telegram.",
          },
        ],
      },
      th: {
        title: "วิธีขายคอร์สให้คำปรึกษาแบบ 1 ต่อ 1 โดยไม่ต้องเสียเวลาทักถามคิวว่าง",
        summary: "แนวทางสำหรับที่ปรึกษาและฟรีแลนซ์ในการเปิดหน้าจองเวลาแบบชำระเงินล่วงหน้า",
        category: "บริการและที่ปรึกษา",
        readTime: "5 นาทีอ่าน",
        directAnswer: "แสดงระยะเวลาและช่วงเวลาว่างบนหน้า `/book` เพื่อลดขั้นตอนการนัดหมายทางแชตและลดอัตราการเบี้ยวนัด",
        keyTakeaways: [
          "ระบุราคาและผลลัพธ์ที่จะได้รับอย่างชัดเจน",
          "จัดการช่วงเวลาจองได้ทันทีจากแดชบอร์ดร้านค้า",
        ],
        sections: [
          {
            heading: "1. เปลี่ยนแชตถามคิวเป็นระบบจองเวลาอัตโนมัติ",
            directAnswer: "ลูกค้าสามารถเลือกวันเวลาที่สะดวกได้ด้วยตัวเอง",
            content: ["ประหยัดเวลาตอบแชตซ้ำ ๆ เพื่อโฟกัสที่การให้คำปรึกษาคุณภาพสูง"],
          },
        ],
        faqs: [
          {
            question: "ดูรายละเอียดการจองได้ที่ไหน?",
            answer: "ข้อมูลทั้งหมดถูกบันทึกในหน้ารายการคำสั่งซื้อและแจ้งเตือนผ่าน Telegram ทันที",
          },
        ],
      },
      vi: {
        title: "Cách Bán Lịch Tư Vấn 1-1 Không Cần Nhắn Tin Chốt Giờ Thủ Công",
        summary: "Hướng dẫn dành cho mentor và freelancer thiết lập trang đặt lịch tự động kết nối WhatsApp.",
        category: "Tư vấn & Dịch vụ",
        readTime: "5 phút đọc",
        directAnswer: "Hiển thị khung giờ cố định và mức phí rõ ràng trên trang `/book` giúp khách hàng tự đặt lịch trong 1 phút mà không làm mất thời gian trao đổi qua lại.",
        keyTakeaways: [
          "Cài đặt danh sách khung giờ trực tiếp trong phần quản lý sản phẩm.",
          "Thu thập trước chủ đề buổi tư vấn của khách hàng.",
        ],
        sections: [
          {
            heading: "1. Chuẩn hóa quy trình đặt lịch cho chuyên gia",
            directAnswer: "Loại bỏ tình trạng khách hỏi giờ rồi biến mất.",
            content: ["Mọi lịch hẹn được lưu tự động về bảng quản trị đơn hàng."],
          },
        ],
        faqs: [
          {
            question: "Lịch hẹn của khách được lưu ở đâu?",
            answer: "Toàn bộ thông tin đặt lịch lưu trong bảng Orders và gửi cảnh báo về Telegram ngay lập tức.",
          },
        ],
      },
    },
  },
  {
    slug: "cara-buat-katalog-menu-cafe-qr-meja",
    datePublished: "2026-11-24T14:00:00+07:00",
    dateModified: "2026-11-25T10:30:00+07:00",
    image: {
      url: "/images/blog/cover-cafe-menu-qr.jpg",
      width: 1200,
      height: 1800,
      alt: {
        id: "Secangkir kopi latte di kafe artisan yang menggunakan katalog menu digital etalase.online bebas PDF buram",
        en: "Artisan coffee latte cups on a warm wooden cafe table showcasing mobile QR menu browsing",
        ms: "Cawan kopi latte di kafe moden yang menggunakan katalog menu digital mesra telefon bimbit",
        th: "กาแฟลาเต้ในร้านคาเฟ่ที่ใช้เมนูดิจิทัลผ่าน QR Code บนโต๊ะ",
        vi: "Ly cà phê latte tại quán hiện đại sử dụng menu điện tử quét mã QR",
      },
      caption: {
        id: "Template Visual Menu Grid & Cafe Menu membuat foto kopi dan pastry tampil menggoda di layar HP pelanggan.",
        en: "Visual Menu Grid displays crisp drinks and pastries tailored for hungry mobile shoppers.",
        ms: "Paparan grid visual memaparkan gambar minuman dan pastri dengan jelas di skrin telefon.",
        th: "ตารางเมนูภาพช่วยให้ลูกค้าเลือกเครื่องดื่มและขนมได้ง่ายขึ้นบนมือถือ",
        vi: "Giao diện lưới hình ảnh giúp thực khách chọn món nhanh và trực quan ngay trên điện thoại.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Konsultan Digitalisasi F&B & UMKM",
        en: "F&B & SME Digitalization Advisor",
        ms: "Penasihat Pendigitalan F&B & PKS",
        th: "ที่ปรึกษาด้านดิจิทัลสำหรับร้านอาหารและ SME",
        vi: "Cố vấn Chuyển đổi Số Ngành F&B",
      },
      bio: {
        id: "Mendampingi pemilik coffee shop, bakery, dan usaha kuliner membangun katalog menu QR cepat tanpa potongan komisi aplikasi pesan-antar.",
        en: "Helping coffee shops, bakeries, and local eateries deploy fast QR menus with zero delivery-app markups.",
        ms: "Membantu pemilik kafe membina menu QR pantas tanpa komisen aplikasi penghantaran.",
        th: "ช่วยร้านกาแฟและร้านอาหารสร้างเมนูดิจิทัลที่โหลดไวและไร้ค่าคอมมิชชัน",
        vi: "Đồng hành cùng quán cà phê và tiệm bánh xây dựng thực đơn trực tuyến không mất phí hoa hồng.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Stop Pakai Menu PDF Buram: Cara Kafe & UMKM F&B Tingkatkan Order Meja & Takeaway",
        summary: "Mengapa pelanggan malas men-zoom file menu PDF di Google Drive, dan bagaimana katalog foto visual mempercepat pesanan kopi serta snack langsung ke kasir WhatsApp.",
        category: "Kuliner & F&B",
        readTime: "4 min baca",
        directAnswer: "Mengganti menu PDF Google Drive dengan katalog etalase visual interaktif membuat tamu kafe melihat foto produk tajam secara instan, memilih varian/porsi, lalu memesan atau membayar QRIS tanpa antre di meja kasir.",
        keyTakeaways: [
          "Menu PDF 15 MB membuat pelanggan kesal karena lemot saat sinyal dalam ruangan kurang stabil.",
          "Foto grid berkualitas dengan label Bestseller menaikkan order item pendamping (pastry/snack) hingga 28%.",
          "Order *Takeaway* dan *Pre-Order* lewat link bio Instagram masuk ke WhatsApp kasir dengan komisi 0%.",
          "Update menu habis atau promo jam sepi (*Happy Hour*) cukup 1 klik tanpa cetak ulang buku menu.",
        ],
        table: {
          caption: "Menu PDF Statis vs Katalog Visual Etalase untuk Bisnis F&B",
          headers: ["Aspek", "Katalog Etalase.online", "File Menu PDF / Gambar WA"],
          rows: [
            ["Kecepatan Buka di HP", "< 1 Detik langsung tampil grid menu", "Harus download file ber-MB & zoom manual"],
            ["Edit Harga & Stok Habis", "Ubah langsung di HP (< 30 detik)", "Desain ulang Canva & upload link baru"],
            ["Checkout / Order Takeaway", "Keranjang/Order WA atau QRIS BorderPay", "Pembeli harus ketik nama menu manual"],
          ],
        },
        sections: [
          {
            heading: "1. Efek Visual Foto Makanan terhadap Nilai Struk Rata-Rata",
            directAnswer: "Pelanggan yang melihat foto close-up croissant hangat lebih sering menambah item tambahan daripada sekadar membaca tulisan teks di daftar PDF.",
            content: [
              "Di jam sibuk makan siang atau nongkrong sore, kecepatan melihat gambar adalah pendorong utama *upselling*. Menggunakan template **Visual Menu Grid** atau **Cafe Menu**, Anda bisa menaruh banner promo paket bundling di bagian atas (Content Blocks), diikuti grid foto menu andalan.",
              "Untuk pelanggan yang ingin ambil cepat (*pickup*) dari kantor sebelah, cukup arahkan link Instagram kafe Anda ke etalase. Pembeli memilih kopi susu aren dan bayar QRIS di awal atau kirim format order otomatis ke WhatsApp barista dengan 0% komisi pihak ketiga.",
            ],
          },
        ],
        faqs: [
          {
            question: "Apakah kode QR untuk ditaruh di meja kasir sudah tersedia?",
            answer: "Ya, setelah toko kafe aktif, halaman Marketing Kit di Admin Console langsung menyediakan QR Storefront siap cetak maupun poster siap bagikan ke Instagram Story.",
          },
        ],
      },
      en: {
        title: "Ditch Blurry PDF Menus: How Cafes & Local Kitchens Increase Takeaway Orders",
        summary: "Why zooming into heavy Drive PDFs hurts F&B ticket sizes, and how mobile-first visual menu grids accelerate counter & WhatsApp takeaway sales.",
        category: "Culinary & F&B",
        readTime: "4 min read",
        directAnswer: "Replacing heavy PDF menu links with a visual storefront grid eliminates download friction and lets hungry customers place 0%-commission takeaway orders right from mobile.",
        keyTakeaways: [
          "Instant mobile loading even on indoor café reception.",
          "Update sold-out items or Happy Hour promos in seconds without reprinting.",
          "Generate printable table QR stands from Marketing Kit.",
        ],
        sections: [
          {
            heading: "1. Mouth-Watering Photos Drive Higher Basket Size",
            directAnswer: "Visual pairing prompts customers to add pastries and snacks alongside drinks.",
            content: ["Skip heavy PDF zooms and let customers browse high-contrast menu cards instantly."],
          },
        ],
        faqs: [
          {
            question: "Can we print QR codes for dining tables?",
            answer: "Yes, download ready-to-print store QR codes directly inside the Marketing Kit section of your tenant dashboard.",
          },
        ],
      },
      ms: {
        title: "Hentikan Menu PDF Kabur: Cara Kafe Naikkan Pesanan Takeaway & Meja",
        summary: "Mengapa fail PDF menyusahkan pelanggan dan bagaimana katalog foto visual mempercepat tempahan terus ke WhatsApp kaunter.",
        category: "Kulinari & F&B",
        readTime: "4 min baca",
        directAnswer: "Gantikan pautan menu PDF dengan grid visual interaktif supaya pelanggan boleh memilih kopi dan pastri dengan mudah di telefon bimbit.",
        keyTakeaways: [
          "Tiada muat turun fail berat diperlukan.",
          "Kemas kini stok habis terus dari telefon dalam masa 30 saat.",
        ],
        sections: [
          {
            heading: "1. Kuasa Gambar Makanan Meningkatkan Jualan Tambahan",
            directAnswer: "Gambar makanan yang jelas menggalakkan pelanggan menambah pesanan pastri.",
            content: ["Tempahan bawa pulang masuk terus ke WhatsApp juruwang tanpa komisen tambahan."],
          },
        ],
        faqs: [
          {
            question: "Adakah kod QR untuk meja disediakan?",
            answer: "Ya, Marketing Kit di Admin Console menjana kod QR kedai yang sedia untuk dicetak.",
          },
        ],
      },
      th: {
        title: "เลิกใช้เมนู PDF ที่ซูมยาก: วิธีเพิ่มยอดสั่งซื้อคาเฟ่และร้านอาหารด้วยเมนูดิจิทัล",
        summary: "เปลี่ยนจากไฟล์ PDF หนักเครื่องมาเป็นกริดเมนูรูปภาพที่สั่งซื้อผ่านแชตได้ทันที",
        category: "อาหารและเครื่องดื่ม",
        readTime: "4 นาทีอ่าน",
        directAnswer: "แคตตาล็อกเมนูรูปภาพช่วยลดเวลารอโหลดและเพิ่มโอกาสการสั่งขนมเคียงคู่เครื่องดื่มได้สูงขึ้น",
        keyTakeaways: [
          "เปิดดูเมนูได้ไวใน 1 วินาทีบนมือถือ",
          "อัปเดตเมนูหมดหรือโปรโมชันได้ทันทีไม่ต้องพิมพ์ใหม่",
        ],
        sections: [
          {
            heading: "1. รูปภาพเมนูที่คมชัดช่วยเพิ่มยอดต่อบิล",
            directAnswer: "การเห็นรูปจริงช่วยกระตุ้นการสั่งสินค้าเพิ่มเติมหน้าเคาน์เตอร์",
            content: ["รับออเดอร์ล่วงหน้าผ่านแชตได้โดยไม่เสียค่า GP แพลตฟอร์มส่งอาหาร"],
          },
        ],
        faqs: [
          {
            question: "มีไฟล์ QR Code สำหรับตั้งบนโต๊ะหรือไม่?",
            answer: "มี สามารถดาวน์โหลดจากเมนู Marketing Kit ในหลังบ้านร้านค้าได้เลย",
          },
        ],
      },
      vi: {
        title: "Ngừng Dùng Menu PDF Mờ Nhòe: Cách Quán Cà Phê Tăng Đơn Mang Đi",
        summary: "Vì sao khách ngại phóng to file PDF trên điện thoại và giải pháp thực đơn ảnh trực quan đặt món nhanh qua WhatsApp.",
        category: "Ẩm thực & F&B",
        readTime: "4 phút đọc",
        directAnswer: "Thay thế file PDF nặng nề bằng thực đơn lưới hình ảnh giúp khách chọn món tức thì và đặt đơn mang đi miễn phí hoa hồng.",
        keyTakeaways: [
          "Tải trang cực nhanh ngay cả khi sóng yếu trong quán.",
          "Cập nhật món hết hàng trong 30 giây không cần in lại menu.",
        ],
        sections: [
          {
            heading: "1. Hình ảnh hấp dẫn giúp tăng giá trị trung bình mỗi hóa đơn",
            directAnswer: "Ảnh món ăn rõ nét thúc đẩy khách gọi thêm bánh ngọt kèm đồ uống.",
            content: ["Hỗ trợ nhận đơn mang về trực tiếp qua chat không mất phí trung gian."],
          },
        ],
        faqs: [
          {
            question: "Có thể tạo mã QR đặt trên bàn không?",
            answer: "Có, mục Marketing Kit trong bảng điều khiển tạo sẵn mã QR cửa hàng để bạn in ấn.",
          },
        ],
      },
    },
  },
  {
    slug: "panduan-custom-domain-toko-online-profesional",
    datePublished: "2026-11-24T19:00:00+07:00",
    dateModified: "2026-11-25T11:00:00+07:00",
    image: {
      url: "/images/blog/cover-custom-domain.jpg",
      width: 1200,
      height: 855,
      alt: {
        id: "Tampilan dashboard etalase toko online dengan custom domain merek sendiri di laptop modern",
        en: "Modern laptop showing clean branded storefront analytics and custom domain configuration",
        ms: "Komputer riba memaparkan papan pemuka kedai dalam talian dengan domain jenama sendiri",
        th: "แล็ปท็อปแสดงแดชบอร์ดร้านค้าออนไลน์และการตั้งค่าโดเมนเนมของแบรนด์เอง",
        vi: "Laptop hiện đại hiển thị bảng điều khiển gian hàng trực tuyến với tên miền thương hiệu riêng",
      },
      caption: {
        id: "Custom domain pribadi + White-label storefront meningkatkan kredibilitas brand di mata pembeli maupun algoritma iklan.",
        en: "Custom domain branding + white-label storefronts build instant shopper and ad-platform trust.",
        ms: "Domain sendiri dan reka bentuk white-label meningkatkan kepercayaan pembeli.",
        th: "การใช้โดเมนส่วนตัวและหน้าร้านแบบไร้โลโก้แพลตฟอร์มช่วยเสริมความน่าเชื่อถือ",
        vi: "Tên miền riêng và giao diện white-label giúp nâng cao độ tin cậy với khách hàng.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Arsitek Brand & Performance Marketing",
        en: "Brand & Performance Marketing Architect",
        ms: "Arkitek Jenama & Pemasaran Prestasi",
        th: "ผู้เชี่ยวชาญการสร้างแบรนด์และการตลาดดิจิทัล",
        vi: "Kiến trúc sư Thương hiệu & Tiếp thị Hiệu suất",
      },
      bio: {
        id: "Membantu UMKM bertransformasi dari tautan gratisan menjadi merek terpercaya dengan domain pribadi dan pelacakan pixel akurat.",
        en: "Helping emerging brands graduate from generic bio links to white-label custom domains with server-side pixel tracking.",
        ms: "Membantu PKS beralih kepada domain jenama sendiri dengan penjejakan piksel tepat.",
        th: "ช่วยธุรกิจเปลี่ยนจากลิงก์ทั่วไปสู่โดเมนส่วนตัวพร้อมระบบติดตาม Pixel แม่นยำ",
        vi: "Giúp thương hiệu nâng cấp lên tên miền riêng kết hợp đo lường pixel chính xác.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Mengapa Custom Domain & White-Label Wajib Saat Anda Mulai Beriklan di Meta & TikTok Ads",
        summary: "Dampak menggunakan domain merek sendiri (`brandanda.com`) terhadap biaya iklan (CPA), kepercayaan pembeli baru, serta keakuratan Meta CAPI dan TikTok Pixel.",
        category: "Branding & Bisnis",
        readTime: "5 min baca",
        directAnswer: "Menggunakan custom domain sendiri (`brandanda.com`) pada paket PRO menghilangkan kebingungan pembeli, menurunkan rasio pentalan di landing page iklan hingga 32%, dan memungkinkan verifikasi kepemilikan domain untuk Meta Pixel & CAPI secara penuh.",
        keyTakeaways: [
          "Pembeli iklan berbayar jauh lebih percaya pada domain `.com`/`.id` resmi milik brand daripada link sub-platform generik.",
          "Paket PRO etalase.online menghapus badge footer platform (White-Label penuh) dan menyingkirkan embel-embel judul situs.",
          "Hubungkan CNAME cukup sekali di panel DNS Cloudflare/Niagahoster/Rumahweb pada menu Settings > Custom Domain.",
          "Integrasikan Meta Pixel + Conversions API (CAPI) agar algoritma iklan tepat membaca event `Purchase` berbayar.",
        ],
        table: {
          caption: "Perbandingan Kesiapan Iklan: Subdomain Gratis vs Custom Domain PRO",
          headers: ["Parameter", "Custom Domain PRO", "Link Bio Standar"],
          rows: [
            ["White-Label Footer & Title", "100% Bersih Nama Toko Sendiri", "Menampilkan branding platform"],
            ["Kesiapan Verifikasi Iklan", "Mandiri per domain milik Anda", "Berbagi reputasi domain massal"],
            ["Biaya Transaksi QRIS", "Hemat hanya 2% (min. Rp 25.000)", "Tarif standar 4.5% (min. Rp 15.000)"],
            ["Meta CAPI + TikTok Pixel + GA4", "Aktif penuh server-side & client", "Hanya analitik dasar"],
          ],
        },
        sections: [
          {
            heading: "1. Mengapa Domain Pribadi Mempengaruhi Biaya per Klik & Closing Iklan?",
            directAnswer: "Saat seseorang mengklik iklan produk seharga Rp 199.000 lalu melihat alamat browser berbeda dari nama merek di video iklan, keraguan muncul seketika.",
            content: [
              "Di era banyaknya tautan phishing, konsumen Indonesia makin kritis mengecek address bar browser sebelum memindai QRIS atau mengisi nomor WhatsApp.",
              "Dengan mengaktifkan PRO (mulai Rp 49.000/bln atau Rp 468.000/tahun), Anda bisa memasang domain seperti `tokoanda.com` langsung di menu **Settings > Custom Domain** dan menyalin rekaman CNAME ke penyedia domain Anda.",
            ],
          },
        ],
        faqs: [
          {
            question: "Berapa lama propagasi custom domain setelah setting CNAME?",
            answer: "Biasanya aktif dalam 5 hingga 30 menit melalui DNS Cloudflare, atau maksimal 24 jam tergantung registrar domain Anda.",
          },
        ],
      },
      en: {
        title: "Why Custom Domains & White-Label Storefronts Matter Before Running Paid Ads",
        summary: "How switching from generic links to your own branded domain lowers ad CPA, eliminates platform footers, and unlocks accurate Meta CAPI tracking.",
        category: "Branding & Domain",
        readTime: "5 min read",
        directAnswer: "Using a white-label custom domain builds immediate cold-traffic trust and isolates your Meta/TikTok Pixel domain verification cleanly.",
        keyTakeaways: [
          "Remove all platform footer badges under PRO white-label mode.",
          "Lower QRIS platform fee from 4.5% down to 2%.",
          "Track ViewContent, InitiateCheckout, and Purchase server-side with Meta CAPI.",
        ],
        sections: [
          {
            heading: "1. Cold Ad Traffic Demands Address Bar Consistency",
            directAnswer: "Matching ad brand names with the browser domain cuts landing-page skepticism.",
            content: ["Point your CNAME inside Settings > Custom Domain and remove third-party footer links automatically."],
          },
        ],
        faqs: [
          {
            question: "Is white-label included automatically on PRO?",
            answer: "Yes, PRO and DFY stores render your brand name exclusively in browser titles and omit platform footers.",
          },
        ],
      },
      ms: {
        title: "Mengapa Domain Sendiri & White-Label Penting Sebelum Menjalankan Iklan Berbayar",
        summary: "Kesan penggunaan domain jenama sendiri terhadap keyakinan pembeli baharu serta ketepatan Meta Pixel dan CAPI.",
        category: "Penjenamaan & Bisnes",
        readTime: "5 min baca",
        directAnswer: "Domain sendiri menghapuskan keraguan pembeli baharu dan membolehkan pengesahan penuh Meta CAPI serta TikTok Pixel.",
        keyTakeaways: [
          "Mod White-Label membuang lencana kaki halaman platform.",
          "Yuran QRIS diturunkan kepada hanya 2% bagi pelan PRO.",
        ],
        sections: [
          {
            heading: "1. Membina Kredibiliti Segera pada Bar Alamat Pelayar",
            directAnswer: "Pembeli lebih yakin mengimbas QRIS apabila domain sepadan dengan jenama.",
            content: ["Tetapkan rekod CNAME dengan mudah di halaman Settings > Custom Domain."],
          },
        ],
        faqs: [
          {
            question: "Adakah white-label termasuk dalam pelan PRO?",
            answer: "Ya, pelan PRO menyembunyikan penjenamaan platform secara automatik.",
          },
        ],
      },
      th: {
        title: "ทำไมการใช้โดเมนส่วนตัวและหน้าร้าน White-Label จึงสำคัญก่อนยิงแอด",
        summary: "ผลลัพธ์ของการเปลี่ยนลิงก์ทั่วไปเป็นโดเมนแบรนด์ตัวเองต่อความน่าเชื่อถือและความแม่นยำของ Pixel",
        category: "การสร้างแบรนด์และธุรกิจ",
        readTime: "5 นาทีอ่าน",
        directAnswer: "โดเมนส่วนตัวช่วยลดความลังเลของลูกค้าจากโฆษณาและรองรับการวัดผล Meta CAPI แบบเต็มรูปแบบ",
        keyTakeaways: [
          "ลบโลโก้แพลตฟอร์มท้ายหน้าเว็บแบบ White-Label 100%",
          "ค่าธรรมเนียม QRIS ลดลงเหลือเพียง 2% บนแพ็กเกจ PRO",
        ],
        sections: [
          {
            heading: "1. ความน่าเชื่อถือเริ่มต้นที่ชื่อโดเมน",
            directAnswer: "ลูกค้ามั่นใจมากขึ้นเมื่อชื่อเว็บตรงกับชื่อแบรนด์ในโฆษณา",
            content: ["ผูก CNAME ได้ง่าย ๆ ผ่านเมนู Settings > Custom Domain"],
          },
        ],
        faqs: [
          {
            question: "แพ็กเกจ PRO ได้รับสิทธิ์ White-Label อัตโนมัติหรือไม่?",
            answer: "ใช่ ร้านค้า PRO จะแสดงเฉพาะชื่อแบรนด์ของคุณโดยไม่มีโลโก้แพลตฟอร์มท้ายหน้าเว็บ",
          },
        ],
      },
      vi: {
        title: "Vì Sao Tên Miền Riêng & Giao Diện White-Label Quan Trọng Khi Chạy Quảng Cáo",
        summary: "Tác động của tên miền thương hiệu riêng tới độ tin cậy khách hàng mới và độ chính xác của Meta CAPI, TikTok Pixel.",
        category: "Thương hiệu & Kinh doanh",
        readTime: "5 phút đọc",
        directAnswer: "Tên miền riêng ở gói PRO loại bỏ thương hiệu nền tảng, tăng độ tin cậy khi khách bấm quảng cáo và tối ưu hóa đo lường chuyển đổi.",
        keyTakeaways: [
          "Gói PRO ẩn hoàn toàn chân trang nền tảng (White-label).",
          "Giảm phí QRIS xuống chỉ còn 2% mỗi giao dịch.",
        ],
        sections: [
          {
            heading: "1. Độ đồng bộ thương hiệu giúp giảm tỷ lệ thoát trang",
            directAnswer: "Người mua tin tưởng hơn khi đường dẫn trình duyệt khớp với tên thương hiệu quảng cáo.",
            content: ["Chỉ cần cấu hình CNAME một lần tại Settings > Custom Domain."],
          },
        ],
        faqs: [
          {
            question: "Gói PRO có hỗ trợ gỡ thương hiệu nền tảng không?",
            answer: "Có, toàn bộ cửa hàng PRO hiển thị độc quyền thương hiệu của bạn.",
          },
        ],
      },
    },
  },
  {
    slug: "strategi-flash-sale-harga-coret-naikkan-konversi",
    datePublished: "2026-11-25T08:00:00+07:00",
    dateModified: "2026-11-25T11:30:00+07:00",
    image: {
      url: "/images/blog/cover-flash-sale.jpg",
      width: 1200,
      height: 800,
      alt: {
        id: "Tas belanja promo berwarna merah terakota dan hitam menggambarkan strategi Flash Sale toko online",
        en: "Terracotta and charcoal boutique shopping bags illustrating flash sale price anchoring campaigns",
        ms: "Beg beli-belah promosi menggambarkan kempen jualan kilat dan diskaun harga",
        th: "ถุงช้อปปิ้งโทนสีส้มอิฐและดำสะท้อนกลยุทธ์โปรโมชัน Flash Sale",
        vi: "Túi mua sắm khuyến mãi minh họa chiến dịch Flash Sale tăng tỷ lệ chốt đơn",
      },
      caption: {
        id: "Kombinasi Banner Content Block + Harga Coret Flash Sale memicu pembeli mengambil keputusan saat itu juga.",
        en: "Combining visual Content Block banners with slashed promo pricing triggers immediate buyer action.",
        ms: "Gabungan sepanduk visual dan harga diskaun mencetuskan pembelian segera.",
        th: "การใช้แบนเนอร์โปรโมชันร่วมกับป้ายราคาขีดฆ่าช่วยกระตุ้นการตัดสินใจซื้อทันที",
        vi: "Kết hợp banner Content Blocks và giá gạch ngang kích thích hành vi mua ngay.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Praktisi CRO & Merchandising Ritel",
        en: "CRO & Retail Merchandising Specialist",
        ms: "Pakar CRO & Peruncitan Digital",
        th: "ผู้เชี่ยวชาญด้านการเพิ่มอัตราการสั่งซื้อและจัดวางสินค้า",
        vi: "Chuyên gia Tối ưu Chuyển đổi Bán lẻ",
      },
      bio: {
        id: "Merancang arsitektur tampilan promo, penjangkaran harga, dan alur checkout tercepat agar trafik media sosial berujung transaksi nyata.",
        en: "Designing high-converting promo merchandising and price-anchoring flows for mobile-first storefronts.",
        ms: "Merancang susun atur promosi dan penetapan harga berimpak tinggi.",
        th: "ออกแบบการวางสินค้าโปรโมชันและการตั้งราคาดึงดูดใจบนหน้าร้านมือถือ",
        vi: "Thiết kế bố cục khuyến mãi và chiến lược neo giá giúp tăng đơn hàng.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Psikologi Harga Coret & Flash Sale 24 Jam untuk Menggandakan Closing Bio Link",
        summary: "Cara menggabungkan fitur Promo Flash Sale dengan Content Blocks poster promo agar pengunjung storefront tidak menunda checkout hingga esok hari.",
        category: "Konversi & Promo",
        readTime: "4 min baca",
        directAnswer: "Menampilkan harga asli yang dicoret secara berdampingan dengan harga promo (disertai badge persentase hemat) meningkatkan rasio klik beli hingga 38% karena otak pembeli langsung melihat nilai penghematan tanpa menghitung ulang.",
        keyTakeaways: [
          "Gunakan selisih diskon minimal 20%–40% pada produk pancingan utama (*tripwire product*).",
          "Aktifkan Promo Flash Sale langsung dari menu `Products & Promos > Flash Sale & Promos` tanpa menghapus data produk.",
          "Tambahkan poster promo di atas daftar produk lewat **Content Blocks** sebagai penarik perhatian visual pertama.",
          "Batasi durasi promo (misal Gajian Sale tanggal 25–28) untuk menciptakan urgensi sehat.",
        ],
        table: {
          caption: "Efek Penjangkaran Harga pada Kartu Produk Etalase",
          headers: ["Tampilan Harga", "Persepsi Pembeli", "Performa Konversi"],
          rows: [
            ["Satu angka polos (Rp 79.000)", "Menebak-nebak apakah mahal/murah", "Standar"],
            ["Harga coret + badge (Rp 79.000 vs ~~Rp 149.000~~ -47%)", "Langsung terasa nilai hematnya", "Lebih tinggi signifikan"],
          ],
        },
        sections: [
          {
            heading: "1. Mengatur Promo Tanpa Ribet Edit Ulang Katalog",
            directAnswer: "Di dashboard Admin Console, Anda dapat mengaktifkan/mematikan harga Flash Sale cukup 1 klik dan harga normal otomatis kembali saat promo selesai.",
            content: [
              "Kesalahan banyak seller saat membuat promo akhir pekan adalah mengubah harga produk secara manual, lalu lupa atau kewalahan mengembalikan harga normalnya pada Senin pagi.",
              "Pada menu **Flash Sale & Promos** di etalase.online, harga reguler dan harga Flash Sale tersimpan terpisah di database. Ketika toggle promo dimatikan, sistem langsung mengembalikan harga normal dengan rapi.",
            ],
          },
        ],
        faqs: [
          {
            question: "Apakah harga promo otomatis berlaku saat pelanggan menuju halaman Checkout QRIS?",
            answer: "Ya, baik tampilan storefront maupun invoice QRIS/PayPal langsung menggunakan harga promo yang sedang aktif secara konsisten.",
          },
        ],
      },
      en: {
        title: "The Psychology of Slashed Promo Pricing & 24-Hour Flash Sales on Storefronts",
        summary: "Pair Flash Sale price anchoring with Content Block promo banners to turn passive bio link browsers into immediate buyers.",
        category: "Conversion & Promos",
        readTime: "4 min read",
        directAnswer: "Displaying slashed compare-at prices alongside active promo pricing lifts add-to-checkout click rates by removing buyer hesitation.",
        keyTakeaways: [
          "Separate regular price and promo price in Admin Console so ending a sale takes one click.",
          "Place a high-contrast visual banner above the catalog using Content Blocks.",
          "Active Flash Sale pricing syncs automatically into BorderPay QRIS invoices.",
        ],
        sections: [
          {
            heading: "1. Zero-Friction Weekend Flash Sales",
            directAnswer: "Toggle promotions on and off cleanly without overwriting original base prices.",
            content: ["Configure promo prices under Products & Promos > Flash Sale & Promos in seconds."],
          },
        ],
        faqs: [
          {
            question: "Does the promo price carry over into QRIS checkout automatically?",
            answer: "Yes, checkout invoices strictly reflect the active discounted price stored in the database.",
          },
        ],
      },
      ms: {
        title: "Psikologi Harga Diskaun & Flash Sale 24 Jam untuk Ganda Jualan",
        summary: "Cara menggabungkan harga diskaun coret dan sepanduk Content Blocks untuk menggalakkan pelanggan membuat bayaran segera.",
        category: "Penukaran & Promosi",
        readTime: "4 min baca",
        directAnswer: "Memaparkan harga asal yang dicoret di sebelah harga promosi meningkatkan kadar klik pembayaran dengan jelas.",
        keyTakeaways: [
          "Urus harga biasa dan harga promo secara berasingan dengan satu klik.",
          "Harga promosi diselaraskan automatik ke bil QRIS.",
        ],
        sections: [
          {
            heading: "1. Kempen Jualan Hujung Minggu Tanpa Ubah Katalog Secara Manual",
            directAnswer: "Matikan promosi dengan satu suis apabila tempoh tamat.",
            content: ["Gunakan bahagian Flash Sale & Promos pada papan pemuka pentadbir."],
          },
        ],
        faqs: [
          {
            question: "Adakah harga promo digunakan automatik semasa checkout?",
            answer: "Ya, halaman bayaran menggunakan harga promosi aktif secara automatik.",
          },
        ],
      },
      th: {
        title: "จิตวิทยาการติดป้ายราคาขีดฆ่าและ Flash Sale 24 ชั่วโมงเพื่อเพิ่มยอดปิดการขาย",
        summary: "ผสานป้ายลดราคากับแบนเนอร์ Content Blocks เพื่อให้ผู้ชมตัดสินใจซื้อทันทีไม่รอข้ามวัน",
        category: "โปรโมชันและยอดขาย",
        readTime: "4 นาทีอ่าน",
        directAnswer: "การแสดงราคาเต็มแบบขีดฆ่าคู่กับราคาพิเศษช่วยเพิ่มแรงจูงใจในการกดชำระเงินทันที",
        keyTakeaways: [
          "ตั้งค่าราคา Flash Sale แยกจากราคาปกติในคลิกเดียว",
          "ราคาโปรโมชันเชื่อมต่อกับระบบบิล QRIS อัตโนมัติ",
        ],
        sections: [
          {
            heading: "1. จัดโปรโมชันสุดสัปดาห์โดยไม่ต้องแก้ข้อมูลซ้ำ",
            directAnswer: "เปิด-ปิดสถานะโปรโมชันได้ทันทีเมื่อจบแคมเปญ",
            content: ["ตั้งค่าได้ในเมนู Products & Promos > Flash Sale & Promos"],
          },
        ],
        faqs: [
          {
            question: "ราคาโปรโมชันจะอัปเดตในหน้าชำระเงิน QRIS ทันทีไหม?",
            answer: "ใช่ ระบบบิลชำระเงินดึงราคาล่าสุดจากฐานข้อมูลโดยตรง",
          },
        ],
      },
      vi: {
        title: "Tâm Lý Giá Gạch Ngang & Flash Sale 24 Giờ Giúp Nhân Đôi Tỷ Lệ Chốt Đơn",
        summary: "Kết hợp Flash Sale và Content Blocks để biến khách xem bio link thành người mua hàng ngay lập tức.",
        category: "Chuyển đổi & Khuyến mãi",
        readTime: "4 phút đọc",
        directAnswer: "Hiển thị giá gốc gạch ngang bên cạnh giá khuyến mãi giúp khách thấy ngay mức tiết kiệm và giảm chần chừ khi thanh toán.",
        keyTakeaways: [
          "Bật tắt giá Flash Sale chỉ bằng một cú nhấp không làm mất giá gốc.",
          "Giá khuyến mãi đồng bộ tự động vào hóa đơn thanh toán QRIS.",
        ],
        sections: [
          {
            heading: "1. Chạy Flash Sale cuối tuần không cần sửa lại toàn bộ sản phẩm",
            directAnswer: "Lưu riêng giá gốc và giá ưu đãi trong trang quản trị.",
            content: ["Quản lý trực quan tại mục Products & Promos > Flash Sale & Promos."],
          },
        ],
        faqs: [
          {
            question: "Giá khuyến mãi có tự động áp dụng khi khách thanh toán QRIS không?",
            answer: "Có, hệ thống thanh toán tự động tính đúng mức giá ưu đãi đang bật.",
          },
        ],
      },
    },
  },
  {
    slug: "monetisasi-kursus-mini-video-whatsapp-member",
    datePublished: "2026-11-25T11:30:00+07:00",
    dateModified: "2026-11-25T12:00:00+07:00",
    image: {
      url: "/images/blog/cover-mini-course.jpg",
      width: 1200,
      height: 800,
      alt: {
        id: "Kreator edukasi mempresentasikan materi kursus mini video di layar laptop untuk siswa member",
        en: "Educator walking through online mini-course lessons on a laptop screen",
        ms: "Pencipta kandungan pendidikan membentangkan modul kursus video dalam talian pada komputer riba",
        th: "ผู้สอนกำลังนำเสนอบทเรียนวิดีโอคอร์สออนไลน์สั้นบนหน้าจอแล็ปท็อป",
        vi: "Nhà đào tạo chia sẻ bài giảng khóa học video ngắn trên màn hình laptop",
      },
      caption: {
        id: "Area Member Kursus (`/learn`) membuka modul video pelajaran otomatis bagi pembeli dengan status PAID.",
        en: "Built-in course player (`/learn`) unlocks video modules automatically once payment settles.",
        ms: "Ruang ahli kursus membuka modul video secara automatik selepas pembayaran disahkan.",
        th: "ห้องเรียนออนไลน์ (`/learn`) ปลดล็อกบทเรียนวิดีโอทันทีเมื่อชำระเงินสำเร็จ",
        vi: "Khu vực học viên (`/learn`) tự động mở khóa bài giảng video sau khi thanh toán.",
      },
    },
    author: {
      name: EDITORIAL_TEAM_MAP,
      role: {
        id: "Spesialis Produk Edukasi & Kreator",
        en: "EdTech & Creator Economy Specialist",
        ms: "Pakar Ekonomi Pencipta & EdTech",
        th: "ผู้เชี่ยวชาญด้านเศรษฐกิจครีเอเตอร์และคอร์สออนไลน์",
        vi: "Chuyên gia Kinh tế Sáng tạo & EdTech",
      },
      bio: {
        id: "Membantu praktisi skill meluncurkan kelas video ringkas berbayar tanpa biaya langganan LMS bulanan jutaan rupiah.",
        en: "Helping practitioners launch high-impact micro video courses without heavy monthly LMS overhead.",
        ms: "Membantu pengajar melancarkan kursus video ringkas tanpa kos platform LMS yang mahal.",
        th: "ช่วยให้ผู้เชี่ยวชาญเปิดคอร์สวิดีโอขนาดกะทัดรัดได้ทันทีโดยไม่ต้องจ่ายค่าเช่า LMS แพง",
        vi: "Giúp chuyên gia ra mắt khóa học video ngắn mà không tốn chi phí thuê LMS đắt đỏ.",
      },
      avatar: "/favicon.svg",
    },
    translations: {
      id: {
        title: "Jual Mini-Course Video Rp 99 Ribu Tanpa Sewa LMS Mahal: Panduan Fitur Member Area",
        summary: "Bagaimana kreator tutorial desain, bahasa asing, hingga keuangan menjual modul video pendek yang terkunci otomatis berdasarkan kode pesanan bayar.",
        category: "Kreator & Kursus",
        readTime: "5 min baca",
        directAnswer: "Dengan fitur Kursus (`/learn`) di etalase.online, kreator cukup menyusun daftar judul bab dan tautan video (YouTube Unlisted / Vimeo / MP4) di form produk `COURSE`; halaman materi otomatis terkunci dan hanya terbuka untuk pembeli yang status ordernya `PAID` atau `COMPLETED`.",
        keyTakeaways: [
          "Fokus pada 'Mini-Course' 4–8 video praktis berdurasi 5–10 menit per bab agar tingkat selesai siswa tinggi.",
          "Susun modul bab langsung di dashboard produk tanpa perlu integrasi plugin LMS rumit.",
          "Akses ruang belajar divalidasi di sisi server menggunakan verifikasi nomor WhatsApp + kode order.",
          "Cocok digabung dengan upsell konsultasi 1-on-1 atau template kerja pendukung.",
        ],
        table: {
          caption: "Meluncurkan Kursus Video: Etalase Course Area vs LMS Berat Tradisional",
          headers: ["Aspek", "Etalase Course (`/learn`)", "Platform LMS Berat"],
          rows: [
            ["Biaya Setup Awal", "Rp 0 (Bisa langsung di paket Gratis)", "Berbayar bulanan mahal USD"],
            ["Proteksi Akses Materi", "Terkunci di server cek order PAID", "Setting login kompleks bagi pemula"],
            ["Kemudahan Siswa di HP", "Cukup masukkan Order Code / WA", "Sering lupa password akun LMS"],
          ],
        },
        sections: [
          {
            heading: "1. Mengapa Mini-Course Lebih Laris daripada Kelas 40 Jam?",
            directAnswer: "Pembeli modern membayar untuk hasil cepat di akhir pekan, bukan ratusan video berjam-jam yang akhirnya tidak pernah ditonton.",
            content: [
              "Kelas ringkas seperti 'Tutorial Edit Reels CapCut 6 Bab' atau 'Cara Pembukuan UMKM di Excel dalam 90 Menit' jauh lebih mudah dijual di kisaran Rp 79.000 hingga Rp 249.000.",
              "Melalui tipe produk **Online Course** di etalase.online, Anda dapat menambahkan daftar modul beserta URL video secara langsung saat membuat produk. Siswa yang sudah membayar QRIS atau Order disetujui tinggal masuk ke halaman `/learn` dengan kode pesanan atau nomor WhatsApp mereka untuk langsung menonton seluruh modul.",
            ],
          },
        ],
        faqs: [
          {
            question: "Bagaimana sistem mencegah link video kursus dibuka orang yang belum bayar?",
            answer: "Daftar modul hanya dikirim oleh server setelah `actionVerifyCourseAccess` memastikan ada transaksi `PAID` atau `COMPLETED` pada database untuk produk tersebut.",
          },
        ],
      },
      en: {
        title: "Sell Mini Video Courses Without Expensive LMS Subscriptions",
        summary: "How educators and skilled practitioners lock video course modules behind verified order checks straight inside etalase.online.",
        category: "Creators & Courses",
        readTime: "5 min read",
        directAnswer: "Use the `COURSE` product type to organize chapter titles and video links cleanly; the server validates `PAID` or `COMPLETED` orders before unlocking course modules.",
        keyTakeaways: [
          "Short 4–8 lesson sprints convert better than overwhelming 40-hour courses.",
          "Zero monthly LMS software tax to launch your first curriculum.",
          "Server-verified access via Order Code and WhatsApp number.",
        ],
        sections: [
          {
            heading: "1. Outcome-Driven Micro Courses Win Mobile Attention",
            directAnswer: "Learners gladly pay for focused skills they can master over one weekend.",
            content: ["Manage modules directly inside the Admin Console product editor without external plugins."],
          },
        ],
        faqs: [
          {
            question: "Are course videos protected from unpaid visitors?",
            answer: "Yes, module URLs are strictly gated server-side and unlocked only after verified PAID or COMPLETED order lookup.",
          },
        ],
      },
      ms: {
        title: "Jual Kursus Video Mini Tanpa Langganan LMS Mahal",
        summary: "Cara pengajar menyusun modul video yang terkunci automatik berdasarkan pengesahan pesanan berbayar.",
        category: "Pencipta & Kursus",
        readTime: "5 min baca",
        directAnswer: "Pilih jenis produk Kursus untuk menyusun bab video terus di papan pemuka; pelayan hanya membuka akses kepada pesanan berstatus `PAID` atau `COMPLETED`.",
        keyTakeaways: [
          "Kursus pendek 4-8 modul lebih cepat disiapkan dan laris dibeli.",
          "Pengesahan akses di sisi pelayan menggunakan kod pesanan.",
        ],
        sections: [
          {
            heading: "1. Kursus Ringkas Menjimatkan Masa Pelajar",
            directAnswer: "Pelajar suka kemahiran pantas yang dapat diaplikasikan dalam masa sehari.",
            content: ["Tambah modul pelajaran terus pada borang produk tanpa sistem luar yang rumit."],
          },
        ],
        faqs: [
          {
            question: "Bagaimana akses modul dikawal?",
            answer: "Pelayan menyemak rekod pesanan yang telah dibayar sebelum memaparkan senarai video modul.",
          },
        ],
      },
      th: {
        title: "ขายคอร์สวิดีโอขนาดสั้นโดยไม่ต้องจ่ายค่าเช่า LMS แพง",
        summary: "วิธีจัดบทเรียนวิดีโอที่ปลดล็อกสิทธิ์อัตโนมัติตามสถานะการชำระเงินจริงในฐานข้อมูล",
        category: "ครีเอเตอร์และคอร์สเรียน",
        readTime: "5 นาทีอ่าน",
        directAnswer: "เลือกประเภทสินค้า Online Course เพื่อเพิ่มบทเรียนและลิงก์วิดีโอ ระบบหลังบ้านจะตรวจสอบสถานะ PAID/COMPLETED ก่อนเปิดหน้าบทเรียน",
        keyTakeaways: [
          "คอร์สสั้น 4-8 บทเรียนขายง่ายและผู้เรียนเรียนจบไว",
          "ระบบตรวจสอบสิทธิ์ฝั่งเซิร์ฟเวอร์ด้วยรหัสสั่งซื้อ",
        ],
        sections: [
          {
            heading: "1. คอร์สสั้นเน้นผลลัพธ์จริงตอบโจทย์ผู้เรียนยุคใหม่",
            directAnswer: "ประหยัดต้นทุนระบบ LMS รายเดือนตั้งแต่คอร์สแรก",
            content: ["จัดการรายชื่อบทเรียนได้ทันทีในหน้าแก้ไขสินค้า"],
          },
        ],
        faqs: [
          {
            question: "ป้องกันผู้ที่ยังไม่ชำระเงินเข้าดูบทเรียนได้อย่างไร?",
            answer: "ระบบตรวจสอบสถานะคำสั่งซื้อ PAID/COMPLETED จากฐานข้อมูลก่อนส่งมอบเนื้อหาวิดีโอ",
          },
        ],
      },
      vi: {
        title: "Bán Khóa Học Video Ngắn Không Cần Thuê Nền Tảng LMS Đắt Đỏ",
        summary: "Cách chuyên gia thiết lập các chương học video chỉ mở khóa tự động khi đơn hàng đã được xác nhận thanh toán.",
        category: "Nhà sáng tạo & Khóa học",
        readTime: "5 phút đọc",
        directAnswer: "Sử dụng loại sản phẩm Khóa học (`COURSE`) để nhập danh sách bài giảng; máy chủ tự động đối chiếu đơn hàng `PAID` hoặc `COMPLETED` trước khi mở khóa video.",
        keyTakeaways: [
          "Khóa học cô đọng 4-8 video thực chiến có tỷ lệ hoàn thành cao hơn.",
          "Kiểm tra quyền truy cập tại máy chủ bằng mã đơn hàng và số WhatsApp.",
        ],
        sections: [
          {
            heading: "1. Khóa học siêu gọn giải quyết đúng một vấn đề",
            directAnswer: "Không tốn phí thuê LMS hàng tháng để bắt đầu bán kiến thức.",
            content: ["Chỉnh sửa từng chương bài học ngay trong trang quản lý sản phẩm."],
          },
        ],
        faqs: [
          {
            question: "Hệ thống ngăn chặn người chưa mua xem video bằng cách nào?",
            answer: "Dữ liệu bài học chỉ được máy chủ trả về sau khi xác nhận giao dịch thanh toán thành công.",
          },
        ],
      },
    },
  },
];

/**
 * Returns all articles localized for the selected language with fallback to ID.
 */
export function getAllArticles(locale: SupportedLocale = "id") {
  return ARTICLES_DATA.map((article) => {
    const t = article.translations[locale] || article.translations.id;
    return {
      slug: article.slug,
      title: t.title,
      summary: t.summary,
      category: t.category,
      readTime: t.readTime,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      image: {
        url: article.image.url,
        width: article.image.width,
        height: article.image.height,
        alt: article.image.alt[locale] || article.image.alt.id,
        caption: article.image.caption[locale] || article.image.caption.id,
      },
      author: {
        name: article.author.name[locale] || article.author.name.id,
        role: article.author.role[locale] || article.author.role.id,
        bio: article.author.bio[locale] || article.author.bio.id,
        avatar: article.author.avatar,
      },
    };
  });
}

/**
 * Returns single article localized for the selected language.
 */
export function getArticleBySlugAndLocale(slug: string, locale: SupportedLocale = "id") {
  const article = ARTICLES_DATA.find((a) => a.slug === slug);
  if (!article) return null;

  const t = article.translations[locale] || article.translations.id;
  return {
    slug: article.slug,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    title: t.title,
    summary: t.summary,
    category: t.category,
    readTime: t.readTime,
    directAnswer: t.directAnswer,
    keyTakeaways: t.keyTakeaways,
    table: t.table,
    sections: t.sections,
    faqs: t.faqs,
    image: {
      url: article.image.url,
      width: article.image.width,
      height: article.image.height,
      alt: article.image.alt[locale] || article.image.alt.id,
      caption: article.image.caption[locale] || article.image.caption.id,
    },
    author: {
      name: article.author.name[locale] || article.author.name.id,
      role: article.author.role[locale] || article.author.role.id,
      bio: article.author.bio[locale] || article.author.bio.id,
      avatar: article.author.avatar,
    },
  };
}

/**
 * Returns all categories available for a locale.
 */
export function getAllCategories(locale: SupportedLocale = "id"): string[] {
  const allLabel =
    locale === "id"
      ? "Semua"
      : locale === "en"
      ? "All"
      : locale === "ms"
      ? "Semua"
      : locale === "th"
      ? "ทั้งหมด"
      : "Tất cả";

  const categories = new Set<string>();
  ARTICLES_DATA.forEach((article) => {
    const t = article.translations[locale] || article.translations.id;
    categories.add(t.category);
  });
  return [allLabel, ...Array.from(categories)];
}
