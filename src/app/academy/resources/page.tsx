import Link from "next/link";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  academyDownloadSections,
  totalDownloadCount,
} from "@/lib/academy-downloads";
import { ACADEMY_COURSE_NAME } from "@/lib/academy";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: `Course Materials | ${ACADEMY_COURSE_NAME}`,
  description: `Download all ${totalDownloadCount} templates, SOPs, checklists, and spreadsheets from ${ACADEMY_COURSE_NAME}.`,
};

const typeIcons = {
  guide: FileText,
  checklist: FileText,
  template: FileText,
  spreadsheet: FileSpreadsheet,
  contract: FileText,
};

const typeLabels = {
  guide: "Guide",
  checklist: "Checklist",
  template: "Template",
  spreadsheet: "Spreadsheet",
  contract: "Contract",
};

export default function AcademyResourcesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="font-display text-xl text-navy">
            <BrandLogo />
          </Link>
          <Link
            href="/academy"
            className="text-sm text-navy/60 transition-colors hover:text-gold"
          >
            ← Back to Academy
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-academy-blue">
            {BRAND_NAME} Academy
          </p>
          <h1 className="mt-3 font-display text-3xl text-navy sm:text-4xl">
            Course Download Pack
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-navy/60">
            {totalDownloadCount} professional templates, SOPs, checklists, scripts,
            and spreadsheets — everything except the video lessons. Open any file
            in your browser and print to PDF, or open CSV files in Google Sheets.
          </p>
          <a
            href="/academy/downloads/README.md"
            download
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-academy-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-academy-blue-dark"
          >
            <Download size={16} />
            Download Full Index
          </a>
        </div>

        <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Before you use these:</strong> Replace all [bracketed placeholders]
          with your company info. Have a local attorney review the Service Agreement
          and Employee Handbook before use. IC vs employee classification varies by
          state — consult a professional.
        </div>

        <div className="mt-12 space-y-10">
          {academyDownloadSections.map((section) => (
            <section key={section.module}>
              <h2 className="font-display text-xl text-navy">{section.module}</h2>
              <ul className="mt-4 divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
                {section.items.map((item) => {
                  const Icon = typeIcons[item.type];
                  return (
                    <li key={item.path}>
                      <a
                        href={item.path}
                        download
                        className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-cream/50"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="shrink-0 text-academy-blue" />
                          <span className="text-sm font-medium text-navy">
                            {item.title}
                          </span>
                        </div>
                        <span className="shrink-0 rounded-full bg-navy/5 px-3 py-1 text-xs text-navy/50">
                          {typeLabels[item.type]}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-navy p-8 text-center text-white">
          <h2 className="font-display text-2xl">Video Lessons</h2>
          <p className="mt-3 text-white/70">
            Video modules are delivered separately after enrollment. Check your
            welcome email for access instructions.
          </p>
          <Link
            href="/academy"
            className="mt-6 inline-flex rounded-full bg-academy-green px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-academy-green-dark"
          >
            Back to Academy
          </Link>
        </div>
      </main>
    </div>
  );
}
