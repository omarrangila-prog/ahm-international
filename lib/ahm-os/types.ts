/**
 * AHM OS — DOMAIN TYPES
 * =====================
 *
 * Master spec §56. The shared vocabulary between the public website and AHM OS.
 *
 * These describe the *shape of the business*, not the shape of this website's
 * current pages. That is deliberate: the site today captures leads and tech packs,
 * but the workflow it feeds runs all the way to a shipped carton, and modelling
 * only the near end would guarantee a rewrite at the first integration.
 *
 * Nothing here fabricates data. These are type declarations — there is no seeded
 * record, no mock database and no fake production call anywhere in this folder.
 */

import type { CapabilityStatus, VerificationStatus } from "@/data/verification";

/** Branded ids so a ShipmentId cannot be passed where a SampleId is wanted. */
export type Id<T extends string> = string & { readonly __brand: T };

export type BuyerId = Id<"Buyer">;
export type LeadId = Id<"Lead">;
export type RfqId = Id<"RFQ">;
export type ProjectId = Id<"DevelopmentProject">;
export type SampleId = Id<"Sample">;
export type ShipmentId = Id<"Shipment">;
export type DocumentId = Id<"Document">;
export type ShowroomToken = Id<"Showroom">;

export type IsoDate = string; // YYYY-MM-DD
export type IsoDateTime = string; // RFC 3339

/* ------------------------------------------------------------------ parties */

export type Company = {
  id: BuyerId;
  legalName: string;
  tradingName?: string;
  country: string;
  segment?: "Grocery" | "Hospitality" | "Food Service" | "Retail" | "Corporate" | "Industrial" | "Facilities" | "Events";
  website?: string;
};

export type Contact = {
  companyId: BuyerId;
  name: string;
  role?: string;
  email: string;
  phone?: string;
};

export type Buyer = Company & { contacts: Contact[] };

/* -------------------------------------------------------------- commercial */

export type LeadStatus =
  | "lead" | "qualified" | "rfq" | "development"
  | "sample" | "quote" | "trial_order" | "customer";

export type Lead = {
  id: LeadId;
  company: string;
  contactName: string;
  email: string;
  country: string;
  segment?: Company["segment"];
  productInterest: string[];
  estimatedQuantity?: number;
  /** Which surface produced it — homepage benchmark, tech pack page, showroom. */
  source: string;
  status: LeadStatus;
  owner?: string;
  nextAction?: string;
  nextActionDate?: IsoDate;
  /**
   * Internal prioritisation only. Spec §37 is explicit that scoring must never
   * drive an automated rejection, so nothing consumes this to decline a buyer.
   */
  score?: number;
  notes?: string;
  createdAt: IsoDateTime;
};

export type RfqLineItem = {
  product: string;
  quantity?: number;
  colour?: string;
  sizeSplit?: string;
  material?: string;
  branding?: string;
  /** Buyer's target. Never a figure AHM has quoted. */
  targetFob?: string;
  delivery?: IsoDate;
};

export type Rfq = {
  id: RfqId;
  leadId: LeadId;
  lineItems: RfqLineItem[];
  attachments: DocumentId[];
  comments?: string;
  createdAt: IsoDateTime;
};

export type BenchmarkRequest = {
  leadId: LeadId;
  category: string;
  fabric?: string;
  gsm?: string;
  quantity?: number;
  targetFob?: string;
  targetDelivery?: IsoDate;
  currentSourcingCountry?: string;
  attachments: DocumentId[];
};

/* ------------------------------------------------------------- development */

export type TechPack = {
  id: DocumentId;
  projectId?: ProjectId;
  filename: string;
  bytes: number;
  mimeType: string;
  uploadedAt: IsoDateTime;
  /** Extraction is always human-reviewed before it becomes a record (§54). */
  extraction?: { status: "suggested" | "needs_review" | "confirmed"; fields: Record<string, string> };
};

export type SampleStage =
  | "development" | "fit" | "revision" | "pre_production" | "approved";

export type Sample = {
  id: SampleId;
  projectId: ProjectId;
  stage: SampleStage;
  version: number;
  createdAt: IsoDateTime;
};

