"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { ResolvedFilm } from "@/data/films";
import { provenanceSentence } from "@/lib/provenance";

/**
 * A muted, looping manufacturing film with its poster as the fallback.
 *
 * Nothing is downloaded until the film is near the viewport (preload="none"
 * plus a poster), and it plays only while on screen. It never plays by itself
 * under prefers-reduced-motion or Save-Data: the poster shows, with a play
 * button. The pause button is always there, which WCAG 2.2.2 requires of
 * anything that moves for more than five seconds.
 *
 * The caption says what the footage is in the same words as the image marks
 * (lib/provenance.ts), taken from its record rather than typed here.
 */
export function Film({ film, className }: { film: ResolvedFilm; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Set once the viewer has pressed pause or play: from then on scrolling
  // never overrides their choice.
  const chosen = useRef(false);

  useEffect(() => {
    const node = video.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (chosen.current) return;
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const node = video.current;
    if (!node) return;
    chosen.current = true;
    if (node.paused) node.play().catch(() => {});
    else node.pause();
  };

  return (
    <figure className={className}>
      <div className="relative overflow-hidden bg-ink/5" style={{ aspectRatio: `${film.width} / ${film.height}` }}>
        <video
          ref={video}
          poster={film.poster}
          width={film.width}
          height={film.height}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={`${film.title}. ${provenanceSentence(film.origin)}`}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={film.src} type="video/mp4" />
          {film.webm && <source src={film.webm} type="video/webm" />}
        </video>
        <button
          type="button"
          onClick={toggle}
          className="absolute bottom-3 right-3 inline-flex min-h-11 items-center gap-2 bg-paper/90 px-3 font-display text-xs font-semibold uppercase tracking-[0.08em] text-ink"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {playing ? "Pause" : "Play"}
          <span className="sr-only"> film: {film.title}</span>
        </button>
      </div>
      <figcaption className="mt-3 text-xs leading-snug text-current/70">
        <span className="font-medium text-current">{film.title}</span>
        <span className="mx-1.5 opacity-50">·</span>
        {provenanceSentence(film.origin)}
      </figcaption>
    </figure>
  );
}
