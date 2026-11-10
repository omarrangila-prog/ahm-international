# Visibility kit: what only the owner can do

The website is built to be easy for Google, Bing and AI assistants (ChatGPT,
Perplexity, Claude, Gemini, Copilot) to read and quote: one page per product
and per question, structured data on every page, a sitemap, and `/llms.txt`
describing every product and guide. What follows happens off the website and
needs the owner's accounts. Nothing here guarantees a ranking or an AI
citation; these are the steps that make them possible.

## 1. Get the site into the search indexes (do these first)

| Step | Why it matters | Where |
|---|---|---|
| Add the Google TXT record in Hostinger DNS (`google-site-verification=XMKzs9roKymnTXxzKboS9xRhsCjkruPvHvWUeYTzVps`), then submit `https://www.ahminternationals.com/sitemap.xml` in Search Console | Google indexes every page faster, and Search Console shows the real searches people use to find you | search.google.com/search-console |
| Add the site to **Bing Webmaster Tools** (it can import from Search Console) and submit the sitemap | ChatGPT search and Microsoft Copilot draw heavily on Bing's index | bing.com/webmasters |
| Set `INDEXNOW_KEY` (8 to 128 letters, digits or dashes; any random string) and `INDEXNOW_SECRET` (a different random string) in Vercel, then redeploy | The site can then tell Bing and others about new pages the day they go live (`/api/indexnow` already exists) | Vercel → Project → Settings → Environment Variables |
| Then tell IndexNow about every page once: in your own terminal, `curl -X POST https://www.ahminternationals.com/api/indexnow -H "Authorization: Bearer YOUR_INDEXNOW_SECRET" -H "content-type: application/json" -d '{"all":true}'` | One submission at launch; after that, submit only pages that change | Your terminal |
| Create or claim a **Google Business Profile** for the Karachi address | Shows AHM in Google Maps and "manufacturer near…" results, and is a trusted source for AI answers | business.google.com |

## 2. Be findable where buyers look

List AHM, with the same name, address, phone and website everywhere (consistency
is what search engines check):

- **LinkedIn company page.** Post the guides (drafts below).
- **B2B directories** buyers use: Europages, Kompass, Alibaba (if you sell there), the
  Trade Development Authority of Pakistan (TDAP) exporter listings, and your
  chamber of commerce or trade association directory.
- **Trade associations** you belong to: their member lists link to you.

Only list facts that are true and published on the site. A directory that asks
for capacity, certifications or MOQ: leave them blank or "on request", as the site does.

## 3. LinkedIn posts, ready to publish

Post one a week from the company page (and share from your own profile). Each
links to a real guide on the site.

**1. GSM**
> Buyers in the US and UK specify fabric in oz/yd². Mills in Pakistan quote GSM.
> The conversion is exact: 1 oz/yd² = 33.906 GSM. Our guide explains how GSM is
> measured, what weight suits each garment, and why a hand-cut swatch can be 125% off.
> https://www.ahminternationals.com/resources/fabric-gsm-guide

**2. Importing from Pakistan**
> Thinking of sourcing apparel from Pakistan? The steps from tech pack to your
> warehouse: supplier checks, samples, payment, inspection, FOB shipping, HS codes,
> and the EU GSP+ and UK DCTS duty preferences.
> https://www.ahminternationals.com/resources/how-to-import-clothing-from-pakistan

**3. Aprons**
> An apron fails at three places: pocket corners, strap attachments and tie anchors.
> What a bib apron specification should state so the factory builds the apron you meant.
> https://www.ahminternationals.com/products/aprons/bib-apron

**4. Certifications**
> OEKO-TEX, GOTS, GRS, WRAP, BSCI, SMETA: which are certificates, which are audits,
> and how to check one is real and covers your order.
> https://www.ahminternationals.com/resources/apparel-certifications-explained

**5. Free calculators**
> Fabric weight, marker consumption, FOB cost sheet, carton CBM, size runs and more:
> free apparel calculators, no sign-up, nothing you type leaves your browser.
> https://www.ahminternationals.com/resources/calculators

## 4. What not to do

These are the shortcuts that get a site demoted or distrusted by search engines
and AI systems:

- Buying links, link exchanges, or paying for "guest posts" on unrelated sites.
- Posting the same article on many websites, or mass-produced AI articles.
- Fake reviews, or reviews written by staff.
- Claims on directories that the website does not make (capacity, certifications,
  famous clients).

## 5. What to measure

- **Search Console:** queries, impressions, clicks and position for each page.
- **Bing Webmaster Tools:** the same for Bing (and so, indirectly, ChatGPT search).
- **`/pipeline/traffic`:** daily visitors by platform, including visits that come from
  ChatGPT, Perplexity, Claude, Gemini and Copilot, and enquiries per day.

Send the Search Console export when it has a few weeks of data: the next pages
and guides should be written for the questions people actually search.
