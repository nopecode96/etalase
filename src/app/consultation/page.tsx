import { redirect } from "next/navigation";

interface RedirectProps {
  searchParams?: {
    lang?: string;
  };
}

export default function ConsultationPage({ searchParams }: RedirectProps) {
  const lang = searchParams?.lang;
  redirect(lang && lang !== "id" ? `/${lang}/fitur` : "/fitur");
}
