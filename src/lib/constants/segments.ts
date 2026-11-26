import { SupportedLocale } from "@/lib/config/constants";

export interface SegmentPageConfig {
  slug: string;
  aliases: string[];
  categoryParam: string;
  templateId: string;
  demoSubdomain: string;
  demoLabel: string;
  badge: Record<SupportedLocale, string>;
  title: Record<SupportedLocale, string>;
  subtitle: Record<SupportedLocale, string>;
  metaTitle: Record<SupportedLocale, string>;
  metaDescription: Record<SupportedLocale, string>;
  painPoints: Record<SupportedLocale, string[]>;
  solutions: Record<SupportedLocale, string[]>;
  highlights: Record<SupportedLocale, string[]>;
  ctaText: Record<SupportedLocale, string>;
}

export const SEGMENT_PAGES: SegmentPageConfig[] = [
  {
    slug: "umkm",
    aliases: [],
    categoryParam: "RETAIL_UMKM",
    templateId: "clean-minimal",
    demoSubdomain: "kopisenja.etalase.online",
    demoLabel: "kopisenja.etalase.online",
    badge: {
      id: "Solusi UMKM & Toko Lokal",
      en: "SME & Local Storefront Solution",
      ms: "Penyelesaian PKS & Perniagaan Tempatan",
      th: "โซลูชันสำหรับ SME และร้านค้าท้องถิ่น",
      vi: "Giải Pháp Cho Hộ Kinh Doanh & SME",
    },
    title: {
      id: "Katalog Online untuk UMKM yang Langsung Closing di WhatsApp",
      en: "Online Catalog for SMEs Built to Close on WhatsApp",
      ms: "Katalog Dalam Talian untuk PKS yang Terus Tutup Jualan di WhatsApp",
      th: "แคตตาล็อกออนไลน์สำหรับ SME ปิดการขายตรงบน WhatsApp",
      vi: "Danh Mục Online Cho SME Chốt Đơn Thẳng Qua WhatsApp",
    },
    subtitle: {
      id: "Ganti foto katalog yang tenggelam di chat dengan link etalase rapi. Pembeli pilih barang, langsung masuk WhatsApp Anda (0% komisi) atau bayar QRIS otomatis.",
      en: "Replace buried chat photos with one clean storefront link. Buyers browse products and order straight to your WhatsApp (0% commission) or pay via QRIS.",
      ms: "Gantikan gambar katalog berselerak dengan pautan kedai yang kemas. Pembeli pilih produk dan terus hantar pesanan ke WhatsApp anda (0% komisen).",
      th: "เปลี่ยนรูปสินค้าที่กระจัดกระจายในแชตเป็นหน้าร้านออนไลน์ที่ดูเป็นมืออาชีพ ลูกค้าทักสั่งทาง WhatsApp (0%) หรือชำระ QRIS ได้ทันที",
      vi: "Thay thế ảnh sản phẩm rời rạc bằng một trang cửa hàng chuyên nghiệp. Khách chọn món và đặt thẳng qua WhatsApp (0% phí) hoặc QRIS.",
    },
    metaTitle: {
      id: "Katalog Online UMKM & Order WhatsApp Gratis | etalase.online",
      en: "SME Online Catalog & Zero-Commission WhatsApp Orders | etalase.online",
      ms: "Katalog Online PKS & Pesanan WhatsApp Tanpa Komisen | etalase.online",
      th: "แคตตาล็อกออนไลน์ SME และสั่งผ่าน WhatsApp ฟรี | etalase.online",
      vi: "Danh Mục Online Cho SME & Chốt Đơn WhatsApp | etalase.online",
    },
    metaDescription: {
      id: "Buat website katalog UMKM gratis dalam 30 detik. 0% komisi order WhatsApp, terima QRIS instan mulai 2%, produk unlimited.",
      en: "Launch a free SME online catalog in 30 seconds. 0% WhatsApp order commission, instant QRIS checkout from 2%, unlimited products.",
      ms: "Bina katalog dalam talian PKS percuma dalam 30 saat. 0% komisen WhatsApp, QRIS dari 2%, produk tanpa had.",
      th: "สร้างแคตตาล็อกร้านค้า SME ฟรีใน 30 วินาที คอมมิชชันแชต 0% รองรับ QRIS เริ่มต้น 2%",
      vi: "Tạo danh mục bán hàng cho SME miễn phí trong 30 giây. 0% hoa hồng đơn WhatsApp, thanh toán QR từ 2%.",
    },
    painPoints: {
      id: [
        "Kirim foto katalog dan daftar harga berkali-kali di WhatsApp setiap ada pembeli tanya",
        "Potongan komisi marketplace semakin besar sehingga menggerus margin keuntungan produk harian",
        "Nomor pelanggan tidak tersimpan langsung sehingga sulit melakukan repeat order",
      ],
      en: [
        "Resending product photos and price lists manually to every chat inquiry",
        "Rising marketplace commissions eating into daily product margins",
        "Losing direct repeat-customer relationships behind marketplace walls",
      ],
      ms: [
        "Terpaksa hantar gambar dan senarai harga berulang kali di WhatsApp",
        "Potongan komisen marketplace menjejaskan margin keuntungan produk",
        "Sukar menyimpan nombor pelanggan untuk belian ulangan terus",
      ],
      th: [
        "ต้องส่งรูปสินค้าและรายการราคาซ้ำๆ ในแชตทุกครั้งที่ลูกค้าทักถาม",
        "ค่าคอมมิชชันแพลตฟอร์มสูงขึ้นจนกระทบกำไรสุทธิของร้าน",
        "ไม่มีฐานข้อมูลลูกค้าสำหรับติดต่อกลับมาซื้อซ้ำโดยตรง",
      ],
      vi: [
        "Phải gửi lại ảnh sản phẩm và bảng giá thủ công cho từng khách hỏi mua",
        "Phí sàn thương mại điện tử tăng cao làm giảm lợi nhuận thực tế",
        "Khó lưu trữ khách hàng quen để chăm sóc và bán lại trực tiếp",
      ],
    },
    solutions: {
      id: [
        "Satu link etalase (namatoko.etalase.online) berisi foto, harga, varian, dan tombol Pesan WA otomatis",
        "0% komisi untuk seluruh transaksi order via chat WhatsApp selamanya",
        "Opsi pembayaran QRIS instan (Free 4,5% min. Rp 15.000 / PRO 2% min. Rp 25.000) dengan opsi Convenience Fee",
      ],
      en: [
        "Single mobile-first catalog URL with product photos, pricing, and pre-filled WhatsApp ordering",
        "0% commission on every WhatsApp chat order across all plans",
        "Optional instant QRIS checkout (4.5% Free / 2% PRO) with buyer convenience fee toggle",
      ],
      ms: [
        "Satu pautan kedai mobile-first dengan gambar, harga dan pesanan terus ke WhatsApp",
        "0% komisen untuk semua pesanan melalui chat WhatsApp selamanya",
        "Pilihan pembayaran QRIS automatik (4.5% Free / 2% PRO) dengan tetapan Convenience Fee",
      ],
      th: [
        "ลิงก์หน้าร้านเดียวรวมรูป ราคา และปุ่มสั่งซื้อเข้า WhatsApp อัตโนมัติ",
        "0% ค่าคอมมิชชันสำหรับทุกออเดอร์ที่ปิดทาง WhatsApp",
        "รองรับ QRIS อัตโนมัติ (4.5% ฟรี / 2% PRO) พร้อมตั้งค่าผู้ซื้อช่วยจ่ายค่าธรรมเนียมได้",
      ],
      vi: [
        "Một đường link gọn nhẹ gồm ảnh sản phẩm, giá và nút nhắn đặt hàng WhatsApp điền sẵn",
        "0% hoa hồng trọn đời cho đơn hàng đặt qua WhatsApp",
        "Tích hợp thanh toán QR tự động (4.5% Free / 2% PRO) và tùy chọn phí tiện lợi",
      ],
    },
    highlights: {
      id: ["0% Komisi Order Chat", "Produk Unlimited di Paket Gratis", "Siap 30 Detik Tanpa Coding"],
      en: ["0% Chat Commission", "Unlimited Products on Free Plan", "Live in 30 Seconds"],
      ms: ["0% Komisen Chat", "Produk Tanpa Had Pelan Percuma", "Siap dalam 30 Saat"],
      th: ["0% ค่าคอมฯ แชต", "ลงสินค้าไม่จำกัดฟรี", "เปิดร้านใน 30 วินาที"],
      vi: ["0% Phí Đơn Chat", "Không Giới Hạn Sản Phẩm", "Sẵn Sàng Trong 30 Giây"],
    },
    ctaText: {
      id: "Buat Katalog UMKM Gratis",
      en: "Create Free SME Catalog",
      ms: "Bina Katalog PKS Percuma",
      th: "สร้างแคตตาล็อก SME ฟรี",
      vi: "Tạo Cửa Hàng SME Miễn Phí",
    },
  },
  {
    slug: "showroom",
    aliases: ["sales"],
    categoryParam: "AUTOMOTIVE_PROPERTY",
    templateId: "showroom-pro",
    demoSubdomain: "bastianmobil.etalase.online",
    demoLabel: "bastianmobil.etalase.online",
    badge: {
      id: "Solusi Sales Showroom & Properti",
      en: "Automotive & Property Showroom Solution",
      ms: "Penyelesaian Jualan Kenderaan & Hartanah",
      th: "โซลูชันสำหรับฝ่ายขายรถยนต์และอสังหาริมทรัพย์",
      vi: "Giải Pháp Cho Showroom Ô Tô & Bất Động Sản",
    },
    title: {
      id: "Katalog Showroom Profesional untuk Sales Mobil, Motor & Properti",
      en: "Professional Digital Showroom for Auto & Property Consultants",
      ms: "Bilik Pameran Digital Profesional untuk Jurujual Kereta & Hartanah",
      th: "แคตตาล็อกโชว์รูมดิจิทัลสำหรับที่ปรึกษาการขายรถและอสังหาฯ",
      vi: "Showroom Số Chuyên Nghiệp Cho Tư Vấn Ô Tô & Bất Động Sản",
    },
    subtitle: {
      id: "Tampilkan galeri unit, label harga atau simulasi DP, dan tombol Tanya Unit / Test Drive langsung masuk ke WhatsApp Anda dengan nama unit terisi otomatis.",
      en: "Showcase vehicle or property galleries, DP/installment labels, and direct WhatsApp test-drive buttons pre-filled with exact unit names.",
      ms: "Pamerkan galeri unit, label bayaran muka dan butang Uji Pandu terus ke WhatsApp anda lengkap dengan nama model kenderaan.",
      th: "แสดงแกลเลอรีรถและบ้าน ป้ายเงินดาวน์/ค่างวด พร้อมปุ่มนัดทดลองขับที่ระบุชื่อรุ่นส่งตรงถึง WhatsApp",
      vi: "Trưng bày bộ sưu tập xe/dự án, bảng trả trước và nút đăng ký lái thử gửi thẳng tên xe qua WhatsApp.",
    },
    metaTitle: {
      id: "Website Katalog Sales Mobil & Agen Properti | Showroom Pro etalase.online",
      en: "Digital Showroom Catalog for Auto & Property Sales | etalase.online",
      ms: "Katalog Bilik Pameran Jurujual Kereta & Hartanah | etalase.online",
      th: "เว็บไซต์แคตตาล็อกโชว์รูมรถยนต์และอสังหาฯ | etalase.online",
      vi: "Website Danh Mục Showroom Ô Tô & Bất Động Sản | etalase.online",
    },
    metaDescription: {
      id: "Bantu sales mobil & properti tampil kredibel dengan subdomain sendiri, simulasi DP, dan lead test-drive otomatis ke WhatsApp.",
      en: "Empower auto and real estate consultants with dedicated subdomains, down-payment displays, and pre-filled WhatsApp test-drive leads.",
      ms: "Bantu jurujual kereta dan hartanah tampil diyakini dengan subdomain sendiri dan pertanyaan terus ke WhatsApp.",
      th: "เพิ่มความน่าเชื่อถือให้ฝ่ายขายรถและอสังหาฯ ด้วยซับโดเมนส่วนตัวและลิงก์ทักแชตระบุรุ่นทันที",
      vi: "Nâng tầm uy tín cho chuyên viên kinh doanh xe & BĐS với tên miền phụ riêng và lead qua WhatsApp.",
    },
    painPoints: {
      id: [
        "Mengirim file PDF brosur berukuran puluhan MB yang berat diunduh di HP prospek",
        "Prospek chat ke WhatsApp hanya bilang 'minta info' tanpa menyebut unit mana yang dilihat",
        "Harga promo DP berubah tiap bulan sehingga brosur gambar cepat kedaluwarsa",
      ],
      en: [
        "Heavy PDF price-list files stalling on prospects' mobile devices",
        "Incoming chats saying 'more info' without specifying which unit or trim the lead wants",
        "Monthly financing promos forcing constant redesigns of static flyers",
      ],
      ms: [
        "Fail PDF brosur terlalu besar untuk dimuat turun pelanggan",
        "Pelanggan bertanya tanpa menyatakan model atau varian kereta yang diminati",
        "Promosi DP berubah setiap bulan dan sukar dikemas kini pada poster lama",
      ],
      th: [
        "ไฟล์โบรชัวร์ PDF ขนาดใหญ่โหลดช้าบนมือถือลูกค้า",
        "ลูกค้าทักแชตถามโดยไม่ระบุรุ่นรถหรือโครงการที่สนใจ",
        "โปรโมชันเงินดาวน์เปลี่ยนทุกเดือน ต้องทำรูปใบปลิวใหม่บ่อยครั้ง",
      ],
      vi: [
        "File PDF bảng giá quá nặng khiến khách ngại tải trên điện thoại",
        "Tin nhắn khách hỏi không ghi rõ mẫu xe hoặc dự án đang quan tâm",
        "Ưu đãi trả trước thay đổi hàng tháng gây khó khăn khi gửi ảnh cũ",
      ],
    },
    solutions: {
      id: [
        "Template Showroom Pro mobile-first dengan foto tajam & label 'Mulai DP 15 Jt' atau 'Tanya Harga'",
        "Setiap tombol Tanya Unit otomatis mengisi nama model mobil/unit ke chat WhatsApp sales",
        "Update harga OTR, status unit ready stock, atau kuota test drive dalam hitungan detik dari HP",
      ],
      en: [
        "Showroom Pro layout supporting high-res photos and flexible labels ('DP from...', 'Inquire Price')",
        "One-tap inquiry button auto-fills the exact model/trim into the WhatsApp message draft",
        "Instant dashboard updates whenever monthly promos or ready-stock units change",
      ],
      ms: [
        "Templat Showroom Pro mesra telefon dengan paparan DP serta label 'Tanya Harga'",
        "Setiap butang pertanyaan mengisi nama model unit ke draf WhatsApp secara automatik",
        "Kemas kini harga dan stok tersedia dalam beberapa saat terus dari telefon",
      ],
      th: [
        "เทมเพลต Showroom Pro แสดงรูปคมชัด พร้อมป้ายเงินดาวน์หรือปุ่ม 'สอบถามราคา'",
        "ปุ่มทักแชตกรอกชื่อรุ่นและรายละเอียดลงในข้อความ WhatsApp อัตโนมัติ",
        "อัปเดตสถานะรถพร้อมส่งมอบและโปรโมชันรายเดือนได้ทันทีผ่านมือถือ",
      ],
      vi: [
        "Mẫu Showroom Pro hiển thị ảnh sắc nét kèm nhãn trả trước linh hoạt",
        "Nút tư vấn tự động điền đúng tên mẫu xe/căn hộ vào tin nhắn WhatsApp",
        "Cập nhật giá lăn bánh và tình trạng xe sẵn có trong vài giây từ điện thoại",
      ],
    },
    highlights: {
      id: ["Template Showroom Pro Khusus Unit", "Label DP & Harga Fleksibel", "0% Komisi Lead WhatsApp"],
      en: ["Dedicated Showroom Pro Layout", "Flexible DP & Pricing Labels", "0% WhatsApp Lead Commission"],
      ms: ["Susun Atur Showroom Pro", "Label DP & Harga Fleksibel", "0% Komisen Lead WhatsApp"],
      th: ["เลย์เอาต์ Showroom Pro โดยเฉพาะ", "แสดงเงินดาวน์ยืดหยุ่น", "0% คอมฯ ลีดเข้าแชต"],
      vi: ["Giao Diện Showroom Pro Riêng", "Nhãn Trả Trước Linh Hoạt", "0% Hoa Hồng Lead Chat"],
    },
    ctaText: {
      id: "Buat Etalase Showroom Sekarang",
      en: "Launch Digital Showroom",
      ms: "Bina Showroom Digital Sekarang",
      th: "สร้างโชว์รูมดิจิทัลตอนนี้",
      vi: "Tạo Showroom Số Ngay",
    },
  },
  {
    slug: "kreator",
    aliases: ["creator"],
    categoryParam: "DIGITAL_CREATOR",
    templateId: "clean-minimal",
    demoSubdomain: "rafa.etalase.online",
    demoLabel: "rafa.etalase.online",
    badge: {
      id: "Solusi Kreator & Produk Digital",
      en: "Digital Creators & Knowledge Sellers",
      ms: "Pencipta Digital & Penjual E-Buku",
      th: "ครีเอเตอร์ดิจิทัลและผู้ขายสินค้าออนไลน์",
      vi: "Nhà Sáng Tạo Số & Khóa Học",
    },
    title: {
      id: "Jual E-Book, Preset, & Kelas 1-on-1 dengan Auto-Delivery WhatsApp",
      en: "Sell E-Books, Presets & 1-on-1 Sessions with Automated Delivery",
      ms: "Jual E-Buku, Praset & Sesi 1-on-1 dengan Penghantaran Automatik",
      th: "ขายอีบุ๊ก พรีเซ็ต และคอร์ส 1-on-1 พร้อมระบบส่งไฟล์อัตโนมัติ",
      vi: "Bán E-Book, Preset & Lịch Hẹn 1-1 Với Giao Hàng Tự Động",
    },
    subtitle: {
      id: "Pembeli bayar pakai QRIS atau pesan via WhatsApp—file PDF dengan watermark dinamis dan link download langsung terkirim tanpa perlu Anda kirim manual.",
      en: "Accept instant QRIS checkouts or WhatsApp orders—watermarked PDFs and download links dispatch automatically upon settlement.",
      ms: "Terima bayaran QRIS atau pesanan WhatsApp—pautan muat turun dan tera air PDF dihantar automatik selepas bayaran disahkan.",
      th: "รับชำระผ่าน QRIS หรือแชต WhatsApp พร้อมส่งลิงก์ดาวน์โหลดและลายน้ำ PDF ป้องกันการแชร์ต่ออัตโนมัติ",
      vi: "Nhận thanh toán QR nhanh hoặc đặt qua WhatsApp—link tải file kèm đóng dấu PDF tự động gửi ngay khi hoàn tất.",
    },
    metaTitle: {
      id: "Jual Produk Digital, E-Book & Booking Kelas | etalase.online",
      en: "Sell Digital Products, E-Books & Bookings | etalase.online",
      ms: "Jual Produk Digital, E-Buku & Tempahan Sesi | etalase.online",
      th: "ขายสินค้าดิจิทัล อีบุ๊ก และจองคิว | etalase.online",
      vi: "Bán Sản Phẩm Số, E-Book & Lịch Hẹn | etalase.online",
    },
    metaDescription: {
      id: "Etalase kreator tanpa komisi order chat, QRIS mulai 2%, kirim file otomatis, dan watermark PDF anti-bajak.",
      en: "Creator storefront with 0% chat commission, 2% PRO QRIS fees, auto file dispatch, and dynamic PDF watermarking.",
      ms: "Etalase pencipta tanpa komisen chat, QRIS dari 2%, penghantaran fail automatik dan tera air PDF.",
      th: "หน้าร้านครีเอเตอร์ คอมฯ แชต 0% QRIS เริ่ม 2% ส่งไฟล์อัตโนมัติพร้อมลายน้ำ PDF",
      vi: "Cửa hàng cho creator không phí đơn chat, QR từ 2%, gửi file tự động & đóng dấu PDF.",
    },
    painPoints: {
      id: [
        "Harus kirim link Google Drive manual satu per satu saat pembeli transfer tengah malam",
        "Khawatir e-book PDF disebar ulang gratis di grup Telegram atau media sosial",
        "Komisi platform digital memotong margin tinggi per transaksi",
      ],
      en: [
        "Waking up to manually verify transfers and send Google Drive links",
        "Digital guides being leaked or redistributed without attribution",
        "Steep marketplace percentages cutting deeply into digital product revenue",
      ],
      ms: [
        "Perlu menghantar pautan muat turun secara manual selepas pembeli membayar",
        "Risiko fail e-buku dikongsi semula tanpa kebenaran",
        "Potongan komisen platform digital mengurangkan keuntungan setiap jualan",
      ],
      th: [
        "ต้องคอยเช็กสลิปและส่งลิงก์ดาวน์โหลดทีละคนแม้ในเวลากลางคืน",
        "กังวลว่าไฟล์อีบุ๊กจะถูกส่งต่อฟรีโดยไม่ได้รับอนุญาต",
        "ค่าคอมมิชชันแพลตฟอร์มขายสินค้าดิจิทัลหักเปอร์เซ็นต์สูง",
      ],
      vi: [
        "Phải kiểm tra chuyển khoản và gửi link Google Drive thủ công cho từng khách",
        "Lo ngại tài liệu PDF bị sao chép và phát tán trái phép",
        "Phí nền tảng số cao làm giảm thu nhập thực tế của tác giả",
      ],
    },
    solutions: {
      id: [
        "Verifikasi pembayaran QRIS otomatis via webhook & kirim link akses file 24 jam nonstop",
        "Dynamic PDF Watermarking mencetak identitas pembeli di file PDF yang diunduh",
        "Tarif transparan: Free 4,5% (min. Rp 15.000) atau PRO 2% (min. Rp 25.000) — bisa ditanggung pembeli",
      ],
      en: [
        "Automated QRIS webhook settlement triggering 24/7 digital link delivery",
        "Dynamic PDF watermarking stamping buyer name and phone across document pages",
        "Transparent pricing: Free 4.5% (min Rp 15k) or PRO 2% (min Rp 25k) with Convenience Fee option",
      ],
      ms: [
        "Pengesahan QRIS automatik yang menghantar pautan fail digital 24 jam tanpa henti",
        "Tera air PDF dinamik mencetak maklumat pembeli pada halaman dokumen",
        "Yuran telus: Percuma 4.5% (min Rp 15rb) atau PRO 2% (min Rp 25rb)",
      ],
      th: [
        "ระบบตรวจสอบ QRIS อัตโนมัติพร้อมส่งลิงก์ไฟล์ตลอด 24 ชั่วโมง",
        "Dynamic PDF Watermark พิมพ์ชื่อและเบอร์ผู้ซื้อลงบนไฟล์ PDF อัตโนมัติ",
        "ค่าธรรมเนียมโปร่งใส: ฟรี 4.5% (ขั้นต่ำ Rp 15k) หรือ PRO 2% (ขั้นต่ำ Rp 25k)",
      ],
      vi: [
        "Xác thực thanh toán QR tự động 24/7 và gửi ngay liên kết tải file",
        "Đóng dấu PDF động tự động in thông tin người mua lên từng trang tài liệu",
        "Phí minh bạch: Miễn phí 4.5% hoặc PRO 2% kèm tùy chọn người mua trả phí",
      ],
    },
    highlights: {
      id: ["Auto-Delivery File Digital 24/7", "Watermark PDF Anti-Bajak", "QRIS PRO 2% / Free 4,5%"],
      en: ["24/7 Digital File Delivery", "Dynamic PDF Watermarking", "2% PRO / 4.5% Free QRIS"],
      ms: ["Penghantaran Fail Digital 24/7", "Tera Air PDF Dinamik", "QRIS 2% PRO / 4.5% Free"],
      th: ["ส่งไฟล์ดิจิทัลอัตโนมัติ 24/7", "ลายน้ำ PDF ป้องกันการละเมิด", "QRIS 2% PRO / 4.5% ฟรี"],
      vi: ["Giao File Số Tự Động 24/7", "Đóng Dấu PDF Chống Sao Chép", "QRIS 2% PRO / 4.5% Free"],
    },
    ctaText: {
      id: "Mulai Jual Produk Digital Gratis",
      en: "Start Selling Digital Products",
      ms: "Mula Jual Produk Digital",
      th: "เริ่มขายสินค้าดิจิทัลฟรี",
      vi: "Bán Sản Phẩm Số Miễn Phí",
    },
  },
  {
    slug: "cafe",
    aliases: ["fnb"],
    categoryParam: "CULINARY_CAFE",
    templateId: "visual-menu-grid",
    demoSubdomain: "kopisenja.etalase.online",
    demoLabel: "kopisenja.etalase.online",
    badge: {
      id: "Solusi Cafe, Resto & Kuliner",
      en: "Cafe, Dining & F&B Solution",
      ms: "Penyelesaian Kafe & Perniagaan F&B",
      th: "โซลูชันสำหรับคาเฟ่ ร้านอาหาร และเบเกอรี่",
      vi: "Giải Pháp Cho Quán Cafe & Ẩm Thực",
    },
    title: {
      id: "Menu Digital Visual & Order Meja Langsung ke WhatsApp Kasir",
      en: "Visual QR Table Menu Routing Orders Straight to WhatsApp Cashier",
      ms: "Menu Visual QR Meja dengan Pesanan Terus ke WhatsApp Juruwang",
      th: "เมนูดิจิทัลพร้อมภาพและ QR สั่งออเดอร์ตรงสู่ WhatsApp ร้าน",
      vi: "Thực Đơn Hình Ảnh & QR Đặt Món Trực Tiếp Qua WhatsApp",
    },
    subtitle: {
      id: "Pelanggan cukup scan QR atau buka link bio—lihat foto menu menggugah selera, pilih item favorit, dan kirim pesanan ke kasir tanpa biaya komisi per porsi.",
      en: "Guests scan your counter QR or open your bio link—browse appetizing menu cards and send takeaway or table orders straight to cashier WhatsApp.",
      ms: "Pelanggan imbas QR meja atau pautan bio—lihat foto menu dan hantar pesanan terus ke WhatsApp kaunter tanpa komisen.",
      th: "ลูกค้าสแกน QR หรือคลิกลิงก์เพื่อดูเมนูภาพสวยๆ แล้วส่งออเดอร์เข้า WhatsApp ร้านทันทีโดยไม่มีค่า GP",
      vi: "Khách quét mã QR tại bàn hoặc mở link bio để chọn món theo ảnh và gửi đơn thẳng đến WhatsApp thu ngân.",
    },
    metaTitle: {
      id: "Buku Menu Digital Cafe & Order WhatsApp Gratis | etalase.online",
      en: "Digital Cafe Menu & WhatsApp Ordering | etalase.online",
      ms: "Menu Digital Kafe & Pesanan WhatsApp Percuma | etalase.online",
      th: "เมนูดิจิทัลสำหรับคาเฟ่และสั่งอาหารทาง WhatsApp | etalase.online",
      vi: "Menu Điện Tử Quán Cafe & Đặt Món WhatsApp | etalase.online",
    },
    metaDescription: {
      id: "Buat menu digital cafe gratis tanpa potongan GP per menu. Mendukung QRIS meja & order takeaway WhatsApp.",
      en: "Create a visual cafe & restaurant menu with 0% order commission on WhatsApp and optional QRIS payments.",
      ms: "Bina menu digital kafe dengan 0% komisen pesanan WhatsApp serta pilihan bayaran QRIS.",
      th: "สร้างเมนูดิจิทัลร้านกาแฟและอาหาร ฟรีค่าคอมมิชชันออเดอร์แชต รองรับ QRIS",
      vi: "Tạo menu điện tử cho quán cafe & nhà hàng với 0% hoa hồng đơn WhatsApp.",
    },
    painPoints: {
      id: [
        "Biaya cetak ulang menu fisik mahal tiap ada menu musiman atau perubahan harga bahan",
        "Aplikasi pesan-antar mengambil komisi 20–30% per pesanan takeaway",
        "Pembeli bingung memilih menu karena daftar teks polos di chat tanpa foto",
      ],
      en: [
        "Expensive menu reprints every time seasonal drinks or prices update",
        "Third-party food delivery apps taking 20–30% commissions on direct takeaway orders",
        "Plain text menus lowering average order size compared to visual menu cards",
      ],
      ms: [
        "Kos mencetak semula buku menu mahal setiap kali harga atau menu bermusim bertukar",
        "Aplikasi penghantaran mengenakan komisen 20–30% bagi setiap pesanan",
        "Senarai menu teks biasa kurang menarik minat pembeli menambah pesanan",
      ],
      th: [
        "ต้องเสียค่าพิมพ์เล่มเมนูใหม่ทุกครั้งที่ปรับราคาหรือออกเมนูตามฤดูกาล",
        "แอปเดลิเวอรีหักค่า GP 20–30% แม้ลูกค้ามารับเองที่ร้าน",
        "เมนูแบบข้อความล้วนกระตุ้นยอดขายเพิ่มเติมได้น้อยกว่าเมนูแบบรูปภาพ",
      ],
      vi: [
        "Tốn chi phí in lại thực đơn giấy mỗi khi đổi giá hoặc thêm món mới",
        "Ứng dụng giao đồ ăn thu chiết khấu 20–30% cho cả đơn khách tự đến lấy",
        "Danh sách món chỉ có chữ khiến khách khó chọn và ít gọi thêm món",
      ],
    },
    solutions: {
      id: [
        "Template Visual Menu Grid dengan kartu 2 kolom + foto menu besar & label promo",
        "Update ketersediaan menu habis atau harga baru dalam detik dari HP",
        "Order masuk langsung via WhatsApp kasir (0% komisi) atau bayar QRIS di muka",
      ],
      en: [
        "Visual Menu Grid archetype designed with crisp 2-column food/drink photo cards",
        "Toggle sold-out drinks or seasonal promos live in seconds from any device",
        "Route takeaway & dine-in orders via 0% commission WhatsApp or instant QRIS",
      ],
      ms: [
        "Templat Visual Menu Grid direka dengan kad gambar menu 2 lajur yang menyelerakan",
        "Tukar status stok habis atau promosi harian serta-merta dari telefon",
        "Terima pesanan melalui WhatsApp (0% komisen) atau QRIS automatik",
      ],
      th: [
        "เทมเพลต Visual Menu Grid จัดวางรูปอาหารและเครื่องดื่มแบบ 2 คอลัมน์ชวนสั่ง",
        "อัปเดตเมนูหมดหรือราคาพิเศษได้ทันทีจากมือถือ",
        "รับออเดอร์เข้า WhatsApp แคชเชียร์ (0% คอมฯ) หรือชำระ QRIS อัตโนมัติ",
      ],
      vi: [
        "Mẫu Visual Menu Grid bố cục 2 cột hiển thị ảnh đồ uống, bánh ngọt nổi bật",
        "Cập nhật món hết hàng hoặc giá khuyến mãi chỉ trong vài giây trên điện thoại",
        "Nhận đơn mang đi và tại bàn qua WhatsApp (0% phí) hoặc thanh toán QR nhanh",
      ],
    },
    highlights: {
      id: ["Template Visual Menu Grid", "Standee QR Meja Kasir", "0% Komisi Takeaway WhatsApp"],
      en: ["Visual Menu Grid Archetype", "Print-Ready Counter QR Standee", "0% WhatsApp Order Commission"],
      ms: ["Templat Visual Menu Grid", "Standee QR Meja Kaunter", "0% Komisen Pesanan WhatsApp"],
      th: ["เทมเพลต Visual Menu Grid", "สแตนดี้ QR ตั้งโต๊ะ", "0% คอมฯ ออเดอร์ WhatsApp"],
      vi: ["Mẫu Visual Menu Grid", "Standee QR Đặt Quầy", "0% Hoa Hồng Đặt Món WA"],
    },
    ctaText: {
      id: "Buat Menu Digital Cafe Gratis",
      en: "Create Digital Menu Free",
      ms: "Bina Menu Digital Percuma",
      th: "สร้างเมนูดิจิทัลฟรี",
      vi: "Tạo Menu Điện Tử Miễn Phí",
    },
  },
  {
    slug: "konsultan",
    aliases: ["consultant"],
    categoryParam: "SERVICE_CONSULTANT",
    templateId: "clean-minimal",
    demoSubdomain: "demo.etalase.online",
    demoLabel: "demo.etalase.online",
    badge: {
      id: "Solusi Konsultan, Mentor & Jasa",
      en: "Consultants, Coaches & Booking Services",
      ms: "Perunding, Mentor & Perkhidmatan Tempahan",
      th: "ที่ปรึกษา โค้ช และบริการนัดหมายเวลา",
      vi: "Chuyên Gia Tư Vấn, Huấn Luyện & Dịch Vụ",
    },
    title: {
      id: "Jadwal Booking Konsultasi 1-on-1 & Pembayaran Di Muka Tanpa Ribet",
      en: "1-on-1 Consultation Scheduling & Upfront Booking Payment",
      ms: "Tempahan Sesi Konsultasi 1-on-1 & Bayaran Pendahuluan Mudah",
      th: "ระบบจองตารางปรึกษา 1 ต่อ 1 พร้อมรับชำระล่วงหน้าอัตโนมัติ",
      vi: "Đặt Lịch Tư Vấn 1-kèm-1 & Thanh Toán Trước Nhanh Gọn",
    },
    subtitle: {
      id: "Klien pilih jadwal kosong langsung di halaman etalase, kunci slot dengan pembayaran QRIS di muka atau konfirmasi cepat ke WhatsApp Anda.",
      en: "Clients select available calendar slots on your storefront and lock commitments via upfront QRIS checkout or direct WhatsApp confirmation.",
      ms: "Klien memilih slot masa tersedia di laman etalase dan mengunci tempahan melalui bayaran QRIS atau WhatsApp.",
      th: "ลูกค้าเลือกวันเวลาที่ว่างบนหน้าร้านและชำระค่ามัดจำผ่าน QRIS หรือยืนยันทาง WhatsApp ได้ทันที",
      vi: "Khách chọn khung giờ trống trên trang cá nhân và chốt lịch bằng thanh toán QR hoặc xác nhận nhanh qua WhatsApp.",
    },
    metaTitle: {
      id: "Halaman Booking Konsultasi & Jasa Online | etalase.online",
      en: "Consultation Booking Page & Service Storefront | etalase.online",
      ms: "Halaman Tempahan Konsultasi & Servis | etalase.online",
      th: "หน้าจองเวลาปรึกษาและบริการออนไลน์ | etalase.online",
      vi: "Trang Đặt Lịch Tư Vấn & Dịch Vụ Online | etalase.online",
    },
    metaDescription: {
      id: "Atur jadwal konsultasi 1-on-1, kirim link meeting & notifikasi WhatsApp otomatis dengan pembayaran QRIS atau chat 0% komisi.",
      en: "Manage 1-on-1 coaching slots, meeting links, and automated WhatsApp confirmations from one branded storefront.",
      ms: "Urus slot konsultasi 1-on-1 dan notifikasi WhatsApp automatik dari satu subdomain rasmi.",
      th: "จัดการคิวให้คำปรึกษา 1-on-1 และส่งข้อความยืนยันทาง WhatsApp อัตโนมัติ",
      vi: "Quản lý lịch hẹn tư vấn 1-1 và thông báo WhatsApp tự động từ một trang chuyên nghiệp.",
    },
    painPoints: {
      id: [
        "Chat bolak-balik hanya untuk mencocokkan jam kosong kalender",
        "Klien booking tanpa komitmen pembayaran sehingga sering cancel mendadak",
        "Lupa mengirim invoice resmi atau link Google Meet menjelang sesi",
      ],
      en: [
        "Endless back-and-forth messaging just to align calendar availability",
        "Unpaid bookings causing high no-show and last-minute cancellation rates",
        "Manual tracking of consultation receipts and meeting invitations",
      ],
      ms: [
        "Berbalas mesej berulang kali hanya untuk menyelaraskan masa lapang",
        "Pelanggan membatalkan temu janji saat akhir kerana tiada bayaran pengesahan",
        "Perlu menghantar resit dan pautan mesyuarat secara manual",
      ],
      th: [
        "เสียเวลาแชตถามตอบเพื่อหาช่วงเวลาว่างตรงกันทั้งสองฝ่าย",
        "ลูกค้าจองปากเปล่าแล้วไม่มาตามนัดเพราะไม่ได้วางมัดจำ",
        "ต้องคอยส่งใบเสร็จและลิงก์ประชุมให้ลูกค้าทีละคน",
      ],
      vi: [
        "Mất thời gian nhắn tin qua lại chỉ để chốt khung giờ trống",
        "Khách đặt lịch miệng rồi hủy sát giờ do chưa thanh toán đặt cọc",
        "Phải gửi hóa đơn và link phòng họp thủ công trước mỗi buổi hẹn",
      ],
    },
    solutions: {
      id: [
        "Halaman booking terdedikasi (namakamu.etalase.online/book/sesi) yang ramah mobile",
        "Wajib bayar di muka via QRIS atau konfirmasi terstruktur ke WhatsApp admin",
        "Struk transaksi otomatis tercatat rapi di dashboard Admin Orders",
      ],
      en: [
        "Dedicated mobile booking flow (/book/session) built directly inside your storefront",
        "Require upfront QRIS checkout or structured WhatsApp booking summary",
        "Every booking order logged automatically inside Admin Customer Orders",
      ],
      ms: [
        "Aliran tempahan khusus (/book/session) terbina terus dalam etalase anda",
        "Pilihan bayaran QRIS di muka atau ringkasan tempahan terus ke WhatsApp",
        "Rekod pesanan tersusun automatik dalam papan pemuka pentadbir",
      ],
      th: [
        "หน้าจองคิวเฉพาะ (/book/session) ใช้งานง่ายบนมือถือในหน้าร้านของคุณ",
        "เลือกให้ชำระผ่าน QRIS ล่วงหน้าหรือส่งสรุปเวลานัดเข้า WhatsApp",
        "บันทึกออเดอร์และนัดหมายทั้งหมดอัตโนมัติในหน้า Admin",
      ],
      vi: [
        "Luồng đặt lịch riêng ngay trên storefront, thao tác nhanh trên di động",
        "Yêu cầu thanh toán QR trước hoặc gửi bản tóm tắt lịch hẹn qua WhatsApp",
        "Mọi lịch hẹn được lưu tự động trong trang Quản lý đơn hàng",
      ],
    },
    highlights: {
      id: ["Booking Jadwal Terintegrasi", "Pembayaran Di Muka QRIS", "Struk & Ringkasan WA Otomatis"],
      en: ["Built-in Schedule Booking", "Upfront QRIS Payment Option", "Automated Order Logs"],
      ms: ["Tempahan Jadual Terbina", "Bayaran QRIS di Muka", "Log Pesanan Automatik"],
      th: ["ระบบเลือกเวลาจองในตัว", "รับชำระ QRIS ล่วงหน้า", "บันทึกออเดอร์อัตโนมัติ"],
      vi: ["Đặt Lịch Tích Hợp Sẵn", "Thanh Toán QR Trả Trước", "Lưu Đơn Hàng Tự Động"],
    },
    ctaText: {
      id: "Buat Halaman Booking Gratis",
      en: "Create Booking Page Free",
      ms: "Bina Halaman Tempahan Percuma",
      th: "สร้างหน้าจองคิวฟรี",
      vi: "Tạo Trang Đặt Lịch Miễn Phí",
    },
  },
  {
    slug: "afiliasi",
    aliases: ["affiliate", "rental"],
    categoryParam: "AFFILIATE",
    templateId: "editorial-pastel",
    demoSubdomain: "aisyahlook.etalase.online",
    demoLabel: "aisyahlook.etalase.online",
    badge: {
      id: "Solusi Afiliator TikTok, Shopee & Fashion",
      en: "TikTok, Shopee & Beauty Affiliate Solution",
      ms: "Penyelesaian Afiliasi TikTok, Shopee & Fesyen",
      th: "โซลูชันสำหรับครีเอเตอร์สายรีวิวและแอฟฟิลิเอต",
      vi: "Giải Pháp Cho Affiliate TikTok, Shopee & Làm Đẹp",
    },
    title: {
      id: "Katalog Visual Afiliasi Keranjang Kuning & Shopee yang Menarik Klik",
      en: "Visual Affiliate Storefront for TikTok Shop & Shopee Recommendations",
      ms: "Katalog Visual Afiliasi TikTok Shop & Shopee yang Menarik Klik",
      th: "หน้าร้านรวมลิงก์รีวิวและแอฟฟิลิเอต TikTok & Shopee ที่น่ากดซื้อ",
      vi: "Trang Tổng Hợp Link Affiliate TikTok & Shopee Dạng Lưới Ảnh Đẹp",
    },
    subtitle: {
      id: "Ganti daftar link teks membosankan menjadi katalog foto aesthetic lengkap dengan badge rekomendasi dan tracking klik per item.",
      en: "Turn plain text link lists into aesthetic visual product cards complete with badges and per-product click tracking.",
      ms: "Tukarkan senarai pautan teks biasa kepada kad produk visual estetik lengkap dengan penjejakan klik setiap item.",
      th: "เปลี่ยนหน้ารวมลิงก์ตัวอักษรธรรมดาให้เป็นแคตตาล็อกรูปภาพสวยงาม พร้อมนับยอดคลิกรายสินค้า",
      vi: "Biến danh sách link chữ nhàm chán thành bộ sưu tập sản phẩm thẩm mỹ kèm thống kê lượt nhấp từng món.",
    },
    metaTitle: {
      id: "Bio Link Katalog Afiliasi Shopee & TikTok | Editorial Pastel etalase.online",
      en: "Visual Affiliate Bio Link Storefront | etalase.online",
      ms: "Pautan Bio Katalog Afiliasi Visual | etalase.online",
      th: "ลิงก์ไบโอแคตตาล็อกแอฟฟิลิเอต | etalase.online",
      vi: "Link Bio Cửa Hàng Affiliate Trực Quan | etalase.online",
    },
    metaDescription: {
      id: "Kumpulkan link Shopee, TikTok Keranjang Kuning, Lazada & Tokopedia dalam katalog foto rapi dengan subdomain pribadi + Meta/TikTok Pixel (PRO).",
      en: "Curate Shopee, TikTok Shop, and Lazada recommendations inside an editorial visual storefront with analytics and ad pixels.",
      ms: "Himpunkan syor Shopee, TikTok Shop dan Lazada dalam etalase visual estetik beserta analitik klik.",
      th: "รวบรวมสินค้าแนะนำ Shopee และ TikTok Shop ในหน้าร้านสวยงามพร้อมสถิติคลิกและพิกเซลโฆษณา",
      vi: "Tổng hợp link Shopee, TikTok Shop, Lazada trong giao diện lưới ảnh chuyên nghiệp kèm đo lường.",
    },
    painPoints: {
      id: [
        "Bio media sosial hanya muat 1–2 tautan, sedangkan barang rekomendasi ratusan",
        "Tautan mentah di bio sering tampak mencurigakan dan kurang menarik diklik",
        "Sulit mengukur produk mana yang paling banyak diminati audiens video pendek",
      ],
      en: [
        "Social bios limit links while creators recommend dozens of products weekly",
        "Generic text link trees convert worse than visual product cards",
        "Hard to track which recommended product generates real audience clicks",
      ],
      ms: [
        "Bio media sosial terhad sedangkan produk syor semakin banyak setiap minggu",
        "Senarai pautan teks biasa kurang meyakinkan berbanding paparan gambar produk",
        "Sukar mengenal pasti produk syor yang paling kerap diklik pengikut",
      ],
      th: [
        "ไบโอโซเชียลใส่ได้เพียงไม่กี่ลิงก์ แต่สินค้าแนะนำมีเพิ่มทุกสัปดาห์",
        "หน้ารวมลิงก์แบบตัวหนังสือล้วนไม่ดึงดูดใจเท่าการ์ดรูปสินค้า",
        "วัดผลได้ยากว่าสินค้ารีวิวชิ้นไหนมีคนกดคลิกมากที่สุด",
      ],
      vi: [
        "Tiểu sử mạng xã hội chỉ gắn được ít link trong khi sản phẩm review rất nhiều",
        "Link bio dạng văn bản đơn điệu kém thu hút hơn thẻ ảnh sản phẩm",
        "Khó đo lường sản phẩm review nào được khán giả bấm xem nhiều nhất",
      ],
    },
    solutions: {
      id: [
        "Tampilan Editorial Pastel yang bersih dan serasi untuk konten beauty, fashion, dan lifestyle",
        "Dukung External Link langsung ke Keranjang Kuning TikTok / Shopee / Tokopedia tanpa batasan jumlah produk",
        "Dukungan Meta Pixel, TikTok Pixel & GA4 di paket PRO untuk optimasi iklan konten",
      ],
      en: [
        "Editorial Pastel layout tailored for beauty, fashion, and lifestyle curations",
        "Unlimited external affiliate cards routing cleanly to TikTok Shop, Shopee, or Lazada",
        "Full Meta Pixel, TikTok Pixel & GA4 integration on PRO for ad retargeting",
      ],
      ms: [
        "Susun atur Editorial Pastel yang serasi untuk kandungan kecantikan dan gaya hidup",
        "Kad pautan luar tanpa had ke TikTok Shop, Shopee atau Lazada",
        "Sokongan Meta Pixel, TikTok Pixel & GA4 di pelan PRO untuk penjejakan iklan",
      ],
      th: [
        "เลย์เอาต์ Editorial Pastel สวยหรูเหมาะกับสายบิวตี้ แฟชั่น และไลฟ์สไตล์",
        "เพิ่มการ์ดลิงก์ไป TikTok Shop, Shopee หรือ Lazada ได้ไม่จำกัด",
        "เชื่อมต่อ Meta Pixel, TikTok Pixel และ GA4 ในแพ็กเกจ PRO",
      ],
      vi: [
        "Giao diện Editorial Pastel tinh tế phù hợp ngách làm đẹp, thời trang & đời sống",
        "Gắn thẻ link ngoài không giới hạn tới TikTok Shop, Shopee hoặc Lazada",
        "Hỗ trợ Meta Pixel, TikTok Pixel & GA4 trên gói PRO để tối ưu quảng cáo",
      ],
    },
    highlights: {
      id: ["Template Editorial Pastel", "Klik Statistik Real-Time", "Support Meta/TikTok Pixel & GA4"],
      en: ["Editorial Pastel Layout", "Real-Time Click Analytics", "Meta/TikTok Pixel & GA4 (PRO)"],
      ms: ["Templat Editorial Pastel", "Statistik Klik Masa Nyata", "Sokong Meta/TikTok Pixel & GA4"],
      th: ["เทมเพลต Editorial Pastel", "สถิติคลิกเรียลไทม์", "รองรับ Meta/TikTok Pixel & GA4"],
      vi: ["Giao Diện Editorial Pastel", "Thống Kê Lượt Nhấp", "Hỗ Trợ Meta/TikTok Pixel & GA4"],
    },
    ctaText: {
      id: "Buat Katalog Afiliasi Gratis",
      en: "Create Affiliate Catalog Free",
      ms: "Bina Katalog Afiliasi Percuma",
      th: "สร้างแคตตาล็อกแอฟฟิลิเอตฟรี",
      vi: "Tạo Trang Affiliate Miễn Phí",
    },
  },
];

export function findSegmentBySlug(slug: string): SegmentPageConfig | undefined {
  const clean = slug.toLowerCase().trim();
  return SEGMENT_PAGES.find(
    (item) => item.slug === clean || item.aliases.includes(clean)
  );
}
