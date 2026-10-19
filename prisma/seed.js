let PrismaClient;
try {
  PrismaClient = require("../src/generated/prisma").PrismaClient;
} catch {
  try {
    PrismaClient = require("./src/generated/prisma").PrismaClient;
  } catch {
    PrismaClient = require("@prisma/client").PrismaClient;
  }
}

const prisma = new PrismaClient();

// Pre-computed Bcrypt Hashes (10 rounds) to avoid external runtime dependencies in production runner
const SAAS_PASSWORD_HASH = "$2b$10$PIBqqp.z1qeooSO07CfOYeJC0mrZZ49D4QlUIE8./tIiwv/dzYcS."; // admin123!
const CLIENT_PASSWORD_HASH = "$2b$10$8WkHLaeBGeOJfmEV7VKRveg2OcPv7e5OKgF1Qd2L3NTO2mV5C.a36"; // client123!

async function ensureTablesExist() {
  console.log("🌱 Menjalankan migrasi DDL mandiri & self-healing komprehensif ke PostgreSQL...");

  // 1. Enum Types
  const enums = [
    `DO $$ BEGIN CREATE TYPE "UserRole" AS ENUM ('SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_MARKETING', 'SAAS_FINANCE', 'SAAS_TECHNICAL', 'CLIENT_SUPER_ADMIN', 'CLIENT_ADMIN'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN CREATE TYPE "BusinessSector" AS ENUM ('AUTOMOTIVE', 'PROPERTY', 'RENTAL', 'RESTAURANT_CAFE', 'GENERAL_SERVICE'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    `DO $$ BEGIN CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'FOLLOW_UP', 'DEAL', 'LOST'); EXCEPTION WHEN duplicate_object THEN null; END $$;`
  ];
  for (const sql of enums) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (err) {
      console.warn("Enum warning:", err.message);
    }
  }

  // 2. Table TenantCategory
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "TenantCategory" (
      "id" TEXT PRIMARY KEY,
      "name" TEXT NOT NULL,
      "slug" TEXT UNIQUE NOT NULL,
      "sector" "BusinessSector" NOT NULL,
      "description" TEXT,
      "icon" TEXT,
      "orderIndex" INTEGER NOT NULL DEFAULT 0,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Table Tenant
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Tenant" (
      "id" TEXT PRIMARY KEY,
      "customDomain" TEXT UNIQUE NOT NULL,
      "businessName" TEXT NOT NULL,
      "categoryId" TEXT NOT NULL REFERENCES "TenantCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
      "sector" "BusinessSector" NOT NULL,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "expiresAt" TIMESTAMP(3),
      "whatsappNumber" TEXT NOT NULL DEFAULT '62895389974414',
      "contactEmail" TEXT,
      "address" TEXT,
      "googleMapsUrl" TEXT,
      "seoTitle" TEXT,
      "seoDescription" TEXT,
      "seoKeywords" TEXT,
      "geoCity" TEXT,
      "geoRegion" TEXT,
      "latitude" DOUBLE PRECISION,
      "longitude" DOUBLE PRECISION,
      "themeColor" TEXT NOT NULL DEFAULT '#2563eb',
      "logoUrl" TEXT,
      "heroTitle" TEXT,
      "heroSubtitle" TEXT,
      "heroBannerUrl" TEXT,
      "featureFlags" JSONB DEFAULT '{}'::jsonb,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Table User
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" TEXT PRIMARY KEY,
      "email" TEXT UNIQUE NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "role" "UserRole" NOT NULL DEFAULT 'CLIENT_ADMIN',
      "tenantId" TEXT REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 5. Table CatalogItem
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CatalogItem" (
      "id" TEXT PRIMARY KEY,
      "tenantId" TEXT NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "title" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "category" TEXT,
      "price" DECIMAL(65,30),
      "pricePrefix" TEXT,
      "description" TEXT,
      "imageUrl" TEXT NOT NULL DEFAULT '',
      "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "orderIndex" INTEGER NOT NULL DEFAULT 0,
      "specsJson" JSONB,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "CatalogItem_tenantId_slug_key" UNIQUE ("tenantId", "slug")
    );
  `);

  // 6. Table GalleryItem
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "GalleryItem" (
      "id" TEXT PRIMARY KEY,
      "tenantId" TEXT NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "imageUrl" TEXT NOT NULL DEFAULT '',
      "caption" TEXT,
      "orderIndex" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Table Testimonial
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Testimonial" (
      "id" TEXT PRIMARY KEY,
      "tenantId" TEXT NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "clientName" TEXT,
      "customerName" TEXT,
      "clientRole" TEXT,
      "comment" TEXT NOT NULL DEFAULT '',
      "rating" INTEGER NOT NULL DEFAULT 5,
      "avatarUrl" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Table Lead
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Lead" (
      "id" TEXT PRIMARY KEY,
      "tenantId" TEXT NOT NULL REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE,
      "name" TEXT NOT NULL DEFAULT 'Pengunjung',
      "phone" TEXT NOT NULL DEFAULT '',
      "moduleType" TEXT NOT NULL DEFAULT 'GENERAL_INQUIRY',
      "sourceUrl" TEXT,
      "detailsJson" JSONB,
      "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
      "notes" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // --- SINKRONISASI KOLOM DEFROST & SELF-HEALING MENYELURUH ---
  const alterations = [
    // --- MODEL: Testimonial (Selesaikan konflik customerName vs clientName) ---
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "clientName" TEXT;`,
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "customerName" TEXT;`,
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "clientRole" TEXT;`,
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "comment" TEXT NOT NULL DEFAULT '';`,
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "rating" INTEGER NOT NULL DEFAULT 5;`,
    `ALTER TABLE "Testimonial" ADD COLUMN IF NOT EXISTS "avatarUrl" TEXT;`,
    `DO $$ BEGIN ALTER TABLE "Testimonial" ALTER COLUMN "customerName" DROP NOT NULL; EXCEPTION WHEN undefined_column THEN null; END $$;`,
    `DO $$ BEGIN ALTER TABLE "Testimonial" ALTER COLUMN "clientName" DROP NOT NULL; EXCEPTION WHEN undefined_column THEN null; END $$;`,
    `DO $$ BEGIN UPDATE "Testimonial" SET "clientName" = "customerName" WHERE "clientName" IS NULL AND "customerName" IS NOT NULL; EXCEPTION WHEN undefined_column THEN null; END $$;`,
    `DO $$ BEGIN UPDATE "Testimonial" SET "customerName" = "clientName" WHERE "customerName" IS NULL AND "clientName" IS NOT NULL; EXCEPTION WHEN undefined_column THEN null; END $$;`,

    // --- MODEL: CatalogItem ---
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "slug" TEXT;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "category" TEXT;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "price" DECIMAL(65,30);`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "pricePrefix" TEXT;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "description" TEXT;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT NOT NULL DEFAULT '';`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "images" TEXT[] DEFAULT ARRAY[]::TEXT[];`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;`,
    `ALTER TABLE "CatalogItem" ADD COLUMN IF NOT EXISTS "specsJson" JSONB;`,
    `CREATE UNIQUE INDEX IF NOT EXISTS "CatalogItem_tenantId_slug_key" ON "CatalogItem"("tenantId", "slug");`,

    // --- MODEL: GalleryItem ---
    `ALTER TABLE "GalleryItem" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT NOT NULL DEFAULT '';`,
    `ALTER TABLE "GalleryItem" ADD COLUMN IF NOT EXISTS "caption" TEXT;`,
    `ALTER TABLE "GalleryItem" ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;`,

    // --- MODEL: Lead ---
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "name" TEXT NOT NULL DEFAULT 'Pengunjung';`,
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "phone" TEXT NOT NULL DEFAULT '';`,
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "moduleType" TEXT NOT NULL DEFAULT 'GENERAL_INQUIRY';`,
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "sourceUrl" TEXT;`,
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "detailsJson" JSONB;`,
    `ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "notes" TEXT;`,

    // --- MODEL: Tenant ---
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "whatsappNumber" TEXT NOT NULL DEFAULT '62895389974414';`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "contactEmail" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "address" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "googleMapsUrl" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "seoKeywords" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "geoCity" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "geoRegion" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "latitude" DOUBLE PRECISION;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "longitude" DOUBLE PRECISION;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "themeColor" TEXT NOT NULL DEFAULT '#2563eb';`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "logoUrl" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "heroTitle" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "heroSubtitle" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "heroBannerUrl" TEXT;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "featureFlags" JSONB DEFAULT '{}'::jsonb;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;`,
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMP(3);`,

    // --- MODEL: User & TenantCategory ---
    `ALTER TABLE "TenantCategory" ADD COLUMN IF NOT EXISTS "orderIndex" INTEGER NOT NULL DEFAULT 0;`,
    `ALTER TABLE "TenantCategory" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;`,
    `ALTER TABLE "TenantCategory" ADD COLUMN IF NOT EXISTS "description" TEXT;`,
    `ALTER TABLE "TenantCategory" ADD COLUMN IF NOT EXISTS "icon" TEXT;`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'CLIENT_ADMIN';`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "passwordHash" TEXT NOT NULL DEFAULT '';`,
    `ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "name" TEXT NOT NULL DEFAULT 'User';`
  ];

  for (const sql of alterations) {
    try {
      await prisma.$executeRawUnsafe(sql);
    } catch (err) {
      console.warn("Alteration warning:", err.message);
    }
  }

  // --- SANITASI KOLOM DINAMIS (ELIMINASI ERROR 23502 NOT NULL VIOLATION) ---
  // Menghapus constraint NOT NULL pada seluruh kolom non-kunci di tabel data sekunder
  // agar kolom legacy dari migrasi sebelumnya tidak pernah menyebabkan 23502
  const tablesToSanitize = ['Testimonial', 'CatalogItem', 'GalleryItem', 'Lead'];
  for (const table of tablesToSanitize) {
    try {
      await prisma.$executeRawUnsafe(`
        DO $$ 
        DECLARE 
          col record;
        BEGIN 
          FOR col IN 
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_schema = 'public'
              AND table_name = '${table}' 
              AND column_name NOT IN ('id', 'tenantId', 'createdAt')
          LOOP 
            EXECUTE format('ALTER TABLE "${table}" ALTER COLUMN %I DROP NOT NULL;', col.column_name);
          END LOOP; 
        END $$;
      `);
    } catch (err) {
      console.warn(`Sanitize warning for ${table}:`, err.message);
    }
  }

  console.log("✅ Seluruh struktur tabel & sinkronisasi kolom PostgreSQL berhasil dipastikan ada & disanitasi.");
}

