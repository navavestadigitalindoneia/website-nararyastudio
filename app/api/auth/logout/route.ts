import { NextResponse, type NextRequest } from "next/server";
import { revokeCurrentSession } from "@/lib/auth/session";
import { isSameOriginRequest, jsonError } from "@/lib/auth/http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Invalid request origin.", 403);
  await revokeCurrentSession();
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
