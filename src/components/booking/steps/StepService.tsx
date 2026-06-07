"use client";

import { Check, Shirt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  getBookingTotal,
  LAUNDRY_ADDON_PRICE,
  SERVICE_OPTIONS,
  type ServiceType,
} from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
}

export function StepService({ data, update, onNext }: Props) {
  const total = getBookingTotal(data.serviceType, data.laundryAddon);

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Select your service</h2>
      <p className="mt-2 text-sm text-navy/60">
        Choose Standard or Deep Clean, then add laundry if you like.
      </p>

      <div className="mt-8 space-y-4">
        {SERVICE_OPTIONS.map((service) => {
          const selected = data.serviceType === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => update({ serviceType: service.id as ServiceType })}
              className={`w-full rounded-xl border-2 p-6 text-left transition-all ${
                selected
                  ? "border-gold bg-gold/5"
                  : "border-navy/10 hover:border-navy/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-navy">
                    {service.name}
                  </p>
                  <p className="mt-1 text-sm text-navy/60">{service.tagline}</p>
                </div>
                <p className="font-display text-2xl text-navy shrink-0">
                  ${service.price}
                </p>
              </div>
              <p className="mt-3 text-xs text-navy/50">{service.description}</p>
            </button>
          );
        })}
      </div>

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
