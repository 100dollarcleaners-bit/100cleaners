function Field({ label, wide }: { label: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
        {label}
      </p>
      <div className="mt-2 h-10 border-b border-navy/20" />
    </div>
  );
}

function SignatureBlock({ label }: { label: string }) {
  return (
    <div className="mt-10 grid gap-8 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
          {label}
        </p>
        <div className="mt-8 h-px bg-navy/30" />
        <p className="mt-2 text-xs text-navy/40">Signature</p>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
          Date
        </p>
        <div className="mt-8 h-px bg-navy/30" />
        <p className="mt-2 text-xs text-navy/40">MM / DD / YYYY</p>
      </div>
    </div>
  );
}

export function ServiceAgreementContent() {
  return (
    <>
      <p>
        This Service Agreement (&ldquo;Agreement&rdquo;) is entered into between
        100 Cleaners (&ldquo;Company&rdquo;) and the client named below
        (&ldquo;Client&rdquo;) for residential cleaning services in Los Angeles
        County.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Client full name" />
        <Field label="Service address" wide />
        <Field label="Phone" />
        <Field label="Email" />
      </div>
      <h2 className="mt-10 font-display text-lg text-navy">Services & pricing</h2>
      <ul className="mt-4 list-inside list-disc space-y-2 text-navy/80">
        <li>Standard Clean — $150 (up to 3 bedrooms)</li>
        <li>Deep Clean — $300 (up to 3 bedrooms · intensive)</li>
        <li>Optional Laundry Service — +$50</li>
        <li>Booking deposit — $25 (applied toward total; balance due on service day)</li>
      </ul>
      <h2 className="mt-10 font-display text-lg text-navy">Terms</h2>
      <ol className="mt-4 list-inside list-decimal space-y-3 text-navy/80">
        <li>
          Client agrees to provide safe access to the property at the scheduled
          time.
        </li>
        <li>
          Cancellations with less than 24 hours notice may forfeit the deposit.
        </li>
        <li>
          Company is not responsible for damage to items not disclosed as fragile
          or valuable prior to service.
        </li>
        <li>
          Client confirms pets will be secured and hazardous areas identified
          before arrival.
        </li>
        <li>
          Payment of the remaining balance is due upon completion unless otherwise
          agreed in writing.
        </li>
      </ol>
      <SignatureBlock label="Client" />
    </>
  );
}

export function LiabilityWaiverContent() {
  return (
    <>
      <p>
        I, the undersigned Client, voluntarily release and hold harmless 100
        Cleaners, its owners, employees, and contractors from any and all claims,
        damages, or liability arising from residential cleaning services, except
        where caused by gross negligence or willful misconduct.
      </p>
      <h2 className="mt-8 font-display text-lg text-navy">Acknowledgments</h2>
      <ul className="mt-4 space-y-3 text-navy/80">
        <li className="flex gap-3">
          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 border border-navy/30" />
          I understand cleaning may involve moving lightweight items to access
          surfaces.
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 border border-navy/30" />
          I have disclosed fragile, antique, or high-value items requiring special
          care.
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 border border-navy/30" />
          I accept that normal wear, pre-existing conditions, or undetected
          defects may become visible after cleaning.
        </li>
        <li className="flex gap-3">
          <span className="mt-0.5 inline-block h-4 w-4 shrink-0 border border-navy/30" />
          I will secure pets and notify Company of any areas that should not be
          entered.
        </li>
      </ul>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Client full name" />
        <Field label="Service address" wide />
      </div>
      <SignatureBlock label="Client" />
    </>
  );
}

export function PropertyAccessContent() {
  return (
    <>
      <p>
        Complete this form if 100 Cleaners will enter your property while you are
        away. Information is kept confidential and used only for your scheduled
        service.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Client full name" />
        <Field label="Service date" />
        <Field label="Service address" wide />
        <Field label="Gate / building code" />
        <Field label="Door / lockbox code" />
        <Field label="Alarm code (if applicable)" />
        <Field label="Key location / smart lock instructions" wide />
        <Field label="Parking instructions" wide />
      </div>
      <h2 className="mt-10 font-display text-lg text-navy">Authorization</h2>
      <p className="mt-4 text-navy/80">
        I authorize 100 Cleaners to enter the property listed above for the
        scheduled cleaning service. I confirm I have authority to grant this
        access.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field label="Emergency contact name" />
        <Field label="Emergency contact phone" />
      </div>
      <SignatureBlock label="Client" />
    </>
  );
}

export function PreCleanChecklistContent() {
  return (
    <>
      <p>
        Help us deliver a flawless clean. Complete before each visit and leave on
        the counter or email to 100dollarcleaners@gmail.com.
      </p>
      <h2 className="mt-8 font-display text-lg text-navy">Before we arrive</h2>
      <ul className="mt-4 space-y-3 text-navy/80">
        {[
          "Pets secured in a safe room or off-site",
          "Clear counters of personal documents / valuables",
          "Identify rooms that are off-limits",
          "Note fragile or antique items",
          "List priority areas (e.g. kitchen, master bath)",
          "Provide any product allergies or scent sensitivities",
        ].map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-0.5 inline-block h-4 w-4 shrink-0 border border-navy/30" />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-navy/50">
          Special instructions
        </p>
        <div className="mt-2 h-32 border border-navy/15 rounded-lg" />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Client name" />
        <Field label="Service date" />
      </div>
      <SignatureBlock label="Client (optional)" />
    </>
  );
}

export const formContentMap: Record<
  string,
  { title: string; Content: () => JSX.Element }
> = {
  "service-agreement": {
    title: "Service Agreement",
    Content: ServiceAgreementContent,
  },
  "liability-waiver": {
    title: "Liability Waiver",
    Content: LiabilityWaiverContent,
  },
  "property-access": {
    title: "Property Access Form",
    Content: PropertyAccessContent,
  },
  "pre-clean-checklist": {
    title: "Pre-Clean Checklist",
    Content: PreCleanChecklistContent,
  },
};
