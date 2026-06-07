"use client";

import { Button } from "@/components/ui/Button";
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
  onNext: () => void;
  onBack: () => void;
}

export function StepAgreements({
  data,
  agreements,
  updateAgreements,
  onNext,
  onBack,
}: Props) {
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
      <h2 className="font-display text-2xl text-navy">Review & agree</h2>
      <p className="mt-2 text-sm text-navy/60">
        Open each document, read the terms, and check the box to sign electronically
        before paying your deposit.
      </p>

      <div className="mt-8 space-y-4">
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

      <p className="mt-6 text-xs text-navy/50">
        {viewedCount} of {REQUIRED_AGREEMENTS.length} documents opened
        {!allAccepted && " · All checkboxes required to continue"}
      </p>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button type="button" onClick={onNext} disabled={!allAccepted}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
