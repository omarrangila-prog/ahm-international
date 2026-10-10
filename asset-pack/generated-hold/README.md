# Generated scenes — withdrawn from the site

These fifteen images were live on the site until October 2026. They are
**generated pictures, not photographs**: each was produced from a prompt in
`asset-pack/prompts/` ("photorealistic", "realistic Pakistani workers",
"premium commercial campaign photography").

They were withdrawn because of what they show, not how they look:

- a sewing floor with dozens of lines signed "LINE A-1", every operator in an
  AHM International branded shirt — an implied facility size and headcount;
- an "AHM Quality Check Sheet" for a bib apron with tolerances, an inspector's
  signature and a date — an inspection record that does not exist;
- a warehouse signed "AHM International — Apparel Manufacturer & Exporter" and
  a shipping container painted "AHM International, Karachi-Pakistan";
- the documented US apron program illustrated with an apron carrying AHM's own
  logo, which a customer's uniform apron would not.

On a manufacturer's site a buyer reads a factory photograph as evidence of the
factory. CLAUDE.md's first rule is that nothing is invented, and the brief of
10 October 2026 says generated factory imagery must not be used as evidence of
AHM operations. A picture asserts scale, staffing and records more forcefully
than a sentence would, so the same rule applies to it.

Nothing else had to change: every section asks `hasAsset()` and restructures
when its image is absent, so `npm run images:gaps` stays at 0.

## To bring photography back

Photograph the real facility (or an authorised partner's, labelled as such) and
place each file at its canonical path under `public/assets/`, then run
`npm run images:build` and `npm run assets`. `assets-needed.md` lists the paths.

## To reverse this withdrawal

`git mv` a file back to the same path under `public/assets/` and run
`npm run assets`. Do it only with the owner's explicit decision that a
generated image may stand for the real thing, and label it on the page.
