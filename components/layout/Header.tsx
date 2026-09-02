"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { primaryNav } from "@/data/nav";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

/**
 * Sticky header.
 *
 * Transparent over the hero and solid once scrolled — but only where a
 * transparent state is legible. Routes whose hero is not a full-bleed light
 * field opt out via `solidOnly`, because a transparent header over arbitrary
 * content is a contrast failure waiting to happen.
 */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes both menus. This is a legitimate effect — it
  // synchronises local UI state with an external signal (the route changing),
  // which is exactly what useEffect is for. The alternative the compiler's own
  // rule would otherwise push toward — deriving the reset from a ref read
  // during render — is rejected by the same compiler (refs cannot be read
  // during render). The functional updater still avoids scheduling a
  // re-render when nothing was open.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen((open) => (open ? false : open));
    setMobileOpen((open) => (open ? false : open));
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const openMega = useCallback(() => {
    setMenuOpen(true);
    track("mega_menu_open");
  }, []);

  /**
   * Closes the mega menu once focus leaves the header entirely.
   *
   * `relatedTarget` is where focus is going. If that is still inside the header
   * the menu stays open — otherwise a keyboard user who tabbed past Products
   * would leave it hanging open over the page with no way to dismiss it but
   * Escape.
   */
  const handleFocusOut = useCallback((event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Node | null;
    if (!next || !event.currentTarget.contains(next)) setMenuOpen(false);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const productsActive = pathname.startsWith("/products");

  return (
    <>
      <header
        data-persist=""
        onBlur={handleFocusOut}
        className={cn(
          "sticky top-0 z-[60] border-b transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || menuOpen
            // 80% let body text read through the bar while scrolling; 94% with blur
            // keeps the glassy feel without the content behind it competing.
            ? "border-line bg-paper/97 backdrop-blur-md supports-[backdrop-filter]:bg-paper/94"
            : "border-transparent bg-paper",
        )}
        onMouseLeave={() => setMenuOpen(false)}
      >
        <div className="shell-wide flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/" className="shrink-0 text-ink">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((link) => {
              if (link.label === "Products") {
                return (
                  <button
                    key={link.href}
                    type="button"
                    onMouseEnter={openMega}
                    onFocus={openMega}
                    onClick={() => (menuOpen ? setMenuOpen(false) : openMega())}
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    className={cn(
                      "relative inline-flex h-10 items-center gap-1.5 px-3.5 text-sm font-medium transition-colors",
                      productsActive || menuOpen ? "text-ink" : "text-ink/65 hover:text-ink",
                    )}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-300",
                        menuOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left bg-ink transition-transform duration-300 ease-[var(--ease-out-expo)]",
                        productsActive ? "scale-x-100" : "scale-x-0",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMenuOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "group relative inline-flex h-10 items-center px-3.5 text-sm font-medium transition-colors",
                    isActive(link.href) ? "text-ink" : "text-ink/65 hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-px origin-left bg-ink transition-transform duration-300 ease-[var(--ease-out-expo)]",
                      isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden text-sm font-medium text-ink/65 transition-colors hover:text-ink lg:inline-block"
            >
              Contact
            </Link>
            <Link
              href="/send-tech-pack"
              onClick={() => track("techpack_upload_start", { location: "header" })}
              className="hidden h-11 items-center bg-lime px-5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-lime hover:text-ink hover:text-lime sm:inline-flex"
            >
              Send Tech Pack
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        <MegaMenu
          open={menuOpen}
          activeGroup={activeGroup}
          onGroupChange={setActiveGroup}
          onNavigate={() => setMenuOpen(false)}
        />
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
