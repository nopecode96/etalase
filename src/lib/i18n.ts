import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, SupportedLocale } from "./config/constants";

export default getRequestConfig(async ({ locale }) => {
  if (!SUPPORTED_LOCALES.includes(locale as SupportedLocale)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
