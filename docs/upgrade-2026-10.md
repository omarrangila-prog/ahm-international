# Website upgrade, October 2026

Against the brief of 10 October 2026 ("World-class website transformation").
Branch `upgrade/hybrid-model-and-rfq-delivery`. Not yet deployed: production
still runs the code from before this round (see §5). §7 covers the second
round on the same day: the enquiry register, large uploads and the assistant.

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
| C5 | The full quote form could not be sent by any buyer who left the optional Gender select blank: its empty value failed the schema, the error showed on step 2, and "Submit for Review" on step 7 did nothing at all | `lib/rfq-schema.ts` | Every full-form enquiry from a buyer who skipped Gender was lost without a message, on the live site | Optional selects accept "not answered"; a failed submit jumps to the step with the problem and says so | Reproduced on www.ahminternationals.com (validation only, nothing sent); regression tests in `tests/rfq-schema.test.ts`; e2e |
| C6 | "Continue" on the Files step submitted the form: one button element changed type during the click, and the browser took the click as a submit | `components/forms/RfqForm.tsx` | Buyers who did fill Gender were sent past the review step without seeing it | Separate elements for the two buttons | e2e asserts the review step appears and no request is made before "Submit for Review" |

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
| ~~P2~~ | ~~Lead pipeline~~ Built: `/pipeline`, see §7 | Done; needs `SMTP_PASS` for sign-in |
| ~~P2~~ | ~~Direct-to-storage uploads~~ Built: private store created and connected, see §7 | Done |
| P2 | Shared rate limiting, then switch on the buyer receipt. Limits are still per server instance; the assistant's real cost ceiling is the spend limit on its API key | A shared store for counters, if abuse ever shows up |
| P3 | Annotated apron close-ups (pocket bar-tacks, straps, labels) | Real detail photographs |
| P3 | Company profile and capability sheets as PDFs | Approved facts and photographs |
| P3 | Further case studies | Customer permission |
| P3 | AI sourcing assistant, limited to published content. Built, see §7; off until a key is set | An Anthropic API key with a spend limit, after the first real enquiry arrives |

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
  removing `NEXT_PUBLIC_GA_ID` removes the consent bar and all Google requests;
  `ASSISTANT_ENABLED=false` removes the assistant without deleting the key.
  All need a redeploy. Do not disconnect the private store to undo uploads:
  it also holds the enquiry register.
- Withdrawn images: `git mv` a file back from `asset-pack/generated-hold/` and
  run `npm run assets`. Read the README there first.

---

## 6. Scorecard

The brief's rubric. "Before" is the production site at the start of this round;
"round 1" and "round 2" are this branch before the owner's actions; "next" is
after the P0 and P1 items above. Scores are judgements; the evidence column is
what they rest on.

"Before" for conversion was scored before C5 and C6 were found. With a full
form that could not be sent, it was lower than 8.

| Category | Max | Before | Round 1 | Round 2 | Next | Evidence and what holds it back |
|---|---:|---:|---:|---:|---:|---|
| Visual design and branding | 15 | 10 | 11 | 11 | 13 | Coherent system, honest hero. Capped by the absence of real photography: a premium manufacturer site without its own floor on it cannot reach the top band. |
| Manufacturing credibility and buyer trust | 20 | 10 | 15 | 15 | 18 | Generated evidence removed, model explained, verification page with a document request. Missing: NTN, facility photographs, certifications, a second case study. |
| Content and product presentation | 15 | 11 | 12 | 12 | 13 | Aprons lead, six new guides, cost comparison, taxonomy fixed. The assistant adds nothing until it is keyed. Missing: product detail photography and annotations. |
| Conversion and inquiry experience | 20 | 8 | 14 | 17 | 19 | The full form can be sent again; 25 MB uploads; recoverable upload failures; every enquiry recorded and worked in a register with follow-up reminders. Production still delivers nothing until `SMTP_PASS` is set. |
| SEO and discoverability | 10 | 8 | 9 | 9 | 9 | One canonical host, clean audits, schema fixed. Search Console not yet connected. |
| Technical performance and reliability | 10 | 6 | 9 | 9 | 9 | Advisories closed, LCP under one second locally, end-to-end tested against the real store. Rate limiting is per instance. |
| Accessibility and mobile usability | 10 | 9 | 9 | 9 | 9 | Every sweep clean, including the register and the open assistant. |
| **Total** | **100** | **62** | **79** | **82** | **90** | |

