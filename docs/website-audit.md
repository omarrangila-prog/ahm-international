# AHM INTERNATIONAL — WEBSITE AUDIT

Scored against the World-Class Website brief. 0–10 per category.
Measured from the codebase and the production build, not estimated.

Date: 2026-08-27 · 34 routes · 68 prerendered pages · build/typecheck/lint clean · 33 tests passing
Verified: 0 broken links · 0 horizontal overflow across 102 measurements · 2 SEO findings

**Weighted average: 8.7 / 10 → target 9.2**

---

## SCORECARD

| # | Category | Now | Target | Headline problem |
|---|---|---:|---:|---|
| 1 | Design | **9** | 9 | Hero photography now present; product leads, per §12 |
| 2 | Brand | 8 | 9 | Identity is consistent and original; logo is a vector redraw pending a real master |
| 3 | Credibility | **8** | 10 | Legal name, phone, WhatsApp, hours now published; **sales email and NTN outstanding** |
| 4 | Copy | 9 | 9 | Specific, technical, no filler. Meets §32/§33 |
| 5 | Homepage | 8 | 9 | All 15 sections present and correctly ordered |
| 6 | Products | **8** | 9 | 12 categories, 42 searchable articles; per-style galleries still need 6 shots each |
| 7 | Development | **9** | 9 | Route moved to `/development`; all 5 development photographs delivered |
| 8 | Quality | 9 | 9 | 9 gates each with a stop condition. Meets §24 exactly |
| 9 | Export | **9** | 9 | Process documented, both export photographs delivered |
| 10 | Conversion | 8 | 9 | 4 CTAs live; benchmark is a working configurator |
| 11 | SEO | 8 | 9 | 16 schema types, 2 findings sitewide; **landing-page URLs are nested** |
| 12 | Mobile | **9** | 9 | Sticky CTA, step forms, **overflow measured at 320/375/430 — none** |
| 13 | Tablet | **9** | 9 | 768/1024 measured, no overflow; grids correctly tiered; image `sizes` corrected |
| 14 | Accessibility | 9 | 9 | axe-clean, keyboard verified, reduced-motion respected |
| 15 | Performance | **9** | 9 | First-load image payload **196 KB** (one preloaded hero); 26 images deferred |
| 16 | Engineering | 9 | 9 | Typed, tested, derived data, no fake backend |

---

## 1 · DESIGN — 8 → 9

**Problem.** The hero is typographically excellent and visually empty: the H1 carries the
weight because `hero.sewing` has no file. Brief §12 says "Product must be the hero."

**Why it matters.** A sourcing director judges a manufacturer on whether they can see
the product. Type alone reads as a brand consultancy, not a factory.

**Fix.** Blocked on photography, not code — the slot, the responsive sizing and the
LCP priority handling are already built. Supply `hero-sewing-01.webp` and it appears.

## 2 · BRAND — 8 → 9

**Problem.** Consistent zoned palette and type system, original rather than templated.
The logo is a vector redraw because the supplied rasters crop the wordmark mid-letter.

**Fix.** Commission a vector master. Rasters archived in `assets-master/brand/`.

## 3 · CREDIBILITY — 8 → 10 ← **the one that matters**

**Published since the first audit:** registered legal name (also in `Organization`
schema), phone with a working `tel:` link, WhatsApp with a `wa.me` link, and business
hours carrying the UTC+5 offset — because buyers sit 8–12 hours behind Karachi and a
next-day reply otherwise reads as being ignored.

**Added this pass — the part that needs no new facts.** A *Verification* section on
`/about` telling a buyer how to check AHM without AHM's cooperation: request the
registration documents, check the TDAP exporter register, request a physical sample,
nominate their own inspection agency, and ask what any claim rests on. Competitor
research found sites publishing "10,000 Skilled Team Members" and "8000 Satisfied
Clients" with no evidence and certification logos with no certificate numbers. Inviting
the check is the opposite move, and no competitor site examined makes it.

**Still outstanding — the last two:**

1. **Sales email.** The last Tier-1 gap. US and European buyers will not place a first
   call across a 10-hour offset; email is how international sourcing actually opens.
2. **NTN / registration number.** The only fact on the site a buyer could confirm without
   contacting AHM. That is what separates a 9 from a 10.

**Why it matters.** Brief §5: the site must not feel like "a small local garment company
trying to look international." Nothing signals that faster than a manufacturer with no
findable address. A procurement director does not file a complaint; they close the tab.

