# AHM INTERNATIONAL — UPGRADE AUDIT

> **Historical.** This audits the *previous* brief and is kept for its record of
> what was found in the original codebase. The current assessment is
> [`website-audit.md`](website-audit.md). Items here referring to a buyer portal
> are **superseded** — the current brief rules one out, and it has been removed.


Audited against the Master Upgrade Prompt (74 sections).
Date: 2026-08-26 · Commit baseline: clean build, 64 static pages, typecheck passes.

---

## CURRENT STATE

| Dimension | Finding |
|---|---|
| Framework | Next.js 16.3.1, App Router, React 19.2.8, TypeScript strict |
| Styling | Tailwind CSS v4 (`@theme` CSS-first), no config file needed |
| Rendering | Server Components by default; client only where interaction demands |
| Routes | 26 `page.tsx` → **64 prerendered pages** |
| Components | 49 `.tsx` across `layout/ motion/ products/ sections/ forms/ ui/` |
| Data | 21 modules in `/data`, content fully separated from markup |
| APIs | 2 (`/api/rfq`, `/api/indexnow`) |
| Database | None. No auth. Deliberate — no backend to secure yet. |
| Animation | **No animation library.** CSS transitions driven by one `useInView` hook. |
| Build | `✓ Compiled successfully` · 0 errors · 0 type errors |
| Images | 104 optimised files, master/web split; audit 207 PASS / 1 WARN / **0 FAIL** |
| Photography | **62 slots still empty** (`.PLACEHOLDER.txt`) |

---

## WHAT IS GOOD — PRESERVE, DO NOT REBUILD

These are genuinely strong and above the spec's bar. Rebuilding them would destroy value.

1. **Truth & claims system** (`data/company.ts`) — spec §2.
   `Field<T>` requires BOTH a value AND `verified: true` before anything publishes.
   `publicValue()` gates display; `NOT_PUBLISHED = "Available on request"`.
   Verified by grep: **zero** fabricated certifications, headcounts, volumes or client counts
   anywhere in the codebase. The sustainability page explicitly *declines* to claim
   GOTS/OEKO-TEX/BSCI. This is better than most real exporter sites.

2. **Semantic asset registry** (`data/assets.ts`) — spec §59.
   Keys like `hero.sewing`, `products.polo.front` resolve through a `fallbackSrc`
   chain, so missing photography degrades gracefully instead of 404-ing.

3. **Image pipeline** — spec §42/§44. Master originals in `assets-master/`, web
   derivatives in `public/assets/`, with `optimize-images.mjs` + `audit-images.mjs`
   emitting `reports/image-audit.json`. Already the spec's requirement, working.

4. **Security** — spec §49. `lib/security-headers.ts` (full header set, CSP with a
   documented `'unsafe-inline'` trade-off to preserve static generation),
   `lib/json-ld.ts` (escapes `<>&`, U+2028/9 against JSON-in-HTML injection),
   `lib/upload-policy.ts` (**magic-byte/file-signature verification**, not just
   extension checks), `lib/rate-limit.ts` (5 per 10 min), honeypot.

5. **RFQ wizard** (`components/forms/RfqForm.tsx`) — spec §48. Seven steps, one form
   state, per-step Zod validation, progressbar with correct ARIA, no data loss on error.

6. **Benchmark configurator** (`components/sections/Benchmark.tsx`) — spec §24 (partial).
   Already a *working tool*: selections carry into the RFQ as query params so the buyer
   arrives pre-filled. No price is ever estimated. Correct instinct, correct execution.

7. **SEO architecture** — spec §40. 16 schema types (Organization, WebSite,
   BreadcrumbList, Product, TechArticle, ItemList, Service, FAQPage, …), sitemap,
   robots, canonicals, OG image route, IndexNow endpoint.

8. **Accessibility** — spec §47. Previously audited to axe-clean.

9. **Homepage funnel** — spec §8. **14 of 15** sections already exist as real components.

---

## WHAT IS INCORRECTLY IMPLEMENTED

| # | Issue | Spec | Severity |
|---|---|---|---|
| I1 | **Positioning is inverted.** H1 is `YOUR NEXT PAKISTAN MANUFACTURING PARTNER` — that is the *secondary* line. The primary positioning `FROM TECH PACK TO FOB SHIPMENT.` appears nowhere as the H1. | §0 | **High** |
| I2 | Hero CTAs are `Request FOB Quote` + `Explore Capabilities`. Spec CTA-1 `BENCHMARK A STYLE` is absent from the hero. | §8·S3 | **High** |
| I3 | `/send-tech-pack` route exists but **nothing links to it** — an orphan page. The hero points to `/request-a-quote#files` instead. | §7 | Medium |
| I4 | No `CtaBand` on the homepage — the final-CTA section (§8·S15) is a component that exists but is not mounted on `/`. | §8·S15 | Medium |

