#!/usr/bin/env node
// Builds the Greek pages in el/ from the English pages and their Greek text:
//
//   index.html       + translations.js     -> el/index.html
//   network.html     + network-strings.js  -> el/network.html
//   print-test.html  (data-el attributes)  -> el/print-test.html
//
//   node tools/build-greek.mjs          write the el/ pages
//   node tools/build-greek.mjs --check  exit 1 if any el/ page is out of date
//
// Edit the English pages and the Greek text, then run this script. Do not edit el/ by hand.
// Needs Node.js 18 or newer and nothing else.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const greek = require(join(root, "translations.js"));
const networkStrings = require(join(root, "network-strings.js"));
const site = "https://tsakioan.com/";
const checkOnly = process.argv.includes("--check");

// Pages with a Greek version. Links to them stay relative, so from el/ they open the Greek page.
const localized = new Set(["", "./", "index.html", "network.html", "print-test.html"]);

const normalize = (text) => text.replace(/\s+/g, " ").trim();
const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const encodeText = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const encodeAttr = (text) => encodeText(text).replace(/"/g, "&quot;");
const lookup = (text) => greek[normalize(decode(text))];

let failed = false;
const fail = (message) => {
  console.error("build-greek: " + message);
  process.exit(1);
};

function build(file, translateBody) {
  let html = readFileSync(join(root, file), "utf8");
  const replaceOnce = (from, to) => {
    if (html.split(from).length !== 2) fail(`${file}: expected exactly one match for: ${from}`);
    html = html.replace(from, to);
  };
  const setAttr = (selector, attr, value) => {
    const re = new RegExp(`(<[^>]*${selector}[^>]*\\s${attr}=")[^"]*(")`);
    if (!re.test(html)) fail(`${file}: no ${attr} on element matching ${selector}`);
    html = html.replace(re, `$1${encodeAttr(value)}$2`);
  };
  const translateAttr = (selector, attr) => {
    const match = html.match(new RegExp(`<[^>]*${selector}[^>]*\\s${attr}="([^"]*)"`));
    if (!match) return;
    const greekText = lookup(match[1]);
    if (!greekText)
      fail(`translations.js has no entry for (${file}): ${normalize(decode(match[1]))}`);
    setAttr(selector, attr, greekText);
  };
  const greekUrl = site + "el/" + (file === "index.html" ? "" : file);

  // 1. Page language and a note that the file is generated.
  replaceOnce('<html lang="en">', '<html lang="el">');
  replaceOnce(
    "<!doctype html>",
    `<!doctype html>\n<!-- Generated from ${file} by tools/build-greek.mjs. Do not edit by hand. -->`,
  );

  // 2. The redirect to the Greek page only belongs on the English page.
  html = html.replace(/\s*<script id="language-redirect">[\s\S]*?<\/script>/, "");

  // 3. Head: title, description, link preview, canonical URL and locale.
  html = html.replace(/<title>([^<]*)<\/title>/, (whole, title) => {
    const greekTitle = lookup(title);
    if (!greekTitle) fail(`translations.js has no entry for (${file} title): ${decode(title)}`);
    return `<title>${encodeText(greekTitle)}</title>`;
  });
  translateAttr('name="description"', "content");
  translateAttr('property="og:title"', "content");
  translateAttr('property="og:description"', "content");
  translateAttr('property="og:image:alt"', "content");
  setAttr('rel="canonical"', "href", greekUrl);
  setAttr('property="og:url"', "content", greekUrl);
  setAttr('property="og:image"', "content", site + "og-image-el.png");
  replaceOnce('property="og:locale" content="en_US"', 'property="og:locale" content="el_GR"');
  replaceOnce(
    'property="og:locale:alternate" content="el_GR"',
    'property="og:locale:alternate" content="en_US"',
  );

  // 4. The homepage's board captions are translated in the browser, so load the dictionary.
  if (file === "index.html") {
    const version = (html.match(/language\.js\?v=([^"]+)"/) || [])[1] || "1";
    html = html.replace(
      /(\s*)<script src="language\.js/,
      (_, space) =>
        `${space}<script src="translations.js?v=${version}" defer></script>${space}<script src="language.js`,
    );
    if (!html.includes('src="translations.js')) fail(`${file}: could not add translations.js`);
  }

  // 5. Relative links to pages without a Greek version, and assets, point one folder up.
  html = html.replace(/\s(href|src)="([^"]*)"/g, (whole, attr, url) => {
    if (/^(#|\/|[a-z]+:|\.\.\/)/i.test(url)) return whole;
    if (localized.has(url.split(/[?#]/)[0])) return whole;
    return ` ${attr}="../${url}"`;
  });

  // 6. The language switch points back to the English page.
  const toggle = /<a\s[^>]*?\b(class="language-toggle"|id="language")[^>]*>[\s\S]*?<\/a\s*>/;
  if (!toggle.test(html)) fail(`${file}: no language switch found`);
  html = html.replace(
    toggle,
    (whole, idOrClass) =>
      `<a ${idOrClass} href="../${file === "index.html" ? "" : file}" hreflang="en" lang="en" aria-label="Switch to English">English</a>`,
  );

  // 7. Page text. Script contents are left alone.
  html = html
    .split(/(<script[\s\S]*?<\/script>)/)
    .map((part, i) => (i % 2 === 1 ? part : translateBody(part, file)))
    .join("");

  const outFile = join(root, "el", file);
  if (checkOnly) {
    const current = existsSync(outFile) ? readFileSync(outFile, "utf8") : "";
    if (current !== html) {
      console.error(`build-greek: el/${file} is out of date. Run: node tools/build-greek.mjs`);
      failed = true;
    } else console.log(`el/${file} is up to date.`);
  } else {
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
    console.log(`Wrote el/${file}.`);
  }
}

// index.html: translate text between tags and aria-labels with translations.js.
const untranslated = new Set();
function translateHomepage(part) {
  part = part.replace(/>([^<]+)</g, (whole, text) => {
    const greekText = lookup(text);
    if (greekText) {
      const [, lead, trail] = text.match(/^(\s*)[\s\S]*?(\s*)$/);
      return `>${lead}${encodeText(greekText)}${trail}<`;
    }
    if (/[A-Za-z]{2}/.test(decode(text))) untranslated.add(normalize(decode(text)));
    return whole;
  });
  return translateLabels(part);
}

function translateLabels(part) {
  return part.replace(/\saria-label="([^"]*)"/g, (whole, label) => {
    const greekText = lookup(label);
    return greekText ? ` aria-label="${encodeAttr(greekText)}"` : whole;
  });
}

// network.html: elements with data-t="key" hold network-strings.js text.
function translateNetwork(part, file) {
  part = part.replace(/(data-t="(\w+)"[^>]*>)([^<]*)</g, (whole, open, key, text) => {
    const pair = networkStrings[key];
    if (!pair) fail(`${file}: network-strings.js has no key "${key}"`);
    if (normalize(decode(text)) !== pair[0])
      fail(`${file}: text of data-t="${key}" does not match network-strings.js: "${pair[0]}"`);
    const [, lead, trail] = text.match(/^(\s*)[\s\S]*?(\s*)$/);
    return `${open}${lead}${encodeText(pair[1])}${trail}<`;
  });
  return translateLabels(part);
}

// print-test.html: each element carries its English and Greek text in data-en and data-el.
function translateTestSheet(part, file) {
  let translated = 0;
  part = part.replace(
    /(<(\w+)\b[^>]*\sdata-en="([^"]*)"[^>]*\sdata-el="([^"]*)"[^>]*>)([^<]*)(<\/\2\s*>)/g,
    (whole, open, tag, en, el, text, close) => {
      if (normalize(decode(text)) !== normalize(decode(en)))
        fail(`${file}: element text does not match its data-en: "${normalize(decode(en))}"`);
      translated++;
      const [, lead, trail] = text.match(/^(\s*)[\s\S]*?(\s*)$/);
      return `${open}${lead}${el}${trail}${close}`;
    },
  );
  const withGreek = (part.match(/\sdata-el="/g) || []).length;
  if (translated !== withGreek)
    fail(`${file}: ${withGreek - translated} data-el element(s) could not be translated`);
  return translateLabels(part);
}

build("index.html", translateHomepage);
build("network.html", translateNetwork);
build("print-test.html", translateTestSheet);

if (failed) process.exit(1);
if (!checkOnly && untranslated.size) {
  console.log("\nHomepage text kept in English (add to translations.js if it should be Greek):");
  for (const text of untranslated) console.log("  " + text);
}
