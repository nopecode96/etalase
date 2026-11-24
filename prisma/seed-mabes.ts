import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function seedMabes() {
  console.log("🌱 Seeding Mabes Super Admin & Platform Defaults...");

  const passwordHash = await bcrypt.hash("Lifecode96", 12);

  // 1. Upsert default Super Admin account
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@etalase.online" },
    update: {
      name: "Super Admin Mabes",
      role: "SUPER_ADMIN",
      passwordHash,
    },
    create: {
      email: "superadmin@etalase.online",
      name: "Super Admin Mabes",
      role: "SUPER_ADMIN",
      passwordHash,
      preferredLang: "en",
    },
  });

  console.log(`✅ Super Admin configured: ${superAdmin.email} (${superAdmin.role})`);

  // 2. Upsert initial platform settings (Rafa Kreasindo Teknologi)
  const defaultSettings = [
    { key: "company_name", value: "PT Rafa Kreasindo Teknologi", group: "GENERAL" },
    { key: "platform_name", value: "etalase.online", group: "GENERAL" },
    { key: "support_telegram", value: "https://t.me/etalaseonline_bot", group: "GENERAL" },
    { key: "telegram_mabes_chat_id", value: "-1002345678901", group: "TELEGRAM" },
    { key: "telegram_mabes_bot_token", value: "", group: "TELEGRAM" },
    { key: "pro_monthly_idr", value: "49000", group: "PRICING" },
    { key: "pro_yearly_idr", value: "468000", group: "PRICING" },
    { key: "dfy_idr", value: "899000", group: "PRICING" },
    { key: "official_bca_account", value: "8730928172", group: "BILLING" },
    { key: "official_bca_holder", value: "PT RAFA KREASINDO TEKNOLOGI", group: "BILLING" },
    { key: "free_withdrawals_per_month", value: "4", group: "BILLING" },
    { key: "withdrawal_fee_idr", value: "4500", group: "BILLING" },
  ];

  for (const s of defaultSettings) {
    await prisma.platformSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: { key: s.key, value: s.value, group: s.group },
    });
  }

  console.log(`✅ Platform settings initialized (${defaultSettings.length} keys).`);
}

if (require.main === module) {
  seedMabes()
    .catch((e) => {
      console.error("❌ Failed to seed Mabes:", e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
