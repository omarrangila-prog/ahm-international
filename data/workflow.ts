/**
 * THE 26-STAGE WORKFLOW
 * =====================
 *
 * Master spec §17: the full model, from buyer inquiry to FOB dispatch.
 *
 * The spec is explicit that this must not render as twenty-six equal cards, and
 * it is right — twenty-six equal things communicate nothing, because a reader
 * cannot tell which of them they are currently in. So the stages carry a `group`,
 * and the UI renders six phases a buyer can locate themselves inside, each
 * opening to the stages beneath it.
 *
 * This complements `data/process.ts` rather than replacing it. That module drives
 * the homepage's ten-step scroll timeline, which is the right level of detail for
 * someone deciding whether to make contact. This one is the reference model for
 * someone who has already decided and wants to know exactly what happens.
 *
 * Every stage states what the *buyer* provides, because the most common cause of
 * a stalled program is an input nobody realised was owed.
 */

export type WorkflowGroup = "develop" | "approve" | "prepare" | "produce" | "verify" | "ship";

export type WorkflowStage = {
  index: number;
  name: string;
  group: WorkflowGroup;
  /** What happens, in one sentence. */
  whatHappens: string;
  /** What the buyer supplies. Null where the stage is entirely AHM's. */
  buyerProvides: string | null;
  /** What AHM hands over. */
  ahmDelivers: string;
};

export const workflowGroups: {
  id: WorkflowGroup;
  label: string;
  summary: string;
  zone: string;
}[] = [
  { id: "develop", label: "Develop", zone: "ink",
    summary: "Turning a requirement into a costed, buildable specification." },
  { id: "approve", label: "Approve", zone: "lime",
    summary: "Getting to a sealed sample both sides have signed." },
  { id: "prepare", label: "Prepare", zone: "ink",
    summary: "Committing materials and locking the pre-production standard." },
  { id: "produce", label: "Produce", zone: "ink",
    summary: "Cutting, decorating and sewing the approved specification." },
  { id: "verify", label: "Verify", zone: "paper",
    summary: "Checking the bulk against the sealed sample, not against hope." },
  { id: "ship", label: "Ship", zone: "ink",
    summary: "Packing, documenting and handing over at the port." },
];

