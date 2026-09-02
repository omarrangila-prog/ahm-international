import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, type ZoneName } from "@/components/ui/Section";
import { guidesLinkingTo } from "@/data/guides";

/**
 * Related-content block.
 *
 * The internal-link graph in visible form. Anchor text names the destination in
 * the reader's language ("performance polo manufacturing"), which is both what a
 * buyer scans for and what makes the link meaningful to a crawler. Descriptions
 * keep each link from being an exact-match repeat of the last.
 *
 * `guidesFor` appends the published guides that name this route in their own
 * `related` list. Hand-written blocks pointed at other hub pages and never at a
 * guide, which left seven of the nine guides reachable only from `/resources`.
 * Deriving the back-link means a new guide surfaces on the pages it is about the
 * day it ships, without anyone remembering to add it in two places.
 */

export type RelatedLink = { label: string; href: string; description: string };

export function RelatedLinks({
  title = "Related",
  links,
  zone = "paper",
  guidesFor,
}: {
  title?: string;
  links: RelatedLink[];
  zone?: ZoneName;
  /** Route whose published guides should be appended. */
  guidesFor?: string;
}) {
  const derived = guidesFor ? guidesLinkingTo(guidesFor) : [];
  // A hand-written link wins: it was written for this page and says more.
  const seen = new Set(links.map((l) => l.href));
  const all = [...links, ...derived.filter((g) => !seen.has(g.href))];

  if (all.length === 0) return null;

  return (
    <Section zone={zone} spacing="md" aria-labelledby="related-heading">
      <div className="shell-wide">
        <Eyebrow>{title}</Eyebrow>
        <h2 id="related-heading" className="sr-only">
          {title}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {all.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="group flex h-full flex-col justify-between gap-5 bg-paper p-6 transition-colors duration-300 hover:bg-white"
              >
                <div>
                  <p className="font-display text-lg font-bold tracking-[-0.025em] text-ink">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{link.description}</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-ink/70 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}

          {/* The grid draws its hairlines with a `gap-px` over a `bg-line`
              ground, so a part-filled last row shows the ground as an empty
              tile. Three links always filled the row exactly; derived guides
              made partial rows normal, so the remainder is padded out. */}
          {Array.from({ length: (3 - (all.length % 3)) % 3 }).map((_, i) => (
            <li key={`filler-${i}`} className="hidden bg-paper lg:block" aria-hidden="true" />
          ))}
        </ul>
      </div>
    </Section>
  );
}
