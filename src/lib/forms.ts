export interface ClientForm {
  slug: string;
  title: string;
  description: string;
  summary: string;
}

export const clientForms: ClientForm[] = [
  {
    slug: "service-agreement",
    title: "Service Agreement",
    description:
      "Outlines services, pricing, scheduling, and terms for your cleaning appointment.",
    summary: "Required before first service",
  },
  {
    slug: "liability-waiver",
    title: "Liability Waiver",
    description:
      "Release of liability for normal wear, pre-existing conditions, and valuables.",
    summary: "Required before first service",
  },
  {
    slug: "property-access",
    title: "Property Access Form",
    description:
      "Gate codes, alarm instructions, key location, and entry authorization.",
    summary: "Complete if we enter while you are away",
  },
  {
    slug: "pre-clean-checklist",
    title: "Pre-Clean Checklist",
    description:
      "Help us deliver the best results — pets, priorities, fragile items, and notes.",
    summary: "Recommended before each visit",
  },
];

export function getFormBySlug(slug: string): ClientForm | undefined {
  return clientForms.find((f) => f.slug === slug);
}
