# AGENTS.md

Official website for **IVNV**, a techno DJ from Barcelona. The production site is a
two-page **Astro 7 + Tailwind CSS 4** app under `src/`, deployed to GitHub Pages at
**https://www.ivnvmusic.com**.

> **Migration status (2026-11-05):** the Astro app is implemented and builds
> cleanly on `new_website`. `main` still serves the legacy root-level static site
> until the GitHub Pages source is switched to GitHub Actions. **Do not delete the
> legacy files yet.** The legacy `main` is tagged `pre-astro` locally; push it at
> cutover. See `docs/DEPLOYMENT.md`.

## Commands

Use `npm.cmd` on Windows PowerShell; `npm.ps1` is blocked on the current machine.

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build      # astro check && astro build → dist/
npm.cmd run preview
npm.cmd run check
```

`npm.cmd run build` must finish with **0 errors, 0 warnings, 0 hints**. There are
no unit tests; validate changes in a browser and with the build.

## Source of truth

All published facts live in `src/data/`:

- `site.ts` — name, URL, description, email, city/region/country, update date,
  BPM, recognition, genre tags, bio, social profiles.
- `appearances.ts` — verified past appearances and the recorded/private entries.
- `music.ts` — the DARK & LOVELY episodes, contest sets, radio/podcast features
  and archive mixes, with YouTube and/or SoundCloud links.

Pages, JSON-LD, the sitemap, `llms.txt` and `/index.md` + `/press-kit.md` render
from those files. **Do not duplicate facts in templates.** Update the data, then
bump `SITE.updated`.

### Content rules

- Verified facts only. No invented venues, event schedules, fees, travel radius,
  rider details or credentials.
- Role is **DJ**, not producer.
- Genres: Techno (Raw / Deep / Hypnotic), Techno (Peak Time / Driving), Minimal
  Techno. BPM: 138–148.
- Publish only `contact@ivnvmusic.com`.
- Five dated club appearances (Fluxs, Lab65 by ELEKTR’ÂME, Unplug, Absenta del
  Raval, Can Luis Ob Rem), the TechnoZulo recorded set, and the generic private
  events entry. No upcoming dates are announced.
- The tour-dates section and its navigation entry are temporarily hidden by
  `SHOW_TOUR_DATES = false` in `src/data/site.ts`. The appearance data, JSON-LD,
  Markdown and `llms.txt` entries remain so the section can be restored by
  flipping the flag.
- DARK & LOVELY has 15 episodes. Episodes 10 and 11 were published out of numeric
  order; keep the real numbers and dates.
- Music rows keep separate YouTube and SoundCloud links; do not make the whole
  row clickable or replace the links with a generic “Watch” action. Series are
  DARK & LOVELY Episodes, Contests, Radio & Podcasts and Mixes; third-party posts
  stay Radio & Podcasts and link to the host.
- `Oneira Party` and `Slow BCN` were private events. Do not add them as named
  public bookings; the existing private-events entry stays generic.
- No photographer credits are published.
- No ZIP/logo download buttons unless the assets exist.

## Architecture

```
src/
  assets/press/       source photos; Astro emits optimized WebP
  components/         SEO, Header, Footer
  data/               site, appearances, music
  layouts/            BaseLayout.astro
  lib/                schema, format, jsonld, markdown
  pages/              index.astro, press-kit/index.astro, 404.astro,
                      sitemap.xml.ts, llms.txt.ts, index.md.ts, press-kit.md.ts
  styles/             global.css (Tailwind @theme tokens + base)
public/               CNAME, robots.txt, .nojekyll, favicon, OG images, js/menu.js,
                       js/press-carousel.js
.github/              Pages deploy workflow + Dependabot
```

- Static output only; no React/Vue/Svelte, CMS, database, server, forms, cookies
  or analytics.
- Fonts are self-hosted with `@fontsource-variable` (Anybody, Inter, JetBrains
  Mono). Do not add Google Fonts or a CDN.
- Custom JS is limited to two external files (`public/js/menu.js` for the mobile
  menu and `public/js/press-carousel.js` for the press-photo lightbox), loaded
  externally so the production CSP can stay strict.
- Production pages carry a meta CSP. The inline JSON-LD script is allowed by a
  SHA-256 hash computed in `BaseLayout.astro`; do not add unhashed inline scripts.

## SEO / AEO

- `src/components/SEO.astro` owns canonical, robots, OG/Twitter and JSON-LD.
- `src/lib/schema.ts` builds `MusicGroup`, `WebSite`, `MusicEvent`, `ProfilePage`
  and `BreadcrumbList`.
- `src/pages/sitemap.xml.ts` serves `/sitemap.xml`; keep `/` and `/press-kit/`.
- `src/pages/llms.txt.ts` serves `/llms.txt`; it is generated from `src/data` and
  must not be hand-edited.
- `src/pages/index.md.ts` and `src/pages/press-kit.md.ts` serve Markdown versions;
  each page advertises its version with `<link rel="alternate" type="text/markdown">`.
- `public/robots.txt` preserves the existing crawler policy and points at
  `/sitemap.xml`.
- Keep `SITE.updated`, the sitemap `lastmod` and the `llms.txt` date in sync.

## Deployment and security

- Deploy via `.github/workflows/deploy.yml` (GitHub Actions → Pages). The Pages
  source must be **GitHub Actions**; custom domain `www.ivnvmusic.com` and HTTPS
  stay in place.
- Runbook and rollback: `docs/DEPLOYMENT.md`.
- Keep the lockfile committed and use `npm ci` in CI.
- No secrets, env vars, analytics, iframes or third-party scripts.
- External links use `target="_blank"` with `rel="noopener noreferrer"` and a
  screen-reader new-tab hint.

## Legacy site (until cutover)

The root `index.html`, `css/`, `js/`, `sass/`, `fonts/`, `images/`, `robots.txt`,
`sitemap.xml`, `llms.txt` and `CNAME` are the live site on `main` until the Pages
source is switched. Do not edit them for the new site and do not delete them
before tagging `main` as `pre-astro`.

If you must touch the legacy files before cutover:

- Custom CSS lives at the bottom of `css/style.css` (roughly line 1320+). Do not
  recompile `sass/style.scss` over it; re-append the custom block if you do.
- The social-icon rows and CONTACT / VIEW PRESS KIT blocks are duplicated twice in
  `index.html`; update both.
- Do not reintroduce Jekyll (`_config.yml`, Gemfile, `_posts`, etc.).
- The root `llms.txt` describes the legacy single-page site. Do not update it with
  new Astro facts; the generated `dist/llms.txt` replaces it at cutover.

## Validation

- `npm.cmd run build` (types + build).
- Load `/`, `/press-kit/`, `/404.html`, `/llms.txt`, `/index.md`,
  `/press-kit.md` and `/sitemap.xml` in a browser/preview.
- Check 375–390px, 768px and 1400px layouts, keyboard focus, mobile menu open/close
  and Escape, and internal/external links.
- Lighthouse targets: 100 performance, 100 accessibility, 100 best practices and
  100 SEO on mobile. Current pages meet them in the local simulated run. Size
  budget: home HTML 41 KB raw / 5.7 KB gzip (the raw 40 KB guideline is exceeded
  only by the JSON-LD and copy), CSS 9.8 KB gzip, JS 231 B gzip, fonts 112.7 KB,
  mobile LCP 0.8 s.
