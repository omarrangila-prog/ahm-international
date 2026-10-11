import Link from "next/link";
import { signOut } from "@/app/pipeline/actions";
import { can, ROLE_LABEL } from "@/lib/pipeline/staff";
import type { Staff } from "@/lib/pipeline/session";
import { cn } from "@/lib/utils";

export function PipelineHeader({ staff, active }: { staff: Staff; active?: "board" | "reports" }) {
  const item = (on: boolean) =>
    cn(
      "inline-flex h-10 items-center border-b-2 px-1 text-sm font-medium transition-colors",
      on ? "border-ink text-ink" : "border-transparent text-ink/70 hover:text-ink",
    );

  return (
    <header className="border-b border-line bg-paper">
      <div className="shell-wide flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <Link href="/pipeline" className="font-display text-lg font-extrabold uppercase tracking-[-0.01em] text-ink">
            AHM <span className="font-bold normal-case text-ink/70">enquiry register</span>
          </Link>
          <nav aria-label="Register" className="flex items-center gap-5">
            <Link href="/pipeline" className={item(active === "board")} aria-current={active === "board" ? "page" : undefined}>
              Board
            </Link>
            <Link href="/pipeline/reports" className={item(active === "reports")} aria-current={active === "reports" ? "page" : undefined}>
              Reports
            </Link>
            {can(staff.role, "export") && (
              // A plain anchor: the export is a file download, not a page to prefetch.
              <a href="/pipeline/export" className={item(false)}>
                Export CSV
              </a>
            )}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/75">
          <span className="[overflow-wrap:anywhere]">
            {staff.email} <span className="text-ink/65">· {ROLE_LABEL[staff.role]}</span>
          </span>
          <form action={signOut}>
            <button type="submit" className="inline-flex h-10 items-center text-sm font-medium text-ink underline underline-offset-4">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p role="status" className="border-l-2 border-ink bg-paper-deep px-4 py-3 text-sm text-ink">
      {children}
    </p>
  );
}
