import { assetManifest } from "./asset-manifest";

/**
 * SEMANTIC ASSET REGISTRY
 * =======================
 *
 * Every image on this site is addressed by a semantic key — `hero.sewing`,
 * `products.apron.front` — never by filename. Components ask for meaning; this
 * file decides which file answers.
 *
 * Paths are the canonical targets declared in the supplied asset pack
 * (`asset-pack/docs/ASSET_MANIFEST.json`). They are reproduced here exactly, so
 * dropping a final `.webp` next to its `.PLACEHOLDER.txt` slot is all it takes to
 * publish that image — no component, layout or data change.
 *
 * The supplied visual library is now imported to those canonical paths, so every
 * semantic key resolves to a real supplied image. `resolveAsset` still reports a
 * missing future file safely, but the UI never substitutes an SVG illustration.
 *
 * Master dimensions per the pack: landscape 3840x2160, square 3000x3000,
 * portrait 2160x2880, logos vector.
 */

/** Drives which designed specimen is drawn while a real photograph is pending. */
export type AssetKind =
  | "garment" // product on a clean ground
  | "fabric" // textile macro
  | "factory" // production floor
  | "document" // tech pack, pattern, measurement
  | "export" // cartons, marking, loading
  | "detail" // stitch, trim, decoration macro
  | "scene"; // people at work, environment

/** Whether the subject reads light or dark — lets a zone pick a safe background. */
export type AssetTone = "light" | "dark";

type AssetInput = {
  /** Canonical path under /public. May not exist yet. */
  src: string;
  /**
   * Second-choice path, used when `src` has not been shot yet.
   *
   * This is how imagery extracted from the supplied design boards is put to
   * work without overwriting the canonical structure: the pack's path is always
   * preferred, so the moment real photography lands at `src` it takes over
   * automatically and the fallback stops being consulted. Only then does a
   * designed specimen come into play.
   */
  fallbackSrc?: string;
  /** Descriptive alt text. Pass alt="" at the call site for decorative use. */
  alt: string;
  /** Intrinsic aspect ratio, width / height. Reserves layout space before load. */
  aspect: number;
  kind: AssetKind;
  tone: AssetTone;
  /** CSS object-position, for art-directed cropping rather than destructive crops. */
  position?: string;
  /** Compliance caption, rendered by callers that show the image at size. */
  caption?: string;
};

const LANDSCAPE = 16 / 9;
const SQUARE = 1;
const PORTRAIT = 3 / 4;
const DETAIL = 3 / 2; // technical construction crops
const RENDER = 1100 / 1344; // representative flat render frame
const PHOTO_RATIO = 1280 / 1600; // photographed samples, native 4:5

/** Required framing for the representative concept renders. */
const REPRESENTATIVE = "Representative article. Manufactured to buyer specification.";

function render(slug: string, label: string, tone: AssetTone = "dark"): AssetInput {
  return {
    src: `/assets/products/renders/${slug}.webp`,
    alt: `${label}: representative product render, front view`,
    aspect: RENDER,
    kind: "garment",
    tone,
    caption: REPRESENTATIVE,
  };
}

