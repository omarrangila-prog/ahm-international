import { cn } from "@/lib/utils";

/**
 * COLOUR ZONING
 * =============
 *
 * Sections declare a zone, not a set of colours. Each zone binds a background, a
 * foreground and the `data-zone` attribute that global CSS uses to flip focus
 * rings and selection colours to something legible on that ground.
 *
 * The point of routing every section through here is that the palette stays
 * controlled: a section cannot invent a one-off background, and a designer
 * changing what "ink" means changes it everywhere at once.
 */

export type ZoneName = "paper" | "ink" | "lime";

/**
 * Three grounds, two colours.
 *
 * There were thirteen zones — cream, ivory, paper, ink, graphite, forest,
 * cobalt, orange, lime, sand, sky, plum — and a page could pass through five of
 * them. That is a palette doing the work of a layout: every section shouted for
 * attention with hue instead of earning it with hierarchy, and no two pages
 * agreed on what any colour meant.
 *
 * Now: paper is the ground, ink is its inverse, lime is the one accent. Variety
 * comes from the fabric texture on each ground and from typographic scale, not
 * from adding colours — which is the right economy for a manufacturer whose
 * product is cloth.
 *
 * Lime is only ever a *ground*, never text on paper: #C8FF3D on the off-white
 * measures about 1.4:1. On ink it is 12.4:1, and ink on lime is the same, so
 * both remaining pairings are far past AA.
 */
const zoneStyles: Record<ZoneName, { className: string; scheme: "light" | "dark" }> = {
  paper: { className: "bg-paper text-ink", scheme: "light" },
  ink: { className: "bg-ink text-paper", scheme: "dark" },
  lime: { className: "bg-lime text-ink", scheme: "light" },
};

/** Maps a zone onto the CSS `data-zone` buckets used for focus and selection. */
function zoneAttr(zone: ZoneName): string {
  return zone === "lime" ? "lime" : zoneStyles[zone].scheme;
}

type Props = {
  children: React.ReactNode;
  zone?: ZoneName;
  className?: string;
  /** Vertical rhythm. `none` lets a section manage its own. */
  spacing?: "none" | "sm" | "md" | "lg";
  /**
   * The woven ground. On by default.
   *
   * It used to be opt-in, and thirteen sections took it while the rest sat on
   * flat colour. That was right when the palette carried the variety; with two
   * colours it is the surface that distinguishes one ground from the next, so
   * it belongs everywhere. Pass `tooth={false}` for a section that must stay
   * perfectly flat behind an image.
   */
  tooth?: boolean;
  id?: string;
  as?: "section" | "div" | "article";
  "aria-labelledby"?: string;
  "aria-label"?: string;
  /** Marks a section as screen-only. See the print block in globals.css. */
  "data-print"?: "hide";
};

const spacingStyles = {
  none: "",
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-36",
} as const;

export function Section({
  children,
  zone = "paper",
  className,
  spacing = "md",
  tooth = true,
  id,
  as: Tag = "section",
  ...passthrough
}: Props) {
  const style = zoneStyles[zone];

  return (
    <Tag
      id={id}
      data-zone={zoneAttr(zone)}
      className={cn(
        "relative isolate",
        style.className,
        spacingStyles[spacing],
        tooth && "tooth",
        className,
      )}
      {...passthrough}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */

/** Small uppercase label above a heading. Optionally numbered. */
export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index?: string;
  className?: string;
}) {
  return (
    <p className={cn("label flex items-center gap-3 text-current/80", className)}>
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span className="h-px w-8 bg-current/35" aria-hidden="true" />
        </>
      )}
      {children}
    </p>
  );
}

/** Hairline rule used to separate editorial blocks. */
export function Rule({ className }: { className?: string }) {
  return <div className={cn("rule", className)} aria-hidden="true" />;
}
