# Scaling Operations Guide

**The Cleaning CEO Blueprint — 100% Cleaner Academy**

Scaling a cleaning company means shifting from **doing the work** to **designing the system** that does the work. This guide covers multi-team dispatch, KPIs, virtual assistants, automation, and geographic expansion.

---

## The Scaling Phases

| Phase | Revenue | Team | Your Role |
|-------|---------|------|-----------|
| Solo | $0–$8K/mo | Just you | Cleaner + sales + admin |
| Builder | $8K–$25K/mo | 1–3 cleaners | Trainer + scheduler |
| Operator | $25K–$75K/mo | 4–10 cleaners | Manager + systems |
| CEO | $75K+/mo | Multi-team, VAs | Strategy + leadership |

**You cannot skip phases.** Hiring 10 cleaners before SOPs exist creates chaos, not scale.

---

## Multi-Team Dispatch

### When You Need Dispatch

- 4+ cleaners working same day
- Jobs across multiple cities
- Team cleans (2-person move-outs)
- You can't hold the schedule in your head

### Dispatch Board Structure

Organize by **day → zone → cleaner → jobs**

```
MONDAY — NORTH ZONE
├── Sarah (Lead)
│   ├── 9:00  — Johnson (Regular $150)
│   ├── 11:30 — Martinez (Regular $150)
│   └── 2:00  — Chen (Deep $300)
├── Mike
│   ├── 9:00  — Williams (Regular $150)
│   └── 12:00 — Park (Move-Out $450) + Lisa (helper)
```

### Dispatch Rules

| Rule | Why |
|------|-----|
| Cluster by zip code | Minimize drive time |
| Max 4–5 jobs per cleaner/day | Quality degrades after that |
| 30-min buffer between jobs | Overruns happen |
| Match skill to job type | Deep/move-out = experienced only |
| Same cleaner for recurring | Client retention |
| Publish schedule 7 days ahead | Team planning |

### Tools for Dispatch

| Tool | Best For |
|------|----------|
| Jobber | Auto-routing, drag-drop dispatch |
| Housecall Pro | Team view, GPS |
| ZenMaid | Cleaning-specific scheduling |
| Google Sheets | Under $15K/mo (free, manual) |

### Daily Dispatch Ritual (15 min)

1. Review tomorrow's schedule — gaps, conflicts, new bookings
2. Assign backups for high-risk slots (new clients, difficult homes)
3. Send schedule to team chat by 6 PM prior day
4. Morning check: all arrival check-ins received by 9:30 AM

---

## Key Performance Indicators (KPIs)

### Company-Level KPIs (Weekly Dashboard)

| KPI | Formula | Target |
|-----|---------|--------|
| Revenue | Sum of completed jobs | Trending up MoM |
| Gross margin | (Revenue - cleaner pay - supplies) / Revenue | 25–35% |
| Utilization | Booked hours / available hours | 75–85% |
| Callback rate | Re-cleans / total jobs | < 5% |
| Client retention | Recurring clients retained / total | > 85% quarterly |
| Average ticket | Revenue / jobs | $160–$220 residential |
| Lead-to-book | Booked / total leads | > 30% |
| No-show rate | Missed appointments / scheduled | < 3% |

### Marketing KPIs

| KPI | Target |
|-----|--------|
| Cost per lead (CPL) | < $25 |
| Cost per acquired customer (CAC) | < $100 or < 1 job profit |
| Google review velocity | 4+ new/month |
| Website conversion | 5–15% of visitors book |

### Team KPIs (Per Cleaner)

See [Team Management Guide](../07-teams/team-management-guide.md) — track on-time %, photo compliance, ratings, call-offs.

### KPI Review Cadence

| Meeting | Frequency | Who |
|---------|-----------|-----|
| Flash metrics | Daily (5 min) | Owner — revenue, schedule gaps |
| Weekly ops review | Weekly (30 min) | Owner + lead |
| Monthly P&L | Monthly (1 hr) | Owner + bookkeeper |
| Quarterly strategy | Quarterly (2 hr) | Leadership |

---

## Virtual Assistants (VAs)

### When to Hire a VA

- You spend 10+ hours/week on scheduling, emails, and data entry
- Missed calls are costing you $500+/week in lost bookings
- Revenue supports $1,500–$3,000/mo for part-time help

### VA Task List (Cleaning Company)

| Task | Hours/Week | Priority |
|------|------------|----------|
| Answer calls / return voicemails | 5–10 | High |
| Schedule jobs in booking software | 3–5 | High |
| Send confirmation/reminder texts | 2–3 | High |
| Process payments / follow failed cards | 2–3 | High |
| Respond to Yelp/Google messages | 2–4 | Medium |
| Update CRM notes | 2–3 | Medium |
| Request reviews (happy clients only) | 1–2 | Medium |
| Social media posts (from templates) | 2–3 | Low |
| Light bookkeeping data entry | 3–5 | Medium |

### VA Hiring

| Source | Rate |
|--------|------|
| OnlineJobs.ph (Philippines) | $5–$10/hr |
| Belay | $20+/hr (US) |
| Upwork | Varies |
| Local part-time | $15–$22/hr |

### VA Onboarding Checklist

- [ ] Access to scheduling software (limited permissions)
- [ ] Phone system (Grasshopper, OpenPhone, RingCentral)
- [ ] Script library ([phone](../12-customer-experience/phone-scripts.md), [text](../12-customer-experience/text-scripts.md), [email](../12-customer-experience/email-templates.md))
- [ ] FAQ doc (pricing, policies, service area)
- [ ] Escalation rules (complaints → owner immediately)
- [ ] No access to bank accounts or full financials initially