---

## 7. Round 2: the enquiry register, large uploads, the assistant

The owner asked for the three deferred items. Each is built to switch on from
configuration, and none sends a buyer a message nobody wrote.

### What was built

| Item | What it does | Needs |
|---|---|---|
| Private file store | Created 10 October: `ahm-rfq-files`, private, connected to production, preview and development. Tech packs go from the browser straight to it, 25 MB a file and 60 MB in total, and are checked by content before an enquiry claims them. Files are deleted two years after the enquiry; abandoned uploads after a day. | Nothing further |
| Enquiry register, `/pipeline` | The brief's eleven stages, commercial owner, follow-up and last-contact dates, quotation reference, lost reason, notes and history, files, source and campaign. Board and list views, reports (by country, product and source; stage reached; quotation outcomes; follow-up performance; enquiry quality), CSV export. Emailed one-time sign-in; admin, sales and viewer roles. | `SMTP_PASS` for sign-in; optionally `PIPELINE_STAFF` |
| Follow-up reminders | One internal email each morning: overdue follow-ups, unqualified enquiries, specifications awaited, quiet quotations and samples, shipped orders due a repeat call. Nothing is sent to buyers. | `SMTP_PASS` |
| Sourcing assistant | A button that opens a panel; never opens itself. Answers from the site's own content only, names what is not published, links only to site pages, the mailbox and WhatsApp, keeps a person one click away, stores nothing. | `ANTHROPIC_API_KEY`, with a spend limit set on it |
| Campaign attribution | Landing page, referring site and utm tags travel with an enquiry. Held in page memory, never on the device, so no consent is needed. | Nothing |

### Found and fixed on the way

- **C5 and C6** in §1: the full quote form could not be sent by a buyer who
  left Gender blank, and "Continue" on the Files step skipped the review step.
  Both were live on www.ahminternationals.com.
- A compressed read of a register document returns a weak ETag, which a
  conditional write always refuses. Small probes passed; the first real lead
  record failed. Normalised in `lib/storage/json-store.ts`.
- The Blob client retries a dead upload for about seventeen minutes. Uploads
  that make no progress for 45 seconds are now abandoned, and the buyer chooses
  between "Try again" and "Send without it".
- The assistant's screen-reader announcement read markdown aloud, brackets and
  paths included.

### How it was tested

A production build on localhost, against the real private store under a
throwaway `e2e-` prefix (deleted afterwards, 0 left), a local SMTP server, and
a local stand-in for the Anthropic API. Nothing was sent to the real mailbox or
to Anthropic.

| Check | Result |
|---|---|
| Unit and invariant tests | 152 pass |
| End-to-end, Playwright, run in the working session (the script was not kept in the repository) | 55 of 55: 6 MB and 5 MB files through the form; spoofed PNG refused and deleted; attachment byte-identical; over-budget file linked to the register; campaign carried through client-side navigation; store URLs answer 403; files need a session; unlisted address gets the same reply and no email; link single-use and not spent by opening; cookie HttpOnly, Lax, `/pipeline`; changes logged; absent fields untouched; viewer cannot edit or export; failed upload recoverable; assistant streams, refuses foreign links, sends the site as a cached block, survives an outage, refuses other origins; daily job once a day; digest to staff only; no console errors or CSP violations |
| axe-core on the register and the open assistant | 0 violations, desktop and mobile, 9 views each |
| Site-wide audits, production build with every feature on (store, mail, register, assistant) | `a11y` 21 routes x 2 widths: no violations. `contrast` 86 routes: no text below AA. `targets`: no failures. `console` 86 routes: no errors or failed requests. `audit` and `seo:deep` 86 routes: pass, nothing found. `links`: none broken. `images:gaps`: 0. `responsive` 264 loads: no defects |
| Lint, typecheck, `npm audit --omit=dev` | Clean; 0 vulnerabilities |
