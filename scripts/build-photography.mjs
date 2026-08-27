#!/usr/bin/env node
/**
 * Product photography pipeline.
 *
 *   npm run photos
 *
 * Optimises every photographed production sample in
 * `assets-master/product-photography/` to the product spec (1280x1600, the
 * sources' native 4:5 — no padding, no crop, nothing stretched) and emits the
 * registry block that wires them into `data/assets.ts`.
 *
 * Slugs and alt text are derived from the master filename, then corrected
 * through OVERRIDES where the filename is ambiguous or carries a brand word.
 * Alt text describes the garment, never a brand.
 */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MASTER = path.join(root, "assets-master", "product-photography");
const OUT = path.join(root, "public", "assets", "products", "photography");

const W = 1280, H = 1600, Q = 84;
const MAX_BYTES = 220 * 1024; // product-square budget from data/image-spec.ts

/** Garment family, used to place each photograph on the right category page. */
const FAMILY = {
  polo: "polos-tshirts", tee: "polos-tshirts", henley: "polos-tshirts",
  hoodie: "fleece-sweatshirts", sweatshirt: "fleece-sweatshirts", sweater: "fleece-sweatshirts",
  thermal: "fleece-sweatshirts", jogger: "bottoms", trouser: "bottoms", chino: "bottoms",
  pant: "bottoms", jacket: "outerwear", bomber: "outerwear",
  waistcoat: "outerwear", vest: "outerwear", shirt: "woven-shirts", scarf: "accessories",
  onesie: "accessories", top: "fleece-sweatshirts", dress: "woven-shirts",
};

