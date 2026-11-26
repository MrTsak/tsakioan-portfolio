// IP & subnet calculator: switching language keeps the entered values and what was on screen.
// Run: node --test tests/*.test.mjs (needs Playwright; set REQUIRE_BROWSER=1 to fail instead of skip).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright')); } catch {
  try { ({ chromium } = require('/opt/node-tools/node_modules/playwright')); } catch { chromium = null; }
}
if (!chromium && process.env.REQUIRE_BROWSER) throw new Error('REQUIRE_BROWSER is set but Playwright is not installed');

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
function serve(requests) {
  const server = createServer(async (req, res) => {
    requests.push(req.url);
    let rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    if (rel.endsWith('/')) rel = join(rel, 'index.html');
    try { res.writeHead(200, { 'content-type': TYPES[extname(rel)] || 'application/octet-stream' }).end(await readFile(join(ROOT, rel))); }
    catch { res.writeHead(404).end(); }
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

// Everything a visitor can see or a screen reader can reach on the calculator.
const snapshot = (page) => page.evaluate(() => {
  const $ = (id) => document.getElementById(id);
  const text = (id) => ($(id).hidden ? null : $(id).textContent.trim());
  return {
    lang: document.documentElement.lang,
    values: ['address', 'mask', 'other'].map((id) => $(id).value),
    invalid: ['address', 'mask', 'other'].filter((id) => $(id).getAttribute('aria-invalid') === 'true'),
    error: $('error').textContent.trim(),
    resultsShown: !$('results').hidden,
    // Values only, so the two languages can be compared; host counts lose their thousands separator.
    // "Not applicable" (no broadcast address on /31 and /32) is the same value in both languages.
    details: $('results').hidden ? null : [...document.querySelectorAll('#details dd')]
      .map((d, i) => (i === 6 ? d.textContent.replace(/\D/g, '') : d.textContent))
      .map((v) => (['Not applicable', 'Δεν εφαρμόζεται'].includes(v) ? 'n/a' : v)),
    labels: $('results').hidden ? null : [...document.querySelectorAll('#details dt')].map((d) => d.textContent),
    special: text('special'),
    comparison: text('comparison'),
    handoffLeft: sessionStorage.getItem('tsakioan-calculator-handoff'),
  };
});

async function switchLanguage(page) {
  await Promise.all([page.waitForNavigation(), page.click('#language')]);
  await page.waitForFunction(() => document.getElementById('details') !== null);
}

const CASES = [
  { name: 'valid addresses, same subnet', address: '192.168.1.20', mask: '24', other: '192.168.1.50', calc: true, expect: { results: true, comparison: true } },
  { name: 'invalid address', address: '300.1.1.1', mask: '24', other: '', calc: true, expect: { results: false, invalid: ['address'] } },
  { name: 'invalid mask', address: '10.0.0.1', mask: '/33', other: '', calc: true, expect: { results: false, invalid: ['mask'] } },
  { name: 'empty second address', address: '172.16.5.4', mask: '255.255.0.0', other: '', calc: true, expect: { results: true, comparison: false } },
  { name: '/31 point-to-point', address: '10.0.0.0', mask: '/31', other: '10.0.0.1', calc: true, expect: { results: true, special: true, comparison: true } },
  { name: '/32 single host', address: '10.0.0.5', mask: '32', other: '', calc: true, expect: { results: true, special: true, comparison: false } },
  { name: 'typed but not calculated', address: '192.168.0.7', mask: '23', other: '192.168.1.9', calc: false, expect: { results: false } },
];

test('calculator keeps values and the shown result across English → Greek → English', { skip: !chromium && 'playwright not installed', timeout: 120000 }, async () => {
  const requests = [];
  const server = await serve(requests);
  const browser = await chromium.launch();
  try {
    for (const c of CASES) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`http://localhost:${server.address().port}/network.html`);
      await page.fill('#address', c.address);
      await page.fill('#mask', c.mask);
      await page.fill('#other', c.other);
      if (c.calc) await page.click('button.primary');
      const en = await snapshot(page);

      await switchLanguage(page);
      const el = await snapshot(page);
      assert.match(page.url(), /\/el\/network\.html$/, `${c.name}: Greek page, nothing appended to the URL`);
      await switchLanguage(page);
      const back = await snapshot(page);
      assert.match(page.url(), /\/network\.html$/);
      assert.doesNotMatch(page.url(), /el\//);

      for (const [label, s] of [['Greek', el], ['English again', back]]) {
        assert.deepEqual(s.values, en.values, `${c.name}: values kept (${label})`);
        assert.equal(s.resultsShown, c.expect.results, `${c.name}: results ${c.expect.results ? 'shown' : 'hidden'} (${label})`);
        assert.deepEqual(s.invalid, c.expect.invalid ?? [], `${c.name}: invalid fields (${label})`);
        assert.equal(Boolean(s.error), Boolean(c.expect.invalid), `${c.name}: error message (${label})`);
        assert.deepEqual(s.details, en.details, `${c.name}: same calculated values (${label})`);
        assert.equal(s.special !== null, Boolean(c.expect.special), `${c.name}: /31 or /32 note (${label})`);
        assert.equal(s.comparison !== null, Boolean(c.expect.comparison), `${c.name}: comparison (${label})`);
        assert.equal(s.handoffLeft, null, `${c.name}: hand-over deleted on arrival (${label})`);
      }
      assert.equal(el.lang, 'el');
      if (c.expect.results) assert.notDeepEqual(el.labels, en.labels, `${c.name}: Greek labels`);
      if (c.expect.invalid) assert.notEqual(el.error, en.error, `${c.name}: Greek error text`);
      assert.deepEqual(back, en, `${c.name}: back in English, the page matches the original`);
      assert.deepEqual(errors, []);
      await page.close();
    }
    // The addresses never appear in any request the browser made.
    for (const c of CASES) {
      for (const value of [c.address, c.other].filter(Boolean)) {
        assert.ok(!requests.some((u) => u.includes(value)), `${value} was not sent in a request`);
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
});

test('calculator ignores a stale or misdirected hand-over', { skip: !chromium && 'playwright not installed', timeout: 60000 }, async () => {
  const server = await serve([]);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    const base = `http://localhost:${server.address().port}`;
    await page.goto(`${base}/network.html`);
    const entry = (extra) => JSON.stringify({ to: 'el', at: Date.now(), address: '10.9.8.7', mask: '8', other: '', shown: 'result', ...extra });
    for (const [why, value] of [['older than a minute', entry({ at: Date.now() - 61000 })], ['meant for the English page', entry({ to: 'en' })]]) {
      await page.evaluate((v) => sessionStorage.setItem('tsakioan-calculator-handoff', v), value);
      await page.goto(`${base}/el/network.html`);
      const s = await snapshot(page);
      assert.equal(s.values[0], '', `${why}: not restored`);
      assert.equal(s.resultsShown, false, `${why}: no result`);
      assert.equal(s.handoffLeft, null, `${why}: deleted anyway`);
    }
  } finally {
    await browser.close();
    server.close();
  }
});

test('calculator and language switch still work when sessionStorage is unavailable', { skip: !chromium && 'playwright not installed', timeout: 60000 }, async () => {
  const server = await serve([]);
  const browser = await chromium.launch();
  try {
    const base = `http://localhost:${server.address().port}`;
    const variants = {
      // Blocked site data: touching sessionStorage at all throws.
      blocked: () => Object.defineProperty(window, 'sessionStorage', { get() { throw new DOMException('blocked', 'SecurityError'); } }),
      // Full or read-only storage: reading works, writing throws.
      'write fails': () => { Storage.prototype.setItem = function () { throw new DOMException('full', 'QuotaExceededError'); }; },
    };
    for (const [name, block] of Object.entries(variants)) {
      const context = await browser.newContext();
      await context.addInitScript(block);
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`${base}/network.html`);
      await page.fill('#address', '192.168.1.20');
      await page.fill('#mask', '24');
      await page.fill('#other', '192.168.1.50');
      await page.click('button.primary');
      assert.equal(await page.isVisible('#results'), true, `${name}: the calculator still calculates`);

      await Promise.all([page.waitForNavigation(), page.click('#language')]);
      assert.match(page.url(), /\/el\/network\.html$/, `${name}: the switch still reaches the Greek page`);
      assert.equal(await page.getAttribute('html', 'lang'), 'el');
      assert.equal(await page.inputValue('#address'), '', `${name}: nothing carried over`);
      assert.equal(await page.isVisible('#results'), false);
      await page.fill('#address', '10.0.0.1');
      await page.click('button.primary');
      assert.equal(await page.isVisible('#results'), true, `${name}: the Greek calculator still calculates`);

      await Promise.all([page.waitForNavigation(), page.click('#language')]);
      assert.match(page.url(), /\/network\.html$/, `${name}: and back to English`);
      assert.deepEqual(errors, [], `${name}: no page errors`);
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
});
