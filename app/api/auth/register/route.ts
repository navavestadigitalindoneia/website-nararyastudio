import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { assertSessionConfiguration, createUserSession } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { consumeRateLimit, getClientAddressKey } from "@/lib/auth/rate-limit";
import { isSameOriginRequest, jsonError } from "@/lib/auth/http";

export const runtime = "nodejs";

const registerSchema = z.object({
  email: z.string().trim().email().max(254),
  username: z.string().trim().min(3).max(24).regex(/^[a-zA-Z0-9_]+$/),
  password: z.string().min(12).max(128),
});

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) return jsonError("Invalid request origin.", 403);
  try { assertSessionConfiguration(); } catch { return jsonError("Authentication is not configured on this server.", 503); }

  const addressKey = getClientAddressKey(request.headers);
  if (!(await consumeRateLimit(`register:ip:${addressKey}`, 5, 3600))) {
    return jsonError("Too many registration attempts. Try again later.", 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return jsonError("Please provide a valid email, username, and password (at least 12 characters).", 400);

  const email = parsed.data.email.toLowerCase();
  const username = parsed.data.username;
  const passwordHash = await hashPassword(parsed.data.password);

  try {
    const user = await db.user.create({
      data: { email, username, passwordHash },
      select: { id: true, email: true, username: true, role: true, locale: true, theme: true },
    });
    await createUserSession(user.id);
    return NextResponse.json({ user }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return jsonError("Email or username is already registered.", 409);
    }
    return jsonError("Registration is temporarily unavailable.", 503);
  }
}
