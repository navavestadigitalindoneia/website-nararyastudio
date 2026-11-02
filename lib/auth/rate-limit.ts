import { createHmac } from "node:crypto";
import { db } from "@/lib/db";

function digest(value: string): string {
  const secret = process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && (!secret || secret.length < 32)) {
    throw new Error("SESSION_SECRET must contain at least 32 characters in production.");
  }
  return createHmac("sha256", secret || "local-development-only-change-this-secret").update(value).digest("hex");
}

export function getClientAddressKey(headers: Headers): string {
  const address =
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  return digest(address);
}

export function hashRateLimitIdentifier(value: string): string {
  return digest(value.trim().toLowerCase());
}

export async function consumeRateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  const windowMs = windowSeconds * 1000;
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  const bucketKey = digest(key);
  const bucket = await db.rateLimitBucket.upsert({
    where: { bucketKey_windowStart: { bucketKey, windowStart } },
    create: { bucketKey, windowStart, count: 1 },
    update: { count: { increment: 1 } },
    select: { count: true },
  });
  return bucket.count <= limit;
}
