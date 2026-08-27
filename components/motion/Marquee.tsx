import { cn } from "@/lib/utils";

/**
 * Calm continuous ticker.
 *
 * A server component: the animation is CSS, so nothing about it needs the
 * browser at render time. The track is duplicated once and translated by exactly
 * -50%, which is what makes the loop seamless. Under reduced motion the CSS
 * stops the animation and it reads as a static wrapping row.
 */
export function Marquee({
  items,
  /** Seconds for one full pass. Higher is calmer. */
  speed = 46,
  className,
  separator = "•",
}: {
  items: readonly string[];
  speed?: number;
  className?: string;
  separator?: string;
}) {
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className="marquee-track flex shrink-0 items-center group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {/* Rendered twice: the second copy is what the first loops into. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex shrink-0 items-center">
                <span className="label whitespace-nowrap">{item}</span>
                <span className="mx-5 text-current/30 sm:mx-7" aria-hidden="true">
                  {separator}
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
