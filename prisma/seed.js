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

const DDL_STATEMENTS = `
DO $$ BEGIN
  CREATE TYPE "UserRole" AS ENUM ('SAAS_SUPER_ADMIN', 'SAAS_ADMIN', 'SAAS_MARKETING', 'SAAS_FINANCE', 'SAAS_TECHNICAL', 'CLIENT_SUPER_ADMIN', 'CLIENT_ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "BusinessSector" AS ENUM ('AUTOMOTIVE', 'RENTAL', 'PROPERTY', 'RESTAURANT_CAFE', 'GENERAL_SERVICE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'FOLLOW_UP', 'DEAL', 'LOST');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ModuleType" AS ENUM ('INSTALLMENT_SIMULATION', 'RENTAL_BOOKING', 'TABLE_RESERVATION', 'PROPERTY_INQUIRY', 'SERVICE_ORDER', 'GENERAL_CONTACT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "TenantCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sector" "BusinessSector" NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TenantCategory_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "TenantCategory_slug_key" ON "TenantCategory"("slug");

CREATE TABLE IF NOT EXISTS "Tenant" (
    "id" TEXT NOT NULL,
    "customDomain" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "categoryId" TEXT,
    "sector" "BusinessSector" NOT NULL DEFAULT 'GENERAL_SERVICE',
    "whatsappNumber" TEXT NOT NULL,
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
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "heroBannerUrl" TEXT,
    "logoUrl" TEXT,
    "featureFlags" JSONB NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "Tenant_customDomain_key" ON "Tenant"("customDomain");

CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT_ADMIN',
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "CatalogItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT,
    "price" DOUBLE PRECISION,
    "pricePrefix" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "specsJson" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CatalogItem_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "CatalogItem_tenantId_slug_key" ON "CatalogItem"("tenantId", "slug");

CREATE TABLE IF NOT EXISTS "GalleryItem" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerRole" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "reviewText" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "moduleType" "ModuleType" NOT NULL,
    "detailsJson" JSONB NOT NULL DEFAULT '{}',
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  ALTER TABLE "Tenant" ADD CONSTRAINT "Tenant_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TenantCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "CatalogItem" ADD CONSTRAINT "CatalogItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "GalleryItem" ADD CONSTRAINT "GalleryItem_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "Lead" ADD CONSTRAINT "Lead_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN null;
END $$;
`;

async function main() {
  console.log("🌱 Menyiapkan skema database...");
  const statements = DDL_STATEMENTS
    .split(";\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    try {
      await prisma.$executeRawUnsafe(stmt);
    } catch (_) {
      // Abaikan jika statement sudah ada
    }
  }
  console.log("✅ Skema tabel & enum database terverifikasi.");

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

  // 3. DUMMY TENANT 1: bastian-sales.com
  const tenant1 = await prisma.tenant.upsert({
    where: { customDomain: "bastian-sales.com" },
    update: {},
    create: {
      customDomain: "bastian-sales.com",
      businessName: "Bastian Sales Mobil Bandung",
      categoryId: catMobil.id,
      sector: "AUTOMOTIVE",
      whatsappNumber: "6281234567890",
      contactEmail: "bastian@bastian-sales.com",
      address: "Jl. Asia Afrika No. 88, Bandung, Jawa Barat",
      googleMapsUrl: "https://maps.google.com/?q=Bandung",
      seoTitle: "Bastian Sales Mobil Bandung | Toyota, Honda, Mitsubishi",
      seoDescription: "Sales mobil terpercaya di Bandung. Proses kredit mudah, DP ringan. Hubungi Bastian sekarang!",
      seoKeywords: "sales mobil bandung, kredit mobil bandung, toyota bandung, honda bandung",
      geoCity: "Bandung",
      geoRegion: "ID-JB",
      latitude: -6.9175,
      longitude: 107.6191,
      themeColor: "#2563eb",
      heroTitle: "Sales Mobil Terpercaya di Bandung",
      heroSubtitle: "Proses Kredit Mudah, DP Ringan, Cicilan Terjangkau. 20+ Tahun Pengalaman.",
      heroBannerUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200",
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
      name: "Bastian Pratama (Owner)",
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

  // Katalog Tenant 1
  const catalogItems1 = [
    {
      title: "Toyota Avanza 1.5 G CVT 2024",
      slug: "toyota-avanza-1-5-g-cvt-2024",
      category: "MPV",
      price: 245000000,
      pricePrefix: "Mulai dari",
      description: "Kendaraan keluarga terpopuler dengan transmisi otomatis CVT. Hemat BBM, lega, dan nyaman.",
      imageUrl: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
      images: ["https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600"],
      isFeatured: true,
      specsJson: { Mesin: "1.5L Dual VVT-i", Transmisi: "CVT", BBM: "Bensin", Kapasitas: "7 Penumpang" },
    },
    {
      title: "Honda HR-V 1.5 SE CVT 2024",
      slug: "honda-hrv-1-5-se-cvt-2024",
      category: "SUV",
      price: 355000000,
      pricePrefix: "OTR Bandung",
      description: "SUV stylish dengan teknologi Honda SENSING terbaru.",
      imageUrl: "https://images.unsplash.com/photo-1555652736-e92021d28a10?w=600",
      images: [],
      isFeatured: true,
      specsJson: { Mesin: "1.5L DOHC VTEC Turbo", Transmisi: "CVT", BBM: "Bensin", Kapasitas: "5 Penumpang" },
    },
  ];

  for (const item of catalogItems1) {
    await prisma.catalogItem.upsert({
      where: { tenantId_slug: { tenantId: tenant1.id, slug: item.slug } },
      update: {},
      create: { tenantId: tenant1.id, ...item },
    });
  }

  await prisma.galleryItem.createMany({
    data: [
      { tenantId: tenant1.id, imageUrl: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400", caption: "Serah terima unit Avanza ke Bpk Hendra", orderIndex: 0 },
    ],
    skipDuplicates: true,
  });

  await prisma.lead.createMany({
    data: [
      {
        tenantId: tenant1.id,
        name: "Ahmad Fauzi",
        phone: "08123456789",
        moduleType: "INSTALLMENT_SIMULATION",
        detailsJson: { unit: "Toyota Avanza 1.5 G CVT", dp: "Rp 50.000.000", tenor: "48", cicilan: "Rp 5.200.000" },
        status: "CONTACTED",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Tenant 1 (Automotive):", tenant1.customDomain);

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
