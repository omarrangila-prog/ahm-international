/**
 * Resolve hook for the test runner.
 *
 * The application's own modules import each other extensionlessly (`./products`)
 * and through the `@/` alias, because that is what the bundler expects. Node's
 * ESM resolver does neither, so rather than rewriting every import in the app to
 * suit the tests, the tests teach Node the two rules.
 */
import { pathToFileURL } from "node:url";
import { existsSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolvePath(dirname(fileURLToPath(import.meta.url)), "..");

export async function resolve(specifier, context, next) {
  // "@/data/x" -> "<root>/data/x"
  if (specifier.startsWith("@/")) {
    specifier = pathToFileURL(resolvePath(ROOT, specifier.slice(2))).href;
  }

  try {
    return await next(specifier, context);
  } catch (err) {
    // Extensionless relative import: try the TypeScript file.
    const base = specifier.startsWith("file:")
      ? fileURLToPath(specifier)
      : context.parentURL && specifier.startsWith(".")
        ? resolvePath(dirname(fileURLToPath(context.parentURL)), specifier)
        : null;

    if (base) {
      for (const candidate of [`${base}.ts`, `${base}/index.ts`]) {
        if (existsSync(candidate)) return next(pathToFileURL(candidate).href, context);
      }
    }
    throw err;
  }
}
