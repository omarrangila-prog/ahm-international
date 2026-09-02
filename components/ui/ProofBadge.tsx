import { BadgeCheck, FlaskConical, Package, FileText, Layers, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CAPABILITY_LABEL,
  CAPABILITY_MEANING,
  PROOF_LABEL,
  type CapabilityStatus,
  type ProofKind,
} from "@/data/verification";

/**
 * PROOF BADGE
 * ===========
 *
 * Master spec §52: every major claim carries the kind of evidence behind it.
 *
 * The point is restraint, not decoration. A badge that says "Development sample"
 * is telling a sourcing manager that no bulk production has happened — that is
 * useful precisely because it is a limit. Making all six look equally celebratory
 * would destroy the information, so the treatments are graded: evidenced claims
 * get colour, capability claims get hairlines, and qualification gets a warning
 * tone because it means "not yet".
 */

const ICONS: Record<ProofKind, React.ComponentType<{ className?: string }>> = {
  verified_export: BadgeCheck,
  development_sample: FlaskConical,
  physical_sample: Package,
  process_documented: FileText,
  case_study: Layers,
  qualification_required: ShieldAlert,
};

const TONES: Record<ProofKind, string> = {
  verified_export: "border-ink/30 bg-ink/10 text-ink",
  development_sample: "border-ink/40 bg-ink/10 text-ink",
  physical_sample: "border-ink/30 bg-ink/10 text-ink",
  process_documented: "border-ink/20 bg-ink/[0.04] text-ink/75",
  case_study: "border-ink/30 bg-ink/10 text-ink",
  qualification_required: "border-ink/25 bg-ink/[0.06] text-ink/80",
};

export function ProofBadge({
  kind,
  label,
  className,
}: {
  kind: ProofKind;
  /** Overrides the default wording where a page needs to be more specific. */
  label?: string;
  className?: string;
}) {
  const Icon = ICONS[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
        TONES[kind],
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {label ?? PROOF_LABEL[kind]}
    </span>
  );
}

/**
 * Capability, stated as a limit rather than a boast. `title` carries the buyer-facing
 * meaning so the short label is never ambiguous on hover or to a screen reader.
 */
export function CapabilityBadge({
  status,
  className,
}: {
  status: CapabilityStatus;
  className?: string;
}) {
  const tone =
    status === "current_capability"
      ? "border-ink/30 bg-ink/10 text-ink"
      : status === "development_available"
        ? "border-ink/40 bg-ink/10 text-ink"
        : "border-ink/25 bg-ink/[0.06] text-ink/80";

  return (
    <span
      title={CAPABILITY_MEANING[status]}
      className={cn(
        "inline-flex items-center gap-1.5 border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em]",
        tone,
        className,
      )}
    >
      {CAPABILITY_LABEL[status]}
    </span>
  );
}
