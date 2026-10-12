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
      "whatsappNumber" TEXT NOT NULL DEFAULT '6281234567890',
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
    `ALTER TABLE "Tenant" ADD COLUMN IF NOT EXISTS "whatsappNumber" TEXT NOT NULL DEFAULT '6281234567890';`,
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
  ]);

  const [catMobil, catProperti, catRental, catKafe] = categories;

  // 3. DUMMY TENANT 1: bastian-sales.com (Chery & Jaecoo Bandung)
  const tenant1 = await prisma.tenant.upsert({
    where: { customDomain: "bastian-sales.com" },
    update: {
      businessName: "Bastian - Sales Resmi Chery & Jaecoo Bandung",
      address: "Dealer Resmi Chery Bandung, Jl. Soekarno Hatta No. 500, Bandung",
      whatsappNumber: "6281234567890",
      contactEmail: "bastian@bastian-sales.com",
      seoTitle: "Promo Mobil Chery & Jaecoo Bandung | DP Ringan & Bunga 0% - Bastian",
      seoDescription: "Dealer resmi Chery & Jaecoo Bandung. Dapatkan promo DP mulai 25 Juta, diskon spesial, test drive ke rumah, dan approval leasing 100%. Hubungi Bastian!",
      seoKeywords: "chery bandung, jaecoo bandung, promo omoda 5 bandung, kredit chery bandung, sales chery bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9458,
      longitude: 107.6385,
      themeColor: "#b91c1c", // Chery / Luxury Red
      heroTitle: "Promo Spesial Mobil Baru Bandung - DP Ringan, Bunga 0%, & Proses Tercepat!",
      heroSubtitle: "Dealer Resmi Chery & Jaecoo Wilayah Bandung & Jawa Barat. Unit Ready Stock, Test Drive ke Rumah Anda & Tukar Tambah Semua Merk.",
      heroBannerUrl: "/assets/templates/automotive/chery-omoda-5.webp",
      logoUrl: "/assets/templates/automotive/sales-profile.webp",
      featureFlags: { showInstallmentSimulator: true, showGallery: true },
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    },
    create: {
      customDomain: "bastian-sales.com",
      businessName: "Bastian - Sales Resmi Chery & Jaecoo Bandung",
      categoryId: catMobil.id,
      sector: "AUTOMOTIVE",
      whatsappNumber: "6281234567890",
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
      themeColor: "#b91c1c",
      heroTitle: "Promo Spesial Mobil Baru Bandung - DP Ringan, Bunga 0%, & Proses Tercepat!",
      heroSubtitle: "Dealer Resmi Chery & Jaecoo Wilayah Bandung & Jawa Barat. Unit Ready Stock, Test Drive ke Rumah Anda & Tukar Tambah Semua Merk.",
      heroBannerUrl: "/assets/templates/automotive/chery-omoda-5.webp",
      logoUrl: "/assets/templates/automotive/sales-profile.webp",
      featureFlags: { showInstallmentSimulator: true, showGallery: true },
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

  // 4. DUMMY TENANT 2: bastian-rental.com
  const tenant2 = await prisma.tenant.upsert({
    where: { customDomain: "bastian-rental.com" },
    update: {},
    create: {
      customDomain: "bastian-rental.com",
      businessName: "Bastian Rental Bandung",
      categoryId: catRental.id,
      sector: "RENTAL",
      whatsappNumber: "6289876543210",
      contactEmail: "rental@bastian-rental.com",
      address: "Jl. Raya Lembang No. 45, Bandung, Jawa Barat",
      seoTitle: "Bastian Rental Mobil Bandung | Harga Terjangkau, Armada Lengkap",
      seoDescription: "Sewa mobil di Bandung dengan harga terjangkau. Tersedia rental harian dan bulanan. Hubungi kami sekarang!",
      seoKeywords: "rental mobil bandung, sewa mobil bandung, rental harian bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.8215,
      longitude: 107.6098,
      themeColor: "#7c3aed",
      heroTitle: "Rental Mobil Bandung Terpercaya",
      heroSubtitle: "Armada lengkap, harga transparan, siap antar jemput. Booking mudah via WhatsApp!",
      heroBannerUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200",
      featureFlags: { showRentalCalendar: true },
      isActive: true,
      expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
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

  const catalogItems2 = [
    {
      title: "Toyota Fortuner VRZ",
      slug: "toyota-fortuner-vrz",
      category: "SUV",
      price: 800000,
      pricePrefix: "Tarif Harian",
      description: "SUV premium untuk perjalanan nyaman dan prestisius.",
      imageUrl: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600",
      images: [],
      isFeatured: true,
      specsJson: { Kapasitas: "7 Penumpang", Transmisi: "AT", BBM: "Solar" },
    },
  ];

  for (const item of catalogItems2) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant2.id, slug: item.slug } },
      update: {},
      create: { tenantId: tenant2.id, ...item },
    });
  }

  console.log("✅ Tenant 2 (Rental):", tenant2.customDomain);

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
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
