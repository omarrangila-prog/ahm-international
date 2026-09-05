#!/usr/bin/env node
/**
 * Writes `IMAGE-GENERATION.md` — every image the site is still missing, phrased
 * as a ready-to-send generation prompt.
 *
 *   npm run brief
 *
 * Derived from the registry through `hasCanonicalAsset`, so a slot appears here
 * only when its own file is absent. A key with a fallback still counts as
 * missing: the fallback is why the page is not broken, not a reason to stop
 * wanting the real thing.
 *
 * ONE PROMPT PER FILE
 * -------------------
 * Keyed on the master path, not on the place the image is used. One asset can
 * be an article photograph, a sample-strip frame and a second family's article
 * all at once, and an earlier version of this script emitted it once per role:
 * nineteen of a claimed eighty-one items were the same files listed twice.
 * Worse, the two entries described different garments — "a classic short-sleeve
 * polo" against "a white polo with green tipped collar and cuffs" — so
 * generating both and saving both meant the second silently overwrote the
 * first. Every usage is now listed under one prompt.
 *
 * The subject comes from the registry `alt`, never from the article name, for a
 * blunt reason: the alt is already published as that image's alt text. An image
 * that does not match it makes the page wrong for a screen reader.
 *
 * FIVE RULE SETS
 * --------------
 * The parts below are five genuinely different photographic briefs, and an item
 * shot under the wrong one is unusable. Grouping instead on registry shape —
 * "is it under /products/photography/" — put sixteen garment renders in with
 * the factory scenes, asking for a flat lay of a hooded fleece at landscape
 * 16:9 under a rule about not showing anyone's face.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { assetRegistry, hasCanonicalAsset } = await import("../data/assets.ts");
const { productCategories } = await import("../data/products.ts");

/**
 * The subject, with any description of branding removed.
 *
 * These alts were written for the withdrawn originals, so several describe the
 * mark itself — "with printed graphic", "in branded uniform aprons". Feeding
 * that to a generator alongside "no logo, no text" produces a contradictory
 * prompt, and the generator resolves the contradiction by guessing.
 */