**Fix.** Business action, not engineering. Confirm the four facts, set `verified: true`.
One line each. **This single change moves the site further than every other item combined.**

## 4 · COPY — 9 → 9

No "world-class", no "trusted partner", no "we deliver excellence" anywhere — grep-verified.
Copy is specific and technical throughout. International English, no regional business idiom.
**Preserve as-is.**

## 5 · HOMEPAGE — 8 → 9

All fifteen sections exist and now run in the brief's narrative order: positioning →
buyer problem → products → development → manufacturing → quality → evidence →
case study → export → CTA. Held back only by the missing hero image.

## 6 · PRODUCTS — 7 → 9

**Problem.** 12 categories with 42 searchable articles and working facet filters, but no
per-style detail page with the FRONT/BACK/MODEL/DETAIL/FABRIC/APPLICATION gallery of §17.

**Why it matters.** §17 is where a professional buyer decides whether to send a tech pack.

**Fix.** Needs six photographs per style. Shipping the tabs now yields six tabs with five
blank, which reads as broken rather than rich. Deferred deliberately, not overlooked.

## 7 · DEVELOPMENT — 7 → 9

**Problem.** Route is `/product-development`; brief §19 specifies `/development`.
Content covers the 11 stages but the five development photographs are absent.

**Fix.** Route aliased this pass. Photography outstanding.

## 8 · QUALITY — 9 → 9

Nine gates, each with purpose, checks, the record produced, and **what a failure stops**.
That last field is what §24 asks for and what most competitor sites omit. **Preserve.**

## 9 · EXPORT — 8 → 9

Packing, carton marking, documentation and FOB handover documented. Makes no claim to
owning logistics infrastructure, per §27. Missing the two export photographs.

## 10 · CONVERSION — 8 → 9

All four CTAs live and consistently worded. Benchmark is a working configurator that
carries selections into the RFQ, so the buyer arrives pre-filled. Never estimates a price.

## 11 · SEO — 8 → 9

**Problem.** The five sourcing pillars sit at `/sourcing/apparel-manufacturer-pakistan`.
Brief §38 wants keyword-first root URLs: `/apparel-manufacturer-pakistan`.

**Why it matters.** Shorter, keyword-leading URLs are marginally stronger and materially
more quotable in outbound sales.

**Fix.** Moved to root this pass, with permanent redirects from the old paths.
The three additional slugs in §38 are **not** created — without distinct content they
would be the thin duplicate pages §38 itself forbids.

## 12 · MOBILE — 9 → 9

Sticky benchmark CTA, step-by-step RFQ, large controls. Horizontal overflow **measured**
rather than assumed: 17 pages at 320, 375 and 430 px, zero overflow. The harness was
validated against a deliberate 2000px element first, so a pass means something.
**Preserve.**

## 13 · TABLET — 9 → 9

**Measured:** no overflow at 768 or 1024 on any of 17 pages.

**Correction to an earlier draft of this audit.** It claimed the product grid "drops to
two columns where three would fit at 1024". That was wrong: `lg` is Tailwind's default
1024px and this project overrides only `xs`, so `lg:grid-cols-3` applies at exactly 1024.
The grids are correctly tiered — 1 column, 2 at 640, 3 at 1024.

**What checking it did surface,** and this one was real: the `sizes` attributes did not
match those breakpoints. `SIZES.third` claimed 100vw up to 768 and 50vw up to 1280, while
the grid is 2-up from 640 and 3-up from 1024. That over-fetched in two bands — most
significantly a **2x over-fetch across the entire 640–768 large-phone range**. Both
`third` and `quarter` now mirror the real grid. Fixed.

**Remaining:** navigation switches to the mobile menu at `lg`, so a 768 tablet gets the
mobile nav. Defensible at that width, but worth a look if tablet traffic is material.

## 14 · ACCESSIBILITY — 9 → 9

axe-clean. Real keyboard traversal verified (22/22 focus rings). Semantic headings, visible
focus, reduced-motion honoured, screen-reader form errors. **Preserve.**

## 15 · PERFORMANCE — 8 → 9

No animation library; motion is CSS from one IntersectionObserver. Every route static.
Root `loading.tsx` deliberately absent — adding one measured **CLS 0.284 and −17 points.**
Score is capped by absent imagery, not by code.

## 16 · ENGINEERING — 9 → 9

