# 100 Cleaners

Premium home cleaning booking web app for Los Angeles homeowners. Built with Next.js 14, Tailwind CSS, Framer Motion, Stripe, Supabase, and Resend.

## Features

- **Landing page** — Hero, services, how it works, trust badges, reviews, footer
- **5-step booking flow** — Service → Details → Date/Time → Contact → Stripe deposit
- **Real-time slot availability** — 3-hour blocks (6–9am, 9am–12pm, 12–3pm, 3–6pm, 6–9pm, 9pm–12am); booked slots greyed out
- **Stripe Checkout** — $25 deposit to confirm
- **Webhook** — Confirms `deposit_paid` in Supabase after payment
- **Resend emails** — Confirmation to customer and business owner

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Copy **Project URL** and **service_role** key (Settings → API)

### 3. Stripe

Only **one** online charge: the **$25 deposit** at booking. The service total ($100 + optional $50 laundry) is collected on the day of the clean — not a second Stripe payment in this app.

| Variable | Where to get it | Required? |
|----------|-----------------|-----------|
| `STRIPE_SECRET_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/apikeys) → Secret key (`sk_live_...` or `sk_test_...`) | Yes |
| `STRIPE_WEBHOOK_SECRET` | Developers → Webhooks → Add endpoint → Signing secret (`whsec_...`) | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same API keys page → Publishable key | Optional today |

**Production webhook:** `https://your-domain.com/api/webhooks/stripe` — event: `checkout.session.completed`

Local testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### 4. Resend

1. Verify your domain at [resend.com](https://resend.com)
2. Set `RESEND_FROM_EMAIL`, `RESEND_API_KEY`, and `BUSINESS_OWNER_EMAIL`

### 5. Environment variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push to GitHub and import in [Vercel](https://vercel.com)
2. Add all environment variables from `.env.example`
3. Set `NEXT_PUBLIC_APP_URL` to your production URL
4. Configure Stripe webhook to point to `/api/webhooks/stripe`

## Project structure

```
src/
  app/              # Pages & API routes
  components/       # UI, landing, booking wizard
  lib/              # Supabase, Stripe, Resend, constants
supabase/
  schema.sql        # Database schema
```

## Business logic

- Slots are blocked when `deposit_paid = true` OR a pending booking was created within the last 2 hours (checkout hold)
- Checkout creates a pending booking, then redirects to Stripe
- Webhook sets `deposit_paid = true` and sends confirmation emails
