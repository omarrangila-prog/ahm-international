"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { buildIndex, search } from "@/lib/knowledge-search";
import { track } from "@/lib/analytics";
import type { KnowledgeEntry, Topic, TopicId } from "@/data/knowledge";

/**
 * Search and topic filter for the Knowledge Center.
 *
 * Everything is matched in the browser against entries the server passed in,
 * so nothing a visitor types is sent anywhere. With a query or a topic chosen
 * it shows a results panel; with neither it shows nothing, and the static
 * topic hubs and the full library below it carry the page, so it works
 * without JavaScript as a plain list of guides.
 *
 * Analytics get a result count and a topic, never the words typed.
 */

const KIND_LABEL: Record<KnowledgeEntry["kind"], string> = { guide: "Guide", tool: "Tool", term: "Glossary", page: "AHM page" };

type Props = {
  entries: KnowledgeEntry[];
  topics: Topic[];
  known: { queries: string[]; target: string }[];
  examples: string[];
};

export function KnowledgeSearch({ entries, topics, known, examples }: Props) {
  const index = useMemo(() => buildIndex(entries, known), [entries, known]);
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<TopicId | undefined>();
  const inputId = useId();
  const statusId = useId();

  const active = query.trim().length > 0 || topic !== undefined;
  const results = useMemo(() => (active ? search(index, query, topic) : []), [active, index, query, topic]);
  const shown = results.slice(0, 12);
  const fullCount = results.filter((r) => !r.partial).length;

  // One event per pause in typing, not one per keystroke.
  const last = useRef("");
  useEffect(() => {
    const q = query.trim();
    if (q.length < 3) return;
    const timer = setTimeout(() => {
      const key = `${q}|${topic ?? ""}`;
      if (last.current === key) return;
      last.current = key;
      track(results.length ? "knowledge_search" : "knowledge_search_miss", { results: results.length, topic: topic ?? "all", queryLength: q.length });
    }, 900);
    return () => clearTimeout(timer);
  }, [query, topic, results.length]);

  return (
    <div role="search" aria-label="Knowledge Center">
      <label htmlFor={inputId} className="label text-ink/70">
        Search guides, tools and terms
      </label>
      <div className="relative mt-3 max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/60" aria-hidden="true" />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          placeholder={`Try “${examples[0]}”`}
          aria-describedby={statusId}
          className="min-h-12 w-full border border-ink/30 bg-white py-3 pl-12 pr-4 text-base text-ink placeholder:text-ink/60"
        />
      </div>

      <p className="mt-3 text-sm text-ink/70">
        {examples.slice(0, 4).map((e, i) => (
          <span key={e}>
            {i > 0 && " · "}
            <button type="button" onClick={() => setQuery(e)} className="min-h-6 underline underline-offset-4 hover:text-ink">
              {e}
            </button>
          </span>
        ))}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        <button
          type="button"
          aria-pressed={topic === undefined}
          onClick={() => setTopic(undefined)}
          className="min-h-11 border border-ink/25 px-4 text-sm font-medium text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
        >
          All topics
        </button>
        {topics.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={topic === t.id}
            onClick={() => setTopic(topic === t.id ? undefined : t.id)}
            className="min-h-11 border border-ink/25 px-4 text-sm font-medium text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {t.name}
          </button>
        ))}
      </div>

      <p id={statusId} role="status" aria-live="polite" className="mt-6 text-sm text-ink/70">
        {!active ? "" : results.length === 0 ? "No matches." : `${fullCount} ${fullCount === 1 ? "result" : "results"}${results.length > fullCount ? `, plus ${results.length - fullCount} related` : ""}${results.length > shown.length ? `, showing the first ${shown.length}` : ""}.`}
      </p>

      {active && results.length > 0 && (
        <ul className="mt-4 border-t border-line">
          {shown.map(({ entry, partial }, i) => (
            <li key={entry.id} className="border-b border-line">
              {partial && !shown[i - 1]?.partial && (
                <p className="label pt-4 text-ink/65">Related, matching some of your words</p>
              )}
              <Link href={entry.href} className="group grid grid-cols-1 gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                <span className="label pt-1 text-ink/65">{KIND_LABEL[entry.kind]}</span>
                <span>
                  <span className="font-display text-lg font-bold tracking-[-0.02em] text-ink underline-offset-4 group-hover:underline">{entry.title}</span>
                  <span className="mt-1 block max-w-2xl text-sm leading-relaxed text-ink/70">{entry.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {active && results.length === 0 && (
        <div className="mt-4 max-w-2xl border-l-2 border-ink pl-5 text-[0.9375rem] leading-relaxed text-ink/75">
          <p>
            Nothing here answers that yet. Try fewer or simpler words, pick a topic above, or look in the{" "}
            <Link href="/resources/glossary" className="text-ink underline underline-offset-4">
              glossary
            </Link>
            . If it is something a buyer should be able to find, tell us and it goes on the list:{" "}
            <Link href="/contact" className="text-ink underline underline-offset-4">
              contact the team
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
