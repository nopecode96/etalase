# Master Planning: `etalase.online`

**All-in-One Bio Link, Visual Storefront & Chat-First Commerce Platform (Southeast Asia Ready)**

> **Referensi Utama:** `https://lynk.id` (Full Feature Parity + Peningkatan Ekosistem Lokal & Regional Asia Tenggara)
> **Target Eksekusi:** Vibe Coding bersama Antigravity (`agy`) — *Token-Efficient Modular Architecture*
> **Port Aplikasi:** `PORT=3005` (Menghindari bentrok port 3000/3001/3002 di lokal & VPS)
> **Tech Stack Inti:** Next.js (App Router, TypeScript), Tailwind CSS + Isolated CSS Modules, `next-intl` (i18n SEA), Auth.js / NextAuth (Google OAuth Only), Prisma ORM, PostgreSQL, **n8n (Automation & AI Workflow Microservice)**, **Python 3.12+ (CI/CD, DevOps, UAT & Heavy Data Worker)**, Docker Compose + Nginx Multi-Tenant.

## 1. Visi Produk & Keunggulan Kompetitif (Unfair Advantage)

`etalase.online` adalah platform **Link-in-Bio + Etalase Katalog Online Multi-Tenant** untuk **dua mesin pertumbuhan sekaligus**:

* **Kreator & Affiliator (Mesin Viral):** Jualan produk digital, kelas, event, dan tautan afiliasi marketplace (Keranjang Kuning / Shopee / Lazada) dengan tautan `nama.etalase.online` yang tersebar organik di TikTok, IG, & Threads.
* **Sales & UMKM Bisnis Lokal (Mesin Cashflow):** Sales mobil, agen properti, rental kendaraan, cafe/resto, dan konter fisik yang butuh etalase katalog visual profesional, kartu nama digital, custom domain, & *closing* cepat via chat tanpa potongan komisi.

### Mengapa `etalase.online` Lebih Unggul dari Kompetitor?

1. **1-Click Onboarding via Google Connect Only:**
   Pendaftaran dan login **100% hanya menggunakan Google Connect (Google OAuth)**. Tidak ada form password manual, email langsung terverifikasi Google, dan menekan akun *spam/bot*.
2. **3 Mode Transaksi Fleksibel per Produk (All-in-One):**
   Satu tenant bebas mencampur 3 gaya jualan dalam satu etalase:
   * **Transaksi Langsung (`DIRECT_CHECKOUT`):** Pembayaran otomatis via **Borderpay QRIS** (ID & QRIS Cross-Border ASEAN) atau **PayPal** (Global/SEA) dengan pengiriman produk instan.
   * **Klik Keranjang Kuning / Marketplace Eksternal (`EXTERNAL_LINK`):** Mengarahkan pembeli ke TikTok Shop, Shopee, Lazada, atau Tokopedia (khusus ID) dengan preset ikon & istilah lokal Asia Tenggara plus pelacakan jumlah klik (*click tracker*).
   * **Order by Chat SEA (`CHAT_ORDER`):** Direct ke aplikasi chat favorit tiap negara (**WhatsApp**, **LINE**, **Zalo**, atau **Facebook Messenger**) dengan draf pesan otomatis & **0% potongan komisi**.
3. **WA-First Delivery & Notification (Borderpay + n8n + Fonnte):**
   Begitu pembayaran lunas, **n8n** mengeksekusi **Fonnte** untuk otomatis mengirim struk lunas + link download produk digital / link Zoom / detail pesanan langsung ke **WhatsApp pembeli**, lengkap dengan *cart recovery* terjadwal.
4. **Multi-Template Engine Berkarakter Nyata:**
   Setiap template memiliki struktur layout, tipografi, dan CSS Module terisolasi sendiri (menjamin 100% kontras teks terbaca). Dibatasi secara berjenjang antara paket **Gratis** dan **Pro**.
5. **Siap Ekspansi Asia Tenggara (Multi-Bahasa, Multi-Mata Uang & Istilah Lokal):**
   Mendukung 5 bahasa antarmuka utama SEA (`id`, `en`, `ms`, `th`, `vi`), multi-mata uang per tenant (`IDR`, `MYR`, `SGD`, `THB`, `PHP`, `VND`, `USD`), serta lokalisasi istilah marketplace & aplikasi chat per negara.
6. **Offline-to-Online & Social Kit:**
   Auto-generate **Poster Story 9:16 (IG/WA/TikTok)** dan **Cetak QR Code Standee Meja Kasir** (QR Visit Etalase + QR Google Maps Review).
7. **Bundling Ekosistem `asistencuan.shop`:**
   Integrasi bonus produk/tools dari `asistencuan.shop` untuk pengguna Pro yang diotomasi langsung oleh n8n.
8. **Freemium Royal & Tanpa Jargon Teknis:**
   Menghilangkan batasan teknis yang tidak dipedulikan pengguna (seperti kapasitas penyimpanan kuesioner/form atau batas bandwidth).
9. **Hybrid Automation Engine (`.agents/skills/` + n8n + Python CI/CD):**
   Menggabungkan direktori internal `.agents/skills/` berbasis Markdown, **n8n** sebagai orkestrator workflow & AI Agent, serta **Python** untuk CI/CD deployment, UAT otomatis, backup DB, dan *heavy data/scraping worker*.

## 2. Arsitektur 4 Pilar Platform & Multi-Tenant Routing (`PORT=3005`)

Seluruh ekosistem aplikasi web berjalan pada **`PORT=3005`** dengan isolasi *middleware* berbasis *hostname* (`src/middleware.ts`), didampingi microservice **n8n**, **Python Automation**, **PostgreSQL**, dan **Nginx** via Docker Compose:

| No | Pilar Platform | URL Produksi | URL Lokal (Dev) | Fungsi Utama |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Portal SaaS Utama** | `etalase.online` | `localhost:3005` | Landing page multi-bahasa, halaman *use-case* (`/creator`, `/sales`, `/umkm`), Showcase Carousel Template interaktif, tabel harga, login Google, & `/onboarding`. |
| **2** | **Storefront Publik Tenant** | `[slug].etalase.online` atau `customdomain.com` | `[slug].localhost:3005` | Halaman publik Bio Link & Etalase Katalog, checkout QRIS/PayPal, Keranjang Kuning/Marketplace, Order Chat, & Blog SEO. |
| **3** | **Tenant Admin & Login** | `[slug].etalase.online/admin` & `/login` | `[slug].localhost:3005/admin` & `/login` | Panel kelola tenant (produk, blok bio, template, order, wallet, analytics, pixel, QR kit) & halaman login Google kontekstual. |
| **4** | **Mabes (Super Admin)** | `mabes.etalase.online` | `mabes.localhost:3005` | Pusat kendali owner platform: pantau pendaftaran tenant, aktivitas global, MRR/transaksi (filter `isDemo: false`), payout wallet, custom domain, & setting global. |
| **5** | **n8n + Python Automation** | `flow.etalase.online` (Private) | `localhost:5678` | Microservice orkestrasi webhook (Fonnte WA, onboarding drip, cart recovery, AI Growth) + **Python CI/CD, UAT runner, DB backup & heavy worker**. |

