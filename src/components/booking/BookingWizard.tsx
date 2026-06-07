"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { emptyAgreements } from "@/lib/agreements";
import type { AgreementAcceptance } from "@/lib/agreements";
import type { BookingFormData } from "@/lib/types";
import { StepAgreements } from "./steps/StepAgreements";
import { StepContact } from "./steps/StepContact";
import { StepDateTime } from "./steps/StepDateTime";
import { StepDetails } from "./steps/StepDetails";
import { StepPayment } from "./steps/StepPayment";
import { StepService } from "./steps/StepService";

const STEPS = [
  "Service",
  "Details",
  "Date & Time",
  "Contact",
  "Agree",
  "Deposit",
];

const initialData: BookingFormData = {
  serviceType: "standard",
  laundryAddon: false,
  address: "",
  bedroomCount: 1,
  specialInstructions: "",
  bookingDate: "",
  bookingTime: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  agreements: emptyAgreements(),
};

export function BookingWizard() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");

  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingFormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    cancelled ? "Payment was cancelled. You can try again when ready." : null
  );

  const update = useCallback((partial: Partial<BookingFormData>) => {
    setData((prev) => ({ ...prev, ...partial }));
    setError(null);
  }, []);

  const updateAgreements = useCallback((partial: Partial<AgreementAcceptance>) => {
    setData((prev) => ({
      ...prev,
      agreements: { ...prev.agreements, ...partial },
    }));
    setError(null);
  }, []);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Checkout failed");
      if (json.url) {
        window.location.href = json.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {cancelled && step < 5 && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Your payment was cancelled. Complete your booking below.
        </div>
      )}

      <div className="mb-10">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold sm:h-8 sm:w-8 sm:text-xs transition-colors ${
                  i <= step
                    ? "bg-gold text-navy"
                    : "bg-navy/10 text-navy/40"
                }`}
              >
                {i + 1}
              </div>
              <span className="mt-1.5 hidden text-center text-[9px] font-medium uppercase tracking-wide text-navy/50 sm:block">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-navy/10">
          <motion.div
            className="h-full bg-gold"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="mt-3 text-center text-sm text-navy/60 sm:hidden">
          Step {step + 1}: {STEPS[step]}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card sm:p-10"
        >
          {step === 0 && (
            <StepService data={data} update={update} onNext={next} />
          )}
          {step === 1 && (
            <StepDetails data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 2 && (
            <StepDateTime data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 3 && (
            <StepContact data={data} update={update} onNext={next} onBack={back} />
          )}
          {step === 4 && (
            <StepAgreements
              data={data}
              agreements={data.agreements}
              updateAgreements={updateAgreements}
              onNext={next}
              onBack={back}
            />
          )}
          {step === 5 && (
            <StepPayment
              data={data}
              onBack={back}
              onPay={handleCheckout}
              loading={loading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
