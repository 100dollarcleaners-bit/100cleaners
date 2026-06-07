import Link from "next/link";
import { FileText } from "lucide-react";
import { clientForms } from "@/lib/forms";

export const metadata = {
  title: "Client Forms | 100 Cleaners",
  description: "Download and sign service forms for 100 Cleaners.",
};

export default function FormsIndexPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <Link href="/" className="font-display text-xl text-navy">
            100<span className="text-gold">Cleaners</span>
          </Link>
          <Link href="/" className="text-sm text-navy/60 hover:text-gold">
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-display text-3xl text-navy md:text-4xl">
          Client forms
        </h1>
        <p className="mt-4 text-navy/60">
          Open any form, then use <strong>Print / Save PDF</strong> to download.
          Sign and return on service day or email to{" "}
          <a
            href="mailto:100dollarcleaners@gmail.com"
            className="text-gold-dark hover:underline"
          >
            100dollarcleaners@gmail.com
          </a>
          .
        </p>

        <ul className="mt-12 space-y-4">
          {clientForms.map((form) => (
            <li key={form.slug}>
              <Link
                href={`/forms/${form.slug}`}
                className="flex items-start gap-4 rounded-xl border border-navy/10 bg-white p-6 transition-shadow hover:shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <FileText size={18} className="text-gold-dark" />
                </div>
                <div>
                  <p className="font-display text-lg text-navy">{form.title}</p>
                  <p className="mt-1 text-sm text-navy/60">{form.description}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gold-dark">
                    {form.summary}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