### Aturan Teknis Routing & Autentikasi (WAJIB untuk `agy`)

1. **Reserved Subdomains (`RESERVED_SLUGS`):**
   Kunci slug sistem agar tidak bisa diklaim tenant saat onboarding:
   `["mabes", "flow", "n8n", "admin", "app", "api", "www", "auth", "login", "onboarding", "billing", "cdn", "static", "assets", "help", "support", "blog", "demo", "creator", "sales", "umkm", "tools"]`.
2. **Centralized Google OAuth Callback + Cross-Subdomain Cookie:**
   * Seluruh tombol "Masuk dengan Google" (dari `etalase.online`, `[slug].etalase.online/login`, maupun `mabes.etalase.online`) mengarahkan callback ke **1 titik pusat**: `https://etalase.online/api/auth/callback/google` (lokal: `http://localhost:3005/api/auth/callback/google`).
   * Cookie sesi Auth.js dikonfigurasi dengan `domain: ".etalase.online"` (di produksi) agar login sekali otomatis aktif di seluruh subdomain tenant dan `mabes`.
3. **Akses Super Admin (`mabes.etalase.online`):**
   * Tanpa password manual. Validasi membaca `env.SUPER_ADMIN_EMAILS` (dipisahkan koma) terhadap email Google yang sedang login + role `SUPER_ADMIN` di database.
4. **Konfigurasi Port Konsisten (`PORT=3005`):**
   * `package.json`: `"dev": "next dev -p 3005"`, `"start": "next start -p 3005"`.
   * `docker-compose.yml`: Port mapping fleksibel via `${HOST_PORT:-3005}:3005` (atau via Nginx reverse proxy) agar 1 codebase bisa langsung jalan di lokal maupun VPS tanpa konflik port.

## 3. Arsitektur Microservices, Global Functions & Token-Efficient Development (WAJIB untuk `agy`)

Untuk **menghemat token AI secara drastis saat *vibe coding***, mempermudah *debugging*, dan menjaga agar tidak ada kode yang berulang (*DRY*), codebase dibangun menggunakan pola **Modular Microservices + Global Core Utilities**.

### A. Pemisahan Container Microservices (`docker-compose.yml`)

Setiap tanggung jawab infrastruktur dipisah sebagai service independen di satu Docker network (`etalase_net`):

1. **`web` (`PORT=3005`):** Next.js App Router (UI, Storefront, Admin, API Gateway).
2. **`postgres` (`5432`):** PostgreSQL dengan *persistent volume* (terisolasi agar rebuild `web` super cepat).
3. **`n8n` (`5678`):** Microservice orkestrasi otomasi (Fonnte WA, *cron*, *cart recovery*, AI Growth Agent).
4. **`nginx` (`80/443`):** Reverse proxy multi-tenant yang meneruskan trafik ke `web:3005` dan aset statis `/uploads/`.
5. **`py-worker` (Opsional / On-Demand Profile):** Container ringan `python:3.12-slim` untuk menjalankan tugas berat (scraping kompetitor, enrichment SEO, batch backup) yang dipanggil oleh n8n atau CI/CD tanpa membebani RAM container Next.js.

### B. Modular Domain Microservices & Automation Scripts

Setiap fitur bisnis dipecah menjadi modul service kecil yang **berdiri sendiri (maksimal ~150–200 baris per file)** dengan kontrak input/output yang jelas. Saat meminta `agy` mengubah fitur tertentu, agent **hanya perlu membaca 1 folder service terkait** tanpa memindai seluruh proyek:

```text
├── .github/workflows/
│   └── ci-cd.yml                  # Pipeline GitHub Actions pemanggil Python CI/CD + notif n8n
├── automation/
│   ├── n8n/workflows/             # Export JSON workflow n8n (ops-01..06 & ai-01..05)
│   └── python/                    # Python CI/CD, DevOps, UAT & Heavy Workers
│       ├── requirements.txt       # Minimal dependencies (requests, paramiko, pytest, pydantic)
│       ├── ci_check.py            # Pre-push & CI validator (lint, typecheck, prisma, build)
│       ├── deploy_vps.py          # Zero-downtime VPS deploy + DB backup + healthcheck + auto-rollback
│       ├── db_backup.py           # Backup PostgreSQL gzip + retensi 7 hari + cloud upload opsional
│       ├── uat_runner.py          # Automated E2E & Multi-Tenant Smoke Test (PORT=3005)
│       └── growth_worker.py       # Heavy Python worker dipanggil n8n (scraping kompetitor & SEO data)
├── src/
│   ├── lib/
│   │   ├── config/
│   │   │   ├── env.ts             # Single Source of Truth ENV (tervalidasi Zod, NO scattered process.env)
│   │   │   └── constants.ts       # RESERVED_SLUGS, TIER_RULES, MARKETPLACE_PRESETS, CHAT_CHANNELS
│   │   ├── core/
│   │   │   ├── messages.ts        # Global Message Dictionary (Error/Success/Validation multi-bahasa)
│   │   │   ├── response.ts        # Global ServiceResult<T> (ok(), fail(), withErrorHandler())
│   │   │   ├── formatters.ts      # Global formatCurrency(), formatDate(), buildChatUrl(), slugify()
│   │   │   └── logger.ts          # Global structured logger (terintegrasi dev & prod)
│   │   ├── auth/
│   │   │   └── session.ts         # Global guards: getCurrentUser(), requireStoreOwner(), requireSuperAdmin()
│   │   ├── db/
│   │   │   └── prisma.ts          # Singleton Prisma Client + serializePlain() (anti Decimal/Date error)
│   │   └── n8n/
│   │       └── dispatcher.ts      # Global emitN8nEvent(event, payload) (fire-and-forget + secret header)
│   └── services/                  # Modular Domain Microservices (Isolated Business Logic)
│       ├── auth-onboarding/       # Klaim slug, buat store awal, trigger n8n ops-01
│       ├── store-profile/         # CRUD profil toko, custom domain, DNS check, theme config
│       ├── bio-blocks/            # CRUD & sorting BioBlock
│       ├── product-catalog/       # CRUD produk (3 mode transaksi), click/view tracker
│       ├── checkout-order/        # Kalkulasi harga, voucher, buat order, update status
│       ├── payment-borderpay/     # Adapter terisolasi Borderpay QRIS (create invoice + verify webhook)
│       ├── payment-paypal/        # Adapter terisolasi PayPal Checkout (create + capture order)
│       ├── blog-seo/              # CRUD artikel blog & generator JSON-LD
│       ├── wallet-payout/         # Saldo tenant & pengajuan pencairan
│       ├── mabes-admin/           # Metrik global (exclude isDemo), approval payout, manajemen tenant
│       └── marketing-kit/         # Generator Story 9:16 & Standee QR Code
```

