# Final audit and fixes, 11 October 2026

Against the brief "AHM International — Final 10/10 website transformation".
Branch `final-audit-2026-10`, off `main` at 9ea46b2 (what is live). Earlier
rounds are in `upgrade-2026-10.md`; this one started from the live site and
re-checked everything the brief lists rather than trusting that record.

The headline is not a design change. Every garment image on the site is
AI-generated, and the product pages called them "Photographed from production".
That, and the mailbox password that has failed since go-live, outweigh
everything else here.

---

## 1. The ten issues the brief asked about

| # | Question | Status | Evidence |
|---|---|---|---|
| 1 | Is "What this site does not claim" still prominent on the homepage? | **Resolved** | Not on the live homepage; section 06 is "Built on verifiable manufacturing experience", strengths first. The list lives on /verification. |
| 2 | Does /manufacturing-network distinguish AHM's factory from partners? | **Resolved**, labels sharpened | Two equal panels; now headed "AHM-Owned Manufacturing" and "Partner Manufacturing Facilities", with an attributed photo gallery ready for each. |
| 3 | Are real factory photographs available and correctly identified? | **Still open** | None supplied. Generated factory scenes were withdrawn in round 1; two more generated close-ups withdrawn now (§2). |
| 4 | Is "Chef Beanie" still under aprons? | **Resolved** | Absent from live /products/aprons; `tests/taxonomy.test.ts` holds it. |
| 5 | Do product pages use genuine photographs and useful specifications? | **Partially resolved** | Specifications are useful and sourced. The photographs are not genuine: all 24 are generated (§2). Now labelled. |
| 6 | Are new verified case studies available? | **Still open** | One documented program. More need customer permission. Nothing invented. |
| 7 | Does the RFQ process store enquiries and send emails? | **Partially resolved** | Stores: yes, in the private register. Sends: **no.** Hostinger refuses `SMTP_PASS` with `535 authentication failed`, five times in the production log between 13:18 and 13:38 today. No buyer RFQ has been submitted since go-live, so none is lost. |
| 8 | Does the old Vercel URL redirect? | **Resolved** | `ahm-international.vercel.app` and `ahm-international-sk7y.vercel.app` both 308 to the same path on www, query kept. HTTP → HTTPS is 308. The bare domain → www is **307**, not 308: a Vercel setting. |
| 9 | Are email, phone and WhatsApp consistent? | **Resolved** | 14 live pages: one email (124 occurrences), one phone, one WhatsApp number. |
| 10 | Is the site mobile-friendly and accessible? | **Resolved** | Lighthouse accessibility 100 on every route measured; audit sweep in §5. |

---

## 2. What was found and fixed

### Critical

**C1. Every garment image is generated, and was presented as a photograph.**
The 24 images in the "Photographed from production" galleries were built from
masters that share every filename with
`asset-pack/AHM_All_Individual_Generated_Product_Images/` (ten byte-identical).
That folder's README says it holds generated product images and excludes "raw
camera originals". The 39 branded files held back are the same. With the
prompt-backed renders and fabric macros, 38 published images are generated and
none is a photograph. A garbled neck label ("ENYORE") on the orange work vest
is the visible tell. A buyer judging construction from these was judging a
picture of nothing that was sewn.

Fixed by labelling, not deleting:

- `data/generated-images.json` records 55 generated files by content hash, with
  the evidence for each. `npm run assets` marks any published file whose
  contents match, wherever it sits.
- `SmartImage` prints "AI illustration" on every generated image it renders.
  The hero lay-down, which bypasses it, ends its list "AI illustrations, not
  photographs".
- The gallery heading becomes "Styles in this category" with "AI illustrations
  … not photographs. Ask for photographs or a physical sample." The footer and
  the terms say the same. All three go back to "photographed" by themselves
  once no generated file is published.
- 64 alt texts lose "Photographed production sample"; three fabric macros lose
  "Macro photograph".

**C2. Two generated close-ups were captioned as the documented program.**
"Construction detail from the apron program" and "the 65/35 poly-cotton fabric
used in the apron program" on /case-studies were generated from prompts of the
same names. Withdrawn to `asset-pack/generated-hold/`. The homepage's
"Documented" badge sat on the generated apron; it now sits on the text.

**C3. The terms said the opposite of the truth.** "Photographs show articles
manufactured to buyer specification … This site does not publish illustrations
… of garments." Now generated from the manifest (`imagerySection`).

