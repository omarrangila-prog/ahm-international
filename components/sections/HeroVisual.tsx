import { SmartImage } from "@/components/ui/SmartImage";
import { resolveAsset } from "@/data/assets";
import Image from "next/image";

/**
 * Hero visual.
 *
 * Renders the hero photograph once `hero-sewing-01.webp` exists. Until then it
 * composes a lay-down from article images that actually exist. Missing files
 * are skipped — nothing is drawn in their place.
 *
 * The lay-down images are generated, so the article list ends with a line
 * saying so, at every width. It is the one place on the site that bypasses
 * SmartImage, and so the one place its label would not reach.
 */

const layDown = [
  { key: "photo.utilityBomberCharcoal", code: "Work jacket", label: "Charcoal utility bomber", className: "left-[4%] top-[16%] w-[42%] z-20" },
  { key: "photo.poloTaupeLongSleeve", code: "Classic polo", label: "Long-sleeve uniform polo", className: "right-[5%] top-[8%] w-[36%] z-10" },
  // Kept above the lower guide line (78%): the article codes are set below it,
  // and an apron reaching the bottom edge put its own caption on top of it.
  { key: "products.apron.front", code: "Bib apron", label: "Divided patch pocket", className: "left-[34%] bottom-[24%] w-[28%] z-30" },
] as const;

function LayDown() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-paper">
      {/* Drafting field */}
      <div className="pointer-events-none absolute inset-0 tech-grid text-ink" aria-hidden="true" />

      {/* Annotation rules. The horizon a technical drawing is measured against */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-ink/25"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="22" x2="100" y2="22" stroke="currentColor" strokeWidth="0.15" />
        <line x1="0" y1="78" x2="100" y2="78" stroke="currentColor" strokeWidth="0.15" />
        <line x1="52" y1="0" x2="52" y2="100" stroke="currentColor" strokeWidth="0.15" strokeDasharray="1 1.5" />
      </svg>

      {layDown.map((item, index) => {
        const asset = resolveAsset(item.key);
        if (!asset.available) return null;
        return (
          <div key={item.code} className={`absolute ${item.className}`}>
            <Image
              src={asset.src}
              alt=""
              width={asset.width}
              height={asset.height}
              sizes="(max-width: 1024px) 40vw, 22vw"
              placeholder={asset.blurDataURL ? "blur" : "empty"}
              blurDataURL={asset.blurDataURL}
              // Only the largest article is the LCP candidate and preloaded.
              // The other two lazy-load: three simultaneous fetches on a
              // throttled connection pushed LCP out by more than a second.
              priority={index === 0}
              loading={index === 0 ? undefined : "lazy"}
              className="h-auto w-full drop-shadow-[0_18px_35px_rgba(16,19,21,0.16)]"
            />
          </div>
        );
      })}

      {/* Article codes, set as a spec sheet would set them — only for articles
          that actually rendered above, so a missing photo does not leave a
          floating label with nothing to point at. */}
      <ul className="absolute bottom-3 left-3 z-40 flex flex-col gap-0.5 sm:bottom-4 sm:left-4 sm:gap-1">
        {layDown
          .filter((item) => resolveAsset(item.key).available)
          .map((item) => (
          <li key={item.code} className="label text-ink/65">
            <span className="text-ink">{item.code}</span>
            <span className="mx-1.5 opacity-40">/</span>
            {item.label}
          </li>
        ))}
        {layDown.some((item) => resolveAsset(item.key).generated) && (
          <li className="label mt-1 text-ink">AI illustrations, not photographs</li>
        )}
      </ul>

      {/* Top-left, the one corner the lay-down leaves empty; bottom-right ran
          into the longest article code. Hidden on phones, where the column is
          too narrow to clear the FOB pill above it. */}
      <p className="absolute left-4 top-4 z-40 hidden label text-ink/70 sm:block">Representative articles</p>
    </div>
  );
}

export function HeroVisual() {
  return (
    <SmartImage
      asset="hero.sewing"
      sizes="(max-width: 1024px) 100vw, 50vw"
      priority
      className="h-full w-full"
      imageClassName="object-cover"
      fallback={<LayDown />}
    />
  );
}
