import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Eyebrow, type ZoneName } from "@/components/ui/Section";

/**
 * Related-content block.
 *
 * The internal-link graph in visible form. Anchor text names the destination in
 * the reader's language ("performance polo manufacturing"), which is both what a
 * buyer scans for and what makes the link meaningful to a crawler. Descriptions
 * keep each link from being an exact-match repeat of the last.
 */

export type RelatedLink = { label: string; href: string; description: string };

export function RelatedLinks({
  title = "Related",
  links,
  zone = "ivory",
}: {
  title?: string;
  links: RelatedLink[];
  zone?: ZoneName;
}) {
  if (links.length === 0) return null;

  return (
    <Section zone={zone} spacing="md" aria-labelledby="related-heading">
      <div className="shell-wide">
        <Eyebrow>{title}</Eyebrow>
        <h2 id="related-heading" className="sr-only">
          {title}
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href + link.label}>
              <Link
                href={link.href}
                className="group flex h-full flex-col justify-between gap-5 bg-cream p-6 transition-colors duration-300 hover:bg-white"
              >
                <div>
                  <p className="font-display text-lg font-bold tracking-[-0.025em] text-ink">
                    {link.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{link.description}</p>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-ink/70 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
