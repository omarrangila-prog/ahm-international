import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset } from "@/data/assets";
import type { Industry } from "@/data/industries";
import { cn } from "@/lib/utils";

/**
 * Industry card.
 *
 * Two presentations of the same frame:
 *
 *  - Once environment photography exists, the photo fills the card and the
 *    caption sits over a gradient — the intended design.
 *  - Until then the card shows the article that represents that environment on a
 *    light plate, with the caption below it.
 *
 * Both are exactly 3:4, so the switch costs no layout shift. The second is not a
 * placeholder so much as a different true statement: we cannot yet show a
 * grocery floor, but we can show the apron that goes on it.
 */

export function IndustryCard({
  industry,
  tone = "dark",
  sizes = SIZES.quarter,
}: {
  industry: Industry;
  /** The zone the card sits in, which decides the caption colours. */
  tone?: "dark" | "light";
  sizes?: string;
}) {
  const hasPhoto = hasAsset(industry.asset);
  const dark = tone === "dark";

  if (hasPhoto) {
    return (
      <figure className={cn("group relative overflow-hidden", dark ? "bg-forest-deep" : "bg-ivory")}>
        <div className="aspect-[3/4] w-full overflow-hidden">
          <SmartImage
            asset={industry.asset}
            sizes={sizes}
            className="h-full w-full"
            imageClassName="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        </div>
        <figcaption
          className={cn(
            "absolute inset-x-0 bottom-0 p-4 pt-12",
            dark
              ? "bg-gradient-to-t from-forest-deep via-forest-deep/85 to-transparent"
              : "bg-gradient-to-t from-ink via-ink/80 to-transparent",
          )}
        >
          <p className="font-display text-base font-bold tracking-[-0.02em] text-cream">
            {industry.name}
          </p>
          <p className="mt-1.5 text-xs leading-snug text-cream/65">{industry.demand}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="group flex h-full flex-col">
      {/* Light plate keeps every article legible whatever zone the card is in. */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-cream">
        <SmartImage
          asset={industry.representative}
          sizes={sizes}
          className="h-full w-full"
          imageClassName="object-contain p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
          alt={`${industry.typicalGarments[0]} of the type produced for ${industry.name.toLowerCase()} programs`}
        />
      </div>

      <figcaption className={cn("flex flex-1 flex-col pt-4", dark ? "text-cream" : "text-ink")}>
        <p className="font-display text-base font-bold tracking-[-0.02em]">{industry.name}</p>
        <p className={cn("mt-1.5 text-xs leading-snug", dark ? "text-cream/60" : "text-ink/60")}>
          {industry.demand}
        </p>
        <p className={cn("mt-3 text-[0.6875rem] leading-snug", dark ? "text-cream/70" : "text-ink/70")}>
          {industry.typicalGarments.join(" · ")}
        </p>
      </figcaption>
    </figure>
  );
}
