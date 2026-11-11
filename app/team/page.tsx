import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ThreadTree } from "@/components/team/ThreadTree";
import { organisation, teamPublished, teamTotal } from "@/data/team";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Team",
  description:
    "How AHM International is organised: the departments behind development, production, quality and export, and the people who lead them.",
  path: "/team",
});

const asOf = (iso: string | null) =>
  iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : null;

/**
 * The team, as a tree of thread (components/team/ThreadTree.tsx).
 *
 * Exists only once data/team.ts holds a real structure with its source; until
 * then it is a 404, noindex and outside the sitemap. Numbers are the owner's,
 * as of a stated date, and the page says so.
 */
export default function TeamPage() {
  if (!teamPublished()) notFound();
  const total = teamTotal();
  const date = asOf(organisation.asOf);

  return (
    <>
      <PageHero
        eyebrow="Our team"
        headingLines={[{ text: "The people" }, { text: "behind every", className: "text-ink" }, { text: "program." }]}
        intro={`How AHM International is organised${total > 0 ? `: ${total.toLocaleString("en-GB")} people across ${organisation.departments.length} departments` : ""}${date ? `, as of ${date}` : ""}. Partner factories are shown apart, because their people are not AHM's staff.`}
        trail={[
          { name: "About", path: "/about" },
          { name: "Our team", path: "/team" },
        ]}
        zone="paper"
        primaryCta={{ label: "Request FOB Quote", href: "/request-a-quote?source=team" }}
        secondaryCta={{ label: "Contact the team", href: "/contact" }}
      />

      <Section zone="paper" spacing="lg" aria-label="Organisation">
        <div className="shell-wide">
          <ThreadTree org={organisation} />
          {organisation.source && (
            <p className="mt-12 max-w-prose text-xs leading-relaxed text-ink/70">
              Structure and numbers supplied by {organisation.source}. People are named with their agreement.
            </p>
          )}
        </div>
      </Section>

      <CtaBand
        headingLines={[{ text: "WORK WITH" }, { text: "THE TEAM." }]}
        body="Send a tech pack, a reference garment or a written requirement. The development team comes back on construction, materials and FOB costing."
        primary={{ label: "Request FOB Quote", href: "/request-a-quote?source=team" }}
        secondary={{ label: "Send a Tech Pack", href: "/send-tech-pack" }}
        zone="ink"
      />
    </>
  );
}
