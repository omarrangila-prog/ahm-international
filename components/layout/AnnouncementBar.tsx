import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { company } from "@/data/company";

/** Thin strip above the header. States the business model and location up front. */
export function AnnouncementBar() {
  return (
    <aside
      aria-label="Business model and location"
      data-persist=""
      data-print="hide"
      className="relative z-50 bg-ink text-paper"
    >
      <div className="shell-wide flex h-9 items-center justify-between gap-4">
        <p className="label truncate text-paper/70">
          FOB Apparel Manufacturing
          {/* The city truncates mid-word on narrow phones; drop it rather than clip it. */}
          <span className="hidden xs:inline">
            <span className="mx-2 text-paper/70" aria-hidden="true">
              •
            </span>
            {company.city}, {company.country}
          </span>
          <span className="xs:hidden">
            <span className="mx-2 text-paper/70" aria-hidden="true">
              •
            </span>
            {company.country}
          </span>
        </p>
        <Link
          href="/request-a-quote"
          className="group label -mr-2 hidden min-h-9 shrink-0 items-center gap-1.5 px-2 text-lime transition-colors hover:text-white sm:inline-flex"
        >
          Request a Quote
          <ArrowRight
            className="h-3 w-3 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </aside>
  );
}
