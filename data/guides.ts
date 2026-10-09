import type { ContentBlock } from "./sourcing";
import type { FaqItem } from "@/components/ui/Faq";
import type { AssetKey } from "./assets";

/**
 * BUYER RESOURCE LIBRARY
 * ======================
 *
 * Complete guides, written in full. Not a thin content farm.
 *
 * The content plan called for thirty articles; publishing thirty generated
 * articles at launch would fail the quality gate the same plan sets — original
 * insight, technical specificity, something a competitor does not already say.
 * So this file holds complete guides and an explicit backlog. The backlog
 * is published as a plan, not as pages: `plannedGuides` renders as a visible
 * roadmap and generates no routes, no sitemap entries and nothing indexable.
 *
 * Each guide answers a question a buyer actually asks before an order, and each
 * links to the commercial page it naturally leads to.
 */

export type Guide = {
  slug: string;
  category: "Buyer guide" | "Fabric guide" | "Commercial guide";
  title: string;
  /** H1, split for the masked reveal. */
  headline: string;
  intro: string;
  /** The short answer, placed high — quotable and skimmable. */
  summary: string;
  readingTime: string;
  heroAsset: AssetKey;
  blocks: ContentBlock[];
  faqs: FaqItem[];
  related: { label: string; href: string; description: string }[];
  seoTitle: string;
  seoDescription: string;
};

