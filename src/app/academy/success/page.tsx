import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { ACADEMY_COURSE_NAME } from "@/lib/academy";
import { BRAND_NAME } from "@/lib/constants";

interface Props {
  searchParams: { session_id?: string };
}

export const metadata = {
  title: `Enrollment Confirmed | ${BRAND_NAME} Academy`,
};

export default async function AcademySuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;
  let confirmed = false;
  let email: string | null = null;

  if (sessionId) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (
        session.payment_status === "paid" &&
        session.metadata?.product === "academy"
      ) {
        confirmed = true;
        email =
          session.customer_email ??
          session.customer_details?.email ??
          null;
      }
    } catch {
      // Payment likely went through even if lookup fails
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-academy-green/20">
          <CheckCircle size={40} className="text-academy-green-dark" />
        </div>

        <h1 className="mt-8 font-display text-3xl text-navy">
          {confirmed ? "You're enrolled!" : "Thank you!"}
        </h1>

        <p className="mt-4 text-navy/60">
          {confirmed ? (
            <>
              Welcome to <strong className="text-navy">{ACADEMY_COURSE_NAME}</strong>.
              {email && (
                <>
                  {" "}
                  A confirmation email is on its way to{" "}
                  <strong className="text-navy">{email}</strong>.
                </>
              )}{" "}
              You&apos;ll receive course access instructions within 24 hours.
            </>
          ) : (
            <>
              Your payment is being processed. You&apos;ll receive a confirmation
              email with next steps shortly.
            </>
          )}
        </p>

        <div className="mt-8 rounded-xl bg-white p-6 text-left text-sm text-navy/70 shadow-card">
          <p className="font-medium text-navy">What happens next:</p>
          <ul className="mt-3 space-y-2">
            <li>✔ Download all course materials now</li>
            <li>✔ Check your email for your receipt</li>
            <li>✔ Video lesson access arrives within 24 hours</li>
            <li>✔ Lifetime access + all future updates included</li>
          </ul>
        </div>

        <Link
          href={
            sessionId
              ? `/api/academy/unlock?session_id=${sessionId}`
              : "/academy/resources"
          }
          className="mt-6 inline-flex rounded-full bg-academy-green px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-academy-green-dark"
        >
          Download Course Materials
        </Link>

        <Link
          href="/academy"
          className="mt-4 block text-sm text-navy/50 hover:text-gold"
        >
          Back to Academy
        </Link>
      </div>
    </div>
  );
}
