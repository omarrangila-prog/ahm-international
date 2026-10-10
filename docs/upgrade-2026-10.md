# Website upgrade, October 2026

Against the brief of 10 October 2026 ("World-class website transformation").
Branch `upgrade/hybrid-model-and-rfq-delivery`. Nothing in this round has been
deployed; production still runs the code from before it.

What the owner has to supply is in `what-you-need-to-supply.md`. How to launch
is in `../LAUNCH.md`. This document is the record: what was found, what was
changed, how it was tested, how to deploy and undo it, and how the site scores.

---

## 1. Audit findings

Severity is the consequence for a buyer or for the business, not the size of
the fix. Every item below was reproduced before it was changed.

### Critical

| # | Finding | Where | Business impact | Fix | Verified by |
|---|---|---|---|---|---|
| C1 | Tech-pack uploads over 4.5 MB failed. The form advertised 15 MB per file and 40 MB in total; Vercel rejects bodies over 4.5 MB before the code runs, in plain text, and the form reported it as "check your connection". | `lib/upload-policy.ts`, both forms | Any buyer with a normal-sized tech pack could not submit and was told the fault was theirs | 4 MB total cap; actionable messages; a 413 or non-JSON reply is read for what it is; a refused file no longer fails the enquiry | Live: 3 MB reached the route, 6 MB returned `FUNCTION_PAYLOAD_TOO_LARGE`. Local: refused files listed, enquiry delivered |
| C2 | Quote requests reached no one, and both forms still said "RFQ received… our commercial team will review your requirements" | `app/api/rfq/route.ts`, both forms | Every enquiry lost behind a confirmation | SMTP delivery to the company mailbox with attachments; a separate "One more step" screen when nothing was delivered; `rfq_completed` fires only on delivery | Production build against a local SMTP server: notifications, Reply-To, a 200 kB PDF byte-identical, both screens in a browser |
| C3 | Fifteen generated images presented as photographs of AHM operations: branded operators under "LINE A-1" signs, an AHM quality check sheet with a signature and date, a signed warehouse and container, and an AHM-logo apron on the documented case study | `public/assets/{hero,factory,development,export,case-studies}` | Fabricated evidence of scale, staff and records on a site whose first rule is that nothing is invented | Moved to `asset-pack/generated-hold/` with a README; sections restructure | `images:gaps` 0 on 86 routes; screenshots of every affected page |
| C4 | Next.js 16.3.1 carried published remote-code-execution and SSRF advisories (image optimiser with AVIF, `next/og`) | `package.json` | Security exposure on a site a buyer's IT team may scan | Next 16.4.0; nodemailer 10.1.0 | `npm audit --omit=dev`: 0 vulnerabilities |

### High

| # | Finding | Fix |
|---|---|---|
| H1 | "Chef Beanie" listed as an apron | Removed from the apron family; stays under chef wear; a test holds it |
| H2 | Two `vercel.app` hostnames served full copies of the site, one from a duplicate Vercel project | Exact-host 308 redirects to the same path on www, query kept; preview hosts untouched |
| H3 | Homepage heading "Built to scale" implied a production capacity nothing evidences | "Made to your spec" |
| H4 | The homepage's first credibility statement was "What this site does not claim" | Strengths first, each labelled with what it rests on and linked; the list moved to /verification |
| H5 | The own-factory-plus-partners model the business operates was not presented anywhere | /manufacturing-network, homepage section 02, /about, hero copy |
| H6 | Aprons, the one documented export product, were fourth in the homepage list | First, with applications, construction, customisation and a pre-filled quote link |

### Medium and low

| # | Finding | Fix |
|---|---|---|
| M1 | `product_view` and `benchmark_start` were defined but never fired; no WhatsApp event | Wired, plus `whatsapp_click` |
| M2 | The EU was typed as a `Country` in structured data | `AdministrativeArea` |
| M3 | The UAE, a target market, appeared nowhere | Markets, schema, benchmark destinations |
| M4 | The hero's fallback lay-down put its captions over the apron (never visible while a generated image filled the slot) | Repositioned at every breakpoint |
| M5 | Closing section and footer said "Let's build your next program" back to back | Footer reads "Start with one style" |
| M6 | Three industry cards showed the same apron photograph side by side | Eight distinct real photographs; a test holds it |
| M7 | Title audits counted `&amp;` as five characters | Entities decoded before measuring |
| M8 | Accessibility and responsive sweeps did not cover the new templates | 21 and 22 routes |
| M9 | Two contact links added in this round were 18 px tall | Caught by `npm run targets`, padded to clear 24 px |
| L1 | The apex domain redirects with 307, not 308 | Owner action in Vercel |

---

## 2. Backlog

