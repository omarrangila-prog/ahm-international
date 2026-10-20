import { guides } from "./guides";
import { glossary } from "./glossary";

/**
 * APPAREL KNOWLEDGE CENTER: the model behind /resources.
 *
 * Topics are subject clusters, not landing pages. A guide declares which
 * topics it belongs to here, in one place, so a topic's page, its counts, the
 * search filter and the related-reading list cannot disagree. tests/
 * knowledge.test.ts fails the build if a guide has no topic or a topic names a
 * guide that does not exist.
 *
 * Search Console queries are grouped by what the searcher wants, not by how
 * they phrased it. Several phrasings of one question map to one page; a page
 * per phrasing would be near-duplicate content competing with itself.
 */

export type TopicId =
  | "fabric-science"
  | "apparel-manufacturing"
  | "apron-manufacturing"
  | "uniforms-workwear"
  | "printing-embroidery"
  | "quality-control"
  | "import-export"
  | "sourcing-procurement"
  | "textile-education"
  | "product-comparisons";

export type Topic = { id: TopicId; name: string; blurb: string };

/** Order is editorial: the subjects buyers arrive for first. */
export const topics: Topic[] = [
  { id: "fabric-science", name: "Fabric Science", blurb: "Weight, construction, fibre, shrinkage and finish: what a fabric will do." },
  { id: "apparel-manufacturing", name: "Apparel Manufacturing", blurb: "From tech pack to sample to bulk: how garments are developed and made." },
  { id: "apron-manufacturing", name: "Apron Manufacturing", blurb: "Construction, fabric and sourcing for bib and waist aprons." },
  { id: "uniforms-workwear", name: "Uniforms and Workwear", blurb: "Fabrics, fit and programs for staff who wear the garment all day." },
  { id: "printing-embroidery", name: "Printing and Embroidery", blurb: "Choosing a decoration method, and what each does to the garment." },
  { id: "quality-control", name: "Quality Control", blurb: "Inspection, sample evaluation and what to measure before shipment." },
  { id: "import-export", name: "Import and Export", blurb: "FOB, packing, marking and the documents that move a shipment." },
  { id: "sourcing-procurement", name: "Sourcing and Procurement", blurb: "Evaluating suppliers, comparing quotations and placing the order." },
  { id: "textile-education", name: "Textile Education", blurb: "Definitions and fundamentals for students and new buyers." },
  { id: "product-comparisons", name: "Product Comparisons", blurb: "Two options side by side, and how to choose between them." },
];

/** Every published guide, and the topics it serves. */
export const guideTopics: Record<string, TopicId[]> = {
  "tech-pack-checklist": ["apparel-manufacturing", "sourcing-procurement"],
  "how-fob-costing-works": ["import-export", "sourcing-procurement"],
  "poly-cotton-for-workwear": ["fabric-science", "uniforms-workwear"],
  "pique-vs-jersey-polo-fabric": ["fabric-science", "product-comparisons"],
  "fabric-gsm-guide": ["fabric-science", "textile-education"],
  "apparel-sampling-process": ["apparel-manufacturing", "quality-control"],
  "embroidery-vs-screen-printing": ["printing-embroidery", "product-comparisons"],
  "compare-apparel-quotations": ["sourcing-procurement"],
  "carton-marking-for-apparel": ["import-export"],
  "fabric-shrinkage-guide": ["fabric-science", "quality-control"],
  "polyester-dyeing-for-buyers": ["fabric-science"],
  "fabric-consumption-basics": ["apparel-manufacturing", "sourcing-procurement"],
  "knit-constructions-explained": ["fabric-science", "textile-education"],
  "understanding-apparel-moq": ["sourcing-procurement"],
  "heat-transfer-vs-screen-print": ["printing-embroidery", "product-comparisons"],
  "bib-apron-construction-guide": ["apron-manufacturing", "apparel-manufacturing"],
  "how-to-choose-an-apron-manufacturer": ["apron-manufacturing", "sourcing-procurement"],
  "apron-sourcing-mistakes": ["apron-manufacturing", "sourcing-procurement"],
  "cotton-vs-poly-cotton-aprons": ["apron-manufacturing", "fabric-science", "product-comparisons"],
  "garment-inspection-explained": ["quality-control"],
  "evaluating-apparel-samples": ["quality-control", "sourcing-procurement"],
  "sourcing-uniforms-from-pakistan": ["uniforms-workwear", "sourcing-procurement", "import-export"],
};

