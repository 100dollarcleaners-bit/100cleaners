"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TIME_SLOTS } from "@/lib/constants";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

function minDateString() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function StepDateTime({ data, update, onNext, onBack }: Props) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!data.bookingDate) {
      setBookedSlots([]);
      return;
    }

    let cancelled = false;
    setLoadingSlots(true);

    fetch(`/api/slots?date=${data.bookingDate}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) setBookedSlots(json.booked ?? []);
      })
      .catch(() => {
        if (!cancelled) setBookedSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });

    return () => {
      cancelled = true;
    };
  }, [data.bookingDate]);

  const valid =
    data.bookingDate.length > 0 &&
    data.bookingTime.length > 0 &&
    !bookedSlots.includes(data.bookingTime);

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Pick date & time</h2>
      <p className="mt-2 text-sm text-navy/60">
        Each appointment reserves a 3-hour window. Unavailable slots are shown in grey.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-navy">
            Preferred date
          </label>
          <input
            id="date"
            type="date"
            min={minDateString()}
            value={data.bookingDate}
            onChange={(e) =>
              update({ bookingDate: e.target.value, bookingTime: "" })
            }
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        {data.bookingDate && (
          <div>
            <p className="text-sm font-medium text-navy">Time window</p>
            {loadingSlots ? (
              <p className="mt-4 text-sm text-navy/50">Checking availability…</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TIME_SLOTS.map((slot) => {
                  const booked = bookedSlots.includes(slot.value);
                  const selected = data.bookingTime === slot.value;

                  return (
                    <button
                      key={slot.value}
                      type="button"
                      disabled={booked}
                      onClick={() => update({ bookingTime: slot.value })}
                      className={`rounded-lg border-2 px-4 py-4 text-sm font-medium transition-all ${
                        booked
                          ? "cursor-not-allowed border-navy/5 bg-navy/5 text-navy/30 line-through"
                          : selected
                            ? "border-gold bg-gold/10 text-navy"
                            : "border-navy/10 text-navy hover:border-gold/50"
                      }`}
                    >
                      {slot.label}
                      {booked && (
                        <span className="mt-1 block text-[10px] font-normal uppercase tracking-wide">
                          Booked
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={!valid || loadingSlots}>
          Continue
        </Button>
      </div>
    </div>
  );
}
