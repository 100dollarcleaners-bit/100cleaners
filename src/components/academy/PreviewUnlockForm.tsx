"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function PreviewUnlockForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/academy/preview-unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data.message ??
            "Could not unlock preview access. Check your email and password."
        );
        setLoading(false);
        return;
      }

      router.push("/academy/resources?unlocked=1");
      router.refresh();
    } catch {
      setError("Network error. Check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-sm rounded-xl border-2 border-academy-blue/20 bg-white p-6 text-left shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-academy-blue">
        Building Preview
      </p>
      <p className="mt-2 text-sm text-navy/60">
        Enter your preview credentials to test downloads while we finish the course.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-navy/15 bg-cream/50 px-4 py-3 text-navy focus:border-academy-blue focus:outline-none focus:ring-1 focus:ring-academy-blue"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

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
