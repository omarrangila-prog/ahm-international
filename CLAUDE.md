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

## Two colours, three grounds, one texture

`ink` and `lime` on `paper`, with `paper-deep` as a second *tone* of the same
neutral — not a third colour. Collapsing thirteen zones to three cost the page
its rhythm: 31 of 66 routes ran four or more sections on one flat ground.
Alternating the light ground fixed it without reintroducing a hue.

That alternation lives **unlayered** at the end of globals.css, on purpose.
Inside `@layer base` it lost to the `bg-paper` utility no matter its
specificity — cascade layers are ordered before specificity is considered, and
`utilities` comes after `base`. It appeared to work on the one section without
a utility background and nowhere else.

## Palette rules

`ink` and `lime` on `paper`. There were thirteen named colours and thirteen
zones; a reader could pass through five hues in one scroll and learn nothing
from any of them. Variety now comes from the woven ground and from typographic
scale.

- Zones are `paper`, `ink`, `lime` only. `<Section>` accepts nothing else.
- **Lime is a ground, or an accent on ink. It is never text on paper** — about
  1.4:1 there. On ink it is 12.4:1.
- Error states are ink, not a third colour. They keep structural distinction
  (border, weight, `role="alert"`), which satisfies WCAG 1.4.1 better than hue.
- `white` survives for the plates behind dark garment renders, where warm paper
  would tint the product. Functional, not brand.

`npm run contrast` audits every pairing on every route against the rendered
page. It parses `oklab()`, which is what Tailwind v4 emits for `text-ink/70`;
a naive `rgb()` regex reads the lightness as red and invents around seventy
failures that are not there.

The ground is a real cotton-canvas macro, high-passed to remove its lighting
gradient and mirrored 2×2 so it tiles seamlessly. 9.7 kB, on by default —
pass `tooth={false}` for a section that must stay flat.

## Branded customer garments are not published

35 of the 63 photographed samples were built from originals in
`asset-pack/client-branded-hold/` — the folder that exists because those
garments carry a customer's mark. The originals were held out of the master
set; the derivatives were built and deployed anyway, so Armani Exchange,
Nautica, CarMax, TapouT, Virginia Tech, Hannaford, D'Agostino, Food City and
Pampers/Ukrop's were live on the product pages.

They are deleted from `public/assets/products/photography/`. Each withdrawn key
carries an unbranded `fallbackSrc` in `data/assets.ts` — a studio render of the
same garment type in preference to another client's photograph. The two infant
bodysuits have no stand-in on purpose: there is no unbranded infant article, and
an adult garment would misrepresent one, so those components drop the frame.

Do not run `npm run photos` and redeploy the branded set without written
publication permission. `npm run images:gaps` must stay at 0.

## The audits, and what each is for

```
npm run audit       SEO basics (titles, descriptions, H1, canonical) — needs a server
npm run seo:deep    OG/Twitter, heading skips, alt, JSON-LD, breadcrumbs
npm run contrast    WCAG AA on the rendered page, parses oklab()
npm run responsive  12 viewports x 20 routes, reachable overflow only
npm run targets     WCAG 2.2 SC 2.5.8 with its own exceptions applied
npm run images:gaps empty image frames actually rendered
npm run links       internal link targets
npm run weight      cold mobile bytes by type + LCP (needs a production server)
npm run a11y        axe-core WCAG 2.2 AA, 17 routes x 2 widths
npm run console     uncaught exceptions, console errors, failed requests
```

`npm run console` takes its route list from the sitemap, so a new page is
covered the day it ships, and it scrolls each one so deferred work actually
runs. It ignores `net::ERR_ABORTED`: navigating to the next route cancels
whatever the last one still had in flight, and counting those reported 24
"problems" that were all the loop cancelling its own prefetches.

`npm run a11y` covers the ~90 rules the two specialist audits do not.
`color-contrast` and `target-size` are excluded from it on purpose: axe bails
to "incomplete" on this design's text-over-image and mix-blend cases, and it
implements 2.5.8 without the spacing exception — the same defect that produced
700+ phantom failures here once already. `contrast` and `targets` answer those
two properly.

