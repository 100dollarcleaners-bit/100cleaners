# Booking & Payments Guide

**The Cleaning CEO Blueprint — 100% Cleaner Academy**

Getting paid should be frictionless for clients and predictable for you. This guide covers booking systems, payment processors, deposits, recurring billing, and the policies that protect your revenue.

---

## Booking System Overview

### What You Need

| Function | Why It Matters |
|----------|----------------|
| Online booking | Clients book 24/7 without phone tag |
| Calendar sync | No double-bookings |
| Automated reminders | Reduces no-shows 30–50% |
| Payment collection | Card on file before or after service |
| Client CRM | History, notes, recurring schedules |

### Recommended Platforms

| Platform | Strengths | Best For |
|----------|-----------|----------|
| **Stripe + booking add-on** | Best payment infrastructure, subscriptions | Scaling companies |
| **Square Appointments** | Simple, in-person + online, free tier | Starting out |
| **Jobber** | Field service + payments | Teams with cleaners |
| **Housecall Pro** | Scheduling, dispatch, payments | Growing teams |
| **ZenMaid** | Cleaning-specific | Residential focus |
| **Calendly + Stripe** | Lightweight | Solo operators |

**100% Cleaner recommendation:** Start with **Square** or **Jobber** for simplicity. Move to **Stripe** when you need subscriptions, complex pricing, or API integrations.

---

## Stripe Setup

### Why Stripe

- Industry-standard payment processing
- Recurring billing and subscriptions built-in
- Customer portal for card updates
- Works with most booking software
- 2.9% + $0.30 per transaction (US, card-not-present)

### Setup Checklist

- [ ] Create account at stripe.com (business type: cleaning services)
- [ ] Connect business bank account
- [ ] Enable payment links for one-off invoices
- [ ] Set up Stripe Checkout for website bookings
- [ ] Configure email receipts with your logo
- [ ] Enable Stripe Billing for recurring clients
- [ ] Test mode → live mode when ready

### Stripe Products You'll Use

| Product | Use Case |
|---------|----------|
| Payment Links | Send quote → client pays → confirmed |
| Checkout | Website booking with upfront payment |
| Invoicing | Net-15 commercial clients |
| Billing / Subscriptions | Weekly/bi-weekly recurring cleans |
| Customer Portal | Client updates card, views invoices |

### Stripe + Website Integration

If using Next.js or similar:
- Stripe Checkout for one-time bookings
- Stripe Customer + Subscription for recurring
- Webhook to confirm booking in your database after `checkout.session.completed`

**Never store raw card numbers yourself.** Let Stripe handle PCI compliance.

---

## Square Setup

### Why Square

- Free appointment scheduling
- POS for in-person card tap
- No monthly fee (pay per transaction)
- Client directory built-in

### Setup Checklist

- [ ] Square account + Square Appointments
- [ ] Service menu (Regular, Deep, Move-Out, add-ons)
- [ ] Booking widget on website / Google Business Profile
- [ ] Card on file at booking (optional but recommended)
- [ ] Automatic reminder texts (24 hr + 1 hr)
- [ ] Tip option (optional — more common for solo)

### Square Fees

- 2.6% + $0.10 (in-person)
- 3.3% + $0.30 (online invoiced)
- No monthly software fee for basic appointments

---

## Deposits — When & How Much

### Why Require Deposits

- Reduces no-shows and last-minute cancellations
- Filters non-serious inquiries
- Covers scheduling cost if client cancels inside window

### Recommended Deposit Structure

| Service | Deposit | When to Collect |
|---------|---------|-----------------|
| Regular recurring | None (card on file instead) | First booking |
| First-time deep clean | 25–50% | At booking |
| Move-out | 50% | At booking |
| Large custom quote ($500+) | 50% | At booking |
| Holiday / peak dates | 50% | At booking |

### Deposit Policy Language

> "A 50% deposit is required to reserve your appointment. Deposits are applied to your final invoice. Deposits are non-refundable within 48 hours of your scheduled service. See our [Cancellation Policy](cancellation-policy.md)."

### How to Collect

1. **At online booking** — Stripe/Square charges deposit automatically
2. **After phone quote** — send payment link via text/email
3. **Card on file** — authorize $1, charge deposit or full amount later

