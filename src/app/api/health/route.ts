import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getSupabaseConfig,
  isValidSupabaseUrl,
  normalizeSupabaseUrl,
} from "@/lib/supabase-config";

export async function GET() {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let config: ReturnType<typeof getSupabaseConfig> | null = null;
  let configError: string | null = null;

  try {
    config = getSupabaseConfig();
  } catch (error) {
    configError =
      error instanceof Error ? error.message : "Invalid Supabase configuration";
  }

  const normalizedUrl = rawUrl ? normalizeSupabaseUrl(rawUrl) : null;

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
      supabase: configError ?? "missing_url_or_key",
      supabaseUrlUsed: normalizedUrl,
      urlLooksWrong: normalizedUrl ? !isValidSupabaseUrl(normalizedUrl) : null,
      hint: configError
        ? configError
        : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel",
    });
  }

  const supabase = createClient(config.url, config.key);
  const { error } = await supabase.from("bookings").select("id").limit(1);

  const urlLooksWrong = normalizedUrl ? !isValidSupabaseUrl(normalizedUrl) : false;

  return NextResponse.json({
    ok: !error && !configError,
    env,
    supabaseUrlUsed: config.url,
    urlLooksWrong,
    hint: configError
      ? configError
      : urlLooksWrong
        ? "Use exactly: https://YOUR-PROJECT-ID.supabase.co (not your website URL)"
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
