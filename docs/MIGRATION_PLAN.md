# IVNV website migration plan

**Status:** Phases 1–5 implemented on `new_website`; QA and cutover pending
**Date:** 2026-11-05
**Target:** replace the current static one-pager with a two-page Astro site on GitHub Pages
**Branch:** `new_website`

---

## 1. Decisions locked

| Topic | Decision |
|---|---|
| Hosting | GitHub Pages (keep current host, CDN and custom domain) |
| Framework | Astro 7, static output |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite`, tokens in `@theme` |
| Pages | `/` and `/press-kit/` |
| Language | English only, no language switcher |
| Music | HTML ledger linking out to SoundCloud/YouTube, no iframe |
| Facts | Verified only; all Stitch placeholder facts removed |
| Press kit | Own `/press-kit/` is the canonical EPK |
| Contact | `contact@ivnvmusic.com` only |
| Visual direction | Match the Stitch mockups; `DESIGN.md` rewritten to match the built site |
| Labels | 12px minimum for mono/UI labels |
| BPM | 138–148 |
| Artist role | DJ only (no "Producer") |
| OG image (press kit) | `Unplug_dancefloor.jpg`, cropped to 1200×630 |

### GitHub Pages security correction

GitHub Pages supports **Enforce HTTPS**, but it does **not** support custom HTTP response headers. There is no real HSTS or CSP header.

We will use:

- `<meta http-equiv="Content-Security-Policy">` for the directives that work in meta tags.
- `<meta name="referrer" content="strict-origin-when-cross-origin">`.
- No third-party JS, no iframe, no cookies, no server, no forms.

`frame-ancestors` cannot be set through a meta tag, so clickjacking protection is not enforceable. Risk is low because the site has no sensitive actions. If strict headers become a requirement later, put Cloudflare's DNS proxy in front of GitHub Pages without changing hosts.

---

## 2. Content rules

All published facts live in `src/data/`. Pages, JSON-LD, sitemap and `llms.txt` render from that single source. Do not duplicate facts in templates.

### Remove from the Stitch mockups

- Fake gigs: Moog Club, FOLD, Tresor, HÖR, BASIS.
- `management@` and `booking@` email addresses.
- Invented rider: DJM-A9, CDJ-3000, "4-channel professional mixer", etc.
- "18 sets", pagination and repeated placeholder rows.
- "Producer".
- "142 MB ZIP", vector logo downloads, seven-photo claims.
- Fake archive range "2021–2025".
- Remote `lh3.googleusercontent.com` images.
- Tailwind CDN and Material Symbols font.

### Confirmed facts

- Name: IVNV
- Role: DJ
- Based in Barcelona, Catalonia, Spain
- Primary genre: techno
- Genre tags:
  - Techno (Raw / Deep / Hypnotic)
  - Techno (Peak Time / Driving)
  - Minimal Techno
- BPM: 138–148
- Bio: the three paragraphs already published on the current site
- DARK & LOVELY: 15-episode recorded series, published on YouTube; SoundCloud playlist also exists
- Mad Cool DJ Talent 2026: Top 50 finalist, confirmed by the official YouTube upload
- Past appearances:
  - Fluxs — Barcelona
  - Lab65 by ELEKTR'ÂME — Barcelona
  - Unplug — Barcelona
  - Absenta del Raval — Barcelona
  - Can Luis Ob Rem — Barcelona
  - TechnoZulo — Barcelona (recorded set)
  - Private events — various locations across Catalonia
- No upcoming dates announced
- Contact: `contact@ivnvmusic.com`
- Official profiles:
  - https://www.ivnvmusic.com/
  - https://ra.co/dj/ivnv
  - https://soundcloud.com/ivnv_music
  - https://www.instagram.com/ivnv_music/
  - https://youtube.com/@ivnv_music

### Music source data (official YouTube and SoundCloud)

Channel: https://www.youtube.com/@ivnv_music
SoundCloud artist: https://soundcloud.com/ivnv_music
SoundCloud playlist: https://soundcloud.com/ivnv_music/sets/dark-lovely-episodes

| Published | Title | Link |
|---|---|---|
| 2026-10-06 | DARK & LOVELY — Episode 15 — Hypnotic, Groovy & Raw Techno (2+ Hours) | https://youtu.be/AQU4nSSr72A |
| 2026-08-30 | DARK & LOVELY — Episode 14 — Raw & hypnotic techno mix 2026 | https://youtu.be/FaDMr11b-3s |
| 2026-08-29 | DARK & LOVELY — Episode 13 — Peak-time techno mix 2026 | https://youtu.be/9gi5_VTngn4 |
| 2026-05-31 | DARK & LOVELY — Episode 12 — Hardgroove & hard techno mix 2026 | https://youtu.be/NZ5N96FXx_M |
| 2026-05-19 | Mad Cool DJ Talent 2026 (Top 50 Finalist) — Full Techno Set | https://youtu.be/uyyL-7FP7y8 |
| 2026-05-05 | DARK & LOVELY — Episode 10 — Raw, melodic & acid techno mix 2026 | https://youtu.be/_iO44f5zwN0 |
| 2026-04-26 | Mad Cool DJ Talent 2026 Submission | https://youtu.be/Znd6YWhm9OY |
| 2026-04-07 | DARK & LOVELY — Episode 11 — Hardgroove techno mix 2026 | https://youtu.be/s7dygnDCpVo |
| 2026-01-10 | DARK & LOVELY — Episode 9 — Raw, deep & hypnotic techno mix 2026 | https://youtu.be/5wtSI7fl8Rs |
| 2025-12-25 | DARK & LOVELY — Episode 8 — Psy-trance, trance & techno mix 2026 | https://youtu.be/xD0EjnCWpsE |
| 2025-12-10 | DARK & LOVELY — Episode 7 — Dark Peak-time techno mix 2025 | https://youtu.be/CTP0L20_714 |
| 2025-11-20 | DARK & LOVELY — Episode 6 — Melodic Peak-time techno mix 2025 | https://youtu.be/5f_wrjdWQQM |
| 2025-11-11 | DARK & LOVELY — Episode 5 | https://youtu.be/FJ5X_u_T0_w |
| 2025-10-05 | DARK & LOVELY — Episode 4 | https://youtu.be/Ro9npQZ6uqE |
| 2025-08-12 | DARK & LOVELY — Episode 3 | https://youtu.be/59txgydT7SQ |
| 2025-07-29 | DARK & LOVELY — Episode 2 | https://youtu.be/9svDrhVONpQ |
| 2025-07-23 | DARK & LOVELY — Episode 1 | https://youtu.be/hPo2Fl0Pdpg |

Notes:

- Episodes 10 and 11 were published out of numeric order. Keep the real dates; do not renumber.
- The home ledger and press-kit archive sort by publish date, newest first.
- Only verified entries go in the ledger. SoundCloud-only tracks must be checked against the artist page before adding them.

### Photo assets received

Location: `C:\DJ\Artwork\Pictures & Videos\Press Kit Pictures`

| File | Dimensions | Published caption | Notes |
|---|---|---|---|
| `Absenta del Raval.jpg` | 1500×2000 | Live at Absenta del Raval, Barcelona | 4:5 |
| `Oneira Party.jpg` | 1920×2560 | Private party | No public venue or city |
| `Slow BCN.jpg` | 2268×4032 | Private party, Barcelona | Organised by IVNV; tall 9:16 |
| `Unplug BCN.jpeg` | 900×1600 | Live at Unplug, Barcelona | Web use only, not print-ready |
| `Unplug_dancefloor.jpg` | 3024×4032 | Unplug dancefloor, Barcelona | Also the press-kit OG source |

- The grid renders them in the mockup's monochrome treatment; the downloadable originals stay in colour.
- No photographer credits will be published (confirmed).
- `Oneira Party` and `Slow BCN` were private events, not public club bookings. Keep the existing "Private Events — various locations across Catalonia" entry; do not add them as named public appearances.

---

## 3. Architecture

```
src/
  data/        site.ts, appearances.ts, music.ts
  lib/         schema.ts, format.ts, jsonld.ts, markdown.ts
  layouts/     BaseLayout.astro
  components/  SEO.astro, Header.astro, Footer.astro, MusicLedger.astro
  pages/       index.astro, press-kit/index.astro, 404.astro,
               llms.txt.ts, index.md.ts, press-kit.md.ts, sitemap.xml.ts
  styles/      global.css
