import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const COOKIE_NAME = "nararya_session";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

function tokenHash(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export type SafeUser = {
  id: string;
  email: string;
  username: string;
  role: string;
  locale: string;
  theme: string;
};

export function assertSessionConfiguration(): void {
  if (process.env.NODE_ENV === "production" && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 32)) {
    throw new Error("SESSION_SECRET must contain at least 32 characters in production.");
  }
}

export async function createUserSession(userId: string): Promise<void> {
  assertSessionConfiguration();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000);

  await db.userSession.create({
    data: { userId, tokenHash: tokenHash(token), expiresAt },
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token || token.length > 128) return null;

  const session = await db.userSession.findFirst({
    where: { tokenHash: tokenHash(token), revokedAt: null, expiresAt: { gt: new Date() } },
    select: {
      user: { select: { id: true, email: true, username: true, role: true, locale: true, theme: true } },
    },
  });

  return session?.user ?? null;
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  await db.userSession.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
}

export async function revokeCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token && token.length <= 128) {
    await db.userSession.updateMany({
      where: { tokenHash: tokenHash(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

export const AUTH_SESSION_SECONDS = SESSION_SECONDS;
