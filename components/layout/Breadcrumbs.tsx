import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumbs plus matching BreadcrumbList structured data.
 *
 * Emitted from one component so the markup and the visible trail cannot
 * disagree — schema that describes a trail the page does not show is exactly the
 * kind of mismatch that gets structured data ignored.
 *
 * The final crumb is the current page: it is rendered as plain text with
 * `aria-current`, not as a link to itself.
 */
export function Breadcrumbs({ trail, tone = "light" }: { trail: Crumb[]; tone?: "light" | "dark" }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <JsonLd data={breadcrumbSchema(full)} />
      <nav aria-label="Breadcrumb" className="w-full">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {full.map((crumb, i) => {
            const isLast = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span
                    aria-current="page"
                    className={cn("label", tone === "dark" ? "text-cream/70" : "text-ink/70")}
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.path}
                      className={cn(
                        "label underline-offset-4 transition-colors hover:underline",
                        tone === "dark" ? "text-cream/70 hover:text-cream" : "text-ink/60 hover:text-ink",
                      )}
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 shrink-0",
                        tone === "dark" ? "text-cream/30" : "text-ink/25",
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
