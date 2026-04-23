import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "anastech_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const DEV_FALLBACK_SECRET =
  "dev-only-fallback-change-in-prod-32-chars-min-length";

// Per-process ephemeral secret used when SESSION_SECRET isn't configured.
// Sessions won't survive a container restart, but the app stays up and we
// don't leak 500s to visitors. Set SESSION_SECRET on the host to fix this.
let ephemeralSecret: string | null = null;
let warnedMissingSecret = false;

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 16) return s;
  if (process.env.NODE_ENV === "production") {
    if (!warnedMissingSecret) {
      console.error(
        "[session] SESSION_SECRET is not set. Using an ephemeral per-process secret — sessions will not survive restarts.",
      );
      warnedMissingSecret = true;
    }
    if (!ephemeralSecret) {
      ephemeralSecret = crypto.randomBytes(32).toString("base64url");
    }
    return ephemeralSecret;
  }
  return DEV_FALLBACK_SECRET;
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

function verifySignature(payload: string, signature: string): boolean {
  const expected = sign(payload);
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export interface SessionData {
  userId: string;
  email: string;
  expiresAt: number;
}

function encode(data: SessionData): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function decodeSessionValue(
  value: string | undefined | null,
): SessionData | null {
  if (!value) return null;
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return null;
  if (!verifySignature(payload, signature)) return null;
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as SessionData;
    if (!data.expiresAt || data.expiresAt < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSession(
  data: Omit<SessionData, "expiresAt">,
): Promise<void> {
  const expiresAt = Date.now() + MAX_AGE_SECONDS * 1000;
  const value = encode({ ...data, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function readSession(): Promise<SessionData | null> {
  const store = await cookies();
  return decodeSessionValue(store.get(SESSION_COOKIE)?.value);
}

export async function deleteSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
