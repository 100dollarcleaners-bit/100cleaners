"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function PreviewUnlockForm() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-10 w-full max-w-sm rounded-xl border border-navy/10 bg-white p-6 text-left shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-academy-blue">
        Building Preview
      </p>
      <p className="mt-2 text-sm text-navy/60">
        Enter your preview credentials to test downloads while we finish the course.
      </p>

      <form
        action="/api/academy/preview-unlock"
        method="POST"
        className="mt-5 space-y-4"
        onSubmit={() => setLoading(true)}
      >
        <div>
          <label htmlFor="preview-email" className="block text-sm font-medium text-navy">
            Email
          </label>
          <input
            id="preview-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
          />
        </div>
        <div>
          <label htmlFor="preview-password" className="block text-sm font-medium text-navy">
            Preview password
          </label>
          <input
            id="preview-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-academy-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-academy-blue-dark disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Unlocking…
            </>
          ) : (
            "Preview Access"
          )}
        </button>
      </form>
    </div>
  );
}
