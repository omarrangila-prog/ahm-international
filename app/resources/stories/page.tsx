import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { buyerStories, BUYER_STORY_DISCLAIMER } from "@/data/buyerStories";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Buyer Scenarios for Apparel Sourcing",
  description:
    "Teaching scenarios for shade, shrinkage, quotations and knit construction — composite situations for education, not published customer programs.",
  path: "/resources/stories",
});

export default function BuyerStoriesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Buyer scenarios"
        headingLines={[{ text: "Failures you" }, { text: "can learn from", className: "text-ink" }, { text: "without living them." }]}
        intro="Composite teaching scenarios for the mistakes that stall programs: shade on reorder, shrinkage after wash, incomparable quotations, and the wrong knit for a uniform polo. Not case studies. Not customer names."
        trail={[
          { name: "Resources", path: "/resources" },
          { name: "Scenarios", path: "/resources/stories" },
        ]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      <Section zone="paper" spacing="md">
        <div className="shell-wide">
          <p className="max-w-3xl border-l-2 border-ink pl-5 text-sm leading-relaxed text-ink/70">
            {BUYER_STORY_DISCLAIMER}
          </p>
        </div>
      </Section>

      <Section zone="paper" spacing="none" aria-labelledby="scenarios-list">
        <div className="shell-wide pb-20">
          <h2 id="scenarios-list" className="sr-only">
            Teaching scenarios
          </h2>
          <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
            {buyerStories.map((story, i) => (
              <Link
                key={story.slug}
                href={`/resources/stories/${story.slug}`}
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
                  <p className="mt-4 label text-ink/65">{story.theme}</p>
                  <h3 className="mt-2 font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
                    {story.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink/65">
                    {story.hook}
                  </p>
                </div>
                <p className="label text-ink/65">Teaching scenario</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section zone="paper" spacing="lg">
        <div className="shell-wide grid grid-cols-12 gap-y-6 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>Documented proof</Eyebrow>
            <MaskedHeading
              as="h2"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Want a real" }, { text: "program record?" }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-7">
            <p className="max-w-xl text-ink/70">
              Scenarios teach. Case studies document. We publish a manufacturing program
              only where the facts are verified and the customer stays unnamed.
            </p>
            <Link
              href="/case-studies"
              className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
            >
              Documented case studies
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND ONE" }, { text: "STYLE." }]}
        body="Reading a scenario is useful. Costing a real specification is better."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Buyer guides", href: "/resources" }}
        zone="ink"
      />
    </>
  );
}
