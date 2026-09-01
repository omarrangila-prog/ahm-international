import type { ContentBlock } from "./sourcing";
import type { FaqItem } from "@/components/ui/Faq";
import type { AssetKey } from "./assets";

/**
 * BUYER RESOURCE LIBRARY
 * ======================
 *
 * Five guides, written in full. Not thirty.
 *
 * The content plan called for thirty articles; publishing thirty generated
 * articles at launch would fail the quality gate the same plan sets — original
 * insight, technical specificity, something a competitor does not already say.
 * So this file holds five complete guides and an explicit backlog. The backlog
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
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete apparel specification contains." },
      { label: "Fabric sourcing", href: "/manufacturing/fabric-sourcing", description: "How fabric is sourced and inspected against a requirement." },
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
      { label: "Polos and t-shirts", href: "/products/polos-tshirts", description: "The category where decoration route matters most." },
      { label: "Materials", href: "/materials", description: "How construction affects which route is viable." },
      { label: "Trims", href: "/materials#trims-heading", description: "Labels, tapes and the rest of the decoration decision." },
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
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "A precise question gets a precise price." },
      { label: "FOB export", href: "/export", description: "Where cost and risk transfer under FOB." },
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
  { title: "Understanding Apparel MOQ", category: "Commercial guide" },
  { title: "Polyester-Cotton Blends for Uniforms", category: "Fabric guide" },
  { title: "Uniform Polo Fabric Selection Guide", category: "Fabric guide" },
  { title: "Best Fabrics for Work Shirts", category: "Fabric guide" },
  { title: "Apron Fabric Selection Guide", category: "Fabric guide" },
  { title: "Bib Apron Construction Guide", category: "Buyer guide" },
  { title: "Hoodie and Fleece Weight Guide", category: "Fabric guide" },
  { title: "Workwear Fabric Guide", category: "Fabric guide" },
  { title: "Twill Fabric for Uniforms Explained", category: "Fabric guide" },
  { title: "Heat Transfer vs Screen Print", category: "Buyer guide" },
  { title: "How Apparel Size Sets Work", category: "Buyer guide" },
  { title: "What Is a Pre-Production Sample?", category: "Buyer guide" },
  { title: "How Garment Inline Inspection Works", category: "Buyer guide" },
  { title: "Apparel Packing Requirements for Export", category: "Commercial guide" },
  { title: "Pakistan Apparel Manufacturing: Buyer Checklist", category: "Buyer guide" },
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
