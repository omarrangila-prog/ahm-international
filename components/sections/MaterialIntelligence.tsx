"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import { ArrowLink } from "@/components/ui/Button";
import { materials, MATERIAL_DISCLAIMER } from "@/data/materials";
import { cn, numeral } from "@/lib/utils";

/**
 * Material intelligence.
 *
 * A fabric explorer, not a shop. Selecting a material reveals composition,
 * typical weight, hand feel, finish routes and where it is used — the five
 * things a sourcing manager checks before deciding whether a supplier
 * understands the material or is only reselling it.
 *
 * Every figure carries the orientation disclaimer. Nothing here is presented as
 * stock or as an offer.
 */

export function MaterialIntelligence() {
  const [active, setActive] = useState(0);
  const material = materials[active];

  return (
    <Section zone="ink" spacing="lg" tooth aria-labelledby="materials-heading">
      <div className="shell-wide relative z-10">
        <div className="max-w-4xl">
          <MaskedHeading
              as="h2"
              id="materials-heading"
              className="mt-6 font-display text-display text-paper"
              lines={[{ text: "THE PROGRAM IS" }, { text: "THE FABRIC.", className: "text-lime" }]}
            />
          <p className="mt-7 max-w-2xl text-lead text-paper/65">
              Construction can be corrected. A wrong fabric decision is paid for in every reorder
              for the life of the program.
            </p>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-8 lg:gap-x-10">
          {/* Selector */}
          <div className="col-span-12 lg:col-span-5">
            <ul className="border-t border-paper/15">
              {materials.map((item, i) => (
                <li key={item.slug} className="border-b border-paper/15">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={active === i}
                    className="group flex w-full items-center gap-4 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "numeral text-sm transition-colors duration-300",
                        active === i ? "text-lime" : "text-paper/65",
                      )}
                    >
                      {numeral(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-lg font-bold tracking-[-0.025em] transition-colors duration-300 sm:text-xl",
                        active === i ? "text-paper" : "text-paper/70 group-hover:text-paper/80",
                      )}
                    >
                      {item.name}
                    </span>
                    <span
                      className={cn(
                        "label transition-colors duration-300",
                        active === i ? "text-lime" : "text-paper/65",
                      )}
                    >
                      {item.family}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-xs leading-relaxed text-paper/65">{MATERIAL_DISCLAIMER}</p>
          </div>

          {/* Detail */}
          <div className="col-span-12 lg:col-span-7">
            {/* `key` remounts the panel on selection, so the CSS entrance replays. */}
            <div key={material.slug} className="enter grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="aspect-square w-full overflow-hidden bg-ink">
                {hasAsset(material.asset) && (
                <SmartImage
                  asset={material.asset}
                  sizes={SIZES.third}
                  className="h-full w-full"
                  imageClassName="object-cover"
                  alt={`${material.name}. Fabric structure`}
                />
                )}
              </div>

              <dl className="flex flex-col justify-center gap-4">
                <div>
                  <dt className="label text-paper/65">Common compositions</dt>
                  <dd className="mt-1.5 text-sm text-paper/85">{material.compositions.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="label text-paper/65">Typical program weight</dt>
                  <dd className="mt-1.5 font-display text-xl font-bold tracking-[-0.02em] text-lime">
                    {material.typicalWeight}
                  </dd>
                </div>
                <div>
                  <dt className="label text-paper/65">Hand feel</dt>
                  <dd className="mt-1.5 text-sm text-paper/85">{material.handFeel}</dd>
                </div>
                <div>
                  <dt className="label text-paper/65">Finish options</dt>
                  <dd className="mt-1.5 text-sm text-paper/85">{material.finishOptions.join(" · ")}</dd>
                </div>
                <div>
                  <dt className="label text-paper/65">Used for</dt>
                  <dd className="mt-1.5 text-sm text-paper/85">{material.useCases.join(" · ")}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 border-t border-paper/15 pt-6">
              <ArrowLink href="/materials" className="text-lime">
                Explore all materials
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
