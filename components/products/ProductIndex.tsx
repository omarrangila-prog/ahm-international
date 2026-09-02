"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Plus } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { firstAvailable, type AssetKey } from "@/data/assets";
import { productCategories } from "@/data/products";
import { CAPABILITY_LABEL, CAPABILITY_MEANING } from "@/data/verification";
import { cn, numeral } from "@/lib/utils";

/**
 * PRODUCT INDEX
 * =============
 *
 * Replaces twelve 28rem-tall cards, which was the last card wall on the site and
 * the one that cost the most: a buyer arriving at /products wants to know
 * whether their article is made here, and twelve equal photographs answer that
 * more slowly than twelve lines of type do.
 *
 * Opening a family transforms its own row rather than pushing a panel underneath
 * it — the row becomes a two-column block carrying the positioning, the
 * sub-types, the decoration routes and the render, and the row above and below
 * are untouched. One open at a time, so the list stays scannable at a glance,
 * which is the whole reason for preferring a list to a grid.
 *
 * The capability status is on the closed row, not hidden inside the open one. It
 * is the single most consequential fact about a family — whether AHM runs it
 * today, would develop against it, or would need documented qualification first
 * — and burying it behind a click would be the one piece of hiding that actually
 * misleads.
 *
 * `firstAvailable` matters here rather than being defensive habit: several
 * categories point `heroAsset` at environment photography that has not been
 * shot, so the render falls through to the family's first article.
 */

/**
 * Where a family reads better as a clean render than as its page hero.
 *
 * Carried over from the card grid this replaced, because it is real curation:
 * `heroAsset` is chosen to head a page, which is not the same job as
 * representing the family at thumbnail size. Anything absent falls through to
 * the category, so adding a family cannot break this list.
 */
const familyRender: Record<string, AssetKey> = {
  "uniform-workwear": "renders.workJacket",
  "polos-tshirts": "photo.poloWhiteTipped",
  "fleece-sweatshirts": "photo.hoodieNavy",
  aprons: "products.apron.front",
  "woven-shirts": "renders.utilityWorkShirt",
  bottoms: "renders.workTrouser",
  outerwear: "photo.zipHoodieNavy",
  "hospitality-food-service": "renders.chefCoat",
  denim: "photo.denimWorkShirt",
  athleisure: "photo.joggerGreyGraphic",
  womenswear: "photo.poloCream",
  kidswear: "photo.onesieWhitePrint",
};

export function ProductIndex() {
  const [open, setOpen] = useState<string | null>(null);
  /**
   * Framer rather than CSS here, and only here.
   *
   * The rest of this site animates in CSS on purpose. A panel opening to its
   * content's natural height is the case CSS cannot do honestly: `height: auto`
   * is not interpolable, so the alternatives are measuring in JavaScript
   * anyway, or `grid-template-rows: 0fr -> 1fr`, which works but cannot also
   * carry the fade and stagger this panel wants. Framer measures it properly.
   *
   * Under `prefers-reduced-motion` every duration collapses to zero and the
   * panel simply appears, which is the same end state without the travel.
   */
  const reduced = useReducedMotion();
  const timing = reduced
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <ul className="border-t border-line">
      {productCategories.map((category) => {
        const isOpen = open === category.slug;
        const panelId = `family-${category.slug}`;
        const asset = firstAvailable(
          familyRender[category.slug] ?? category.heroAsset,
          category.heroAsset,
          category.articles[0].asset,
        );

        return (
          <li key={category.slug} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : category.slug)}
                className="group flex w-full items-center gap-4 py-6 text-left sm:gap-6"
              >
                <span
                  className={cn(
                    "numeral shrink-0 text-sm transition-colors duration-300 motion-reduce:transition-none",
                    isOpen ? "text-ink" : "text-ink/60",
                  )}
                >
                  {numeral(category.index)}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block font-display text-xl font-extrabold uppercase leading-none tracking-[-0.03em] transition-colors duration-300 motion-reduce:transition-none sm:text-2xl",
                      isOpen ? "text-ink" : "text-ink group-hover:text-ink",
                    )}
                  >
                    {category.name}
                  </span>
                  <span className="mt-2 block text-sm text-ink/70">
                    {category.subcategories.slice(0, 4).join(" · ")}
                  </span>
                </span>

                <span
                  title={CAPABILITY_MEANING[category.capabilityStatus]}
                  /* `print:block` because paper has no breakpoints: without it
                     the badge is hidden at print width, and capability status is
                     the one fact on this row a buyer must not lose. */
                  className="hidden shrink-0 border border-ink/20 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-ink/75 lg:block print:block"
                >
                  {CAPABILITY_LABEL[category.capabilityStatus]}
                </span>

                <Plus
                  className={cn(
                    "h-5 w-5 shrink-0 text-ink/50 transition-transform duration-300 ease-[var(--ease-out-expo)] motion-reduce:transition-none print:hidden",
                    isOpen && "rotate-45",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  key={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={timing}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-12 gap-x-10 gap-y-8 pb-12 lg:pb-14">
                <div className="col-span-12 lg:col-span-7">
                  <p className="max-w-prose leading-relaxed text-ink/75">{category.intro}</p>

                  {/* Shown on small screens, where the closed row hides it. */}
                  <p className="mt-6 inline-block border border-ink/20 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-ink/75 lg:hidden">
                    {CAPABILITY_LABEL[category.capabilityStatus]}
                  </p>
                  <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/70 lg:mt-6">
                    {CAPABILITY_MEANING[category.capabilityStatus]}
                  </p>

                  <dl className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                    <Detail label="Sub-types" value={category.subcategories.join(" · ")} />
                    <Detail label="Decoration" value={category.decoration.join(" · ")} />
                    <Detail label="Applications" value={category.applications.join(" · ")} />
                    <Detail
                      label="Articles on the family page"
                      value={`${category.articles.length}`}
                    />
                  </dl>

                  <Link
                    href={`/products/${category.slug}`}
                    className="group mt-10 inline-flex items-center gap-2 border border-ink bg-ink px-5 py-3 font-display text-sm font-bold uppercase tracking-[0.08em] text-paper transition-colors duration-300 hover:bg-lime hover:text-ink hover:border-lime motion-reduce:transition-none"
                  >
                    Open {category.shortName}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                <div className="col-span-12 lg:col-span-5">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-paper">
                    <SmartImage
                      asset={asset}
                      sizes={SIZES.half}
                      className="h-full w-full"
                      imageClassName="object-contain p-6"
                      alt=""
                    />
                  </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="label text-ink/60">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink/75">{value}</dd>
    </div>
  );
}
