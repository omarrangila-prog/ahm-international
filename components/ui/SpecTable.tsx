import { cn } from "@/lib/utils";
import { DISCUSS, type SpecRow } from "@/data/products";

/**
 * Specification table.
 *
 * A row whose value is `null` renders the "discuss with commercial team"
 * treatment rather than being hidden. Showing the field and declining to fill it
 * is more informative than omitting it — the buyer learns that MOQ and lead time
 * are questions AHM answers per program, rather than wondering whether they were
 * simply forgotten.
 */
export function SpecTable({
  rows,
  tone = "light",
  className,
}: {
  rows: readonly SpecRow[];
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <dl className={cn("w-full border-t", dark ? "border-current/15" : "border-line", className)}>
      {rows.map((row) => {
        const pending = row.value === null;
        return (
          <div
            key={row.label}
            className={cn(
              "grid grid-cols-1 gap-1 border-b py-4 sm:grid-cols-[13rem_1fr] sm:gap-6",
              dark ? "border-current/15" : "border-line",
            )}
          >
            <dt className={cn("label pt-0.5", dark ? "text-current/70" : "text-ink/65")}>{row.label}</dt>
            <dd
              className={cn(
                "text-[0.9375rem] leading-relaxed",
                pending
                  ? dark
                    ? "text-current/70 italic"
                    : "text-ink/65 italic"
                  : dark
                    ? "text-current/85"
                    : "text-ink/80",
              )}
            >
              {pending ? DISCUSS : row.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
