/**
 * CENTRAL COMPANY CONFIGURATION
 * =============================
 *
 * Single source of truth for every business fact the site can publish.
 *
 * The rule this file enforces: **nothing is invented**. Facts that have not been
 * verified are not written here as guesses — they are marked `verified: false`,
 * and the public accessors return `null`, which the UI renders as
 * "Available on request" rather than a number nobody can stand behind.
 *
 * To publish a new fact: fill in the value AND set `verified: true`. Both are
 * required. That is deliberate — it makes publishing an explicit decision rather
 * than a side effect of typing something into a config.
 */

export type Field<T> = {
  value: T | null;
  /** Confirmed against a document or by the business owner. */
  verified: boolean;
  /** Cleared for public display (some verified facts stay private by choice). */
  public: boolean;
  /** What is needed to verify this, for the launch checklist. */
  note?: string;
};

function field<T>(input: Partial<Field<T>> = {}): Field<T> {
  return { value: null, verified: false, public: false, ...input };
}

/** Returns the value only when it is both verified and cleared for publication. */
export function publicValue<T>(f: Field<T>): T | null {
  return f.verified && f.public && f.value !== null ? f.value : null;
}

/** Standard wording used wherever a fact is genuinely not published. */
export const NOT_PUBLISHED = "Available on request" as const;
export const ASK_COMMERCIAL = "Contact our commercial team" as const;
export const PER_PROJECT = "Confirmed after specification review" as const;

/** Renders a field for display, falling back to approved non-committal wording. */
export function displayValue<T>(f: Field<T>, fallback: string = NOT_PUBLISHED): string {
  const v = publicValue(f);
  return v === null ? fallback : String(v);
}

