"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { pipelineOrigin, pipelineStatus } from "@/lib/pipeline/config";
import { sendSignInMail } from "@/lib/pipeline/mail";
import { isDay, isStage, LOST_REASONS, type LeadChanges } from "@/lib/pipeline/model";
import { endSession, requireStaff, startSession } from "@/lib/pipeline/session";
import { normaliseEmail, staffList } from "@/lib/pipeline/staff";
import { pinAccount, pinFrom } from "@/lib/pipeline/pin";
import { attemptPin, deleteLead, markUsed, rebuildIndex, REFERENCE, updateLead } from "@/lib/pipeline/store";
import { LOGIN_TTL_MS, nonce, secretSource, signToken, verifyToken, type LoginPayload } from "@/lib/pipeline/tokens";

/**
 * Every mutation of the enquiry register.
 *
 * Server actions are public endpoints however they are called, so each one
 * checks the session and the role itself, and validates every field against
 * a fixed list or a bounded format. Next.js rejects a cross-origin action
 * call before it reaches any of this.
 */

/* ------------------------------ Sign-in ------------------------------- */

/**
 * Emails a one-time sign-in link to a listed staff address.
 *
 * The response is the same whether or not the address is on the list, and the
 * email is sent after the response, so neither the wording nor the timing
 * tells a stranger which addresses have access.
 */
export async function requestSignIn(formData: FormData) {
  const status = pipelineStatus();
  if (!status.link) redirect("/pipeline/sign-in");

  const email = normaliseEmail(String(formData.get("email") ?? "")).slice(0, 200);
  const h = await headers();
  const byIp = rateLimit(`signin-ip:${clientKey(h)}`, 6, 15 * 60 * 1000).allowed;
  const byEmail = rateLimit(`signin-email:${email}`, 3, 15 * 60 * 1000).allowed;
  const secret = secretSource();

  if (byIp && byEmail && secret && staffList().has(email)) {
    const token = signToken({ e: email, n: nonce(), x: Date.now() + LOGIN_TTL_MS } satisfies LoginPayload, secret, "login");
    const link = `${pipelineOrigin(process.env, h.get("host"))}/pipeline/verify?token=${encodeURIComponent(token)}`;
    after(async () => {
      try {
        await sendSignInMail(email, link);
      } catch (error) {
        console.error("[pipeline] sign-in mail failed", { error: String(error) });
      }
    });
  }

  redirect("/pipeline/sign-in?sent=1");
}

/**
 * Exchanges a sign-in link for a session. Reached by pressing a button, not by
 * opening the link: mail scanners open links to check them, and a link that
 * signed in on GET would be spent by the scanner before the person clicked it.
 */
export async function completeSignIn(formData: FormData) {
  const secret = secretSource();
  if (!secret) redirect("/pipeline/sign-in");

  const payload = verifyToken<LoginPayload>(String(formData.get("token") ?? ""), secret, "login");
  if (!payload || !staffList().has(payload.e)) redirect("/pipeline/sign-in?expired=1");
  if (!(await markUsed(payload.n))) redirect("/pipeline/sign-in?used=1");

  await startSession(payload.e);
  redirect("/pipeline");
}

/**
 * Signs in with the PIN, as the first admin on the staff list. The per-IP
 * limit only spares the store a write per guess from one noisy client; the
 * limit that protects the PIN is the daily count in `attemptPin`, which holds
 * across every instance and every visitor. A store that cannot be reached
 * refuses the PIN rather than skipping the count.
 */
export async function signInWithPin(formData: FormData) {
  const status = pipelineStatus();
  const expected = pinFrom();
  const account = pinAccount();
  if (!status.pin || !expected || !account) redirect("/pipeline/sign-in");

  const h = await headers();
  if (!rateLimit(`pin-ip:${clientKey(h)}`, 5, 15 * 60 * 1000).allowed) redirect("/pipeline/sign-in?pin=busy");

  const given = String(formData.get("pin") ?? "").replace(/\s+/g, "").slice(0, 32);
  let outcome: "ok" | "wrong" | "locked" | "error";
  try {
    outcome = await attemptPin(given, expected);
  } catch (error) {
    console.error("[pipeline] PIN check failed", { error: String(error) });
    outcome = "error";
  }
  if (outcome !== "ok") redirect(`/pipeline/sign-in?pin=${outcome}`);

  await startSession(account);
  redirect("/pipeline");
}

export async function signOut() {
  await endSession();
  redirect("/pipeline/sign-in?signedout=1");
}

/* ------------------------------- Leads -------------------------------- */

function text(formData: FormData, name: string, max: number): string | null | undefined {
  if (!formData.has(name)) return undefined;
  const value = String(formData.get(name) ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
  return value || null;
}

function day(formData: FormData, name: string): string | null | undefined {
  if (!formData.has(name)) return undefined;
  const value = String(formData.get(name) ?? "").trim();
  return value === "" ? null : isDay(value) ? value : undefined;
}

/**
 * Saves the update panel and the note form alike. A field absent from the
 * submission is left alone, so the note form cannot clear a follow-up date.
 */
export async function saveLead(ref: string, formData: FormData) {
  const staff = await requireStaff("edit");
  if (!REFERENCE.test(ref)) redirect("/pipeline");

  const changes: LeadChanges = {};

  const stage = formData.get("stage");
  if (isStage(stage)) changes.stage = stage;

  const status = formData.get("status");
  if (status === "open" || status === "lost") changes.status = status;

  const reason = formData.get("lostReason");
  if (formData.has("lostReason")) {
    changes.lostReason = typeof reason === "string" && (LOST_REASONS as readonly string[]).includes(reason) ? reason : null;
  }

  if (formData.has("owner")) {
    const owner = String(formData.get("owner") ?? "");
    if (owner === "") changes.owner = null;
    else if (staffList().has(owner)) changes.owner = owner;
  }

  changes.followUpAt = day(formData, "followUpAt");
  changes.lastContactAt = day(formData, "lastContactAt");
  if (formData.has("quoteRef")) changes.quoteRef = text(formData, "quoteRef", 60)?.replace(/\s+/g, " ") ?? null;
  changes.note = text(formData, "note", 2000) ?? null;

  const updated = await updateLead(ref, changes, staff.email);
  if (!updated) redirect("/pipeline?missing=1");
  redirect(`/pipeline/leads/${ref}?saved=1`);
}

export async function removeLead(ref: string, formData: FormData) {
  await requireStaff("delete");
  if (!REFERENCE.test(ref)) redirect("/pipeline");
  // Typing the reference is the confirmation; a stray click cannot delete a record.
  if (String(formData.get("confirm") ?? "").trim().toUpperCase() !== ref) redirect(`/pipeline/leads/${ref}?confirm=1`);
  await deleteLead(ref);
  redirect("/pipeline?deleted=1");
}

export async function reindex() {
  await requireStaff("delete");
  const count = await rebuildIndex();
  redirect(`/pipeline/reports?reindexed=${count}`);
}
