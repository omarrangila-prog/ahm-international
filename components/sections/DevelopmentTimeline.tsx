"use client";

import { useState } from "react";
import { useInView } from "@/lib/use-in-view";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { processStages } from "@/data/process";
import { numeral, cn } from "@/lib/utils";

/**
 * FROM BRIEF TO BULK — the ten-stage development path.
 *
 * The progress line is driven by scroll position rather than by a timer, so the
 * animation tracks how far the reader has actually come. Stage detail is
 * selectable: scrolling gives the overview, clicking gives the specifics,
 * including what the *buyer* supplies at each stage — the question a sourcing
 * manager is actually asking when they read a process diagram.
 */

export function DevelopmentTimeline() {
  const [active, setActive] = useState(0);
  // The rail fills once when the track enters view. A continuous scrub cost a
  // scroll listener and an animation runtime for an imperceptible difference.
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({ margin: "0px 0px -20% 0px" });

  const stage = processStages[active];

  return (
    <Section zone="lime" spacing="lg" tooth aria-labelledby="development-heading">
      <div className="shell-wide relative z-10">
        <div className="max-w-4xl">
          <Eyebrow>Development</Eyebrow>
            <MaskedHeading
              as="h2"
              id="development-heading"
              className="mt-6 font-display text-display text-ink"
              lines={[{ text: "FROM BRIEF" }, { text: "TO BULK." }]}
            />
          <p className="mt-7 max-w-2xl text-lead text-ink/85">
              Ten stages between a specification arriving and a container leaving. Every one of them
              has a defined output and a point where you approve something.
            </p>
        </div>

        <div ref={containerRef} data-inview={inView ? "true" : "false"} className="mt-16">
          {/* ---------- Desktop: horizontal track ---------- */}
          <div className="relative hidden lg:block">
            {/* Rail */}
            <div className="absolute inset-x-0 top-[2.6rem] h-px bg-ink/25" aria-hidden="true" />
            <div data-progress="" className="absolute inset-x-0 top-[2.55rem] h-0.5 bg-ink" aria-hidden="true" />

            <ol className="relative grid grid-cols-10">
              {processStages.map((item, i) => (
                <li key={item.index}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={active === i}
                    className="group flex w-full flex-col items-start gap-3 pr-3 text-left"
                  >
                    <span
                      className={cn(
                        "numeral text-[1.75rem] transition-colors duration-300",
                        active === i ? "text-ink" : "text-ink/85 group-hover:text-ink",
                      )}
                    >
                      {numeral(item.index)}
                    </span>
                    <span
                      className={cn(
                        "relative flex h-3 w-3 items-center justify-center transition-colors duration-300",
                        active === i ? "bg-ink" : "bg-ink/25 group-hover:bg-ink/50",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "font-display text-xs font-bold uppercase leading-tight tracking-[0.02em] transition-colors duration-300",
                        active === i ? "text-ink" : "text-ink/85 group-hover:text-ink",
                      )}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- Mobile: vertical track ---------- */}
          <div className="relative lg:hidden">
            <div className="absolute bottom-0 left-[0.3125rem] top-0 w-px bg-ink/20" aria-hidden="true" />
            <div data-progress="vertical" className="absolute bottom-0 left-[0.3125rem] top-0 w-px bg-ink" aria-hidden="true" />
            <ol className="flex flex-col gap-7">
              {processStages.map((item) => (
                <li key={item.index} className="relative pl-7">
                  <span className="absolute left-0 top-1.5 h-2.5 w-2.5 bg-ink" aria-hidden="true" />
                  <p className="numeral text-sm text-ink/85">{numeral(item.index)}</p>
                  <h3 className="mt-1 font-display text-base font-bold tracking-[-0.02em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{item.body}</p>
                  <p className="mt-2 text-xs text-ink/85">
                    <span className="label mr-2 text-ink/85">You supply</span>
                    {item.buyerInput}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ---------- Desktop detail panel ---------- */}
        <div className="mt-12 hidden lg:block">
          <div className="grid grid-cols-12 items-start gap-8 border-t border-ink/20 pt-10">
            <div className="col-span-7">
              <div key={stage.index} className="enter">
                <p className="numeral text-[4rem] text-ink/85">{numeral(stage.index)}</p>
                <h3 className="mt-2 font-display text-h2 text-ink">{stage.title}</h3>
                <p className="mt-4 max-w-xl text-lead text-ink/85">{stage.body}</p>
                <div className="mt-6 border-l-2 border-ink pl-4">
                  <p className="label text-ink/85">What you supply</p>
                  <p className="mt-1.5 text-sm text-ink/85">{stage.buyerInput}</p>
                </div>
              </div>
            </div>

            <div className="col-span-5">
              <div key={`img-${stage.index}`} className="enter aspect-[3/2] w-full overflow-hidden bg-ink/10">
                <SmartImage
                  asset={stage.asset}
                  sizes={SIZES.half}
                  className="h-full w-full"
                  imageClassName="object-cover"
                  alt={`${stage.title} stage`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button href="/development" variant="solid" size="lg" withArrow>
            Start a Development
          </Button>
        </div>
      </div>
    </Section>
  );
}