**C4. Overlapping writes to one register document could fail.** Firing twenty
PIN attempts at one counter showed the store reports an overlapping write as a
generic "conflicting operation" error, which was not retried. Two enquiries
landing together could have failed the index update the same way. Retried now
(fixed in PR #2, already live).

### High

| # | Finding | Fix |
|---|---|---|
| H1 | Bib apron image shows one pocket divided in two; alt text, hero caption and case study said "three-pocket" | Alt text describes what is shown. The product name is left for the owner to confirm. |
| H2 | No way to see the facility even once photographs exist, and no attribution model for them | Attributed gallery (§3) |
| H3 | Lighthouse: the hero section's LCP waited 1.3–1.5 s for the weave texture, discovered only after the CSS | Preloaded from the root layout (§4) |
| H4 | WhatsApp opened an empty chat; after an RFQ the buyer had to retype the reference | Prefilled with the page, or the reference |
| H5 | WhatsApp was on 2 of 14 pages; footer contact clicks were not measured | Footer WhatsApp on every page; email, phone, WhatsApp clicks report `location` |

### Medium

| # | Finding | Fix |
|---|---|---|
| M1 | Apron article cards had no quote link | "Request quote" per article, style pre-filled (`?style=` now read by the form) |
| M2 | No construction callouts | Three numbered points on the bib apron (strap slider, divided pocket, waist ties), only what the image shows; bar-tacks named as not shown |
| M3 | Benchmark section wording | "Already sourcing aprons? Let us benchmark your current style." with "Benchmark my style" |
| M4 | Case-study CTA | "Discuss a similar manufacturing program", pre-filled to aprons with the source |
| M5 | Hero sentence did not name aprons, the flagship | The brief's sentence |
| M6 | Register reports stopped at "qualified"; conversion rates were screen-reader-only | Five conversion steps with their counts; every country, product and source carried to quoted and won |
| M7 | Image-less article card stretched to its neighbour's height, reading as a broken frame | Cards size to content |
| M8 | Footer email broke mid-word ("…internationals.c / om") | Contact spans the row at desktop |
| M9 | Shot list counted generated images as "in place" | Listed as "generated, wants a photograph" (47 slots) |

### Checked and left alone

- Hero, trust section, verification document request, Chef Beanie, contact
  consistency, Search Console verification support (`NEXT_PUBLIC_GSC_VERIFICATION`)
  and the analytics event set were already what the brief asks for.
- zod and framer-motion appear as "unused JavaScript" on the homepage. They are
  Next's low-priority prefetches for linked routes, fetched after load and never
  run there. Left as is.

---

## 3. The facility gallery

`/manufacturing-network` renders a gallery under each heading as soon as a
photograph exists at `public/assets/facility/own/<slot>.webp` or
`facility/partner/<slot>.webp`: cutting, stitching, reinforcement, inspection,
sampling, packing; partner floor, process, inspection. The directory is the
attribution. A generated file is never shown there, labelled or not.

Tested by placing a real texture file in an "own" slot and a generated image in
a "partner" slot on the dev server: the first appeared captioned "Cutting ·
AHM-owned manufacturing", the second did not appear, the enlarged view opened
as a named dialog keeping the attribution, Escape and Close shut it, and focus
returned to the thumbnail. Both files were then removed.

---

## 4. Performance

Lab and field are reported separately, as the brief asks. There is **no field
data**: the domain is too new to appear in the Chrome UX Report, and the
PageSpeed API quota was exhausted, so Lighthouse 12.6.1 ran locally with its
default mobile profile.

**Live site before this branch** (over the network):

| Route | Performance | Accessibility | Best practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| / | 76 | 100 | 100 | 100 | 3.3 s | 580 ms | 0 |
| /products/aprons | 87 | 100 | 100 | 100 | 3.0 s | 320 ms | 0 |
| /request-a-quote | 83 | 100 | 96 | 100 | 3.2 s | 420 ms | 0 |
| /manufacturing-network | 86 | 100 | 100 | 100 | 2.8 s | 390 ms | 0.009 |

**The preload, isolated** (same build with and without it, localhost, two runs):

| Route | LCP without → with | Performance without → with | LCP load delay |
|---|---|---|---|
| / | 3.8–3.9 → 3.3–3.6 s | 85–86 → 87 | 1.1–1.4 s → 0–0.04 s |
| /products/aprons | 3.7–3.8 → 3.6 s | 83 → 82–88 | 1.1–1.2 s → 0.04–0.1 s |
| /request-a-quote | 3.7–3.8 → 3.0–3.2 s | 84 → 89–90 | 1.4 s → 0.02–0.2 s |
| /manufacturing-network | 3.5 → 3.4 s | 88–90 → 91 | 1.0–1.2 s → 0.1 s |

Unthrottled, LCP equals first paint, about 0.4–0.5 s locally. The simulated
3+ s is Lighthouse charging every script that ran before that paint at four
times the CPU; the homepage is a 267 kB document of 1,572 elements whose parse
and layout is one 0.5 s task on that profile. **The brief's targets (LCP ≤ 2.5 s
lab, performance 90+) are not met on the homepage.** The next step is a smaller
document, which means restructuring the homepage, and was not attempted in a
round whose instruction was not to redesign. Re-measure the live site after
merging; the network adds to every figure above.

---

## 5. Tests and audits

On the branch:

