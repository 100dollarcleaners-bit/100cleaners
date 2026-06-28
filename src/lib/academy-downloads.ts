export interface AcademyDownload {
  title: string;
  path: string;
  module: string;
  type: "guide" | "checklist" | "template" | "spreadsheet" | "contract";
}

export const academyDownloadSections: {
  module: string;
  items: AcademyDownload[];
}[] = [
  {
    module: "Module 1 — Getting Started",
    items: [
      { title: "LLC Checklist", path: "/academy/downloads/01-getting-started/llc-checklist.md", module: "1", type: "checklist" },
      { title: "Business Startup Checklist", path: "/academy/downloads/01-getting-started/startup-checklist.md", module: "1", type: "checklist" },
    ],
  },
  {
    module: "Module 2 — Branding & Marketing",
    items: [
      { title: "Local Marketing Setup Guide", path: "/academy/downloads/02-branding/local-marketing-setup-guide.md", module: "2", type: "guide" },
    ],
  },
  {
    module: "Module 3 — Pricing",
    items: [
      { title: "Professional Pricing Guide", path: "/academy/downloads/03-pricing/pricing-guide.md", module: "3", type: "guide" },
      { title: "Pricing Calculator", path: "/academy/downloads/03-pricing/pricing-calculator.csv", module: "3", type: "spreadsheet" },
      { title: "Estimate Phone Scripts", path: "/academy/downloads/03-pricing/estimate-scripts.md", module: "3", type: "template" },
      { title: "Quote Template", path: "/academy/downloads/03-pricing/quote-template.md", module: "3", type: "template" },
    ],
  },
  {
    module: "Module 4 — Products & Equipment",
    items: [
      { title: "Product Shopping List", path: "/academy/downloads/04-products/product-shopping-list.md", module: "4", type: "guide" },
      { title: "Equipment List", path: "/academy/downloads/04-products/equipment-list.md", module: "4", type: "guide" },
      { title: "Startup Cost Estimate", path: "/academy/downloads/04-products/startup-cost-estimate.md", module: "4", type: "guide" },
    ],
  },
  {
    module: "Module 5 — SOPs",
    items: [
      { title: "Regular Cleaning SOP", path: "/academy/downloads/05-sops/regular-cleaning-sop.md", module: "5", type: "guide" },
      { title: "Deep Cleaning SOP", path: "/academy/downloads/05-sops/deep-cleaning-sop.md", module: "5", type: "guide" },
      { title: "Move-Out SOP", path: "/academy/downloads/05-sops/move-out-sop.md", module: "5", type: "guide" },
      { title: "Airbnb Turnover SOP", path: "/academy/downloads/05-sops/airbnb-turnover-sop.md", module: "5", type: "guide" },
      { title: "Kitchen SOP", path: "/academy/downloads/05-sops/kitchen-sop.md", module: "5", type: "guide" },
      { title: "Bathroom SOP", path: "/academy/downloads/05-sops/bathroom-sop.md", module: "5", type: "guide" },
      { title: "Dusting SOP", path: "/academy/downloads/05-sops/dusting-sop.md", module: "5", type: "guide" },
      { title: "Floor SOP", path: "/academy/downloads/05-sops/floor-sop.md", module: "5", type: "guide" },
      { title: "Window SOP", path: "/academy/downloads/05-sops/window-sop.md", module: "5", type: "guide" },
      { title: "Laundry SOP", path: "/academy/downloads/05-sops/laundry-sop.md", module: "5", type: "guide" },
    ],
  },
  {
    module: "Module 5 — Checklists",
    items: [
      { title: "Quality Control Checklist", path: "/academy/downloads/05-checklists/quality-control-checklist.md", module: "5", type: "checklist" },
      { title: "Cleaner Daily Checklist", path: "/academy/downloads/05-checklists/cleaner-daily-checklist.md", module: "5", type: "checklist" },
      { title: "Arrival Checklist", path: "/academy/downloads/05-checklists/arrival-checklist.md", module: "5", type: "checklist" },
      { title: "Leaving Checklist", path: "/academy/downloads/05-checklists/leaving-checklist.md", module: "5", type: "checklist" },
      { title: "Photo Documentation Checklist", path: "/academy/downloads/05-checklists/photo-checklist.md", module: "5", type: "checklist" },
      { title: "Manager Inspection Checklist", path: "/academy/downloads/05-checklists/inspection-checklist.md", module: "5", type: "checklist" },
      { title: "Regular Cleaning Checklist", path: "/academy/downloads/05-checklists/regular-clean-checklist.md", module: "5", type: "checklist" },
      { title: "Deep Cleaning Checklist", path: "/academy/downloads/05-checklists/deep-clean-checklist.md", module: "5", type: "checklist" },
      { title: "Move-Out Checklist", path: "/academy/downloads/05-checklists/move-out-checklist.md", module: "5", type: "checklist" },
    ],
  },
  {
    module: "Module 6 — Hiring & Scaling",
    items: [
      { title: "Interview Questions & Scoring Rubric", path: "/academy/downloads/06-hiring/interview-questions.md", module: "6", type: "template" },
      { title: "Hiring Guide", path: "/academy/downloads/06-hiring/hiring-guide.md", module: "6", type: "guide" },
      { title: "Profit Calculator", path: "/academy/downloads/06-hiring/profit-calculator.csv", module: "6", type: "spreadsheet" },
    ],
  },
  {
    module: "Module 7 — Managing Teams",
    items: [
      { title: "Team Management Guide", path: "/academy/downloads/07-teams/team-management-guide.md", module: "7", type: "guide" },
    ],
  },
  {
    module: "Module 8 — Business Credit",
    items: [
      { title: "Business Credit Guide", path: "/academy/downloads/08-business-credit/business-credit-guide.md", module: "8", type: "guide" },
    ],
  },
  {
    module: "Module 9 — Operations",
    items: [
      { title: "Storage Organization Guide", path: "/academy/downloads/09-operations/storage-organization-guide.md", module: "9", type: "guide" },
      { title: "Weekly Inventory Sheet", path: "/academy/downloads/09-operations/weekly-inventory-sheet.csv", module: "9", type: "spreadsheet" },
    ],
  },
  {
    module: "Module 10 — Booking & Payments",
    items: [
      { title: "Booking & Payments Guide", path: "/academy/downloads/10-booking/booking-payments-guide.md", module: "10", type: "guide" },
      { title: "Cancellation Policy", path: "/academy/downloads/10-booking/cancellation-policy.md", module: "10", type: "template" },
      { title: "Invoice Template", path: "/academy/downloads/10-booking/invoice-template.md", module: "10", type: "template" },
    ],
  },
  {
    module: "Module 11 — Yelp",
    items: [
      { title: "Yelp Masterclass Guide", path: "/academy/downloads/11-yelp/yelp-masterclass-guide.md", module: "11", type: "guide" },
    ],
  },
  {
    module: "Module 12 — Customer Experience",
    items: [
      { title: "Phone Scripts", path: "/academy/downloads/12-customer-experience/phone-scripts.md", module: "12", type: "template" },
      { title: "Text Message Scripts", path: "/academy/downloads/12-customer-experience/text-scripts.md", module: "12", type: "template" },
      { title: "Review Request Templates", path: "/academy/downloads/12-customer-experience/review-request-templates.md", module: "12", type: "template" },
      { title: "Email Templates", path: "/academy/downloads/12-customer-experience/email-templates.md", module: "12", type: "template" },
    ],
  },
  {
    module: "Module 13 — Scaling",
    items: [
      { title: "Scaling Operations Guide", path: "/academy/downloads/13-scaling/scaling-operations-guide.md", module: "13", type: "guide" },
    ],
  },
  {
    module: "Bonus Materials",
    items: [
      { title: "Employee Handbook Template", path: "/academy/downloads/bonus/employee-handbook-template.md", module: "bonus", type: "template" },
      { title: "Customer Intake Form", path: "/academy/downloads/bonus/customer-intake-form.md", module: "bonus", type: "template" },
      { title: "Service Agreement / Contract", path: "/academy/downloads/bonus/service-agreement-contract.md", module: "bonus", type: "contract" },
      { title: "Referral Program", path: "/academy/downloads/bonus/referral-program.md", module: "bonus", type: "guide" },
      { title: "Flyer & Door Hanger Copy", path: "/academy/downloads/bonus/flyer-door-hanger-copy.md", module: "bonus", type: "template" },
      { title: "Emergency Procedures", path: "/academy/downloads/bonus/emergency-procedures.md", module: "bonus", type: "guide" },
    ],
  },
];

export const totalDownloadCount = academyDownloadSections.reduce(
  (sum, section) => sum + section.items.length,
  0
);
