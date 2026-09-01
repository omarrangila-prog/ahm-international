import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { caseStudies, getCaseStudy } from "@/data/caseStudies";
import { pageMetadata } from "@/lib/seo";
import { numeral } from "@/lib/utils";

/**
 * Case study page.
 *
 * The customer is not named because the data model has no field for their name —
 * anonymity is a property of the content, not of this template remembering to
 * hide something. A logo would additionally require `logoPermission: true`, which
 * is typed as `false` until written permission exists.
 */

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.category} Case Study. ${study.market}`,
    description: `${study.requirement} Manufactured in Karachi, Pakistan and supplied ${study.exportMode}.`,
    path: `/case-studies/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const record = [
    { label: "Market", value: study.market },
    { label: "Category", value: study.category },
    { label: "Material", value: study.material },
    { label: "Export mode", value: study.exportMode },
  ];

  const narrative = [
    { title: "Requirement", body: study.requirement },
    { title: "Development", body: study.development },
    { title: "Manufacturing", body: study.manufacturing },
    { title: "Quality", body: study.quality },
    { title: "Outcome", body: study.outcome },
  ];

  return (
    <>
      <ReadingProgress />
      <PageViewEvent event="case_study_viewed" detail={slug} />
      <PageHero
        eyebrow="Case study"
        headingLines={[{ text: study.anonymisedTitle.toUpperCase() }]}
        intro={study.requirement}
        trail={[
          { name: "Case Studies", path: "/case-studies" },
          { name: study.anonymisedTitle, path: `/case-studies/${study.slug}` },
        ]}
        zone="cream"
        facts={record}
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondaryCta={{ label: "Aprons", href: "/products/aprons" }}
      />

      <Section zone="ivory" spacing="lg" aria-labelledby="program-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <Eyebrow>The program</Eyebrow>
            <MaskedHeading
              as="h2"
              id="program-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "How it was" }, { text: "made." }]}
            />

            <ol className="mt-10 border-t border-line">
              {narrative.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-6">
                  <span className="numeral text-lg text-cobalt">{numeral(i + 1)}</span>
                  <div>
                    <h3 className="font-display text-h3 text-ink">{item.title}</h3>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/70">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                <SmartImage
                  asset="products.apron.front"
                  sizes={SIZES.half}
                  className="h-full w-full"
                  imageClassName="object-contain p-10"
                  alt="Three-pocket bib apron of the type produced for this program"
                />
              </div>
            </Reveal>

            <div className="mt-4 border border-line bg-cream p-6">
              <p className="label text-ink/60">Confidentiality</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                The customer is not identified on this page, and their name does not appear in the
                data behind it. No purchase order value, unit price, quantity or specification
                detail from the program is published.
              </p>
            </div>

            <RevealGroup className="mt-4 grid grid-cols-3 gap-3" stagger={0.06}>
              {/* Read from the case study's own declared assets rather than a
                  hardcoded list. The list previously named `export.cartons` — a
                  synthetic crop of a generic packaging photograph — in place of
                  the program's actual product shot, which now exists. Driving
                  this from the data means a new case study brings its own
                  imagery without editing this component. */}
              {([study.assets.product, study.assets.fabric, study.assets.detail] as const).map((asset) => (
                <RevealItem key={asset}>
                  <div className="aspect-square w-full overflow-hidden bg-ivory">
                    <SmartImage asset={asset} sizes={SIZES.thumb} className="h-full w-full" imageClassName="object-cover" />
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "RUN A SIMILAR" }, { text: "PROGRAM." }]}
        body="Send your apron or uniform specification and we will come back on construction, fabric options and commercial FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote" }}
        secondary={{ label: "Apron manufacturing", href: "/products/aprons" }}
        zone="orange"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          { label: "Apron manufacturing", href: "/products/aprons", description: "Bib, waist, chef, service and utility aprons." },
          { label: "Grocery uniform programs", href: "/industries/grocery", description: "What high wash frequency does to a uniform program." },
          { label: "FOB export from Port Qasim", href: "/export", description: "Documentation, packing, marking and handover." },
        ]}
      />
    </>
  );
}
