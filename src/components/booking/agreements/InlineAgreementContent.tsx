import type { BookingFormData } from "@/lib/types";
import { BRAND_NAME, getBookingTotal, getServiceLabel, TIME_SLOTS } from "@/lib/constants";

interface Props {
  data: BookingFormData;
}

function formatDate(date: string) {
  if (!date) return "—";
  return new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function timeLabel(time: string) {
  return TIME_SLOTS.find((s) => s.value === time)?.label ?? time;
}

export function ServiceAgreementInline({ data }: Props) {
  const total = getBookingTotal(data.serviceType, data.laundryAddon);
  const service = getServiceLabel(data.serviceType, data.laundryAddon);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-navy/80">
      <p>
        This Service Agreement is between <strong>{BRAND_NAME}</strong> and{" "}
        <strong>{data.customerName || "the client"}</strong> for residential
        cleaning in Los Angeles County.
      </p>
      <div className="rounded-lg bg-cream/80 p-4 text-xs">
        <p>
          <strong>Client:</strong> {data.customerName || "—"}
        </p>
        <p>
          <strong>Address:</strong> {data.address || "—"}
        </p>
        <p>
          <strong>Phone:</strong> {data.customerPhone || "—"}
        </p>
        <p>
          <strong>Email:</strong> {data.customerEmail || "—"}
        </p>
        <p>
          <strong>Scheduled:</strong> {formatDate(data.bookingDate)} ·{" "}
          {timeLabel(data.bookingTime)}
        </p>
      </div>
      <p>
        <strong>Service selected:</strong> {service} — ${total} (balance due on
        service day after $25 deposit).
      </p>
      <ul className="list-inside list-disc space-y-2">
        <li>Standard Clean — $150 (up to 3 bedrooms)</li>
        <li>Deep Clean — $300 (up to 3 bedrooms · intensive)</li>
        <li>Optional Laundry Service — +$50</li>
        <li>Booking deposit — $25 (applied toward total)</li>
      </ul>
      <ol className="list-inside list-decimal space-y-2">
        <li>Client agrees to provide safe access at the scheduled time.</li>
        <li>Cancellations with less than 24 hours notice may forfeit the deposit.</li>
        <li>
          Company is not responsible for undisclosed fragile or high-value items.
        </li>
        <li>Pets must be secured and hazardous areas identified before arrival.</li>
        <li>Remaining balance is due upon completion of service.</li>
      </ol>
    </div>
  );
}

export function LiabilityWaiverInline({ data }: Props) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-navy/80">
      <p>
        I, <strong>{data.customerName || "the client"}</strong>, voluntarily
        release and hold harmless {BRAND_NAME}, its owners, employees, and
        contractors from claims arising from residential cleaning services,
        except gross negligence or willful misconduct.
      </p>
      <p className="font-medium text-navy">I acknowledge that:</p>
      <ul className="list-inside list-disc space-y-2">
        <li>Cleaning may involve moving lightweight items to access surfaces.</li>
        <li>I have disclosed fragile, antique, or high-value items.</li>
        <li>
          Normal wear or pre-existing conditions may become visible after cleaning.
        </li>
        <li>I will secure pets and identify off-limit areas.</li>
      </ul>
      <p>
        <strong>Service address:</strong> {data.address || "—"}
      </p>
    </div>
  );
}

export function PropertyAccessInline({ data }: Props) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-navy/80">
      <p>
        I authorize {BRAND_NAME} to enter the property at{" "}
        <strong>{data.address || "the address provided"}</strong> on{" "}
        <strong>{formatDate(data.bookingDate)}</strong> during{" "}
        <strong>{timeLabel(data.bookingTime)}</strong> for scheduled cleaning.
      </p>
      <p>
        Access details provided in special instructions will be kept confidential
        and used only for this service. I confirm I have authority to grant entry.
      </p>
      {data.specialInstructions ? (
        <div className="rounded-lg bg-cream/80 p-4 text-xs">
          <p className="font-medium text-navy">Access / entry notes on file:</p>
          <p className="mt-1">{data.specialInstructions}</p>
        </div>
      ) : (
        <p className="text-xs text-navy/50">
          Gate codes, alarm codes, and lockbox instructions may be included in
          your special instructions.
        </p>
      )}
      <p>
        <strong>Emergency contact:</strong> {data.customerName} ·{" "}
        {data.customerPhone}
      </p>
    </div>
  );
}

export function PreCleanChecklistInline({ data }: Props) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-navy/80">
      <p>
        To deliver the best results for{" "}
        <strong>{data.customerName || "your visit"}</strong>, please ensure:
      </p>
      <ul className="list-inside list-disc space-y-2">
        <li>Pets are secured in a safe room or off-site</li>
        <li>Counters are cleared of personal documents and valuables</li>
        <li>Off-limit rooms are identified</li>
        <li>Fragile or antique items are noted</li>
        <li>Priority areas are communicated</li>
        <li>Product allergies or scent sensitivities are disclosed</li>
      </ul>
      {data.specialInstructions && (
        <div className="rounded-lg bg-cream/80 p-4 text-xs">
          <p className="font-medium text-navy">Your notes:</p>
          <p className="mt-1">{data.specialInstructions}</p>
        </div>
      )}
    </div>
  );
}

export const agreementContentMap = {
  serviceAgreement: ServiceAgreementInline,
  liabilityWaiver: LiabilityWaiverInline,
  propertyAccess: PropertyAccessInline,
  preCleanChecklist: PreCleanChecklistInline,
} as const;
