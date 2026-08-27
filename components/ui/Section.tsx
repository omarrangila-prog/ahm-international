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
 * changing what "forest" means changes it everywhere at once.
 */

export type ZoneName =
  | "cream"
  | "ivory"
  | "paper"
  | "ink"
  | "graphite"
  | "forest"
  | "cobalt"
  | "orange"
  | "lime"
  | "sand"
  | "sky"
  | "plum";

const zoneStyles: Record<ZoneName, { className: string; scheme: "light" | "dark" }> = {
  cream: { className: "bg-cream text-ink", scheme: "light" },
  ivory: { className: "bg-ivory text-ink", scheme: "light" },
  paper: { className: "bg-white text-ink", scheme: "light" },
  ink: { className: "bg-ink text-cream", scheme: "dark" },
  graphite: { className: "bg-graphite text-cream", scheme: "dark" },
  forest: { className: "bg-forest text-cream", scheme: "dark" },
  cobalt: { className: "bg-cobalt text-white", scheme: "dark" },
  orange: { className: "bg-orange text-ink", scheme: "light" },
  lime: { className: "bg-lime text-ink", scheme: "light" },
  sand: { className: "bg-sand text-ink", scheme: "light" },
  sky: { className: "bg-sky text-ink", scheme: "light" },
  plum: { className: "bg-plum text-cream", scheme: "dark" },
};

/** Maps a zone onto the CSS `data-zone` buckets used for focus and selection. */
function zoneAttr(zone: ZoneName): string {
  if (zone === "forest") return "forest";
  if (zone === "cobalt") return "cobalt";
  return zoneStyles[zone].scheme === "dark" ? "dark" : "light";
}

type Props = {
  children: React.ReactNode;
  zone?: ZoneName;
  className?: string;
  /** Vertical rhythm. `none` lets a section manage its own. */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Adds the paper-tooth texture. Only worth it on large flat colour fields. */
  tooth?: boolean;
  id?: string;
  as?: "section" | "div" | "article";
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

const spacingStyles = {
  none: "",
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-24 lg:py-36",
} as const;

export function Section({
  children,
  zone = "cream",
  className,
  spacing = "md",
  tooth = false,
  id,
  as: Tag = "section",
  ...aria
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
      {...aria}
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
