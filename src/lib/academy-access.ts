import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { getStripe } from "./stripe";

const COOKIE_NAME = "academy_access";
const TOKEN_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

function getSecret() {
  return (
    process.env.ACADEMY_ACCESS_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET ??
    "dev-only-academy-secret-change-me"
  );
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createAcademyAccessToken(email: string) {
  const exp = Date.now() + TOKEN_TTL_MS;
  const body = `${email}:${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifyAcademyAccessToken(token: string | undefined): string | null {
  if (!token) return null;

  let normalized = token;
  if (token.includes("%")) {
    try {
      normalized = decodeURIComponent(token);
    } catch {
      normalized = token;
    }
  }

  const separator = normalized.lastIndexOf(".");
  if (separator <= 0) return null;

  const body = normalized.slice(0, separator);
  const signature = normalized.slice(separator + 1);
  if (!body || !signature) return null;

  const expected = sign(body);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const colonIndex = body.lastIndexOf(":");
  if (colonIndex <= 0) return null;

  const email = body.slice(0, colonIndex);
  const exp = Number(body.slice(colonIndex + 1));
  if (!email || !exp || Date.now() > exp) return null;

  return email;
}

export function normalizeAcademyEmail(input: string): string {
  return input.trim().toLowerCase();
}

export function isValidAcademyEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function verifyAcademyStripeSession(
  sessionId: string
): Promise<{ email: string; name: string } | null> {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (
      session.payment_status !== "paid" ||
      session.metadata?.product !== "academy"
    ) {
      return null;
    }

    const email =
      session.customer_email ?? session.customer_details?.email ?? null;
    if (!email) return null;

    return {
      email,
      name: session.metadata?.customer_name ?? "Student",
    };
  } catch {
    return null;
  }
}

export function isPreviewAccessEnabled(): boolean {
  return Boolean(process.env.ACADEMY_PREVIEW_PASSWORD?.trim());
}

export function verifyPreviewPassword(input: string): boolean {
  const expected = process.env.ACADEMY_PREVIEW_PASSWORD?.trim();
  if (!expected) return false;

  const normalized = input.trim();

  try {
    const a = Buffer.from(normalized);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export { COOKIE_NAME, TOKEN_TTL_MS };

export function getAcademyAccessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: TOKEN_TTL_MS / 1000,
    path: "/",
    ...(process.env.NODE_ENV === "production"
      ? { domain: ".100cleaner.com" as const }
      : {}),
  };
}

export function setAcademyAccessCookie(response: NextResponse, email: string) {
  const token = createAcademyAccessToken(email);
  response.cookies.set(COOKIE_NAME, token, getAcademyAccessCookieOptions());
  return token;
}