`npm run weight` exists because Turbopack no longer prints First Load JS, so
there is no build-table number to read off. It measures `encodedDataLength` —
bytes on the wire, compression included — in a fresh context per route, so the
figures are cold loads rather than a warm second visit.

Two traps it was written around. `next start` defaults to port 3000, which on
this machine is already serving another app; the first run measured that
instead, and reported an identical 468 kB for all ten routes. And LCP is not in
the default performance buffer, so `getEntriesByType` returns nothing and every
route reports null — it needs an observer with `buffered: true`.

## Responsive and target-size audits

`npm run responsive` sweeps 12 viewports (320 to 2560, plus landscape phone)
across one route per template. `npm run targets` checks WCAG 2.2 SC 2.5.8.

Both encode what the criteria actually say, because the naive versions are
useless:

- Element overflow is only a finding when it is **reachable** — an element wider
  than the viewport inside an `overflow: hidden` ancestor is a marquee doing its
  job. An earlier pass reported 51 such "failures" from one carousel.
- Target size applies 2.5.8's own exceptions — spacing (no other target's 24px
  circle intersects), inline (a link inside a run of text), and elements that
  are `sr-only` proxies. Without them the check reports 700+ failures, none of
  them real, and buries the ones that are.

## `data-zone` is a bucket, not a palette name

Only `light`, `dark` and `lime` exist. `<Section>` derives them through
`zoneAttr()`; the CSS keys off those values — the weave screens on `dark` and
multiplies elsewhere, focus rings and selection flip on `dark`, and the
alternating ground targets `light`.

Three components set the attribute by hand, and the palette rename rewrote their
strings to `paper` and `ink`. Those still match `[data-zone]`, so nothing broke
loudly — the footer just multiplied a weave into near-black and showed no
texture at all. `tests/zones.test.ts` now fails the build on any other value.

## Motion: CSS first, Framer where CSS cannot

The vocabulary is still CSS. `motion/react` is used in exactly one place, the
product accordion, because a panel opening to its content's natural height is
the case CSS cannot do honestly — `height: auto` is not interpolable.

Lenis eases the scroll in `components/motion/SmoothScroll.tsx`. It never starts
under `prefers-reduced-motion` — hijacking scroll is precisely what that setting
exists to switch off — and it disables `scroll-behavior: smooth` while running,
because the two animate the same property and fight over every anchor link.

## FAQ schema comes from the component, not the page

`<Faq>` is a server wrapper that renders the questions *and* emits the
`FAQPage` structured data from the same array. Do not add a separate
`faqSchema` JsonLd to a page — it would produce two FAQPage blocks on one URL.

They used to be separate and drifted both ways: seven pages showed a buyer FAQ
with no schema, and the homepage emitted `FAQPage` for questions it never
rendered, which Google's policy forbids. Binding them makes both unreachable.

`<Faq>` may appear at most once per page. Two lists on one page must be
concatenated into one call.

## Guide back-links are derived

`guidesLinkingTo(route)` in `data/guides.ts` reads each guide's own `related`
list in reverse, and `<RelatedLinks guidesFor="/route">` appends the result. Add
the route to a guide's `related` and the back-link appears; there is no second
place to update.

Seven of the nine guides previously had one inbound link, all from `/resources`.
`tests/internal-links.test.ts` holds the invariants.

## `three` is pinned to 0.182

Not a floating range, and not an oversight. three r183 deprecated `THREE.Clock`
and logs a console warning whenever one is constructed; `@react-three/fiber`
9.7.0 — the latest stable — still constructs one on every canvas. The result was
a deprecation warning on `/export` in dev and production alike, from library
code we do not own.

Both `@react-three/fiber` and `three-globe` declare an open-ended peer range
(`three >= 0.156` and `>= 0.154`), so the resolver was free to pick a version
neither had been updated for. 0.182.0 is the last release before the
deprecation.

Lift the pin once react-three-fiber moves to `THREE.Timer`, and confirm by
loading `/export` with the console open — the warning is the only symptom.

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