### C. Spesifikasi Global Functions & ENV (Wajib Dibuat Pertama di Phase 1)

1. **Centralized ENV (`src/lib/config/env.ts`):**
   * Semua akses variabel lingkungan **WAJIB** lewat `import { env } from "@/lib/config/env"`.
   * Dilarang memanggil `process.env.XXX` langsung di dalam komponen atau service.
   * Menyediakan default aman untuk development (`PORT: 3005`, `NEXT_PUBLIC_ROOT_DOMAIN: "localhost:3005"`).
2. **Global Messages (`src/lib/core/messages.ts`):**
   * Standarisasi seluruh pesan respon sistem dalam satu objek terpusat (mendukung i18n key), contoh:
     * `MSG.SUCCESS`: `CREATED`, `UPDATED`, `DELETED`, `SAVED`, `ORDER_PAID`, `PAYOUT_REQUESTED`.
     * `MSG.ERROR`: `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `SLUG_RESERVED`, `SLUG_TAKEN`, `TIER_LOCKED`, `INVALID_INPUT`, `PAYMENT_FAILED`, `INTERNAL_ERROR`.
3. **Global Response & Error Handler (`src/lib/core/response.ts`):**
   * Semua Server Action dan API Route **WAJIB** mengembalikan tipe seragam:
     ```ts
     export type ServiceResult<T = null> =
       | { success: true; data: T; message: string; code?: string }
       | { success: false; error: string; code: string; details?: unknown };
     ```
   * Menyediakan helper `ok(data, msgCode)`, `fail(msgCode, details?)`, dan `withErrorHandler(fn)` agar tidak perlu menulis blok `try/catch` panjang berulang-ulang di setiap file.
4. **Global UI Feedback (`src/components/ui/GlobalToast.tsx`):**
   * 1 komponen toast global (misal `sonner`) yang otomatis membaca `result.success` dan menampilkan `result.message` atau `result.error` secara konsisten di seluruh dashboard.
5. **Aturan Anti-Error Next.js (`"use server"` & Prisma):**
   * **Dilarang re-export** di dalam file `"use server"`. Logika bisnis ditaruh di `src/services/*` (pure TypeScript), sedangkan `src/app/.../actions.ts` hanya berisi *thin async wrapper* 3–5 baris.
   * Gunakan helper global `serializePlain(data)` untuk mengonversi `Decimal` dan `Date` Prisma sebelum dikirim ke Client Component.

### D. Aturan Hemat Token untuk `agy`

* **1 Prompt = 1 Microservice / 1 Modul:** Jangan meminta edit lintas 10 file sekaligus jika bisa diselesaikan di 1 domain service.
* **Selalu import dari `@/lib/core/*` dan `@/lib/config/env`:** Jangan pernah menulis ulang fungsi formatter mata uang, validasi error, atau toast handler di dalam komponen.

## 4. Arsitektur Multi-Template & Tier Gating

1. **Isolasi Folder & CSS Module per Template:**
   Setiap template berada di folder mandiri (`src/components/templates/[template-id]/`) dengan file `[template-id].module.css` dan komponen layout sendiri agar kontras teks dijamin 100% tajam (*Zero Contrast Bug*).
2. **Single Source of Truth (Live Storefront = Landing Page Showcase):**
   *Carousel* pratinjau smartphone di Landing Page (`etalase.online`) **WAJIB merender komponen template asli** dengan mode `isPreview={true}` dan data *mock*.
3. **Flag `isDemo: true` untuk Akun Showcase:**
   Akun demo resmi per template wajib memiliki `isDemo: true` di database agar tidak mengacaukan perhitungan MRR dan statistik keuangan di `mabes.etalase.online`.

### Koleksi 8 Arketipe Template & Pembagian Paket

| Paket | Template ID | Nama Template | Karakter Visual & Target Pengguna |
| :--- | :--- | :--- | :--- |
| **FREE** | `clean-minimal` | **Clean Minimal** | Latar putih bersih, kartu modern rounded, tipografi kontras tinggi (cocok untuk semua kreator & UMKM). |
| **FREE** | `classic-dark` | **Classic Dark** | Latar obsidian gelap elegan dengan aksen tegas (cocok untuk tech, gadget, & personal brand). |
| **FREE** | `catalog-grid` | **Basic Catalog Grid** | Fokus grid katalog produk 2 kolom rapi dengan pencarian cepat (cocok untuk online shop & affiliator). |
| **PRO** | `sage-creator` | **Sage Creator Studio** | Nuansa sage/olive lembut dengan profil header besar, statistik medsos, & kartu produk vertikal (ala kreator/coach). |
| **PRO** | `editorial-paper` | **Warm Editorial Paper** | Tekstur kertas krem hangat, tipografi serif/editorial elegan (cocok untuk penulis, edukator, & blog SEO). |
| **PRO** | `boutique-visual` | **Visual Boutique Pro** | Mode etalase full-featured dengan slider banner promo, filter kategori horizontal, & floating dock mobile. |
| **PRO** | `sales-showcase` | **Sales & Showroom Pro** | Khusus sales mobil, properti, & rental: tabel spesifikasi, galeri bukti serah terima (*delivery proof*), & tombol chat menonjol. |
| **PRO** | `cafe-menu` | **Aesthetic Menu Card** | Buku menu visual F&B/Cafe dengan kategori makanan/minuman, jam buka, & tombol arah Google Maps. |

*Catatan:* Di paket **PRO**, tenant juga mendapatkan fitur **Custom Theme Styling** (bebas ganti warna aksen, jenis font, dan gambar *background* sendiri).

## 5. Strategi Regional Asia Tenggara (i18n, Currency, Payment & Marketplace Presets)

### A. Multi-Bahasa Antarmuka (`next-intl`)

* **Bahasa Sistem:** `id` (Indonesia - Default), `en` (English - SG/PH/Global), `ms` (Bahasa Melayu - MY/BN), `th` (ไทย - Thailand), `vi` (Tiếng Việt - Vietnam).
* **Cakupan Terjemahan:** Landing page, dashboard admin, label checkout, tombol aksi, dan `src/lib/core/messages.ts`. Konten produk/bio tetap mengikuti bahasa yang diketik masing-masing tenant.

### B. Multi-Mata Uang (Per Tenant)

* Tenant memilih mata uang utama saat onboarding atau di pengaturan: `IDR`, `MYR`, `SGD`, `THB`, `PHP`, `VND`, `USD`.
* Seluruh pemformatan harga memanggil helper global `formatCurrency(amount, currency, locale)`.

### C. Preset Marketplace & Lokalisasi Istilah Affiliate (ATURAN KRITIS SEA)

Saat tenant memilih `checkoutMode = EXTERNAL_LINK`, dashboard menyediakan pilihan preset platform (`externalPlatform`) agar tombol CTA langsung menampilkan warna, ikon, dan istilah yang akrab di masing-masing negara:

| Preset Enum | Platform | Badge / Warna | Label Lokal per Bahasa (`id` / `ms` / `en` / `th` / `vi`) | Visibilitas Regional |
| :--- | :--- | :--- | :--- | :--- |
| `TIKTOK_SHOP` | **TikTok Shop** | 🟡 Kuning | `Keranjang Kuning` / `Beg Kuning` / `Yellow Basket` / `ตะกร้าเหลือง` / `Giỏ hàng vàng` | **Semua Negara SEA** |
| `SHOPEE` | **Shopee** | 🟠 Oranye | `Shopee (Toko Orange)` / `Shopee (App Oren)` / `Shopee (Orange App)` / `Shopee (แอปส้ม)` / `Shopee (Sàn Cam)` | **Semua Negara SEA** |
| `LAZADA` | **Lazada** | 🔵 Biru | `Lazada` / `Lazada (App Biru)` / `Lazada (Blue App)` / `Lazada (แอปน้ำเงิน)` / `Lazada (Sàn Xanh)` | **Semua Negara SEA** |
| `TOKOPEDIA` | **Tokopedia** | 🟢 Hijau | `Tokopedia (Toko Hijau)` | **KHUSUS `locale === "id"`** *(JANGAN tampilkan istilah "Toko Hijau" untuk negara SEA lain karena di luar ID "app hijau" merujuk ke Grab/WhatsApp)* |
| `CUSTOM` | **Link Bebas** | 🔗 Netral | Label tombol diketik bebas oleh tenant (default: `Beli Sekarang` / `Buy Now`) | **Semua Negara SEA** |

### D. Dual Payment Gateway & Multi-Channel Chat

* **Borderpay QRIS:** Jalur utama untuk transaksi Rupiah (`IDR`) dan mendukung **QRIS Cross-Border**.
* **PayPal Checkout:** Jalur pembayaran internasional (`USD`, `SGD`, `MYR`, `THB`, `PHP`).
* **Order by Chat Multi-Channel:** Dikelola oleh helper global `buildChatUrl(channel, handle, message)`:
  * `WHATSAPP` (`wa.me/...`) — Indonesia, Malaysia, Singapura
  * `LINE` (`line.me/ti/p/...`) — Thailand
  * `ZALO` (`zalo.me/...`) — Vietnam
  * `MESSENGER` (`m.me/...`) — Filipina

## 6. Struktur Paket Harga (Freemium Royal vs Pro vs Terima Beres)

| Fitur / Keunggulan | **FREE** (Gratis Selamanya) | **PRO** (Rp 79rb/bln atau $6/bln) | **TERIMA BERES / DFY** (Rp 750rb – 1,5jt/thn) |
| :--- | :--- | :--- | :--- |
| **Alamat Website** | `[slug].etalase.online` | **Custom Domain** (`namabrand.com`) | Custom Domain / Subdomain (Disetupkan Tim) |
| **Pilihan Template** | **3 Template Dasar** | **Semua 8+ Template Premium + Kustom Warna/Font** | Semua Template + Desain Banner Khusus |
| **Branding Platform** | Footer kecil `etalase.online` | **Hapus Watermark / White-label** | **Hapus Watermark / White-label** |
| **Mode Transaksi** | QRIS, PayPal, Keranjang Kuning/Marketplace, Order Chat | QRIS, PayPal, Keranjang Kuning/Marketplace, Order Chat | Semua Mode (Fokus Order Chat & Katalog) |
| **Biaya Layanan Transaksi** | Fee platform standar (dibebankan ke pembeli) | **Fee Platform Lebih Rendah / 0%** | **0% Komisi Order Chat** |
| **Otomasi WA (n8n + Fonnte)** | Struk lunas transaksi QRIS dasar | **Full Auto-Delivery Produk Digital & Cart Recovery WA** | Notifikasi Leads & Setup Lengkap |
| **Marketing & Tracking** | Statistik klik dasar | **Meta Pixel, TikTok Pixel, GA4, Voucher, Order Bump** | Setup SEO Lokal + Google Business Profile |
| **Offline & Social Kit** | QR Visit Etalase | **QR Visit + QR Google Review + Story Poster 9:16** | Semua Kit Siap Cetak |
| **Ekosistem `asistencuan.shop`** | — | **Termasuk Akses Bundling (Auto-Sync n8n)** | Termasuk Akses Bundling |
| **Batasan Kuesioner / Form** | **Tanpa Batas (Dihapus)** | **Tanpa Batas** | **Tanpa Batas** |

## 7. Feature Parity Matrix (Lynk.id + Upgrade `etalase.online`)

1. **Bio Link & Block Builder:** Profil, avatar, link medsos, tombol link, teks/heading, gambar/carousel, embed YouTube/TikTok/Spotify, & divider.
2. **Digital Products:** Upload file / link akses aman, *instant delivery* via WhatsApp (n8n + Fonnte) & email setelah lunas.
3. **Physical Products & Visual Catalog:** Multi-foto, varian, stok, kategori, filter pencarian, form alamat pembeli, & opsi checkout langsung atau Order Chat.
4. **Affiliate / Keranjang Kuning & Marketplace SEA:** Produk bertipe `EXTERNAL_LINK` dengan preset `TIKTOK_SHOP`, `SHOPEE`, `LAZADA`, `TOKOPEDIA` (khusus ID), & `CUSTOM` + pelacakan klik per item.
5. **Course / E-Learning:** Modul video terproteksi (hanya bisa diakses pembeli yang sudah lunas).
6. **Event, Webinar & Appointment:** Tiket event (auto-kirim link Zoom/GMeet via WA) & booking jadwal konsultasi 1-on-1.
7. **Blog / Artikel SEO:** Editor artikel bawaan di `[slug].etalase.online/blog/[post-slug]` dengan tombol sisip produk (*soft-selling*).
8. **Support / Tip / Donasi:** Tombol traktir/dukungan dengan nominal preset atau bebas.
9. **Affiliate Internal:** Kreator bisa mengaktifkan komisi afiliasi untuk produknya sendiri.
10. **Marketing & Conversion Tools:** Meta Pixel, TikTok Pixel, Google Analytics, kode voucher/kupon, *Order Bump/Upsell* di checkout, & Lead Magnet.
11. **Wallet & Payout:** Pencatatan saldo bersih transaksi QRIS/PayPal & pengajuan pencairan (*withdrawal*) yang disetujui dari `mabes.etalase.online`.

## 8. Internal AI Growth & Marketing Skills (`.agents/skills/`)

Sistem **AI Agent Skills** internal berbentuk file Markdown modular di dalam repositori (`.agents/skills/`). Skill **`product-marketing.md`** adalah fondasi utama (**Single Source of Truth**) yang **WAJIB dibaca terlebih dahulu** oleh seluruh skill lain sebelum mengeksekusi tugas pemasaran, copywriting, SEO, atau CRO.

```text
                       ┌──────────────────────────────────────┐
                       │           product-marketing          │
                       │  (read by all other skills first)    │
                       └──────────────────┬───────────────────┘
                                          │
     ┌──────────────┬───────────┬─────────┴─┬─────────────┬─────────────┬─────────────┐
     ▼              ▼           ▼           ▼             ▼             ▼             ▼
┌──────────┐  ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
│  SEO &   │  │   CRO    │ │ Content  │ │  Paid &   │ │ Growth &  │ │  Sales &  │ │ Strategy  │
│ Content  │  │          │ │  & Copy  │ │Measurement│ │ Retention │ │    GTM    │ │           │
├──────────┤  ├──────────┤ ├──────────┤ ├───────────┤ ├───────────┤ ├───────────┤ ├───────────┤
│seo-audit │  │cro       │ │copywrite │ │ads        │ │referrals  │ │revops     │ │mktg-ideas │
│ai-seo    │  │signup    │ │copy-edit │ │ad-creative│ │free-tools │ │sales-enbl │ │mktg-psych │
│site-arch │  │onboarding│ │cold-email│ │ab-testing │ │churn-prev │ │launch     │ │cust-rsrch │
│programm  │  │popups    │ │emails    │ │analytics  │ │community  │ │pricing    │ │reverse-   │
│schema    │  │paywalls  │ │social    │ │           │ │lead-magnt │ │competitors│ │ eng-mktg  │
│content   │  │          │ │video     │ │           │ │co-mktg    │ │comp-prof  │ │           │
│aso       │  │          │ │image     │ │           │ │           │ │directory  │ │           │
│link-build│  │          │ │sms/wa    │ │           │ │           │ │prospecting│ │           │
└──────────┘  └──────────┘ └──────────┘ └───────────┘ └───────────┘ └───────────┘ └───────────┘
```

### Pemetaan Direktori `.agents/skills/`

1. **Fondasi Utama:** `.agents/skills/product-marketing.md`
2. **SEO & Content (`.agents/skills/seo/`):** `seo-audit.md`, `ai-seo.md`, `site-arch.md`, `programmatic-seo.md`, `schema.md`, `content.md`, `aso.md`, `link-build.md`.
3. **CRO (`.agents/skills/cro/`):** `cro.md`, `signup.md`, `onboarding.md`, `popups.md`, `paywalls.md`.
4. **Content & Copy (`.agents/skills/content-copy/`):** `copywriting.md`, `copy-edit.md`, `cold-email.md`, `emails.md`, `social.md`, `video.md`, `image.md`, `sms-whatsapp.md`.
5. **Paid & Measurement (`.agents/skills/paid/`):** `ads.md`, `ad-creative.md`, `ab-testing.md`, `analytics.md`.
6. **Growth & Retention (`.agents/skills/growth/`):** `referrals.md`, `free-tools.md`, `churn-prevent.md`, `community.md`, `lead-magnet.md`, `co-mktg.md`.
7. **Sales & GTM (`.agents/skills/sales-gtm/`):** `revops.md`, `sales-enable.md`, `launch.md`, `pricing.md`, `competitors.md`, `comp-profile.md`, `directory.md`, `prospecting.md`.
8. **Strategy (`.agents/skills/strategy/`):** `mktg-ideas.md`, `mktg-psych.md`, `customer-research.md`, `reverse-eng-mktg.md`.

## 9. Arsitektur Otomasi Hybrid: n8n + Python (CI/CD, Platform Ops & AI Growth)

Pembagian tanggung jawab dibuat tegas agar masing-masing bekerja di kekuatan terbaiknya:
* **n8n (`automation/n8n/workflows/*.json`):** Menangani **orkestrasi visual, webhook real-time, timer/delay, Fonnte WA, integrasi SaaS pihak ketiga, dan orkestrasi AI Agent**.
* **Python (`automation/python/*.py`):** Menangani **CI/CD pipeline, deployment VPS aman + auto-rollback, automated UAT/smoke testing, backup PostgreSQL, serta *heavy data/scraping worker*** yang dipanggil oleh GitHub Actions atau n8n.

### A. Platform Operational Flows (n8n)

| Workflow ID | Trigger | Alur Otomasi di n8n | Tujuan Bisnis |
| :--- | :--- | :--- | :--- |
| **`ops-01-onboarding`** | Webhook `tenant.created` | Kirim ucapan selamat datang via **Fonnte WA** → `Wait 24 Jam` → Cek API Next.js apakah produk masih `0` → Jika kosong, kirim bantuan 1-klik setup produk pertama. | Meningkatkan aktivasi pendaftar baru (*Onboarding CRO*). |
| **`ops-02-order-delivery`** | Webhook `order.paid` (Borderpay / PayPal) | Validasi payload → Format pesan sesuai `locale` pembeli → Kirim struk lunas + link produk digital / Zoom via **Fonnte WA** → Update `waDeliveredAt` ke Next.js → Notif saldo masuk ke WA penjual. | Pengalaman **WA-First Delivery** yang cepat, bebas nyangkut spam email. |
| **`ops-03-cart-recovery`** | Webhook `order.created` (khusus tier **PRO**) | `Wait 30 Menit` → Cek status order ke Next.js API → Jika masih `PENDING`, kirim **1x pesan pengingat halus** via Fonnte WA berisi link QRIS/PayPal. | Menyelamatkan 15–25% transaksi yang batal bayar. |
| **`ops-04-asistencuan-sync`** | Webhook `tier.upgraded` (`PRO` / `DFY`) | Panggil API/Webhook **`asistencuan.shop`** untuk membuka akses/voucher bundling + kirim detail akses bonus ke WA tenant via Fonnte. | Otomasi bundling tanpa kerja manual admin. |
| **`ops-05-mabes-alerts`** | Webhook `withdrawal.requested` & Cron Harian 21:00 WIB | Kirim alert instan ke WA/Telegram Owner saat ada *payout* wallet / verifikasi domain + **Ringkasan Harian Mabes** (pendaftar baru, GMV, MRR riil non-demo). | Monitoring bisnis real-time langsung dari HP Owner. |
| **`ops-06-cicd-notify`** | Webhook `cicd.deploy_status` (dari Python `deploy_vps.py`) | Terima status deploy (`SUCCESS` / `ROLLBACK` / `FAILED`), commit hash, durasi build, & hasil UAT → Kirim laporan ringkas ke WA/Telegram Owner via Fonnte. | Visibilitas penuh setiap kali ada rilis kode baru ke VPS. |

### B. Internal AI Growth & Marketing Flows (n8n AI Agent + Python Worker + `.agents/skills/`)

| Workflow ID | Skill yang Dibaca | Jadwal / Trigger | Output Otomatis (n8n + Python) |
| :--- | :--- | :--- | :--- |
| **`ai-01-social-factory`** | `product-marketing.md` + `content-copy/social.md` + `video.md` | Cron Mingguan | 7 ide konten & skrip video pendek (TikTok/Reels/Threads) dalam bahasa ID, EN, & MS → simpan ke Sheets/Notion. |
| **`ai-02-programmatic-seo`** | `product-marketing.md` + `seo/programmatic-seo.md` + `schema.md` | Trigger / Cron Mingguan | Python `growth_worker.py` kumpulkan data kata kunci lokal SEA → n8n AI generate draf artikel & halaman SEO → push *draft* ke API internal Next.js. |
| **`ai-03-competitor-radar`** | `product-marketing.md` + `sales-gtm/competitors.md` | Cron Mingguan | Python `growth_worker.py` pantau perubahan halaman harga/fitur kompetitor (Lynk.id, Mayar, Linktree) → n8n AI rangkum rekomendasi → kirim ke Owner. |
| **`ai-04-dfy-prospecting`** | `product-marketing.md` + `sales-gtm/prospecting.md` + `sms-whatsapp.md` | Trigger Input Lead | AI susun pesan perkenalan personal + link demo template `sales-showcase` / `cafe-menu` siap kirim. |
| **`ai-05-churn-prevention`** | `product-marketing.md` + `growth/churn-prevent.md` | Cron Harian | Deteksi tenant Pro H-3 habis masa aktif / tidak aktif 14 hari → AI susun pesan personal → kirim via Fonnte WA. |

### C. Python CI/CD & DevOps Automation Pipeline (`automation/python/`)

Alur rilis otomatis dari push GitHub sampai live di VPS:

```text
git push main
   │
   ▼
[GitHub Actions: .github/workflows/ci-cd.yml]
   ├── 1. python automation/python/ci_check.py   (Prisma validate, Lint, Typecheck, Next build)
   ├── 2. python automation/python/deploy_vps.py (SSH VPS -> db_backup.py -> git pull -> prisma db push -> docker compose up --build)
   ├── 3. python automation/python/uat_runner.py (Hit /api/health, cek 4 pilar routing, reserved slugs, multi-tenant)
   │        └── Jika GAGAL -> Auto-Rollback ke commit sebelumnya!
   └── 4. POST Webhook ke n8n (`ops-06-cicd-notify`) -> Notifikasi WA/Telegram ke Owner
```

Daftar skrip Python inti:
1. **`ci_check.py`:** Menjalankan validasi kualitas lokal maupun di GitHub Actions (`npx prisma validate`, `npm run lint`, `tsc --noEmit`, `npm run build`) dengan log berwarna yang ringkas dan hemat token saat dibaca `agy`.
2. **`deploy_vps.py`:** Orkestrator deploy ke VPS via SSH (`paramiko` / `subprocess`): otomatis memanggil `db_backup.py` sebelum migrasi, menjalankan `git pull`, `docker compose up -d --build`, memverifikasi `GET /api/health` (port 3005), melakukan **auto-rollback** jika container gagal sehat, lalu menembak webhook ke n8n (`ops-06-cicd-notify`).
3. **`db_backup.py`:** Menjalankan `pg_dump` terkompresi `.sql.gz`, menerapkan rotasi retensi 7 hari otomatis, serta opsi upload cadangan terenkripsi ke Cloudflare R2 / S3 / Google Drive.
4. **`uat_runner.py`:** Menjalankan *smoke test* & *end-to-end check* otomatis (`pytest` / `requests`) terhadap `PORT=3005`: memastikan `/api/health` 200 OK, halaman 4 pilar aktif, `RESERVED_SLUGS` terlindungi, dan isolasi tenant tidak bocor.
5. **`growth_worker.py`:** Worker Python modular yang dipanggil oleh n8n via HTTP/CLI untuk tugas pemrosesan data berat (ekstraksi halaman kompetitor, *keyword clustering* SEO SEA, dan validasi link mati).

## 10. Rancangan Skema Database Inti (`prisma/schema.prisma`)

```prisma
enum UserRole {
  USER
  SUPER_ADMIN
}

enum PlanTier {
  FREE
  PRO
  DFY_BUSINESS
}

enum CheckoutMode {
  DIRECT_CHECKOUT  // Bayar otomatis via Borderpay QRIS / PayPal
  EXTERNAL_LINK    // Klik Keranjang Kuning / Shopee / Lazada / Tokopedia / Custom
  CHAT_ORDER       // Direct Chat (WhatsApp, LINE, Zalo, Messenger)
}

enum ExternalPlatform {
  TIKTOK_SHOP      // Keranjang Kuning / Beg Kuning / Yellow Basket (All SEA)
  SHOPEE           // Orange App / Toko Orange (All SEA)
  LAZADA           // Blue App (All SEA)
  TOKOPEDIA        // Toko Hijau (Indonesia Only - locale === "id")
  CUSTOM           // Link Eksternal Bebas
}

enum ChatChannel {
  WHATSAPP
  LINE
  ZALO
  MESSENGER
}

enum ProductType {
  DIGITAL
  PHYSICAL
  COURSE
  EVENT_WEBINAR
  APPOINTMENT
  SUPPORT_TIP
  AFFILIATE_LINK
}

enum PaymentProvider {
  BORDERPAY_QRIS
  PAYPAL
}

enum OrderStatus {
  PENDING
  PAID
  EXPIRED
  FAILED
  REFUNDED
}

// --- AUTH.JS (GOOGLE OAUTH ONLY) ---
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          UserRole  @default(USER)
  preferredLang String    @default("id")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  stores        Store[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// --- MULTI-TENANT STOREFRONT ---
model Store {
  id              String      @id @default(cuid())
  ownerId         String
  owner           User        @relation(fields: [ownerId], references: [id])

  slug            String      @unique // [slug].etalase.online
  customDomain    String?     @unique // namabrand.com (PRO)
  domainVerified  Boolean     @default(false)

  name            String
  bio             String?
  avatarUrl       String?
  bannerUrl       String?

  // Regional & Chat Settings (SEA Ready)
  locale          String      @default("id")     // id, en, ms, th, vi
  currency        String      @default("IDR")    // IDR, MYR, SGD, THB, PHP, VND, USD
  chatChannel     ChatChannel @default(WHATSAPP)
  chatHandle      String?     // No WA (628...), ID LINE, Zalo, atau username Messenger
  mapsUrl         String?
  googleReviewUrl String?

  // Plan, Template & Demo Flag
  tier            PlanTier    @default(FREE)
  planExpiresAt   DateTime?
  isDemo          Boolean     @default(false)    // Dikecualikan dari kalkulasi finansial Mabes
  isActive        Boolean     @default(true)

  templateId      String      @default("clean-minimal")
  displayMode     String      @default("HYBRID") // BIO_LINK | CATALOG | HYBRID
  themeConfig     Json?       // Custom accent color, font, background (PRO)

  // Marketing & Payment Config
  metaPixelId     String?
  tiktokPixelId   String?
  gaMeasurementId String?
  paypalEmail     String?
  walletBalance   Decimal     @default(0) @db.Decimal(14, 2)

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  blocks          BioBlock[]
  products        Product[]
  orders          Order[]
  posts           BlogPost[]
  vouchers        Voucher[]
  withdrawals     Withdrawal[]
}

model BioBlock {
  id        String   @id @default(cuid())
  storeId   String
  store     Store    @relation(fields: [storeId], references: [id], onDelete: Cascade)
  type      String   // LINK | TEXT | IMAGE | VIDEO_EMBED | PRODUCT_REF | DIVIDER
  title     String?
  content   Json?
  sortOrder Int      @default(0)
  isVisible Boolean  @default(true)
  clicks    Int      @default(0)
}

model Product {
  id               String            @id @default(cuid())
  storeId          String
  store            Store             @relation(fields: [storeId], references: [id], onDelete: Cascade)

  title            String
  slug             String
  description      String?           @db.Text
  category         String?
  images           String[]
  price            Decimal           @default(0) @db.Decimal(14, 2)
  compareAtPrice   Decimal?          @db.Decimal(14, 2)

  productType      ProductType       @default(DIGITAL)
  checkoutMode     CheckoutMode      @default(DIRECT_CHECKOUT)

  externalPlatform ExternalPlatform? // TIKTOK_SHOP | SHOPEE | LAZADA | TOKOPEDIA (ID) | CUSTOM
  externalUrl      String?
  externalLabel    String?
  digitalFileUrl   String?
  chatMessage      String?
  stock            Int?

  isFeatured       Boolean           @default(false)
  isActive         Boolean           @default(true)
  views            Int               @default(0)
  clicks           Int               @default(0)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt

  orders           Order[]
  @@unique([storeId, slug])
}

model Order {
  id               String          @id @default(cuid())
  orderCode        String          @unique
  storeId          String
  store            Store           @relation(fields: [storeId], references: [id])
  productId        String
  product          Product         @relation(fields: [productId], references: [id])

  buyerName        String
  buyerWhatsapp    String
  buyerEmail       String?
  shippingAddress  String?

  currency         String          @default("IDR")
  amount           Decimal         @db.Decimal(14, 2)
  platformFee      Decimal         @default(0) @db.Decimal(14, 2)
  netAmount        Decimal         @db.Decimal(14, 2)

  paymentProvider  PaymentProvider @default(BORDERPAY_QRIS)
  paymentRef       String?
  paymentUrl       String?
  status           OrderStatus     @default(PENDING)
  waDeliveredAt    DateTime?

  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  storeId     String
  store       Store    @relation(fields: [storeId], references: [id], onDelete: Cascade)
  title       String
  slug        String
  coverImage  String?
  content     String   @db.Text
  isPublished Boolean  @default(false)
  views       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  @@unique([storeId, slug])
}

model Voucher {
  id            String    @id @default(cuid())
  storeId       String
  store         Store     @relation(fields: [storeId], references: [id], onDelete: Cascade)
  code          String
  discountType  String    // PERCENT | FIXED
  discountValue Decimal   @db.Decimal(14, 2)
  maxUses       Int?
  usedCount     Int       @default(0)
  expiresAt     DateTime?
  isActive      Boolean   @default(true)
  @@unique([storeId, code])
}

model Withdrawal {
  id            String   @id @default(cuid())
  storeId       String
  store         Store    @relation(fields: [storeId], references: [id])
  amount        Decimal  @db.Decimal(14, 2)
  currency      String   @default("IDR")
  destination   String
  status        String   @default("PENDING") // PENDING | APPROVED | REJECTED
  adminNotes    String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## 11. Roadmap Eksekusi Vibe Coding (Untuk `agy`)

> **Instruksi untuk Antigravity (`agy`):** Kerjakan berurutan fase demi fase. Selalu gunakan **`PORT=3005`**, **`src/lib/config/env.ts`**, **`src/lib/core/*`** (messages, response, formatters), dan pisahkan logika ke **`src/services/*`** agar file tetap kecil dan hemat token. Jalankan `python automation/python/ci_check.py` (atau `npm run build`) hingga lolos 100% sebelum lanjut ke fase berikutnya.

### Phase 1: Pondasi Core, Global Helpers, Microservices, Python CI Scaffold, Auth & Template Dasar (MVP)
- [x] Setup Next.js App Router pada **`PORT=3005`**, Tailwind CSS, Prisma + PostgreSQL, `next-intl` (`id`, `en`, `ms`, `th`, `vi`), endpoint `/api/health`, dan `docker-compose.yml` (`web:3005`, `postgres`, `n8n:5678`, `nginx`).
- [x] Bangun **Global Core Layer** terlebih dahulu:
  - `src/lib/config/env.ts` (Zod validated ENV) & `src/lib/config/constants.ts` (`RESERVED_SLUGS`, `TIER_RULES`, `MARKETPLACE_PRESETS`).
  - `src/lib/core/messages.ts` (Global Error/Success dictionary), `src/lib/core/response.ts` (`ok()`, `fail()`, `withErrorHandler()`), `src/lib/core/formatters.ts`, dan `src/lib/db/prisma.ts` (`serializePlain()`).
  - `src/lib/n8n/dispatcher.ts` (`emitN8nEvent`).
- [x] Inisialisasi **`automation/python/`** (`requirements.txt`, `ci_check.py`, `uat_runner.py`, `db_backup.py`) + `.github/workflows/ci-cd.yml` & folder **`automation/n8n/workflows/`**.
- [x] Inisialisasi folder **`.agents/skills/`** beserta `product-marketing.md` dan 5 skill prioritas awal.
- [x] Implementasi `src/middleware.ts` untuk 4 pilar platform (`etalase.online`, `[slug].etalase.online`, `[slug]/admin` & `/login`, custom domain, `mabes.etalase.online`).
- [x] Setup Auth.js **Google Connect Only** (Centralized Callback + Cross-Subdomain Cookie) & `src/lib/auth/session.ts`.
- [x] Microservice `src/services/auth-onboarding/` + halaman `/onboarding` 1-langkah + emit `tenant.created` ke n8n.
- [x] Bangun **3 Template Gratis** (`clean-minimal`, `classic-dark`, `catalog-grid`) dengan CSS Module terisolasi + **Showcase Carousel** + halaman *use-case* (`/creator`, `/sales`, `/umkm`).

### Phase 2: 3 Mode Transaksi, Preset Marketplace SEA, Borderpay QRIS, PayPal & n8n WA-First Flows
- [x] Microservice `src/services/product-catalog/` & `src/services/store-profile/` mendukung 3 `CheckoutMode` + **Multi-Mode Checkout** & **Master Data SEA**:
  - `DIRECT_CHECKOUT` (Borderpay QRIS & PayPal)
  - `EXTERNAL_LINK` dengan preset `ExternalPlatform` (`TIKTOK_SHOP`, `SHOPEE`, `LAZADA`, `TOKOPEDIA` khusus `locale === "id"`, `CUSTOM`) + Click Tracker.
  - `CHAT_ORDER` Multi-Channel Master Data (WhatsApp, LINE, Zalo, WeChat, Messenger, Telegram via `buildMasterChatUrl()`).
- [x] Microservice terisolasi `src/services/payment-borderpay/` & `src/services/checkout-order/` + halaman `/[slug]/checkout/[productSlug]`.
- [x] Blueprint n8n `ops-02-order-delivery.json` (auto-delivery via Fonnte WA + callback) & webhook route `/pay/webhook`.
- [x] Lengkapi Python **`deploy_vps.py`** (auto-backup + deploy + healthcheck + rollback) & workflow n8n **`ops-06-cicd-notify.json`**.

### Phase 3: 5+ Template Premium (Pro - 11 Total Archetypes), Mabes Super Admin, Marketing Kit & n8n + Python Growth Flows
- [x] Bangun **Template Premium Pro** (11 arketipe Lynk.id style: `clean-minimal`, `classic-dark`, `catalog-grid`, `sage-creator`, `editorial-paper`, `beauty-glam`, `midnight-glow`, `sales-showcase`, `cafe-menu`, `boutique-visual`, `wellness-pro`) lengkap dengan `Tier Guard` & CSS Modules terisolasi.
- [x] Microservice `src/services/mabes-admin/` + dashboard **`mabes.etalase.online`**: KPI global & MRR (filter `isDemo: false`), manajemen tenant, approval payout wallet, verifikasi custom domain + `ops-05-mabes-alerts.json`.
- [x] Microservice `src/services/blog-seo/` & `src/services/marketing-kit/` (Blog SEO & JSON-LD, Voucher, Meta/TikTok Pixel, Poster Story 9:16, Cetak QR Code Meja Kasir).
- [x] Halaman **Programmatic SEO** & **Free Tools** (`etalase.online/tools`) + Python `growth_worker.py` terhubung ke n8n `ai-01-social-factory.json` & `ai-02-programmatic-seo.json`.

### Phase 4: Ekspansi Kreator, Ekosistem Bundling & Full Hybrid AI Growth Engine
- [x] Modul **Course / Video E-Learning** (`/[slug]/learn/[productSlug]`), **Event/Webinar/Appointment Booking** (`/[slug]/book/[productSlug]`), **Support/Tip** (`/[slug]/tip`), & **Affiliate Internal** (komisi otomatis & referral tracking).
- [x] Aktifkan workflow n8n **`ops-03-cart-recovery.json`** (pengingat 1x via Fonnte setelah 30 menit).
- [x] Aktifkan workflow n8n **`ops-04-asistencuan-sync.json`** untuk otomasi bundling **`asistencuan.shop`**.
- [x] Lengkapi seluruh file skill 7 pilar di `.agents/skills/` (38 skills lengkap) + workflow n8n `ai-03-competitor-radar.json`, `ai-04-dfy-prospecting.json`, & `ai-05-churn-prevention.json` (ditopang Python `growth_worker.py`).

## 12. Environment Variables Utama (`.env`)

```env
# Server & Port (Konsisten Lokal & VPS)
NODE_ENV="development"
PORT=3005
HOST_PORT=3005
NEXT_PUBLIC_ROOT_DOMAIN="etalase.online"
NEXT_PUBLIC_APP_URL="http://localhost:3005"

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/etalase_online?schema=public"

# Auth.js (Google Connect Only)
AUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
SUPER_ADMIN_EMAILS="emailanda@gmail.com"

# Payment Gateways
BORDERPAY_API_KEY="..."
BORDERPAY_MERCHANT_ID="..."
BORDERPAY_WEBHOOK_SECRET="..."
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."
PAYPAL_MODE="sandbox" # sandbox | live

# WhatsApp Automation (Fonnte)
FONNTE_TOKEN="..."

# n8n Automation Microservice
N8N_WEBHOOK_BASE_URL="http://n8n:5678/webhook"
N8N_WEBHOOK_SECRET="..."

# Python CI/CD & VPS Deployment Automation (GitHub Secrets / Lokal)
VPS_HOST="72.62.75.149"
VPS_USER="root"
VPS_APP_DIR="/opt/etalase.online"
PYTHON_WORKER_SECRET="..."
```