async function main() {
  await ensureTablesExist();

  console.log("🌱 Memulai seeding database dengan Granular RBAC (Zero External Dependencies)...");

  const saasPasswordHash = SAAS_PASSWORD_HASH;
  const clientPasswordHash = CLIENT_PASSWORD_HASH;

  // 1. SAAS PLATFORM ROLES
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@etalase.online" },
    update: { role: "SAAS_SUPER_ADMIN" },
    create: {
      email: "superadmin@etalase.online",
      passwordHash: saasPasswordHash,
      name: "SaaS Super Admin",
      role: "SAAS_SUPER_ADMIN",
    },
  });

  const saasAdmin = await prisma.user.upsert({
    where: { email: "admin@etalase.online" },
    update: { role: "SAAS_ADMIN" },
    create: {
      email: "admin@etalase.online",
      passwordHash: saasPasswordHash,
      name: "SaaS Operational Admin",
      role: "SAAS_ADMIN",
    },
  });

  const saasFinance = await prisma.user.upsert({
    where: { email: "finance@etalase.online" },
    update: { role: "SAAS_FINANCE" },
    create: {
      email: "finance@etalase.online",
      passwordHash: saasPasswordHash,
      name: "SaaS Finance & Billing",
      role: "SAAS_FINANCE",
    },
  });

  const saasTech = await prisma.user.upsert({
    where: { email: "tech@etalase.online" },
    update: { role: "SAAS_TECHNICAL" },
    create: {
      email: "tech@etalase.online",
      passwordHash: saasPasswordHash,
      name: "SaaS Technical & DNS",
      role: "SAAS_TECHNICAL",
    },
  });

  const saasMarketing = await prisma.user.upsert({
    where: { email: "marketing@etalase.online" },
    update: { role: "SAAS_MARKETING" },
    create: {
      email: "marketing@etalase.online",
      passwordHash: saasPasswordHash,
      name: "SaaS Marketing Specialist",
      role: "SAAS_MARKETING",
    },
  });

  console.log("✅ SaaS Platform Users seeded:");
  console.log("   -", superAdmin.email, "(SAAS_SUPER_ADMIN)");
  console.log("   -", saasAdmin.email, "(SAAS_ADMIN)");
  console.log("   -", saasFinance.email, "(SAAS_FINANCE)");
  console.log("   -", saasTech.email, "(SAAS_TECHNICAL)");
  console.log("   -", saasMarketing.email, "(SAAS_MARKETING)");

  // 2. TENANT CATEGORIES
  const categories = await Promise.all([
    prisma.tenantCategory.upsert({
      where: { slug: "sales-mobil" },
      update: {},
      create: {
        id: "cat_sales_mobil",
        name: "Sales Mobil Baru",
        slug: "sales-mobil",
        sector: "AUTOMOTIVE",
        description: "Website portofolio untuk sales mobil baru & bekas",
        icon: "🚗",
        orderIndex: 0,
      },
    }),
    prisma.tenantCategory.upsert({
      where: { slug: "sales-properti" },
      update: {},
      create: {
        id: "cat_sales_properti",
        name: "Sales Properti",
        slug: "sales-properti",
        sector: "PROPERTY",
        description: "Website listing properti & agen real estate",
        icon: "🏠",
        orderIndex: 1,
      },
    }),
    prisma.tenantCategory.upsert({
      where: { slug: "rental-kendaraan" },
      update: {},
      create: {
        id: "cat_rental_kendaraan",
        name: "Rental Kendaraan",
        slug: "rental-kendaraan",
        sector: "RENTAL",
        description: "Website armada rental mobil & motor",
        icon: "🔑",
        orderIndex: 2,
      },
    }),
    prisma.tenantCategory.upsert({
      where: { slug: "kafe-restoran" },
      update: {},
      create: {
        id: "cat_kafe_restoran",
        name: "Kafe & Restoran",
        slug: "kafe-restoran",
        sector: "RESTAURANT_CAFE",
        description: "Website menu & reservasi untuk kafe dan restoran",
        icon: "☕",
        orderIndex: 3,
      },
    }),
    prisma.tenantCategory.upsert({
      where: { slug: "jasa-profesional" },
      update: {},
      create: {
        id: "cat_jasa_profesional",
        name: "Jasa & Layanan Lokal",
        slug: "jasa-profesional",
        sector: "GENERAL_SERVICE",
        description: "Website jasa profesional & layanan bisnis lokal",
        icon: "🧺",
        orderIndex: 4,
      },
    }),
  ]);

  const [catMobil, catProperti, catRental, catKafe, catJasa] = categories;

  // 3. DUMMY TENANT 1: bastian-sales.com (Chery & Jaecoo Bandung)
  const tenant1 = await prisma.tenant.upsert({
    where: { customDomain: "bastian-sales.com" },
    update: {
      businessName: "Bastian - Sales Resmi Chery & Jaecoo Bandung",
      address: "Dealer Resmi Chery Bandung, Jl. Soekarno Hatta No. 500, Bandung",
      whatsappNumber: "62895389974414",
      contactEmail: "bastian@bastian-sales.com",
      seoTitle: "Promo Mobil Chery & Jaecoo Bandung | DP Ringan & Bunga 0% - Bastian",
      seoDescription: "Dealer resmi Chery & Jaecoo Bandung. Dapatkan promo DP mulai 25 Juta, diskon spesial, test drive ke rumah, dan approval leasing 100%. Hubungi Bastian!",
      seoKeywords: "chery bandung, jaecoo bandung, promo omoda 5 bandung, kredit chery bandung, sales chery bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9458,
      longitude: 107.6385,
      themeColor: "#dc2626", // Merah khas Chery
      heroTitle: "Beli Mobil Baru Chery & Jaecoo di Bandung Lebih Mudah & Cepat",
      heroSubtitle: "Dapatkan penawaran promo harga OTR Bandung, DP teringan mulai 25 Jutaan, bunga 0%, dan garansi mesin 10 Tahun / 1.000.000 KM.",
      heroBannerUrl: "/assets/templates/automotive/chery-omoda-5.webp",
      logoUrl: "/assets/templates/automotive/sales-profile.webp",
      featureFlags: {
        showInstallmentSimulator: true,
        showGallery: true,
        salesProfile: {
          name: "Bastian Pratama",
          role: "Senior Sales Consultant Chery & Jaecoo Bandung",
          experience: "10+ Tahun Melayani Penjualan Mobil di Bandung & Jawa Barat",
          greeting: "Halo, Saya Bastian Pratama siap membantu Anda mendapatkan promo mobil Chery & Jaecoo terbaik, test drive gratis ke rumah, dan approval leasing 100%!",
          bio: "Dengan pengalaman melayani ratusan pengiriman mobil di area Bandung, Cimahi, dan Jawa Barat, saya berkomitmen memberikan pelayanan transparan tanpa biaya tersembunyi. Dari proses pemilihan tipe, kalkulasi kredit, hingga mobil tiba di garasi Anda dengan plat nomor resmi."
        },
        heroBadges: [
          { label: "Unit Ready Stock Bandung • Plat D", icon: "Car", sublabel: "Ketersediaan Unit" },
          { label: "Garansi Mesin 10 Thn / 1.000.000 KM", icon: "ShieldCheck", sublabel: "Garansi Resmi Terpanjang" }
        ],
        commitments: [
          "Unit Ready Stock Semua Tipe",
          "Dibantu Sampai Approval Leasing 100%",
          "Layanan Test Drive Langsung ke Rumah",
          "Terima Tukar Tambah (Trade-in) Segala Merk"
        ],
        leasingPartners: [
          { name: "BCA Finance", logo: "/assets/templates/automotive/leasing/bca.svg" },
          { name: "Maybank Finance", logo: "/assets/templates/automotive/leasing/maybank.svg" },
          { name: "Mandiri Tunas Finance", logo: "/assets/templates/automotive/leasing/mtf.svg" },
          { name: "Adira Finance", logo: "/assets/templates/automotive/leasing/adira.svg" },
          { name: "MUF", logo: "/assets/templates/automotive/leasing/muf.svg" }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "bastian-sales.com",
      businessName: "Bastian - Sales Resmi Chery & Jaecoo Bandung",
      categoryId: catMobil.id,
      sector: "AUTOMOTIVE",
      whatsappNumber: "62895389974414",
      contactEmail: "bastian@bastian-sales.com",
      address: "Dealer Resmi Chery Bandung, Jl. Soekarno Hatta No. 500, Bandung",
      googleMapsUrl: "https://maps.google.com/?q=Dealer+Chery+Bandung",
      seoTitle: "Promo Mobil Chery & Jaecoo Bandung | DP Ringan & Bunga 0% - Bastian",
      seoDescription: "Dealer resmi Chery & Jaecoo Bandung. Dapatkan promo DP mulai 25 Juta, diskon spesial, test drive ke rumah, dan approval leasing 100%. Hubungi Bastian!",
      seoKeywords: "chery bandung, jaecoo bandung, promo omoda 5 bandung, kredit chery bandung, sales chery bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9458,
      longitude: 107.6385,
      themeColor: "#dc2626",
      heroTitle: "Beli Mobil Baru Chery & Jaecoo di Bandung Lebih Mudah & Cepat",
      heroSubtitle: "Dapatkan penawaran promo harga OTR Bandung, DP teringan mulai 25 Jutaan, bunga 0%, dan garansi mesin 10 Tahun / 1.000.000 KM.",
      heroBannerUrl: "/assets/templates/automotive/chery-omoda-5.webp",
      logoUrl: "/assets/templates/automotive/sales-profile.webp",
      featureFlags: {
        showInstallmentSimulator: true,
        showGallery: true,
        salesProfile: {
          name: "Bastian Pratama",
          role: "Senior Sales Consultant Chery & Jaecoo Bandung",
          experience: "10+ Tahun Melayani Penjualan Mobil di Bandung & Jawa Barat",
          greeting: "Halo, Saya Bastian Pratama siap membantu Anda mendapatkan promo mobil Chery & Jaecoo terbaik, test drive gratis ke rumah, dan approval leasing 100%!",
          bio: "Dengan pengalaman melayani ratusan pengiriman mobil di area Bandung, Cimahi, dan Jawa Barat, saya berkomitmen memberikan pelayanan transparan tanpa biaya tersembunyi. Dari proses pemilihan tipe, kalkulasi kredit, hingga mobil tiba di garasi Anda dengan plat nomor resmi."
        },
        heroBadges: [
          { label: "Unit Ready Stock Bandung • Plat D", icon: "Car", sublabel: "Ketersediaan Unit" },
          { label: "Garansi Mesin 10 Thn / 1.000.000 KM", icon: "ShieldCheck", sublabel: "Garansi Resmi Terpanjang" }
        ],
        commitments: [
          "Unit Ready Stock Semua Tipe",
          "Dibantu Sampai Approval Leasing 100%",
          "Layanan Test Drive Langsung ke Rumah",
          "Terima Tukar Tambah (Trade-in) Segala Merk"
        ],
        leasingPartners: [
          { name: "BCA Finance", logo: "/assets/templates/automotive/leasing/bca.svg" },
          { name: "Maybank Finance", logo: "/assets/templates/automotive/leasing/maybank.svg" },
          { name: "Mandiri Tunas Finance", logo: "/assets/templates/automotive/leasing/mtf.svg" },
          { name: "Adira Finance", logo: "/assets/templates/automotive/leasing/adira.svg" },
          { name: "MUF", logo: "/assets/templates/automotive/leasing/muf.svg" }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  // Client Users Tenant 1
  await prisma.user.upsert({
    where: { email: "owner@bastian-sales.com" },
    update: { role: "CLIENT_SUPER_ADMIN", tenantId: tenant1.id },
    create: {
      email: "owner@bastian-sales.com",
      passwordHash: clientPasswordHash,
      name: "Bastian Pratama (Senior Sales Consultant)",
      role: "CLIENT_SUPER_ADMIN",
      tenantId: tenant1.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "staff@bastian-sales.com" },
    update: { role: "CLIENT_ADMIN", tenantId: tenant1.id },
    create: {
      email: "staff@bastian-sales.com",
      passwordHash: clientPasswordHash,
      name: "Rian Staf Sales",
      role: "CLIENT_ADMIN",
      tenantId: tenant1.id,
    },
  });

  // Katalog Tenant 1: Mobil Chery & Jaecoo
  const catalogItems1 = [
    {
      title: "Chery Omoda 5 GT AWD",
      slug: "chery-omoda-5-gt-awd",
      category: "Futuristic Crossover SUV",
      price: 448800000,
      pricePrefix: "OTR Bandung Mulai",
      description: "Crossover futuristik dengan mesin 1.6 TGDI bertenaga buas, sistem All Wheel Drive (AWD), dan ADAS Level 2.5 terlengkap di kelasnya.",
      imageUrl: "/assets/templates/automotive/chery-omoda-5.webp",
      images: ["/assets/templates/automotive/chery-omoda-5.webp"],
      isFeatured: true,
      orderIndex: 0,
      specsJson: {
        otrPrice: "Rp 448.800.000",
        dpPromo: "DP Mulai 35 Juta",
        angsuranPromo: "Angsuran 6.2 Jt/bln",
        transmission: "7-Speed Dual Clutch (DCT)",
        fuelType: "Bensin Turbo",
        engine: "1.6L TGDI Turbocharged (197 HP)",
        warranty: "Garansi Mesin 10 Thn / 1.000.000 KM",
      },
    },
    {
      title: "Chery Omoda E5 Pure Electric (EV)",
      slug: "chery-omoda-e5-ev",
      category: "100% Electric SUV",
      price: 498800000,
      pricePrefix: "OTR Bandung Mulai",
      description: "SUV listrik murni masa depan dengan jarak tempuh hingga 430 KM (WLTP), fitur fast charging, dan gratis wall charger di rumah.",
      imageUrl: "/assets/templates/automotive/omoda-e5-ev.webp",
      images: ["/assets/templates/automotive/omoda-e5-ev.webp"],
      isFeatured: true,
      orderIndex: 1,
      specsJson: {
        otrPrice: "Rp 498.800.000",
        dpPromo: "DP Mulai 40 Juta / Bunga 0%",
        angsuranPromo: "Angsuran 6.9 Jt/bln",
        transmission: "Single Speed EV",
        fuelType: "Baterai Listrik LFP (61 kWh)",
        engine: "Motor Listrik 204 HP (Jarak 430 KM)",
        warranty: "Garansi Baterai Seumur Hidup (Lifetime)",
      },
    },
    {
      title: "Chery Tiggo 8 Pro Max Luxury",
      slug: "chery-tiggo-8-pro-max",
      category: "7-Seater Premium Luxury SUV",
      price: 528500000,
      pricePrefix: "OTR Bandung Mulai",
      description: "SUV keluarga 7-penumpang dengan kabin mewah kelas atas, panoramic sunroof besar, Sony 8-speaker audio, dan tenaga 250 HP.",
      imageUrl: "/assets/templates/automotive/chery-tiggo-8-pro.webp",
      images: ["/assets/templates/automotive/chery-tiggo-8-pro.webp"],
      isFeatured: true,
      orderIndex: 2,
      specsJson: {
        otrPrice: "Rp 528.500.000",
        dpPromo: "DP Mulai 45 Juta",
        angsuranPromo: "Angsuran 7.5 Jt/bln",
        transmission: "7-Speed Wet DCT",
        fuelType: "Bensin Turbo",
        engine: "2.0L TGDI Turbocharged (250 HP)",
        warranty: "Garansi Mesin 10 Thn / 1.000.000 KM",
      },
    },
    {
      title: "Jaecoo 7 Urban Off-Road SUV",
      slug: "jaecoo-7-urban-off-road",
      category: "Premium Classic Off-Roader",
      price: 435000000,
      pricePrefix: "OTR Bandung Mulai",
      description: "Desain gagah boxy khas petualang dengan ARDIS (All road drive intelligent system) 7 mode berkendara dan water wading depth 600mm.",
      imageUrl: "/assets/templates/automotive/jaecoo-7.webp",
      images: ["/assets/templates/automotive/jaecoo-7.webp"],
      isFeatured: true,
      orderIndex: 3,
      specsJson: {
        otrPrice: "Rp 435.000.000",
        dpPromo: "DP Mulai 30 Juta",
        angsuranPromo: "Angsuran 5.8 Jt/bln",
        transmission: "Automatic 7-Speed",
        fuelType: "Bensin Turbo",
        engine: "1.6L TGDI 4-Cylinder",
        warranty: "Garansi Mesin 10 Thn / 1.000.000 KM",
      },
    },
  ];

  for (const item of catalogItems1) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant1.id, slug: item.slug } },
      update: { ...item },
      create: { tenantId: tenant1.id, ...item },
    });
  }

  // Galeri Serah Terima Unit Bastian di Bandung
  const deliveryItems = [
    { id: "delivery-1", imageUrl: "/assets/templates/automotive/delivery-1.webp", caption: "Serah terima Chery Omoda 5 GT ke Bpk. Hendra - Buah Batu Bandung", orderIndex: 0 },
    { id: "delivery-2", imageUrl: "/assets/templates/automotive/delivery-2.webp", caption: "Pengiriman Chery Tiggo 8 Pro ke Ibu Maya - Dago Atas Bandung", orderIndex: 1 },
    { id: "delivery-3", imageUrl: "/assets/templates/automotive/delivery-3.webp", caption: "Delivery Omoda E5 Electric Car ke Bpk. Dr. Faisal - Antapani Bandung", orderIndex: 2 },
    { id: "delivery-4", imageUrl: "/assets/templates/automotive/delivery-4.webp", caption: "Penyerahan Unit Jaecoo 7 ke Bpk. Rian - Setiabudi Bandung", orderIndex: 3 },
    { id: "delivery-5", imageUrl: "/assets/templates/automotive/delivery-5.webp", caption: "Serah terima Omoda 5 Z ke Bpk. Agus - Kopo Bandung", orderIndex: 4 },
    { id: "delivery-6", imageUrl: "/assets/templates/automotive/delivery-6.webp", caption: "Customer puas Chery Omoda 5 ke Bpk. Dani - Cimahi", orderIndex: 5 },
  ];

  for (const delivery of deliveryItems) {
    await prisma.galleryItem.upsert({
      where: { id: delivery.id },
      update: {
        imageUrl: delivery.imageUrl,
        caption: delivery.caption,
        orderIndex: delivery.orderIndex,
      },
      create: {
        id: delivery.id,
        tenantId: tenant1.id,
        imageUrl: delivery.imageUrl,
        caption: delivery.caption,
        orderIndex: delivery.orderIndex,
      },
    });
  }

  // Testimoni Konsumen
  const dummyTestimonials = [
    {
      id: "testi-hendra-automotive",
      tenantId: tenant1.id,
      clientName: "Bpk. Hendra Kurniawan",
      customerName: "Bpk. Hendra Kurniawan",
      clientRole: "Wiraswasta, Buah Batu",
      comment: "Pelayanan Mas Bastian top banget! Berkas dibantu sampai tuntas, DP minim sesuai janji, dan unit Omoda 5 GT dikirim langsung ke rumah plat nomor resmi siap pakai.",
      rating: 5,
      avatarUrl: "/assets/templates/automotive/delivery-1.webp",
    },
    {
      id: "testi-maya-automotive",
      tenantId: tenant1.id,
      clientName: "Ibu Maya Septiani",
      customerName: "Ibu Maya Septiani",
      clientRole: "Dokter, Dago Atas",
      comment: "Awalnya bingung pilih Tiggo 8 Pro atau merk lain. Mas Bastian bawa unit test drive langsung ke klinik saya. Proses kredit BCA Finance cuma 2 hari langsung approve!",
      rating: 5,
      avatarUrl: "/assets/templates/automotive/delivery-2.webp",
    },
    {
      id: "testi-faisal-automotive",
      tenantId: tenant1.id,
      clientName: "Bpk. Dr. Faisal M.",
      customerName: "Bpk. Dr. Faisal M.",
      clientRole: "Dosen, Antapani",
      comment: "Beli Omoda E5 EV dapat promo free asuransi 1 tahun dan wall charger terpasang rapi di rumah. Penjelasan fitur ADAS sangat detail dan profesional.",
      rating: 5,
      avatarUrl: "/assets/templates/automotive/delivery-3.webp",
    },
  ];

  for (const item of dummyTestimonials) {
    try {
      await prisma.testimonial.upsert({
        where: { id: item.id },
        update: {
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
        create: {
          id: item.id,
          tenantId: item.tenantId,
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
      });
    } catch {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Testimonial" ("id", "tenantId", "clientName", "customerName", "clientRole", "comment", "rating", "avatarUrl", "createdAt")
        VALUES ($1, $2, $3, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT ("id") DO UPDATE 
        SET "clientName" = EXCLUDED."clientName",
            "comment" = EXCLUDED."comment",
            "rating" = EXCLUDED."rating";
      `, item.id, item.tenantId, item.clientName, item.clientRole, item.comment, item.rating, item.avatarUrl);
    }
  }

  console.log("✅ Tenant 1 (Automotive Chery & Jaecoo Bandung):", tenant1.customDomain);

  // 4. DUMMY TENANT 2: bastian-rental.com (Rental Mobil Bandung)
  const tenant2 = await prisma.tenant.upsert({
    where: { customDomain: "bastian-rental.com" },
    update: {
      businessName: "Bastian Rental Mobil Bandung",
      heroTitle: "Sewa Mobil Bandung Lepas Kunci & Plus Driver Murah Terpercaya",
      heroSubtitle: "Armada keluaran terbaru, bersih terawat, dan siap antar-jemput ke Stasiun/Bandara/Hotel. Proses mudah tanpa survey berbelit!",
      heroBannerUrl: "/assets/templates/rental/hero-rental.webp",
      logoUrl: "/assets/templates/rental/logo-rental.webp",
      themeColor: "#059669", // Emerald Green khas rental terpercaya
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.8905,
      longitude: 107.5996,
      address: "Jl. Pasteur No. 120, Sukajadi, Kota Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+Pasteur+No.120+Bandung",
      whatsappNumber: "62895389974414",
      contactEmail: "rental@bastian-rental.com",
      seoTitle: "Sewa Mobil Bandung Lepas Kunci & Driver Murah | Bastian Rental",
      seoDescription: "Rental mobil Bandung lepas kunci & driver murah. Tersedia Innova Zenix, Avanza, Xpander, Fortuner, Hiace. Antar jemput Stasiun/Hotel 24 jam!",
      seoKeywords: "rental mobil bandung, sewa mobil bandung, rental mobil lepas kunci bandung, sewa mobil dengan sopir bandung, rental innova zenix bandung, rental hiace bandung",
      featureFlags: {
        taglineBadge: "Solusi Transportasi & Wisata Bandung • Unit 2023-2025",
        heroBadges: [
          { label: "Bisa Lepas Kunci Tanpa Survey", icon: "Key", sublabel: "Kemudahan Sewa" },
          { label: "Gratis Antar Jemput Stasiun / Hotel", icon: "MapPin", sublabel: "Layanan Antar Unit" }
        ],
        commitments: [
          "Armada Bersih, Wangi & Rutin Servis Resmi",
          "Pilihan Durasi: 12 Jam, 24 Jam, & Mingguan",
          "Driver Ramah, Berpengalaman & Menguasai Rute Wisata",
          "Asuransi All-Risk & Jaminan Mobil Pengganti"
        ],
        rentalTerms: [
          {
            title: "Syarat Lepas Kunci (Wisatawan / Luar Kota)",
            items: [
              "Foto KTP Asli & SIM A Aktif",
              "Tiket Kereta Api (Whoosh/KAI) atau Tiket Pesawat PP",
              "Bukti Reservasi Hotel / Penginapan di Bandung",
              "Akun Media Sosial Aktif (Instagram / LinkedIn)"
            ]
          },
          {
            title: "Syarat Lepas Kunci (Warga Domisili Bandung)",
            items: [
              "e-KTP Asli Bandung & SIM A Aktif",
              "Kartu Keluarga (KK) / ID Card Karyawan Asli",
              "Motor + STNK atas nama pribadi sebagai deposit jaminan",
              "Bersedia disurvei lokasi tempat tinggal jika diperlukan"
            ]
          },
          {
            title: "Ketentuan Paket Dengan Driver",
            items: [
              "Cukup DP Reservasi Jadwal (Tanpa deposit jaminan unit)",
              "Driver profesional, ramah, dan bebas asap rokok di dalam kabin",
              "Tarif belum termasuk BBM, Tol, Parkir, & Uang Makan Driver Rp 50.000/hari",
              "Tersedia opsi Paket All-In (Mobil + Driver + BBM + Tol)"
            ]
          }
        ],
        facilities: [
          {
            title: "Antar Jemput Tepat Waktu",
            desc: "Armada kami antarkan langsung ke Stasiun KCIC Whoosh Tegalluar/Padalarang, Stasiun Bandung, atau hotel Anda tepat waktu."
          },
          {
            title: "Unit Selalu Prima & Higienis",
            desc: "Seluruh armada dicuci bersih, wangi, dan dicek oli serta sistem rem secara berkala sebelum diserahterimakan kepada penyewa."
          },
          {
            title: "Layanan Bantuan Darurat 24 Jam",
            desc: "Tim teknis darurat siaga 24 jam di seluruh area Bandung Raya dengan jaminan unit pengganti bila terjadi kendala mesin."
          }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "bastian-rental.com",
      businessName: "Bastian Rental Mobil Bandung",
      categoryId: catRental.id,
      sector: "RENTAL",
      whatsappNumber: "62895389974414",
      contactEmail: "rental@bastian-rental.com",
      address: "Jl. Pasteur No. 120, Sukajadi, Kota Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+Pasteur+No.120+Bandung",
      seoTitle: "Sewa Mobil Bandung Lepas Kunci & Driver Murah | Bastian Rental",
      seoDescription: "Rental mobil Bandung lepas kunci & driver murah. Tersedia Innova Zenix, Avanza, Xpander, Fortuner, Hiace. Antar jemput Stasiun/Hotel 24 jam!",
      seoKeywords: "rental mobil bandung, sewa mobil bandung, rental mobil lepas kunci bandung, sewa mobil dengan sopir bandung, rental innova zenix bandung, rental hiace bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.8905,
      longitude: 107.5996,
      themeColor: "#059669",
      heroTitle: "Sewa Mobil Bandung Lepas Kunci & Plus Driver Murah Terpercaya",
      heroSubtitle: "Armada keluaran terbaru, bersih terawat, dan siap antar-jemput ke Stasiun/Bandara/Hotel. Proses mudah tanpa survey berbelit!",
      heroBannerUrl: "/assets/templates/rental/hero-rental.webp",
      logoUrl: "/assets/templates/rental/logo-rental.webp",
      featureFlags: {
        taglineBadge: "Solusi Transportasi & Wisata Bandung • Unit 2023-2025",
        heroBadges: [
          { label: "Bisa Lepas Kunci Tanpa Survey", icon: "Key", sublabel: "Kemudahan Sewa" },
          { label: "Gratis Antar Jemput Stasiun / Hotel", icon: "MapPin", sublabel: "Layanan Antar Unit" }
        ],
        commitments: [
          "Armada Bersih, Wangi & Rutin Servis Resmi",
          "Pilihan Durasi: 12 Jam, 24 Jam, & Mingguan",
          "Driver Ramah, Berpengalaman & Menguasai Rute Wisata",
          "Asuransi All-Risk & Jaminan Mobil Pengganti"
        ],
        rentalTerms: [
          {
            title: "Syarat Lepas Kunci (Wisatawan / Luar Kota)",
            items: [
              "Foto KTP Asli & SIM A Aktif",
              "Tiket Kereta Api (Whoosh/KAI) atau Tiket Pesawat PP",
              "Bukti Reservasi Hotel / Penginapan di Bandung",
              "Akun Media Sosial Aktif (Instagram / LinkedIn)"
            ]
          },
          {
            title: "Syarat Lepas Kunci (Warga Domisili Bandung)",
            items: [
              "e-KTP Asli Bandung & SIM A Aktif",
              "Kartu Keluarga (KK) / ID Card Karyawan Asli",
              "Motor + STNK atas nama pribadi sebagai deposit jaminan",
              "Bersedia disurvei lokasi tempat tinggal jika diperlukan"
            ]
          },
          {
            title: "Ketentuan Paket Dengan Driver",
            items: [
              "Cukup DP Reservasi Jadwal (Tanpa deposit jaminan unit)",
              "Driver profesional, ramah, dan bebas asap rokok di dalam kabin",
              "Tarif belum termasuk BBM, Tol, Parkir, & Uang Makan Driver Rp 50.000/hari",
              "Tersedia opsi Paket All-In (Mobil + Driver + BBM + Tol)"
            ]
          }
        ],
        facilities: [
          {
            title: "Antar Jemput Tepat Waktu",
            desc: "Armada kami antarkan langsung ke Stasiun KCIC Whoosh Tegalluar/Padalarang, Stasiun Bandung, atau hotel Anda tepat waktu."
          },
          {
            title: "Unit Selalu Prima & Higienis",
            desc: "Seluruh armada dicuci bersih, wangi, dan dicek oli serta sistem rem secara berkala sebelum diserahterimakan kepada penyewa."
          },
          {
            title: "Layanan Bantuan Darurat 24 Jam",
            desc: "Tim teknis darurat siaga 24 jam di seluruh area Bandung Raya dengan jaminan unit pengganti bila terjadi kendala mesin."
          }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.upsert({
    where: { email: "owner@bastian-rental.com" },
    update: { role: "CLIENT_SUPER_ADMIN", tenantId: tenant2.id },
    create: {
      email: "owner@bastian-rental.com",
      passwordHash: clientPasswordHash,
      name: "Bastian Hendrawan (Rental Owner)",
      role: "CLIENT_SUPER_ADMIN",
      tenantId: tenant2.id,
    },
  });

  // 6 Unit Armada Rental Bandung Pilihan
  const catalogItems2 = [
    {
      title: "Toyota All New Avanza 2024",
      slug: "toyota-all-new-avanza",
      category: "MPV Keluarga Terlaris",
      price: 450000,
      pricePrefix: "Mulai dari",
      description: "Pilihan utama perjalanan hemat bersama keluarga di Bandung. Kabin lega, suspensi empuk, dan irit bahan bakar.",
      imageUrl: "/assets/templates/rental/avanza-2024.webp",
      images: ["/assets/templates/rental/avanza-2024.webp"],
      isFeatured: true,
      orderIndex: 0,
      specsJson: {
        seats: "7 Kursi",
        transmission: "Matic & Manual",
        fuelType: "Bensin (Irit)",
        year: "2023 - 2024",
        price12h: "Rp 350.000",
        price24h: "Rp 450.000",
        priceWithDriver: "Rp 600.000",
        features: ["AC Double Blower", "Head Unit Touchscreen", "Sensor Parkir", "Kamera Mundur"]
      },
    },
    {
      title: "Toyota Kijang Innova Zenix",
      slug: "toyota-innova-zenix",
      category: "Premium Luxury MPV",
      price: 750000,
      pricePrefix: "Mulai dari",
      description: "Kenyamanan eksekutif kelas atas dengan platform TNGA terbaru. Sangat nyaman untuk perjalanan bisnis, VIP, dan liburan mewah di Bandung.",
      imageUrl: "/assets/templates/rental/innova-zenix.webp",
      images: ["/assets/templates/rental/innova-zenix.webp"],
      isFeatured: true,
      orderIndex: 1,
      specsJson: {
        seats: "7 Kursi (Captain Seat)",
        transmission: "CVT Automatic",
        fuelType: "Bensin 2.0L",
        year: "2024",
        price12h: "Rp 650.000",
        price24h: "Rp 750.000",
        priceWithDriver: "Rp 950.000",
        features: ["Panoramic Sunroof", "Captain Seat", "Wireless Charger", "Layar Hiburan 10 Inci"]
      },
    },
    {
      title: "Mitsubishi Xpander Ultimate",
      slug: "mitsubishi-xpander-ultimate",
      category: "Comfort MPV",
      price: 500000,
      pricePrefix: "Mulai dari",
      description: "Desain stylish dan kabin kedap suara terbaik di kelasnya. Suspensi mantap untuk rute Lembang, Ciwidey, dan wisata pegunungan.",
      imageUrl: "/assets/templates/rental/xpander.webp",
      images: ["/assets/templates/rental/xpander.webp"],
      isFeatured: true,
      orderIndex: 2,
      specsJson: {
        seats: "7 Kursi",
        transmission: "CVT Automatic",
        fuelType: "Bensin",
        year: "2023 - 2024",
        price12h: "Rp 400.000",
        price24h: "Rp 500.000",
        priceWithDriver: "Rp 650.000",
        features: ["Cruise Control", "Electric Parking Brake", "Ground Clearance Tinggi", "Kabin Super Kedap"]
      },
    },
    {
      title: "Toyota Fortuner 2.8 GR Sport",
      slug: "toyota-fortuner-gr-sport",
      category: "Gagah & Prestisius (SUV)",
      price: 1100000,
      pricePrefix: "Mulai dari",
      description: "SUV tangguh bertenaga besar untuk perjalanan prestisius, pengawalan rombongan, atau menjelajahi kontur jalanan perbukitan Bandung.",
      imageUrl: "/assets/templates/rental/fortuner-gr.webp",
      images: ["/assets/templates/rental/fortuner-gr.webp"],
      isFeatured: true,
      orderIndex: 3,
      specsJson: {
        seats: "7 Kursi",
        transmission: "6-Speed Automatic",
        fuelType: "Diesel Turbo (Solar)",
        year: "2023 - 2024",
        price12h: "Rp 950.000",
        price24h: "Rp 1.100.000",
        priceWithDriver: "Rp 1.350.000",
        features: ["Kamera 360", "Power Backdoor", "Jok Kulit Mewah", "Mesin 2.8L Powerful"]
      },
    },
    {
      title: "Toyota Hiace Premio Luxury",
      slug: "toyota-hiace-premio",
      category: "Rombongan & Wisata (14 Seat)",
      price: 1350000,
      pricePrefix: "Mulai dari",
      description: "Microbus premium untuk rombongan wisata keluarga besar atau instansi kantor. Legroom luas, jok empuk, dan AC sejuk merata.",
      imageUrl: "/assets/templates/rental/hiace-premio.webp",
      images: ["/assets/templates/rental/hiace-premio.webp"],
      isFeatured: true,
      orderIndex: 4,
      specsJson: {
        seats: "14 Kursi",
        transmission: "Manual 6-Speed",
        fuelType: "Diesel Turbo",
        year: "2023",
        price12h: "Rp 1.150.000",
        price24h: "Rp 1.350.000",
        priceWithDriver: "Rp 1.350.000 (Inc Driver)",
        features: ["Audio Karaoke", "Port USB Tiap Baris", "Reclining Seat", "Bagasi Rombongan Luas"]
      },
    },
    {
      title: "Honda Brio RS Urbanite",
      slug: "honda-brio-rs",
      category: "City Car Gesit & Lincah",
      price: 350000,
      pricePrefix: "Mulai dari",
      description: "Pilihan terbaik untuk keliling Kota Bandung yang padat. Mudah bermanuver dan parkir di berbagai kafe dan spot kuliner hits.",
      imageUrl: "/assets/templates/rental/brio-rs.webp",
      images: ["/assets/templates/rental/brio-rs.webp"],
      isFeatured: true,
      orderIndex: 5,
      specsJson: {
        seats: "5 Kursi",
        transmission: "CVT Automatic",
        fuelType: "Bensin (Sangat Irit)",
        year: "2023 - 2024",
        price12h: "Rp 275.000",
        price24h: "Rp 350.000",
        priceWithDriver: "Rp 500.000",
        features: ["Audio Bluetooth", "Lincah & Irit BBM", "AC Dingin", "Dual SRS Airbag"]
      },
    },
  ];

  for (const item of catalogItems2) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant2.id, slug: item.slug } },
      update: { ...item },
      create: { tenantId: tenant2.id, ...item },
    });
  }

  // Galeri Serah Terima Pelanggan Rental
  const rentalGalleries = [
    { id: "rental-gal-1", imageUrl: "/assets/templates/rental/rental-client-1.webp", caption: "Serah terima Innova Zenix ke Ibu Ratna & Keluarga di Hotel Trans Luxury Bandung", orderIndex: 0 },
    { id: "rental-gal-2", imageUrl: "/assets/templates/rental/rental-client-2.webp", caption: "Pengantaran unit All New Avanza ke Stasiun KCIC Whoosh Padalarang", orderIndex: 1 },
    { id: "rental-gal-3", imageUrl: "/assets/templates/rental/rental-client-3.webp", caption: "Rombongan reuni wisata Lembang menggunakan Toyota Hiace Premio", orderIndex: 2 },
    { id: "rental-gal-4", imageUrl: "/assets/templates/rental/rental-client-4.webp", caption: "Delivery Xpander lepas kunci ke penginapan Dago Pakar", orderIndex: 3 },
  ];

  for (const gal of rentalGalleries) {
    await prisma.galleryItem.upsert({
      where: { id: gal.id },
      update: {
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
      create: {
        id: gal.id,
        tenantId: tenant2.id,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
    });
  }

  // Testimonial Pelanggan Rental Mobil
  const rentalTestimonials = [
    {
      id: "rental-testi-1",
      tenantId: tenant2.id,
      clientName: "Bpk. Dimas Prasetyo",
      customerName: "Bpk. Dimas Prasetyo",
      clientRole: "Wisatawan Asal Jakarta",
      comment: "Layanan terbaik! Mobil Innova Zenix diantar tepat waktu saat kami tiba di Stasiun Whoosh Padalarang. Mobil bersih wangi seperti baru keluar dari showroom.",
      rating: 5,
      avatarUrl: "/assets/templates/rental/rental-client-1.webp",
    },
    {
      id: "rental-testi-2",
      tenantId: tenant2.id,
      clientName: "Ibu Shinta & Rekan",
      customerName: "Ibu Shinta & Rekan",
      clientRole: "Corporate Event Organizer",
      comment: "Sewa Hiace Premio plus driver untuk event kantor di Lembang 3 hari. Drivernya sangat sabar, hafal jalan tikus menghindari macet, dan tarif sangat terjangkau.",
      rating: 5,
      avatarUrl: "/assets/templates/rental/rental-client-2.webp",
    },
    {
      id: "rental-testi-3",
      tenantId: tenant2.id,
      clientName: "Rian Ramadhan",
      customerName: "Rian Ramadhan",
      clientRole: "Penyewa Lepas Kunci (Brio RS)",
      comment: "Proses lepas kunci sangat cepat tanpa dipersulit. Cukup kirim foto tiket kereta dan KTP langsung di-ACC. Brio-nya gesit banget keliling kulineran Bandung!",
      rating: 5,
      avatarUrl: "/assets/templates/rental/rental-client-3.webp",
    },
  ];

  for (const item of rentalTestimonials) {
    try {
      await prisma.testimonial.upsert({
        where: { id: item.id },
        update: {
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
        create: {
          id: item.id,
          tenantId: item.tenantId,
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
      });
    } catch {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Testimonial" ("id", "tenantId", "clientName", "customerName", "clientRole", "comment", "rating", "avatarUrl", "createdAt")
        VALUES ($1, $2, $3, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT ("id") DO UPDATE 
        SET "clientName" = EXCLUDED."clientName",
            "comment" = EXCLUDED."comment",
            "rating" = EXCLUDED."rating";
      `, item.id, item.tenantId, item.clientName, item.clientRole, item.comment, item.rating, item.avatarUrl);
    }
  }

  console.log("✅ Tenant 2 (Rental):", tenant2.customDomain);

  // 5. DUMMY TENANT 3: properti-bandung.com (Grand Ciganitri Regency - Property)
  const tenant3 = await prisma.tenant.upsert({
    where: { customDomain: "properti-bandung.com" },
    update: {
      businessName: "Grand Ciganitri Regency - Bandung",
      heroTitle: "Hunian Modern Tropis Premium di Bandung Selatan",
      heroSubtitle: "Lokasi strategis 10 menit dari Tol Buah Batu & Telkom University. Dapatkan promo DP 0%, Free Biaya KPR, dan Sertifikat SHM!",
      heroBannerUrl: "/assets/templates/property/hero-property.webp",
      logoUrl: "/assets/templates/property/agent-profile.webp",
      themeColor: "#b45309", // Warm Amber / Bronze Luxury
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9744,
      longitude: 107.6322,
      address: "Jl. Terusan Buah Batu No. 88, Bojongsoang, Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Bojongsoang+Bandung",
      whatsappNumber: "62895389974414",
      contactEmail: "marketing@properti-bandung.com",
      seoTitle: "Grand Ciganitri Regency Bandung | Rumah Modern Tropis Dekat Tol Buah Batu",
      seoDescription: "Cluster perumahan modern tropis di Bandung Selatan. Promo DP 0%, bebas biaya KPR, SHM pecah, 10 menit Tol Buah Batu & Telkom University. Hubungi Riana Anggraini!",
      seoKeywords: "rumah dijual bandung, cluster buah batu, rumah dekat telkom university, rumah bojongsoang bandung, perumahan murah bandung selatan, kpr rumah bandung",
      featureFlags: {
        taglineBadge: "Exclusive Cluster & Smart Living • Hanya Tersedia 24 Unit",
        developerName: "PT Graha Mahakarya Propertindo",
        agentProfile: {
          name: "Riana Anggraini, S.Ars",
          role: "In-House Property Specialist",
          greeting: "Halo! Saya Riana, siap membantu konsultasi pemilihan kavling, perhitungan KPR bank syariah/konvensional, hingga jadwal survei lokasi."
        },
        heroHighlights: [
          { label: "Promo DP", value: "0% / Bebas Uang Muka" },
          { label: "Sertifikat", value: "SHM Sudah Pecah per Kavling" },
          { label: "Akses Tol", value: "10 Menit Gerbang Buah Batu" }
        ],
        commitments: [
          "Jaminan Bangunan Bergaransi 1 Tahun",
          "Free Kanopi, Smart Door Lock & Toren Air",
          "Dibantu Proses Akad KPR sampai Lolos 100%",
          "Legalitas Clean & Clear (IMB/PBG Lengkap)"
        ],
        facilityBadges: [
          "One Gate System & CCTV 24 Jam",
          "Clubhouse & Kolam Renang",
          "Jaringan Listrik & Fiber Optic Bawah Tanah",
          "Taman Hijau & Playground Ramah Anak"
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "properti-bandung.com",
      businessName: "Grand Ciganitri Regency - Bandung",
      categoryId: catProperti.id,
      sector: "PROPERTY",
      whatsappNumber: "62895389974414",
      contactEmail: "marketing@properti-bandung.com",
      address: "Jl. Terusan Buah Batu No. 88, Bojongsoang, Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Bojongsoang+Bandung",
      seoTitle: "Grand Ciganitri Regency Bandung | Rumah Modern Tropis Dekat Tol Buah Batu",
      seoDescription: "Cluster perumahan modern tropis di Bandung Selatan. Promo DP 0%, bebas biaya KPR, SHM pecah, 10 menit Tol Buah Batu & Telkom University. Hubungi Riana Anggraini!",
      seoKeywords: "rumah dijual bandung, cluster buah batu, rumah dekat telkom university, rumah bojongsoang bandung, perumahan murah bandung selatan, kpr rumah bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9744,
      longitude: 107.6322,
      themeColor: "#b45309",
      heroTitle: "Hunian Modern Tropis Premium di Bandung Selatan",
      heroSubtitle: "Lokasi strategis 10 menit dari Tol Buah Batu & Telkom University. Dapatkan promo DP 0%, Free Biaya KPR, dan Sertifikat SHM!",
      heroBannerUrl: "/assets/templates/property/hero-property.webp",
      logoUrl: "/assets/templates/property/agent-profile.webp",
      featureFlags: {
        taglineBadge: "Exclusive Cluster & Smart Living • Hanya Tersedia 24 Unit",
        developerName: "PT Graha Mahakarya Propertindo",
        agentProfile: {
          name: "Riana Anggraini, S.Ars",
          role: "In-House Property Specialist",
          greeting: "Halo! Saya Riana, siap membantu konsultasi pemilihan kavling, perhitungan KPR bank syariah/konvensional, hingga jadwal survei lokasi."
        },
        heroHighlights: [
          { label: "Promo DP", value: "0% / Bebas Uang Muka" },
          { label: "Sertifikat", value: "SHM Sudah Pecah per Kavling" },
          { label: "Akses Tol", value: "10 Menit Gerbang Buah Batu" }
        ],
        commitments: [
          "Jaminan Bangunan Bergaransi 1 Tahun",
          "Free Kanopi, Smart Door Lock & Toren Air",
          "Dibantu Proses Akad KPR sampai Lolos 100%",
          "Legalitas Clean & Clear (IMB/PBG Lengkap)"
        ],
        facilityBadges: [
          "One Gate System & CCTV 24 Jam",
          "Clubhouse & Kolam Renang",
          "Jaringan Listrik & Fiber Optic Bawah Tanah",
          "Taman Hijau & Playground Ramah Anak"
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.upsert({
    where: { email: "owner@properti-bandung.com" },
    update: { role: "CLIENT_SUPER_ADMIN", tenantId: tenant3.id },
    create: {
      email: "owner@properti-bandung.com",
      passwordHash: clientPasswordHash,
      name: "Riana Anggraini, S.Ars (Property Specialist)",
      role: "CLIENT_SUPER_ADMIN",
      tenantId: tenant3.id,
    },
  });

  // Katalog Unit Properti
  const catalogItems3 = [
    {
      title: "Rumah Tipe 60/84 - 2 Lantai Minimalis",
      slug: "tipe-60-84",
      category: "Rumah 2 Lantai",
      price: 650000000,
      pricePrefix: "Harga mulai",
      description: "Hunian modern tropis 2 lantai berkonsep open-space dengan pencahayaan alami maksimal, cross ventilation, dan smart home system.",
      imageUrl: "/assets/templates/property/tipe-60.webp",
      images: ["/assets/templates/property/tipe-60.webp"],
      isFeatured: true,
      orderIndex: 0,
      specsJson: {
        landArea: "84 m²",
        buildingArea: "60 m²",
        bedrooms: 3,
        bathrooms: 2,
        floors: 2,
        carport: "1 Mobil",
        electricity: "2200 VA",
        water: "Jetpump Submersible",
        monthlyInstallment: "Mulai Rp 3,8 Jt/bln",
        floorplanUrl: "/assets/templates/property/siteplan.webp"
      },
    },
    {
      title: "Rumah Tipe 90/120 - Scandinavian Modern",
      slug: "tipe-90-120",
      category: "Rumah Keluarga Favorit",
      price: 950000000,
      pricePrefix: "Harga mulai",
      description: "Fasad elegan bergaya Scandinavian dengan ruang keluarga ekstra luas, taman belakang asri, dan master bedroom ber-balkon privat.",
      imageUrl: "/assets/templates/property/tipe-90.webp",
      images: ["/assets/templates/property/tipe-90.webp"],
      isFeatured: true,
      orderIndex: 1,
      specsJson: {
        landArea: "120 m²",
        buildingArea: "90 m²",
        bedrooms: 4,
        bathrooms: 3,
        floors: 2,
        carport: "2 Mobil",
        electricity: "2200 VA",
        water: "Jetpump Submersible",
        monthlyInstallment: "Mulai Rp 5,6 Jt/bln",
        floorplanUrl: "/assets/templates/property/siteplan.webp"
      },
    },
    {
      title: "Rumah Tipe 120/150 - Luxury Family Residence",
      slug: "tipe-120-150",
      category: "Exclusive Hook / Boulevard",
      price: 1450000000,
      pricePrefix: "Harga mulai",
      description: "Hunian mewah prestisius di jalan utama cluster. Dilengkapi ruang kerja mezzanine, sanitair premium Toto, dan garasi luas.",
      imageUrl: "/assets/templates/property/tipe-120.webp",
      images: ["/assets/templates/property/tipe-120.webp"],
      isFeatured: true,
      orderIndex: 2,
      specsJson: {
        landArea: "150 m²",
        buildingArea: "120 m²",
        bedrooms: 4,
        bathrooms: 4,
        floors: 2,
        carport: "2 Mobil + Canopy",
        electricity: "3500 VA",
        water: "Jetpump Submersible",
        monthlyInstallment: "Mulai Rp 8,5 Jt/bln",
        floorplanUrl: "/assets/templates/property/siteplan.webp"
      },
    },
    {
      title: "Ruko Komersial 3 Lantai Prime Area",
      slug: "ruko-komersial-3-lantai",
      category: "Komersial & Investasi",
      price: 1850000000,
      pricePrefix: "Harga mulai",
      description: "Unit ruko komersial berhadapan langsung dengan jalan raya utama Bojongsoang. Sangat cocok untuk kafe, kantor, klinik, atau minimarket.",
      imageUrl: "/assets/templates/property/ruko-commercial.webp",
      images: ["/assets/templates/property/ruko-commercial.webp"],
      isFeatured: false,
      orderIndex: 3,
      specsJson: {
        landArea: "100 m²",
        buildingArea: "180 m²",
        bedrooms: 2,
        bathrooms: 3,
        floors: 3,
        carport: "Parkir Luas 4 Mobil",
        electricity: "4400 VA",
        water: "Jetpump Submersible",
        monthlyInstallment: "Mulai Rp 11 Jt/bln",
        floorplanUrl: "/assets/templates/property/siteplan.webp"
      },
    },
  ];

  for (const item of catalogItems3) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant3.id, slug: item.slug } },
      update: { ...item },
      create: { tenantId: tenant3.id, ...item },
    });
  }

  // Galeri Serah Terima Unit Properti
  const propertyGalleries = [
    { id: "prop-gal-1", imageUrl: "/assets/templates/property/handover-prop-1.webp", caption: "Akad KPR & Serah Terima Kunci Unit Tipe 90 kepada Bpk. Irfan di Galeri Pemasaran", orderIndex: 0 },
    { id: "prop-gal-2", imageUrl: "/assets/templates/property/handover-prop-2.webp", caption: "Kunjungan survei lokasi kavling & konsultasi layout bersama Ibu Dian & Keluarga", orderIndex: 1 },
    { id: "prop-gal-3", imageUrl: "/assets/templates/property/handover-prop-3.webp", caption: "Penyerahan Sertifikat SHM & Kunci Rumah Tipe 60 ke Pasangan Muda Bpk. Aditya", orderIndex: 2 },
    { id: "prop-gal-4", imageUrl: "/assets/templates/property/handover-prop-4.webp", caption: "Progress pembangunan fisik cluster tahap 2 terpantau rapi dan on-schedule", orderIndex: 3 },
  ];

  for (const gal of propertyGalleries) {
    await prisma.galleryItem.upsert({
      where: { id: gal.id },
      update: {
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
      create: {
        id: gal.id,
        tenantId: tenant3.id,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
    });
  }

  // Testimoni Konsumen Properti
  const propertyTestimonials = [
    {
      id: "prop-testi-1",
      tenantId: tenant3.id,
      clientName: "Bpk. Irfan Maulana",
      customerName: "Bpk. Irfan Maulana",
      clientRole: "Pembeli Tipe 90/120 - Karyawan BUMN",
      comment: "Alhamdulillah dibantu Mbak Riana dari awal pilih kavling sampai akad kredit BSI lolos tanpa kendala. Kualitas bangunan kokoh, udara sejuk, dan dekat banget ke tol Buah Batu.",
      rating: 5,
      avatarUrl: "/assets/templates/property/handover-prop-1.webp",
    },
    {
      id: "prop-testi-2",
      tenantId: tenant3.id,
      clientName: "Ibu Dian Anggraeni",
      customerName: "Ibu Dian Anggraeni",
      clientRole: "Pembeli Tipe 60/84 - Dosen Telkom University",
      comment: "Lokasi perumahan sangat strategis, cuma 7 menit ke kampus Telkom. Lingkungan aman one gate system, anak-anak nyaman main di playground cluster.",
      rating: 5,
      avatarUrl: "/assets/templates/property/handover-prop-2.webp",
    },
    {
      id: "prop-testi-3",
      tenantId: tenant3.id,
      clientName: "Bpk. Aditya Pratama & Istri",
      customerName: "Bpk. Aditya Pratama & Istri",
      clientRole: "Pembeli Tipe 120/150 - Entrepreneur",
      comment: "Desain fasad rumahnya mewah dan tidak pasaran. Sertifikat SHM sudah split langsung balik nama waktu serah terima. Investasi yang sangat memuaskan di Bandung!",
      rating: 5,
      avatarUrl: "/assets/templates/property/handover-prop-3.webp",
    },
  ];

  for (const item of propertyTestimonials) {
    try {
      await prisma.testimonial.upsert({
        where: { id: item.id },
        update: {
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
        create: {
          id: item.id,
          tenantId: item.tenantId,
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
      });
    } catch {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Testimonial" ("id", "tenantId", "clientName", "customerName", "clientRole", "comment", "rating", "avatarUrl", "createdAt")
        VALUES ($1, $2, $3, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT ("id") DO UPDATE 
        SET "clientName" = EXCLUDED."clientName",
            "comment" = EXCLUDED."comment",
            "rating" = EXCLUDED."rating";
      `, item.id, item.tenantId, item.clientName, item.clientRole, item.comment, item.rating, item.avatarUrl);
    }
  }

  console.log("✅ Tenant 3 (Property):", tenant3.customDomain);

  // 6. DUMMY TENANT 4: kuliner-kita.com (Kopi & Dapur Kuliner Kita - Bandung)
  const tenant4 = await prisma.tenant.upsert({
    where: { customDomain: "kuliner-kita.com" },
    update: {
      businessName: "Kopi & Dapur Kuliner Kita - Bandung",
      heroTitle: "Cita Rasa Autentik & Suasana Hangat di Jantung Kota Bandung",
      heroSubtitle: "Perpaduan kopi artisan pilihan, sajian hidangan nusantara modern, dan area outdoor asri untuk momen santai bersama teman dan keluarga.",
      heroBannerUrl: "/assets/templates/restaurant/hero-cafe.webp",
      logoUrl: "/assets/templates/restaurant/logo-resto.webp",
      themeColor: "#ea580c", // Terracotta Warm Orange
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9083,
      longitude: 107.6234,
      address: "Jl. Riau (LLRE Martadinata) No. 145, Cihapit, Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+LLRE+Martadinata+No.145+Bandung",
      whatsappNumber: "62895389974414",
      contactEmail: "reservasi@kuliner-kita.com",
      seoTitle: "Kopi & Dapur Kuliner Kita Bandung | Kafe & Resto Nuansa Hangat Jl. Riau",
      seoDescription: "Kafe & resto estetik di Jl. Riau Bandung. Kopi artisan single origin, steak premium, hidangan nusantara modern, dan area outdoor asri. Reservasi meja sekarang!",
      seoKeywords: "kafe bandung, resto jl riau bandung, tempat nongkrong bandung, kopi enak bandung, kuliner bandung, reservasi kafe bandung",
      featureFlags: {
        taglineBadge: "Artisanal Coffee & Modern Comfort Dining • Bandung",
        operatingHours: "Setiap Hari: 08.00 - 23.00 WIB",
        statusBadge: "Buka Sekarang • Area Parkir Luas",
        chefProfile: {
          name: "Chef Arga Wicaksana",
          role: "Executive Culinary Director",
          bio: "Menghadirkan hidangan berkualitas tinggi dengan bahan lokal segar dan sentuhan gastronomi modern."
        },
        highlights: [
          { label: "Biji Kopi", value: "100% Single Origin Arabica Jawa Barat" },
          { label: "Bahan Masakan", value: "Bahan Segar Alami Tanpa Pengawet" },
          { label: "Kapasitas", value: "Tersedia 150 Seat & Private VIP Room" }
        ],
        commitments: [
          "Tempat Higienis, Nyaman & Ramah Keluarga",
          "Wi-Fi Kecepatan Tinggi & Tersedia Stop Kontak di Setiap Meja",
          "Musholla Bersih, Area Parkir Luas & Ramah Kursi Roda",
          "Tersedia Opsi Vegetarian & Makanan Ramah Anak"
        ],
        seatingAreas: [
          "Indoor AC Bebas Asap Rokok",
          "Outdoor Garden Sejuk & Asri",
          "Meja Bar Barista",
          "Private VIP Room (Meeting/Arisan)"
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "kuliner-kita.com",
      businessName: "Kopi & Dapur Kuliner Kita - Bandung",
      categoryId: catKafe.id,
      sector: "RESTAURANT_CAFE",
      whatsappNumber: "62895389974414",
      contactEmail: "reservasi@kuliner-kita.com",
      address: "Jl. Riau (LLRE Martadinata) No. 145, Cihapit, Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+LLRE+Martadinata+No.145+Bandung",
      seoTitle: "Kopi & Dapur Kuliner Kita Bandung | Kafe & Resto Nuansa Hangat Jl. Riau",
      seoDescription: "Kafe & resto estetik di Jl. Riau Bandung. Kopi artisan single origin, steak premium, hidangan nusantara modern, dan area outdoor asri. Reservasi meja sekarang!",
      seoKeywords: "kafe bandung, resto jl riau bandung, tempat nongkrong bandung, kopi enak bandung, kuliner bandung, reservasi kafe bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9083,
      longitude: 107.6234,
      themeColor: "#ea580c",
      heroTitle: "Cita Rasa Autentik & Suasana Hangat di Jantung Kota Bandung",
      heroSubtitle: "Perpaduan kopi artisan pilihan, sajian hidangan nusantara modern, dan area outdoor asri untuk momen santai bersama teman dan keluarga.",
      heroBannerUrl: "/assets/templates/restaurant/hero-cafe.webp",
      logoUrl: "/assets/templates/restaurant/logo-resto.webp",
      featureFlags: {
        taglineBadge: "Artisanal Coffee & Modern Comfort Dining • Bandung",
        operatingHours: "Setiap Hari: 08.00 - 23.00 WIB",
        statusBadge: "Buka Sekarang • Area Parkir Luas",
        chefProfile: {
          name: "Chef Arga Wicaksana",
          role: "Executive Culinary Director",
          bio: "Menghadirkan hidangan berkualitas tinggi dengan bahan lokal segar dan sentuhan gastronomi modern."
        },
        highlights: [
          { label: "Biji Kopi", value: "100% Single Origin Arabica Jawa Barat" },
          { label: "Bahan Masakan", value: "Bahan Segar Alami Tanpa Pengawet" },
          { label: "Kapasitas", value: "Tersedia 150 Seat & Private VIP Room" }
        ],
        commitments: [
          "Tempat Higienis, Nyaman & Ramah Keluarga",
          "Wi-Fi Kecepatan Tinggi & Tersedia Stop Kontak di Setiap Meja",
          "Musholla Bersih, Area Parkir Luas & Ramah Kursi Roda",
          "Tersedia Opsi Vegetarian & Makanan Ramah Anak"
        ],
        seatingAreas: [
          "Indoor AC Bebas Asap Rokok",
          "Outdoor Garden Sejuk & Asri",
          "Meja Bar Barista",
          "Private VIP Room (Meeting/Arisan)"
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.upsert({
    where: { email: "owner@kuliner-kita.com" },
    update: { role: "CLIENT_SUPER_ADMIN", tenantId: tenant4.id },
    create: {
      email: "owner@kuliner-kita.com",
      passwordHash: clientPasswordHash,
      name: "Arga Wicaksana (Owner & Executive Chef)",
      role: "CLIENT_SUPER_ADMIN",
      tenantId: tenant4.id,
    },
  });

  // Katalog Menu Makanan & Minuman
  const catalogItems4 = [
    {
      title: "Wagyu Ribeye Steak with Truffle Herb Butter",
      slug: "wagyu-ribeye-steak",
      category: "Main Course",
      price: 185000,
      pricePrefix: "Rp",
      description: "Daging wagyu meltique pilihan dengan tingkat kematangan sempurna, disajikan dengan creamy mashed potato, sayuran panggang, dan lelehan truffle butter.",
      imageUrl: "/assets/templates/restaurant/menu-signature-steak.webp",
      images: ["/assets/templates/restaurant/menu-signature-steak.webp"],
      isFeatured: true,
      orderIndex: 0,
      specsJson: {
        category: "Main Course",
        isRecommended: true,
        spicyLevel: 0,
        calories: "620 kkal",
        preparationTime: "20 Menit",
        portion: "1 Orang (200gr)",
        tags: ["Chef's Signature", "Best Seller"]
      },
    },
    {
      title: "Signature Gula Aren Latte & Manual Brew Arabica",
      slug: "signature-artisan-coffee",
      category: "Artisan Coffee",
      price: 38000,
      pricePrefix: "Rp",
      description: "Double shot espresso biji kopi Arabica Priangan dengan racikan susu segar gurih dan sirup gula aren organik asli Jawa Barat.",
      imageUrl: "/assets/templates/restaurant/menu-artisan-coffee.webp",
      images: ["/assets/templates/restaurant/menu-artisan-coffee.webp"],
      isFeatured: true,
      orderIndex: 1,
      specsJson: {
        category: "Artisan Coffee",
        isRecommended: true,
        spicyLevel: 0,
        calories: "180 kkal",
        preparationTime: "7 Menit",
        portion: "1 Cup (Double Shot)",
        tags: ["Best Seller", "100% Arabica"]
      },
    },
    {
      title: "Creamy Truffle Mushroom Fettuccine",
      slug: "creamy-truffle-fettuccine",
      category: "Main Course",
      price: 78000,
      pricePrefix: "Rp",
      description: "Pasta fettuccine al dente berbalur saus krim truffle harum, tumisan jamur portobello segar, dan taburan keju parmesan impor.",
      imageUrl: "/assets/templates/restaurant/menu-pasta-truffle.webp",
      images: ["/assets/templates/restaurant/menu-pasta-truffle.webp"],
      isFeatured: true,
      orderIndex: 2,
      specsJson: {
        category: "Main Course",
        isRecommended: true,
        spicyLevel: 0,
        calories: "510 kkal",
        preparationTime: "15 Menit",
        portion: "1-2 Orang",
        tags: ["Chef's Signature", "Vegetarian Friendly"]
      },
    },
    {
      title: "Artisanal Almond Butter Croissant",
      slug: "artisan-almond-croissant",
      category: "Pastry & Bakery",
      price: 35000,
      pricePrefix: "Rp",
      description: "Pastry croissant berlapis renyah dengan isian almond cream lembut dan taburan almond slice panggang wangi. Dipanggang fresh setiap pagi.",
      imageUrl: "/assets/templates/restaurant/menu-artisan-croissant.webp",
      images: ["/assets/templates/restaurant/menu-artisan-croissant.webp"],
      isFeatured: false,
      orderIndex: 3,
      specsJson: {
        category: "Pastry & Bakery",
        isRecommended: false,
        spicyLevel: 0,
        calories: "320 kkal",
        preparationTime: "5 Menit",
        portion: "1 Pcs",
        tags: ["Freshly Baked Daily"]
      },
    },
    {
      title: "Wild Berry Sparkling Basil Mocktail",
      slug: "wild-berry-sparkling-mocktail",
      category: "Refreshing Drinks",
      price: 42000,
      pricePrefix: "Rp",
      description: "Kombinasi puree buah berry liar, perasan lemon segar, daun basil aromatik, dan soda dingin yang membangkitkan kesegaran dahaga.",
      imageUrl: "/assets/templates/restaurant/menu-mocktail-berry.webp",
      images: ["/assets/templates/restaurant/menu-mocktail-berry.webp"],
      isFeatured: true,
      orderIndex: 4,
      specsJson: {
        category: "Refreshing Drinks",
        isRecommended: true,
        spicyLevel: 0,
        calories: "120 kkal",
        preparationTime: "5 Menit",
        portion: "1 Glass (350ml)",
        tags: ["House Favorite", "Refreshing"]
      },
    },
    {
      title: "Dendeng Batokok Sambal Ijo Rice Bowl",
      slug: "dendeng-batokok-rice-bowl",
      category: "Main Course",
      price: 65000,
      pricePrefix: "Rp",
      description: "Daging sapi tipis gurih dengan sambal ijo khas Minang segar, disajikan di atas nasi putih pulen hangat, telur mata sapi, dan kerupuk kulit.",
      imageUrl: "/assets/templates/restaurant/menu-rice-bowl.webp",
      images: ["/assets/templates/restaurant/menu-rice-bowl.webp"],
      isFeatured: true,
      orderIndex: 5,
      specsJson: {
        category: "Main Course",
        isRecommended: true,
        spicyLevel: 2,
        calories: "580 kkal",
        preparationTime: "15 Menit",
        portion: "1 Porsi Kenyang",
        tags: ["Nusantara Favorite", "Spicy"]
      },
    },
  ];

  for (const item of catalogItems4) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant4.id, slug: item.slug } },
      update: { ...item },
      create: { tenantId: tenant4.id, ...item },
    });
  }

  // Galeri Suasana Resto & Kafe
  const restoGalleries = [
    { id: "resto-gal-1", imageUrl: "/assets/templates/restaurant/ambience-1.webp", caption: "Suasana hangat indoor dining area dengan pencahayaan temaram yang nyaman", orderIndex: 0 },
    { id: "resto-gal-2", imageUrl: "/assets/templates/restaurant/ambience-2.webp", caption: "Area outdoor garden asri, favorit untuk ngopi sore dan menikmati angin sejuk Bandung", orderIndex: 1 },
    { id: "resto-gal-3", imageUrl: "/assets/templates/restaurant/ambience-3.webp", caption: "Open bar barista & live coffee brewing pengalaman interaktif aroma kopi segar", orderIndex: 2 },
    { id: "resto-gal-4", imageUrl: "/assets/templates/restaurant/ambience-4.webp", caption: "Momen hangat kumpul keluarga, arisan dan perayaan ulang tahun di VIP dining", orderIndex: 3 },
  ];

  for (const gal of restoGalleries) {
    await prisma.galleryItem.upsert({
      where: { id: gal.id },
      update: {
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
      create: {
        id: gal.id,
        tenantId: tenant4.id,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
    });
  }

  // Testimoni Pelanggan & Foodies
  const restoTestimonials = [
    {
      id: "resto-testi-1",
      tenantId: tenant4.id,
      clientName: "Bpk. Kevin Sanjaya",
      customerName: "Bpk. Kevin Sanjaya",
      clientRole: "Food Blogger Bandung",
      comment: "Steak wagyu-nya luar biasa empuk dan saus truffle butter-nya sangat kaya rasa! Tempatnya asri di Jl. Riau, pas banget buat dinner romantis atau santai bareng teman.",
      rating: 5,
      avatarUrl: "/assets/templates/restaurant/ambience-1.webp",
    },
    {
      id: "resto-testi-2",
      tenantId: tenant4.id,
      clientName: "Ibu Nadia Tamara",
      customerName: "Ibu Nadia Tamara",
      clientRole: "Penyelenggara Event Komunitas",
      comment: "Reservasi VIP room untuk private gathering 20 orang dilayani dengan sangat sigap. Wi-Fi cepat, pelayanan ramah, dan kopi gula arennya nagih banget.",
      rating: 5,
      avatarUrl: "/assets/templates/restaurant/ambience-2.webp",
    },
    {
      id: "resto-testi-3",
      tenantId: tenant4.id,
      clientName: "Dimas & Sarah",
      customerName: "Dimas & Sarah",
      clientRole: "Pengunjung Setia Weekend",
      comment: "Kafe favorit kalau lagi ke Bandung. Suasana outdoor tamannya adem, croissant freshly baked setiap pagi, dan parkirannya lega. Sangat recommended!",
      rating: 5,
      avatarUrl: "/assets/templates/restaurant/ambience-3.webp",
    },
  ];

  for (const item of restoTestimonials) {
    try {
      await prisma.testimonial.upsert({
        where: { id: item.id },
        update: {
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
        create: {
          id: item.id,
          tenantId: item.tenantId,
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
      });
    } catch {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Testimonial" ("id", "tenantId", "clientName", "customerName", "clientRole", "comment", "rating", "avatarUrl", "createdAt")
        VALUES ($1, $2, $3, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT ("id") DO UPDATE 
        SET "clientName" = EXCLUDED."clientName",
            "comment" = EXCLUDED."comment",
            "rating" = EXCLUDED."rating";
      `, item.id, item.tenantId, item.clientName, item.clientRole, item.comment, item.rating, item.avatarUrl);
    }
  }

  console.log("✅ Tenant 4 (Cafe & Resto):", tenant4.customDomain);

  // 7. DUMMY TENANT 5: jasaprofesional.com (Bastian Clean & Care - Premium Laundry Bandung)
  const tenant5 = await prisma.tenant.upsert({
    where: { customDomain: "jasaprofesional.com" },
    update: {
      businessName: "Bastian Clean & Care - Premium Laundry Bandung",
      heroTitle: "Jasa Laundry Kiloan & Satuan Premium dengan Layanan Antar Jemput Gratis",
      heroSubtitle: "Pakaian bersih higienis, wangi tahan lama, dan disetrika uap rapi. Standar 1 Mesin 1 Pelanggan tanpa risiko tertukar atau luntur!",
      heroBannerUrl: "/assets/templates/laundry/hero-laundry.webp",
      logoUrl: "/assets/templates/laundry/logo-laundry.webp",
      themeColor: "#0284c7", // Sky Blue Fresh
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.8856,
      longitude: 107.6142,
      address: "Jl. Dago (Ir. H. Djuanda) No. 92, Coblong, Kota Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+Ir.+H.+Djuanda+No.92+Bandung",
      whatsappNumber: "62895389974414",
      contactEmail: "care@jasaprofesional.com",
      seoTitle: "Bastian Clean & Care Bandung | Jasa Laundry Kiloan & Satuan Antar Jemput",
      seoDescription: "Jasa laundry kiloan & dry cleaning satuan premium di Dago Bandung. 1 mesin 1 pelanggan, setrika uap boiler, gratis antar jemput radius 5 KM. Pesan sekarang!",
      seoKeywords: "laundry bandung, laundry kiloan dago, dry cleaning bandung, cuci sepatu bandung, laundry express bandung, antar jemput laundry bandung",
      featureFlags: {
        taglineBadge: "Layanan Antar Jemput Laundry Bandung • Gratis Ongkir Radius 5 KM",
        operatingHours: "Setiap Hari: 07.30 - 20.00 WIB",
        statusBadge: "Kurir Pickup Aktif Hari Ini: 07.30 - 20.00 WIB",
        serviceHighlights: [
          { label: "Higienis Terjamin", value: "1 Mesin Cuci Khusus 1 Pelanggan (Tidak Dicampur)" },
          { label: "Setrika Uap", value: "Setrika Uap Boiler (Pakaian Tidak Mengkilap & Rapi)" },
          { label: "Deterjen Khusus", value: "Deterjen Ramah Serat Kain & Parfum Grade Premium" }
        ],
        commitments: [
          "Jaminan Garansi Cuci Ulang Jika Kurang Bersih / Harum",
          "Timbangan Digital Akurat dan Transparan",
          "Pemisahan Bahan Sensitif (Batik, Sutra, Wol)",
          "Gratis Antar Jemput Wilayah Bandung Kota"
        ],
        processSteps: [
          { step: "01", title: "Pesan & Jadwalkan Pickup", desc: "Isi form online atau chat WA, kurir kami jemput ke rumah, kos, atau kantor Anda." },
          { step: "02", title: "Sortir & Timbang Digital", desc: "Pakaian dicek kondisi noda dan ditimbang transparan di hadapan Anda / via video." },
          { step: "03", title: "Cuci Higienis & Uap Boiler", desc: "Dicuci tersendiri menggunakan mesin komersial dan disetrika uap profesional." },
          { step: "04", title: "Packing Rapi & Diantar Balik", desc: "Dipacking plastik kedap wangi dan langsung diantar kembali tepat waktu." }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "jasaprofesional.com",
      businessName: "Bastian Clean & Care - Premium Laundry Bandung",
      categoryId: catJasa.id,
      sector: "GENERAL_SERVICE",
      whatsappNumber: "62895389974414",
      contactEmail: "care@jasaprofesional.com",
      address: "Jl. Dago (Ir. H. Djuanda) No. 92, Coblong, Kota Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Jl.+Ir.+H.+Djuanda+No.92+Bandung",
      seoTitle: "Bastian Clean & Care Bandung | Jasa Laundry Kiloan & Satuan Antar Jemput",
      seoDescription: "Jasa laundry kiloan & dry cleaning satuan premium di Dago Bandung. 1 mesin 1 pelanggan, setrika uap boiler, gratis antar jemput radius 5 KM. Pesan sekarang!",
      seoKeywords: "laundry bandung, laundry kiloan dago, dry cleaning bandung, cuci sepatu bandung, laundry express bandung, antar jemput laundry bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.8856,
      longitude: 107.6142,
      themeColor: "#0284c7",
      heroTitle: "Jasa Laundry Kiloan & Satuan Premium dengan Layanan Antar Jemput Gratis",
      heroSubtitle: "Pakaian bersih higienis, wangi tahan lama, dan disetrika uap rapi. Standar 1 Mesin 1 Pelanggan tanpa risiko tertukar atau luntur!",
      heroBannerUrl: "/assets/templates/laundry/hero-laundry.webp",
      logoUrl: "/assets/templates/laundry/logo-laundry.webp",
      featureFlags: {
        taglineBadge: "Layanan Antar Jemput Laundry Bandung • Gratis Ongkir Radius 5 KM",
        operatingHours: "Setiap Hari: 07.30 - 20.00 WIB",
        statusBadge: "Kurir Pickup Aktif Hari Ini: 07.30 - 20.00 WIB",
        serviceHighlights: [
          { label: "Higienis Terjamin", value: "1 Mesin Cuci Khusus 1 Pelanggan (Tidak Dicampur)" },
          { label: "Setrika Uap", value: "Setrika Uap Boiler (Pakaian Tidak Mengkilap & Rapi)" },
          { label: "Deterjen Khusus", value: "Deterjen Ramah Serat Kain & Parfum Grade Premium" }
        ],
        commitments: [
          "Jaminan Garansi Cuci Ulang Jika Kurang Bersih / Harum",
          "Timbangan Digital Akurat dan Transparan",
          "Pemisahan Bahan Sensitif (Batik, Sutra, Wol)",
          "Gratis Antar Jemput Wilayah Bandung Kota"
        ],
        processSteps: [
          { step: "01", title: "Pesan & Jadwalkan Pickup", desc: "Isi form online atau chat WA, kurir kami jemput ke rumah, kos, atau kantor Anda." },
          { step: "02", title: "Sortir & Timbang Digital", desc: "Pakaian dicek kondisi noda dan ditimbang transparan di hadapan Anda / via video." },
          { step: "03", title: "Cuci Higienis & Uap Boiler", desc: "Dicuci tersendiri menggunakan mesin komersial dan disetrika uap profesional." },
          { step: "04", title: "Packing Rapi & Diantar Balik", desc: "Dipacking plastik kedap wangi dan langsung diantar kembali tepat waktu." }
        ]
      },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.user.upsert({
    where: { email: "owner@jasaprofesional.com" },
    update: { role: "CLIENT_SUPER_ADMIN", tenantId: tenant5.id },
    create: {
      email: "owner@jasaprofesional.com",
      passwordHash: clientPasswordHash,
      name: "Bastian Pratama (Laundry Owner)",
      role: "CLIENT_SUPER_ADMIN",
      tenantId: tenant5.id,
    },
  });

  // Katalog Layanan Laundry & Dry Cleaning
  const catalogItems5 = [
    {
      title: "Cuci Komplit Kiloan Premium",
      slug: "cuci-komplit-kiloan-premium",
      category: "Kiloan Reguler",
      price: 8000,
      pricePrefix: "Mulai",
      description: "Pakaian dicuci bersih, wangi, dan disetrika uap rapi. Standar 1 mesin 1 nota pelanggan tanpa risiko tertukar.",
      imageUrl: "/assets/templates/laundry/service-kiloan.webp",
      images: ["/assets/templates/laundry/service-kiloan.webp"],
      isFeatured: true,
      orderIndex: 0,
      specsJson: {
        duration: "2 Hari Kerja",
        unitType: "Per Kg (Min. 3 Kg)",
        includes: ["Cuci Bersih 1 Mesin 1 Nota", "Deterjen Antibakteri", "Setrika Uap Boiler", "Packing Plastik Rapi"],
        isExpressAvailable: true
      },
    },
    {
      title: "Cuci Kering Setrika Kilat 6 Jam Express",
      slug: "cuci-express-kilat-6-jam",
      category: "Kiloan Express",
      price: 15000,
      pricePrefix: "Mulai",
      description: "Layanan cuci kilat selesai dalam 6 jam. Sangat cocok untuk kebutuhan mendesak, seragam kerja, atau pakaian bepergian.",
      imageUrl: "/assets/templates/laundry/service-express.webp",
      images: ["/assets/templates/laundry/service-express.webp"],
      isFeatured: true,
      orderIndex: 1,
      specsJson: {
        duration: "6 Jam Siap Pakai",
        unitType: "Per Kg",
        includes: ["Prioritas Mesin Mandiri", "Deterjen Grade A", "Setrika Uap Cepat", "Kurir Antar Langsung"],
        isExpressAvailable: true
      },
    },
    {
      title: "Cuci Satuan Jas, Blazer & Gaun Pesta",
      slug: "cuci-satuan-jas-blazer-gaun",
      category: "Satuan Eksklusif",
      price: 35000,
      pricePrefix: "Mulai",
      description: "Perawatan pakaian formal dengan teknik dry clean presisi menjaga bentuk dan struktur kain pakaian berharga Anda.",
      imageUrl: "/assets/templates/laundry/service-satuan.webp",
      images: ["/assets/templates/laundry/service-satuan.webp"],
      isFeatured: true,
      orderIndex: 2,
      specsJson: {
        duration: "2 - 3 Hari Kerja",
        unitType: "Per Pcs",
        includes: ["Dry Cleaning Khusus", "Anti Kusut & Serat Terawat", "Hanger + Cover Jas Pelindung", "Formulir Cek Detail Noda"],
        isExpressAvailable: true
      },
    },
    {
      title: "Treatment Deep Clean Sepatu & Sneakers",
      slug: "treatment-cuci-sepatu-sneakers",
      category: "Sepatu & Tas",
      price: 40000,
      pricePrefix: "Mulai",
      description: "Pembersihan menyeluruh noda membandel pada upper, midsole, dan insole sepatu sneakers, kulit, atau suede.",
      imageUrl: "/assets/templates/laundry/service-shoes.webp",
      images: ["/assets/templates/laundry/service-shoes.webp"],
      isFeatured: false,
      orderIndex: 3,
      specsJson: {
        duration: "2 Hari Kerja",
        unitType: "Per Pasang",
        includes: ["Deep Clean Upper & Outsole", "Shampoo Khusus Material Sepatu", "Anti-Bacterial Spray", "Pengeringan UV Khusus"],
        isExpressAvailable: false
      },
    },
    {
      title: "Cuci Bed Cover & Selimut King Size",
      slug: "cuci-bed-cover-selimut-king",
      category: "Bedding & Karpet",
      price: 30000,
      pricePrefix: "Mulai",
      description: "Pencucian menggunakan mesin drum besar kapasitas 20 Kg. Tungau, debu, dan bau apek hilang maksimal.",
      imageUrl: "/assets/templates/laundry/service-bedding.webp",
      images: ["/assets/templates/laundry/service-bedding.webp"],
      isFeatured: true,
      orderIndex: 4,
      specsJson: {
        duration: "2 Hari Kerja",
        unitType: "Per Pcs",
        includes: ["Mesin Kapasitas Besar 20 Kg", "Tungau & Bakteri Hilang", "Parfum Tahan 14 Hari", "Packing Tas Bed Cover Bersih"],
        isExpressAvailable: true
      },
    },
    {
      title: "Cuci Karpet Tebal Rumah / Masjid",
      slug: "cuci-karpet-tebal",
      category: "Bedding & Karpet",
      price: 15000,
      pricePrefix: "Mulai",
      description: "Pencucian karpet menggunakan hydro vacuum dan mesin polisher karpet profesional. Bebas lembap dan wangi segar.",
      imageUrl: "/assets/templates/laundry/service-bedding.webp",
      images: ["/assets/templates/laundry/service-bedding.webp"],
      isFeatured: false,
      orderIndex: 5,
      specsJson: {
        duration: "3 Hari Kerja",
        unitType: "Per Meter",
        includes: ["Penyedotan Debu Hydro Vacuum", "Pencucian Polisher Khusus", "Pengering Spinner Cepat Kering", "Aroma Kasturi / Floral"],
        isExpressAvailable: false
      },
    },
  ];

  for (const item of catalogItems5) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant5.id, slug: item.slug } },
      update: { ...item },
      create: { tenantId: tenant5.id, ...item },
    });
  }

  // Galeri Workshop & Higienitas Laundry
  const laundryGalleries = [
    { id: "laundry-gal-1", imageUrl: "/assets/templates/laundry/process-1.webp", caption: "Penimbangan pakaian menggunakan timbangan digital akurat di hadapan pelanggan", orderIndex: 0 },
    { id: "laundry-gal-2", imageUrl: "/assets/templates/laundry/process-2.webp", caption: "Proses pencucian higienis standar 1 mesin cuci khusus 1 pelanggan tidak dicampur", orderIndex: 1 },
    { id: "laundry-gal-3", imageUrl: "/assets/templates/laundry/process-3.webp", caption: "Penyetrikaan uap boiler profesional agar pakaian rapi mulus tanpa merusak serat kain", orderIndex: 2 },
    { id: "laundry-gal-4", imageUrl: "/assets/templates/laundry/process-4.webp", caption: "Quality control dan packing plastik tebal tersegel wangi siap diantar kurir ke rumah", orderIndex: 3 },
  ];

  for (const gal of laundryGalleries) {
    await prisma.galleryItem.upsert({
      where: { id: gal.id },
      update: {
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
      create: {
        id: gal.id,
        tenantId: tenant5.id,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        orderIndex: gal.orderIndex,
      },
    });
  }

  // Testimoni Pelanggan Laundry
  const laundryTestimonials = [
    {
      id: "laundry-testi-1",
      tenantId: tenant5.id,
      clientName: "Ibu Rina Setyowati",
      customerName: "Ibu Rina Setyowati",
      clientRole: "Ibu Rumah Tangga - Dago Atas",
      comment: "Sudah langganan 6 bulan untuk kiloan dan bed cover. Pakaian selalu rapi, wangi tahan lama, dan kurirnya on time banget waktu ambil dan antar cucian.",
      rating: 5,
      avatarUrl: "/assets/templates/laundry/process-1.webp",
    },
    {
      id: "laundry-testi-2",
      tenantId: tenant5.id,
      clientName: "Fajar Nugraha",
      customerName: "Fajar Nugraha",
      clientRole: "Mahasiswa ITB - Tubagus Ismail",
      comment: "Fitur pickup-nya ngebantu banget pas lagi hectic tugas akhir. Cuci kilat 6 jam beneran kelar dan kemeja jas presentasi sidang disetrika rapi licin!",
      rating: 5,
      avatarUrl: "/assets/templates/laundry/process-2.webp",
    },
    {
      id: "laundry-testi-3",
      tenantId: tenant5.id,
      clientName: "dr. Hendra Wijaya",
      customerName: "dr. Hendra Wijaya",
      clientRole: "Dokter Spesialis - Pasteur",
      comment: "Sneakers putih saya yang kusam bisa balik kinclong lagi. Pemisahan baju kerja dan pakaian pribadi sangat higienis. Sangat recomended!",
      rating: 5,
      avatarUrl: "/assets/templates/laundry/process-3.webp",
    },
  ];

  for (const item of laundryTestimonials) {
    try {
      await prisma.testimonial.upsert({
        where: { id: item.id },
        update: {
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
        create: {
          id: item.id,
          tenantId: item.tenantId,
          clientName: item.clientName,
          clientRole: item.clientRole,
          comment: item.comment,
          rating: item.rating,
          avatarUrl: item.avatarUrl,
        },
      });
    } catch {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Testimonial" ("id", "tenantId", "clientName", "customerName", "clientRole", "comment", "rating", "avatarUrl", "createdAt")
        VALUES ($1, $2, $3, $3, $4, $5, $6, $7, NOW())
        ON CONFLICT ("id") DO UPDATE 
        SET "clientName" = EXCLUDED."clientName",
            "comment" = EXCLUDED."comment",
            "rating" = EXCLUDED."rating";
      `, item.id, item.tenantId, item.clientName, item.clientRole, item.comment, item.rating, item.avatarUrl);
    }
  }

  console.log("✅ Tenant 5 (Laundry):", tenant5.customDomain);

  console.log("\n🎉 Seeding selesai dengan Granular RBAC!");
  console.log("📋 Kredensial Login:");
  console.log("   - Super Admin: superadmin@etalase.online / admin123!");
  console.log("   - Operasional: admin@etalase.online / admin123!");
  console.log("   - Finance    : finance@etalase.online / admin123!");
  console.log("   - Technical  : tech@etalase.online / admin123!");
  console.log("   - Marketing  : marketing@etalase.online / admin123!");
  console.log("   - Owner Mobil: owner@bastian-sales.com / client123!");
  console.log("   - Staf Mobil : staff@bastian-sales.com / client123!");
  console.log("   - Owner Sewa : owner@bastian-rental.com / client123!");
  console.log("   - Owner Rumah: owner@properti-bandung.com / client123!");
  console.log("   - Owner Resto: owner@kuliner-kita.com / client123!");
  console.log("   - Owner Jasa : owner@jasaprofesional.com / client123!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
