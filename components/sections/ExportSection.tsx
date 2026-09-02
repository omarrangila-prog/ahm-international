import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { ORIGIN, markets, fobScope, EXPORT_STATEMENT, MARKET_STATEMENT } from "@/data/markets";

/**
 * FOB export.
 *
 * The right column carries photographs of the actual operation — loading,
 * despatch-ready cartons, packing. It previously held a drawn route schematic.
 * That schematic was accurate, with positions computed from real coordinates,
 * but a vector map is still a drawing, and a drawing of shipping is weaker
 * evidence to a sourcing manager than a photograph of cartons.
 *
 * The distinction the map legend used to carry now sits in a two-cell list:
 * one documented lane, and target markets named as targets. A market AHM has
 * not shipped to should read as a target in words, not as a dashed line a
 * reader may mistake for a route — that mistake is the single most common
 * credibility failure on supplier sites.
 */

export function ExportSection() {
  return (
    <Section zone="ink" spacing="lg" tooth aria-labelledby="export-heading">
      <div className="shell-wide relative z-10">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          {/* Copy */}
          <div className="col-span-12 lg:col-span-5">
            <MaskedHeading
              as="h2"
              id="export-heading"
              className="mt-6 font-display text-display text-paper"
              lines={[{ text: "READY" }, { text: "FOR FOB." }]}
            />

            <div className="mt-7 border-l-2 border-lime pl-5">
              <p className="text-lead text-paper/85">{EXPORT_STATEMENT}</p>
            </div>

            <dl className="mt-10 flex flex-col gap-5">
              {fobScope.map((item) => (
                <div key={item.title} className="border-t border-paper/15 pt-4">
                  <dt className="font-display text-[0.9375rem] font-bold tracking-[-0.015em] text-paper">
                    {item.title}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-paper/60">{item.body}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <Button href="/export" variant="lime" size="lg" withArrow>
                Discuss an FOB Program
              </Button>
            </div>
          </div>

          {/* Export photography.

              This column previously carried a drawn route schematic. It was
              accurate — positions computed from real coordinates, documented
              lanes solid and target markets dashed — but a vector map is still a
              drawing, and a drawing of shipping is weaker evidence than a
              photograph of cartons. The honesty the schematic carried lives in
              the copy beneath instead, where it reads as a statement rather than
              a legend nobody decodes. */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                <div className="relative aspect-[4/3] overflow-hidden border border-paper/12 bg-ink/60 sm:col-span-3 sm:aspect-auto sm:min-h-[19rem]">
                  <SmartImage
                    asset="export.containerLoading"
                    sizes="(max-width: 640px) 100vw, 42vw"
                    className="h-full w-full"
                    imageClassName="object-cover"
                    alt="Cartons being loaded for export at Port Qasim, Karachi"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-1">
                  <div className="relative aspect-[4/3] overflow-hidden border border-paper/12 bg-ink/60">
                    <SmartImage
                      asset="export.warehouse"
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="h-full w-full"
                      imageClassName="object-cover"
                      alt="Marked cartons stacked and ready for despatch"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden border border-paper/12 bg-ink/60">
                    <SmartImage
                      asset="factory.packing"
                      sizes="(max-width: 640px) 50vw, 20vw"
                      className="h-full w-full"
                      imageClassName="object-cover"
                      alt="Garments being folded, polybagged and carton-packed"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* The honesty layer the map legend used to carry. Documented lanes
                and target markets are named rather than drawn, because a market
                AHM has not shipped to should read as a target in words, not as a
                dashed line a reader may take for a route. */}
            <dl className="mt-4 grid grid-cols-1 gap-px border border-paper/12 bg-paper/12 sm:grid-cols-2">
              <div className="bg-ink/60 px-5 py-4">
                <dt className="label text-lime">Documented lane</dt>
                <dd className="mt-1.5 text-sm text-paper/75">
                  {ORIGIN.port} &rarr; United States
                </dd>
              </div>
              <div className="bg-ink/60 px-5 py-4">
                <dt className="label text-paper/55">Target buyer markets</dt>
                <dd className="mt-1.5 text-sm text-paper/75">
                  {markets.map((m) => m.name).join(", ")}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs leading-relaxed text-paper/60">{MARKET_STATEMENT}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
