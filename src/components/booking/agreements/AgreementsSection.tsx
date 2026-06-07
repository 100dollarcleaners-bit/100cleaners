"use client";

import { AgreementPanel } from "@/components/booking/agreements/AgreementPanel";
import {
  allAgreementsAccepted,
  REQUIRED_AGREEMENTS,
  type AgreementAcceptance,
  type AgreementId,
} from "@/lib/agreements";
import type { BookingFormData } from "@/lib/types";
import { useState } from "react";

interface Props {
  data: BookingFormData;
  agreements: AgreementAcceptance;
  updateAgreements: (partial: Partial<AgreementAcceptance>) => void;
}

export function AgreementsSection({ data, agreements, updateAgreements }: Props) {
  const [viewed, setViewed] = useState<Record<AgreementId, boolean>>({
    serviceAgreement: false,
    liabilityWaiver: false,
    propertyAccess: false,
    preCleanChecklist: false,
  });

  const allAccepted = allAgreementsAccepted(agreements);
  const viewedCount = Object.values(viewed).filter(Boolean).length;

  return (
    <div>
      <h3 className="font-display text-lg text-navy">Review & sign agreements</h3>
      <p className="mt-1 text-sm text-navy/60">
        Open each document below, read the terms, and check the box to sign
        electronically before paying your deposit.
      </p>

      <div className="mt-5 space-y-4">
        {REQUIRED_AGREEMENTS.map((agreement) => (
          <AgreementPanel
            key={agreement.id}
            id={agreement.id}
            title={agreement.title}
            description={agreement.description}
            data={data}
            checked={agreements[agreement.id]}
            viewed={viewed[agreement.id]}
            onView={() =>
              setViewed((prev) => ({ ...prev, [agreement.id]: true }))
            }
            onToggle={(checked) =>
              updateAgreements({ [agreement.id]: checked })
            }
          />
        ))}
      </div>

      <p className="mt-4 text-xs text-navy/50">
        {viewedCount} of {REQUIRED_AGREEMENTS.length} documents opened
        {!allAccepted && " · All checkboxes required to pay deposit"}
      </p>
    </div>
  );
}

export { allAgreementsAccepted };
