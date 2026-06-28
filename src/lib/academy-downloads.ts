export interface AcademyDownload {
  title: string;
  fileKey: string;
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
      { title: "LLC Checklist", fileKey: "01-getting-started/llc-checklist.pdf", module: "1", type: "checklist" },
      { title: "Business Startup Checklist", fileKey: "01-getting-started/startup-checklist.pdf", module: "1", type: "checklist" },
    ],
  },
  {
    module: "Module 2 — Branding & Marketing",
    items: [
      { title: "Local Marketing Setup Guide", fileKey: "02-branding/local-marketing-setup-guide.pdf", module: "2", type: "guide" },
    ],
  },
  {
    module: "Module 3 — Pricing",
    items: [
      { title: "Professional Pricing Guide", fileKey: "03-pricing/pricing-guide.pdf", module: "3", type: "guide" },
      { title: "Pricing Calculator", fileKey: "03-pricing/pricing-calculator.csv", module: "3", type: "spreadsheet" },
      { title: "Estimate Phone Scripts", fileKey: "03-pricing/estimate-scripts.pdf", module: "3", type: "template" },
      { title: "Quote Template", fileKey: "03-pricing/quote-template.pdf", module: "3", type: "template" },
    ],
  },
  {
    module: "Module 4 — Products & Equipment",
    items: [
      { title: "Product Shopping List", fileKey: "04-products/product-shopping-list.pdf", module: "4", type: "guide" },
      { title: "Equipment List", fileKey: "04-products/equipment-list.pdf", module: "4", type: "guide" },
      { title: "Startup Cost Estimate", fileKey: "04-products/startup-cost-estimate.pdf", module: "4", type: "guide" },
    ],
  },
  {
    module: "Module 5 — SOPs",
    items: [
      { title: "Regular Cleaning SOP", fileKey: "05-sops/regular-cleaning-sop.pdf", module: "5", type: "guide" },
      { title: "Deep Cleaning SOP", fileKey: "05-sops/deep-cleaning-sop.pdf", module: "5", type: "guide" },
      { title: "Move-Out SOP", fileKey: "05-sops/move-out-sop.pdf", module: "5", type: "guide" },
      { title: "Airbnb Turnover SOP", fileKey: "05-sops/airbnb-turnover-sop.pdf", module: "5", type: "guide" },
      { title: "Kitchen SOP", fileKey: "05-sops/kitchen-sop.pdf", module: "5", type: "guide" },
      { title: "Bathroom SOP", fileKey: "05-sops/bathroom-sop.pdf", module: "5", type: "guide" },
      { title: "Dusting SOP", fileKey: "05-sops/dusting-sop.pdf", module: "5", type: "guide" },
      { title: "Floor SOP", fileKey: "05-sops/floor-sop.pdf", module: "5", type: "guide" },
      { title: "Window SOP", fileKey: "05-sops/window-sop.pdf", module: "5", type: "guide" },
      { title: "Laundry SOP", fileKey: "05-sops/laundry-sop.pdf", module: "5", type: "guide" },
    ],
  },
  {
    module: "Module 5 — Checklists",
    items: [
      { title: "Quality Control Checklist", fileKey: "05-checklists/quality-control-checklist.pdf", module: "5", type: "checklist" },
      { title: "Cleaner Daily Checklist", fileKey: "05-checklists/cleaner-daily-checklist.pdf", module: "5", type: "checklist" },
      { title: "Arrival Checklist", fileKey: "05-checklists/arrival-checklist.pdf", module: "5", type: "checklist" },
      { title: "Leaving Checklist", fileKey: "05-checklists/leaving-checklist.pdf", module: "5", type: "checklist" },
      { title: "Photo Documentation Checklist", fileKey: "05-checklists/photo-checklist.pdf", module: "5", type: "checklist" },
      { title: "Manager Inspection Checklist", fileKey: "05-checklists/inspection-checklist.pdf", module: "5", type: "checklist" },
      { title: "Regular Cleaning Checklist", fileKey: "05-checklists/regular-clean-checklist.pdf", module: "5", type: "checklist" },
      { title: "Deep Cleaning Checklist", fileKey: "05-checklists/deep-clean-checklist.pdf", module: "5", type: "checklist" },
      { title: "Move-Out Checklist", fileKey: "05-checklists/move-out-checklist.pdf", module: "5", type: "checklist" },
    ],
  },
  {
    module: "Module 6 — Hiring & Scaling",
    items: [
      { title: "Interview Questions & Scoring Rubric", fileKey: "06-hiring/interview-questions.pdf", module: "6", type: "template" },
      { title: "Hiring Guide", fileKey: "06-hiring/hiring-guide.pdf", module: "6", type: "guide" },
      { title: "Profit Calculator", fileKey: "06-hiring/profit-calculator.csv", module: "6", type: "spreadsheet" },
    ],
  },
  {
    module: "Module 7 — Managing Teams",
    items: [
      { title: "Team Management Guide", fileKey: "07-teams/team-management-guide.pdf", module: "7", type: "guide" },
    ],
  },
  {
    module: "Module 8 — Business Credit",
    items: [
      { title: "Business Credit Guide", fileKey: "08-business-credit/business-credit-guide.pdf", module: "8", type: "guide" },
    ],
  },
  {
    module: "Module 9 — Operations",
    items: [
      { title: "Storage Organization Guide", fileKey: "09-operations/storage-organization-guide.pdf", module: "9", type: "guide" },
      { title: "Weekly Inventory Sheet", fileKey: "09-operations/weekly-inventory-sheet.csv", module: "9", type: "spreadsheet" },
    ],
  },
  {
    module: "Module 10 — Booking & Payments",
    items: [
      { title: "Booking & Payments Guide", fileKey: "10-booking/booking-payments-guide.pdf", module: "10", type: "guide" },
      { title: "Cancellation Policy", fileKey: "10-booking/cancellation-policy.pdf", module: "10", type: "template" },
      { title: "Invoice Template", fileKey: "10-booking/invoice-template.pdf", module: "10", type: "template" },
    ],
  },
  {
    module: "Module 11 — Yelp",
    items: [
      { title: "Yelp Masterclass Guide", fileKey: "11-yelp/yelp-masterclass-guide.pdf", module: "11", type: "guide" },
    ],
  },
  {
    module: "Module 12 — Customer Experience",
    items: [
      { title: "Phone Scripts", fileKey: "12-customer-experience/phone-scripts.pdf", module: "12", type: "template" },
      { title: "Text Message Scripts", fileKey: "12-customer-experience/text-scripts.pdf", module: "12", type: "template" },
      { title: "Review Request Templates", fileKey: "12-customer-experience/review-request-templates.pdf", module: "12", type: "template" },
      { title: "Email Templates", fileKey: "12-customer-experience/email-templates.pdf", module: "12", type: "template" },
    ],
  },
  {
    module: "Module 13 — Scaling",
    items: [
      { title: "Scaling Operations Guide", fileKey: "13-scaling/scaling-operations-guide.pdf", module: "13", type: "guide" },
    ],
  },
  {
    module: "Bonus Materials",
    items: [
      { title: "Employee Handbook Template", fileKey: "bonus/employee-handbook-template.pdf", module: "bonus", type: "template" },
      { title: "Customer Intake Form", fileKey: "bonus/customer-intake-form.pdf", module: "bonus", type: "template" },
      { title: "Service Agreement / Contract", fileKey: "bonus/service-agreement-contract.pdf", module: "bonus", type: "contract" },
      { title: "Referral Program", fileKey: "bonus/referral-program.pdf", module: "bonus", type: "guide" },
      { title: "Flyer & Door Hanger Copy", fileKey: "bonus/flyer-door-hanger-copy.pdf", module: "bonus", type: "template" },
      { title: "Emergency Procedures", fileKey: "bonus/emergency-procedures.pdf", module: "bonus", type: "guide" },
    ],
  },
];

export const totalDownloadCount = academyDownloadSections.reduce(
  (sum, section) => sum + section.items.length,
  0
);
