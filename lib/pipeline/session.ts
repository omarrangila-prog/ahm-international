import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { can, staffList, type Permission, type Role } from "./staff";
import { secretSource, signToken, verifyToken, SESSION_TTL_MS, type SessionPayload } from "./tokens";

/**
 * Staff sessions for /pipeline.
 *
 * The cookie is scoped to /pipeline, so it is never sent with a request for a
 * public page. HttpOnly, Secure outside local development, SameSite=Lax so a
 * link from the notification email opens the lead without a fresh sign-in.
 *
 * Every page, server action and file download calls `requireStaff`, which
 * re-reads the role from the staff list. There is no proxy or layout check to
 * rely on: each entry point checks for itself, so a forgotten layout cannot
 * expose a record.
 */

export const SESSION_COOKIE = "ahm_pipeline";
const COOKIE_PATH = "/pipeline";

export type Staff = { email: string; role: Role };

export const currentStaff = cache(async (): Promise<Staff | null> => {
  const secret = secretSource();
  if (!secret) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = verifyToken<SessionPayload>(token, secret, "session");
  if (!session) return null;
  const role = staffList().get(session.e);
  return role ? { email: session.e, role } : null;
});

/** Redirects to sign-in when there is no session, and to the board when the role is not enough. */
export async function requireStaff(permission: Permission = "view"): Promise<Staff> {
  const staff = await currentStaff();
  if (!staff) redirect("/pipeline/sign-in");
  if (!can(staff.role, permission)) redirect("/pipeline?denied=1");
  return staff;
}

export async function startSession(email: string) {
  const secret = secretSource();
  if (!secret) throw new Error("No signing secret");
  const now = Date.now();
  const token = signToken({ e: email, i: now, x: now + SESSION_TTL_MS } satisfies SessionPayload, secret, "session");
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Browsers accept Secure cookies from http://localhost, so this holds for a
    // local production build too.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
}

export async function endSession() {
  (await cookies()).set(SESSION_COOKIE, "", { path: COOKIE_PATH, maxAge: 0, httpOnly: true, sameSite: "lax" });
}
