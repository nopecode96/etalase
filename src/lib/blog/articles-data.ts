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
      url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80",
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
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
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
      url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1200&q=80",
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
      url: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1200&q=80",
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
