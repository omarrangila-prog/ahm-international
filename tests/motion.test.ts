import { test } from "node:test";
import assert from "node:assert/strict";
import { restartAttributeAnimation } from "../lib/restart-animation.ts";

/**
 * The route transition's one non-obvious behaviour, asserted directly.
 *
 * A real browser navigation would be the ideal test, but the site's
 * `frame-ancestors 'none'` correctly blocks the iframe harness that would need,
 * and weakening a security header to make a cosmetic animation testable is the
 * wrong trade. So the logic moved out of the component instead, where it can be
 * checked without a DOM at all.
 */

/** Records the order of operations so the layout flush can be asserted. */
function fakeElement() {
  const calls: string[] = [];
  return {
    calls,
    removeAttribute(name: string) {
      calls.push(`remove:${name}`);
    },
    setAttribute(name: string, value: string) {
      calls.push(`set:${name}=${value}`);
    },
    get offsetWidth() {
      calls.push("read:offsetWidth");
      return 100;
    },
  };
}

test("the attribute is removed, then a layout read forces a flush, then it is re-added", () => {
  const el = fakeElement();
  const ran = restartAttributeAnimation(el, "data-route-enter");

  assert.equal(ran, true);
  assert.deepEqual(el.calls, [
    "remove:data-route-enter",
    "read:offsetWidth",
    "set:data-route-enter=",
  ]);
});

test("the layout read sits BETWEEN remove and set — without it the animation never replays", () => {
  const el = fakeElement();
  restartAttributeAnimation(el, "data-route-enter");

  const removed = el.calls.indexOf("remove:data-route-enter");
  const read = el.calls.indexOf("read:offsetWidth");
  const set = el.calls.findIndex((c) => c.startsWith("set:"));

  assert.ok(removed < read, "the read must come after the remove");
  assert.ok(read < set, "the read must come before the set, or the browser coalesces both");
});

test("a null element is a no-op rather than a throw", () => {
  assert.equal(restartAttributeAnimation(null, "data-route-enter"), false);
});

test("it works for any attribute, not just the route one", () => {
  const el = fakeElement();
  restartAttributeAnimation(el, "data-something-else");
  assert.deepEqual(el.calls, [
    "remove:data-something-else",
    "read:offsetWidth",
    "set:data-something-else=",
  ]);
});
