export const BASE_PRICE = 100;
export const LAUNDRY_ADDON_PRICE = 50;
export const DEPOSIT_AMOUNT = 25;

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