public/        CNAME, robots.txt, .nojekyll, images/, favicon, js/menu.js,
               js/press-carousel.js
docs/          MIGRATION_PLAN.md, DEPLOYMENT.md
DESIGN.md      implementation-accurate design system
AGENTS.md      rewritten for the Astro workflow
.github/       deploy.yml, dependabot.yml
```

- No React/Vue/Svelte islands.
- Two small external scripts: the mobile menu and the press gallery (scroll-snap
  carousel + lightbox). No copy button yet.
- Fonts self-hosted with `@fontsource-variable`: Anybody, Inter, JetBrains Mono.
- Node 24. Scripts: `dev`, `build`, `preview`, `check`.

### Data model

`src/data/site.ts`
- URL, name, title, description, email, city, region, country, updated date
- social profiles (`sameAs`)
- genre tags
- bio paragraphs

`src/data/appearances.ts`
- venue, city, ISO date, external link, type (`club`, `recorded`, `private`)
- past events only

`src/data/music.ts`
- title, kind (`episode` / `contest` / `guest` / `mix`), series, episode number,
  published date, YouTube and/or SoundCloud links
- only verified entries: the 15 DARK & LOVELY episodes, the Mad Cool full set and
  submission, the Maximum Heat 2026 HÖR contest, the ALTERA071 and Transmissions
  presents IVNV #6 radio/podcast features, and three archive mixes

`src/data/press.ts`
- press photos (`PRESS_PHOTOS`: id, alt, published caption) for the gallery
- technical rider (`TECH_RIDER`: DJ mixer, players, monitoring specs)
- the press-kit hero photo is imported directly from `src/assets/press/`

---

## 4. Page scope

### Home

1. Header: wordmark, MUSIC, PRESS KIT, BOOKING & CONTACT. No language switcher.
2. Hero: H1 contains "IVNV" and "Techno DJ — Barcelona" so the keyword is in the H1, not only the title tag.
3. Verified bio, Mad Cool DJ Talent 2026 Top 50 finalist credential and primary CTAs.
4. Music ledger: the latest ten entries by release date (Episodes 15-13, ALTERA071, Episode 12, the Mad Cool full set, Episode 10, Transmissions presents IVNV #6, Episode 11 and the HÖR Maximum Heat contest), with separate YouTube/SoundCloud links. No iframe. TechnoZulo is in the appearances list, not the music ledger.
5. Selected appearances: the five dated venues, TechnoZulo and private events.
6. Booking and contact: email, social links.
7. Footer.

### Press kit

1. Fact card: DJ, Barcelona, genre tags, BPM 138–148, full bio, booking CTA.
   The copy-bio button is not implemented yet.
2. Music: a curated five-item selection (the `featured` flag on
   `src/data/music.ts`), linking out to YouTube and/or SoundCloud. `/press-kit.md`
   carries the same selection.
3. Photos: a five-photo press gallery — scroll-snap carousel with prev/next, shot
   labels, a counter and a fullscreen lightbox. Download links are deferred.
4. Technical rider: DJ mixer, players and monitoring specs.
5. Official profiles (socials).
6. Footer.

Empty states are deliberate: no upcoming dates, no fake ZIP download, no logo buttons.

---

## 5. SEO and AEO parity

Per page:

- Unique title, meta description, canonical, OG and Twitter tags.
- 1200×630 OG image with `og:image:alt`.
- One H1, semantic landmarks, internal links between the pages.
- 404 page and skip link.

JSON-LD:

- `MusicGroup` with stable `@id` and the same `sameAs` list as `llms.txt`.
- Past `MusicEvent`s with `startDate` and `endDate`. No fake upcoming events.
- `ProfilePage` and `BreadcrumbList` on the press kit.

Files:

- `robots.txt`: preserve the current policy verbatim, including Content-Signal, AI allow rules, SEO crawler blocks and the sitemap line.
- `sitemap.xml`: generated by a small Astro endpoint (`src/pages/sitemap.xml.ts`) so the existing URL stays intact; both URLs, `lastmod` from `SITE.updated`.
- `llms.txt`: generated endpoint from `src/data`, never hand-edited. Same structure and facts, updated URLs. Add BPM and the confirmed genre tags.
- `index.md` and `press-kit.md`: clean Markdown endpoints plus `<link rel="alternate" type="text/markdown">`. This closes the biggest measured AEO gap.

Routing:

- Canonical host `www.ivnvmusic.com`.
- `/index.html` canonicalizes to `/`.
- `/press-kit/` uses a trailing slash.

Post-launch:

- Submit the sitemap in Google Search Console and request indexing for `/press-kit/`.
- Re-run the AI SEO audit against the live site.

---

## 6. Design system

`DESIGN.md` becomes the implementation-accurate spec and documents two surface modes:

- **Editorial** — home: radius 0, 1px hairlines, no gradients, no shadows.
- **Dossier** — press kit: 12–16px radius, subtle gradients, blur overlays.

Tokens are defined once in `src/styles/global.css` via Tailwind `@theme`. Components must not hardcode hex values.

### Fidelity exceptions

These are functional or accessibility fixes, not aesthetic changes:

- Visible `:focus-visible` states.
- Esc, focus trap and focus return in the lightbox and mobile menu.
- `aria-expanded` on the menu button.
- Alt text and photo captions.
- Reduced-motion support.
- Material Symbols replaced with inline SVG.
- Mono labels at 12px minimum.

### Photography

- Grid: photos shown in original colour.
- Downloads: original colour files.
- Press-kit OG: colour crop of `Unplug_dancefloor.jpg`, 1200×630.

---

## 7. Performance budgets

Remove jQuery, Bootstrap, Owl Carousel, Magnific Popup, Animate.css and the Icomoon font. Expected saving: roughly 1 MB.

| Metric | Target |
|---|---|
| HTML | ≤ 40 KB per page |
| CSS | ≤ 25 KB |
| JS | ≤ 15 KB |
| Fonts | ≤ 120 KB |
| LCP (mobile) | ≤ 2.0 s |
| Lighthouse | ≥ 95 performance, ≥ 95 accessibility, 100 best practices, 100 SEO |

Images use Astro's pipeline: AVIF/WebP, responsive `srcset`, explicit dimensions, lazy loading below the fold, `fetchpriority="high"` on the hero.

Measured on the local production build (2026-11-05):

| Metric | Home | Press kit |
|---|---|---|
| HTML raw / gzip | 41.0 KB / 5.7 KB | 38.5 KB / 5.4 KB |
| CSS raw / gzip | 39.7 KB / 9.8 KB (shared) | same |
| JS raw / gzip | 388 B / 231 B | same |
| Latin font subsets | Anybody 24.0 KB + Inter 48.3 KB + JetBrains Mono 40.4 KB = 112.7 KB | same |
| Lighthouse mobile performance / a11y / best practices / SEO | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
| Mobile LCP / CLS / TBT | 0.8 s / 0.016 / 0 ms | 0.8 s / 0 / 10 ms |
| Mobile page weight | 323 KiB | 179 KiB |

The home HTML is marginally over the 40 KB raw guideline because of the JSON-LD and
the full home copy; its gzip transfer size is 5.7 KB. The CSS is over 25 KB raw but
9.8 KB gzip. Mobile Lighthouse was run locally with simulated throttling (Lighthouse
CLI, 2026-11-05); both pages score 100 in performance, accessibility, best practices
and SEO. Re-run against the live domain after cutover; the local 912px LCP was 160 ms.

---

## 8. Security

Static output removes the server attack surface. Remaining risks are account takeover and supply chain.

- 2FA on GitHub.
- Branch protection on `main`; PR-only changes.
- Least-privilege Actions permissions: `contents: read`, `pages: write`, `id-token: write`.
- Dependabot for npm and GitHub Actions.
- Committed lockfile; `npm ci` in CI.
- No secrets, env vars, analytics, cookies or third-party scripts.
- External links use `rel="noopener noreferrer"`.
- CSP via meta tag; external CSS and no inline scripts so the policy is meaningful.

If a contact form is added later, use a third-party form endpoint. Do not add a server.

---

## 9. Migration phases

| Phase | Work | Status |
|---|---|---|
| 0 | Final assets: technical rider | received |
| 1 | Scaffold Astro/Tailwind, tokens, fonts, base layout, SEO component; tag `pre-astro` on main | scaffold done; `pre-astro` tag created locally; push at cutover |
| 2 | Data layer, bios, JSON-LD, `llms.txt` generator | done |
| 3 | Home page, responsive, empty states | done |
| 4 | Press kit, photos, lightbox, copy button, rider | dossier, curated music selection, photo carousel + lightbox and rider done; copy button pending |
| 5 | Sitemap, robots, Markdown endpoints, OG images, 404 | done |
| 6 | QA: build, Lighthouse, schema, OG debuggers, links, keyboard, 375/768/1440 | build, mobile Lighthouse 100/100/100/100, responsive 390/768/1400, keyboard/menu and link checks done; live OG debuggers and post-deploy checks pending |
| 7 | Cutover: switch Pages source to GitHub Actions, merge, verify domain/HTTPS/canonical/sitemap, submit Search Console | pending |

### Cutover notes

1. Push the existing `pre-astro` tag (created locally on the legacy `main`) for rollback. If it does not exist, create it first.
2. Switch **Settings → Pages → Source** to **GitHub Actions** before or immediately after merging the Astro work.
3. The current site stays live until the new deploy succeeds.
4. Keep a branch pointing at the old static site until the new site has been live for a few days.
5. Verify `/`, `/press-kit/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `index.md`, `press-kit.md` and a 404.
6. Check `www` and apex redirects, HTTPS, canonical URLs and OG unfurls.

