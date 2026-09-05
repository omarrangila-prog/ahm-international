# Launch checklist

Everything below is either a decision only AHM can make, or a step that needs
production credentials. The build itself is complete.

---

## 1. Blocking — verify before the site goes public

These are the facts the site deliberately does not publish. Each is a one-line
change in `data/company.ts` (set the value **and** `verified: true`), or an
environment variable.

| Item | Where | Currently shows |
|---|---|---|
| Registered legal name | `company.legalName` | hidden |
| Company registration / NTN | `company.legalName` note | hidden |
| Street address | `company.streetAddress` | "Confirmed during commercial discussion" |
| Business email | `NEXT_PUBLIC_SALES_EMAIL` | "Available on request" |
| Phone | `NEXT_PUBLIC_PHONE` | "Available on request" |
| WhatsApp | `NEXT_PUBLIC_WHATSAPP` | action hidden |
| Business hours | `company.businessHours` | "Pakistan Standard Time — confirmed on contact" |
| Social profiles | `NEXT_PUBLIC_LINKEDIN`, `NEXT_PUBLIC_INSTAGRAM` | icons hidden |
| Certifications | `company.certifications` (empty array) | omitted entirely |

**Use a branded domain address** for the public email — `sales@`, `rfq@` or
`sourcing@` on the live domain, not a personal mailbox.

### Deliberately not published

Production capacity, employee count, factory size, machinery count, years in
business, MOQ and lead time. Each has a `Field` in `data/company.ts` with a note
explaining what verification it would need. **Only publish these if they can be
evidenced** — a supplier site that states all of them without proof tells a
sourcing manager less, not more.

---

## 1b. Branded samples — RESOLVED, and how it was resolved

**Status: the branded set is no longer published.**

63 photographed production samples were live across the product pages. 35 of
them were built from originals sitting in `asset-pack/client-branded-hold/` —
the folder that exists precisely because those garments carry a customer's
mark. The originals were held out of the master set; the web derivatives were
built and deployed anyway, so the marks were live on the site.

Confirmed by inspection, not by filename: an Armani Exchange hangtag, a
Virginia Tech hoodie, TapouT graphics, a Hardcore logo jogger, Nautica, CarMax,
Hannaford, D'Agostino, Food City, County Market, Army Navy, Arizona, and infant
bodysuits carrying **Pampers** and **Ukrop's**.

What was done:

1. All 35 derivatives were deleted from `public/assets/products/photography/`.
   The masters remain in `assets-master/`, and the derivatives are in git
   history, so this is reversible with `npm run photos` if permission is later
   obtained.
2. Each withdrawn key was given an unbranded `fallbackSrc` in `data/assets.ts`
   — a neutral studio render of the same garment type wherever one exists,
   rather than another client's photograph.
3. The two infant bodysuits were deliberately left **without** a stand-in.
   There is no unbranded infant article in the set, and showing an adult
   garment for a onesie would misrepresent the article. The components that
   render them now drop the frame instead.

The 28 unbranded articles are unaffected and still published.

**Verified after:** none of the 35 files return 200, and
`npm run images:gaps` reports 0 empty frames across all 66 routes.

**If you want any of these garments back**, obtain written publication
permission from the brand owner first, or retouch the mark out and rebuild.
Publishing a customer's branded garment announces that relationship, and that
is the buyer's decision to grant.

---

## 2. RFQ delivery — required for the form to reach anyone

Set `RFQ_WEBHOOK_URL` (and `RFQ_WEBHOOK_TOKEN` if the endpoint needs auth).

Until it is set, `POST /api/rfq` validates and logs submissions server-side, and
the confirmation screen tells the buyer plainly that delivery is not configured.
It never claims a message was delivered when it was not.

The integration point is `deliverSubmission()` in `app/api/rfq/route.ts` — a
single function. Replace its body with a mail send, a CRM create or a queue
publish. Everything around it (validation, rate limiting, upload policy, error
shapes) is production behaviour and does not change.

**Rate limiting caveat:** the limiter is in-memory and per-instance. On more than
one instance, the effective limit multiplies by the instance count. Swap
`lib/rate-limit.ts` for Redis or the platform's own limiter before scaling out.

---

## 3. Domain and canonicalisation

