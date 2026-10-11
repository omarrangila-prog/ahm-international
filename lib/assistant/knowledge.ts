import { company, commercialAnswers, publicValue, NOT_PUBLISHED } from "../../data/company";
import { productCategories, SPEC_DISCLAIMER, DISCUSS } from "../../data/products";
import { materials, MATERIAL_DISCLAIMER } from "../../data/materials";
import { guides } from "../../data/guides";
import { sourcingPillars, type ContentBlock } from "../../data/sourcing";
import { processStages, qualityStages, qualityDimensions, QUALITY_STANDARD_STATEMENT } from "../../data/process";
import { hybridBenefits, buyerQuestions } from "../../data/manufacturing-network";
import { trustStrengths, verificationSteps } from "../../data/trust";
import { notClaimed } from "../../data/sourcing-context";
import { MARKET_STATEMENT, EXPORT_STATEMENT, fobScope } from "../../data/markets";
import { INCOTERMS_NOTE } from "../../data/incoterms";
import { industries } from "../../data/industries";
import { CAPABILITY_LABEL, CAPABILITY_MEANING } from "../../data/verification";

/**
 * What the sourcing assistant knows: the website, and nothing else.
 *
 * Built from the same data modules the pages render, so the assistant cannot
 * know a fact the site does not publish, and a fact withdrawn from the site is
 * withdrawn from the assistant in the same commit. Unpublished fields (MOQ,
 * lead time, capacity, headcount, certifications) are listed by name as not
 * published, because a model told nothing about them is more likely to fill
 * the gap than one told explicitly that there is no figure.
 *
 * Every section names the page it comes from, so answers can link to it.
 */

/**
 * Lists, steps, tables and FAQs go in whole: they are the parts a buyer's
 * question is usually answered by. Long prose keeps its opening paragraph,
 * which in these guides states the point, and the guide's own link carries
 * the rest. That halves the corpus, and with it the cost of every first
 * question, without dropping a fact a list or table states.
 */
function blockText(block: ContentBlock): string {
  switch (block.type) {
    case "prose":
      return `${block.heading}: ${block.body[0] ?? ""}`;
    case "list":
      return `${block.heading}: ${block.intro ? `${block.intro} ` : ""}${block.items.map((i) => `${i.term}: ${i.detail}`).join("; ")}`;
    case "table":
      return `${block.heading}: ${block.intro ? `${block.intro} ` : ""}${block.columns.join(" | ")}. ${block.rows.map((r) => r.join(" | ")).join(". ")}`;
    case "steps":
      return `${block.heading}: ${block.intro ? `${block.intro} ` : ""}${block.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join(" ")}`;
    case "callout":
      return `${block.heading}: ${block.body}`;
  }
}