| Check | Result |
|---|---|
| Unit and invariant tests | 162 pass (7 new in `tests/provenance.test.ts`, 1 new and 1 extended in `tests/pipeline.test.ts`) |
| Typecheck, lint | Clean |
| Production build | Succeeds; preload tag present in the HTML |
| Internal links (`links`) | 88 pages, none broken |
| SEO (`audit`, `seo:deep`) | Pass, nothing found |
| Empty image frames (`images:gaps`) | 0 across 86 routes |
| Contrast (WCAG AA, rendered, parses oklab) | No text below AA; includes the new "AI illustration" labels |
| Target size (WCAG 2.2 SC 2.5.8) | No failures, 4 viewports × 12 routes |
| axe-core WCAG 2.2 AA | No violations, 21 routes × 2 widths |
| Responsive | No defects, 12 viewports × 22 routes (264 loads) |
| Runtime console | No uncaught exceptions, console errors or failed requests, 86 routes |
| RFQ outcome (production build, storage and mail off) | "One more step" with reference; WhatsApp link pre-filled with that reference; footer link names the page; no page errors |
| Register reports (production build, PIN, throwaway store) | Conversion block renders above the paired panels; namespace deleted after |
| Facility gallery (browser, dev server) | 6/6 |
| Construction callouts | Screenshots at 1280 and 390; markers on the strap slider, pocket and tie |
| Register writes under contention (real store, throwaway namespace; PR #2, already live) | 20 parallel attempts: limit held exactly, no error |

Not tested, because it needs the owner: delivery to the real mailbox (the
password is wrong), and GA4 data (no measurement ID).

---

## 6. Scorecard

The brief's weights. "Live" is the site as deployed this morning, scored with
what this audit found; it is lower than round 2's 82 in `upgrade-2026-10.md`
because that score assumed the product images were photographs and the mailbox
worked. "Branch" is this branch merged. "With owner items" assumes §7 is done.

| Category | Weight | Live | Branch | With owner items | What holds it back |
|---|---:|---:|---:|---:|---|
| Manufacturing credibility and authenticity | 20 | 12 | 15 | 19 | No photograph of anything AHM made or owns; no NTN or certifications on record. Honest labelling stops the images costing trust; it cannot make them evidence. |
| Buyer inquiry and conversion | 20 | 14 | 16 | 19 | Notifications fail until `SMTP_PASS` is right. Enquiries are recorded and readable through the PIN. |
| Premium design and branding | 15 | 11 | 12 | 14 | A manufacturer's site without its own floor on it cannot reach the top band. |
| Products and technical presentation | 15 | 10 | 12 | 14 | Detail shots and real samples; the "three-pocket" question. |
| SEO and search readiness | 10 | 9 | 9 | 10 | Bare domain 307; Search Console not connected. |
| Performance and reliability | 10 | 7 | 8 | 8 | Lab LCP above 2.5 s on the homepage (§4). Branch score rests on the local A/B and the write-conflict fix; re-measure live. |
| Mobile and accessibility | 10 | 9 | 9 | 10 | Every sweep clean (§5). The last point is the real-photograph alt text and a check on real devices, which no sweep replaces. |
| **Total** | **100** | **72** | **81** | **94** | |

100 is not available from code. Every point between "Branch" and "With owner
items" is a password, a setting, a document or a photograph.

---

## 7. What only the owner can do

In order:

1. **Fix the mailbox password.** `npm run mail:check` tests it at a hidden
   prompt without sending anything; then `vercel env add SMTP_PASS production
   --sensitive --force` and redeploy. Until then no RFQ reaches the inbox; open
   `/pipeline` with the PIN to read them.
2. **Send the camera originals of the product samples.** Same filenames into
   `assets-master/product-photography/`, then `npm run photos`; the labels go by
   themselves. And say whether the bib apron is three-pocket.
3. **Photograph the facility** for the `facility/own/` slots, and a partner's
   with its permission for `facility/partner/`. The shot list is in
   `assets-needed.md`.
4. **Vercel → Domains → `ahminternationals.com` → Edit → 308 Permanent.**
5. NTN, street address, certifications with numbers, which families are made
   where (`docs/what-you-need-to-supply.md` §4).
6. GA4 measurement ID; Search Console (DNS TXT at Hostinger, or the meta tag
   via `NEXT_PUBLIC_GSC_VERIFICATION`, which does not touch DNS); then submit
   both sitemaps.
7. A second case study, with the customer's permission.

Not done, deliberately: downloadable PDF profile and capability sheets. Every
page already prints cleanly (print mode), and a designed PDF built today would
be a document of AI illustrations and "available on request". Build it after
items 2, 3 and 5.

---

## 8. Deployment and rollback

- **Deploy:** review the Vercel preview of `final-audit-2026-10`, then merge
  the pull request; production deploys from `main`.
- **Check after deploy:** a product page shows "AI illustration" labels and
  "Styles in this category"; /terms "Product imagery" says AI-generated;
  /manufacturing-network headings; footer WhatsApp opens a prefilled chat;
  Lighthouse on `/` and `/request-a-quote` against §4.
- **Roll back:** Vercel → Deployments → previous production → Promote. Or
  revert the merge commit. The withdrawn case-study images are restored with
  `git mv` from `asset-pack/generated-hold/` and `npm run assets`, and would be
  labelled on return.
