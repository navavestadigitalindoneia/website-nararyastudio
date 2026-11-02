import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser, revokeAllUserSessions, revokeCurrentSession } from "@/lib/auth/session";
import { isSameOriginRequest, jsonError } from "@/lib/auth/http";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Invalid request origin.", 403);
  const user = await getCurrentUser();
  if (!user) return jsonError("Authentication required.", 401);
  await revokeAllUserSessions(user.id);
  await revokeCurrentSession();
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
