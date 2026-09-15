"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { productCategories } from "@/data/products";
import { firstAvailable, hasAsset } from "@/data/assets";
import { numeral, cn } from "@/lib/utils";

/**
 * PRODUCT FAMILIES — 01 to 07
 * ===========================
 *
 * This was seven cards rendered simultaneously: seven coloured plates, seven
 * headings, seven sub-lists, seven images, all competing at once. Seven cards
 * tell a reader "here is a component library". A list tells them "here is a
 * range".
 *
 * So the range is set as type and the photography is given one large frame that
 * changes. Hovering or focusing a line swaps the image; clicking follows through
 * to the category. Nothing is appended and nothing expands — the existing area
 * transforms, which is the whole point of the brief's rule about clicks.
 *
 * Accessibility notes, because a hover-driven visual is easy to get wrong:
 * - Each row is a real link, so keyboard and screen-reader users navigate it
 *   normally and the section works with no JavaScript at all.
 * - `onFocus` mirrors `onMouseEnter`, so tabbing through drives the image too.
 * - The preview is decorative and marked `aria-hidden`: every fact it shows is
 *   already in the link text, so a screen reader is not told anything twice.
 */
export function ProductUniverse() {
  // Seven, deliberately. The full range is larger and lives on /products —
  // showing all of it here would rebuild the wall this section exists to remove.
  const families = productCategories.slice(0, 7);
  const [active, setActive] = useState(0);
  const current = families[active];

  return (
    <Section zone="paper" spacing="lg" aria-labelledby="products-heading">
      <div className="shell-wide">
        <Eyebrow>Product families</Eyebrow>
        <MaskedHeading
          as="h2"
          id="products-heading"
          className="mt-5 max-w-3xl font-display text-display text-ink"
          lines={[{ text: "BUILT FOR WORK." }, { text: "BUILT TO SCALE.", className: "text-ink" }]}
        />

        <div className="mt-14 grid grid-cols-12 gap-y-10 lg:gap-x-16">
          {/* The range, as type */}
          <ul className="col-span-12 lg:col-span-7">
            {families.map((family, i) => {
              const isActive = i === active;
              return (
                <li key={family.slug} className="border-t border-ink/15 last:border-b">
                  <Link
                    href={`/products/${family.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-baseline gap-5 py-5 outline-none sm:gap-8 sm:py-6"
                  >
                    <span
                      className={cn(
                        "numeral shrink-0 text-sm transition-colors duration-200",
                        isActive ? "text-ink" : "text-ink/65",
                      )}
                    >
                      {numeral(i + 1)}
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.03em] transition-[color,transform] duration-300 ease-[var(--ease-out-expo)] sm:text-3xl lg:text-[2.5rem]",
                        isActive
                          ? "translate-x-1 text-ink"
                          : "text-ink/65 group-hover:text-ink/80",
                      )}
                    >
                      {family.name}
                    </span>

                    <ArrowRight
                      className={cn(
                        "h-5 w-5 shrink-0 self-center transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)]",
                        isActive
                          ? "translate-x-0 text-ink opacity-100"
                          : "-translate-x-2 text-ink/65 opacity-0",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* One frame, which changes. Empty when the family has no photograph. */}
          <div className="col-span-12 lg:col-span-5" aria-hidden="true">
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-white">
                {families.map((family, i) => {
                  const preview = firstAvailable(family.heroAsset, family.articles[0].asset);
                  if (!hasAsset(preview)) return null;
                  return (
                  <div
                    key={family.slug}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-expo)]",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <SmartImage
                      asset={preview}
                      sizes={SIZES.half}
                      className="h-full w-full"
                      imageClassName="object-contain p-8"
                      alt=""
                    />
                  </div>
                  );
                })}
              </div>

              {/* The specification reads as a line of type, not a row of chips. */}
              <div className="mt-5 border-t border-ink/15 pt-5">
                <p className="label text-ink/65">{current.shortName}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
                  {current.subcategories.slice(0, 4).join("  ·  ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink/15 pt-6">
          <p className="max-w-lg text-sm text-ink/65">
            {productCategories.length} families in total, each costed as a program rather than a
            one-off order.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-ink underline-offset-4 transition-colors hover:underline"
          >
            Explore all products
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </Section>
  );
}
