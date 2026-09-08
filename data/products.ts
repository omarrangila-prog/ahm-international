import type { AssetKey } from "./assets";
import type { CapabilityStatus } from "./verification";

/**
 * PRODUCT DATA
 * ============
 *
 * Categories, articles and specification frames — all content, no markup. The
 * page components render whatever is here, so a CMS can replace this module
 * later without touching a single component.
 *
 * On specifications: fabric weights are given as **typical program ranges seen in
 * this product class**, explicitly labelled as such. They describe the market,
 * not AHM's stock or an offer, and every panel carries `SPEC_DISCLAIMER`. Values
 * specific to a buyer's program — price, MOQ, lead time, sampling — are never
 * stated; those fields resolve to "Discuss with commercial team".
 */

/** Colour zone assigned to each category. Keeps the palette controlled. */
export type Zone = "ink" | "ink" | "ink" | "lime" | "paper" | "paper" | "ink" | "lime";

export type SpecRow = {
  label: string;
  /** Null renders the "discuss with commercial team" treatment. */
  value: string | null;
};

export type ProductArticle = {
  name: string;
  /**
   * Overrides the category status. Used where one article in an otherwise
   * current-capability range carries a technical or protective standard.
   */
  capabilityStatus?: CapabilityStatus;
  /** Semantic asset key for the article's render or photograph. */
  asset: AssetKey;
  /** One-line construction note. Descriptive of the article type, not a claim. */
  note: string;
};

export type ProductCategory = {
  slug: string;
  index: number;
  name: string;
  /** Short label for cards and menus. */
  shortName: string;
  /**
   * Singular noun for sentences like "How your ___ program starts."
   *
   * Authored per category rather than derived. `shortName` is plural and
   * several are compound, so dropping it into a sentence produced "How a
   * aprons program starts" and "SEND ONE POLOS & T-SHIRTS SPEC." on live
   * product pages. No amount of a/an logic fixes "a polos & t-shirts".
   */
  programNoun: string;
  /** Page hero headline. */
  headline: string;
  /** One-sentence positioning for the category. */
  intro: string;
  zone: Zone;
  /**
   * What AHM can honestly say about this category today. Never inferred from the
   * presence of a photograph — a render is not evidence of a running product.
   */
  capabilityStatus: CapabilityStatus;
  /** Named sub-types within the category. */
  subcategories: string[];
  /** Articles shown on the category page. */
  articles: ProductArticle[];
  /** Specification frame — the fields AHM confirms during development. */
  specification: SpecRow[];
  /** Decoration routes available for this category. */
  decoration: string[];
  /** Where these garments are used. */
  applications: string[];
  /** Primary photography for the category hero. */
  heroAsset: AssetKey;
  /** Supporting detail photography. */
  detailAssets: AssetKey[];
  /**
   * Photographed production samples for this category.
   *
   * Unbranded articles only. Anything carrying a client mark is held out of the
   * deployed set — see asset-pack/client-branded-hold.
   */
  photography?: AssetKey[];
  seoTitle: string;
  seoDescription: string;
};

export const SPEC_DISCLAIMER =
  "Weights shown are typical ranges for this product class, given for orientation only. Final composition, weight, construction and finish are confirmed against your specification during development." as const;

export const DISCUSS = "Discuss with commercial team" as const;

