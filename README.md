# AHM International

Apparel manufacturing and FOB export — Karachi, Pakistan.

A production website for international sourcing managers, uniform program
managers and procurement teams. Built to convert a visitor into an RFQ or a
tech-pack submission.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3100
```

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · React Hook Form · Zod

No animation library: the motion system is CSS driven by a single
IntersectionObserver hook.

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Development server on port 3100 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run images:build` | Rebuild web derivatives from `assets-master/` at spec sizes |
| `npm run images:audit` | Audit served images → `reports/image-audit.json` |
| `npm run assets` | Reindex `public/assets`, regenerate blur placeholders |
| `npm run assets:report` | Regenerate `assets-needed.md` |
| `npm run audit` | SEO and accessibility crawl of a running server |
| `npm run typecheck` | TypeScript, no emit |
| `npm run shoot <route> <width> <name>` | Screenshot a route for visual QA |

## Where things live

```
app/                 routes, API, sitemap, robots, llms.txt, OG image
components/
  layout/            header, mega menu, mobile nav, footer, breadcrumbs
  sections/          homepage and shared page sections
  products/          product and industry cards
  forms/             RFQ forms, fields, upload
  ui/                buttons, section zoning, spec tables, FAQ, images
  motion/            CSS-driven reveal primitives
data/                all content — company config, products, guides, routes
lib/                 SEO, analytics, validation, rate limiting, utilities
asset-pack/          supplied prompts, manifest and design references (not served)
assets-master/       high-resolution originals — archived, never deployed
reports/             generated audit output
```

## Image pipeline

Masters live in `assets-master/` at the repo root, outside `public/`, so they are
archived but never deployed or publicly downloadable. `npm run images:build`
cuts web derivatives from them into `public/assets/` at the sizes and per-role
quality defined in `data/image-spec.ts`; next/image then generates the
responsive variants below those at request time, in AVIF and WebP.

A first-time mobile visitor downloads **21 kB of imagery** on the homepage.
`npm run images:audit` enforces the budgets and fails the build on anything over
the 500 kB hard ceiling, an unoptimised master, a broken registry path or a
missing alt.

## Read next

- `CLAUDE.md` — architecture decisions and the two rules that shape the codebase
- `LAUNCH.md` — everything that must be verified or configured before going live
- `assets-needed.md` — the photography checklist, generated from the registry

## Measured

Lighthouse against the production build:

| | Desktop | Mobile |
|---|---|---|
| Performance | 97–100 | 91 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

CLS 0 on every page tested.