/** The glossary's own groups, mapped onto topics. Every term is also Textile Education. */
const glossaryGroupTopic: Record<string, TopicId> = {
  Specification: "apparel-manufacturing",
  Materials: "fabric-science",
  Sampling: "apparel-manufacturing",
  Quality: "quality-control",
  Commercial: "sourcing-procurement",
  Export: "import-export",
};

export type KnowledgeKind = "guide" | "tool" | "term" | "page";

export type KnowledgeEntry = {
  id: string;
  kind: KnowledgeKind;
  title: string;
  href: string;
  summary: string;
  topics: TopicId[];
  /** Extra words a searcher might use that the title does not contain. */
  aliases: string[];
  /** Headings and questions the page answers; searched, not displayed. */
  text: string;
  /** Pages that sell rather than explain, so results can say so. */
  commercial?: boolean;
};

/** Calculators and explorers. They live on pages, so each has its own anchor. */
const tools: KnowledgeEntry[] = [
  { id: "tool-gsm", kind: "tool", title: "GSM calculator", href: "/materials#gsm-heading", summary: "Convert gsm and oz/yd², weigh a swatch, size a roll.", topics: ["fabric-science", "textile-education"], aliases: ["gsm converter", "oz to gsm", "gsm to oz", "fabric weight calculator", "swatch weight", "roll weight"], text: "convert weigh swatch roll weight formula" },
  { id: "tool-shrinkage", kind: "tool", title: "Shrinkage calculator", href: "/materials#shrinkage-heading", summary: "Length and width shrinkage from before and after measurements.", topics: ["fabric-science", "quality-control"], aliases: ["fabric shrinkage", "wash shrinkage", "shrink percentage"], text: "length width percentage wash" },
  { id: "tool-compare", kind: "tool", title: "Fabric compare", href: "/materials#compare-heading", summary: "Put two constructions side by side on the published fields.", topics: ["fabric-science", "product-comparisons"], aliases: ["compare fabrics", "fabric comparison"], text: "weight composition construction" },
  { id: "tool-handfeel", kind: "tool", title: "Hand-feel factors", href: "/materials#handfeel-heading", summary: "Same weight, different cloth: the factors behind how a fabric feels.", topics: ["fabric-science", "textile-education"], aliases: ["fabric feel", "softness", "drape"], text: "same weight different cloth" },
  { id: "tool-incoterms", kind: "tool", title: "Incoterms chain", href: "/export#incoterms-heading", summary: "Who pays and where risk passes, drawn as two different things.", topics: ["import-export"], aliases: ["incoterms", "fob vs cif", "fob vs cfr", "fob vs exw", "who pays freight", "risk transfer"], text: "fob cfr cif dap risk cost buyer seller" },
];

/** Pages that explain AHM or sell: findable, and marked as commercial. */
const pages: KnowledgeEntry[] = [
  { id: "page-fob", kind: "page", title: "FOB apparel manufacturing", href: "/fob-apparel-manufacturing", summary: "What FOB means for a garment order, and how AHM quotes and ships it.", topics: ["import-export", "sourcing-procurement"], aliases: ["fob manufacturing", "fob production", "fob garment", "free on board"], text: "fob karachi port qasim quotation", commercial: true },
  { id: "page-aprons", kind: "page", title: "Aprons", href: "/products/aprons", summary: "Bib and waist aprons made to your specification.", topics: ["apron-manufacturing"], aliases: ["custom aprons", "apron manufacturer", "bib apron", "waist apron"], text: "bib waist hospitality construction pockets", commercial: true },
  { id: "page-workwear", kind: "page", title: "Uniforms and workwear", href: "/products/uniform-workwear", summary: "Work shirts, trousers, jackets and uniforms made to buyer specification.", topics: ["uniforms-workwear"], aliases: ["workwear manufacturer", "uniform manufacturer"], text: "shirts trousers jackets", commercial: true },
  { id: "page-facilities", kind: "page", title: "Workwear for facilities", href: "/industries/facilities", summary: "Durability and identification across mixed indoor and outdoor work: jackets, shirts, trousers and fleece.", topics: ["uniforms-workwear"], aliases: ["facilities management workwear", "facility management uniform", "maintenance uniform", "cleaning staff uniform"], text: "maintenance cleaning durability", commercial: true },
  { id: "page-materials", kind: "page", title: "Materials and fabrics", href: "/materials", summary: "Construction families, typical weights, finishes and applications.", topics: ["fabric-science"], aliases: ["fabric guide", "fabric types"], text: "constructions weights finishes", commercial: true },
  { id: "page-glossary", kind: "page", title: "Sourcing glossary", href: "/resources/glossary", summary: "The terms a buyer has to use correctly in a specification.", topics: ["textile-education"], aliases: ["apparel terms", "textile terms", "dictionary"], text: "definitions terms" },
  { id: "page-techpack", kind: "page", title: "Send a tech pack", href: "/send-tech-pack", summary: "Upload a specification for review.", topics: ["sourcing-procurement"], aliases: ["submit tech pack"], text: "upload specification", commercial: true },
  { id: "page-quote", kind: "page", title: "Request an FOB quote", href: "/request-a-quote", summary: "Send a specification and request an FOB costing.", topics: ["sourcing-procurement", "import-export"], aliases: ["rfq", "quotation", "get a quote"], text: "rfq quotation", commercial: true },
];

