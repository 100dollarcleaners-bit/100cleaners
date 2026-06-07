"use client";

import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  AgreementsSection,
  allAgreementsAccepted,
} from "@/components/booking/agreements/AgreementsSection";
import type { AgreementAcceptance } from "@/lib/agreements";
import {
  DEPOSIT_AMOUNT,
  getBookingTotal,
  getServiceLabel,
  TIME_SLOTS,
} from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  agreements: AgreementAcceptance;
  updateAgreements: (partial: Partial<AgreementAcceptance>) => void;
  onBack: () => void;
  onPay: () => void;
  loading: boolean;
}

export function StepPayment({
  data,
  agreements,
  updateAgreements,
  onBack,
  onPay,
  loading,
}: Props) {
  const total = getBookingTotal(data.serviceType, data.laundryAddon);
  const serviceLabel = getServiceLabel(data.serviceType, data.laundryAddon);
  const timeLabel =
    TIME_SLOTS.find((s) => s.value === data.bookingTime)?.label ??
    data.bookingTime;
  const allAccepted = allAgreementsAccepted(agreements);

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
      <h2 className="font-display text-2xl text-navy">Review, agree & pay deposit</h2>
      <p className="mt-2 text-sm text-navy/60">
        Read and accept each agreement below, then pay your ${DEPOSIT_AMOUNT}{" "}
        deposit to secure your appointment.
      </p>

      <div className="mt-8">
        <AgreementsSection
          data={data}
          agreements={agreements}
          updateAgreements={updateAgreements}
        />
      </div>

      <div className="mt-10 space-y-3 rounded-xl bg-cream p-6 text-sm">
        <div className="flex justify-between">
          <span className="text-navy/60">Service</span>
          <span className="font-medium text-navy">{serviceLabel}</span>
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

      {!allAccepted && (
        <p className="mt-3 text-center text-xs text-amber-700">
          Open each agreement above and check all boxes to enable payment.
        </p>
      )}

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-navy/10 bg-white px-4 py-3 text-xs text-navy/60">
        <CreditCard size={18} className="shrink-0 text-gold" />
        Secure payment powered by Stripe. Your card details are never stored on
        our servers.
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button
          type="button"
          onClick={onPay}
          disabled={loading || !allAccepted}
        >
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
