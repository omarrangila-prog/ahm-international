import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Button } from "@/components/ui/Button";
import { company, publicValue } from "@/data/company";
import { getCategory } from "@/data/products";
import { getLocalePage, hreflangAlternates, LOCALE_FAMILIES, localePages } from "@/data/locales";
import { numeral } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

/**
 * A landing page in one buyer language, at /de, /fr, /es, /ar, /it, /nl, /pl
 * (data/locales.ts). Its own hero, so no English breadcrumb or label appears
 * on it; `lang` and `dir` are set on the page's wrapper, so Arabic reads right
 * to left and screen readers pronounce each page in its language. hreflang
 * alternates tie the language pages and the English home together.
 */

export function generateStaticParams() {
  return localePages.map((l) => ({ lang: l.code }));
}

export const dynamicParams = false;

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const page = getLocalePage(lang);
  if (!page) return {};
  const url = `${company.siteUrl}/${page.code}`;
  return {
    title: page.seoTitle,
    description: page.seoDescription,
    alternates: { canonical: url, languages: hreflangAlternates(company.siteUrl) },
    openGraph: {
      title: `${page.seoTitle} | ${company.name}`,
      description: page.seoDescription,
      url,
      siteName: company.name,
      type: "website",
      locale: page.hreflang,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: company.name }],
    },
  };
}

export default async function LanguagePage({ params }: Params) {
  const { lang } = await params;
  const page = getLocalePage(lang);
  if (!page) notFound();

  const email = publicValue(company.email);
  const whatsapp = publicValue(company.whatsapp);
  const waHref = whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(page.cta.whatsappMessage)}` : null;
  const quote = `/request-a-quote?source=lang-${page.code}`;
  const families = LOCALE_FAMILIES.map((slug) => ({ slug, name: page.products[slug], family: getCategory(slug) })).filter(
    (f) => f.family && f.name,
  );

  return (
    <div lang={page.hreflang} dir={page.dir}>
      {/* No visible breadcrumb (it would be in English); the trail is in the data. */}
      <JsonLd data={breadcrumbSchema([{ name: company.name, path: "/" }, { name: page.native, path: `/${page.code}` }])} />
      {/* Hero */}
      <Section zone="paper" spacing="lg" aria-labelledby="lang-hero">
        <div className="shell-wide">
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <h1 id="lang-hero" className="mt-6 font-display text-display text-ink">
            {page.headline.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">{page.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={quote} size="lg" withArrow>
              {page.cta.quote}
            </Button>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center border border-ink/25 px-7 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink hover:border-ink"
              >
                {page.cta.whatsapp}
              </a>
            )}
          </div>
        </div>
      </Section>

      {/* Figures */}
      <Section zone="ink" spacing="md" aria-label={page.eyebrow}>
        <dl className="shell-wide grid grid-cols-1 gap-10 sm:grid-cols-3">
          {[
            [page.figures.own, page.figures.ownNote],
            [page.figures.partners, page.figures.partnersNote],
            [page.figures.export, page.figures.exportNote],
          ].map(([value, note]) => (
            <div key={note}>
              <dt className="font-display text-[clamp(2.75rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] text-lime">{value}</dt>
              <dd className="mt-3 max-w-xs text-sm leading-relaxed text-paper/80">{note}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Products */}
      <Section zone="paper" spacing="lg" aria-labelledby="lang-products">
        <div className="shell-wide">
          <h2 id="lang-products" className="font-display text-h1 text-ink">{page.productsHeading}</h2>
          <p className="mt-3 text-sm text-ink/70">{page.productsNote}</p>
          <ul className="mt-10 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {families.map((f) => (
              <li key={f.slug} className="bg-paper">
                <Link
                  href={`/products/${f.slug}`}
                  hrefLang="en"
                  className="flex min-h-16 items-center justify-between gap-4 p-5 font-display text-lg font-bold text-ink hover:bg-paper-deep"
                >
                  <span>{f.name}</span>
                  <span aria-hidden="true" className="text-ink/60 rtl:rotate-180">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Process */}
      <Section zone="lime" spacing="lg" aria-labelledby="lang-process">
        <div className="shell-wide">
          <h2 id="lang-process" className="font-display text-h1 text-ink">{page.processHeading}</h2>
          <ol className="mt-10 grid grid-cols-1 gap-px border border-ink/20 bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, i) => (
              <li key={step.title} className="bg-lime p-6">
                <p className="label text-ink/70">{numeral(i + 1)}</p>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {page.trade && (
        <Section zone="paper" spacing="md" aria-labelledby="lang-trade">
          <div className="shell-wide">
            <div className="max-w-3xl">
              <h2 id="lang-trade" className="font-display text-h2 text-ink">{page.trade.heading}</h2>
              <p className="mt-4 leading-relaxed text-ink/80">{page.trade.body}</p>
            </div>
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section zone="paper" spacing="lg" aria-labelledby="lang-faq">
        <div className="shell-wide grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <h2 id="lang-faq" className="col-span-12 font-display text-h1 text-ink lg:col-span-4">{page.faqHeading}</h2>
          <div className="col-span-12 lg:col-span-8">
            <Faq items={page.faqs} />
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section zone="ink" spacing="lg" aria-labelledby="lang-contact">
        <div className="shell-wide">
          <h2 id="lang-contact" className="font-display text-h1 text-paper">{page.contactHeading}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-paper/80">{page.contactBody}</p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
            {email && (
              <a href={`mailto:${email}`} className="font-display font-bold text-lime underline-offset-4 hover:underline" dir="ltr">
                {email}
              </a>
            )}
            {waHref && whatsapp && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="font-display font-bold text-lime underline-offset-4 hover:underline" dir="ltr">
                WhatsApp +{whatsapp.replace(/\D/g, "")}
              </a>
            )}
          </div>
          <p className="mt-10 text-xs text-paper/70">
            {page.draftNote}{" "}
            <Link href="/" hrefLang="en" className="underline underline-offset-4">English</Link>
          </p>
        </div>
      </Section>
    </div>
  );
}
