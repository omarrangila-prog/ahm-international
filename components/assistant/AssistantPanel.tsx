"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, Loader2, X } from "lucide-react";
import { renderAnswer, plainText, MAX_QUESTION_CHARS, type Block, type ChatMessage, type Inline } from "@/lib/assistant/messages";
import { track } from "@/lib/analytics";

/**
 * The assistant's conversation panel.
 *
 * The conversation lives in this component and nowhere else: it is not stored
 * by the site, and closing the panel ends it. The notice at the top says what
 * the assistant is, what it cannot do, and not to paste confidential material,
 * and the way to a person is on screen the whole time, not only when asked.
 */

const SUGGESTIONS = [
  "Which products do you make?",
  "What should a tech pack include?",
  "Which fabric suits a work apron?",
  "How does the FOB quotation process work?",
  "How can I verify AHM International?",
];

function InlineRun({ parts, onNavigate }: { parts: Inline[]; onNavigate: () => void }) {
  return (
    <>
      {parts.map((part, i) =>
        part.kind === "link" ? (
          part.href.startsWith("/") ? (
            <Link key={i} href={part.href} onClick={onNavigate} className="font-medium text-ink underline underline-offset-4">
              {part.text}
            </Link>
          ) : (
            <a key={i} href={part.href} target={part.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="font-medium text-ink underline underline-offset-4">
              {part.text}
            </a>
          )
        ) : part.kind === "strong" ? (
          <strong key={i} className="font-semibold">
            {part.text}
          </strong>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

function Answer({ blocks, onNavigate }: { blocks: Block[]; onNavigate: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      {blocks.map((block, i) =>
        block.kind === "p" ? (
          <p key={i}>
            <InlineRun parts={block.inline} onNavigate={onNavigate} />
          </p>
        ) : (
          <ul key={i} className="list-disc space-y-1 pl-5">
            {block.items.map((item, j) => (
              <li key={j}>
                <InlineRun parts={item} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

export function AssistantPanel({ email, whatsapp, onClose }: { email: string | null; whatsapp: string | null; onClose: () => void }) {
  const titleId = useId();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const whatsappDigits = whatsapp?.replace(/[^\d]/g, "") ?? "";

  useEffect(() => {
    input.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [messages]);

  async function ask(question: string) {
    const q = question.trim().slice(0, MAX_QUESTION_CHARS);
    if (!q || busy) return;
    const conversation: ChatMessage[] = [...messages, { role: "user", content: q }];
    setMessages([...conversation, { role: "assistant", content: "" }]);
    setDraft("");
    setBusy(true);
    setError(null);
    setAnnouncement("");
    track("assistant_question", { turn: conversation.filter((m) => m.role === "user").length });

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "The assistant is not available right now.");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setMessages([...conversation, { role: "assistant", content: text }]);
      }
      if (!text.trim()) throw new Error("No answer came back. Please ask again.");
      setAnnouncement(plainText(text));
    } catch (e) {
      // Put the question back, so a failure costs the buyer nothing they typed.
      setMessages(messages);
      setDraft(q);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }

  const handoff = (channel: string) => () => track("assistant_handoff", { channel });

  return (
    <section
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      data-print="hide"
      className="fixed inset-x-3 bottom-3 z-[70] flex max-h-[min(40rem,calc(100dvh-1.5rem))] flex-col border border-ink bg-paper text-ink shadow-[0_24px_60px_-24px_rgba(16,19,21,0.55)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem]"
    >
      <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div>
          <h2 id={titleId} className="font-display text-base font-extrabold tracking-[-0.01em]">
            Sourcing assistant
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-ink/75">
            Answers from this website&rsquo;s published information, written by an AI model (Claude, by Anthropic). It can be
            wrong, and it cannot quote prices, MOQs or lead times. Please don&rsquo;t paste confidential specifications here.
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close the assistant" className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center text-ink/75 hover:text-ink">
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </header>

      <div ref={log} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 text-sm leading-relaxed">
        {messages.length === 0 ? (
          <div>
            <p className="text-ink/75">Ask about products, materials, tech packs, the quotation process, or how to check us out. Or start with one of these:</p>
            <ul className="mt-3 flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => ask(s)}
                    className="w-full border border-ink/20 px-3 py-2 text-left text-sm text-ink transition-colors hover:border-ink"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ol className="flex flex-col gap-3">
            {messages.map((m, i) => (
              <li key={i} className={m.role === "user" ? "ml-8 self-end bg-ink px-3 py-2 text-paper" : "mr-4 bg-paper-deep px-3 py-2"}>
                <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                {m.role === "user" ? (
                  <p className="whitespace-pre-line [overflow-wrap:anywhere]">{m.content}</p>
                ) : m.content ? (
                  <Answer blocks={renderAnswer(m.content, { email, whatsapp })} onNavigate={() => track("assistant_link")} />
                ) : (
                  <span className="inline-flex items-center gap-2 text-ink/75">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Looking through the site…
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
        {error && (
          <p role="alert" className="mt-3 border-l-2 border-ink pl-3 text-sm text-ink">
            {error}
          </p>
        )}
        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </div>

      <div className="border-t border-line px-4 py-2.5 text-xs text-ink/75">
        <span className="mr-1">Talk to a person:</span>
        <Link href="/request-a-quote?source=assistant" onClick={handoff("quote")} className="inline-block py-1 font-medium text-ink underline underline-offset-4">
          Request a quote
        </Link>
        {email && (
          <>
            {" · "}
            <a href={`mailto:${email}`} onClick={handoff("email")} className="inline-block py-1 font-medium text-ink underline underline-offset-4">
              Email
            </a>
          </>
        )}
        {whatsappDigits && (
          <>
            {" · "}
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handoff("whatsapp")}
              className="inline-block py-1 font-medium text-ink underline underline-offset-4"
            >
              WhatsApp
            </a>
          </>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void ask(draft);
        }}
        className="flex items-end gap-2 border-t border-line p-3"
      >
        <label htmlFor={`${titleId}-q`} className="sr-only">
          Your question
        </label>
        <textarea
          id={`${titleId}-q`}
          ref={input}
          rows={2}
          value={draft}
          maxLength={MAX_QUESTION_CHARS}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void ask(draft);
            }
          }}
          placeholder="Ask a sourcing question"
          className="min-h-11 flex-1 resize-none border border-ink/25 bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink/65"
        />
        <button
          type="submit"
          disabled={busy || !draft.trim()}
          aria-label="Send question"
          className="flex h-11 w-11 shrink-0 items-center justify-center bg-ink text-paper transition-colors hover:bg-lime hover:text-ink disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <ArrowUp className="h-4 w-4" aria-hidden="true" />}
        </button>
      </form>
    </section>
  );
}
