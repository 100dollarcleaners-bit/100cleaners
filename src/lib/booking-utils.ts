import {
  getBookingTotal,
  getServiceLabel,
  LAUNDRY_ADDON_PRICE,
  TIME_SLOTS,
  type ServiceType,
} from "./constants";
import type { BookingRecord } from "./types";

function formatTimeLabel(time: string) {
  return TIME_SLOTS.find((s) => s.value === time)?.label ?? time;
}

function formatDate(date: string) {
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getBookingServiceTotal(booking: BookingRecord): number {
  const type = (booking.service_type === "deep" ? "deep" : "standard") as ServiceType;
  return getBookingTotal(type, booking.laundry_addon);
}

export function getBookingServiceLabel(booking: BookingRecord): string {
  return getServiceLabel(booking.service_type, booking.laundry_addon);
}

export { formatDate, formatTimeLabel };
