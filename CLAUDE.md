# AHM International — working notes

## What this is

A production Next.js site for an apparel manufacturer and FOB exporter in
Karachi, Pakistan. The audience is international sourcing managers; the goal is
RFQs and tech-pack submissions, not consumer sales.

## The two rules that shape everything

**1. Nothing is invented.** No capacity figure, headcount, certification, MOQ,
lead time, audit score or customer name appears anywhere unless it is verified.
Unverified facts live in `data/company.ts` as `Field<T>` values with
`verified`/`public` flags, and the public accessors return `null` — which the UI
renders as "Available on request". To publish a fact you must set both the value
*and* `verified: true`. That is deliberate friction.

**2. Images are addressed semantically.** Components ask for `hero.sewing`, never
a filename. `data/assets.ts` maps keys to canonical paths; `data/asset-manifest.ts`
(generated) records which files actually exist. `<SmartImage>` renders next/image
when the file is there, and nothing but a faint tonal wash when it is not — no
illustration, no diagram, no invented picture.

Sections that can restructure around a missing image ask `hasAsset()` and do
that instead: `/capabilities` drops to a wide typographic row, `/quality`
substitutes a statement, and detail strips render only the frames that exist.
An empty frame beside a real one reads as a broken image, so it is never shipped.
Dropping real photography in requires no code change.

## Commands

```bash
npm run dev            # localhost:3100
npm run build          # production build
npm run assets         # reindex public/assets, regenerate blur placeholders
npm run assets:report  # regenerate assets-needed.md
npm run audit          # SEO/accessibility crawl (needs a running server)
npm run typecheck
```

## Architecture notes

- **Server components by default.** Client components exist only where there is
  real interaction: the header, the benchmark tool, the material and timeline
  selectors, the forms, and the small in-view observer.
- **No animation library.** The motion vocabulary is fades, slides, masked line
  reveals and progress fills — all CSS, driven by one `useInView` hook that
  toggles `data-inview`. See the "MOTION SYSTEM" block in `app/globals.css`.
- **Colour zoning.** Sections declare a zone (`<Section zone="forest">`), never
  raw colours. The zone also sets `data-zone`, which flips focus rings and
  selection colours to something legible on that ground.
- **Content lives in `data/`,** not in components, so a CMS can take it over.

## Image pipeline

`assets-master/` (repo root, gitignored, never deployed) holds originals.
`npm run images:build` cuts web derivatives into `public/assets/` from
declarative recipes, at the dimensions and per-role quality in
`data/image-spec.ts`. Quality is per role because a flat fabric macro shows
banding long before a factory photograph does.

Masters are deliberately *not* in `public/`: everything under `public/` is
served and deployed, so a 4K archive there would ship to every visitor.

`npm run images:audit` writes `reports/image-audit.json` with PASS/WARNING/FAIL
per file and exits non-zero on any FAIL, so it can gate a deploy.

## Things that will look wrong but are intentional

- Product cards put dark garments on a white plate inside a coloured card. The
  supplied renders are almost all dark; painting them onto forest or ink loses
  the product.
- The RFQ page ships zod; the homepage does not. The mini form validates with a
  hand-written check because importing the shared schema pulled a 78 kB
  validator into the homepage bundle to check six fields.
- `/sourcing` has five pillars, not the six originally listed. OEM is covered on
  the private-label page because the useful content is the *distinction* between
  them; split apart, each page would restate the other.
- The logo is a vector redraw, not the supplied raster. The dropped PNGs crop
  the wordmark mid-letter ("NTERN") and cost 107 kB each on every page; the
  original build package flagged a vector master as the P0 brand task. The
  rasters are archived in `assets-master/brand/`.
- `/resources` publishes five complete guides and a visible backlog of twenty
  more. Titles are not articles.
- The export globe draws **one** arc. The component it came from ships forty
  fabricated ones. One lane is what `data/markets.ts` flags `documentedExport`,
  and the arcs are derived from that flag, so a market cannot appear on the
  globe without also being documented in the data.
- The globe does not spin, and its camera near plane is 100 rather than the
  upstream 180. At 180 the arc's apex — the part nearest the viewer — is clipped
  and the lane renders as two stubs at the coasts.
- The WebGL stack is by far the heaviest thing on the site: **622 KB gzipped**,
  against 223 KB for the whole of `/export` otherwise. It is a separate chunk,
  loaded only when the markets section approaches the viewport, so it costs
  first paint nothing and costs other routes nothing. Roughly a third of it is
  `h3-js`, which three-globe needs to tile countries into hexagons. Dropping the
  hex-dot look means dropping three-globe entirely.

## The site has a print mode

`@media print` in `app/globals.css` lays the same document out for paper —
sourcing managers print supplier pages and circulate them internally. Zones lose
their colour, the header, footer and conversion bands drop out, and
`PrintHeader` adds a provenance line naming the page.

There is deliberately no `a::after { content: attr(href) }`. Spelling out every
destination sounds helpful and reads as noise: it put a forty-character URL
inside every button label and pushed `/capabilities` onto a blank second sheet.

New screen-only sections need `data-print="hide"`, which `<Section>` accepts and
forwards. Anything hidden behind a `lg:` breakpoint is hidden in print too —
print width is narrow — so a fact that must survive needs `print:block`.

## No root `loading.tsx`

Deliberately absent. Every route in this site is statically prerendered (`○` in
the build output), so a root loading fallback is never needed to cover a slow
segment — but Next still emits it into the static shell, where it renders at
`min-h-[60vh]` and is then replaced by the real content.

Measured: adding one cost **CLS 0.284 and 17 Lighthouse performance points** on
the homepage. Removing it returned CLS to 0 and performance to 99.

If a genuinely dynamic route is added later, give that segment its own
`loading.tsx` rather than reinstating a root one.

## Legal pages

`/privacy`, `/terms` and `/cookies` are drafted from what the application
actually does — the fields the RFQ form collects, the upload policy in
`lib/upload-policy.ts`, the rate limiter, the absence of any analytics provider.
Every statement is checkable against the code.

They are drafts. `LEGAL_REVIEW_NOTICE` renders on each page and is part of the
shared template, so the draft status cannot be lost by editing one page.

## Before launch

See `LAUNCH.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