**Never start a move-out or deep clean without deposit or card on file.**

---

## Cancellation Fees

See full template: [Cancellation Policy](cancellation-policy.md)

### Quick Reference

| Notice | Fee |
|--------|-----|
| 48+ hours | No fee, full refund of deposit |
| 24–48 hours | 50% of quoted price |
| Less than 24 hours | 100% of quoted price |
| No-show | 100% + may require prepay for rebooking |

**Enforcement:** Charge the card on file. Document cancellation time in CRM.

---

## Recurring Bookings

### Recurring Schedule Types

| Frequency | Typical Client | Pricing |
|-----------|----------------|---------|
| Weekly | Large families, high-traffic homes | Standard rate |
| Bi-weekly | Most common recurring | Standard rate |
| Monthly | Light maintenance | +10–15% per visit (less frequent) |

### Setting Up Recurring in Stripe

1. Create Product: "Bi-Weekly Regular Clean — $150"
2. Create Price: recurring, every 2 weeks
3. Client subscribes at booking or after first visit
4. Charge triggers automatically; you schedule manually or via integration

### Setting Up Recurring in Square

1. Create recurring appointment series in Square Appointments
2. Enable automatic payments for each occurrence
3. Client receives reminder before each charge

### Recurring Client Rules

- Same cleaner when possible (consistency = retention)
- Lock pricing for 6–12 months, then annual review
- 30-day notice for client cancellation of recurring service
- Card must stay current — pause service if payment fails twice

---

## Subscriptions vs. Per-Visit Billing

| Model | Pros | Cons |
|-------|------|------|
| **Per-visit charge** | Pay only when serviced; easy skips | More transaction fees |
| **Monthly subscription** | Predictable revenue; one charge | Complex when client skips |
| **Package (e.g., 4 cleans/month)** | Upsell commitment | Refund complexity |

**100% Cleaner recommendation:** Per-visit auto-charge for residential. Monthly subscription for commercial contracts with fixed scope.

---

## Payment Timing Options

| Model | When Charged | Best For |
|-------|--------------|----------|
| Pay at booking | Upfront | Deep cleans, new clients |
| Pay after service | Within 24 hours | Established recurring |
| Card on file | Auto-charge after completion | Recurring residential |
| Invoice (Net 15) | Commercial only | Offices, property managers |

### Failed Payment Protocol

1. Automatic retry (Stripe: 3 attempts over 2 weeks)
2. Text client day 1: "Payment failed — update card here [link]"
3. Pause scheduling until resolved
4. Never send cleaner to new job if previous invoice unpaid

---

## Tipping

| Approach | Notes |
|----------|-------|
| Enable in app | 10–20% option after service |
| Cash preferred by some cleaners | Don't require |
| Company policy | Tips go 100% to cleaner (builds retention) |

---

## Tax & Invoicing

- Collect sales tax only if required in your state (many states exempt residential cleaning; verify locally)
- Issue receipt for every transaction
- Use [Invoice Template](invoice-template.md) for commercial clients
- 1099-K threshold — processors report to IRS; keep books clean

---

## Pricing Display on Booking Page

Show **starting at** prices to filter tire-kickers:

```
Regular Clean (up to 3 bed / 2 bath) — from $150
Deep Clean — from $300
Move-Out — custom quote

Final price confirmed after intake form or phone consult.
```

Add-ons as checkboxes with prices (+$50 laundry, +$40 oven, etc.)

---

## Security Best Practices

- [ ] HTTPS on booking page
- [ ] PCI compliance via Stripe/Square (never handle raw cards)
- [ ] Two-factor auth on payment dashboard
- [ ] Separate login for bookkeeper vs. owner
- [ ] Reconcile payouts weekly against job log

---

## Implementation Timeline

| Week | Action |
|------|--------|
| 1 | Choose platform, create account, add services |
| 2 | Embed booking widget on website, test booking |
| 3 | Connect payments, test deposit flow |
| 4 | Migrate recurring clients, send new payment links |
| 5 | Train team on "card on file" policy |

---

*Payments are not optional infrastructure — they are part of your product. 100% Cleaner / The Cleaning CEO Blueprint.*
