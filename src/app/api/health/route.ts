import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase-config";

export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const config = getSupabaseConfig();

  const env = {
    supabaseUrl: Boolean(rawUrl),
    supabaseKey: Boolean(
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY
    ),
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    stripeWebhook: Boolean(process.env.STRIPE_WEBHOOK_SECRET),
    resend: Boolean(process.env.RESEND_API_KEY),
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? null,
  };

  if (!config) {
    return NextResponse.json({
      ok: false,
      env,
      supabase: "missing_url_or_key",
    });
  }

  const supabase = createClient(config.url, config.key);
  const { error } = await supabase.from("bookings").select("id").limit(1);

  const urlLooksWrong =
    rawUrl &&
    (rawUrl.includes("/rest/v1") ||
      rawUrl.includes("supabase.com/dashboard") ||
      !rawUrl.includes(".supabase.co"));

  return NextResponse.json({
    ok: !error,
    env,
    supabaseUrlUsed: config.url,
    urlLooksWrong,
    hint: urlLooksWrong
      ? "Use exactly: https://YOUR-PROJECT-ID.supabase.co (no /rest/v1, no trailing slash)"
      : error?.code === "PGRST205"
        ? "Run supabase/schema.sql — bookings table missing"
        : error?.code === "PGRST125"
          ? "Fix NEXT_PUBLIC_SUPABASE_URL in Vercel — see hint above"
          : null,
    supabase: error
      ? { status: "error", code: error.code, message: error.message }
      : { status: "connected" },
  });
}
