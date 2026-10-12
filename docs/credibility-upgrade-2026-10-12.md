# Credibility and conversion upgrade — 12 October 2026

Branch `provenance-tiers`. Follows the 11 October audit (`docs/final-audit-2026-10-11.md`).

## The short version

The brief's correction was that AHM's products are real and its images are
AI-enhanced photographs, so labelling them "AI illustration" undersold genuine
work. The site now labels each file by its own record instead of one blanket
phrase. Every file can move up to "Actual product · enhanced" the day its
camera original is supplied.

What the files on disk show today does not support relabelling any of them yet:

- The 24 product-gallery images come from a folder whose README says the images
  are "individually generated" and that "raw camera originals were excluded".
  Ten carry a signed OpenAI content credential (C2PA): software gpt-image,
  action `c2pa.created`, source type `trainedAlgorithmicMedia`, no input image
  recorded. The other 14 have no credential.
- The 28 files in `assets-master/product-photography-original/` carry the same
  "created" credential, despite the folder name.
- The fabric texture library's README says its contents are "generated visual
  texture references". Four fabric macros and the background weave came from
  it and had not been labelled. They are now.
- No camera EXIF was found on any image in the AHM folders.
- No AHM footage exists on this machine. All 27 videos in the home directory
  were checked frame by frame: TV clips, personal recordings and software
  demos. None shows AHM production.

The credential cannot prove that no photograph was involved: an image model
given a photograph also writes "created". It does mean the files alone cannot
show which garments were photographed, and the brief's own rule applies: "If
the edit materially changes the depicted fabric, construction, appearance…
treat it as illustrative unless it can be verified as representative." The
asset pack's README warns that some generations "may not preserve logos, text,
collar/placket details, or garment construction perfectly".

So the work done is: precise labels instead of a blanket one; a measured path
that upgrades a file the moment its original is supplied; film and portfolio
systems ready for real footage and photographs; and the defensive copy
rewritten.

## Media inventory

Mapped to the brief's five classes:

| Brief's class | Published | Site mark |
|---|---|---|
| Original photograph | 0 | none |
| AI-enhanced original photograph | 0 (none verifiable yet) | Actual product · enhanced |
| Original video with AI post-production | 0 (no footage exists) | Actual footage · enhanced |
| Representative or digitally composed illustration | 43 | AI render |
| Fully synthetic concept visual | 0 published; 17 withdrawn in `asset-pack/generated-hold/` | not published |

"Representative render" is a further class for a file that was paired with its
original, changed too much to call enhanced, and was confirmed as the same
article by a named reviewer.

Every published file, with the evidence for its class (full evidence text in
`data/generated-images.json`):

| File | Evidence |
|---|---|
| `development/fabric-swatches.webp` | AI-generated: generation prompt on file |
| `export/carton-marking.webp` | AI-generated: generation prompt on file |
| `export/cartons.webp` | AI-generated: generation prompt on file |
| `fabrics/canvas.webp` | AI-generated: texture library README |
| `fabrics/cotton-pique.webp` | AI-generated: generation prompt on file |
| `fabrics/fleece.webp` | AI-generated: generation prompt on file |
| `fabrics/mesh.webp` | AI-generated: texture library README |
| `fabrics/polycotton-twill.webp` | AI-generated: generation prompt on file |
| `fabrics/polyester-performance.webp` | AI-generated: generation prompt on file |
| `fabrics/rib.webp` | AI-generated: texture library README |
| `fabrics/single-jersey.webp` | AI-generated: texture library README |
| `fabrics/softshell.webp` | AI-generated: generation prompt on file |
| `fabrics/woven.webp` | AI-generated: generation prompt on file |
| `products/aprons/apron-black-front.webp` | AI-generated: generation prompt on file |
| `products/aprons/apron-fabric-macro.webp` | AI-generated: generation prompt on file |
| `products/fleece/fleece-fabric-macro.webp` | AI-generated: generation prompt on file |
| `products/photography/denim-utility-jacket.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/henley-green.webp` | AI-generated: asset-pack README |
| `products/photography/henley-navy.webp` | AI-generated: asset-pack README |
| `products/photography/henley-tee-navy.webp` | AI-generated: asset-pack README |
| `products/photography/henley-waffle-navy.webp` | AI-generated: asset-pack README |
| `products/photography/hoodie-navy-alt.webp` | AI-generated: asset-pack README |
| `products/photography/hoodie-navy.webp` | AI-generated: asset-pack README |
| `products/photography/lounge-pant-grid.webp` | AI-generated: asset-pack README |
| `products/photography/pant-camo.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/polo-dress-navy.webp` | AI-generated: asset-pack README |
| `products/photography/polo-taupe-long-sleeve.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/polo-yellow.webp` | AI-generated: asset-pack README |
| `products/photography/scarf-camel.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/scarf-herringbone.webp` | AI-generated: asset-pack README |
| `products/photography/scarf-navy-looped.webp` | AI-generated: asset-pack README |
| `products/photography/scarf-navy.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/scarf-plaid-maroon.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/scarf-plaid-olive.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/thermal-sage-alt.webp` | AI-generated: asset-pack README |
| `products/photography/thermal-sage.webp` | AI-generated: asset-pack README |
| `products/photography/utility-bomber-charcoal.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/work-vest-orange.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/zip-hoodie-grey.webp` | AI-generated: signed C2PA credential (gpt-image, "created") |
| `products/photography/zip-hoodie-navy.webp` | AI-generated: asset-pack README |
| `products/polos/polo-fabric-macro.webp` | AI-generated: generation prompt on file |
| `products/tshirts/tee-fabric-macro.webp` | AI-generated: generation prompt on file |
| `texture/weave.webp` | AI-generated: texture library README |

