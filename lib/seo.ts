import type { Metadata } from "next";
import { company, publicValue } from "@/data/company";

const SITE_URL = company.siteUrl;

export const siteConfig = {
  name: company.name,
  url: SITE_URL,
  tagline: "From tech pack to FOB shipment.",
  description:
    "Apparel manufacturing and FOB export from Karachi, Pakistan. Product development, commercial costing and production for international uniform, workwear and sourcing programs.",
} as const;

type PageMetaInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/products/aprons". */
  path: string;
  /** Overrides the default OG image. */
  image?: string;
};

/**
 * Builds page metadata with a canonical URL, OpenGraph and Twitter cards.
 *
 * Titles are written per page rather than templated from a keyword list — the
 * target terms appear because the page is genuinely about them.
 */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${company.name}`,
      description,
      url,
      siteName: company.name,
      type: "website",
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${company.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${company.name}`,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

/**
 * Organization schema.
 *
 * Only verified facts are emitted. Contact points, addresses and certifications
 * are omitted entirely when unverified rather than filled with placeholders —
 * structured data that contradicts reality is worse than no structured data.
 */
export function organizationSchema() {
  const email = publicValue(company.email);
  const phone = publicValue(company.phone);
  const street = publicValue(company.streetAddress);
  const legalName = publicValue(company.legalName);

  const socials = [publicValue(company.social.linkedin), publicValue(company.social.instagram)].filter(
    (v): v is string => Boolean(v),
  );

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    // Emitted only once the registered name is verified. Procurement teams and
    // search engines both read this to match the site to a real entity.
    ...(legalName ? { legalName } : {}),
    url: SITE_URL,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: company.city,
      addressRegion: company.region,
      addressCountry: "PK",
      ...(street ? { streetAddress: street } : {}),
    },
    ...(socials.length ? { sameAs: socials } : {}),
    ...(email || phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            availableLanguage: ["English", "Urdu"],
            ...(email ? { email } : {}),
            ...(phone ? { telephone: phone } : {}),
          },
        }
      : {}),
    knowsAbout: [
      "Apparel manufacturing",
      "Uniform manufacturing",
      "Workwear manufacturing",
      "Private label apparel",
      "FOB apparel export",
      "Garment product development",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    description: siteConfig.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * Product schema for a category page.
 *
 * Deliberately carries no `offers` block — there is no published price, and
 * inventing one to satisfy a rich-result warning would be a lie in structured
 * data. Pricing is quoted against a specification.
 */
export function productSchema(input: { name: string; description: string; path: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    category: input.category,
    url: `${SITE_URL}${input.path}`,
    brand: { "@type": "Brand", name: company.name },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Article schema for a buyer guide.
 *
 * Emitted only for the resource guides, which genuinely have a reviewer and a
 * review date shown on the page. `author` and `reviewedBy` are the team, not an
 * invented individual — a fabricated byline is exactly the kind of manufactured
 * credibility this site avoids, and Google treats it as a quality signal in the
 * wrong direction.
 */
export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  reviewedBy: string;
  lastReviewed: string;
  section: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    articleSection: input.section,
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@type": "Organization", name: input.reviewedBy, url: SITE_URL },
    reviewedBy: { "@type": "Organization", name: input.reviewedBy },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${input.path}` },
  };
}

/**
 * ItemList for a category or index page.
 *
 * Describes the list a visitor can actually see, in the order it is rendered.
 */
export function itemListSchema(input: {
  name: string;
  path: string;
  items: { name: string; path: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: input.name,
    url: `${SITE_URL}${input.path}`,
    numberOfItems: input.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE_URL}${item.path}`,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/**
 * Service schema for a manufacturing capability.
 *
 * Carries no price and no aggregate rating — AHM quotes against a specification,
 * and there are no reviews. Declaring either would put a claim in the markup
 * that the page does not make.
 */
export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    serviceType: "Apparel manufacturing",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: company.targetMarkets.map((m) => ({ "@type": "Country", name: m })),
  };
}