---

## 10. Acceptance criteria

- Every published fact is traceable to the current site, the confirmed answers above, or an official profile.
- `npm run build` is clean and produces both pages, 404, `llms.txt`, sitemap, robots and Markdown endpoints.
- JSON-LD validates; `sameAs` matches `llms.txt`; sitemap contains both URLs.
- No third-party requests, no iframe, no cookies.
- Keyboard-only pass; no horizontal scroll at 375px.
- Lighthouse targets met on both pages.
- Old site recoverable from the `pre-astro` tag.

---

## 11. Non-goals

No CMS, database, server, forms, auth, comments, i18n, analytics, React/Vue/Svelte, UI kit, Tailwind CDN, Google Fonts CDN or Stitch remote images.

---

## 12. Open items

1. **Technical rider** — done. Mixer, players and monitoring specs now live in
   `src/data/press.ts`.
2. **Press kit download packages / copy button** — deferred. The five-photo gallery
   + lightbox and the full rider are in; no fake ZIP/download buttons.
3. **Cutover** — push the existing `pre-astro` tag, merge to `main`, switch Pages to
   GitHub Actions, verify the live routes and custom domain, submit the sitemap to
   Search Console.
4. **Post-deploy performance check** — re-run Lighthouse against the live domain.
   The local simulated mobile run is 100 performance / 100 accessibility / 100
   best practices / 100 SEO.
5. **PowerShell** — `npm.ps1` is blocked on this machine. Use `npm.cmd`, or set the
   execution policy to `RemoteSigned`.
