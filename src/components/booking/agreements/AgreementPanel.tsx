"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { AgreementId } from "@/lib/agreements";
import {
  agreementContentMap,
} from "@/components/booking/agreements/InlineAgreementContent";
import type { BookingFormData } from "@/lib/types";

interface Props {
  id: AgreementId;
  title: string;
  description: string;
  data: BookingFormData;
  checked: boolean;
  viewed: boolean;
  onView: () => void;
  onToggle: (checked: boolean) => void;
}

export function AgreementPanel({
  id,
  title,
  description,
  data,
  checked,
  viewed,
  onView,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(false);
  const Content = agreementContentMap[id];

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onView();
  };

  return (
    <div className="rounded-xl border border-navy/10 overflow-hidden">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between gap-4 bg-cream/50 px-4 py-4 text-left transition-colors hover:bg-cream"
      >
        <div>
          <p className="font-medium text-navy">{title}</p>
          <p className="mt-0.5 text-xs text-navy/50">{description}</p>
        </div>
        <ChevronDown
          size={20}
          className={`shrink-0 text-navy/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="max-h-64 overflow-y-auto border-t border-navy/10 bg-white px-4 py-4">
          <Content data={data} />
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-3 border-t border-navy/10 px-4 py-4">
        <input
          type="checkbox"
          checked={checked}
          disabled={!viewed}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-navy/30 text-gold focus:ring-gold disabled:opacity-40"
        />
        <span className={`text-sm ${viewed ? "text-navy/80" : "text-navy/40"}`}>
          I have read and agree to the {title}. Checking this box constitutes my
          electronic signature.
        </span>
      </label>
    </div>
  );
}
