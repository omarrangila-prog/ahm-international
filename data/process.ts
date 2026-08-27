import type { AssetKey } from "./assets";

/** The ten development-to-dispatch stages, used by the scroll-driven timeline. */
export type ProcessStage = {
  index: number;
  title: string;
  /** What happens. One sentence, present tense. */
  body: string;
  /** What the buyer supplies or approves at this stage. */
  buyerInput: string;
  asset: AssetKey;
};

export const processStages: ProcessStage[] = [
  {
    index: 1,
    title: "Brief / Tech Pack",
    body: "We review the specification, reference garment or sketch and come back with the questions that would otherwise surface as a failed first sample.",
    buyerInput: "Tech pack, reference garment, sketch or written requirement",
    asset: "development.techPack",
  },
  {
    index: 2,
    title: "Fabric & Trim Review",
    body: "Materials are matched to the requirement and presented with the commercial consequence of each option attached.",
    buyerInput: "Approval of fabric direction, or a nominated supplier",
    asset: "development.swatches",
  },
  {
    index: 3,
    title: "Commercial Costing",
    body: "FOB costing is built against the confirmed construction, materials, decoration, packing and quantity.",
    buyerInput: "Target quantity, destination and target price if you have one",
    asset: "development.measurement",
  },
  {
    index: 4,
    title: "Sample Development",
    body: "Proto and fit samples are produced against the specification, with a written comment sheet at every round.",
    buyerInput: "Sample comments and measurement feedback",
    asset: "development.sample",
  },
  {
    index: 5,
    title: "Fit / Approval",
    body: "Fit, measurements, colour and decoration are approved and locked as the reference for bulk.",
    buyerInput: "Written approval of the sealed sample",
    asset: "development.pattern",
  },
  {
    index: 6,
    title: "Pre-Production",
    body: "Materials are inspected, the marker is finalised, and a pre-production sample confirms bulk materials and construction.",
    buyerInput: "PP sample approval",
    asset: "factory.fabricInspection",
  },
  {
    index: 7,
    title: "Bulk Manufacturing",
    body: "Cutting and assembly run to the approved construction, with inline checks at defined operations.",
    buyerInput: "Nothing: you receive production status",
    asset: "factory.sewing",
  },
  {
    index: 8,
    title: "Quality Control",
    body: "Inspection covers measurement, construction, appearance, decoration and labelling against the approved standard.",
    buyerInput: "Third-party inspection booking, if your program requires one",
    asset: "factory.qualityControl",
  },
  {
    index: 9,
    title: "Packing",
    body: "Garments are folded or hung, polybagged, ratio- or solid-packed and cartoned to your packing instruction.",
    buyerInput: "Packing instruction and carton marking artwork",
    asset: "factory.packing",
  },
  {
    index: 10,
    title: "FOB Dispatch",
    body: "Commercial documentation is prepared, cartons are marked, and the shipment is coordinated to FOB handover at Port Qasim.",
    buyerInput: "Nominated forwarder and shipping instructions",
    asset: "export.containerLoading",
  },
];

/** Quality stages, top to bottom. */
export const qualityStages = [
  {
    index: 1,
    title: "Incoming Material",
    body: "Fabric and trims are checked against the approved standard for shade, weight, width and visible defects before anything is cut.",
  },
  {
    index: 2,
    title: "Pre-Production",
    body: "A pre-production sample confirms bulk fabric, trims and construction against the sealed sample before the line starts.",
  },
  {
    index: 3,
    title: "Inline Inspection",
    body: "Checks run at defined operations during assembly, so a construction problem is found while the batch can still be corrected.",
  },
  {
    index: 4,
    title: "Measurement",
    body: "Garments are measured against the approved size specification and tolerance, by size, across the run.",
  },
  {
    index: 5,
    title: "Finishing Inspection",
    body: "Appearance, decoration, labelling, trimming and pressing are checked against the approved sample.",
  },
  {
    index: 6,
    title: "Packing Verification",
    body: "Assortment, ratio, polybag, carton contents and carton marking are verified against the packing instruction.",
  },
  {
    index: 7,
    title: "Final Release",
    body: "The shipment is released against the agreed inspection standard and the documentation required for export.",
  },
] as const;

/** Modular quality cards — what is actually checked. */
export const qualityDimensions = [
  { title: "Fabric", body: "Shade, weight, width, hand feel and visible defects against the approved standard." },
  { title: "Construction", body: "Seam type, stitch density, thread, needle and reinforcement against the specification." },
  { title: "Measurement", body: "Every measurement point against the approved size specification and tolerance." },
  { title: "Appearance", body: "Finish, pressing, trimming and overall presentation against the sealed sample." },
  { title: "Decoration", body: "Placement, colour, size and durability against the approved strike-off or sew-out." },
  { title: "Packaging", body: "Labelling, folding, polybag, ratio, carton contents and carton marking." },
  { title: "Documentation", body: "Packing list, carton dimensions and weights, and the commercial documents required for export." },
] as const;

/** The standards statement. Deliberately not an AQL claim. */
export const QUALITY_STANDARD_STATEMENT =
  "Inspection standards are aligned to approved buyer requirements. Where your program specifies an inspection level, a third-party inspector or a defect classification, we work to it and confirm it in writing before production." as const;
