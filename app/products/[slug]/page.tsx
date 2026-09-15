import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow, Rule } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { SpecTable } from "@/components/ui/SpecTable";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { JsonLd } from "@/components/ui/JsonLd";
import { IndustryCard } from "@/components/products/IndustryCard";
import { Button } from "@/components/ui/Button";
import { productCategories, getCategory, SPEC_DISCLAIMER } from "@/data/products";
import { getProductFaqs } from "@/data/product-faqs";
import { industries } from "@/data/industries";
import { processStages } from "@/data/process";
import { caseStudies } from "@/data/caseStudies";
import { pageMetadata, productSchema } from "@/lib/seo";
import { firstAvailable, hasAsset, hasCanonicalAsset, type AssetKey } from "@/data/assets";
import { numeral } from "@/lib/utils";

/**
 * Product category page.
 *
 * One template, seven genuinely different pages: the articles, specification
 * frame, decoration routes, applications and FAQs all come from per-category
 * data, so no two pages are near-duplicates of each other.
 *
 * `Product` structured data is emitted without an `offers` block. AHM quotes
 * against a specification, so there is no price to declare — and inventing one
 * to satisfy a rich-result warning would put a claim in the markup that the page
 * does not make.
 */

export function generateStaticParams() {
  return productCategories.map((category) => ({ slug: category.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  return pageMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/products/${category.slug}`,
  });
}

export default async function ProductCategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const faqs = getProductFaqs(category.slug);
  const applicationIndustries = industries.filter((i) =>
    category.applications.some((a) => a.toLowerCase() === i.name.toLowerCase()),
  );
  const relevantCase = caseStudies.find((c) =>
    category.subcategories.some((s) => c.category.toLowerCase().includes(s.split(" ")[0].toLowerCase())),
  );
  const others = productCategories.filter((c) => c.slug !== category.slug).slice(0, 3);

  // Development stages a buyer of this category actually passes through.
  const devStages = processStages.slice(0, 5);

  // Prefer detail slots that have real imagery, then top up from this category's
  // own articles. A row of three where two are pending reads as an empty page,
  // so available assets are promoted rather than shown in registry order.
  const detailPool: AssetKey[] = [
    ...category.detailAssets,
    ...category.articles.map((a) => a.asset),
  ];
  const detailRow = [
    ...detailPool.filter((a) => hasAsset(a)),
    ...detailPool.filter((a) => !hasAsset(a)),
  ]
    .filter((a, i, all) => all.indexOf(a) === i)
    .slice(0, 3);

  /**
   * Only articles whose own photograph exists.
   *
   * A fallback renders something, which is right for a product card and wrong
   * for a gallery headed "Photographed from production" — a render there is a
   * studio illustration presented as a production sample. After the branded
   * samples were withdrawn, twenty-one of the thirty-two frames in this strip
   * had become the same studio polo.
   */
  const photographedSamples: AssetKey[] = (category.photography ?? []).filter(hasCanonicalAsset);

  const headingLines = category.headline.split("\n").map((line, i) => ({
    text: line,
    className: i === 1 ? "text-ink" : undefined,
  }));

  return (
    <>
      <JsonLd
        data={productSchema({
          name: `${category.name} manufacturing`,
          description: category.seoDescription,
          path: `/products/${category.slug}`,
          category: category.name,
        })}
      />


      <PageHero
        eyebrow={`Products: ${numeral(category.index)}`}
        headingLines={headingLines}
        intro={category.intro}
        trail={[
          { name: "Products", path: "/products" },
          { name: category.name, path: `/products/${category.slug}` },
        ]}
        zone="paper"
        // Photography first; otherwise the first article that actually has a
        // photograph, so a missing file never opens an empty hero frame.
        asset={firstAvailable(category.heroAsset, category.articles[0].asset)}
        priority
        primaryCta={{ label: "Request FOB Costing", href: `/request-a-quote?category=${encodeURIComponent(category.name)}` }}
        secondaryCta={{ label: "Send an Existing Spec", href: "/send-tech-pack" }}
      />

      {/* ---------------- Article range ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="articles-heading">
        <div className="shell-wide">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Eyebrow>Product types</Eyebrow>
              <MaskedHeading
                as="h2"
                id="articles-heading"
                className="mt-5 font-display text-h1 text-ink"
                lines={[{ text: "Articles in this" }, { text: "category." }]}
              />
            </div>
            <ul className="flex flex-wrap gap-2 lg:pb-2">
              {category.subcategories.map((sub) => (
                <li key={sub} className="border border-ink/20 px-3.5 py-2 text-xs text-ink/70">
                  {sub}
                </li>
              ))}
            </ul>
          </div>

          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
            {category.articles.map((article) => (
              <RevealItem key={article.name}>
                <article className="group flex h-full flex-col border border-line bg-paper">
                  {/* The frame is dropped rather than filled when no photograph
                      resolves. The article name and note are true without one,
                      and an empty plate beside real product shots reads as a
                      broken image — which is the rule the whole asset system
                      exists to keep. */}
                  {hasAsset(article.asset) && (
                    <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                      <SmartImage
                        asset={article.asset}
                        sizes={SIZES.third}
                        className="h-full w-full"
                        imageClassName="object-contain p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-display text-base font-bold tracking-[-0.02em] text-ink">
                        {article.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/65">{article.note}</p>
                    </div>
                    <p className="label mt-5 text-ink/70">Representative article</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---------------- Specification ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="spec-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Specification</Eyebrow>
            <MaskedHeading
              as="h2"
              id="spec-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What we confirm" }, { text: "before quoting." }]}
            />
            <p className="mt-6 text-ink/70">
              These are the fields resolved during development. Where a value depends on your
              program, we say so rather than publishing a number that would not survive contact with
              your specification.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/request-a-quote?category=${encodeURIComponent(category.name)}`} size="md" withArrow>
                Benchmark FOB Price
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <SpecTable rows={category.specification} />
            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink/70">{SPEC_DISCLAIMER}</p>

            {/* Decoration */}
            <div className="mt-14">
              <h3 className="font-display text-h3 text-ink">Decoration routes</h3>
              <p className="mt-2 max-w-2xl text-sm text-ink/65">
                Approved as a strike-off or sew-out on the bulk fabric before production, not after.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {category.decoration.map((item) => (
                  <li
                    key={item}
                    className="border border-ink/20 px-4 py-2.5 text-sm text-ink/75"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Detail imagery. 3:2 frames match the technical-detail crop, so
                nothing is cut, and only details that exist are rendered. An
                empty frame beside a real one reads as a broken image. */}
            {detailRow.some(hasAsset) && (
            <div className="mt-14 grid grid-cols-3 gap-3">
              {detailRow.filter(hasAsset).map((asset) => (
                <div key={asset} className="zoom-frame group aspect-[3/2] w-full overflow-hidden bg-paper">
                  <SmartImage
                    asset={asset}
                    sizes={SIZES.third}
                    className="h-full w-full"
                    imageClassName="object-cover"
                  />
                </div>
              ))}
            </div>
            )}
          </div>
        </div>
      </Section>


      {/* ---------------- Photographed samples ---------------- */}
      {photographedSamples.length > 0 && (
        <Section zone="paper" spacing="lg" aria-labelledby="samples-heading">
          <div className="shell-wide">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <Eyebrow>Production samples</Eyebrow>
                <MaskedHeading
                  as="h2"
                  id="samples-heading"
                  className="mt-5 font-display text-h1 text-ink"
                  lines={[{ text: "Photographed" }, { text: "from production." }]}
                />
              </div>
              <p className="max-w-sm text-sm text-ink/70 lg:pb-2">
                Articles produced to buyer specification, shown as construction
                references.{" "}
                {photographedSamples.length > 12 &&
                  `${photographedSamples.length} samples photographed for this category.`}
              </p>
            </div>

            <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3" stagger={0.06}>
              {photographedSamples.slice(0, 12).map((asset) => (
                <RevealItem key={asset}>
                  <figure className="group">
                    <div className="zoom-frame aspect-[4/5] w-full overflow-hidden bg-white">
                      <SmartImage
                        asset={asset}
                        sizes={SIZES.third}
                        className="h-full w-full"
                        imageClassName="object-contain p-4"
                      />
                    </div>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      {/* ---------------- Development path ---------------- */}
      <Section zone="ink" spacing="lg" tooth aria-labelledby="devpath-heading">
        <div className="shell-wide relative z-10">
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow>Development</Eyebrow>
              <MaskedHeading
                as="h2"
                id="devpath-heading"
                className="mt-5 font-display text-h1 text-paper"
                lines={[
                  { text: "How your " + category.programNoun },
                  { text: "program starts." },
                ]}
              />
              <p className="mt-6 max-w-md text-paper/65">
                The first five stages decide most of the cost. After approval, production is
                execution against a document you have already signed.
              </p>
              <div className="mt-8">
                <Button href="/development" variant="lime" size="md" withArrow>
                  See the full process
                </Button>
              </div>
            </div>

            <ol className="col-span-12 lg:col-span-7">
              {devStages.map((stage) => (
                <li key={stage.index} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-paper/15 py-5">
                  <span className="numeral text-lg text-lime">{numeral(stage.index)}</span>
                  <div>
                    <h3 className="font-display text-base font-bold tracking-[-0.02em] text-paper">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-paper/65">{stage.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ---------------- Applications ---------------- */}
      {applicationIndustries.length > 0 && (
        <Section zone="paper" spacing="lg" aria-labelledby="apps-heading">
          <div className="shell-wide">
            <Eyebrow>Applications</Eyebrow>
            <MaskedHeading
              as="h2"
              id="apps-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "Where these" }, { text: "garments work." }]}
            />

            <RevealGroup className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4" stagger={0.07}>
              {applicationIndustries.slice(0, 4).map((industry) => (
                <RevealItem key={industry.slug}>
                  <Link href={`/industries/${industry.slug}`} className="block">
                    <IndustryCard industry={industry} tone="light" sizes={SIZES.quarter} />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-8">
              <Link
                href="/industries"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                All uniform program industries
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* ---------------- Case study ---------------- */}
      {relevantCase && (
        <Section zone="paper" spacing="lg" aria-labelledby="case-heading">
          <div className="shell-wide">
            <Eyebrow>Documented program</Eyebrow>
            <Reveal className="mt-8">
              <Link
                href={`/case-studies/${relevantCase.slug}`}
                className="group grid grid-cols-1 border border-line bg-paper sm:grid-cols-3"
              >
                {hasAsset("products.apron.front") && (
                <div className="aspect-square w-full overflow-hidden bg-white sm:aspect-auto">
                  <SmartImage
                    asset="products.apron.front"
                    sizes={SIZES.third}
                    className="h-full w-full"
                    imageClassName="object-contain p-8"
                    alt="Bib apron produced for the documented United States uniform program"
                  />
                </div>
                )}
                <div className="p-7 sm:col-span-2 lg:p-10">
                  <h2 id="case-heading" className="font-display text-h2 text-ink">
                    {relevantCase.anonymisedTitle}
                  </h2>
                  <p className="mt-4 max-w-xl text-ink/70">{relevantCase.requirement}</p>
                  <Rule className="my-6 text-ink" />
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                    {[
                      { label: "Market", value: relevantCase.market },
                      { label: "Material", value: relevantCase.material },
                      { label: "Delivery", value: relevantCase.exportMode },
                    ].map((row) => (
                      <div key={row.label}>
                        <dt className="label text-ink/65">{row.label}</dt>
                        <dd className="mt-1.5 text-sm text-ink/80">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read the full program
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </Section>
      )}

      {/* ---------------- FAQ ---------------- */}
      {faqs.length > 0 && (
        <Section zone="paper" spacing="lg" aria-labelledby="faq-heading">
          <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <Eyebrow>Buyer questions</Eyebrow>
              <MaskedHeading
                as="h2"
                id="faq-heading"
                className="mt-5 font-display text-h1 text-ink"
                lines={[{ text: "Questions we" }, { text: "get asked." }]}
              />
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Faq items={faqs} />
            </div>
          </div>
        </Section>
      )}

      <CtaBand
        headingLines={[
          { text: "SEND YOUR" },
          { text: `${category.programNoun.toUpperCase()} SPEC.` },
        ]}
        body="One style is enough to see how we work. Send a tech pack, a reference garment or a written requirement and we will come back on construction, materials and FOB costing."
        primary={{ label: "Request FOB Quote", href: `/request-a-quote?category=${encodeURIComponent(category.name)}` }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        links={[
          ...others.map((c) => ({
            label: `${c.name} manufacturing`,
            href: `/products/${c.slug}`,
            description: c.intro,
          })),
          {
            label: "Materials and fabric selection",
            href: "/materials",
            description: "Construction families, typical program weights, finishes and where each is used.",
          },
          {
            label: "Quality assurance process",
            href: "/quality",
            description: "Where inspection happens and what is checked at each stage.",
          },
          {
            label: "FOB export from Port Qasim",
            href: "/export",
            description: "Documentation, packing, carton marking and handover.",
          },
        ]}
      />
    </>
  );
}
