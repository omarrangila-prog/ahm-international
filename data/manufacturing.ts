import type { AssetKey } from "./assets";
import type { FaqItem } from "@/components/ui/Faq";

/**
 * MANUFACTURING STAGES
 * ====================
 *
 * Nine sub-pages under /manufacturing. Each exists because a buyer has a
 * genuinely different question at that stage — not because the URL contains a
 * keyword. Where a stage could not carry real content beyond a paragraph, it is
 * covered inside a related stage instead of given its own thin page.
 *
 * `whatGoesWrong` is the section competitors do not publish. Naming the common
 * failure and how it is prevented is the clearest evidence of first-hand
 * manufacturing experience a supplier site can offer, and it is the section a
 * sourcing manager actually reads.
 */

export type ManufacturingStage = {
  slug: string;
  index: number;
  /** Page H1 subject. */
  title: string;
  /** Nav and card label. */
  shortTitle: string;
  headline: string;
  intro: string;
  /** What physically happens. */
  process: string[];
  /** What the buyer provides or signs off. */
  buyerInputs: string[];
  /** What AHM produces at this stage. */
  outputs: string[];
  /** The common failure at this stage and how it is avoided. */
  whatGoesWrong: { problem: string; prevention: string }[];
  asset: AssetKey;
  supportingAssets: AssetKey[];
  faqs: FaqItem[];
  seoTitle: string;
  seoDescription: string;
};

