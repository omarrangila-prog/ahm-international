"use client";

import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

/**
 * A showroom style action that records the selection (spec §27).
 *
 * Only the category and the showroom label travel — never the token, which is a
 * credential, and never buyer identity (§36, §50).
 */
export function ShowroomStyleLink({
  href,
  showroom,
  category,
  children,
  variant = "solid",
}: {
  href: string;
  showroom: string;
  category: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  return (
    <Button
      href={href}
      size="sm"
      variant={variant}
      onClick={() => track("showroom_style_selected", { showroom, category })}
    >
      {children}
    </Button>
  );
}
