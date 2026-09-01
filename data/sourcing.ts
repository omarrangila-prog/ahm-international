import type { FaqItem } from "@/components/ui/Faq";
import type { AssetKey } from "./assets";

/**
 * SOURCING PILLARS
 * ================
 *
 * A small number of deep pages rather than a large number of shallow ones.
 *
 * Two pages the brief listed are deliberately not built:
 *
 *  - `/sourcing/oem-apparel-manufacturing` — OEM and private label are covered
 *    together on the private-label pillar, because the useful content is the
 *    *distinction* between them. Split across two pages, each would restate the
 *    other with a different heading, which is the definition of a thin page.
 *
 *  - Country landing pages (`/apparel-manufacturer-usa` and similar) — AHM has
 *    documented export experience to the United States and target-market status
 *    elsewhere. That is not enough unique, useful, market-specific content to
 *    justify a page per country, and generating them would be a doorway pattern.
 *
 * `/sourcing/garment-manufacturer-karachi` *is* built, because sourcing from
 * Karachi differs materially from sourcing elsewhere in Pakistan — port access,
 * cluster specialisation and lead-time implications are real, distinct content.
 */

export type ContentBlock =
  | { type: "prose"; heading: string; body: string[] }
  | { type: "list"; heading: string; intro?: string; items: { term: string; detail: string }[] }
  | { type: "table"; heading: string; intro?: string; columns: string[]; rows: string[][] }
  | { type: "steps"; heading: string; intro?: string; steps: { title: string; body: string }[] }
  | { type: "callout"; heading: string; body: string };

export type SourcingPillar = {
  slug: string;
  eyebrow: string;
  /** Page H1, split into lines for the masked reveal. */
  headline: string;
  intro: string;
  heroAsset: AssetKey;
  /** Short answer block, placed high — useful to a reader and quotable by AI search. */
  definition: { question: string; answer: string };
  blocks: ContentBlock[];
  faqs: FaqItem[];
  related: { label: string; href: string; description: string }[];
  seoTitle: string;
  seoDescription: string;
};

