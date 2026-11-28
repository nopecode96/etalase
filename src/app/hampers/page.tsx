import { permanentRedirect } from "next/navigation";
import { SUPPORTED_LOCALES, SupportedLocale } from "@/lib/config/constants";

export default function HampersRedirectPage({
  searchParams,
}: {
  searchParams?: { lang?: string };
}) {
  const rawLang = searchParams?.lang;
  const locale: SupportedLocale =
    rawLang && (SUPPORTED_LOCALES as readonly string[]).includes(rawLang)
      ? (rawLang as SupportedLocale)
      : "id";

  const target =
    locale === "id"
      ? "/solusi/kue-hampers"
      : `/${locale}/solusi/kue-hampers`;

  permanentRedirect(target);
}
