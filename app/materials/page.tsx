import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { TrimsLibrary } from "@/components/products/TrimsLibrary";
import { FabricCompare } from "@/components/sections/FabricCompare";
import { HandFeel } from "@/components/sections/HandFeel";
import { MaterialIndex } from "@/components/sections/MaterialIndex";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Faq } from "@/components/ui/Faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Fabrics & Materials",
  description:
    "Cotton pique, jersey, poly-cotton twill, shirting, fleece, performance polyester, softshell and canvas, with typical program weights.",
  path: "/materials",
});

const materialFaqs = [
  {
    question: "What does GSM actually tell me?",
    answer:
      "GSM is grams per square metre. The fabric's weight, not its quality or durability. A heavier fabric is not automatically better: it costs more, ships heavier and can be less comfortable. What matters is whether the weight suits the wear pattern and the laundering method.",
  },
  {
    question: "Why is 65/35 poly-cotton so common in workwear?",
    answer:
      "The polyester carries strength, shrinkage control and colour retention through repeated industrial washing; the cotton carries comfort and breathability. The 65/35 ratio is the point where most uniform programs get acceptable comfort without giving up wash durability, which is why it is the default in aprons and work shirting.",
  },
  {
    question: "Can you source a fabric we already use?",
    answer:
      "Usually. Send a swatch or the specification and we will match composition, weight, construction and finish as closely as the market allows. Where an exact match is not achievable, we say so and present the nearest alternatives rather than substituting silently.",
  },
  {
    question: "Do you offer certified sustainable or recycled fabrics?",
    answer:
      "Recycled content is supplied only against mill documentation, and we do not describe a fabric as certified without the certificate to evidence it. If your program requires a specific certification, nominate it and we will confirm what can be documented.",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <PageViewEvent event="material_viewed" />
      <PageHero
        eyebrow="Materials"
        headingLines={[{ text: "The fabric" }, { text: "decision outlives", className: "text-ink" }, { text: "the order." }]}
        intro="Construction families used in uniform and workwear programs, with typical weights, hand feel, finish routes and applications. Given for orientation while you scope a program, not as a stock list."
        trail={[{ name: "Materials", path: "/materials" }]}
        zone="paper"
        asset="development.swatches"
        priority
        primaryCta={{ label: "Discuss Materials", href: "/request-a-quote" }}
        secondaryCta={{ label: "See product range", href: "/products" }}
      />

      {/* Eight constructions as an index that opens in place. See
          components/sections/MaterialIndex.tsx for why it is not a list. */}
      <Section zone="paper" spacing="none" aria-labelledby="materials-heading">
        <div className="shell-wide pb-20">
          <h2 id="materials-heading" className="sr-only">
            Fabric constructions
          </h2>
          <MaterialIndex />
        </div>
      </Section>

      {/* Spec §15 — trims sit with fabrics because to a buyer they are the same
          question: what is this garment actually made of, and what must I decide. */}
      {/* The correction to the GSM anchor the list above creates.
          See components/sections/HandFeel.tsx. */}
      <Section zone="ink" spacing="lg" aria-labelledby="handfeel-heading">
        <div className="shell-wide">
          <Eyebrow>Specification</Eyebrow>
          <MaskedHeading
            as="h2"
            id="handfeel-heading"
            className="mt-5 max-w-4xl font-display text-h1 text-paper"
            lines={[{ text: "Same weight." }, { text: "Different cloth.", className: "text-lime" }]}
          />
          {/* `relative` so the zone's woven overlay has something to position against. */}
          <div className="relative mt-14 bg-paper p-8 text-ink sm:p-12" data-zone="light">
            <HandFeel />
          </div>
        </div>
      </Section>

      {/* Two constructions side by side, because that is the shape of the real
          decision. See components/sections/FabricCompare.tsx. */}
      <Section zone="paper" spacing="lg" aria-labelledby="compare-heading">
        <div className="shell-wide">
          <Eyebrow>Compare</Eyebrow>
          <MaskedHeading
            as="h2"
            id="compare-heading"
            className="mt-5 max-w-3xl font-display text-h1 text-ink"
            lines={[{ text: "Two constructions," }, { text: "one decision.", className: "text-ink" }]}
          />
          <p className="mt-6 max-w-xl text-ink/70">
            Drag the seam to put one weave against another. The photographs are
            macros of the construction; the table beneath them is where the
            difference is actually decided.
          </p>
          <div className="mt-12">
            <FabricCompare />
          </div>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="trims-heading">
        <div className="shell-wide">
          <Eyebrow>Trims</Eyebrow>
          <h2
            id="trims-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            The components, and the decisions they carry.
          </h2>
          <p className="mt-4 max-w-xl text-ink/65">
            Trims are where sampling most often stalls, because a decision was left
            open. This is the list of decisions, so you can arrive with the answers.
          </p>
          <div className="mt-10">
            <TrimsLibrary />
          </div>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="mat-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Fabric questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="mat-faq"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What buyers" }, { text: "ask about" }, { text: "fabric." }]}
            />
            <p className="mt-6 text-sm text-ink/65">
              Not sure which construction fits?{" "}
              <Link href="/request-a-quote" className="text-ink underline underline-offset-4">
                Tell us the requirement
              </Link>{" "}
              and we will recommend options against it.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={materialFaqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "NOT SURE WHICH" }, { text: "FABRIC?" }]}
        body="Describe the requirement. How the garment is worn, how it is washed, what it has to survive, and we will present options with the commercial consequence of each attached."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        guidesFor="/materials"
        title="Explore next"
        links={[
          { label: "Fabric sourcing process", href: "/manufacturing/fabric-sourcing", description: "Lab dips, shade control and incoming inspection." },
          { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to specification." },
          { label: "Uniform program industries", href: "/industries", description: "How fabric requirements change by sector." },
        ]}
      />
    </>
  );
}
