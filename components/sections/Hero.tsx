import { ArrowRight, Upload } from "lucide-react";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { HeroVisual } from "./HeroVisual";
import { Button } from "@/components/ui/Button";
import { RfqClickLink } from "@/components/ui/TrackedLink";

/**
 * Homepage hero.
 *
 * A server component. The page has five seconds to answer who, where, what and
 * what to do next: the headline carries who and where, the sub-line carries the
 * commercial model, and two actions carry the next step. Nothing else competes.
 *
 * Entrance animation is CSS running on load — no observer, no animation runtime,
 * and nothing blocking the largest text on the page from painting.
 *
 * The hero image is the only `priority` asset on this route.
 */

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream" data-zone="light">
      <div className="pointer-events-none absolute inset-0 tech-grid text-ink" aria-hidden="true" />

      <div className="shell-wide relative grid grid-cols-12 items-center gap-y-10 pt-14 pb-16 lg:min-h-[calc(100svh-6.5rem)] lg:gap-x-8 lg:pt-8 lg:pb-20">
        {/* ---------------- Copy ---------------- */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7">
          <p className="enter label mb-6 flex items-center gap-3 text-ink/70 lg:mb-8">
            AHM International
            <span className="h-px w-10 bg-ink/25" aria-hidden="true" />
            <span className="text-cobalt">Est. Karachi</span>
          </p>

          {/* Painted immediately. It is the largest element above the fold, so
              masking it would postpone LCP by the length of the animation. */}
          <p className="label mb-5 text-ink/65">Your next Pakistan manufacturing partner</p>

          <MaskedHeading
            instant
            as="h1"
            className="font-display text-[clamp(2.5rem,8.4vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink xl:text-[clamp(3rem,6.2vw,6.75rem)]"
            lines={[
              { text: "FROM TECH PACK" },
              { text: "TO FOB", className: "text-cobalt" },
              { text: "SHIPMENT." },
            ]}
          />

          <div className="enter" style={{ "--enter-delay": "0.3s" } as React.CSSProperties}>
            <p className="mt-8 max-w-xl text-lead text-ink/70">
              Product development, sourcing and apparel manufacturing in Pakistan for
              international uniform, workwear and private-label programs.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MagneticButton>
                <Button href="/benchmark-a-style" size="lg" withArrow>
                  Benchmark a Style
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/send-tech-pack" variant="outline" size="lg">
                  Send Tech Pack
                </Button>
              </MagneticButton>
              <Button href="/capabilities" variant="ghost" size="lg">
                View Capabilities
              </Button>
            </div>

            <RfqClickLink
              href="/request-a-quote#files"
              event="techpack_upload_start"
              location="hero"
              className="group mt-7 inline-flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
            >
              <Upload className="h-4 w-4" aria-hidden="true" />
              <span className="underline-offset-4 group-hover:underline">
                Have a tech pack? Upload it
              </span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RfqClickLink>
          </div>
        </div>

        {/* ---------------- Image ---------------- */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5">
          <div className="enter relative" style={{ "--enter-delay": "0.08s" } as React.CSSProperties}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory sm:aspect-[4/3] lg:aspect-[5/6] xl:aspect-[4/5]">
              <HeroVisual />
            </div>

            {/* Status pill.

                Deliberately static. It previously carried both a perpetual float
                and a pinging dot — two never-ending animations on one small
                element, above the fold, competing with the headline for
                attention. Brief §46 rules out constant floating, and a pulsing
                dot conventionally means "live status", which this is not: it is
                a fixed fact about where AHM ships from. It enters once with the
                rest of the hero and then holds still. */}
            <div
              className="enter absolute -top-3 right-4 lg:right-6"
              style={{ "--enter-delay": "0.7s" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5 bg-cobalt px-4 py-2.5 text-white shadow-[0_12px_30px_-12px_rgba(39,84,255,0.7)]">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                <span className="label">FOB &bull; Pakistan</span>
              </div>
            </div>

            {/* Verified proof, where the eye lands after the image */}
            <div className="mt-4 flex items-start gap-3 border-l-2 border-cobalt pl-4">
              <p className="max-w-sm text-sm text-ink/70">
                Documented FOB export experience from Port Qasim, Karachi to the United States.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
