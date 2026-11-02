import type { SafeUser } from "@/lib/auth/session";

export const STAFF_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "FINANCE",
  "DESIGNER",
  "ARTIST_3D",
  "SUPPORT",
  "PRODUCT_MANAGER",
  "CONTENT_MANAGER",
] as const;

export type StaffRole = (typeof STAFF_ROLES)[number];

export function hasAnyRole(user: SafeUser | null, allowedRoles: readonly string[]): boolean {
  return Boolean(user && allowedRoles.includes(user.role));
}

export function isStaff(user: SafeUser | null): boolean {
  return hasAnyRole(user, STAFF_ROLES);
}
