/**
 * Who may sign in to the enquiry register, and what each role may do.
 *
 * The list is configuration, not data: `PIPELINE_STAFF` in the deployment
 * environment, so adding or removing a person is a deliberate change made by
 * whoever controls the deployment, and nobody can grant themselves access from
 * inside the app.
 *
 *   PIPELINE_STAFF="info@ahminternationals.com:admin, sales@example.com:sales"
 *
 * A bare address is a sales user. When the variable is unset, the company
 * mailbox is the only account, as admin: sign-in links go to the inbox the
 * commercial team already reads, so the register works with no extra setup.
 *
 * The role is read from this list on every request rather than stored in the
 * session cookie, so removing someone or changing their role takes effect on
 * their next click, not when their cookie expires.
 */

export type Role = "admin" | "sales" | "viewer";

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  sales: "Sales",
  viewer: "Read only",
};

type Env = Record<string, string | undefined>;

const EMAIL = /^[^\s@,:]+@[^\s@,:]+\.[^\s@,:]{2,}$/;

export function normaliseEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function staffList(env: Env = process.env): Map<string, Role> {
  const staff = new Map<string, Role>();
  const raw = env.PIPELINE_STAFF?.trim();

  if (raw) {
    for (const entry of raw.split(/[,;\n]/)) {
      const [address, role] = entry.split(":").map((s) => s.trim());
      if (!address) continue;
      const email = normaliseEmail(address);
      if (!EMAIL.test(email)) continue;
      staff.set(email, role === "admin" || role === "viewer" ? role : "sales");
    }
    return staff;
  }

  const mailbox = (env.SMTP_USER ?? env.NEXT_PUBLIC_SALES_EMAIL)?.trim();
  if (mailbox && EMAIL.test(normaliseEmail(mailbox))) staff.set(normaliseEmail(mailbox), "admin");
  return staff;
}

export type Permission = "view" | "edit" | "export" | "delete";

const GRANTS: Record<Role, Permission[]> = {
  admin: ["view", "edit", "export", "delete"],
  sales: ["view", "edit"],
  viewer: ["view"],
};

export function can(role: Role, permission: Permission): boolean {
  return GRANTS[role].includes(permission);
}
