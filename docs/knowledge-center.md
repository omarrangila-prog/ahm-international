# Apparel Knowledge Center: audit, plan and first batch

20 October 2026. Branch `knowledge-center-1`.

This covers the owner's two briefs (the Knowledge Center brief and the Global
Apparel Intelligence master specification). Both ask for far more than one
session can publish well, and both say quality before quantity, so this is the
audit, the plan, and a first batch that is finished and tested. Section 8 says
exactly what is not done.

## 1. What already existed

The site was not a blank slate. The Resources section already had:

- 22 buyer guides in typed blocks, with FAQs, related links and a
  reading-progress bar
- a 39-term glossary and 4 buyer scenarios
- calculators on `/materials` (GSM and oz/yd², swatch weight, roll weight,
  shrinkage, fabric compare, hand-feel) and an Incoterms chain on `/export`
- five sourcing pillar pages, including `/fob-apparel-manufacturing`
- an RFQ flow, a private tech-pack upload and a sourcing assistant grounded in
  the site's own content

None of that was rebuilt. The work extends it.

## 2. Content inventory

Words are visible text (headings, body, tables, FAQs), counted from the data,
not estimated. "Inbound" is links from other guides and sourcing pillars only;
product, industry and navigation links are not in this count, so a low number
means "check", not "orphan". Classification is a judgement, not a word-count
rule: it weighs the question the page answers against how well it does.

| Guide | Topics | Words | Inbound | Class | Note |
|---|---|---|---|---|---|
| fabric-gsm-guide | Fabric Science, Textile Education | 1,898 | 3 | **DONE** | Rewritten this batch (section 5) |
| tech-pack-checklist | Manufacturing, Sourcing | 806 | 8 | KEEP | Best linked; needs a downloadable checklist |
| how-fob-costing-works | Import/Export, Sourcing | 777 | 4 | IMPROVE | Add FOB vs FCA/EXW, cost-component explorer |
| poly-cotton-for-workwear | Fabric Science, Uniforms | 682 | 4 | **EXPAND** | Live Search Console query; blend ratios, care |
| pique-vs-jersey-polo-fabric | Fabric Science, Comparisons | 597 | 1 | KEEP | Link from polo product page |
| apparel-sampling-process | Manufacturing, Quality | 855 | 2 | KEEP | |
| embroidery-vs-screen-printing | Printing, Comparisons | 771 | 1 | **EXPAND** | Live Search Console query; decision tool |
| compare-apparel-quotations | Sourcing | 819 | 3 | KEEP | |
| carton-marking-for-apparel | Import/Export | 825 | 1 | KEEP | |
| fabric-shrinkage-guide | Fabric Science, Quality | 741 | 3 | KEEP | |
| polyester-dyeing-for-buyers | Fabric Science | 680 | 2 | KEEP | |
| fabric-consumption-basics | Manufacturing, Sourcing | 632 | 3 | KEEP | |
| knit-constructions-explained | Fabric Science, Textile Education | 547 | 1 | IMPROVE | Diagrams of knit structure |
| understanding-apparel-moq | Sourcing | 527 | 0 | IMPROVE | No inbound guide links |
| heat-transfer-vs-screen-print | Printing, Comparisons | 426 | 1 | **EXPAND** | Thin; fold DTF and sublimation in |
| bib-apron-construction-guide | Aprons, Manufacturing | 423 | 2 | **EXPAND** | The flagship product's core guide |
| how-to-choose-an-apron-manufacturer | Aprons, Sourcing | 590 | 0 | IMPROVE | No inbound guide links |
| apron-sourcing-mistakes | Aprons, Sourcing | 442 | 0 | IMPROVE | No inbound guide links |
| cotton-vs-poly-cotton-aprons | Aprons, Fabric, Comparisons | 364 | 1 | **EXPAND** | Thinnest guide; merge-candidate with poly-cotton |
| garment-inspection-explained | Quality | 512 | 1 | KEEP | |
| evaluating-apparel-samples | Quality, Sourcing | 383 | 1 | IMPROVE | |
| sourcing-uniforms-from-pakistan | Uniforms, Sourcing, Export | 540 | 0 | IMPROVE | No inbound guide links |

Sourcing pillars: `apparel-manufacturer-pakistan` 771 words,
`fob-apparel-manufacturing` 514, `private-label-manufacturing` 511,
`apparel-exporter-pakistan` 493, `garment-manufacturer-karachi` 384.

