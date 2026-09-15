import { SmartImage } from "@/components/ui/SmartImage";
import { resolveAsset } from "@/data/assets";
import Image from "next/image";

/**
 * Hero visual.
 *
 * Renders the hero photograph once `hero-sewing-01.webp` exists. Until then it
 * composes a lay-down from photographed articles that actually exist. Missing
 * files are skipped — nothing is drawn in their place.
 */

const layDown = [
  { key: "photo.utilityBomberCharcoal", code: "Work jacket", label: "Charcoal utility bomber", className: "left-[4%] top-[16%] w-[42%] z-20" },
  { key: "photo.poloGreenRibbed", code: "Classic polo", label: "Ribbed uniform polo", className: "right-[5%] top-[8%] w-[36%] z-10" },
  { key: "products.apron.front", code: "Bib apron", label: "Three-pocket bib apron", className: "left-[30%] bottom-[8%] w-[32%] z-30" },
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

      {/* Article codes, set as a spec sheet would set them */}
      <ul className="absolute bottom-3 left-3 z-40 flex flex-col gap-0.5 sm:bottom-4 sm:left-4 sm:gap-1">
        {layDown.map((item) => (
          <li key={item.code} className="label text-ink/65">
            <span className="text-ink">{item.code}</span>
            <span className="mx-1.5 opacity-40">/</span>
            {item.label}
          </li>
        ))}
      </ul>

      {/* Hidden on phones, where it would collide with the article codes. */}
      <p className="absolute bottom-4 right-4 z-40 hidden label text-ink/70 sm:block">Representative articles</p>
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
