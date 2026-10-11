"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";
import { track } from "@/lib/analytics";

/**
 * The sourcing assistant's entry point: one small button, nothing more until
 * it is pressed. It never opens itself, never pops a greeting and never
 * covers content, which is what "avoid interrupting the browsing experience"
 * asks for. The panel and its code load on first press.
 *
 * Rendered only when the deployment has an API key (decided in the root
 * layout at build time), so a site without one ships none of this.
 */

const AssistantPanel = dynamic(() => import("./AssistantPanel").then((m) => m.AssistantPanel), { ssr: false });

export function AssistantLauncher({ email, whatsapp }: { email: string | null; whatsapp: string | null }) {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);

  return (
    <>
      {!open && (
        <button
          ref={launcher}
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            setOpen(true);
            track("assistant_open");
          }}
          data-print="hide"
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-4 z-50 inline-flex h-11 items-center gap-2 border border-ink bg-paper px-4 font-display text-xs font-bold uppercase tracking-[0.08em] text-ink shadow-[0_12px_30px_-14px_rgba(16,19,21,0.5)] transition-colors hover:bg-lime lg:bottom-6 lg:right-6"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          <span className="sm:hidden">Ask us</span>
          <span className="hidden sm:inline">Ask a sourcing question</span>
        </button>
      )}
      {open && (
        <AssistantPanel
          email={email}
          whatsapp={whatsapp}
          onClose={() => {
            setOpen(false);
            requestAnimationFrame(() => launcher.current?.focus());
          }}
        />
      )}
    </>
  );
}
