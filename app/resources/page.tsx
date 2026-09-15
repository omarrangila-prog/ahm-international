import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { guides, plannedGuides } from "@/data/guides";
import { REVIEWED_BY, LAST_REVIEWED } from "@/data/editorial";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

/** Category order is editorial, not alphabetical: buyers before commercials. */
const guideCategories = ["Buyer guide", "Commercial guide", "Fabric guide"] as const;
const categoryId = (c: string) => c.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export const metadata: Metadata = pageMetadata({
  title: "Buyer Resources & Fabric Guides",
  description:
    "Practical guides for apparel buyers: tech pack checklists, FOB costing, fabric selection and GSM, from our development team.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        headingLines={[{ text: "Written for" }, { text: "people who", className: "text-ink" }, { text: "buy garments." }]}
        intro="Technical guidance from the development side of the table. Each guide answers a question buyers actually ask before an order, and none of them require you to be a customer."
        trail={[{ name: "Resources", path: "/resources" }]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
      />

      <Section zone="paper" spacing="none">
        <div className="shell-wide pb-8">
          <nav aria-label="Guide categories" className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink/15 py-4">
            <span className="label text-ink/65">Jump to</span>
            {guideCategories.map((c) => (
              <a
                key={c}
                href={`#${categoryId(c)}`}
                className="text-sm text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                {c}s{" "}
                <span className="text-ink/65">
                  ({guides.filter((g) => g.category === c).length})
                </span>
              </a>
            ))}
          </nav>
        </div>
      </Section>

      {guideCategories.map((category) => {
        const inCategory = guides.filter((g) => g.category === category);
        if (inCategory.length === 0) return null;
        return (
          <Section key={category} zone="paper" spacing="none">
            <div className="shell-wide pb-16">
              <h2
                id={categoryId(category)}
                className="mb-6 scroll-mt-28 font-display text-xl font-extrabold uppercase tracking-[-0.02em] text-ink"
              >
                {category}s
              </h2>
              <div className="grid grid-cols-1 gap-px border border-line bg-line lg:grid-cols-2">
                {inCategory.map((guide, i) => (
                  <Link
                    key={guide.slug}
                    href={`/resources/${guide.slug}`}
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
                      <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.08] tracking-[-0.03em] text-ink">
                        {guide.title}
                      </h3>
                      <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink/65">
                        {guide.intro}
                      </p>
                    </div>
                    <p className="label text-ink/65">{guide.readingTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          </Section>
        );
      })}

      <Section zone="paper" spacing="none">
        <div className="shell-wide border-t border-line pt-5 pb-16">
          <p className="text-sm text-ink/65">
            Reviewed by {REVIEWED_BY}. Last reviewed {LAST_REVIEWED}.
          </p>
        </div>
      </Section>


      {/* The backlog, published as a plan rather than as pages. */}
      <Section zone="paper" spacing="lg" aria-labelledby="backlog-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>In progress</Eyebrow>
            <MaskedHeading
              as="h2"
              id="backlog-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What we're" }, { text: "writing next." }]}
            />
            <p className="mt-6 text-ink/70">
              We publish a guide when there is something specific to say, not to fill a content
              calendar. These are in the queue.
            </p>
            <p className="mt-5 text-sm text-ink/70">
              Want one of them sooner, or a topic that isn&apos;t listed?{" "}
              <Link href="/contact" className="text-ink underline underline-offset-4">
                Tell us
              </Link>
              .
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
              {plannedGuides.map((planned) => (
                <li key={planned.title} className="flex items-start gap-3 border-b border-line py-3">
                  <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-ink/25" aria-hidden="true" />
                  <span className="text-sm text-ink/65">{planned.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "OR JUST SEND" }, { text: "THE SPEC." }]}
        body="Reading is useful. Sending one style and seeing how a supplier responds is more useful."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
