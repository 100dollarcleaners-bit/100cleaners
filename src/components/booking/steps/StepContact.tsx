"use client";

import { Button } from "@/components/ui/Button";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function StepContact({ data, update, onNext, onBack }: Props) {
  const valid =
    data.customerName.trim().length >= 2 &&
    data.customerPhone.replace(/\D/g, "").length >= 10 &&
    isValidEmail(data.customerEmail);

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Contact information</h2>
      <p className="mt-2 text-sm text-navy/60">
        We&apos;ll send your confirmation to this email.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={data.customerName}
            onChange={(e) => update({ customerName: e.target.value })}
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-navy">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={data.customerPhone}
            onChange={(e) => update({ customerPhone: e.target.value })}
            placeholder="(213) 761-4379"
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={data.customerEmail}
            onChange={(e) => update({ customerEmail: e.target.value })}
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={!valid}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
