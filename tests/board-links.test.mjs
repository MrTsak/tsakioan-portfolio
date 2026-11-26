// Circuit board: each component shows only its own link, in both languages.
// Regression test for a hidden printer-test link left behind when the AI component was selected,
// and for the AI component having no link at all.
// Run: node --test tests/*.test.mjs (needs Playwright; set REQUIRE_BROWSER=1 to fail instead of skip).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { readFile, stat } from 'node:fs/promises';
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

function serve() {
  const server = createServer(async (req, res) => {
    let rel = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
    if (rel.endsWith('/')) rel = join(rel, 'index.html');
    try {
      res.writeHead(200, { 'content-type': TYPES[extname(rel)] || 'application/octet-stream' }).end(await readFile(join(ROOT, rel)));
    } catch { res.writeHead(404).end(); }
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

const EXPECTED = {
  en: { hardware: '/print-test.html', network: '/network.html', ai: '/projects/diabetes/' },
  el: { hardware: '/el/print-test.html', network: '/el/network.html', ai: '/projects/diabetes/el/' },
};

// Every link inside the board module that a visitor could see, tab to or hear.
const exposedLinks = (page) => page.evaluate(() => [...document.querySelectorAll('.pcb-module a')]
  .filter((a) => a.getClientRects().length > 0 && getComputedStyle(a).visibility !== 'hidden')
  .map((a) => new URL(a.getAttribute('href'), location.href).pathname));

async function select(page, part) {
  await page.click(`.pcb-part[data-part="${part}"]`);
}
async function expectOnly(page, lang, part, when) {
  const links = await exposedLinks(page);
  const want = part ? [EXPECTED[lang][part]] : [];
  assert.deepEqual(links, want, `${lang}, ${when}: expected ${JSON.stringify(want)}, saw ${JSON.stringify(links)}`);
}

for (const lang of ['en', 'el']) {
  test(`board shows only the selected component's link (${lang})`, { skip: !chromium && 'playwright not installed', timeout: 60000 }, async () => {
    const server = await serve();
    const browser = await chromium.launch();
    try {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
      const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`http://localhost:${server.address().port}/${lang === 'el' ? 'el/' : ''}`);
      await page.waitForSelector('.pcb-power');
      if (await page.getAttribute('.pcb-power', 'aria-checked') !== 'true') await page.click('.pcb-power');
      await expectOnly(page, lang, null, 'powered on, nothing selected');

      // Several orders, so every component follows every other one.
      for (const order of [['hardware', 'ai', 'network', 'ai'], ['ai', 'hardware', 'network', 'hardware'], ['network', 'ai', 'hardware', 'network']]) {
        for (const part of order) { await select(page, part); await expectOnly(page, lang, part, `after selecting ${part} in ${order.join('>')}`); }
      }

      // Run each simulation to the end, then switch to the other components.
      for (const part of ['hardware', 'network']) {
        await select(page, part);
        await page.click('.demo-run');
        await page.waitForFunction(() => !document.querySelector('.demo-run').disabled, null, { timeout: 10000 });
        await expectOnly(page, lang, part, `after running the ${part} simulation`);
        for (const next of ['ai', part === 'hardware' ? 'network' : 'hardware']) { await select(page, next); await expectOnly(page, lang, next, `after the ${part} simulation, then ${next}`); }
      }

      // Switching off hides the link; switching back on keeps the selection and its link only.
      await select(page, 'ai');
      await page.click('.pcb-power');
      await expectOnly(page, lang, null, 'power off');
      await page.click('.pcb-power');
      await expectOnly(page, lang, 'ai', 'power back on');

      // A hidden link is not focusable and not in the accessibility tree.
      await select(page, 'network');
      const tabbable = [];
      await page.focus('.pcb-part[data-part="ai"]');
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press('Tab');
        tabbable.push(await page.evaluate(() => (document.activeElement.closest('.pcb-module') ? document.activeElement.getAttribute('href') : null)));
      }
      const boardLinks = tabbable.filter(Boolean);
      assert.deepEqual([...new Set(boardLinks)], ['network.html'], `only the calculator link is focusable: ${JSON.stringify(boardLinks)}`);
      const tree = await page.locator('.pcb-module').ariaSnapshot();
      assert.equal((tree.match(/- link /g) || []).length, 1, `one link in the accessibility tree:\n${tree}`);

      // Every target exists.
      for (const path of Object.values(EXPECTED[lang])) {
        await stat(join(ROOT, path.endsWith('/') ? `${path}index.html` : path));
      }
      assert.deepEqual(errors, []);
    } finally {
      await browser.close();
      server.close();
    }
  });
}