function build(): string {
  const out: string[] = [];
  const section = (title: string) => out.push("", `## ${title}`);

  /* ---------------------------- Company facts ---------------------------- */
  section("AHM International: published facts");
  const email = publicValue(company.email);
  const phone = publicValue(company.phone);
  const whatsapp = publicValue(company.whatsapp);
  out.push(
    `${company.name} is an apparel manufacturer and FOB exporter based in ${company.city}, ${company.country}. ${company.positioning.secondary} ${company.positioning.supporting}`,
    `Manufacturing model (stated by the owner): ${company.manufacturingModel.summary} It runs its own manufacturing operations and also works with specialist partner factories. A partner factory is never described as company-owned, and which facility makes a given order is confirmed per order (page /manufacturing-network).`,
    `Export: ${EXPORT_STATEMENT} ${MARKET_STATEMENT} Markets supplied: ${company.targetMarkets.join(", ")}. Quotations are FOB Karachi; the Incoterms chart on /export is context, not an offer of other terms. ${INCOTERMS_NOTE}`,
    `Business hours: ${publicValue(company.businessHours) ?? NOT_PUBLISHED}. ${company.whatsappNote}`,
    `Contact: ${[email && `email ${email}`, phone && `phone ${phone}`, whatsapp && `WhatsApp ${whatsapp}`].filter(Boolean).join(", ") || "via /contact"}. Quote form: /request-a-quote. Tech pack upload: /send-tech-pack. Contact page: /contact.`,
    `NOT PUBLISHED (do not state or estimate any of these; they are confirmed per enquiry or on request): minimum order quantity, production lead time, sampling time, prices, monthly capacity, number of machines, number of employees, facility size, facility address, years in business, registration/NTN number, certifications, customer names.`,
    `Certifications: none are displayed, because none is shown without a documented certificate. Status is confirmed in writing during commercial discussion.`,
  );

  section("Straight answers to common commercial questions (/request-a-quote)");
  for (const a of commercialAnswers) out.push(`Q: ${a.question} A: ${a.answer}`);

  section("What AHM does not claim (/verification)");
  for (const n of notClaimed) out.push(`${n.claim}: ${n.position}`);

  section("Verifying AHM (/verification)");
  for (const t of trustStrengths) out.push(`${t.title} [${t.basis}]: ${t.body}`);
  for (const s of verificationSteps) out.push(`How a buyer can check: ${s.title}. ${s.body}`);

  section("Own and partner manufacturing (/manufacturing-network)");
  for (const b of hybridBenefits) out.push(`${b.title}: ${b.body}`);
  for (const q of buyerQuestions) out.push(`Question a buyer should ask: ${q.question} Why: ${q.why}`);

  /* ------------------------------- Products ------------------------------ */
  section(`Products. ${SPEC_DISCLAIMER}`);
  for (const c of productCategories) {
    out.push(
      "",
      `### ${c.name} (/products/${c.slug})`,
      c.intro,
      `Capability: ${CAPABILITY_LABEL[c.capabilityStatus]}. ${CAPABILITY_MEANING[c.capabilityStatus]}`,
      `Types: ${c.subcategories.join(", ")}.`,
      `Articles: ${c.articles.map((a) => `${a.name} (${a.note}${a.capabilityStatus ? `; ${CAPABILITY_LABEL[a.capabilityStatus]}` : ""})`).join("; ")}.`,
      `Specification: ${c.specification.map((r) => `${r.label}: ${r.value ?? DISCUSS}`).join("; ")}.`,
      `Decoration: ${c.decoration.join(", ")}. Used in: ${c.applications.join(", ")}.`,
    );
    if (c.costComparison) {
      out.push(`${c.costComparison.heading}: ${c.costComparison.intro} ${c.costComparison.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`).join(" ")}`);
    }
  }

  section("Industries served (/industries)");
  for (const i of industries) out.push(`${i.name} (/industries/${i.slug}): ${i.demand} Typical garments: ${i.typicalGarments.join(", ")}.`);

  /* ------------------------------- Materials ----------------------------- */
  section(`Materials (/materials). ${MATERIAL_DISCLAIMER}`);
  for (const m of materials) {
    out.push(
      `${m.name} (${m.family}, ${m.weightClass.toLowerCase()} weight): typical ${m.typicalWeight}; compositions ${m.compositions.join(", ")}; ${m.construction}; surface ${m.surface}; stretch ${m.stretch}; hand feel ${m.handFeel}; finishes ${m.finishOptions.join(", ")}; used for ${m.useCases.join(", ")}. ${CAPABILITY_LABEL[m.capabilityStatus]}.`,
    );
  }

  /* -------------------------------- Process ------------------------------ */
  section("How an order runs, brief to dispatch (/development, /manufacturing)");
  for (const s of processStages) out.push(`${s.index}. ${s.title}: ${s.body} Buyer supplies: ${s.buyerInput}.`);

  section("Quality (/quality)");
  for (const s of qualityStages) out.push(`${s.index}. ${s.title}: ${s.body}`);
  out.push(`Checked: ${qualityDimensions.map((d) => `${d.title} (${d.body})`).join("; ")}`, QUALITY_STANDARD_STATEMENT);

  section("What FOB covers (/export)");
  for (const f of fobScope) out.push(`${f.title}: ${f.body}`);

  /* ----------------------------- Buyer guides ---------------------------- */
  section("Sourcing guides");
  for (const p of sourcingPillars) {
    out.push("", `### ${p.headline.replace(/\n/g, " ")} (/${p.slug})`, `${p.definition.question} ${p.definition.answer}`);
    for (const b of p.blocks) out.push(blockText(b));
    for (const f of p.faqs) out.push(`Q: ${f.question} A: ${f.answer}`);
  }

  section("Buyer guides (/resources)");
  for (const g of guides) {
    out.push("", `### ${g.title} (/resources/${g.slug})`, g.summary);
    for (const b of g.blocks) out.push(blockText(b));
    for (const f of g.faqs) out.push(`Q: ${f.question} A: ${f.answer}`);
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export const KNOWLEDGE = build();
