export const STANDARD_PRICE = 150;
export const DEEP_CLEAN_PRICE = 300;
export const LAUNDRY_ADDON_PRICE = 50;
export const DEPOSIT_AMOUNT = 25;

/** @deprecated Use STANDARD_PRICE */
export const BASE_PRICE = STANDARD_PRICE;

export type ServiceType = "standard" | "deep";

export const SERVICE_OPTIONS = [
  {
    id: "standard" as const,
    name: "Standard Clean",
    price: STANDARD_PRICE,
    tagline: "Up to 3 bedrooms",
    description:
      "Maintenance clean — dusting, floors, kitchen, baths, trash, dishes & cabinets.",
  },
  {
    id: "deep" as const,
    name: "Deep Clean",
    price: DEEP_CLEAN_PRICE,
    tagline: "Up to 3 bedrooms · intensive",
    description:
      "Top-to-bottom detail — steam, baseboards, buildup removal & extra attention in every room.",
  },
];

export function getServicePrice(serviceType: ServiceType): number {
  return serviceType === "deep" ? DEEP_CLEAN_PRICE : STANDARD_PRICE;
}

export function getServiceLabel(
  serviceType: string,
  laundryAddon: boolean
): string {
  const base = serviceType === "deep" ? "Deep Clean" : "Standard Clean";
  return laundryAddon ? `${base} + Laundry` : base;
}

export function getBookingTotal(
  serviceType: ServiceType,
  laundryAddon: boolean
): number {
  return getServicePrice(serviceType) + (laundryAddon ? LAUNDRY_ADDON_PRICE : 0);
}

export const TIME_SLOTS = [
  { value: "06:00", label: "6:00 AM – 9:00 AM" },
  { value: "09:00", label: "9:00 AM – 12:00 PM" },
  { value: "12:00", label: "12:00 PM – 3:00 PM" },
  { value: "15:00", label: "3:00 PM – 6:00 PM" },
  { value: "18:00", label: "6:00 PM – 9:00 PM" },
  { value: "21:00", label: "9:00 PM – 12:00 AM" },
] as const;

export type TimeSlotValue = (typeof TIME_SLOTS)[number]["value"];

export const PENDING_HOLD_MINUTES = 120;

export const standardIncludes = [
  "Dusting & polishing",
  "Mopping & vacuuming",
  "Kitchen & bath surfaces",
  "Trash removal",
  "Dishes washed",
  "Cabinet wipe-down",
];

export const deepCleanIncludes = [
  "Everything in Standard Clean",
  "Steam clean all surfaces",
  "Baseboards & door frames",
  "Grout & tile detail",
  "Appliance exterior & microwave",
  "Buildup & hard-to-reach areas",
  "Interior windows (reachable)",
];
