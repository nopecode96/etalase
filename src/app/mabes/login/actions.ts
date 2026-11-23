"use server";

import { signIn, signOut } from "@/lib/auth/session";
import { AuthError } from "next-auth";

export async function actionMabesLogin(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("mabes-credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/mabes",
    });
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Email atau Password Super Admin salah.";
        default:
          return "Terjadi kesalahan saat masuk ke Mabes.";
      }
    }
    throw error;
  }
}

export async function actionMabesLogout() {
  await signOut({ redirectTo: "/mabes/login" });
}