function plainSubject(alt) {
  return alt
    .replace(/\.\s*Photographed production sample\.?$/i, "")
    // Any "with ... <mark noun> ..." clause, up to a comma or the end. The
    // adjective is not adjacent to the noun in every alt — "with embroidered
    // chest logo", "with gold embroidery" — so an adjacent-word pattern leaks.
    .replace(
      /,?\s+with\b[^,.]*?\b(logos?|graphics?|text|embroider\w*|prints?|labels?|tags?|badges?|branding|crest|monogram|wordmark)\b[^,.]*/gi,
      "",
    )
    // "Grocery store team in branded uniform aprons" — an instruction to draw
    // the exact thing the rules forbid, three lines further down the prompt.
    .replace(/\b(branded|printed|embroidered|logo'?d)\s+/gi, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\.$/, "")
    .trim();
}

/**
 * The article note, kept only when it describes the garment.
 *
 * `note` carries construction detail for most articles and a commercial or
 * compliance statement for a few — the infant bodysuits read "children's safety
 * requirements are qualified against the destination market's standard before
 * development", which is true, important, and not a thing anyone can draw.
 * Feeding it to an image model gives it something to interpret visually, and it
 * will oblige.
 */
function visualNote(note) {
  if (!note) return "";
  if (/qualif|standard|requirement|market|complian|certif|develop/i.test(note)) return "";
  return note.replace(/\.$/, "");
}

/** "a" before a consonant, "an" before a vowel. */
const article = (word) => (/^[aeiou]/i.test(word) ? "an" : "a");

/** Where a master must be dropped for `npm run photos` / `images:build` to find it. */
const master = (src) =>
  src.includes("/products/photography/")
    ? `assets-master/product-photography/${path.basename(src, ".webp")}.png`
    : `assets-master${src.replace("/assets", "")}`.replace(/\.webp$/, ".png");

/* ---------------------------------------------------------------- *
 * Collect every missing key once, with all the places it is used.
 * ---------------------------------------------------------------- */

const missing = new Map();
const need = (key) => {
  if (hasCanonicalAsset(key)) return null;
  if (!missing.has(key)) {
    const { src, alt } = assetRegistry[key];
    missing.set(key, { key, src, alt, articles: [], strips: [], notes: [] });
  }
  return missing.get(key);
};

for (const c of productCategories) {
  for (const art of c.articles) {
    const entry = need(art.asset);
    if (!entry) continue;
    entry.articles.push(`${art.name} (${c.name})`);
    const note = visualNote(art.note ?? "");
    if (note && !entry.notes.includes(note)) entry.notes.push(note);
  }
  for (const key of c.photography ?? []) {
    const entry = need(key);
    if (entry && !entry.strips.includes(c.name)) entry.strips.push(c.name);
  }
}
for (const key of Object.keys(assetRegistry)) need(key);

/* One part each, in priority order — an asset used as an article photograph
   belongs in part 1 however many strips it also appears in. */
const all = [...missing.values()];
const part1 = all.filter((e) => e.articles.length);
const part2 = all.filter((e) => !e.articles.length && e.strips.length);
const rest = all.filter((e) => !e.articles.length && !e.strips.length);
const part3 = rest.filter((e) => e.src.includes("/products/"));
const part4 = rest.filter((e) => e.src.includes("/industries/"));
const part5 = rest.filter(
  (e) => !e.src.includes("/products/") && !e.src.includes("/industries/"),
);
const total = all.length;

/* ---------------------------------------------------------------- *
 * The five rule sets.
 * ---------------------------------------------------------------- */

const NO_MARKS =
  "No logo, no brand mark, no printed graphic, no embroidery, no applied patch, " +
  "no text of any kind anywhere in the image.";

/*
 * The exception, and it is a narrow one.
 *
 * Two subjects here ARE the print: the Kidswear article named "Printed
 * Bodysuit", whose note is about print chemistry, and the screen-printing
 * carousel. Handing those the blanket rule asks for a photograph of printing
 * with nothing printed in it, and puts a plain white bodysuit on a card that
 * says "Printed Bodysuit" — the page then contradicts its own picture.
 *
 * What the standing rule actually forbids is a customer's mark and licensed
 * artwork, not the existence of ink. An abstract repeat carries neither, so it
 * demonstrates the capability without implying a buyer. Letters and numbers
 * stay banned outright: a wordmark is the failure this whole document exists to
 * prevent, and "no text" is the one instruction a generator must never see
 * softened.
 */
const PRINT_ALLOWED =
  "The print is a simple abstract all-over pattern — dots, stripes, or a small " +
  "geometric repeat. It is not a logo, wordmark, slogan, character, mascot, " +
  "licensed image or any recognisable design, and it contains no letters and no " +
  "numbers. Everything else below still applies.";

const GARMENT_RULES = [
  "Flat lay, shot straight down, garment square to the frame and symmetrical.",
  "Pure white seamless background. No gradient, no floor line, no surface texture.",
  "Garment fills the frame with a small even margin on all four sides.",
  "Soft even diffused light. No harsh shadow, no dramatic contrast, no vignette.",
  "Natural fabric texture visible — weave, rib, brushed nap, stitching, seams.",
  "Colour accurate and flat. No colour grading, no filter, no warm or cool cast.",
  NO_MARKS,
  "No hangtag, no swing ticket, no barcode, no label with writing.",
  "No model, no mannequin, no hanger, no hands, no props.",
  "Photorealistic product photography. Square 1:1, 3000 x 3000.",
].join(" ");

/* A macro of a pocket cannot also "fill the frame with an even margin", and it
   is the one shot where the fabric itself is the entire subject. */
const DETAIL_RULES = [
  "Macro close-up of the construction described, filling most of the frame.",
  "Everything sharp — stitch density, bar-tacks, seam allowance and weave all legible.",
  "Soft even light raking slightly across the surface so the stitching reads.",
  "Background is the rest of the garment only. No table, no props, no surface behind it.",
  "Colour accurate and flat. No colour grading, no filter, no warm or cool cast.",
  NO_MARKS,
  "No hands, no tools, no model, no mannequin.",
  "Photorealistic product photography. Square 1:1, 3000 x 3000.",
].join(" ");

/* People are the point of these — a uniform is worn — so the rule is how to
   frame them, not to exclude them. "No identifiable person" on its own reads as
   a contradiction, and the generator resolves it by inventing a face. */
const PEOPLE_RULES = [
  "Real working environment, mid-distance, candid and unposed.",
  "Faces are not visible: staff seen from behind, in three-quarter rear view, or cropped below the chin.",
  "No recognisable face anywhere in frame, including anyone in the background.",
  `The uniforms are plain. ${NO_MARKS}`,
  "No company name, no signage, no menu board, no price label, no visible writing anywhere.",
  "Natural available light, photorealistic documentary photography, not a stock-photo look.",
  "Portrait 3:4, 2160 x 2880.",
].join(" ");

const FACILITY_RULES = [
  "Photorealistic documentary photography of the space and the work, natural light.",
  "No recognisable face. If anyone appears they are turned away or cropped.",
  "No company name, no signage, no logo, no brand mark, no visible writing anywhere.",
  `No branded garments in shot. ${NO_MARKS}`,
  "Landscape 16:9, 3840 x 2160.",
].join(" ");

/* ---------------------------------------------------------------- *
 * Emit.
 * ---------------------------------------------------------------- */

let n = 0;
const isDetail = (src) => src.includes("detail");

/*
 * Two alts can collapse to the same subject once the branding is stripped out,
 * because the branding was the only thing separating them: the two infant
 * bodysuits are "with printed graphic" and "with printed text", and both come
 * back as "White infant bodysuit". They are still two files, shown side by side
 * in one strip, so generating the same picture twice would look like a broken
 * gallery. Numbered ahead of rendering so the second can point at the first.
 */
const order = [
  ...part1.map((e) => [e, "garment"]),
  ...part2.map((e) => [e, "garment"]),
  ...part3.map((e) => [e, "garment"]),
  ...part4.map((e) => [e, "people"]),
  ...part5.map((e) => [e, "facility"]),
];
const firstAt = new Map();
order.forEach(([e], i) => {
  const key = plainSubject(e.alt);
  if (!firstAt.has(key)) firstAt.set(key, i + 1);
});

/*
 * Read from the article name and note, never from the alt: `plainSubject`
 * strips "printed" out of alts, and the ones it strips are describing a
 * customer's logo — "with printed chest logo" — which is exactly what must not
 * come back. The scene is named explicitly for the same reason.
 */
const printIsSubject = (entry) =>
  entry.src.endsWith("factory/printing.webp") ||
  [...entry.articles, ...entry.notes].some((t) => /\bprint(ed|ing)?\b/i.test(t));

function render(entry, kind) {
  n += 1;
  const subject = plainSubject(entry.alt);
  const printed = printIsSubject(entry);
  const twin = firstAt.get(subject);
  // A twin that carries a print is already distinguishable from its plain pair.
  const isTwin = twin !== n && !printed;
  const detail = kind === "garment" && isDetail(entry.src);

  const used = [];
  if (entry.articles.length) used.push(`article photograph for ${entry.articles.join(", ")}`);
  if (entry.strips.length) used.push(`production-sample strip on ${entry.strips.join(", ")}`);

  let body;
  if (detail) body = `Macro photograph: ${subject.toLowerCase()}.`;
  else if (kind === "garment")
    body = `Product photograph of ${article(subject)} ${subject.toLowerCase()}.`;
  else body = `${subject}.`;
  if (entry.notes.length) body += `\n\nConstruction: ${entry.notes.join("; ")}.`;
  if (printed) body += `\n\n${PRINT_ALLOWED}`;

  let rules = FACILITY_RULES;
  if (detail) rules = DETAIL_RULES;
  else if (kind === "garment") rules = GARMENT_RULES;
  else if (kind === "people") rules = PEOPLE_RULES;

  let s = `### ${n}. ${subject}\n\n**FILE:** \`${master(entry.src)}\`\n`;
  if (used.length) s += `**Used as:** ${used.join(" · ")}\n`;
  if (detail) s += `**Construction macro**\n`;
  if (printed)
    s += `**Carries a print** — abstract pattern only, no letters, no numbers, no design.\n`;
  if (isTwin)
    s +=
      `**Same subject as item ${twin}, but a separate file.** These two sit side by side ` +
      `in one strip — shoot a different angle or colourway so the pair are not identical.\n`;
  s += `\n\`\`\`\nFILE: ${path.basename(master(entry.src))}\n\n${body}\n\n${rules}\n\`\`\`\n\n`;
  return s;
}

const section = (list, kind) => list.map((e) => render(e, kind)).join("");

const doc = `# Image generation — every prompt in one place

**Generated by \`npm run brief\`. Do not edit by hand — it will be overwritten.**

${total} images are missing from this site — one prompt each, no file listed
twice. Every entry is complete on its own: the rules are repeated inside each
one, so a single item still works pasted into a fresh chat three days from now.

Five parts, because these are five different photographic briefs. The rules
differ between them, and an item shot under the wrong ones is unusable.

| Part | What | Count |
| --- | --- | --- |
| 1 | Article photographs | ${part1.length} |
| 2 | Production samples | ${part2.length} |
| 3 | Product views and construction details | ${part3.length} |
| 4 | Industry environments | ${part4.length} |
| 5 | Facility and process | ${part5.length} |

Several images do more than one job — the same polo can be the article
photograph on two family pages and a sample-strip frame on a third. Where that
happens, **Used as** lists every place it lands. Generate it once.

---

## Step 1 — paste this into ChatGPT first

\`\`\`
You are generating photography for AHM International, an apparel manufacturer
and FOB exporter in Karachi, Pakistan. These images go on a live B2B website
read by international sourcing managers.

I will send items one at a time. For each, generate one photorealistic image
following the rules in that item exactly.

ABSOLUTELY FORBIDDEN — an image breaking any of these is unusable:
- No logo, brand mark, monogram, crest, emblem or wordmark, anywhere.
- No embroidered design, applied patch or licensed artwork.
- No printed graphic — EXCEPT where a single item explicitly permits an
  abstract pattern, and then only as that item describes it.
- No text of any kind. Not on the chest, not on a label, not on a tag, not on
  a waistband, not on a wall or sign in the background. Zero visible writing.
  This one has no exceptions.
- No hangtag, swing ticket, price ticket or barcode.
- No recognisable human face.

WHY: 35 photographs were deleted from this website because they carried
customers' brand marks. Anything with a logo or text on it cannot be published.
If unsure whether something counts as a mark, leave it off.

After each image, restate the FILE name so I can save it correctly.
Reply "ready" and I will send the first item.
\`\`\`

## Step 2 — send the items below, one message each

Check every result before saving. Image models put logos and text on clothing
constantly, even when told not to. A small chest mark, a waistband word or a
sign in the background is the usual failure — regenerate rather than keep it.

Work in part order. Part 1 is what a buyer looks at when deciding whether AHM
makes their product; parts 4 and 5 are atmosphere.

## Step 3 — when images are saved

Save each file at the exact **FILE** path given, then:

\`\`\`bash
npm run photos          # web derivatives for product photography
npm run images:build    # everything else
npm run assets          # reindex, generate blur placeholders
npm run images:gaps     # must still report 0
npm run brief           # regenerate this file — the list shrinks
\`\`\`

---

# PART 1 — ARTICLE PHOTOGRAPHS (${part1.length})

The garment a product page names, on white. **Do these first** — this is what a
buyer looks at when deciding whether AHM makes their product.

${section(part1, "garment")}---

# PART 2 — PRODUCTION SAMPLES (${part2.length})

Same treatment as part 1. These fill the "Photographed from production"
galleries, which went quiet when the customer-branded set was withdrawn.

${section(part2, "garment")}---

# PART 3 — PRODUCT VIEWS AND CONSTRUCTION DETAILS (${part3.length})

Back views, alternate colourways, and close-ups of how a garment is made. The
macros use their own rule set — a pocket bar-tack cannot also be a flat lay.

${section(part3, "garment")}---

# PART 4 — INDUSTRY ENVIRONMENTS (${part4.length})

Uniforms being worn, by sector. People are the point here, so the rule is how to
frame them rather than to exclude them: no recognisable face, and every garment
in shot plain.

**These are illustrations, not evidence.** They show a kind of workplace. They
must never be captioned as a real customer, a real site or a real order.

${section(part4, "people")}---

# PART 5 — FACILITY AND PROCESS (${part5.length})

Places and processes.

**Illustrations, not evidence** — as above. Not a photograph of a real facility,
a real shipment or a real production run.

${section(part5, "facility")}`;

fs.writeFileSync(path.join(root, "IMAGE-GENERATION.md"), doc);
for (const stale of ["image-brief.md", "image-prompts.txt"]) {
  const f = path.join(root, stale);
  if (fs.existsSync(f)) fs.unlinkSync(f);
}
console.log(
  `IMAGE-GENERATION.md — ${n} prompts: ${part1.length} articles, ${part2.length} samples, ` +
    `${part3.length} product views, ${part4.length} environments, ${part5.length} facility`,
);