TypeScript strict, App Router, server components by default, derived data (catalogue and
facets computed, never restated), 33 tests with zero added dependencies, no fake backend.
**Preserve.**

---

## OUT OF SCOPE — REMOVED THIS PASS

The brief rules out a buyer portal. One had been built under the previous brief and has
been **deleted**: `app/portal/`, `data/portal-demo.ts`, `DevelopmentCabinet`, its tests and
its robots rule. Its demo project data also conflicted with §65 (no fake data in production).

The private showroom (`/showroom/[token]`) is **kept**: it is an outbound sales surface for
public-facing selling, not an internal system. It is tokenised, timing-safe, noindex and
robots-disallowed. Say the word if you want it removed too.

---

## PRIORITY

1. **The four contact facts.** Credibility 4 → 9. Minutes of work.
2. **Seven factory + five development photographs.** Design, products, development, performance.
3. **Second and third case study.** Credibility beyond the single verified apron program.
4. **Per-style product pages** once photography allows.
5. **Tablet pass** at 768 and 1024.


---

## VERIFIED THIS PASS

Not asserted — measured, with the harness validated before the results were trusted.

| Check | Method | Result |
|---|---|---|
| Horizontal overflow (§43) | Headless Chromium, same-origin `srcdoc` frame, 17 pages × 6 widths | **0 of 102** |
| Harness validity | Deliberate 2000px element | Caught at all 6 widths |
| Broken internal links (§62) | `npm run links` against built HTML | **0 of 68 pages** |
| Redirects | Live HTTP | `/sourcing/*` and `/product-development` → 308 |
| Banned marketing copy (§32) | grep across served HTML | **0** |
| Placeholder content (§65) | grep for lorem/TODO/test@/example.com | **0** |
| `undefined` / `NaN` in rendered text | Text-content scan, 6 pages | **0** |
| SEO (§64) | `npm run reports` on built HTML | 2 findings, both `/_global-error` |
| Images | `npm run images:audit` | **0 FAIL** |
| Route-transition logic | `npm test` — order-of-operations assertions | 4 tests, passing |

### Defects found and fixed during verification

| Defect | Cause | Status |
|---|---|---|
| `/manufacturing/development` → 404 on 2 pages | A bulk path rename corrupted `/manufacturing/product-development` | Fixed |
| 404 title read `Page not found \| AHM International \| AHM International` | Supplied the suffix that the root layout template already appends | Fixed |
| 16 internal links still pointing at `/sourcing/*` | First grep only checked JSX `href=`, missing object properties | Fixed |
| Dead breadcrumb branch in `SourcingPillar` | Left behind when the dynamic route was deleted | Removed |
| Hero badge ran a perpetual float **and** a pinging dot above the fold | Both violate §46's ban on constant floating; the pulse also implies live status, which it is not | Both removed, dead CSS deleted |
| `SIZES.third` / `.quarter` over-fetched in two bands | Breakpoints were 768/1280; the grids are 640/1024 | Fixed |
| Audit claimed the product grid was 2-up at 1024 | Wrong — `lg` is 1024, so it is 3-up | Claim corrected above |


---

## PHOTOGRAPHY DELIVERED — 2026-08-27

All 19 blocking image slots filled. `npm run images:missing` now reports
**0 leave a visible gap**, down from 19.

| Check | Result |
|---|---|
| Slots filled | 19 / 19 |
| Image audit | 245 PASS · 1 WARNING · **0 FAIL** |
| First-load image payload | **196 KB** — a single preloaded hero |
| Images deferred to lazy | 26 |
| Hero weight | 178 KB against a 350 KB budget |

**Handled during integration:**

- An unoptimised copy of the whole pack had been placed inside `public/assets/`,
  where it would have shipped to every visitor at full weight alongside the
  optimised versions. Removed.
- Three files blew their byte budget — two case-study fabric textures and a swatch
  card. Dense weave detail is high-frequency everywhere, so the encoder has nothing
  flat to save on. Given per-file quality overrides rather than lowering the global
  setting, which would have softened every clean product render to fix three textiles.
- 31 now-redundant `.PLACEHOLDER.txt` files removed.

The remaining single warning (`export/cartons.webp`, 17 KB against a 20 KB floor) is
pre-existing — a synthetic crop from a packaging photograph, not part of this pack.

**Not verified:** whether the imagery reads as authentic to a sourcing director. It was
generated rather than photographed, which was flagged before delivery and proceeded with.
The factory set is the imagery a buyer scrutinises hardest.
