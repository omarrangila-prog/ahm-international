"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { manufacturingStages } from "@/data/manufacturing";
import { cn, numeral } from "@/lib/utils";

/**
 * THE MANUFACTURING SCROLL
 * ========================
 *
 * Replaces the nine-card grid that stood here. Nine equal cards ask a buyer to
 * compare nine things at once, which is not the question they have — they read
 * the process in order, once, to find out where their approval is needed. So the
 * stages run as one continuous column and the frame beside them changes as they
 * pass, which is the shape of the thing being described.
 *
 * Two constraints the pattern has to survive:
 *
 *   1. **Two of the nine stages have no photograph.** Sampling and screen
 *      printing have not been shot. The frame does not go blank and it does not
 *      invent a picture: it restructures into the stage's own output, set as
 *      type. That is the same rule `<SmartImage>` and `/capabilities` follow.
 *   2. **The text must not depend on the effect.** Every stage's copy is in the
 *      document at all times. The observer only decides which frame is lit; with
 *      no JavaScript, or reduced motion, or a browser without
 *      `IntersectionObserver`, the page is still nine stages in order.
 *
 * Sticky panes need a scroll container taller than themselves, which a single
 * grid column on a phone is not, so the sticky frame is desktop-only and each
 * stage carries its own image below `lg`. Those two image sets are mutually
 * exclusive through `display`, and a lazily-loaded image inside a `display:none`
 * subtree never intersects the viewport, so only one set is ever fetched.
 */

/** Stages, paired once with whether their photograph actually exists. */
const stages = manufacturingStages.map((stage) => ({
  ...stage,
  hasPhoto: hasAsset(stage.asset),
}));

export function ManufacturingScroll() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const nodes = blocks.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLLIElement);
          if (index !== -1) setActive(index);
        }
      },
      // A thin band across the middle of the viewport: the stage crossing the
      // centre is the one being read, which is not the same as the one nearest
      // the top.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-y-10 lg:gap-x-16">
      {/* Sticky frame. Second in the source order so a screen reader meets the
          stages first; the grid puts it on the right. */}
      <div className="col-span-12 hidden lg:col-span-6 lg:order-2 lg:block">
        <div className="sticky top-28">
          {/* Sized to the viewport rather than to a ratio: a 4:5 frame in a
              630px column is 787px tall, which pushes its own caption off the
              bottom of a laptop screen and can never be read. */}
          <div className="relative h-[62vh] w-full overflow-hidden bg-ink">
            {stages.map((stage, i) => (
              <div
                key={stage.slug}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                  i === active ? "opacity-100" : "opacity-0",
                )}
                aria-hidden="true"
              >
                {stage.hasPhoto ? (
                  <SmartImage
                    asset={stage.asset}
                    sizes={SIZES.half}
                    className="h-full w-full"
                    imageClassName="object-cover"
                    alt=""
                  />
                ) : (
                  <StageStatement stage={stage} />
                )}
              </div>
            ))}
          </div>

          <p className="mt-5 flex items-baseline gap-4 text-sm text-paper/70">
            <span className="numeral text-lime">{numeral(stages[active].index)}</span>
            <span>{stages[active].title}</span>
          </p>
        </div>
      </div>

      <ol className="col-span-12 lg:col-span-6 lg:order-1">
        {stages.map((stage, i) => (
          <li
            key={stage.slug}
            ref={(node) => {
              blocks.current[i] = node;
            }}
            className="border-t border-paper/20 py-12 first:border-t-0 first:pt-0 lg:min-h-[62vh] lg:py-16"
          >
            <div className="flex items-baseline gap-5">
              <span
                className={cn(
                  "numeral text-2xl leading-none transition-colors duration-500 motion-reduce:transition-none",
                  i === active ? "text-lime" : "text-paper/65",
                )}
              >
                {numeral(stage.index)}
              </span>
              <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.03em] text-paper sm:text-3xl">
                {stage.title}
              </h3>
            </div>

            {/* The phone's frame, mutually exclusive with the sticky one above. */}
            {stage.hasPhoto && (
              <div className="mt-6 aspect-[16/10] w-full overflow-hidden bg-ink lg:hidden">
                <SmartImage
                  asset={stage.asset}
                  sizes={SIZES.full}
                  className="h-full w-full"
                  imageClassName="object-cover"
                  alt=""
                />
              </div>
            )}

            <p className="mt-6 max-w-prose leading-relaxed text-paper/75">{stage.intro}</p>

            <dl className="mt-8 space-y-4">
              <div>
                <dt className="label text-paper/70">You receive</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-paper/75">
                  {stage.outputs[0]}
                </dd>
              </div>
              {stage.whatGoesWrong[0] && (
                <div>
                  <dt className="label text-paper/70">What usually goes wrong</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-paper/75">
                    {stage.whatGoesWrong[0].problem}
                  </dd>
                </div>
              )}
            </dl>

            <Link
              href={`/manufacturing/${stage.slug}`}
              className="group mt-8 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.08em] text-lime"
            >
              {stage.shortTitle}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Stands in for a photograph that does not exist.
 *
 * Not a placeholder and not an illustration — the stage's own deliverable, set
 * large. A buyer reading it learns the same thing the picture would have told
 * them, and nobody is shown a factory that was never photographed.
 *
 * It is labelled for what it is rather than for what is missing. "Not yet
 * photographed" is a note to ourselves about the shot list; a buyer only needs
 * to know what the stage hands them.
 */
function StageStatement({ stage }: { stage: (typeof stages)[number] }) {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-ink p-8">
      <span className="label text-paper/70">At this stage you receive</span>
      <p className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-paper">
        {stage.outputs[0]}
      </p>
    </div>
  );
}
