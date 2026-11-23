import { NextResponse } from "next/server";
import { env } from "@/lib/config/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: "etalase.online",
    port: env.PORT,
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
}
