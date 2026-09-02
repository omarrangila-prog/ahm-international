import type { AssetKey } from "./assets";
import type { Zone } from "./products";
import type { CapabilityStatus } from "./verification";

/**
 * Material intelligence.
 *
 * `typicalWeight` describes the range this construction is commonly specified in
 * across the industry. It is orientation for a buyer scoping a program — not a
 * statement about AHM's stock, and not an offer. Every rendering of this data
 * carries `MATERIAL_DISCLAIMER`.
 */

export type Material = {
  slug: string;
  name: string;
  /** Generic construction family. */
  family: "Knit" | "Woven" | "Fleece" | "Performance";
  /** Common compositions for this construction. Not an inventory claim. */
  compositions: string[];
  typicalWeight: string;
  handFeel: string;
  finishOptions: string[];
  useCases: string[];
  /**
   * Spec §14 fields. Each describes the *construction*, which is a property of
   * the fabric and true regardless of supplier — not a stock or sourcing claim.
   */
  construction: string;
  weightClass: "Light" | "Mid" | "Heavy";
  stretch: "None" | "Mechanical" | "Elastane";
  surface: string;
  /** Whether AHM runs this today or would develop against it. */
  capabilityStatus: CapabilityStatus;
  asset: AssetKey;
  zone: Zone;
};

/** Facet values derived from the data — never hand-listed. */
export function materialFacets() {
  return {
    families: [...new Set(materials.map((m) => m.family))].sort(),
    weightClasses: ["Light", "Mid", "Heavy"] as const,
    stretch: [...new Set(materials.map((m) => m.stretch))].sort(),
  };
}

