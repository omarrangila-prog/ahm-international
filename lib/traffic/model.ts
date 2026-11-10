/**
 * Daily visit counts: what is counted, how a referrer becomes a platform, and
 * how a day's totals are added up. Pure, so the rules are testable without a
 * browser or a store.
 *
 * The whole design is that a total cannot be traced to a person. A visit is a
 * number added to a day's tally with a path, a platform and an event name. No
 * IP address or user agent is kept, and no identifier exists to join two
 * visits together. A visit is a first page view in a page's memory; a full
 * reload starts another, so visits run a little high.
 *
 * Unique visitors come from one first-party cookie, `ahm_seen`, whose value is
 * a date and nothing else: the last UTC day this browser was counted. A browser
 * without it is new; one with an earlier date is returning; one with today's
 * date has been counted already. The count needs no identifier because the
 * question "has this browser been counted today" is answered by the browser.
 */

export const SHARDS = 3;

export const SEEN_COOKIE = "ahm_seen";
/** The opt-out value. Kept as long as a date would be, so the choice is remembered. */
export const SEEN_OFF = "off";
/** Thirteen months, the longest audience-measurement cookie lifetime European regulators accept. */
export const SEEN_MAX_AGE = 60 * 60 * 24 * 395;

export type VisitorKind = "new" | "returning";

/**
 * What this browser counts as today, from the cookie's value. Null means
 * "do not count a visitor": counted already today, or switched off.
 */
export function visitorFromCookie(value: string | null, today: string): VisitorKind | null {
  if (value === SEEN_OFF) return null;
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return "new";
  return value === today ? null : "returning";
}
const MAX_PATHS = 150;
const MAX_SOURCES = 60;
const MAX_VIEWS_PER_BATCH = 40;

/** Events that are counted. Names only: nothing a visitor typed travels with them. */
export const COUNTED_EVENTS = {
  knowledge_search: "Searches in the Knowledge Center",
  knowledge_search_miss: "Searches with no result",
  hero_rfq_click: "Quote button on the homepage",
  rfq_start: "Started a quote request",
  rfq_completed: "Quote form sent",
  email_click: "Clicked the email address",
  phone_click: "Clicked the phone number",
  whatsapp_click: "Clicked WhatsApp",
  assistant_question: "Asked the sourcing assistant",
} as const;
export type CountedEvent = keyof typeof COUNTED_EVENTS;
export const isCountedEvent = (name: string): name is CountedEvent =>
  Object.prototype.hasOwnProperty.call(COUNTED_EVENTS, name);

/** What the browser sends: one batch per visit, when the page is left. */
export type Batch = {
  /** Paths viewed, in order. */
  views: string[];
  /** Hostname of the site that linked here, only on the first batch of a visit. */
  ref: string | null;
  /** utm_source on the landing URL. */
  utm: string | null;
  /** True once per visit: counts the visit itself. */
  landed: boolean;
  /** Set once per browser per day, from the cookie: counts a unique visitor. */
  uv?: VisitorKind | null;
  events: Partial<Record<CountedEvent, number>>;
};

export type DayTotals = {
  day: string;
  visits: number;
  views: number;
  /** Browsers counted once today by the cookie. */
  uniques: number;
  /** Of those, browsers with no cookie: first seen today. */
  newVisitors: number;
  /** Unique visitors by platform key. */
  uniqueSources: Record<string, number>;
  /** Visits by platform key (see classifySource). */
  sources: Record<string, number>;
  /** Page views by path. */
  paths: Record<string, number>;
  /** Visits by landing path. */
  landings: Record<string, number>;
  events: Partial<Record<CountedEvent, number>>;
};

export const emptyDay = (day: string): DayTotals => ({
  day,
  visits: 0,
  views: 0,
  uniques: 0,
  newVisitors: 0,
  uniqueSources: {},
  sources: {},
  paths: {},
  landings: {},
  events: {},
});

/** UTC calendar day, the same convention as the register. */
export const dayKey = (now: Date = new Date()) => now.toISOString().slice(0, 10);

export function lastDays(count: number, now: Date = new Date()): string[] {
  const days: string[] = [];
  for (let i = 0; i < count; i++) days.push(dayKey(new Date(now.getTime() - i * 86_400_000)));
  return days;
}

// ---------------------------------------------------------------- platforms

export type Platform = { key: string; label: string; group: "direct" | "search" | "ai" | "social" | "email" | "campaign" | "other" };

type Rule = { test: RegExp; platform: Platform };
const p = (key: string, label: string, group: Platform["group"]): Platform => ({ key, label, group });

