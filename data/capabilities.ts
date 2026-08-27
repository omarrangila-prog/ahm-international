import type { AssetKey } from "./assets";

/**
 * Capability content.
 *
 * Every entry answers the buyer's real question — "what does this mean for my
 * order?" — rather than describing the company. `benefit` is deliberately a
 * commercial consequence, not an adjective.
 */

export type Capability = {
  slug: string;
  index: number;
  title: string;
  /** What actually happens at this stage. */
  description: string;
  /** Why the buyer should care. Commercial, specific. */
  benefit: string;
  asset: AssetKey;
  cta: { label: string; href: string };
};

export const capabilities: Capability[] = [
  {
    slug: "product-development",
    index: 1,
    title: "Product Development",
    description:
      "Share your reference garment, sketch or tech pack. Our development process translates product requirements into an executable manufacturing specification. Construction, measurements, materials, trims and decoration, written so the factory floor and your QA read the same document.",
    benefit: "Fewer sample rounds, because the questions get asked before the first sample is cut.",
    asset: "development.techPack",
    cta: { label: "Start development", href: "/development" },
  },
  {
    slug: "fabric-sourcing",
    index: 2,
    title: "Fabric Sourcing",
    description:
      "We source against the requirement (composition, weight, hand feel, finish and colour) and present options with the commercial consequence of each attached, including the alternatives worth considering if the first choice prices badly.",
    benefit: "You see the cost-engineering options before you commit, not after the quote disappoints.",
    asset: "fabrics.polycottonTwill",
    cta: { label: "Explore materials", href: "/materials" },
  },
  {
    slug: "trim-sourcing",
    index: 3,
    title: "Trim Sourcing",
    description:
      "Zips, buttons, drawcords, elastics, hardware, labels and packaging sourced to an approved reference. Trims carry their own lead times, and they are almost never the longest item on the critical path until the day they are. A nominated zip on allocation will hold a finished order in the warehouse. We confirm trim availability against your delivery window at costing, not at cutting.",
    benefit: "The order is not held by a button. Trim lead time is checked while the schedule can still absorb it.",
    asset: "development.trims",
    cta: { label: "Send a specification", href: "/request-a-quote" },
  },
  {
    slug: "pattern-development",
    index: 4,
    title: "Pattern Development",
    description:
      "Patterns are developed from your measurement specification or graded from an approved fit sample, then digitised for marker making so consumption is calculated against the real lay, not an estimate.",
    benefit: "Fabric consumption is costed from the actual marker, which is where FOB accuracy comes from.",
    asset: "development.pattern",
    cta: { label: "Discuss a fit", href: "/development" },
  },
  {
    slug: "sampling",
    index: 5,
    title: "Sampling",
    description:
      "Proto, fit, size set, pre-production and shipment samples, each produced against a written comment sheet so every round closes specific points rather than restarting the conversation.",
    benefit: "Approval moves forward each round instead of circling.",
    asset: "development.sample",
    cta: { label: "Request a sample", href: "/request-a-quote" },
  },
  {
    slug: "cutting",
    index: 6,
    title: "Cutting",
    description:
      "Fabric is relaxed, inspected and laid to the approved marker. Cut panels are bundled and ticketed by size and shade so shade continuity survives the sewing floor.",
    benefit: "Shade variation is caught at the lay, not by your inspector in the carton.",
    asset: "factory.cutting",
    cta: { label: "See manufacturing", href: "/manufacturing" },
  },
  {
    slug: "stitching",
    index: 7,
    title: "Stitching",
    description:
      "Assembly runs to the approved construction (seam type, stitch density, thread and needle specification) with inline checks at defined operations rather than only at the end of the line.",
    benefit: "Construction defects are found while the batch can still be corrected.",
    asset: "factory.sewing",
    cta: { label: "See quality process", href: "/quality" },
  },
  {
    slug: "screen-printing",
    index: 8,
    title: "Screen Printing",
    description:
      "Placement prints matched to an approved strike-off, with colour, hand feel, placement and cure confirmed before bulk. Print type is selected against the fabric rather than applied uniformly.",
    benefit: "The print on garment ten thousand matches the strike-off you signed.",
    asset: "factory.printing",
    cta: { label: "Discuss decoration", href: "/capabilities" },
  },
  {
    slug: "embroidery",
    index: 9,
    title: "Embroidery",
    description:
      "Logos digitised and approved as a sew-out before bulk, with backing, density and thread confirmed for the specific fabric so the logo sits flat on knit as well as woven.",
    benefit: "Your brand mark reproduces consistently across every article in the program.",
    asset: "factory.embroidery",
    cta: { label: "Discuss decoration", href: "/capabilities" },
  },
  {
    slug: "finishing",
    index: 10,
    title: "Finishing",
    description:
      "Trimming, pressing, measurement verification and appearance check against the approved sample, with garments presented the way they will be received.",
    benefit: "The garment out of the polybag looks like the one you approved.",
    asset: "factory.finishing",
    cta: { label: "See quality process", href: "/quality" },
  },
  {
    slug: "quality",
    index: 11,
    title: "Quality Assurance",
    description:
      "Inspection runs across incoming material, pre-production, inline, measurement, finishing and packing. Standards are aligned to approved buyer requirements rather than to a number we chose ourselves.",
    benefit: "Your standard is the standard, and it is checked at every stage that can still be fixed.",
    asset: "factory.qualityControl",
    cta: { label: "See quality process", href: "/quality" },
  },
  {
    slug: "packing",
    index: 12,
    title: "Packing",
    description:
      "Folded or hanging, polybagged, ratio-packed or solid-packed, cartoned and marked to your packing instruction, with carton dimensions and weights recorded for the shipping documents.",
    benefit: "Cartons arrive matching the packing list, which is what keeps the DC from rejecting them.",
    asset: "factory.packing",
    cta: { label: "See export process", href: "/export" },
  },
  {
    slug: "export-coordination",
    index: 13,
    title: "Export Coordination",
    description:
      "Commercial invoice, packing list and export documentation built from the carton dimensions and weights recorded at packing, not typed from the order sheet. Booking is coordinated with your nominated forwarder, and documents are released against your instruction through to FOB handover at Port Qasim, Karachi.",
    benefit: "The paperwork matches the pallet. Clearance delays are usually a documentation mismatch, and that is a records problem solved at packing.",
    asset: "export.containerLoading",
    cta: { label: "Discuss an FOB program", href: "/export" },
  },
];