Withdrawn and never to be republished as photographs: the 15 generated
"operations" scenes and the 2 case-study close-ups (`asset-pack/generated-hold/`),
plus 39 client-branded generations (`asset-pack/client-branded-hold/`).

## What changed

**Labels, precise and per file**
- `lib/provenance.ts` holds one vocabulary: "AI render", "Representative
  render", "Actual product · enhanced", "Actual facility · enhanced", "Actual
  footage · enhanced". The brief's sentences ("Actual product — digitally
  enhanced photography.", "Actual manufacturing footage — professionally
  enhanced.") are each mark's tooltip and caption.
- The class comes from the manifest, never from a component. A file in
  `data/verified-originals.json` outranks the generated list.
- On 86 pages "AI illustration" appeared 306 times and "not a photograph" 97
  times, 86 of them from the footer. Now: no "AI illustration", 3 "not a
  photograph" (terms and the legend). Each image keeps its own short mark,
  because a screenshot travels without the page around it.
- The footer's disclaimer is replaced by a link, "How images are labelled", to
  a new legend on /verification.
- The apron construction note, the gallery heading and the terms' imagery
  section derive their wording from the image's class, so none can go stale
  when a file is upgraded.

**The upgrade path: `npm run provenance:pair`**
- Refuses an "original" whose content credential says it was generated.
- Compares the published image with the original (luma SSIM, 256px). At 0.85
  or above the file is recorded as enhanced. Calibrated on the 24 gallery
  images: a retouched copy scored 0.975, a re-drawn one 0.577, the two closest
  different garments 0.775.
- Below the bar it refuses and explains. A reviewer who has compared the two
  can record "Representative render" under their own name.
- Originals are kept privately in `assets-master/originals/`, never committed
  or deployed. Only hashes enter the public repository.
- Tested end to end. Results:
  - The tool refused an AI master as an original.
  - It recorded a retouched copy as enhanced.
  - It refused a re-drawn copy.

**Films: `npm run film:build`**
- Three slots, placed on the homepage, /manufacturing, /quality and
  /products/aprons. Each renders nothing until it holds footage recorded as
  footage. A stock or generated clip dropped into the folder never plays.
- Encoding:
  - H.264 at up to 1280 px, with no audio track and faststart.
  - A VP9 fallback.
  - A WebP poster.
  - A 4 MB budget warning.
- Player behaviour:
  - Plays only while on screen.
  - Under reduced motion or Save-Data, shows the poster with a play button.
  - Always has a pause button (WCAG 2.2.2).
- Tested in a browser with a throwaway clip, which was then deleted:
  - It autoplayed in view.
  - Pause worked.
  - It stayed still under reduced motion.
  - It played on request.

**Portfolio: /our-work**
- Built from catalogue articles whose image is a photograph or enhanced, with
  construction, fabric and customisation from the category data and a
  per-style quote link.
- Returns 404 and stays out of the sitemap until the first article qualifies.
  It does today.

**Confident wording, same facts**
- /about: "NOT PUBLISHED" ×6 → "On request". Values reworded, e.g.
  "Registration documents shared on request".
- /verification: "What this site does not claim." → "Standard claims, answered
  directly." The four positions are rewritten as answers.
- /apparel-manufacturer-pakistan: the struck-through "What AHM does not claim"
  list → "Standard claims, answered".
- /manufacturing: "What we do and do not claim." → "How we work, in plain
  terms."
- /manufacturing-network: "Photographs of the facility are not published yet"
  removed, and "Which partner makes which article is not published" →
  "Ask where your order will be made…".
- /quality: dropped "…not a photograph of a factory floor."
- Product galleries: "AI illustrations… not photographs" → "Styles AHM makes in
  this category, shown as AI renders and marked on each image. Request a
  physical sample…".