export const sourcingPillars: SourcingPillar[] = [
  /* =================================================================== */
  {
    slug: "apparel-manufacturer-pakistan",
    eyebrow: "Sourcing guide",
    headline: "Sourcing apparel\nfrom Pakistan.",
    intro:
      "A practical guide to working with a Pakistani apparel manufacturer. What you send, what comes back, what is decided when, and what AHM International can and cannot evidence.",
    heroAsset: "factory.sewing",
    definition: {
      question: "What does an apparel manufacturer in Pakistan actually do for a buyer?",
      answer:
        "A Pakistani apparel manufacturer takes a buyer's specification (a tech pack, a reference garment or a written requirement) and converts it into a manufacturing document, sources fabric and trims against it, produces samples for approval, manufactures in bulk, inspects against an agreed standard, packs to instruction and delivers on board at a Pakistani port under FOB terms. AHM International does this from Karachi, with documented FOB export experience to the United States.",
    },
    blocks: [
      {
        type: "prose",
        heading: "Why Pakistan",
        body: [
          "Pakistan is a long-established cotton-growing and textile-producing country with an integrated supply chain: spinning, weaving, knitting, dyeing, finishing and garment manufacture all exist domestically. For a buyer, that integration matters because it shortens the distance between a fabric decision and a finished garment.",
          "The practical consequence is strength in cotton and poly-cotton products (uniform and workwear categories, knits, wovens and fleece) rather than in highly technical performance apparel. Buyers sourcing uniform programs, workwear, polos, aprons and fleece are working with Pakistan's core competence rather than against it.",
          "Pakistan is also a genuine alternative rather than a replacement for other sourcing origins. Most buyers who source here do so as part of a multi-country strategy, and the sensible way to start is with one style rather than a program migration.",
        ],
      },
      {
        type: "steps",
        heading: "How a program starts",
        intro: "The sequence from first contact to first shipment. Steps one to five decide most of the cost.",
        steps: [
          { title: "Send the specification", body: "A tech pack, a reference garment, a sketch or a written requirement. All four are workable; the tech pack is fastest." },
          { title: "Review and questions", body: "We list what is missing before quoting, rather than pricing in a margin for the unknown." },
          { title: "Fabric and trim options", body: "Materials matched to the requirement, with alternatives where the first choice is likely to price badly." },
          { title: "Commercial FOB costing", body: "Built against the confirmed construction, materials, decoration, packing and quantity." },
          { title: "Sampling and approval", body: "Proto, fit and pre-production samples against written comment sheets, ending in a sealed sample." },
          { title: "Bulk manufacturing", body: "Cutting and assembly to the approved construction, with inline checks at defined operations." },
          { title: "Inspection and packing", body: "Against your standard, then packed and marked to your packing instruction." },
          { title: "FOB dispatch", body: "Documentation prepared and the shipment coordinated to handover on board at Port Qasim, Karachi." },
        ],
      },
      {
        type: "list",
        heading: "What AHM manufactures",
        intro: "Twelve product families, all produced to buyer specification rather than sold from a catalogue.",
        items: [
          { term: "Uniform & workwear", detail: "Work shirts, uniform tops, service apparel, chef wear, hi-vis garments and caps." },
          { term: "Polos & T-shirts", detail: "Classic and performance polos, long-sleeve polos, crew-neck and performance tees." },
          { term: "Fleece & sweatshirts", detail: "Crewneck sweatshirts, pullover and full-zip hoodies, fleece jackets and vests." },
          { term: "Aprons", detail: "Bib, waist, chef, service and utility aprons. The category with documented export history." },
          { term: "Woven shirts", detail: "Button-front uniform shirting, utility work shirts and service shirts." },
          { term: "Bottoms", detail: "Work trousers, uniform pants, cargo styles and work shorts." },
          { term: "Outerwear", detail: "Softshell, lightweight jackets, work jackets and vests." },
        ],
      },
      {
        type: "table",
        heading: "What is verified, and what depends on your specification",
        intro:
          "Published so you know which answers you can rely on before commercial discussion, and which genuinely cannot be answered until we see the style.",
        columns: ["Item", "Status"],
        rows: [
          ["Manufacturing and export location", "Verified. Karachi, Pakistan"],
          ["FOB export experience", "Verified. Documented shipment from Port Qasim to the United States"],
          ["Documented product experience", "Verified. 65% polyester / 35% cotton stain-managed bib apron program"],
          ["Commercial model", "Verified. FOB"],
          ["Price", "Per project. Depends on article, fabric, construction, quantity, decoration, packing and schedule"],
          ["Minimum order quantity", "Per project, usually constrained by fabric, not by stitching"],
          ["Sampling cost and timing", "Per project. Depends on fabric availability and development work"],
          ["Production lead time", "Per project. Confirmed in the quotation"],
          ["Certifications", "Confirmed in writing during commercial discussion"],
          ["Production capacity", "Confirmed against your quantity and schedule, not published as a figure"],
        ],
      },
      {
        type: "callout",
        heading: "What we do not publish",
        body:
          "No capacity figure, employee count, factory size, machinery list, years in business or certification appears anywhere on this site, because none of them have been independently verified for publication. A supplier site that states all of them without evidence is telling you less than one that does not.",
      },
      {
        type: "list",
        heading: "What we need in order to quote",
        intro: "You do not need all of it. Send what you have and we will tell you what is missing.",
        items: [
          { term: "Article and construction", detail: "Tech pack, reference garment, sketch or written description." },
          { term: "Fabric", detail: "Composition and weight, or the requirement the fabric has to meet." },
          { term: "Quantity", detail: "Per style and per colour, even approximately." },
          { term: "Colours and sizes", detail: "How many colours, against what reference, and the size range." },
          { term: "Decoration", detail: "Embroidery, print or labels, with artwork where available." },
          { term: "Packing and destination", detail: "Packing instruction, destination port and target delivery window." },
          { term: "Target price", detail: "Genuinely useful. It tells us which fabric and construction options are worth presenting." },
        ],
      },
    ],
    faqs: [
      {
        question: "Do I need a tech pack to get a quotation?",
        answer:
          "No. A reference garment, a sketch or a clear written description all work. A tech pack simply gets you an accurate quotation faster, because fewer questions are being answered by assumption.",
      },
      {
        question: "Can I test AHM with a single style before moving a program?",
        answer:
          "That is the recommended way to start. Send one existing or upcoming style and we will review the specification and come back on construction, fabric, trims, development, FOB costing and lead time. It is a low-risk way to see how a supplier actually works.",
      },
      {
        question: "Why won't you publish an MOQ or a lead time?",
        answer:
          "Because both genuinely depend on the article. Minimum quantity is usually constrained by the fabric mill's minimum rather than by our stitching, and lead time depends on whether fabric is in stock or needs developing. Publishing a single figure would be misleading for most enquiries.",
      },
      {
        question: "What is the commercial model?",
        answer:
          "FOB. AHM covers development, materials, production, quality, packing, export documentation and delivery on board at Port Qasim, Karachi. Freight, insurance and import clearance from that point are the buyer's responsibility.",
      },
      {
        question: "Is my specification treated as confidential?",
        answer:
          "Yes. Tech packs, specifications and commercial terms are treated as confidential. This site does not publish any customer's name, and the one program shown as a case study is anonymised.",
      },
    ],
    related: [
      { label: "Apparel exporter in Pakistan", href: "/apparel-exporter-pakistan", description: "Export workflow, documentation and FOB handover from Karachi." },
      { label: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", description: "What FOB covers, and how it compares with EXW and CIF." },
      { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to buyer specification." },
      { label: "Manufacturing process", href: "/manufacturing", description: "Nine stages, each with its outputs and its characteristic failure." },
      { label: "Quality assurance", href: "/quality", description: "Where inspection happens and what is checked at each stage." },
      { label: "Private label manufacturing", href: "/private-label-manufacturing", description: "Producing under a buyer's own brand, and how it differs from OEM." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
    ],
    seoTitle: "Apparel Manufacturer in Pakistan",
    seoDescription:
      "What to send, how development and sampling work, what is verified, and what genuinely depends on your specification.",
  },

  /* =================================================================== */
  {
    slug: "apparel-exporter-pakistan",
    eyebrow: "Sourcing guide",
    headline: "Exporting apparel\nfrom Pakistan.",
    intro:
      "What happens between a finished garment and a container leaving Karachi. Documentation, packing, carton marking, forwarder coordination and the point where responsibility transfers to you.",
    heroAsset: "export.containerLoading",
    definition: {
      question: "What does an apparel exporter in Pakistan handle?",
      answer:
        "An apparel exporter prepares the commercial documentation for the shipment, packs and marks cartons to the buyer's instruction, records carton dimensions and weights for the shipping documents, coordinates booking with the buyer's nominated freight forwarder, and delivers the goods cleared for export at the named port. Under FOB, responsibility transfers to the buyer once the goods are on board. AHM International exports from Port Qasim, Karachi.",
    },
    blocks: [
      {
        type: "steps",
        heading: "The export workflow",
        intro: "What happens after the last garment is inspected.",
        steps: [
          { title: "Packing to instruction", body: "Garments folded or hung, polybagged, ratio- or solid-packed, and cartoned to your packing instruction." },
          { title: "Carton marking", body: "Shipping marks, carton labelling and any retailer-specific marking applied to your artwork." },
          { title: "Dimensions and weights recorded", body: "Measured at packing, so the shipping documents are built from the actual shipment rather than an estimate." },
          { title: "Commercial documentation", body: "Commercial invoice, packing list and the export documents required for the shipment." },
          { title: "Forwarder coordination", body: "Booking coordinated with your nominated freight forwarder and documents released against your instruction." },
          { title: "FOB handover", body: "Goods delivered and cleared for export at Port Qasim, with responsibility transferring on board." },
        ],
      },
      {
        type: "list",
        heading: "Documentation you can expect",
        items: [
          { term: "Commercial invoice", detail: "The commercial record of the shipment, matching the agreed order." },
          { term: "Packing list", detail: "Carton-by-carton contents with dimensions and weights, matching what was physically packed." },
          { term: "Bill of lading", detail: "Issued through the shipping line or your nominated forwarder." },
          { term: "Certificate of origin", detail: "Where your import process requires one." },
          { term: "Any buyer-specific documents", detail: "Prepared to your requirement. Tell us at development what your import process needs." },
        ],
      },
      {
        type: "prose",
        heading: "Karachi and Port Qasim",
        body: [
          "Karachi is Pakistan's principal port city and handles the majority of the country's containerised trade through two ports: Karachi Port and Port Qasim. A manufacturer located in Karachi is close to the point of export, which removes an inland leg that manufacturers elsewhere in Pakistan have to build into their schedule.",
          "AHM International manufactures in Karachi and has documented FOB export experience from Port Qasim to the United States. That is the shipment history we can evidence; other markets listed on this site are target buyer markets rather than documented lanes, and are labelled as such.",
        ],
      },
      {
        type: "callout",
        heading: "What FOB does not include",
        body:
          "Under FOB, freight from the port to your destination, marine insurance, import clearance, duties and final market compliance are the buyer's responsibility. We will work to your labelling and documentation requirements, but we do not provide legal or compliance advice for your market. Final market-specific labelling and compliance are approved by the buyer.",
      },
      {
        type: "table",
        heading: "Where responsibility sits",
        columns: ["Stage", "AHM International", "Buyer"],
        rows: [
          ["Development and sampling", "Yes", "Approval"],
          ["Fabric and trim procurement", "Yes", "Approval or nomination"],
          ["Manufacturing and inspection", "Yes", "Standard nomination, optional inspection"],
          ["Packing and carton marking", "Yes", "Packing instruction and artwork"],
          ["Export documentation", "Yes", "Requirements for your import process"],
          ["Delivery on board at Port Qasim", "Yes", ". "],
          ["Ocean freight", ": ", "Yes"],
          ["Marine insurance", ": ", "Yes"],
          ["Import clearance and duties", ". ", "Yes"],
          ["Market compliance and final labelling approval", "Works to your requirement", "Approves"],
        ],
      },
    ],
    faqs: [
      {
        question: "Which port does AHM ship from?",
        answer: "Port Qasim, Karachi. The port AHM has documented export experience shipping from.",
      },
      {
        question: "Can we nominate our own freight forwarder?",
        answer:
          "Yes. Under FOB the forwarder is normally the buyer's nomination, and we coordinate booking and document release with them.",
      },
      {
        question: "How do you avoid documentation mismatches at clearance?",
        answer:
          "Carton dimensions and weights are recorded at packing and the shipping documents are built from that record rather than from an estimate. Contents are verified against the packing instruction before each carton is sealed.",
      },
      {
        question: "Which markets has AHM exported to?",
        answer:
          "AHM has documented FOB apparel export experience from Port Qasim to the United States. Other markets shown on this site are target buyer markets, and are labelled as such rather than presented as shipment history.",
      },
    ],
    related: [
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "What to send, how development works, and what is verified." },
      { label: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", description: "FOB compared with EXW and CIF, and who carries what." },
      { label: "Export packing and carton marking", href: "/manufacturing/packing", description: "Assortment, ratio, labelling and verification before sealing." },
      { label: "FOB export process", href: "/manufacturing/fob-export", description: "Documentation, booking coordination and handover." },
      { label: "U.S. uniform apron program", href: "/case-studies/us-uniform-apron-program", description: "The documented FOB program, anonymised." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
    ],
    seoTitle: "Apparel Exporter in Pakistan",
    seoDescription:
      "Packing, carton marking, commercial documentation, forwarder coordination and FOB handover at Port Qasim, Karachi.",
  },

  /* =================================================================== */
  {
    slug: "fob-apparel-manufacturing",
    eyebrow: "Commercial guide",
    headline: "FOB apparel\nmanufacturing.",
    intro:
      "What FOB means for an apparel buyer, what it covers, how it compares with EXW and CIF, and which costs sit on which side of the rail.",
    heroAsset: "export.cartons",
    definition: {
      question: "What is FOB in apparel manufacturing?",
      answer:
        "FOB, or Free On Board, means the manufacturer is responsible for the goods until they are loaded on board the vessel at the named port of shipment, and the buyer takes responsibility from that point. In apparel, an FOB price therefore includes development, materials, production, quality, packing, export documentation and delivery on board, and excludes ocean freight, insurance, import duty and clearance. AHM International supplies FOB from Port Qasim, Karachi.",
    },
    blocks: [
      {
        type: "table",
        heading: "FOB compared with EXW and CIF",
        intro: "The three terms most common in apparel sourcing, and what changes between them.",
        columns: ["", "EXW", "FOB", "CIF"],
        rows: [
          ["Goods produced and packed", "Manufacturer", "Manufacturer", "Manufacturer"],
          ["Export documentation", "Buyer", "Manufacturer", "Manufacturer"],
          ["Inland transport to port", "Buyer", "Manufacturer", "Manufacturer"],
          ["Export clearance", "Buyer", "Manufacturer", "Manufacturer"],
          ["Loading on board", "Buyer", "Manufacturer", "Manufacturer"],
          ["Ocean freight", "Buyer", "Buyer", "Manufacturer"],
          ["Marine insurance", "Buyer", "Buyer", "Manufacturer"],
          ["Import clearance and duty", "Buyer", "Buyer", "Buyer"],
        ],
      },
      {
        type: "prose",
        heading: "Why most apparel buyers use FOB",
        body: [
          "FOB gives the buyer control of the freight leg while leaving everything inside the country of manufacture with the party best placed to handle it. Buyers with an existing forwarder relationship usually get better freight rates than a manufacturer can, and consolidating shipments from several suppliers is only possible if the buyer controls the booking.",
          "It also makes price comparison meaningful. Two FOB quotations from two countries can be compared directly on the manufacturing content, because neither includes a freight rate that varies by lane, season and volume.",
          "EXW shifts more risk and administration to the buyer than most apparel programs justify. CIF removes visibility of the freight cost, which makes it harder to see what is actually being paid for the garment.",
        ],
      },
      {
        type: "list",
        heading: "What an FOB apparel price includes",
        items: [
          { term: "Fabric and trims", detail: "Usually the largest single component, calculated from the actual marker consumption." },
          { term: "Cutting and assembly", detail: "Labour against the approved construction and stitch specification." },
          { term: "Decoration", detail: "Embroidery, print, labels and patches as specified." },
          { term: "Finishing and inspection", detail: "Pressing, trimming, measurement verification and appearance check." },
          { term: "Packing materials", detail: "Polybags, cartons, hangers and labelling." },
          { term: "Export handling", detail: "Documentation, inland transport to port, export clearance and loading." },
        ],
      },
      {
        type: "list",
        heading: "What moves an FOB price",
        intro: "The levers worth discussing if a quotation comes back above target.",
        items: [
          { term: "Fabric specification", detail: "Composition and weight change the largest cost line. An alternative construction often protects the target price without a visible difference." },
          { term: "Colour count", detail: "More colours means smaller dye lots, which raises fabric cost and can raise the minimum quantity." },
          { term: "Construction complexity", detail: "Every additional operation is labour. Pocket count and reinforcement move cost more than overall size does." },
          { term: "Decoration", detail: "Stitch count on embroidery and colour count on print are direct cost drivers." },
          { term: "Quantity", detail: "Setup costs amortise across the run; the effect is largest at lower volumes." },
          { term: "Packing", detail: "Hanging, retailer-specific packing and small carton counts all add cost, and carton sizing affects your freight." },
        ],
      },
      {
        type: "callout",
        heading: "AHM's FOB experience",
        body:
          "AHM International has documented FOB apparel export experience from Port Qasim, Karachi to the United States. The documented program was a 65% polyester / 35% cotton stain-managed bib apron for a United States uniform program, supplied FOB Pakistan.",
      },
    ],
    faqs: [
      {
        question: "Does an FOB price include shipping to my country?",
        answer:
          "No. FOB covers everything up to and including loading on board at the named port. Ocean freight, insurance, import clearance and duty are the buyer's responsibility and are arranged through your own forwarder.",
      },
      {
        question: "Can I compare an FOB quotation from Pakistan with one from another country?",
        answer:
          "Yes, and that is one of the main reasons buyers use FOB. Because neither price includes freight, the comparison is on the manufacturing content rather than on a freight rate that varies by lane and season.",
      },
      {
        question: "What should I send to get an accurate FOB quotation?",
        answer:
          "The article and construction, the fabric or the requirement it has to meet, quantity per style and colour, size range, decoration with artwork, packing instruction and destination port. A target price also helps. It tells us which options are worth presenting.",
      },
      {
        question: "Is a target price used against the buyer?",
        answer:
          "It should not be, and it is not here. A target tells us which fabric and construction options are worth presenting. Without one, a manufacturer quotes the specification as written even when a small change would have met the number.",
      },
    ],
    related: [
      { label: "Apparel exporter in Pakistan", href: "/apparel-exporter-pakistan", description: "Export workflow, documentation and handover from Karachi." },
      { label: "FOB export process", href: "/manufacturing/fob-export", description: "Stage-by-stage detail of documentation and handover." },
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "What to send, and what is verified versus per-project." },
      { label: "Export and logistics", href: "/export", description: "Routes, scope and the documented shipment lane." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
      { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to specification." },
    ],
    seoTitle: "FOB Apparel Manufacturing Explained",
    seoDescription:
      "What an FOB apparel price includes, how it compares with EXW and CIF, and which levers actually move the quotation.",
  },

  /* =================================================================== */
  {
    slug: "private-label-manufacturing",
    eyebrow: "Commercial guide",
    headline: "Private label\nand OEM apparel.",
    intro:
      "The difference between private label, OEM and white label manufacturing, which one your program actually needs, and what each requires you to supply.",
    heroAsset: "development.techPack",
    definition: {
      question: "What is the difference between private label and OEM apparel manufacturing?",
      answer:
        "In OEM manufacturing the buyer supplies the design and specification and the manufacturer produces to it. The product is the buyer's, made to their document. In private label manufacturing the buyer applies their own brand to a garment, which may be their own design or a manufacturer's existing article. White label is the narrower case where a manufacturer's standard product is rebranded with minimal change. Most uniform and workwear programs are OEM in practice, because the buyer specifies the garment and puts their own brand on it.",
    },
    blocks: [
      {
        type: "table",
        heading: "Which model fits your program",
        columns: ["", "OEM", "Private label", "White label"],
        rows: [
          ["Who designs the garment", "Buyer", "Buyer or manufacturer", "Manufacturer"],
          ["Specification supplied by", "Buyer", "Buyer, or adapted from an existing article", "Manufacturer"],
          ["Branding", "Buyer's", "Buyer's", "Buyer's"],
          ["Development effort", "Highest", "Moderate", "Lowest"],
          ["Control over construction", "Full", "Partial to full", "Limited"],
          ["Typical use", "Uniform and workwear programs", "Brand ranges and retail programs", "Fast, low-differentiation products"],
        ],
      },
      {
        type: "prose",
        heading: "What most buyers actually need",
        body: [
          "Most uniform, workwear and program buyers describe what they want as private label, and are describing OEM. They have a garment that has to fit a role, survive a laundering cycle and carry their brand, which means the specification is theirs, even if it started as an adaptation of something they already buy.",
          "The distinction matters commercially because it determines where the development work sits. In OEM, the buyer's specification is the contract; every question it leaves open becomes a cost assumption. In a genuine white label arrangement, the manufacturer's article is the reference and the buyer's control is limited to what the article already offers.",
          "AHM works OEM: the specification comes from the buyer, and where it is incomplete we resolve it with you rather than substituting our own preference silently.",
        ],
      },
      {
        type: "list",
        heading: "What you supply for a private label program",
        items: [
          { term: "Specification", detail: "Tech pack, reference garment, sketch or written requirement." },
          { term: "Brand assets", detail: "Vector artwork for embroidery and print, and thread or ink colour references." },
          { term: "Labelling", detail: "Main label, care label, size label and country-of-origin requirements, with artwork." },
          { term: "Packing", detail: "Polybag, folding, ratio and carton marking requirements." },
          { term: "Compliance requirements", detail: "Any market-specific labelling your import process requires. You approve the final wording." },
        ],
      },
      {
        type: "steps",
        heading: "How a private label program is built",
        steps: [
          { title: "Article definition", body: "The garment is specified. Either from your tech pack or by documenting a reference garment you already buy." },
          { title: "Material selection", body: "Fabric and trims matched to the requirement, with commercial alternatives presented." },
          { title: "Branding specification", body: "Labels, decoration and packaging specified together, since all three carry the brand." },
          { title: "Sampling and approval", body: "Proto and fit samples against written comments, ending in a sealed reference." },
          { title: "Production and inspection", body: "Bulk to the approved construction, inspected against your standard." },
          { title: "Packing and FOB dispatch", body: "Packed and marked to your instruction, then delivered on board at Port Qasim." },
        ],
      },
      {
        type: "callout",
        heading: "On confidentiality",
        body:
          "Tech packs, designs and commercial terms shared with AHM are treated as confidential. This site publishes no customer name, and the single case study shown is anonymised with the customer's identity absent from the underlying data rather than merely hidden in the page.",
      },
    ],
    faqs: [
      {
        question: "Do you have your own products we can rebrand?",
        answer:
          "AHM works to buyer specification rather than selling a catalogue. Where you do not have a specification, we can document a reference garment you already buy and develop from that, which gives you a garment you control rather than one you rent.",
      },
      {
        question: "Can you produce our own labels and packaging?",
        answer:
          "Yes. Main labels, care labels, size labels, printed neck labels, hangtags and packaging are sourced and applied to your artwork and specification.",
      },
      {
        question: "Who owns the pattern and specification?",
        answer:
          "Where the specification and design come from you, they remain yours. Where we develop a pattern from your reference garment for your program, it is developed for your program.",
      },
      {
        question: "What is the minimum quantity for private label?",
        answer:
          "It depends on the article, the fabric and the colour count. Fabric mill minimums are usually the binding constraint rather than the stitching. It is confirmed once those three are known.",
      },
    ],
    related: [
      { label: "Product development", href: "/manufacturing/product-development", description: "How a specification becomes an executable manufacturing document." },
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "What to send, and what is verified versus per-project." },
      { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to buyer specification." },
      { label: "Embroidery and decoration", href: "/manufacturing/embroidery", description: "Digitising per substrate and sew-out approval." },
      { label: "Materials", href: "/materials", description: "Construction families, typical weights, finishes and applications." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
    ],
    seoTitle: "Private Label & OEM Manufacturing",
    seoDescription:
      "Private label, OEM and white label compared: which model fits your program, what you supply, and how a branded program is built.",
  },

  /* =================================================================== */
  {
    slug: "garment-manufacturer-karachi",
    eyebrow: "Sourcing guide",
    headline: "Sourcing garments\nfrom Karachi.",
    intro:
      "Why the city a Pakistani manufacturer operates from affects your program. Port access, cluster specialisation and what that means for schedule and category fit.",
    heroAsset: "export.warehouse",
    definition: {
      question: "Why does it matter which Pakistani city a garment manufacturer is in?",
      answer:
        "Pakistan's textile industry is clustered by specialisation and separated by distance from the sea. Karachi is the port city and has a broad garment manufacturing base including knits, wovens and uniform products. Faisalabad and Lahore are strong in specific textile segments but are several hundred kilometres inland, which adds an inland transport leg to every export shipment. For a buyer, the city affects both category fit and schedule.",
    },
    blocks: [
      {
        type: "prose",
        heading: "Karachi as a sourcing location",
        body: [
          "Karachi is Pakistan's largest city and its principal port, handling the bulk of the country's containerised trade through Karachi Port and Port Qasim. Garment manufacturing in Karachi developed alongside that port access, and the city has a broad base across knits, wovens, uniform and workwear products.",
          "The practical advantage for a buyer is the absence of an inland leg. A manufacturer in Karachi moves finished cartons a short distance to the port rather than several hundred kilometres across the country, which removes a step where schedule and cargo condition can both be lost.",
          "It also shortens the feedback loop on export documentation and booking, because the manufacturer, the forwarder and the port are in the same city.",
        ],
      },
      {
        type: "table",
        heading: "Pakistan's textile clusters",
        intro: "Broad specialisation by region. Useful for deciding where a category is best sourced.",
        columns: ["Location", "Typical strength", "Distance to sea"],
        rows: [
          ["Karachi", "Broad garment base. Knits, wovens, uniform and workwear; port city", "At the port"],
          ["Lahore", "Knitwear, garments, leather and mixed manufacturing", "Inland. Approx. 1,200 km"],
          ["Faisalabad", "Woven fabric, home textiles, yarn and greige production", "Inland. Approx. 1,100 km"],
          ["Sialkot", "Sportswear, gloves and specialised technical products", "Inland. Approx. 1,100 km"],
        ],
      },
      {
        type: "list",
        heading: "What this means for your program",
        items: [
          { term: "Schedule", detail: "No inland transport leg between factory and port removes a variable from the dispatch window." },
          { term: "Category fit", detail: "Karachi's base suits uniform, workwear, knits and wovens. The categories AHM produces." },
          { term: "Documentation", detail: "Manufacturer, forwarder and port in one city shortens the loop on booking and document release." },
          { term: "Buyer visits", detail: "Karachi has the country's main international airport, so a factory visit does not require a domestic connection." },
        ],
      },
      {
        type: "callout",
        heading: "AHM in Karachi",
        body:
          "AHM International manufactures in Karachi, Pakistan, and has documented FOB apparel export experience from Port Qasim to the United States. Our exact street address is confirmed during commercial discussion rather than published.",
      },
    ],
    faqs: [
      {
        question: "Does AHM manufacture in Karachi?",
        answer:
          "Yes. AHM International manufactures in Karachi, Pakistan and exports FOB from Port Qasim. The specific address is confirmed during commercial discussion.",
      },
      {
        question: "Can we visit before placing an order?",
        answer:
          "Buyer visits are arranged through commercial discussion. Karachi has direct international connections, so a visit does not require a domestic transfer.",
      },
      {
        question: "Is Karachi better than Lahore or Faisalabad for uniform sourcing?",
        answer:
          "Not universally: it depends on the category. Faisalabad is strong in woven fabric and home textiles, Sialkot in sportswear and technical products. For uniform and workwear garments with a direct export route, Karachi's combination of a broad garment base and port access is a good fit.",
      },
    ],
    related: [
      { label: "Apparel manufacturer in Pakistan", href: "/apparel-manufacturer-pakistan", description: "What to send, how development works, and what is verified." },
      { label: "Apparel exporter in Pakistan", href: "/apparel-exporter-pakistan", description: "Export workflow, documentation and handover from Karachi." },
      { label: "About AHM International", href: "/about", description: "What the company is, and what it does not claim." },
      { label: "Export and logistics", href: "/export", description: "Routes, scope and the documented shipment lane." },
      { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to specification." },
      { label: "Private label manufacturing", href: "/private-label-manufacturing", description: "Producing under a buyer's own brand, and how it differs from OEM." },
      { label: "Request a quote", href: "/request-a-quote", description: "Send a specification and get costed against it." },
    ],
    seoTitle: "Garment Manufacturer in Karachi",
    seoDescription:
      "Port access at Port Qasim, textile cluster specialisation across Pakistan, and what the manufacturer's city means for your schedule.",
  },
];

export function getSourcingPillar(slug: string) {
  return sourcingPillars.find((p) => p.slug === slug);
}
