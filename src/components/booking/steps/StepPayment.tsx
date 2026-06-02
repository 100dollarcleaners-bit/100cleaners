"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  BASE_PRICE,
  DEPOSIT_AMOUNT,
  LAUNDRY_ADDON_PRICE,
  TIME_SLOTS,
} from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  onBack: () => void;
  onPay: () => void;
  loading: boolean;
}

export function StepPayment({ data, onBack, onPay, loading }: Props) {
  const total =
    BASE_PRICE + (data.laundryAddon ? LAUNDRY_ADDON_PRICE : 0);
  const timeLabel =
    TIME_SLOTS.find((s) => s.value === data.bookingTime)?.label ??
    data.bookingTime;

  const formattedDate = data.bookingDate
    ? new Date(data.bookingDate + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Confirm & pay deposit</h2>
      <p className="mt-2 text-sm text-navy/60">
        Pay a ${DEPOSIT_AMOUNT} deposit via Stripe to secure your appointment.
      </p>

      <div className="mt-8 space-y-3 rounded-xl bg-cream p-6 text-sm">
        <div className="flex justify-between">
          <span className="text-navy/60">Service</span>
          <span className="font-medium text-navy">
            Standard Clean{data.laundryAddon ? " + Laundry" : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy/60">Service total</span>
          <span className="font-medium text-navy">${total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy/60">Date</span>
          <span className="font-medium text-navy">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy/60">Time</span>
          <span className="font-medium text-navy">{timeLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-navy/60">Address</span>
          <span className="max-w-[60%] text-right font-medium text-navy">
            {data.address}
          </span>
        </div>
        <div className="border-t border-navy/10 pt-3">
          <div className="flex justify-between text-base">
            <span className="font-semibold text-navy">Deposit due now</span>
            <span className="font-display text-2xl text-gold-dark">
              ${DEPOSIT_AMOUNT}
            </span>
          </div>
          <p className="mt-1 text-xs text-navy/50">
            Balance of ${total - DEPOSIT_AMOUNT} due on the day of service
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-navy/10 bg-white px-4 py-3 text-xs text-navy/60">
        <CreditCard size={18} className="shrink-0 text-gold" />
        Secure payment powered by Stripe. Your card details are never stored on
        our servers.
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button type="button" onClick={onPay} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Redirecting…
            </>
          ) : (
            `Pay $${DEPOSIT_AMOUNT} Deposit`
          )}
        </Button>
      </div>
    </div>
  );
}