- Kept on purpose, because each is a qualification a buyer needs:
  - hi-vis standards are nominated by the buyer;
  - recycled content only against mill documentation;
  - no local office in buyer markets;
  - the legal text.
- No new fact was asserted. Two rewrites that drifted into describing a
  process nobody has described were turned back into questions for the buyer
  (CLAUDE.md, "Do not replace a question with an invented process").

**Corrections found on the way**
- Four fabric macros and the weave ground are generated (texture library
  README) and were unlabelled. CLAUDE.md and the CSS called the weave "a real
  cotton-canvas macro".

## Verification

| Check | Result |
|---|---|
| Unit tests | 169 / 169 pass (162 before; 7 new: origin precedence and wording, pairing records, credential refusal, portfolio gating, film gate ×3) |
| Typecheck, lint | clean |
| Production build | passes |
| `links` | 89 pages, no broken links |
| `audit`, `seo:deep` | pass, nothing found |
| `images:gaps` | 0 empty frames across 86 routes |
| `contrast` | no text below WCAG AA, 86 routes |
| `targets` | no WCAG 2.5.8 failures |
| `a11y` (axe, 21 routes × 2 widths) | no violations |
| `responsive` (12 viewports × 22 routes) | no defects |
| `console` (86 routes) | no errors, exceptions or failed requests |

**Performance, same machine, main vs this branch (local production builds,
Lighthouse 12.6.1 mobile, homepage):**

| | Performance | LCP (simulated) | TBT | CLS |
|---|---|---|---|---|
| main | 78, 85, 88, 87 | 2.9–3.8 s | 140–710 ms | 0 |
| branch | 88, 86, 85 (one run errored) | 3.6–3.8 s | 170–200 ms | 0 |

Cold-load bytes (`npm run weight`): +1 to +2 kB of JavaScript per route, from
the shared label vocabulary reaching client components. Accessibility, best
practices and SEO were 100 in every run. The homepage is still below the 90 /
2.5 s target for the reason given on 11 October: document size, not this
work.

**Not verified: email delivery to info@ahminternationals.com.**
- `SMTP_PASS` in Vercel was last set 22 hours ago.
- Production logs for the last 48 hours show no mail activity at all, success
  or failure.
- No test enquiry was sent to production: fake enquiries in the live register
  are ruled out.
- Run `npm run mail:check` with the password in your own terminal. It sends
  nothing. Then submit one real test request marked TEST.

## Scorecard

Out of 10 on the brief's eleven criteria. "Before" is the live site (main,
after PR #4). "With owner items" assumes the inputs listed below.

| Criterion | Before | This branch | With owner items | What moves it |
|---|---|---|---|---|
| Premium visual consistency | 8 | 8.5 | 9 | shorter marks, no footer disclaimer; real photography |
| Real manufacturing credibility | 4 | 4.5 | 8.5 | camera originals, footage, facility photographs |
| Product presentation | 6.5 | 7 | 9 | paired originals; the portfolio opens |
| Buyer trust | 6 | 7 | 8.5 | answers instead of disclaimers; a public labelling legend |
| International B2B positioning | 8 | 8 | 8.5 | |
| Inquiry usability | 8 | 8 | 8.5 | per-style quote links in the portfolio |
| Mobile responsiveness | 9 | 9 | 9 | |
| Technical performance | 7 | 7 | 7 | needs a lighter homepage document |
| Accessibility | 9.5 | 9.5 | 9.5 | |
| SEO | 9 | 9 | 9 | |
| Operational reliability | 4 | 4 | 9 | a verified SMTP password |
| **Mean** | **7.2** | **7.5** | **8.7** | |

Not 10/10. Most of the remaining distance is evidence, and code cannot
produce evidence.

## Needs human verification

1. **Camera originals** of the 24 gallery garments, as the camera wrote them.
   For each: `npm run provenance:pair -- <original> <published path>`, then
   `npm run assets`. This is the single change that most affects credibility.
2. **Production footage** for the three film slots
   (`npm run film:build -- <file> <slot> [--enhanced]`).
3. **Facility photographs** for `public/assets/facility/own/` and
   `facility/partner/`. The galleries are already placed.
4. **Email delivery**: `npm run mail:check`, then one real test request.
5. **The bib apron**: sold as "Three-Pocket"; the image shows one divided
   pocket. Which is right?
6. **The fabric macros**: if AHM has photographs of its actual cloth, they
   replace the generated textures at the same paths.
7. **NTN, address, certifications**, unchanged from the 11 October list.

## Deploy and rollback

- Merge: `gh pr merge <n> --merge`. Vercel deploys main in about two minutes.
- Rollback: Vercel → Deployments → the previous production deployment →
  Promote, or `git revert -m 1 <merge commit>`.
- No environment variables, DNS or mail settings change.
