import { Marquee } from "@/components/motion/Marquee";
import { trustStrip } from "@/data/capabilities";

/**
 * Capability strip beneath the hero.
 *
 * Typographic, not iconographic. This previously set the nine steps as nine
 * bordered cells each with its own lucide icon — nine glyphs and nine dividers
 * competing with the headline directly above them, in the first screen. The
 * icons carried no information the words did not: a scissors beside "Cut & Sew"
 * is decoration, and nine decorations read as clutter.
 *
 * Set as one measured sequence instead, so it scans as a single line of
 * capability rather than a row of badges. Mobile keeps the ticker, because nine
 * items stacked would be a wall.
 */
export function TrustStrip() {
  return (
    <section
      className="border-y border-line bg-cream"
      aria-label="Manufacturing capabilities"
      data-zone="light"
    >
      {/* Mobile: ticker */}
      <div className="py-4 md:hidden">
        <Marquee items={trustStrip} speed={38} className="text-ink/65" />
      </div>

      {/* Desktop: one measured line */}
      <ul className="shell-wide hidden flex-wrap items-center gap-x-7 gap-y-2.5 py-5 md:flex">
        {trustStrip.map((item, i) => (
          <li key={item} className="flex items-center gap-6">
            {i > 0 && (
              <span aria-hidden="true" className="hidden h-3 w-px bg-line-strong lg:block" />
            )}
            <span className="label whitespace-nowrap text-ink/60 transition-colors duration-200 hover:text-ink">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
