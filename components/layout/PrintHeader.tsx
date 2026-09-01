"use client";

import { usePathname } from "next/navigation";
import { company } from "@/data/company";

/**
 * Provenance strip for printed pages.
 *
 * A sourcing manager who prints a supplier page and drops it into a shortlist
 * folder needs to know, three weeks later, whose page it was and where to find
 * it again. Screens never see this; it exists only under `@media print`, and it
 * is `aria-hidden` because on screen it is not there at all.
 *
 * A client component only because the path has to come from `usePathname` — CSS
 * cannot read the location, and the root layout does not otherwise know which
 * page is rendering. It ships a few hundred bytes and renders two lines of text.
 */
export function PrintHeader() {
  const pathname = usePathname();

  return (
    <div className="print-only" aria-hidden="true">
      <p style={{ fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {company.name}
      </p>
      <p style={{ fontSize: "0.75rem" }}>
        {company.siteUrl.replace(/^https?:\/\//, "")}
        {pathname}
      </p>
      <hr style={{ margin: "6mm 0", border: 0, borderTop: "1px solid #999" }} />
    </div>
  );
}
