export const REQUIRED_AGREEMENTS = [
  {
    id: "serviceAgreement",
    title: "Service Agreement",
    description: "Services, pricing, scheduling, and terms",
  },
  {
    id: "liabilityWaiver",
    title: "Liability Waiver",
    description: "Release of liability and acknowledgments",
  },
  {
    id: "propertyAccess",
    title: "Property Access Authorization",
    description: "Entry authorization for your scheduled service",
  },
  {
    id: "preCleanChecklist",
    title: "Pre-Clean Checklist",
    description: "Preparation guidelines for your appointment",
  },
] as const;

export type AgreementId = (typeof REQUIRED_AGREEMENTS)[number]["id"];

export type AgreementAcceptance = Record<AgreementId, boolean>;

export const emptyAgreements = (): AgreementAcceptance => ({
  serviceAgreement: false,
  liabilityWaiver: false,
  propertyAccess: false,
  preCleanChecklist: false,
});

export function allAgreementsAccepted(agreements: AgreementAcceptance): boolean {
  return REQUIRED_AGREEMENTS.every((a) => agreements[a.id]);
}