Nothing is marked REDIRECT or REMOVE. No guide duplicates another's question.
`cotton-vs-poly-cotton-aprons` overlaps `poly-cotton-for-workwear` and is the
one MERGE candidate; it is left alone until Search Console shows whether it has
any impressions of its own.

## 3. Search Console queries to pages

The export gave query text only, with no impressions, clicks or positions, so
nothing below claims a volume or a rank, and a missing figure is not read as
zero. Queries are grouped by what the searcher wants. They live in code
(`queryGroups` in `data/knowledge.ts`), where they drive search and are tested.

| Intent | Queries | Answered by | Decision |
|---|---|---|---|
| What GSM means | gsm materials, fabric gsm guide, gsm meaning in fabric, meaning of gsm in fabric, what is gsm material, what is gsm in fabric, material gsm | `/resources/fabric-gsm-guide` | One page, rewritten. No page per phrasing. |
| FOB as a basis | fob manufacturing, fob production | `/fob-apparel-manufacturing` | Existing commercial page; deepen next batch |
| Poly-cotton workwear | poly cotton workwear | `/resources/poly-cotton-for-workwear` | Existing guide; expand |
| Decoration choice | embroidery vs screen printing | `/resources/embroidery-vs-screen-printing` | Existing guide; expand, add tool |
| Facilities workwear | facilities management workwear | `/industries/facilities` | Page exists (442 words). **No new page yet.** |
| The brand | ahm international | `/` | Brand query; not a Knowledge Center topic |

**On a separate facilities-management page.** The brief allows one only if it
carries substantially unique, useful content supported by AHM capabilities. The
industry page already covers garments, indoor/outdoor use, reflective tape and
trouser failure points. A second page would repeat it. The better move is to
widen the industry page with real job-function detail once the owner supplies
it (which roles, which conditions). Until then no page is created.

## 4. Gap analysis against the briefs

| Area | Status |
|---|---|
| Knowledge Center navigation, topics, search | **Built** (section 5) |
| GSM hub | **Built**: guide, worked examples, tested; calculators already existed |
| Fabric science: composition, weaves, finishes, testing | Partial: shrinkage, knits, polyester, GSM covered. **Missing**: weaves (twill, plain, canvas), fibre pages, colourfastness, pilling, abrasion, finishes, stain release |
| Manufacturing education | Partial: tech pack, sampling, inspection, consumption. **Missing**: marker planning, stitch and seam types, bartacks, cutting, packing |
| Apron knowledge hub | Four guides, 364-590 words each. **Needs the deepest expansion** |
| Workwear and uniforms | One guide plus the industry page. **Missing**: sizing programs, care, durability by role |
| Printing and embroidery | Two guides. **Missing**: DTF, sublimation, artwork, placement, strike-off, thread |
| Incoterms and FOB | Chain tool plus one guide. **Missing**: FOB vs FCA/EXW/CFR/CIF in text, documents, responsibilities table |
| Glossary | 39 terms, no per-term pages. Search now reaches them |
| Downloadable checklists | None. Five proposed in the brief; all are plain-text derivable from existing guides |
| Diagrams (weaves, stitches, pockets) | None. Needs drawn, accurate SVGs, not generated images |
| Translations | Not started, deliberately (section 8) |
| Search Console metrics in the repo | None, deliberately (section 7) |

## 5. What shipped in this batch

**Knowledge Center (`/resources`).** Renamed and reframed with the brief's
tagline. The URL is unchanged, so existing links and rankings are kept. New:

- **Search** over all 22 guides, 39 glossary terms, 5 tools and 8 pages. It
  runs in the browser, so nothing typed leaves the page. It handles question
  words ("what is"), plurals, "-ing" endings, unit variants ("g/m²", "oz/yd²",
  "grams per square metre"), one-letter misspellings, and puts the answering
  page first for every Search Console query above. With few full matches it
  adds clearly labelled related results.
- **Ten topic hubs**, each listing its guides: Fabric Science, Apparel
  Manufacturing, Apron Manufacturing, Uniforms and Workwear, Printing and
  Embroidery, Quality Control, Import and Export, Sourcing and Procurement,
  Textile Education, Product Comparisons. Every guide has at least one topic;
  a test fails the build otherwise.
