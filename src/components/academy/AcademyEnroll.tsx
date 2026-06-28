"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ACADEMY_COURSE_NAME,
  ACADEMY_LAUNCH_PRICE,
  ACADEMY_REGULAR_PRICE,
  academyIncludes,
} from "@/lib/academy";

export function AcademyEnroll() {
  const searchParams = useSearchParams();
  const cancelled = searchParams.get("cancelled");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    cancelled ? "Checkout was cancelled. You can enroll when ready." : null
  );

  const valid =
    name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEnroll = async () => {
    if (!valid) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/academy/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          customerEmail: email.trim().toLowerCase(),
        }),
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
    <div
      id="enroll"
      className="rounded-2xl border border-navy/10 bg-white p-8 shadow-premium lg:p-10"
    >
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-academy-blue">
          Launch Special
        </p>
        <h2 className="mt-2 font-display text-3xl text-navy">{ACADEMY_COURSE_NAME}</h2>
        <p className="mt-3 text-sm text-navy/60">
          Everything you need to start, grow, and scale a profitable residential
          cleaning business.
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-1">
        <p className="text-sm text-navy/40 line-through">${ACADEMY_REGULAR_PRICE}</p>
        <p className="font-display text-5xl text-academy-blue">
          ${ACADEMY_LAUNCH_PRICE}
        </p>
        <p className="text-xs font-medium uppercase tracking-wider text-navy/50">
          One-time payment · Lifetime access
        </p>
      </div>

      <ul className="mt-8 space-y-2.5">
        {academyIncludes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-navy/80">
            <span className="mt-0.5 text-academy-green">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4">
        <div>
          <label htmlFor="enroll-name" className="block text-sm font-medium text-navy">
            Full name
          </label>
          <input
            id="enroll-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
          />
        </div>
        <div>
          <label htmlFor="enroll-email" className="block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="enroll-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="mt-6">
        <Button
          type="button"
          onClick={handleEnroll}
          disabled={!valid || loading}
          className="w-full !bg-academy-green !text-white hover:!bg-academy-green-dark !shadow-academy-green/20"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Redirecting to checkout…
            </>
          ) : (
            `Enroll Now — $${ACADEMY_LAUNCH_PRICE}`
          )}
        </Button>
      </div>

      <p className="mt-4 text-center text-xs text-navy/45">
        Secure payment via Stripe. Bonus: free updates as new lessons are added.
      </p>
    </div>
  );
}
