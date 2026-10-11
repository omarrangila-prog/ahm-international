/**
 * Sourcing assistant configuration.
 *
 *   ANTHROPIC_API_KEY   required. A key from console.anthropic.com.
 *   ASSISTANT_MODEL     optional. One of ASSISTANT_MODELS; Opus by default.
 *   ASSISTANT_ENABLED   "false" switches the assistant off without removing the key.
 *
 * The API base URL is fixed to Anthropic's. Every question a buyer types goes
 * wherever that URL points, so a third-party "compatible" proxy would receive
 * buyer conversations under a key nobody at AHM controls. The only override
 * honoured is a server on this machine, for testing.
 */

type Env = Record<string, string | undefined>;

export const ASSISTANT_MODELS = ["claude-opus-5-5", "claude-sonnet-5-5", "claude-haiku-5-5"] as const;
export type AssistantModel = (typeof ASSISTANT_MODELS)[number];

/**
 * The most capable model by default. The assistant's hardest job is declining
 * to fill gaps (MOQ, lead time, capacity) a buyer is asking it to fill, which
 * is where a stronger model earns its cost. Sonnet or Haiku can be chosen for
 * a lower bill.
 */
export const DEFAULT_MODEL: AssistantModel = "claude-opus-5-5";

const ANTHROPIC = "https://api.anthropic.com";

function localTestServer(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["127.0.0.1", "localhost"].includes(url.hostname) ? url.origin : null;
  } catch {
    return null;
  }
}

export function assistantConfig(env: Env = process.env) {
  const apiKey = env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey || env.ASSISTANT_ENABLED === "false") return null;
  const model = (ASSISTANT_MODELS as readonly string[]).includes(env.ASSISTANT_MODEL ?? "")
    ? (env.ASSISTANT_MODEL as AssistantModel)
    : DEFAULT_MODEL;
  return { apiKey, model, baseURL: localTestServer(env.ASSISTANT_API_BASE) ?? ANTHROPIC };
}

export function assistantEnabled(env: Env = process.env): boolean {
  return assistantConfig(env) !== null;
}