export type SampleRevision = {
  sampleId: SampleId;
  version: number;
  buyerComment?: string;
  ahmComment?: string;
  createdAt: IsoDateTime;
};

export type ApprovalDecision = "approved" | "rejected" | "changes_requested";

/** Append-only. Spec §29: no silent overwriting of a decision. */
export type Approval = {
  sampleId: SampleId;
  decision: ApprovalDecision;
  by: string;
  at: IsoDateTime;
  comment?: string;
  version: number;
};

export type DevelopmentProject = {
  id: ProjectId;
  buyerId: BuyerId;
  style: string;
  reference?: string;
  quantity?: number;
  delivery?: IsoDate;
  stage: string;
  merchandiser?: string;
};

/* ------------------------------------------------------------------ quality */

export type Measurement = {
  pointOfMeasure: string;
  size: string;
  spec: number;
  tolerance: number;
  actual?: number;
};

export type Inspection = {
  projectId: ProjectId;
  gate: string;
  at: IsoDateTime;
  result: "pass" | "fail" | "conditional";
  measurements?: Measurement[];
  notes?: string;
};

export type CapaStatus = "open" | "investigating" | "actioned" | "verification" | "closed";

export type Capa = {
  issue: string;
  severity: "low" | "medium" | "high" | "critical";
  stage: string;
  rootCause?: string;
  correctiveAction?: string;
  preventiveAction?: string;
  owner?: string;
  dueDate?: IsoDate;
  evidence: DocumentId[];
  status: CapaStatus;
};

/* ------------------------------------------------------------------- export */

export type ShipmentStatus =
  | "material_confirmed" | "material_received" | "cutting" | "decoration"
  | "sewing" | "finishing" | "inspection" | "packing" | "ready_to_ship" | "dispatched";

export type Shipment = {
  id: ShipmentId;
  projectId: ProjectId;
  tradeTerm: "FOB" | "CIF" | "CFR" | "EXW";
  portOfLoading: string;
  destination: string;
  bookingReference?: string;
  etd?: IsoDate;
  eta?: IsoDate;
  cartons?: number;
  grossWeightKg?: number;
  netWeightKg?: number;
  documents: DocumentId[];
  status: ShipmentStatus;
};

/* ---------------------------------------------------------------- documents */

export type DocumentCategory =
  | "tech_pack" | "costing" | "sample" | "approval"
  | "quality" | "packing" | "export";

export type StoredDocument = {
  id: DocumentId;
  name: string;
  category: DocumentCategory;
  /** Versioning is mandatory — spec §33. */
  version: number;
  uploadedBy: string;
  uploadedAt: IsoDateTime;
  status: "draft" | "submitted" | "approved" | "superseded";
  /** Buyer documents are never public. Spec §50. */
  accessLevel: "internal" | "buyer" | "restricted";
};

/* ----------------------------------------------------------------- showroom */

export type ShowroomProduct = { categorySlug: string; articleName?: string; note?: string };

export type Showroom = {
  token: ShowroomToken;
  buyerLabel: string;
  products: ShowroomProduct[];
  /** Always excluded from indexing — spec §27/§49. */
  noindex: true;
  expiresAt?: IsoDateTime;
};

export type PortalUser = {
  buyerId: BuyerId;
  email: string;
  role: "viewer" | "approver" | "admin";
};

/* ---------------------------------------------------------------- timeline */

export type TimelineEvent = {
  projectId: ProjectId;
  at: IsoDateTime;
  kind: "email" | "comment" | "approval" | "revision" | "call_note" | "document" | "status_change";
  summary: string;
  by?: string;
};

/* ----------------------------------------------------- site-side catalogue */

export type Capability = {
  name: string;
  capabilityStatus: CapabilityStatus;
  verificationStatus: VerificationStatus;
  evidence?: string;
};

export type ProcessStage = {
  index: number;
  name: string;
  group: "develop" | "approve" | "prepare" | "produce" | "verify" | "ship";
  whatHappens: string;
  buyerProvides?: string;
  ahmDelivers?: string;
  approvedOutput?: string;
};

export type QualityGate = {
  index: number;
  name: string;
  purpose: string;
  checks: string[];
  documents: string[];
};
