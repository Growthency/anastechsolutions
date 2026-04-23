import "server-only";
import crypto from "node:crypto";

const DEFAULT_EMAIL = "infoabubakar786@gmail.com";
const DEFAULT_PASSWORD_HASH =
  "fd68bb6030420532dc23b1dc87d38ef9:76d8475d76c503774ef0878e59dc10727330e485b4f43d2d5d27ea0c774f94f32f56c1e12360062518c91505fda8deda6bba676b28a938abb6fc82b42f253b52";

export function getAdminEmail(): string {
  return (process.env.ADMIN_EMAIL || DEFAULT_EMAIL).toLowerCase().trim();
}

function getPasswordHash(): string {
  return process.env.ADMIN_PASSWORD_HASH || DEFAULT_PASSWORD_HASH;
}

export function verifyCredentials(email: string, password: string): boolean {
  const normalized = email.toLowerCase().trim();
  if (normalized !== getAdminEmail()) return false;

  const stored = getPasswordHash();
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;

  try {
    const derived = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hashHex, "hex");
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}