const HOST_RULES: Rule[] = [
  { test: /(^|\.)chatgpt\.com$|(^|\.)openai\.com$/, platform: p("chatgpt", "ChatGPT", "ai") },
  { test: /(^|\.)perplexity\.ai$/, platform: p("perplexity", "Perplexity", "ai") },
  { test: /(^|\.)claude\.ai$/, platform: p("claude", "Claude", "ai") },
  { test: /(^|\.)gemini\.google\.com$/, platform: p("gemini", "Gemini", "ai") },
  { test: /(^|\.)copilot\.microsoft\.com$/, platform: p("copilot", "Copilot", "ai") },
  { test: /(^|\.)google\.[a-z.]+$/, platform: p("google", "Google search", "search") },
  { test: /(^|\.)bing\.com$/, platform: p("bing", "Bing", "search") },
  { test: /(^|\.)duckduckgo\.com$/, platform: p("duckduckgo", "DuckDuckGo", "search") },
  { test: /(^|\.)yahoo\.[a-z.]+$/, platform: p("yahoo", "Yahoo", "search") },
  { test: /(^|\.)(baidu\.com|yandex\.[a-z]+|ecosia\.org|search\.brave\.com)$/, platform: p("othersearch", "Other search engine", "search") },
  { test: /(^|\.)linkedin\.com$|^lnkd\.in$/, platform: p("linkedin", "LinkedIn", "social") },
  { test: /(^|\.)(facebook\.com|fb\.com|l\.facebook\.com|m\.facebook\.com)$/, platform: p("facebook", "Facebook", "social") },
  { test: /(^|\.)instagram\.com$/, platform: p("instagram", "Instagram", "social") },
  { test: /(^|\.)(twitter\.com|x\.com|t\.co)$/, platform: p("x", "X (Twitter)", "social") },
  { test: /(^|\.)(youtube\.com|youtu\.be)$/, platform: p("youtube", "YouTube", "social") },
  { test: /(^|\.)(whatsapp\.com|wa\.me)$/, platform: p("whatsapp", "WhatsApp", "social") },
  { test: /(^|\.)(pinterest\.[a-z.]+|pin\.it)$/, platform: p("pinterest", "Pinterest", "social") },
  { test: /(^|\.)(reddit\.com)$/, platform: p("reddit", "Reddit", "social") },
  { test: /(^|\.)(mail\.google\.com|outlook\.live\.com|outlook\.office\.com|mail\.yahoo\.com)$/, platform: p("webmail", "Email", "email") },
];

const OWN_HOSTS = /(^|\.)ahminternationals\.com$|(^|\.)ahm-international[a-z0-9-]*\.vercel\.app$|^localhost$/;

const clean = (value: string | null | undefined, max: number) =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, max);

/**
 * A referring host and an optional utm_source become one platform. A utm_source
 * wins over the referrer: it is what the owner put in the link, so a LinkedIn
 * post tagged "linkedin-nov" is reported as that campaign. A host nobody named
 * is kept as its own row, so a site that starts sending visitors is visible
 * before anyone writes a rule for it.
 */
export function classifySource(ref: string | null, utm: string | null): Platform {
  const campaign = clean(utm, 40);
  if (campaign) return p(`utm:${campaign}`, `Campaign: ${campaign}`, "campaign");
  const host = clean(ref, 120);
  if (!host || OWN_HOSTS.test(host)) return p("direct", "Direct, or no referrer", "direct");
  for (const rule of HOST_RULES) if (rule.test.test(host)) return rule.platform;
  return p(`site:${host}`, host, "other");
}

/** Label for a stored key, so the dashboard needs no copy of the rules. */
export function sourceLabel(key: string): Platform {
  if (key.startsWith("utm:")) return p(key, `Campaign: ${key.slice(4)}`, "campaign");
  if (key.startsWith("site:")) return p(key, key.slice(5), "other");
  if (key === "direct") return p("direct", "Direct, or no referrer", "direct");
  if (key === "other") return p("other", "Other sources (list was full)", "other");
  return HOST_RULES.find((r) => r.platform.key === key)?.platform ?? p(key, key, "other");
}

// ---------------------------------------------------------------- bots

/**
 * Crawlers that run scripts would inflate every figure. User agents are only
 * used to decide whether to count, and are never stored.
 */
export const BOT_AGENT =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|chrome-lighthouse|gtmetrix|pingdom|uptime|monitor|preview|facebookexternalhit|embedly|curl|wget|python-requests|node-fetch|axios|go-http|java\//i;

export const isBot = (userAgent: string | null | undefined) => !userAgent || BOT_AGENT.test(userAgent);

// ---------------------------------------------------------------- input

const PATH = /^\/[A-Za-z0-9/_\-.~%]*$/;

