import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY;

  const env = {
    supabaseUrl: Boolean(url),
    supabaseKey: Boolean(key),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resend: Boolean(process.env.RESEND_API_KEY),
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? null,
  };

  if (!url || !key) {
    return NextResponse.json({
      ok: false,
      env,
      supabase: "missing_url_or_key",
    });
  }

  const supabase = createClient(url, key);
  const { error } = await supabase.from("bookings").select("id").limit(1);

  return NextResponse.json({
    ok: !error,
    env,
    supabase: error
      ? { status: "error", code: error.code, message: error.message }
      : { status: "connected" },
  });
}
