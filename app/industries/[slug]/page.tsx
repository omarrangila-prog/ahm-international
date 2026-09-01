import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { industries } from "@/data/industries";
import { getIndustryDetail, industryDetail } from "@/data/industry-detail";
import { getCategory } from "@/data/products";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

/**
 * Industry page.
 *
 * Exists because the requirement genuinely differs by sector — a grocery apron
 * and a corporate shirt fail in different ways — not because the URL carries a
 * keyword. Each page is written from that difference, and any sector we could
 * not say something specific about does not get a page.
 */

export function generateStaticParams() {
  return industries
    .filter((industry) => industryDetail[industry.slug])
    .map((industry) => ({ slug: industry.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = getIndustryDetail(slug);
  if (!detail) return {};
  return pageMetadata({
    title: detail.seoTitle,
    description: detail.seoDescription,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  const detail = getIndustryDetail(slug);
  if (!industry || !detail) notFound();

  const categories = detail.relatedCategories
    .map((s) => getCategory(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const programConsiderations = [
    { label: "Fabric", body: detail.fabricGuidance },
    { label: "Durability", body: detail.durability },
    { label: "Comfort", body: detail.comfort },
    { label: "Decoration", body: detail.decoration },
    { label: "Sizing", body: detail.sizing },
    { label: "Replenishment", body: detail.replenishment },
    { label: "Packing", body: detail.packing },
  ];

  const headingLines = detail.headline.split("\n").map((text, i) => ({
    text,
    className: i === 1 ? "text-cobalt" : undefined,
  }));

  return (
    <>
      <PageViewEvent event="industry_viewed" detail={slug} />
      <ReadingProgress />

      <PageHero
        eyebrow={`Industries: ${industry.name}`}
        headingLines={headingLines}
        intro={industry.demand}
        trail={[
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${slug}` },
        ]}
        zone="cream"
        asset={industry.asset}
        priority
        primaryCta={{ label: "Discuss a Program", href: "/request-a-quote" }}
        secondaryCta={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
      />

      {/* Overview + roles */}
      <Section zone="ivory" spacing="lg" aria-labelledby="overview-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>The requirement</Eyebrow>
            <MaskedHeading
              as="h2"
              id="overview-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What this sector" }, { text: "does to a garment." }]}
            />
            <div className="mt-7 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed text-ink/75">
              {detail.overview.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="border border-line bg-cream p-7">
              <h3 className="label text-ink/60">Who wears the program</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {detail.roles.map((role) => (
                  <li key={role} className="flex items-start gap-3 text-[0.9375rem] text-ink/80">
                    <span className="mt-[0.5rem] h-1 w-1 shrink-0 bg-cobalt" aria-hidden="true" />
                    {role}
                  </li>
                ))}
              </ul>

              <h3 className="label mt-8 text-ink/60">Typical garments</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {industry.typicalGarments.map((garment) => (
                  <li key={garment} className="border border-ink/20 px-3 py-1.5 text-xs text-ink/70">
                    {garment}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Program considerations */}
      <Section zone="forest" spacing="lg" tooth aria-labelledby="considerations-heading">
        <div className="shell-wide relative z-10">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>Program design</Eyebrow>
              <MaskedHeading
                as="h2"
                id="considerations-heading"
                className="mt-5 font-display text-h1 text-cream"
                lines={[{ text: "Seven decisions" }, { text: "that shape the" }, { text: "program." }]}
              />
            </div>

            <RevealGroup className="col-span-12 lg:col-span-8" stagger={0.05}>
              {/* dt/dd must sit one div deep inside the dl, not two. A second
                  wrapper breaks the term/definition association for assistive
                  technology, so the reveal attributes go on the same element. */}
              <dl className="border-t border-cream/15">
                {programConsiderations.map((item, i) => (
                  <div
                    key={item.label}
                    data-reveal=""
                    data-reveal-dir="up"
                    className="grid grid-cols-[3rem_1fr] gap-4 border-b border-cream/15 py-5 sm:grid-cols-[3rem_9rem_1fr]"
                  >
                    <span className="numeral text-sm text-lime" aria-hidden="true">
                      {numeral(i + 1)}
                    </span>
                    <dt className="label pt-0.5 text-cream/70">{item.label}</dt>
                    <dd className="col-span-2 text-sm leading-relaxed text-cream/75 sm:col-span-1">
                      {item.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* Related categories */}
      <Section zone="cream" spacing="lg" aria-labelledby="cats-heading">
        <div className="shell-wide">
          <Eyebrow>Product families</Eyebrow>
          <MaskedHeading
            as="h2"
            id="cats-heading"
            className="mt-5 font-display text-h1 text-ink"
            lines={[{ text: "Categories that build" }, { text: `a ${industry.name.toLowerCase()} program.` }]}
          />

          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {categories.map((category) => (
              <RevealItem key={category.slug}>
                <Link
                  href={`/products/${category.slug}`}
                  className="group flex h-full flex-col border border-line bg-ivory transition-colors hover:bg-white"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                    <SmartImage
                      asset={category.articles[0].asset}
                      sizes={SIZES.quarter}
                      className="h-full w-full"
                      imageClassName="object-contain p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      alt=""
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 text-xs text-ink/70">
                      {category.subcategories.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* FAQ */}
      <Section zone="ivory" spacing="lg" aria-labelledby="ind-faq-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="ind-faq-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: `${industry.name} programs.` }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={detail.faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "PLAN A" }, { text: `${industry.name.toUpperCase()} PROGRAM.` }]}
        body="Send the articles you need and the environment they will be worn in. We will come back on fabric, construction and commercial FOB costing for the whole program."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "All uniform program industries", href: "/industries", description: "How requirements change between sectors." },
          { label: "Materials and fabric selection", href: "/materials", description: "Construction families, typical weights and finishes." },
          { label: "Uniform program expertise", href: "/products/uniform-workwear", description: "Work shirts, service apparel, chef wear and hi-vis." },
        ]}
      />
    </>
  );
}
