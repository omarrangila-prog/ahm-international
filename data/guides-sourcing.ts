import type { Guide } from "./guides";

/**
 * Sourcing guides added with the brief of 10 October 2026.
 *
 * The brief listed ten topics for buyers; five were already published (MOQ,
 * GSM, tech pack, FOB costing, sampling). These are the rest, plus the apron
 * fabric comparison the backlog had promised.
 *
 * The rules the other guides follow apply here: no statistic that cannot be
 * sourced, no buyer-specific standard presented as universal, and nothing said
 * about AHM beyond what is documented elsewhere on the site. Where a fact
 * depends on the buyer's country or contract (duty, preference schemes, transit
 * times), the guide says who to confirm it with rather than quoting a figure.
 */

export const sourcingGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "how-to-choose-an-apron-manufacturer",
    category: "Buyer guide",
    title: "How to Choose an Apron Manufacturer",
    headline: "Choosing an\napron manufacturer.",
    intro:
      "What separates a supplier who can make an apron from one who can run an apron program: the questions to ask, the evidence to request, and the test that settles it.",
    summary:
      "Judge an apron manufacturer on four things: whether they question your construction (pockets, straps, reinforcement, fabric) before quoting, whether their quotation is itemised enough to compare, whether a sample made to your specification survives your own wash test, and whether they can evidence export experience in the product. A low first price on an under-specified apron is the commonest way a program goes wrong.",
    readingTime: "7 min read",
    heroAsset: "products.apron.front",
    blocks: [
      {
        type: "list",
        heading: "What to look for",
        items: [
          {
            term: "Questions before a price",
            detail:
              "A capable supplier asks about pocket layout, strap and tie configuration, hardware, fabric weight and finish before quoting. One that prices from a photograph alone is pricing a guess.",
          },
          {
            term: "Construction they can explain",
            detail:
              "Ask where they bar-tack and why. The answer should name pocket mouths and strap attachments, the points where aprons fail first.",
          },
          {
            term: "Fabric knowledge",
            detail:
              "They should talk about composition, weight with a tolerance, and how a finish such as stain release changes shade and hand.",
          },
          {
            term: "Evidence of export",
            detail:
              "Documented shipments in the product class, export paperwork they can show you, and no objection to your inspection agency.",
          },
          {
            term: "A quotation you can compare",
            detail:
              "Fabric, construction, decoration, labels, packing and the Incoterm stated, so a second quotation can be checked against it line by line.",
          },
        ],
      },
      {
        type: "steps",
        heading: "A practical shortlist process",
        steps: [
          { title: "Send the same brief to each", body: "Identical specification, quantity and destination, so a difference in price is a difference in the offer." },
          { title: "Compare the questions, not only the prices", body: "The supplier who asked about your strap hardware has read the brief." },
          { title: "Sample against your standard", body: "Wash the sample the way your program will be laundered, and measure it against your size specification." },
          { title: "Check what the claims rest on", body: "Registration, export records and inspection access. Ask for documents rather than reading certificates off a website." },
          { title: "Start with one style", body: "A single style tests communication, sampling and bulk before a whole program depends on them." },
        ],
      },
      {
        type: "table",
        heading: "Warning signs, and what they usually mean",
        columns: ["What you see", "What it usually means"],
        rows: [
          ["A price before any question about construction", "The quotation assumes the cheapest answer to every open point."],
          ["A fabric weight with no tolerance", "Bulk fabric can arrive lighter than the sample and still be described as in specification."],
          ["Certificates shown without numbers or expiry dates", "The certificate may not exist, or may belong to someone else."],
          ["Reluctance about third-party inspection", "The supplier does not expect the bulk to match the sample."],
          ["The same unit price at every quantity", "Fabric minimums and setup have not been costed."],
        ],
      },
      {
        type: "callout",
        heading: "Apply the same tests to us",
        body:
          "AHM International has documented FOB export production of a 65/35 poly-cotton bib apron program to the United States, published as an anonymised case study. Everything above applies to AHM as much as to anyone else, and the verification page sets out how to check.",
      },
    ],
    faqs: [
      {
        question: "Should I choose the cheapest quotation?",
        answer:
          "Only if the quotations describe the same apron. Normalise fabric, weight, construction, decoration and packing first. The cheapest comparable quotation is a fair choice; the cheapest incomparable one usually is not.",
      },
      {
        question: "How many suppliers should I compare?",
        answer:
          "Enough to see a range, few enough to give each a complete brief. Two or three serious quotations on an identical specification tell you more than many on a vague one.",
      },
      {
        question: "Do I need to visit the factory?",
        answer:
          "Not always. A sample made to your specification and a third-party inspection before shipment answer most of what a visit would. For a large or long-running program, a visit is still worth making.",
      },
    ],
    related: [
      { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB bib apron record." },
      { label: "Apron manufacturing", href: "/products/aprons", description: "Bib, waist and service aprons to specification." },
      { label: "Bib apron construction guide", href: "/resources/bib-apron-construction-guide", description: "Pockets, straps and reinforcement in detail." },
      { label: "How to compare quotations", href: "/resources/compare-apparel-quotations", description: "Making two quotes describe the same garment." },
      { label: "Business verification", href: "/verification", description: "How to check AHM International." },
    ],
    seoTitle: "How to Choose an Apron Manufacturer",
    seoDescription:
      "What to check before choosing an apron manufacturer: construction questions, comparable quotations, sample testing and export evidence.",
  },

  /* ================================================================== */
  {
    slug: "apron-sourcing-mistakes",
    category: "Buyer guide",
    title: "Common Mistakes in Apron Sourcing",
    headline: "Common apron\nsourcing mistakes.",
    intro:
      "Most apron programs that go wrong do so for one of a handful of reasons, and nearly all of them are decided before the first sample is cut.",
    summary:
      "The usual mistakes: briefing by photograph instead of specification, giving fabric weight without a tolerance, ignoring how the apron will be laundered, leaving straps and reinforcement unspecified, approving colour under the wrong light, and comparing quotations that describe different aprons. Each is cheap to fix in the brief and expensive to fix after bulk.",
    readingTime: "6 min read",
    heroAsset: "products.apron.fabric",
    blocks: [
      {
        type: "list",
        heading: "The mistakes, and the fix",
        items: [
          { term: "Briefing by photograph", detail: "A photograph shows shape, not fabric weight, stitch type or hardware. Send measurements and a construction note, or a reference apron." },
          { term: "Weight without a tolerance", detail: "A weight with no acceptable range gives no basis for rejecting a lighter bulk lot. State the weight and the tolerance." },
          { term: "Ignoring the laundry", detail: "Industrial laundering is harsher than domestic washing. Say which your program uses: it changes the fabric, finish and dye choices." },
          { term: "Unspecified straps", detail: "Neck strap length, adjustability and hardware are where wearers notice discomfort first and where hardware fails." },
          { term: "No reinforcement specified", detail: "Pocket mouths and strap attachments need bar-tacks. If the specification is silent, do not assume they are included." },
          { term: "Colour approved under one light", detail: "A shade that matches under store lighting can mismatch in daylight. Agree the light source for lab-dip approval." },
          { term: "Logos sized by eye", detail: "Embroidery size, stitch count and placement change both cost and appearance. Approve a sew-out on the bulk fabric." },
          { term: "Comparing different aprons", detail: "Two quotations for \"a black bib apron\" can describe different fabrics and constructions. Make them describe the same apron before comparing price." },
        ],
      },
      {
        type: "steps",
        heading: "Before you send the brief",
        intro: "Six lines that prevent most of the above.",
        steps: [
          { title: "Role and laundering", body: "Where the apron is worn, and whether it is washed industrially or at home." },
          { title: "Fabric", body: "Composition, weight with a tolerance, colour standard and any stain-release requirement." },
          { title: "Construction", body: "Pocket layout, straps and ties, hardware and reinforcement points." },
          { title: "Decoration", body: "Method, size, placement and colours, with artwork." },
          { title: "Labels and packing", body: "Care and content labels, country of origin, folding, polybag and carton marking." },
          { title: "Commercial", body: "Quantity, size or one-size, destination and the delivery you need." },
        ],
      },
      {
        type: "callout",
        heading: "The cheapest fix is a better brief",
        body:
          "Every mistake on this page costs nothing to prevent at briefing, a sample round to fix at sampling, and a shipment to fix after bulk.",
      },
    ],
    faqs: [
      {
        question: "What fabric weight is typical for aprons?",
        answer:
          "It depends on the fabric and the role. As orientation, the apron programs described on this site sit roughly between 195 and 280 gsm. Your specification decides, with a tolerance.",
      },
      {
        question: "Do aprons shrink?",
        answer:
          "Cotton-rich fabrics shrink more than poly-cotton blends unless they are pre-shrunk. Ask for shrinkage results after the washing method your program actually uses.",
      },
    ],
    related: [
      { label: "Bib apron construction guide", href: "/resources/bib-apron-construction-guide", description: "The construction points in detail." },
      { label: "Cotton vs poly-cotton apron fabric", href: "/resources/cotton-vs-poly-cotton-aprons", description: "Choosing the fabric for the role." },
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "What to ask for, and how it is measured." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete brief contains." },
      { label: "Apron manufacturing", href: "/products/aprons", description: "Send your apron for a like-for-like quotation." },
    ],
    seoTitle: "Common Mistakes in Apron Sourcing",
    seoDescription:
      "The briefing mistakes behind most failed apron programs, from weights without tolerances to unspecified straps, and how to avoid each.",
  },

  /* ================================================================== */
  {
    slug: "cotton-vs-poly-cotton-aprons",
    category: "Fabric guide",
    title: "Cotton vs Poly-Cotton Apron Fabrics",
    headline: "Cotton or\npoly-cotton?",
    intro: "The fabric decision that shapes how an apron looks on the first day and after a hundred washes.",
    summary:
      "Poly-cotton blends such as 65/35 are the usual choice for uniform aprons that are laundered often: they hold shape and colour, crease less and dry faster. Cotton, including canvas, feels more natural and behaves better near heat, but shrinks and fades more unless it is finished for it. The right choice depends on the role, the laundry and the look.",
    readingTime: "5 min read",
    heroAsset: "fabrics.canvas",
    blocks: [
      {
        type: "table",
        heading: "How they compare",
        columns: ["", "65/35 poly-cotton", "Cotton and canvas"],
        rows: [
          ["Shape and creasing", "Holds shape, creases less", "Softens and creases more"],
          ["Colour over washes", "Generally holds well with suitable dyes", "Fades sooner unless dyed and finished for it"],
          ["Shrinkage", "Lower", "Higher unless pre-shrunk"],
          ["Hand feel", "Smoother and crisper", "Softer and more natural"],
          ["Near open heat", "Polyester can melt or glaze", "Chars rather than melts"],
          ["Drying", "Faster", "Slower"],
          ["Typical role", "Retail, grocery, service and high-wash programs", "Kitchen-adjacent, barista and premium front of house"],
        ],
      },
      {
        type: "prose",
        heading: "Stain management",
        body: [
          "Stain-release finishes help both fabrics shed oil- and water-based soils in the wash. They also change hand and sometimes shade, so approve the finished fabric rather than the unfinished cloth.",
          "How well a finish performs depends on the fabric and the laundry. It is confirmed by testing against your requirement, not assumed from a fabric name.",
        ],
      },
      {
        type: "prose",
        heading: "Weight",
        body: [
          "Heavier is not automatically better. A heavier canvas lasts, but it is hotter and stiffer to wear all day; a lighter poly-cotton is cooler and less protective.",
          "Whichever you choose, state the weight with a tolerance, so a lighter bulk lot can be rejected against something written down.",
        ],
      },
      {
        type: "callout",
        heading: "Neither is a protective garment",
        body:
          "Neither fabric is flame-resistant or protective unless it is treated and certified to a standard. If your program needs that, it is a technical qualification to settle before sampling, not a fabric preference.",
      },
    ],
    faqs: [
      {
        question: "Is 65/35 always better for aprons?",
        answer:
          "No. It is the common answer for frequent laundering and colour consistency. For roles near heat, or where a natural look matters most, cotton or canvas is often the better choice.",
      },
      {
        question: "What about cotton-rich blends?",
        answer:
          "Cotton-rich blends sit between the two: softer than 65/35 and more stable than pure cotton. They are worth considering where hand feel matters and laundering is frequent.",
      },
    ],
    related: [
      { label: "65/35 poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why the blend dominates uniforms." },
      { label: "Materials", href: "/materials", description: "Constructions, weights and finishes." },
      { label: "Apron manufacturing", href: "/products/aprons", description: "Fabric options for bib, waist and service aprons." },
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "What changes after the wash." },
    ],
    seoTitle: "Cotton vs Poly-Cotton Apron Fabric",
    seoDescription:
      "Cotton or 65/35 poly-cotton for aprons: shape, colour, shrinkage, heat and laundering compared, with what to put in the specification.",
  },

  /* ================================================================== */
  {
    slug: "garment-inspection-explained",
    category: "Buyer guide",
    title: "Garment Inspection Explained",
    headline: "Garment inspection,\nexplained.",
    intro:
      "Where inspection happens in apparel production, what each stage checks, and how a buyer sets the standard the goods are judged against.",
    summary:
      "Inspection is not one event at the end. Material checks before cutting, inline checks during sewing and a final random inspection of packed goods each catch different defects. Final inspections are commonly sampled to an AQL plan under ISO 2859-1, but the acceptance levels are the buyer's to set. Agree them in writing before production starts.",
    readingTime: "7 min read",
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "steps",
        heading: "The stages",
        steps: [
          { title: "Incoming materials", body: "Fabric is checked for shade, weight, width and visible defects before cutting, often with a points system such as the 4-point system. Trims are checked against the approved trim card." },
          { title: "Pre-production", body: "A pre-production sample in bulk fabric and trims confirms the construction before cutting begins." },
          { title: "Inline", body: "Checks during sewing catch construction faults while they can still be corrected on the line, not after thousands of units." },
          { title: "End of line", body: "Finished garments are checked for measurement, construction, appearance and labelling as they come off the line." },
          { title: "Final random inspection", body: "A sample of packed goods is drawn and inspected against the agreed standard, often by the buyer's own QA or a third-party agency." },
        ],
      },
      {
        type: "table",
        heading: "AQL in plain terms",
        intro: "The vocabulary of a final inspection report.",
        columns: ["Term", "What it means"],
        rows: [
          ["AQL", "Acceptance Quality Limit: the worst average defect rate the buyer will accept, used to set a sampling plan."],
          ["Inspection level", "How large a sample is drawn for a given lot size. General Inspection Level II is the usual default."],
          ["Critical, major, minor", "Defect classes. Buyers commonly accept no critical defects and set separate limits for major and minor."],
          ["Lot", "The quantity the sample is drawn from, usually the order or the shipment."],
        ],
      },
      {
        type: "prose",
        heading: "Conventions are not rules",
        body: [
          "In apparel, 2.5 for major and 4.0 for minor defects are widely used acceptance levels. They are conventions, and some programs set tighter or looser limits, or different ones for different defects.",
          "Which level applies to your order is a commercial decision, written into the purchase order or the quality manual, not something a supplier or an agency should assume.",
        ],
      },
      {
        type: "list",
        heading: "What gets checked",
        items: [
          { term: "Measurements", detail: "Each point of measure against the size specification and its tolerance." },
          { term: "Construction", detail: "Stitch type and density, seam finish, bar-tacks at stress points, hardware attachment." },
          { term: "Appearance", detail: "Shade consistency, stains, loose threads, pressing." },
          { term: "Decoration", detail: "Placement, size, colour and quality against the approved sew-out or strike-off." },
          { term: "Labelling", detail: "Care, content and origin labels, and their placement." },
          { term: "Packing", detail: "Folding, polybags, size ratios, carton marking and carton counts." },
        ],
      },
      {
        type: "callout",
        heading: "Your standard decides",
        body:
          "An inspection checks goods against a standard. If the standard is not written down (the approved sample, the size specification with tolerances, the defect classification and the AQL) nobody can fail the bulk, and nobody can pass it fairly either.",
      },
    ],
    faqs: [
      {
        question: "Who pays for third-party inspection?",
        answer:
          "Usually the buyer books and pays the agency, but terms vary. Agree it in the purchase order, together with what happens on a failure.",
      },
      {
        question: "What happens if a lot fails?",
        answer:
          "Typically the goods are sorted or reworked and the lot is inspected again. Who pays for the re-inspection and how much time it adds should be agreed before production, not after the report.",
      },
    ],
    related: [
      { label: "Quality assurance", href: "/quality", description: "Where inspection happens and what is checked." },
      { label: "The apparel sampling process", href: "/resources/apparel-sampling-process", description: "The samples bulk is inspected against." },
      { label: "How to evaluate a sample", href: "/resources/evaluating-apparel-samples", description: "Checking a sample before you approve it." },
      { label: "Carton marking", href: "/resources/carton-marking-for-apparel", description: "The packing half of a final inspection." },
    ],
    seoTitle: "Garment Inspection Explained",
    seoDescription:
      "Inspection stages in apparel production, AQL in plain terms, what a final inspection checks, and why the buyer sets the standard.",
  },

  /* ================================================================== */
  {
    slug: "evaluating-apparel-samples",
    category: "Buyer guide",
    title: "How to Evaluate Apparel Samples",
    headline: "How to evaluate\na sample.",
    intro:
      "A sample is the cheapest moment to find a problem. What to check, in what order, and how to write comments a factory can act on.",
    summary:
      "Evaluate a sample against your specification, not your memory of the reference: confirm it is the right sample, measure it, check construction at the stress points, judge fabric and colour under agreed light, wash it the way your program will, then write comments with a measurement or a reference for every change. Approve only what you would accept in bulk.",
    readingTime: "6 min read",
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "steps",
        heading: "In this order",
        steps: [
          { title: "Check it is the right sample", body: "Style, size, fabric and colour against what was requested. A sample in the wrong fabric cannot be approved for fit." },
          { title: "Measure it", body: "Lay it flat and measure each point of measure in your size specification. Record the actual figure and the difference from specification." },
          { title: "Check construction", body: "Stitch type and density, seam finish, bar-tacks at stress points, hardware attachment and label placement." },
          { title: "Judge fabric and colour", body: "Weight, hand and shade under the agreed light source, against the approved lab dip or colour standard." },
          { title: "Wear it and wash it", body: "Fit on a person or a form, then wash it as your program will and measure again for shrinkage and twist." },
          { title: "Write comments that can be acted on", body: "One comment per point, each with a measurement, a photograph or a reference. \"Make it better\" cannot be sewn." },
        ],
      },
      {
        type: "list",
        heading: "Which sample answers which question",
        intro: "Approving one stage does not approve the next.",
        items: [
          { term: "Development sample", detail: "Is this the right garment? Construction and look, often not yet in the bulk fabric." },
          { term: "Fit sample", detail: "Does it fit? Measured and tried against the size specification." },
          { term: "Size set", detail: "Does the grading hold across the size range?" },
          { term: "Pre-production sample", detail: "Is this what bulk will be? Bulk fabric, trims and construction." },
        ],
      },
      {
        type: "callout",
        heading: "Approve what you would accept in bulk",
        body:
          "Approval makes the sample the standard the bulk is inspected against. If something is acceptable only for now, say so in writing, or it becomes the standard.",
      },
    ],
    faqs: [
      {
        question: "How many sample rounds are normal?",
        answer:
          "It depends on how complete the brief is. A full tech pack with a reference garment usually needs fewer rounds than a sketch, because fewer points are left open.",
      },
      {
        question: "Should I keep the approved sample?",
        answer:
          "Yes. Keep the sealed sample, and have the supplier keep a counter-sample. Both sides then inspect bulk against the same garment.",
      },
    ],
    related: [
      { label: "The apparel sampling process", href: "/resources/apparel-sampling-process", description: "Each sample stage, in order." },
      { label: "Garment inspection explained", href: "/resources/garment-inspection-explained", description: "How bulk is checked against the approved sample." },
      { label: "Product development", href: "/development", description: "How a specification becomes a sample." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "The brief that keeps sample rounds down." },
    ],
    seoTitle: "How to Evaluate Apparel Samples",
    seoDescription:
      "How to check an apparel sample before approving it: measurement, construction, fabric and colour, wash testing, and comments a factory can act on.",
  },

  /* ================================================================== */
  {
    slug: "sourcing-uniforms-from-pakistan",
    category: "Commercial guide",
    title: "Sourcing Uniforms from Pakistan",
    headline: "Sourcing uniforms\nfrom Pakistan.",
    intro:
      "What a uniform buyer in the United States, the United Kingdom or Europe should know before placing a program with a Pakistani manufacturer: the strengths, the practicalities and the checks.",
    summary:
      "Pakistan's garment industry sits on a domestic cotton and textile base, which suits the cotton and poly-cotton fabrics uniforms use. For a buyer the practical points are: verify the supplier's registration and export record, agree the Incoterm and port, allow for sea transit in the delivery date, confirm import duty and any preference scheme with your customs broker, and inspect before shipment.",
    readingTime: "8 min read",
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "prose",
        heading: "Why buyers look at Pakistan",
        body: [
          "Pakistan grows cotton and has a long-established spinning, weaving and garment industry, so the cotton and poly-cotton fabrics used in uniforms can often be sourced close to the factory. For woven workwear, aprons, knitted polos and fleece, that shortens the fabric supply chain.",
          "That is a general advantage of the country, not a guarantee about any one supplier. The checks below are what turn it into a decision.",
        ],
      },
      {
        type: "list",
        heading: "The practicalities",
        items: [
          { term: "Ports", detail: "Karachi has two main container ports, Port Qasim and Karachi Port. A Karachi manufacturer has no inland leg to the port." },
          { term: "Incoterms", detail: "FOB is common: the supplier clears the goods for export and loads them, and freight and insurance are yours from that point." },
          { term: "Transit", detail: "Sea freight to Europe, the UK and North America takes weeks, and varies by route and carrier. Build it into the delivery date with your forwarder." },
          { term: "Duty", detail: "Import duty depends on the product's tariff classification and your country's rules. Pakistan is a beneficiary of the EU's GSP+ scheme, and goods for the UK may qualify under the UK's Developing Countries Trading Scheme, in both cases subject to rules of origin. Confirm eligibility with your customs broker." },
          { term: "Compliance", detail: "Many programs require social compliance audits or specific certifications. Say what yours requires before sampling, and ask for evidence rather than logos." },
          { term: "Time zones", detail: "Pakistan is UTC+5, a few hours ahead of the UK and Europe and between nine and thirteen hours ahead of North America, depending on the coast and the season. Agree how urgent questions are handled." },
        ],
      },
      {
        type: "steps",
        heading: "A buyer's checklist",
        steps: [
          { title: "Verify the company", body: "Registration and tax registration, and an exporter listing you can check yourself." },
          { title: "Ask for export evidence", body: "Shipments in your product class, and the documents behind them." },
          { title: "Brief completely", body: "A tech pack or a reference garment, with fabric, construction, decoration, labels and packing." },
          { title: "Sample and wash-test", body: "Against your size specification and your laundering method." },
          { title: "Agree inspection", body: "Your agency or your QA, the AQL, and what happens on a failure." },
          { title: "Settle the commercial terms", body: "Incoterm, port, payment terms and the delivery date your forwarder can meet." },
          { title: "Start with one style", body: "It tests the whole relationship at the cost of one style." },
        ],
      },
      {
        type: "callout",
        heading: "Check us the same way",
        body:
          "AHM International is a Karachi-based manufacturer and FOB exporter. The verification page lists what is published, what each fact rests on, and how to request the documents that are not.",
      },
    ],
    faqs: [
      {
        question: "Is sourcing from Pakistan cheaper?",
        answer:
          "Price depends on the specification more than on the country. Compare quotations on an identical brief, including freight and duty to your door, before drawing a conclusion.",
      },
      {
        question: "Can I visit a supplier in Karachi?",
        answer:
          "Yes. Karachi has an international airport, so a visit to a Karachi supplier does not need a domestic connection.",
      },
    ],
    related: [
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "What AHM makes, and how." },
      { label: "FOB export", href: "/export", description: "What FOB covers, and the Incoterms chart." },
      { label: "Business verification", href: "/verification", description: "How to check AHM International." },
      { label: "Garment manufacturer in Karachi", href: "/garment-manufacturer-karachi", description: "Why the city affects your schedule." },
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "What a quotation includes." },
    ],
    seoTitle: "Sourcing Uniforms from Pakistan",
    seoDescription:
      "A buyer's guide to sourcing uniforms from Pakistan: ports, Incoterms, transit, duty preferences, compliance and a checklist for choosing a supplier.",
  },
];