- **Topic filter chips** in the search, keyboard-operable with `aria-pressed`.
- The static guide library below still works with JavaScript off.

**Guide pages.** A table of contents (sticky on large screens, a disclosure on
phones), anchored section headings with stable ids, a "Work the numbers" band
that links a guide to its calculators, and a new `formula` content block
(formula, terms, worked examples, limits).

**The flagship GSM guide** (`/resources/fabric-gsm-guide`, same URL). 1,898
words, up from about 745. It answers the question first, then covers: what
GSM means; how it is calculated (three worked examples, including the wrong
"multiply by 100" shortcut and why it fails on a 15 × 15 cm swatch); the
exact oz/yd² conversion with examples; how GSM is tested, with the standards
named (ISO 3801, ASTM D3776, EN 12127, ISO 139) and a note that the edition
in the buyer's own spec governs; why GSM is weight, not quality, thickness or
strength; bulk density as a worked example of why GSM alone cannot describe a
cloth; a nine-row table from 120 to 400 gsm with ounces; ranges by garment;
fibre tendencies at equal weight; how to write GSM into a spec (unit, method,
tolerance, before or after finishing); and seven FAQs covering the query
variants. Ranges are labelled as market orientation, never AHM production
specifications.

**Tests (`tests/knowledge.test.ts`, 11).** Every Search Console phrasing leads
to its page first; unlisted phrasings still reach the GSM guide; misspellings
are corrected without guessing between two words; every entry points to a
real route; every guide has a topic; and **every number printed in the GSM
guide is asserted against `lib/gsm.ts`**, including all nine ounce
equivalents, so the text cannot drift from the calculator.

**Honest authorship.** The rewritten guide says "Updated October 2026" and
"Written by the AHM International product development team", not "Reviewed".
Its structured data carries `dateModified` and omits `reviewedBy`. No person
has reviewed this text, and the page no longer implies one did. When someone
does, remove `updated` from `data/guide-gsm.ts` and the review line returns.

## 6. Technical QA

See the results table at the end of this file (section 9).

## 7. Decisions the owner needs to make

1. **Technical review of the GSM guide.** The formulas are tested, but a person
   who knows textiles should read it before it is described as reviewed. The
   standards named should be checked against the editions the team actually
   uses.
2. **Search Console data.** Export queries again with impressions, clicks,
   position, country and device (Performance, Export). The query list above
   came without metrics. With them the roadmap can be ordered by evidence.
3. **Recording unanswered searches.** The site counts searches and zero-result
   searches but not their words, because typed text can contain names or
   addresses and the privacy policy does not cover storing it. If the team
   wants the words, the policy needs a line first. Until then Search Console's
   own query report is the source for missing topics.
4. **Facilities workwear.** Which roles and conditions does AHM actually make
   garments for? That decides whether the industry page grows or a page is
   justified.
5. **Original expertise.** The briefs want AHM's own manufacturing knowledge in
   the guides: real sampling problems, apron construction choices, what has
   gone wrong in production. That cannot be written from outside. A short
   interview per apron topic would turn the thinnest guides into the strongest.

## 8. What is deliberately not done

- **The AI assistant and a RAG layer.** One already exists, grounded in the
  site's content, and the corpus handles the new content block. A new one
  waits until the content is deep enough to retrieve from.
- **Translations and hreflang.** The briefs say to translate only by demand and
  never publish machine translation unreviewed. There is no demand data yet.
- **New calculators.** The tools that exist cover GSM, shrinkage, roll weight
  and comparison. The next two worth building (decoration chooser, FOB cost
  component explorer) need the guide content first so the tool's logic is
  stated in text.
- **Diagrams.** Weave, stitch and pocket diagrams must be drawn and checked.
  Generated images are the wrong tool for technical drawings.
- **Downloadable checklists, article feedback, glossary tooltips, print layout
  for guides.** Useful, lower priority than depth.
- **Several hundred more pages.** The briefs themselves rule out near-duplicate
  pages. 22 guides at 400-1,900 words, improved in order of evidence, beat 200
  thin ones.

## 9. 90-day roadmap

Batches are sized to finish and be reviewed, in this order.

**Days 1-30: finish the search-driven pages**
1. Expand `poly-cotton-for-workwear` (blend ratios, care, where each suits
   uniforms and aprons); decide the merge with `cotton-vs-poly-cotton-aprons`.
