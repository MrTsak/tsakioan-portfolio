#!/usr/bin/env node
// Builds el/index.html (the Greek homepage) from index.html and translations.js.
//
//   node tools/build-greek.mjs          write el/index.html
//   node tools/build-greek.mjs --check  exit 1 if el/index.html is out of date
//
// Edit index.html and translations.js, then run this script. Do not edit el/index.html by hand.
// Needs Node.js 18 or newer and nothing else.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const greek = createRequire(import.meta.url)(join(root, "translations.js"));
const source = readFileSync(join(root, "index.html"), "utf8");
const outFile = join(root, "el", "index.html");
const site = "https://tsakioan.com/";

const normalize = (text) => text.replace(/\s+/g, " ").trim();
const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const encodeText = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const encodeAttr = (text) => encodeText(text).replace(/"/g, "&quot;");
const lookup = (text) => greek[normalize(decode(text))];

let html = source;
const fail = (message) => {
  console.error("build-greek: " + message);
  process.exit(1);
};
const replaceOnce = (from, to) => {
  if (html.split(from).length !== 2) fail(`expected exactly one match for: ${from}`);
  html = html.replace(from, to);
};
const setAttr = (selector, attr, value) => {
  const re = new RegExp(`(<[^>]*${selector}[^>]*\\s${attr}=")[^"]*(")`);
  if (!re.test(html)) fail(`no ${attr} on element matching ${selector}`);
  html = html.replace(re, `$1${encodeAttr(value)}$2`);
};
const translateAttr = (selector, attr) => {
  const match = html.match(new RegExp(`<[^>]*${selector}[^>]*\\s${attr}="([^"]*)"`));
  if (!match) fail(`no ${attr} on element matching ${selector}`);
  const greekText = lookup(match[1]);
  if (!greekText) fail(`translations.js has no entry for: ${normalize(decode(match[1]))}`);
  setAttr(selector, attr, greekText);
};

// 1. Page language, and where the site root is relative to el/.
replaceOnce('<html lang="en">', '<html lang="el" data-root="../">');
replaceOnce(
  "<!doctype html>",
  "<!doctype html>\n<!-- Generated from index.html and translations.js by tools/build-greek.mjs. Do not edit by hand. -->",
);

// 2. The redirect to el/ only belongs on the English page.
html = html.replace(/\s*<script id="language-redirect">[\s\S]*?<\/script>/, "");

// 3. Head: description, link preview, canonical URL and locale.
translateAttr('name="description"', "content");
translateAttr('property="og:title"', "content");
translateAttr('property="og:description"', "content");
translateAttr('property="og:image:alt"', "content");
setAttr('rel="canonical"', "href", site + "el/");
setAttr('property="og:url"', "content", site + "el/");
setAttr('property="og:image"', "content", site + "og-image-el.png");
replaceOnce('property="og:locale" content="en_US"', 'property="og:locale" content="el_GR"');
replaceOnce(
  'property="og:locale:alternate" content="el_GR"',
  'property="og:locale:alternate" content="en_US"',
);

// 4. Load the dictionary for the board captions that board.js writes at runtime.
html = html.replace(
  /(\s*)<script src="language\.js/,
  (_, space) =>
    `${space}<script src="translations.js?v=${version()}" defer></script>${space}<script src="language.js`,
);

// 5. Relative links and assets point one folder up.
html = html.replace(/\s(href|src)="([^"]*)"/g, (whole, attr, url) =>
  /^(#|\/|[a-z]+:|\.\.\/)/i.test(url) ? whole : ` ${attr}="../${url}"`,
);

// 6. Language switch points back to the English page.
html = html.replace(
  /<a class="language-toggle"[^>]*>[\s\S]*?<\/a\s*>/,
  '<a class="language-toggle" href="../" hreflang="en" lang="en" aria-label="Switch to English">English</a>',
);

// 7. Text between tags, and aria-labels. Script contents are left alone.
const untranslated = new Set();
html = html
  .split(/(<script[\s\S]*?<\/script>)/)
  .map((part, i) => {
    if (i % 2 === 1) return part;
    part = part.replace(/>([^<]+)</g, (whole, text) => {
      const greekText = lookup(text);
      if (greekText) {
        const [, lead, trail] = text.match(/^(\s*)[\s\S]*?(\s*)$/);
        return `>${lead}${encodeText(greekText)}${trail}<`;
      }
      if (/[A-Za-z]{2}/.test(text)) untranslated.add(normalize(text));
      return whole;
    });
    return part.replace(/\saria-label="([^"]*)"/g, (whole, label) => {
      const greekText = lookup(label);
      return greekText ? ` aria-label="${encodeAttr(greekText)}"` : whole;
    });
  })
  .join("");

function version() {
  const match = source.match(/language\.js\?v=([^"]+)"/);
  return match ? match[1] : "1";
}

if (process.argv.includes("--check")) {
  const current = existsSync(outFile) ? readFileSync(outFile, "utf8") : "";
  if (current !== html) fail("el/index.html is out of date. Run: node tools/build-greek.mjs");
  console.log("el/index.html is up to date.");
} else {
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log("Wrote el/index.html.");
  if (untranslated.size) {
    console.log("\nText kept in English (add to translations.js if it should be Greek):");
    for (const text of untranslated) console.log("  " + text);
  }
}