export const materials: Material[] = [
  {
    slug: "cotton-pique",
    name: "Cotton Pique",
    family: "Knit",
    compositions: ["100% Cotton", "65/35 Poly-Cotton", "60/40 CVC"],
    typicalWeight: "180-220 gsm",
    handFeel: "Textured, dry, structured. Holds shape through the wash cycle",
    finishOptions: ["Enzyme wash", "Silicone softener", "Easy care"],
    useCases: ["Uniform polos", "Retail and grocery programs", "Corporate wear"],
    construction: "Weft-knit pique, interlocked texture",
    weightClass: "Mid",
    stretch: "None",
    surface: "Textured, matte, visible knit grid",
    capabilityStatus: "current_capability",
    asset: "fabrics.cottonPique",
    zone: "ink",
  },
  {
    slug: "single-jersey",
    name: "Single Jersey",
    family: "Knit",
    compositions: ["100% Cotton", "CVC", "Tri-blend"],
    typicalWeight: "140-200 gsm",
    handFeel: "Smooth, soft, fluid. The standard T-shirt hand",
    finishOptions: ["Bio-wash", "Softener", "Compaction for shrinkage control"],
    useCases: ["Uniform T-shirts", "Event apparel", "Layering pieces"],
    construction: "Plain weft knit, flat face",
    weightClass: "Light",
    stretch: "Mechanical",
    surface: "Smooth face, looped reverse",
    capabilityStatus: "current_capability",
    asset: "fabrics.singleJersey",
    zone: "paper",
  },
  {
    slug: "polycotton-twill",
    name: "Poly-Cotton Twill",
    family: "Woven",
    compositions: ["65/35 Polyester-Cotton", "80/20 Polyester-Cotton", "Cotton-rich twill"],
    typicalWeight: "195-280 gsm",
    handFeel: "Firm, dense diagonal weave. The workwear standard",
    finishOptions: ["Stain release", "Easy care", "Soil release", "Wrinkle resistance"],
    useCases: ["Aprons", "Work shirts", "Work trousers", "Chef wear"],
    construction: "2/1 or 3/1 twill weave",
    weightClass: "Mid",
    stretch: "None",
    surface: "Diagonal rib, matte",
    capabilityStatus: "current_capability",
    asset: "fabrics.polycottonTwill",
    zone: "lime",
  },
  {
    slug: "woven-shirting",
    name: "Woven Shirting",
    family: "Woven",
    compositions: ["Poly-cotton poplin", "Oxford", "Cotton-rich broadcloth"],
    typicalWeight: "115-180 gsm",
    handFeel: "Crisp and light. Presses cleanly, holds a collar",
    finishOptions: ["Easy care", "Wrinkle resistance", "Soil release"],
    useCases: ["Uniform shirts", "Corporate programs", "Hospitality front of house"],
    construction: "Plain or twill weave, fine combed yarn",
    weightClass: "Light",
    stretch: "None",
    surface: "Crisp, flat, subtle sheen",
    capabilityStatus: "current_capability",
    asset: "fabrics.woven",
    zone: "paper",
  },
  {
    slug: "brushed-fleece",
    name: "Brushed Fleece",
    family: "Fleece",
    compositions: ["100% Polyester", "65/35 Poly-Cotton", "CVC French terry"],
    typicalWeight: "260-380 gsm",
    handFeel: "Soft brushed back, stable face. Warm without bulk",
    finishOptions: ["Anti-pill", "Brushed back", "Easy care"],
    useCases: ["Sweatshirts", "Hoodies", "Fleece jackets", "Cold-store programs"],
    construction: "Knit with brushed reverse",
    weightClass: "Heavy",
    stretch: "Mechanical",
    surface: "Smooth face, napped reverse",
    capabilityStatus: "current_capability",
    asset: "fabrics.fleece",
    zone: "ink",
  },
  {
    slug: "performance-polyester",
    name: "Performance Polyester",
    family: "Performance",
    compositions: ["100% Polyester", "Polyester-Elastane", "Recycled polyester*"],
    typicalWeight: "130-190 gsm",
    handFeel: "Light, dry, quick-recovering. Built to move",
    finishOptions: ["Moisture management", "Anti-microbial", "UV protection", "Stretch"],
    useCases: ["Performance polos", "Active uniform programs", "Outdoor teams"],
    construction: "Circular knit, engineered yarn",
    weightClass: "Light",
    stretch: "Elastane",
    surface: "Slick, low-lustre, quick-drying",
    capabilityStatus: "current_capability",
    asset: "fabrics.polyesterPerformance",
    zone: "lime",
  },
  {
    slug: "softshell",
    name: "Bonded Softshell",
    family: "Performance",
    compositions: ["Polyester face with fleece backing", "Polyester-Elastane bonded"],
    typicalWeight: "260-340 gsm",
    handFeel: "Structured, wind-resistant face over a warm backing",
    finishOptions: ["Water-repellent finish", "Wind resistance", "Stretch"],
    useCases: ["Softshell jackets", "Outdoor uniform layers", "Facilities teams"],
    construction: "Bonded multi-layer construction",
    weightClass: "Heavy",
    stretch: "Elastane",
    surface: "Matte face, fleece-backed",
    capabilityStatus: "current_capability",
    asset: "fabrics.softshell",
    zone: "ink",
  },
  {
    slug: "cotton-canvas",
    name: "Cotton Canvas",
    family: "Woven",
    compositions: ["100% Cotton", "Poly-cotton canvas", "Cotton duck"],
    typicalWeight: "240-340 gsm",
    handFeel: "Heavy, rigid, abrasion-resistant. Softens with wear",
    finishOptions: ["Enzyme wash", "Stain release", "Peached finish"],
    useCases: ["Utility aprons", "Work jackets", "Heavy-duty bottoms"],
    construction: "Plain weave, high-tenacity yarn",
    weightClass: "Heavy",
    stretch: "None",
    surface: "Dense, dry, structured",
    capabilityStatus: "current_capability",
    asset: "fabrics.canvas",
    zone: "ink",
  },
];

export const MATERIAL_DISCLAIMER =
  "Weights and compositions shown are typical ranges for each construction, given for orientation while you scope a program. They are not a stock list and not an offer. Final material, weight, finish and performance are confirmed against your specification and approved testing." as const;

export const RECYCLED_FOOTNOTE =
  "*Recycled content is only supplied against mill documentation. We do not claim a sustainability certification without the certificate to support it." as const;

export function getMaterial(slug: string) {
  return materials.find((m) => m.slug === slug);
}