/** Plain-language mentions of a term, used to give each entry search text. */
const headingsOf = (g: (typeof guides)[number]) =>
  [
    g.title,
    ...g.blocks.flatMap((b) => [
      b.heading,
      // The short labels a reader scans for: list terms and the first column of a table.
      ...(b.type === "list" ? b.items.map((i) => i.term) : []),
      ...(b.type === "table" ? b.rows.map((r) => r[0]) : []),
    ]),
    ...g.faqs.map((f) => f.question),
  ].join(" · ");

export function knowledgeEntries(): KnowledgeEntry[] {
  const guideEntries: KnowledgeEntry[] = guides.map((g) => ({
    id: `guide-${g.slug}`,
    kind: "guide",
    title: g.title,
    href: `/resources/${g.slug}`,
    summary: g.intro,
    topics: guideTopics[g.slug] ?? [],
    aliases: queryAliases[g.slug] ?? [],
    text: headingsOf(g),
  }));
  const termEntries: KnowledgeEntry[] = glossary.map((t) => ({
    id: `term-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    kind: "term",
    title: t.term,
    href: `/resources/glossary#term-${t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    summary: t.definition,
    topics: [glossaryGroupTopic[t.group] ?? "textile-education", "textile-education"],
    aliases: [],
    text: t.confusedWith ?? "",
  }));
  return [...guideEntries, ...tools, ...pages, ...termEntries];
}

/**
 * Search Console queries, grouped by intent, each answered by one page.
 *
 * Source: the owner's Search Console export of October 2026, which gave query
 * text only: no impressions, clicks or positions. Nothing here claims a volume
 * or a rank. `target` is where the group is answered, and the entry with that
 * href is boosted to the top of search for any of the phrasings.
 */
export const queryGroups: { intent: string; target: string; queries: string[]; note: string }[] = [
  {
    intent: "What GSM means, and how to read it",
    target: "/resources/fabric-gsm-guide",
    queries: ["gsm materials", "fabric gsm guide", "gsm meaning in fabric", "meaning of gsm in fabric", "what is gsm material", "what is gsm in fabric", "material gsm", "gsm fabric", "what is gsm", "gsm meaning"],
    note: "One question in many phrasings. One authoritative guide, with the calculator linked from it.",
  },
  {
    intent: "FOB as a manufacturing and pricing basis",
    target: "/fob-apparel-manufacturing",
    queries: ["fob manufacturing", "fob production", "fob garment manufacturing", "fob apparel"],
    note: "The commercial page answers it; /resources/how-fob-costing-works and the Incoterms chain on /export go deeper.",
  },
  {
    intent: "Poly-cotton for work garments",
    target: "/resources/poly-cotton-for-workwear",
    queries: ["poly cotton workwear", "polycotton workwear", "poly cotton uniform fabric"],
    note: "Existing guide. Candidate for expansion (blend ratios, care).",
  },
  {
    intent: "Choosing between two decoration methods",
    target: "/resources/embroidery-vs-screen-printing",
    queries: ["embroidery vs screen printing", "embroidery or screen printing", "screen print vs embroidery"],
    note: "Existing comparison guide. The next batch adds a decision tool.",
  },
  {
    intent: "Workwear for facilities and maintenance staff",
    target: "/industries/facilities",
    queries: ["facilities management workwear", "facility management uniforms", "facilities workwear"],
    note: "An industry page exists. A separate page is justified only if it carries material the industry page and the poly-cotton guide do not.",
  },
  {
    intent: "The company by name",
    target: "/",
    queries: ["ahm international"],
    note: "Brand query. Homepage and /about answer it; not a Knowledge Center topic.",
  },
];

/** Aliases per guide, taken from the groups above so the two cannot disagree. */
export const queryAliases: Record<string, string[]> = Object.fromEntries(
  queryGroups
    .filter((g) => g.target.startsWith("/resources/"))
    .map((g) => [g.target.replace("/resources/", ""), g.queries]),
);
