import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { manufacturingStages, getManufacturingStage } from "@/data/manufacturing";
import { pageMetadata, serviceSchema, faqSchema } from "@/lib/seo";
import { hasAsset } from "@/data/assets";
import { JsonLd } from "@/components/ui/JsonLd";
import { numeral } from "@/lib/utils";

/**
 * Manufacturing stage page.
 *
 * The "What usually goes wrong" section is the differentiator. Publishing the
 * common failure at each stage — and how it is prevented — is the clearest
 * available evidence of first-hand manufacturing experience, and it is what a
 * sourcing manager is actually trying to establish when they read a process page.
 */

export function generateStaticParams() {
  return manufacturingStages.map((stage) => ({ slug: stage.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const stage = getManufacturingStage(slug);
  if (!stage) return {};
  return pageMetadata({
    title: stage.seoTitle,
    description: stage.seoDescription,
    path: `/manufacturing/${stage.slug}`,
  });
}

export default async function ManufacturingStagePage({ params }: Params) {
  const { slug } = await params;
  const stage = getManufacturingStage(slug);
  if (!stage) notFound();

  const others = manufacturingStages.filter((s) => s.slug !== stage.slug);
  const previous = manufacturingStages[stage.index - 2];
  const next = manufacturingStages[stage.index];

  const headingLines = stage.headline.split("\n").map((text, i) => ({
    text,
    className: i === 1 ? "text-cobalt" : undefined,
  }));

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={serviceSchema({
          name: stage.title,
          description: stage.seoDescription,
          path: `/manufacturing/${stage.slug}`,
        })}
      />
      <JsonLd data={faqSchema(stage.faqs)} />

      <PageHero
        eyebrow={`Manufacturing: stage ${numeral(stage.index)} of ${manufacturingStages.length}`}
        headingLines={headingLines}
        intro={stage.intro}
        trail={[
          { name: "Manufacturing", path: "/manufacturing" },
          { name: stage.shortTitle, path: `/manufacturing/${stage.slug}` },
        ]}
        zone="cream"
        asset={stage.asset}
        priority
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
      />

      {/* Process */}
      <Section zone="ivory" spacing="lg" aria-labelledby="process-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Process</Eyebrow>
            <MaskedHeading
              as="h2"
              id="process-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What actually" }, { text: "happens." }]}
            />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ol className="border-t border-line">
              {stage.process.map((step, i) => (
                <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-5">
                  <span className="numeral text-lg text-cobalt">{numeral(i + 1)}</span>
                  <p className="text-[0.9375rem] leading-relaxed text-ink/75">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-h3 text-ink">What you supply</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {stage.buyerInputs.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/70">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-cobalt" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-h3 text-ink">What you receive</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {stage.outputs.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink/70">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-orange" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {stage.supportingAssets.some(hasAsset) && (
              <div className="mt-12 grid grid-cols-3 gap-3">
                {stage.supportingAssets.filter(hasAsset).map((asset) => (
                  <div key={asset} className="zoom-frame group aspect-[4/3] w-full overflow-hidden bg-cream">
                    <SmartImage asset={asset} sizes={SIZES.third} className="h-full w-full" imageClassName="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* What goes wrong */}
      <Section zone="ink" spacing="lg" tooth aria-labelledby="risk-heading">
        <div className="shell-wide relative z-10">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow>Risk</Eyebrow>
              <MaskedHeading
                as="h2"
                id="risk-heading"
                className="mt-5 font-display text-h1 text-cream"
                lines={[{ text: "What usually" }, { text: "goes wrong here." }]}
              />
              <p className="mt-6 max-w-md text-cream/65">
                Every stage has a characteristic failure. Naming it is more useful than claiming it
                never happens.
              </p>
            </div>

            <RevealGroup className="col-span-12 flex flex-col gap-px bg-cream/15 lg:col-span-7" stagger={0.07}>
              {stage.whatGoesWrong.map((item) => (
                <RevealItem key={item.problem}>
                  <div className="bg-ink p-6 lg:p-7">
                    <p className="flex items-start gap-3 font-display text-base font-bold tracking-[-0.02em] text-cream">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-orange" aria-hidden="true" />
                      {item.problem}
                    </p>
                    <p className="mt-3 border-l-2 border-lime pl-4 text-sm leading-relaxed text-cream/70">
                      {item.prevention}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section zone="cream" spacing="lg" aria-labelledby="stage-faq-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="stage-faq-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "About " + stage.shortTitle.toLowerCase() + "." }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={stage.faqs} />
          </div>
        </div>
      </Section>

      {/* Stage navigation */}
      <Section zone="ivory" spacing="sm">
        <div className="shell-wide grid grid-cols-1 gap-4 sm:grid-cols-2">
          {previous ? (
            <a
              href={`/manufacturing/${previous.slug}`}
              className="group flex flex-col gap-2 border border-line bg-cream p-6 transition-colors hover:bg-white"
            >
              <span className="label text-ink/60">Previous stage</span>
              <span className="font-display text-lg font-bold tracking-[-0.025em] text-ink">
                {numeral(previous.index)}. {previous.shortTitle}
              </span>
            </a>
          ) : (
            <span />
          )}
          {next && (
            <a
              href={`/manufacturing/${next.slug}`}
              className="group flex flex-col gap-2 border border-line bg-cream p-6 text-right transition-colors hover:bg-white sm:col-start-2"
            >
              <span className="label text-ink/60">Next stage</span>
              <span className="font-display text-lg font-bold tracking-[-0.025em] text-ink">
                {numeral(next.index)}. {next.shortTitle}
              </span>
            </a>
          )}
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "TALK TO THE" }, { text: "COMMERCIAL TEAM." }]}
        body="Send a specification and we will come back on construction, materials and commercial FOB costing against it."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "All capabilities", href: "/capabilities" }}
        zone="cobalt"
      />

      <RelatedLinks
        title="Other manufacturing stages"
        links={others.slice(0, 3).map((s) => ({
          label: s.title,
          href: `/manufacturing/${s.slug}`,
          description: s.intro.split(". ")[0] + ".",
        }))}
      />
    </>
  );
}
