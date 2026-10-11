import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { assistantConfig } from "@/lib/assistant/config";
import { KNOWLEDGE } from "@/lib/assistant/knowledge";
import { ASSISTANT_RULES } from "@/lib/assistant/prompt";
import { parseConversation, type ChatMessage } from "@/lib/assistant/messages";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { company } from "@/data/company";

/**
 * POST /api/assistant
 *
 * Answers one question in a conversation the browser keeps. Nothing is stored
 * here and nothing a buyer types is logged: errors are logged by type only.
 *
 * Cost is bounded three ways. Per visitor, by the limits below. Per answer, by
 * `max_tokens` and by keeping only recent turns. Per month, by the spend limit
 * the owner sets on the API key in the Anthropic Console, which is the only
 * ceiling that holds across every server instance at once.
 *
 * The website content is sent as a cached system block, so after the first
 * question in a few minutes it is read from Anthropic's cache rather than
 * billed in full again.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PER_TEN_MINUTES = 15;
const PER_DAY = 60;
const MAX_BODY_BYTES = 40_000;

/** The browser that asks must be this site. Stops other sites using it as a free model. */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const host = new URL(origin).host;
    return host === request.headers.get("host") || host === new URL(company.siteUrl).host;
  } catch {
    return false;
  }
}

const unavailable = (status = 503) =>
  NextResponse.json({ error: "The assistant is not available right now. Email or WhatsApp the team instead." }, { status });

export async function POST(request: Request) {
  const config = assistantConfig();
  if (!config) return unavailable(404);
  if (!sameOrigin(request)) return NextResponse.json({ error: "Not allowed." }, { status: 403 });

  const key = clientKey(request.headers);
  const burst = rateLimit(`assistant:10m:${key}`, PER_TEN_MINUTES, 10 * 60 * 1000);
  const daily = rateLimit(`assistant:day:${key}`, PER_DAY, 24 * 60 * 60 * 1000);
  if (!burst.allowed || !daily.allowed) {
    return NextResponse.json(
      { error: "That is the limit for now. For anything more, the commercial team can help directly." },
      { status: 429, headers: { "retry-after": String(Math.max(burst.retryAfter, daily.retryAfter)) } },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "That message is too long." }, { status: 413 });
  let parsed: ChatMessage[] | null = null;
  try {
    parsed = parseConversation((JSON.parse(raw) as { messages?: unknown }).messages);
  } catch {
    parsed = null;
  }
  if (!parsed) return NextResponse.json({ error: "Questions can be up to 1,000 characters." }, { status: 400 });
  const messages = parsed;

  const client = new Anthropic({ apiKey: config.apiKey, baseURL: config.baseURL, maxRetries: 1, timeout: 45_000 });

  const ask = () =>
    client.messages.create({
      model: config.model,
      max_tokens: 700,
      system: [
        { type: "text", text: ASSISTANT_RULES },
        { type: "text", text: `WEBSITE CONTENT\n\n${KNOWLEDGE}`, cache_control: { type: "ephemeral" } },
      ],
      messages,
      stream: true,
    });

  // Awaited before the response starts, so a bad key or an outage is a clean
  // 503 the page can show, not a stream that ends mid-sentence.
  let stream: Awaited<ReturnType<typeof ask>>;
  try {
    stream = await ask();
  } catch (error) {
    console.error("[assistant] request failed", {
      status: error instanceof Anthropic.APIError ? error.status : undefined,
      type: error instanceof Error ? error.name : typeof error,
    });
    return unavailable();
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          } else if (event.type === "message_delta" && event.delta.stop_reason === "max_tokens") {
            controller.enqueue(encoder.encode("…"));
          }
        }
      } catch (error) {
        console.error("[assistant] stream interrupted", { type: error instanceof Error ? error.name : typeof error });
        controller.enqueue(encoder.encode("\n\nThe answer was cut off. Please ask again, or contact the team directly."));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}
