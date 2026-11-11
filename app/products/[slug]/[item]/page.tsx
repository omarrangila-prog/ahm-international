import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { SpecTable } from "@/components/ui/SpecTable";
import { Faq } from "@/components/ui/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageViewEvent } from "@/components/ui/PageViewEvent";
import { Button } from "@/components/ui/Button";
import { ConstructionCallouts } from "@/components/products/ConstructionCallouts";
import { getCategory, productCategories, SPEC_DISCLAIMER } from "@/data/products";
import {
  articleFor,
  COMMERCIAL_ROWS,
  getItem,
  itemPath,
  itemsInFamily,
  itemStatus,
  productItems,
} from "@/data/items";
import { CAPABILITY_LABEL } from "@/data/verification";
import { hasAsset, resolveAsset } from "@/data/assets";
import { pageMetadata, productSchema } from "@/lib/seo";
import { calloutSurface } from "@/lib/provenance";
import { numeral } from "@/lib/utils";

/**
 * Item page: one garment, at /products/<family>/<item>.
 *
 * Everything particular to the garment comes from data/items.ts (what to
 * measure, the construction choices, where the logo goes, its questions).
 * What is shared with the family is read from the family rather than copied:
 * the decoration methods, the benchmark process, the image and the capability
 * status. Like the family page, the Product schema carries no offers, because
 * nothing here has a price.
 */

