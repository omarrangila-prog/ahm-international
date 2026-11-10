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
   * Sample-style images for this category. Generated, not photographed, as of
   * October 2026 (data/generated-images.json); the gallery says so and goes
   * back to "Photographed from production" by itself once they are replaced.
   *
   * Unbranded articles only. Anything carrying a client mark is held out of the
   * deployed set — see asset-pack/client-branded-hold.
   */
  photography?: AssetKey[];
  /**
   * An invitation to send the article a buyer already purchases and have it
   * costed like for like. Optional: a family shows it only once the process
   * behind it is one AHM runs for that family.
   */
  costComparison?: {
    heading: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  /**
   * Construction points marked on one image of the family, positioned in
   * percent of that image. Only features the image visibly shows: one that is
   * specified per order but not visible goes in `note`, not on a marker, and
   * nothing here says a feature is standard.
   */
  callouts?: {
    asset: AssetKey;
    note: string;
    points: { x: number; y: number; title: string; body: string }[];
  };
  seoTitle: string;
  seoDescription: string;
};

export const SPEC_DISCLAIMER =
  "Weights shown are typical ranges for this product class, given for orientation only. Final composition, weight, construction and finish are confirmed against your specification during development." as const;

export const DISCUSS = "Discuss with commercial team" as const;

/**
 * The cost-comparison offer, for one family.
 *
 * The process is the one the owner described for aprons in the brief of 10
 * October 2026: reference in, construction reviewed, open points clarified,
 * FOB quotation out. On 10 November 2026 the owner asked for every family to
 * carry the apron page's treatment, so each family states the same four steps
 * with the construction points a reviewer reads for that garment. No step
 * produces a number before the last one.
 */
