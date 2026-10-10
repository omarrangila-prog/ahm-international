import { test } from "node:test";
import assert from "node:assert/strict";
import { legacyHostRedirects, LEGACY_HOSTS } from "../lib/domains.ts";

/**
 * Legacy hostnames must leave for the canonical origin, keep the path, and
 * never point back at themselves.
 */

test("every legacy host redirects permanently to the canonical origin", () => {
  const rules = legacyHostRedirects("https://www.ahminternationals.com");
  assert.equal(rules.length, LEGACY_HOSTS.length);
  for (const rule of rules) {
    assert.equal(rule.permanent, true);
    assert.equal(rule.source, "/:path*");
    assert.equal(rule.destination, "https://www.ahminternationals.com/:path*");
  }
});

test("a host is never redirected to itself", () => {
  const rules = legacyHostRedirects("https://ahm-international.vercel.app");
  assert.ok(rules.every((r) => r.has[0].value !== "ahm-international.vercel.app"));
});

test("preview hostnames are not matched", () => {
  const hosts = legacyHostRedirects().map((r) => r.has[0].value);
  assert.ok(!hosts.some((h) => h.includes("omarrangila")), "preview deployments must keep working");
});
