"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { megaMenu, primaryNav } from "@/data/nav";
import { Logo } from "@/components/ui/Logo";
import { company, publicValue } from "@/data/company";

/**
 * Full-screen mobile navigation.
 *
 * Designed for the phone rather than shrunk from desktop: product groups are
 * open by default (a buyer should not have to hunt through accordions to find a
 * category), targets are at least 48px, and the quote action is pinned where a
 * thumb rests.
 */

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const email = publicValue(company.email);

  // Lock the page behind the panel, and restore the previous value on close.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-[70] flex flex-col bg-ink text-paper lg:hidden",
        "transition-[opacity,transform,visibility] duration-300 ease-[var(--ease-out-expo)]",
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0",
      )}
    >
      <div className="contents">
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <Link href="/" onClick={onClose}>
              <Logo />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="-mr-2 flex h-12 w-12 items-center justify-center text-paper/70 transition-colors hover:text-paper"
              aria-label="Close navigation"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8" aria-label="Mobile">
            <ul className="border-t border-line-invert">
              {primaryNav.map((link) => (
                <li key={link.href} className="border-b border-line-invert">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="flex min-h-[3.5rem] items-center justify-between gap-4 font-display text-2xl font-extrabold tracking-[-0.03em]"
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-paper/60" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-7">
              {megaMenu.map((group) => (
                <div key={group.title}>
                  <p className="label mb-3 text-lime">{group.title}</p>
                  <ul className="flex flex-col">
                    {group.links.map((link) => (
                      <li key={`${group.title}-${link.label}`}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="flex min-h-12 items-center text-[0.95rem] text-paper/75 transition-colors hover:text-paper"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-9 border-t border-line-invert pt-7">
              <ul className="flex flex-col">
                {[
                  { label: "Materials", href: "/materials" },
                  { label: "Manufacturing", href: "/manufacturing" },
                  { label: "FOB Export", href: "/export" },
                  { label: "Case Studies", href: "/case-studies" },
                  { label: "Sustainability", href: "/sustainability" },
                  { label: "Contact", href: "/contact" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex min-h-12 items-center text-[0.95rem] text-paper/75 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="mt-4 inline-block text-sm text-paper/60 underline underline-offset-4"
                >
                  {email}
                </a>
              )}
            </div>
          </nav>

          <div className="shrink-0 border-t border-line-invert bg-ink px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Link
              href="/request-a-quote"
              onClick={onClose}
              className="flex h-14 w-full items-center justify-center gap-2 bg-lime font-display text-sm font-bold uppercase tracking-[0.08em] text-ink"
            >
              Request FOB Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
      </div>
    </div>
  );
}