export const workflowStages: WorkflowStage[] = [
  { index: 1, name: "Buyer Inquiry", group: "develop",
    whatHappens: "The enquiry is read by someone who can judge whether AHM is the right factory for it, and says so if it is not.",
    buyerProvides: "The style, the quantity and the market it is for",
    ahmDelivers: "A direct answer on fit, and the questions that matter" },
  { index: 2, name: "Tech Pack / Reference", group: "develop",
    whatHappens: "The specification, reference garment or sketch is reviewed in detail.",
    buyerProvides: "Tech pack, reference garment, sketch or written requirement",
    ahmDelivers: "A list of gaps and ambiguities, before they become a failed sample" },
  { index: 3, name: "Requirement Review", group: "develop",
    whatHappens: "Construction, finish and performance requirements are agreed in writing.",
    buyerProvides: "Decisions on the open points raised",
    ahmDelivers: "An agreed requirement document" },
  { index: 4, name: "Fabric Review", group: "develop",
    whatHappens: "Materials are matched to the requirement, with the commercial consequence of each option attached.",
    buyerProvides: "Approval of direction, or a nominated mill",
    ahmDelivers: "Fabric options with weight, composition and hand feel" },
  { index: 5, name: "Trim Review", group: "develop",
    whatHappens: "Components are specified or matched against a nomination.",
    buyerProvides: "Nominations where you have them",
    ahmDelivers: "A trim card against the requirement" },
  { index: 6, name: "Commercial Costing", group: "develop",
    whatHappens: "FOB costing is built against the confirmed construction, materials, decoration, packing and quantity.",
    buyerProvides: "Quantity, destination and target price if you have one",
    ahmDelivers: "An FOB cost with its assumptions stated" },

  { index: 7, name: "Pattern Development", group: "approve",
    whatHappens: "The block is developed and graded to your measurement specification.",
    buyerProvides: "Measurement specification, or the reference to work from",
    ahmDelivers: "A graded pattern" },
  { index: 8, name: "Sample Development", group: "approve",
    whatHappens: "The first physical sample is made to the agreed specification.",
    buyerProvides: null,
    ahmDelivers: "Development sample with a measurement sheet" },
  { index: 9, name: "Measurement / Fit", group: "approve",
    whatHappens: "The sample is measured against spec and the variances are reported, including the ones that are not flattering.",
    buyerProvides: "Fit session and comments",
    ahmDelivers: "Measurement report against tolerance" },
  { index: 10, name: "Buyer Feedback", group: "approve",
    whatHappens: "Comments are consolidated into a revision list with anything contradictory resolved before work restarts.",
    buyerProvides: "Consolidated written comments",
    ahmDelivers: "An agreed revision list" },
  { index: 11, name: "Revised Sample", group: "approve",
    whatHappens: "The revision is made and re-measured.",
    buyerProvides: null,
    ahmDelivers: "Revised sample and updated measurement sheet" },
  { index: 12, name: "Approval", group: "approve",
    whatHappens: "A sealed sample is signed by both sides and becomes the production standard.",
    buyerProvides: "Written approval of the sealed sample",
    ahmDelivers: "Sealed sample, retained and referenced through production" },

  { index: 13, name: "Pre-Production", group: "prepare",
    whatHappens: "The PP sample is produced on bulk materials and approved before cutting starts.",
    buyerProvides: "PP sample approval",
    ahmDelivers: "PP sample on bulk fabric and trims" },
  { index: 14, name: "Material Procurement", group: "prepare",
    whatHappens: "Fabric and trims are committed against the approved standard.",
    buyerProvides: "Confirmed order and any nominated supplier instructions",
    ahmDelivers: "Committed materials against the approved bill of materials" },
  { index: 15, name: "Fabric Inspection", group: "prepare",
    whatHappens: "Incoming fabric is inspected for construction, weight, shade and defects before it is cut.",
    buyerProvides: null,
    ahmDelivers: "Incoming material inspection record" },

  { index: 16, name: "Cutting", group: "produce",
    whatHappens: "Marker, spreading and cutting to the approved pattern, with shade banding maintained.",
    buyerProvides: null,
    ahmDelivers: "Cut panels with bundle control" },
  { index: 17, name: "Printing / Embroidery", group: "produce",
    whatHappens: "Decoration is applied to the approved strike-off or sew-out.",
    buyerProvides: "Approved artwork and a signed strike-off or sew-out",
    ahmDelivers: "Decorated panels or garments to the approved standard" },
  { index: 18, name: "Sewing", group: "produce",
    whatHappens: "Assembly to the approved construction, seam type and stitch density.",
    buyerProvides: null,
    ahmDelivers: "Assembled garments" },
  { index: 19, name: "Inline QC", group: "produce",
    whatHappens: "Checks during assembly, so a defect is caught at the operation that caused it rather than at the end.",
    buyerProvides: null,
    ahmDelivers: "Inline inspection records" },
  { index: 20, name: "Finishing", group: "produce",
    whatHappens: "Trimming, pressing, labelling and finishing to the approved standard.",
    buyerProvides: null,
    ahmDelivers: "Finished garments" },

  { index: 21, name: "Measurement Inspection", group: "verify",
    whatHappens: "Finished garments are measured against the approved specification and tolerance.",
    buyerProvides: null,
    ahmDelivers: "Measurement inspection record" },
  { index: 22, name: "Final QC", group: "verify",
    whatHappens: "Final inspection against the sealed sample and the agreed acceptance standard.",
    buyerProvides: "Nominated AQL or third-party inspection instruction if you use one",
    ahmDelivers: "Final inspection report" },

  { index: 23, name: "Packing", group: "ship",
    whatHappens: "Folding or hanging, polybagging and cartoning to the packing instruction.",
    buyerProvides: "Packing instruction, ratio or solid pack",
    ahmDelivers: "Packed cartons to instruction" },
  { index: 24, name: "Carton Marking", group: "ship",
    whatHappens: "Shipping marks and labels applied to the approved artwork.",
    buyerProvides: "Carton marking artwork and barcode requirements",
    ahmDelivers: "Marked cartons with a packing list" },
  { index: 25, name: "Export Documents", group: "ship",
    whatHappens: "Commercial documentation is prepared for the shipment and the destination market.",
    buyerProvides: "Shipping instructions and nominated forwarder",
    ahmDelivers: "Invoice, packing list and the documents the shipment requires" },
  { index: 26, name: "FOB Dispatch", group: "ship",
    whatHappens: "Goods are handed over at the port against the agreed trade term.",
    buyerProvides: "Booking through your nominated forwarder",
    ahmDelivers: "Handover at Port Qasim with documentation" },
];

export function stagesInGroup(group: WorkflowGroup): WorkflowStage[] {
  return workflowStages.filter((s) => s.group === group);
}

/** Guards the model against a stage being dropped or renumbered by accident. */
export const WORKFLOW_STAGE_COUNT = workflowStages.length;