2. Expand `embroidery-vs-screen-printing`; fold DTF and sublimation into
   `heat-transfer-vs-screen-print`; build the decoration chooser.
3. Deepen `/fob-apparel-manufacturing` and `how-fob-costing-works`: FOB vs FCA,
   EXW, CFR, CIF in a responsibilities table; the documents; sea-freight
   scope of FOB. Cite Incoterms 2020 and ICC.
4. Technical review of the GSM guide; export fuller Search Console data.

**Days 31-60: the apron hub and workwear**
5. Rewrite the four apron guides to the depth of the GSM guide, adding
   waist-apron and hospitality-apron construction, pocket and strap options,
   sizing, labelling, packing.
6. Widen `/industries/facilities` and add a workwear care and durability guide.
7. Five downloadable checklists (tech pack, supplier evaluation, FOB quote
   comparison, pre-production approval, inspection), each a plain page and a
   print stylesheet, no email gate.

**Days 61-90: fabric depth and diagrams**
8. Weaves guide (plain, twill, canvas, satin) with drawn SVG diagrams.
9. Fibres and finishes (cotton vs polyester vs blends; stain release; easy
   care), with colourfastness, pilling and abrasion as test-method primers.
10. Stitch and seam guide with diagrams; link from the apron guides.
11. Review Search Console for the first 60 days; reorder what remains.

## 10. Search Console monitoring framework

Review monthly (weekly early on), over windows of at least 28 days, comparing
to the previous period.

| Watch | Question | Action threshold |
|---|---|---|
| Queries by landing page | Is each intent group landing on its mapped page? | A group landing elsewhere: fix internal links or title |
| Impressions without clicks | Page one or two, low CTR | Rewrite title and description, not the page |
| Position 8-20 with rising impressions | Close to winning | Deepen that page first |
| New queries with no mapped page | A real gap | Add to the gap table; build only if the page would carry unique material |
| Countries and devices | Do target markets (US, UK, EU, Canada, UAE, Australia) appear? | Informs which language to consider |
| Indexing report | Any guide not indexed? | Check canonical, links, thin content |
| Inquiries by source | Do guide readers reach the RFQ? | `source` already carries the page; compare in `/pipeline` reports |

Rules: a handful of impressions is not a trend; never move a publication date to
look fresh (the `updated` field records real edits); report missing values as
missing.

## 11. Editorial review checklist

Before a guide is described as reviewed, all of these must be true:

- [ ] It answers its main question in the first paragraph.
- [ ] Every figure is either defined (a unit conversion) or sourced, and every
      worked example is asserted in a test.
- [ ] Ranges are labelled as market orientation and never as AHM
      specifications; no capacity, machine, test or certificate is implied.
- [ ] Standards are named with enough detail to ask for them and say the
      buyer's cited edition governs.
- [ ] Anything that varies by country or shipment says so and points to an
      authoritative source. No freight rates, duties or customs rules invented.
- [ ] A named person at AHM with relevant knowledge has read it, and their
      review is recorded in `LAST_REVIEWED`.
- [ ] It is in `guideTopics`, links to the product or tool it leads to, and is
      linked from at least one related guide.
- [ ] No section exists only to reach a word count.

## 12. Results

Run on 20 October 2026 against the branch, dev server, desktop and mobile.

| Check | Result |
|---|---|
| Unit tests | 180 / 180 pass (169 before; 11 new in `tests/knowledge.test.ts`) |
| Typecheck, lint | clean |
| `links` | 89 pages, no broken links |
| `audit`, `seo:deep` | pass, nothing found (two titles trimmed to fit) |
| `images:gaps` | 0 empty frames across 86 routes |
| `contrast` | no text below WCAG AA, 86 routes |
| `targets` | no WCAG 2.5.8 failures |
| `a11y` (axe, 21 routes x 2 widths) | no violations |
| `console` (86 routes) | no errors, exceptions or failed requests |
| Browser: search | all six Search Console phrasings tested lead to their mapped page first; a nonsense query shows the empty state |
| Browser: guide page | all 13 contents links resolve; no horizontal overflow at 390 px; Article schema has `dateModified` and no `reviewedBy` |

**Not measured:** performance (Lighthouse) was not re-run for this batch, and
no field data exists. The resources page now ships the search component and
about 15 kB of search text; it is a client island on one route and does not
touch the homepage.
