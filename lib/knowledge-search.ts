import type { KnowledgeEntry, TopicId } from "../data/knowledge";

/**
 * Knowledge Center search.
 *
 * Runs in the browser over a few hundred short entries, so there is no index
 * service, no network call and nothing a visitor types leaves the page. It
 * does four things a plain substring filter does not:
 *
 * 1. Phrasing. "what is gsm", "gsm meaning" and "meaning of gsm in fabric" are
 *    one question; question words are dropped before matching, so they are.
 * 2. Vocabulary. "oz/yd2", "g/m2" and "grams per square metre" are GSM.
 * 3. Spelling. A word that is not in the index but is one edit from one that
 *    is ("polyestor", "shrinkge") is matched as that word.
 * 4. Known questions. A query listed in data/knowledge.ts queryGroups puts its
 *    target page first, whatever else matches.
 *
 * Pure functions, no DOM: tests/knowledge.test.ts runs them under node.
 */

const STOP = new Set([
  "what", "is", "are", "the", "a", "an", "of", "in", "on", "for", "to", "how", "do", "does", "can", "i", "my", "and", "or",
  "meaning", "mean", "means", "definition", "define", "explained", "guide", "about", "difference", "between",
]);

/** Phrases that name one concept, rewritten to the word the entries use. */
const PHRASES: [RegExp, string][] = [
  [/\bgrams? per square met(?:re|er)s?\b/g, "gsm"],
  [/\bg\s*\/\s*m\s*[2²]\b/g, "gsm"],
  [/\boz\s*\/\s*y(?:d|ard)\s*[2²]\b/g, "gsm"],
  [/\bounces? per square yards?\b/g, "gsm"],
  [/\bfabric weight\b/g, "gsm weight"],
  [/\bpoly[\s-]?cotton\b/g, "polycotton"],
  [/\bscreen[\s-]?print(?:ing)?\b/g, "screenprint"],
  [/\bfree on board\b/g, "fob"],
  [/\bfacilit(?:y|ies)[\s-]+management\b/g, "facilities"],
  [/\bt[\s-]?shirts?\b/g, "tshirt"],
];

export function normalise(query: string): string[] {
  let q = query.toLowerCase().replace(/[‘’']/g, "");
  for (const [re, to] of PHRASES) q = q.replace(re, to);
  return q
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t))
    .map(stem);
}

/**
 * Crude on purpose: enough to treat "aprons" and "apron", "weights" and
 * "weight", "dyeing" and "dye", "sizing" and "size" alike. Applied to both the
 * index and the query, so the two cannot disagree about a word.
 */
function stem(t: string): string {
  let w = t;
  if (w.length > 5 && w.endsWith("ing")) w = w.slice(0, -3); // printing -> print, dyeing -> dye
  else if (w.length > 4 && w.endsWith("ies")) w = w.slice(0, -3) + "y";
  else if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
  if (w.length > 3 && w.endsWith("e")) w = w.slice(0, -1); // dye -> dy, size -> siz
  return w;
}

function editDistanceAtMostOne(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1);
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

export type Index = {
  entries: KnowledgeEntry[];
  /** Per entry: normalised tokens by field. */
  fields: { title: string[]; aliases: string[]; text: string[]; summary: string[] }[];
  /** Each word the index contains, with how many entries use it. */
  vocabulary: Map<string, number>;
  /** Normalised known questions, each to the href that answers it. */
  known: Map<string, string>;
};

export function buildIndex(entries: KnowledgeEntry[], known: { queries: string[]; target: string }[] = []): Index {
  const vocabulary = new Map<string, number>();
  const fields = entries.map((e) => {
    const f = {
      title: normalise(e.title),
      aliases: e.aliases.flatMap((a) => normalise(a)),
      text: normalise(e.text),
      summary: normalise(e.summary),
    };
    for (const t of new Set(Object.values(f).flat())) vocabulary.set(t, (vocabulary.get(t) ?? 0) + 1);
    return f;
  });
  const map = new Map<string, string>();
  for (const g of known) for (const q of g.queries) map.set(normalise(q).sort().join(" "), g.target);
  return { entries, fields, vocabulary, known: map };
}

/**
 * A word the index does not contain, replaced by its one-edit neighbour. When
 * several words are one edit away, the one more entries use wins ("shrinkge"
 * is closer to the common "shrinkage" than to "shrink"); a tie is not guessed.
 */
function correct(token: string, vocabulary: Map<string, number>): string {
  if (vocabulary.has(token) || token.length < 5) return token;
  let best: string | null = null;
  let bestCount = 0;
  let tied = false;
  for (const [v, count] of vocabulary) {
    if (v.length < 4 || !editDistanceAtMostOne(token, v)) continue;
    if (count > bestCount) [best, bestCount, tied] = [v, count, false];
    else if (count === bestCount) tied = true;
  }
  return best && !tied ? best : token;
}

/** `partial` results match some of the words, not all: shown after the full matches, as related. */
export type Result = { entry: KnowledgeEntry; score: number; partial?: boolean };

/** Below this many full matches, results matching only some words are added as related. */
const FEW = 3;

export function search(index: Index, query: string, topic?: TopicId): Result[] {
  const tokens = normalise(query).map((t) => correct(t, index.vocabulary));
  const knownTarget = tokens.length ? index.known.get([...tokens].sort().join(" ")) : undefined;

  const results: Result[] = [];
  index.entries.forEach((entry, i) => {
    if (topic && !entry.topics.includes(topic)) return;
    const f = index.fields[i];
    let score = 0;
    let matched = 0;
    for (const t of tokens) {
      let s = 0;
      if (f.title.includes(t)) s += 6;
      if (f.aliases.includes(t)) s += 5;
      if (f.text.includes(t)) s += 2;
      if (f.summary.includes(t)) s += 1;
      if (s) matched++;
      score += s;
    }
    const partial = tokens.length > 1 && matched > 0 && matched < tokens.length;
    // Every word must be found somewhere to count as a full match, so
    // "gsm apron" does not return every apron page as an answer.
    if (tokens.length && matched < tokens.length && !partial) return;
    if (knownTarget && entry.href === knownTarget) score += 100;
    // Guides and tools answer; glossary terms define; pages sell. Ties break that way.
    score += { guide: 0.3, tool: 0.2, term: 0.1, page: 0 }[entry.kind];
    if (tokens.length === 0 && !topic) return;
    results.push({ entry, score, partial });
  });
  const order = (a: Result, b: Result) => b.score - a.score || a.entry.title.localeCompare(b.entry.title);
  const full = results.filter((r) => !r.partial).sort(order);
  // Related results are only offered when the full matches are few, and capped,
  // so a specific query is never buried under loose ones.
  const related = full.length < FEW ? results.filter((r) => r.partial).sort(order).slice(0, 6) : [];
  return [...full, ...related];
}
