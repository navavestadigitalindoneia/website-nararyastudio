import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { assertSessionConfiguration, createUserSession } from "@/lib/auth/session";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { consumeRateLimit, getClientAddressKey, hashRateLimitIdentifier } from "@/lib/auth/rate-limit";
import { isSameOriginRequest, jsonError } from "@/lib/auth/http";

export const runtime = "nodejs";

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

const dummyHashPromise = hashPassword("not-a-real-account-password");

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Invalid request origin.", 403);
  try { assertSessionConfiguration(); } catch { return jsonError("Authentication is not configured on this server.", 503); }

  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return jsonError("Invalid email or password.", 400);

  const addressKey = getClientAddressKey(request.headers);
  const emailKey = hashRateLimitIdentifier(parsed.data.email);
  const [ipAllowed, emailAllowed] = await Promise.all([
    consumeRateLimit(`login:ip:${addressKey}`, 10, 900),
    consumeRateLimit(`login:email:${emailKey}`, 10, 900),
  ]);
  if (!ipAllowed || !emailAllowed) return jsonError("Too many login attempts. Try again later.", 429);

  const user = await db.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
    select: { id: true, email: true, username: true, role: true, locale: true, theme: true, passwordHash: true },
  });

  const passwordHash = user?.passwordHash ?? await dummyHashPromise;
  const valid = await verifyPassword(parsed.data.password, passwordHash);
  if (!user || !valid) return jsonError("Invalid email or password.", 401);

  await createUserSession(user.id);
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return NextResponse.json({ user: safeUser }, { headers: { "Cache-Control": "no-store" } });
}
