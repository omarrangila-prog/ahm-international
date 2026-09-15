import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { sourcingPillars } from "@/data/sourcing";
import { commercialAnswers } from "@/data/company";
import { Faq } from "@/components/ui/Faq";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Apparel Sourcing Guides",
  description:
    "Practical guides for buyers working with Pakistan: how manufacturing and export work, what FOB covers, and private label versus OEM.",
  path: "/sourcing",
});

export default function SourcingPage() {
  return (
    <>
      <PageHero
        eyebrow="Sourcing"
        headingLines={[{ text: "Guides for" }, { text: "apparel buyers", className: "text-ink" }, { text: "working with Pakistan." }]}
        intro="Written for sourcing managers evaluating Pakistan as an origin. Each guide covers what actually happens, what it costs you in effort, and what AHM can and cannot evidence."
        trail={[{ name: "Sourcing", path: "/sourcing" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "See product range", href: "/products" }}
      />

      <Section zone="paper" spacing="none" aria-labelledby="guides-heading">
        <div className="shell-wide pb-24">
          <h2 id="guides-heading" className="sr-only">
            Sourcing guides
          </h2>
          <RevealGroup className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2" stagger={0.06}>
            {sourcingPillars.map((pillar, i) => (
              <RevealItem key={pillar.slug}>
                <Link
                  href={`/${pillar.slug}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-paper p-7 transition-colors duration-300 hover:bg-white lg:p-9"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="numeral text-2xl text-ink/65 transition-colors group-hover:text-ink">
                        {numeral(i + 1)}
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-ink/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
                      {pillar.headline.replace("\n", " ")}
                    </h3>
                    <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink/65">
                      {pillar.intro}
                    </p>
                  </div>
                  <p className="label text-ink">Read the guide</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section zone="paper" spacing="lg" aria-labelledby="sourcing-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Straight answers</Eyebrow>
            <MaskedHeading
              as="h2"
              id="sourcing-faq"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "The questions" }, { text: "every buyer" }, { text: "asks first." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={commercialAnswers} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "START WITH" }, { text: "ONE STYLE." }]}
        body="Reading only gets you so far. Send a single specification and see how a supplier actually responds."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
