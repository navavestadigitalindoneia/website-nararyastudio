import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { status: "degraded", service: "nararya-studio", database: "not_configured", timestamp },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json(
      { status: "ok", service: "nararya-studio", database: "connected", timestamp },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { status: "degraded", service: "nararya-studio", database: "unavailable", timestamp },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