export function generateStaticParams() {
  return productItems.map((i) => ({ slug: i.family, item: i.slug }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string; item: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, item: itemSlug } = await params;
  const item = getItem(slug, itemSlug);
  if (!item) return {};
  return pageMetadata({ title: item.seoTitle, description: item.seoDescription, path: itemPath(item) });
}

export default async function ItemPage({ params }: Params) {
  const { slug, item: itemSlug } = await params;
  const item = getItem(slug, itemSlug);
  const family = getCategory(slug);
  if (!item || !family) notFound();

  const found = articleFor(item);
  const asset = item.image === false ? undefined : found?.article.asset;
  const showImage = asset !== undefined && hasAsset(asset);
  const status = itemStatus(item);
  // Construction points only when the family marked them on this very image.
  const callouts = productCategories.find((c) => c.callouts && asset && c.callouts.asset === asset)?.callouts;
  const siblings = itemsInFamily(family.slug).filter((i) => i.slug !== item.slug);
  const alsoIn = productCategories.filter(
    (c) => c.slug !== family.slug && c.articles.some((a) => item.names.includes(a.name)),
  );
  const quote = `/request-a-quote?${new URLSearchParams({ category: family.name, style: item.title, source: `${item.slug}_item` })}`;

  return (
    <>
      <PageViewEvent event="product_view" detail={`${family.slug}/${item.slug}`} />
      <JsonLd
        data={productSchema({
          name: item.title,
          description: item.seoDescription,
          path: itemPath(item),
          category: family.name,
        })}
      />

      <PageHero
        eyebrow={`${family.name} · ${CAPABILITY_LABEL[status]}`}
        headingLines={[{ text: item.title }]}
        intro={item.intro}
        trail={[
          { name: "Products", path: "/products" },
          { name: family.name, path: `/products/${family.slug}` },
          { name: item.title, path: itemPath(item) },
        ]}
        zone="paper"
        asset={showImage ? asset : undefined}
        priority
        primaryCta={{ label: "Request FOB Costing", href: quote }}
        secondaryCta={{ label: "Send an Existing Spec", href: "/send-tech-pack" }}
      />

      {/* ---------------- The short answer and the choices ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="choices-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <Eyebrow>In short</Eyebrow>
            <p className="mt-5 text-lg leading-relaxed text-ink/80">{item.summary}</p>
            {alsoIn.length > 0 && (
              <p className="mt-6 text-sm text-ink/70">
                Also part of{" "}
                {alsoIn.map((c, i) => (
                  <span key={c.slug}>
                    {i > 0 && ", "}
                    <Link href={`/products/${c.slug}`} className="underline underline-offset-4 hover:text-ink">
                      {c.name}
                    </Link>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
          <div className="col-span-12 lg:col-span-7">
            <h2 id="choices-heading" className="font-display text-h3 text-ink">
              Construction choices
            </h2>
            <dl className="mt-5 divide-y divide-line border-y border-line">
              {item.features.map((f) => (
                <div key={f.term} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="font-display font-bold tracking-[-0.01em] text-ink">{f.term}</dt>
                  <dd className="text-sm leading-relaxed text-ink/75">{f.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ---------------- Construction points, where the image shows them ---------------- */}
      {callouts && asset && (
        <Section zone="paper" spacing="lg" aria-labelledby="construction-heading">
          <div className="shell-wide">
            <Eyebrow>Construction</Eyebrow>
            <MaskedHeading
              as="h2"
              id="construction-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What to look at" }, { text: "on this style." }]}
            />
            <div className="mt-12">
              <ConstructionCallouts
                image={<SmartImage asset={asset} sizes={SIZES.half} className="h-full w-full" imageClassName="object-contain" />}
                points={callouts.points}
                aspect={resolveAsset(asset).aspect}
                note={`${calloutSurface(resolveAsset(asset).origin)} ${callouts.note}`}
              />
            </div>
          </div>
        </Section>
      )}

      {/* ---------------- Points of measure ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="measure-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Size chart</Eyebrow>
            <MaskedHeading
              as="h2"
              id="measure-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What to" }, { text: "measure." }]}
            />
            <p className="mt-6 text-ink/70">
              The points a size chart for this garment needs, and how each is taken. Give every one a value and a tolerance
              for each size, and measure the sample after washing.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Points of measure for the {item.title}</caption>
              <thead className="text-xs text-ink/70">
                <tr>
                  <th scope="col" className="hidden w-12 pb-3 font-medium sm:table-cell">#</th>
                  <th scope="col" className="pb-3 font-medium">Point</th>
                  <th scope="col" className="pb-3 font-medium">How it is measured</th>
                </tr>
              </thead>
              <tbody>
                {item.measurements.map((row, i) => (
                  <tr key={row.point} className="border-t border-line align-top">
                    <td className="hidden py-3 font-mono text-ink/70 sm:table-cell">{numeral(i + 1)}</td>
                    <th scope="row" className="w-[38%] py-3 pr-4 font-display font-bold text-ink">{row.point}</th>
                    <td className="py-3 leading-relaxed text-ink/75">{row.how}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* ---------------- Specification and decoration ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="spec-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Specification</Eyebrow>
            <MaskedHeading
              as="h2"
              id="spec-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "What we confirm" }, { text: "before quoting." }]}
            />
            <div className="mt-8">
              <Button href={quote} size="md" withArrow>
                Quote this {item.title.toLowerCase()}
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <SpecTable rows={[...item.specification, ...COMMERCIAL_ROWS]} />
            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink/70">{SPEC_DISCLAIMER}</p>

            <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <h3 className="font-display text-h3 text-ink">Logo positions</h3>
                <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/75">
                  {item.logoPositions.map((p) => (
                    <li key={p} className="border-l-2 border-ink/20 pl-3">{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-h3 text-ink">Decoration methods</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {family.decoration.map((d) => (
                    <li key={d} className="border border-ink/20 px-3.5 py-2 text-sm text-ink/75">{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- Benchmark offer, the family's process ---------------- */}
      {family.costComparison && (
        <Section zone="lime" spacing="lg" tooth aria-labelledby="compare-heading">
          <div className="shell-wide relative z-10 grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <Eyebrow>Already buying?</Eyebrow>
              <h2 id="compare-heading" className="mt-5 font-display text-h1 text-ink">
                Already buying this {item.title.toLowerCase()}? Let us benchmark it.
              </h2>
              <p className="mt-6 max-w-md text-ink/75">{family.costComparison.intro}</p>
              <div className="mt-8">
                <Button href="/benchmark-a-style" size="md" withArrow>
                  Benchmark my style
                </Button>
              </div>
            </div>
            <ol className="col-span-12 grid grid-cols-1 gap-px border border-ink/20 bg-ink/20 sm:grid-cols-2 lg:col-span-7">
              {family.costComparison.steps.map((step, i) => (
                <li key={step.title} className="bg-lime p-6">
                  <p className="label text-ink/70">{numeral(i + 1)}</p>
                  <h3 className="mt-3 font-display text-lg font-bold tracking-[-0.015em] text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/75">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      {/* ---------------- Questions ---------------- */}
      <Section zone="paper" spacing="lg" aria-labelledby="faq-heading">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <Eyebrow>Buyer questions</Eyebrow>
            <MaskedHeading
              as="h2"
              id="faq-heading"
              className="mt-5 font-display text-h1 text-ink"
              lines={[{ text: "About the" }, { text: `${item.title.toLowerCase()}.` }]}
            />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={item.faqs} />
          </div>
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "SEND YOUR" }, { text: `${item.title.toUpperCase()} SPEC.` }]}
        body="A tech pack, a reference garment or a written requirement is enough to start. We come back on construction, materials and FOB costing."
        primary={{ label: "Request FOB Quote", href: quote }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />

      <RelatedLinks
        title="Explore next"
        guidesFor={`/products/${family.slug}`}
        links={[
          { label: `All ${family.name.toLowerCase()}`, href: `/products/${family.slug}`, description: family.intro },
          ...siblings.slice(0, 3).map((s) => ({ label: s.title, href: itemPath(s), description: s.intro })),
        ]}
      />
    </>
  );
}
