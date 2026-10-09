import { Section, type ZoneName } from "@/components/ui/Section";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { resolveAsset, type AssetKey } from "@/data/assets";
import { cn } from "@/lib/utils";

/**
 * Standard interior page header.
 *
 * Carries the single H1 for the route, the breadcrumb trail and the primary
 * action. Sharing one component keeps heading semantics consistent across every
 * page — exactly one H1, always the page's actual subject.
 */

type Props = {
  eyebrow: string;
  /** Explicit line breaks so the masked reveal animates per line. */
  headingLines: (string | { text: string; className?: string })[];
  intro: string;
  trail: Crumb[];
  zone?: ZoneName;
  /** Supporting image, shown beside the copy on wide screens. */
  asset?: AssetKey;
  /** Marks the hero image as this route's LCP element. */
  priority?: boolean;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Small facts strip beneath the intro. */
  facts?: { label: string; value: string }[];
};

export function PageHero({
  eyebrow,
  headingLines,
  intro,
  trail,
  zone = "paper",
  asset,
  priority = false,
  primaryCta,
  secondaryCta,
  facts,
}: Props) {
  const dark = zone === "ink";
  const tone = dark ? "dark" : "light";

  // Product garments are portrait on a plate. A landscape `sm:aspect-[4/3]`
  // frame left large empty bands beside a 4:5 photo (or cropped it when cover
  // won the utility conflict). Keep the plate portrait at every breakpoint.
  const resolved = asset ? resolveAsset(asset) : null;
  const isGarment = resolved?.kind === "garment";

  /**
   * Whether to reserve the image column at all.
   *
   * This used to test `asset` — whether a key was *passed* — rather than
   * whether its file exists. A page naming an unshot photograph therefore kept
   * the five-column slot and filled it with SmartImage's empty tonal panel,
   * which is the one thing this site's asset rule exists to prevent. Two
   * manufacturing stage pages shipped that way.
   *
   * Gating on availability instead means the headline widens to nine columns,
   * the same restructure `/capabilities` performs, and a hero can never render
   * an empty frame again.
   */
  const showImage = Boolean(resolved?.available);

  return (
    <Section zone={zone} spacing="none" tooth={dark}>
      <div className="shell-wide relative z-10 pt-8 pb-16 lg:pb-24">
        <Breadcrumbs trail={trail} tone={tone} />

        <div className="mt-10 grid grid-cols-12 items-end gap-y-8 lg:mt-14 lg:gap-x-12 lg:gap-y-10">
          <div className={cn("col-span-12 order-1", showImage ? "lg:col-span-7" : "lg:col-span-9")}>
            <p className={cn("label mb-5", dark ? "text-current/70" : "text-ink/65")}>{eyebrow}</p>

            <MaskedHeading
              immediate
              as="h1"
              className="font-display text-[clamp(2.25rem,6.4vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
              lines={headingLines}
            />

            <p className={cn("mt-7 max-w-2xl text-lead", dark ? "text-current/70" : "text-ink/70")}>
              {intro}
            </p>

            {/* Desktop CTAs stay with the copy. On phones the image comes next
                so the garment is not pushed under the sticky quote bar. */}
            {(primaryCta || secondaryCta) && (
              <div className="mt-9 hidden flex-wrap gap-3 lg:flex">
                {primaryCta && (
                  <Button
                    href={primaryCta.href}
                    variant={dark ? "lime" : "solid"}
                    size="lg"
                    withArrow
                  >
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    href={secondaryCta.href}
                    variant={dark ? "invert" : "outline"}
                    size="lg"
                  >
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {showImage && asset && (
            <div className="col-span-12 order-2 lg:col-span-5">
              <div
                className={cn(
                  "w-full overflow-hidden",
                  isGarment
                    ? "aspect-[4/5] bg-white p-5 sm:p-7"
                    : cn("aspect-[4/3]", dark ? "bg-white/5" : "bg-paper"),
                )}
              >
                <SmartImage
                  asset={asset}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  priority={priority}
                  className="h-full w-full"
                  imageClassName={isGarment ? "object-contain" : "object-cover"}
                />
              </div>
            </div>
          )}

          {(primaryCta || secondaryCta) && (
            <div className="col-span-12 order-3 flex flex-wrap gap-3 lg:hidden">
              {primaryCta && (
                <Button
                  href={primaryCta.href}
                  variant={dark ? "lime" : "solid"}
                  size="lg"
                  withArrow
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant={dark ? "invert" : "outline"}
                  size="lg"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>

        {facts && facts.length > 0 && (
          <dl
            className={cn(
              "mt-14 grid grid-cols-2 gap-px border lg:grid-cols-4",
              dark ? "border-current/15 bg-current/15" : "border-line bg-line",
            )}
          >
            {facts.map((fact) => (
              <div key={fact.label} className={cn("p-5", dark ? "bg-current/0" : "bg-paper")}>
                <dt className={cn("label", dark ? "text-current/70" : "text-ink/65")}>{fact.label}</dt>
                <dd className="mt-2 font-display text-base font-bold tracking-[-0.02em]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </Section>
  );
}