---

## WHAT IS PARTIALLY COMPLETE

| # | Area | Have | Spec wants | Gap |
|---|---|---|---|---|
| P1 | Product categories | 7 | 13 | missing `hospitality-food-service`, `denim`, `athleisure`, `womenswear`, `kidswear` |
| P2 | Product data model | **category-level** (`ProductCategory`) | **style-level** `Product` with front/back/model/detail/fabric/in-use images | §9 model absent; §10 gallery tabs impossible without it |
| P3 | Catalogue UX | static grid | filters, search, sort, compare, save | §11 entirely absent |
| P4 | Analytics events | 14 | ~21 | missing `product_filtered`, `industry_viewed`, `case_study_viewed`, `benchmark_completed`, `rfq_completed`, `material_viewed`, `quality_process_viewed`, `export_process_viewed`, all `showroom_*` |
| P5 | Technical guides | 5 | 30+ | content moat is 17% built |
| P6 | Material model | 19 materials, 8 fields | §14 model | missing `weightClass`, `stretch`, `surface`, `finish`, `capabilityStatus`, `imageMacro`/`imageSwatch` |
| P7 | CaseStudy model | close | §23 | missing `verificationStatus`, `quantityRange`, `tradeTerm` |
| P8 | Process model | 24 stage labels | **26 stages grouped** DEVELOP/APPROVE/PREPARE/PRODUCE/VERIFY/SHIP | grouping absent |
| P9 | Proof badges | ad-hoc strings in 2 components | shared `ProofBadge` with 6 labels | §52 not a component |

---

## WHAT IS MISSING ENTIRELY

| # | Item | Spec | Priority |
|---|---|---|---|
| M1 | `verificationStatus` (5-value) + `capabilityStatus` (3-value) enums | §2 | **P0** |
| M2 | `/benchmark-a-style` dedicated route | §7·§24 | **P0** |
| M3 | `/docs/*` and `/reports/seo-audit.md`, `/reports/content-truth-audit.md` | §65·§66·§70 | **P0** |
| M4 | `lib/ahm-os/` integration contract (`client/types/events/mappers`) | §55 | P1 |
| M5 | Core TypeScript data models (~28 types) | §56 | P1 |
| M6 | `/resources/{guides,fabric-guides,buyer-guides,glossary}` sub-routes | §7 | P1 |
| M7 | Trims library | §15 | P2 |
| M8 | Development Cabinet | §13 | P2 |
| M9 | `/showroom/[token]` private showroom | §27 | P3 |
| M10 | `/portal/*` buyer portal | §28 | P3 |
| M11 | `/solutions/*` campaign landing pages | §61 | P2 |
| M12 | Tests (unit/integration/E2E) | §63 | P2 |

---

## WHAT IS BROKEN

**Nothing.** Build compiles, typecheck passes, image audit reports 0 FAIL, all 8
industry slugs have matching detail entries and are `notFound()`-guarded.

The one genuine operational blocker is **not code**: 62 photography slots are empty,
and the verified contact facts (legal name, address, email, phone) are still
`verified: false`, so they render as "Available on request". No amount of engineering
compensates for a buyer being unable to find an address.

---

## WHAT IS DUPLICATED

- `Benchmark.tsx` and `MiniRfqSection.tsx` both open a quote path from the homepage.
  Not harmful (different commitment levels) but the CTA vocabulary diverges:
  "Benchmark Specification", "Benchmark FOB Price", "Benchmark Costing" all appear.
  **Consolidate to the four spec CTAs.**

---

## WHAT NEEDS REFACTORING

1. `data/products.ts` — introduce a style-level `Product` type *alongside* the existing
   `ProductCategory` rather than replacing it. The category pages are good; they just
   have nothing beneath them.
2. `lib/analytics.ts` — widen the event union; the abstraction itself is already correct.
3. Extract `ProofBadge` from the two components that hand-roll it.

---

## VERDICT

This is **not** a codebase that needs a redesign. It is a well-built ~60%-complete
implementation of the spec whose main deficits are *breadth* (missing routes, missing
models, missing content) rather than *quality*.

The single highest-value change is also the smallest: **fix the inverted positioning.**
