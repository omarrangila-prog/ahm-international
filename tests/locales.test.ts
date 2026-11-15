import test from "node:test";
import assert from "node:assert/strict";
import { localePages, LOCALE_FAMILIES, hreflangAlternates } from "../data/locales.ts";
import { getCategory } from "../data/products.ts";
import { routes } from "../data/routes.ts";

/**
 * The language landing pages say in seven languages only what the English
 * site says, and each one is complete.
 */

test("seven languages, each complete, Arabic right to left", () => {
  assert.deepEqual(localePages.map((l) => l.code).sort(), ["ar", "de", "es", "fr", "it", "nl", "pl"]);
  for (const l of localePages) {
    for (const slug of LOCALE_FAMILIES) {
      assert.ok(getCategory(slug), `${slug} is not a family`);
      assert.ok(l.products[slug], `${l.code} has no name for ${slug}`);
    }
    assert.equal(l.process.length, 4, `${l.code}: the owner's four steps`);
    assert.ok(l.faqs.length >= 3);
    assert.equal(l.dir, l.code === "ar" ? "rtl" : "ltr");
  }
});

test("no language page states a price, an MOQ figure, a lead time or a certificate", () => {
  for (const l of localePages) {
    const text = JSON.stringify(l);
    assert.doesNotMatch(text, /[$€£]|\bUSD\b|\bEUR\b/, `${l.code} states a price`);
    assert.doesNotMatch(text, /\b\d+\s*(pcs|pieces|Stück|pièces|piezas|pezzi|stuks|sztuk)\b/i, `${l.code} states a quantity`);
    assert.doesNotMatch(text, /\b\d+\s*(days|Tage|jours|días|giorni|dagen|dni)\b/i, `${l.code} states a lead time`);
    assert.doesNotMatch(text, /ISO 9001|OEKO-TEX|WRAP|BSCI|SEDEX/i, `${l.code} names a certificate`);
  }
});

test("the only figures are the owner's: 200+ own, 1,000+ partners, documented US export", () => {
  for (const l of localePages) {
    assert.match(l.figures.own.replace(/\D/g, ""), /^200$/);
    assert.match(l.figures.partners.replace(/\D/g, ""), /^1000$/);
  }
});

test("the EU duty note appears only on EU-language pages", () => {
  for (const l of localePages) {
    if (l.code === "ar") assert.equal(l.trade, undefined);
    else assert.ok(l.trade && /GSP\+|SPG\+|APS\+|SAP\+/.test(l.trade.heading + l.trade.body), `${l.code} lacks the GSP+ note`);
  }
});

test("hreflang names English as x-default and every language page, all in the sitemap", () => {
  const alt = hreflangAlternates("https://example.com");
  assert.equal(alt["x-default"], "https://example.com/");
  assert.equal(alt.en, "https://example.com/");
  const paths = new Set(routes.filter((r) => !r.noindex).map((r) => r.path));
  for (const l of localePages) {
    assert.equal(alt[l.hreflang], `https://example.com/${l.code}`);
    assert.ok(paths.has(`/${l.code}`), `/${l.code} is not in the sitemap`);
    assert.ok(l.seoTitle.length <= 42, `${l.code} title is ${l.seoTitle.length}`);
    assert.ok(l.seoDescription.length <= 155, `${l.code} description is ${l.seoDescription.length}`);
  }
});
