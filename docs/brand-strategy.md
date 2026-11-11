# Brand visibility strategy (November 2026)

## Where AHM appears today (searched 10 November 2026)

| Search | What comes up | What it means |
|---|---|---|
| "AHM International" Karachi apparel | The GitHub repository (now private), unrelated look-alikes (A.H. International, AMH & Co, AHM General Trading) | The website was not in the results; the code was. Anyone checking the name found internal notes and client names. Fixed by making the repository private. |
| "AHM International" apron / uniform | ImportGenius customs record: "M/S AHM International", Karachi, 11 shipments, aprons | Independent evidence of export, outside our control. Useful when a buyer asks for proof; never name the customer ourselves. |
| ahminternationals.com | Nothing from the site | The site is not indexed yet. Search Console is not verified (the DNS TXT record is still pending) and Bing has not been told. |
| apron manufacturer Pakistan | Fibre2Fashion listings, Pakistan Trade Portal, freshdi; competitors such as Crown Industries (Karachi) and Sofar International (Faisalabad) | Buyers and AI assistants find suppliers through directories. AHM is not listed in any of them. |
| uniform workwear manufacturer Karachi | Fibre2Fashion, freshdi, ENSUN, SourceReady, Pakistan Trade Portal | Same: directories decide who is visible. |

AI assistants (ChatGPT, Perplexity, Copilot, Gemini) answer supplier questions
from the same search indexes and directories. They cannot recommend a company
those sources do not mention.

## The strategy, in order

### Stage 1: be findable at all (this week)

1. **Merge PR #10.** It carries the 22 families, 63 item pages, the guides and `llms.txt`.
2. **Google:** add the TXT record in Hostinger DNS, verify in Search Console, submit the sitemap.
3. **Bing Webmaster Tools:** import from Search Console, submit the sitemap. ChatGPT search draws on Bing.
4. **IndexNow:** set `INDEXNOW_KEY` and `INDEXNOW_SECRET` in Vercel, then submit all pages once (`docs/visibility-kit.md`).
5. **Google Business Profile** for the Karachi address, with the website and category "Clothing manufacturer".

### Stage 2: be listed where competitors are (weeks 2 to 4)

Same name, address, phone, email and website on every one ("AHM International, apparel
and apron manufacturer, Karachi"), so search engines join them into one entity and
stop confusing AHM with A.H. International or AMH & Co.

| Listing | Why | Cost |
|---|---|---|
| Pakistan Trade Portal (TDAP), pakistantradeportal.gov.pk | Government B2B portal; its product pages rank for searches like "bib apron" | Free |
| Fibre2Fashion | Dominates "apron suppliers Pakistan" and "workwear suppliers Karachi" results | Free listing, paid upgrades |
| Europages, Kompass | European buyers' directories | Free basic |
| LinkedIn company page | Buyers check it; posts link to the guides | Free |
| SourceReady, ENSUN, freshdi | Appear in supplier searches; claim or create the profile | Free basic |
| Chamber of commerce and PRGMEA membership listings | Trusted, linked member directories | Membership |
| REX registration (for EU GSP+) | Required to declare origin for EU preferential duty; also a credibility signal | Free, via TDAP |

List only what the website states. Leave capacity, certifications and MOQ as
"on request" until they are verified.

### Stage 3: proof that search engines and buyers trust (months 2 to 3)

1. **Real photographs.** The biggest trust gap: every product image is a labelled AI
   render. Photographs of real garments, the cutting and sewing floor and packing
   (shot list in `assets-needed.md`) do more for buyers than any page.
2. **A named reference.** Ask the US apron customer whether they will be a reference
   or a short case study. Publish only with written permission.
3. **One LinkedIn post a week** linking to a guide (drafts in `docs/visibility-kit.md`).
4. **Contributed articles to trade media** (for example Fibre2Fashion's article section):
   one genuinely useful article, such as the GSM or bib-apron guide, adapted and credited.
   Editorial, not paid links.
5. **Trade fairs.** TDAP's Texpo, and for aprons and kitchen textiles, Heimtextil
   (Frankfurt): exhibitor lists are indexed and buyers search them.

### Stage 4: keep score (monthly)

- Search Console and Bing: impressions and position for "apron manufacturer Pakistan",
  "bib apron manufacturer", "uniform manufacturer Karachi", "AHM International".
- `/pipeline/traffic`: visits by platform, including ChatGPT, Perplexity, Claude,
  Gemini and Copilot, and enquiries per day.
- Ask ChatGPT, Perplexity and Copilot once a month: "Who makes bib aprons in Pakistan?"
  and "Uniform manufacturers in Karachi". Record whether AHM appears.
- Every quarter, write the next guides for the questions Search Console shows people asking.

## What will not help, and can hurt

- Buying links, link farms, paid "guest posts", or posting the same article on many sites.
- Fake or staff-written reviews.
- Claims on listings the website does not make.
- Mass-produced AI articles.

## Honest expectation

No one can guarantee first place on every search or in every AI answer. A new
domain usually takes weeks to be indexed and months to rank for competitive terms.
The aim is to be the clearest, best-documented and most consistently listed apron
and uniform manufacturer in Karachi. That is what search engines and AI assistants
reward over time.

Sources checked: GitHub search results for the repository;
[ImportGenius: M/S AHM International](https://www.importgenius.com/suppliers/m-s-ahm-international);
[Fibre2Fashion apron suppliers in Pakistan](https://www.fibre2fashion.com/hometextiles/pakistan-apron-suppliers-p2156-c126);
[Fibre2Fashion work wear suppliers in Pakistan](https://www.fibre2fashion.com/garments/pakistan-work-wear-suppliers-p369-c126);
[Pakistan Trade Portal: bib apron listing](https://pakistantradeportal.gov.pk/product/bib-apron-14220);
[Pakistan Trade Portal registration](https://pakistantradeportal.gov.pk/newreg/);
[freshdi: Crown Industries](https://freshdi.com/supplier/CROWN-INDUSTRIES-9SbEua);
[ENSUN: work clothing, Pakistan](https://ensun.io/search/work-clothing/pakistan);
[TDAP REX registration steps](https://tdap.gov.pk/wp-content/uploads/2024/09/1-Simple-Steps-to-REX-Reg.pdf).
