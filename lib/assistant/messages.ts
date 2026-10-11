/**
 * The shape of a conversation, checked on the server and rendered in the
 * browser. Pure, so both sides share it and the tests can exercise it.
 */

export type ChatMessage = { role: "user" | "assistant"; content: string };

export const MAX_TURNS = 12;
export const MAX_QUESTION_CHARS = 1_000;
const MAX_ANSWER_CHARS = 4_000;
const MAX_TOTAL_CHARS = 16_000;

/**
 * Accepts the conversation the browser sends back with each question. It is
 * the browser's copy, so it is bounded and normalised rather than trusted:
 * alternating roles, a user turn last, control characters stripped, lengths
 * capped. Only the most recent turns are kept, which bounds the cost of a long
 * conversation as well as its size.
 */
export function parseConversation(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 40) return null;

  const clean: ChatMessage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
    if (!text) return null;
    if (role === "user" && text.length > MAX_QUESTION_CHARS) return null;
    clean.push({ role, content: text.slice(0, MAX_ANSWER_CHARS) });
  }

  let recent = clean.slice(-MAX_TURNS);
  while (recent.length && recent[0].role !== "user") recent = recent.slice(1);
  if (!recent.length || recent[recent.length - 1].role !== "user") return null;
  for (let i = 1; i < recent.length; i++) if (recent[i].role === recent[i - 1].role) return null;

  while (recent.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS && recent.length > 1) {
    recent = recent.slice(2);
  }
  return recent;
}

/* ------------------------------------------------------------------ */
/* Rendering an answer                                                 */
/* ------------------------------------------------------------------ */

export type Inline = { kind: "text"; text: string } | { kind: "strong"; text: string } | { kind: "link"; text: string; href: string };
export type Block = { kind: "p"; inline: Inline[] } | { kind: "ul"; items: Inline[][] };

/**
 * Only links a model could legitimately produce from the site's content:
 * a path on this site, or a mailto or WhatsApp link. Anything else renders as
 * its text. A model can be talked into writing any URL; the page decides which
 * ones become links.
 */
export function safeHref(href: string, allowed: { email?: string | null; whatsapp?: string | null } = {}): string | null {
  const h = href.trim();
  if (/^\/(?!\/)[A-Za-z0-9\-._~/#?=&%]*$/.test(h)) return h;
  if (allowed.email && h.toLowerCase() === `mailto:${allowed.email.toLowerCase()}`) return h;
  const digits = allowed.whatsapp?.replace(/[^\d]/g, "");
  if (digits && h === `https://wa.me/${digits}`) return h;
  return null;
}

function inline(text: string, allowed: Parameters<typeof safeHref>[1]): Inline[] {
  const out: Inline[] = [];
  const pattern = /\[([^\]]{1,200})\]\(([^)\s]{1,300})\)|\*\*([^*]{1,200})\*\*/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > last) out.push({ kind: "text", text: text.slice(last, match.index) });
    if (match[3]) out.push({ kind: "strong", text: match[3] });
    else {
      const href = safeHref(match[2], allowed);
      out.push(href ? { kind: "link", text: match[1], href } : { kind: "text", text: match[1] });
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ kind: "text", text: text.slice(last) });
  return out;
}

/**
 * The answer as a screen reader should hear it: link text without the
 * brackets and path, no asterisks, list items as sentences.
 */
export function plainText(text: string): string {
  const flat = (parts: Inline[]) => parts.map((p) => p.text).join("");
  return renderAnswer(text)
    .map((b) => (b.kind === "p" ? flat(b.inline) : b.items.map(flat).join(". ")))
    .join(" ");
}

/** Paragraphs, "- " lists, **bold** and [links](/path). Nothing else is markup. */
export function renderAnswer(text: string, allowed: Parameters<typeof safeHref>[1] = {}): Block[] {
  const blocks: Block[] = [];
  for (const chunk of text.split(/\n{2,}/)) {
    const lines = chunk.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^([-*•]|\d+\.)\s+/.test(l))) {
      blocks.push({ kind: "ul", items: lines.map((l) => inline(l.replace(/^([-*•]|\d+\.)\s+/, ""), allowed)) });
    } else {
      blocks.push({ kind: "p", inline: inline(lines.join(" "), allowed) });
    }
  }
  return blocks;
}
