"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Upload } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * Sticky thumb-zone CTA, phones only.
 *
 * Hidden on the quote route itself, where it would compete with the form it is
 * pointing at.
 */
export function MobileCtaBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/request-a-quote")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line-invert bg-ink/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex items-stretch gap-px">
        <Link
          href="/request-a-quote"
          onClick={() => track("hero_rfq_click", { location: "mobile_bar" })}
          className="flex h-14 flex-1 items-center justify-center gap-2 bg-lime font-display text-[0.75rem] font-bold uppercase tracking-[0.09em] text-ink"
        >
          Request Quote
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/request-a-quote#files"
          onClick={() => track("techpack_upload_start", { location: "mobile_bar" })}
          className="flex h-14 w-16 items-center justify-center bg-paper text-ink"
          aria-label="Send a tech pack"
        >
          <Upload className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
