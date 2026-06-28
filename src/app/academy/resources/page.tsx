import { cookies } from "next/headers";
import Link from "next/link";
import { Lock } from "lucide-react";
import { DownloadList } from "@/components/academy/DownloadList";
import { PreviewUnlockForm } from "@/components/academy/PreviewUnlockForm";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import {
  COOKIE_NAME,
  verifyAcademyAccessToken,
} from "@/lib/academy-access";
import {
  academyDownloadSections,
  totalDownloadCount,
} from "@/lib/academy-downloads";
import { ACADEMY_LAUNCH_PRICE } from "@/lib/academy";
import { academyResourcesMetadata } from "@/lib/site-metadata";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = academyResourcesMetadata;

interface Props {
  searchParams: {
    error?: string;
    unlocked?: string;
  };
}

const errorMessages: Record<string, string> = {
  missing_session: "Invalid unlock link. Use the button on your confirmation page after payment.",
  unlock_failed: "We could not verify your payment. Wait a minute and try the link from your confirmation email again.",
  invalid_email: "Please enter a valid email address.",
  invalid_preview_password: "Incorrect preview password. Try again.",
  preview_not_configured:
    "Preview access is not set up yet. Contact support or enroll below.",
};

export default function AcademyResourcesPage({ searchParams }: Props) {
  const accessToken = cookies().get(COOKIE_NAME)?.value;
  const studentEmail = verifyAcademyAccessToken(accessToken);
  const errorMsg = searchParams.error
    ? errorMessages[searchParams.error] ?? "Something went wrong. Please try again."
    : null;
  const justUnlocked = searchParams.unlocked === "1";

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

        <main className="mx-auto flex max-w-lg flex-1 flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-navy/10">
            <Lock size={36} className="text-navy" />
          </div>
          <h1 className="mt-8 font-display text-3xl text-navy">Course Materials</h1>
          <p className="mt-4 text-navy/60">
            Preview downloads while we finish the course, or enroll for full lifetime
            access after payment.
          </p>
          {errorMsg && (
            <p className="mt-4 w-full max-w-sm rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMsg}
            </p>
          )}
          <PreviewUnlockForm />
          <div className="mt-10 flex w-full max-w-sm items-center gap-3 text-xs uppercase tracking-wider text-navy/40">
            <span className="h-px flex-1 bg-navy/10" />
            or enroll
            <span className="h-px flex-1 bg-navy/10" />
          </div>
          <Button href="/academy#enroll" variant="secondary" className="mt-6">
            Enroll — ${ACADEMY_LAUNCH_PRICE}
          </Button>
          <p className="mt-4 max-w-sm text-xs text-navy/45">
            Paid students: use the <strong className="text-navy">Download Course Materials</strong>{" "}
            button on your confirmation page after checkout.
          </p>
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
            Click <strong>View PDF</strong> to open in a new tab, or{" "}
            <strong>Download</strong> to save to your device. All files are
            professional PDFs — not editable source files.
          </p>
          {justUnlocked && (
            <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Access unlocked! Your downloads are ready below.
            </p>
          )}
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
              <div className="mt-4">
                <DownloadList section={section.module} items={section.items} />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