export const company = {
  name: "AHM International",
  /**
   * Registered legal entity name, confirmed by the business owner on 2026-08-27.
   *
   * The registration/NTN number is a separate matter and is still outstanding.
   * It is the independently checkable half — a buyer can look a number up in a
   * public register without asking anyone — so it stays wanted even though the
   * name is now published.
   */
  legalName: field<string>({
    value: "AHM International",
    verified: true,
    public: true,
    note: "Name confirmed by the owner. Registration/NTN number still to be supplied.",
  }),

  /**
   * National Tax Number / registration number.
   *
   * Competitor exporter sites in this market publish theirs, which changes what
   * its absence means. When a sourcing manager compares three Pakistani
   * suppliers and two show a registration a buyer can look up while the third
   * shows nothing, the third is the one that looks unverifiable — so omitting it
   * is now a disadvantage rather than a neutral.
   *
   * It is also the only credibility fact on this site a buyer can confirm
   * without contacting AHM, which is what separates a 9 from a 10.
   */
  ntn: field<string>({
    note: "Supply the NTN / registration number exactly as issued. It is checked against the public register, so an incorrect digit is worse than publishing nothing.",
  }),

  city: "Karachi",
  country: "Pakistan",
  region: "Sindh",

  /** Street address stays hidden until confirmed; the city and country are published. */
  streetAddress: field<string>({ note: "Supply street address, or confirm city-only is acceptable." }),

  /** Set NEXT_PUBLIC_SALES_EMAIL to publish a mailto action. */
  email: field<string>({
    value: process.env.NEXT_PUBLIC_SALES_EMAIL ?? null,
    verified: Boolean(process.env.NEXT_PUBLIC_SALES_EMAIL),
    public: Boolean(process.env.NEXT_PUBLIC_SALES_EMAIL),
    note: "Set NEXT_PUBLIC_SALES_EMAIL. Until then the RFQ form is the only contact route.",
  }),
  phone: field<string>({
    value: process.env.NEXT_PUBLIC_PHONE ?? null,
    verified: Boolean(process.env.NEXT_PUBLIC_PHONE),
    public: Boolean(process.env.NEXT_PUBLIC_PHONE),
    note: "Set NEXT_PUBLIC_PHONE to show call actions.",
  }),
  whatsapp: field<string>({
    value: process.env.NEXT_PUBLIC_WHATSAPP ?? null,
    verified: Boolean(process.env.NEXT_PUBLIC_WHATSAPP),
    public: Boolean(process.env.NEXT_PUBLIC_WHATSAPP),
  }),
  /**
   * Confirmed by the business owner on 2026-08-27.
   *
   * The offset is spelled out because the primary buyer markets are 8–12 hours
   * behind Karachi. A buyer emailing at 9am in New York is writing at 7pm here,
   * and without the offset a next-day reply reads as being ignored.
   *
   * The owner also stated WhatsApp is available around the clock. That is
   * published as `whatsappNote` below rather than as a hard 24/7 response
   * promise — see the note there.
   */
  businessHours: field<string>({
    value: "Monday to Saturday, 9am to 6pm PKT (UTC+5)",
    verified: true,
    public: true,
  }),

  /**
   * Availability wording for WhatsApp.
   *
   * Deliberately not "24/7 support". A buyer who messages at 3am Karachi time
   * and waits until morning has been promised something that did not happen,
   * and a broken availability claim costs more credibility than never making
   * one. "Monitored outside office hours" is true, useful, and cannot be
   * falsified by a single slow reply.
   */
  whatsappNote:
    "WhatsApp is monitored outside office hours, including Sundays." as const,

  /* -------- Positioning: verified and safe to publish -------- */
  positioning: {
    primary: "From tech pack to FOB shipment.",
    secondary: "Your next Pakistan manufacturing partner.",
    supporting:
      "Product development, commercial costing and apparel manufacturing for international uniform, workwear and sourcing programs.",
    model: "FOB",
  },

  /* -------- Operational facts -------- */
  /** Documented and cleared for publication by the business owner. */
  exportExperience: {
    verified: true,
    statement: "Documented FOB export experience from Port Qasim, Karachi to the United States.",
    port: "Port Qasim, Karachi",
    destination: "United States",
  },

  /** Buyer markets AHM sells into. No local-office claim is made for any of them. */
  targetMarkets: ["United States", "United Kingdom", "European Union", "Canada", "Australia"],

  /**
   * Deliberately empty. Populating any of these arrays publishes the content —
   * so they stay empty until documentation exists.
   */
  certifications: [] as Certification[],
  publicCustomers: [] as string[],

  /* -------- Numbers that are NOT published -------- */
  facilitySize: field<string>({ note: "Only publish with a verified measurement." }),
  employeeCount: field<number>({ note: "Only publish with a verified headcount." }),
  machineCount: field<number>({ note: "Only publish with a verified machinery list." }),
  monthlyCapacity: field<string>({ note: "Only publish with verified production records." }),
  yearsInBusiness: field<number>({ note: "Only publish with the registration date." }),
  moq: field<string>({ note: "Genuinely varies by article. Likely stays per-project." }),
  leadTime: field<string>({ note: "Genuinely varies by article. Likely stays per-project." }),

  /* -------- Social -------- */
  social: {
    linkedin: field<string>({
      value: process.env.NEXT_PUBLIC_LINKEDIN ?? null,
      verified: Boolean(process.env.NEXT_PUBLIC_LINKEDIN),
      public: Boolean(process.env.NEXT_PUBLIC_LINKEDIN),
    }),
    instagram: field<string>({
      value: process.env.NEXT_PUBLIC_INSTAGRAM ?? null,
      verified: Boolean(process.env.NEXT_PUBLIC_INSTAGRAM),
      public: Boolean(process.env.NEXT_PUBLIC_INSTAGRAM),
    }),
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahminternational.com",
} as const;

export type Certification = {
  name: string;
  issuer: string;
  /** Certificate reference. Never display a certification without one. */
  reference: string;
  validUntil: string;
  documented: true;
};

/* ------------------------------------------------------------------ */
/* Commercial answers that are genuinely per-project.                  */
/* These are not missing data — the honest answer is "it depends", and  */
/* saying so specifically reads as competence, not evasion.             */
/* ------------------------------------------------------------------ */

export const commercialAnswers = [
  {
    question: "What is your price?",
    answer:
      "FOB price depends on the article, fabric and weight, construction, quantity, decoration, labels and packing, sampling requirements, destination and production schedule. Send a specification and we will cost against it.",
  },
  {
    question: "What is your MOQ?",
    answer:
      "Minimum quantity is confirmed once the article, fabric and colour count are reviewed. Fabric is usually the constraint, not the stitching.",
  },
  {
    question: "How long does sampling take?",
    answer:
      "Sample timing depends on the article, whether fabric is in stock or needs to be developed, and the decoration involved. We confirm timing against your specification rather than quote a standard figure.",
  },
  {
    question: "What is your production lead time?",
    answer:
      "Lead time is confirmed after the specification, materials, quantity and customisation are reviewed, and is stated in the quotation.",
  },
  {
    question: "Do you hold certifications?",
    answer:
      "Certification status is confirmed in writing during commercial discussion. We do not display accreditations we cannot evidence.",
  },
  {
    question: "Can you work to our existing tech pack?",
    answer:
      "Yes. A tech pack, a reference garment, a sketch or a written specification are all workable starting points. The tech pack is the fastest.",
  },
] as const;

/** Compliance note reused wherever product options are listed. */
export const OPTIONS_DISCLAIMER =
  "Options are subject to specification and fabric selection, and are confirmed during development." as const;