/** The nine-step strip under the hero. Order mirrors the production sequence. */
export const trustStrip = [
  "Product Development",
  "Fabric Sourcing",
  "Sampling",
  "Cut & Sew",
  "Printing",
  "Embroidery",
  "Quality Assurance",
  "Packing",
  "FOB Export",
] as const;

/**
 * Why AHM — six positions.
 *
 * Each pairs a claim with a specific, checkable detail that only someone who
 * has actually run production would write. That is deliberate: AHM cannot
 * compete with the global tier on scale claims — they publish headcounts in the
 * tens of thousands and daily output in the millions, and AHM has none of that
 * verified. What it can do is demonstrate craft knowledge, which the regional
 * competition does not attempt at all: their sites say "exceptional
 * craftsmanship" and "commitment to excellence" and stop there.
 *
 * So every entry below has to survive the test: could a buyer read this and
 * conclude the writer has personally solved this problem? A sentence that only
 * asserts a virtue gets rewritten until it names something concrete.
 */
export const whyAhm = [
  {
    index: 1,
    title: "Commercial Thinking",
    body:
      "Costing is built from the digitised marker for your actual size ratio, not an average consumption figure. That is why a quotation holds when the order is placed instead of moving.",
  },
  {
    index: 2,
    title: "Development First",
    body:
      "We list what a specification leaves open before quoting it. An unanswered question is priced defensively by every factory you send it to. Resolving it first is the cheapest money you will save.",
  },
  {
    index: 3,
    title: "Flexible Sourcing",
    body:
      "When a fabric prices above target we present the alternative alongside the original, with the trade-off named. Most quotations come back high and silent, which leaves you to guess what to change.",
  },
  {
    index: 4,
    title: "Buyer Visibility",
    body:
      "Every sample round is produced against a written comment sheet, so each one closes specific points rather than restarting the conversation. Approval converges instead of circling.",
  },
  {
    index: 5,
    title: "FOB Experience",
    body:
      "Documented FOB export from Port Qasim, Karachi to the United States. A 65/35 poly-cotton stain-managed bib apron program. One documented lane, stated plainly, rather than a world map of destinations we have never shipped to.",
  },
  {
    index: 6,
    title: "Long-Term Program Mindset",
    body:
      "Cut panels are bundled and ticketed by shade lot, so a sleeve and a body from different lots never reach the same garment. Consistency across reorders is the product. It is not a bonus, and it is not luck.",
  },
] as const;
