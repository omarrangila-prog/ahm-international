import type { Guide } from "./guides";

/**
 * Fabric science guides.
 *
 * General textile knowledge, written to be checkable against a textbook or a
 * standard. Nothing here describes AHM's equipment, tests or production: where
 * a guide names a test method, it is so a buyer can ask for it, and the
 * edition a buyer's own contract cites is the one that governs.
 *
 * Each sets `updated` and not a review: no person has reviewed these yet. See
 * the note on Guide.updated in data/guides.ts.
 */

const updated = { label: "October 2026", iso: "2026-10-20" };

export const fabricGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "weave-types-explained",
    category: "Fabric guide",
    title: "Plain, Twill, Satin and Canvas: Fabric Weaves Explained",
    headline: "Weaves,\nexplained.",
    intro:
      "A woven fabric is defined by how its threads cross. What plain weave, twill, satin, canvas and ripstop each do, why it matters for aprons and workwear, and why weave is a separate question from weight.",
    summary:
      "A weave is the pattern in which lengthwise threads (the warp) and crosswise threads (the weft) interlace. Plain weave goes over one, under one, and is firm and flat. Twill shows a diagonal rib and drapes and wears well. Satin floats threads for a smooth face. Canvas is a heavy plain weave. The weave sets strength, drape, wrinkling and how well the cloth takes a print, and it is independent of GSM.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "prose",
        heading: "What a weave is",
        body: [
          "Woven fabric is made on a loom from two sets of yarn at right angles. The lengthwise yarns are the warp; the crosswise yarns, laid in one at a time, are the weft or filling. The weave is the rule for which warp yarns lie over and which under each weft yarn.",
          "That rule changes how the cloth behaves. A tight, frequent interlacing gives a firm, flat fabric that holds its shape; longer floats, where a yarn passes over several others, give a smoother, more fluid fabric that is also easier to snag. Knitted fabrics are different in kind: they are loops, not interlaced threads, and stretch and recover in ways a woven cannot without elastane.",
        ],
      },
      {
        type: "table",
        heading: "The common weaves",
        intro: "Descriptions are of the weave in general. A particular fabric also depends on fibre, yarn and finishing.",
        columns: ["Weave", "How it is built", "What it tends to do", "Often found in"],
        rows: [
          ["Plain", "Each weft goes over one warp and under the next, alternating", "Firm, flat, balanced; wrinkles more readily; takes a print well", "Poplin shirting, light canvas, lining"],
          ["Twill", "Each weft passes over two or more warps, shifting one step per row to give a diagonal line", "Drapes better than plain at the same weight, hides soil and wears well; a little more dense", "Work trousers, chino, drill, denim, aprons"],
          ["Satin and sateen", "Long floats, so the surface is mostly one set of yarns", "Smooth, lustrous, drapey; less abrasion resistance and prone to snagging", "Dress fabrics, sateen sheeting, linings"],
          ["Basket and oxford", "Two or more yarns act together in each direction", "Textured, open feel; softer and more breathable than a plain weave of equal weight", "Oxford shirting"],
          ["Canvas", "A heavy plain weave, often from thicker or plied yarns", "Stiff, hard-wearing, resistant to abrasion", "Heavy aprons, bags, workwear"],
          ["Ripstop", "A plain weave with thicker reinforcing yarns at regular intervals", "A small tear is stopped at the next reinforcing yarn", "Lightweight technical and outdoor fabrics"],
          ["Herringbone", "A twill that reverses direction in stripes", "The look of twill with a zigzag pattern", "Suiting, some workwear"],
        ],
      },
      {
        type: "list",
        heading: "Why the weave matters to a buyer",
        items: [
          { term: "Wear", detail: "Closely interlaced weaves with fewer floats resist abrasion and snagging better. A satin face is the weakest point of an otherwise strong cloth." },
          { term: "Soil and print", detail: "A twill's diagonal texture hides marks, which is part of why it is used for aprons and uniforms. A smooth plain weave gives the cleanest surface for printing." },
          { term: "Drape and comfort", detail: "At the same weight, twill drapes and moves more freely than plain weave. Heavy canvas is deliberately stiff, and softens with washing." },
          { term: "Creasing", detail: "Plain weaves crease more easily than twills, which matters for shirting that should look pressed after a wash." },
          { term: "Cost", detail: "Weave complexity and yarn count change loom speed and cost. A fabric is rarely chosen on weave alone." },
        ],
      },
      {
        type: "list",
        heading: "Weave, weight and density are three questions",
        intro: "Two fabrics can share a weave and still be very different, so a specification needs more than the name of the weave.",
        items: [
          { term: "Weight (GSM)", detail: "How heavy the fabric is per area. Two plain weaves can differ by a factor of two." },
          { term: "Density", detail: "Warp ends and weft picks per inch or centimetre. A dense fabric of fine yarns can weigh the same as a sparse one of coarse yarns and feel completely different." },
          { term: "Yarn", detail: "Fibre, count and whether it is spun or filament, single or plied. Yarn decides how the weave feels." },
        ],
      },
      {
        type: "callout",
        heading: "How to specify a woven fabric",
        body:
          "Give the weave, the fibre composition, the weight with its unit and tolerance, and the width, then confirm against a swatch. \"Poly-cotton twill, 65/35, 240 gsm ±5%, 150 cm\" is a specification; \"heavy twill\" is a description. A mill can match a swatch more reliably than it can match adjectives.",
      },
    ],
    faqs: [
      { question: "What is twill fabric?", answer: "Twill is a woven fabric where the weft passes over two or more warp threads and shifts one thread each row, which makes a diagonal rib. Denim, chino and drill are all twills." },
      { question: "Is twill stronger than plain weave?", answer: "Often more wear-resistant and better draping at the same weight, but not automatically stronger: fibre, yarn and density matter as much as the weave." },
      { question: "What is the difference between canvas and twill?", answer: "Canvas is a heavy plain weave; twill is a diagonal weave that can be any weight. A heavy fabric can be either, so the weave should be named in a specification." },
      { question: "Is a satin weave good for uniforms?", answer: "Rarely. Satin's long floats snag and abrade, so it suits smooth, light-wear fabrics more than uniforms or aprons." },
    ],
    related: [
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "Weight, conversion and what it does not tell you." },
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "How blend ratio changes uniforms and aprons." },
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and applications." },
      { label: "Aprons", href: "/products/aprons", description: "Bib and waist aprons made to your specification." },
    ],
    tools: [{ label: "Fabric compare", href: "/materials#compare-heading", description: "Put two constructions side by side on the published fields." }],
    seoTitle: "Fabric Weaves Explained",
    seoDescription:
      "How plain weave, twill, satin, canvas and ripstop are built, how each behaves, and why weave and fabric weight are separate questions in a garment specification.",
  },

  /* ================================================================== */
  {
    slug: "fibres-compared-for-garments",
    category: "Fabric guide",
    title: "Cotton, Polyester, Nylon, Viscose and Wool Compared",
    headline: "Fibres,\ncompared.",
    intro:
      "The properties of the fibres garments are made from, how blends trade one against another, and the questions that stop a composition from being only a label.",
    summary:
      "Fibres are the raw material; yarns are fibres spun or extruded into thread; fabric is yarn knitted or woven. Cotton absorbs and breathes but shrinks and creases. Polyester is strong, quick-drying and shape-holding but absorbs little. Nylon is the most abrasion-resistant of the common fibres. Viscose drapes well but is weak when wet. Blends trade one set of properties for another.",
    readingTime: "8 min read",
    updated,
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "prose",
        heading: "Fibre, yarn, fabric",
        body: [
          "A fibre is the raw material: a cotton boll's fibre, a wool staple, a polyester filament. Yarn is fibre spun, or filament extruded, into a continuous thread. Fabric is yarn made into cloth by weaving, knitting or bonding. A property at one stage is changed by the next: the same fibre behaves differently in a fine knit and a heavy twill.",
          "Fibres are grouped by origin. Natural fibres come from plants (cotton, linen) or animals (wool, silk). Synthetic fibres are made from petrochemicals (polyester, nylon, elastane). Regenerated fibres (viscose, modal, lyocell) are made by dissolving natural cellulose, usually from wood pulp, and spinning it again.",
        ],
      },
      {
        type: "table",
        heading: "The common fibres",
        intro: "General tendencies of each fibre. Yarn, construction and finish can move every one of them.",
        columns: ["Fibre", "Strengths", "Limits", "Common garment uses"],
        rows: [
          ["Cotton", "Absorbent, comfortable, takes dye well, familiar feel", "Shrinks and creases, dries slowly, and is weaker than the synthetic fibres", "T-shirts, polos, shirting, aprons, workwear"],
          ["Polyester", "Strong, quick-drying, holds its shape, resists creasing and most shrinkage", "Absorbs little moisture, can feel warm, can pill, holds oily soil", "Uniforms, sportswear, aprons, linings, blends"],
          ["Nylon (polyamide)", "Very good abrasion resistance and strength", "Can feel less breathable, and degrades in prolonged sunlight", "Outerwear, work trousers reinforcement, webbing, hosiery"],
          ["Viscose (rayon)", "Soft, drapey, absorbent", "Weak when wet, shrinks and creases", "Blouses, dresses, linings"],
          ["Modal and lyocell", "Regenerated cellulose, generally smoother and stronger when wet than ordinary viscose", "Cost; shrinkage still needs controlling", "Soft knits, shirts, premium basics"],
          ["Linen", "Strong, cool, absorbent, crisp hand", "Creases heavily, stiff until washed, higher cost", "Summer shirting, aprons for hospitality"],
          ["Wool", "Insulates, manages moisture, resists odour", "Can shrink or felt if washed wrongly, can itch, care-intensive", "Knitwear, suiting, outerwear"],
          ["Elastane (spandex)", "Stretches and recovers many times its length", "Used in small proportions; degrades with heat and chlorine", "Stretch in knits, jeans, activewear, work trousers"],
        ],
      },
      {
        type: "list",
        heading: "Why fibres are blended",
        intro: "A blend is a trade. It rarely gives the best of both fibres; it gives a balance chosen for the garment.",
        items: [
          { term: "Poly-cotton", detail: "Polyester adds strength, quick drying and shape retention; cotton adds absorbency and a natural feel. The usual choice for uniforms and aprons that are laundered often." },
          { term: "CVC and TC", detail: "Terms for blend direction. CVC (chief value cotton) means cotton is the majority; TC is commonly used for polyester-rich cotton blends. The ratio, not the abbreviation, is what to specify." },
          { term: "Elastane blends", detail: "A small share of elastane adds stretch and recovery. Too much, or heat, can degrade the fabric's feel and shape over time." },
          { term: "Cellulose blends", detail: "Viscose, modal or lyocell blended with cotton or polyester soften the hand and improve drape." },
        ],
      },
      {
        type: "prose",
        heading: "Composition is more than a label",
        body: [
          "A composition such as \"65% polyester / 35% cotton\" is by weight and describes the yarn mix, not where the fibres sit. Fibre content is checked in a laboratory, because a blend cannot be confirmed by looking at it, and labelling requirements differ between markets, so a buyer should ask which rules apply to the destination country.",
          "Composition also says nothing about quality inside a fibre. Cotton varies in staple length, which affects strength and softness; polyester varies in the grade of its filament. Ask for the composition, the yarn count and construction, and a swatch, not the composition alone.",
        ],
      },
    ],
    faqs: [
      { question: "Is cotton better than polyester?", answer: "Neither is better for everything. Cotton is more comfortable against skin and absorbent; polyester is stronger, dries faster and holds its shape. Uniforms that are washed often commonly use a blend for that reason." },
      { question: "What does 65/35 poly-cotton mean?", answer: "65% polyester and 35% cotton by weight. It is a common balance for workwear and aprons, but the ratio is a specification choice, not a standard." },
      { question: "Which fibre is the most durable?", answer: "Nylon is generally the most abrasion-resistant of the common apparel fibres, and polyester the most widely used for strong, shape-holding uniforms. Durability still depends on yarn, construction and finish." },
      { question: "Does viscose shrink?", answer: "Yes, readily, and it is weak when wet. Modal and lyocell are generally better, and any cellulosic fabric needs a shrinkage test after washing." },
    ],
    related: [
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "How the blend ratio changes uniforms and aprons." },
      { label: "Cotton vs poly-cotton aprons", href: "/resources/cotton-vs-poly-cotton-aprons", description: "The choice for the most-washed garment in a program." },
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "Length versus width, test methods and tolerance." },
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and applications." },
    ],
    tools: [{ label: "Yarn count converter", href: "/resources/calculators#yarn", description: "Convert between Ne, Nm, tex and denier." }],
    seoTitle: "Fibres Compared for Garments",
    seoDescription:
      "How cotton, polyester, nylon, viscose, modal, linen, wool and elastane compare for garments, why fibres are blended, and what a label does not say.",
  },

  /* ================================================================== */
  {
    slug: "fabric-finishes-explained",
    category: "Fabric guide",
    title: "Fabric Finishes Explained: Easy-Care, Stain-Release, Water-Repellent",
    headline: "Finishes,\nexplained.",
    intro:
      "What a finish does to a fabric, what it costs in other properties, and why the finish on a swatch can be gone after a hundred washes.",
    summary:
      "A finish is a treatment applied to fabric after it is made. Mechanical finishes (brushing, calendering, compressive pre-shrinking) change the surface or the dimensions. Chemical finishes (easy-care, stain-release, water-repellent, mercerising) change how the fabric behaves. Every finish is a trade-off, and many wear off with laundering, so the right test is on the fabric after the washing it will actually receive.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.polyesterPerformance",
    blocks: [
      {
        type: "prose",
        heading: "What a finish is",
        body: [
          "Greige, or grey, cloth is the fabric as it comes off the loom or knitting machine. Before it becomes a garment it is washed, dyed and finished. A finish is any treatment given to change the fabric's appearance, hand, dimensional stability or performance, from a soft brushing to a chemical coating.",
          "The same cloth with two different finishes can behave like two different fabrics. That makes the finish a specification item, and the reason two quotations for a \"260 gsm twill\" can describe very different cloth.",
        ],
      },
      {
        type: "table",
        heading: "Common finishes",
        intro: "What each is for, and the trade-off a buyer should know. None of these is a guarantee of performance without a test.",
        columns: ["Finish", "What it does", "Trade-off", "Ask"],
        rows: [
          ["Compressive pre-shrinking", "Reduces shrinkage by mechanically relaxing the fabric before cutting", "Controls rather than removes shrinkage", "Residual shrinkage after laundering, tested"],
          ["Mercerising (cotton)", "Treats cotton with alkali under tension to raise lustre, dye uptake and strength", "Added cost and a process step", "Whether the cotton is mercerised, and the shade effect"],
          ["Brushing, raising, peaching", "Lifts fibre ends for a soft, warm surface", "Can pill, and the surface wears with washing", "Pilling grade after washing"],
          ["Easy-care or wrinkle-resistant", "Resin treatment that reduces creasing", "Can reduce tear strength and abrasion resistance; some resin systems release formaldehyde", "Strength after finishing; formaldehyde limits for the destination market"],
          ["Stain-release (soil-release)", "Helps oily soils wash out of polyester and poly-cotton", "Can wear off in repeated laundering and affect moisture handling", "Release grade before and after the stated number of washes"],
          ["Durable water repellent (DWR)", "Makes water bead and roll off the surface", "Repels water, it does not make a fabric waterproof; performance fades with wear and washing", "Spray rating after laundering; which chemistry, because rules on some fluorinated finishes are tightening in several markets"],
          ["Antimicrobial", "Aims to limit bacterial growth in the fabric", "Claims are regulated in many markets, and effects vary", "Which agent, which test, and whether the claim is permitted where you sell"],
          ["Flame-retardant", "Reduces or stops flame spread", "A regulated protective property that needs certified fabric and garment testing", "Do not accept a description: ask for the certificate and standard"],
        ],
      },
      {
        type: "list",
        heading: "Reading a finish honestly",
        items: [
          { term: "Finishes are not permanent unless tested to be", detail: "A finish that works on a new swatch may not after fifty industrial washes. State the number of washes and the wash conditions the property must survive." },
          { term: "One gain, one cost", detail: "Easy-care can cost strength, brushing can cost pilling resistance, repellency can cost breathability. Ask what was traded for the benefit." },
          { term: "Regulation moves", detail: "Limits on specific chemicals, and on what a product may claim, differ by market and change. Check the destination's rules, and keep the supplier's declaration." },
          { term: "Protective claims need proof", detail: "Flame, chemical and high-visibility performance are certified properties. A finish described in a catalogue is not a certificate." },
        ],
      },
      {
        type: "callout",
        heading: "Test the finish where it matters",
        body:
          "Specify the finish, the wash regime and the number of washes, then test the property before and after. A stain-release finish is judged on the garment after its hundredth wash, not on the swatch in the sample room.",
      },
    ],
    faqs: [
      { question: "Is a water-repellent finish the same as waterproof?", answer: "No. A durable water-repellent finish makes water bead on the surface. A waterproof fabric has a membrane or coating that blocks water through the cloth, and is tested differently." },
      { question: "Does an easy-care finish weaken fabric?", answer: "It can reduce tear and abrasion strength, because the resin that reduces creasing also stiffens the fibres. Ask for strength results after finishing." },
      { question: "How long does a stain-release finish last?", answer: "It depends on the finish and the laundering. Many fade with repeated hot washing, so ask for release performance after the number of washes your program expects." },
      { question: "What does pre-shrunk mean?", answer: "The fabric has been mechanically relaxed to reduce shrinkage in use. It lowers shrinkage rather than eliminating it, and the residual figure should be tested." },
    ],
    related: [
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "Length versus width, test methods and tolerance." },
      { label: "Polyester dyeing for buyers", href: "/resources/polyester-dyeing-for-buyers", description: "Why shade, finish and fabric interact." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Which tests answer which questions." },
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, weights, finishes and applications." },
    ],
    seoTitle: "Fabric Finishes Explained",
    seoDescription:
      "What common fabric finishes do, what each costs in other properties, why finishes wear off in laundering, and what to ask a supplier before specifying one.",
  },

  /* ================================================================== */
  {
    slug: "fabric-testing-for-buyers",
    category: "Fabric guide",
    title: "Fabric Testing for Buyers: Shrinkage, Colourfastness, Pilling and Strength",
    headline: "Fabric tests,\nin plain terms.",
    intro:
      "Which test answers which question about a fabric, the standard methods most often named, and how to write a test requirement that a laboratory and a supplier can both follow.",
    summary:
      "Fabric testing turns a description into a number. Each property has its own test: dimensional change, colourfastness to washing, rubbing and light, pilling, abrasion, tensile and tear strength, seam strength. The test method, the conditions and the pass limit all have to be written down, because two laboratories using different methods get different results.",
    readingTime: "9 min read",
    updated,
    heroAsset: "development.measurement",
    blocks: [
      {
        type: "prose",
        heading: "Why test, and what a test is not",
        body: [
          "A fabric description is a promise; a test is evidence. \"Colourfast\" means nothing until it is tied to a method, a wash condition and a grade. Testing is how a specification becomes something that can be accepted or rejected without an argument.",
          "A test is also narrow. It measures one property under defined conditions on the sample that was tested. It does not describe the next production lot, and it does not replace inspection of the finished garment.",
        ],
      },
      {
        type: "table",
        heading: "Which test answers which question",
        intro:
          "Examples of widely used methods, named so a buyer can ask for one. The edition and the method your own contract, brand or retailer requires are the ones that govern, and a laboratory can advise on equivalents.",
        columns: ["Property", "The question", "Methods commonly named", "Buyer note"],
        rows: [
          ["Mass per area (GSM)", "Is it the weight that was approved?", "ISO 3801, ASTM D3776, EN 12127", "Say whether the weight is before or after finishing"],
          ["Dimensional change", "How much does it shrink or grow after laundering?", "ISO 6330 for the wash procedure with ISO 5077 for measurement; AATCC 135", "Length and width separately; state the number of washes"],
          ["Colourfastness to washing", "Will the colour run or fade in the wash?", "ISO 105-C06; AATCC 61", "Both staining of other cloth and colour change are graded"],
          ["Colourfastness to rubbing", "Will colour transfer onto skin or other garments?", "ISO 105-X12; AATCC 8", "Dry and wet rubbing give different results"],
          ["Colourfastness to perspiration", "Does colour change with sweat?", "ISO 105-E04", "Relevant for sportswear and workwear worn hard"],
          ["Colourfastness to light", "Will it fade in daylight?", "ISO 105-B02", "Matters for outdoor and window-exposed uniforms"],
          ["Pilling", "Will it form bobbles with wear?", "ISO 12945-2, ASTM D4970", "Graded after a number of rubbing cycles"],
          ["Abrasion resistance", "How long before it wears through?", "ISO 12947 (Martindale), ASTM D4966", "Report the cycles to a specified end point"],
          ["Tensile strength", "How much force before it breaks?", "ISO 13934-1", "Warp and weft differ"],
          ["Tear strength", "How easily does a tear spread?", "ISO 13937, ASTM D1424", "Finishes such as easy-care can reduce it"],
          ["Seam strength and slippage", "Do seams hold or pull open?", "ISO 13935, ISO 13936", "A fabric can pass and its seam still fail"],
        ],
      },
      {
        type: "steps",
        heading: "How to write a test requirement",
        steps: [
          { title: "Name the property and the method", body: "\"Shrinkage per ISO 6330\" is a requirement. \"No shrinkage\" is not." },
          { title: "State the conditions", body: "The wash temperature and cycle, the drying method, the number of washes, and whether the test is on fabric or on the finished garment." },
          { title: "State the pass limit", body: "A number with its tolerance, for example a maximum dimensional change in length and in width, or a minimum colourfastness grade." },
          { title: "Say who tests, and who pays", body: "Whether the supplier's laboratory, an independent one, or the buyer's nominated laboratory is the reference, and who bears the cost on a failure." },
          { title: "Ask for an accredited laboratory", body: "ISO/IEC 17025 is the international standard for testing laboratory competence, and an accredited laboratory's report states its scope." },
          { title: "Test the production, not just the sample", body: "Agree how many lots and how often. The approved sample says what a lot can be, not what every lot is." },
        ],
      },
      {
        type: "list",
        heading: "What a fabric test does not tell you",
        items: [
          { term: "How the garment will fit after washing", detail: "Fabric shrinkage is a start; sewing, pressing and finishing change the garment's own dimensional change." },
          { term: "Whether a program will be happy", detail: "Wear, wash conditions and handling in real use differ from a laboratory cycle. A wear trial is evidence that a method cannot be." },
          { term: "That a claim is certified", detail: "Flame, chemical and high-visibility performance need certification to the relevant standard, not a general test result." },
          { term: "AHM's own testing", detail: "Whether a given test is carried out in-house or by an external laboratory is a question to ask any supplier, and AHM's answer for your program is part of the commercial discussion." },
        ],
      },
    ],
    faqs: [
      { question: "What is the difference between ISO and AATCC test methods?", answer: "ISO methods are international standards used widely in Europe and Asia; AATCC methods are published by a US textile association and are common in North American specifications. They differ in procedure, so results are not interchangeable. Use the one your buyer names." },
      { question: "How is shrinkage tested?", answer: "Marked fabric or garments are washed and dried by a defined procedure, then re-measured and the change reported as a percentage in length and width. The wash cycle, drying method and number of washes change the result." },
      { question: "What does a colourfastness grade mean?", answer: "Fastness to washing, rubbing and perspiration is graded on a 1 to 5 scale, where 5 means no change or no staining; fastness to light uses a separate 1 to 8 scale. A requirement states the minimum grade for each test." },
      { question: "Who should pay for testing?", answer: "That is a commercial term to agree in advance: who commissions it, which laboratory is the reference, and who pays on a failure." },
    ],
    related: [
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "Length versus width, test methods and tolerance." },
      { label: "Garment inspection explained", href: "/resources/garment-inspection-explained", description: "What to check on the finished garment." },
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "How GSM is calculated and tested." },
      { label: "Quality", href: "/quality", description: "How quality is approached across a program." },
    ],
    tools: [{ label: "Tolerance checker", href: "/resources/calculators#tolerance", description: "The range a specification allows, and whether a measurement is inside it." }],
    seoTitle: "Fabric Testing for Buyers",
    seoDescription:
      "Which fabric test answers which question: shrinkage, colourfastness, pilling, abrasion, tensile, tear and seam strength, and how to write a requirement.",
  },
];
