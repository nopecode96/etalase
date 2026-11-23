import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3005),
  NEXT_PUBLIC_ROOT_DOMAIN: z.string().default("etalase.online"),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3005"),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  AUTH_SECRET: z.string().default("default_auth_secret_must_change_in_production_min_32_chars"),
  GOOGLE_API_KEY: z.string().optional().default(""),
  AUTH_GOOGLE_ID: z.string().optional().default(""),
  AUTH_GOOGLE_SECRET: z.string().optional().default(""),

  // Mabes Super Admin Credentials (Internal Monitoring: Email & Password ONLY)
  MABES_ADMIN_EMAIL: z.string().default("admin@etalase.online"),
  MABES_ADMIN_PASSWORD: z.string().default("MabesAdmin2026!SecurePassword"),
  SUPER_ADMIN_EMAILS: z.string().default("admin@etalase.online"),

  // Borderpay QRIS & Cross-Border Gateway
  BORDERPAY_ENV: z.enum(["test", "live"]).default("test"),
  BORDERPAY_TEST_API_KEY: z.string().default("bp_test_zwqnyfoD8B4JtuEteZWeakZg54V3Ltmv"),
  BORDERPAY_TEST_WEBHOOK_KEY: z.string().default("bpt_Sccoz-yvaOZTa-7TkS_wnxiyrPS0Pb3l"),
  BORDERPAY_LIVE_API_KEY: z.string().default("bp_live_riyC1KnSgDGtaCEVj10VmDIFVyTJEe8D"),
  BORDERPAY_LIVE_WEBHOOK_KEY: z.string().default("bpt_OKUJZJ0Wa7N86AqknckSuc0pO05in8ix"),
  BORDERPAY_WEBHOOK_URL: z.string().default("https://etalase.online/pay/webhook"),

  PAYPAL_CLIENT_ID: z.string().optional().default(""),
  PAYPAL_CLIENT_SECRET: z.string().optional().default(""),
  PAYPAL_MODE: z.enum(["sandbox", "live"]).default("sandbox"),

  FONNTE_TOKEN: z.string().optional().default(""),

  N8N_WEBHOOK_BASE_URL: z.string().default("http://n8n:5678/webhook"),
  N8N_WEBHOOK_SECRET: z.string().default("default_n8n_secret"),

  PYTHON_WORKER_SECRET: z.string().default("default_worker_secret"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  if (process.env.NODE_ENV === "production") {
    throw new Error("Invalid environment variables");
  }
}

export const env = parsed.success
  ? parsed.data
  : (process.env as unknown as z.infer<typeof envSchema>);

/**
 * Returns active Borderpay credentials based on BORDERPAY_ENV ("test" | "live")
 */
export function getActiveBorderpayConfig() {
  const isLive = env.BORDERPAY_ENV === "live";
  return {
    isLive,
    apiKey: isLive ? env.BORDERPAY_LIVE_API_KEY : env.BORDERPAY_TEST_API_KEY,
    webhookKey: isLive ? env.BORDERPAY_LIVE_WEBHOOK_KEY : env.BORDERPAY_TEST_WEBHOOK_KEY,
    webhookUrl: env.BORDERPAY_WEBHOOK_URL,
    apiBaseUrl: isLive ? "https://api.borderpay.id/v1" : "https://sandbox-api.borderpay.id/v1",
  };
}