/** Filename -> { slug, alt }. Only where the auto-derivation reads poorly. */
const OVERRIDES = {
  army_navy_khaki_pleated_trousers: ["pleated-trouser-khaki", "Khaki pleated uniform trouser"],
  authentic_army_navy_white_hoodie: ["hoodie-white", "White pullover hooded sweatshirt"],
  beige_chinos_with_breathe_tag: ["chino-beige", "Beige cotton chino trouser"],
  black_hooded_sleeveless_top_with_graphic_label: ["sleeveless-hoodie-black", "Black sleeveless hooded top"],
  black_polo_shirt_with_gold_embroidery: ["polo-black-embroidered", "Black uniform polo with embroidered chest logo"],
  black_polo_with_gold_vegmen_logo: ["polo-black-crest", "Black long-sleeve polo with embroidered crest"],
  black_signature_collection_fairway_polo: ["polo-black-service", "Black service polo with embroidered chest mark"],
  blue_polo_shirt_with_red_embroidery: ["polo-royal-embroidered", "Royal blue uniform polo with embroidered logo"],
  bright_orange_buttoned_waistcoat: ["work-vest-orange", "High-visibility orange buttoned work vest"],
  camel_scarf_with_fringed_ends: ["scarf-camel", "Camel fringed scarf"],
  carmax_signature_navy_polo: ["polo-navy-corporate", "Navy corporate polo with embroidered chest logo"],
  charcoal_herringbone_scarf_on_white: ["scarf-herringbone", "Charcoal herringbone scarf"],
  charcoal_utility_bomber_jacket: ["utility-bomber-charcoal", "Charcoal utility bomber jacket"],
  cream_navy_grid_lounge_pants: ["lounge-pant-grid", "Cream and navy grid lounge trouser"],
  cream_weekender_polo_with_navy_tag: ["polo-cream", "Cream pique polo with hangtag"],
  dark_green_ribbed_polo_shirt: ["polo-green-ribbed", "Ribbed dark green uniform polo"],
  forest_green_henley_shirt_flat_lay: ["henley-green", "Forest green long-sleeve henley"],
  gray_armani_exchange_t_shirt_flat_lay: ["tee-grey-branded", "Grey cotton T-shirt with woven neck label"],
  grey_tapout_graphic_zip_up_hoodie: ["zip-hoodie-grey-graphic", "Grey full-zip hooded sweatshirt with placement print"],
  hardcore_classic_1973_heather_gray_t_shirt: ["tee-heather-graphic", "Heather grey T-shirt with screen-printed graphic"],
  hardcore_classic_gray_t_shirt_flat_lay: ["tee-grey-graphic", "Grey T-shirt with screen-printed chest graphic"],
  heather_gray_tapout_graphic_hoodie: ["hoodie-heather-graphic", "Heather grey zip hoodie with placement print"],
  indigo_denim_county_market_shirt: ["denim-work-shirt", "Indigo denim work shirt with chest pocket"],
  light_gray_hardcore_logo_joggers: ["jogger-grey-graphic", "Grey fleece jogger with printed hip graphic"],
  light_gray_sparkle_trimmed_zip_hoodie: ["zip-hoodie-grey", "Grey full-zip hooded fleece"],
  maroon_gardenia_premium_polo_shirt: ["polo-maroon", "Maroon pique polo with embroidered chest crest"],
  maroon_plaid_scarf_with_fringed_tassels: ["scarf-plaid-maroon", "Maroon plaid fringed scarf"],
  midnight_navy_fringed_scarf: ["scarf-navy", "Midnight navy fringed scarf"],
  minimal_black_hoodie_product_mockup: ["hoodie-black", "Black pullover hooded sweatshirt"],
  nautica_white_polo_shirt_flat_lay: ["polo-white-tagged", "White pique polo with brand hangtag"],
  navy_blue_full_zip_hoodie_product_photo: ["zip-hoodie-navy", "Navy full-zip hooded fleece"],
  navy_blue_hoodie_flat_lay: ["hoodie-navy-alt", "Navy hooded sweatshirt"],
  navy_blue_pullover_hoodie_on_white: ["hoodie-navy", "Navy pullover hooded sweatshirt"],
  navy_blue_scarf_in_looped_arrangement: ["scarf-navy-looped", "Navy scarf, looped arrangement"],
  navy_blue_waffle_henley_shirt: ["henley-waffle-navy", "Navy waffle-knit henley"],
  navy_denim_utility_jacket_flat_lay: ["denim-utility-jacket", "Navy denim utility jacket"],
  navy_food_city_polo_shirt: ["polo-navy-grocery", "Navy grocery uniform polo with embroidered logo"],
  navy_henley_shirt_flat_lay: ["henley-navy", "Navy long-sleeve henley"],
  navy_henley_t_shirt_product_shot: ["henley-tee-navy", "Navy short-sleeve henley T-shirt"],
  navy_polo_shirt_dress_product_photo: ["polo-dress-navy", "Navy service polo dress"],
  navy_polo_shirt_with_embroidered_logos: ["polo-navy-embroidered", "Navy uniform polo with embroidered logos"],
  navy_polo_with_striped_trim_and_tag: ["polo-navy-tipped", "Navy polo with contrast tipped collar"],
  neon_lime_signature_polo_shirt: ["polo-lime", "Neon lime pique uniform polo"],
  olive_plaid_fringed_scarf: ["scarf-plaid-olive", "Olive plaid fringed scarf"],
  orange_halloween_expert_vest: ["vest-orange-printed", "Orange sleeveless vest with screen-printed text"],
  pale_yellow_polo_shirt_flat_lay: ["polo-yellow", "Pale yellow pique uniform polo"],
  pastel_pink_virginia_tech_hoodie_flat_lay: ["hoodie-pink-graphic", "Pastel pink hooded sweatshirt with embroidered graphic"],
  pink_arizona_navy_t_shirt_flat_lay: ["tee-pink", "Pink cotton T-shirt"],
  red_and_black_d_agostino_polo_shirt: ["polo-red-colourblock", "Red and black colour-block polo with printed chest panel"],
  red_hannaford_polo_shirt_product_shot: ["polo-red-grocery", "Red grocery uniform polo with embroidered logo"],
  red_signature_collection_polo_flat_lay: ["polo-red", "Red pique polo with embroidered chest mark"],
  red_striped_v_neck_sweater_flat_lay: ["sweater-red-striped", "Red striped v-neck sweater"],
  sage_waffle_knit_thermal_shirt: ["thermal-sage", "Sage waffle-knit thermal shirt"],
  sage_waffle_knit_thermal_shirt_mockup: ["thermal-sage-alt", "Sage waffle-knit thermal shirt, alternate view"],
  sky_blue_army_navy_t_shirt: ["tee-sky-blue", "Sky blue cotton T-shirt"],
  taupe_long_sleeve_polo_flat_lay: ["polo-taupe-long-sleeve", "Taupe long-sleeve uniform polo"],
  white_army_navy_sleeveless_hoodie_mockup: ["sleeveless-hoodie-white", "White sleeveless hooded top"],
  white_baby_onesie_with_green_sleep_graphics: ["onesie-white-print", "White infant bodysuit with printed graphic"],
  white_baby_onesie_with_green_spanish_text: ["onesie-white-text", "White infant bodysuit with printed text"],
  white_nautica_polo_shirt_product_photo: ["polo-white", "White pique polo with hangtag"],
  white_polo_shirt_with_green_chevron_trim: ["polo-white-tipped", "White polo with green tipped collar and cuffs"],
  white_vegmenu_embroidered_polo_shirt: ["polo-white-embroidered", "White long-sleeve polo with embroidered chest crest"],
  woodland_camo_elastic_cuff_pants: ["pant-camo", "Woodland camouflage elastic-cuff trouser"],
};

