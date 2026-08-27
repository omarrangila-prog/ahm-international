# AHM INTERNATIONAL — UPGRADE PLAN

Derived from `upgrade-audit.md`. Ordered by buyer impact per unit of work.

**Governing rule: nothing in `WHAT IS GOOD` is rebuilt.** Every item below either
adds beside existing work or corrects a specific defect.

---

## P0 — CRITICAL FOUNDATIONS ✅ COMPLETE

| ID | Task | Files | Why now |
|---|---|---|---|
| P0.1 | Correct the inverted positioning: H1 → `FROM TECH PACK TO FOB SHIPMENT.`, secondary line carries "Your next Pakistan manufacturing partner" | `components/sections/Hero.tsx` | Spec §0 is non-negotiable and this is the first thing a buyer reads |
| P0.2 | Add `BENCHMARK A STYLE` as hero CTA-1; demote quote to CTA-2; `VIEW CAPABILITIES` CTA-3 | `Hero.tsx` | Spec §8·S3 |
| P0.3 | Introduce `verificationStatus` + `capabilityStatus` enums and a `ProofBadge` component | `data/verification.ts`, `components/ui/ProofBadge.tsx` | Every later module (products, materials, case studies) must carry these from birth |
| P0.4 | Create `/benchmark-a-style` route wrapping the existing configurator | `app/benchmark-a-style/page.tsx` | The spec's most important lead tool has no URL to link, advertise or track |
| P0.5 | Link the orphan `/send-tech-pack`; unify CTA vocabulary to the four spec verbs | `Hero.tsx`, `nav.ts`, `Header.tsx` | Orphan route = wasted page |
| P0.6 | Mount the final CTA band on `/` | `app/page.tsx` | §8·S15 |
| P0.7 | Widen analytics event union to the spec's ~21 | `lib/analytics.ts` | Cheap now, retrofitting call sites later is not |
| P0.8 | Ship `/docs` + `/reports/seo-audit.md` + `/reports/content-truth-audit.md` | `docs/`, `reports/` | Named deliverables §70 |

## P1 — SELLING SYSTEM · mostly complete

| ID | Task | Notes |
|---|---|---|
| P1.1 | Style-level `Product` model beside `ProductCategory` | **Deferred** — see note below |
| P1.2 | Remaining 5 product categories | ✅ hospitality-food-service, denim, athleisure, womenswear, kidswear |
| P1.3 | Product detail gallery tabs | **Blocked on photography**, not on code — see note |
| P1.4 | Catalogue filters + search | ✅ `data/catalogue.ts` + `CatalogueExplorer` |
| P1.5 | Core data models | ✅ `lib/ahm-os/types.ts` |
| P1.6 | `lib/ahm-os/` integration contract | ✅ types, events, mappers, client; wired into `/api/rfq` |
| P1.7 | Enrich `Material` model | ✅ construction, weightClass, stretch, surface, capabilityStatus |
| P1.8 | Resource sub-routes | ✅ glossary (34 terms). Category routes **deliberately deferred** — see note |

### Why P1.1 and P1.3 are deferred

A style-level `Product` type with MODEL/FRONT/BACK/DETAIL/FABRIC/IN-USE gallery
tabs needs six photographs per style. **62 photography slots are still empty.**
Shipping the tabs now would produce six tabs where five are blank, which reads as
a broken page rather than a rich one. The category-level model already carries
`articles`, and `data/catalogue.ts` makes them searchable — that delivers the
buyer value the tabs were for, without the empty frames.

Build it when the photography lands. Nothing added in this pass blocks it.

### Why the guide category routes are deferred

Spec §7 lists `/resources/{guides,fabric-guides,buyer-guides}`. With five
published guides across three categories, those routes would hold one to two
items each — the thin doorway-page pattern **§61 explicitly forbids**. The
glossary shipped instead because it has genuine standalone value. Revisit at
~15 guides.

## P2 — TECHNICAL DEPTH ✅ complete except content

- ✅ 26-stage model grouped into six phases (§17) — `data/workflow.ts`, `WorkflowMap`
- ✅ Trims library (§15) — 16 components as decisions, on `/materials`
- ❌ Development Cabinet — removed with the portal it lived in (see P3)
- ✅ Quality gates (§19) — 9 gates each with a stop condition; CAPA types in `lib/ahm-os/types.ts` (§20)
- ✅ Tests (§63) — 34 unit tests, `node:test`, **zero new dependencies**
- ⏸ `/solutions/*` (§61) — deferred, see note
- ⏸ Technical guides toward 30+ (§39) — content work, 5 of 30 published

### Why `/solutions/*` is deferred

§61 sanctions campaign landing pages but §61 also forbids "hundreds of thin SEO
doorway pages" and requires "genuine unique value" per page. `/solutions/grocery-uniform-programs`
would restate `/industries/grocery`, which already exists and is complete. Build
these when there is a campaign with distinct copy behind them — not before.

## P3 — BUYER EXPERIENCE · showroom shipped, portal withdrawn

- ✅ `/showroom/[token]` (§27) — tokenised, timing-safe lookup, `noindex, nofollow, nocache`,
  disallowed in robots, absent from sitemap, `force-dynamic`. Real showrooms load from
  `SHOWROOM_CONFIG` so **no prospect name is ever committed**. Verified at runtime:
  demo token 200, wrong token 404, prefix 404.
- ❌ `/portal` — **removed.** The current brief rules out a buyer portal. It was
  built under the previous brief, then deleted along with its demo data, the
  Development Cabinet, its tests and its robots rule.
- ⏸ Sample approval (§29), production status (§30), document cabinet (§33) — these need
  a backend and real authentication. Types exist in `lib/ahm-os/types.ts`
  (`Approval` is append-only per §29) so they can be built against a fixed contract.

## P4 — INTELLIGENCE

- AHM OS live wiring, lead scoring (§37), AI tech-pack parser (§54)
- All AI output labelled `Suggested` / `Needs Review`; never auto-approves (§53)

---

## NEEDS BUSINESS VERIFICATION

These block real buyer trust and **cannot be solved in code**:

1. Legal entity name, registered address, sales email, phone — currently
   `verified: false`, rendering as "Available on request".
2. 62 empty photography slots (briefs exist in `IMAGE-PROMPTS.md`).
3. Written permission for any customer name or logo.
4. Any certification AHM actually holds, with documentary evidence.
5. Whether a response-time commitment (e.g. "within 2 business days") is
   operationally approved — until then the site promises no deadline.