export const productCategories: ProductCategory[] = [
  {
    slug: "uniform-workwear",
    index: 1,
    name: "Uniform & Workwear",
    shortName: "Uniform & Workwear",
    programNoun: "uniform",
    headline: "Uniform programs,\nbuilt to be worn every day.",
    intro:
      "Garments that have to survive a shift, a wash cycle and a reorder twelve months later looking like the first delivery.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Work Shirts", "Uniform Tops", "Service Apparel", "Chef Wear", "Safety & Hi-Vis"],
    articles: [
      { name: "Utility Work Shirt", asset: "renders.utilityWorkShirt", note: "Twin chest pockets, felled seams, buyer-specified closure" },
      { name: "Utility Work Jacket", asset: "renders.workJacket", note: "Four-pocket construction, reinforced stress points" },
      { name: "Double-Breasted Chef Coat", asset: "renders.chefCoat", note: "Knot or press-stud closure, vented back option" },
      { name: "Reflective Safety Vest", asset: "renders.safetyVest", capabilityStatus: "technical_qualification_required", note: "Hi-vis is a certified product class. Tape configuration is built to the buyer's nominated standard, and the standard must be qualified before AHM quotes it" },
      { name: "Structured Uniform Cap", asset: "renders.uniformCap", note: "Six-panel, buckram front, embroidery-ready" },
      { name: "Corporate Uniform Tie", asset: "renders.uniformTie", note: "Woven or printed to an approved colourway" },
    ],
    specification: [
      { label: "Fabric options", value: "Poly-cotton twill, cotton canvas, poly-cotton poplin, performance woven" },
      { label: "Typical program weight", value: "160-260 gsm" },
      { label: "Construction", value: "Confirmed to your specification. Seam type, stitch density and closure" },
      { label: "Colour", value: "Dyed to an approved lab dip or a supplied reference" },
      { label: "Sizing", value: "Buyer size specification, including extended and inclusive ranges" },
      { label: "Labelling", value: "Main label, care label, size label, country of origin" },
      { label: "Packing", value: "Polybag, folded or hanging, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "Screen print", "Heat transfer", "Woven badges", "Applied patches", "Reflective tape"],
    applications: ["Grocery", "Facilities", "Industrial", "Food Service", "Corporate", "Events"],
    heroAsset: "industries.industrial",
    detailAssets: ["products.wovenShirt.detail", "factory.sewing", "fabrics.polycottonTwill"],
    photography: ["photo.scarfCamel", "photo.scarfHerringbone", "photo.scarfPlaidMaroon", "photo.scarfNavy", "photo.scarfNavyLooped", "photo.scarfPlaidOlive", "photo.onesieWhitePrint", "photo.onesieWhiteText"],
    seoTitle: "Uniform & Workwear Manufacturing",
    seoDescription:
      "Work shirts, service apparel, chef wear and hi-vis produced to buyer specification in Karachi, Pakistan and supplied FOB.",
  },
  {
    slug: "polos-tshirts",
    index: 2,
    name: "Polos & T-Shirts",
    shortName: "Polos & T-Shirts",
    programNoun: "polo or T-shirt",
    headline: "The garment your\nprogram lives on.",
    intro:
      "The highest-volume item in most uniform programs, and the one where collar recovery and colour consistency across reorders decide whether a buyer stays.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Classic Polos", "Performance Polos", "Long-Sleeve Polos", "Crew-Neck Tees", "Performance Tees"],
    articles: [
      { name: "Classic Short-Sleeve Polo", asset: "photo.poloWhiteTipped", note: "Rib collar and cuffs, three-button placket" },
      { name: "Long-Sleeve Uniform Polo", asset: "photo.poloTaupeLongSleeve", note: "Rib cuff, side-vent option" },
      { name: "Crew-Neck Uniform T-Shirt", asset: "renders.crewNeckTee", note: "Rib neck with taped shoulder seam" },
    ],
    specification: [
      { label: "Fabric options", value: "Cotton pique, poly-cotton pique, single jersey, performance polyester, CVC" },
      { label: "Typical program weight", value: "160-220 gsm" },
      { label: "Collar & cuff", value: "Self-fabric or knitted rib, to an approved construction" },
      { label: "Placket", value: "Two or three button, buyer-specified button type" },
      { label: "Finish options", value: "Enzyme wash, silicone softener, moisture management, easy care" },
      { label: "Colour", value: "Dyed to an approved lab dip or a supplied reference" },
      { label: "Labelling", value: "Main label, care label, size label, or printed neck label" },
      { label: "Packing", value: "Individual polybag, folded, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Screen print", "Heat transfer", "Printed neck label", "Woven badges"],
    applications: ["Grocery", "Retail", "Hospitality", "Corporate", "Events", "Facilities"],
    heroAsset: "products.polo.front",
    detailAssets: ["products.polo.detail", "products.tee.detail", "products.polo.fabric"],
    photography: ["photo.poloBlackEmbroidered", "photo.poloBlackCrest", "photo.poloBlackService", "photo.poloRoyalEmbroidered", "photo.poloNavyCorporate", "photo.poloCream", "photo.poloGreenRibbed", "photo.henleyGreen", "photo.teeGreyBranded", "photo.teeHeatherGraphic", "photo.teeGreyGraphic", "photo.poloMaroon", "photo.poloWhiteTagged", "photo.henleyWaffleNavy", "photo.poloNavyGrocery", "photo.henleyNavy", "photo.henleyTeeNavy", "photo.poloDressNavy", "photo.poloNavyEmbroidered", "photo.poloNavyTipped", "photo.poloLime", "photo.poloYellow", "photo.teePink", "photo.poloRedColourblock", "photo.poloRedGrocery", "photo.poloRed", "photo.teeSkyBlue", "photo.poloTaupeLongSleeve", "photo.poloWhite", "photo.poloWhiteTipped", "photo.poloWhiteEmbroidered"],
    seoTitle: "Polo Shirt & T-Shirt Manufacturing",
    seoDescription:
      "Cotton pique, performance polyester and CVC uniform knits made to your specification in Karachi, Pakistan. Supplied FOB.",
  },
  {
    slug: "fleece-sweatshirts",
    index: 3,
    name: "Fleece & Sweatshirts",
    shortName: "Fleece & Sweatshirts",
    programNoun: "fleece",
    headline: "Layers that carry\nthe logo all winter.",
    intro:
      "Sweatshirts, hoodies and full-zip fleece: the layer that gets worn outside the building, which makes it the most visible garment in the program.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Crewneck Sweatshirts", "Pullover Hoodies", "Full-Zip Hoodies", "Fleece Jackets", "Fleece Vests"],
    articles: [
      { name: "Crewneck Sweatshirt", asset: "renders.crewneckSweatshirt", note: "Rib neck, cuff and hem, set-in or raglan sleeve" },
      { name: "Pullover Hoodie", asset: "photo.hoodieNavy", note: "Lined hood, kangaroo pocket, metal-tipped drawcord option" },
      { name: "Full-Zip Fleece Jacket", asset: "photo.zipHoodieNavy", note: "Anti-pill face, chin guard, zip pockets" },
    ],
    specification: [
      { label: "Fabric options", value: "Brushed-back fleece, French terry, anti-pill polar fleece, bonded fleece" },
      { label: "Typical program weight", value: "260-380 gsm" },
      { label: "Trim", value: "Rib or self-fabric cuff and hem; buyer-specified zip and puller" },
      { label: "Hood", value: "Lined or self-lined, drawcord and eyelet to specification" },
      { label: "Finish options", value: "Anti-pill, brushed back, easy care" },
      { label: "Colour", value: "Dyed to an approved lab dip or a supplied reference" },
      { label: "Labelling", value: "Main label, care label, size label" },
      { label: "Packing", value: "Individual polybag, folded, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Screen print", "Applied patches", "Heat transfer", "Tonal debossing"],
    applications: ["Facilities", "Industrial", "Corporate", "Events", "Retail"],
    heroAsset: "products.fleece.front",
    detailAssets: ["products.fleece.detail", "products.fleece.fabric", "products.fleece.back"],
    photography: ["photo.hoodieWhite", "photo.sleevelessHoodieBlack", "photo.zipHoodieGreyGraphic", "photo.hoodieHeatherGraphic", "photo.zipHoodieGrey", "photo.hoodieBlack", "photo.zipHoodieNavy", "photo.hoodieNavyAlt", "photo.hoodieNavy", "photo.hoodiePinkGraphic", "photo.sweaterRedStriped", "photo.thermalSage", "photo.thermalSageAlt", "photo.sleevelessHoodieWhite"],
    seoTitle: "Fleece & Sweatshirt Manufacturing",
    seoDescription:
      "Fleece jackets, hoodies and sweatshirts in brushed fleece, French terry and anti-pill polar fleece. Made to spec in Karachi, supplied FOB.",
  },
  {
    slug: "aprons",
    index: 4,
    name: "Aprons",
    shortName: "Aprons",
    programNoun: "apron",
    headline: "Aprons,\nengineered for work.",
    intro:
      "The article AHM has documented export experience producing: a stain-managed poly-cotton bib apron for a United States uniform program.",
    zone: "lime",
    capabilityStatus: "current_capability",
    subcategories: ["Bib Apron", "Waist Apron", "Chef Apron", "Service Apron", "Utility Apron"],
    articles: [
      { name: "Three-Pocket Bib Apron", asset: "products.apron.front", note: "Divided patch pocket, bar-tacked stress points, adjustable neck" },
      { name: "Three-Pocket Waist Apron", asset: "renders.waistApron", note: "Divided pocket, extended waist ties" },
      { name: "Chef Beanie", asset: "renders.chefBeanie", note: "Ventilated crown, elasticated or tie back" },
    ],
    specification: [
      { label: "Fabric options", value: "65/35 poly-cotton twill, poly-cotton poplin, cotton canvas, stain-release finished woven" },
      { label: "Typical program weight", value: "195-280 gsm" },
      { label: "Stain management", value: "Stain-release finish available subject to fabric selection and testing" },
      { label: "Pockets", value: "Patch, divided, pen pocket or none, to specification" },
      { label: "Straps & ties", value: "Self-fabric, webbing or adjustable hardware" },
      { label: "Hardware", value: "Buckles, sliders, D-rings or press studs to an approved reference" },
      { label: "Reinforcement", value: "Bar tacks at pocket mouth and strap attachment" },
      { label: "Labelling", value: "Main label, care label, country of origin" },
      { label: "Packing", value: "Polybag, folded, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Screen print", "Woven badges", "Applied patches", "Heat transfer"],
    applications: ["Grocery", "Hospitality", "Food Service", "Retail", "Events"],
    heroAsset: "products.apron.front",
    detailAssets: ["products.apron.detail", "products.apron.fabric", "products.apron.back"],
    seoTitle: "Apron Manufacturing for Uniform Programs",
    seoDescription:
      "Bib, waist and chef aprons made to your specification. Documented FOB export of poly-cotton uniform aprons to the United States.",
  },
  {
    slug: "woven-shirts",
    index: 5,
    name: "Woven Shirts",
    shortName: "Woven Shirts",
    programNoun: "woven shirt",
    headline: "Woven shirting\nthat holds its press.",
    intro:
      "Button-front uniform and utility shirting, where collar construction and fusing quality show up on day one and after fifty washes.",
    zone: "paper",
    capabilityStatus: "current_capability",
    subcategories: ["Uniform Shirts", "Utility Work Shirts", "Service Shirts", "Short-Sleeve Shirts"],
    articles: [
      { name: "Button-Front Uniform Shirt", asset: "renders.buttonFrontShirt", note: "Fused collar and cuff, buyer-specified pocket layout" },
      { name: "Utility Work Shirt", asset: "renders.utilityWorkShirt", note: "Twin chest pockets, felled side seams" },
    ],
    specification: [
      { label: "Fabric options", value: "Poly-cotton poplin, poly-cotton twill, oxford, cotton canvas, performance woven" },
      { label: "Typical program weight", value: "115-220 gsm" },
      { label: "Collar & cuff", value: "Fused or unfused, interlining to an approved construction" },
      { label: "Placket", value: "Standard, concealed or Western, to specification" },
      { label: "Seams", value: "Felled or overlocked side seams, stitch density to specification" },
      { label: "Finish options", value: "Easy care, wrinkle resistance, soil release, subject to fabric" },
      { label: "Labelling", value: "Main label, care label, size label, country of origin" },
      { label: "Packing", value: "Folded with collar support, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Woven badges", "Applied patches", "Screen print"],
    applications: ["Corporate", "Hospitality", "Facilities", "Industrial", "Retail"],
    heroAsset: "products.wovenShirt.front",
    detailAssets: ["products.wovenShirt.detail", "fabrics.woven", "factory.finishing"],
    photography: ["photo.denimWorkShirt"],
    seoTitle: "Woven Shirt Manufacturing",
    seoDescription:
      "Poplin, twill and oxford uniform shirting produced to your specification in Karachi, Pakistan and supplied FOB.",
  },
  {
    slug: "bottoms",
    index: 6,
    name: "Bottoms",
    shortName: "Bottoms",
    programNoun: "bottoms",
    headline: "Bottoms that take\nthe abuse.",
    intro:
      "Work trousers and shorts, where pocket bags, bar tacks and crotch gusset construction determine the real cost per wear.",
    zone: "paper",
    capabilityStatus: "current_capability",
    subcategories: ["Work Trousers", "Uniform Pants", "Work Shorts", "Cargo Styles", "Chef Trousers"],
    articles: [
      { name: "Uniform Work Trouser", asset: "renders.workTrouser", note: "Reinforced pockets, bar-tacked stress points" },
      { name: "Uniform Work Short", asset: "renders.workShort", note: "Buyer-specified inseam and pocket layout" },
    ],
    specification: [
      { label: "Fabric options", value: "Poly-cotton twill, cotton canvas, ripstop, stretch woven" },
      { label: "Typical program weight", value: "200-320 gsm" },
      { label: "Pockets", value: "Side, back, cargo or rule pocket, to specification" },
      { label: "Waistband", value: "Fixed, elasticated or part-elasticated; belt loops to specification" },
      { label: "Reinforcement", value: "Bar tacks, gusset or double-layer knee subject to specification" },
      { label: "Closure", value: "Zip, button, hook and bar to an approved reference" },
      { label: "Finish options", value: "Easy care, stretch, soil release, subject to fabric" },
      { label: "Packing", value: "Folded, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Applied patches", "Reflective tape", "Heat transfer"],
    applications: ["Industrial", "Facilities", "Food Service", "Hospitality"],
    heroAsset: "products.bottoms.front",
    detailAssets: ["products.bottoms.detail", "fabrics.polycottonTwill", "factory.cutting"],
    photography: ["photo.pleatedTrouserKhaki", "photo.chinoBeige", "photo.loungePantGrid", "photo.joggerGreyGraphic", "photo.pantCamo"],
    seoTitle: "Work Trouser & Bottoms Manufacturing",
    seoDescription:
      "Work trousers, uniform pants and shorts in twill, canvas and stretch woven, made to your specification in Karachi and supplied FOB.",
  },
  {
    slug: "outerwear",
    index: 7,
    name: "Outerwear",
    shortName: "Outerwear",
    programNoun: "outerwear",
    headline: "Outerwear for\noutdoor programs.",
    intro:
      "Softshell, lightweight jackets and vests: the layer with the most components, and the one where a clear tech pack saves the most cost.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Softshell Jackets", "Lightweight Jackets", "Fleece Jackets", "Vests", "Work Jackets"],
    articles: [
      { name: "Utility Work Jacket", asset: "renders.workJacket", note: "Four-pocket construction, reinforced stress points" },
      { name: "Full-Zip Fleece Jacket", asset: "photo.zipHoodieNavy", note: "Anti-pill face, chin guard, zip pockets" },
      { name: "Reflective Safety Vest", asset: "renders.safetyVest", capabilityStatus: "technical_qualification_required", note: "Hi-vis is a certified product class. Tape configuration is built to the buyer's nominated standard, and the standard must be qualified before AHM quotes it" },
    ],
    specification: [
      { label: "Fabric options", value: "Bonded softshell, polyester taslan, ripstop, polar fleece, quilted lining" },
      { label: "Typical program weight", value: "180-400 gsm" },
      { label: "Lining", value: "Mesh, taffeta, fleece-backed or unlined, to specification" },
      { label: "Zips & hardware", value: "Buyer-specified brand, gauge, puller and zip garage" },
      { label: "Seams", value: "Standard, taped or bonded subject to fabric and specification" },
      { label: "Water resistance", value: "Subject to fabric selection and buyer-approved testing" },
      { label: "Pockets", value: "Zip, welt or patch, to specification" },
      { label: "Packing", value: "Folded or hanging, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
    ],
    decoration: ["Embroidery", "Applied patches", "Heat transfer", "Reflective tape", "Woven badges"],
    applications: ["Facilities", "Industrial", "Events", "Corporate"],
    heroAsset: "products.outerwear.front",
    detailAssets: ["products.outerwear.detail", "fabrics.softshell", "factory.sewing"],
    photography: ["photo.workVestOrange", "photo.utilityBomberCharcoal", "photo.denimUtilityJacket", "photo.vestOrangePrinted"],
    seoTitle: "Outerwear & Softshell Manufacturing",
    seoDescription:
      "Softshell, lightweight jackets and vests produced to your specification in Karachi and supplied FOB from Port Qasim.",
  },
  {
    slug: "hospitality-food-service",
    index: 8,
    name: "Hospitality & Food Service",
    shortName: "Hospitality",
    programNoun: "hospitality uniform",
    headline: "Front of house,\nback of house.",
    intro:
      "Service uniforms are judged twice: by the guest who sees them and by the operator who launders them two hundred times.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Chef Wear", "Server Apparel", "Bar & Barista", "Housekeeping", "Front Desk"],
    articles: [
      { name: "Double-Breasted Chef Coat", asset: "renders.chefCoat", note: "Knot or press-stud closure, vented back option" },
      { name: "Bib Apron", asset: "products.apron.front", note: "Adjustable neck, cross-back option, pocket to specification" },
      { name: "Waist Apron", asset: "renders.waistApron", note: "Server pocket configuration, tie length to specification" },
      { name: "Chef Beanie", asset: "renders.chefBeanie", note: "Skull cap or beanie, laundry-stable construction" },
      { name: "Service Polo", asset: "photo.poloWhiteTipped", note: "Soil-release finish available subject to fabric selection" },
      { name: "Front Desk Woven Shirt", asset: "renders.buttonFrontShirt", note: "Easy-care finish, tailored or relaxed block" },
    ],
    specification: [
      { label: "Fabric options", value: "Poly-cotton twill, poly-cotton poplin, drill, pique, canvas" },
      { label: "Typical program weight", value: "180-260 gsm" },
      { label: "Finish", value: "Soil-release and easy-care finishes subject to fabric selection and buyer-approved testing" },
      { label: "Construction", value: "Bar-tacked stress points, felled or overlocked seams to specification" },
      { label: "Colour", value: "Dyed to an approved lab dip. Colour fastness to wash confirmed at development" },
      { label: "Sizing", value: "Unisex or cut-for-gender blocks, extended ranges available" },
      { label: "Labelling", value: "Main, care, size and country-of-origin labels" },
      { label: "Packing", value: "Folded, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "Woven badges", "Applied patches", "Heat transfer", "Screen print"],
    applications: ["Hospitality", "Food Service", "Events", "Facilities"],
    heroAsset: "products.apron.front",
    detailAssets: ["products.apron.detail", "fabrics.polycottonTwill", "factory.sewing"],
    seoTitle: "Hospitality & Food Service Uniforms",
    seoDescription:
      "Chef wear, aprons, server apparel and front-desk uniforms produced to your specification in Karachi and supplied FOB from Port Qasim.",
  },
  {
    slug: "denim",
    index: 9,
    name: "Denim",
    shortName: "Denim",
    programNoun: "denim",
    headline: "Denim, developed\nrather than copied.",
    intro:
      "Weight, weave, sanforisation and wash decide how a denim garment ages. All four are specification decisions taken before the first sample.",
    zone: "ink",
    capabilityStatus: "development_available",
    subcategories: ["Denim Shirts", "Denim Jackets", "Denim Bottoms", "Workwear Denim"],
    articles: [
      { name: "Denim Work Shirt", asset: "photo.denimWorkShirt", note: "Twin chest pockets, felled seams, buyer-specified closure" },
      { name: "Denim Utility Jacket", asset: "photo.denimUtilityJacket", note: "Four-pocket construction, reinforced stress points" },
      { name: "Denim Work Trouser", asset: "renders.workTrouser", note: "Triple-needle seams, bar-tacked pockets" },
    ],
    specification: [
      { label: "Fabric options", value: "Rigid and stretch denim, left-hand and right-hand twill" },
      { label: "Typical program weight", value: "8-14 oz" },
      { label: "Wash", value: "Rinse, stone, enzyme or raw, developed against an approved reference" },
      { label: "Construction", value: "Chain-stitch or lock-stitch, felled seams, bar-tacked stress points" },
      { label: "Hardware", value: "Buyer-specified rivets, shank buttons and zips" },
      { label: "Shrinkage", value: "Confirmed against wash testing at development stage" },
      { label: "Labelling", value: "Leather or synthetic patch, main, care and size labels" },
      { label: "Packing", value: "Folded, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "Applied patches", "Screen print", "Leather patch"],
    applications: ["Retail", "Corporate", "Industrial", "Events"],
    heroAsset: "photo.denimWorkShirt",
    detailAssets: ["photo.denimUtilityJacket", "fabrics.woven", "factory.cutting"],
    photography: ["photo.denimWorkShirt", "photo.denimUtilityJacket"],
    seoTitle: "Denim Manufacturing & Development",
    seoDescription:
      "Denim shirts, jackets and bottoms developed to your weight, weave and wash specification in Karachi and supplied FOB from Port Qasim.",
  },
  {
    slug: "athleisure",
    index: 10,
    name: "Athleisure",
    shortName: "Athleisure",
    programNoun: "athleisure",
    headline: "Performance knits\nand relaxed fits.",
    intro:
      "Athleisure lives or dies on hand feel and recovery. Both are fabric decisions, and both are confirmed on a physical sample rather than a spec sheet.",
    zone: "paper",
    capabilityStatus: "development_available",
    subcategories: ["Joggers", "Lounge Bottoms", "Performance Tops", "Sleeveless"],
    articles: [
      { name: "Fleece Jogger", asset: "photo.joggerGreyGraphic", note: "Elasticated cuff and waist, drawcord to specification" },
      { name: "Lounge Pant", asset: "photo.loungePantGrid", note: "Relaxed block, side-seam pockets" },
      { name: "Performance Hoodie", asset: "photo.hoodieHeatherGraphic", note: "Brushed-back knit, buyer-specified drawcord and eyelets" },
      { name: "Sleeveless Hoodie", asset: "photo.sleevelessHoodieBlack", note: "Cut-away armhole, bound or ribbed finish" },
    ],
    specification: [
      { label: "Fabric options", value: "Single jersey, interlock, French terry, brushed-back fleece, performance poly" },
      { label: "Typical program weight", value: "180-320 gsm" },
      { label: "Stretch", value: "Elastane content and recovery confirmed on a physical development sample" },
      { label: "Construction", value: "Flatlock or overlock with cover-stitch hems, to specification" },
      { label: "Trims", value: "Drawcord, tipping, eyelets and elastic to buyer specification" },
      { label: "Colour", value: "Dyed to an approved lab dip" },
      { label: "Labelling", value: "Printed or woven labels, heat-transfer neck label option" },
      { label: "Packing", value: "Folded, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Screen print", "Embroidery", "Heat transfer", "Sublimation", "Applied patches"],
    applications: ["Retail", "Events", "Corporate"],
    heroAsset: "photo.joggerGreyGraphic",
    detailAssets: ["photo.hoodieHeatherGraphic", "fabrics.fleece", "factory.sewing"],
    photography: ["photo.joggerGreyGraphic", "photo.loungePantGrid", "photo.sleevelessHoodieBlack", "photo.sleevelessHoodieWhite"],
    seoTitle: "Athleisure & Performance Knits",
    seoDescription:
      "Joggers, lounge bottoms and performance knit tops developed to your specification in Karachi and supplied FOB from Port Qasim.",
  },
  {
    slug: "womenswear",
    index: 11,
    name: "Womenswear",
    shortName: "Womenswear",
    programNoun: "womenswear",
    headline: "Cut for the wearer,\nnot scaled down.",
    intro:
      "A women's block is a different pattern, not a smaller men's one. Where a program needs both, the two are developed as separate blocks from the start.",
    zone: "lime",
    capabilityStatus: "development_available",
    subcategories: ["Women's Uniform Tops", "Women's Knits", "Women's Woven Shirts", "Women's Outerwear"],
    articles: [
      { name: "Women's Polo", asset: "photo.poloCream", note: "Cut-for-gender block, placket and hem to specification" },
      { name: "Women's Tee", asset: "photo.teePink", note: "Set-in or raglan sleeve, neck finish to specification" },
      { name: "Women's Hoodie", asset: "photo.hoodiePinkGraphic", note: "Brushed-back knit, drawcord to specification" },
      { name: "Women's Woven Shirt", asset: "renders.buttonFrontShirt", note: "Tailored or relaxed block, dart placement to specification" },
    ],
    specification: [
      { label: "Fabric options", value: "Pique, single jersey, poplin, twill, French terry" },
      { label: "Typical program weight", value: "140-320 gsm" },
      { label: "Block", value: "Developed as a separate women's pattern, graded to the buyer's size specification" },
      { label: "Construction", value: "Seam type, dart placement and finish confirmed at pattern stage" },
      { label: "Sizing", value: "Buyer size specification, including extended and inclusive ranges" },
      { label: "Colour", value: "Dyed to an approved lab dip or a supplied reference" },
      { label: "Labelling", value: "Main, care, size and country-of-origin labels" },
      { label: "Packing", value: "Folded or hanging, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "Screen print", "Heat transfer", "Woven badges"],
    applications: ["Corporate", "Hospitality", "Retail", "Grocery", "Facilities"],
    heroAsset: "photo.poloCream",
    detailAssets: ["photo.hoodiePinkGraphic", "fabrics.cottonPique", "factory.sewing"],
    photography: ["photo.poloCream", "photo.teePink", "photo.hoodiePinkGraphic"],
    seoTitle: "Womenswear Uniform & Knitwear",
    seoDescription:
      "Women's uniform tops, knits and woven shirts developed on a dedicated block to your specification in Karachi and supplied FOB.",
  },
  {
    slug: "kidswear",
    index: 12,
    name: "Kidswear",
    shortName: "Kidswear",
    programNoun: "kidswear",
    headline: "Children's apparel,\nand the rules that come with it.",
    intro:
      "Children's garments carry safety requirements that adult apparel does not. Cords, small parts and flammability are qualification questions, answered before development starts.",
    zone: "paper",
    capabilityStatus: "development_available",
    subcategories: ["Infant Bodysuits", "Kids' Knits", "Kids' Uniform"],
    articles: [
      { name: "Infant Bodysuit", asset: "photo.onesieWhitePrint", capabilityStatus: "technical_qualification_required", note: "Children's safety requirements are qualified against the destination market's standard before development" },
      { name: "Printed Bodysuit", asset: "photo.onesieWhiteText", capabilityStatus: "technical_qualification_required", note: "Print chemistry and small-parts requirements qualified before development" },
      { name: "Kids' Tee", asset: "renders.crewNeckTee", note: "Neck opening and finish to the destination market's requirement" },
    ],
    specification: [
      { label: "Fabric options", value: "Single jersey, interlock, rib, French terry" },
      { label: "Typical program weight", value: "140-260 gsm" },
      { label: "Safety requirements", value: "Drawcord, small-parts and flammability requirements are set by the destination market and qualified before development" },
      { label: "Construction", value: "Flat seams, cover-stitch hems, lap-shoulder or envelope neck to specification" },
      { label: "Fastening", value: "Nickel-free press studs, pull-test qualified to the nominated standard" },
      { label: "Colour", value: "Dyed to an approved lab dip" },
      { label: "Labelling", value: "Printed or satin labels, placement to the destination market's requirement" },
      { label: "Packing", value: "Folded, polybag with the required warning print, carton pack to instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Screen print", "Heat transfer", "Embroidery"],
    applications: ["Retail", "Events"],
    heroAsset: "photo.onesieWhitePrint",
    detailAssets: ["photo.onesieWhiteText", "fabrics.singleJersey", "factory.sewing"],
    photography: ["photo.onesieWhitePrint", "photo.onesieWhiteText"],
    seoTitle: "Kidswear & Infant Apparel",
    seoDescription:
      "Infant bodysuits, kids' knits and school uniform developed against destination-market safety requirements in Karachi and supplied FOB.",
  },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export const categorySlugs = productCategories.map((c) => c.slug);
