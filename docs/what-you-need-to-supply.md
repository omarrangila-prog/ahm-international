# WHAT YOU NEED TO SUPPLY

Everything the site is waiting on from the business. Nothing here can be written
in code — each item is a fact only AHM holds, or a photograph only AHM can take.

Generated from the codebase on 2026-08-27. Verified counts, not estimates.

---

## 1. PHOTOGRAPHS — 19 that leave a visible gap

**Correction to an earlier figure:** 62 placeholder files exist, but only **19**
are referenced by a component. The other 43 are slots nothing renders, or have a
working fallback. Shoot these 19 and every visible gap closes.

Briefs for each already exist in `IMAGE-PROMPTS.md`.

### Factory — 7 · `1600×900` · 30–250 KB
The most valuable set. These are what separate a real manufacturer from a trading company.

| File | What it shows |
|---|---|
| `factory/fabric-inspection.webp` | Roll on the inspection frame, operator checking |
| `factory/cutting.webp` | Lay spread, marker visible, cutting in progress |
| `factory/sewing.webp` | Line in operation, machines and operators |
| `factory/embroidery.webp` | Multi-head machine running |
| `factory/finishing.webp` | Pressing, trimming, final finishing |
| `factory/quality-control.webp` | Inspector measuring a garment against a spec sheet |
| `factory/packing.webp` | Folding, polybagging, carton packing |

### Development — 5 · `1600×900` · 30–250 KB
These carry the "development before production" argument, which is the site's core claim.

| File | What it shows |
|---|---|
| `development/tech-pack.webp` | Printed tech pack on a desk, marked up |
| `development/pattern.webp` | Paper or digital pattern pieces |
| `development/fabric-swatches.webp` | Swatch header cards fanned out |
| `development/trims.webp` | Trim card — buttons, zips, labels, cords |
| `development/measurement.webp` | Garment being measured, tape and spec sheet |

### Export — 2 · `1600×900`
| File | What it shows |
|---|---|
| `export/warehouse.webp` | Marked cartons stacked, ready to ship |
| `export/container-loading.webp` | Container being loaded |

### Case study — 3 · `1600×1600`
For the existing U.S. bib apron program. Anonymised — no customer mark visible.

| File | What it shows |
|---|---|
| `case-studies/uniform-apron-program/product.webp` | The apron, flat or on form |
| `case-studies/uniform-apron-program/fabric.webp` | 65/35 poly-cotton macro |
| `case-studies/uniform-apron-program/detail.webp` | Pocket, bar-tack or strap detail |

### Hero — 1 · `1920×1080` · 60–350 KB
| File | What it shows |
|---|---|
| `hero/hero-sewing-01.webp` | The homepage's primary image. Sewing line, wide, well lit |

### Product — 1 · `1600×1600`
| File | What it shows |
|---|---|
| `products/aprons/apron-black-front.webp` | Black bib apron, front, on white |

**How to add them:** drop files into `assets-master/`, run `npm run images:build`,
then `npm run images:audit`. No code change needed — the asset registry picks them
up automatically.

---

## 2. FACTS — 4 that block buyer trust

These render as **"Available on request"** today. The truth system is refusing to
publish them because they are marked `verified: false`, which is correct behaviour —
but to a procurement director an absent address is indistinguishable from a shell
company. **This is the single biggest barrier on the site.**

| Fact | Where it goes | What is needed |
|---|---|---|
| Legal entity name | `data/company.ts` → `legalName` | Registered name + registration/NTN number |
| Street address | `data/company.ts` → `streetAddress` | Full address, or confirm city-only is acceptable |
| Sales email | `.env` → `NEXT_PUBLIC_SALES_EMAIL` | Until set, the RFQ form is the only contact route |
| Phone | `.env` → `NEXT_PUBLIC_PHONE` | Enables call actions |

Optional, same mechanism: `whatsapp`, `businessHours`, `linkedin`, `instagram`.

**To publish one:** set the value *and* `verified: true`. Both are required —
that friction is deliberate.

---

## 3. FACTS — publish only with evidence

These stay hidden until documented. **Do not fill these in from memory.** A
procurement team checks, and one unsupported claim ends the relationship permanently.

| Field | Evidence required |
|---|---|
| `facilitySize` | A verified measurement |
| `employeeCount` | A verified headcount |
| `machineCount` | A verified machinery list |
| `monthlyCapacity` | Verified production records |
| `yearsInBusiness` | The registration date |
| `certifications` | The certificate itself. Currently an empty array — populating it publishes it |
| `publicCustomers` | **Written permission** from the customer |

`moq` and `leadTime` genuinely vary by article and should probably stay
per-project rather than being published at all.

---

## 4. SECTIONS — what more content unlocks

Nothing below is broken. Each is a section that exists in reduced form and would
grow with content.

| Need | Have | Unlocks |
|---|---|---|
| **Case studies** | **1** | The single best credibility lever left. Each needs: challenge, what was developed, material, construction, quality, packing, delivery, result — all anonymised. The engine is built; it just needs entries |
| **Technical guides** | **9 of 29 planned** | `/resources` groups them by category and shows the remaining backlog. Titles are not articles — padding the count with filler is what §39 forbids |
| **Product photography, 6 per style** | Partial | Unlocks the §10 gallery tabs (MODEL / FRONT / BACK / DETAIL / FABRIC / IN USE). Deferred deliberately — six tabs with five blank reads as broken |
| **Campaign copy** | None | Unlocks `/solutions/*`. Deferred: without distinct copy these would restate `/industries/*`, which §61 forbids |
| **Real backend + auth** | None | Would unlock sample approval and a document cabinet *if* those are ever wanted. Not in the current brief, which is public-website only. Types stay fixed in `lib/ahm-os/types.ts` |
| **AHM OS endpoint** | None | Set `AHM_OS_URL` and leads flow automatically. Contract is complete and tested |

---

## 5. PRIORITY

If you do these in order, each step is the highest-value thing available at that moment.

1. **The 4 contact facts.** Minutes of work. Removes the largest trust barrier.
2. **The 7 factory photographs.** Proves you are a manufacturer, not a trader.
3. **The 5 development photographs.** Proves the core positioning claim.
4. **A second and third case study.** Strongest credibility lever remaining.
5. **The 3 case-study photographs** for the apron program you already have.
6. **Hero + export + apron front** — 4 images, closes every remaining visible gap.
7. **Guides, toward 15.** Nine are published and grouped by category on `/resources`. At around fifteen, dedicated category routes stop being thin.

---

## What is NOT waiting on you

For the avoidance of doubt — these are done and verified:

- 34 routes, 68 static pages, build clean, typecheck clean, lint clean
- 34 unit tests passing, zero added dependencies
- SEO audit: 2 findings, both on an internal error page that is never crawled
- Image audit: 0 FAIL
- 12 product categories · 42 searchable articles · 8 materials · 16 trims
- 34-term glossary · 26-stage workflow · 9 quality gates · 9 technical guides
- 25 analytics events, every one actually emitted
- SEO landing pages on keyword-first root URLs, old paths 308-redirected
- AHM OS integration contract, wired and tested
- Private showroom: runtime-verified, timing-safe, noindex, robots-disallowed
- Buyer portal: **removed** — the current brief is public-website only
- **Zero fabricated claims anywhere on the site**
