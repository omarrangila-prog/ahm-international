import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SmartImage, SIZES } from "@/components/ui/SmartImage";
import { hasAsset, type AssetKey } from "@/data/assets";
import { cn, numeral } from "@/lib/utils";
import { CAPABILITY_LABEL, CAPABILITY_MEANING, type CapabilityStatus } from "@/data/verification";

/**
 * Product category card.
 *
 * A server component. Every interaction here — image scale, arrow travel,
 * numeral emphasis, secondary-image cross-fade — is a CSS group-hover, so the
 * card ships no JavaScript. Seven of these appear on the homepage; making them
 * interactive in JS was pure cost for effects CSS already does well.
 *
 * Two structural decisions worth naming:
 *
 * 1. The garment always sits on a light plate rather than directly on the card's
 *    colour. The supplied renders are predominantly dark, so painting them onto
 *    forest or ink would lose the product entirely. The plate keeps every card
 *    legible whichever zone it draws, so the palette can stay bold without the
 *    imagery paying for it.
 *
 * 2. The secondary image is existence-checked. Where a back view has been shot
 *    it cross-fades on hover; where it has not, the card renders exactly as
 *    before rather than flickering to a placeholder.
 */

const zoneClasses: Record<string, string> = {
  forest: "bg-forest text-cream",
  cobalt: "bg-cobalt text-white",
  plum: "bg-plum text-cream",
  orange: "bg-orange text-ink",
  sky: "bg-sky text-ink",
  sand: "bg-sand text-ink",
  lime: "bg-lime text-ink",
  ink: "bg-ink text-cream",
};

export type ProductCardProps = {
  index: number;
  name: string;
  href: string;
  zone: string;
  items: string[];
  asset: AssetKey;
  /** Revealed on hover when the file exists. */
  secondaryAsset?: AssetKey;
  className?: string;
  /**
   * Rendered only when it is *not* `current_capability`. A badge on every card
   * saying "current capability" is noise; a badge on the two that are not is
   * information a sourcing manager actually needs before sending a tech pack.
   */
  capabilityStatus?: CapabilityStatus;
  /** Wide cards put type beside the product rather than above it. */
  layout?: "stacked" | "wide";
  sizes?: string;
};

export function ProductCard({
  index,
  name,
  href,
  zone,
  items,
  asset,
  secondaryAsset,
  capabilityStatus,
  className,
  layout = "stacked",
  sizes = SIZES.card,
}: ProductCardProps) {
  const secondaryReady = Boolean(secondaryAsset && hasAsset(secondaryAsset));
  const flag = capabilityStatus && capabilityStatus !== "current_capability" ? capabilityStatus : null;

  const plate = (
    <div className="relative flex-1 overflow-hidden bg-white">
      {flag && (
        <span
          title={CAPABILITY_MEANING[flag]}
          className="absolute left-3 top-3 z-10 border border-ink/15 bg-cream/95 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-ink/75 backdrop-blur-sm"
        >
          {CAPABILITY_LABEL[flag]}
        </span>
      )}
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105",
          secondaryReady && "transition-[transform,opacity] group-hover:opacity-0",
        )}
      >
        <SmartImage
          asset={asset}
          sizes={sizes}
          className="h-full w-full"
          imageClassName="object-contain p-3 sm:p-4"
          alt=""
        />
      </div>

      {secondaryReady && secondaryAsset && (
        <div className="absolute inset-0 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-100">
          <SmartImage
            asset={secondaryAsset}
            sizes={sizes}
            className="h-full w-full"
            imageClassName="object-contain p-3 sm:p-4"
            alt=""
          />
        </div>
      )}
    </div>
  );

  const copy = (
    <div
      className={cn(
        "relative z-10 flex flex-col justify-between p-6 sm:p-7",
        layout === "wide" ? "h-full" : "min-h-[13rem]",
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="numeral text-[2.75rem] leading-none opacity-75 transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:opacity-95 sm:text-[3.25rem]">
            {numeral(index)}
          </span>
          <ArrowUpRight
            className="mt-2 h-5 w-5 opacity-75 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-3 font-display text-xl font-extrabold uppercase leading-[1.05] tracking-[-0.025em] sm:text-2xl">
          {name}
        </h3>
      </div>

      <ul className={cn("mt-4 flex flex-wrap gap-x-3 gap-y-1", layout === "wide" ? "mt-6" : "pt-1")}>
        {items.map((item) => (
          <li key={item} className="text-[0.8125rem] opacity-90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex overflow-hidden transition-shadow duration-500",
        "hover:shadow-[0_30px_60px_-35px_rgba(16,19,21,0.55)]",
        zoneClasses[zone] ?? zoneClasses.ink,
        layout === "wide" ? "flex-col sm:flex-row" : "flex-col",
        className,
      )}
      aria-label={`${name}. Explore category`}
    >
      {layout === "wide" ? (
        <>
          <div className="sm:w-1/2">{copy}</div>
          <div className="relative flex min-h-[12rem] flex-1 sm:min-h-0">{plate}</div>
        </>
      ) : (
        <>
          {copy}
          <div className="relative flex min-h-[15rem] flex-1">{plate}</div>
        </>
      )}
    </Link>
  );
}
