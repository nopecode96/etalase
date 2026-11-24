import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMabesUser } from "@/lib/auth/mabes-guard";
import { MabesLoginClient } from "./MabesLoginClient";

export const metadata: Metadata = {
  title: "Mabes Headquarters Login — etalase.online",
  description: "Internal administrative login for Rafa Kreasindo Teknologi platform operators.",
};

export default async function MabesLoginPage() {
  const user = await getMabesUser();
  if (user) {
    redirect("/mabes");
  }

  return <MabesLoginClient />;
}
