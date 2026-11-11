import type { Guide } from "./guides";

/**
 * Buyer guides written for the searches the 10 November 2026 audit found
 * buyers use ("uniform manufacturer Karachi", "apron manufacturer Pakistan")
 * and the questions behind them. Same rules as the other guides: general trade
 * knowledge, no AHM machinery, tests, certifications or capacity, no competitor
 * named, and `updated` rather than a review that has not happened.
 */

const updated = { label: "November 2026", iso: "2026-11-10" };

export const buyerGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "how-to-choose-a-uniform-manufacturer-in-pakistan",
    category: "Commercial guide",
    title: "How to Choose a Uniform Manufacturer in Pakistan: A Buyer's Checklist",
    headline: "Choosing a uniform\nmanufacturer in Pakistan.",
    intro:
      "The questions that separate a capable uniform manufacturer from a trading company with a good website: production, development, quality, documents, communication and terms.",
    summary:
      "Choose a uniform manufacturer in Pakistan by checking, in writing: who actually makes the garments (own units, partner factories or both); whether they can work from your tech pack and return written questions; how they sample and approve; how quality is checked and by whom; their export experience and documents; how they communicate across time zones; and their payment terms. Ask for evidence for every claim, and judge them on the first sample and the first set of questions.",
    readingTime: "8 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "What to ask, and what a good answer looks like",
        columns: ["Question", "A good answer", "A warning sign"],
        rows: [
          ["Who makes the garments?", "Names own units and partner factories, and which makes what", "Vague talk of \"a factory\" with no detail, or refusal to say"],
          ["Can you work from my tech pack?", "Written questions on the open points before quoting", "A price within hours with no questions"],
          ["How do samples work?", "Proto, fit and pre-production stages, with written comments", "One sample, \"same as bulk\""],
          ["How is quality checked?", "In-line and final inspection, to an AQL you agree, with reports", "\"We check everything\""],
          ["Have you exported this product?", "Specific, checkable experience and the documents", "Long lists of famous brands with no proof"],
          ["How do we communicate?", "A named contact, response times, overlap hours", "No single owner of your order"],
          ["What are the payment terms?", "Clear deposit and balance, or a letter of credit", "Full payment before production"],
        ],
      },
      {
        type: "list",
        heading: "Evidence to request",
        items: [
          { term: "Company registration", detail: "SECP registration or the business's registration documents, and the tax number." },
          { term: "Export history", detail: "References you can contact, or shipment documents with sensitive details removed." },
          { term: "Audit reports", detail: "Social compliance or quality audits, with dates and scope, checked with the issuer." },
          { term: "Photographs and video", detail: "Of the actual production floor and your product type, not catalogue images." },
          { term: "A paid sample", detail: "Of your own garment. It shows more than any brochure." },
        ],
      },
      {
        type: "callout",
        heading: "Manufacturer, partner network or trading company",
        body:
          "Many exporters combine their own production with partner factories, and that can work well. What matters is that they say which is which and remain responsible for quality and delivery either way. Ask directly, and get the answer in writing.",
      },
    ],
    faqs: [
      { question: "Where are uniform manufacturers in Pakistan?", answer: "Mainly in Karachi, Lahore, Faisalabad and Sialkot, each with its own strengths. Karachi is the main port city and home to many garment exporters." },
      { question: "How do I verify a Pakistani manufacturer?", answer: "Check company registration, ask for references and audit reports, verify any certificate with its issuer, and order a paid sample of your own garment. An inspection agency can visit for you." },
      { question: "Should I use a manufacturer or a buying house?", answer: "A buying house sources from several factories for you; a manufacturer makes the goods, sometimes with partners. Either can work; ask who is responsible for quality and delivery." },
    ],
    related: [
      { label: "Sourcing uniforms from Pakistan", href: "/resources/sourcing-uniforms-from-pakistan", description: "Uniform programs in particular." },
      { label: "How to import clothing from Pakistan", href: "/resources/how-to-import-clothing-from-pakistan", description: "From tech pack to warehouse." },
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "How AHM works with buyers." },
      { label: "Manufacturing network", href: "/manufacturing-network", description: "How AHM's own and partner production are organised." },
    ],
    seoTitle: "Pakistan Uniform Manufacturer Checklist",
    seoDescription:
      "A buyer's checklist for choosing a uniform manufacturer in Pakistan: production, samples, quality, export experience, communication, terms and evidence.",
  },

  /* ================================================================== */
  {
    slug: "pakistan-apparel-manufacturing-hubs",
    category: "Commercial guide",
    title: "Pakistan's Apparel Manufacturing Hubs: Karachi, Lahore, Faisalabad and Sialkot",
    headline: "Pakistan's apparel\nmanufacturing hubs.",
    intro:
      "Where Pakistan's garment and textile industry is concentrated, what each city is known for, and why the port city matters for FOB exports.",
    summary:
      "Pakistan's apparel and textile industry is concentrated in four cities. Karachi is the main port and a large centre for garments, knitwear, denim and home textiles. Lahore has garment, knitwear and leather apparel makers. Faisalabad is the centre of spinning, weaving and home textiles. Sialkot is known for sportswear, sports goods and gloves. Many buyers source finished garments from one city and fabric from another.",
    readingTime: "6 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "The four main hubs, in outline",
        columns: ["City", "Known for", "Note for buyers"],
        rows: [
          ["Karachi", "Garments, knitwear, denim, home textiles", "Main sea ports (Karachi and Port Qasim), so FOB shipment is local"],
          ["Lahore", "Garments, knitwear, leather apparel", "Ships through Karachi or Port Qasim"],
          ["Faisalabad", "Spinning, weaving, home textiles", "A major source of yarn and fabric"],
          ["Sialkot", "Sportswear, sports goods, gloves", "Specialist sports and martial-arts apparel"],
        ],
      },
      {
        type: "prose",
        heading: "Why the port city matters",
        body: [
          "Under FOB terms the seller's responsibility ends when goods are on board at the named port. A Karachi manufacturer shipping FOB Karachi or Port Qasim moves goods a short distance to the port; an inland manufacturer must truck them first. That affects lead time, the last-minute options before a vessel cut-off, and who manages the move.",
          "Fabric often comes from elsewhere: a Karachi garment maker may buy yarn or fabric from Faisalabad mills. Ask where the fabric comes from, because it decides fabric lead time.",
        ],
      },
      {
        type: "callout",
        heading: "A city is not a capability",
        body:
          "These are broad tendencies, not rules: every city has manufacturers of every kind. Judge a supplier on its own evidence, not its address.",
      },
    ],
    faqs: [
      { question: "Which city in Pakistan is best for garment manufacturing?", answer: "It depends on the product. Karachi has the ports and many garment exporters; Sialkot specialises in sportswear; Faisalabad in fabric and home textiles; Lahore in garments and leather." },
      { question: "Where do Pakistani garments ship from?", answer: "Mostly from Karachi Port and Port Qasim, both in Karachi." },
      { question: "Is Sialkot good for sportswear?", answer: "Sialkot is known internationally for sports goods and sportswear, including team kits and martial-arts uniforms." },
    ],
    related: [
      { label: "How to choose a uniform manufacturer in Pakistan", href: "/resources/how-to-choose-a-uniform-manufacturer-in-pakistan", description: "The buyer's checklist." },
      { label: "FOB vs other Incoterms", href: "/resources/fob-vs-other-incoterms", description: "What FOB Karachi includes." },
      { label: "Export and shipping", href: "/export", description: "How AHM ships FOB from Port Qasim." },
    ],
    seoTitle: "Pakistan's Apparel Manufacturing Hubs",
    seoDescription:
      "Karachi, Lahore, Faisalabad and Sialkot compared: what each city's apparel and textile industry is known for, and why the port matters for FOB.",
  },

  /* ================================================================== */
  {
    slug: "embroidery-digitizing-and-stitch-count",
    category: "Buyer guide",
    title: "Logo Embroidery: Digitizing, Stitch Count, Size and Backing",
    headline: "Logo embroidery,\nfrom artwork to stitch.",
    intro:
      "How a logo becomes embroidery: digitizing, stitch count and what it costs, the smallest text that works, thread choices, backing for knits and wovens, and how to approve a sew-out.",
    summary:
      "Embroidery starts with digitizing: turning artwork into a stitch file that tells the machine every stitch. Stitch count drives time and cost, and fine detail and very small text (under about 5 mm) do not stitch cleanly. Polyester thread resists bleach better than rayon. Knits need a cutaway backing so the design does not distort; wovens can use tearaway. Approve a sew-out on the production fabric before bulk.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "list",
        heading: "From artwork to embroidery",
        items: [
          { term: "Artwork", detail: "A vector file, with thread colours given as references." },
          { term: "Digitizing", detail: "A digitizer builds the stitch file: stitch types, direction, density, underlay and compensation for fabric pull." },
          { term: "Sew-out", detail: "The design stitched on the production fabric for approval." },
          { term: "Bulk", detail: "Embroidered on cut panels before assembly, or on finished garments, to the approved sew-out." },
        ],
      },
      {
        type: "table",
        heading: "Choices that change the result",
        columns: ["Choice", "Options", "Effect"],
        rows: [
          ["Thread", "Polyester or rayon", "Polyester is more colourfast to bleach; rayon has more sheen"],
          ["Backing", "Cutaway or tearaway", "Cutaway supports knits so designs do not distort; tearaway suits stable wovens"],
          ["Size", "Width and height in mm", "Smaller designs lose detail; small text below about 5 mm closes up"],
          ["Style", "Flat, 3D puff, applique", "3D puff suits bold shapes; applique fills large areas with fabric instead of stitches"],
        ],
      },
      {
        type: "callout",
        heading: "Stitch count is the cost",
        body:
          "Machine time follows stitch count, so a dense, large design costs more than an outline. If cost matters, ask for the stitch count with the quotation and consider reducing fill areas or using an applique or patch.",
      },
    ],
    faqs: [
      { question: "What is embroidery digitizing?", answer: "Converting artwork into a machine stitch file that defines every stitch, its type, direction and density." },
      { question: "How small can embroidered text be?", answer: "Text below about 5 mm tall tends to close up. Bold, simple lettering works best at small sizes." },
      { question: "Why does embroidery pucker on polos?", answer: "Knits stretch. Without a cutaway backing and correct density, the stitches pull the fabric. Approve a sew-out on the actual polo fabric." },
    ],
    related: [
      { label: "Embroidery vs screen printing", href: "/resources/embroidery-vs-screen-printing", description: "Which method suits which logo." },
      { label: "Cap construction explained", href: "/resources/cap-construction-explained", description: "Embroidery on caps." },
      { label: "Garment manufacturer in Karachi", href: "/garment-manufacturer-karachi", description: "How AHM develops and produces programs." },
    ],
    seoTitle: "Embroidery Digitizing & Stitch Count",
    seoDescription:
      "How logo embroidery works: digitizing, stitch count and cost, minimum text size, polyester vs rayon thread, backing for knits and wovens, and sew-outs.",
  },

  /* ================================================================== */
  {
    slug: "restaurant-and-hotel-uniform-programs",
    category: "Buyer guide",
    title: "Restaurant and Hotel Uniform Programs: Planning and Sourcing",
    headline: "Restaurant and hotel\nuniform programs.",
    intro:
      "How to plan a hospitality uniform program across front and back of house: roles and garments, fabric for the laundry, colour across garment types, sizing, stock and reorders.",
    summary:
      "A hospitality uniform program starts from roles, not garments: what each role does, where it is seen, and how it is laundered. Back-of-house garments (chef coats, trousers, aprons, caps) are chosen for heat and hard laundering; front-of-house garments (shirts, polos, waistcoats, aprons) for appearance and easy care. Colour is approved across all garment types together, sizes are planned from the team, and a reorder plan keeps the look consistent as staff change.",
    readingTime: "7 min read",
    updated,
    heroAsset: "products.apron.front",
    blocks: [
      {
        type: "table",
        heading: "Roles and garments",
        columns: ["Role", "Typical garments", "What matters"],
        rows: [
          ["Kitchen", "Chef coat, chef trouser, bib apron, skull cap", "Heat, stains, hot laundering"],
          ["Service", "Shirt or polo, waist apron, waistcoat", "Appearance, pockets, easy care"],
          ["Bar and barista", "Shirt or tee, bib or waist apron", "Splashes, movement"],
          ["Reception", "Shirt or blouse, jacket", "Appearance through a long shift"],
          ["Housekeeping", "Tunic or polo, trouser", "Movement, chemical resistance, comfort"],
        ],
      },
      {
        type: "list",
        heading: "Planning steps",
        items: [
          { term: "Roles and counts", detail: "How many people in each role, and how many sets each needs for the laundry cycle." },
          { term: "Fabric and laundry", detail: "Who launders (on site, contractor or staff) and how, before fabric is chosen." },
          { term: "Colour", detail: "One standard approved across knits, wovens and aprons together." },
          { term: "Sizes", detail: "A size breakdown from the team, plus spares." },
          { term: "Reorders", detail: "Reorder points and lead times so new staff are dressed the same as the first delivery." },
        ],
      },
      {
        type: "callout",
        heading: "Sets per person",
        body:
          "Plan enough sets per person to cover the laundry cycle, so a garment can be in the wash while another is worn. Too few sets and garments wear out faster, too many and stock sits unused.",
      },
    ],
    faqs: [
      { question: "How many uniforms does each restaurant employee need?", answer: "Enough sets to cover the laundry cycle, often three or more for kitchen staff who change daily. Plan from shifts and how laundry is done." },
      { question: "Should front and back of house match?", answer: "In colour and branding, often yes; in garment type and fabric, no. Each is chosen for its job and approved together for colour." },
      { question: "How do we keep reorders consistent?", answer: "Keep the approved colour standard and specification on file, and reorder from the same fabric source where possible." },
    ],
    related: [
      { label: "Chef coat specification", href: "/resources/chef-coat-specification", description: "The chef coat in detail." },
      { label: "Types of aprons", href: "/resources/apron-types-and-specification", description: "Bib, waist and cross-back aprons." },
      { label: "Hospitality industry", href: "/industries/hospitality", description: "AHM's hospitality programs." },
    ],
    seoTitle: "Restaurant & Hotel Uniform Programs",
    seoDescription:
      "Planning a restaurant or hotel uniform program: roles and garments, fabric for the laundry, colour across garment types, sets per person and reorders.",
  },

  /* ================================================================== */
  {
    slug: "corporate-uniform-program-management",
    category: "Commercial guide",
    title: "Running a Corporate Uniform Program: Rollout, Sizing and Reorders",
    headline: "Running a corporate\nuniform program.",
    intro:
      "What happens after the first order: size breakdowns, wearer allocations, stock and reorder points, replacements, new starters and keeping colour and fit the same for years.",
    summary:
      "A corporate uniform program is a supply chain, not a single order. It needs a size breakdown that matches the workforce, an allocation per wearer, stock and reorder points that cover the manufacturer's lead time, a plan for replacements and new starters, and a locked specification so every reorder matches the first delivery. Most problems come from running out of sizes, or from a reorder that does not quite match.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "list",
        heading: "The parts of a program",
        items: [
          { term: "Specification lock", detail: "The approved sample, colour standard and specification kept on file for every reorder." },
          { term: "Size breakdown", detail: "From a size survey or past orders, not a standard curve." },
          { term: "Allocation", detail: "How many of each garment each role receives, and how often it is replaced." },
          { term: "Stock and reorder point", detail: "Enough stock to cover demand during the manufacturer's lead time, plus a buffer." },
          { term: "New starters and leavers", detail: "A process for issuing and recovering garments." },
        ],
      },
      {
        type: "prose",
        heading: "Why reorders drift",
        body: [
          "A reorder can differ from the first delivery if the fabric comes from a different lot or mill, the colour is matched to the last delivery instead of the standard, or a trim is substituted. Matching every lot to the original approved standard, and recording fabric and trim sources, keeps a program consistent for years.",
        ],
      },
      {
        type: "callout",
        heading: "Run the numbers",
        body:
          "Before a reorder, check stock by size against the size breakdown. Sizes rarely run out evenly; reordering only the totals leaves some sizes short and others overstocked.",
      },
    ],
    faqs: [
      { question: "How do I work out uniform sizes for a company?", answer: "Run a size survey or use past orders to build a size breakdown, then add spares for the most common sizes." },
      { question: "How often should uniforms be replaced?", answer: "It depends on the garment, the job and the laundering. Set a replacement cycle per garment and review it against wear." },
      { question: "How do we make sure reorders match?", answer: "Keep the approved sample and colour standard, match every lot to the original standard, and record fabric and trim sources." },
    ],
    related: [
      { label: "Size grading explained", href: "/resources/size-grading-explained", description: "How sizes are built from one pattern." },
      { label: "Lab dips and colour approval", href: "/resources/lab-dips-and-colour-approval", description: "Keeping colour consistent." },
      { label: "Corporate industry", href: "/industries/corporate", description: "AHM's corporate uniform programs." },
    ],
    tools: [{ label: "Size run splitter", href: "/resources/calculators#size-run", description: "Split an order across sizes." }],
    seoTitle: "Corporate Uniform Program Management",
    seoDescription:
      "Running a corporate uniform program: specification lock, size breakdowns, allocations, stock and reorder points, replacements and consistent reorders.",
  },

  /* ================================================================== */
  {
    slug: "payment-terms-for-apparel-orders",
    category: "Commercial guide",
    title: "Payment Terms for Apparel Orders: TT, Letters of Credit and More",
    headline: "Payment terms for\napparel orders.",
    intro:
      "The common ways buyers pay garment exporters, who carries the risk in each, and how to choose terms for a first order and for a repeat program.",
    summary:
      "Apparel orders are commonly paid by telegraphic transfer (TT), often a deposit with the order and the balance against shipping documents; by letter of credit (LC), where banks pay against compliant documents under the ICC's UCP 600 rules; by documents against payment (D/P) or acceptance (D/A); or on open account for trusted relationships. Each balances risk between buyer and seller differently. First orders usually use a deposit and balance or an LC; open account comes with a track record.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "The common terms",
        columns: ["Term", "How it works", "Risk"],
        rows: [
          ["TT deposit and balance", "A deposit with the order; the balance before or against shipping documents", "Shared; depends on the deposit and when the balance is paid"],
          ["Letter of credit (LC)", "The buyer's bank pays when the seller presents documents that comply with the LC", "Lower for both, if documents are right; bank fees apply"],
          ["Documents against payment (D/P)", "Banks release documents when the buyer pays", "The seller risks the buyer not paying while goods are in transit"],
          ["Documents against acceptance (D/A)", "Documents released when the buyer accepts a bill to pay later", "Higher for the seller"],
          ["Open account", "Goods shipped, buyer pays later on agreed terms", "Highest for the seller; for trusted relationships"],
        ],
      },
      {
        type: "prose",
        heading: "Letters of credit and documents",
        body: [
          "An LC pays only against documents that match its terms exactly: invoice, packing list, bill of lading, certificate of origin and any inspection certificate. A spelling difference can delay payment. Agree the LC wording before it is issued, and make sure every date and description can be met.",
        ],
      },
      {
        type: "callout",
        heading: "Put it in the purchase order",
        body:
          "Payment terms, the price basis (FOB, FCA, CIF), the currency and what triggers each payment belong in the written purchase order, agreed before production starts.",
      },
    ],
    faqs: [
      { question: "What payment terms are normal for a first apparel order?", answer: "A deposit with the order and the balance against shipping documents, or a letter of credit. Open account usually comes after a track record." },
      { question: "What is a letter of credit?", answer: "A bank's undertaking to pay the seller when it presents documents that comply with the credit's terms, usually under the ICC's UCP 600 rules." },
      { question: "What does TT mean?", answer: "Telegraphic transfer: a bank wire transfer." },
    ],
    related: [
      { label: "Export documents for apparel", href: "/resources/export-documents-for-apparel", description: "The documents an LC asks for." },
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "What an FOB price includes." },
      { label: "Compare apparel quotations", href: "/resources/compare-apparel-quotations", description: "Comparing like with like." },
    ],
    seoTitle: "Payment Terms for Apparel Orders",
    seoDescription:
      "TT deposit and balance, letters of credit, D/P, D/A and open account for apparel orders: how each works, who carries the risk, and what to agree.",
  },

  /* ================================================================== */
  {
    slug: "sustainable-uniform-fabrics",
    category: "Fabric guide",
    title: "Sustainable Uniform Fabrics: Recycled Polyester, Organic Cotton and Claims",
    headline: "Sustainable uniform\nfabrics, honestly.",
    intro:
      "Recycled polyester, organic and preferred cotton, and blends for uniforms: what each changes, how claims are certified, and why a green claim now needs evidence behind it.",
    summary:
      "The common lower-impact choices for uniforms are recycled polyester (often from plastic bottles, certified by GRS or RCS), organic cotton (certified by GOTS or OCS) and cotton grown under programmes such as Better Cotton. Durability matters as much as fibre: a uniform that lasts longer is replaced less often. Any environmental claim needs certification through the supply chain, and rules on green claims are tightening, for example under the EU's Directive (EU) 2024/825.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "table",
        heading: "Options and their evidence",
        columns: ["Option", "What it is", "Evidence"],
        rows: [
          ["Recycled polyester", "Polyester made from recycled material, often PET bottles", "GRS or RCS certificates and transaction certificates"],
          ["Organic cotton", "Cotton grown without synthetic pesticides and fertilisers", "GOTS or OCS certificates and transaction certificates"],
          ["Better Cotton", "Cotton grown under a farming standard, mostly traced by mass balance", "Programme membership; claims follow its rules"],
          ["Recycled cotton", "Cotton fibre recovered from waste", "GRS or RCS"],
        ],
      },
      {
        type: "prose",
        heading: "Durability is part of it",
        body: [
          "A uniform that lasts twice as long halves the number made. Fabric weight, construction and laundering decide durability, so a durable poly-cotton garment can have a lower footprint than a fragile organic one replaced twice as often. Consider both.",
        ],
      },
      {
        type: "callout",
        heading: "Claims need certificates",
        body:
          "A label or website that says recycled or organic needs certification through each step of the supply chain and a transaction certificate for the order. Generic claims such as \"eco-friendly\" are increasingly restricted; say what is certified and by whom.",
      },
    ],
    faqs: [
      { question: "Is recycled polyester good for uniforms?", answer: "It performs like virgin polyester and suits poly-cotton uniform fabrics. Claims need GRS or RCS certification through the supply chain." },
      { question: "What is the difference between GOTS and OCS?", answer: "Both certify organic content. GOTS also covers processing, chemicals and social criteria; OCS tracks organic content only." },
      { question: "Can a uniform be called sustainable?", answer: "Generic claims are increasingly restricted. Make specific, certified claims, such as the recycled content and its certificate." },
    ],
    related: [
      { label: "Apparel certifications explained", href: "/resources/apparel-certifications-explained", description: "What each certificate covers." },
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why the blend lasts." },
      { label: "Sustainability", href: "/sustainability", description: "What AHM says, and does not, about sustainability." },
    ],
    seoTitle: "Sustainable Uniform Fabrics",
    seoDescription:
      "Recycled polyester, organic cotton and Better Cotton for uniforms: what each changes, how claims are certified (GRS, GOTS, OCS) and green-claim rules.",
  },

  /* ================================================================== */
  {
    slug: "school-uniform-sourcing",
    category: "Buyer guide",
    title: "School Uniform Sourcing: Garments, Fabrics, Sizes and Timing",
    headline: "Sourcing school\nuniforms.",
    intro:
      "What a school uniform range includes, which fabrics survive the playground and the washing machine, sizing by age, crests and colours, children's safety rules, and the school-year calendar.",
    summary:
      "A school uniform range usually covers polos or shirts, trousers, skirts or shorts, knitwear and outerwear, in the school's colours with an embroidered crest. Fabrics are chosen for durability and home washing (poly-cotton and polyester-viscose blends are common). Sizes run by age, and children's products must meet the destination market's safety rules. Timing matters most: stock must arrive before the new school year, so development starts many months earlier.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "The usual range",
        columns: ["Garment", "Common fabric", "Note"],
        rows: [
          ["Polo or shirt", "Poly-cotton pique or poplin", "Embroidered crest, easy care"],
          ["Trousers, skirts, shorts", "Polyester-viscose or poly-cotton twill", "Adjustable waists for growing children"],
          ["Knitwear", "Acrylic or cotton-acrylic", "School colours, sometimes a striped neck"],
          ["Outerwear", "Polyester shell, fleece", "Name label area inside"],
        ],
      },
      {
        type: "list",
        heading: "What to specify",
        items: [
          { term: "Colours", detail: "Approved standards for each colour, held for years so new stock matches old." },
          { term: "Crest", detail: "Embroidery size, position and thread colours, approved on a sew-out." },
          { term: "Sizes", detail: "By age, with height and chest, and adjustable waists where useful." },
          { term: "Durability", detail: "Reinforced knees and seams, and fabrics tested for pilling and abrasion." },
          { term: "Safety", detail: "Children's product rules for each market, such as US testing and certification for under-12 products." },
        ],
      },
      {
        type: "callout",
        heading: "Work back from the first day of term",
        body:
          "Stock must be in shops or schools before term starts. Count back through shipping, production, bulk fabric and sampling, and start development early enough to absorb one round of changes.",
      },
    ],
    faqs: [
      { question: "What fabric is best for school uniforms?", answer: "Durable, easy-care blends: poly-cotton for shirts and polos, polyester-viscose or poly-cotton twill for trousers and skirts." },
      { question: "Do school uniforms need safety testing?", answer: "Children's clothing must meet the destination market's rules. In the US, products for children 12 and under need third-party testing and a Children's Product Certificate." },
      { question: "When should a school order uniforms?", answer: "Early enough that stock arrives before term, counting back through shipping, production, fabric and sampling." },
    ],
    related: [
      { label: "Children's clothing safety requirements", href: "/resources/childrens-clothing-safety-requirements", description: "Testing, cords and chemicals." },
      { label: "Knitwear explained", href: "/resources/knitwear-gauge-and-yarn", description: "School knitwear by gauge and yarn." },
      { label: "Kidswear", href: "/products/kidswear", description: "Children's garments and school uniform." },
    ],
    seoTitle: "School Uniform Sourcing Guide",
    seoDescription:
      "How to source school uniforms: the usual range, fabrics for durability and home washing, sizes by age, crests and colours, safety rules and timing.",
  },
];
