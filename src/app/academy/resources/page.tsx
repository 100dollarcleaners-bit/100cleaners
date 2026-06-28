import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Download, FileSpreadsheet, FileText, Lock } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import {
  COOKIE_NAME,
  TOKEN_TTL_MS,
  createAcademyAccessToken,
  verifyAcademyAccessToken,
  verifyAcademyStripeSession,
} from "@/lib/academy-access";
import {
  academyDownloadSections,
  totalDownloadCount,
} from "@/lib/academy-downloads";
import { ACADEMY_COURSE_NAME, ACADEMY_LAUNCH_PRICE } from "@/lib/academy";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: `Course Materials | ${ACADEMY_COURSE_NAME}`,
  description: `Download all ${totalDownloadCount} templates, SOPs, checklists, and spreadsheets.`,
};

const typeIcons = {
  guide: FileText,
  checklist: FileText,
  template: FileText,
  spreadsheet: FileSpreadsheet,
  contract: FileText,
};

const typeLabels = {
  guide: "PDF Guide",
  checklist: "PDF Checklist",
  template: "PDF Template",
  spreadsheet: "Spreadsheet",
  contract: "PDF Contract",
};

interface Props {
  searchParams: { session_id?: string };
}

export default async function AcademyResourcesPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;

  if (sessionId) {
    const enrollment = await verifyAcademyStripeSession(sessionId);
    if (enrollment) {
      const token = createAcademyAccessToken(enrollment.email);
      cookies().set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: TOKEN_TTL_MS / 1000,
        path: "/",
      });
      redirect("/academy/resources");
    }
  }

  const accessToken = cookies().get(COOKIE_NAME)?.value;
  const studentEmail = verifyAcademyAccessToken(accessToken);

  if (!studentEmail) {
    return (
      <div className="flex min-h-screen flex-col bg-cream">
        <header className="border-b border-navy/10 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
            <Link href="/" className="font-display text-xl text-navy">
              <BrandLogo />
            </Link>
            <Link href="/academy" className="text-sm text-navy/60 hover:text-gold">
              ← Back to Academy
            </Link>
          </div>
        </header>

        <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy/10">
            <Lock size={36} className="text-navy" />
          </div>
          <h1 className="mt-8 font-display text-3xl text-navy">Enrolled Students Only</h1>
          <p className="mt-4 text-navy/60">
            Course materials are available to students who have completed enrollment.
            After payment, use the link in your confirmation email or return from the
            success page to unlock downloads.
          </p>
          <Button href="/academy#enroll" className="mt-8">
            Enroll — ${ACADEMY_LAUNCH_PRICE}
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="font-display text-xl text-navy">
            <BrandLogo />
          </Link>
          <Link href="/academy" className="text-sm text-navy/60 hover:text-gold">
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
            {totalDownloadCount} professional PDFs, templates, and spreadsheets.
            Click any item to download — files open as PDFs ready to print or save.
          </p>
          <p className="mt-2 text-xs text-navy/40">
            Access granted for {studentEmail}
          </p>
        </div>

        <div className="mt-12 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          <strong>Before you use these:</strong> Replace all [bracketed placeholders]
          with your company info. Have a local attorney review the Service Agreement
          and Employee Handbook before use.
        </div>

        <div className="mt-12 space-y-10">
          {academyDownloadSections.map((section) => (
            <section key={section.module}>
              <h2 className="font-display text-xl text-navy">{section.module}</h2>
              <ul className="mt-4 divide-y divide-navy/10 rounded-xl border border-navy/10 bg-white">
                {section.items.map((item) => {
                  const Icon = typeIcons[item.type];
                  const downloadUrl = `/api/academy/download?file=${encodeURIComponent(item.fileKey)}`;
                  return (
                    <li key={item.fileKey}>
                      <a
                        href={downloadUrl}
                        className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-cream/50"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="shrink-0 text-academy-blue" />
                          <span className="text-sm font-medium text-navy">
                            {item.title}
                          </span>
                        </div>
                        <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-academy-blue/10 px-3 py-1 text-xs font-medium text-academy-blue">
                          <Download size={12} />
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
      </main>
    </div>
  );
}
