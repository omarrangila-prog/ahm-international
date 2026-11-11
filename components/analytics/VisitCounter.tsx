"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { countView, flush } from "@/lib/traffic/client";

/**
 * Adds each page a visitor opens to the day's tally and posts it when they
 * leave. Renders nothing. The staff register is not counted: its path is
 * filtered out on the server as well, but staff clicking around should not
 * need the server to refuse them.
 */
export function VisitCounter() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/pipeline")) return;
    countView(pathname);
  }, [pathname]);

  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  return null;
}