function camel(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}
function familyOf(slug) {
  for (const [word, fam] of Object.entries(FAMILY)) if (slug.includes(word)) return fam;
  return "polos-tshirts";
}

fs.mkdirSync(OUT, { recursive: true });
const files = fs.readdirSync(MASTER).filter((f) => f.endsWith(".png")).sort();
const entries = [];

for (const file of files) {
  const stem = file.replace(/\.png$/, "");
  const [slug, alt] = OVERRIDES[stem] ?? [stem.replace(/_/g, "-"), stem.replace(/_/g, " ")];
  const out = path.join(OUT, `${slug}.webp`);

  // Encode at the target quality, then step down only for the few frames whose
  // detail pushes them over budget. A single global quality either wastes bytes
  // on simple garments or softens the busy ones; this spends the budget where
  // the image actually needs it.
  let quality = Q;
  for (let attempt = 0; attempt < 4; attempt++) {
    execFileSync("ffmpeg", ["-v", "error", "-y", "-i", path.join(MASTER, file),
      "-vf", `scale=${W}:${H}:flags=lanczos`, "-c:v", "libwebp", "-q:v", String(quality),
      "-compression_level", "6", out], { stdio: "pipe" });
    if (fs.statSync(out).size <= MAX_BYTES) break;
    quality -= 5;
  }
  entries.push({ key: `photo.${camel(slug)}`, slug, alt, family: familyOf(slug), bytes: fs.statSync(out).size });
}

const registry = entries.map((e) => `  "${e.key}": {
    src: "/assets/products/photography/${e.slug}.webp",
    alt: "${e.alt} — photographed production sample",
    aspect: PHOTO_RATIO_PLACEHOLDER,
    kind: "garment",
    tone: "light",
  },`).join("\n");

const byFamily = {};
for (const e of entries) (byFamily[e.family] ??= []).push(e.key);

fs.writeFileSync(path.join(root, ".photography-generated.json"),
  JSON.stringify({ registry, byFamily, count: entries.length }, null, 2));

const total = entries.reduce((s, e) => s + e.bytes, 0);
console.log(`photography: ${entries.length} optimized, ${(total / 1024 / 1024).toFixed(2)} MB`);
console.log(`heaviest: ${(Math.max(...entries.map((e) => e.bytes)) / 1024).toFixed(0)} KB`);
for (const [fam, keys] of Object.entries(byFamily)) console.log(`  ${fam.padEnd(20)} ${keys.length}`);
