import React from "react";
import { env } from "@/lib/config/env";
import { PopupStartClient } from "@/components/auth/PopupStartClient";

interface PopupStartPageProps {
  searchParams?: {
    callbackUrl?: string;
  };
}

export default function PopupStartPage({ searchParams }: PopupStartPageProps) {
  const callbackUrl = searchParams?.callbackUrl || "/admin";

  const isGoogleConfigured = Boolean(
    env.AUTH_GOOGLE_ID &&
      env.AUTH_GOOGLE_ID !== "google-client-id-placeholder" &&
      !env.AUTH_GOOGLE_ID.includes("placeholder") &&
      env.AUTH_GOOGLE_SECRET &&
      !env.AUTH_GOOGLE_SECRET.startsWith("AQ.") // Gemini key check
  );

  const allowDemoLogin =
    process.env.NODE_ENV !== "production" ||
    process.env.ALLOW_DEMO_LOGIN === "true";

  return (
    <PopupStartClient
      callbackUrl={callbackUrl}
      isGoogleConfigured={isGoogleConfigured}
      allowDemoLogin={allowDemoLogin}
    />
  );
}
