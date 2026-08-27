# ARCHITECTURE

## Shape

```
data/            content + domain rules, no markup
  verification   the publication gate (§2)
  products       12 categories, each with articles
  catalogue      derived flat view over articles (§11)
  materials      8 fabrics with §14 attributes
  trims          16 components as decisions (§15)
  workflow       the 26-stage model, grouped (§17)
  glossary       34 terms
  company        Field<T> truth system
lib/
  ahm-os/        integration contract (§55) — types, events, mappers, client
  seo, security-headers, upload-policy, rate-limit, json-ld, analytics
components/      layout · sections · products · forms · motion · ui
app/             App Router, server components by default
tests/           node:test, native type stripping, zero dependencies
```

## The three rules

**1. Nothing is published unless it is verified.**
`data/company.ts` holds facts as `Field<T>` requiring both a value and
`verified: true`. `data/verification.ts` adds `isPublishable()`, the single gate
for `pending_verification`. Asserted in `tests/truth.test.ts`, so a regression
fails the suite rather than reaching a buyer.

**2. Derive, never duplicate.**
`data/catalogue.ts` is computed from `productCategories` at module load; facet
lists are computed from the catalogue. This is what stopped `"Food Service"` and
`"Food service"` from becoming two filters. Card art in `app/products/page.tsx`
is an *override map with a fallback to the category*, so adding a category
cannot crash the page.

**3. No fake backend.**
`lib/ahm-os/client.ts` has two states — configured and not — and never pretends
to be the one it is not. Unconfigured, it returns
`{ published: false, reason: "not_configured" }` and logs server-side. The RFQ
route already reports delivery honestly to the buyer, and an optimistic client
would make it a liar.

## Rendering

Server Components by default. Client components exist where there is real
interaction: header, benchmark configurator, catalogue explorer, workflow map,
material/timeline selectors, forms, the showroom trackers, and the `useInView`
observer.

No animation library. Motion is CSS driven by one IntersectionObserver hook
toggling `data-inview`. A root `loading.tsx` is deliberately absent — adding one
measured **CLS 0.284 and −17 Lighthouse points**, because every route is static.

## Integration boundary

```
website form → Zod → /api/rfq → deliverSubmission()  → webhook (a human sees it)
                               → publishToAhmOs()    → lead.created (it becomes a Lead)
```

Both run under `Promise.all`; neither may fail the buyer's submission. Event
names live in `lib/ahm-os/events.ts` as a map from name to payload, so the union,
the type guard and the publisher signature all derive from one declaration.

## Commands

```bash
npm run dev        # localhost:3100
npm run build      # production build — fails on type or prerender error
npm run typecheck
npm test           # 33 unit tests, no dependencies
npm run reports    # regenerates reports/seo-audit.md from built HTML
npm run images:audit
```


## Route notes

Sourcing pillars are served at **keyword-first root URLs**
(`/apparel-manufacturer-pakistan`), not under `/sourcing/`. They render through
`components/pages/SourcingPillar.tsx` from explicit per-slug page files rather than
a root `[slug]` catch-all, which would silently shadow every future static route.
The old `/sourcing/*` paths and `/product-development` 308-redirect to the current
URLs, configured in `next.config.ts`.

Breadcrumbs on those pages still show `Sourcing >` because the `/sourcing` hub
links to all of them — breadcrumbs describe information architecture, not URL depth.

## Not built, by instruction

No buyer portal, ERP, CRM, internal dashboard or admin surface. A portal built
under an earlier brief was removed when the current brief ruled it out. The only
non-public surface is `/showroom/[token]`: an outbound sales page, tokenised,
timing-safe, noindex and robots-disallowed.


## Motion timing

Benchmarked against a reference site the client named for its smoothness, by
reading its shipped CSS rather than guessing.

| | Reference | Ours before | Ours now |
|---|---|---|---|
| Dominant easing | `cubic-bezier(.19,1,.22,1)` | `cubic-bezier(.16,1,.3,1)` | unchanged |
| Duration cluster | .3s x31, .5s x14, .4s x12 | 0.7-1.5s | .3s x52, .5s x15, .2s x7 |

**The easing was already right.** Both are expo-out and visually indistinguishable.
The gap was entirely duration: ours ran roughly twice as long, and a 700ms hover
trails the cursor while a 1.5s line-draw is still finishing after the reader has
moved on. That reads as sluggish, not smooth — "smoothness" in this context is
mostly responsiveness.

Everything animated is `transform` or `opacity`, with `will-change` set on the
elements that carry them, so the work stays on the compositor. The two exceptions
are a `grid-template-rows` accordion and a `background-size` underline, both cheap
and both deliberate.
