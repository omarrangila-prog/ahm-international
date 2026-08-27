import type { CapabilityStatus } from "./verification";

/**
 * TRIMS LIBRARY
 * =============
 *
 * Master spec §15. The components that turn a cut-and-sewn shell into a finished
 * garment, described as *development decisions* rather than as a stock list.
 *
 * Why no images, no stock figures and no supplier names:
 *
 * - Trims are nominated or approved by the buyer far more often than they are
 *   chosen by the factory. What a buyer needs from this page is the list of
 *   decisions they will be asked to make, not a catalogue to pick from.
 * - Spec §14 forbids fake stock quantities, and the same reasoning applies here.
 * - Naming a component supplier implies a commercial relationship that would
 *   need verifying, so `supplier` does not exist as a field.
 *
 * `decision` is the field that earns this module its place: it states what the
 * buyer actually has to specify, which is the thing that stalls sampling when
 * it is left open.
 */

export type TrimCategory =
  | "Buttons" | "Zippers" | "Elastic" | "Drawcord" | "Labels"
  | "Velcro" | "Reflective" | "Thread" | "Rib" | "Tapes" | "Snaps";

export type Trim = {
  slug: string;
  name: string;
  category: TrimCategory;
  /** What the component is, materially. */
  material: string;
  /** The specification decision a buyer is asked to make. */
  decision: string;
  /** Where it is normally used. */
  applications: string[];
  capabilityStatus: CapabilityStatus;
  /** Set where the component carries a standard or a safety requirement. */
  note?: string;
};

export const trims: Trim[] = [
  {
    slug: "shank-button", name: "Shank Button", category: "Buttons",
    material: "Metal, polyester or urea",
    decision: "Ligne size, finish, shank type and attachment method",
    applications: ["Denim", "Outerwear", "Work trousers"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "sew-through-button", name: "Sew-Through Button", category: "Buttons",
    material: "Polyester, urea or corozo",
    decision: "Ligne size, hole count, colour match and stitch pattern",
    applications: ["Woven shirts", "Chef coats", "Uniform tops"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "press-stud", name: "Press Stud", category: "Snaps",
    material: "Brass or stainless, nickel-free options",
    decision: "Cap size, finish, spring type and pull-test requirement",
    applications: ["Work shirts", "Outerwear", "Kidswear"],
    capabilityStatus: "current_capability",
    note: "On children's garments the pull-test standard is set by the destination market and is qualified before development.",
  },
  {
    slug: "coil-zip", name: "Coil Zipper", category: "Zippers",
    material: "Polyester coil on woven tape",
    decision: "Gauge, length, slider and puller, open-end or closed-end",
    applications: ["Fleece", "Outerwear", "Bottoms"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "moulded-zip", name: "Moulded Tooth Zipper", category: "Zippers",
    material: "Injection-moulded polyacetal",
    decision: "Gauge, colour, slider style, zip garage and wind flap",
    applications: ["Softshell", "Outerwear"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "water-resistant-zip", name: "Water-Resistant Zipper", category: "Zippers",
    material: "Coil or moulded with a laminated tape",
    decision: "Whether the requirement is water-resistant or waterproof — they are different tests",
    applications: ["Softshell", "Outerwear"],
    capabilityStatus: "development_available",
    note: "Water resistance is a tested property. It is confirmed against buyer-approved testing, not asserted from the component alone.",
  },
  {
    slug: "woven-elastic", name: "Woven Elastic", category: "Elastic",
    material: "Polyester or nylon with rubber or spandex core",
    decision: "Width, stretch ratio, recovery and application method",
    applications: ["Joggers", "Work trousers", "Kidswear"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "flat-drawcord", name: "Flat Drawcord", category: "Drawcord",
    material: "Cotton, poly or blended braid",
    decision: "Width, length, tipping type and eyelet or buttonhole exit",
    applications: ["Hoodies", "Joggers", "Shorts"],
    capabilityStatus: "current_capability",
    note: "Drawcords on children's garments are restricted by destination-market safety rules and are qualified before development.",
  },
  {
    slug: "woven-label", name: "Woven Main Label", category: "Labels",
    material: "Damask or taffeta woven",
    decision: "Artwork, fold type, placement and whether it is sewn into the neck or side seam",
    applications: ["All categories"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "care-label", name: "Care & Content Label", category: "Labels",
    material: "Satin or printed polyester",
    decision: "Required wording, language set and symbol standard for the destination market",
    applications: ["All categories"],
    capabilityStatus: "current_capability",
    note: "Content and care wording is a legal requirement that varies by destination market. It is confirmed against the buyer's market before printing.",
  },
  {
    slug: "heat-transfer-label", name: "Heat-Transfer Neck Label", category: "Labels",
    material: "Printed transfer film",
    decision: "Artwork, size, placement and whether a sewn label is being replaced",
    applications: ["Tees", "Athleisure", "Polos"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "hook-loop", name: "Hook & Loop Tape", category: "Velcro",
    material: "Nylon or polyester hook and loop",
    decision: "Width, closure strength, sew-on or adhesive backing",
    applications: ["Workwear", "Outerwear", "Aprons"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "reflective-tape", name: "Reflective Tape", category: "Reflective",
    material: "Retroreflective film or yarn on a carrier tape",
    decision: "The nominated standard, tape width and placement configuration",
    applications: ["Hi-vis", "Industrial workwear"],
    capabilityStatus: "technical_qualification_required",
    note: "Hi-vis is a certified product class. The garment is built to the buyer's nominated standard, and that standard is qualified with documentary evidence before AHM quotes it.",
  },
  {
    slug: "core-spun-thread", name: "Core-Spun Thread", category: "Thread",
    material: "Polyester core with cotton or poly wrap",
    decision: "Ticket number, colour match and stitch density per seam type",
    applications: ["All categories"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "rib-trim", name: "Rib Trim", category: "Rib",
    material: "1x1 or 2x2 knitted rib, optional elastane",
    decision: "Width, depth, recovery and whether it is tubular or cut-and-sewn",
    applications: ["Fleece", "Outerwear", "Polos"],
    capabilityStatus: "current_capability",
  },
  {
    slug: "twill-tape", name: "Twill Tape", category: "Tapes",
    material: "Cotton or poly twill",
    decision: "Width, colour and whether it is used for seam reinforcement or as a design detail",
    applications: ["Woven shirts", "Outerwear", "Aprons"],
    capabilityStatus: "current_capability",
  },
];

export const trimCategories: TrimCategory[] = [
  ...new Set(trims.map((t) => t.category)),
];

export function trimsByCategory(category: TrimCategory): Trim[] {
  return trims.filter((t) => t.category === category);
}

export const TRIM_DISCLAIMER =
  "Trims are specified or nominated during development. This library lists the decisions a program has to make, not stock held. Component sourcing is confirmed against your specification and, where you nominate a supplier, against theirs." as const;
