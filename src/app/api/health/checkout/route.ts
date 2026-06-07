import { NextResponse } from "next/server";
import { createDepositCheckoutSession, getStripe } from "@/lib/stripe";
import { getSupabaseConfig } from "@/lib/supabase-config";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const steps: Record<string, { ok: boolean; detail?: string }> = {};

  try {
    const config = getSupabaseConfig();
    if (!config) {
      return NextResponse.json({
        ok: false,
        steps: { config: { ok: false, detail: "Missing Supabase env vars" } },
      });
    }
    steps.config = { ok: true };

    const supabase = createClient(config.url, config.key);
    const { error: selectError } = await supabase
      .from("bookings")
      .select("id, service_type, laundry_addon")
      .limit(1);

    if (selectError) {
      steps.schema = { ok: false, detail: `${selectError.code}: ${selectError.message}` };
    } else {
      steps.schema = { ok: true };
    }

    const testRow = {
      customer_name: "Health Check",
      customer_email: "healthcheck@example.com",
      customer_phone: "0000000000",
      address: "Diagnostic only",
      bedroom_count: 1,
      special_instructions: null,
      service_type: "standard",
      laundry_addon: false,
      booking_date: "2099-01-01",
      booking_time: "06:00",
      deposit_paid: false,
    };

    const { data: inserted, error: insertError } = await supabase
      .from("bookings")
      .insert(testRow)
      .select("id")
      .single();

    if (insertError) {
      steps.insert = {
        ok: false,
        detail: `${insertError.code}: ${insertError.message}`,
      };
    } else {
      steps.insert = { ok: true };
      if (inserted?.id) {
        await supabase.from("bookings").delete().eq("id", inserted.id);
      }
    }

    try {
      getStripe();
      steps.stripeKey = { ok: true };
    } catch (error) {
      steps.stripeKey = {
        ok: false,
        detail: error instanceof Error ? error.message : "Missing Stripe key",
      };
    }

    if (steps.stripeKey.ok) {
      try {
        const session = await createDepositCheckoutSession({
          bookingId: "00000000-0000-0000-0000-000000000000",
          customerEmail: "healthcheck@example.com",
          customerName: "Health Check",
        });
        steps.stripeCheckout = {
          ok: Boolean(session.url),
          detail: session.url ? "Session created" : "No checkout URL returned",
        };
      } catch (error) {
        const stripeError = error as { type?: string; message?: string; code?: string };
        steps.stripeCheckout = {
          ok: false,
          detail: [stripeError.type, stripeError.code, stripeError.message]
            .filter(Boolean)
            .join(" — "),
        };
      }
    }

    const ok = Object.values(steps).every((s) => s.ok);
    return NextResponse.json({ ok, steps });
  } catch (error) {
    return NextResponse.json({
      ok: false,
      steps,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