- Set `NEXT_PUBLIC_SITE_URL` to the canonical origin. Everything — canonicals,
  sitemaps, OpenGraph, structured data, `llms.txt` — derives from it.
- Pick **one** of www / non-www and 301 the other at the host or CDN.
- Force HTTPS.
- Confirm no staging `noindex` header survives into production.

---

## 4. Search console and indexing

1. Verify the domain property in Google Search Console.
2. Submit `/sitemap.xml` and `/image-sitemap.xml`.
3. Verify in Bing Webmaster Tools and submit the same sitemaps.
4. Set `INDEXNOW_KEY` and publish the key file at `/<key>.txt`. Set
   `INDEXNOW_SECRET`, then submit the launch URLs once:

   ```bash
   curl -X POST https://YOUR-DOMAIN/api/indexnow \
     -H "authorization: Bearer $INDEXNOW_SECRET" \
     -H "content-type: application/json" \
     -d '{"all": true}'
   ```

   After launch, submit only URLs that genuinely changed. Resubmitting the whole
   sitemap on every deploy is the misuse the protocol asks publishers to avoid.

**Request indexing for these first.** Everything else can be discovered:

1. `/`
2. `/apparel-manufacturer-pakistan`
3. `/apparel-exporter-pakistan`
4. `/fob-apparel-manufacturing`
5. `/products/aprons`
6. `/products/uniform-workwear`
7. `/products/polos-tshirts`
8. `/products/fleece-sweatshirts`
9. `/products/woven-shirts`
10. `/products/bottoms`
11. `/products/outerwear`
12. `/development`
13. `/quality`
14. `/manufacturing`
15. `/case-studies/us-uniform-apron-program`
16. `/request-a-quote`

---

## 5. Analytics

No analytics provider is installed. `lib/analytics.ts` pushes to
`window.dataLayer` and `gtag` when either exists, and is a silent no-op
otherwise — so the site ships without a tracker and without dead code.

To enable GA4: add the gtag snippet behind your consent mechanism. Every event
listed in `AnalyticsEvent` will start flowing with no further change.

Events already instrumented: `hero_rfq_click`, `product_view`,
`techpack_upload_start`, `techpack_upload_complete`, `techpack_upload_error`,
`rfq_start`, `rfq_step_complete`, `rfq_submit`, `rfq_submit_error`,
`email_click`, `phone_click`, `mega_menu_open`, `benchmark_start`.

---

## 6. Photography

`assets-needed.md` lists all 57 pending slots with exact paths and subjects,
regenerated by `npm run assets:report`. Master prompts are in
`asset-pack/prompts/`.

Drop a file at the listed path, run `npm run assets`, rebuild. No layout shift,
no code change — the specimen it replaces already occupies the same aspect ratio.

**Two rules for every image:** no logos or identifiable organisations, and no
concept visual presented as documentary proof of a facility or a client.

---

## 7. Legal review

`/privacy`, `/terms` and `/cookies` are **written and live**, drafted from what
the application actually does: the exact fields the RFQ form collects, the
upload policy (types, 15 MB per file, 40 MB per submission), the IP-based rate
limiter, and the fact that no analytics provider is installed. Every statement
is checkable against the code.

They are **drafts pending jurisdiction-specific review**. Each page renders a
notice saying so, and that notice lives in the shared template so it cannot be
lost by editing one page.

Before launch:

1. Have them reviewed against the data-protection law of the markets AHM
   supplies — the UK and EU matter most, since buyers there will ask.
2. Confirm the retention period in the privacy policy matches actual practice.
3. Confirm the governing-law clause in the terms.
4. Update `LEGAL_EFFECTIVE` in `data/legal.ts` and remove
   `LEGAL_REVIEW_NOTICE` from `components/layout/LegalPage.tsx` once reviewed.

If analytics are added later, the cookie notice must be updated **before** the
provider is switched on, and it must load behind consent.

## 8. Verify after deploying

```bash
npm run build && npm run start &
npm run audit
```

The audit crawls every URL in the published sitemap and fails on: non-200s,
duplicate or missing titles, missing or duplicate meta descriptions, missing or
multiple H1s, canonical mismatches, accidental `noindex`, invalid JSON-LD,
images without alt text, broken internal links and orphan pages.

Last local run: **52 routes, 52 unique titles, 0 errors, 0 warnings.**