export function cleanPath(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const path = raw.split(/[?#]/)[0];
  if (path.length > 120 || !PATH.test(path)) return null;
  if (path.startsWith("/pipeline") || path.startsWith("/api")) return null;
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
}

/** The posted body, reduced to the known shape. Anything else becomes null. */
export function parseBatch(raw: unknown): Batch | null {
  if (typeof raw !== "string" || raw.length > 4_000) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;

  const views = (Array.isArray(v.views) ? v.views : [])
    .slice(0, MAX_VIEWS_PER_BATCH)
    .map(cleanPath)
    .filter((x): x is string => x !== null);

  const events: Batch["events"] = {};
  if (v.events && typeof v.events === "object") {
    for (const [name, count] of Object.entries(v.events as Record<string, unknown>)) {
      if (!isCountedEvent(name)) continue;
      const n = typeof count === "number" && Number.isFinite(count) ? Math.floor(count) : 0;
      if (n > 0) events[name] = Math.min(n, 50);
    }
  }

  const ref = typeof v.ref === "string" && /^[a-z0-9.-]{1,120}$/i.test(v.ref) ? v.ref : null;
  const utm = typeof v.utm === "string" ? clean(v.utm, 40) || null : null;
  const landed = v.landed === true;
  const uv = v.uv === "new" || v.uv === "returning" ? v.uv : null;

  if (views.length === 0 && Object.keys(events).length === 0) return null;
  return { views, ref, utm, landed, uv, events };
}

// ---------------------------------------------------------------- tally

function bump(map: Record<string, number>, key: string, by: number, cap: number) {
  if (key in map || Object.keys(map).length < cap) map[key] = (map[key] ?? 0) + by;
  else map.other = (map.other ?? 0) + by;
}

/** Adds one batch to a day's totals. Returns a new object. */
export function applyBatch(day: DayTotals, batch: Batch): DayTotals {
  const next: DayTotals = {
    ...day,
    uniques: day.uniques ?? 0,
    newVisitors: day.newVisitors ?? 0,
    uniqueSources: { ...(day.uniqueSources ?? {}) },
    sources: { ...day.sources },
    paths: { ...day.paths },
    landings: { ...day.landings },
    events: { ...day.events },
  };
  for (const path of batch.views) {
    next.views += 1;
    bump(next.paths, path, 1, MAX_PATHS);
  }
  if (batch.landed && batch.views.length > 0) {
    next.visits += 1;
    bump(next.sources, classifySource(batch.ref, batch.utm).key, 1, MAX_SOURCES);
    bump(next.landings, batch.views[0], 1, MAX_PATHS);
    // A unique visitor is counted with the visit it arrived on, so its
    // platform is the one that brought it today.
    if (batch.uv) {
      next.uniques += 1;
      if (batch.uv === "new") next.newVisitors += 1;
      bump(next.uniqueSources, classifySource(batch.ref, batch.utm).key, 1, MAX_SOURCES);
    }
  }
  for (const [name, count] of Object.entries(batch.events) as [CountedEvent, number][]) {
    next.events[name] = (next.events[name] ?? 0) + count;
  }
  return next;
}

/** Several documents for one day (the shards) become one. */
export function mergeDay(day: string, parts: DayTotals[]): DayTotals {
  const out = emptyDay(day);
  const add = (into: Record<string, number>, from: Record<string, number>) => {
    for (const [k, n] of Object.entries(from)) into[k] = (into[k] ?? 0) + n;
  };
  for (const part of parts) {
    out.visits += part.visits;
    out.views += part.views;
    out.uniques += part.uniques ?? 0;
    out.newVisitors += part.newVisitors ?? 0;
    add(out.uniqueSources, part.uniqueSources ?? {});
    add(out.sources, part.sources);
    add(out.paths, part.paths);
    add(out.landings, part.landings);
    add(out.events as Record<string, number>, part.events as Record<string, number>);
  }
  return out;
}

// ---------------------------------------------------------------- reading

export type Ranked = { key: string; count: number };

export function rank(map: Record<string, number>, limit = 12): Ranked[] {
  return Object.entries(map)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
    .slice(0, limit);
}

const sum = (map: Record<string, number>) => Object.values(map).reduce((a, b) => a + b, 0);

/** Apron pages: the product page, its variants, and the guides about aprons. */
export const isApronPath = (path: string) => /apron/i.test(path);

export function summarise(days: DayTotals[]) {
  const total = mergeDay("range", days);
  const apronPaths = Object.fromEntries(Object.entries(total.paths).filter(([path]) => isApronPath(path)));
  const apronLandings = Object.fromEntries(Object.entries(total.landings).filter(([path]) => isApronPath(path)));
  return {
    visits: total.visits,
    views: total.views,
    /** A sum of daily uniques: one browser on three days counts three times. */
    visitorDays: total.uniques,
    newVisitors: total.newVisitors,
    uniqueSources: rank(total.uniqueSources),
    searches: total.events.knowledge_search ?? 0,
    searchMisses: total.events.knowledge_search_miss ?? 0,
    contacts: (total.events.email_click ?? 0) + (total.events.phone_click ?? 0) + (total.events.whatsapp_click ?? 0),
    sources: rank(total.sources),
    pages: rank(total.paths, 15),
    landings: rank(total.landings, 10),
    events: total.events,
    apron: { views: sum(apronPaths), landings: sum(apronLandings), pages: rank(apronPaths, 8) },
  };
}
