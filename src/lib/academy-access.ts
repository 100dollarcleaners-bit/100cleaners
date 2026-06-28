import { createHmac, timingSafeEqual } from "crypto";
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

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  const [email, expStr] = body.split(":");
  const exp = Number(expStr);
  if (!email || !exp || Date.now() > exp) return null;

  return email;
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

export { COOKIE_NAME, TOKEN_TTL_MS };
