import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { pageMetadata } from "@/lib/seo";
import { RECYCLED_FOOTNOTE } from "@/data/materials";
import type { ContentBlock } from "@/data/sourcing";

export const metadata: Metadata = pageMetadata({
  title: "Sustainability",
  description:
    "What we can document, what depends on your specification, and why we publish no certification we cannot evidence.",
  path: "/sustainability",
});

/**
 * Sustainability.
 *
 * The hardest page on the site to write honestly, and the one where supplier
 * sites most often invent. AHM holds no verified certification, so this page
 * says so plainly and then covers what is actually true and useful: what a buyer
 * can specify, what can be documented, and where the leverage genuinely is.
 *
 * A page of unverifiable claims would be worse than no page — a procurement team
 * with a compliance requirement checks, and an unsupported claim ends the
 * conversation permanently.
 */

const blocks: ContentBlock[] = [
  {
    type: "callout",
    heading: "Our position, stated plainly",
    body:
      "AHM International does not currently publish any sustainability certification, audit score or environmental claim, because none has been verified for publication. If your program requires a specific certification, nominate it during commercial discussion and we will tell you honestly what can and cannot be documented. We would rather lose an enquiry than pass a compliance check on a claim that does not hold.",
  },
  {
    type: "list",
    heading: "What you can specify",
    intro:
      "These are real, buyer-controllable options. Each depends on documentation from the supplying mill, which we pass through rather than vouch for ourselves.",
    items: [
      { term: "Recycled content", detail: "Recycled polyester and blends supplied against mill documentation. Content percentage and certification travel with the fabric, not with us." },
      { term: "Organic cotton", detail: "Available against mill certification. Without a valid transaction certificate it is not described as organic." },
      { term: "Certified fabric", detail: "Where your program requires a named standard, nominate it and we will confirm what the mill can evidence." },
      { term: "Reduced packaging", detail: "Polybag specification, recycled carton content and reduced individual packaging are specified at development." },
      { term: "Durability as a lever", detail: "The largest environmental variable in a uniform program is how often garments are replaced. Specifying for wash durability reduces replacement volume." },
    ],
  },
  {
    type: "prose",
    heading: "Where the leverage actually is",
    body: [
      "A uniform garment that lasts twice as many wash cycles covers the same workforce for half the units produced, shipped and disposed of. That is arithmetic rather than an environmental claim, and it is the part of the picture a manufacturer can actually influence.",
      "So fabric durability, seam reinforcement and correct sizing are commercial and environmental decisions at once. A program where a third of the garments are the wrong size gets replaced early regardless of what the fabric is made from.",
      "We can specify for wash durability and evidence it through testing against your acceptance standard. Where your program requires a named certification, nominate it and we will answer directly on whether it can be met and how.",
    ],
  },
  {
    type: "list",
    heading: "What we will not do",
    items: [
      { term: "Claim a certification we do not hold", detail: "No logo, standard or audit score appears on this site without a certificate behind it." },
      { term: "Describe fabric as sustainable without documentation", detail: "Recycled or organic content is only described as such against mill paperwork." },
      { term: "Publish an environmental statistic", detail: "No carbon, water or waste figure is published, because none has been measured and verified for publication." },
      { term: "Pass a compliance question with a vague answer", detail: "If we cannot evidence something, we say so during commercial discussion rather than after an audit." },
    ],
  },
];

const faqs = [
  {
    question: "Do you hold GOTS, OEKO-TEX, BSCI or similar certification?",
    answer:
      "Certification status is confirmed in writing during commercial discussion. Nothing is published on this site because nothing has been verified for publication. If your program requires a named standard, nominate it and we will give you a direct answer.",
  },
  {
    question: "Can you supply recycled polyester?",
    answer:
      "Yes, against mill documentation. The recycled content claim belongs to the fabric supplier and travels with their certification. We pass that documentation through rather than making the claim ourselves.",
  },
  {
    question: "Why doesn't this page have more on it?",
    answer:
      "Because the alternative would be claims we cannot evidence. A procurement team with a compliance requirement checks, and an unsupported claim ends the relationship permanently. A short honest page is worth more than a long unverifiable one.",
  },
];

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        headingLines={[{ text: "What we can" }, { text: "evidence, and", className: "text-cobalt" }, { text: "what we cannot." }]}
        intro="This page is deliberately short. AHM publishes no environmental certification or statistic, because none has been verified for publication, and an unsupported claim is worth less than an honest gap."
        trail={[{ name: "Sustainability", path: "/sustainability" }]}
        zone="cream"
        asset="fabrics.polycottonTwill"
      />

      <Section zone="cream" spacing="lg">
        <div className="shell-wide">
          <ContentBlocks blocks={blocks} />
          <p className="mt-12 max-w-3xl border-t border-line pt-6 text-xs leading-relaxed text-ink/70">
            {RECYCLED_FOOTNOTE}
          </p>
        </div>
      </Section>

      <Section zone="ivory" spacing="lg" aria-labelledby="sus-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Compliance questions</Eyebrow>
            <MaskedHeading as="h2" id="sus-faq" className="mt-5 font-display text-h1 text-ink" lines={[{ text: "Direct" }, { text: "answers." }]} />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "NOMINATE YOUR" }, { text: "STANDARD." }]}
        body="Tell us what your program requires and we will tell you exactly what can be documented. Before you spend time on a sample."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Materials", href: "/materials" }}
        zone="forest"
      />

      <RelatedLinks
        guidesFor="/sustainability"
        title="Explore next"
        links={[
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and finish routes." },
          { label: "Quality assurance", href: "/quality", description: "Where inspection happens and what is checked." },
          { label: "About AHM International", href: "/about", description: "What the company can evidence, and what it does not publish." },
        ]}
      />
    </>
  );
}
