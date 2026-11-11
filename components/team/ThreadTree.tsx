import { Reveal } from "@/components/motion/Reveal";
import { hasFigure, teamTotal, unitTotal, type Organisation, type Person, type Unit } from "@/data/team";
import { cn } from "@/lib/utils";

/**
 * The organisation drawn as thread.
 *
 * The company is a ball of yarn at the top. A strand runs down to a warp line,
 * the way threads hang from the beam of a loom, and every department hangs
 * from it on its own short strand. Inside a department, sub-teams are knots on
 * a strand running down its left edge. On a phone the warp becomes one strand
 * down the left side of the page.
 *
 * Pure CSS and one small SVG: nothing is measured in the browser, so it lays
 * out the same for 3 departments or 30, prints, and stays a server component.
 * The strands grow in with the site's `data-progress` motion, which is off
 * under reduced motion. Every strand is decorative and hidden from assistive
 * technology; the structure is carried by headings and nested lists.
 */

/** A twisted two-ply look: dark ply with a lighter twist every few pixels. */
const ply = "bg-[repeating-linear-gradient(160deg,var(--color-ink)_0_4px,rgba(16,16,16,0.45)_4px_6px)]";
const plyH = "bg-[repeating-linear-gradient(70deg,var(--color-ink)_0_4px,rgba(16,16,16,0.45)_4px_6px)]";