export const manufacturingStages: ManufacturingStage[] = [
  {
    slug: "product-development",
    index: 1,
    title: "Product Development",
    shortTitle: "Product Development",
    headline: "Development is\nwhere cost is decided.",
    intro:
      "Development turns a reference garment, a sketch or a tech pack into a manufacturing specification the factory floor and your QA can both read the same way. Almost every avoidable cost in an apparel order is created or prevented here.",
    process: [
      "We review what you send (tech pack, reference garment, sketch or written requirement) and list what is missing before anything is quoted.",
      "Construction is resolved operation by operation: seam types, stitch density, closures, reinforcement and finishing.",
      "Materials are matched to the requirement, with alternatives identified where the first choice is likely to price badly.",
      "Measurements are established from your size specification or from an approved fit sample, then written with tolerances.",
      "Decoration, labelling and packing are specified at the same time, because all three affect cost and none should surface late.",
    ],
    buyerInputs: [
      "A tech pack, reference garment, sketch or written requirement",
      "Target quantity, colour count and size range",
      "Artwork for any embroidery, print or label",
      "Your target price, if you have one",
    ],
    outputs: [
      "Construction specification",
      "Bill of materials",
      "Measurement chart with tolerance",
      "Decoration and labelling specification",
      "Commercial FOB costing",
    ],
    whatGoesWrong: [
      {
        problem: "The tech pack leaves construction open, so the factory quotes defensively.",
        prevention:
          "We list the open points before quoting and resolve them with you, rather than pricing in a margin for the unknown.",
      },
      {
        problem: "Measurements are supplied without tolerance, so inspection has nothing to measure against.",
        prevention: "Tolerances are agreed at development and become part of the approved specification.",
      },
      {
        problem: "Decoration is decided after fabric approval and turns out not to sit correctly on the substrate.",
        prevention: "Decoration is specified alongside the fabric and approved on the bulk substrate before production.",
      },
    ],
    asset: "development.techPack",
    supportingAssets: ["development.pattern", "development.swatches", "development.measurement"],
    faqs: [
      {
        question: "Can you work from a sample garment instead of a tech pack?",
        answer:
          "Yes, and it is often more accurate. A physical garment answers construction questions a written specification usually leaves open. We measure it, document the construction and confirm the specification back to you before sampling.",
      },
      {
        question: "What if we don't have a size specification?",
        answer:
          "We develop one and confirm it with a size set before bulk. It is better to establish the chart at development than to discover a grading problem during inspection.",
      },
      {
        question: "Do you charge for development?",
        answer:
          "Development and sampling costs depend on the article, the materials and the amount of work involved. They are confirmed in writing with the quotation rather than published as a standard figure.",
      },
    ],
    seoTitle: "Apparel Product Development",
    seoDescription:
      "How a tech pack, sketch or reference garment becomes an executable manufacturing specification. Construction, materials and FOB costing.",
  },

  {
    slug: "fabric-sourcing",
    index: 2,
    title: "Fabric Sourcing",
    shortTitle: "Fabric Sourcing",
    headline: "The fabric decision\noutlives the order.",
    intro:
      "Fabric is usually the largest single line in an apparel cost and the hardest thing to change once a program is running. Sourcing it against the actual requirement, rather than against the nearest available roll, is what makes a reorder behave like the first shipment.",
    process: [
      "The requirement is defined first: composition, weight, hand feel, finish, colour and how the garment will be laundered.",
      "Options are presented against that requirement, with the commercial consequence of each stated rather than buried.",
      "Lab dips are submitted and approved against your colour standard before bulk fabric is committed.",
      "Bulk fabric is inspected on arrival for shade, weight, width and visible defects before anything is cut.",
    ],
    buyerInputs: [
      "Composition and weight, or the performance requirement the fabric has to meet",
      "Colour standard or a physical reference",
      "Laundering method, if the program is industrially washed",
      "Any nominated mill or fabric supplier",
    ],
    outputs: [
      "Fabric options with commercial implications",
      "Approved lab dips",
      "Incoming fabric inspection record",
    ],
    whatGoesWrong: [
      {
        problem: "Colour is approved on a swatch and then drifts across bulk lots.",
        prevention:
          "Shade is checked at incoming inspection and cut panels are bundled by shade lot, so a variation never reaches the sewing floor.",
      },
      {
        problem: "A fabric is selected on hand feel and then shrinks unacceptably in an industrial wash.",
        prevention:
          "Where the program is industrially laundered, shrinkage behaviour is confirmed against that wash cycle before approval.",
      },
      {
        problem: "The specified fabric prices far above target and the whole quotation is rejected.",
        prevention:
          "Alternatives are presented at the same time as the first choice, so cost engineering happens during development rather than after a failed quotation.",
      },
    ],
    asset: "factory.fabricInspection",
    supportingAssets: ["fabrics.polycottonTwill", "fabrics.cottonPique", "development.swatches"],
    faqs: [
      {
        question: "Can we nominate our own mill?",
        answer:
          "Yes. Where your program nominates a fabric supplier we work to it. Where it is open, we source against the requirement and present options.",
      },
      {
        question: "How is colour matched across knit and woven articles?",
        answer:
          "By approving them against each other rather than separately against the standard. Knit and woven fabrics take dye differently, so a program mixing both needs cross-approval to look consistent in the field.",
      },
      {
        question: "Do you offer recycled fabrics?",
        answer:
          "Recycled content is supplied only against mill documentation. We will not describe a fabric as recycled or certified without the certificate to evidence it.",
      },
    ],
    seoTitle: "Apparel Fabric Sourcing",
    seoDescription:
      "Sourcing apparel fabric against a specification: composition, weight, finish, lab dips, shade control and incoming inspection.",
  },

  {
    slug: "sampling",
    index: 3,
    title: "Sampling",
    shortTitle: "Sampling",
    headline: "Every round should\nclose something.",
    intro:
      "Sampling is where the specification is proven. Rounds that close specific written points converge; rounds that restart the conversation do not. Each sample AHM produces is made against a comment sheet, so approval moves forward instead of circling.",
    process: [
      "A proto sample proves the construction and the general idea.",
      "A fit sample confirms measurements against the approved chart, by size.",
      "A size set proves the grading across the range.",
      "A pre-production sample confirms bulk fabric, trims and decoration before the line starts.",
      "A shipment sample records what was actually produced.",
    ],
    buyerInputs: [
      "Written comments against each sample round",
      "Measurement feedback with the points you want changed",
      "Approval of the sealed sample before bulk",
    ],
    outputs: ["Proto, fit, size set and pre-production samples", "Comment sheets", "Sealed reference sample"],
    whatGoesWrong: [
      {
        problem: "Comments are given verbally, so the next sample addresses a different interpretation.",
        prevention: "Every round is produced against a written comment sheet that both sides hold.",
      },
      {
        problem: "The pre-production sample is skipped to save time, and a bulk material problem is found in the carton.",
        prevention:
          "The PP sample uses bulk fabric and trims specifically so material problems surface before the line runs, not after.",
      },
    ],
    asset: "development.sample",
    supportingAssets: ["development.measurement", "development.pattern", "factory.sewing"],
    faqs: [
      {
        question: "How many sample rounds are normal?",
        answer:
          "It depends on how resolved the specification is. A complete tech pack often reaches approval in fewer rounds than a sketch, because fewer questions are being answered by sample rather than on paper.",
      },
      {
        question: "How long does sampling take?",
        answer:
          "Sample timing depends on the article, whether the fabric is in stock or has to be developed, and the decoration involved. We confirm timing against your specification rather than quote a standard figure.",
      },
      {
        question: "What is a sealed sample?",
        answer:
          "The approved reference both sides work to. Once sealed, it is what bulk production is measured against and what inspection compares finished garments to.",
      },
    ],
    seoTitle: "The Apparel Sampling Process",
    seoDescription:
      "Proto, fit, size set, pre-production and shipment samples. Each produced against a written comment sheet so every round closes something.",
  },

  {
    slug: "cut-and-sew",
    index: 4,
    title: "Cut & Sew",
    shortTitle: "Cut & Sew",
    headline: "Consumption is\ncalculated, not guessed.",
    intro:
      "Cutting decides fabric consumption, which decides a large part of the FOB price. Assembly decides whether the garment matches the sealed sample. Both are run against approved documents rather than against habit.",
    process: [
      "Fabric is relaxed and inspected before laying, so shrinkage and defects are known.",
      "The lay is cut to a digitised marker, and consumption is calculated from the real marker rather than estimated.",
      "Cut panels are bundled and ticketed by size and shade lot to protect shade continuity.",
      "Assembly runs to the approved construction. Seam type, stitch density, thread and needle specification.",
      "Inline checks run at defined operations so a construction problem is caught while the batch can still be corrected.",
    ],
    buyerInputs: ["Approved sealed sample", "Approved measurement chart with tolerance", "Colour and size ratio breakdown"],
    outputs: ["Cut panels bundled by size and shade", "Assembled garments to the approved construction", "Inline inspection records"],
    whatGoesWrong: [
      {
        problem: "Panels from different shade lots are assembled into one garment, and the sleeve does not match the body.",
        prevention: "Bundles are ticketed by shade lot at cutting and kept together through assembly.",
      },
      {
        problem: "Consumption is estimated at quotation and the real marker uses more fabric.",
        prevention: "Costing is built from the digitised marker, which is why FOB pricing holds through to production.",
      },
      {
        problem: "A construction fault is found at final inspection, when the whole batch is already sewn.",
        prevention: "Checks are placed at defined operations during assembly rather than only at the end of the line.",
      },
    ],
    asset: "factory.cutting",
    supportingAssets: ["factory.sewing", "development.pattern", "factory.qualityControl"],
    faqs: [
      {
        question: "How is fabric consumption calculated?",
        answer:
          "From the digitised marker for the actual size ratio, not from an average. That is what makes the FOB price hold from quotation through to production.",
      },
      {
        question: "What stitch types do you work to?",
        answer:
          "Whatever the approved construction specifies. Lockstitch, overlock, coverstitch, felled seams, bar tacks. Stitch density and thread are part of the specification rather than a factory default.",
      },
    ],
    seoTitle: "Cut & Sew Garment Manufacturing",
    seoDescription:
      "Fabric relaxation, marker-based cutting, shade-lot bundling, approved construction and inline inspection at AHM International.",
  },

  {
    slug: "printing",
    index: 5,
    title: "Screen Printing",
    shortTitle: "Printing",
    headline: "Approve the strike-off,\nnot the promise.",
    intro:
      "A placement print has to survive the program's wash cycle and look identical on the last garment as on the first. Print type is selected against the fabric rather than applied uniformly, and it is approved on the bulk substrate before production.",
    process: [
      "Artwork is separated and screens are prepared to the approved colour standard.",
      "A strike-off is produced on the actual bulk fabric and approved for colour, hand feel, placement and size.",
      "Cure is confirmed, because an under-cured print fails in the wash rather than in the factory.",
      "Bulk printing runs against the approved strike-off, with checks through the run.",
    ],
    buyerInputs: ["Vector artwork or a print-ready file", "Colour references", "Placement and size specification"],
    outputs: ["Approved strike-off", "Bulk printed panels or garments", "Print inspection record"],
    whatGoesWrong: [
      {
        problem: "The print is approved on a swatch and behaves differently on the bulk fabric.",
        prevention: "Strike-offs are produced on the bulk substrate, not on a convenient sample of something similar.",
      },
      {
        problem: "The print cracks after a few industrial washes.",
        prevention:
          "Ink system and cure are selected for the fabric and the laundering method, and confirmed before bulk rather than assumed.",
      },
    ],
    asset: "factory.printing",
    supportingAssets: ["factory.embroidery", "development.trims", "factory.finishing"],
    faqs: [
      {
        question: "Screen print or heat transfer, which should we use?",
        answer:
          "Screen printing suits larger runs and gives a more durable result on cotton-rich fabric. Heat transfer suits small runs, complex colour and placements a screen cannot reach. Fabric, run size and wash requirements decide it, not preference.",
      },
      {
        question: "Can you print on performance polyester?",
        answer:
          "Yes, with an ink system selected to resist dye migration. Performance polyester is exactly the fabric where an unproven ink choice shows up later as discoloured print, so a strike-off on bulk fabric matters most here.",
      },
    ],
    seoTitle: "Screen Printing for Apparel",
    seoDescription:
      "Artwork separation, strike-off approval on bulk fabric, ink selection for the substrate and cure verification before production.",
  },

  {
    slug: "embroidery",
    index: 6,
    title: "Embroidery",
    shortTitle: "Embroidery",
    headline: "One logo,\nevery article.",
    intro:
      "In a uniform program the same mark has to reproduce identically on pique, on fleece and on woven twill. Three substrates that behave differently under a needle. Digitising and backing are selected per fabric, and a sew-out is approved before bulk.",
    process: [
      "Artwork is digitised into a stitch file for the specific fabric and logo size.",
      "Backing, density and thread are selected for the substrate.",
      "A sew-out is produced on the bulk fabric and approved for size, placement, colour and hand feel.",
      "Bulk embroidery runs against the approved sew-out, with checks through the run.",
    ],
    buyerInputs: ["Vector artwork", "Thread colour references", "Placement and size specification per article"],
    outputs: ["Digitised stitch file", "Approved sew-out", "Embroidered garments or panels"],
    whatGoesWrong: [
      {
        problem: "A logo digitised for woven fabric is run on fleece and sinks into the pile.",
        prevention: "Digitising and backing are selected per substrate, and each is approved on its own sew-out.",
      },
      {
        problem: "Dense stitching puckers a lightweight knit.",
        prevention:
          "Stitch density is set for the fabric weight, and where a logo is too dense for the substrate we say so at development rather than at inspection.",
      },
    ],
    asset: "factory.embroidery",
    supportingAssets: ["factory.printing", "products.polo.detail", "development.trims"],
    faqs: [
      {
        question: "Do you charge a digitising fee?",
        answer:
          "Digitising is a one-off setup per logo and article. Costs are confirmed with the quotation rather than published as a standard figure, because they depend on the logo complexity and the number of substrates.",
      },
      {
        question: "Can the same logo be used across every article in a program?",
        answer:
          "The artwork stays the same, but the stitch file usually should not. Each substrate gets digitising and backing suited to it, which is what makes the finished logo look consistent across the program.",
      },
    ],
    seoTitle: "Logo Embroidery for Uniform Apparel",
    seoDescription:
      "Digitising per substrate, backing and density selection, and sew-out approval on bulk fabric across a uniform program.",
  },

  {
    slug: "quality-control",
    index: 7,
    title: "Quality Control",
    shortTitle: "Quality Control",
    headline: "Inspection that can\nstill change something.",
    intro:
      "Quality control that only happens at the end can reject a shipment but cannot save one. Inspection at AHM runs across incoming material, pre-production, inline assembly, measurement, finishing and packing. The points where a problem is still correctable.",
    process: [
      "Incoming fabric and trims are checked for shade, weight, width and visible defects before cutting.",
      "A pre-production sample confirms bulk materials and construction against the sealed sample.",
      "Inline checks run at defined operations during assembly.",
      "Garments are measured against the approved chart and tolerance, by size, across the run.",
      "Finishing inspection covers appearance, decoration, labelling, trimming and pressing.",
      "Packing verification confirms assortment, ratio, carton contents and marking.",
    ],
    buyerInputs: [
      "Approved sealed sample and measurement chart",
      "Your inspection standard, defect classification or nominated third-party inspector",
      "Packing instruction and carton marking artwork",
    ],
    outputs: ["Inspection records at each stage", "Measurement reports", "Final release against the agreed standard"],
    whatGoesWrong: [
      {
        problem: "A defect class is disputed at final inspection because no standard was agreed.",
        prevention:
          "The inspection standard is confirmed in writing before production. We work to your standard rather than to one we chose.",
      },
      {
        problem: "Measurements pass on the sample and drift across the run.",
        prevention: "Measurement is checked by size across the run, not once at the start.",
      },
    ],
    asset: "factory.qualityControl",
    supportingAssets: ["development.measurement", "factory.finishing", "factory.fabricInspection"],
    faqs: [
      {
        question: "What AQL level do you work to?",
        answer:
          "Whatever your program specifies. We do not publish an inspection level as a general claim, because the meaningful answer is the standard agreed in writing for your order, including the defect classification and whether a third-party inspector is involved.",
      },
      {
        question: "Can we send our own inspector?",
        answer:
          "Yes. Third-party and buyer inspections are routine, and the inspection standard is confirmed before production so there is no dispute about the criteria on the day.",
      },
    ],
    seoTitle: "Apparel Quality Control & Inspection",
    seoDescription:
      "Incoming material checks, pre-production approval, inline inspection, measurement verification, finishing and packing checks.",
  },

  {
    slug: "packing",
    index: 8,
    title: "Packing",
    shortTitle: "Packing",
    headline: "Cartons that match\nthe packing list.",
    intro:
      "Packing is where an otherwise correct order gets rejected at a distribution centre. Assortment, ratio, labelling and carton marking are specified before production and verified before sealing.",
    process: [
      "Garments are folded or hung, and polybagged to your instruction.",
      "Cartons are ratio-packed or solid-packed as specified.",
      "Carton marking and any retailer-specific labelling is applied to your artwork.",
      "Carton dimensions and weights are recorded for the shipping documents.",
      "Contents are verified against the packing instruction before the carton is sealed.",
    ],
    buyerInputs: [
      "Packing instruction: fold or hang, ratio or solid pack",
      "Carton marking artwork and any retailer labelling requirement",
      "Barcode or SKU data where the program requires it",
    ],
    outputs: ["Packed and marked cartons", "Packing list with carton dimensions and weights", "Packing verification record"],
    whatGoesWrong: [
      {
        problem: "The carton contents do not match the packing list and the DC rejects the delivery.",
        prevention: "Contents are verified against the packing instruction before sealing, and recorded.",
      },
      {
        problem: "Carton marking is applied late and delays dispatch.",
        prevention: "Marking artwork is confirmed during development, alongside labelling, rather than at packing.",
      },
    ],
    asset: "factory.packing",
    supportingAssets: ["export.cartonMarking", "export.cartons", "factory.finishing"],
    faqs: [
      {
        question: "Can you pack to a retailer's specific requirement?",
        answer:
          "Yes. Retailer packing and marking requirements are worked to as supplied. They should be shared at development, because they often affect carton sizing and therefore freight cost.",
      },
      {
        question: "Do you supply barcodes and retail labelling?",
        answer:
          "We apply the labelling your program specifies, using the data and artwork you supply. We do not generate barcode data ourselves.",
      },
    ],
    seoTitle: "Export Packing & Carton Marking",
    seoDescription:
      "Folding, polybagging, ratio and solid packs, carton marking to your artwork, and packing verification before sealing.",
  },

  {
    slug: "fob-export",
    index: 9,
    title: "FOB Export",
    shortTitle: "FOB Export",
    headline: "Documented FOB\nfrom Port Qasim.",
    intro:
      "AHM International has documented FOB apparel export experience from Port Qasim, Karachi to the United States. FOB means responsibility transfers to you once the goods are on board, and everything up to that point is ours.",
    process: [
      "Commercial documentation is prepared: commercial invoice, packing list and the export documents required for the shipment.",
      "Cartons are packed, marked and sealed to your packing instruction, with dimensions and weights recorded.",
      "Booking is coordinated with your nominated freight forwarder.",
      "Goods are delivered and cleared for export at Port Qasim.",
      "Documents are released against your instruction and responsibility transfers on board.",
    ],
    buyerInputs: [
      "Nominated freight forwarder and shipping instructions",
      "Destination port and required delivery window",
      "Any documentation your import process requires",
    ],
    outputs: ["Commercial invoice and packing list", "Marked and sealed export cartons", "FOB handover at Port Qasim"],
    whatGoesWrong: [
      {
        problem: "Documentation does not match the physical shipment and clearance is delayed.",
        prevention: "Carton dimensions and weights are recorded at packing and the documents are built from that record.",
      },
      {
        problem: "The buyer assumes FOB includes freight and insurance.",
        prevention:
          "The scope is stated plainly up front: under FOB, freight and insurance from the port onward are the buyer's responsibility.",
      },
    ],
    asset: "export.containerLoading",
    supportingAssets: ["export.cartons", "export.cartonMarking", "export.warehouse"],
    faqs: [
      {
        question: "What is the difference between FOB, EXW and CIF?",
        answer:
          "Under EXW you collect from the factory and carry everything from there. Under FOB the manufacturer delivers the goods on board at the named port and you take over freight and insurance. Under CIF the manufacturer also arranges and pays freight and insurance to the destination port. AHM supplies FOB.",
      },
      {
        question: "Which port do you ship from?",
        answer: "Port Qasim, Karachi. The port AHM has documented export experience shipping from.",
      },
      {
        question: "Can we use our own freight forwarder?",
        answer:
          "Yes. Under FOB the forwarder is normally your nomination, and we coordinate the booking and document release with them.",
      },
    ],
    seoTitle: "FOB Export Process & Handover",
    seoDescription:
      "Commercial documentation, export packing, carton marking, forwarder coordination and FOB handover at Port Qasim, Karachi.",
  },
];

export function getManufacturingStage(slug: string) {
  return manufacturingStages.find((s) => s.slug === slug);
}
