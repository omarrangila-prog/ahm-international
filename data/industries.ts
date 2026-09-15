import type { AssetKey } from "./assets";

/**
 * Uniform program industries.
 *
 * Imagery shows the *kind of environment* these programs serve. It never implies
 * that any organisation shown is a customer — nothing here names one, and the
 * asset pack's photography brief excludes logos and branding for this reason.
 */

export type Industry = {
  slug: string;
  name: string;
  /** The specific pressure this environment puts on a garment. */
  demand: string;
  /** Environment photography. Pending the shoot. */
  asset: AssetKey;
  /**
   * The article that best represents this environment, used while the
   * photography slot above is unfilled. Only a real photograph — never an
   * illustration. If this key has no file, the card drops the frame.
   */
  representative: AssetKey;
  /** Garments a program in this environment typically covers. */
  typicalGarments: string[];
};

export const industries: Industry[] = [
  {
    slug: "grocery",
    name: "Grocery",
    demand: "High wash frequency, visible staining, and a program that has to look identical across every store.",
    asset: "industries.grocery",
    representative: "products.apron.front",
    typicalGarments: ["Bib aprons", "Uniform polos", "Work shirts", "Fleece layers", "Caps"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    demand: "Front-of-house presentation held through a full shift, with colour matched across article types.",
    asset: "industries.hospitality",
    representative: "products.apron.front",
    typicalGarments: ["Waist aprons", "Service shirts", "Uniform polos", "Ties", "Bottoms"],
  },
  {
    slug: "food-service",
    name: "Food Service",
    demand: "Heat, grease and repeated industrial laundering, without the garment losing shape or shade.",
    asset: "industries.chef",
    representative: "products.apron.front",
    typicalGarments: ["Chef coats", "Bib aprons", "Chef beanies", "Work trousers", "Tees"],
  },
  {
    slug: "retail",
    name: "Retail",
    demand: "Brand-accurate colour and decoration across a large, frequently refreshed workforce.",
    asset: "industries.retail",
    representative: "photo.poloTaupeLongSleeve",
    typicalGarments: ["Uniform polos", "T-shirts", "Sweatshirts", "Woven shirts", "Aprons"],
  },
  {
    slug: "facilities",
    name: "Facilities",
    demand: "Durability and identification across mixed indoor and outdoor work.",
    asset: "industries.industrial",
    representative: "photo.utilityBomberCharcoal",
    typicalGarments: ["Work jackets", "Work shirts", "Work trousers", "Fleece", "Hi-vis"],
  },
  {
    slug: "industrial",
    name: "Industrial",
    demand: "Abrasion resistance, reinforcement at stress points, and visibility requirements where they apply.",
    asset: "industries.industrial",
    representative: "photo.workVestOrange",
    typicalGarments: ["Hi-vis vests", "Work shirts", "Work trousers", "Outerwear", "Caps"],
  },
  {
    slug: "corporate",
    name: "Corporate",
    demand: "Consistent presentation across sizes and body types, with an inclusive size range.",
    asset: "industries.corporate",
    representative: "photo.poloTaupeLongSleeve",
    typicalGarments: ["Woven shirts", "Uniform polos", "Ties", "Softshell", "Knitwear"],
  },
  {
    slug: "events",
    name: "Events",
    demand: "Volume delivered to a fixed date, with decoration accurate to the brand standard.",
    asset: "industries.retail",
    representative: "photo.poloYellow",
    typicalGarments: ["T-shirts", "Uniform polos", "Hoodies", "Caps", "Vests"],
  },
];

/** Performance options. Every one is conditional on fabric and specification. */
export const performanceOptions = [
  { name: "Stain management", note: "Stain-release finish, subject to fabric selection and approved testing" },
  { name: "Easy care", note: "Reduced-wrinkle finish for industrial or domestic laundering" },
  { name: "Durability", note: "Reinforcement, stitch density and fabric weight matched to the wear pattern" },
  { name: "Comfort", note: "Hand feel, weight and construction selected for a full shift" },
  { name: "Breathability", note: "Construction and composition selected for the work environment" },
  { name: "Stretch", note: "Mechanical or elastane stretch where the movement requires it" },
  { name: "Moisture management", note: "Wicking finish or performance construction" },
  { name: "Inclusive sizing", note: "Extended size ranges and separate men's and women's blocks where specified" },
] as const;

export const PERFORMANCE_DISCLAIMER =
  "Options depend on final fabric and approved specification. Performance claims are confirmed by testing before they appear on a label." as const;
