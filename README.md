# Tsakioan portfolio

Personal portfolio for Ioannis Tsakalidis. Plain HTML and CSS; no build step, paid service, database, or API keys are required. Fonts (DM Sans and Manrope, SIL Open Font License) are self-hosted in `fonts/`, so pages make no third-party requests.

## Edit

- `index.html`: introduction, background, experience and contact link (English).
- `translations.js`: Greek text for the homepage and page titles; see *Greek pages* below.
- `style.css`: layout, colors and responsive styles.
- `favicon.svg`: browser icon.

The professional background is based on the owner's LinkedIn profile. There are no fabricated projects, clients, testimonials, or performance metrics. Add project case studies when the owner provides material suitable for publication.

## Greek pages

The Greek pages live in `el/` (https://tsakioan.com/el/). They are **generated** from the English pages, so do not edit them by hand:

| English page | Greek text comes from | Greek page |
| --- | --- | --- |
| `index.html` | `translations.js` (key = English text, with line breaks and repeated spaces collapsed) | `el/index.html` |
| `network.html` | `network-strings.js` (each key is `[English, Greek]`; elements use `data-t="key"`) | `el/network.html` |
| `print-test.html` | the `data-en` / `data-el` attributes on each element | `el/print-test.html` |

Page titles, descriptions and link-preview text for all three pages are in `translations.js`.

1. Edit the English page and its Greek text.
2. Run `node tools/build-greek.mjs` (Node.js 18 or newer). It rewrites the `el/` pages and lists homepage text it left in English; brand names and board labels are expected in that list. It stops with an error if English text in `network.html` or `print-test.html` no longer matches its source.
3. Commit everything. A GitHub check runs `node tools/build-greek.mjs --check` and fails if an `el/` page is out of date.

Each page and its Greek version carry `hreflang` links to each other, and `sitemap.xml` lists them for search engines. The language button links between the two versions. Each page remembers its language in the browser, so visitors who last viewed Greek are sent to the Greek version when they open an English URL (for example from the privacy page), and old `?lang=el` links still open the Greek page. `og-image-el.png` is the Greek link-preview image.

## Updating files

Every page loads CSS, JS and the favicon with the same `?v=` tag (the date, plus a letter for a second change on the same day), so browsers fetch fresh copies after a change. When you edit an asset, change the tag on **all** pages (`index.html`, `network.html`, `print-test.html`, `privacy.html`), then rebuild the Greek pages.

`og-image.png` (1200×630) is the preview image shown when the site is shared on LinkedIn and other networks.

## Free hosting on GitHub Pages

1. Put these files in the root of a public GitHub repository.
2. Open Settings > Pages.
3. Choose Deploy from a branch, select `main` and `/ (root)`, then Save.
4. Wait for the Pages deployment and open the URL shown in Settings > Pages.

## Connect tsakioan.com after registration

Do not configure a domain you have not registered. First verify ownership using the TXT record provided by GitHub under your account Settings > Pages. Then set `tsakioan.com` in the repository's Settings > Pages > Custom domain. GitHub creates the CNAME file.

At your registrar, configure the apex domain with GitHub Pages' documented A records, and `www` as a CNAME to `mrtsak.github.io`. Remove conflicting parking records. Enable Enforce HTTPS after GitHub provisions the certificate.

Use the current official records and instructions:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

The domain registration is billed by the registrar. GitHub Pages hosting for this public repository is free under its current plan. Email inbox hosting is separate and is not needed for this website.

## Preview locally

Run `python -m http.server 8766` in this directory and open http://localhost:8766.
