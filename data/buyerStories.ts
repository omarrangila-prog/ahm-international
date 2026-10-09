/**
 * BUYER TEACHING SCENARIOS
 * ========================
 *
 * Composite stories for education — not published customer programs.
 *
 * They must never enter `caseStudies[]`, never carry a customer identity, and
 * always surface `BUYER_STORY_DISCLAIMER` in the UI. Themes are drawn from
 * common sourcing failure modes (shade, shrinkage, quotation mismatch, knit
 * construction), written in AHM voice without inventing capacity or wins.
 */

export const BUYER_STORY_DISCLAIMER =
  "Teaching scenario — not a published customer program. Composite situations for education; no customer is identified and no order is claimed." as const;

export type BuyerStoryLink = {
  label: string;
  href: string;
  description: string;
};

export type BuyerStory = {
  slug: string;
  title: string;
  theme: string;
  /** One-line hook for cards. */
  hook: string;
  /** Opening stakes. */
  situation: string;
  /** What went wrong or what was at risk. */
  failure: string;
  /** The correction a careful buyer makes. */
  correction: string;
  /** What to put in the next brief. */
  takeaway: string;
  related: BuyerStoryLink[];
  seoTitle: string;
  seoDescription: string;
};

export const buyerStories: BuyerStory[] = [
  {
    slug: "polo-shade-on-reorder",
    title: "When the reorder navy is not the same navy",
    theme: "Colour & dyeing",
    hook: "A perfect first shipment and a second lot that looks wrong under store lighting.",
    situation:
      "A uniform polo program ships clean on the first dye lot. Six months later the reorder arrives: same style number, same ‘navy’ on the purchase order, different shade under the retailer’s fluorescent lights. The first lot is still hanging in stores.",
    failure:
      "The colour standard was a name, not a retained lab dip. Heat transfers on the first lot were qualified on a cotton substitute. The second dye lot was within a verbal ‘close enough’ but never measured against a physical standard under an agreed light source.",
    correction:
      "Approve a lab dip under a named illuminant. Retain the sealed standard with the purchase order. Qualify decoration on the bulk fibre. Write a lot-to-lot tolerance before the second booking, not after goods-in.",
    takeaway:
      "Polyester-rich polos need disperse-dye discipline and a physical colour agreement. A colour name is not a standard.",
    related: [
      {
        label: "Polyester dyeing for buyers",
        href: "/resources/polyester-dyeing-for-buyers",
        description: "Lab dips, heat and lot-to-lot shade.",
      },
      {
        label: "Materials",
        href: "/materials",
        description: "Constructions and finishes for program fabrics.",
      },
      {
        label: "Tech pack checklist",
        href: "/resources/tech-pack-checklist",
        description: "Where the colour standard belongs.",
      },
    ],
    seoTitle: "Polo Shade on Reorder — Buyer Scenario",
    seoDescription:
      "Teaching scenario: why a uniform polo reorder can miss shade, and what to put in the colour standard before the second dye lot.",
  },
  {
    slug: "shrinkage-after-first-wash",
    title: "The sealed sample that failed the first laundry",
    theme: "Shrinkage",
    hook: "Fit approved on the hanger, rejected after industrial wash day one.",
    situation:
      "A woven shirt program seals a fit sample that measures to spec. The first industrial laundry shortens the body and pulls the collar. The sealed sample was never washed the way the field washes.",
    failure:
      "Shrinkage was discussed as ‘low’ without length and width percentages, without a named wash method, and without saying whether the pattern already carried allowance. Inspection compared bulk to an unwashed sealed sample.",
    correction:
      "Specify residual shrinkage separately for length and width against the wash the garment will see. Decide whether the pattern is compensated. Use the shrinkage calculator to translate before/after measurements into percentages the factory can work to.",
    takeaway:
      "Dimensional change is two numbers and a test method — not a slogan on a mill card.",
    related: [
      {
        label: "Fabric shrinkage guide",
        href: "/resources/fabric-shrinkage-guide",
        description: "How to specify length vs width.",
      },
      {
        label: "Shrinkage calculator",
        href: "/materials#shrinkage-heading",
        description: "Work the percentage from measurements.",
      },
      {
        label: "Sampling process",
        href: "/resources/apparel-sampling-process",
        description: "What each sample is actually for.",
      },
    ],
    seoTitle: "Shrinkage After First Wash",
    seoDescription:
      "Teaching scenario: why a sealed sample can fail the first industrial wash, and how to specify residual shrinkage properly.",
  },
  {
    slug: "quotation-that-wasnt-comparable",
    title: "The cheaper FOB that was answering a different question",
    theme: "Costing",
    hook: "Two prices for ‘the same polo’ — until fabric weight and pack were named.",
    situation:
      "A buyer spreadsheets three FOB quotations. Supplier B is fifteen percent cheaper. The program awards B. At PP sample the fabric is lighter, the pack is solid instead of store ratio, and embroidery was never in the price.",
    failure:
      "The brief left fabric weight as a range, decoration as ‘logo included’, and packing unspecified. Each factory answered a different question honestly. The spreadsheet compared the answers as if they were the same.",
    correction:
      "Normalise trade term, fabric specification, decoration route, packing and quantity before comparing. Ask every supplier what the price assumes. Fabric metres come from the marker — not from a GSM shortcut.",
    takeaway:
      "A lower FOB is only a saving when it answers the same specification.",
    related: [
      {
        label: "Comparing quotations",
        href: "/resources/compare-apparel-quotations",
        description: "Five things to normalise first.",
      },
      {
        label: "Fabric consumption basics",
        href: "/resources/fabric-consumption-basics",
        description: "Why metres are not a weight formula.",
      },
      {
        label: "How FOB costing works",
        href: "/resources/how-fob-costing-works",
        description: "What sits inside a commercial FOB.",
      },
    ],
    seoTitle: "Incomparable Quotations — Buyer Scenario",
    seoDescription:
      "Teaching scenario: why the cheapest FOB often answered a different brief, and how to normalise quotations before awarding.",
  },
  {
    slug: "jersey-polo-that-lost-its-collar",
    title: "Soft in the hand, collapsed after fifty washes",
    theme: "Knit construction",
    hook: "Jersey felt better in the showroom. Pique held the program on the floor.",
    situation:
      "A retail team chooses single jersey for a ‘softer’ uniform polo. The first season looks fine. By wash cycle fifty the collar rolls, the placket gaps, and store managers ask for the old pique back.",
    failure:
      "Construction was treated as a marketing preference. The collar was assumed to follow the body fabric. GSM was matched to the previous pique without naming the knit structure.",
    correction:
      "Name the construction — jersey, pique, rib — in the tech pack. Specify collar and cuff as their own knit. Compare constructions on published fields, not only on hand feel in a meeting room.",
    takeaway:
      "Softness is not fitness for a wash-heavy uniform program.",
    related: [
      {
        label: "Knit constructions explained",
        href: "/resources/knit-constructions-explained",
        description: "Jersey, pique, rib and fleece at buyer level.",
      },
      {
        label: "Pique vs jersey",
        href: "/resources/pique-vs-jersey-polo-fabric",
        description: "The construction choice most polos turn on.",
      },
      {
        label: "Fabric compare",
        href: "/materials#compare-heading",
        description: "Put two constructions on the same table.",
      },
    ],
    seoTitle: "Jersey Polo Collar Failure",
    seoDescription:
      "Teaching scenario: why a soft jersey polo can lose its collar in a uniform program, and how to specify knit construction.",
  },
];

export function getBuyerStory(slug: string) {
  return buyerStories.find((s) => s.slug === slug);
}
