import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site's single call-to-action primitive.
 *
 * Variants are named for the colour zone they belong to rather than by
 * importance, because which treatment reads as "primary" changes with the
 * background it sits on.
 */

type Variant = "solid" | "outline" | "lime" | "orange" | "invert" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 font-display font-bold uppercase tracking-[0.08em] transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  // Cobalt on light zones
  solid: "bg-cobalt text-white hover:bg-ink",
  // Hairline on light zones
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  // Final CTA / accents on dark zones
  lime: "bg-lime text-ink hover:bg-white",
  orange: "bg-orange text-ink hover:bg-ink hover:text-cream",
  // On dark zones
  invert: "bg-cream text-ink hover:bg-lime",
  ghost: "text-current underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.6875rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-[0.8125rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Adds a trailing arrow that steps forward on hover. */
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: never;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "solid", size = "md", withArrow = false, className, children, ...rest } = props;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    variant === "ghost" && "h-auto px-0",
    className,
  );

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...linkRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}

/** Text link with a moving arrow. Used for tertiary actions. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-2 text-sm font-medium underline-offset-4 transition-colors hover:underline",
        className,
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}
