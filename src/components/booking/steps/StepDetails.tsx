"use client";

import { Button } from "@/components/ui/Button";
import type { BookingFormData } from "@/lib/types";

interface Props {
  data: BookingFormData;
  update: (partial: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDetails({ data, update, onNext, onBack }: Props) {
  const valid =
    data.address.trim().length >= 5 &&
    data.bedroomCount >= 1 &&
    data.bedroomCount <= 3;

  return (
    <div>
      <h2 className="font-display text-2xl text-navy">Home details</h2>
      <p className="mt-2 text-sm text-navy/60">
        Tell us where to clean and any special requests.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-navy">
            Service address
          </label>
          <input
            id="address"
            type="text"
            value={data.address}
            onChange={(e) => update({ address: e.target.value })}
            placeholder="1234 Sunset Blvd, Los Angeles, CA 90028"
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-navy">
            Number of bedrooms (max 3)
          </label>
          <select
            id="bedrooms"
            value={data.bedroomCount}
            onChange={(e) =>
              update({ bedroomCount: parseInt(e.target.value, 10) })
            }
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} bedroom{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-navy">
            Special instructions (optional)
          </label>
          <textarea
            id="instructions"
            rows={4}
            value={data.specialInstructions}
            onChange={(e) => update({ specialInstructions: e.target.value })}
            placeholder="Gate code, pets, areas to focus on..."
            className="mt-2 w-full resize-none rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy placeholder:text-navy/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={!valid}>
          Continue
        </Button>
      </div>
    </div>
  );
}
