import type { Guide } from "./guides";

/**
 * Manufacturing, decoration, export and product guides.
 *
 * General trade knowledge, checkable against the standards and sources it
 * names. None of it describes AHM's own machinery, processes, tests or
 * capacity; where a choice depends on a factory, the guide tells the buyer
 * what to ask, not what AHM does. Incoterms, customs and documentation vary
 * by shipment and country, so these guides explain the structure and point to
 * the authority rather than stating rates, duties or requirements.
 *
 * Each sets `updated` and not a review: no person has reviewed these yet.
 */

const updated = { label: "October 2026", iso: "2026-10-20" };

export const practiceGuides: Guide[] = [
  /* ================================================================== */
  {
    slug: "stitches-and-seams-explained",
    category: "Buyer guide",
    title: "Stitch Types and Seam Construction in Garments Explained",
    headline: "Stitches and\nseams, explained.",
    intro:
      "How a stitch differs from a seam, the stitch types a tech pack names, where reinforcement belongs, and the defects a specification can prevent.",
    summary:
      "A stitch is how thread interlocks; a seam is how fabric pieces are joined by one or more rows of stitches. ISO 4915 sorts stitches into classes (lockstitch, chainstitch, overedge, covering chainstitch) and ISO 4916 sorts seams (superimposed, lapped, bound, flat). A tech pack should name the stitch type, the seam type, the stitch density and where reinforcement goes.",
    readingTime: "8 min read",
    updated,
    heroAsset: "development.techPack",
    blocks: [
      {
        type: "prose",
        heading: "Stitch and seam are not the same thing",
        body: [
          "A stitch is a single unit of thread interlocked with itself or with other threads. A seam is a joint between pieces of fabric, made by one or more rows of stitching in a defined arrangement. Two garments can use the same stitch in different seams, and one seam type can be sewn with different stitches.",
          "Two international standards give the vocabulary a tech pack uses. ISO 4915 classifies stitch types by number: the 100 class (single-thread chainstitch), 300 (lockstitch), 400 (multi-thread chainstitch), 500 (overedge) and 600 (covering chainstitch). ISO 4916 classifies seam types, including superimposed, lapped, bound and flat seams. Naming the number removes the ambiguity that adjectives like \"strong\" or \"flat\" leave.",
        ],
      },
      {
        type: "table",
        heading: "Common stitches",
        intro: "What each does best. Stitch numbers are ISO 4915 types.",
        columns: ["Stitch", "Type", "What it does", "Where it is used"],
        rows: [
          ["Lockstitch", "301", "Two threads lock inside the fabric, so both sides look the same. Neat, but a broken stitch can unravel", "Topstitching, shirts, aprons, woven seams"],
          ["Double chainstitch", "401", "Two threads form a loop chain on the underside. More stretch and often more strength than lockstitch, and a seam that can run if it is cut", "Side seams of woven trousers and jeans, workwear"],
          ["Three-thread overlock", "504", "Trims the edge and encloses it in thread in one pass", "Edge finishing, light seaming of knits"],
          ["Safety stitch", "516", "An overlock with a parallel chainstitch, a stronger seam that is finished in one pass", "Woven seams in workwear"],
          ["Coverstitch", "602, 605", "Flat, stretchy stitching with thread on both sides", "Hems and neckbands on T-shirts and knits"],
          ["Flatlock", "607", "A flat seam, with no bulk of seam allowance", "Sportswear, seams against the skin"],
        ],
      },
      {
        type: "table",
        heading: "Common seams",
        columns: ["Seam", "How it is made", "Why it is chosen"],
        rows: [
          ["Plain (superimposed)", "Two pieces laid face to face and stitched together at the edge", "The simplest and most common join, often finished with an overlock"],
          ["Felled (lapped)", "Edges folded and lapped so the raw edges are enclosed, stitched in one or two rows", "Strong, flat and clean; used on workwear, jeans and shirts that are washed hard"],
          ["French", "A seam enclosed inside a second seam, with no raw edge showing", "A tidy finish on fine fabrics, where the raw edge would fray"],
          ["Bound", "A raw edge wrapped in a strip of fabric or tape", "Finishes an edge, and hides it, on unlined jackets and aprons"],
          ["Flat", "Edges butted or overlapped and stitched with no seam allowance", "Smooth against the skin and no bulk, for knitwear and sportswear"],
        ],
      },
      {
        type: "prose",
        heading: "Reinforcement: bartacks and stress points",
        body: [
          "Some points on a garment take far more strain than the rest: pocket corners, belt loops, strap ends, the base of a zip. A bartack is a short, dense block of stitching laid across such a point, and a back stitch at the start and end of a seam locks the thread so it cannot pull out. On an apron the points are pocket corners and mouths, and where the neck strap and waist ties are attached.",
          "Reinforcement belongs in the tech pack as positions, not as an adjective: which points, which stitch, and how many stitches in the bartack. A garment described as \"reinforced\" without positions is reinforced wherever each sewing operator decides.",
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        items: [
          { term: "Stitch type", detail: "The ISO number for each operation, or a clear description and a reference sample." },
          { term: "Seam type", detail: "Which seam joins which pieces, and which are finished with an overlock or bound." },
          { term: "Stitch density", detail: "Stitches per inch or centimetre for each operation. Too few and the seam is weak; too many can pucker light fabric." },
          { term: "Thread", detail: "The fibre (polyester thread is common for durability) and the thread size, matched to the fabric weight and the washing it must survive." },
          { term: "Seam allowance and topstitch width", detail: "Measured in millimetres, with a tolerance, so each lot matches." },
          { term: "Reinforcement", detail: "The positions and the stitch used for each bartack and for any back stitch." },
        ],
      },
      {
        type: "list",
        heading: "Common sewing defects",
        items: [
          { term: "Skipped or broken stitches", detail: "Gaps in the seam. A needle problem or thread tension, and a reason for a seam to open in the wash." },
          { term: "Puckering", detail: "The fabric gathers along the seam. Caused by tension, thread that is too heavy, or fabric that is too light for the stitch." },
          { term: "Uneven stitch density", detail: "The same seam sewn at different densities across a lot." },
          { term: "Open or slipped seams", detail: "Yarns pulling out of the fabric beside the stitching, common on slippery or loosely woven fabrics." },
          { term: "Loose thread ends", detail: "Untrimmed ends, a finishing defect that is easy to spot and to prevent." },
        ],
      },
    ],
    faqs: [
      { question: "What is the difference between lockstitch and chainstitch?", answer: "Lockstitch uses two threads that lock in the fabric and looks the same on both sides, but can unravel if broken. Chainstitch forms a chain of loops on the underside and is stretchier, though a cut seam can run." },
      { question: "What is a bartack?", answer: "A short, dense block of stitching across a stress point such as a pocket corner or strap end, to stop the seam pulling out." },
      { question: "What is an overlock?", answer: "A stitch that trims the fabric edge and encloses it in thread in one pass, used to finish edges and to seam knits." },
      { question: "How many stitches per inch is right?", answer: "It depends on the fabric, thread and garment, so it is agreed in the tech pack and checked against the approved sample rather than set by a general rule." },
    ],
    related: [
      { label: "Tech pack checklist", href: "/resources/tech-pack-checklist", description: "What a complete apparel specification contains." },
      { label: "Bib apron construction", href: "/resources/bib-apron-construction-guide", description: "Pockets, straps and stress points on an apron." },
      { label: "Garment inspection explained", href: "/resources/garment-inspection-explained", description: "What to check on the finished garment." },
      { label: "Cut and sew", href: "/manufacturing/cut-and-sew", description: "How a garment program moves through cutting and sewing." },
    ],
    seoTitle: "Stitch Types and Seams Explained",
    seoDescription:
      "Stitch types (ISO 4915) and seam types (ISO 4916) in garments: lockstitch, chainstitch, overlock, coverstitch, bartacks, and what a tech pack should state.",
  },

  /* ================================================================== */
  {
    slug: "decoration-methods-compared",
    category: "Buyer guide",
    title: "Screen Printing, Embroidery, DTF, Heat Transfer and Sublimation Compared",
    headline: "Decoration\nmethods compared.",
    intro:
      "Six ways of putting a logo on a garment, what each is best at and where each fails, and the approvals that stop a decoration surprise at bulk.",
    summary:
      "Screen printing suits simple, few-colour designs in volume. Embroidery suits small and medium logos on structured fabric and is the most durable look. DTF prints complex, multi-colour artwork on many fabrics. Heat transfer vinyl suits one or two colours on short runs. Sublimation works only on polyester and light colours. Direct-to-garment printing suits cotton in small runs. Approve a strike-off or sew-out on the real fabric, and wash it.",
    readingTime: "9 min read",
    updated,
    heroAsset: "photo.poloNavyEmbroidered",
    blocks: [
      {
        type: "table",
        heading: "The methods side by side",
        intro: "General properties of each process. Cost and durability depend on the fabric, the artwork and the supplier, so none is stated as a number.",
        columns: ["Method", "How it works", "Best for", "Limits", "What drives the cost"],
        rows: [
          ["Screen printing", "Ink is pressed through a mesh stencil, one screen per colour", "Simple artwork in a few flat colours, medium and large runs", "Each colour adds a screen and set-up; photographic artwork needs another method; dye can migrate from polyester", "Number of colours, run length, garment colour (underbase)"],
          ["Machine embroidery", "A design is stitched with thread through a backing", "Logos on polos, caps, aprons and jackets; the most durable and premium look", "No photographic detail; heavy on light fabric; fine detail needs a minimum size", "Stitch count, number of thread colours, digitising"],
          ["DTF (direct-to-film)", "Artwork is printed on film, coated with adhesive powder and heat-pressed", "Full-colour, detailed artwork on cotton, blends and polyester, with no screens", "Can feel like a layer on the surface; performance depends on the film and process", "Size and number of transfers"],
          ["Heat transfer vinyl", "Solid-colour vinyl is cut and pressed on", "One or two colours, names and numbers, very short runs", "Heavy over large areas; stretch fabrics can crack it; no fine gradients", "Size, colour count, weeding time"],
          ["Sublimation", "Dye is turned to gas by heat and bonds into polyester fibre", "Full-colour, all-over designs on white or light polyester", "Not on cotton or dark fabric; the garment must be polyester-based", "Size and run; set-up is small"],
          ["Direct-to-garment (DTG)", "An inkjet printer applies ink directly to the garment", "Detailed, many-colour artwork on cotton, small runs", "Best on cotton and light colours, a pre-treatment is often needed on dark; slower than screen printing at volume", "Size and ink coverage"],
        ],
      },
      {
        type: "list",
        heading: "Matching method to garment",
        items: [
          { term: "Aprons and uniforms washed often", detail: "Embroidery and well-made screen prints are the usual choices; any transfer should have wash-tested evidence for the laundering it will get." },
          { term: "Polo shirts and jackets", detail: "Embroidery for small chest logos on pique and structured fabrics; the stitch density and backing should suit the fabric." },
          { term: "Performance polyester", detail: "Sublimation for all-over designs on light fabric; a low-bleed ink for screen printing to avoid dye migration; a transfer for dark polyester." },
          { term: "T-shirts and promotional runs", detail: "Screen printing for simple art at volume; DTG or DTF where the design is detailed and the run is small." },
          { term: "Names and numbers", detail: "Heat transfer vinyl is common for short runs of individual marks." },
        ],
      },
      {
        type: "steps",
        heading: "Artwork and approvals",
        steps: [
          { title: "Supply vector artwork", body: "A logo as vector art (for example an editable PDF or SVG) prints and digitises cleanly; a low-resolution image does not." },
          { title: "Specify colours", body: "Give Pantone or other reference colours, not a screen colour, and say what tolerance is acceptable." },
          { title: "Specify placement", body: "The logo's size, and its position measured from a fixed point such as the collar seam or the pocket edge, in millimetres." },
          { title: "Approve a strike-off or sew-out", body: "A printed strike-off or an embroidered sew-out on the real fabric shows colour, size and hand before bulk is run." },
          { title: "Wash a sample", body: "Wash the approved sample under the program's laundering conditions and inspect it. Wash durability is a property to test, not to assume." },
        ],
      },
      {
        type: "list",
        heading: "Embroidery details worth knowing",
        items: [
          { term: "Digitising", detail: "The process of turning artwork into stitch instructions. The quality of the digitising decides how the logo looks, and is a one-time cost per design." },
          { term: "Stitch count", detail: "The number of stitches in a design. It drives sewing time and cost, and a dense design on light fabric can pucker." },
          { term: "Thread", detail: "Polyester thread is widely used for garments that are laundered often because it is colourfast and durable; rayon has more sheen. Specify which." },
          { term: "Backing", detail: "A stabiliser behind the fabric that keeps the stitching flat. The type should suit the fabric." },
        ],
      },
    ],
    faqs: [
      { question: "Is embroidery better than screen printing?", answer: "Neither is better in general. Embroidery is more durable and premium for small logos on structured fabric; screen printing is more economical for simple designs in volume and for large areas." },
      { question: "What is DTF printing?", answer: "Direct-to-film: artwork is printed onto a film, coated with adhesive powder and pressed onto the garment with heat. It handles full colour and fine detail on many fabrics." },
      { question: "Can you sublimate on cotton?", answer: "No. Sublimation dyes bond to polyester, so cotton does not hold the print. It also works only on white or light fabric." },
      { question: "Which method lasts longest in the wash?", answer: "It depends on the process and the laundering. Embroidery is generally the most durable look, but any method should be wash-tested on the real fabric before bulk." },
    ],
    related: [
      { label: "Embroidery vs screen printing", href: "/resources/embroidery-vs-screen-printing", description: "The two most-asked methods in detail." },
      { label: "Heat transfer vs screen print", href: "/resources/heat-transfer-vs-screen-print", description: "Transfers compared with ink on uniforms." },
      { label: "Embroidery", href: "/manufacturing/embroidery", description: "How embroidery fits into a development program." },
      { label: "Printing", href: "/manufacturing/printing", description: "How printing fits into a development program." },
    ],
    tools: [{ label: "Decoration method chooser", href: "/resources/calculators#decoration", description: "Which methods are worth asking about for your fabric and artwork." }],
    seoTitle: "Decoration Methods Compared",
    seoDescription:
      "Screen printing, embroidery, DTF, heat transfer, sublimation and DTG compared: what each does best, where each fails, and what drives cost.",
  },

  /* ================================================================== */
  {
    slug: "fob-vs-other-incoterms",
    category: "Commercial guide",
    title: "FOB vs FCA, EXW, CFR and CIF: Incoterms 2020 for Garment Buyers",
    headline: "FOB, FCA, EXW,\nCFR and CIF.",
    intro:
      "Who loads, who clears export, who pays the freight and where the risk passes, under the five Incoterms rules garment buyers meet most. And why FCA is often better than FOB for containers.",
    summary:
      "Incoterms rules say who does what and who bears risk at each stage of a shipment. Under FOB the seller delivers the goods on board the buyer's vessel at the named port and clears export, and risk passes when the goods are on board. Under EXW the buyer takes the goods at the seller's premises and clears export. FCA hands over to the buyer's carrier. CFR and CIF have the seller pay freight to the destination, but risk still passes at loading.",
    readingTime: "8 min read",
    updated,
    heroAsset: "export.cartonMarking",
    blocks: [
      {
        type: "prose",
        heading: "What Incoterms are",
        body: [
          "Incoterms are rules published by the International Chamber of Commerce (ICC) that define the obligations of a seller and a buyer in a sale of goods: who arranges transport and insurance, who handles export and import clearance, and where risk passes. The current edition is Incoterms 2020. They apply only if the contract says so, and the contract should name the rule, the edition and the place, for example \"FOB, named port, Incoterms 2020\".",
          "Three things are easy to confuse and must be kept apart. Who pays is one question. Where risk passes is another. Where the price stops is a third. Under CIF the seller pays for freight and insurance to the destination, yet the risk of loss passed to the buyer when the goods were loaded at origin.",
        ],
      },
      {
        type: "table",
        heading: "The five rules compared",
        intro: "A summary of the Incoterms 2020 allocation. The ICC's published rules are the authority, and the contract governs.",
        columns: ["Rule", "Transport mode", "Seller delivers", "Export clearance", "Main carriage paid by", "Risk passes"],
        rows: [
          ["EXW (Ex Works)", "Any", "At the seller's premises, goods placed at the buyer's disposal and not loaded", "Buyer", "Buyer", "When the goods are placed at the buyer's disposal"],
          ["FCA (Free Carrier)", "Any", "To the buyer's carrier at the named place, loaded if that place is the seller's premises", "Seller", "Buyer", "On delivery to the carrier"],
          ["FOB (Free On Board)", "Sea and inland waterway only", "On board the vessel the buyer nominated, at the named port of shipment", "Seller", "Buyer", "When the goods are on board"],
          ["CFR (Cost and Freight)", "Sea and inland waterway only", "On board the vessel; the seller also pays freight to the named destination port", "Seller", "Seller", "When the goods are on board at origin"],
          ["CIF (Cost, Insurance and Freight)", "Sea and inland waterway only", "As CFR, and the seller also buys minimum insurance cover", "Seller", "Seller", "When the goods are on board at origin"],
        ],
      },
      {
        type: "callout",
        heading: "Why FCA is often a better fit than FOB for containers",
        body:
          "FOB puts risk on the buyer when the goods are on board the vessel. A container is usually handed to the carrier at a terminal or depot before it is loaded, so the seller bears risk for a stretch that, under FOB, it can no longer control. The ICC's own guidance for Incoterms 2020 says FCA is more appropriate than FOB where goods are delivered to the carrier before they are on board, which is the normal case for containers. Many garment shipments still use FOB by custom, and either is workable when both sides understand the allocation.",
      },
      {
        type: "list",
        heading: "What a garment price includes under FOB",
        intro: "An FOB price is a price up to a point, and it ends there.",
        items: [
          { term: "Included", detail: "The garments, packing for export, delivery to the port, export clearance and loading on board the vessel the buyer has nominated." },
          { term: "Not included", detail: "Ocean freight, marine insurance, destination port charges, import clearance, duties and taxes, and delivery to the buyer's warehouse." },
          { term: "The buyer's part", detail: "Nominating the vessel or forwarder and telling the seller in time, paying the freight, and arranging cargo insurance if wanted." },
          { term: "Risk", detail: "Passes from the seller to the buyer when the goods are on board. After that, insurance is the buyer's protection." },
        ],
      },
      {
        type: "list",
        heading: "Choosing between them",
        items: [
          { term: "FOB", detail: "A buyer who books freight through its own forwarder and wants the supplier to deliver to the vessel. Common and well understood in garment sourcing." },
          { term: "FCA", detail: "The same arrangement for containerised cargo, with the handover at a named terminal or the supplier's premises." },
          { term: "EXW", detail: "A buyer that controls the whole chain, including export clearance. It leaves the buyer dependent on local arrangements, so it suits experienced importers." },
          { term: "CFR and CIF", detail: "A buyer that wants the seller to arrange the ocean leg. Remember that risk still passes at loading, and that CIF insurance is a minimum cover." },
        ],
      },
      {
        type: "callout",
        heading: "What this guide does not cover",
        body:
          "It does not give freight rates, import duties or customs requirements, because those differ by country, product and date. For the buyer's country, ask the customs authority or a licensed customs broker, and for the rules themselves use the ICC's published Incoterms 2020 text.",
      },
    ],
    faqs: [
      { question: "What does FOB mean?", answer: "Free On Board. The seller delivers the goods on board the vessel the buyer nominates at the named port, clears them for export and bears risk until they are on board. Ocean freight and insurance are the buyer's." },
      { question: "Is FOB only for sea freight?", answer: "Yes. FOB is intended for sea and inland waterway transport. For other modes, or for containers handed over before loading, FCA is the matching rule." },
      { question: "Who is responsible if goods are damaged at sea under FOB?", answer: "The buyer, because risk passed to the buyer when the goods were on board. This is why a buyer under FOB normally arranges cargo insurance." },
      { question: "What is the difference between CIF and FOB?", answer: "Under CIF the seller pays freight and minimum insurance to the destination port. Under FOB the buyer does. Under both, risk passes when the goods are on board at origin." },
    ],
    related: [
      { label: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", description: "What FOB means for an apparel order with AHM." },
      { label: "How FOB costing works", href: "/resources/how-fob-costing-works", description: "The cost lines inside an FOB price." },
      { label: "Export and shipping", href: "/export", description: "The Incoterms chain and the export process." },
      { label: "Export documents for apparel", href: "/resources/export-documents-for-apparel", description: "The documents that move a shipment." },
    ],
    tools: [{ label: "Incoterms chain", href: "/export#incoterms-heading", description: "Who pays and where risk passes, drawn as two different things." }],
    seoTitle: "FOB vs FCA, EXW, CFR and CIF",
    seoDescription:
      "FOB compared with EXW, FCA, CFR and CIF under Incoterms 2020: who loads, who clears export, who pays freight, and where risk passes.",
  },

  /* ================================================================== */
  {
    slug: "export-documents-for-apparel",
    category: "Commercial guide",
    title: "Export Documents for Apparel Shipments: Invoice, Packing List, Bill of Lading",
    headline: "The documents\nthat move a shipment.",
    intro:
      "What each shipping document is for, who issues it, and the one rule that prevents most delays: every document must agree with the others and with the order.",
    summary:
      "An apparel export shipment is moved by a small set of documents: the commercial invoice, the packing list, the transport document (bill of lading for sea freight), the export declaration, and, where required, a certificate of origin, insurance certificate or inspection certificate. They must agree with each other and with the purchase order. Requirements differ by country and shipment, so confirm them with the customs authority or a broker.",
    readingTime: "7 min read",
    updated,
    heroAsset: "export.cartonMarking",
    blocks: [
      {
        type: "table",
        heading: "The documents and what each does",
        intro: "The usual set for a sea shipment of garments. Which are required, and in what form, depends on the countries, the contract and any letter of credit.",
        columns: ["Document", "Issued by", "What it is for", "Must match"],
        rows: [
          ["Commercial invoice", "Seller", "States what was sold, to whom, at what price and on what terms. Customs uses it to assess duty", "The purchase order, the packing list and the contract terms"],
          ["Packing list", "Seller", "Lists the contents of each carton or pallet: quantities by style, colour and size, and weights and dimensions", "The invoice and the actual cartons"],
          ["Bill of lading (sea) or air waybill", "Carrier or its agent", "The contract of carriage and a receipt for the goods. A bill of lading can also be a document of title", "The invoice and packing list on description, quantity and parties"],
          ["Export declaration", "Seller or its customs agent, to the exporting country's customs", "Declares the goods for export and records the shipment with the authority", "The invoice and the goods actually shipped"],
          ["Certificate of origin", "A recognised issuing body, where required", "Certifies where the goods were made. Needed for some preferential duty arrangements and by some importers", "The origin stated on the invoice"],
          ["Insurance certificate", "Insurer or its agent", "Evidence of cargo insurance. Required when the seller insures, for example under CIF", "The goods, the value and the voyage"],
          ["Inspection or test certificate", "Inspection body or laboratory, where agreed", "Evidence of a pre-shipment inspection or a test result the contract requires", "The order and the lot shipped"],
        ],
      },
      {
        type: "callout",
        heading: "The one rule: documents must agree",
        body:
          "Most delays at customs, and most payment problems under a letter of credit, come from documents that disagree: a different quantity on the invoice and the packing list, a description that does not match, a consignee spelled two ways. Under a letter of credit the documents must comply with its terms exactly, so a small discrepancy can mean a refused payment. Prepare the documents from one data sheet.",
      },
      {
        type: "list",
        heading: "What to put on the commercial invoice",
        items: [
          { term: "Parties", detail: "The seller and the buyer, each with full legal name and address, and the consignee if different." },
          { term: "Order references", detail: "The purchase order number, the invoice number and date." },
          { term: "Goods", detail: "A clear description for each style, the fibre composition, the quantity and the unit price, and the total." },
          { term: "Terms", detail: "The Incoterms rule, the edition and the named place, and the currency and payment terms." },
          { term: "Classification", detail: "The Harmonized System (HS) code where used. The first six digits are international and countries add their own digits after that." },
          { term: "Origin and packing", detail: "The country of origin and the number of cartons and gross and net weights." },
        ],
      },
      {
        type: "prose",
        heading: "Classifying garments: the HS code",
        body: [
          "The Harmonized System, maintained by the World Customs Organization, is the international coding of goods used by customs worldwide. Garments fall mainly in two chapters: Chapter 61 covers apparel that is knitted or crocheted, and Chapter 62 covers apparel that is not. The right heading depends on the construction and the garment, and importing countries extend the code beyond six digits and attach their own duty rates.",
          "A wrong code can mean a wrong duty, a delayed shipment or a penalty, so the classification is agreed with the customs broker or checked with the authority, not copied from an earlier shipment of a different garment.",
        ],
      },
      {
        type: "steps",
        heading: "From packed goods to shipped",
        steps: [
          { title: "Confirm the order and the terms", body: "The purchase order, the Incoterms rule and any letter of credit conditions, in writing." },
          { title: "Finalise the packing data", body: "Cartons, quantities by size and colour, and weights and dimensions, in one data sheet." },
          { title: "Prepare the invoice and packing list", body: "From that one sheet, so they cannot disagree." },
          { title: "Book and hand over", body: "The buyer's forwarder or the seller's arrangement, according to the Incoterms rule." },
          { title: "File the export declaration", body: "With the exporting country's customs, and keep the evidence of export." },
          { title: "Send the originals as agreed", body: "The transport document and certificates to the buyer or the bank, in the form and number the contract states." },
        ],
      },
      {
        type: "callout",
        heading: "What this guide does not cover",
        body:
          "It does not state which documents or duties apply to any country. Requirements change and differ by product, route and trade agreement. Check with the customs authority of the importing and exporting countries, or a licensed customs broker.",
      },
    ],
    faqs: [
      { question: "What is the difference between a commercial invoice and a packing list?", answer: "The invoice states the sale and its price and is used to assess duty. The packing list lists what is in each carton, by style, colour and size, with weights and dimensions, and is used to check and handle the cargo." },
      { question: "What is a bill of lading?", answer: "The carrier's contract of carriage and receipt for sea cargo. A negotiable bill of lading is also a document of title to the goods." },
      { question: "Do I need a certificate of origin?", answer: "Only where the importing country, a trade agreement or the buyer requires it. Ask the buyer and the customs authority; it is not needed for every shipment." },
      { question: "What is an HS code?", answer: "A standard international code for classifying goods, used by customs worldwide. The first six digits are shared and countries add more. Apparel is mostly in Chapters 61 and 62." },
    ],
    related: [
      { label: "FOB vs other Incoterms", href: "/resources/fob-vs-other-incoterms", description: "Who does what under FOB, FCA, EXW, CFR and CIF." },
      { label: "Carton marking for apparel", href: "/resources/carton-marking-for-apparel", description: "What goes on the outside of a carton." },
      { label: "Export and shipping", href: "/export", description: "The export process and Incoterms chain." },
      { label: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", description: "What FOB means for an apparel order with AHM." },
    ],
    tools: [{ label: "Carton volume and container share", href: "/resources/calculators#cartons", description: "Cartons, cubic metres and share of a container." }],
    seoTitle: "Apparel Export Documents Explained",
    seoDescription:
      "The documents behind an apparel export shipment: invoice, packing list, bill of lading, export declaration, certificate of origin, and why they must agree.",
  },

  /* ================================================================== */
  {
    slug: "apron-types-and-specification",
    category: "Buyer guide",
    title: "Types of Aprons and How to Specify One",
    headline: "Aprons,\nspecified.",
    intro:
      "The main apron types, the strap and pocket options, and every measurement and choice a specification needs so that a factory builds the apron you meant.",
    summary:
      "The two basic aprons are the bib apron, which covers the chest and legs and hangs from a neck strap, and the waist apron, which ties at the waist and covers the legs. Beyond that, an apron is specified by its finished dimensions, strap and tie type, pockets, fabric weight and composition, colour, decoration and packing. Leaving a dimension out means the factory chooses it.",
    readingTime: "8 min read",
    updated,
    heroAsset: "products.apron.front",
    blocks: [
      {
        type: "table",
        heading: "The main types",
        columns: ["Type", "Cover", "How it is worn", "Often used for"],
        rows: [
          ["Bib apron", "Chest to below the knee", "A neck strap holds the bib; ties at the waist", "Kitchens, butchery, grocery counters, workshops, any job with splashes at the chest"],
          ["Waist apron (bistro, server)", "Waist to below the knee", "Ties around the waist, with no neck strap", "Table service, bars, front-of-house hospitality, light retail"],
          ["Cross-back apron", "As a bib apron", "Straps cross the back and fasten at the waist, so the weight sits on the shoulders", "Long shifts and heavier fabrics, where a neck strap would tire the wearer"],
        ],
      },
      {
        type: "table",
        heading: "Strap and tie options",
        columns: ["Option", "What it is", "Why choose it", "Watch for"],
        rows: [
          ["Adjustable neck strap", "A strap with a slide buckle to set the bib height", "Fits different wearers with one size", "Buckle quality and the strap attachment, which is a stress point"],
          ["Fixed neck loop", "A sewn loop of fixed length", "Simplest and cheapest, with no hardware", "Fits only a narrow range of wearers"],
          ["Cross-back straps", "Two straps crossing between the shoulder blades", "Spreads the load across the shoulders", "More fabric and more sewing"],
          ["Waist ties", "Ties sewn at the sides, long enough to wrap and tie in front or behind", "Secure and adjustable at the waist", "Length, width and where the tie is anchored"],
        ],
      },
      {
        type: "list",
        heading: "What a specification should state",
        intro: "Every item left out is a decision the factory makes for you.",
        items: [
          { term: "Finished dimensions", detail: "Length from the top of the bib to the hem, width at the hem and at the chest, bib height, each with a tolerance." },
          { term: "Straps and ties", detail: "The type, length and width, the hardware, and how and where each is attached." },
          { term: "Pockets", detail: "How many, their size, their position measured from a fixed point, whether divided, and whether the openings are reinforced." },
          { term: "Fabric", detail: "Fibre composition, weave, weight and its tolerance, and the finish. Ask for a swatch." },
          { term: "Colour", detail: "A reference colour or a lab dip, with the tolerance for matching across lots." },
          { term: "Decoration", detail: "The method, the size and the position of each logo, and the artwork." },
          { term: "Labels, packing and sizes", detail: "The labels and their positions, how the aprons are folded and packed, and the size offered if more than one." },
        ],
      },
      {
        type: "prose",
        heading: "What makes an apron different from other garments",
        body: [
          "An apron is worn over everything else, so it takes the splashes, the soil and often the harshest laundering of any garment in the program. That is why the construction points are stress points: the pocket corners, the strap attachments and the points where the ties are anchored. How these are reinforced is one of the clearest differences between a good apron and a weak one.",
          "Many apron programs use one size or two, so grading matters less than the dimensions of the single block, but it still has to suit the wearers. Fabric weight and fibre are chosen for the wash: a fabric that suits a pressed shirt may not survive an apron's laundering.",
        ],
      },
      {
        type: "callout",
        heading: "Ask the factory, do not assume",
        body:
          "Which strap hardware a factory sources, how it reinforces pockets and which decoration it runs in-house vary between factories. These are questions for the factory that will make your apron, and the answers belong in the approved sample.",
      },
    ],
    faqs: [
      { question: "What is the difference between a bib apron and a waist apron?", answer: "A bib apron covers the chest and hangs from a neck strap; a waist apron ties at the waist and covers only the legs. Bib aprons protect more; waist aprons are lighter and cooler." },
      { question: "What fabric is best for aprons?", answer: "It depends on the job and the wash. Poly-cotton twill and canvas are common for aprons that are laundered often; the weight and blend should be chosen for the soiling and the laundering, and tested." },
      { question: "How many pockets should an apron have?", answer: "That is a design choice: one divided pocket, two or three separate pockets, or none. Specify the number, size and position, and reinforce the corners." },
      { question: "What size is an apron?", answer: "Aprons are often supplied in one size or a small range. Specify the finished length and width, and the strap adjustment range, rather than a size name." },
    ],
    related: [
      { label: "Bib apron construction", href: "/resources/bib-apron-construction-guide", description: "Pockets, straps and stress points in detail." },
      { label: "Cotton vs poly-cotton aprons", href: "/resources/cotton-vs-poly-cotton-aprons", description: "Choosing the fabric for the wash." },
      { label: "Apron sourcing mistakes", href: "/resources/apron-sourcing-mistakes", description: "What goes wrong when aprons are bought on price." },
      { label: "Aprons", href: "/products/aprons", description: "Bib and waist aprons made to your specification." },
    ],
    seoTitle: "Types of Aprons and How to Specify",
    seoDescription:
      "Bib, waist and cross-back aprons compared, strap and tie options, and every dimension and choice a specification needs so a factory builds the apron you meant.",
  },

  /* ================================================================== */
  {
    slug: "workwear-fabric-by-job",
    category: "Buyer guide",
    title: "Choosing Workwear Fabric by Job: Kitchens, Facilities, Retail and Warehouse",
    headline: "Workwear,\nby the job.",
    intro:
      "What different kinds of work ask of a garment, what to prioritise for each, and why laundering and certification belong in the specification from the start.",
    summary:
      "Workwear is chosen by what the job does to the garment. Kitchens bring heat, grease and frequent hot washing. Facilities and maintenance work brings abrasion and movement. Retail and grocery work asks a garment to look right after many washes. Warehouse work brings movement and sometimes visibility requirements. Define the job, the wash regime and whether any protective standard applies before choosing a fabric.",
    readingTime: "8 min read",
    updated,
    heroAsset: "fabrics.polycottonTwill",
    blocks: [
      {
        type: "table",
        heading: "What the job asks of the garment",
        intro: "General directions, not specifications. The right fabric depends on the wearer, the climate and the laundering.",
        columns: ["Job", "What the garment faces", "What to prioritise", "Fabric directions to consider"],
        rows: [
          ["Kitchens and food service", "Heat, grease, splashes and frequent hot washing", "Easy care, stain release, shape retention, breathability", "Poly-cotton blends in twill or drill; light to medium weight; a stain-release finish tested after washing"],
          ["Facilities and maintenance", "Abrasion, kneeling, climbing, mixed indoor and outdoor work", "Abrasion resistance, freedom of movement, reinforcement at stress points", "Medium to heavy twill or drill; reinforced knees and pockets; stretch panels where movement needs it"],
          ["Retail and grocery", "Long hours, frequent washing, a customer-facing appearance", "Colour retention, low creasing, comfort", "Lighter blends and pique or poplin; colourfastness and shrinkage checked after laundering"],
          ["Warehouse and logistics", "Handling, repetitive movement, sometimes low light", "Durability, comfort, and visibility where required", "Durable twill or blend; high-visibility is a certified product class, not a colour choice"],
          ["Hospitality front of house", "Appearance first, with moderate soiling", "Drape, appearance after washing, comfort", "Lighter blends, crisp weaves; easy-care treatment checked for strength"],
        ],
      },
      {
        type: "list",
        heading: "Decide these before choosing a fabric",
        items: [
          { term: "How the garment is washed", detail: "Industrial laundering is hotter, longer and harsher than home washing, and it affects colour, shrinkage and finishes. State the regime and test to it." },
          { term: "How long it must last", detail: "A garment that must survive a hundred washes is a different fabric from one that is replaced each season. Say the number." },
          { term: "What it must look like at the end", detail: "Fading, pilling and shrinkage after wash decide how the uniform looks in the last month, not the first." },
          { term: "Whether comfort or durability leads", detail: "A heavier, denser fabric lasts longer and is hotter. The balance is a decision, and it can differ by role in one program." },
          { term: "The climate", detail: "Heat and humidity change what is comfortable. A fabric that works in a cool warehouse may not in a hot kitchen." },
        ],
      },
      {
        type: "list",
        heading: "Construction counts as much as cloth",
        items: [
          { term: "Reinforcement", detail: "Bartacks and doubled fabric at pockets, knees and seat, where wear concentrates." },
          { term: "Seams", detail: "Felled or double-stitched seams on trousers and jackets that are washed and worked hard." },
          { term: "Fit and movement", detail: "Gussets, pleats or stretch panels where the wearer bends and reaches." },
          { term: "Closures and trims", detail: "Zips, buttons and snaps rated for the washing, not only the wearing." },
        ],
      },
      {
        type: "callout",
        heading: "Protective clothing is a different category",
        body:
          "High-visibility, flame-resistant, chemical-protective and similar garments are certified products. Their fabric and their finished garment are tested to a named standard, and the standard depends on the market and the hazard. Nothing in this guide is a compliance statement. If your program needs protective performance, name the standard in the specification and ask for the test evidence before sampling.",
      },
    ],
    faqs: [
      { question: "What is the best fabric for kitchen uniforms?", answer: "Poly-cotton blends in twill or drill are widely used: they wash easily, keep their shape and handle grease better than pure cotton. Weight, finish and laundering should be tested for the specific program." },
      { question: "What fabric suits facilities workwear?", answer: "Medium to heavy twill or drill in a blend, with reinforcement at the knees and pockets, is a common direction. Abrasion resistance and freedom of movement lead the choice." },
      { question: "Is hi-vis clothing just a bright colour?", answer: "No. High-visibility clothing is certified to a standard that covers the colour, the reflective material and the garment design. A bright garment without certification is not high-visibility workwear." },
      { question: "How do I specify durability?", answer: "State the number of washes and the wash regime, and require tests for shrinkage, colourfastness, pilling and abrasion after that laundering." },
    ],
    related: [
      { label: "Poly-cotton for workwear", href: "/resources/poly-cotton-for-workwear", description: "How the blend ratio changes uniforms and aprons." },
      { label: "Sourcing uniforms from Pakistan", href: "/resources/sourcing-uniforms-from-pakistan", description: "How a uniform program is developed and shipped." },
      { label: "Fabric testing for buyers", href: "/resources/fabric-testing-for-buyers", description: "Which tests answer which questions." },
      { label: "Workwear for facilities", href: "/industries/facilities", description: "Garments for facilities and maintenance teams." },
    ],
    seoTitle: "Workwear Fabric by Job",
    seoDescription:
      "How to choose workwear fabric by what the job does to a garment: kitchens, facilities, retail, warehouse and hospitality, and why laundering matters.",
  },
];
