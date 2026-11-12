# IVNV Music — Website

Official website for **IVNV**, a techno DJ from Barcelona. Static site built with
**Astro 7** and **Tailwind CSS 4**, deployed to GitHub Pages at
**https://www.ivnvmusic.com**.

> **Migration status:** complete. GitHub Pages serves the Astro build from GitHub
> Actions, and the legacy root-level static files have been removed. The old site
> is preserved on the `pre-astro` tag only. See `docs/DEPLOYMENT.md`.

## Stack

- Astro 7, static output, no React/Vue/Svelte islands
- Tailwind CSS 4 via `@tailwindcss/vite`
- Self-hosted variable fonts via `@fontsource-variable`: Anybody, Inter, JetBrains Mono
- Two small external scripts (mobile menu, press-photo lightbox); no other custom JS
- No CMS, database, server, forms, cookies, analytics or third-party scripts

## Requirements

- Node 24 (see `.nvmrc`)
- npm

On Windows PowerShell, use `npm.cmd` because `npm.ps1` is blocked on the current
machine.

## Commands

```powershell
npm.cmd install
npm.cmd run dev       # local dev server
npm.cmd run build     # astro check + astro build → dist/
npm.cmd run preview   # serve the production build
npm.cmd run check     # types/Astro diagnostics only
```

The production build must finish with **0 errors, 0 warnings, 0 hints**.

## Structure

```
src/
  assets/press/       source press photos (processed by Astro)
  components/         SEO, Header, Footer
  data/               single source of truth for published facts
  layouts/            BaseLayout.astro
  lib/                schema.ts, format.ts, jsonld.ts, markdown.ts
  pages/              index.astro, press-kit/index.astro, 404.astro
                      sitemap.xml.ts, llms.txt.ts, index.md.ts, press-kit.md.ts
  styles/             global.css (Tailwind theme tokens + base styles)
public/               CNAME, robots.txt, .nojekyll, favicon, OG images, js/menu.js,
                       js/press-carousel.js
.github/              GitHub Actions deploy workflow + Dependabot
docs/                 migration plan and deployment runbook
```

## Editing content

All published facts live in `src/data/`:

- `site.ts` — identity, bio, genres, BPM, recognition, contact, profiles, update date
- `appearances.ts` — verified past appearances and private/recorded entries
- `music.ts` — the DARK & LOVELY episodes, contest sets, radio/podcast features
  and archive mixes, with YouTube and/or SoundCloud links

Pages, JSON-LD, the sitemap, `llms.txt` and the Markdown endpoints all render from
that data. Do not duplicate facts in templates.

Content rules:

- Publish verified facts only. No invented venues, fees, travel radius, rider
  details or credentials.
- IVNV's role is **DJ**, not producer.
- Only `contact@ivnvmusic.com` is published.
- The five dated club appearances, the TechnoZulo recorded set and the generic
  private-events entry are the complete public appearance list. No upcoming dates
  are announced. The visible tour-dates section and navigation link are currently
  hidden by `SHOW_TOUR_DATES = false` in `src/data/site.ts`; the data and AI/Markdown
  outputs remain so they can be re-enabled.
- DARK & LOVELY has 15 episodes. Episodes 10 and 11 were published out of numeric
  order; keep the real dates and numbers.
- No photographer credits are published.

## SEO and AEO

- Per-page canonical, Open Graph, Twitter card, robots metadata and one H1.
- JSON-LD generated in `src/lib/schema.ts`: `MusicGroup`, `WebSite`,
  `MusicEvent`s, `ProfilePage` and `BreadcrumbList`.
- `/sitemap.xml` is a generated endpoint, preserving the URL referenced by
  `robots.txt`.
- `/llms.txt` is generated from the data layer and must not be hand-edited.
- `/index.md` and `/press-kit.md` are Markdown endpoints, advertised with
  `<link rel="alternate" type="text/markdown">`.
- `public/robots.txt` preserves the existing crawler policy, including the AI
  Content-Signal rules and the commercial-SEO crawler blocks.

## Security

- Static output only; no server-side runtime in production.
- Production pages include a meta Content-Security-Policy. The JSON-LD inline
  script is allowed by a SHA-256 hash computed at build time; the mobile menu and
  the press-photo lightbox are external files at `/js/menu.js` and
  `/js/press-carousel.js`.
- External links use `target="_blank"` with `rel="noopener noreferrer"` and a
  screen-reader new-tab hint.
- No secrets, environment variables, analytics, cookies, iframes or third-party
  requests.
- Dependabot watches npm and GitHub Actions; CI uses `npm ci`.

## Deployment

The deploy workflow is `.github/workflows/deploy.yml`. It builds `dist/` and
publishes it with GitHub Pages. The repository's Pages source is **GitHub
Actions**, and the custom domain and HTTPS stay on `www.ivnvmusic.com`.

Full runbook, including rollback: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

## Rollback

The pre-Astro site no longer exists in the working tree; it lives on the
`pre-astro` tag. Keep that tag and restore from it if you ever need to go back
(see `docs/DEPLOYMENT.md`).

## Contact

Booking, press and general enquiries: **contact@ivnvmusic.com**
