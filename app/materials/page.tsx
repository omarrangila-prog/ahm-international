import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { TrimsLibrary } from "@/components/products/TrimsLibrary";
import { FabricCompare } from "@/components/sections/FabricCompare";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { Faq } from "@/components/ui/Faq";
import { materials, MATERIAL_DISCLAIMER, RECYCLED_FOOTNOTE } from "@/data/materials";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

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
        headingLines={[{ text: "The fabric" }, { text: "decision outlives", className: "text-cobalt" }, { text: "the order." }]}
        intro="Construction families used in uniform and workwear programs, with typical weights, hand feel, finish routes and applications. Given for orientation while you scope a program, not as a stock list."
        trail={[{ name: "Materials", path: "/materials" }]}
        zone="cream"
        asset="development.swatches"
        priority
        primaryCta={{ label: "Discuss Materials", href: "/request-a-quote" }}
        secondaryCta={{ label: "See product range", href: "/products" }}
      />

      <Section zone="cream" spacing="none" aria-labelledby="materials-heading">
        <div className="shell-wide pb-20">
          <h2 id="materials-heading" className="sr-only">
            Fabric constructions
          </h2>

          <RevealGroup className="flex flex-col" stagger={0.05}>
            {materials.map((material, i) => (
              <RevealItem key={material.slug}>
                <article className="grid grid-cols-12 items-start gap-y-6 border-t border-line py-10 lg:gap-x-10">
                  <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                    <div className="aspect-square w-full overflow-hidden bg-ivory">
                      <SmartImage
                        asset={material.asset}
                        sizes={SIZES.quarter}
                        className="h-full w-full"
                        imageClassName="object-cover"
                        alt={`${material.name} fabric structure`}
                      />
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-8 lg:col-span-9">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="numeral text-sm text-cobalt">{numeral(i + 1)}</span>
                      <h3 className="font-display text-h3 text-ink">{material.name}</h3>
                      <span className="label text-ink/60">{material.family}</span>
                    </div>

                    <dl className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <dt className="label text-ink/60">Common compositions</dt>
                        <dd className="mt-1.5 text-sm text-ink/75">{material.compositions.join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="label text-ink/60">Typical weight</dt>
                        <dd className="mt-1.5 font-display text-base font-bold tracking-[-0.02em] text-cobalt">
                          {material.typicalWeight}
                        </dd>
                      </div>
                      <div>
                        <dt className="label text-ink/60">Finish options</dt>
                        <dd className="mt-1.5 text-sm text-ink/75">{material.finishOptions.join(" · ")}</dd>
                      </div>
                      <div>
                        <dt className="label text-ink/60">Used for</dt>
                        <dd className="mt-1.5 text-sm text-ink/75">{material.useCases.join(" · ")}</dd>
                      </div>
                    </dl>

                    <p className="mt-5 max-w-2xl text-sm italic text-ink/60">{material.handFeel}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 max-w-3xl space-y-3 border-t border-line pt-6">
            <p className="text-xs leading-relaxed text-ink/70">{MATERIAL_DISCLAIMER}</p>
            <p className="text-xs leading-relaxed text-ink/70">{RECYCLED_FOOTNOTE}</p>
          </div>
        </div>
      </Section>

      {/* Spec §15 — trims sit with fabrics because to a buyer they are the same
          question: what is this garment actually made of, and what must I decide. */}
      {/* Two constructions side by side, because that is the shape of the real
          decision. See components/sections/FabricCompare.tsx. */}
      <Section zone="ivory" spacing="lg" aria-labelledby="compare-heading">
        <div className="shell-wide">
          <Eyebrow>Compare</Eyebrow>
          <MaskedHeading
            as="h2"
            id="compare-heading"
            className="mt-5 max-w-3xl font-display text-h1 text-ink"
            lines={[{ text: "Two constructions," }, { text: "one decision.", className: "text-cobalt" }]}
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

      <Section zone="ivory" spacing="lg" aria-labelledby="mat-faq">
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
              <Link href="/request-a-quote" className="text-cobalt underline underline-offset-4">
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
        title="Explore next"
        links={[
          { label: "Fabric sourcing process", href: "/manufacturing/fabric-sourcing", description: "Lab dips, shade control and incoming inspection." },
          { label: "Product range", href: "/products", description: "Seven apparel families manufactured to specification." },
          { label: "Uniform program industries", href: "/industries", description: "How fabric requirements change by sector." },
        ]}
      />
    </>
  );
}