export const guides: Guide[] = [
  /* ================================================================== */
  {
    slug: "tech-pack-checklist",
    category: "Buyer guide",
    title: "Tech Pack Checklist for Apparel Buyers",
    headline: "The tech pack\nchecklist.",
    intro:
      "What a complete apparel tech pack contains, which gaps cause the most expensive problems, and what to do if you do not have one at all.",
    summary:
      "A complete apparel tech pack contains a technical sketch, a bill of materials, a measurement chart with tolerances, construction notes, a fabric specification, a colour standard, decoration artwork, labelling requirements and a packing instruction. The two omissions that cost the most are missing tolerances and colour named without a reference standard. Both push decisions into production, where they are expensive to fix.",
    readingTime: "6 min read",
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "prose",
        heading: "Why the tech pack decides the price",
        body: [
          "A quotation is a manufacturer's answer to a question. If the question is precise, the answer can be too. If it is vague, the manufacturer prices the worst reasonable interpretation, not out of bad faith, but because they will be held to the number.",
          "That is the entire commercial argument for a good tech pack. Every open question in the document becomes an assumption in the price, and assumptions are always priced conservatively.",
          "It also determines how many sample rounds you pay for. A resolved specification converges in fewer rounds because each sample is closing a written point rather than testing an interpretation.",
        ],
      },
      {
        type: "list",
        heading: "The ten components",
        intro: "In roughly the order a manufacturer reads them.",
        items: [
          { term: "1. Technical sketch", detail: "Front and back flat drawings, plus detail views of any construction that is not obvious from the flat. Proportion matters less than clarity." },
          { term: "2. Bill of materials", detail: "Every fabric, trim, thread, label, hangtag and packaging component, with placement and quantity per garment." },
          { term: "3. Measurement chart", detail: "Points of measure with values by size, and tolerances. See below on why tolerances are not optional." },
          { term: "4. Construction notes", detail: "Seam types, stitch density, closure type and reinforcement, named against specific operations rather than described generally." },
          { term: "5. Fabric specification", detail: "Composition, weight, construction and finish. Or, if you do not know, the requirement the fabric must meet." },
          { term: "6. Colour standard", detail: "A physical swatch or a numeric reference for every colourway. A colour name is not a standard." },
          { term: "7. Decoration artwork", detail: "Vector files with placement, size and colour references for every logo and print." },
          { term: "8. Labelling", detail: "Main, care, size and country-of-origin labels with artwork, wording and placement." },
          { term: "9. Packing instruction", detail: "Fold or hang, polybag specification, ratio or solid pack, carton marking artwork." },
          { term: "10. Grade rules", detail: "How each measurement changes between sizes. Useful if you have them; we can develop them if not." },
        ],
      },
      {
        type: "table",
        heading: "The five gaps that cost the most",
        intro: "Ranked by what they actually cost, not by how often they appear.",
        columns: ["Gap", "What it causes", "Cost to fix later"],
        rows: [
          ["Measurement chart without tolerances", "Inspection has no objective criteria; pass or fail becomes a negotiation after production", "High. Disputes at final inspection"],
          ["Colour named but not referenced", "Lab dip cannot be approved objectively; shade disputes across reorders", "High. Affects every repeat order"],
          ["Fabric named without composition or weight", "Several valid interpretations, all priced differently", "Medium, usually caught at quotation"],
          ["Logo supplied as a raster image", "Cannot be digitised or separated cleanly; extra approval rounds", "Low to medium. Costs time"],
          ["No packing instruction", "Carton sizing changes late, altering your freight cost after price agreement", "Medium. Surfaces after the price is agreed"],
        ],
      },
      {
        type: "prose",
        heading: "Why tolerances matter more than measurements",
        body: [
          "A measurement chart states the target. A tolerance states what is acceptable. Without the second, there is no objective way to decide whether a garment passes, which means the decision gets made during inspection, under time pressure, by two parties with opposing interests.",
          "Tolerances are also a cost lever. A tight tolerance on a measurement that does not affect fit adds inspection time and rejection rate for no benefit. Deciding deliberately where you need precision, and where you do not, is worth doing before production rather than defending afterwards.",
          "If you do not have tolerances, say so. A manufacturer can propose them from the article type, and agreeing them at development takes minutes.",
        ],
      },
      {
        type: "callout",
        heading: "If you have no tech pack",
        body:
          "Send a reference garment instead. A physical sample answers construction questions a written document usually leaves open, and it can be measured directly. A sketch with written notes also works. What matters is that the requirement is clear enough to quote, and where it is not, a good manufacturer asks rather than assumes.",
      },
    ],
    faqs: [
      {
        question: "Do I need CAD software to produce a tech pack?",
        answer:
          "No. Tech packs are commonly produced in Excel, and a clear spreadsheet with a hand sketch and photographs is entirely workable. Precision of information matters more than the tool used to present it.",
      },
      {
        question: "Should I send a tech pack to several manufacturers at once?",
        answer:
          "That is normal practice and worth doing, but send the same document to each. Comparing quotations against different specifications tells you nothing about which supplier is better value.",
      },
      {
        question: "Who owns the tech pack?",
        answer:
          "You do, where the design and specification originate with you. Where a manufacturer develops a pattern from your reference garment for your program, it is developed for that program.",
      },
    ],
    related: [
      { label: "Product development", href: "/development", description: "How a specification becomes an executable manufacturing document." },
      { label: "Send a tech pack", href: "/send-tech-pack", description: "Upload for review and commercial FOB costing." },
      { label: "Sampling process", href: "/manufacturing/sampling", description: "Proto, fit, size set and pre-production samples." },
    ],
    seoTitle: "Tech Pack Checklist for Apparel Buyers",
    seoDescription:
      "What a complete apparel tech pack contains, the five gaps that cost the most, and why tolerances matter more than measurements.",
  },

  /* ================================================================== */
  {
    slug: "how-fob-costing-works",
    category: "Commercial guide",
    title: "How Garment FOB Costing Works",
    headline: "How an FOB\nprice is built.",
    intro:
      "What sits inside a garment FOB quotation, which components actually move the number, and how to have a productive conversation when a quote comes back above target.",
    summary:
      "A garment FOB price is built from fabric and trims, cutting and assembly labour, decoration, finishing and inspection, packing materials, export handling, and the manufacturer's overhead and margin. Fabric is usually the largest single line, and fabric consumption calculated from the actual marker, rather than estimated. Is what makes a quotation hold through to production.",
    readingTime: "7 min read",
    heroAsset: "development.measurement",
    blocks: [
      {
        type: "list",
        heading: "What is inside the number",
        intro: "Roughly in order of magnitude for a typical uniform garment.",
        items: [
          { term: "Fabric", detail: "Consumption multiplied by fabric price. Consumption comes from the marker, and the marker depends on the pattern and the size ratio." },
          { term: "Trims", detail: "Zips, buttons, thread, elastic, labels and hardware. Small individually, significant in aggregate on complex articles." },
          { term: "Cutting and assembly labour", detail: "Driven by operation count. Every pocket, bar tack and topstitch line is an operation." },
          { term: "Decoration", detail: "Stitch count for embroidery, colour count and placement count for print." },
          { term: "Finishing and inspection", detail: "Pressing, trimming, measurement verification and appearance check." },
          { term: "Packing materials", detail: "Polybags, cartons, hangers, hangtags and labelling." },
          { term: "Export handling", detail: "Documentation, inland transport to port, export clearance and loading." },
          { term: "Overhead and margin", detail: "The manufacturer's fixed costs and profit." },
        ],
      },
      {
        type: "prose",
        heading: "Why marker-based consumption matters",
        body: [
          "Fabric consumption is the largest variable in most garment costs, and there are two ways to arrive at it. One is to estimate from the garment's dimensions. The other is to lay the actual pattern pieces into a digitised marker for the real size ratio and measure what the lay consumes.",
          "The difference is not small. An estimate has to include a safety margin, because underestimating consumption means quoting below cost. A marker-based figure does not need that margin, and it does not move between quotation and production.",
          "When you compare quotations, it is worth asking which method produced the number. A quotation that changes after the order is placed usually started as an estimate.",
        ],
      },
      {
        type: "table",
        heading: "What moves an FOB price, and by how much",
        intro:
          "Directional guidance for scoping. The actual effect depends on the article. These are the levers worth discussing, not a price list.",
        columns: ["Lever", "Effect", "Worth discussing when"],
        rows: [
          ["Fabric composition and weight", "Large", "The quote is above target. An alternative construction often closes the gap invisibly"],
          ["Operation count", "Large", "The article has many pockets, panels or reinforcement points"],
          ["Colour count", "Medium to large", "Smaller dye lots raise fabric cost and can raise minimum quantity"],
          ["Quantity", "Medium", "Setup amortises across the run; the effect is biggest at low volumes"],
          ["Decoration", "Medium", "High stitch counts or many print colours"],
          ["Packing format", "Small to medium", "Hanging or retailer-specific packing; also changes your freight"],
          ["Size range", "Small", "Very extended ranges affect consumption and marker efficiency"],
        ],
      },
      {
        type: "steps",
        heading: "When a quote comes back above target",
        intro: "The productive sequence, rather than simply asking for a discount.",
        steps: [
          { title: "Share the target", body: "A manufacturer cannot cost-engineer toward a number they do not know. A target is information, not a weakness." },
          { title: "Ask what is driving the cost", body: "A supplier who can break the price into fabric, labour, trims and decoration is someone you can work with on it." },
          { title: "Look at fabric first", body: "It is usually the largest line, and an alternative construction at a similar hand feel often closes most of a gap." },
          { title: "Then look at operations", body: "Reinforcement and pocket configuration can often be simplified without affecting how the garment performs in service." },
          { title: "Re-check the quantity", body: "If the target assumed a larger run than you quoted, say so. Setup amortisation is real." },
          { title: "Decide what not to change", body: "Some cost is buying durability. Cutting it moves the cost to replacement frequency rather than removing it." },
        ],
      },
      {
        type: "callout",
        heading: "On sharing your target price",
        body:
          "Buyers often withhold a target for fear it becomes the price. The trade-off runs the other way in practice: without a target, a manufacturer quotes the specification exactly as written, even when a change they could have suggested would have met your number. The target tells them which options are worth presenting.",
      },
    ],
    faqs: [
      {
        question: "Does an FOB price include shipping to my country?",
        answer:
          "No. FOB covers everything up to and including loading on board at the named port. Ocean freight, insurance, import clearance and duty are arranged and paid by the buyer.",
      },
      {
        question: "Why do quotations from different factories vary so much?",
        answer:
          "Most often because they are answering different questions. Differences in assumed fabric quality, stitch density, trim grade and inspection standard produce very different numbers from the same sketch. Comparing on price alone without comparing the assumptions behind it is how a cheap quotation becomes an expensive order.",
      },
      {
        question: "Should the cheapest quotation win?",
        answer:
          "Only if it is answering the same question as the others. A quotation notably below the rest usually reflects a different assumption somewhere. Worth finding out where before treating it as a saving.",
      },
    ],
    related: [
      { label: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", description: "What FOB covers, and how it compares with EXW and CIF." },
      { label: "Fabric consumption basics", href: "/resources/fabric-consumption-basics", description: "Why fabric metres come from the marker, not GSM." },
      { label: "Request an FOB quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and applications." },
    ],
    seoTitle: "How Garment FOB Costing Works",
    seoDescription:
      "What sits inside a garment FOB price, which levers move it, and what to do when a quotation comes back above target.",
  },

  /* ================================================================== */
  {
    slug: "poly-cotton-for-workwear",
    category: "Fabric guide",
    title: "65/35 Poly-Cotton for Workwear",
    headline: "Why 65/35\nis the default.",
    intro:
      "The blend ratio that dominates uniform and workwear, what each fibre contributes, and when a different ratio is the better answer.",
    summary:
      "65/35 poly-cotton means 65% polyester and 35% cotton. The polyester carries tensile strength, shrinkage control, colour retention and fast drying; the cotton carries breathability, comfort against the skin and the ability to take certain finishes. The ratio is the common default in workwear because it holds up to repeated industrial laundering while remaining wearable for a full shift.",
    readingTime: "6 min read",
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "table",
        heading: "What each fibre contributes",
        columns: ["Property", "Polyester", "Cotton"],
        rows: [
          ["Tensile and abrasion strength", "High", "Moderate"],
          ["Shrinkage after washing", "Low", "Higher, needs control"],
          ["Colour retention", "Good. Dyes are locked into the fibre", "Fades sooner, especially at high temperatures"],
          ["Breathability", "Lower", "Higher"],
          ["Moisture absorption", "Low. Dries fast, can feel clammy", "High. Absorbs, dries slowly"],
          ["Comfort against skin", "Lower", "Higher"],
          ["Stain release finish uptake", "Good", "Good"],
          ["Cost stability", "Tied to petrochemical prices", "Tied to agricultural cycles"],
        ],
      },
      {
        type: "prose",
        heading: "Why 65/35 rather than 50/50 or 80/20",
        body: [
          "The ratio is a trade between durability and comfort, and 65/35 sits at the point where most uniform programs get enough of both. Above roughly 65% polyester, wash durability improves only marginally while breathability and hand feel decline noticeably. Below it, shrinkage control and colour retention start to become program problems.",
          "It is not a rule. An 80/20 blend makes sense where laundering is aggressive and the garment is worn over another layer. An outer work shirt in an industrial laundry cycle, for instance. A cotton-rich blend makes sense where the garment sits against the skin in heat, and where the program accepts shorter service life in exchange.",
          "The deciding question is usually not comfort versus durability in the abstract, but how the garment is washed. Industrial laundering at high temperature with strong chemistry is the single factor that pushes a specification toward polyester.",
        ],
      },
      {
        type: "list",
        heading: "Where 65/35 is typically specified",
        items: [
          { term: "Bib and waist aprons", detail: "High soiling and frequent washing. The blend takes a stain-release finish and holds colour through the cycle." },
          { term: "Work shirting", detail: "Twill or poplin construction, where crease recovery and colour retention both matter." },
          { term: "Work trousers", detail: "Usually at a heavier weight, often with reinforcement rather than a heavier blend." },
          { term: "Chef wear", detail: "Where whiteness retention through industrial laundering is the defining requirement." },
        ],
      },
      {
        type: "prose",
        heading: "Weight, and why heavier is not automatically better",
        body: [
          "Poly-cotton workwear is commonly specified between roughly 195 and 280 gsm. It is tempting to treat the top of that range as the safe choice, but weight carries three costs: fabric price, reduced breathability, and freight. A heavier garment is a heavier carton.",
          "Durability in service usually depends more on reinforcement placement than on overall weight. Bar tacks at pocket mouths and strap attachments, and a gusset where the work involves kneeling or climbing, extend service life more effectively than adding thirty grams across the whole garment.",
          "The useful approach is to specify weight for the wear environment and spend the remaining budget on reinforcement where the garment actually fails.",
        ],
      },
      {
        type: "callout",
        heading: "On stain-release finishes",
        body:
          "A stain-release finish is applied to the fabric and reduces how readily soil bonds to the fibre, so more of it lifts in washing. It is a fabric property rather than a construction one, and its durability across wash cycles varies by finish. Where a program depends on it, confirm it by testing against your actual laundering method rather than treating it as permanent.",
      },
    ],
    faqs: [
      {
        question: "Is 65/35 the same as TC or CVC?",
        answer:
          "TC (Tetron Cotton) generally describes polyester-dominant blends such as 65/35, so the terms overlap. CVC (Chief Value Cotton) means the blend is cotton-dominant, typically 60/40 cotton to polyester. If a specification says CVC, expect a softer, more breathable and less wash-stable fabric than 65/35.",
      },
      {
        question: "Will a 65/35 garment shrink?",
        answer:
          "Less than cotton, but not zero. The cotton component still moves, and shrinkage behaviour should be confirmed against the program's actual wash method during development, particularly where industrial laundering is involved.",
      },
      {
        question: "Does polyester content affect how a logo is applied?",
        answer:
          "Yes. Polyester-rich fabrics can cause dye migration into a print if the wrong ink system is used, which shows up as discolouration weeks later. This is why a strike-off should be produced on the bulk fabric rather than on a similar swatch.",
      },
    ],
    related: [
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
      { label: "Polyester dyeing for buyers", href: "/resources/polyester-dyeing-for-buyers", description: "Why polyester-rich shades need lab dips and heat discipline." },
      { label: "Apron manufacturing", href: "/products/aprons", description: "The category where 65/35 is most commonly specified." },
      { label: "Fabric sourcing", href: "/manufacturing/fabric-sourcing", description: "Lab dips, shade control and incoming inspection." },
    ],
    seoTitle: "65/35 Poly-Cotton for Workwear",
    seoDescription:
      "What each fibre contributes, when a different ratio is better, and why heavier fabric is not automatically more durable.",
  },

  /* ================================================================== */
  {
    slug: "pique-vs-jersey-polo-fabric",
    category: "Fabric guide",
    title: "Pique vs Jersey for Polo Shirts",
    headline: "Pique or jersey\nfor your polo.",
    intro:
      "Two knit structures, two very different program outcomes. How they differ, how each behaves after fifty washes, and which one your program should specify.",
    summary:
      "Pique is a textured knit with a raised waffle structure that holds shape, hides light soiling and resists showing creases, which is why most uniform polos use it. Jersey is a flat, smooth knit that feels softer and drapes better but shows wear, creasing and soiling sooner. For a laundered uniform program, pique is usually the correct default; jersey suits shorter-life event and promotional apparel.",
    readingTime: "5 min read",
    heroAsset: "fabrics.cottonPique",
    blocks: [
      {
        type: "table",
        heading: "Side by side",
        columns: ["", "Pique", "Jersey"],
        rows: [
          ["Structure", "Textured, raised waffle or honeycomb", "Flat, smooth single knit"],
          ["Hand feel", "Drier, more structured", "Softer, smoother, more fluid"],
          ["Shape retention", "Better. The structure resists deformation", "Lower. Relaxes and drapes"],
          ["Hides light soiling", "Better. Texture breaks up the surface", "Poorer. Shows marks readily"],
          ["Shows creasing", "Less", "More"],
          ["Breathability", "Better: the structure creates air channels", "Lower at the same weight"],
          ["Typical weight", "180-220 gsm", "140-200 gsm"],
          ["Best suited to", "Uniform programs, daily wear, high wash frequency", "Event apparel, promotional runs, fashion-led products"],
        ],
      },
      {
        type: "prose",
        heading: "What actually happens after fifty washes",
        body: [
          "This is the difference that decides a program, and it does not show in a sample. A pique polo's texture continues to break up the surface as the fabric ages, so light pilling and surface wear are far less visible. A jersey polo of the same fibre and weight looks tired sooner, because there is nothing on the surface to disguise it.",
          "Collar behaviour follows the same pattern, though it is a separate decision. Collar recovery depends on the rib construction and finishing rather than on the body fabric. A well-made pique polo with a poor collar still fails; the collar has to be specified and approved on its own terms.",
          "Where a program is industrially laundered, both structures should be tested against that cycle rather than a domestic one. Industrial laundering is considerably more aggressive, and it is the environment the garment actually lives in.",
        ],
      },
      {
        type: "list",
        heading: "Choosing between them",
        intro: "The questions worth answering before specifying.",
        items: [
          { term: "How often is it washed?", detail: "Weekly or more, industrially: pique. Occasional and domestic: either works." },
          { term: "How long must it last?", detail: "A year or more in service: pique. A season or an event: jersey is fine and cheaper." },
          { term: "Is it customer-facing?", detail: "Where presentation matters through a full shift, pique holds up visibly better." },
          { term: "Is comfort the priority?", detail: "Jersey feels better against the skin, which matters for long shifts in heat." },
          { term: "What is the brand look?", detail: "Jersey reads more casual and contemporary; pique reads more traditional and corporate." },
        ],
      },
      {
        type: "callout",
        heading: "A common middle path",
        body:
          "Some programs specify pique for the customer-facing polo and jersey for a lower-cost T-shirt worn in back-of-house roles. Developing both from the same colour standard keeps the program consistent while putting the more durable structure where it is actually needed.",
      },
    ],
    faqs: [
      {
        question: "Is polyester pique different from cotton pique?",
        answer:
          "The structure is the same; the fibre changes the behaviour. Polyester pique dries faster, holds colour longer and resists shrinkage, but breathes less and can feel less pleasant in heat. Poly-cotton pique is the common compromise in uniform programs.",
      },
      {
        question: "Why do some polos lose their collar shape so quickly?",
        answer:
          "Collar recovery is a function of the rib construction, the yarn and the finishing, not of the body fabric or the stitching. It is a separate specification decision, and worth approving as its own item during sampling rather than assuming it follows the body fabric.",
      },
      {
        question: "Which is more expensive?",
        answer:
          "Pique is typically a little more expensive at the same fibre and weight, because the knit structure is more complex. Over the life of a uniform program the difference is usually outweighed by replacement frequency.",
      },
    ],
    related: [
      { label: "Knit constructions explained", href: "/resources/knit-constructions-explained", description: "Jersey, pique, rib and fleece at buyer level." },
      { label: "Polo and T-shirt manufacturing", href: "/products/polos-tshirts", description: "Classic and performance polos, uniform tees." },
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and applications." },
      { label: "Retail uniform programs", href: "/industries/retail", description: "Brand-accurate colour and decoration across a store estate." },
    ],
    seoTitle: "Pique vs Jersey for Polo Shirts",
    seoDescription:
      "How pique and jersey differ for uniform polos: structure, shape retention, and what happens after fifty industrial washes.",
  },

  /* ================================================================== */
  {
    slug: "fabric-gsm-guide",
    category: "Fabric guide",
    title: "Fabric GSM Guide for Apparel Buyers",
    headline: "What GSM\nreally tells you.",
    intro:
      "GSM is the most quoted and least understood number in an apparel specification. What it measures, what it does not, and typical ranges by product category.",
    summary:
      "GSM means grams per square metre. The weight of a fabric, not its quality, durability or density. Two fabrics at the same GSM can behave completely differently depending on fibre, yarn and construction. GSM is useful for comparing like with like within one construction family, and misleading when used to compare across them.",
    readingTime: "5 min read",
    heroAsset: "development.swatches",
    blocks: [
      {
        type: "prose",
        heading: "What GSM does not tell you",
        body: [
          "GSM measures mass per unit area. That is all. It says nothing about fibre content, yarn quality, knit or weave structure, finish, or how the fabric will behave after washing.",
          "The practical consequence: a 200 gsm cotton jersey and a 200 gsm poly-cotton pique are the same weight and almost nothing else. One is soft and drapes; the other is structured and holds shape. Both are correct for different programs, and GSM alone will not tell you which.",
          "Buyers sometimes use a higher GSM as a proxy for higher quality. It is not one. A heavier fabric costs more, ships heavier and can be less comfortable. None of which are quality improvements if the weight is not doing something useful.",
        ],
      },
      {
        type: "table",
        heading: "Typical ranges by category",
        intro:
          "Orientation for scoping a program. These are common market ranges, not a stock list. The correct weight for your program depends on how the garment is worn and washed.",
        columns: ["Product", "Typical range", "What moves it within the range"],
        rows: [
          ["T-shirt (single jersey)", "140-200 gsm", "Heavier for durability and opacity; lighter for heat and drape"],
          ["Polo (pique)", "180-220 gsm", "Heavier for structure and shape retention over long programs"],
          ["Woven shirting (poplin)", "115-150 gsm", "Heavier for opacity and crease recovery"],
          ["Woven shirting (twill / oxford)", "150-220 gsm", "Heavier for utility and abrasion resistance"],
          ["Apron / work twill", "195-280 gsm", "Heavier where soiling and abrasion are severe"],
          ["Work trouser", "200-320 gsm", "Heavier for abrasion; reinforcement often better than weight"],
          ["Sweatshirt / fleece", "260-380 gsm", "Heavier for warmth; affects both cost and freight"],
          ["Softshell", "260-340 gsm", "Bonded construction; weight reflects the backing layer"],
        ],
      },
      {
        type: "list",
        heading: "How to use GSM well",
        items: [
          { term: "Compare within a construction", detail: "Comparing 190 gsm pique with 210 gsm pique is meaningful. Comparing pique with fleece by GSM is not." },
          { term: "Pair it with composition", detail: "GSM plus fibre content plus construction is a usable specification. GSM alone is not." },
          { term: "Specify a tolerance", detail: "Fabric weight varies in production. A tolerance of a few per cent is normal and should be agreed rather than disputed." },
          { term: "Remember freight", detail: "Weight moves through the whole chain. On a large program, thirty grams per garment is a measurable freight line." },
          { term: "Check it against the wash", detail: "Some fabrics gain apparent weight through finishing that washes out. Confirm weight after the finishing process, not before." },
        ],
      },
      {
        type: "callout",
        heading: "If you do not know the GSM you need",
        body:
          "Describe the requirement instead: how the garment is worn, how often it is washed, what it has to survive, and what it should feel like. A manufacturer can convert that into a weight and construction, and will usually offer two or three options at different price points. Specifying a number you are unsure of is more likely to produce the wrong fabric than saying you are unsure.",
      },
    ],
    faqs: [
      {
        question: "Is GSM the same as oz/yd²?",
        answer:
          "They measure the same thing in different units. One ounce per square yard is roughly 33.9 grams per square metre, so a 6 oz fabric is about 203 gsm. American specifications often use ounces; most of the rest of the world uses GSM.",
      },
      {
        question: "Does higher GSM mean the garment lasts longer?",
        answer:
          "Not reliably. Fibre quality, yarn construction and reinforcement placement affect service life more than weight does. A well-reinforced 220 gsm trouser will usually outlast an unreinforced 280 gsm one.",
      },
      {
        question: "Can you match a fabric weight exactly?",
        answer:
          "Within a normal production tolerance, yes. Fabric weight varies slightly between production lots, which is why a tolerance is agreed as part of the specification rather than treated as a fixed number.",
      },
    ],
    related: [
      { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
      { label: "Fabric shrinkage guide", href: "/resources/fabric-shrinkage-guide", description: "Length vs width, test methods and residual tolerance." },
      { label: "Fabric consumption basics", href: "/resources/fabric-consumption-basics", description: "Why metres per garment are not a weight formula." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete apparel specification contains." },
    ],
    seoTitle: "Fabric GSM Guide for Apparel Buyers",
    seoDescription:
      "What GSM measures and what it does not, typical weight ranges by category, and how to use fabric weight in a specification.",
  },

  /* ================================================================== */
  {
    slug: "apparel-sampling-process",
    category: "Buyer guide",
    title: "The Apparel Sampling Process Explained",
    headline: "What each sample\nis actually for.",
    intro:
      "Development, fit, pre-production and sealed samples answer different questions. Confusing them is the most common reason a program arrives late.",
    summary:
      "An apparel program normally runs through four sample types. The development sample proves the style can be made. The fit sample proves the pattern. The pre-production sample proves the bulk materials and the actual production line. The sealed sample is the signed reference the bulk is judged against. Each answers a question the previous one could not, which is why skipping a stage does not save time — it moves the discovery later, where correction costs more.",
    readingTime: "7 min read",
    heroAsset: "development.measurement",
    blocks: [
      {
        type: "prose",
        heading: "Why there is more than one sample",
        body: [
          "A common buyer instinct is to treat sampling as repetition: the factory keeps making the garment until it is right. That reading makes every round feel like a failure, and it makes cutting rounds look like an obvious saving.",
          "It is not repetition. Each sample type isolates a different variable, and it does so deliberately, because testing several variables at once makes a failure impossible to attribute. If a first sample is made on bulk fabric with final trims and it comes back wrong, nobody can say whether the pattern, the fabric or the construction caused it.",
          "The sequence exists so that by the time an expensive input is committed, the cheap questions have already been closed.",
        ],
      },
      {
        type: "steps",
        heading: "The four stages",
        intro: "Each stage closes a question and opens the next.",
        steps: [
          {
            title: "Development sample",
            body: "Proves the style can be made as drawn. Often in substitute fabric of a similar weight and construction, because the question is whether the construction works, not whether the material is final. A development sample in the wrong colour is not a defect.",
          },
          {
            title: "Fit sample",
            body: "Proves the pattern against your measurement specification. Reviewed on a form or a fit model, measured at every specified point, and returned with a variance report. This is where most revision rounds happen, and it is the cheapest place for them to happen.",
          },
          {
            title: "Pre-production sample",
            body: "Proves the bulk materials and the actual line. Made on the fabric and trims that will be used, by the operators who will make the order. A PP sample is the last point at which a change is inexpensive.",
          },
          {
            title: "Sealed sample",
            body: "The approved reference, signed by both sides and retained. Every inspection during production is judged against it. Once it is sealed, the specification is closed.",
          },
        ],
      },
      {
        type: "table",
        heading: "What each sample proves",
        intro: "The middle column is the one buyers most often assume is covered earlier than it is.",
        columns: ["Sample", "Proves", "Does not prove"],
        rows: [
          ["Development", "The construction is buildable", "Fit, final colour, bulk behaviour"],
          ["Fit", "The pattern matches your spec", "How bulk fabric will behave"],
          ["Pre-production", "Bulk materials and the line", "Nothing further — this is the last gate"],
          ["Sealed", "The agreed standard for inspection", "It is a reference, not a test"],
        ],
      },
      {
        type: "prose",
        heading: "How to reduce the number of rounds",
        body: [
          "Sample rounds are driven by unresolved decisions, not by factory speed. A program with tolerances, a colour standard and consolidated comments converges in fewer rounds than one without, because each sample closes a written point rather than testing an interpretation.",
          "The single most effective change is consolidating comments. Where feedback arrives from three people over a week, the factory either waits — losing days — or starts on the first set and reworks when the rest arrive. One consolidated list, sent once, removes both failure modes.",
          "The second is separating fit comments from styling comments. A fit comment changes the pattern; a styling comment changes the design. Mixed together, they usually produce a sample that resolves neither.",
        ],
      },
      {
        type: "callout",
        heading: "Skipping the PP sample",
        body:
          "It is the stage most often cut for time, and the one where cutting costs the most. Its whole purpose is to prove the bulk fabric and the actual line, so skipping it means the first time anyone sees the real materials made by the real operators is when the order is already cut. A fault found there is measured in thousands of pieces.",
      },
    ],
    faqs: [
      {
        question: "How many sample rounds are normal?",
        answer:
          "It depends far more on how resolved the specification is than on the factory. A complete tech pack with tolerances and a colour standard commonly converges in two to three rounds. A verbal brief with a reference photo can take five or more, because each round is discovering a decision rather than confirming one.",
      },
      {
        question: "Can we go straight to a pre-production sample?",
        answer:
          "It is possible where a proven pattern already exists — a repeat style, or a garment being reproduced from an approved reference. For a new development it removes the cheap stages and leaves only the expensive one, so a fault surfaces after bulk fabric is committed.",
      },
      {
        question: "Who pays for sampling?",
        answer:
          "Sampling terms are agreed commercially before development starts, and they vary with the number of styles, the complexity and the program size. AHM confirms them in writing at the requirement stage rather than leaving them to be discovered on an invoice.",
      },
      {
        question: "What is a sealed sample used for after approval?",
        answer:
          "It is retained and referenced at every inspection gate through production. When a final inspection asks whether a garment is correct, the sealed sample is the thing it is compared against — which is why both sides sign it and both sides keep one.",
      },
    ],
    related: [
      { label: "Product development", href: "/development", description: "How a brief becomes an approved sealed sample." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What to include so sampling converges faster." },
      { label: "Quality", href: "/quality", description: "The gates a program passes after the sample is sealed." },
      { label: "Glossary", href: "/resources/glossary", description: "PP sample, sealed sample, fit sample and the rest, defined." },
    ],
    seoTitle: "Apparel Sampling Explained",
    seoDescription:
      "Development, fit, pre-production and sealed samples: what each one proves, what it does not, and how to reduce the number of rounds.",
  },

  /* ================================================================== */
  {
    slug: "embroidery-vs-screen-printing",
    category: "Buyer guide",
    title: "Embroidery vs Screen Printing",
    headline: "Embroidery\nor print.",
    intro:
      "How the two decoration routes actually differ on cost, durability, fabric compatibility and minimum quantity — and which one a uniform program usually wants.",
    summary:
      "Embroidery is priced by stitch count and is largely indifferent to the number of colours; screen printing is priced by colour count and is largely indifferent to design size. Embroidery survives industrial laundering better and reads as more formal, which is why uniform programs default to it for logos. Screen printing is cheaper at large sizes and high volumes, and is the only sensible route for a full-front graphic. Fabric matters: fine knits distort under dense embroidery, and heavy texture defeats fine print detail.",
    readingTime: "6 min read",
    heroAsset: "photo.poloNavyEmbroidered",
    blocks: [
      {
        type: "prose",
        heading: "The two cost models are not comparable",
        body: [
          "Embroidery is priced by stitch count. A logo with eight colours costs essentially the same as the same logo in two, because the machine changes thread without changing setup. What drives the price is how many stitches fill the design, which is a function of area and density.",
          "Screen printing is priced by colour. Each colour is a separate screen, a separate setup and a separate pass. A one-colour print is cheap at any size; a six-colour print carries six setups whether the design is a chest logo or a full back.",
          "This is why a straight per-piece comparison misleads. The two methods respond to different properties of the artwork, so the cheaper route changes with the design rather than being fixed.",
        ],
      },
      {
        type: "table",
        heading: "Where each route wins",
        columns: ["Consideration", "Embroidery", "Screen print"],
        rows: [
          ["Priced by", "Stitch count", "Number of colours"],
          ["Small logo, few colours", "Competitive", "Competitive"],
          ["Small logo, many colours", "Strong", "Weak — a setup per colour"],
          ["Large graphic", "Weak — stitch count escalates", "Strong"],
          ["Industrial laundering", "Excellent", "Good, degrades over time"],
          ["Fine detail and small text", "Limited by stitch resolution", "Holds detail better"],
          ["Perceived formality", "Higher", "Lower"],
          ["Setup at low volume", "Digitising, one-off", "Screen per colour, one-off"],
        ],
      },
      {
        type: "list",
        heading: "Fabric decides more than buyers expect",
        intro: "The same artwork behaves differently on different constructions.",
        items: [
          { term: "Pique and interlock", detail: "Take embroidery well. Stable enough to hold a dense logo without distorting, which is why uniform polos are almost always embroidered." },
          { term: "Single jersey", detail: "Light and mobile. Dense embroidery puckers it unless backed properly. Prints sit well." },
          { term: "Fleece and French terry", detail: "Embroidery reads well on the flat face. A napped surface fights fine print detail." },
          { term: "Canvas and heavy twill", detail: "Take both. Heavier weights carry dense embroidery without support problems." },
          { term: "Performance polyester", detail: "Print chemistry has to be selected for the fibre, and dye migration is a real risk on dyed polyester — it is tested, not assumed." },
          { term: "Ripstop and technical woven", detail: "Needle penetration compromises some technical constructions. Placement is a functional decision, not only a visual one." },
        ],
      },
      {
        type: "prose",
        heading: "Durability through an industrial wash",
        body: [
          "For a uniform program, the relevant test is not how the decoration looks on delivery but how it looks after a hundred industrial launderings at temperature.",
          "Embroidery is thread stitched into fabric. It fades in the way the thread fades, and it fails by abrasion at the edges over a long period. A well-executed logo generally outlasts the garment.",
          "Screen print is a layer bonded to the surface. Good ink, correctly cured, lasts a long time; poor curing is the usual cause of early cracking, and it is invisible on delivery. This is the practical argument for approving a strike-off on the actual fabric rather than on paper.",
        ],
      },
      {
        type: "callout",
        heading: "Approve on the real fabric",
        body:
          "A strike-off for print and a sew-out for embroidery are made on the actual production fabric, and both should be approved before bulk decoration. Artwork approved on screen has not been tested against the surface it will sit on, and the surface is what determines whether fine detail survives.",
      },
    ],
    faqs: [
      {
        question: "Which is better for a uniform logo?",
        answer:
          "Embroidery, in most cases. It survives industrial laundering, reads as more formal, and is largely indifferent to the number of colours in a logo. Print becomes the better answer when the design is large, highly detailed, or needs photographic reproduction.",
      },
      {
        question: "Can both be used on the same garment?",
        answer:
          "Yes, and it is common — an embroidered chest logo with a printed back graphic, for example. Each carries its own setup, so it is priced as two decoration routes rather than one.",
      },
      {
        question: "What artwork do you need?",
        answer:
          "Vector artwork for both, with placement, dimensions and colour references. Embroidery additionally needs digitising, which converts the artwork into a stitch file — that file is what gets approved, because it is what the machine actually runs.",
      },
      {
        question: "Does embroidery work on lightweight knits?",
        answer:
          "It can, with appropriate backing, but density has to be controlled. A dense logo on light single jersey will pucker regardless of backing, so on light knits the design is usually simplified rather than reproduced at full density.",
      },
    ],
    related: [
      { label: "Heat transfer vs screen print", href: "/resources/heat-transfer-vs-screen-print", description: "When film beats mesh — and when polyester fights back." },
      { label: "Polos and t-shirts", href: "/products/polos-tshirts", description: "The category where decoration route matters most." },
      { label: "Materials", href: "/materials", description: "How construction affects which route is viable." },
      { label: "Benchmark a style", href: "/benchmark-a-style", description: "Send a logo and a garment for a route recommendation." },
    ],
    seoTitle: "Embroidery vs Screen Printing",
    seoDescription:
      "How embroidery and screen printing differ on cost model, durability, fabric compatibility and detail — and which suits a uniform program.",
  },

  /* ================================================================== */
  {
    slug: "compare-apparel-quotations",
    category: "Commercial guide",
    title: "How to Compare Apparel Factory Quotations",
    headline: "Comparing\nquotations.",
    intro:
      "Two FOB prices for the same garment are rarely comparable. What to normalise before you compare, and which differences are real savings rather than removed scope.",
    summary:
      "Before comparing apparel quotations, normalise five things: the trade term, the fabric specification, the decoration route, the packing instruction and the quantity the price assumes. A lower FOB figure frequently reflects a lighter fabric, a cheaper trim, a different pack or a higher quantity assumption rather than a more efficient factory. The most useful question to ask any supplier is what their price assumes, because an assumption you did not know about is where the difference usually lives.",
    readingTime: "7 min read",
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "prose",
        heading: "A price is an answer to a question",
        body: [
          "Quotations diverge for two reasons: the factories are genuinely different, or they answered different questions. The second is far more common, and it is invisible on a spreadsheet that shows only a number per piece.",
          "This matters because the divergence is usually not deception. A factory quoting against a vague brief has to choose an interpretation, and different factories choose differently. One assumes 180 gsm, another 200. One assumes a two-colour print, another embroidery. Both answered honestly; they answered different questions.",
          "Normalising the question is therefore the whole task. Once every quotation answers the same specification, the remaining spread is real information.",
        ],
      },
      {
        type: "list",
        heading: "The five things to normalise first",
        intro: "In rough order of how much distortion each one causes.",
        items: [
          { term: "Trade term", detail: "FOB and CIF are not comparable. A CIF figure contains freight and insurance to your port; an FOB figure stops at the loading port. Confirm which, and which port." },
          { term: "Fabric specification", detail: "Composition, weight and construction. A 20 gsm difference is invisible in a quotation and obvious in the hand. Where a supplier quotes a range, they are quoting the cheap end." },
          { term: "Decoration route", detail: "Embroidery and print price on different models. A quotation that says 'logo included' without naming the route has not been priced against your artwork." },
          { term: "Packing instruction", detail: "Solid pack and ratio pack cost differently. So do folded and hanging, and so does individual polybagging. This is frequently where a quiet saving is hidden." },
          { term: "Quantity assumption", detail: "Per-piece price moves with quantity, and a quotation against an optimistic quantity is not the price you will pay at a realistic one." },
        ],
      },
      {
        type: "table",
        heading: "Differences that are real, and differences that are not",
        columns: ["Observed difference", "What it usually means"],
        rows: [
          ["Lower price, same spec, same quantity", "Real. Efficiency, labour cost or fabric buying power"],
          ["Lower price, fabric quoted as a range", "The cheap end of the range was priced"],
          ["Lower price, decoration route unnamed", "Route not priced against your artwork"],
          ["Lower price, packing not specified", "Simplest pack assumed — often not yours"],
          ["Much lower price, everything matched", "Ask what is excluded. Something usually is"],
          ["Higher price, more assumptions stated", "Frequently the more reliable number"],
        ],
      },
      {
        type: "prose",
        heading: "Landed cost, not FOB",
        body: [
          "FOB is the first component of what a garment costs you, not the total. Freight, duty, insurance and handling sit on top, and duty in particular varies by country of origin and product classification.",
          "Two FOB prices from different countries are therefore not comparable at all until duty is applied. A supplier in one country can be several per cent cheaper FOB and more expensive landed, and the buyer only discovers this after the first shipment if the comparison was run on FOB alone.",
          "Building the comparison at landed cost also makes the freight consequence of packing visible, which is where carton efficiency starts to matter.",
        ],
      },
      {
        type: "callout",
        heading: "The one question worth asking every supplier",
        body:
          "“What does this price assume?” A supplier who answers precisely — naming the fabric weight, the decoration route, the pack and the quantity — is telling you their number is built rather than guessed. A supplier who cannot answer has given you a figure that will move once the specification is real.",
      },
    ],
    faqs: [
      {
        question: "Is the cheapest quotation usually the worst?",
        answer:
          "Not necessarily, and treating it that way is its own mistake. The cheapest quotation is often simply the one answering the smallest question. Normalise the specification and requote — sometimes the price holds, which tells you something useful.",
      },
      {
        question: "Should I share my target price?",
        answer:
          "Generally yes. Without a target, a supplier prices to their own assumptions and may cost themselves out over a decision you did not care about. With a target, the conversation becomes what to change to reach it — which is a more useful conversation than a number arriving too high with no explanation.",
      },
      {
        question: "How much difference does quantity really make?",
        answer:
          "Enough that comparing prices at different quantities is meaningless. Fabric minimums, setup costs and line efficiency all move with volume. Ask every supplier to quote the same quantity, including the quantity you will realistically order rather than the one you hope for.",
      },
      {
        question: "What if suppliers quote different fabric weights?",
        answer:
          "Ask each to requote at a single named weight. If a supplier resists naming one, that is itself the answer — a fabric quoted as a range has been priced at the cheap end, and the delivered garment will reflect it.",
      },
    ],
    related: [
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "What actually sits inside an FOB figure." },
      { label: "Fabric consumption basics", href: "/resources/fabric-consumption-basics", description: "Marker, usable width and size ratio before you compare fabric lines." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "A precise question gets a precise price." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a defined specification for costing." },
    ],
    seoTitle: "Comparing Apparel Quotations",
    seoDescription:
      "Normalise trade term, fabric, decoration, packing and quantity before comparing apparel quotations — and why landed cost beats FOB.",
  },

  /* ================================================================== */
  {
    slug: "carton-marking-for-apparel",
    category: "Commercial guide",
    title: "Carton Marking for Apparel Orders",
    headline: "Getting carton\nmarking right.",
    intro:
      "What goes on an export carton, why the packing list has to agree with it exactly, and the marking errors that cause delays at the destination.",
    summary:
      "An apparel export carton normally carries shipping marks on one face and side marks on an adjacent face: buyer name or code, purchase order reference, style, colour, size or ratio, carton number in sequence, quantity, and gross and net weight. The single most common cause of a problem is disagreement between the carton and the packing list. Correct garments packed correctly still generate a claim if the paperwork and the box do not match.",
    readingTime: "5 min read",
    heroAsset: "export.cartonMarking",
    blocks: [
      {
        type: "prose",
        heading: "Why marking is a document problem",
        body: [
          "Carton marking looks like a printing task and is actually a data task. The marks are an index into the shipment: they let a warehouse at the far end find a carton without opening it, and they let a customs officer match a box to a declaration.",
          "That means the marks are only as useful as their agreement with the packing list. A carton correctly filled but numbered out of sequence is functionally lost — the receiving warehouse looks for its contents in a box that holds something else.",
          "This is why marking artwork is approved before packing rather than adjusted during it, and why carton numbering is generated from the pack plan rather than written by hand.",
        ],
      },
      {
        type: "list",
        heading: "What a carton normally carries",
        intro: "Exact requirements vary by buyer and destination. This is the common set.",
        items: [
          { term: "Buyer name or code", detail: "Who the shipment belongs to, in the form the receiving warehouse expects." },
          { term: "Purchase order reference", detail: "The buyer's own order number, which is how the receipt is booked against the order." },
          { term: "Style and colour", detail: "Named as the buyer names them, not as the factory numbers them internally." },
          { term: "Size or ratio", detail: "For a solid pack, the size. For a ratio pack, the ratio as packed." },
          { term: "Carton number", detail: "In the form 'n of N', sequential across the shipment. The most error-prone field on the box." },
          { term: "Quantity", detail: "Pieces in this carton, matching the packing list line for the same carton number." },
          { term: "Gross and net weight", detail: "Used for freight and for verification at the destination." },
          { term: "Dimensions", detail: "Often required, and used for cube calculation and container planning." },
          { term: "Country of origin", detail: "A legal requirement in most destination markets." },
        ],
      },
      {
        type: "table",
        heading: "Solid pack and ratio pack",
        intro: "Which one you want depends on what happens at the other end.",
        columns: ["", "Solid pack", "Ratio pack"],
        rows: [
          ["Contents", "One size, one colour per carton", "A fixed size run per carton"],
          ["Best when", "Goods are broken down at a central warehouse", "Cartons go straight to stores"],
          ["Marking", "Simpler — one size on the box", "Must state the ratio exactly"],
          ["Packing cost", "Lower", "Higher — more handling per carton"],
          ["Risk", "Store allocation happens later", "An error repeats in every carton"],
        ],
      },
      {
        type: "prose",
        heading: "The errors that actually cause delays",
        body: [
          "Sequence breaks are the most common. Where a carton is repacked late and the numbering is not regenerated, the shipment ships with two cartons carrying the same number, or a gap in the run. Both force a physical recount at the destination.",
          "Weight mismatches are the second. Gross weight recorded from a pack plan rather than a scale drifts from actual, and where the difference is material it can hold a shipment while it is verified.",
          "The third is a marking artwork revision that reaches the factory after printing has started. Marking artwork should be frozen at the same point as the packing instruction, for the same reason — both are inputs to a process that runs at speed near the end of the order.",
        ],
      },
      {
        type: "callout",
        heading: "Send the marking artwork early",
        body:
          "Carton marking is needed near the end of production, which is why it is often sent late. But it is printed on material that has to be procured, and a late revision arrives when there is least slack in the schedule. Sending it with the packing instruction, at pre-production, removes a predictable source of delay for no cost.",
      },
    ],
    faqs: [
      {
        question: "Who supplies the carton marking artwork?",
        answer:
          "The buyer, normally. It carries buyer codes, order references and sometimes barcode formats that only the buyer holds. Where a buyer has no standard format, AHM can propose one for approval — but it is approved by the buyer before anything is printed.",
      },
      {
        question: "What happens if the carton and packing list disagree?",
        answer:
          "The receiving warehouse recounts, which costs time and usually generates a discrepancy report against the shipment. It is the most common source of a claim on an otherwise correct order, which is why packing verification is its own inspection gate.",
      },
      {
        question: "Do we need barcodes on the cartons?",
        answer:
          "It depends on the destination warehouse. Many retail and grocery distribution centres require a specific carton label format, and the requirement is set by them rather than by the factory. Send the specification and it is built to it.",
      },
      {
        question: "Can carton size be optimised for freight?",
        answer:
          "Yes, and it is worth doing. Carton dimensions drive how efficiently a container fills, and cube is what freight is charged on. It is a decision taken at packing instruction stage, alongside pack type.",
      },
    ],
    related: [
      { label: "FOB export", href: "/export", description: "Packing, documents and handover at the port." },
      { label: "Quality", href: "/quality", description: "Packing verification is its own inspection gate." },
      { label: "Glossary", href: "/resources/glossary", description: "Solid pack, ratio pack and packing list, defined." },
      { label: "Manufacturing", href: "/manufacturing", description: "Where packing and marking sit in the workflow." },
    ],
    seoTitle: "Carton Marking for Apparel",
    seoDescription:
      "What an apparel export carton must carry, why it has to agree with the packing list exactly, and the marking errors that delay shipments.",
  },

  /* ================================================================== */
  {
    slug: "fabric-shrinkage-guide",
    category: "Fabric guide",
    title: "Fabric Shrinkage Guide for Apparel Buyers",
    headline: "Shrinkage,\nspecified.",
    intro:
      "What fabric shrinkage is, why length and width are measured separately, and how to put a usable tolerance in a specification before the first sample is cut.",
    summary:
      "Fabric shrinkage is the change in length or width after washing, drying, steaming or finishing, expressed as a percentage of the original dimension. It is measured separately in the warp or wale direction and the weft or course direction because the two rarely move equally. A specification that names only “low shrinkage” has not named a number the factory or the inspector can work to.",
    readingTime: "6 min read",
    heroAsset: "fabrics.woven",
    blocks: [
      {
        type: "prose",
        heading: "What shrinkage actually measures",
        body: [
          "Shrinkage is dimensional change, not a quality score. A fabric can shrink and still be correct for the program if the pattern and marker were built with that change in mind. The problem is surprise: a garment graded to a sealed sample that was never washed will not match the sealed sample after the first industrial laundering.",
          "The usual formula is straightforward. Shrinkage percent equals the original dimension minus the final dimension, divided by the original dimension, times one hundred. What matters commercially is when you measure — grey fabric, finished fabric, or after a wash method that matches the buyer’s laundry — because each stage can move the number.",
          "Buyers sometimes treat a single percentage as enough. It is not. Length and width must both be stated, because a fabric that is stable in one direction and lively in the other will twist seams, skew panels and open gaps at pocket mouths even when the “average” looks acceptable.",
        ],
      },
      {
        type: "table",
        heading: "Orientation ranges, not guarantees",
        intro:
          "Common industry conversation bands for finished apparel fabrics. Your program’s wash method, fibre and finish decide the real figure. Agree the test method with the manufacturer rather than quoting a number from a brochure.",
        columns: ["Construction", "Often discussed as", "Why it moves"],
        rows: [
          ["Woven workwear / shirting", "Around ±3% per direction after an agreed wash", "Fibre, weave density, and whether the cloth was pre-shrunk"],
          ["Knit jersey / pique", "Often looser than woven — commonly discussed near ±5%", "Loop structure recovers differently length vs width"],
          ["Performance / premium programs", "Tighter bands when the buyer specifies them", "Buyer standard and laundry method override market habit"],
        ],
      },
      {
        type: "list",
        heading: "What to put in the tech pack",
        items: [
          { term: "Direction", detail: "Separate limits for length (warp/wale) and width (weft/course). One number for both hides the risk." },
          { term: "Test method", detail: "Name the wash temperature, cycles and drying method you care about — domestic, industrial, or a named lab method." },
          { term: "Stage of measurement", detail: "Finished fabric before cut, or after a defined wash. Grey GSM and post-finish behaviour are not the same conversation." },
          { term: "Pattern consequence", detail: "If shrinkage is expected, say whether the pattern is already compensated or whether the factory must build allowance into the marker." },
          { term: "Related weight", detail: "When cloth shrinks in both directions, mass concentrates: post-wash GSM can rise even when the delivery looked “within tolerance.”" },
        ],
      },
      {
        type: "prose",
        heading: "Pre-shrinking is a conversation, not a slogan",
        body: [
          "Processes such as sanforization on cotton wovens exist to reduce residual shrinkage before cutting. Naming “pre-shrunk” without a residual tolerance still leaves the factory guessing what will pass inspection.",
          "Knits are a different problem. Mechanical and chemical finishing can calm them, but a buyer who washes hot and tumble-dries hard will see more movement than a lab wash that never matches the field. Match the test to the laundry, or the sealed sample will not survive contact with reality.",
        ],
      },
      {
        type: "callout",
        heading: "If you do not know the number yet",
        body:
          "Describe how the garment is washed in the field and whether fit must hold after the first wash. A manufacturer can propose a residual shrinkage band and a test method for approval. Inventing a tight percentage without a method usually produces either an expensive fabric choice or a dispute at inspection.",
      },
    ],
    faqs: [
      {
        question: "Is ±3% always acceptable for woven uniforms?",
        answer:
          "It is a common conversation band, not a universal rule. Some buyers specify tighter; some wash methods need a wider allowance. The acceptable figure is the one both sides agree against a named test, written into the specification.",
      },
      {
        question: "Why can length and width shrink differently?",
        answer:
          "Warp and weft yarns, or wales and courses in a knit, are not under the same tension in the mill or on the garment. Finishing can bias one direction. Measuring only the larger of the two still leaves the other free to distort the garment.",
      },
      {
        question: "Does shrinkage change fabric weight?",
        answer:
          "If the cloth contracts in area while the fibre mass stays, grams per square metre rise. That is why costing and consumption conversations should know whether a quoted GSM is grey, finished, or after wash.",
      },
    ],
    related: [
      { label: "Fabric GSM guide", href: "/resources/fabric-gsm-guide", description: "What weight measures — and what it does not." },
      { label: "Materials and fabric tools", href: "/materials", description: "GSM and shrinkage calculators on the materials page." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "Where shrinkage belongs in a complete specification." },
      { label: "Quality", href: "/quality", description: "Inspection against an approved standard, not a surprise after wash." },
    ],
    seoTitle: "Fabric Shrinkage Guide for Buyers",
    seoDescription:
      "How apparel buyers should specify fabric shrinkage: length vs width, test method, residual tolerance, and why a single percentage is not enough.",
  },

  /* ================================================================== */
  {
    slug: "polyester-dyeing-for-buyers",
    category: "Fabric guide",
    title: "Why Polyester Is Hard to Dye — Buyer Guide",
    headline: "Polyester colour,\nwithout surprises.",
    intro:
      "Why polyester does not take dye like cotton, what that means for lab dips and reorders, and what to write in a uniform specification so shade stays honest across lots.",
    summary:
      "Polyester is hydrophobic and highly crystalline, so colour is typically carried with disperse dyes under heat and pressure rather than with the routes used for cotton. For a buyer, the practical point is not the chemistry name — it is that shade approval, heat history and reduction clearing decide whether a polo dyed in March still matches the one dyed in September.",
    readingTime: "6 min read",
    heroAsset: "fabrics.polyesterPerformance",
    blocks: [
      {
        type: "prose",
        heading: "Why cotton intuition fails on polyester",
        body: [
          "Cotton is comparatively open to water-based dye routes. Polyester resists water; dye molecules have to migrate into the fibre under conditions that open the polymer structure briefly, then lock colour in as it cools. That is why polyester programs talk about disperse dyes and high-temperature dyeing rather than the language many buyers learned on cotton tees.",
          "The commercial consequence is patience at development and discipline at bulk. A lab dip is not optional decoration — it is the only objective colour agreement you will have when two dye lots meet on the same sales floor.",
          "Heat also matters after dyeing. Sublimation, pressing and high-temperature finishing can move shade on polyester if the program was never tested for it. A logo heat transfer that looks fine on a cotton sample can mark or dull a polyester panel if the fabric was not qualified for that route.",
        ],
      },
      {
        type: "list",
        heading: "What buyers should specify",
        items: [
          { term: "Colour standard", detail: "A physical swatch or numeric reference — never a colour name alone. Polyester shade disputes start when the standard is verbal." },
          { term: "Lab dip approval", detail: "Approve under an agreed light source. Store lighting and daylight disagree; name which one wins." },
          { term: "Lot-to-lot tolerance", detail: "Say how much roll-to-roll or lot-to-lot difference you will accept. Silence here becomes an argument at goods-in." },
          { term: "End use and heat", detail: "Industrial laundry, heat transfers, and high-temperature pressing all belong in the brief if they apply." },
          { term: "Fibre content honesty", detail: "A poly-cotton blend dyes as two systems. Matching a 100% polyester standard on a blend — or the reverse — is a different problem." },
        ],
      },
      {
        type: "table",
        heading: "Fastness conversations that matter for uniforms",
        intro: "Ask for the tests that match how the garment is worn and washed, not a generic “good fastness” claim.",
        columns: ["Concern", "Why uniforms care"],
        rows: [
          ["Wash fastness", "Colour that bleeds or fades in industrial laundry breaks a program across stores"],
          ["Rubbing / crocking", "Dark shades on light trims and pocket bags show transfer quickly"],
          ["Perspiration", "Client-facing and kitchen-adjacent roles stress colour differently than a hanger sample"],
          ["Light / sublimation", "Window displays, heat presses and some finishes move polyester shade if untested"],
        ],
      },
      {
        type: "prose",
        heading: "Reorders are a dye-lot problem",
        body: [
          "A perfect first shipment does not guarantee a perfect reorder if the dye lot changes and nobody kept the approved standard. Keep the sealed lab dip or the approved bulk swatch with the purchase order reference.",
          "Where a program must match across polos, trousers and outer layers, approve them against each other — not only against a paper standard — because knit and woven polyester constructions take dye differently even at the same nominal shade.",
        ],
      },
      {
        type: "callout",
        heading: "AHM’s role in the conversation",
        body:
          "We cost and develop against the colour standard and test expectations you approve in writing. We do not publish dye-house capacity or process claims as marketing facts. Send the fibre content, the shade reference and the wash or heat conditions that matter, and the quotation follows that specification.",
      },
    ],
    faqs: [
      {
        question: "Can polyester be dyed as easily as cotton?",
        answer:
          "Not with the same chemistry or the same process window. Polyester typically needs disperse dyes and controlled heat; cotton routes do not transfer. Plan lab dips and lead time accordingly rather than assuming a cotton timeline.",
      },
      {
        question: "Why did my polyester polo look different after heat transfer?",
        answer:
          "Heat can remobilise disperse dye near the surface. Qualify the decoration route on the bulk fabric, not only on a cotton or blended substitute sample.",
      },
      {
        question: "Should I insist on one dye lot for a whole program?",
        answer:
          "For critical shade programs it is worth asking. Large volumes and reorders often span lots; a written tolerance and retained standards matter more than hoping one lot covers everything forever.",
      },
    ],
    related: [
      { label: "Materials and fabric selection", href: "/materials", description: "Constructions and finishes for program fabrics." },
      { label: "65/35 poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why blends behave differently from pure polyester." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "Colour standards and decoration artwork that survive production." },
      { label: "Product development", href: "/development", description: "Lab dips and approvals before bulk." },
    ],
    seoTitle: "Polyester Dyeing for Apparel Buyers",
    seoDescription:
      "Why polyester needs a different dyeing conversation from cotton, and how buyers should specify lab dips, heat and lot-to-lot shade for uniforms.",
  },

  /* ================================================================== */
  {
    slug: "fabric-consumption-basics",
    category: "Commercial guide",
    title: "Fabric Consumption Basics for Apparel Buyers",
    headline: "Why consumption\nis not a weight.",
    intro:
      "What drives metres per garment, why a GSM number cannot answer it, and which inputs belong in a quotation request if you want a comparable fabric line.",
    summary:
      "Fabric consumption is decided by the marker — the nested layout of pattern pieces across usable fabric width — not by fabric weight alone. Size ratio, garment design, nap or one-way prints, shrinkage allowance and seam waste all move the number. A rule of thumb from GSM invents a cost line someone will later treat as a fact.",
    readingTime: "6 min read",
    heroAsset: "factory.cutting",
    blocks: [
      {
        type: "prose",
        heading: "The question buyers most want answered",
        body: [
          "“How many metres per piece?” is the right commercial question and the wrong calculator input. Weight tells you mass per area. Consumption asks how much area the pattern needs once pieces are nested on a roll of a given usable width.",
          "That is why AHM’s public GSM tool converts and weighs fabric, and deliberately does not invent a consumption mode. Publishing a shortcut would look helpful and would mis-cost programs the first time the marker changed.",
          "A honest quotation builds consumption from the tech pack or a reference garment, then attaches fabric price to that meterage — with waste factors the buyer can see rather than hide.",
        ],
      },
      {
        type: "list",
        heading: "What actually moves metres per garment",
        items: [
          { term: "Usable width", detail: "Full mill width is not cuttable width. Selvedge and needle lines reduce what the marker can use; comparing mills requires the same basis." },
          { term: "Size ratio", detail: "A run heavy on XL consumes differently from a run heavy on S. Quote the ratio you will order." },
          { term: "Pattern and design", detail: "Pockets, yokes, plackets and panels add pieces. A “simple tee” and a “uniform tee with badge patch” are not the same marker." },
          { term: "Nap and direction", detail: "Brushed fabrics, directional prints and some twills force one-way nesting and raise consumption." },
          { term: "Shrinkage allowance", detail: "If the pattern is cut larger to survive wash, the marker grows before a single garment is sewn." },
          { term: "Marker efficiency", detail: "How tightly pieces nest. Efficiency is a result of the pattern and the width, not a moral quality of the factory." },
        ],
      },
      {
        type: "table",
        heading: "Inputs that make fabric lines comparable",
        columns: ["Send this", "Why quotations diverge without it"],
        rows: [
          ["Tech pack or reference garment", "Without a pattern, every factory invents a different shape"],
          ["Size range and ratio", "Average size assumptions hide XL cost"],
          ["Fabric width / usable width", "Price per metre on different widths is not comparable"],
          ["Composition, GSM, construction", "Fabric cost and behaviour change with each"],
          ["Shrinkage or wash expectation", "Allowance may be in the pattern or left for the factory to assume"],
        ],
      },
      {
        type: "callout",
        heading: "No public consumption calculator on this site",
        body:
          "On purpose. Consumption comes from the marker. Any website that multiplies GSM into a “metres per polo” figure is guessing. Send the style; we return a commercial FOB built against the specification, including a fabric line you can audit.",
      },
      {
        type: "prose",
        heading: "How this sits next to FOB",
        body: [
          "Fabric is usually the largest material line in an FOB build. Saving five centimetres of average consumption on a large program is real money; saving it by narrowing the garment without telling the buyer is not a saving — it is a different product.",
          "When you compare quotations, ask each supplier what marker assumptions and width they used. Two FOB prices with unspoken consumption differences are not two prices for the same garment.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you estimate consumption from GSM alone?",
        answer:
          "No. GSM is mass per area. Consumption is area required by the nested pattern. You need both geometry and width — which means a pattern or a measured reference garment.",
      },
      {
        question: "Why did consumption rise when we added a pocket?",
        answer:
          "Extra pieces need space on the marker, and small parts often nest poorly. Decoration and patches can also force placement that blocks efficient nesting.",
      },
      {
        question: "Should I ask for marker efficiency percent?",
        answer:
          "You can, and it is a useful discussion number — but only alongside the same width, ratio and pattern. Efficiency without those inputs is not comparable between suppliers.",
      },
    ],
    related: [
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "What sits inside a commercial FOB figure." },
      { label: "Comparing apparel quotations", href: "/resources/compare-apparel-quotations", description: "Normalise assumptions before you compare prices." },
      { label: "Fabric GSM guide", href: "/resources/fabric-gsm-guide", description: "Use weight correctly — without mistaking it for consumption." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a style for costing against a real specification." },
    ],
    seoTitle: "Fabric Consumption Basics",
    seoDescription:
      "Why fabric metres per garment come from the marker — not GSM alone — and what buyers should send so quotations use comparable consumption.",
  },

  /* ================================================================== */
  {
    slug: "knit-constructions-explained",
    category: "Fabric guide",
    title: "Knit Constructions Explained for Uniform Buyers",
    headline: "Jersey, pique,\nrib and fleece.",
    intro:
      "The knit structures that show up most often in uniform and workwear programs — what each is good for, and which specification fields matter before you lock a polo or tee.",
    summary:
      "Single jersey, pique, rib and fleece are different constructions, not different marketing names for the same cloth. Jersey drapes and prints easily; pique holds polo structure; rib recovers at collars and cuffs; fleece adds insulation with a brushed back. Specifying “knit fabric” without naming the construction leaves the quotation free to choose the cheapest interpretation.",
    readingTime: "6 min read",
    heroAsset: "fabrics.cottonPique",
    blocks: [
      {
        type: "prose",
        heading: "Construction is the first decision",
        body: [
          "Fibre and GSM matter, but they sit on top of a structure. Two 200 gsm cotton knits can be jersey or pique and will not behave the same after fifty washes on a retail floor.",
          "For uniforms, the usual failure mode is choosing jersey because it feels soft in the hand, then watching collars collapse and panels go baggy. Softness is not the same as fitness for a program.",
        ],
      },
      {
        type: "table",
        heading: "Constructions buyers meet most often",
        columns: ["Construction", "Typical use in programs", "Watch-outs"],
        rows: [
          ["Single jersey", "Tees, base layers, some dresses", "Edges curl; lighter weights show opacity issues"],
          ["Pique", "Classic uniform polos", "Holds structure; collar still needs its own rib story"],
          ["Rib (1x1, 2x2…)", "Collars, cuffs, welts", "Recovery depends on yarn and finish, not only on “rib” as a word"],
          ["Interlock", "Heavier tees, some polos", "More stable than jersey; different hand and cost"],
          ["Fleece / brushed back", "Sweatshirts, hoodies", "Weight and brush quality drive both warmth and pilling risk"],
        ],
      },
      {
        type: "list",
        heading: "Specification fields that prevent requotes",
        items: [
          { term: "Construction by name", detail: "Jersey, pique, rib, fleece — not “polo fabric” alone." },
          { term: "Composition", detail: "Cotton, poly-cotton, polyester performance — dyeing and wash behaviour follow fibre." },
          { term: "GSM with tolerance", detail: "Useful inside one construction family; misleading across families." },
          { term: "Collar and cuff", detail: "Specify rib separately when the body is pique or jersey. Body fabric does not automatically make a good collar." },
          { term: "Finish", detail: "Enzyme, silicone, moisture management — each changes hand and sometimes shade." },
        ],
      },
      {
        type: "prose",
        heading: "When to read the deeper guides",
        body: [
          "If the decision is specifically polo face fabric, read pique versus jersey in detail — that is where shape retention after industrial washing shows up most clearly.",
          "If the decision is weight across categories, use the GSM guide and the calculator on the materials page. If the decision is colour on polyester-rich knits, read the polyester dyeing guide before you approve a lab dip under the wrong light.",
        ],
      },
      {
        type: "callout",
        heading: "Matching a program across articles",
        body:
          "A polo, a tee and a fleece in “the same navy” are three dye and construction problems. Approve them against each other when they must read as one brand colour on the floor.",
      },
    ],
    faqs: [
      {
        question: "Is pique always better than jersey for polos?",
        answer:
          "For structured uniform polos, pique is the usual choice because of face texture and shape holding. Jersey can be right for a softer tee-polo hybrid if the buyer accepts different collar and wash behaviour. The construction should be a decision, not a default.",
      },
      {
        question: "Can one GSM cover jersey and fleece?",
        answer:
          "Numerically you can write the same number; commercially it means nothing. Compare GSM inside one construction. Fleece at 300 gsm and jersey at 180 gsm are answering different garment jobs.",
      },
      {
        question: "Why did my collar fail when the body fabric was fine?",
        answer:
          "Collars are usually a different knit — often rib — with their own yarn and finishing. Specify and approve them as their own item during sampling.",
      },
    ],
    related: [
      { label: "Pique vs jersey for polos", href: "/resources/pique-vs-jersey-polo-fabric", description: "The construction choice that decides most uniform polos." },
      { label: "Materials and fabric selection", href: "/materials", description: "Families, weights and side-by-side fabric compare." },
      { label: "Polos and T-shirts", href: "/products/polos-tshirts", description: "How AHM develops knit uniform programs." },
      { label: "Fabric GSM guide", href: "/resources/fabric-gsm-guide", description: "Use weight inside a construction, not across them." },
    ],
    seoTitle: "Knit Constructions for Uniform Buyers",
    seoDescription:
      "Jersey, pique, rib and fleece explained for apparel buyers — when each belongs in a uniform program and what to specify before quoting.",
  },

  /* ================================================================== */
  {
    slug: "understanding-apparel-moq",
    category: "Commercial guide",
    title: "Understanding Apparel MOQ",
    headline: "Why the minimum\nis rarely sewing.",
    intro:
      "What drives minimum order quantity on an apparel program, why fabric is usually the constraint, and how to ask for a useful MOQ answer without inventing a number.",
    summary:
      "Apparel MOQ is almost never a sewing-capacity figure. It is usually set by fabric mill minimums, colour count, trim specials and the cost of setting a line. A factory that quotes one round number for every article is either guessing or protecting a fabric commitment you have not yet made. The honest answer is confirmed once the article, fabric and colour count are reviewed.",
    readingTime: "5 min read",
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "prose",
        heading: "MOQ is a cost of setup, not a moral rule",
        body: [
          "Buyers hear “MOQ” as a gatekeeping number. Factories hear it as the point below which the fixed costs of a style — fabric booking, markers, needle set, decoration screens or embroidery digitising — do not amortise.",
          "That is why the same factory can run a lower minimum on a repeat style in stock fabric than on a new development with three colours and a custom tape. The sewing line is rarely the bottleneck on the first conversation.",
          "AHM confirms minimum quantity after the article, fabric and colour count are reviewed. Fabric is usually the constraint, not the stitching — which is the same commercial answer published elsewhere on this site, not a separate marketing claim.",
        ],
      },
      {
        type: "list",
        heading: "What actually moves the minimum",
        items: [
          { term: "Fabric mill minimum", detail: "Dye lots and loom bookings have floors. A special colour on a thin construction often drives MOQ more than stitch count." },
          { term: "Colour count", detail: "Each colour is its own dye commitment. Three colours can mean three minimums, not one." },
          { term: "Trims and decoration", detail: "Custom labels, woven tapes, screens and digitising have setup costs that want volume." },
          { term: "Size ratio", detail: "A wide size run with tiny ends still consumes fabric and markers inefficiently." },
          { term: "Repeat vs new", detail: "A sealed style on known fabric can often run smaller than a first development." },
        ],
      },
      {
        type: "callout",
        heading: "How to ask so the answer is usable",
        body:
          "Send the article type, a target fabric (or swatch), colour count and a realistic size ratio. Ask what drives the minimum — fabric, colour or decoration — not only for a single number. A supplier who can name the driver is quoting a decision, not a slogan.",
      },
      {
        type: "prose",
        heading: "What this site will not invent",
        body: [
          "There is no published MOQ figure on AHM’s public pages. Publishing one without tying it to an article and a fabric would be the kind of round number buyers learn to distrust.",
          "If your program needs a firm floor for budgeting, say so in the RFQ and we will confirm it against the specification rather than against a homepage claim.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you break a mill minimum by combining colours?",
        answer:
          "Sometimes, when the mill accepts a combined booking and shade control still holds. Often not — each colour is a separate dye lot. Ask the question against the fabric, not against sewing.",
      },
      {
        question: "Is a lower MOQ always better?",
        answer:
          "Not if it forces a more expensive fabric route, a weaker dye lot or a price that only works once. A slightly higher minimum on the right cloth is often cheaper landed.",
      },
      {
        question: "Will you publish a standard MOQ later?",
        answer:
          "Only if a verified, article-specific figure can be evidenced. Until then the honest answer stays per project.",
      },
    ],
    related: [
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "What sits inside a commercial FOB figure." },
      { label: "Comparing quotations", href: "/resources/compare-apparel-quotations", description: "Normalise quantity assumptions before you compare." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a style for a confirmed commercial position." },
      { label: "About AHM", href: "/about", description: "What we evidence — and what we refuse to invent." },
    ],
    seoTitle: "Understanding Apparel MOQ",
    seoDescription:
      "Why apparel minimum order quantity is usually fabric-driven, how colour count moves it, and how to ask for a usable MOQ answer.",
  },

  /* ================================================================== */
  {
    slug: "heat-transfer-vs-screen-print",
    category: "Buyer guide",
    title: "Heat Transfer vs Screen Print for Uniforms",
    headline: "Two print routes,\ndifferent failure modes.",
    intro:
      "When heat transfer and screen print belong on a uniform program, what each needs in the tech pack, and why polyester changes the conversation.",
    summary:
      "Screen print lays ink on the fabric through mesh; heat transfer applies a prepared graphic with heat and pressure. Both can be right for uniforms. Screen print usually wins on large solid areas and industrial wash durability when the ink system matches the fibre. Heat transfer wins on fine detail, photographic art and short runs — but must be qualified on the bulk cloth, especially polyester, because heat can move dye.",
    readingTime: "6 min read",
    heroAsset: "photo.poloNavyEmbroidered",
    blocks: [
      {
        type: "table",
        heading: "Side by side for buyers",
        columns: ["", "Screen print", "Heat transfer"],
        rows: [
          ["Best for", "Large solids, simple brand marks, volume", "Fine detail, multi-colour art, shorter runs"],
          ["Setup", "Screens per colour", "Film / transfer preparation"],
          ["Hand", "Can sit on the surface; ink system matters", "Film hand varies — test on bulk fabric"],
          ["Wash risk", "Ink adhesion and cure", "Edge lift, cracking, dye migration on polyester"],
          ["Tech pack must name", "Ink type, colours, placement, wash method", "Transfer type, placement, temperature/time if known, wash method"],
        ],
      },
      {
        type: "prose",
        heading: "Polyester is the trap",
        body: [
          "A heat transfer that looks perfect on a cotton tee sample can mark or dull a polyester polo when the same press hits disperse dye. Qualify decoration on the bulk fibre content, under the wash the program will see.",
          "If embroidery is also on the table, read the embroidery versus screen guide — the three routes answer different artwork and durability questions.",
        ],
      },
      {
        type: "list",
        heading: "What to send before sampling",
        items: [
          { term: "Vector or high-res artwork", detail: "With colour breaks named, not only a JPEG of a logo on a shirt." },
          { term: "Placement", detail: "Measured from seams or centre front — not “left chest-ish”." },
          { term: "Fibre and fabric", detail: "Cotton, poly-cotton or polyester changes ink and transfer choice." },
          { term: "Wash method", detail: "Domestic or industrial; temperature if you know it." },
          { term: "Reference garment", detail: "A physical example of the hand and durability you want beats a verbal preference." },
        ],
      },
      {
        type: "callout",
        heading: "Do not leave the route unnamed on a quotation",
        body:
          "“Logo included” without naming embroidery, screen or transfer is how two FOB prices stop being comparable. Name the route in the brief and in the quote.",
      },
    ],
    faqs: [
      {
        question: "Is heat transfer cheaper than screen?",
        answer:
          "Often on short runs and high colour counts; often not on large solids at volume. Ask both routes against the same artwork and quantity.",
      },
      {
        question: "Can we mix embroidery and print on one garment?",
        answer:
          "Yes, and many uniform programs do. Spec each decoration separately — placement, route and colour standard — so sampling does not invent the combination.",
      },
      {
        question: "Will you choose the route for us?",
        answer:
          "We can recommend against artwork, fabric and wash. The commercial quote still names the route we priced.",
      },
    ],
    related: [
      { label: "Embroidery vs screen printing", href: "/resources/embroidery-vs-screen-printing", description: "When stitch beats ink, and when it does not." },
      { label: "Polyester dyeing for buyers", href: "/resources/polyester-dyeing-for-buyers", description: "Why heat and polyester need discipline." },
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "Artwork and placement that survive production." },
      { label: "Polos and T-shirts", href: "/products/polos-tshirts", description: "Where decoration decisions show up first." },
    ],
    seoTitle: "Heat Transfer vs Screen Print",
    seoDescription:
      "How heat transfer and screen print differ for uniform programs — setup, wash risk, polyester dye migration, and what to put in the tech pack.",
  },

  /* ================================================================== */
  {
    slug: "bib-apron-construction-guide",
    category: "Buyer guide",
    title: "Bib Apron Construction Guide",
    headline: "Pockets, straps,\nreinforcement.",
    intro:
      "The construction decisions that decide whether a bib apron survives a customer-facing uniform program — and how they showed up on AHM’s documented U.S. apron lane.",
    summary:
      "A bib apron program fails at pocket mouths, strap attachments and fabric choice long before it fails at fashion. Spec pocket count and placement, strap hardware, reinforcement (bar-tacks), stain management and poly-cotton weight together. AHM’s published U.S. uniform apron case study is a stain-managed 65/35 bib program exported FOB from Port Qasim — anonymised, documented, and the reference for how these decisions land in production.",
    readingTime: "6 min read",
    heroAsset: "products.apron.front",
    blocks: [
      {
        type: "list",
        heading: "Construction points that matter",
        items: [
          { term: "Bib height and coverage", detail: "How much of the torso is protected in the actual role — retail floor vs kitchen-adjacent." },
          { term: "Pocket configuration", detail: "Count, size and placement. Pocket mouths take bar-tacks because that is where tears start." },
          { term: "Strap and hardware", detail: "Neck vs cross-back, adjustable hardware, reinforcement at attachment points." },
          { term: "Fabric", detail: "65/35 poly-cotton is the common workwear answer for wash and stain programs; weight belongs in the spec with a tolerance." },
          { term: "Finish", detail: "Stain management and softener choices change both performance and shade." },
        ],
      },
      {
        type: "prose",
        heading: "Tied to a documented program",
        body: [
          "AHM publishes one anonymised case study: a United States uniform bib apron program in 65% polyester / 35% cotton with stain management, bar-tacked reinforcement at pocket mouths and strap attachments, inspected and exported FOB Pakistan from Port Qasim.",
          "That page is a technical record, not a testimonial. Use it as a shape for your own brief — then send the differences that make your program yours.",
        ],
      },
      {
        type: "steps",
        heading: "Brief checklist before sampling",
        intro: "Enough to get a comparable quotation.",
        steps: [
          { title: "Role and wash", body: "Where it is worn and how it is laundered — industrial or domestic." },
          { title: "Fabric and colour", body: "Composition, GSM band, colour standard, stain requirement." },
          { title: "Construction sketch", body: "Pockets, straps, hardware — even a marked photo of a reference apron works." },
          { title: "Quantity and size", body: "Or one-size if that is the program — say so explicitly." },
        ],
      },
      {
        type: "callout",
        heading: "Reference garment beats adjectives",
        body:
          "“Heavy duty” and “premium” do not sew. A physical apron you like — or hate — plus the changes you want is the fastest path to a sealed sample.",
      },
    ],
    faqs: [
      {
        question: "Do you only make bib aprons?",
        answer:
          "No. Bib, waist and other service aprons are in the apron family. This guide focuses on bib construction because that is the documented case study and the densest decision set.",
      },
      {
        question: "Is 65/35 required?",
        answer:
          "It is common for wash-heavy uniforms, not a law. If your brand standard is cotton or another blend, say so and we cost against that specification.",
      },
      {
        question: "Where is the case study?",
        answer:
          "Under Case Studies — U.S. Uniform Program. The customer is not named; the construction and export mode are.",
      },
    ],
    related: [
      { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB bib apron record." },
      { label: "Apron manufacturing", href: "/products/aprons", description: "Bib, waist and service aprons to specification." },
      { label: "65/35 poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "Why the blend shows up on aprons." },
      { label: "About AHM", href: "/about", description: "What we evidence on the public record." },
    ],
    seoTitle: "Bib Apron Construction Guide",
    seoDescription:
      "Bib apron construction for uniform buyers: pockets, straps, reinforcement and fabric — tied to AHM’s documented U.S. apron program.",
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

/**
 * Editorial backlog.
 *
 * Published as a visible plan rather than as pages. These generate no routes and
 * no sitemap entries — a title is not an article, and shipping thirty thin pages
 * to fill a content plan is the failure mode the plan itself warns against.
 */
export const plannedGuides: { title: string; category: Guide["category"] }[] = [
  { title: "Apparel Sourcing from Pakistan: Complete Buyer Guide", category: "Buyer guide" },
  { title: "Polyester-Cotton Blends for Uniforms", category: "Fabric guide" },
  { title: "Uniform Polo Fabric Selection Guide", category: "Fabric guide" },
  { title: "Best Fabrics for Work Shirts", category: "Fabric guide" },
  { title: "Apron Fabric Selection Guide", category: "Fabric guide" },
  { title: "Hoodie and Fleece Weight Guide", category: "Fabric guide" },
  { title: "Workwear Fabric Guide", category: "Fabric guide" },
  { title: "Twill Fabric for Uniforms Explained", category: "Fabric guide" },
  { title: "How Apparel Size Sets Work", category: "Buyer guide" },
  { title: "What Is a Pre-Production Sample?", category: "Buyer guide" },
  { title: "How Garment Inline Inspection Works", category: "Buyer guide" },
  { title: "Apparel Packing Requirements for Export", category: "Commercial guide" },
  { title: "Pakistan Apparel Manufacturing: Buyer Checklist", category: "Buyer guide" },
  { title: "Denim Wash Types for Buyers", category: "Fabric guide" },
  { title: "Sewing Construction for Tech Packs", category: "Buyer guide" },
  { title: "Apparel Merchandising Checklist", category: "Buyer guide" },
  { title: "Knitwear Development Stages", category: "Buyer guide" },
  { title: "Sportswear Fabric Selection", category: "Fabric guide" },
  { title: "Fabric Basics for New Buyers", category: "Fabric guide" },
];

/**
 * Guides that name a route in their own `related` list.
 *
 * Derived, never hand-listed — the same rule the catalogue facets follow. A
 * guide already declares what it is about by linking outward to the pages it
 * relates to; this reads that in reverse so those pages can link back.
 *
 * The reason it matters is measurable. Before this existed, seven of the nine
 * published guides had exactly one inbound link, all of them from `/resources`.
 * A guide reachable only from its own index is one a buyer arriving on
 * `/materials` will never see, whatever it says.
 *
 * Reciprocity also keeps the pair honest: a link can only appear here because a
 * guide claims the relationship, so the two directions cannot disagree.
 */
export function guidesLinkingTo(route: string): { label: string; href: string; description: string }[] {
  return guides
    .filter((guide) => guide.related.some((related) => related.href === route))
    .map((guide) => ({
      label: guide.title,
      href: `/resources/${guide.slug}`,
      description: `${guide.summary.split(". ")[0].replace(/\.$/, "")}.`,
    }));
}
