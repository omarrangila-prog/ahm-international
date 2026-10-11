/**
 * The enquiry register: what a lead is, the stages it moves through, and the
 * summaries the board and the reports are computed from.
 *
 * Pure. Nothing here touches storage, so the rules can be tested directly and
 * the store module stays a thin layer of reads and writes.
 *
 * The stages are the owner's, from the brief of 10 October 2026, in its order.
 * "Lost" is not a stage: an enquiry can be lost at any of them, and where it
 * was lost is the useful part, so it is a status beside the stage.
 */

export const STAGES = [
  { id: "new", label: "New inquiry" },
  { id: "qualification", label: "Qualification" },
  { id: "specification", label: "Specification review" },
  { id: "costing", label: "FOB costing" },
  { id: "quoted", label: "Quotation sent" },
  { id: "sampling", label: "Sampling" },
  { id: "negotiation", label: "Negotiation" },
  { id: "purchase-order", label: "Purchase order" },
  { id: "production", label: "Production" },
  { id: "shipment", label: "Shipment" },
  { id: "repeat", label: "Repeat business" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];
export type LeadStatus = "open" | "lost";

export const STAGE_IDS = STAGES.map((s) => s.id) as StageId[];

export function isStage(value: unknown): value is StageId {
  return typeof value === "string" && (STAGE_IDS as string[]).includes(value);
}

export function stageIndex(stage: StageId): number {
  return STAGE_IDS.indexOf(stage);
}

export function stageLabel(stage: StageId): string {
  return STAGES[stageIndex(stage)]?.label ?? stage;
}

/** A purchase order is the line between an enquiry and an order. */
export const WON_FROM = stageIndex("purchase-order");

export function outcomeOf(lead: { stage: StageId; status: LeadStatus }): "won" | "lost" | "open" {
  if (lead.status === "lost") return "lost";
  return stageIndex(lead.stage) >= WON_FROM ? "won" : "open";
}

/** Reasons offered when marking an enquiry lost. A free-text note can say more. */
export const LOST_REASONS = [
  "Price",
  "Lead time",
  "Minimum quantity",
  "Specification not feasible",
  "Chose another supplier",
  "No response from buyer",
  "Not a genuine enquiry",
  "Other",
] as const;

export type StoredFileRef = { name: string; size: number; contentType: string; pathname: string };

export type Attribution = {
  /** The page the buyer first landed on in that visit. */
  landing: string | null;
  /** The external site that linked to it, host only. */
  referrer: string | null;
  /** utm_* tags from the landing URL. */
  campaign: Partial<Record<"source" | "medium" | "campaign" | "term" | "content", string>>;
};

export type Activity = {
  at: string;
  by: string;
  kind: "created" | "stage" | "status" | "owner" | "follow-up" | "contact" | "quote" | "note";
  text: string;
};

export type Lead = {
  ref: string;
  createdAt: string;
  updatedAt: string;
  variant: "full" | "mini";
  contact: {
    name: string;
    company: string;
    email: string;
    country: string;
    phone: string | null;
    jobTitle: string | null;
    website: string | null;
  };
  interest: { category: string; quantity: string };
  /** The rest of the enquiry, labelled for display, in the order the form asks. */
  details: { label: string; value: string }[];
  /** The form's own `source` field: which page or button the enquiry came from. */
  sourceForm: string | null;
  attribution: Attribution;
  files: StoredFileRef[];
  refusedFiles: { name: string; reason: string }[];
  stage: StageId;
  status: LeadStatus;
  lostReason: string | null;
  owner: string | null;
  /** Dates as YYYY-MM-DD: they are days in a diary, not instants. */
  followUpAt: string | null;
  lastContactAt: string | null;
  firstContactAt: string | null;
  quoteRef: string | null;
  /** The furthest stage ever reached, so moving a lead back does not rewrite the funnel. */
  maxStage: number;
  activity: Activity[];
};

/** One row of the index the board, the reports and the digest read. */
export type LeadSummary = {
  ref: string;
  createdAt: string;
  updatedAt: string;
  company: string;
  name: string;
  country: string;
  category: string;
  quantity: string;
  variant: "full" | "mini";
  files: number;
  source: string | null;
  stage: StageId;
  status: LeadStatus;
  owner: string | null;
  followUpAt: string | null;
  lastContactAt: string | null;
  firstContactAt: string | null;
  quoteRef: string | null;
  maxStage: number;
};

export function summarise(lead: Lead): LeadSummary {
  return {
    ref: lead.ref,
    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,
    company: lead.contact.company,
    name: lead.contact.name,
    country: lead.contact.country,
    category: lead.interest.category,
    quantity: lead.interest.quantity,
    variant: lead.variant,
    files: lead.files.length,
    source: sourceLabel(lead),
    stage: lead.stage,
    status: lead.status,
    owner: lead.owner,
    followUpAt: lead.followUpAt,
    lastContactAt: lead.lastContactAt,
    firstContactAt: lead.firstContactAt,
    quoteRef: lead.quoteRef,
    maxStage: lead.maxStage,
  };
}

/** Campaign first, then the referring site, then the form's own label. */
export function sourceLabel(lead: Pick<Lead, "attribution" | "sourceForm">): string | null {
  const { campaign, referrer } = lead.attribution;
  if (campaign.source) return [campaign.source, campaign.medium, campaign.campaign].filter(Boolean).join(" / ");
  if (referrer) return referrer;
  return lead.sourceForm;
}

/* ------------------------------------------------------------------ */
/* Building a lead from a submission                                   */
/* ------------------------------------------------------------------ */

/** Mirrors the notification email's order, minus the fields the lead holds elsewhere. */
const DETAIL_LABELS: [key: string, label: string][] = [
  ["styleName", "Style name"],
  ["gender", "Fit / gender"],
  ["annualQuantity", "Annual quantity"],
  ["repeatProgram", "Repeat program"],
  ["sizeRange", "Size range"],
  ["colours", "Colours"],
  ["fabric", "Fabric"],
  ["composition", "Composition"],
  ["weight", "Weight / GSM"],
  ["finish", "Finish"],
  ["performance", "Performance requirements"],
  ["needsRecommendation", "Wants a fabric recommendation"],
  ["openToAlternatives", "Open to alternatives"],
  ["decoration", "Decoration"],
  ["decorationNotes", "Decoration notes"],
  ["targetPrice", "Target price"],
  ["targetDelivery", "Target delivery"],
  ["destinationPort", "Destination port"],
  ["notes", "Notes"],
];

function text(value: unknown, max = 3000): string | null {
  if (value === undefined || value === null || value === "") return null;
  if (Array.isArray(value)) return value.length ? value.map(String).join(", ").slice(0, max) : null;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  const s = String(value).trim();
  return s ? s.slice(0, max) : null;
}

export function leadFromSubmission(input: {
  reference: string;
  receivedAt: Date;
  variant: "full" | "mini";
  fields: Record<string, unknown>;
  files: StoredFileRef[];
  refusedFiles: { name: string; reason: string }[];
  attribution: Attribution;
}): Lead {
  const f = input.fields;
  const at = input.receivedAt.toISOString();
  const details: Lead["details"] = [];
  for (const [key, label] of DETAIL_LABELS) {
    const value = text(f[key]);
    if (value !== null) details.push({ label, value });
  }

  return {
    ref: input.reference,
    createdAt: at,
    updatedAt: at,
    variant: input.variant,
    contact: {
      name: text(f.name, 120) ?? "",
      company: text(f.company, 200) ?? "",
      email: text(f.email, 200) ?? "",
      country: text(f.country, 90) ?? "",
      phone: text(f.phone, 60),
      jobTitle: text(f.jobTitle, 120),
      website: text(f.website, 200),
    },
    interest: { category: text(f.category, 120) ?? "", quantity: text(f.quantity, 80) ?? "" },
    details,
    sourceForm: text(f.source, 80),
    attribution: input.attribution,
    files: input.files,
    refusedFiles: input.refusedFiles,
    stage: "new",
    status: "open",
    lostReason: null,
    owner: null,
    followUpAt: null,
    lastContactAt: null,
    firstContactAt: null,
    quoteRef: null,
    maxStage: 0,
    activity: [{ at, by: "website", kind: "created", text: `Received through the ${input.variant === "mini" ? "short" : "full"} form.` }],
  };
}

/* ------------------------------------------------------------------ */
/* Changing a lead                                                     */
/* ------------------------------------------------------------------ */

export type LeadChanges = {
  stage?: StageId;
  status?: LeadStatus;
  lostReason?: string | null;
  owner?: string | null;
  followUpAt?: string | null;
  lastContactAt?: string | null;
  quoteRef?: string | null;
  note?: string | null;
};

const DAY = /^\d{4}-\d{2}-\d{2}$/;

export function isDay(value: unknown): value is string {
  if (typeof value !== "string" || !DAY.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/**
 * Applies a set of changes and records each one in the activity log, so the
 * history of a lead is what happened to it rather than only where it is now.
 * Returns the lead unchanged (same object) when nothing actually changed.
 */
export function applyChanges(lead: Lead, changes: LeadChanges, by: string, now: Date): Lead {
  const at = now.toISOString();
  const next: Lead = { ...lead, activity: [...lead.activity] };
  const log = (kind: Activity["kind"], text: string) => next.activity.push({ at, by, kind, text });

  if (changes.stage && changes.stage !== lead.stage) {
    next.stage = changes.stage;
    next.maxStage = Math.max(lead.maxStage, stageIndex(changes.stage));
    log("stage", `${stageLabel(lead.stage)} → ${stageLabel(changes.stage)}`);
  }

  if (changes.status && changes.status !== lead.status) {
    next.status = changes.status;
    next.lostReason = changes.status === "lost" ? (changes.lostReason ?? null) : null;
    log("status", changes.status === "lost" ? `Marked lost${next.lostReason ? `: ${next.lostReason}` : ""}` : "Reopened");
  } else if (lead.status === "lost" && changes.lostReason !== undefined && changes.lostReason !== lead.lostReason) {
    next.lostReason = changes.lostReason;
    log("status", `Reason: ${changes.lostReason ?? "none"}`);
  }

  if (changes.owner !== undefined && changes.owner !== lead.owner) {
    next.owner = changes.owner;
    log("owner", changes.owner ? `Assigned to ${changes.owner}` : "Unassigned");
  }

  if (changes.followUpAt !== undefined && changes.followUpAt !== lead.followUpAt) {
    next.followUpAt = changes.followUpAt;
    log("follow-up", changes.followUpAt ? `Follow up on ${changes.followUpAt}` : "Follow-up cleared");
  }

  if (changes.lastContactAt !== undefined && changes.lastContactAt !== lead.lastContactAt) {
    next.lastContactAt = changes.lastContactAt;
    if (changes.lastContactAt && !lead.firstContactAt) next.firstContactAt = changes.lastContactAt;
    log("contact", changes.lastContactAt ? `Last contact ${changes.lastContactAt}` : "Last contact cleared");
  }

  if (changes.quoteRef !== undefined && changes.quoteRef !== lead.quoteRef) {
    next.quoteRef = changes.quoteRef;
    log("quote", changes.quoteRef ? `Quotation ${changes.quoteRef}` : "Quotation reference cleared");
  }

  if (changes.note) log("note", changes.note);

  if (next.activity.length === lead.activity.length) return lead;
  next.updatedAt = at;
  return next;
}

/* ------------------------------------------------------------------ */
/* Reading the board                                                   */
/* ------------------------------------------------------------------ */

export function today(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function daysBetween(fromIso: string, to: Date): number {
  return Math.floor((to.getTime() - new Date(fromIso).getTime()) / 86_400_000);
}

export function isOverdue(lead: Pick<LeadSummary, "status" | "followUpAt">, now: Date = new Date()): boolean {
  return lead.status === "open" && lead.followUpAt !== null && lead.followUpAt <= today(now);
}

/** Qualified means someone looked and moved it on. A lead lost at "new" never was. */
export function isQualified(lead: Pick<LeadSummary, "maxStage">): boolean {
  return lead.maxStage >= stageIndex("qualification");
}

export type Count = { key: string; total: number; qualified: number };

function countBy(leads: LeadSummary[], keyOf: (l: LeadSummary) => string): Count[] {
  const map = new Map<string, Count>();
  for (const lead of leads) {
    const key = keyOf(lead) || "Not stated";
    const row = map.get(key) ?? { key, total: 0, qualified: 0 };
    row.total += 1;
    if (isQualified(lead)) row.qualified += 1;
    map.set(key, row);
  }
  return [...map.values()].sort((a, b) => b.qualified - a.qualified || b.total - a.total || a.key.localeCompare(b.key));
}

function median(values: number[]): number | null {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * The brief's dashboards, computed from the index. Every figure is a count of
 * records in the register, so each one can be checked by opening the leads it
 * counts; nothing is estimated or extrapolated.
 */
export function buildReport(leads: LeadSummary[], now: Date = new Date()) {
  const funnel = STAGES.map((stage, i) => ({
    stage: stage.id,
    label: stage.label,
    reached: leads.filter((l) => l.maxStage >= i).length,
  }));

  const quoted = leads.filter((l) => l.maxStage >= stageIndex("quoted"));
  const quotation = {
    issued: quoted.length,
    won: quoted.filter((l) => outcomeOf(l) === "won").length,
    lost: quoted.filter((l) => l.status === "lost").length,
    open: quoted.filter((l) => outcomeOf(l) === "open").length,
  };

  const open = leads.filter((l) => l.status === "open" && outcomeOf(l) === "open");
  const daysToFirstContact = leads
    .filter((l) => l.firstContactAt)
    .map((l) => Math.max(0, daysBetween(l.createdAt, new Date(`${l.firstContactAt}T12:00:00Z`))));

  const followUp = {
    open: open.length,
    overdue: open.filter((l) => isOverdue(l, now)).length,
    withoutDate: open.filter((l) => !l.followUpAt).length,
    neverContacted: open.filter((l) => !l.firstContactAt).length,
    medianDaysToFirstContact: median(daysToFirstContact),
  };

  const quality = {
    total: leads.length,
    withFiles: leads.filter((l) => l.files > 0).length,
    fullForm: leads.filter((l) => l.variant === "full").length,
    qualified: leads.filter(isQualified).length,
  };

  return {
    byCountry: countBy(leads, (l) => l.country),
    byCategory: countBy(leads, (l) => l.category),
    bySource: countBy(leads, (l) => l.source ?? "Direct or not recorded"),
    funnel,
    quotation,
    followUp,
    quality,
  };
}

/* ------------------------------------------------------------------ */
/* The daily reminder                                                  */
/* ------------------------------------------------------------------ */

export type DigestSection = { title: string; leads: LeadSummary[] };

/**
 * The brief's follow-up workflows, as one internal email a day: overdue
 * follow-ups, enquiries nobody has qualified, specifications still awaited,
 * quotations and samples gone quiet, and shipped orders worth a repeat call.
 *
 * Internal only. Nothing here writes to a buyer; deciding what to say to one
 * is the commercial team's job, and an automated chaser is the unsolicited
 * message the brief rules out.
 */
export function buildDigest(leads: LeadSummary[], now: Date = new Date()): DigestSection[] {
  const open = leads.filter((l) => l.status === "open");
  const quietFor = (l: LeadSummary) => daysBetween(l.lastContactAt ? `${l.lastContactAt}T00:00:00Z` : l.updatedAt, now);

  const sections: DigestSection[] = [
    { title: "Follow-ups due", leads: open.filter((l) => isOverdue(l, now)) },
    { title: "New enquiries not yet qualified (2+ days)", leads: open.filter((l) => l.stage === "new" && daysBetween(l.createdAt, now) >= 2) },
    { title: "Specification review with no files received", leads: open.filter((l) => l.stage === "specification" && l.files === 0 && quietFor(l) >= 3) },
    { title: "Quotations with no contact for 7+ days", leads: open.filter((l) => l.stage === "quoted" && quietFor(l) >= 7) },
    { title: "Samples awaiting approval for 14+ days", leads: open.filter((l) => l.stage === "sampling" && quietFor(l) >= 14) },
    { title: "Shipped 60+ days ago: repeat-order opportunity", leads: open.filter((l) => l.stage === "shipment" && quietFor(l) >= 60) },
  ];
  return sections.filter((s) => s.leads.length > 0);
}

/* ------------------------------------------------------------------ */
/* Export                                                              */
/* ------------------------------------------------------------------ */

/**
 * CSV for moving the register into a CRM later. A cell that starts with a
 * formula character is prefixed so a spreadsheet shows it rather than runs it:
 * these values come from a public form.
 */
export function toCsv(rows: Record<string, string | number | null>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const cell = (value: string | number | null) => {
    let s = value === null ? "" : String(value);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((h) => cell(row[h] ?? null)).join(","))].join("\r\n");
}
