/**
 * Visual QA harness. Not part of the app build.
 *
 * Usage: node scripts/shoot.mjs <route> <width> [outName] [fullPage]
 */
import { chromium } from "/home/synthor/.nvm/versions/node/v22.22.3/lib/node_modules/playwright/index.mjs";

const [, , route = "/", widthArg = "1440", name = "shot", full = "true"] = process.argv;
const width = Number(widthArg);
const OUT = process.env.SHOT_DIR || "/tmp/shots";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: Math.round(width * 0.62) },
  deviceScaleFactor: 1,
});

const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(`PAGEERROR: ${e.message}`));

await page.goto(`http://localhost:3100${route}`, { waitUntil: "networkidle", timeout: 60000 });
// Let entrance animations settle.
await page.waitForTimeout(1400);
// Trigger any scroll-linked reveals, then return to the top.
await page.evaluate(async () => {
  // The site sets scroll-behavior: smooth, which would make scrollTo animate and
  // race this loop. Force instant jumps so every section is genuinely observed.
  const html = document.documentElement;
  const prior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  const step = window.innerHeight * 0.7;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo({ top: y, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 160));
  }
  window.scrollTo({ top: 0, behavior: "instant" });
  html.style.scrollBehavior = prior;
});
await page.waitForTimeout(900);

await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full === "true" });

// Report horizontal overflow — the most common responsive break.
const overflow = await page.evaluate(() => {
  const de = document.documentElement;
  const offenders = [];
  if (de.scrollWidth > de.clientWidth + 1) {
    for (const el of document.querySelectorAll("*")) {
      const r = el.getBoundingClientRect();
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        offenders.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 60)} right=${Math.round(r.right)}`);
      }
      if (offenders.length > 6) break;
    }
  }
  return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, offenders };
});

console.log(JSON.stringify({ route, width, overflow, errors: errors.slice(0, 12) }, null, 2));
await browser.close();
