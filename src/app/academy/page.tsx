import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  BarChart3,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { AcademyCurriculum } from "@/components/academy/AcademyCurriculum";
import { AcademyEnroll } from "@/components/academy/AcademyEnroll";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { Button } from "@/components/ui/Button";
import {
  ACADEMY_COURSE_NAME,
  ACADEMY_LAUNCH_PRICE,
  academyBenefits,
  academyBonusModules,
  academyDownloads,
  academyEcosystem,
  academyProfitExample,
} from "@/lib/academy";
import { totalDownloadCount } from "@/lib/academy-downloads";
import { BRAND_NAME } from "@/lib/constants";

export const metadata = {
  title: `${ACADEMY_COURSE_NAME} | ${BRAND_NAME}`,
  description:
    "Start or scale a cleaning business using the exact systems to build a company that runs without you. Launch special $249.",
};

const benefitIcons = [BarChart3, Users, ClipboardList, TrendingUp];

function EnrollFallback() {
  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-10 text-center text-navy/50">
      Loading enrollment…
    </div>
  );
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="font-display text-xl text-navy">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden text-sm text-navy/60 transition-colors hover:text-gold sm:block"
            >
              Home
            </Link>
            <Button href="#enroll" variant="primary" className="!px-6 !py-2.5 !text-xs">
              Enroll — ${ACADEMY_LAUNCH_PRICE}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(30,111,217,0.25)_0%,_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(124,181,24,0.15)_0%,_transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-academy-green">
                {BRAND_NAME} Business Academy
              </p>
              <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl lg:text-6xl">
                Start & Scale Your{" "}
                <span className="italic text-academy-blue">Cleaning Business</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/75">
                {ACADEMY_COURSE_NAME} — the step-by-step system to build a
                profitable residential cleaning company that can eventually run
                without you.
              </p>
              <p className="mt-4 text-sm text-white/60">
                Not just how to clean. How to build a real business using the
                exact systems we use to make money.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  href="#enroll"
                  className="!bg-academy-green !text-white hover:!bg-academy-green-dark"
                >
                  Enroll Now — ${ACADEMY_LAUNCH_PRICE}
                </Button>
                <Button href="#curriculum" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-navy">
                  View Curriculum
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-premium">
                <Image
                  src="/academy/flyer.png"
                  alt={`${ACADEMY_COURSE_NAME} promotional flyer`}
                  width={600}
                  height={750}
                  className="w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-academy-blue px-5 py-3 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Launch Special
                </p>
                <p className="font-display text-3xl text-white">${ACADEMY_LAUNCH_PRICE}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-3xl text-navy sm:text-4xl">
            A Business Accelerator, Not Just Videos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy/60">
            Everything you need to start, grow, and scale a profitable residential
            cleaning business — structured like a real company-building program.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {academyBenefits.map((benefit, i) => {
            const Icon = benefitIcons[i];
            return (
              <div
                key={benefit.title}
                className="rounded-2xl border border-navy/10 bg-white p-6 shadow-card"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-academy-blue/10">
                  <Icon size={24} className="text-academy-blue" />
                </div>
                <h3 className="mt-4 font-medium text-navy">{benefit.title}</h3>
                <p className="mt-2 text-sm text-navy/60">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main content + sticky enroll */}
      <section className="border-t border-navy/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              {/* Curriculum */}
              <div id="curriculum">
                <h2 className="font-display text-3xl text-navy">
                  13 Modules + Bonus Content
                </h2>
                <p className="mt-3 text-navy/60">
                  From startup paperwork to scaling multiple teams — every system
                  documented and ready to implement.
                </p>
                <div className="mt-10">
                  <AcademyCurriculum />
                </div>
              </div>

              {/* Bonus modules */}
              <div className="mt-16">
                <h3 className="font-display text-2xl text-navy">Bonus Modules</h3>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {academyBonusModules.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 rounded-lg bg-cream px-4 py-3 text-sm text-navy/80"
                    >
                      <span className="text-academy-green">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Profit model */}
              <div className="mt-16">
                <h3 className="font-display text-2xl text-navy">Your Profit Model</h3>
                <p className="mt-3 text-sm text-navy/60">
                  Sample splits — adjust for your local labor costs, taxes,
                  insurance, travel, and overhead.
                </p>
                <div className="mt-6 overflow-hidden rounded-xl border border-navy/10">
                  <table className="w-full text-sm">
                    <thead className="bg-navy text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Service</th>
                        <th className="px-4 py-3 text-right font-medium">Customer Pays</th>
                        <th className="px-4 py-3 text-right font-medium">Cleaner Gets</th>
                        <th className="px-4 py-3 text-right font-medium">Your Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {academyProfitExample.map((row) => (
                        <tr key={row.service} className="border-t border-navy/10">
                          <td className="px-4 py-3 font-medium text-navy">{row.service}</td>
                          <td className="px-4 py-3 text-right text-navy/70">${row.customerPays}</td>
                          <td className="px-4 py-3 text-right text-navy/70">${row.cleanerGets}</td>
                          <td className="px-4 py-3 text-right font-semibold text-academy-green-dark">
                            ${row.companyProfit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Downloads */}
              <div className="mt-16">
                <h3 className="font-display text-2xl text-navy">
                  {totalDownloadCount} Included Downloads
                </h3>
                <p className="mt-3 text-sm text-navy/60">
                  Templates, checklists, and calculators included with enrollment —
                  customize and use immediately.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {academyDownloads.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-academy-green/30 bg-academy-green/5 px-4 py-2 text-xs font-medium text-navy/80"
                    >
                      ✔ {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ecosystem */}
              <div className="mt-16">
                <h3 className="font-display text-2xl text-navy">
                  Grow With Us
                </h3>
                <p className="mt-3 text-sm text-navy/60">
                  Multiple ways to keep working together as your business scales.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {academyEcosystem.map((tier) => (
                    <div
                      key={tier.name}
                      className={`rounded-xl border p-5 ${
                        tier.highlight
                          ? "border-academy-blue bg-academy-blue/5"
                          : "border-navy/10 bg-cream/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-navy">{tier.name}</h4>
                        <span className="shrink-0 text-sm font-semibold text-academy-blue">
                          {tier.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-navy/60">{tier.description}</p>
                      {!tier.highlight && (
                        <p className="mt-3 text-xs text-navy/40">
                          Contact us after enrolling to learn more.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky enroll card */}
            <div className="lg:sticky lg:top-8">
              <Suspense fallback={<EnrollFallback />}>
                <AcademyEnroll />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <DollarSign size={40} className="mx-auto text-academy-green" />
          <h2 className="mt-6 font-display text-3xl sm:text-4xl">
            Ready to Build Your Cleaning Empire?
          </h2>
          <p className="mt-4 text-white/70">
            Join {ACADEMY_COURSE_NAME} and get lifetime access to every module,
            template, and future update.
          </p>
          <Button
            href="#enroll"
            className="mt-10 !bg-academy-green !text-white hover:!bg-academy-green-dark"
          >
            Enroll Now — ${ACADEMY_LAUNCH_PRICE}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-navy/10 bg-white py-8 text-center text-xs text-navy/40">
        <p>
          © {new Date().getFullYear()} {BRAND_NAME}.{" "}
          <Link href="/" className="hover:text-gold">
            Back to home
          </Link>
          {" · "}
          <Link href="/booking" className="hover:text-gold">
            Book a clean
          </Link>
        </p>
      </footer>
    </div>
  );
}
