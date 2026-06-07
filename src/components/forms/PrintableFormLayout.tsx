"use client";

import Link from "next/link";
import { Download, Printer } from "lucide-react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function PrintableFormLayout({ title, children }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-cream">
      <div className="no-print sticky top-0 z-50 border-b border-navy/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/forms"
            className="text-sm text-navy/60 hover:text-gold"
          >
            ← All forms
          </Link>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-light"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-full border-2 border-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold/10"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
        <p className="border-t border-navy/5 px-6 py-2 text-center text-xs text-navy/50">
          Use Print → &ldquo;Save as PDF&rdquo; to download a signed copy for your records.
        </p>
      </div>

      <article className="form-document mx-auto max-w-4xl bg-white px-8 py-12 shadow-card print:shadow-none md:px-16 md:py-16">
        <header className="border-b border-navy/10 pb-8">
          <p className="font-display text-2xl text-navy">
            100<span className="text-gold-dark">Cleaners</span>
          </p>
          <p className="mt-1 text-sm text-navy/50">
            Los Angeles, CA · (213) 761-4379 · 100dollarcleaners@gmail.com
          </p>
          <h1 className="mt-6 font-display text-3xl text-navy">{title}</h1>
        </header>
        <div className="form-body mt-8 text-sm leading-relaxed text-navy/90">
          {children}
        </div>
      </article>
    </div>
  );
}
