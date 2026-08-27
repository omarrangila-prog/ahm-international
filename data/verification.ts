/**
 * VERIFICATION & CAPABILITY STATUS
 * ================================
 *
 * Master spec §2. Two orthogonal questions that the site must never conflate:
 *
 *   verificationStatus — how well evidenced is this claim?
 *   capabilityStatus   — can AHM make this today, develop it, or neither yet?
 *
 * A garment can be a CURRENT_CAPABILITY that is only INTERNALLY_VERIFIED, and a
 * DEVELOPMENT_AVAILABLE product can be backed by a VERIFIED physical sample. The
 * two travel together and are stored separately.
 *
 * The single hard rule: PENDING_VERIFICATION never reaches the public site.
 * `isPublishable()` is the only gate, so there is one place to audit.
 */

export type VerificationStatus =
  | "verified"                 // documentary evidence exists and has been seen
  | "internally_verified"      // AHM confirms it; no third-party document yet
  | "pending_verification"     // asserted but unevidenced — NEVER PUBLIC
  | "development_capability"   // a thing AHM can develop, not a thing already done
  | "qualification_required";  // needs technical/standards qualification first

export type CapabilityStatus =
  | "current_capability"
  | "development_available"
  | "technical_qualification_required";

/**
 * The publication gate. Spec §2: "Never display pending_verification claims
 * publicly." Everything routed through here rather than compared inline, so
 * adding a status later cannot silently leak.
 */
export function isPublishable(status: VerificationStatus): boolean {
  return status !== "pending_verification";
}

/** Public-facing wording. Deliberately plain — no marketing adjectives. */
export const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  verified: "Verified",
  internally_verified: "Internally verified",
  pending_verification: "Not published",
  development_capability: "Development capability",
  qualification_required: "Qualification required",
};

export const CAPABILITY_LABEL: Record<CapabilityStatus, string> = {
  current_capability: "Current capability",
  development_available: "Development available",
  technical_qualification_required: "Technical qualification required",
};

/**
 * What a buyer should take from each status, in their own terms. Shown as the
 * badge's title/tooltip so the label is never ambiguous.
 */
export const CAPABILITY_MEANING: Record<CapabilityStatus, string> = {
  current_capability:
    "AHM manufactures this product class. Send a tech pack and it enters costing.",
  development_available:
    "Not a current running product. AHM can develop it against your specification, starting with a development sample.",
  technical_qualification_required:
    "This product class carries a technical or protective standard. It requires documented qualification before AHM would quote it.",
};

/** Proof types a claim can rest on. Spec §52. */
export type ProofKind =
  | "verified_export"
  | "development_sample"
  | "physical_sample"
  | "process_documented"
  | "case_study"
  | "qualification_required";

export const PROOF_LABEL: Record<ProofKind, string> = {
  verified_export: "Verified export",
  development_sample: "Development sample",
  physical_sample: "Physical sample",
  process_documented: "Process documented",
  case_study: "Case study",
  qualification_required: "Qualification required",
};
