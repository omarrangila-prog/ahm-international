"use client";

import { useInView } from "@/lib/use-in-view";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { qualityStages, qualityDimensions, QUALITY_STANDARD_STATEMENT } from "@/data/process";
import { numeral } from "@/lib/utils";

/**
 * Quality.
 *
 * The headline argument is that inspection at the end is too late to be useful,
 * so the timeline runs vertically through the points where a problem can still
 * be corrected.
 *
 * No AQL level is claimed. Stating a number we have not agreed with a buyer
 * would be the exact kind of unverifiable claim this site avoids — the honest
 * version, that the standard is whatever the buyer approves, is also the more
 * reassuring one.
 */

export function QualityProcess() {
  // The rail fills once when the list enters view. A continuous scroll scrub
  // needed a scroll listener and an animation runtime for a difference nobody
  // reading the page would notice.
  const { ref, inView } = useInView<HTMLDivElement>({ margin: "0px 0px -25% 0px" });

  return (
    <Section zone="ink" spacing="lg" tooth aria-labelledby="quality-heading">
      <div className="shell-wide relative z-10">
        <div className="max-w-4xl">
          <Eyebrow className="text-white/90">
              Quality assurance
            </Eyebrow>
            <MaskedHeading
              as="h2"
              id="quality-heading"
              className="mt-6 font-display text-display text-white"
              lines={[{ text: "QUALITY IS A PROCESS," }, { text: "NOT A FINAL INSPECTION.", className: "text-lime" }]}
            />
          <p className="mt-7 max-w-2xl text-lead text-white/95">
              An inspection that only happens at the end can reject a shipment. It cannot save one.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* Vertical inspection timeline */}
          <div className="col-span-12 lg:col-span-6">
            <div ref={ref} data-inview={inView ? "true" : "false"} className="relative">
              <div className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-white/25" aria-hidden="true" />
              <div
                data-progress="vertical"
                className="absolute bottom-2 left-[0.4375rem] top-2 w-px bg-lime"
                aria-hidden="true"
              />

              <ol className="flex flex-col gap-8">
                {qualityStages.map((item) => (
                  <li key={item.index} className="relative pl-9">
                    <span
                      className="absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center border border-white/40 bg-ink"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 bg-lime" />
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="numeral text-xs text-white/90">{numeral(item.index)}</span>
                      <h3 className="font-display text-lg font-bold tracking-[-0.025em] text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/90">{item.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* What is checked */}
          <div className="col-span-12 lg:col-span-6">
            <p className="label mb-5 text-white/90">What is checked</p>
            <RevealGroup className="grid grid-cols-1 gap-px bg-white/20 sm:grid-cols-2" stagger={0.05}>
              {qualityDimensions.map((item, i) => (
                <RevealItem
                  key={item.title}
                  className={
                    i === qualityDimensions.length - 1 && qualityDimensions.length % 2 === 1
                      ? "sm:col-span-2"
                      : undefined
                  }
                >
                  <div className="h-full bg-ink p-5">
                    <h3 className="font-display text-base font-bold tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">{item.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Inspection photography.

                The section argues that quality is a process rather than a final
                check, and the two images show the two ends of it: material
                inspection before anything is cut, and measurement against spec
                after it is made. Placed before the standard statement, so the
                claim arrives after the evidence rather than before it. */}
            {(hasAsset("factory.fabricInspection") || hasAsset("factory.qualityControl")) && (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {hasAsset("factory.fabricInspection") && (
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
                <SmartImage
                  asset="factory.fabricInspection"
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="h-full w-full"
                  imageClassName="object-cover"
                  alt="Fabric being inspected on the frame before cutting"
                />
              </div>
              )}
              {hasAsset("factory.qualityControl") && (
              <div className="relative aspect-[4/3] overflow-hidden border border-white/15">
                <SmartImage
                  asset="factory.qualityControl"
                  sizes="(max-width: 1024px) 45vw, 22vw"
                  className="h-full w-full"
                  imageClassName="object-cover"
                  alt="A finished garment measured against the approved specification"
                />
              </div>
              )}
            </div>
            )}

            <div className="mt-8 border-l-2 border-lime bg-white/8 p-5">
              <p className="label mb-2 text-lime">Inspection standard</p>
              <p className="text-sm leading-relaxed text-white/95">{QUALITY_STANDARD_STATEMENT}</p>
            </div>

            <div className="mt-8">
              <Button href="/quality" variant="lime" size="lg" withArrow>
                See the quality process
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
