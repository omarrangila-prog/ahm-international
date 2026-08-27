/**
 * AHM OS — MAPPERS
 * ================
 *
 * Translates what the website collects into what AHM OS stores.
 *
 * Kept as pure functions with no I/O so they can be unit-tested directly and
 * reused from any route. The mapping is the part most likely to be wrong when a
 * real API appears, so it is isolated here rather than inlined into a handler.
 */

import type { Lead, LeadId, Rfq, RfqId, RfqLineItem, BenchmarkRequest } from "./types";

/** RFQ form field names, as the site's Zod schema produces them. */
export type SiteSubmission = Record<string, unknown>;

const str = (v: unknown): string | undefined => {
  const s = typeof v === "string" ? v.trim() : "";
  return s === "" ? undefined : s;
};
const num = (v: unknown): number | undefined => {
  const n = typeof v === "number" ? v : Number(str(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

/**
 * A submission always becomes a Lead first. Spec §35 puts every website enquiry
 * at the head of the same pipeline, so there is no second path that skips
 * qualification.
 */
export function toLead(
  s: SiteSubmission,
  meta: { reference: string; source: string; createdAt: string },
): Lead {
  return {
    id: meta.reference as LeadId,
    company: str(s.company) ?? "",
    contactName: str(s.name) ?? "",
    email: str(s.email) ?? "",
    country: str(s.country) ?? "",
    productInterest: [str(s.category), str(s.product)].filter((v): v is string => Boolean(v)),
    estimatedQuantity: num(s.quantity),
    source: meta.source,
    status: "lead",
    notes: str(s.message) ?? str(s.comments),
    createdAt: meta.createdAt,
  };
}

export function toRfq(
  s: SiteSubmission,
  meta: { reference: string; createdAt: string },
): Rfq {
  const line: RfqLineItem = {
    product: str(s.category) ?? str(s.product) ?? "Unspecified",
    quantity: num(s.quantity),
    colour: str(s.colours),
    material: str(s.fabric),
    branding: str(s.decoration),
    targetFob: str(s.targetPrice),
  };
  return {
    id: meta.reference as RfqId,
    leadId: meta.reference as LeadId,
    lineItems: [line],
    attachments: [],
    comments: str(s.message),
    createdAt: meta.createdAt,
  };
}

export function toBenchmarkRequest(s: SiteSubmission, meta: { reference: string }): BenchmarkRequest {
  return {
    leadId: meta.reference as LeadId,
    category: str(s.category) ?? "Unspecified",
    fabric: str(s.fabric),
    gsm: str(s.gsm),
    quantity: num(s.quantity),
    targetFob: str(s.targetPrice),
    currentSourcingCountry: str(s.currentSourcingCountry),
    attachments: [],
  };
}
