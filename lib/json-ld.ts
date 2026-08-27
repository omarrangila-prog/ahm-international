/**
 * Safe JSON-LD serialisation.
 *
 * `JSON.stringify` does not escape `<`, so a string containing `</script>`
 * inside structured data would terminate the script element early and let the
 * remainder be parsed as HTML. That is the classic JSON-in-HTML injection.
 *
 * Today every value in this site's schema comes from static data files and
 * operator-set environment variables, so the risk is theoretical. It stops being
 * theoretical the moment a CMS, a form field or a customer-supplied string
 * reaches a schema builder, and by then nobody remembers this was unescaped.
 * Escaping at the serialisation boundary means it can never happen.
 */
export function serialiseJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    // U+2028 and U+2029 are valid in JSON but terminate a JavaScript line.
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
