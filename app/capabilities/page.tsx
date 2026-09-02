import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { capabilities } from "@/data/capabilities";
import { hasAsset } from "@/data/assets";
import { pageMetadata } from "@/lib/seo";
import { numeral, cn } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Manufacturing Capabilities",
  description:
    "Thirteen apparel manufacturing capabilities, from product development and fabric sourcing through production and quality to FOB export.",
  path: "/capabilities",
});

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        headingLines={[{ text: "ONE PARTNER." }, { text: "EVERY CRITICAL", className: "text-ink" }, { text: "STEP." }]}
        intro="Thirteen capabilities, each described by what it produces for you rather than by how well we think we do it. Every one ends in a document, a sample or a shipment you can check."
        trail={[{ name: "Capabilities", path: "/capabilities" }]}
        zone="paper"
        asset="factory.cutting"
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "See the process", href: "/manufacturing" }}
      />

      <Section zone="paper" spacing="none" aria-labelledby="cap-heading">
        <div className="shell-wide pb-16">
          <h2 id="cap-heading" className="sr-only">
            Capabilities
          </h2>

          <ul className="flex flex-col">
            {capabilities.map((capability, i) => {
              const flip = i % 2 === 1;
              const withImage = hasAsset(capability.asset);
              return (
                <li key={capability.slug} className="border-t border-line">
                  <Reveal>
                    <article className="grid grid-cols-12 items-center gap-y-8 py-12 lg:gap-x-12 lg:py-16">
                      {withImage && (
                        <div className={cn("col-span-12 lg:col-span-5", flip && "lg:order-2")}>
                          <div className="zoom-frame aspect-[4/3] w-full overflow-hidden bg-paper">
                            <SmartImage
                              asset={capability.asset}
                              sizes={SIZES.half}
                              className="h-full w-full"
                              imageClassName="object-cover"
                              alt=""
                            />
                          </div>
                        </div>
                      )}

                      <div
                        className={cn(
                          "col-span-12",
                          withImage ? "lg:col-span-7" : "lg:col-span-11 lg:col-start-2",
                          withImage && flip && "lg:order-1",
                        )}
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            className={cn(
                              "numeral text-ink",
                              withImage ? "text-xl" : "text-[2.75rem] leading-none",
                            )}
                          >
                            {numeral(capability.index)}
                          </span>
                          <span className="h-px flex-1 bg-line" aria-hidden="true" />
                        </div>

                        <h3 className={cn("mt-5 font-display text-ink", withImage ? "text-h2" : "text-h1")}>
                          {capability.title}
                        </h3>

                        <p
                          className={cn(
                            "mt-5 leading-relaxed text-ink/75",
                            withImage ? "max-w-2xl text-[1.0625rem]" : "max-w-3xl text-lead",
                          )}
                        >
                          {capability.description}
                        </p>

                        <p className="mt-5 max-w-2xl border-l-2 border-ink pl-4 text-[0.9375rem] text-ink/65">
                          <span className="label mr-2 text-ink/60">What it means for you</span>
                          {capability.benefit}
                        </p>

                        <Link
                          href={capability.cta.href}
                          className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
                        >
                          {capability.cta.label}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section zone="paper" spacing="md" aria-labelledby="scope-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Scope</Eyebrow>
            <MaskedHeading
              as="h2"
              id="scope-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Where our" }, { text: "responsibility ends." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <p className="text-lead text-ink/75">
              AHM supplies FOB. Development, materials, production, quality, packing, export
              documentation and delivery on board at Port Qasim are ours.
            </p>
            <p className="mt-5 text-ink/70">
              Freight, insurance, import clearance, duties and final market compliance from the port
              onward are yours. We work to your labelling and documentation requirements, but we do
              not provide legal or compliance advice for your market. The buyer approves final
              market-specific labelling and compliance.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "PUT ONE STYLE" }, { text: "THROUGH IT." }]}
        body="Send a tech pack, a reference garment or a written requirement. We will review it and come back on construction, materials and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        guidesFor="/capabilities"
        title="Explore next"
        links={[
          { label: "Manufacturing process", href: "/manufacturing", description: "Nine stages, each with its outputs and its characteristic failure." },
          { label: "Product range", href: "/products", description: "Twelve apparel families manufactured to buyer specification." },
          { label: "Quality assurance", href: "/quality", description: "Inspection across incoming material, production, finishing and packing." },
        ]}
      />
    </>
  );
}
