import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolveAsset, type AssetKey } from "@/data/assets";

/**
 * The only image primitive in the site.
 *
 * Takes a semantic asset key, not a filename. When the underlying file exists it
 * renders next/image with responsive `sizes`, AVIF/WebP delivery, a blur
 * placeholder and art-directed `object-position`.
 *
 * Where a slot has no file yet it renders nothing but a faint wash of the
 * surrounding text colour — no illustration, no diagram, no invented picture.
 * Sections that can restructure around a missing image should ask `hasAsset()`
 * and do that instead; an empty frame is a last resort, not a design.
 */

type Props = {
  asset: AssetKey;
  /**
   * Responsive sizes hint. Always pass one — without it the browser assumes
   * 100vw and over-fetches. Common values are exported below as `SIZES`.
   */
  sizes: string;
  /** Only the genuine LCP image on a route should set this. */
  priority?: boolean;
  className?: string;
  /** Applied to the <img> itself. Use for `object-cover` / `object-contain`. */
  imageClassName?: string;
  /** Overrides the alt text from the registry. Pass "" for decorative use. */
  alt?: string;
  /** Overrides object-position from the registry. */
  position?: string;
  /** Renders the compliance caption beneath the frame where the registry has one. */
  showCaption?: boolean;
  /** Constrains the frame to the asset's declared aspect ratio. */
  fixedRatio?: boolean;
  /**
   * Replaces the generic specimen for this slot while the file is pending.
   * Use where a slot is important enough to deserve a composed stand-in rather
   * than a diagram — the hero, for instance.
   */
  fallback?: React.ReactNode;
};

/** Sizes strings for the layouts used across the site. */
export const SIZES = {
  full: "100vw",
  half: "(max-width: 768px) 100vw, 50vw",
  /* These two mirror the grids that consume them — `grid-cols-1 sm:grid-cols-2
     lg:grid-cols-3` and `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` — so the
     breakpoints are Tailwind's 640 and 1024, not 768 and 1280.

     The previous values were off in two bands and over-fetched in both: a 100vw
     image for a 50vw slot between 640 and 768, and a 50vw image for a 33vw slot
     between 1024 and 1280. The first is a 2x over-fetch across the whole
     large-phone range. Where a consuming grid is denser than these assume the
     hint is generous rather than short, so nothing is ever under-fetched and
     upscaled. */
  third: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  quarter: "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  card: "(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 30vw",
  thumb: "(max-width: 768px) 33vw, 180px",
} as const;

export function SmartImage({
  asset,
  sizes,
  priority = false,
  className,
  imageClassName,
  alt,
  position,
  showCaption = false,
  fixedRatio = false,
  fallback,
}: Props) {
  const resolved = resolveAsset(asset);
  const altText = alt ?? resolved.alt;
  const objectPosition = position ?? resolved.position;

  const frame = (
    <div
      className={cn("relative overflow-hidden", className)}
      style={fixedRatio ? { aspectRatio: String(resolved.aspect) } : undefined}
    >
      {resolved.available ? (
        <Image
          src={resolved.src}
          alt={altText}
          fill
          sizes={sizes}
          priority={priority}
          // next/image already omits `loading` when priority is set; below-fold
          // images fall through to native lazy loading.
          loading={priority ? undefined : "lazy"}
          placeholder={resolved.blurDataURL ? "blur" : "empty"}
          blurDataURL={resolved.blurDataURL}
          className={cn("object-cover", imageClassName)}
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        // Inherits the zone's foreground, so it reads as a tonal panel on cream
        // and on ink alike rather than a bright block punched into a dark section.
        (fallback ?? <div className="tooth relative h-full w-full bg-current/[0.06]" aria-hidden="true" />)
      )}
    </div>
  );

  if (!showCaption || !resolved.caption) return frame;

  return (
    <figure className="flex flex-col gap-3">
      {frame}
      <figcaption className="label text-current/70">{resolved.caption}</figcaption>
    </figure>
  );
}
