"use client";

import { Check, Shirt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BASE_PRICE, LAUNDRY_ADDON_PRICE } from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
}

export function StepService({ data, update, onNext }: Props) {
  const total = BASE_PRICE + (data.laundryAddon ? LAUNDRY_ADDON_PRICE : 0);

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Select your service</h2>
      <p className="mt-2 text-sm text-navy/60">
        Standard Clean includes everything you need for a spotless home.
      </p>

      <button
        type="button"
        onClick={() => update({ laundryAddon: false })}
        className={`mt-8 w-full rounded-xl border-2 p-6 text-left transition-all ${
          !data.laundryAddon
            ? "border-gold bg-gold/5"
            : "border-navy/10 hover:border-navy/20"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-xl text-navy">Standard Clean</p>
            <p className="mt-1 text-sm text-navy/60">Up to 3 bedrooms</p>
          </div>
          <p className="font-display text-2xl text-navy">${BASE_PRICE}</p>
        </div>
        <p className="mt-3 text-xs text-navy/50">
          Deep clean, steam, dusting, mopping, vacuuming, trash, dishes, cabinets
        </p>
      </button>

      <button
        type="button"
        onClick={() => update({ laundryAddon: !data.laundryAddon })}
        className={`mt-4 flex w-full items-center gap-4 rounded-xl border-2 p-6 text-left transition-all ${
          data.laundryAddon
            ? "border-gold bg-gold/5"
            : "border-navy/10 hover:border-navy/20"
        }`}
      >
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 ${
            data.laundryAddon ? "border-gold bg-gold" : "border-navy/30"
          }`}
        >
          {data.laundryAddon && <Check size={14} className="text-navy" />}
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <Shirt size={20} className="text-gold-dark" />
            <div>
              <p className="font-medium text-navy">Laundry Service</p>
              <p className="text-xs text-navy/50">Wash, dry & fold</p>
            </div>
          </div>
          <p className="font-display text-xl text-gold-dark">
            +${LAUNDRY_ADDON_PRICE}
          </p>
        </div>
      </button>

      <div className="mt-8 flex items-center justify-between border-t border-navy/10 pt-6">
        <p className="text-sm text-navy/60">Estimated total</p>
        <p className="font-display text-3xl text-navy">${total}</p>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="button" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}