### VA KPIs

| Metric | Target |
|--------|--------|
| Call answer rate | 90%+ |
| Response time (messages) | < 1 hour |
| Scheduling errors | < 2/month |
| Client complaints about VA | 0 |

---

## Automation Stack

### Automate These First (Highest ROI)

| Process | Tool | Trigger |
|---------|------|---------|
| Booking confirmation | Jobber/Square/ZenMaid | New booking |
| 48-hr reminder | Same | 48 hrs before |
| Day-before reminder | Same | 24 hrs before |
| Review request | Zapier + CRM | 24 hrs after job, if rating positive |
| Payment after service | Stripe/Square | Job marked complete |
| Failed payment retry | Stripe | Auto-retry 3x |
| New lead notification | Slack/email | Form submission |

### Zapier / Make Automation Examples

```
Trigger: Job marked "Complete" in Jobber
→ Wait 24 hours
→ Send SMS review request (if no complaint logged)

Trigger: New Google Form intake
→ Create client in CRM
→ Notify VA in Slack
→ Send quote email template
```

### What NOT to Automate (Keep Human)

- Complaint resolution
- Custom quotes for unusual homes
- Termination conversations
- Pricing negotiations
- Damage claims

---

## Standard Operating at Scale

### Document Everything (Modules 5–9)

At scale, your business runs on:

- SOPs for every service type
- Checklists for every job phase
- Hiring and onboarding system
- Storage and inventory system
- Payment and cancellation policies
- Customer communication templates

**If it's not documented, it doesn't scale.**

### Quality Control at Scale

| Volume | QC Method |
|--------|-----------|
| 1–3 cleaners | Owner spot-checks 2 jobs/week |
| 4–8 cleaners | Lead cleaner inspections + photo audits |
| 9+ cleaners | Dedicated QC role, random 20% inspection rate |

### Financial Controls

- Weekly revenue reconciliation (bookings vs. bank deposits)
- Cleaner pay audit monthly
- Supply cost per job tracked quarterly
- Separate business accounts always
- Owner salary line item (pay yourself)

---

## Geographic Expansion

### When to Expand to a New City

- Existing zone at 85%+ utilization
- Turning away clients in adjacent city
- You have a lead cleaner willing to manage new zone

### Expansion Playbook

1. **Map service radius** — 30-minute max drive from storage
2. **Hire local cleaner** in new zone first (they know the area)
3. **Marketing localized** — Google Business Profile service area, Yelp, Nextdoor
4. **Storage** — second unit or mobile restock from lead's vehicle
5. **Don't expand until current zone is profitable**

### Multi-City Org Structure

```
Owner / CEO
├── Operations Manager (or Lead Cleaner promoted)
│   ├── Zone A Team (3 cleaners)
│   └── Zone B Team (3 cleaners)
├── VA / Office Manager
└── Bookkeeper (part-time CPA)
```

---

## Technology Stack at Scale

| Function | Starter | Scale |
|----------|---------|-------|
| Booking | Square | Jobber / Housecall Pro |
| Payments | Square / Stripe | Stripe + subscriptions |
| Communication | iMessage group | Slack / Connecteam |
| CRM | Spreadsheet | Jobber CRM / HubSpot |
| Accounting | Wave | QuickBooks Online |
| Payroll | Manual / Gusto | Gusto |
| Phone | Personal cell | OpenPhone |
| Automation | None | Zapier |
| Marketing | Manual posts | VA + Canva templates |

---

## Hiring for Scale

| Role | When to Hire | Monthly Cost |
|------|--------------|--------------|
| 2nd cleaner | Turning away jobs | Per job |
| Lead cleaner | 3+ cleaners | +$200–$400 stipend |
| VA | 10+ hrs admin/week | $800–$2,500 |
| Operations manager | $50K+/mo revenue | $3,500–$5,000 |
| Dedicated salesperson | Commercial focus | Commission |

Promote from within when possible — your best lead cleaner knows your standards.

---

## Common Scaling Mistakes

| Mistake | Fix |
|---------|-----|
| Hiring before systems | Document SOPs first |
| Underpricing at volume | Raise prices as demand grows |
| Owner still cleaning | Set "last clean date" and stick to it |
| No financial reporting | Monthly P&L non-negotiable |
| Ignoring callbacks | Track and coach — callbacks kill margins |
| Expanding too fast geographically | Dominate one zone first |
| No owner salary | Pay yourself or you're subsidizing |

---

## 12-Month Scaling Roadmap

| Month | Focus | Milestone |
|-------|-------|-----------|
| 1–2 | SOPs + first hire | 2 cleaners, documented processes |
| 3–4 | Recurring revenue | 60% recurring clients |
| 5–6 | VA + automation | Owner out of daily scheduling |
| 7–8 | Lead cleaner + QC | Callback rate < 5% |
| 9–10 | Marketing scale | Profitable paid ads |
| 11–12 | Second zone or commercial | Revenue $50K+/mo |

---

## CEO Time Allocation (At Scale)

| Activity | % of Week |
|----------|-----------|
| Strategy & growth | 30% |
| Team leadership (1-on-1s, training) | 25% |
| Key client relationships | 15% |
| Financial review | 10% |
| Marketing oversight | 10% |
| Cleaning (emergency only) | 0–5% |
| Admin | 0% (delegated) |

---

## The Ultimate Scaling Test

**Can your business run for two weeks without you?**

If not, you're self-employed. If yes, you're building a company.

Systems → People → KPIs → Automation → Freedom.

---

*Scale with discipline, not desperation. 100% Cleaner / The Cleaning CEO Blueprint.*
