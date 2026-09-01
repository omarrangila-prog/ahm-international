import { test } from "node:test";
import assert from "node:assert/strict";
import { buildCsp } from "../lib/security-headers.ts";

/**
 * `'unsafe-eval'` is allowed while developing so React's dev build can use
 * `eval()` for its debugging features without the policy logging a console
 * error on every page. The whole point of scoping it is that it can never
 * reach the deployed site, so that is what these assert.
 */

test("the production policy forbids eval", () => {
  const csp = buildCsp({ development: false });
  assert.ok(!csp.includes("unsafe-eval"), "production CSP must never allow eval()");
});

test("the development policy allows eval, and only for scripts", () => {
  const csp = buildCsp({ development: true });
  const scriptSrc = csp.split("; ").find((d) => d.startsWith("script-src"));
  assert.ok(scriptSrc?.includes("'unsafe-eval'"), "development CSP should allow eval()");
  assert.equal(csp.match(/unsafe-eval/g)?.length, 1, "eval must be allowed in exactly one directive");
});

test("development changes nothing but script-src", () => {
  const prod = buildCsp({ development: false }).split("; ");
  const dev = buildCsp({ development: true }).split("; ");
  assert.equal(prod.length, dev.length);
  for (let i = 0; i < prod.length; i++) {
    if (prod[i].startsWith("script-src")) continue;
    assert.equal(dev[i], prod[i], `directive ${prod[i]} must not differ between environments`);
  }
});

test("the shipped header carries the policy", () => {
  // Guards the wiring: the export next.config.ts consumes must stay a CSP entry.
  const header = buildCsp({ development: false });
  assert.ok(header.startsWith("default-src 'self'"));
  assert.ok(header.includes("frame-ancestors 'none'"));
});
