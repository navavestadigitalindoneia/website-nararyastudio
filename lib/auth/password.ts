import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };

function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey as Buffer);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  return [
    "scrypt",
    String(SCRYPT_OPTIONS.N),
    String(SCRYPT_OPTIONS.r),
    String(SCRYPT_OPTIONS.p),
    salt.toString("hex"),
    key.toString("hex"),
  ].join("$");
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
  const [algorithm, n, r, p, saltHex, keyHex, extra] = encoded.split("$");
  if (algorithm !== "scrypt" || !n || !r || !p || !saltHex || !keyHex || extra) return false;

  const cost = Number(n);
  const blockSize = Number(r);
  const parallelism = Number(p);
  if (cost !== SCRYPT_OPTIONS.N || blockSize !== SCRYPT_OPTIONS.r || parallelism !== SCRYPT_OPTIONS.p) return false;
  if (!/^[a-f0-9]{32}$/i.test(saltHex) || !/^[a-f0-9]{128}$/i.test(keyHex)) return false;

  const expected = Buffer.from(keyHex, "hex");
  const actual = await deriveKey(password, Buffer.from(saltHex, "hex"));
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
