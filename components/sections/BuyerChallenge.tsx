import { Section } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Button } from "@/components/ui/Button";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";

/**
 * The closing ask.
 *
 * One instruction, at the largest type on the page. Everything before this
 * section has been building toward a single low-risk action, so this one does
 * not introduce a new idea — it just removes every remaining reason to scroll
 * past.
 */

export function BuyerChallenge() {
  return (
    <Section zone="lime" spacing="none" tooth aria-labelledby="challenge-heading">
      <div className="shell-wide relative z-10 grid grid-cols-12 items-center gap-y-10 py-20 lg:gap-x-8 lg:py-28">
        <div className="col-span-12 lg:col-span-7">
          <MaskedHeading
            as="h2"
            id="challenge-heading"
            className="font-display text-mega text-ink"
            lines={[{ text: "GIVE US" }, { text: "ONE STYLE." }]}
          />
          <p className="mt-7 max-w-md text-lead text-ink/75">
            We&apos;ll show you what AHM can do. Construction, materials, costing and a delivery
            position, against your specification.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/request-a-quote" variant="invert" size="lg" withArrow>
              Send Your RFQ
            </Button>
            <Button href="/send-tech-pack" variant="outline" size="lg">
              Send a Tech Pack
            </Button>
          </div>
        </div>

        {hasAsset("photo.poloGreenRibbed") && (
        <div className="col-span-12 lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none">
            <SmartImage
              asset="photo.poloGreenRibbed"
              sizes={SIZES.third}
              className="h-full w-full"
              imageClassName="object-contain drop-shadow-[0_25px_45px_rgba(16,19,21,0.22)]"
              alt="Ribbed dark green uniform polo"
            />
          </div>
        </div>
        )}
      </div>
    </Section>
  );
}
