import { Reveal } from "@/components/motion/Reveal";
import {
  formatCount,
  hasFigure,
  teamTotal,
  totalIsFloor,
  unitTotal,
  type Organisation,
  type Person,
  type Unit,
} from "@/data/team";
import { cn } from "@/lib/utils";

/**
 * The organisation drawn as thread.
 *
 * A band of the figures the owner gave, then the company as a ball of yarn
 * with a thread running to each branch: AHM's own teams on a solid, twisted
 * thread, the partner factories on a loose dashed one, because their people
 * are not AHM's. Each branch ends on a spool carrying its figure.
 *
 * On a wide screen the threads are one SVG whose curves are computed from the
 * number of branches, so it lays out for two or six without measuring
 * anything in the browser. On a phone the branches stack on a single thread
 * down the left. The threads draw in with the site's `data-draw` motion and
 * stay drawn under reduced motion. All of it is decorative and hidden from
 * assistive technology; headings and text carry the structure.
 */

/** Twisted two-ply look for the CSS strands on a phone. */
const ply = "bg-[repeating-linear-gradient(160deg,var(--color-ink)_0_4px,rgba(16,16,16,0.45)_4px_6px)]";
const plyH = "bg-[repeating-linear-gradient(70deg,var(--color-ink)_0_4px,rgba(16,16,16,0.45)_4px_6px)]";

function YarnBall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2.5" />
      <path d="M8 26 C 22 18, 42 18, 56 26" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M6 34 C 22 26, 42 26, 58 34" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M9 42 C 24 34, 40 34, 55 42" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M20 8 C 14 24, 16 44, 26 59" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M40 6 C 48 22, 48 42, 40 60" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
    </svg>
  );
}

function Spool({ partner = false }: { partner?: boolean }) {
  return (
    <svg viewBox="0 0 48 56" className="h-14 w-12 shrink-0" aria-hidden="true">
      <rect x="4" y="2" width="40" height="7" rx="2" fill="var(--color-ink)" />
      <rect x="4" y="47" width="40" height="7" rx="2" fill="var(--color-ink)" />
      <rect x="10" y="9" width="28" height="38" fill={partner ? "var(--color-paper)" : "var(--color-lime)"} stroke="var(--color-ink)" strokeWidth="2" />
      {[13, 19, 25, 31, 37].map((y) => (
        <line key={y} x1="10" x2="38" y1={y} y2={y + 4} stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray={partner ? "3 3" : undefined} />
      ))}
    </svg>
  );
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return (
    <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper font-display text-sm font-bold text-ink">
      {letters}
    </span>
  );
}

function PersonLine({ person, invert = false }: { person: Person; invert?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Initials name={person.name} />
      <div>
        <p className={cn("font-display font-bold leading-tight", invert ? "text-paper" : "text-ink")}>{person.name}</p>
        <p className={cn("text-sm", invert ? "text-paper/75" : "text-ink/70")}>{person.title}</p>
      </div>
    </div>
  );
}

function SubUnits({ units }: { units: Unit[] }) {
  return (
    <ul className="relative mt-5 space-y-4 pl-6">
      <span aria-hidden="true" data-progress="vertical" className={cn("absolute bottom-3 left-[7px] top-1 w-1 origin-top", ply)} />
      {units.map((u) => (
        <li key={u.id} className="relative">
          <span aria-hidden="true" className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-lime" />
          <p className="flex flex-wrap items-baseline justify-between gap-x-3 font-display text-sm font-bold text-ink">
            <span>{u.name}</span>
            {hasFigure(u) && <span className="font-mono text-xs font-normal text-ink/70">{formatCount(unitTotal(u), u.plus)}</span>}
          </p>
          {u.role && <p className="mt-0.5 text-xs leading-relaxed text-ink/70">{u.role}</p>}
          {u.children && u.children.length > 0 && <SubUnits units={u.children} />}
        </li>
      ))}
    </ul>
  );
}

type Branch = {
  key: string;
  name: string;
  role?: string;
  figure: string | null;
  unitLabel: string;
  partner: boolean;
  unit?: Unit;
};

function branchesOf(org: Organisation): Branch[] {
  const own: Branch[] = org.departments.map((d) => ({
    key: d.id,
    name: d.name,
    role: d.role,
    figure: hasFigure(d) ? formatCount(unitTotal(d), d.plus) : null,
    unitLabel: "employees",
    partner: false,
    unit: d,
  }));
  const partner: Branch[] = org.partnerFactories
    ? [
        {
          key: "partners",
          name: "Partner factories",
          role: org.partnerFactories.note,
          figure: formatCount(org.partnerFactories.headcount, org.partnerFactories.plus),
          unitLabel: "workers",
          partner: true,
        },
      ]
    : [];
  return [...own, ...partner];
}

