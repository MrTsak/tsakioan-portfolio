# Tsakioan portfolio

Personal portfolio for Ioannis Tsakalidis. Plain HTML and CSS; no build step, paid service, database, or API keys are required. Google Fonts is optional: system fallback fonts work if the font service is unavailable.

## Edit

- `index.html`: introduction, background, experience and contact link.
- `style.css`: layout, colors and responsive styles.
- `favicon.svg`: browser icon.

The professional background is based on the owner's LinkedIn profile. There are no fabricated projects, clients, testimonials, or performance metrics. Add project case studies when the owner provides material suitable for publication.

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