function benchmark(plural: string, singular: string, review: string): NonNullable<ProductCategory["costComparison"]> {
  return {
    heading: `Already sourcing ${plural}? Let us benchmark your current style.`,
    intro: `Share your existing specification, construction requirements and estimated quantity for a manufacturing and FOB costing review of the same ${singular}. There is no instant price: a comparison is only useful when both quotations describe the same article.`,
    steps: [
      {
        title: "You send the reference",
        body: `The current ${singular}'s tech pack, or clear photographs with its measurements. Add the quantity and destination.`,
      },
      { title: "AHM reviews the construction", body: review },
      {
        title: "Open points are clarified",
        body: "Anything the reference leaves open is asked about before costing, so the price answers the question you asked.",
      },
      {
        title: "An FOB quotation is prepared",
        body: `On the same basis as the ${singular} you buy now, so the two can be compared line by line. The final price depends on the confirmed specification and commercial approval.`,
      },
    ],
  };
}

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
      { name: "Utility Work Jacket", asset: "photo.utilityBomberCharcoal", note: "Four-pocket construction, reinforced stress points" },
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
    heroAsset: "photo.utilityBomberCharcoal",
    detailAssets: ["products.wovenShirt.detail", "factory.sewing", "fabrics.polycottonTwill"],
    photography: ["photo.utilityBomberCharcoal", "photo.workVestOrange", "photo.denimUtilityJacket", "photo.pantCamo"],
    costComparison: benchmark("work jackets, shirts or uniforms", "garment", "Fabric and weight, pocket layout, closures and hardware, reinforcement at stress points, colour standard, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.utilityBomberCharcoal",
      note: "Lining, stitch types, seam finishes and labels are specified per order and are not shown here. No feature above is standard on every jacket.",
      points: [
        { x: 37, y: 26, title: "Snap-tab collar", body: "Tabs fastened with press studs at the collar. Hardware type and finish are specified per order, and press studs are worth a pull test on the sample." },
        { x: 66, y: 36, title: "Zipped chest pocket", body: "An angled zip pocket on the chest. Zip type and length, and the pocket bag fabric, are set in the specification." },
        { x: 26, y: 64, title: "Vertical hand pockets", body: "Welt hand pockets in the front panels. Pocket depth and whether the openings are reinforced are specified per order." },
        { x: 50, y: 82, title: "Rib hem and cuffs", body: "A knitted rib band at the hem and cuffs. Rib composition, and how it recovers after washing, are worth testing on the sample." },
      ],
    },
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
      { name: "Classic Short-Sleeve Polo", asset: "photo.poloYellow", note: "Rib collar and cuffs, three-button placket" },
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
    costComparison: benchmark("polos or T-shirts", "polo or T-shirt", "Knit construction and weight, collar and cuff, placket length and buttons, neck finish, colour standard, decoration placement, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.poloTaupeLongSleeve",
      note: "Fabric, stitch types, labels and packing are specified per order and are not shown here. No feature above is standard on every polo.",
      points: [
        { x: 42, y: 17, title: "Collar", body: "A polo collar. Whether it is flat-knit or self-fabric, its height and any tipping are specified per order." },
        { x: 50, y: 27, title: "Button placket", body: "A short placket with buttons. Placket length, the number of buttons and the button type are set in the specification." },
        { x: 13, y: 86, title: "Rib cuffs", body: "Long sleeves finished with a rib cuff. Cuff depth and rib composition follow the specification." },
        { x: 50, y: 87, title: "Straight hem", body: "A straight hem on this style. Side vents and a longer back hem are options to specify, not defaults." },
      ],
    },
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
    costComparison: benchmark("hoodies, sweatshirts or fleece", "garment", "Fabric type, weight and back finish, hood construction, zip and pockets, rib trims, colour standard, decoration placement, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.zipHoodieNavy",
      note: "Fabric weight, stitch types, labels and packing are specified per order and are not shown here. No feature above is standard on every hoodie.",
      points: [
        { x: 50, y: 17, title: "Hood", body: "A hood sewn into the neckline. Panel count, lining, drawcord and eyelets are specified per order; this one shows no drawcord." },
        { x: 49.5, y: 42, title: "Full-length zip", body: "A centre-front zip from hem to neck. Zip gauge, puller and whether a chin guard is added are set in the specification." },
        { x: 37, y: 70, title: "Split pouch pockets", body: "A pouch pocket either side of the zip. Pocket shape, and whether the openings are bar-tacked, follow the specification." },
        { x: 50, y: 84, title: "Rib hem and cuffs", body: "Rib bands at the hem and cuffs. Rib composition and recovery after washing are worth testing on the sample." },
      ],
    },
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
      // The chef beanie was listed here. It is headwear, not an apron, and is
      // catalogued under Hospitality & Food Service with the rest of chef wear.
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
    // The process is the one the owner described in the brief of 10 October
    // 2026: reference in, construction reviewed, open points clarified, FOB
    // quotation out. No step produces a number before the last one.
    costComparison: {
      heading: "Already sourcing aprons? Let us benchmark your current style.",
      intro:
        "Share your existing specification, construction requirements and estimated quantity for a manufacturing and FOB costing review of the same apron. There is no instant price: a comparison is only useful when both quotations describe the same article.",
      steps: [
        {
          title: "You send the reference",
          body: "The current apron's tech pack, or clear photographs with its measurements. Add the quantity and destination.",
        },
        {
          title: "AHM reviews the construction",
          body: "Fabric and weight, pocket layout, straps and ties, hardware, reinforcement, labels and packing, read from the reference rather than assumed.",
        },
        {
          title: "Open points are clarified",
          body: "Anything the reference leaves open is asked about before costing, so the price answers the question you asked.",
        },
        {
          title: "An FOB quotation is prepared",
          body: "On the same basis as the apron you buy now, so the two can be compared line by line. The final price depends on the confirmed specification and commercial approval.",
        },
      ],
    },
    callouts: {
      asset: "products.apron.front",
      note: "Bar-tacking at pocket mouths and strap attachments, labels and finishing are specified per order and are not shown here. No feature above is standard on every apron.",
      points: [
        {
          x: 66.5,
          y: 14.5,
          title: "Adjustable neck strap",
          body: "A slider buckle on the neck strap sets the bib height for each wearer. Strap width, length and hardware are set in the specification.",
        },
        {
          x: 48.6,
          y: 66,
          title: "Divided patch pocket",
          body: "One patch pocket stitched through the centre into two compartments. Pocket count, size and placement follow your specification.",
        },
        {
          x: 89,
          y: 52,
          title: "Waist ties",
          body: "Ties sewn at the side of the bib. Length and width are set per program, including extended ties that wrap round to the front.",
        },
      ],
    },
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
    photography: [],
    costComparison: benchmark("woven shirts", "shirt", "Fabric and weight, collar and cuff construction, fusing, pocket layout, buttons, seam type, colour standard, labels and packing, read from the reference rather than assumed."),
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
      { name: "Uniform Work Trouser", asset: "photo.pantCamo", note: "Reinforced pockets, bar-tacked stress points" },
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
    costComparison: benchmark("work trousers or shorts", "trouser or short", "Fabric and weight, waistband and closure, pocket layout and reinforcement, seam type, hem, colour standard, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.pantCamo",
      note: "This image shows a pull-on style. Work trouser features such as a fly, belt loops and reinforced pockets are specified per order and are not shown here.",
      points: [
        { x: 50, y: 5, title: "Elasticated waistband", body: "A gathered elastic waistband. Elastic width, and whether a drawcord is added, are specified per order." },
        { x: 60, y: 48, title: "All-over print", body: "A camouflage print across the whole garment. A printed fabric is approved on a strike-off for colour and registration before bulk." },
        { x: 30, y: 95, title: "Elasticated ankle cuffs", body: "Elastic at the ankle gathers the leg. A straight hem is the alternative, and the choice goes in the specification." },
      ],
    },
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
      { name: "Utility Work Jacket", asset: "photo.utilityBomberCharcoal", note: "Four-pocket construction, reinforced stress points" },
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
    costComparison: benchmark("jackets or vests", "jacket or vest", "Shell fabric and weight, lining and insulation, zip and closures, pockets, cuffs and hem, colour standard, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.utilityBomberCharcoal",
      note: "Shell fabric, lining, insulation, labels and packing are specified per order and are not shown here. No feature above is standard on every jacket.",
      points: [
        { x: 50, y: 14, title: "Stand collar with rib lining", body: "A stand collar lined with knitted rib at the neck. Collar height and the rib are set in the specification." },
        { x: 49.5, y: 50, title: "Full-length front zip", body: "A centre-front zip from hem to collar. Zip gauge and puller, and whether a storm flap or chin guard is added, are specified per order." },
        { x: 30, y: 20, title: "Shoulder tabs", body: "A tab fastened with a press stud at each shoulder. A styling detail: specify it, or leave it off and save a component." },
        { x: 12, y: 82, title: "Rib cuffs", body: "Knitted rib cuffs hold the sleeve at the wrist. Cuff depth and rib composition follow the specification." },
      ],
    },
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
      { name: "Service Polo", asset: "photo.poloLime", note: "Soil-release finish available subject to fabric selection" },
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
    costComparison: benchmark("chef coats, aprons or service uniforms", "garment", "Fabric and weight for the laundry it will face, closures, pockets, reinforcement, colour standard, decoration placement, labels and packing, read from the reference rather than assumed."),
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
      { name: "Denim Work Trouser", asset: "renders.denimWorkTrouser", note: "Triple-needle seams, bar-tacked pockets" },
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
    heroAsset: "photo.denimUtilityJacket",
    detailAssets: ["photo.denimUtilityJacket", "fabrics.woven", "factory.cutting"],
    photography: ["photo.denimUtilityJacket"],
    costComparison: benchmark("denim", "denim garment", "Denim weight, weave and stretch, wash and its reference, shrinkage, seam type, hardware, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.denimUtilityJacket",
      note: "Denim weight, wash, shrinkage, stitch types and labels are specified per order and are not shown here. No feature above is standard on every jacket.",
      points: [
        { x: 50, y: 16, title: "Rib stand collar", body: "A stand collar with a knitted rib lining. Collar height and the rib are set in the specification." },
        { x: 34, y: 27, title: "Snap-tab collar", body: "Tabs fastened with press studs. Hardware type and finish are specified per order; denim washes can mark hardware, so the wash is tested with it." },
        { x: 66, y: 39, title: "Zipped chest pocket", body: "An angled zip pocket on the chest. Zip type and length are set in the specification." },
        { x: 40, y: 52, title: "Panel seams with topstitching", body: "Vertical panel seams with topstitching down the front. Thread colour and stitch density are part of the specification." },
        { x: 50, y: 81, title: "Rib hem", body: "A knitted rib band at the hem. Rib composition, and how it takes the wash, are confirmed on the sample." },
      ],
    },
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
    heroAsset: "photo.loungePantGrid",
    detailAssets: ["photo.hoodieHeatherGraphic", "fabrics.fleece", "factory.sewing"],
    photography: ["photo.joggerGreyGraphic", "photo.loungePantGrid", "photo.sleevelessHoodieBlack", "photo.sleevelessHoodieWhite"],
    costComparison: benchmark("joggers, lounge or performance knits", "garment", "Fabric type, weight and stretch, waistband and drawcord, seam type, hems, colour standard, decoration placement, labels and packing, read from the reference rather than assumed."),
    callouts: {
      asset: "photo.loungePantGrid",
      note: "Fabric, stitch types, labels and packing are specified per order and are not shown here. No feature above is standard on every lounge pant.",
      points: [
        { x: 50, y: 16, title: "Drawcord waist", body: "A drawcord threaded through the waistband. Cord type, length and its ends are specified per order." },
        { x: 38, y: 7, title: "Knitted waistband", body: "A wide knitted band at the waist. Band depth and elastic inside it follow the specification." },
        { x: 70, y: 55, title: "Check pattern", body: "A check across the fabric. Whether a check is printed or yarn-dyed changes the cost and how it wears, and is specified per order." },
        { x: 25, y: 85, title: "Wide straight leg", body: "A wide leg with no cuff. Leg opening and inseam are graded from the size specification." },
      ],
    },
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
    costComparison: benchmark("women's uniform", "garment", "Fabric and weight, the women's block and its grading, darts and shaping, closures, colour standard, labels and packing, read from the reference rather than assumed."),
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
    // Owner confirmed on 10 November 2026 that AHM makes kids and baby wear.
    // The infant articles keep their own qualification status: the destination
    // market's safety rules still have to be met before development.
    capabilityStatus: "current_capability",
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
    costComparison: benchmark("children's apparel", "garment", "Fabric and weight, neck and fastenings, cords and small parts against the destination market's requirements, print chemistry, labels and packing, read from the reference rather than assumed."),
    seoTitle: "Kidswear & Infant Apparel",
    seoDescription:
      "Infant bodysuits, kids' knits and school uniform developed against destination-market safety requirements in Karachi and supplied FOB.",
  },
  /*
   * The three families below were added on 10 November 2026, when the owner
   * confirmed that AHM makes medical scrubs, caps and headwear, and bags and
   * totes. Nothing about them is documented beyond that: no export, capacity
   * or client is claimed, the specification frames describe the product class,
   * and every program-specific value stays with the commercial team.
   */
  {
    slug: "medical-scrubs",
    index: 13,
    name: "Medical Scrubs",
    shortName: "Scrubs",
    programNoun: "scrubs",
    headline: "Scrubs that survive\nthe hospital wash.",
    intro:
      "Scrubs are laundered hotter and more often than almost any other uniform. Fabric, colour fastness and seam strength are chosen for that wash and confirmed by testing.",
    zone: "paper",
    capabilityStatus: "current_capability",
    subcategories: ["Scrub Tops", "Scrub Trousers", "Lab Coats", "Scrub Jackets"],
    articles: [
      { name: "V-Neck Scrub Top", asset: "renders.scrubTop", note: "Chest and lower patch pockets, side vents to specification" },
      { name: "Drawcord Scrub Trouser", asset: "renders.scrubTrouser", note: "Drawcord or elastic waist, cargo pocket option" },
      { name: "Lab Coat", asset: "renders.labCoat", note: "Notched collar, button front, three-pocket layout to specification" },
    ],
    specification: [
      { label: "Fabric options", value: "Poly-cotton poplin and twill, polyester-viscose with elastane, 100% cotton" },
      { label: "Typical program weight", value: "130-210 gsm" },
      { label: "Laundering", value: "Fabric and dyes chosen for the end user's wash process and confirmed by wash testing" },
      { label: "Functional finishes", value: "Fluid-repellent or antimicrobial finishes only to a buyer-nominated standard, with test evidence. No claim is made without it" },
      { label: "Construction", value: "Bar-tacked pocket corners and reinforced crotch seam, to specification" },
      { label: "Colour", value: "Dyed to an approved lab dip, including a department's colour code" },
      { label: "Sizing", value: "Unisex or cut-for-gender blocks, regular, petite and tall lengths to the buyer's size specification" },
      { label: "Labelling", value: "Main, care, size and country-of-origin labels" },
      { label: "Packing", value: "Folded, polybag, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "Heat transfer", "Screen print"],
    applications: ["Healthcare", "Facilities"],
    heroAsset: "renders.scrubTop",
    detailAssets: ["fabrics.woven", "fabrics.polycottonTwill"],
    costComparison: benchmark("scrubs", "scrub set", "Fabric, weight and stretch, the wash it must survive, pocket layout and reinforcement, waistband, colour code, labels and packing, read from the reference rather than assumed."),
    seoTitle: "Medical Scrubs Manufacturing",
    seoDescription:
      "Scrub tops, scrub trousers and lab coats made to your specification in Karachi, Pakistan, with fabric chosen for the laundry. Supplied FOB.",
  },
  {
    slug: "caps-headwear",
    index: 14,
    name: "Caps & Headwear",
    shortName: "Headwear",
    programNoun: "headwear",
    headline: "Caps built to\ncarry a logo.",
    intro:
      "A cap is a small article with a lot of decisions in it: panels, crown, peak, closure and the logo on the front. Each one is specified rather than left to the sample.",
    zone: "ink",
    capabilityStatus: "current_capability",
    subcategories: ["Six-Panel Caps", "Trucker Caps", "Bucket Hats", "Chef Skull Caps", "Visors"],
    articles: [
      { name: "Structured Six-Panel Cap", asset: "renders.uniformCap", note: "Buckram-backed front panels, embroidery-ready" },
      { name: "Trucker Cap", asset: "renders.truckerCap", note: "Mesh back panels, foam or fabric front, snapback closure" },
      { name: "Bucket Hat", asset: "renders.bucketHat", note: "Rows of stitching on the brim, eyelets to specification" },
      { name: "Chef Skull Cap", asset: "renders.chefBeanie", note: "Laundry-stable construction, elastic or tie back" },
    ],
    specification: [
      { label: "Fabric options", value: "Cotton twill, brushed cotton, poly-cotton, polyester mesh, canvas" },
      { label: "Crown", value: "Structured with buckram or unstructured; high, mid or low profile" },
      { label: "Peak", value: "Pre-curved or flat, stiffener to specification" },
      { label: "Closure", value: "Snapback, strap and buckle, hook and loop, elastic fit or fitted sizes" },
      { label: "Sizing", value: "One size adjustable or fitted sizes, head circumference confirmed against the size specification" },
      { label: "Sweatband and taping", value: "Cotton or performance sweatband, taped inner seams" },
      { label: "Labelling", value: "Main, care and country-of-origin labels" },
      { label: "Packing", value: "Nested or individually bagged, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Embroidery", "3D puff embroidery", "Woven badges", "Applied patches", "Screen print", "Heat transfer"],
    applications: ["Corporate", "Events", "Hospitality", "Food Service", "Retail", "Facilities"],
    heroAsset: "renders.uniformCap",
    detailAssets: ["fabrics.woven", "fabrics.mesh"],
    costComparison: benchmark("caps or hats", "cap", "Fabric, crown structure and profile, peak, closure, sweatband, the logo's method and size, labels and packing, read from the reference rather than assumed."),
    seoTitle: "Cap & Headwear Manufacturing",
    seoDescription:
      "Six-panel caps, trucker caps, bucket hats and chef skull caps made to your specification in Karachi, Pakistan, and supplied FOB.",
  },
  {
    slug: "bags-totes",
    index: 15,
    name: "Bags & Totes",
    shortName: "Bags & Totes",
    programNoun: "bag",
    headline: "Totes and bags\nthat carry the load.",
    intro:
      "A bag is judged by its handles. Fabric weight, handle length and how the handles are anchored decide whether it carries a full load or tears at the seam.",
    zone: "lime",
    capabilityStatus: "current_capability",
    subcategories: ["Canvas Totes", "Shopping Bags", "Drawstring Bags", "Tool Bags", "Pouches"],
    articles: [
      { name: "Canvas Tote", asset: "renders.toteBag", note: "Self-fabric or webbing handles, gusset to specification" },
      { name: "Drawstring Bag", asset: "renders.drawstringBag", note: "Cord channel, reinforced corners" },
      { name: "Tool Bag", asset: "renders.toolBag", note: "Heavy canvas, outside pockets, webbing handles" },
    ],
    specification: [
      { label: "Fabric options", value: "Cotton canvas and duck, poly-cotton twill, polyester, recycled polyester" },
      { label: "Typical program weight", value: "180-540 gsm, by bag type (heavy canvas is often quoted as 10-16 oz)" },
      { label: "Handles", value: "Self-fabric or webbing, length and width to specification, anchored with box-and-cross stitching or bar tacks" },
      { label: "Body", value: "Flat, bottom gusset or full gusset, to specification" },
      { label: "Closure", value: "Open top, zip, press stud, magnetic snap or drawcord" },
      { label: "Lining and pockets", value: "Unlined or lined, inside and outside pockets to specification" },
      { label: "Load", value: "The load a bag must carry is stated by the buyer and checked on the sample" },
      { label: "Labelling", value: "Main, care and country-of-origin labels" },
      { label: "Packing", value: "Flat-packed and bundled or individually bagged, carton pack to buyer instruction" },
      { label: "Minimum quantity", value: null },
      { label: "Sampling", value: null },
      { label: "Lead time", value: null },
    ],
    decoration: ["Screen print", "Embroidery", "Heat transfer", "Woven labels", "Applied patches"],
    applications: ["Retail", "Grocery", "Events", "Corporate"],
    heroAsset: "renders.toteBag",
    detailAssets: ["fabrics.canvas", "fabrics.woven"],
    costComparison: benchmark("bags or totes", "bag", "Fabric and weight, dimensions and gusset, handle length, width and anchoring, closure, pockets, the load it must carry, decoration, labels and packing, read from the reference rather than assumed."),
    seoTitle: "Tote Bag & Canvas Bag Manufacturing",
    seoDescription:
      "Canvas totes, drawstring bags, shopping bags and tool bags made to your specification in Karachi, Pakistan, and supplied FOB.",
  },
];

export function getCategory(slug: string): ProductCategory | undefined {
  return productCategories.find((c) => c.slug === slug);
}

export const categorySlugs = productCategories.map((c) => c.slug);