export const assetRegistry = {
  /* ============================== HERO ============================== */
  "hero.sewing": {
    src: "/assets/hero/hero-sewing-01.webp",
    alt: "Industrial sewing machine stitching a charcoal workwear garment, operator hands guiding the fabric",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
    position: "center 42%",
  },
  "hero.fabric": {
    src: "/assets/hero/hero-fabric-01.webp",
    alt: "Rolled apparel fabric stacked in the fabric store",
    aspect: LANDSCAPE,
    kind: "fabric",
    tone: "dark",
  },
  "hero.production": {
    src: "/assets/hero/hero-production-01.webp",
    alt: "Garment production floor during a running order",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },

  /* ========================= PRODUCT PHOTOGRAPHY ===================== */
  "products.apron.front": {
    src: "/assets/products/aprons/apron-black-front.webp",
    alt: "Black three-pocket bib apron, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.apron.back": {
    src: "/assets/products/aprons/apron-black-back.webp",
    alt: "Black bib apron, back view showing neck and waist ties",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.apron.detail": {
    src: "/assets/products/aprons/apron-detail-pocket.webp",
    fallbackSrc: "/assets/products/details/apron-construction.webp",
    alt: "Bar-tacked divided patch pocket on a bib apron",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },
  "products.apron.fabric": {
    src: "/assets/products/aprons/apron-fabric-macro.webp",
    fallbackSrc: "/assets/fabrics/polycotton-twill.webp",
    alt: "Macro view of stain-release poly-cotton apron fabric",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  "products.polo.front": {
    src: "/assets/products/polos/polo-blue-front.webp",
    fallbackSrc: "/assets/products/photography/polo-green-ribbed.webp",
    alt: "Ribbed dark green uniform polo, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.polo.back": {
    src: "/assets/products/polos/polo-blue-back.webp",
    fallbackSrc: "/assets/products/photography/polo-taupe-long-sleeve.webp",
    alt: "Taupe long-sleeve uniform polo",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.polo.detail": {
    src: "/assets/products/polos/polo-collar-detail.webp",
    fallbackSrc: "/assets/products/details/polo-construction.webp",
    alt: "Rib collar and button placket detail on a uniform polo",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },
  "products.polo.fabric": {
    src: "/assets/products/polos/polo-fabric-macro.webp",
    fallbackSrc: "/assets/fabrics/cotton-pique.webp",
    alt: "Macro view of cotton pique polo fabric",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  "products.fleece.front": {
    src: "/assets/products/fleece/fleece-jacket-front.webp",
    fallbackSrc: "/assets/products/photography/zip-hoodie-navy.webp",
    alt: "Navy full-zip hooded fleece, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.fleece.back": {
    src: "/assets/products/fleece/fleece-jacket-back.webp",
    fallbackSrc: "/assets/products/photography/hoodie-navy.webp",
    alt: "Navy pullover hooded sweatshirt",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.fleece.detail": {
    src: "/assets/products/fleece/fleece-zipper-detail.webp",
    fallbackSrc: "/assets/products/details/fleece-construction.webp",
    alt: "Moulded zip pull and chin guard on a fleece jacket",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },
  "products.fleece.fabric": {
    src: "/assets/products/fleece/fleece-fabric-macro.webp",
    fallbackSrc: "/assets/fabrics/fleece.webp",
    alt: "Macro view of brushed-back fleece",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  "products.tee.front": {
    src: "/assets/products/tshirts/performance-tee-front.webp",
    fallbackSrc: "/assets/products/photography/henley-tee-navy.webp",
    alt: "Navy henley T-shirt, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.tee.detail": {
    src: "/assets/products/tshirts/tee-detail.webp",
    fallbackSrc: "/assets/products/details/tee-construction.webp",
    alt: "Neck rib and shoulder seam construction on a uniform T-shirt",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },
  "products.tee.fabric": {
    src: "/assets/products/tshirts/tee-fabric-macro.webp",
    fallbackSrc: "/assets/fabrics/single-jersey.webp",
    alt: "Macro view of performance knit T-shirt fabric",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  "products.wovenShirt.front": {
    src: "/assets/products/woven-shirts/work-shirt-front.webp",
    fallbackSrc: "/assets/products/photography/denim-work-shirt.webp",
    alt: "Indigo denim work shirt with chest pocket, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.wovenShirt.detail": {
    src: "/assets/products/woven-shirts/work-shirt-detail.webp",
    fallbackSrc: "/assets/products/details/woven-shirt-construction.webp",
    alt: "Chest pocket and placket detail on a utility work shirt",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },

  "products.bottoms.front": {
    src: "/assets/products/bottoms/work-pant-front.webp",
    fallbackSrc: "/assets/products/photography/pant-camo.webp",
    alt: "Elastic-cuff work trouser, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.bottoms.detail": {
    src: "/assets/products/bottoms/work-pant-detail.webp",
    fallbackSrc: "/assets/products/details/bottoms-construction.webp",
    alt: "Reinforced pocket and bar-tack detail on a work trouser",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },

  "products.outerwear.front": {
    src: "/assets/products/outerwear/softshell-front.webp",
    fallbackSrc: "/assets/products/photography/utility-bomber-charcoal.webp",
    alt: "Charcoal utility bomber jacket, front view",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "products.outerwear.detail": {
    src: "/assets/products/outerwear/softshell-detail.webp",
    fallbackSrc: "/assets/products/details/outerwear-construction.webp",
    alt: "Bonded softshell seam and zip garage detail",
    aspect: DETAIL,
    kind: "detail",
    tone: "dark",
  },

  /* ================== REPRESENTATIVE FLAT RENDERS ==================== */
  /* Supplied as finished transparent renders. These are concept articles,   */
  /* not photographs, and every caption says so.                            */
  "renders.bibApron": render("bib-apron", "Three-pocket bib apron"),
  "renders.waistApron": render("waist-apron", "Three-pocket waist apron"),
  "renders.chefCoat": render("chef-coat", "Double-breasted chef coat", "light"),
  "renders.chefBeanie": render("chef-beanie", "Chef beanie"),
  "renders.classicPolo": render("classic-polo", "Classic short-sleeve polo"),
  "renders.longSleevePolo": render("long-sleeve-polo", "Long-sleeve uniform polo"),
  "renders.crewNeckTee": render("crew-neck-tee", "Crew-neck uniform T-shirt", "light"),
  "renders.crewneckSweatshirt": render("crewneck-sweatshirt", "Crewneck sweatshirt"),
  "renders.pulloverHoodie": render("pullover-hoodie", "Pullover hoodie"),
  "renders.fleeceJacket": render("fleece-jacket", "Full-zip fleece jacket"),
  "renders.buttonFrontShirt": render("button-front-shirt", "Button-front uniform shirt", "light"),
  "renders.utilityWorkShirt": render("utility-work-shirt", "Utility work shirt"),
  "renders.workJacket": render("work-jacket", "Utility work jacket"),
  "renders.workTrouser": render("work-trouser", "Uniform work trouser"),
  "renders.workShort": render("work-short", "Uniform work short"),
  "renders.safetyVest": render("safety-vest", "Reflective safety vest", "light"),
  "renders.uniformCap": render("uniform-cap", "Structured uniform cap"),
  "renders.uniformTie": render("uniform-tie", "Corporate uniform tie"),

  /* ===================== PRODUCT PHOTOGRAPHY ======================= */
  /* Photographed production samples, 1280x1600 native 4:5.                  */
  /* Alt text describes the garment and its decoration, never a brand name.   */
  "photo.pleatedTrouserKhaki": {
    src: "/assets/products/photography/pleated-trouser-khaki.webp",
    fallbackSrc: "/assets/products/renders/work-trouser.webp",
    alt: "Khaki pleated uniform trouser. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodieWhite": {
    src: "/assets/products/photography/hoodie-white.webp",
    fallbackSrc: "/assets/products/renders/pullover-hoodie.webp",
    alt: "White pullover hooded sweatshirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.chinoBeige": {
    src: "/assets/products/photography/chino-beige.webp",
    fallbackSrc: "/assets/products/renders/work-trouser.webp",
    alt: "Beige cotton chino trouser. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.sleevelessHoodieBlack": {
    src: "/assets/products/photography/sleeveless-hoodie-black.webp",
    fallbackSrc: "/assets/products/photography/hoodie-black.webp",
    alt: "Black sleeveless hooded top. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloBlackEmbroidered": {
    src: "/assets/products/photography/polo-black-embroidered.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Black uniform polo with embroidered chest logo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloBlackCrest": {
    src: "/assets/products/photography/polo-black-crest.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Black long-sleeve polo with embroidered crest. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloBlackService": {
    src: "/assets/products/photography/polo-black-service.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Black service polo with embroidered chest mark. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloRoyalEmbroidered": {
    src: "/assets/products/photography/polo-royal-embroidered.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Royal blue uniform polo with embroidered logo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.workVestOrange": {
    src: "/assets/products/photography/work-vest-orange.webp",
    alt: "High-visibility orange buttoned work vest. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfCamel": {
    src: "/assets/products/photography/scarf-camel.webp",
    alt: "Camel fringed scarf. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloNavyCorporate": {
    src: "/assets/products/photography/polo-navy-corporate.webp",
    fallbackSrc: "/assets/products/photography/polo-dress-navy.webp",
    alt: "Navy corporate polo with embroidered chest logo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfHerringbone": {
    src: "/assets/products/photography/scarf-herringbone.webp",
    alt: "Charcoal herringbone scarf. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.utilityBomberCharcoal": {
    src: "/assets/products/photography/utility-bomber-charcoal.webp",
    alt: "Charcoal utility bomber jacket. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.loungePantGrid": {
    src: "/assets/products/photography/lounge-pant-grid.webp",
    alt: "Cream and navy grid lounge trouser. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloCream": {
    src: "/assets/products/photography/polo-cream.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Cream pique polo with hangtag. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloGreenRibbed": {
    src: "/assets/products/photography/polo-green-ribbed.webp",
    alt: "Ribbed dark green uniform polo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.henleyGreen": {
    src: "/assets/products/photography/henley-green.webp",
    alt: "Forest green long-sleeve henley. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.teeGreyBranded": {
    src: "/assets/products/photography/tee-grey-branded.webp",
    fallbackSrc: "/assets/products/renders/crew-neck-tee.webp",
    alt: "Grey cotton T-shirt with woven neck label. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.zipHoodieGreyGraphic": {
    src: "/assets/products/photography/zip-hoodie-grey-graphic.webp",
    fallbackSrc: "/assets/products/photography/zip-hoodie-grey.webp",
    alt: "Grey full-zip hooded sweatshirt with placement print. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.teeHeatherGraphic": {
    src: "/assets/products/photography/tee-heather-graphic.webp",
    fallbackSrc: "/assets/products/renders/crew-neck-tee.webp",
    alt: "Heather grey T-shirt with screen-printed graphic. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.teeGreyGraphic": {
    src: "/assets/products/photography/tee-grey-graphic.webp",
    fallbackSrc: "/assets/products/renders/crew-neck-tee.webp",
    alt: "Grey T-shirt with screen-printed chest graphic. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodieHeatherGraphic": {
    src: "/assets/products/photography/hoodie-heather-graphic.webp",
    fallbackSrc: "/assets/products/renders/pullover-hoodie.webp",
    alt: "Heather grey zip hoodie with placement print. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.denimWorkShirt": {
    src: "/assets/products/photography/denim-work-shirt.webp",
    fallbackSrc: "/assets/products/photography/denim-utility-jacket.webp",
    alt: "Indigo denim work shirt with chest pocket. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.joggerGreyGraphic": {
    src: "/assets/products/photography/jogger-grey-graphic.webp",
    fallbackSrc: "/assets/products/photography/lounge-pant-grid.webp",
    alt: "Grey fleece jogger with printed hip graphic. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.zipHoodieGrey": {
    src: "/assets/products/photography/zip-hoodie-grey.webp",
    alt: "Grey full-zip hooded fleece. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloMaroon": {
    src: "/assets/products/photography/polo-maroon.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Maroon pique polo with embroidered chest crest. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfPlaidMaroon": {
    src: "/assets/products/photography/scarf-plaid-maroon.webp",
    alt: "Maroon plaid fringed scarf. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfNavy": {
    src: "/assets/products/photography/scarf-navy.webp",
    alt: "Midnight navy fringed scarf. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodieBlack": {
    src: "/assets/products/photography/hoodie-black.webp",
    alt: "Black pullover hooded sweatshirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloWhiteTagged": {
    src: "/assets/products/photography/polo-white-tagged.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "White pique polo with brand hangtag. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.zipHoodieNavy": {
    src: "/assets/products/photography/zip-hoodie-navy.webp",
    alt: "Navy full-zip hooded fleece. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodieNavyAlt": {
    src: "/assets/products/photography/hoodie-navy-alt.webp",
    alt: "Navy hooded sweatshirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodieNavy": {
    src: "/assets/products/photography/hoodie-navy.webp",
    alt: "Navy pullover hooded sweatshirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfNavyLooped": {
    src: "/assets/products/photography/scarf-navy-looped.webp",
    alt: "Navy scarf, looped arrangement. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.henleyWaffleNavy": {
    src: "/assets/products/photography/henley-waffle-navy.webp",
    alt: "Navy waffle-knit henley. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.denimUtilityJacket": {
    src: "/assets/products/photography/denim-utility-jacket.webp",
    alt: "Navy denim utility jacket. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloNavyGrocery": {
    src: "/assets/products/photography/polo-navy-grocery.webp",
    fallbackSrc: "/assets/products/photography/polo-dress-navy.webp",
    alt: "Navy grocery uniform polo with embroidered logo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.henleyNavy": {
    src: "/assets/products/photography/henley-navy.webp",
    alt: "Navy long-sleeve henley. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.henleyTeeNavy": {
    src: "/assets/products/photography/henley-tee-navy.webp",
    alt: "Navy short-sleeve henley T-shirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloDressNavy": {
    src: "/assets/products/photography/polo-dress-navy.webp",
    alt: "Navy service polo dress. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloNavyEmbroidered": {
    src: "/assets/products/photography/polo-navy-embroidered.webp",
    fallbackSrc: "/assets/products/photography/polo-dress-navy.webp",
    alt: "Navy uniform polo with embroidered logos. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloNavyTipped": {
    src: "/assets/products/photography/polo-navy-tipped.webp",
    fallbackSrc: "/assets/products/photography/polo-dress-navy.webp",
    alt: "Navy polo with contrast tipped collar. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloLime": {
    src: "/assets/products/photography/polo-lime.webp",
    alt: "Neon lime pique uniform polo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.scarfPlaidOlive": {
    src: "/assets/products/photography/scarf-plaid-olive.webp",
    alt: "Olive plaid fringed scarf. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.vestOrangePrinted": {
    src: "/assets/products/photography/vest-orange-printed.webp",
    fallbackSrc: "/assets/products/photography/work-vest-orange.webp",
    alt: "Orange sleeveless vest with screen-printed text. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloYellow": {
    src: "/assets/products/photography/polo-yellow.webp",
    alt: "Pale yellow pique uniform polo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.hoodiePinkGraphic": {
    src: "/assets/products/photography/hoodie-pink-graphic.webp",
    fallbackSrc: "/assets/products/renders/pullover-hoodie.webp",
    alt: "Pastel pink hooded sweatshirt with embroidered graphic. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.teePink": {
    src: "/assets/products/photography/tee-pink.webp",
    fallbackSrc: "/assets/products/renders/crew-neck-tee.webp",
    alt: "Pink cotton T-shirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloRedColourblock": {
    src: "/assets/products/photography/polo-red-colourblock.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Red and black colour-block polo with printed chest panel. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloRedGrocery": {
    src: "/assets/products/photography/polo-red-grocery.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Red grocery uniform polo with embroidered logo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloRed": {
    src: "/assets/products/photography/polo-red.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "Red pique polo with embroidered chest mark. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.sweaterRedStriped": {
    src: "/assets/products/photography/sweater-red-striped.webp",
    alt: "Red striped v-neck sweater. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.thermalSage": {
    src: "/assets/products/photography/thermal-sage.webp",
    alt: "Sage waffle-knit thermal shirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.thermalSageAlt": {
    src: "/assets/products/photography/thermal-sage-alt.webp",
    alt: "Sage waffle-knit thermal shirt, alternate view. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.teeSkyBlue": {
    src: "/assets/products/photography/tee-sky-blue.webp",
    fallbackSrc: "/assets/products/renders/crew-neck-tee.webp",
    alt: "Sky blue cotton T-shirt. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloTaupeLongSleeve": {
    src: "/assets/products/photography/polo-taupe-long-sleeve.webp",
    alt: "Taupe long-sleeve uniform polo. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.sleevelessHoodieWhite": {
    src: "/assets/products/photography/sleeveless-hoodie-white.webp",
    fallbackSrc: "/assets/products/photography/hoodie-black.webp",
    alt: "White sleeveless hooded top. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.onesieWhitePrint": {
    src: "/assets/products/photography/onesie-white-print.webp",
    alt: "White infant bodysuit with printed graphic. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.onesieWhiteText": {
    src: "/assets/products/photography/onesie-white-text.webp",
    alt: "White infant bodysuit with printed text. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloWhite": {
    src: "/assets/products/photography/polo-white.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "White pique polo with hangtag. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloWhiteTipped": {
    src: "/assets/products/photography/polo-white-tipped.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "White polo with green tipped collar and cuffs. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.poloWhiteEmbroidered": {
    src: "/assets/products/photography/polo-white-embroidered.webp",
    fallbackSrc: "/assets/products/renders/classic-polo.webp",
    alt: "White long-sleeve polo with embroidered chest crest. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },
  "photo.pantCamo": {
    src: "/assets/products/photography/pant-camo.webp",
    alt: "Woodland camouflage elastic-cuff trouser. Photographed production sample",
    aspect: PHOTO_RATIO,
    kind: "garment",
    tone: "light",
  },

  /* ============================ INDUSTRIES =========================== */
  "industries.grocery": {
    src: "/assets/industries/grocery-uniform.webp",
    alt: "Grocery store team in branded uniform aprons and polos",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },
  "industries.hospitality": {
    src: "/assets/industries/hospitality-uniform.webp",
    alt: "Hospitality front-of-house staff in service uniforms",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },
  "industries.chef": {
    src: "/assets/industries/chef-uniform.webp",
    alt: "Kitchen team in chef coats and aprons",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },
  "industries.retail": {
    src: "/assets/industries/retail-uniform.webp",
    alt: "Retail floor staff in uniform polos",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },
  "industries.industrial": {
    src: "/assets/industries/industrial-workwear.webp",
    alt: "Industrial team in high-visibility workwear",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },
  "industries.corporate": {
    src: "/assets/industries/corporate-uniform.webp",
    alt: "Corporate team in branded uniform shirts",
    aspect: PORTRAIT,
    kind: "scene",
    tone: "dark",
  },

  /* ============================= FACTORY ============================= */
  "factory.fabricInspection": {
    src: "/assets/factory/fabric-inspection.webp",
    alt: "Fabric being checked on an inspection frame before cutting",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.cutting": {
    src: "/assets/factory/cutting.webp",
    alt: "Fabric lay being cut against a marker on the cutting table",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.sewing": {
    src: "/assets/factory/sewing.webp",
    alt: "Stitching line assembling uniform garments",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.embroidery": {
    src: "/assets/factory/embroidery.webp",
    alt: "Multi-head embroidery machine running a logo on garment panels",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.printing": {
    src: "/assets/factory/printing.webp",
    alt: "Screen printing carousel applying a placement print",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.finishing": {
    src: "/assets/factory/finishing.webp",
    alt: "Pressing and finishing station",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.qualityControl": {
    src: "/assets/factory/quality-control.webp",
    alt: "Inspector checking a finished garment against the approved sample",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },
  "factory.packing": {
    src: "/assets/factory/packing.webp",
    alt: "Folded garments being polybagged and packed to buyer instruction",
    aspect: LANDSCAPE,
    kind: "factory",
    tone: "dark",
  },

  /* =========================== DEVELOPMENT =========================== */
  "development.techPack": {
    src: "/assets/development/tech-pack.webp",
    alt: "Technical pack open on the development table beside a reference garment",
    aspect: LANDSCAPE,
    kind: "document",
    tone: "dark",
  },
  "development.pattern": {
    src: "/assets/development/pattern.webp",
    alt: "Pattern pieces and a digitised marker",
    aspect: LANDSCAPE,
    kind: "document",
    tone: "dark",
  },
  "development.swatches": {
    src: "/assets/development/fabric-swatches.webp",
    alt: "Fabric swatch cards fanned out for material selection",
    aspect: LANDSCAPE,
    kind: "fabric",
    tone: "dark",
  },
  "development.trims": {
    src: "/assets/development/trims.webp",
    alt: "Buttons, zips, drawcords and labels arranged as a trim board",
    aspect: LANDSCAPE,
    kind: "detail",
    tone: "dark",
  },
  "development.sample": {
    src: "/assets/development/sample-development.webp",
    alt: "Sample garment on a form during a fit review",
    aspect: LANDSCAPE,
    kind: "scene",
    tone: "dark",
  },
  "development.measurement": {
    src: "/assets/development/measurement.webp",
    alt: "Garment being measured against the approved size specification",
    aspect: LANDSCAPE,
    kind: "document",
    tone: "dark",
  },

  /* ============================= FABRICS ============================= */
  "fabrics.polycottonTwill": {
    src: "/assets/fabrics/polycotton-twill.webp",
    alt: "Macro photograph of poly-cotton twill weave",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.cottonPique": {
    src: "/assets/fabrics/cotton-pique.webp",
    alt: "Macro photograph of cotton pique knit structure",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.polyesterPerformance": {
    src: "/assets/fabrics/polyester-performance.webp",
    alt: "Macro photograph of performance polyester knit",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.fleece": {
    src: "/assets/fabrics/fleece.webp",
    alt: "Macro photograph of brushed-back fleece",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.woven": {
    src: "/assets/fabrics/woven.webp",
    alt: "Macro photograph of woven shirting fabric",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.softshell": {
    src: "/assets/fabrics/softshell.webp",
    alt: "Macro photograph of bonded softshell fabric",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  "fabrics.canvas": {
    src: "/assets/fabrics/canvas.webp",
    alt: "Macro view of heavyweight cotton canvas",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.singleJersey": {
    src: "/assets/fabrics/single-jersey.webp",
    alt: "Macro view of single jersey knit structure",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.rib": {
    src: "/assets/fabrics/rib.webp",
    alt: "Macro view of 1x1 rib collar and cuff trim",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "fabrics.mesh": {
    src: "/assets/fabrics/mesh.webp",
    alt: "Macro view of breathable polyester mesh",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },

  /* ============================== EXPORT ============================= */
  "export.cartons": {
    src: "/assets/export/cartons.webp",
    alt: "Export cartons stacked and sealed for shipment",
    aspect: LANDSCAPE,
    kind: "export",
    tone: "dark",
  },
  "export.cartonMarking": {
    src: "/assets/export/carton-marking.webp",
    alt: "Shipping marks and carton labelling applied to an export carton",
    aspect: LANDSCAPE,
    kind: "export",
    tone: "dark",
  },
  "export.warehouse": {
    src: "/assets/export/warehouse.webp",
    alt: "Finished goods staged in the warehouse ahead of dispatch",
    aspect: LANDSCAPE,
    kind: "export",
    tone: "dark",
  },
  "export.containerLoading": {
    src: "/assets/export/container-loading.webp",
    alt: "Cartons being loaded into a container for FOB handover",
    aspect: LANDSCAPE,
    kind: "export",
    tone: "dark",
  },

  /* =========================== CASE STUDIES ========================== */
  "caseStudy.apronProgram.hero": {
    src: "/assets/case-studies/uniform-apron-program/hero.webp",
    alt: "Uniform apron program in a working environment",
    aspect: LANDSCAPE,
    kind: "scene",
    tone: "dark",
  },
  "caseStudy.apronProgram.product": {
    src: "/assets/case-studies/uniform-apron-program/product.webp",
    alt: "Bib apron produced for a uniform program",
    aspect: SQUARE,
    kind: "garment",
    tone: "dark",
  },
  "caseStudy.apronProgram.fabric": {
    src: "/assets/case-studies/uniform-apron-program/fabric.webp",
    alt: "Macro view of the 65/35 poly-cotton fabric used in the apron program",
    aspect: SQUARE,
    kind: "fabric",
    tone: "dark",
  },
  "caseStudy.apronProgram.detail": {
    src: "/assets/case-studies/uniform-apron-program/detail.webp",
    alt: "Construction detail from the apron program",
    aspect: SQUARE,
    kind: "detail",
    tone: "dark",
  },
} as const satisfies Record<string, AssetInput>;

export type AssetKey = keyof typeof assetRegistry;

export type ResolvedAsset = AssetInput & {
  key: AssetKey;
  /** True when a real file exists at `src` and next/image should render it. */
  available: boolean;
  width: number;
  height: number;
  blurDataURL?: string;
};

/**
 * Look up a semantic key and report whether it can be rendered as a real image.
 * Callers hand the whole result to `<SmartImage />`, which handles both branches.
 */
export function resolveAsset(key: AssetKey): ResolvedAsset {
  const asset = assetRegistry[key] as AssetInput;

  // Canonical path wins; the extracted stand-in is only used until it exists.
  const primary = assetManifest[asset.src];
  const secondary = asset.fallbackSrc ? assetManifest[asset.fallbackSrc] : undefined;
  const entry = primary?.width ? primary : secondary?.width ? secondary : undefined;
  const src = primary?.width ? asset.src : asset.fallbackSrc ?? asset.src;

  if (!entry || !entry.width || !entry.height) {
    // Derive nominal dimensions from the declared aspect so layout stays stable.
    const width = 1600;
    return {
      ...asset,
      key,
      available: false,
      width,
      height: Math.round(width / asset.aspect),
    };
  }

  return {
    ...asset,
    src,
    key,
    available: true,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur ?? undefined,
  };
}

/** True when the file behind a key exists — for choosing between layout variants. */
export function hasAsset(key: AssetKey): boolean {
  return resolveAsset(key).available;
}

/**
 * True only when the key's *own* file exists — a fallback does not count.
 *
 * `hasAsset` asks whether anything will render, which is the right question for
 * a layout. It is the wrong question for a gallery that claims its contents are
 * photographs. After the branded samples were withdrawn and their keys were
 * given render fallbacks, `hasAsset` stayed true for all of them and the
 * "Photographed from production" strip filled with twenty-one copies of one
 * studio render — renders presented as production samples, which is the
 * substitution this site exists to prevent.
 */
export function hasCanonicalAsset(key: AssetKey): boolean {
  const entry = assetManifest[(assetRegistry[key] as AssetInput).src];
  return Boolean(entry?.width);
}

/** Picks the first key whose file exists, else the first key. Never returns undefined. */
export function firstAvailable(...keys: [AssetKey, ...AssetKey[]]): AssetKey {
  return keys.find((k) => resolveAsset(k).available) ?? keys[0];
}

/** Build-time reporting for the assets-needed checklist. */
export function assetCoverage() {
  const keys = Object.keys(assetRegistry) as AssetKey[];
  const missing = keys.filter((k) => !resolveAsset(k).available);
  return { total: keys.length, present: keys.length - missing.length, missing };
}
