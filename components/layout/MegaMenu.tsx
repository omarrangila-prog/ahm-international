"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { megaMenu } from "@/data/nav";
import { productCategories } from "@/data/products";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { firstAvailable } from "@/data/assets";
import { cn } from "@/lib/utils";

/**
 * Products mega menu.
 *
 * Grouped the way a sourcing manager thinks — uniform, knits, wovens, outerwear
 * — rather than mirroring the sitemap. The right-hand panel previews whichever
 * group is hovered, so the menu shows product rather than only naming it.
 */

export function MegaMenu({
  open,
  activeGroup,
  onGroupChange,
  onNavigate,
}: {
  open: boolean;
  activeGroup: number;
  onGroupChange: (index: number) => void;
  onNavigate: () => void;
}) {
  // Preview the category matching the hovered group.
  const previewSlugs = ["uniform-workwear", "polos-tshirts", "woven-shirts", "outerwear"];
  const preview = productCategories.find((c) => c.slug === previewSlugs[activeGroup]) ?? productCategories[0];

  // Kept mounted and hidden rather than unmounted, so the transition needs no
  // presence tracking and the links stay in the document for crawlers.
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 top-full origin-top border-t border-line bg-paper shadow-[0_28px_60px_-30px_rgba(16,19,21,0.35)]",
        "transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
      )}
    >
      <div>
          {/* Stacks below lg. Twelve columns with a 2rem gap need 11 x 32px of gap
              alone, so on a 320px phone this grid was 372px wide — and because
              the panel is absolutely positioned and only hidden with
              `invisible`, that 52px expanded the whole document sideways on
              every page. The panel is a desktop affordance; MobileNav carries
              these links on small screens, and keeping it laid out rather than
              unmounted is what preserves them for a mobile-first crawler. */}
          <div className="shell-wide grid grid-cols-1 gap-8 py-10 lg:grid-cols-12">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:gap-x-8 lg:col-span-8 lg:grid-cols-4">
              {megaMenu.map((group, i) => (
                <div key={group.title} onMouseEnter={() => onGroupChange(i)}>
                  <p
                    className={cn(
                      "label mb-4 transition-colors duration-200",
                      activeGroup === i ? "text-ink" : "text-ink/60",
                    )}
                  >
                    {group.title}
                  </p>
                  {/* `prefetch={false}` because this panel is hidden with
                      `invisible`, not `display: none` — the links keep their
                      layout boxes, so Next's observer counts every one of them
                      as on screen and prefetches the lot on first paint.
                      Measured: 35 `?_rsc=` requests and 220 kB on a cold mobile
                      load of the homepage, for a menu nobody had opened.

                      They stay in the server HTML rather than mounting on first
                      open, because the internal-link graph depends on them and
                      `tests/internal-links.test.ts` holds that invariant. In
                      this version of Next `false` also disables hover prefetch,
                      which is the accepted cost: every route here is static, so
                      a click fetches roughly 12 kB. */}
                  <ul className="flex flex-col gap-2.5">
                    {group.links.map((link) => (
                      <li key={`${group.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          prefetch={false}
                          className="group/item inline-flex items-center gap-2 font-display text-[0.95rem] font-semibold tracking-[-0.015em] text-ink/80 transition-colors hover:text-ink"
                        >
                          {link.label}
                          <ArrowRight
                            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-hover/item:translate-x-0 group-hover/item:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Preview panel. Shows the product, not just its name. */}
            <div className="hidden lg:col-span-4 lg:block">
              <Link
                href={`/products/${preview.slug}`}
                onClick={onNavigate}
                className="group/preview block"
                aria-label={`Explore ${preview.name}`}
              >
                <div className="relative overflow-hidden bg-paper">
                  <SmartImage
                    // `heroAsset` is chosen to head a page and several point at
                    // environment photography that has not been shot, so on its
                    // own this frame rendered an empty tonal panel — in the
                    // navigation, on every page of the site. Falling through to
                    // the family's first article means the menu always shows a
                    // garment.
                    asset={firstAvailable(preview.heroAsset, preview.articles[0].asset)}
                    sizes={SIZES.third}
                    className="aspect-[4/3] w-full"
                    imageClassName="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/preview:scale-[1.04]"
                    alt=""
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <p className="font-display text-lg font-bold tracking-[-0.02em]">{preview.name}</p>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/preview:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-1.5 text-sm text-muted">{preview.subcategories.slice(0, 4).join(" · ")}</p>
              </Link>
            </div>
          </div>

          <div className="border-t border-line">
            <div className="shell-wide flex flex-wrap items-center justify-between gap-4 py-4">
              <p className="text-sm text-muted">
                Not sure which category fits? Send the specification and we will place it.
              </p>
              <Link
                href="/products"
                onClick={onNavigate}
                className="group label inline-flex items-center gap-2 text-ink transition-colors hover:text-ink"
              >
                Explore all products
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
}
