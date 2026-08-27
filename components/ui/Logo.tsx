import { cn } from "@/lib/utils";

/**
 * AHM International mark, drawn as vector.
 *
 * The supplied brand file is a low-resolution raster with a metallic gradient,
 * and the cropped PNG variants that were dropped in cut the wordmark mid-letter
 * ("NTERN") and cost 107 kB each on every page. The original build package
 * flagged a vector master as the P0 brand task for exactly this reason.
 *
 * This is that redraw: the same geometry — an outer peak forming the A, an inner
 * double peak forming the M — as flat paths in `currentColor`. It stays crisp at
 * any size, inverts correctly across every colour zone without a second file,
 * and costs about a kilobyte.
 *
 * If the exact supplied artwork is required instead, it needs to be re-supplied
 * as a clean, uncropped SVG; the cropped rasters are archived in
 * `assets-master/brand/` for comparison.
 */

export function AhmMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 88"
      className={cn("h-full w-auto", className)}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer peak. The A */}
      <path d="M6 84 L50 4 L94 84" stroke="currentColor" strokeWidth="9" strokeLinejoin="miter" />
      {/* Inner double peak. The M */}
      <path d="M27 84 L40.5 47 L50 62 L59.5 47 L73 84" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" />
    </svg>
  );
}

type LogoProps = {
  /** Hides the wordmark, leaving only the monogram. */
  markOnly?: boolean;
  className?: string;
};

export function Logo({ markOnly = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-current", className)}>
      <AhmMark className="h-7 w-auto shrink-0 sm:h-8" />
      {/* With the wordmark hidden, the link still needs an accessible name. */}
      {markOnly && <span className="sr-only">AHM International</span>}
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[0.95rem] font-extrabold tracking-[-0.02em] sm:text-[1.05rem]">
            AHM
          </span>
          <span className="label mt-0.5 text-[0.5rem] opacity-70 sm:text-[0.55rem]">International</span>
        </span>
      )}
    </span>
  );
}
