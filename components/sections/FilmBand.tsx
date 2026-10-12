import { Section, Eyebrow } from "@/components/ui/Section";
import { Film } from "@/components/ui/Film";
import { resolveFilm, type FilmId } from "@/data/films";

/**
 * A full-width film between two sections, or nothing.
 *
 * Renders only once the slot has verified footage (data/films.ts), so it can
 * be placed on a page today and appear the day the film is built, with no
 * empty player in the meantime.
 */
export function FilmBand({ id, eyebrow, zone = "paper" }: { id: FilmId; eyebrow: string; zone?: "paper" | "ink" }) {
  const film = resolveFilm(id);
  if (!film) return null;
  return (
    <Section zone={zone} spacing="md" aria-label={film.title} data-print="hide">
      <div className="shell-wide">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Film film={film} className="mt-6" />
      </div>
    </Section>
  );
}
