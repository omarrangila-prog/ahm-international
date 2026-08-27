# Client-branded samples — held out of the deployed site

35 of the 63 supplied product photographs carry a third-party mark: an
embroidered customer logo, a licensed graphic, or a brand hangtag.

They are excellent photographs of real production work. They are held here
because publishing them would do two things the site is built not to do.

## 1. It would name customers without permission

`AHM_International_Complete_Visual_Asset_Pack/00_READ_ME_FIRST/PUBLICATION_CONTROL.txt`
puts these on the RED list — *do not publish without evidence or permission*:

> End-client logos
> Threads Uniform Agency or Ukrop's name/logo without written permission

Two of the held files show **Ukrop's** and **Pampers** marks directly. Others
show CarMax, Nautica, Hannaford, D'Agostino, Virginia Tech, TapouT and
Armani Exchange.

Putting a customer's branded garment on a supplier's public website announces
that relationship. That is the buyer's decision to grant, not the supplier's to
assume — and international buyers check.

## 2. It uses third-party trademarks

Reproducing a brand's mark in commercial marketing without a licence is a real
exposure, and the buyers this site targets run supplier due diligence.

## What is published instead

The 28 unbranded articles from the same batch are live at
`public/assets/products/photography/` — polos, henleys, hoodies, fleece,
outerwear, bottoms and scarves. They show identical construction quality and
carry no attribution risk.

## To publish any file here

1. Obtain **written** publication permission from the brand owner, or
2. Retouch the mark out, then treat it as an unbranded sample.

Then move the file to `assets-master/product-photography/`, add a recipe to
`scripts/optimize-images.mjs`, and run `npm run images:build`.
