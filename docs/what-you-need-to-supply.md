# What you need to supply

Everything the site is waiting on from AHM. None of it can be written in code:
each item is a password, a decision, a fact only AHM holds, or a photograph only
AHM can take.

October 2026 edition. It replaces the August list, whose factory photographs
were later filled with generated images; those have been withdrawn, so the
photographs are needed again.

---

## 1. Blocking: one password

| What | Where | Why it blocks |
|---|---|---|
| The `info@ahminternationals.com` mailbox password | Vercel → Settings → Environment Variables → `SMTP_PASS`, marked Sensitive, then redeploy | Until it is set, quote requests reach no one. Buyers are told so and given the email and WhatsApp, but the form itself delivers nothing. |

After it is set: send one test request marked as a test, and confirm it arrives
with its attachment. Do not paste the password into a chat or a file.

---

## 2. Decisions in Vercel (five minutes)

| What | Where |
|---|---|
| Change the apex redirect from 307 to **308 Permanent** | Settings → Domains → `ahminternationals.com` → Edit |
| Delete the duplicate project `ahm-international-sk7y` (optional; it now redirects to www) | That project → Settings → Advanced → Delete |
| Merge the upgrade branch so it deploys | GitHub, or ask for it to be merged |

---

## 3. Approve the new wording

These statements are on the upgrade branch. Each rests on the brief of
10 October 2026; confirm each is accurate before it goes live.

| Statement | Where it appears | Source in the code |
|---|---|---|
| AHM runs its own manufacturing operations **and** works with specialist partner factories | Homepage section 02, /manufacturing-network, /about, hero | `company.manufacturingModel` |
| The six benefits of the model (broader range, production matched to the product, flexible sourcing, one development process, one point of contact, oversight against the agreed specification) | Homepage, /manufacturing-network | `hybridBenefits` in `data/manufacturing-network.ts` |
| "Your agreement is with AHM" whichever facility makes the bulk | /manufacturing-network | page text |
| The apron cost-comparison process: reference in, construction reviewed, open points clarified, FOB quotation out | /products/aprons | `costComparison` in `data/products.ts` |
| Confidential documents may be shared under an NDA | /verification | page text |
| "Development, production and quality coordination under AHM's own management" | Homepage section 02, /manufacturing-network | component text |

---

## 4. Facts, published only with evidence

| Fact | Where it goes | Note |
|---|---|---|
| Which product families are made in AHM's own operations, which at a partner, which at both | `routes` in `data/manufacturing-network.ts` | The column appears on /manufacturing-network as soon as one family is filled in. Leave a family out rather than guess. |
| NTN / registration number | `company.ntn` | Checked against the public register by buyers; a wrong digit is worse than nothing. |
| Street address, or confirm city-only | `company.streetAddress` | |
| Facility location, size, machinery, monthly capacity | `company.facilitySize`, `machineCount`, `monthlyCapacity` | Optional. Shown as "Available on request" until evidenced. |
| Certifications, each with issuer, certificate number and expiry | `company.certifications` | None is shown until documented. |
| Further case studies | `data/caseStudies.ts` | Only with the customer's permission, anonymised as needed. |
| LinkedIn and Instagram URLs | `NEXT_PUBLIC_LINKEDIN`, `NEXT_PUBLIC_INSTAGRAM` | Icons appear when set. |

---

## 5. Photographs

Real photographs only. A partner's facility is welcome if it is labelled as a
partner's. Every slot already exists, so a file at the right path is the only
change: run `npm run images:build` and `npm run assets`, and the section that
was hiding its image starts showing it. The full list, with paths and sizes, is
in `assets-needed.md` (`npm run assets:report` regenerates it).

In order of what they unlock:

| Shots | Paths | What it unlocks |
|---|---|---|
| Production floor, wide | `public/assets/hero/hero-sewing-01.webp` | The homepage hero photograph. Until then the hero shows real product photographs. |
| Fabric inspection, cutting, sewing, embroidery, printing, finishing, quality control, packing | `public/assets/factory/*.webp` | /capabilities, /quality, /about, the process timeline |
| Tech pack review, pattern, measurement, trims, sample development | `public/assets/development/*.webp` | /development and the timeline |
| Warehouse, container loading | `public/assets/export/*.webp` | /export |
| The case-study apron, as made (customer marks removed) | `public/assets/case-studies/uniform-apron-program/product.webp` | The documented program's product image |
| Apron back and pocket detail | `public/assets/products/aprons/` | The apron page's detail row, and later the annotated close-ups |
| Industry scenes, no customer branding | `public/assets/industries/*.webp` | Industry cards (they show product photographs until then) |

---

## 6. Accounts and reviews

| What | Where | Note |
|---|---|---|
| Google Analytics 4 measurement ID (`G-…`) | `NEXT_PUBLIC_GA_ID` | Turns on the consent bar and, only after Allow, GA4. Review the cookie wording first. |
| Search Console verification | DNS TXT record at Hostinger | Then submit `/sitemap.xml` and `/image-sitemap.xml`. |
| Legal review of /privacy, /terms, /cookies | A lawyer | Each page says it is a draft until this is done. |

---

## 7. Security

The AI API key pasted into a chat on 9 October, with a third-party base URL,
should be revoked and replaced. It was never written to this repository.
