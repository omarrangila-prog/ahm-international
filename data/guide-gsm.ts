import type { Guide } from "./guides";

/**
 * The flagship fabric-weight guide.
 *
 * Search Console shows the site already receives impressions for "what is gsm
 * in fabric", "gsm meaning in fabric", "material gsm" and their variants. They
 * are one question, so they are answered by one page rather than by a page per
 * phrasing; data/knowledge.ts maps each phrasing here.
 *
 * Every figure in a worked example is asserted against lib/gsm.ts by
 * tests/knowledge.test.ts. Weight ranges are labelled as common market
 * orientation, never as AHM production specifications.
 *
 * The test methods named below (ISO 3801, ASTM D3776, EN 12127, ISO 139) are
 * real and are named so a buyer can ask for one. Editions are deliberately not
 * quoted: they are revised, and the edition a buyer's own spec cites governs.
 */
export const gsmGuide: Guide = {
  slug: "fabric-gsm-guide",
  category: "Fabric guide",
  title: "What Is GSM in Fabric? A Guide for Apparel Buyers",
  headline: "What is GSM\nin fabric?",
  intro:
    "GSM is the most quoted and least understood number in an apparel specification. What it measures, how it is calculated and tested, how it converts to ounces, and what it does not tell you.",
  summary:
    "GSM means grams per square metre: the mass of one square metre of fabric. A 200 gsm fabric weighs 200 g for every square metre of cloth. It describes weight, not quality, thickness or durability. To read it in the ounces per square yard that US and UK specifications use, divide by 33.906, so 200 gsm is about 5.9 oz/yd².",
  readingTime: "9 min read",
  updated: { label: "October 2026", iso: "2026-10-20" },
  heroAsset: "development.swatches",
  blocks: [
    {
      type: "prose",
      heading: "What GSM means",
      body: [
        "GSM stands for grams per square metre, also written g/m² or simply fabric weight. It is the mass of a fixed area of cloth: if you cut one square metre of a 180 gsm fabric and put it on a scale, it weighs 180 grams. The same number is called areal density in a laboratory, and it is the figure behind phrases like \"material GSM\", \"fabric GSM\" and \"cotton GSM\".",
        "It is a measure of how much fabric there is per unit of area, nothing more. It says nothing about the fibre, the yarn, the way the cloth is knitted or woven, or what finishing it has had. That is why two fabrics can share a GSM and still look, feel and wear completely differently.",
        "GSM is useful for three jobs: comparing like with like, controlling a specification so each production lot matches the approved sample, and working out how heavy a roll or a shipment will be.",
      ],
    },
    {
      type: "formula",
      heading: "How GSM is calculated",
      intro: "GSM is mass divided by area. If you can weigh a piece of fabric and measure it, you can calculate its GSM.",
      formula: "GSM = mass in grams ÷ area in square metres",
      terms: [
        { symbol: "mass", meaning: "Weight of the swatch in grams, on a balance that reads to at least 0.01 g for small swatches." },
        { symbol: "area", meaning: "Area of the swatch in square metres. 1 m² is 10,000 cm², so divide the area in cm² by 10,000." },
      ],
      examples: [
        { label: "Round cutter, 100 cm²", working: "1.85 g ÷ (100 ÷ 10,000) m²", result: "185 gsm" },
        { label: "Hand-cut 15 × 15 cm", working: "4.2 g ÷ (225 ÷ 10,000) m²", result: "186.7 gsm" },
        { label: "Hand-cut swatch, wrong shortcut", working: "4.2 g × 100", result: "420 gsm (wrong)" },
      ],
      limits:
        "\"Multiply the grams by 100\" is correct only for a swatch of exactly 100 cm², which is what a standard round GSM cutter takes. On any other size it gives a wrong answer that still looks plausible, which is the usual way a fabric weight is mis-specified by a factor of two.",
    },
    {
      type: "formula",
      heading: "Converting GSM and oz/yd²",
      intro: "US and UK specifications often give fabric weight in ounces per square yard. Mills in most other countries quote GSM. The conversion is exact, because the ounce and the yard have been fixed by definition since 1959.",
      formula: "oz/yd² = GSM ÷ 33.906      GSM = oz/yd² × 33.906",
      examples: [
        { label: "200 gsm in ounces", working: "200 ÷ 33.906", result: "5.90 oz/yd²" },
        { label: "6 oz/yd² in gsm", working: "6 × 33.906", result: "203.4 gsm" },
        { label: "8 oz/yd² in gsm", working: "8 × 33.906", result: "271.2 gsm" },
        { label: "400 gsm in ounces", working: "400 ÷ 33.906", result: "11.80 oz/yd²" },
      ],
      limits:
        "A specification written as \"7 oz\" and read by a mill as 7 gsm is not a rounding error: it is a fabric roughly one thirty-fourth of the intended weight. Always write the unit.",
    },
    {
      type: "steps",
      heading: "How fabric GSM is tested",
      intro: "Anyone can estimate GSM from a swatch. A test for a specification follows a standard method, so two laboratories get comparable numbers.",
      steps: [
        { title: "Condition the fabric", body: "Fabric takes up and loses moisture, and its weight changes with it. Test methods require the sample to rest in a standard atmosphere first (ISO 139 defines one) so the number does not depend on the day's humidity." },
        { title: "Cut a known area", body: "A round cutter takes exactly 100 cm². Cut away from the selvedge, from creases and from any area that is stretched or distorted." },
        { title: "Take several specimens", body: "Cut from different places across the width and along the length, so the average describes the roll and not one spot." },
        { title: "Weigh each specimen", body: "Use a balance that reads to 0.01 g or better. Record each weight and compute each specimen's GSM." },
        { title: "Average and compare", body: "Report the average, and compare it with the specification and its agreed tolerance." },
      ],
    },
    {
      type: "callout",
      heading: "Which standard to name",
      body:
        "The methods most often named in apparel specifications include ISO 3801 (mass per unit area of woven fabrics), ASTM D3776 (mass per unit area of fabric) and EN 12127 (mass per unit area using small samples). They differ in sample size and conditioning, and results can differ by a few per cent. Name the method and its edition in the specification, and say whether the weight is measured before or after finishing. If your own contract cites a standard, that one governs.",
    },
    {
      type: "prose",
      heading: "GSM is weight, not quality",
      body: [
        "A higher GSM does not make a better fabric. It makes a heavier one, which costs more per metre and adds weight to freight. Whether the extra mass is doing anything useful depends on what the garment has to do.",
        "Does a higher GSM mean a stronger fabric? Not reliably. Strength depends on fibre, yarn quality and construction, and on where a garment is reinforced. A lighter fabric in a tight, well-made construction can outlast a heavier loose one, and a well-reinforced trouser outlasts an unreinforced heavier one.",
        "Does GSM determine thickness? No. A fabric's thickness is measured separately, in millimetres. A fabric with a loose, bulky structure can be thick at a low GSM, and a densely packed one can be thin at the same weight. A brushed or napped finish adds thickness without adding much weight.",
        "Does GSM determine softness or drape? Only indirectly. Heavier fabrics tend to drape differently, but fibre, yarn and finishing change hand feel far more than weight does.",
      ],
    },
    {
      type: "formula",
      heading: "GSM, thickness and density",
      intro: "Weight per area and thickness together give the fabric's bulk density, which shows why GSM alone cannot describe a cloth.",
      formula: "bulk density (g/cm³) = GSM ÷ thickness in mm ÷ 1,000",
      examples: [
        { label: "200 gsm, 0.5 mm thick", working: "200 ÷ 0.5 ÷ 1,000", result: "0.40 g/cm³" },
        { label: "200 gsm, 0.9 mm thick", working: "200 ÷ 0.9 ÷ 1,000", result: "0.22 g/cm³" },
      ],
      limits:
        "Illustrative figures, not measurements of any particular fabric. The point is that the same GSM can describe a compact cloth and a bulky one. Fabric is mostly air, so its bulk density is far lower than the density of the fibre itself.",
    },
    {
      type: "table",
      heading: "What common GSM values usually mean",
      intro:
        "Orientation only. These are how weights are commonly described in the garment trade, not standards and not AHM production specifications. The right weight depends on the construction and on how the garment is worn and washed.",
      columns: ["GSM", "oz/yd²", "Usually described as", "Commonly seen in"],
      rows: [
        ["120", "3.54", "Lightweight", "Shirting, linings, very light tees"],
        ["150", "4.42", "Lightweight", "Light tees, summer jersey"],
        ["180", "5.31", "Light to medium", "Everyday tees, light polos"],
        ["200", "5.90", "Medium", "Heavier tees, pique polos, light twill"],
        ["220", "6.49", "Medium to heavy", "Pique polos, work twill, light aprons"],
        ["250", "7.37", "Heavy", "Twill, canvas, light fleece, French terry"],
        ["300", "8.85", "Heavy", "Fleece sweatshirts, heavy canvas, heavy twill"],
        ["350", "10.32", "Very heavy", "Heavyweight hoodies, heavy canvas"],
        ["400", "11.80", "Very heavy", "Heavyweight fleece, heavy canvas"],
      ],
    },
    {
      type: "table",
      heading: "Typical ranges by garment",
      intro:
        "Common market ranges for scoping a program. They overlap on purpose: construction matters as much as weight. A weight outside the range is not wrong, only unusual for that garment.",
      columns: ["Garment", "Typical range", "What moves it within the range"],
      rows: [
        ["T-shirt (single jersey)", "140-200 gsm", "Heavier for durability and opacity; lighter for heat and drape"],
        ["Polo (pique)", "180-220 gsm", "Heavier for structure and shape retention over long programs"],
        ["Woven shirting (poplin)", "115-150 gsm", "Heavier for opacity and crease recovery"],
        ["Woven shirting (twill / oxford)", "150-220 gsm", "Heavier for utility and abrasion resistance"],
        ["Apron / work twill", "195-280 gsm", "Heavier where soiling and abrasion are severe"],
        ["Work trouser", "200-320 gsm", "Heavier for abrasion; reinforcement often does more than weight"],
        ["Sweatshirt / hoodie (fleece, French terry)", "260-380 gsm", "Heavier for warmth; affects both cost and freight"],
        ["Softshell", "260-340 gsm", "Bonded construction; weight reflects the backing layer"],
      ],
    },
    {
      type: "list",
      heading: "Same GSM, different fibre",
      intro: "Fibre changes how a fabric behaves at any weight. These are general tendencies; the finish and construction can shift every one of them.",
      items: [
        { term: "Cotton", detail: "Absorbs moisture and feels natural against the skin. Tends to shrink and crease more than polyester, and dries more slowly." },
        { term: "Polyester", detail: "Dries quickly, resists creasing and generally holds its size. Absorbs little moisture, so it can feel warmer, and it handles oil-based soiling differently from cotton." },
        { term: "Poly-cotton blend", detail: "Trades the two against each other. Common in uniforms and aprons that are washed often, where shape retention matters as much as comfort. The ratio changes the balance." },
      ],
    },
    {
      type: "list",
      heading: "How to use GSM in a specification",
      items: [
        { term: "Compare within a construction", detail: "Comparing 190 gsm pique with 210 gsm pique is meaningful. Comparing pique with fleece by GSM is not." },
        { term: "Pair it with composition", detail: "GSM plus fibre content plus construction is a usable specification. GSM alone is not." },
        { term: "Agree a tolerance", detail: "Fabric weight varies between production lots. A tolerance of a few per cent is normal. At 5%, a 200 gsm fabric is in specification between 190 and 210 gsm." },
        { term: "State the unit and the method", detail: "Write gsm or oz/yd² explicitly, and name the test method and whether the weight is before or after finishing." },
        { term: "Count the freight", detail: "Weight moves through the whole chain. On 10,000 garments, 30 g of extra fabric per garment is 300 kg of freight." },
        { term: "Expect it to change in the wash", detail: "A fabric that shrinks in the wash loses area but not mass, so its GSM after washing is higher than before. Specify which state the weight refers to." },
      ],
    },
    {
      type: "callout",
      heading: "If you do not know the GSM you need",
      body:
        "Describe the requirement instead: how the garment is worn, how often it is washed, what it has to survive and what it should feel like. A manufacturer can convert that into a weight and a construction, and will usually offer two or three options at different price points. Naming a number you are unsure of is more likely to produce the wrong fabric than saying you are unsure.",
    },
  ],
  faqs: [
    {
      question: "What does GSM mean in fabric?",
      answer:
        "GSM means grams per square metre. It is the weight of one square metre of the fabric, so a 180 gsm fabric weighs 180 g per square metre. It measures weight, not quality, thickness or durability.",
    },
    {
      question: "Is a higher GSM better quality?",
      answer:
        "No. A higher GSM is a heavier fabric, which costs more and ships heavier. Whether it performs better depends on the fibre, the yarn, the construction and where the garment is reinforced.",
    },
    {
      question: "How do I convert GSM to oz/yd²?",
      answer:
        "Divide GSM by 33.906 to get ounces per square yard, so 200 gsm is about 5.9 oz/yd². To go the other way, multiply ounces by 33.906: 6 oz/yd² is about 203 gsm.",
    },
    {
      question: "How can I measure the GSM of a fabric I already have?",
      answer:
        "Cut a swatch of known area, weigh it in grams and divide by its area in square metres. With a 10 × 10 cm swatch (100 cm²) the weight in grams multiplied by 100 is the GSM. On any other size, divide by the real area, as shown in the worked examples above.",
    },
    {
      question: "Does GSM determine how thick a fabric is?",
      answer:
        "No. Thickness is measured separately in millimetres. Two fabrics at the same GSM can be thin and compact or thick and bulky depending on yarn, structure and finishing.",
    },
    {
      question: "What GSM is right for aprons, uniforms, T-shirts or hoodies?",
      answer:
        "Common market ranges are in the table above: roughly 140-200 gsm for T-shirts, 180-220 for pique polos, 195-280 for apron and work twill, and 260-380 for fleece and hoodies. They are orientation for scoping, not rules, and construction and fibre matter as much as weight.",
    },
    {
      question: "Does washing change a fabric's GSM?",
      answer:
        "It can. A fabric that shrinks loses area while keeping its mass, so its GSM goes up. Finishes that wash out can lower it. Say whether a specified weight is before or after washing and finishing.",
    },
  ],
  related: [
    { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "Length vs width, test methods and residual tolerance." },
    { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "How the blend ratio changes uniforms and aprons." },
    { label: "Fabric consumption basics", href: "/resources/fabric-consumption-basics", description: "Why metres per garment are not a weight formula." },
    { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
    { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete apparel specification contains." },
  ],
  tools: [
    { label: "GSM calculator", href: "/materials#gsm-heading", description: "Convert oz/yd² and gsm, weigh a swatch, size a roll." },
    { label: "Shrinkage calculator", href: "/materials#shrinkage-heading", description: "Length and width change from before and after measurements." },
    { label: "Fabric compare", href: "/materials#compare-heading", description: "Put two constructions side by side on the published fields." },
  ],
  seoTitle: "What Is GSM in Fabric? Meaning, Formula",
  seoDescription:
    "GSM means grams per square metre. How fabric GSM is calculated and tested, how to convert GSM to oz/yd², and what GSM does and does not tell you.",
};