/** The figures band: AHM's own team, then the partners, never added together. */
function Figures({ org }: { org: Organisation }) {
  const own = teamTotal(org);
  const floor = totalIsFloor(org);
  const production = org.departments.find((d) => d.id === "production");
  return (
    <Reveal className="grid grid-cols-1 gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2">
      {own > 0 && (
        <div className="bg-ink p-7 sm:p-10">
          <p className="label text-paper/75">AHM&rsquo;s own team</p>
          <p className="mt-3 font-display text-[clamp(3.5rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-lime">
            {formatCount(own, floor)}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/80">
            {production && hasFigure(production)
              ? `${formatCount(unitTotal(production), production.plus)} in cutting and stitching${floor ? ", and more across development, quality and export" : ""}.`
              : "Employees across AHM's departments."}
          </p>
        </div>
      )}
      {org.partnerFactories && (
        <div className="bg-paper p-7 sm:p-10">
          <p className="label text-ink/70">Partner factories</p>
          <p className="mt-3 font-display text-[clamp(3.5rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-ink">
            {formatCount(org.partnerFactories.headcount, org.partnerFactories.plus)}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/75">
            Workers in the partner factories AHM produces with: the hybrid model. Partners&rsquo; staff, not AHM&rsquo;s, and never added to AHM&rsquo;s total.
          </p>
        </div>
      )}
    </Reveal>
  );
}

function BranchCard({ b }: { b: Branch }) {
  return (
    <article className={cn("relative h-full bg-paper p-6", b.partner ? "border-2 border-dashed border-ink/60" : "border-2 border-ink")}>
      <div className="flex items-start gap-4">
        <Spool partner={b.partner} />
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-ink">{b.name}</h3>
          {b.figure && (
            <p className="mt-2">
              <span className="font-display text-4xl font-extrabold leading-none tracking-[-0.03em] text-ink">{b.figure}</span>
              <span className="label mt-1 block text-ink/70 sm:ml-2 sm:mt-0 sm:inline">{b.unitLabel}</span>
            </p>
          )}
        </div>
      </div>
      {b.role && <p className="mt-4 text-sm leading-relaxed text-ink/75">{b.role}</p>}
      {b.unit?.lead && (
        <div className="mt-4 border-t border-line pt-4">
          <PersonLine person={b.unit.lead} />
        </div>
      )}
      {b.unit?.children && b.unit.children.length > 0 && <SubUnits units={b.unit.children} />}
    </article>
  );
}

export function ThreadTree({ org }: { org: Organisation }) {
  const branches = branchesOf(org);
  const n = branches.length;
  // Desktop threads: a notional 1200-unit row, stretched to the real width.
  const W = 1200;
  const H = 150;
  const xs = branches.map((_, i) => ((i + 0.5) / n) * W);

  return (
    <div className="relative">
      <Figures org={org} />

      {/* The ball of yarn and the company it stands for. */}
      <Reveal className="mt-20 flex flex-col items-start lg:items-center">
        <div className="flex items-center gap-5 lg:flex-col lg:gap-3 lg:text-center">
          <YarnBall className="h-20 w-20 lg:h-28 lg:w-28" />
          <div>
            <p className="font-display text-h2 text-ink">AHM International</p>
            <p className="mt-1 text-sm text-ink/75">Own production and partner factories, one point of contact</p>
          </div>
        </div>
      </Reveal>

      {org.leadership.length > 0 && (
        <Reveal className="mt-8 flex justify-start lg:justify-center">
          <h2 className="sr-only">Leadership</h2>
          <ul className="flex flex-wrap gap-4 bg-ink p-5">
            {org.leadership.map((p) => (
              <li key={p.name}>
                <PersonLine person={p} invert />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <h2 className="sr-only">How the work is organised</h2>

      {/* Wide screens: threads from the ball to every branch, then the cards. */}
      <Reveal direction="none" className="group hidden lg:block">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-4 block h-36 w-full overflow-visible" aria-hidden="true">
          {branches.map((b, i) => {
            // Ends a few units past the box so the thread meets the card border.
            const d = `M ${W / 2} 0 C ${W / 2} ${H * 0.55}, ${xs[i]} ${H * 0.45}, ${xs[i]} ${H + 18}`;
            return (
              <g key={b.key}>
                <path
                  d={d}
                  pathLength={1200}
                  data-draw=""
                  style={{ ["--draw-delay" as string]: `${0.1 + i * 0.12}s` }}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth={b.partner ? 3 : 5}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
                {/* The twist of the ply on AHM's own threads; the partner thread stays loose. */}
                <path
                  d={d}
                  fill="none"
                  stroke="var(--color-paper)"
                  strokeWidth={b.partner ? 4 : 2}
                  strokeDasharray={b.partner ? "10 8" : "2 7"}
                  vectorEffect="non-scaling-stroke"
                  className="opacity-0 transition-opacity delay-700 duration-500 group-data-[inview=true]:opacity-100 motion-reduce:opacity-100"
                />
              </g>
            );
          })}
        </svg>
        <ul className="grid gap-6" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {branches.map((b) => (
            <li key={b.key}>
              <BranchCard b={b} />
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Phones and tablets: one thread down the left, every branch hanging from it. */}
      <div className="relative mt-2 pl-14 lg:hidden">
        <span aria-hidden="true" className={cn("absolute bottom-16 left-[38px] top-0 w-1", ply)} />
        <ul className="space-y-8 pt-8">
          {branches.map((b, i) => (
            <Reveal as="li" key={b.key} delay={i * 0.06} className="relative">
              <span
                aria-hidden="true"
                data-progress
                className={cn(
                  "absolute -left-[18px] top-10 h-1 w-[18px] origin-left",
                  b.partner ? "bg-[repeating-linear-gradient(90deg,var(--color-ink)_0_6px,transparent_6px_10px)]" : plyH,
                )}
              />
              <BranchCard b={b} />
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
