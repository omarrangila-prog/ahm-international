import type { Guide } from "./guides";

/**
 * Guides for the families added on 10 November 2026 (second round), and five
 * cross-cutting buyer guides. Same rules as data/guides-products.ts: general
 * trade knowledge, standards and regulations named so a buyer can check them,
 * nothing about AHM's own machinery, tests, certifications or capacity, and
 * `updated` rather than a review that has not happened.
 */

const updated = { label: "November 2026", iso: "2026-11-10" };

export const rangeGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "chef-trousers-and-kitchen-textiles",
    category: "Buyer guide",
    title: "Chef Trousers and Kitchen Textiles: What to Specify",
    headline: "Chef trousers and\nkitchen textiles.",
    intro:
      "How to specify the rest of a kitchen program: chef trousers, tea towels, oven gloves and table linen, and why they are chosen for the same laundry.",
    summary:
      "Chef trousers are specified by waistband, cut, pockets, fabric and pattern; tea towels by fabric, size, hems and loop; oven gloves by style, wadding and a tested heat rating; table linen by fabric, size and corners. Everything in a kitchen program is laundered hard, so fabric and colour are chosen for the same wash and tested together.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "table",
        heading: "Article by article",
        columns: ["Article", "The decisions", "What to test"],
        rows: [
          ["Chef trouser", "Waistband, cut (baggy, straight, slim), pockets, plain or check", "Colour and shrinkage after hot washing"],
          ["Tea towel", "Cotton, waffle, terry or linen union; size; hems; loop", "Absorbency, lint, shrinkage"],
          ["Oven glove", "Single or double; outer fabric; wadding; quilting", "Heat resistance to a named standard"],
          ["Table napkin", "Cotton or poly-cotton; size; mitred corners", "Colour-fastness and shrinkage in hotel laundering"],
        ],
      },
      {
        type: "prose",
        heading: "Checks: printed or woven in",
        body: [
          "The classic black-and-white chef check can be printed or yarn-dyed. A yarn-dyed check is woven from coloured yarns, so it looks the same on both sides and keeps its look through laundering. A printed check costs less and allows any design, but can fade with repeated hot washing.",
        ],
      },
      {
        type: "callout",
        heading: "Oven gloves are protective equipment",
        body:
          "An oven glove protects against heat, so a heat claim needs a test. In the EU, oven gloves are within the scope of the PPE Regulation (EU) 2016/425, and professional heat-protective gloves are commonly tested to EN 407. Name the standard before the glove is designed.",
      },
    ],
    faqs: [
      { question: "What fabric is best for chef trousers?", answer: "Poly-cotton twill around 170-240 gsm is common for durability in commercial laundering; cotton is cooler near heat. Stretch blends move better." },
      { question: "Why are kitchen textiles specified together?", answer: "They go through the same laundry, so colour, shrinkage and durability are chosen for that process and checked together." },
      { question: "Are oven gloves regulated?", answer: "In the EU they fall within the PPE Regulation. Any heat-resistance claim should be backed by a test to a named standard." },
    ],
    related: [
      { label: "Chef coat specification", href: "/resources/chef-coat-specification", description: "The rest of the chef's uniform." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Colourfastness, shrinkage and strength tests." },
      { label: "Chef Trousers & Kitchen Textiles", href: "/products/kitchen-textiles", description: "Chef trousers, tea towels, oven gloves and napkins." },
    ],
    seoTitle: "Chef Trousers & Kitchen Textiles Guide",
    seoDescription:
      "How to specify chef trousers, tea towels, oven gloves and table linen for commercial kitchens, and which tests and standards apply.",
  },

  /* ================================================================== */
  {
    slug: "coverall-specification",
    category: "Buyer guide",
    title: "Coverall Specification: Fabric, Fit and Protective Standards",
    headline: "Coveralls,\nspecified.",
    intro:
      "Coveralls and bib-and-brace overalls: the fabric, the closures, the fit across a range of bodies, and the line between a work garment and certified protective clothing.",
    summary:
      "A coverall is specified by fabric and weight, closure, back waist and pleats, pockets, cuffs, reinforcement and sizes by chest and length. An ordinary coverall is workwear. One sold as flame-resistant, welding, anti-static or chemical protection is certified protective clothing made to a standard such as EN ISO 11612, EN ISO 11611, EN 1149-5 or, in the US, NFPA 2112, and certified as a finished garment.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Fabric", detail: "Poly-cotton twill or cotton drill, weight and tolerance, colour and any finish." },
          { term: "Closure", detail: "Two-way zip with a storm flap, studs or buttons; concealed closures for some workplaces." },
          { term: "Fit", detail: "Elasticated back waist, action back pleats, adjustable cuffs and ankles." },
          { term: "Pockets", detail: "Chest, hip, rule, back and leg pockets, with closures and bar tacks." },
          { term: "Reinforcement", detail: "Crotch gusset, double knees or knee-pad pockets." },
          { term: "Sizes", detail: "By chest, with regular and tall lengths in each." },
        ],
      },
      {
        type: "table",
        heading: "When a coverall is protective clothing",
        intro: "Examples of standards a buyer may nominate. Each covers the finished garment, not just its fabric.",
        columns: ["Hazard", "Standard (examples)"],
        rows: [
          ["Heat and flame", "EN ISO 11612; NFPA 2112 in the US for flash fire"],
          ["Welding", "EN ISO 11611"],
          ["Static electricity", "EN 1149-5"],
          ["General requirements for protective clothing", "EN ISO 13688"],
          ["High visibility", "EN ISO 20471; ANSI/ISEA 107"],
        ],
      },
      {
        type: "callout",
        heading: "Fabric certification is not garment certification",
        body:
          "A flame-resistant fabric does not make a flame-resistant coverall on its own: thread, zips, labels, tape and construction all count. If the garment will be sold as protective, the standard is named at the start and the finished coverall is tested and certified.",
      },
    ],
    faqs: [
      { question: "What fabric are coveralls made from?", answer: "Usually poly-cotton twill or cotton drill around 200-320 gsm. Protective coveralls use certified fabrics such as inherently flame-resistant fibres or treated cotton." },
      { question: "What is a boiler suit?", answer: "Another name for a one-piece coverall, originally worn by people who cleaned boilers." },
      { question: "Can any coverall be made flame-resistant?", answer: "Only by making it from certified materials to a named standard and certifying the finished garment. An ordinary coverall cannot be made protective by a label." },
    ],
    related: [
      { label: "Work trouser specification", href: "/resources/work-trouser-specification", description: "Reinforcement and pockets for workwear bottoms." },
      { label: "Work jacket specification", href: "/resources/work-jacket-specification", description: "Shells, linings and hi-vis standards." },
      { label: "Coveralls & Overalls", href: "/products/coveralls", description: "Coveralls and bib-and-brace overalls made to your specification." },
    ],
    seoTitle: "Coverall Specification Guide",
    seoDescription:
      "How to specify work coveralls and overalls: fabric, closures, fit, sizes, and the standards that apply when a coverall is sold as protective clothing.",
  },

  /* ================================================================== */
  {
    slug: "knitwear-gauge-and-yarn",
    category: "Fabric guide",
    title: "Knitwear Explained: Gauge, Yarn, Stitch and Construction",
    headline: "Knitwear, by gauge,\nyarn and stitch.",
    intro:
      "What gauge means, how yarn and stitch change a sweater, fully fashioned versus cut and sew, and why pilling and shrinkage are decided before the first panel is knitted.",
    summary:
      "Knitwear is specified by gauge (needles per inch on the knitting machine), yarn (fibre, count and ply), stitch (jersey, rib, cable, jacquard), construction (fully fashioned or cut and sew) and finish. Low gauges make chunky knits and high gauges fine ones. Wool can felt and shrink unless it is treated for machine washing, and short or loosely spun yarns pill.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.rib",
    blocks: [
      {
        type: "table",
        heading: "Gauge",
        columns: ["Gauge", "Look", "Typical use"],
        rows: [
          ["3 to 5", "Chunky, visible stitches", "Outdoor and casual sweaters"],
          ["7", "Medium", "Classic casual knits, school knitwear"],
          ["12 to 14", "Fine and smooth", "Corporate sweaters, cardigans, vests"],
          ["16 and above", "Very fine", "Lightweight knits worn under jackets"],
        ],
      },
      {
        type: "table",
        heading: "Common yarns",
        columns: ["Yarn", "Character", "Watch for"],
        rows: [
          ["Cotton", "Cool, washable, crisp", "Can stretch and lose shape"],
          ["Acrylic", "Warm, light, easy-care, inexpensive", "Pills more than wool"],
          ["Wool", "Warm, breathable, elastic", "Felts and shrinks unless treated for machine washing"],
          ["Blends", "Balance cost, care and warmth", "Behaviour depends on the mix"],
        ],
      },
      {
        type: "prose",
        heading: "Fully fashioned or cut and sew",
        body: [
          "Fully fashioned panels are knitted to their final shape, then joined by linking stitch to stitch, which gives clean edges and less waste. Cut-and-sew knitwear is cut from knitted panels and overlocked, which is quicker and cheaper but less refined. Most premium sweaters are fully fashioned; many promotional ones are cut and sewn.",
        ],
      },
      {
        type: "callout",
        heading: "Test pilling and shrinkage on the sample",
        body:
          "Pilling depends on fibre length, yarn twist and knit tightness, and is tested by methods such as ISO 12945. Wool shrinkage depends on whether the yarn is treated for machine washing. Both are checked on a washed sample before bulk.",
      },
    ],
    faqs: [
      { question: "What does 12 gauge mean?", answer: "Twelve needles per inch on the knitting machine, which gives a fine, smooth knit." },
      { question: "Why do wool sweaters shrink?", answer: "Wool fibres have scales that lock together with heat, moisture and agitation (felting). Machine-washable wool is treated to prevent it." },
      { question: "Is fully fashioned knitwear better?", answer: "It has cleaner edges and seams and usually fits better, but costs more. Cut and sew suits shorter, cost-sensitive programs." },
    ],
    related: [
      { label: "Knit constructions explained", href: "/resources/knit-constructions-explained", description: "Jersey, rib, interlock and fleece." },
      { label: "Fibres compared for garments", href: "/resources/fibres-compared-for-garments", description: "Cotton, wool, acrylic and blends." },
      { label: "Knitted Sweaters & Cardigans", href: "/products/knitwear", description: "Sweaters, cardigans and knit vests made to your specification." },
    ],
    seoTitle: "Knitwear Gauge & Yarn Explained",
    seoDescription:
      "Knitwear gauge, yarn, stitch and construction explained: fully fashioned vs cut and sew, pilling, wool shrinkage, and how to specify a sweater.",
  },

  /* ================================================================== */
  {
    slug: "sublimated-sportswear-guide",
    category: "Buyer guide",
    title: "Sublimated Sportswear and Team Kits: A Buyer's Guide",
    headline: "Sublimated\nteam kits.",
    intro:
      "How sublimation works, why it needs polyester, how to prepare artwork and a roster, and how colours are approved before a club's kit is made.",
    summary:
      "Sublimation prints a design onto transfer paper with sublimation dyes, then uses heat and pressure to turn the dye into a gas that bonds with polyester fibres. The colour becomes part of the fabric, so it does not crack or peel and allows unlimited colours. It needs a high polyester content and a white or light fabric, and colours are approved on a strike-off on the actual fabric.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.mesh",
    blocks: [
      {
        type: "list",
        heading: "What to prepare",
        items: [
          { term: "Artwork", detail: "A vector or high-resolution design for each panel, with colours given as references." },
          { term: "Logos", detail: "Club badge and sponsor logos as vector files, with their positions and sizes." },
          { term: "Roster", detail: "Each player's name, number and size, and how names should be written." },
          { term: "Cuts and sizes", detail: "Men's, women's and youth blocks, and the size breakdown." },
          { term: "Fabric", detail: "Polyester interlock, mesh or recycled polyester, by weight." },
        ],
      },
      {
        type: "table",
        heading: "Sublimation compared",
        columns: ["Method", "Best for", "Limits"],
        rows: [
          ["Sublimation", "All-over designs, many colours, light polyester", "Needs polyester and a light base"],
          ["Screen print", "Logos and numbers on cotton or polyester", "Each colour is a separate screen"],
          ["Heat transfer", "Names, numbers, badges", "Can crack or lift if poorly applied"],
          ["Embroidery", "Club badges", "Adds weight and stiffness"],
        ],
      },
      {
        type: "callout",
        heading: "Approve colours on the real fabric",
        body:
          "Sublimated colours shift with the fabric and the printer profile, so screen colours and paper proofs are not enough. Approve a strike-off printed on the production fabric.",
      },
    ],
    faqs: [
      { question: "Can sublimation be done on cotton?", answer: "Not effectively. Sublimation dyes bond with polyester; on cotton they wash out." },
      { question: "Does sublimation crack or fade?", answer: "It does not crack, because the dye is in the fibre. It is very wash-fast, though strong sunlight fades all dyes over time." },
      { question: "Can dark fabrics be sublimated?", answer: "No. Sublimation is transparent, so it needs a white or light base. Dark designs are printed onto a white fabric." },
    ],
    related: [
      { label: "Decoration methods compared", href: "/resources/decoration-methods-compared", description: "Six methods side by side." },
      { label: "Joggers and athleisure fabric", href: "/resources/joggers-and-athleisure-fabric", description: "Performance knits and claims." },
      { label: "Sportswear & Team Kits", href: "/products/sportswear", description: "Sublimated jerseys, shorts and track jackets." },
    ],
    seoTitle: "Sublimated Sportswear Guide",
    seoDescription:
      "How sublimation printing works for team kits, why it needs polyester, what artwork and roster to prepare, and how colours are approved.",
  },

  /* ================================================================== */
  {
    slug: "sleepwear-specification-and-safety",
    category: "Buyer guide",
    title: "Sleepwear and Pyjamas: Specification and Children's Safety Rules",
    headline: "Sleepwear, and\nthe rules for children.",
    intro:
      "How to specify pyjamas and nightshirts, and the flammability and labelling rules for children's sleepwear in the US, UK and EU.",
    summary:
      "Adult sleepwear is specified by fabric, print, trims and fit. Children's sleepwear has flammability rules: in the US, 16 CFR 1615 and 1616 for sizes up to 14, with exemptions for infant garments and tight-fitting garments within set dimensions; in the UK, the Nightwear (Safety) Regulations 1985; in the EU, EN 14878 sets burning behaviour for children's nightwear. Fabric and fit are decided with these in mind. This is an outline, not legal advice.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "table",
        heading: "Children's sleepwear rules in outline",
        columns: ["Market", "Rule", "What it means for design"],
        rows: [
          ["United States", "16 CFR 1615 (sizes 0-6X) and 1616 (7-14)", "Fabric must pass a flammability test, or the garment must be tight-fitting within maximum dimensions, or be an infant garment of 9 months or under"],
          ["United Kingdom", "Nightwear (Safety) Regulations 1985", "Flammability performance for children's nightdresses and dressing gowns, and labelling of other nightwear"],
          ["European Union", "EN 14878", "Burning behaviour of children's nightwear, with general product safety law"],
        ],
      },
      {
        type: "list",
        heading: "What a sleepwear specification states",
        items: [
          { term: "Fabric", detail: "Poplin, voile, flannel, jersey or modal blends, by weight." },
          { term: "Fit", detail: "Relaxed or, for US children's sizes, tight-fitting to the published dimensions." },
          { term: "Trims", detail: "Piping, buttons, drawcords and elastic; drawcords and small parts follow children's rules too." },
          { term: "Print", detail: "Placement or all-over print, or a yarn-dyed check." },
          { term: "Labels", detail: "Care, fibre and any required safety label or hangtag." },
        ],
      },
      {
        type: "callout",
        heading: "Decide the markets first",
        body:
          "A children's pyjama that is compliant in one market may not be in another. Name every destination market before fabric and fit are chosen, and agree the laboratory testing.",
      },
    ],
    faqs: [
      { question: "Why are children's pyjamas tight-fitting?", answer: "In the US, children's sleepwear that does not meet the flammability standard is allowed only if it fits close to the body, which leaves less air to feed a flame." },
      { question: "Do adult pyjamas have flammability rules?", answer: "Adult sleepwear follows general clothing flammability rules in most markets, which are less strict than the children's rules." },
      { question: "Is this legal advice?", answer: "No. It is an outline. Check current rules with the regulator or a compliance specialist for each market." },
    ],
    related: [
      { label: "Children's clothing safety requirements", href: "/resources/childrens-clothing-safety-requirements", description: "Testing, certificates, cords and chemicals." },
      { label: "Weave types explained", href: "/resources/weave-types-explained", description: "Poplin, flannel and voile in context." },
      { label: "Sleepwear & Pyjamas", href: "/products/sleepwear", description: "Woven and jersey pyjama sets and nightshirts." },
    ],
    seoTitle: "Sleepwear & Pyjama Safety Guide",
    seoDescription:
      "How to specify pyjamas and nightshirts, and children's sleepwear flammability rules in outline: 16 CFR 1615/1616, UK Nightwear Regulations, EN 14878.",
  },

  /* ================================================================== */
  {
    slug: "towel-gsm-and-construction",
    category: "Fabric guide",
    title: "Towel GSM, Yarn and Construction Explained",
    headline: "Towels, by GSM\nand loop yarn.",
    intro:
      "What towel GSM means, ring-spun versus zero-twist loops, pile, borders and hems, and how hotels choose a towel for both the guest and the laundry.",
    summary:
      "A terry towel is specified by size, GSM (weight per square metre), cotton and loop yarn, pile height, border, hems, colour and laundering. Light towels (around 300-400 gsm) dry fast; mid weights (400-600 gsm) suit most hotels; heavy towels (600 gsm and above) feel luxurious but dry slowly and cost more to launder. Absorbency is tested, for example by ASTM D4772.",
    readingTime: "6 min read",
    updated,
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "table",
        heading: "Weight bands",
        columns: ["Band", "Approximate GSM", "Character"],
        rows: [
          ["Light", "300-400", "Thin, quick-drying, gym and beach"],
          ["Medium", "400-600", "Most hotels and households"],
          ["Heavy", "600 and above", "Plush, luxury hotels and spas"],
        ],
      },
      {
        type: "table",
        heading: "Loop yarns",
        columns: ["Yarn", "Feel", "Durability"],
        rows: [
          ["Ring-spun", "Smooth, firm", "Good; holds up to heavy laundering"],
          ["Combed", "Soft, less lint", "Good"],
          ["Zero-twist", "Very soft and absorbent", "Less durable in heavy laundering"],
        ],
      },
      {
        type: "prose",
        heading: "What hotels weigh up",
        body: [
          "Every gram of towel is washed, dried and ironed or folded, so a heavier towel costs more each time it goes through the laundry. Hotels choose a weight that feels right to guests and is economical to launder, and whites that survive bleach. Coloured towels need dyes chosen for the laundry's chemicals.",
        ],
      },
      {
        type: "callout",
        heading: "Weigh and test the finished towel",
        body:
          "Measure GSM on the finished, washed towel, not the loom state, and test absorbency and shrinkage after the stated wash. A towel's first wash also removes finishes that slow absorbency.",
      },
    ],
    faqs: [
      { question: "What does towel GSM mean?", answer: "Grams per square metre: the towel's weight for its area. Higher GSM means denser, heavier towelling." },
      { question: "Why are new towels less absorbent?", answer: "Softeners and finishes on new towels slow absorbency. They wash out over the first few washes." },
      { question: "What is a dobby border?", answer: "A flat woven band near the ends of a towel, plain or patterned, which strengthens the end and adds a finished look." },
    ],
    related: [
      { label: "What is GSM in fabric?", href: "/resources/fabric-gsm-guide", description: "How GSM is measured and converted." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Shrinkage and colourfastness tests." },
      { label: "Towels & Bathrobes", href: "/products/towels-bathrobes", description: "Towels and bathrobes for hotels, spas and retail." },
    ],
    seoTitle: "Towel GSM & Construction Explained",
    seoDescription:
      "Towel GSM bands, ring-spun vs zero-twist loops, borders and hems, absorbency testing, and how hotels choose towels for guests and the laundry.",
  },

  /* ================================================================== */
  {
    slug: "padded-jacket-fill-and-quilting",
    category: "Fabric guide",
    title: "Padded and Puffer Jackets: Fill, Fill Power and Quilting",
    headline: "Padded jackets,\nfrom the fill out.",
    intro:
      "Down or synthetic fill, fill power and fill weight, stitch-through or baffle quilting, downproof shells and responsible down sourcing.",
    summary:
      "A padded jacket's warmth comes from its fill: synthetic wadding specified by weight in g/m², or down specified by fill power, down-to-feather ratio and fill weight. Stitch-through quilting is simple but leaves cold seams; baffle construction keeps fill even. Down must be held in by a downproof shell, and can be sourced to a standard such as the Responsible Down Standard.",
    readingTime: "7 min read",
    updated,
    heroAsset: "fabrics.softshell",
    blocks: [
      {
        type: "table",
        heading: "Down or synthetic",
        columns: ["Fill", "Strengths", "Weaknesses"],
        rows: [
          ["Down", "Warmest for its weight, compresses small, lasts", "Loses warmth when wet; needs traceable sourcing and a downproof shell"],
          ["Synthetic wadding", "Keeps some warmth when wet, washes easily, lower cost", "Heavier and bulkier for the same warmth"],
        ],
      },
      {
        type: "list",
        heading: "The numbers on a specification",
        items: [
          { term: "Fill power", detail: "How much volume an ounce of down fills, a guide to its quality. Higher fills more space for the same weight." },
          { term: "Down-to-feather ratio", detail: "For example 90/10: the share of down clusters to feathers." },
          { term: "Fill weight", detail: "Grams of down per garment, or grams per square metre of synthetic wadding." },
          { term: "Channel size", detail: "Width of the quilted channels; narrower channels hold fill more evenly." },
        ],
      },
      {
        type: "prose",
        heading: "Quilting",
        body: [
          "Stitch-through quilting sews the shell to the lining, trapping fill in channels. It is light and simple, but the seams have no fill and let heat out. Baffle construction joins the layers with strips of fabric, so fill continues across the seam. Work jackets often use stitch-through for durability or a quilted lining under a plain shell.",
        ],
      },
      {
        type: "callout",
        heading: "Responsible down",
        body:
          "Down can come from birds that were live-plucked or force-fed. Standards such as the Responsible Down Standard certify animal welfare through the supply chain. If a program requires it, nominate it at the start, because it changes the sourcing.",
      },
    ],
    faqs: [
      { question: "What is a good fill power?", answer: "Higher fill power means more warmth for the weight. Good jackets often use mid to high fill powers; the right value depends on the warmth and price required." },
      { question: "Why does a puffer jacket lose feathers?", answer: "Feathers work through the shell weave or stitch holes. A downproof shell and fine stitching reduce it." },
      { question: "Is synthetic fill better for workwear?", answer: "Often, yes: it keeps some warmth when wet, washes easily and costs less." },
    ],
    related: [
      { label: "Work jacket specification", href: "/resources/work-jacket-specification", description: "Shells, linings and water resistance." },
      { label: "Fabric finishes explained", href: "/resources/fabric-finishes-explained", description: "Water repellency and other finishes." },
      { label: "Puffer & Padded Jackets", href: "/products/padded-jackets", description: "Puffer jackets, padded gilets and parkas." },
    ],
    seoTitle: "Puffer Jacket Fill & Quilting Guide",
    seoDescription:
      "Down vs synthetic fill, fill power, down-to-feather ratio, stitch-through vs baffle quilting, and responsible down for padded and puffer jackets.",
  },

  /* ================================================================== */
  {
    slug: "apparel-certifications-explained",
    category: "Commercial guide",
    title: "Apparel Certifications Explained: OEKO-TEX, GOTS, GRS, WRAP, BSCI and More",
    headline: "Apparel certifications,\nexplained.",
    intro:
      "What the common product, fibre, social and management certifications in apparel actually certify, what they do not, and how to check that a certificate is real and covers your order.",
    summary:
      "Apparel certifications cover different things. OEKO-TEX STANDARD 100 tests products for harmful substances. GOTS certifies organic fibre and processing; GRS certifies recycled content. WRAP certifies a factory's social compliance, while amfori BSCI and SMETA (Sedex) are audits, not certificates. ISO 9001 certifies a quality management system. A certificate covers a named site, scope and period, so check it in the issuer's database against your product and supplier.",
    readingTime: "8 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "What each one covers",
        columns: ["Name", "Covers", "Type"],
        rows: [
          ["OEKO-TEX STANDARD 100", "Product tested for harmful substances, by product class", "Product certificate"],
          ["GOTS", "Organic fibre content and processing through the supply chain", "Supply-chain certificate"],
          ["GRS", "Recycled content, with social and environmental criteria", "Supply-chain certificate"],
          ["Better Cotton", "Cotton grown under a farming standard, mostly traced by mass balance", "Sourcing programme"],
          ["WRAP", "A factory's social and labour compliance", "Factory certificate"],
          ["amfori BSCI", "Social compliance audit against a code of conduct", "Audit, not a certificate"],
          ["SMETA (Sedex)", "Ethical trade audit methodology shared on the Sedex platform", "Audit, not a certificate"],
          ["ISO 9001", "Quality management system", "Management system certificate"],
        ],
      },
      {
        type: "list",
        heading: "How to check a certificate",
        items: [
          { term: "Issuer database", detail: "Look the certificate number up on the issuer's own site; most publish a searchable database." },
          { term: "Site and company", detail: "The certificate names a legal entity and a site. It covers that site, not a group or a partner." },
          { term: "Scope", detail: "Which products and processes are covered. A dyeing unit's certificate does not cover sewing." },
          { term: "Validity", detail: "Issue and expiry dates; many are annual." },
          { term: "Transaction certificates", detail: "For GOTS and GRS, a transaction certificate covers a specific shipment; ask for it per order." },
        ],
      },
      {
        type: "callout",
        heading: "Audits are not certificates",
        body:
          "BSCI and SMETA produce audit reports with ratings or findings, not a pass certificate. Ask for the report, its date and the follow-up on any findings, rather than a logo.",
      },
    ],
    faqs: [
      { question: "What does OEKO-TEX STANDARD 100 mean?", answer: "That the certified product was tested for a list of harmful substances to limits set by product class. It does not certify organic content or working conditions." },
      { question: "What is the difference between GOTS and organic cotton?", answer: "Organic cotton describes how the fibre was grown. GOTS certifies the organic content and the processing through the supply chain, including chemical and social criteria." },
      { question: "Is a BSCI audit a certification?", answer: "No. amfori BSCI is an audit against a code of conduct; it produces a report and rating, not a certificate." },
    ],
    related: [
      { label: "Garment inspection explained", href: "/resources/garment-inspection-explained", description: "What is checked before shipment." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Which test answers which question." },
      { label: "Business verification", href: "/verification", description: "What AHM publishes, and what is available on request." },
    ],
    seoTitle: "Apparel Certifications Explained",
    seoDescription:
      "OEKO-TEX, GOTS, GRS, Better Cotton, WRAP, BSCI, SMETA and ISO 9001 explained: what each certifies, and how to check a certificate is real.",
  },

  /* ================================================================== */
  {
    slug: "garment-care-labels-explained",
    category: "Buyer guide",
    title: "Garment Care and Content Labels: What the Rules Require",
    headline: "Care and content\nlabels, explained.",
    intro:
      "Care symbols, fibre content, country of origin and manufacturer identity: what US, EU and UK rules require on a garment label, and how to get the care instruction right.",
    summary:
      "In the US, the FTC Care Labeling Rule (16 CFR 423) requires a care instruction, and the Textile Fiber Products Identification Act requires fibre content, country of origin and the manufacturer or dealer's identity (often an RN number). ASTM D5489 defines the US care symbols. In the EU, Regulation (EU) No 1007/2011 governs fibre names and composition labelling; care symbols commonly follow ISO 3758 (GINETEX). The care instruction must match how the garment can actually be cleaned, which is confirmed by testing.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "table",
        heading: "What a label must carry, in outline",
        columns: ["Market", "Fibre content", "Care", "Other"],
        rows: [
          ["United States", "Generic fibre names and percentages (TFPIA)", "Care instruction (FTC Care Labeling Rule); symbols per ASTM D5489", "Country of origin, manufacturer identity or RN"],
          ["European Union", "Fibre names and percentages (Regulation 1007/2011), in the language of the market", "Not mandatory EU-wide; ISO 3758 symbols are widely used", "Product safety and traceability information"],
          ["United Kingdom", "Fibre names and percentages under UK textile labelling rules", "ISO 3758 symbols widely used", "Product safety and traceability information"],
        ],
      },
      {
        type: "list",
        heading: "Getting the care instruction right",
        items: [
          { term: "Test the garment", detail: "Wash and dry it to the proposed instruction and measure shrinkage, colour change and appearance." },
          { term: "Use the whole garment", detail: "Trims, prints and linings must survive the same care as the shell fabric." },
          { term: "Be realistic", detail: "Workwear and hospitality garments are laundered hard; label them for what they will receive, if they can take it." },
          { term: "Place labels well", detail: "Permanently attached, legible for the garment's life, and comfortable against the skin." },
        ],
      },
      {
        type: "callout",
        heading: "Check the current rules",
        body:
          "Labelling rules change and vary by country, including language requirements in the EU and bilingual labels in Canada. This guide is an outline; confirm the requirements for each destination market.",
      },
    ],
    faqs: [
      { question: "Are care symbols required in the US?", answer: "A care instruction is required. Symbols defined by ASTM D5489 may be used in place of words." },
      { question: "What is an RN number?", answer: "A registered identification number issued by the US Federal Trade Commission to businesses that make or sell textile products, used on labels instead of the company name." },
      { question: "Does fibre content need percentages?", answer: "Yes, in the US and EU, by generic fibre name and percentage by weight, with rules for small amounts and trims." },
    ],
    related: [
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "How shrinkage is tested and controlled." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "Where labels belong in the tech pack." },
      { label: "Export documents for apparel", href: "/resources/export-documents-for-apparel", description: "Origin and documents that must agree." },
    ],
    seoTitle: "Garment Care Labels Explained",
    seoDescription:
      "Care and content labelling for garments: FTC Care Labeling Rule, TFPIA and RN numbers, ASTM D5489 and ISO 3758 symbols, and EU fibre rules.",
  },

  /* ================================================================== */
  {
    slug: "lab-dips-and-colour-approval",
    category: "Buyer guide",
    title: "Lab Dips and Colour Approval in Apparel Production",
    headline: "Lab dips and\ncolour approval.",
    intro:
      "How a colour goes from a reference to bulk production: the lab dip, the light sources it is judged under, Delta E tolerances, metamerism and shade bands.",
    summary:
      "A lab dip is a small sample of fabric dyed to match the buyer's colour standard. It is judged against the standard under agreed light sources, commonly D65 daylight plus a store light such as TL84 or CWF, by eye and often by spectrophotometer, using a colour difference such as Delta E CMC. Once approved, bulk lots are checked against it, and lots that differ slightly are grouped into shade bands so one garment is not cut from two shades.",
    readingTime: "7 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "list",
        heading: "The approval steps",
        items: [
          { term: "Standard", detail: "A physical colour reference or a colour system reference such as Pantone TCX." },
          { term: "Lab dip", detail: "Usually several options dyed on the production fabric, labelled A, B and C." },
          { term: "Assessment", detail: "Under the agreed light sources, in a light booth, by eye and by instrument." },
          { term: "Approval", detail: "One option approved, or comments for another round." },
          { term: "Bulk", detail: "Production lots compared with the approved dip, and shade-banded." },
        ],
      },
      {
        type: "table",
        heading: "Terms",
        columns: ["Term", "Meaning"],
        rows: [
          ["D65", "A standard daylight light source"],
          ["TL84, CWF", "Store fluorescent light sources used in retail"],
          ["Metamerism", "Two colours that match under one light and not another"],
          ["Delta E (CMC)", "A number for colour difference; tolerances around 1 are common, set by the buyer"],
          ["Shade band", "A group of bulk lots close enough in shade to be used together"],
        ],
      },
      {
        type: "callout",
        heading: "Approve on the production fabric",
        body:
          "Different fabrics take the same dye differently. A lab dip on the wrong fabric, or a colour approved on a screen, does not predict bulk. For programs that mix knits and wovens, approve them side by side.",
      },
    ],
    faqs: [
      { question: "What is a lab dip?", answer: "A small swatch of the production fabric dyed to match a colour standard, sent for approval before bulk dyeing." },
      { question: "What is metamerism?", answer: "When two colours match under one light and look different under another. It is why dips are checked under more than one light source." },
      { question: "What Delta E tolerance should I set?", answer: "Many buyers use around 1 Delta E CMC for solid colours, but the tolerance is a buyer decision and depends on the colour and product." },
    ],
    related: [
      { label: "Polyester dyeing for buyers", href: "/resources/polyester-dyeing-for-buyers", description: "How polyester is dyed and why it matters." },
      { label: "Apparel sampling process", href: "/resources/apparel-sampling-process", description: "Where lab dips sit in development." },
      { label: "Quality", href: "/quality", description: "Where colour is checked in production." },
    ],
    seoTitle: "Lab Dips & Colour Approval Guide",
    seoDescription:
      "How lab dips work in apparel: colour standards, D65 and TL84 light sources, Delta E tolerances, metamerism and shade bands in bulk production.",
  },

  /* ================================================================== */
  {
    slug: "size-grading-explained",
    category: "Buyer guide",
    title: "Size Grading Explained: Base Size, Grade Rules and Size Sets",
    headline: "Size grading,\nexplained.",
    intro:
      "How one approved pattern becomes a full size range: the base size, grade rules and increments, tolerances, and the size set that checks the result.",
    summary:
      "Grading turns a pattern approved in one base size into every other size by moving each point by a set increment, the grade rule. The increments are stated per point of measure in the size chart, with a tolerance. Grading is checked by making a size set (one garment in each size, or the smallest, base and largest) and measuring it before bulk. Extended sizes usually need their own grade, because bodies do not grow in straight lines.",
    readingTime: "6 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "list",
        heading: "The vocabulary",
        items: [
          { term: "Base size", detail: "The size the pattern is developed and fitted in, often a medium." },
          { term: "Point of measure", detail: "A defined measurement such as chest 2.5 cm below the armhole." },
          { term: "Grade rule", detail: "How much each point changes from one size to the next." },
          { term: "Tolerance", detail: "How far a measured garment may differ from the chart." },
          { term: "Size set", detail: "Samples across the range, measured and tried on before bulk." },
        ],
      },
      {
        type: "prose",
        heading: "Why grading goes wrong",
        body: [
          "A grade that works between small and large can fail at the extremes: necks that gape in the largest size, sleeves too long in the smallest. Extended sizes often need larger increments in girth than in length. Grading a women's range from a men's pattern fails for the same reason a women's block exists.",
          "Fixing grading after cutting is expensive, which is why a size set is measured before bulk and the chart is corrected first.",
        ],
      },
      {
        type: "callout",
        heading: "Put the grade in the size chart",
        body:
          "A complete size chart states every point of measure for every size with its tolerance. A chart with only the base size leaves the grade to the factory, and every factory grades differently.",
      },
    ],
    faqs: [
      { question: "What is a size set?", answer: "Samples made in each size, or the smallest, base and largest, measured against the chart and tried on before bulk to check the grading." },
      { question: "What is a grade rule?", answer: "The amount each measurement changes from one size to the next, for example 5 cm on the chest between sizes." },
      { question: "Why do extended sizes need their own grading?", answer: "Bodies do not grow evenly: girth increases faster than length in larger sizes, so a straight grade from a small base fits badly." },
    ],
    related: [
      { label: "Women's uniform fit", href: "/resources/womens-uniform-fit", description: "Why women's ranges need their own block." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete tech pack contains." },
      { label: "Evaluating apparel samples", href: "/resources/evaluating-apparel-samples", description: "How to review fit and size samples." },
    ],
    tools: [{ label: "Size run splitter", href: "/resources/calculators#size-run", description: "Split an order across sizes by ratio." }],
    seoTitle: "Size Grading Explained",
    seoDescription:
      "Apparel size grading explained: base size, grade rules, points of measure, tolerances, size sets, and why extended sizes need their own grade.",
  },

  /* ================================================================== */
  {
    slug: "how-to-import-clothing-from-pakistan",
    category: "Commercial guide",
    title: "How to Import Clothing from Pakistan: A Step-by-Step Guide",
    headline: "Importing clothing\nfrom Pakistan.",
    intro:
      "The steps from first enquiry to goods at your warehouse: specification, supplier checks, samples, contract and payment, production and inspection, shipping terms, documents, and duty at the destination.",
    summary:
      "Importing clothing from Pakistan follows the usual sourcing steps: specify the product, shortlist and verify suppliers, approve samples, agree price, terms and payment, inspect production, and ship, often FOB Karachi or Port Qasim. Duty depends on the destination and the HS code (chapters 61 for knits and 62 for wovens). The EU grants Pakistan GSP+ preferences and the UK includes Pakistan in its Developing Countries Trading Scheme, which can reduce duty where rules of origin are met; check current status and requirements for your shipment.",
    readingTime: "9 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "list",
        heading: "The steps",
        items: [
          { term: "1. Specify", detail: "A tech pack or reference sample, fabric, sizes, decoration, labels, packing, quantity and target date." },
          { term: "2. Shortlist and verify", detail: "Ask for company registration, export history, references and audit reports; visit or commission an inspection agency." },
          { term: "3. Sample", detail: "Proto, fit and pre-production samples, with written comments at each round." },
          { term: "4. Agree terms", detail: "Price basis (FOB, FCA, CIF), payment (deposit and balance by bank transfer, or a letter of credit), and a written purchase order." },
          { term: "5. Produce and inspect", detail: "Approve fabric and trims, then inspect during and after production, often to an AQL." },
          { term: "6. Ship", detail: "Book freight under the agreed Incoterm; FOB ends the seller's responsibility once goods are on board at the port." },
          { term: "7. Clear and pay duty", detail: "Your customs broker files the entry using the HS code and origin documents." },
        ],
      },
      {
        type: "table",
        heading: "Duty preferences, in outline",
        intro: "Preferences change; confirm the current position and the rules of origin before relying on one.",
        columns: ["Destination", "Arrangement", "Note"],
        rows: [
          ["European Union", "GSP+", "Reduced or zero duty on many goods if rules of origin are met; origin is declared through the REX system"],
          ["United Kingdom", "Developing Countries Trading Scheme", "Preferential duty where rules of origin are met"],
          ["United States", "No free trade agreement", "Standard duty rates for the HS code apply"],
        ],
      },
      {
        type: "callout",
        heading: "The HS code decides the duty",
        body:
          "Knitted garments fall in HS chapter 61 and woven garments in chapter 62, and the exact code depends on the fibre, the garment and the gender. Agree the code with your customs broker before costing, because it changes the landed cost.",
      },
    ],
    faqs: [
      { question: "What port is used for clothing exports from Pakistan?", answer: "Karachi and Port Qasim are the main sea ports for apparel exports." },
      { question: "Does clothing from Pakistan pay duty in the EU?", answer: "Pakistan benefits from the EU's GSP+ scheme, which can reduce or remove duty on many goods if rules of origin are met. Confirm current status for your product." },
      { question: "How do I pay a supplier in Pakistan?", answer: "Commonly by bank transfer (a deposit and a balance against documents) or by letter of credit. Agree terms in writing on the purchase order." },
    ],
    related: [
      { label: "FOB vs other Incoterms", href: "/resources/fob-vs-other-incoterms", description: "Who pays and who carries risk." },
      { label: "Export documents for apparel", href: "/resources/export-documents-for-apparel", description: "The documents that must agree." },
      { label: "Sourcing uniforms from Pakistan", href: "/resources/sourcing-uniforms-from-pakistan", description: "Uniform programs in particular." },
    ],
    seoTitle: "How to Import Clothing from Pakistan",
    seoDescription:
      "Step by step: specifying, verifying suppliers, samples, payment, inspection, FOB shipping, HS codes and EU GSP+ and UK DCTS duty preferences.",
  },
];
