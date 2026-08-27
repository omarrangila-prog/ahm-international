import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { CapabilityBadge } from "@/components/ui/ProofBadge";
import { ShowroomTracker } from "@/components/showroom/ShowroomTracker";
import { ShowroomStyleLink } from "@/components/showroom/ShowroomStyleLink";
import { getShowroom } from "@/data/showrooms";
import { getCategory } from "@/data/products";

/**
 * PRIVATE SHOWROOM
 * ================
 *
 * Master spec §27. A buyer-specific view reachable only through its own token.
 *
 * Security posture (§49):
 * - `robots: noindex, nofollow` and excluded from the sitemap and route registry.
 * - Dynamic, never prerendered — a static build would write every showroom to
 *   disk and defeat the point.
 * - An unknown, malformed or expired token produces the same `notFound()`, so
 *   the route cannot be used to discover which prospects exist.
 *
 * The showroom deliberately does not price anything. It narrows the range to
 * what is relevant and makes the next step obvious; costing still follows a
 * specification.
 */

export const dynamic = "force-dynamic";

/** Never indexed, whatever the token. */
export const metadata: Metadata = {
  title: "Private Showroom | AHM International",
  robots: { index: false, follow: false, nocache: true },
};

type Params = { params: Promise<{ token: string }> };

export default async function ShowroomPage({ params }: Params) {
  const { token } = await params;
  const showroom = getShowroom(token);
  if (!showroom) notFound();

  const categories = showroom.categories
    .map((slug) => getCategory(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <ShowroomTracker token={showroom.token} label={showroom.buyerLabel} />

      <Section zone="ink" spacing="lg">
        <div className="shell-wide">
          <Eyebrow>Private sourcing showroom</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-cream sm:text-5xl lg:text-6xl">
            AHM <span className="text-lime">×</span> {showroom.buyerLabel}
          </h1>

          {showroom.demo && (
            <p className="mt-6 max-w-xl border-l-2 border-lime pl-4 text-sm leading-relaxed text-cream/75">
              <span className="label block text-lime">Demonstration</span>
              <span className="mt-1 block">{showroom.intro}</span>
            </p>
          )}
          {!showroom.demo && showroom.intro && (
            <p className="mt-6 max-w-xl text-lead text-cream/75">{showroom.intro}</p>
          )}

          <p className="mt-8 max-w-xl text-sm text-cream/55">
            This page is private and is not indexed by search engines. It shows the
            categories relevant to your program rather than the full range.
          </p>
        </div>
      </Section>

      <Section zone="cream" spacing="lg" aria-labelledby="showroom-range">
        <div className="shell-wide">
          <h2 id="showroom-range" className="sr-only">
            Selected range
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {categories.map((c) => (
              <article key={c.slug} className="border border-ink/15 bg-paper">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <SmartImage
                    asset={c.heroAsset}
                    sizes={SIZES.half}
                    className="h-full w-full"
                    imageClassName="object-contain p-6"
                    alt=""
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-extrabold uppercase leading-none tracking-[-0.02em] text-ink">
                      {c.name}
                    </h3>
                    {c.capabilityStatus !== "current_capability" && (
                      <CapabilityBadge status={c.capabilityStatus} />
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink/65">{c.intro}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.subcategories.slice(0, 5).map((s) => (
                      <li
                        key={s}
                        className="border border-ink/15 px-2.5 py-1 text-xs text-ink/60"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <ShowroomStyleLink
                      href={`/products/${c.slug}`}
                      showroom={showroom.buyerLabel}
                      category={c.slug}
                      variant="outline"
                    >
                      View range
                    </ShowroomStyleLink>
                    <ShowroomStyleLink
                      href={`/benchmark-a-style?category=${encodeURIComponent(c.slug)}`}
                      showroom={showroom.buyerLabel}
                      category={c.slug}
                    >
                      Select style
                    </ShowroomStyleLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section zone="lime" spacing="lg">
        <div className="shell-wide max-w-3xl">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl">
            What would you like costed?
          </h2>
          <p className="mt-4 text-ink/75">
            Pick a style from the range above, or send the specification you already
            have. Nothing here is priced — costing follows the specification.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/request-a-quote" size="lg" variant="invert" withArrow>
              Request costing
            </Button>
            <Button href="/send-tech-pack" size="lg" variant="outline">
              Send tech pack
            </Button>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center px-2 text-sm font-medium text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Send comments
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
