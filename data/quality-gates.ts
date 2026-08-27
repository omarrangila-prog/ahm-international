/**
 * QUALITY GATES
 * =============
 *
 * Master spec §19. Nine gates, each with purpose, what is checked, the record it
 * produces, and what a failure does.
 *
 * The `onFailure` field is the one that matters. A quality page that lists checks
 * without saying what happens when one fails is describing an aspiration; a buyer
 * evaluating a factory is trying to find out whether a bad result actually stops
 * anything. So every gate states its own stop condition.
 *
 * These describe AHM's *process*, which is a documented statement about how work
 * is run — not a claim about certification, audit score or inspection outcome.
 * No AQL figure is asserted, because the acceptance level is a commercial
 * decision the buyer makes (see the glossary entry for AQL).
 */

export type QualityGate = {
  index: number;
  name: string;
  /** Why the gate exists, in the buyer's terms. */
  purpose: string;
  /** What is physically examined. */
  checks: string[];
  /** The record the gate produces. */
  record: string;
  /** What a failing result stops. */
  onFailure: string;
};

export const qualityGates: QualityGate[] = [
  {
    index: 1,
    name: "Material Inspection",
    purpose:
      "Fabric faults are cheapest to find before they are cut. A defect discovered in a finished garment has already absorbed every operation after cutting.",
    checks: ["Construction and weight against spec", "Shade against the approved lab dip", "Width and usable yield", "Visual defects across the roll"],
    record: "Incoming material inspection record",
    onFailure: "The lot is held and not issued to cutting. Replacement or a buyer-approved deviation is agreed before the roll moves.",
  },
  {
    index: 2,
    name: "Pre-Production Approval",
    purpose:
      "The PP sample proves the bulk materials and the actual line — not just that the pattern works in a sample room.",
    checks: ["Made on bulk fabric and trims", "Made on the production line", "Measured against the approved specification", "Decoration to the approved strike-off or sew-out"],
    record: "Approved PP sample, retained as the production reference",
    onFailure: "Cutting does not start. This is the last gate where a change is inexpensive.",
  },
  {
    index: 3,
    name: "Cutting Check",
    purpose:
      "A cutting error repeats across every panel in the lay, so it is verified once rather than discovered a thousand times.",
    checks: ["Marker against the approved pattern", "Ply count and lay tension", "Shade banding maintained through the bundle", "Notch and drill placement"],
    record: "Cutting inspection record with bundle references",
    onFailure: "The lay is stopped and re-cut. Affected bundles are quarantined rather than allowed forward for repair.",
  },
  {
    index: 4,
    name: "Sewing / Construction",
    purpose:
      "Confirms the garment is being built to the approved construction, not to whatever is fastest on the day.",
    checks: ["Seam type against specification", "Stitch density per seam", "Bar-tack placement at stress points", "Thread and needle size for the fabric"],
    record: "Construction verification against the sealed sample",
    onFailure: "The operation is corrected at source and preceding output is re-checked before the line continues.",
  },
  {
    index: 5,
    name: "Inline QC",
    purpose:
      "Catches a fault at the operation that caused it. Final inspection can only reject; inline can still correct.",
    checks: ["Sampling at each major operation", "Recurring defect patterns by operator and machine", "In-process measurement spot checks"],
    record: "Inline inspection records through the run",
    onFailure: "The operation is stopped and reset. A repeating defect is raised as a CAPA rather than absorbed.",
  },
  {
    index: 6,
    name: "Measurement",
    purpose:
      "Confirms the bulk sits inside the agreed tolerance — and reports where inside it, because a consistent bias to one edge is a process problem even though nothing has failed.",
    checks: ["All specified points of measure", "Across the size range, not only the base size", "Against tolerance, both directions"],
    record: "Measurement inspection record against specification",
    onFailure: "Out-of-tolerance lots are held. A within-tolerance bias is reported rather than quietly accepted.",
  },
  {
    index: 7,
    name: "Finishing",
    purpose:
      "The last point at which the garment's appearance can be corrected before it is packed.",
    checks: ["Trimming and thread ends", "Pressing and appearance", "Labelling: main, care, size, country of origin", "Decoration placement and finish"],
    record: "Finishing inspection record",
    onFailure: "Garments return for rework and are re-inspected rather than passed on a second look.",
  },
  {
    index: 8,
    name: "Packing",
    purpose:
      "Correct garments packed wrongly arrive as a claim. Ratio, marking and carton content are verified against the instruction.",
    checks: ["Fold or hang to instruction", "Polybag and barcode", "Ratio or solid pack against the packing list", "Carton marking against approved artwork"],
    record: "Packing verification record and packing list",
    onFailure: "Cartons are opened and repacked. The packing instruction is re-confirmed with the buyer where it was ambiguous.",
  },
  {
    index: 9,
    name: "Final Release",
    purpose:
      "The decision to ship, taken against the sealed sample and the acceptance standard the buyer set — not against whether the shipment date is close.",
    checks: ["Final inspection against the sealed sample", "Against the buyer's nominated acceptance standard", "Documentation complete", "Third-party inspection where the buyer nominates one"],
    record: "Final inspection report",
    onFailure: "The lot is not released. A shipment date is not a reason to release a failing lot.",
  },
];

export const QUALITY_GATE_COUNT = qualityGates.length;

export const QUALITY_GATES_DISCLAIMER =
  "This describes how AHM runs quality on a program. It is a statement of process, not a certification claim, and no audit rating or inspection outcome is published on this site. Acceptance levels are a commercial decision confirmed with you before production." as const;