function YarnBall() {
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2.5" />
      {/* Wraps of yarn round the ball. */}
      <path d="M8 26 C 22 18, 42 18, 56 26" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M6 34 C 22 26, 42 26, 58 34" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M9 42 C 24 34, 40 34, 55 42" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M20 8 C 14 24, 16 44, 26 59" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
      <path d="M40 6 C 48 22, 48 42, 40 60" fill="none" stroke="var(--color-ink)" strokeWidth="2" />
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

const people = (n: number) => `${n.toLocaleString("en-GB")} ${n === 1 ? "person" : "people"}`;

function SubUnits({ units }: { units: Unit[] }) {
  return (
    <ul className="relative mt-5 space-y-4 pl-6">
      {/* The strand the knots are tied on. */}
      <span aria-hidden="true" data-progress="vertical" className={cn("absolute bottom-3 left-[7px] top-1 w-1 origin-top", ply)} />
      {units.map((u) => (
        <li key={u.id} className="relative">
          <span aria-hidden="true" className="absolute -left-[22px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-lime" />
          <p className="flex flex-wrap items-baseline justify-between gap-x-3 font-display text-sm font-bold text-ink">
            <span>{u.name}</span>
            {hasFigure(u) && <span className="font-mono text-xs font-normal text-ink/70">{people(unitTotal(u))}</span>}
          </p>
          {u.role && <p className="mt-0.5 text-xs leading-relaxed text-ink/70">{u.role}</p>}
          {u.lead && <p className="mt-1 text-xs text-ink/75">{u.lead.name}, {u.lead.title}</p>}
          {u.children && u.children.length > 0 && <SubUnits units={u.children} />}
        </li>
      ))}
    </ul>
  );
}

function Department({ unit, index }: { unit: Unit; index: number }) {
  return (
    <Reveal as="li" delay={Math.min(index, 8) * 0.06} className="relative pt-10 lg:pt-12">
      {/* Warp: this cell's piece of the line the departments hang from (desktop),
          or a short strand off the spine on the left (phone). */}
      <span aria-hidden="true" data-progress className={cn("absolute left-[-0.75rem] right-[-0.75rem] top-0 hidden h-1 origin-left lg:block", plyH)} />
      <span aria-hidden="true" data-progress="vertical" className={cn("absolute left-1/2 top-0 hidden h-12 w-1 origin-top -translate-x-1/2 lg:block", ply)} />
      <span aria-hidden="true" data-progress className={cn("absolute -left-[18px] top-[3.75rem] h-1 w-[18px] origin-left lg:hidden", plyH)} />

      <article className="relative border-2 border-ink bg-paper p-5">
        <header className="flex items-start justify-between gap-4">
          <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-ink">{unit.name}</h3>
          {hasFigure(unit) && (
            <p className="shrink-0 text-right">
              <span className="block font-display text-2xl font-extrabold leading-none text-ink">{unitTotal(unit).toLocaleString("en-GB")}</span>
              <span className="label text-ink/70">{unitTotal(unit) === 1 ? "person" : "people"}</span>
            </p>
          )}
        </header>
        {unit.role && <p className="mt-2 text-sm leading-relaxed text-ink/75">{unit.role}</p>}
        {unit.lead && (
          <div className="mt-4 border-t border-line pt-4">
            <PersonLine person={unit.lead} />
          </div>
        )}
        {unit.children && unit.children.length > 0 && <SubUnits units={unit.children} />}
      </article>
    </Reveal>
  );
}

export function ThreadTree({ org }: { org: Organisation }) {
  const total = teamTotal(org);
  const counted = org.departments.some(hasFigure) || org.leadership.length > 0;

  return (
    <div className="relative">
      {/* The ball of yarn, and the company it stands for. */}
      <Reveal className="flex flex-col items-start lg:items-center">
        <div className="flex items-center gap-5 lg:flex-col lg:gap-3 lg:text-center">
          <YarnBall />
          <div>
            <p className="font-display text-h3 text-ink">AHM International</p>
            {counted && total > 0 && <p className="mt-1 text-sm text-ink/75">{people(total)} across {org.departments.length} departments</p>}
          </div>
        </div>
      </Reveal>

      {org.leadership.length > 0 && (
        <Reveal className="relative mt-0 flex flex-col items-start pt-10 lg:items-center">
          <span aria-hidden="true" data-progress="vertical" className={cn("absolute left-[38px] top-0 h-10 w-1 origin-top lg:left-1/2 lg:-translate-x-1/2", ply)} />
          <h2 className="sr-only">Leadership</h2>
          <ul className="flex flex-wrap gap-4 bg-ink p-5 lg:justify-center">
            {org.leadership.map((p) => (
              <li key={p.name}>
                <PersonLine person={p} invert />
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      {/* Trunk from the top down to the warp line. */}
      <Reveal direction="none" className="relative h-12">
        <span aria-hidden="true" data-progress="vertical" className={cn("absolute left-[38px] top-0 h-full w-1 origin-top lg:left-1/2 lg:-translate-x-1/2", ply)} />
      </Reveal>

      <h2 className="sr-only">Departments</h2>
      <div className="relative pl-14 lg:pl-0">
        {/* Phone: one spine down the left, under the yarn ball, that every department hangs from. */}
        <span aria-hidden="true" className={cn("absolute bottom-16 left-[38px] top-0 w-1 lg:hidden", ply)} />
        {/* Desktop: when departments wrap onto more rows, a strand down the left edge
            joins each row's warp line to the one above, and ends in a knot. */}
        {org.departments.length > 3 && (
          <span aria-hidden="true" className="absolute -left-3 bottom-6 top-0 hidden w-1 lg:block">
            <span className={cn("absolute inset-0", ply)} />
            <span className="absolute -bottom-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-ink bg-lime" />
          </span>
        )}
        <ul className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14 xl:grid-cols-4">
          {org.departments.map((d, i) => (
            <Department key={d.id} unit={d} index={i} />
          ))}
        </ul>
      </div>

      {org.partnerFactories && (
        <div className="mt-14 border-2 border-dashed border-ink/40 p-5">
          <p className="label text-ink/70">Partner factories, not AHM staff</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-ink">{people(org.partnerFactories.headcount)}</p>
          <p className="mt-2 max-w-prose text-sm text-ink/75">{org.partnerFactories.note}</p>
        </div>
      )}
    </div>
  );
}
