/**
 * Restarts a CSS animation that is driven by the presence of an attribute.
 *
 * Removing and re-adding an attribute within the same task is coalesced by the
 * browser into no change at all, so the animation never replays. Reading a
 * layout property in between forces the pending style change to flush, which is
 * what lets a second navigation to the same shape of page animate again.
 *
 * Extracted from the component so the behaviour can be asserted directly. The
 * alternative was verifying it through a real browser navigation, and the site's
 * own `frame-ancestors 'none'` correctly blocks the iframe harness that would
 * require — the header is doing its job, so the test moved rather than the
 * header.
 *
 * Returns false when there is no element, so callers can stay branch-free.
 */

/** The slice of an element this needs. Keeps it testable without a real DOM. */
export type AnimatableElement = {
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
  /** Read purely for its layout side effect. */
  readonly offsetWidth?: number;
};

export function restartAttributeAnimation(
  el: AnimatableElement | null,
  attribute: string,
): boolean {
  if (!el) return false;

  el.removeAttribute(attribute);
  // The read is the point; the value is discarded.
  void el.offsetWidth;
  el.setAttribute(attribute, "");

  return true;
}
