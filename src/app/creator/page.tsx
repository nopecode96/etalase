import { redirect } from "next/navigation";

interface RedirectProps {
  searchParams?: {
    lang?: string;
  };
}

export default function CreatorPage({ searchParams }: RedirectProps) {
  const lang = searchParams?.lang;
  redirect(lang && lang !== "id" ? `/${lang}/solusi` : "/solusi");
}