| Priority | Item | Blocked on |
|---|---|---|
| P0 | Set `SMTP_PASS`, redeploy, send one marked test | The mailbox password |
| P0 | 308 on the apex redirect | Vercel setting |
| P0 | Review the preview deployment, merge, deploy | Owner review |
| P1 | Real photography for the 19 slots in `what-you-need-to-supply.md` §5 | AHM |
| P1 | Own/partner route per product family | AHM |
| P1 | NTN and street address | AHM |
| P1 | GA4 ID, Search Console DNS verification, sitemap submission | AHM accounts |
| P1 | Legal review | A lawyer |
| P2 | Lead pipeline (stages, owner, follow-ups). Recommended route: a hosted CRM fed by `RFQ_WEBHOOK_URL`, rather than a bespoke dashboard that would need a database and staff authentication this site does not have | Choice of CRM |
| P2 | Direct-to-storage uploads (private Vercel Blob) so tech packs over 4 MB arrive through the form | A storage token |
| P2 | Shared rate limiting (Redis or Vercel's), then switch on the buyer receipt | A Redis or platform limiter |
| P3 | Annotated apron close-ups (pocket bar-tacks, straps, labels) | Real detail photographs |
| P3 | Company profile and capability sheets as PDFs | Approved facts and photographs |
| P3 | Further case studies | Customer permission |
| P3 | AI sourcing assistant, limited to published content | The brief's own condition (a reliable RFQ first), a valid key, and a defined scope |

---

## 3. Design system

The foundations did not change and are documented in `../CLAUDE.md`: ink and
lime on paper, three zones, the `text-ink/65` floor for text on paper, the CSS
motion vocabulary, and print mode. Added in this round:

| Pattern | Where | Rule it follows |
|---|---|---|
| Two-panel model block | `ManufacturingModel`, /manufacturing-network | Equal weight for own and partner production, so neither reads as the main act |
| Evidence-labelled trust grid | `BuyerTrust` | Every strength carries its basis ("Documented", "Stated by AHM", "Published here") and a link |
| One table, restyled as cards below `md` | Capability matrix | A second mobile-only copy would vanish in print and be read twice by a screen reader |
| Two outcome screens | `SubmissionOutcome` | "RFQ received" only when delivered; otherwise the direct channels are the primary action |
| Consent bar | `Measurement` | Renders only with a measurement ID; nothing loads before Allow |
| Cost-comparison block | Product template, `costComparison` data | Opt-in per family; no number before the quotation |

---

## 4. Test results

All on the branch, against the dev server unless stated.

| Check | Result |
|---|---|
| Unit and invariant tests | 115 pass |
| Typecheck, lint | Clean |
| Production build | Succeeds on Next 16.4.0 |
| Internal links | No broken links |
| Empty image frames | 0 across 86 routes |
| SEO (`audit`, `seo:deep`) | Pass, nothing found, 86 routes |
| Contrast (WCAG AA, rendered) | No text below AA, 86 routes |
| axe-core WCAG 2.2 AA | No violations, 21 routes × 2 widths |
| Target size (2.5.8) | No failures |
| Runtime console | No errors or failed requests, 86 routes |
| Responsive | No defects, 12 viewports × 22 routes |
| RFQ delivery (production build, local SMTP server) | Delivered; Reply-To buyer; attachment byte-identical; spoofed PNG refused by signature; CRLF in a field flattened, no extra recipient; receipt carries only the reference |
| Consent-gated GA4 (production build, Google requests intercepted) | 14 of 14: nothing before a choice, Allow loads the configured ID, Decline loads nothing, withdrawal deletes `_ga` and asks again, CSP exact script host |
| Cold mobile load (production build, 390×844, regular 4G) | LCP 828 to 976 ms on 10 routes; median route 575 kB |

Not tested, because it cannot be without the owner: delivery to the real
mailbox (needs `SMTP_PASS`), and GA4 data arriving in a real property.

---

## 5. Deployment and rollback

**Deploy**

1. Set `SMTP_PASS` in Vercel (Production and Preview), marked Sensitive.
2. Push the branch. Vercel builds a preview deployment; review it there.
3. Merge into `main`. Vercel deploys production automatically.
4. Verify on www: `npm run audit` and `npm run console` with `BASE` set to the
   live origin, one marked test enquiry with a small attachment, and a request
   to `https://ahm-international.vercel.app/products/aprons` returning 308 to www.

**Roll back**

- Fastest: Vercel → Deployments → the previous production deployment →
  "Promote to Production". Instant, no rebuild.
- In git: revert the merge commit on `main` and push.
- By configuration: removing `SMTP_PASS` returns the form to "One more step";
  removing `NEXT_PUBLIC_GA_ID` removes the consent bar and all Google requests.
  Both need a redeploy.
- Withdrawn images: `git mv` a file back from `asset-pack/generated-hold/` and
  run `npm run assets`. Read the README there first.

---

## 6. Scorecard

The brief's rubric. "Before" is the production site at the start of this round;
"after" is this branch before the owner's actions; "next" is after the P0 and
P1 items above. Scores are judgements; the evidence column is what they rest on.

| Category | Max | Before | After | Next | Evidence and what holds it back |
|---|---:|---:|---:|---:|---|
| Visual design and branding | 15 | 10 | 11 | 13 | Coherent system, honest hero. Capped by the absence of real photography: a premium manufacturer site without its own floor on it cannot reach the top band. |
| Manufacturing credibility and buyer trust | 20 | 10 | 15 | 18 | Generated evidence removed, model explained, verification page with a document request. Missing: NTN, facility photographs, certifications, a second case study. |
| Content and product presentation | 15 | 11 | 12 | 13 | Aprons lead, six new guides, cost comparison, taxonomy fixed. Missing: product detail photography and annotations. |
| Conversion and inquiry experience | 20 | 8 | 14 | 18 | Honest outcomes, uploads that work, mail delivery built and tested. Production still delivers nothing until `SMTP_PASS` is set. |
| SEO and discoverability | 10 | 8 | 9 | 9 | One canonical host, clean audits, schema fixed. Search Console not yet connected. |
| Technical performance and reliability | 10 | 6 | 9 | 9 | Advisories closed, LCP under one second locally. Rate limiting is per instance. |
| Accessibility and mobile usability | 10 | 9 | 9 | 9 | Every sweep clean before and after. |
| **Total** | **100** | **62** | **79** | **89** | |
