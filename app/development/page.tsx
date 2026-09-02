import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { DevelopmentTimeline } from "@/components/sections/DevelopmentTimeline";
import { DevelopmentLab } from "@/components/sections/DevelopmentLab";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { ContentBlocks } from "@/components/ui/ContentBlocks";
import { pageMetadata } from "@/lib/seo";
import type { ContentBlock } from "@/data/sourcing";

export const metadata: Metadata = pageMetadata({
  title: "Product Development & Tech Packs",
  description:
    "How a tech pack or reference garment becomes a costed, executable manufacturing specification, and what a complete tech pack contains.",
  path: "/development",
});

/** The tech pack checklist — a genuinely useful buyer tool, not a lead magnet. */
const blocks: ContentBlock[] = [
  {
    type: "list",
    heading: "Tech pack checklist",
    intro:
      "What a complete apparel tech pack contains. Send what you have. This is what we will be looking for, and what we will ask about if it is missing.",
    items: [
      { term: "Technical sketch", detail: "Front and back flat drawings, with detail views of any construction that is not obvious." },
      { term: "Bill of materials", detail: "Every fabric, trim, thread, label and packaging component, with placement." },
      { term: "Measurement chart", detail: "Points of measure with values by size, and tolerances, without which nothing can be inspected." },
      { term: "Construction notes", detail: "Seam types, stitch density, closure type and reinforcement at named operations." },
      { term: "Fabric specification", detail: "Composition, weight, construction and finish, or the requirement the fabric must meet." },
      { term: "Colour standard", detail: "A physical swatch or a numeric reference for every colourway." },
      { term: "Decoration artwork", detail: "Vector files, placement, size and colour references for embroidery and print." },
      { term: "Labelling", detail: "Main, care, size and origin labels with artwork and placement." },
      { term: "Packing instruction", detail: "Fold or hang, polybag, ratio or solid pack, carton marking." },
      { term: "Grade rules", detail: "How each measurement changes between sizes, if you have them." },
    ],
  },
  {
    type: "prose",
    heading: "If you do not have a tech pack",
    body: [
      "Most enquiries do not arrive with one, and it is not a barrier. A reference garment is often better: it answers construction questions a written specification usually leaves open, and it can be measured directly.",
      "A sketch with written notes also works. What matters is that the requirement is clear enough for us to know what we are quoting, and where it is not, we ask rather than assume, because an assumption becomes a cost you did not agree to.",
      "Where you have no starting document at all, we can document a garment you currently buy and develop from that. The output is a specification you own, rather than a dependency on someone else's article.",
    ],
  },
  {
    type: "list",
    heading: "The most common tech pack gaps",
    intro: "What we most often have to ask about. Worth checking before you send.",
    items: [
      { term: "Missing tolerances", detail: "A measurement chart without tolerance cannot be inspected against, so inspection criteria end up being negotiated after production." },
      { term: "Colour without a standard", detail: "A colour named but not referenced to a swatch or number cannot be approved objectively." },
      { term: "Artwork as an image", detail: "Raster logos cannot be digitised or separated cleanly. Vector files avoid a round of avoidable revisions." },
      { term: "Fabric by name only", detail: "A fabric named without composition, weight or construction can be interpreted several ways, all of them priced differently." },
      { term: "No packing instruction", detail: "Packing decided late frequently changes carton sizing, which changes your freight cost after the price is agreed." },
    ],
  },
];

const devFaqs = [
  {
    question: "How long does development take?",
    answer:
      "It depends on the article, whether the fabric is in stock or has to be developed, and how resolved the specification is when it arrives. A complete tech pack with an available fabric moves considerably faster than a sketch requiring a fabric development. We confirm timing against your specification rather than quote a standard figure.",
  },
  {
    question: "Do you charge for development and sampling?",
    answer:
      "Development and sampling costs depend on the article, the materials and the work involved, and are confirmed in writing with the quotation. We do not publish a standard figure, because for most enquiries it would be wrong.",
  },
  {
    question: "How many sample rounds should we expect?",
    answer:
      "As few as the specification allows. Each round is produced against a written comment sheet so it closes specific points rather than restarting the conversation. A resolved specification typically needs fewer rounds than an open one.",
  },
  {
    question: "Will you suggest alternatives to what we specified?",
    answer:
      "Yes, if you want them. There is a checkbox for it on the quote form. Where a specified fabric or construction is likely to price above your target, we present the alternatives alongside the original rather than quoting the specification and waiting for the quotation to be rejected.",
  },
];

export default function ProductDevelopmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Product development"
        headingLines={[{ text: "Development is" }, { text: "where cost is", className: "text-ink" }, { text: "decided." }]}
        intro="Almost every avoidable cost in an apparel order is created or prevented before anything is cut. This is how AHM turns what you send into a specification the factory floor and your QA read the same way."
        trail={[{ name: "Product Development", path: "/development" }]}
        zone="paper"
        asset="development.techPack"
        priority
        primaryCta={{ label: "Start a Development", href: "/request-a-quote" }}
        secondaryCta={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
      />

      <DevelopmentTimeline />
      <DevelopmentLab />

      <Section zone="paper" spacing="lg">
        <div className="shell-wide">
          <ContentBlocks blocks={blocks} />
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="dev-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="dev-faq"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "About" }, { text: "development." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={devFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "START A" }, { text: "DEVELOPMENT." }]}
        body="Send a tech pack, a reference garment, a sketch or a written requirement. We will tell you what is missing before we quote."
        primary={{ label: "Start a Development", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="lime"
      />

      <RelatedLinks
        guidesFor="/development"
        title="Explore next"
        links={[
          { label: "Product development stage", href: "/manufacturing/product-development", description: "Detail, outputs and what usually goes wrong." },
          { label: "Sampling process", href: "/manufacturing/sampling", description: "Proto, fit, size set and pre-production samples." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and finishes." },
        ]}
      />
    </>
  );
}
