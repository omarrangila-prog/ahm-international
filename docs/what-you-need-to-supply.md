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
| The `info@ahminternationals.com` mailbox password | Vercel → Settings → Environment Variables → `SMTP_PASS`, marked Sensitive, then redeploy | Until it is set, quote requests reach no one by email, and nobody can sign in to the enquiry register (sign-in links are emailed). Buyers are told so and given the email and WhatsApp. |

After it is set: send one test request marked as a test, with a small PDF, and
confirm it arrives with its attachment. Then sign in at
`https://www.ahminternationals.com/pipeline` with `info@ahminternationals.com`.
Do not paste the password into a chat or a file.

---

## 2. Decisions in Vercel (five minutes)

| What | Where |
|---|---|
| Change the apex redirect from 307 to **308 Permanent** | Settings → Domains → `ahminternationals.com` → Edit |
| Delete the duplicate project `ahm-international-sk7y` (optional; it now redirects to www) | That project → Settings → Advanced → Delete |
| Merge the upgrade branch so it deploys | GitHub, or allow it to be pushed (see the note at the end) |

**Already done, 10 October:** the private file store `ahm-rfq-files` was
created and connected to the project (production, preview and development).
That is what lets buyers upload tech packs up to 25 MB each, and it holds the
enquiry register. Nothing to do; do not make it public.

---

## 2a. The enquiry register (`/pipeline`)

| Decision | Where | Default if you do nothing |
|---|---|---|
| A PIN for signing in without email | `PIPELINE_PIN` in Vercel, 4 to 12 digits, marked Sensitive. It signs in as the first admin. Avoid 1234, 0000 and repeated digits; they are the first ones anyone tries. | No PIN: sign in with the emailed link |
| Who may sign in, and as what | `PIPELINE_STAFF` in Vercel, e.g. `info@ahminternationals.com:admin, ali@ahminternationals.com:sales, owner@…:viewer` | Only `info@ahminternationals.com`, as admin |
| How long buyer files are kept | `RFQ_FILE_RETENTION_DAYS` (minimum 30) | 730 days (two years). The privacy policy states whatever this is. |
| Lock the daily job to Vercel's scheduler | `CRON_SECRET`, any long random string | Open, but it runs at most once a day and only deletes what the schedule would |

Admins can export CSV and delete enquiries; sales can update them; viewers can
only read. Every morning (09:00 Karachi) the register emails staff a list of
overdue follow-ups, unqualified enquiries, quiet quotations and samples. It
never emails a buyer.

---

## 2b. The sourcing assistant (optional)

Off until you add a key. The brief says to add it only once quote requests
arrive reliably, so the order is: set `SMTP_PASS`, receive one real enquiry by
email, then switch this on.

1. Create an API key at console.anthropic.com, under AHM's own account.
2. In the same console, set a **monthly spend limit**. That is the ceiling on
   what the assistant can cost, whatever happens on the website.
3. In Vercel, add `ANTHROPIC_API_KEY` (Sensitive) and redeploy.
4. Optional: `ASSISTANT_MODEL=claude-sonnet-5-5` or `claude-haiku-5-5` for a
   lower bill. The default is Claude Opus 5.5, the model least likely to
   answer a question about MOQ or capacity with a guess.

Do not use the key and the third-party address pasted into a chat on
9 October. The site only talks to Anthropic's own API, on purpose: a proxy
would see every buyer's questions.

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
| The assistant's notice: answers from the website, by an AI model (Claude, by Anthropic), can be wrong, no prices/MOQs/lead times, no confidential specifications | The assistant panel | `components/assistant/AssistantPanel.tsx` |
| Privacy policy: the enquiry register, private storage, the two-year file retention, the staff sign-in cookie, the assistant and Anthropic | /privacy, /cookies | `data/legal.ts` (generated from the configuration) |
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

**First, the camera originals of the product samples.** Every garment image on
the site is AI-generated: the 24 in the product galleries were made from files
in `asset-pack/AHM_All_Individual_Generated_Product_Images/`, whose README says
the raw camera originals were left out. Since 11 October 2026 each one is
labelled "AI illustration" on the page. The photographs those images were
probably made from are the single most valuable thing to send: dropped in at
the same paths, they replace the illustrations and the labels go by themselves.
One question with them: the bib apron is sold as "Three-Pocket", but its
illustration shows one pocket divided in two. Which is right?

In order of what they unlock:

| Shots | Paths | What it unlocks |
|---|---|---|
| Camera originals of the product samples, unbranded | `assets-master/product-photography/` (same filenames), then `npm run photos` | Replaces the 24 AI illustrations in the product galleries |
| AHM's own facility: cutting, stitching, reinforcement, inspection, sampling, packing | `public/assets/facility/own/*.webp` | The "AHM-Owned Manufacturing" gallery on /manufacturing-network |
| A partner's facility, with that partner's permission | `public/assets/facility/partner/*.webp` | The "Partner Manufacturing Facilities" gallery, labelled as a partner's |
| Production floor, wide | `public/assets/hero/hero-sewing-01.webp` | The homepage hero photograph. Until then the hero shows AI illustrations of three articles, labelled. |
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

---

## 8. Deploying this work

Every push to `main` deploys to www.ahminternationals.com. The assistant that
built this cannot push to `main` on its own: deploying to production is
blocked in its permission settings, deliberately. To deploy, either merge the
branch on GitHub yourself, or allow the push when asked (or add a permission
rule for `git push` in Claude Code's settings).

Rolling back is one click: Vercel → Deployments → the previous production
deployment → Promote to Production.
