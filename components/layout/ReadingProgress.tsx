/**
 * Reading progress hairline.
 *
 * A server component with no state: the fill is a CSS scroll timeline, so there
 * is no scroll listener, no re-render, and nothing to hydrate. Browsers without
 * `animation-timeline` leave the bar at zero width, which is invisible — the
 * feature is additive rather than a fork in behaviour.
 *
 * Rendered only on long-form routes, where knowing how much is left is actually
 * useful. On a product page it would be noise.
 */
export function ReadingProgress() {
  return <div className="read-progress" aria-hidden="true" />;
}
