const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const COUNTRIES_AND_BANKS = [
  {
    code: "ID",
    name: "Indonesia",
    flagEmoji: "🇮🇩",
    currencyCode: "IDR",
    currencySymbol: "Rp",
    defaultLocale: "id",
    isActive: true,
    sortOrder: 1,
    banks: [
      { code: "BCA", name: "Bank Central Asia (BCA)", type: "BANK", sortOrder: 1 },
      { code: "BRI", name: "Bank Rakyat Indonesia (BRI)", type: "BANK", sortOrder: 2 },
      { code: "MANDIRI", name: "Bank Mandiri", type: "BANK", sortOrder: 3 },
      { code: "BNI", name: "Bank Negara Indonesia (BNI)", type: "BANK", sortOrder: 4 },
      { code: "BSI", name: "Bank Syariah Indonesia (BSI)", type: "BANK", sortOrder: 5 },
      { code: "JAGO", name: "Bank Jago", type: "BANK", sortOrder: 6 },
      { code: "SEABANK", name: "SeaBank Indonesia", type: "BANK", sortOrder: 7 },
      { code: "CIMB", name: "CIMB Niaga", type: "BANK", sortOrder: 8 },
      { code: "PERMATA", name: "Bank Permata", type: "BANK", sortOrder: 9 },
      { code: "DANAMON", name: "Bank Danamon", type: "BANK", sortOrder: 10 },
      { code: "GOPAY", name: "GoPay", type: "EWALLET", sortOrder: 11 },
      { code: "OVO", name: "OVO", type: "EWALLET", sortOrder: 12 },
      { code: "DANA", name: "DANA", type: "EWALLET", sortOrder: 13 },
      { code: "SHOPEEPAY", name: "ShopeePay", type: "EWALLET", sortOrder: 14 },
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flagEmoji: "🇸🇬",
    currencyCode: "SGD",
    currencySymbol: "$",
    defaultLocale: "en",
    isActive: false,
    sortOrder: 2,
    banks: [
      { code: "DBS", name: "DBS / POSB", type: "BANK", sortOrder: 1 },
      { code: "OCBC", name: "OCBC Bank", type: "BANK", sortOrder: 2 },
      { code: "UOB", name: "United Overseas Bank (UOB)", type: "BANK", sortOrder: 3 },
      { code: "SCB_SG", name: "Standard Chartered Singapore", type: "BANK", sortOrder: 4 },
      { code: "CITI_SG", name: "Citibank Singapore", type: "BANK", sortOrder: 5 },
      { code: "PAYNOW", name: "PayNow", type: "EWALLET", sortOrder: 6 },
    ],
  },
  {
    code: "MY",
    name: "Malaysia",
    flagEmoji: "🇲🇾",
    currencyCode: "MYR",
    currencySymbol: "RM",
    defaultLocale: "ms",
    isActive: false,
    sortOrder: 3,
    banks: [
      { code: "MAYBANK", name: "Maybank", type: "BANK", sortOrder: 1 },
      { code: "CIMB_MY", name: "CIMB Bank", type: "BANK", sortOrder: 2 },
      { code: "PUBLIC_BANK", name: "Public Bank", type: "BANK", sortOrder: 3 },
      { code: "RHB", name: "RHB Bank", type: "BANK", sortOrder: 4 },
      { code: "HONG_LEONG", name: "Hong Leong Bank", type: "BANK", sortOrder: 5 },
      { code: "AMBANK", name: "AmBank", type: "BANK", sortOrder: 6 },
      { code: "TNG", name: "Touch 'n Go eWallet", type: "EWALLET", sortOrder: 7 },
      { code: "DUITNOW", name: "DuitNow", type: "EWALLET", sortOrder: 8 },
    ],
  },
  {
    code: "TH",
    name: "Thailand",
    flagEmoji: "🇹🇭",
    currencyCode: "THB",
    currencySymbol: "฿",
    defaultLocale: "th",
    isActive: false,
    sortOrder: 4,
    banks: [
      { code: "KBANK", name: "Kasikornbank (KBank)", type: "BANK", sortOrder: 1 },
      { code: "BBL", name: "Bangkok Bank", type: "BANK", sortOrder: 2 },
      { code: "SCB_TH", name: "Siam Commercial Bank (SCB)", type: "BANK", sortOrder: 3 },
      { code: "KTB", name: "Krungthai Bank", type: "BANK", sortOrder: 4 },
      { code: "PROMPTPAY", name: "PromptPay", type: "EWALLET", sortOrder: 5 },
      { code: "TRUEMONEY", name: "TrueMoney", type: "EWALLET", sortOrder: 6 },
    ],
  },
  {
    code: "VN",
    name: "Vietnam",
    flagEmoji: "🇻🇳",
    currencyCode: "VND",
    currencySymbol: "₫",
    defaultLocale: "vi",
    isActive: false,
    sortOrder: 5,
    banks: [
      { code: "VCB", name: "Vietcombank", type: "BANK", sortOrder: 1 },
      { code: "TECHCOMBANK", name: "Techcombank", type: "BANK", sortOrder: 2 },
      { code: "BIDV", name: "BIDV", type: "BANK", sortOrder: 3 },
      { code: "VIETINBANK", name: "VietinBank", type: "BANK", sortOrder: 4 },
      { code: "MBBANK", name: "MB Bank", type: "BANK", sortOrder: 5 },
      { code: "ACB", name: "ACB", type: "BANK", sortOrder: 6 },
      { code: "MOMO", name: "MoMo", type: "EWALLET", sortOrder: 7 },
      { code: "ZALOPAY", name: "ZaloPay", type: "EWALLET", sortOrder: 8 },
    ],
  },
  {
    code: "INTL",
    name: "International",
    flagEmoji: "🌐",
    currencyCode: "USD",
    currencySymbol: "$",
    defaultLocale: "en",
    isActive: false,
    sortOrder: 6,
    banks: [
      { code: "WISE", name: "Wise (TransferWise)", type: "BANK", sortOrder: 1 },
      { code: "SWIFT", name: "SWIFT / Wire Transfer", type: "BANK", sortOrder: 2 },
      { code: "PAYONEER", name: "Payoneer", type: "BANK", sortOrder: 3 },
    ],
  },
];

async function seedCountriesAndBanks() {
  console.log("🌱 Seeding SupportedCountry and SupportedBank master data...");

  for (const countryData of COUNTRIES_AND_BANKS) {
    const { banks, ...countryFields } = countryData;

    // Upsert Country
    const country = await prisma.supportedCountry.upsert({
      where: { code: countryFields.code },
      update: {
        name: countryFields.name,
        flagEmoji: countryFields.flagEmoji,
        currencyCode: countryFields.currencyCode,
        currencySymbol: countryFields.currencySymbol,
        defaultLocale: countryFields.defaultLocale,
        isActive: countryFields.isActive,
        sortOrder: countryFields.sortOrder,
      },
      create: countryFields,
    });

    console.log(`  [Country] ${country.flagEmoji} ${country.code} - ${country.name} (isActive: ${country.isActive})`);

    // Upsert Banks for this country
    for (const bank of banks) {
      await prisma.supportedBank.upsert({
        where: {
          countryCode_code: {
            countryCode: country.code,
            code: bank.code,
          },
        },
        update: {
          name: bank.name,
          type: bank.type,
          sortOrder: bank.sortOrder,
          isActive: true,
        },
        create: {
          countryCode: country.code,
          code: bank.code,
          name: bank.name,
          type: bank.type,
          sortOrder: bank.sortOrder,
          isActive: true,
        },
      });
    }
  }

  // Set countryCode = 'ID' for all existing stores that are NULL
  const updateCount = await prisma.store.updateMany({
    where: {
      OR: [
        { countryCode: null },
        { countryCode: "" },
      ],
    },
    data: {
      countryCode: "ID",
    },
  });

  console.log(`✅ Defaulted ${updateCount.count} existing stores to countryCode 'ID'.`);
  console.log("🎉 Master Negara & Bank multi-country seeding completed successfully!");
}

if (require.main === module) {
  seedCountriesAndBanks()
    .catch((err) => {
      console.error("❌ Error seeding countries and banks:", err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seedCountriesAndBanks, COUNTRIES_AND_BANKS };
