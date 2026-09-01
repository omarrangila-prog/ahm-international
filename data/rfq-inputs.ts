/**
 * WHAT AHM NEEDS IN ORDER TO QUOTE
 * ================================
 *
 * Lifted out of `app/products/page.tsx`, where it sat as a page-local constant.
 * It is content, and content lives here so a CMS can take it and so more than
 * one surface can render it — the products page shows it as a checklist, and
 * the RFQ form can be measured against the same list rather than a second copy
 * that drifts.
 *
 * `required` is deliberately absent as a concept. None of these is a gate: the
 * page says plainly that a buyer should send what they have. The list exists so
 * an incomplete brief is a known quantity on both sides, not a reason to wait.
 */

export type RfqInput = {
  id: string;
  label: string;
  /** What "having" this actually means, in a buyer's terms. */
  detail: string;
};

export const rfqInputs: RfqInput[] = [
  { id: "article", label: "Article", detail: "What the garment is, and a reference or sketch if you have one" },
  { id: "construction", label: "Construction", detail: "Tech pack, an existing garment, or a written description" },
  { id: "fabric", label: "Fabric", detail: "Composition and weight, or the requirement it has to meet" },
  { id: "quantity", label: "Quantity", detail: "Per style and per colour, even approximately" },
  { id: "colours", label: "Colours", detail: "How many, and against what reference" },
  { id: "sizes", label: "Sizes", detail: "Size range and your measurement specification if one exists" },
  { id: "decoration", label: "Decoration", detail: "Embroidery, print or labels, with artwork where available" },
  { id: "packing", label: "Packing", detail: "Folded or hanging, ratio or solid pack, carton marking" },
  { id: "destination", label: "Destination", detail: "Port and target delivery window" },
  {
    id: "target-price",
    label: "Target price",
    detail: "Optional, and not used against you — it tells us which fabric and construction options are worth presenting",
  },
];
