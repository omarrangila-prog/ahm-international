import type { Guide } from "./guides";

/**
 * One buyer's guide per product family.
 *
 * Added on 10 November 2026, when the owner asked for every family to have
 * articles of its own, as the aprons do. General trade knowledge, checkable
 * against the standards and regulations named; none of it describes AHM's own
 * machinery, tests or capacity. Where a choice depends on the factory, the
 * guide says what to ask. Regulations are summarised to point a buyer at the
 * authority, not to replace it.
 *
 * Each sets `updated` and not a review: no person has reviewed these yet.
 */

const updated = { label: "November 2026", iso: "2026-11-10" };

export const productGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "hoodie-and-sweatshirt-specification",
    category: "Buyer guide",
    title: "Hoodie and Sweatshirt Specification: Fabric, Weight and Construction",
    headline: "Hoodies and\nsweatshirts, specified.",
    intro:
      "Fleece or French terry, how heavy, which hood, which rib, and the details that decide whether a sweatshirt still looks right after twenty washes.",
    summary:
      "A hoodie or sweatshirt is specified by its fabric (brushed fleece, French terry or polar fleece), fibre blend, weight in gsm, hood construction, rib trims, pockets, closures and decoration. Most program sweatshirts fall between about 240 and 400 gsm. Pilling, shrinkage and rib recovery are the common failures, and all three are fabric decisions that should be tested on a washed sample.",
    readingTime: "7 min read",
    updated,
    heroAsset: "photo.zipHoodieNavy",
    blocks: [
      {
        type: "table",
        heading: "The three main fabrics",
        columns: ["Fabric", "How it is made", "How it feels and wears", "Watch for"],
        rows: [
          ["Brushed-back fleece", "A knit with loops on the back that are brushed to raise a soft pile", "Warmest of the three for its weight, soft inside", "Brushing weakens fibres, so it can pill and shed; check pilling on a washed sample"],
          ["French terry", "The same looped back, left unbrushed", "Lighter and cooler, loops visible inside, keeps its shape well", "Less warm than fleece of the same weight"],
          ["Polar fleece", "Usually polyester, brushed and sheared on both sides", "Light, warm, quick-drying, used for jackets and vests", "Needs an anti-pill finish; low-grade polar fleece pills fast"],
        ],
      },
      {
        type: "table",
        heading: "Weight bands",
        intro: "Typical ranges in the market, for orientation. A specification should state the weight and its tolerance.",
        columns: ["Band", "Approximate weight", "Typical use"],
        rows: [
          ["Light", "240-280 gsm", "Layering, warm climates, French terry tops"],
          ["Mid", "280-340 gsm", "Most uniform and promotional sweatshirts and hoodies"],
          ["Heavy", "340-400 gsm and above", "Premium retail, cold climates, outdoor work"],
        ],
      },
      {
        type: "prose",
        heading: "Fibre blend changes the garment",
        body: [
          "Cotton-rich fleece is soft and breathable but can shrink noticeably and fade. Polyester-rich blends hold colour and shape and dry faster, but polyester fibres are strong enough to anchor pills on the surface instead of letting them fall away. CVC (chief value cotton, more cotton than polyester) and 50/50 blends sit between the two.",
          "For a printed program, the blend also decides the print method. Water-based and discharge inks suit cotton-rich fabric; a polyester-rich fleece may need inks that block dye migration. Decide the blend and the decoration together.",
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Fabric", detail: "Construction (fleece, French terry, polar), fibre composition, weight with tolerance, and any finish such as anti-pill." },
          { term: "Hood", detail: "Two-panel or three-panel, single layer or lined, with or without drawcord, and the drawcord's ends and eyelets. Children's sizes have drawcord rules of their own." },
          { term: "Body and sleeve", detail: "Set-in or raglan sleeve, side seams or tubular body, side panels if any." },
          { term: "Trims", detail: "Rib type (1x1 or 2x2), composition including any elastane for recovery, and the depth of cuff and hem bands." },
          { term: "Pockets and zip", detail: "Kangaroo or split pouch pockets, zip type, length, gauge and puller, and any chin guard." },
          { term: "Seams", detail: "Overlock, coverstitch or flatlock, and where each is used." },
          { term: "Decoration, labels and packing", detail: "Method, size and position of each logo, label positions, and how garments are folded and packed." },
        ],
      },
      {
        type: "callout",
        heading: "Test the washed garment, not the new one",
        body:
          "Shrinkage, pilling and rib recovery all show up after laundering. Ask for the sample to be washed to your care label several times and measured, and compare pilling against the method your buyer uses (ISO 12945-2 and ASTM D4970 are the common ones).",
      },
    ],
    faqs: [
      { question: "What is a good GSM for a hoodie?", answer: "Most program hoodies sit around 280-340 gsm. Lighter suits warm climates and layering; 350 gsm and above reads as premium and suits cold weather. Weight alone does not decide quality: fibre, yarn and finishing matter as much." },
      { question: "What is the difference between fleece and French terry?", answer: "Both are knits with loops on the back. Fleece has the loops brushed into a soft pile; French terry leaves them as loops. Fleece is warmer; French terry is lighter and keeps its shape well." },
      { question: "Why do hoodies pill?", answer: "Friction pulls fibre ends into small balls. Polyester-rich blends pill visibly because their strong fibres hold the pills on the surface. Anti-pill finishes and tighter yarns reduce it; test on a washed sample." },
      { question: "Can children's hoodies have drawcords?", answer: "In many markets, no drawcords are allowed in the hood and neck of young children's garments. The US treats them as a hazard in sizes 2T to 12, and EN 14682 sets the rules in Europe. Check the destination market's rules before specifying." },
    ],
    related: [
      { label: "Knit constructions explained", href: "/resources/knit-constructions-explained", description: "Jersey, interlock, rib and fleece, and how each is made." },
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "How fabric weight is measured and converted." },
      { label: "Fleece & Sweatshirts", href: "/products/fleece-sweatshirts", description: "Hoodies, sweatshirts and fleece made to your specification." },
    ],
    tools: [{ label: "Tolerance checker", href: "/resources/calculators#tolerance", description: "Is a measured weight within the agreed band?" }],
    seoTitle: "Hoodie & Sweatshirt Specification Guide",
    seoDescription:
      "Fleece vs French terry, hoodie weights in gsm, hood and rib construction, and what a sweatshirt specification should state to survive the wash.",
  },

  /* ================================================================== */
  {
    slug: "woven-uniform-shirt-specification",
    category: "Buyer guide",
    title: "Woven Uniform Shirt Specification: Fabric, Collar, Cuff and Finish",
    headline: "The woven\nuniform shirt.",
    intro:
      "Poplin, oxford or twill; fused or soft collar; easy-care or not. How a work or corporate shirt is specified, and where cheap shirts give themselves away.",
    summary:
      "A woven uniform shirt is specified by its fabric (poplin, oxford, twill or chambray), composition and weight, collar and cuff style and their interlining, placket, pockets, back details, seams, buttons and finish. Poly-cotton is the usual uniform choice because it creases less and holds colour through laundering. The collar is where quality shows first, so it deserves the most attention in the sample.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "table",
        heading: "Common shirt fabrics",
        columns: ["Fabric", "Weave", "Character", "Typical use"],
        rows: [
          ["Poplin", "Plain weave, fine and tight", "Smooth, light, crisp", "Corporate and front-desk shirts"],
          ["Oxford", "Basket weave", "Textured, soft, slightly heavier", "Casual corporate shirts, button-down collars"],
          ["Twill", "Diagonal twill", "Drapes well, hides creases, durable", "Work shirts and heavier uniform shirts"],
          ["Chambray", "Plain weave, coloured warp and white weft", "Denim look, lighter weight", "Hospitality and casual uniform"],
        ],
      },
      {
        type: "list",
        heading: "The parts that need a decision",
        items: [
          { term: "Collar", detail: "Point, button-down, spread or camp collar, its height and point length, and whether it is fused (interlining bonded with heat) or sewn-in. Fused collars stay crisp; poor fusing bubbles after washing." },
          { term: "Cuffs", detail: "Barrel or convertible, one or two buttons; short sleeves have a hem or a turn-up." },
          { term: "Placket", detail: "A sewn-on placket, a folded French front, or a concealed placket for a cleaner look." },
          { term: "Pockets", detail: "None, one or two chest pockets, with or without flaps, and pen slots for work shirts." },
          { term: "Back", detail: "A yoke, with a box pleat or side pleats for movement, and an optional locker loop." },
          { term: "Seams", detail: "Single-needle side seams look finer; felled or double-needle seams are stronger for work shirts." },
          { term: "Buttons", detail: "Material, size in ligne (the trade measure for button diameter) and the number of holes." },
        ],
      },
      {
        type: "prose",
        heading: "Easy-care finishes: what they trade",
        body: [
          "Easy-care or non-iron finishes are resin treatments that help cotton-rich fabric resist creasing. They work, and they cost something: resin finishing reduces the tear and tensile strength of cotton, and a poorly controlled finish can leave formaldehyde residue, which many buyers and some markets limit. If a shirt is sold as non-iron, ask what the finish is, what the fabric's strength is after finishing, and for a formaldehyde test result.",
          "A poly-cotton blend gets much of the same benefit from its fibre, which is one reason 65/35 poly-cotton poplin is the default uniform shirt fabric.",
        ],
      },
      {
        type: "callout",
        heading: "Check the collar after washing",
        body:
          "Ask for the sample to be washed and pressed to the care label several times. Bubbling in a fused collar, puckered seams and shrinkage show there first, and they are what a wearer notices.",
      },
    ],
    faqs: [
      { question: "What is the best fabric for a uniform shirt?", answer: "65/35 poly-cotton poplin or twill is the usual choice: it creases less, holds colour and survives frequent laundering. 100% cotton feels better but needs ironing unless it is resin-finished." },
      { question: "What is a fused collar?", answer: "A collar with an interlining bonded to the fabric with heat, which keeps it crisp. A sewn-in interlining is softer. Poor fusing shows as bubbles after washing." },
      { question: "What does ligne mean for buttons?", answer: "Ligne is the trade measure of button diameter: 40 ligne equals one inch. Shirt front buttons are commonly around 16 to 18 ligne." },
    ],
    related: [
      { label: "Weave types explained", href: "/resources/weave-types-explained", description: "Plain, twill, satin and how each behaves." },
      { label: "Fabric finishes explained", href: "/resources/fabric-finishes-explained", description: "What finishes do and what they cost." },
      { label: "Woven Shirts", href: "/products/woven-shirts", description: "Work and corporate shirts made to your specification." },
    ],
    seoTitle: "Uniform Shirt Specification Guide",
    seoDescription:
      "Poplin, oxford and twill shirt fabrics, collars, cuffs, plackets, easy-care finishes and what a woven uniform shirt specification should state.",
  },

  /* ================================================================== */
  {
    slug: "work-trouser-specification",
    category: "Buyer guide",
    title: "Work Trouser Specification: Fabric, Pockets and Reinforcement",
    headline: "Work trousers,\nspecified.",
    intro:
      "Which fabric, which waistband, which pockets, and where a work trouser needs reinforcing so it lasts as long as the job does.",
    summary:
      "A work trouser is specified by its fabric (poly-cotton twill, cotton drill or canvas, with or without stretch) and weight, the waistband and fly, the pocket layout, the reinforcement at stress points, the seams, and a measurement chart with tolerances. Most work trousers fail at the same places: pocket corners, the crotch seam, the knee and the hem. A good specification names each of them.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "table",
        heading: "Fabric choices",
        columns: ["Fabric", "Typical weight", "Strengths", "Trade-offs"],
        rows: [
          ["Poly-cotton twill", "200-300 gsm", "Durable, holds colour, creases less, suits industrial laundering", "Less breathable than cotton"],
          ["Cotton drill or twill", "220-320 gsm", "Comfortable and breathable", "Shrinks and fades more"],
          ["Canvas or duck", "300 gsm and above", "Very abrasion-resistant", "Stiff when new, heavier to wear"],
          ["Stretch blends", "200-300 gsm", "Freedom of movement for kneeling and climbing", "Elastane can lose recovery over many washes"],
        ],
      },
      {
        type: "list",
        heading: "Waistband, fly and pockets",
        items: [
          { term: "Waistband", detail: "Fixed, with elastic side inserts, or with adjustable tabs. State the belt loop count and width." },
          { term: "Fly", detail: "Zip type and material, and a shank button, press stud or hook and bar at the top." },
          { term: "Front pockets", detail: "Slant or straight, pocket bag fabric and depth. Pocket bags wear through before the trouser does, so specify them." },
          { term: "Back pockets", detail: "Patch or jetted, with or without flaps and closures." },
          { term: "Work pockets", detail: "Cargo, rule pocket, phone pocket and knee-pad pockets. Knee pads are a protective product with their own standard (EN 14404 in Europe); the trouser and the pad have to work together." },
        ],
      },
      {
        type: "list",
        heading: "Where reinforcement belongs",
        items: [
          { term: "Pocket corners and belt loops", detail: "Bar tacks, specified by position." },
          { term: "Crotch", detail: "A gusset or a reinforced crotch seam, often with a chainstitch for stretch." },
          { term: "Seams", detail: "Felled or triple-needle seams on heavy-duty styles." },
          { term: "Knees and hems", detail: "Double knees or reinforced hem tape where wearers kneel or drag their heels." },
        ],
      },
      {
        type: "prose",
        heading: "The measurement chart matters more than the sketch",
        body: [
          "Waist, front and back rise, hip, thigh, knee, leg opening and inseam, each with a tolerance, for every size. Work trousers often come in several leg lengths, so the inseam options belong in the chart. Measure the sample after washing, because twill and drill shrink, and a trouser that fits new may be short after the first laundry.",
        ],
      },
    ],
    faqs: [
      { question: "What fabric is best for work trousers?", answer: "Poly-cotton twill around 200-300 gsm is the common choice for durability and laundering. Cotton is cooler; canvas is tougher; stretch blends move better. Choose for the job and the wash." },
      { question: "Where do work trousers usually fail?", answer: "Pocket corners, the crotch seam, the knees and the hems. Specify bar tacks, seam types and any reinforcement at each." },
      { question: "Do knee-pad pockets need a standard?", answer: "The knee pad is the protective product. In Europe, knee protectors are covered by EN 14404, and the trouser pocket positions the pad, so the two are specified together." },
    ],
    related: [
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why the blend dominates uniform programs." },
      { label: "Stitches and seams explained", href: "/resources/stitches-and-seams-explained", description: "Stitch types, seam types and reinforcement." },
      { label: "Bottoms", href: "/products/bottoms", description: "Work trousers and shorts made to your specification." },
    ],
    tools: [{ label: "Marker consumption", href: "/resources/calculators#consumption", description: "Fabric per garment from your marker." }],
    seoTitle: "Work Trouser Specification Guide",
    seoDescription:
      "Work trouser fabrics and weights, waistband, fly and pocket choices, where to reinforce, and what a trouser specification and measurement chart must state.",
  },

  /* ================================================================== */
  {
    slug: "work-jacket-specification",
    category: "Buyer guide",
    title: "Work Jacket Specification: Shell, Lining, Water Resistance and Hi-Vis",
    headline: "Work jackets,\nspecified.",
    intro:
      "Shell fabric, lining and insulation, water-repellent or waterproof, and when a jacket stops being a garment and becomes certified protective equipment.",
    summary:
      "A work jacket is specified by its shell fabric, lining and insulation, closures, pockets, cuffs and hem, and any performance claim. Water-repellent and waterproof are different claims: a repellent finish makes water bead on the surface, while a waterproof jacket needs a coated or membrane fabric and sealed seams. High-visibility and rain-protection claims are made against standards (EN ISO 20471 and ANSI/ISEA 107 for hi-vis, EN 343 for rain) and need certification.",
    readingTime: "8 min read",
    updated,
    heroAsset: "photo.utilityBomberCharcoal",
    blocks: [
      {
        type: "table",
        heading: "Shell fabrics",
        columns: ["Shell", "Character", "Typical use"],
        rows: [
          ["Poly-cotton twill", "Durable, comfortable, takes embroidery well", "Work and utility jackets"],
          ["Cotton canvas or duck", "Very tough, stiff when new, softens with wear", "Heavy-duty and chore jackets"],
          ["Polyester oxford with coating", "Light, water-resistant, inexpensive", "Rain and winter jackets, hi-vis"],
          ["Softshell", "A woven or knit face bonded to a fleece back, stretchy and wind-resistant", "Active work, cold weather without bulk"],
        ],
      },
      {
        type: "table",
        heading: "Water: three different claims",
        columns: ["Claim", "How it is achieved", "How it is measured"],
        rows: [
          ["Water-repellent", "A durable water-repellent (DWR) finish on the face", "Spray test (ISO 4920, AATCC 22); the finish weakens with washing"],
          ["Water-resistant", "A tighter fabric or a light coating", "Hydrostatic head (ISO 811, AATCC 127), at a level the buyer sets"],
          ["Waterproof", "A coating or membrane plus taped or sealed seams", "Hydrostatic head on fabric and seams; garments sold for rain protection in Europe are rated to EN 343"],
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Shell", detail: "Fabric, composition, weight and any finish or coating, with the test and level for any performance claim." },
          { term: "Lining and insulation", detail: "Mesh, taffeta, quilted or fleece lining; insulation by type and weight in g/m²." },
          { term: "Closures", detail: "Zip type, gauge and puller, storm flap, press studs and their finish." },
          { term: "Pockets", detail: "Chest, hand, inside and sleeve pockets, with closures and reinforcement." },
          { term: "Cuffs, hem and hood", detail: "Rib, adjustable tab or elastic cuffs; hem drawcord; fixed, detachable or no hood." },
          { term: "Visibility", detail: "For hi-vis, the standard and class the jacket must meet, and the certified tape. See the callout below." },
        ],
      },
      {
        type: "callout",
        heading: "Hi-vis is a certified product",
        body:
          "A jacket sold as high-visibility workwear must meet a standard such as EN ISO 20471 (Europe and UK) or ANSI/ISEA 107 (US), which set the area of background fabric and retroreflective tape, their colour and their performance. The finished garment is certified, not just its materials. Name the standard and class at the start.",
      },
    ],
    faqs: [
      { question: "What is the difference between water-repellent and waterproof?", answer: "Water-repellent fabric makes water bead and roll off but lets it through under pressure. A waterproof jacket uses a coated or membrane fabric with sealed seams. Each is measured by a different test." },
      { question: "How is insulation specified?", answer: "By type and weight per square metre, for example a polyester wadding of a stated g/m². The weight, the lining and the shell together decide warmth." },
      { question: "Can any jacket be made hi-vis by adding reflective tape?", answer: "Not if it is sold as high-visibility workwear. Standards such as EN ISO 20471 and ANSI/ISEA 107 set the fabric, tape, areas and placement, and the finished garment is certified." },
    ],
    related: [
      { label: "Fabric finishes explained", href: "/resources/fabric-finishes-explained", description: "Water-repellent and other finishes, and what they cost." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Which test answers which question." },
      { label: "Outerwear", href: "/products/outerwear", description: "Work jackets, softshells and vests made to your specification." },
    ],
    seoTitle: "Work Jacket Specification Guide",
    seoDescription:
      "Work jacket shells, linings and insulation, water-repellent vs waterproof, and the hi-vis and rain standards a protective jacket must meet.",
  },

  /* ================================================================== */
  {
    slug: "chef-coat-specification",
    category: "Buyer guide",
    title: "Chef Coat Specification: Fabric, Closures and Ventilation",
    headline: "The chef coat,\nspecified.",
    intro:
      "Why chef coats are double-breasted, which fabric suits a hot kitchen and an industrial laundry, and what a chef coat specification should state.",
    summary:
      "A chef coat is specified by its fabric (cotton or poly-cotton drill or twill), its front (double-breasted, often reversible, or single-breasted), its closures (knot buttons, press studs or removable studs), its collar, sleeves, pockets and ventilation, and the laundering it must survive. The double-breasted front lets a cook switch the overlap to hide a stain. A standard chef coat is not flame-resistant protective clothing.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "prose",
        heading: "Why the double-breasted front",
        body: [
          "The traditional chef coat crosses over at the front with two rows of buttons. Many are made reversible, so the front can be buttoned either way and a stained side hidden under the clean one during service. The double layer also adds a little protection across the chest from splashes. Single-breasted and pullover styles are lighter and common in casual kitchens.",
        ],
      },
      {
        type: "table",
        heading: "Fabric",
        columns: ["Fabric", "Character", "In the kitchen"],
        rows: [
          ["100% cotton drill or twill", "Breathable, soft, absorbent", "Comfortable near heat; shrinks and stains more; needs pressing"],
          ["Poly-cotton (65/35 or cotton-rich 35/65)", "Durable, quick-drying, holds colour", "The usual uniform choice; a cotton-rich face feels cooler"],
          ["Lightweight blends with mesh panels", "Cooler, lighter", "Ventilation at the back or underarm for hot lines"],
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Front and closures", detail: "Double or single-breasted, reversible or not, and knot buttons, press studs or removable studs. Removable studs survive laundering but get lost." },
          { term: "Collar", detail: "Mandarin (stand) collar height, and any piping or contrast." },
          { term: "Sleeves", detail: "Long, three-quarter or short; a turn-back cuff; a sleeve pocket for a thermometer or pen." },
          { term: "Ventilation", detail: "Mesh back yoke, underarm gussets or side vents, by position and fabric." },
          { term: "Fabric and finish", detail: "Composition, weave, weight and any soil-release finish, with the wash the coat must survive." },
          { term: "Decoration", detail: "Embroidery of the name and logo, by size and position; chefs' names are often added per garment." },
        ],
      },
      {
        type: "callout",
        heading: "Not flame-resistant unless specified",
        body:
          "Cotton chars rather than melting, which is one reason kitchens prefer cotton-rich fabric near flames, but an ordinary chef coat is not protective clothing against heat and flame. If a coat must be flame-resistant, it is specified with an FR fabric to a named standard and tested.",
      },
    ],
    faqs: [
      { question: "Why are chef coats double-breasted?", answer: "The overlap can be switched to hide a stain during service, and the double layer gives a little extra protection across the chest." },
      { question: "Cotton or poly-cotton for chef coats?", answer: "Cotton breathes and is comfortable near heat; poly-cotton is more durable and holds colour through industrial laundering. A cotton-rich poly-cotton is a common compromise." },
      { question: "Are chef coats fire-resistant?", answer: "Not by default. Cotton chars rather than melting, but a flame-resistant coat needs an FR fabric made to a named standard." },
    ],
    related: [
      { label: "Workwear fabric by job", href: "/resources/workwear-fabric-by-job", description: "Choosing fabric for kitchens and other jobs." },
      { label: "Types of aprons", href: "/resources/apron-types-and-specification", description: "Bib, waist and cross-back aprons specified." },
      { label: "Hospitality & Food Service", href: "/products/hospitality-food-service", description: "Chef wear and service uniforms made to your specification." },
    ],
    seoTitle: "Chef Coat Specification Guide",
    seoDescription:
      "Why chef coats are double-breasted, cotton vs poly-cotton for kitchens, closures, ventilation and what a chef coat specification should state.",
  },

  /* ================================================================== */
  {
    slug: "denim-weights-and-washes",
    category: "Fabric guide",
    title: "Denim Weights, Weaves and Washes Explained for Buyers",
    headline: "Denim, by weight,\nweave and wash.",
    intro:
      "What denim ounces mean in grams, right-hand versus left-hand twill, sanforised versus raw, and how the wash changes the garment you approve.",
    summary:
      "Denim is a warp-faced cotton twill, usually 3x1, with an indigo-dyed warp and an undyed weft. Its weight is quoted in ounces per square yard: one ounce per square yard is about 33.9 gsm, so 12 oz denim is about 407 gsm. Sanforised denim is pre-shrunk mechanically and shrinks little; raw, unsanforised denim can shrink markedly. The wash is developed against a physical reference, and shrinkage is measured after it.",
    readingTime: "8 min read",
    updated,
    heroAsset: "photo.denimUtilityJacket",
    blocks: [
      {
        type: "table",
        heading: "Weight, in ounces and grams",
        intro: "Converted at 33.906 gsm per oz/yd², the exact factor. Bands are the usual trade description.",
        columns: ["oz/yd²", "gsm", "Band", "Typical use"],
        rows: [
          ["6", "203", "Light", "Shirts, dresses"],
          ["8", "271", "Light", "Shirts, light jackets"],
          ["10", "339", "Light", "Summer jeans, jackets"],
          ["12", "407", "Mid", "Most jeans"],
          ["14", "475", "Mid", "Work jeans, jackets"],
          ["16", "542", "Heavy", "Heavy workwear, enthusiast jeans"],
        ],
      },
      {
        type: "table",
        heading: "Twill direction",
        columns: ["Weave", "How it looks", "How it behaves"],
        rows: [
          ["Right-hand twill", "Diagonal rises to the right", "The most common; crisp and flat"],
          ["Left-hand twill", "Diagonal rises to the left", "Softer hand, fades differently"],
          ["Broken twill", "Direction alternates, no clear diagonal", "Reduces leg twist after washing"],
        ],
      },
      {
        type: "prose",
        heading: "Sanforised or raw",
        body: [
          "Sanforising is a mechanical process that compresses the fabric lengthwise so that most of its shrinkage happens at the mill. Sanforised denim usually shrinks only a few percent in washing. Raw or unsanforised denim has not been treated and can shrink markedly the first time it is washed, which is why it is sold to enthusiasts who expect it, and why a workwear program almost always specifies sanforised fabric.",
          "Either way, measure: shrinkage is tested on the fabric and on the washed garment, and the pattern is adjusted for it.",
        ],
      },
      {
        type: "table",
        heading: "Common washes",
        columns: ["Wash", "What it does", "Note"],
        rows: [
          ["Rinse", "A short wash to remove sizing and set shrinkage", "Keeps a dark, even colour"],
          ["Enzyme", "Enzymes soften the fabric and fade it gently", "A more controllable alternative to stones"],
          ["Stone", "Pumice abrades the surface for a worn look", "Harder on fabric and on hardware"],
          ["Bleach", "Lightens the indigo", "Strength loss must be checked"],
        ],
      },
      {
        type: "callout",
        heading: "Ask for rub fastness",
        body:
          "Indigo rubs off onto skin and other fabric (crocking), especially when dark and new. Rub fastness is tested to ISO 105-X12 or AATCC 8; agree the grade you will accept, dry and wet, before bulk.",
      },
    ],
    faqs: [
      { question: "How do I convert denim ounces to gsm?", answer: "Multiply oz/yd² by 33.906. 12 oz denim is about 407 gsm; 14 oz is about 475 gsm." },
      { question: "What does sanforised mean?", answer: "The fabric has been mechanically pre-shrunk at the mill, so it shrinks much less when washed." },
      { question: "Why do jeans twist after washing?", answer: "The twill's diagonal and yarn twist pull the leg seam round. Broken twill and correct cutting reduce it." },
    ],
    related: [
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "The oz/yd² conversion and how weight is measured." },
      { label: "Weave types explained", href: "/resources/weave-types-explained", description: "Twill and the other main weaves." },
      { label: "Denim", href: "/products/denim", description: "Denim shirts, jackets and bottoms developed to your specification." },
    ],
    tools: [{ label: "Unit converter", href: "/resources/calculators#units", description: "oz/yd² to gsm and other trade units." }],
    seoTitle: "Denim Weights & Washes Explained",
    seoDescription:
      "Denim ounces in gsm, right-hand vs left-hand twill, sanforised vs raw shrinkage, common washes and rub fastness, explained for apparel buyers.",
  },

  /* ================================================================== */
  {
    slug: "joggers-and-athleisure-fabric",
    category: "Fabric guide",
    title: "Joggers and Athleisure: Fabric, Stretch and Construction",
    headline: "Athleisure,\nby the fabric.",
    intro:
      "French terry, fleece, interlock or a performance knit; how much elastane; and the construction details that make joggers and lounge wear feel right.",
    summary:
      "Athleisure is mostly knitted: French terry and brushed fleece for joggers, jersey and interlock for tops, and polyester or nylon with elastane for performance pieces. Elastane gives stretch and recovery, but recovery weakens with heat and washing, so it is checked on a washed sample. Moisture-management and anti-odour claims need test evidence.",
    readingTime: "6 min read",
    updated,
    heroAsset: "photo.loungePantGrid",
    blocks: [
      {
        type: "table",
        heading: "Fabrics",
        columns: ["Fabric", "Character", "Typical use"],
        rows: [
          ["French terry", "Looped back, light and breathable", "Joggers, lounge tops"],
          ["Brushed fleece", "Soft brushed back, warm", "Winter joggers, hoodies"],
          ["Interlock", "Double knit, smooth both sides, stable", "Lounge pants and tops"],
          ["Performance knit", "Polyester or nylon with elastane, smooth and stretchy", "Training wear, leggings, tops"],
        ],
      },
      {
        type: "prose",
        heading: "Elastane: how much, and what it costs",
        body: [
          "A few percent of elastane in a jersey or terry adds comfort and helps garments keep their shape. Compression and leggings fabrics use much more. Elastane is sensitive to heat and to chlorine, and its recovery fades with washing, so a jogger that recovers well new can bag at the knee after a few washes. Test recovery and growth on a washed sample, and keep the care label realistic.",
        ],
      },
      {
        type: "list",
        heading: "Construction details",
        items: [
          { term: "Waistband", detail: "Encased elastic or a knitted band, with or without a drawcord, and the cord's ends and eyelets." },
          { term: "Seams", detail: "Overlock for most seams, coverstitch hems, and flatlock where a seam sits against the skin." },
          { term: "Leg", detail: "Rib cuff, elastic cuff or open hem, and the leg opening for each size." },
          { term: "Crotch", detail: "A gusset for movement in active styles." },
          { term: "Pockets", detail: "Side-seam, slant or zip pockets, and pocket bag fabric." },
        ],
      },
      {
        type: "callout",
        heading: "Performance claims need tests",
        body:
          "Words like moisture-wicking, quick-dry and anti-odour describe test results. Liquid moisture management is measured by AATCC 195, for example. Ask for the test report behind any claim you will print on a label or a website.",
      },
    ],
    faqs: [
      { question: "What fabric are joggers made from?", answer: "Usually French terry or brushed-back fleece, in cotton or cotton-polyester blends. Performance joggers use polyester or nylon knits with elastane." },
      { question: "Why do joggers bag at the knee?", answer: "The fabric stretches and does not fully recover. More elastane, a tighter knit and a heavier fabric all help; test on a washed sample." },
      { question: "What does moisture-wicking mean?", answer: "The fabric moves sweat away from the skin to the surface where it evaporates. It is a test result, measured by methods such as AATCC 195, not a description." },
    ],
    related: [
      { label: "Knit constructions explained", href: "/resources/knit-constructions-explained", description: "How jersey, interlock and fleece are made." },
      { label: "Fibres compared for garments", href: "/resources/fibres-compared-for-garments", description: "Cotton, polyester, nylon and elastane compared." },
      { label: "Athleisure", href: "/products/athleisure", description: "Joggers, lounge and performance knits." },
    ],
    seoTitle: "Joggers & Athleisure Fabric Guide",
    seoDescription:
      "French terry, fleece, interlock and performance knits for joggers and athleisure, how much elastane to use, and which claims need tests.",
  },

  /* ================================================================== */
  {
    slug: "womens-uniform-fit",
    category: "Buyer guide",
    title: "Women's Uniform Fit: Why It Needs Its Own Pattern",
    headline: "Women's uniform,\ncut to fit.",
    intro:
      "Why a women's uniform is a separate pattern, not a smaller men's one, and how to specify, fit and grade a women's range so it fits the people wearing it.",
    summary:
      "A women's uniform needs its own block (base pattern) because bust, waist, hip and shoulder proportions differ from men's and do not scale together. Shaping comes from darts, princess seams and a different side-seam line. A women's range is specified with its own measurement chart and grading, fitted on a fit model, and checked as a size set before bulk.",
    readingTime: "6 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "prose",
        heading: "Shrink it and pink it does not fit",
        body: [
          "Making a women's version by grading a men's pattern down produces garments that are tight across the bust and hip and loose at the waist and shoulder. A women's block starts from women's body measurements and shapes the garment where the body is shaped.",
        ],
      },
      {
        type: "list",
        heading: "Where women's garments differ",
        items: [
          { term: "Shaping", detail: "Bust darts, waist darts or princess seams on shirts and jackets; a shaped side seam on knits." },
          { term: "Shoulder and sleeve", detail: "A narrower shoulder, a different armhole and a shorter sleeve length." },
          { term: "Length and hem", detail: "Body length and hem shape suited to the hip, often with side vents." },
          { term: "Closure direction", detail: "Women's shirts conventionally button right over left, the opposite of men's." },
          { term: "Collar and neck", detail: "Neck opening and collar size scaled to the women's block." },
        ],
      },
      {
        type: "list",
        heading: "How to specify a women's range",
        items: [
          { term: "A women's measurement chart", detail: "Bust, waist, hip, across shoulder, front and back length and sleeve, each with a tolerance." },
          { term: "Grading", detail: "The increments between sizes, set for the women's range rather than copied from the men's." },
          { term: "Size system", detail: "Numeric or letter sizes, and which market's system, stated plainly." },
          { term: "Extended sizes", detail: "Larger sizes graded and fitted on their own, because bodies do not scale in straight lines." },
          { term: "Fit approval", detail: "A fit sample on a fit model, then a size set across the range." },
        ],
      },
      {
        type: "callout",
        heading: "Fit on people",
        body:
          "Approve fit on a fit model of your base size, and check a size set across the range before bulk. A garment that measures to the chart can still fit badly; only wearing it shows that.",
      },
    ],
    faqs: [
      { question: "Why not use a unisex uniform?", answer: "Unisex garments are usually cut on a men's block, so they fit many women poorly. A women's block or a choice of both lets every wearer get a fit." },
      { question: "Which side do women's shirt buttons go on?", answer: "Conventionally, women's shirts button right over left, with buttons on the wearer's left, the opposite of men's." },
      { question: "How are extended sizes developed?", answer: "Graded and fitted on their own, with their own fit checks, rather than enlarged in straight increments from a small base." },
    ],
    related: [
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete tech pack contains." },
      { label: "Evaluating apparel samples", href: "/resources/evaluating-apparel-samples", description: "How to review a fit sample." },
      { label: "Womenswear", href: "/products/womenswear", description: "Women's uniform developed on a dedicated block." },
    ],
    seoTitle: "Women's Uniform Fit Guide",
    seoDescription:
      "Why a women's uniform needs its own pattern, where women's garments differ, and how to specify, grade and fit a women's uniform range.",
  },

  /* ================================================================== */
  {
    slug: "childrens-clothing-safety-requirements",
    category: "Buyer guide",
    title: "Children's Clothing Safety Requirements: US, UK and EU",
    headline: "Children's clothing,\nand its safety rules.",
    intro:
      "The safety rules that apply to children's and baby clothing in the United States, the UK and the EU: cords and drawstrings, small parts, flammability, chemicals, labelling and certification.",
    summary:
      "Children's clothing carries rules adult apparel does not. In the US, children's products need third-party testing by a CPSC-accepted laboratory and a Children's Product Certificate issued by the importer, with limits on lead, rules on small parts for under-threes, drawstring restrictions, flammability standards and permanent tracking labels. In the UK and EU, EN 14682 governs cords and drawstrings, REACH restricts substances such as nickel release, and general product safety law applies. This is a summary for orientation, not legal advice.",
    readingTime: "9 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "United States",
        intro: "Under the Consumer Product Safety Improvement Act (CPSIA) and CPSC rules. Check the CPSC's current requirements for each product.",
        columns: ["Area", "Requirement in outline"],
        rows: [
          ["Certification", "Third-party testing by a CPSC-accepted laboratory, and a Children's Product Certificate issued by the importer or US manufacturer"],
          ["Lead", "Limits on lead content in the material and in paint and surface coatings, including on buttons, snaps and prints"],
          ["Small parts", "Products for children under three must not have parts that detach as choking hazards; attachments are tested by use-and-abuse methods"],
          ["Drawstrings", "Hood and neck drawstrings on children's upper outerwear in sizes 2T to 12 are treated as a substantial hazard; waist and bottom drawstrings are limited too"],
          ["Flammability", "General clothing must meet 16 CFR 1610; children's sleepwear has stricter standards (16 CFR 1615 and 1616), with exemptions such as tight-fitting garments"],
          ["Tracking labels", "Permanent marks on the product and packaging that identify the source, date and batch"],
        ],
      },
      {
        type: "table",
        heading: "United Kingdom and European Union",
        columns: ["Area", "Requirement in outline"],
        rows: [
          ["Cords and drawstrings", "EN 14682 sets where cords and drawstrings are allowed on children's clothing and their lengths, by age group"],
          ["Chemicals", "REACH restricts substances in textiles, including nickel release from items in prolonged skin contact, azo dyes that release certain amines, and others"],
          ["General safety", "Products must be safe under general product safety law; in the EU, the General Product Safety Regulation applies"],
          ["Labelling", "Fibre composition labelling under the textile labelling rules"],
        ],
      },
      {
        type: "list",
        heading: "Design choices that avoid problems",
        items: [
          { term: "No hood or neck drawstrings", detail: "Use elastic, snaps or fixed tabs for young children's garments." },
          { term: "Secure fastenings", detail: "Press studs specified nickel-free and attached to pass a pull test; buttons sewn with a shank and lock stitch." },
          { term: "No loose decoration", detail: "Avoid sequins, beads and small appliqués on infant wear." },
          { term: "Print chemistry", detail: "Inks and transfers chosen for lead and restricted-substance limits, with test evidence." },
          { term: "Labels", detail: "Soft, printed or tagless labels, placed where they will not irritate, with the required marks." },
        ],
      },
      {
        type: "callout",
        heading: "Decide the markets first",
        body:
          "The requirements depend on where the garment is sold, and the importer carries the certification duty in the US. Name every destination market before development, and agree which laboratory tests the product and who pays.",
      },
    ],
    faqs: [
      { question: "Do children's clothes need testing in the US?", answer: "Yes. Children's products need third-party testing by a CPSC-accepted laboratory and a Children's Product Certificate, issued by the importer or US manufacturer." },
      { question: "Are drawstrings allowed on children's hoodies?", answer: "Hood and neck drawstrings on children's upper outerwear in sizes 2T to 12 are treated as a substantial hazard in the US, and EN 14682 restricts them in the UK and EU. Use alternatives." },
      { question: "What is a tracking label?", answer: "A permanent mark on a children's product and its packaging, required in the US, identifying the manufacturer, the production date and the batch, so a product can be traced in a recall." },
      { question: "Is this legal advice?", answer: "No. It is an outline to help plan a program. Check the current rules with the regulator or a compliance specialist for each market." },
    ],
    related: [
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Which test answers which question." },
      { label: "Hoodie and sweatshirt specification", href: "/resources/hoodie-and-sweatshirt-specification", description: "Fabric and construction for hoodies, including drawcords." },
      { label: "Kidswear", href: "/products/kidswear", description: "Children's and baby wear developed against market safety rules." },
    ],
    seoTitle: "Children's Clothing Safety Rules",
    seoDescription:
      "CPSIA testing, Children's Product Certificates, drawstrings, small parts, flammability, EN 14682 and REACH: children's clothing rules in outline.",
  },

  /* ================================================================== */
  {
    slug: "medical-scrubs-specification",
    category: "Buyer guide",
    title: "Medical Scrubs Specification: Fabric, Fit and Laundering",
    headline: "Scrubs,\nspecified.",
    intro:
      "Which fabric survives hospital laundering, how scrubs are cut and sized, colour coding, and what an antimicrobial or fluid-repellent claim needs behind it.",
    summary:
      "Scrubs are specified by fabric (poly-cotton, polyester-viscose with elastane, or cotton), weight, the laundering they must survive, the top and trouser construction, pockets, sizes and lengths, and colour. Healthcare laundries wash hot to disinfect, so the fabric and dyes must hold up to that process. Standard scrubs are workwear; garments sold as protection against fluids or infection are regulated products, and finishes such as antimicrobial need test evidence and may be regulated in their own right.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "table",
        heading: "Fabrics",
        columns: ["Fabric", "Character", "Laundering"],
        rows: [
          ["Poly-cotton (often 65/35)", "Durable, colour-fast, quick-drying", "Stands up well to hot, frequent washing"],
          ["Polyester-viscose with elastane", "Soft, stretchy, modern fit", "Check colour and recovery after hot washing"],
          ["100% cotton", "Cool and soft", "Shrinks and fades more; less suited to high temperatures"],
        ],
      },
      {
        type: "prose",
        heading: "Laundering decides the fabric",
        body: [
          "Healthcare laundries use heat to disinfect. In the UK, for example, NHS guidance for healthcare linen sets thermal disinfection at 65°C for at least 10 minutes or 71°C for at least 3 minutes. Staff who wash scrubs at home use lower temperatures. Tell the factory how the scrubs will be washed, and test colour fastness, shrinkage and seam strength after that process.",
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Top", detail: "V-neck or mock wrap, set-in or raglan sleeve, side vents, and chest, lower and sleeve pockets with pen slots." },
          { term: "Trouser", detail: "Drawcord, elastic or combination waist; straight or jogger leg; cargo and back pockets." },
          { term: "Sizes and lengths", detail: "Unisex or cut-for-gender, and petite, regular and tall inseams." },
          { term: "Colour", detail: "Lab dips matched to the department or role colour, held across reorders." },
          { term: "Reinforcement", detail: "Bar tacks at pocket corners and a reinforced crotch seam." },
          { term: "Labels", detail: "Care labels that match the laundering process, and size identification that survives it." },
        ],
      },
      {
        type: "callout",
        heading: "Antimicrobial and fluid-repellent claims",
        body:
          "A finish described as antimicrobial or fluid-repellent needs a named test and a result. In the US, antimicrobial claims that go beyond protecting the garment itself are regulated by the EPA as pesticide claims. Barrier garments such as surgical gowns are medical devices or protective equipment with their own standards. Agree what the garment will be called before it is made.",
      },
    ],
    faqs: [
      { question: "What fabric are scrubs made of?", answer: "Most are poly-cotton or polyester-viscose with elastane; some are 100% cotton. Poly-cotton is the most durable under hot laundering." },
      { question: "Are scrubs protective clothing?", answer: "Standard scrubs are workwear. Garments sold as protection against fluids or infection are regulated as medical devices or protective equipment." },
      { question: "Can scrubs be antimicrobial?", answer: "Finishes exist, but a claim needs test evidence, and in some markets, including the US, health-related antimicrobial claims are regulated." },
    ],
    related: [
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Colourfastness, shrinkage and strength tests." },
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why the blend suits frequent laundering." },
      { label: "Medical Scrubs", href: "/products/medical-scrubs", description: "Scrub tops, trousers and lab coats made to your specification." },
    ],
    seoTitle: "Medical Scrubs Specification Guide",
    seoDescription:
      "Scrub fabrics for hospital laundering, top and trouser construction, sizes and colour codes, and what antimicrobial claims need behind them.",
  },

  /* ================================================================== */
  {
    slug: "cap-construction-explained",
    category: "Buyer guide",
    title: "Cap Construction Explained: Panels, Crown, Peak and Closure",
    headline: "Caps,\ntaken apart.",
    intro:
      "Five-panel or six, structured or not, which peak and which closure, and how the logo is applied. The vocabulary a cap specification uses.",
    summary:
      "A cap is specified by its panels (usually five or six), whether the front is structured with buckram, its profile and crown height, the peak (curved or flat, and its stiffener), the closure or fitted size, the sweatband and taping, the eyelets and top button, and the decoration. Embroidery on a structured front is the classic uniform cap; 3D puff embroidery suits bold, simple logos.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.mesh",
    blocks: [
      {
        type: "table",
        heading: "The parts of a cap",
        columns: ["Part", "What it is", "What to specify"],
        rows: [
          ["Panels", "The crown is sewn from five or six panels", "Panel count; a five-panel cap has a seamless front for a large logo"],
          ["Buckram", "A stiff lining behind the front panels", "Structured or unstructured"],
          ["Profile", "How high and deep the crown sits", "High, mid or low profile and crown height"],
          ["Peak (bill, visor)", "The brim, with a stiffener inside", "Pre-curved or flat, length, and a washable stiffener"],
          ["Eyelets and top button", "Ventilation holes and the button where the panels meet", "Sewn or metal eyelets, button covered in self fabric or contrast"],
          ["Sweatband and taping", "The inner band and the tape covering inside seams", "Cotton or performance sweatband, printed taping"],
          ["Closure", "How the size adjusts", "Snapback, strap and buckle, hook and loop, elastic fit, or fitted sizes"],
        ],
      },
      {
        type: "prose",
        heading: "Sizes",
        body: [
          "Most uniform caps are one size with an adjustable closure, which keeps a program simple. Fitted caps look neater and are sized by head circumference, so they need a size run and a size breakdown. Elastic-fit caps cover a range of sizes without a strap.",
        ],
      },
      {
        type: "table",
        heading: "Decoration",
        columns: ["Method", "Best for", "Note"],
        rows: [
          ["Flat embroidery", "Most logos and text", "Cost rises with stitch count"],
          ["3D puff embroidery", "Bold, simple shapes on a structured front", "Fine detail and small text do not work raised"],
          ["Woven or embroidered patch", "Detailed logos, a premium look", "Sewn or heat-applied"],
          ["Screen print or transfer", "Fine detail, many colours", "Best on smooth, flat panels"],
        ],
      },
      {
        type: "callout",
        heading: "Decorate before or after",
        body:
          "Front panels can be embroidered flat before the cap is assembled, or the finished cap embroidered on a cap frame. Each gives a different result and limit on logo size. Ask which the factory uses and approve the logo on a sample cap.",
      },
    ],
    faqs: [
      { question: "What is the difference between a five-panel and a six-panel cap?", answer: "A six-panel cap has a seam down the centre front; a five-panel cap has one wide front panel with no centre seam, which suits a large logo." },
      { question: "What is buckram?", answer: "A stiff fabric lining behind the front panels of a structured cap that keeps the crown upright and gives a firm surface for embroidery." },
      { question: "What is 3D puff embroidery?", answer: "Embroidery stitched over a foam underlay so the design stands up from the cap. It suits bold, simple shapes." },
    ],
    related: [
      { label: "Embroidery vs screen printing", href: "/resources/embroidery-vs-screen-printing", description: "Choosing a decoration method." },
      { label: "Decoration methods compared", href: "/resources/decoration-methods-compared", description: "Six methods side by side." },
      { label: "Caps & Headwear", href: "/products/caps-headwear", description: "Caps, hats and chef skull caps made to your specification." },
    ],
    seoTitle: "Cap Construction Explained",
    seoDescription:
      "Five-panel and six-panel caps, structured and unstructured crowns, peaks, closures, sizes and decoration: the vocabulary of a cap specification.",
  },

  /* ================================================================== */
  {
    slug: "tote-bag-specification",
    category: "Buyer guide",
    title: "Tote Bag Specification: Fabric, Handles, Gussets and Load",
    headline: "Tote bags,\nspecified.",
    intro:
      "Canvas weight, handle length and anchoring, gussets, seams and print area: how to specify a tote bag that carries what it is meant to carry.",
    summary:
      "A tote bag is specified by its fabric and weight, its dimensions (width, height and gusset), its handles (length, width, fabric and how they are anchored), its seams and edge finish, closures and pockets, decoration and print area, and the load it must carry. Handles fail at their anchors, so the anchoring stitch and the fabric behind it matter more than the handle itself.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.canvas",
    blocks: [
      {
        type: "table",
        heading: "Fabric",
        columns: ["Fabric", "Character", "Typical use"],
        rows: [
          ["Light cotton or calico", "Light, flat-folding, inexpensive", "Promotional and event bags"],
          ["Cotton canvas or duck", "Strong, holds shape, takes print well; often quoted in oz/yd²", "Reusable shopping bags, premium totes, tool bags"],
          ["Polyester and recycled polyester", "Light, strong, water-resistant, suits sublimation", "Shopping bags, foldable bags"],
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Dimensions", detail: "Finished width, height and gusset depth, each with a tolerance." },
          { term: "Handles", detail: "Self-fabric or webbing; length, width and drop; and short (held) or long (over the shoulder)." },
          { term: "Anchoring", detail: "Where the handles attach and with what stitch: a box-and-cross stitch or bar tacks, through a reinforced hem." },
          { term: "Body and gusset", detail: "Flat, bottom gusset or full gusset, and any base insert to keep the shape." },
          { term: "Seams and edges", detail: "Overlocked, bound or French seams inside, so raw edges do not fray." },
          { term: "Closure and pockets", detail: "Open top, zip, press stud, magnetic snap or drawcord, and any inside pocket." },
          { term: "Decoration", detail: "Method, size and position of each logo, and the print area on each side." },
        ],
      },
      {
        type: "prose",
        heading: "State the load and test it",
        body: [
          "The right fabric and handles depend on what the bag must carry. State the load and the use, for example groceries, books or tools, and check a sample by loading it and hanging it by the handles. Some places define what counts as a reusable shopping bag by its own durability test, so check the destination's rules if the bag will be sold as reusable.",
        ],
      },
      {
        type: "callout",
        heading: "Recycled content needs evidence",
        body:
          "If a bag will be sold as made from recycled material, the claim needs a chain of evidence from the fabric supplier, such as Global Recycled Standard (GRS) certification. Ask for it before the claim is printed.",
      },
    ],
    faqs: [
      { question: "What fabric weight is best for a tote bag?", answer: "Light cotton suits giveaway bags; heavier canvas, often quoted as 10 to 16 oz per square yard, suits reusable shopping and tool bags. Choose for the load." },
      { question: "How long should tote bag handles be?", answer: "Short handles are held in the hand; long handles go over the shoulder. Specify the handle length and the drop, the distance from the top of the bag to the top of the handle." },
      { question: "What is a box-and-cross stitch?", answer: "A square of stitching with a cross through it, used to anchor handles and straps. It spreads the load across the stitched area." },
    ],
    related: [
      { label: "Decoration methods compared", href: "/resources/decoration-methods-compared", description: "Screen print, embroidery, transfer and sublimation." },
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "Fabric weight in gsm and oz/yd²." },
      { label: "Bags & Totes", href: "/products/bags-totes", description: "Totes, drawstring and tool bags made to your specification." },
    ],
    tools: [{ label: "Unit converter", href: "/resources/calculators#units", description: "Canvas oz/yd² to gsm." }],
    seoTitle: "Tote Bag Specification Guide",
    seoDescription:
      "Tote bag fabrics and weights, handle length and anchoring, gussets, seams and print area, and why a bag's load should be stated and tested.",
  },
];
