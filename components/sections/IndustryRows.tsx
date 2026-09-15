import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset, firstAvailable } from "@/data/assets";
import { industries } from "@/data/industries";
import { industryDetail } from "@/data/industry-detail";
import { numeral } from "@/lib/utils";

/**
 * INDUSTRY ROWS
 * =============
 *
 * Replaces the eight-card grid. Two reasons, and the second is the one that
 * decided the shape:
 *
 *   1. Eight equal tiles put every environment at the same weight and give each
 *      one a caption's worth of room, when what distinguishes them is a sentence
 *      about wear and a list of articles.
 *   2. **No environment photography exists yet.** Every one of the eight assets
 *      is unshot, so every card was already falling back to a cut-out garment
 *      render on a plate. The obvious upgrade here — a hover-expanding photo
 *      accordion — only works when expanding reveals a room. Expanding to reveal
 *      a cut-out would look like a bug, so the row keeps the render small and
 *      gives the space to the words, which are real.
 *
 * The expansion is CSS alone: `grid-template-rows` from `0fr` to `1fr` on hover
 * or focus-within, so this stays a server component with no state to hydrate.
 * Below `lg` nothing is collapsed at all — content behind a hover is content a
 * phone cannot reach, and focus arrives here only via a link that navigates
 * away.
 *
 * Filtered to industries that have a detail page, from the same map the pages
 * are generated from — a row linking to a route that was never built is a 404
 * the moment someone adds an industry without one.
 */
const linkable = industries.filter((industry) => industryDetail[industry.slug]);

export function IndustryRows() {
  return (
    <ul className="border-t border-line">
      {linkable.map((industry, i) => {
        const asset = firstAvailable(industry.asset, industry.representative);
        const environmentShot = hasAsset(industry.asset);

        return (
          <li key={industry.slug} className="border-b border-line">
            <Link
              href={`/industries/${industry.slug}`}
              className="group block py-8 transition-colors duration-300 hover:bg-white motion-reduce:transition-none lg:px-4"
            >
              <div className="grid grid-cols-12 items-baseline gap-x-6 gap-y-3">
                <span className="numeral col-span-2 text-sm text-ink/65 sm:col-span-1">
                  {numeral(i + 1)}
                </span>
                <h3 className="col-span-10 font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-ink motion-reduce:transition-none sm:col-span-4 sm:text-3xl">
                  {industry.name}
                </h3>
                <p className="col-span-12 text-sm leading-relaxed text-ink/70 sm:col-span-6">
                  {industry.demand}
                </p>
                <ArrowRight
                  className="col-span-12 hidden h-4 w-4 shrink-0 justify-self-end text-ink/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink motion-reduce:transition-none sm:col-span-1 sm:block"
                  aria-hidden="true"
                />
              </div>

              {/* 0fr to 1fr is the only way to animate to an unknown height
                  without measuring it in JavaScript. */}
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none lg:grid-rows-[0fr] lg:group-focus-within:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid grid-cols-12 items-end gap-x-6 gap-y-5 pt-6">
                    <div className="col-span-12 sm:col-start-2 sm:col-span-6">
                      <span className="label text-ink/65">Typical program</span>
                      <p className="mt-2 text-sm leading-relaxed text-ink/75">
                        {industry.typicalGarments.join(" · ")}
                      </p>
                    </div>
                    {hasAsset(asset) && (
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <div className="aspect-[4/3] w-full overflow-hidden bg-paper">
                        <SmartImage
                          asset={asset}
                          sizes={SIZES.quarter}
                          className="h-full w-full"
                          imageClassName={environmentShot ? "object-cover" : "object-contain p-3"}
                          alt=""
                        />
                      </div>
                    </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
