# IVNV — Design System

Implementation-accurate spec for the Astro site. Tokens live in
`src/styles/global.css` under Tailwind's `@theme`; components must use them rather
than hardcoding hex values.

The site has **two surface modes**: Editorial for the home page and Dossier for the
press kit. They share the same type, colour and spacing system.

## Brand

- **IVNV** — techno DJ from Barcelona.
- Tone: dark, direct, archival, club-literate. No lifestyle fluff.
- Verified facts only. The role is DJ, never producer.
- The wordmark is set in Anybody, uppercase, tight tracking.

## Modes

### Editorial — home

- Radius: **0** on sections, cards, rows, images and buttons.
- 1px hairlines (`--color-line`, `--color-line-strong`); grid gaps use the line
  colour as a visible rule.
- No gradients, no decorative shadows. The only shadow is the mobile menu overlay,
  used for separation from the page.
- Asymmetric 12-column hero: 7 columns of type, 5 of image.
- Music is a ledger, not a card grid: full-width rows with mono metadata.
- Photos are shown in original colour; no rounded corners.

### Dossier — press kit

- Radius: **12–16px** for cards and panels (`rounded-xl` = 12px,
  `rounded-2xl` = 16px); **8px** for the photo caption (`rounded-lg`).
- Subtle dark gradients: `from-surface-raised via-surface to-base`.
- The photo caption uses `bg-base/80` + `backdrop-blur-sm`.
- Same 12-column system, 6/6 split between the dossier card and the photo.
- The dossier card holds the artist facts (name, genres, BPM, full bio) with a
  booking CTA; the right column holds the photo and official profiles.

## Colour

| Token | Hex | Use |
|---|---|---|
| `base` | `#000000` | Page background, image frames |
| `panel` | `#1c0704` | Warm hover wash on editorial rows |
| `surface` | `#111111` | Dossier cards |
| `surface-raised` | `#161616` | Dossier gradient start, secondary buttons |
| `line` | `#2c2c2c` | Default hairlines and card borders |
| `line-strong` | `#595959` | Emphasised borders, table rules |
| `ink` | `#ffffff` | Headings, primary text, inverted buttons |
| `body` | `#d6d6d6` | Body copy |
| `muted` | `#9a9a9a` | Metadata, labels, secondary links |
| `ember` | `#e8320f` | Selection background, accent hairline |
| `glow` | `#ff6d11` | Primary accent: labels, bullets, hover, focus |

`line-strong` is for borders, not text. Use `muted` for small labels.

## Typography

| Role | Family | Notes |
|---|---|---|
| Display | Anybody Variable | H1, H2, wordmark, large numerals |
| Body | Inter Variable | Bio, descriptions, long copy |
| Mono | JetBrains Mono Variable | Labels, dates, metadata, buttons |

- Mono/UI labels: **12px minimum** (`text-xs`); do not go to 10–11px.
- Editorial H1: 84px mobile → 112px tablet → 132px desktop, `leading-[0.82]`,
  `tracking-[-0.03em]`, uppercase.
- Editorial H2: 40px → 48px, uppercase, tight tracking.
- Dossier H1: 56px → 72px → 88px. Dossier H2 (Music): 40px → 48px.
- Body: 14–17px with 1.6–1.65 line height.
- Uppercase mono labels use 0.12–0.18em tracking; body text uses normal case.
- Do not use all-caps for long copy.

## Layout

- Max content width: **1360px** (`max-w-page`).
- Page padding: 16px mobile, 32px tablet (`md`), 48px desktop (`lg`).
- Editorial hero: 12 columns; 7 type / 5 image at `lg`; stacked below.
- Press kit hero: 12 columns; 6 dossier / 6 photo at `lg`; stacked below.
- Credential strip: 2 columns below `lg`, 4 at `lg`; 1px gaps form the rules.
- Music ledger header/rows at `md`: `1.6fr / 1fr / 9rem / 8rem`; stacked below.
- Appearances rows at `md`: `9rem / minmax(0,1fr) / auto`; stacked below. The
  section is hidden while `SHOW_TOUR_DATES` is false.
- Booking: stacked below `lg`; 6/6 columns at `lg`.
- Footer: single column below `sm`; two columns at `sm`+; brand block to the left
  at `md`+.

## Components

### Header

- 64px tall, sticky, black, 1px bottom rule.
- Wordmark left; desktop nav right; booking is a bordered button that scrolls to
  the home page's booking section.
- Below `md`: native `<details>` mobile menu, full-width panel under the header.
- Current page gets `aria-current="page"` and `text-glow`.
- Mobile menu links are numbered dynamically (01–03 with tour dates hidden,
  01–04 when enabled).

### Buttons

- Editorial primary: white fill, black text, square, mono uppercase.
- Editorial secondary: transparent, 1px `line-strong`, square.
- Hover: border/text shifts to `glow`; no size or position jumps.
- Booking CTAs scroll to the home page's `#booking` section; the email actions
  inside that section remain `mailto:` links.

### Music ledger

- Rendered by `src/components/MusicLedger.astro`, shared by the home (latest 10
  entries) and the press kit (a featured five, flagged on `src/data/music.ts`).

- One row per recorded set; the row itself is not clickable.
- An orange dot leads every row. The title is a link to the primary platform:
  YouTube when both exist, otherwise SoundCloud.
- Separate YouTube and SoundCloud links where the set is published; labels stay
  visible instead of a generic “Watch”.
- Title (including “Episode N” for DARK & LOVELY), description, series, date and
  platform links.
- Series categories: DARK & LOVELY Episodes, Contests, Radio & Podcasts, Mixes.
  Third-party posts are Radio & Podcasts and link to the host’s page.
- Hairline separators; the platform links, not the row, carry the hover/focus
  state.
- No iframes, embeds, players or fake durations.

### Photo frames

- Editorial: 4:5 frame, 1px border, caption bar inside the bottom edge.
- Dossier: 4:3 frame, 12px radius, caption pill with blur.
- Always set width/height or an aspect ratio; hero images are eager with
  `fetchpriority="high"`; below-fold images are lazy.
- No photographer credits are published.

## Accessibility

- Visible `:focus-visible`: 2px `glow` outline, 3px offset.
- Header nav links use a 40px-high target (`py-3`); buttons and rows exceed the
  24px minimum. Lighthouse mobile target-size passes.
- Skip link to `#main`; `main` has `tabindex="-1"`.
- One H1 per page; sections use H2.
- External links include a visually hidden “(opens in a new tab)”.
- Contrast: body on black, muted labels at `#9a9a9a` or lighter, no
  `line-strong` text.
- Reduced motion: smooth scrolling and transitions collapse to ~0ms.
- Native `<details>` provides keyboard and screen-reader behaviour; the external
  `menu.js` only adds link-close and Escape. The press gallery is a scroll-snap
  carousel plus a fullscreen lightbox, driven by `press-carousel.js`.
- 404 page is `noindex, nofollow`.

## Content and empty states

- Tour dates are hidden while `SHOW_TOUR_DATES` is false. When enabled, the
  no-upcoming-dates state shows the message plus the booking email; the data and
  AI/Markdown outputs remain.
- No fake ZIP, rider, logo or photo-count claims.
- The press kit’s canonical EPK is `/press-kit/`; official profiles are Resident
  Advisor, SoundCloud, Instagram and YouTube.
- Only `contact@ivnvmusic.com` is published.
- The press kit has four section groups: the artist dossier (facts + photo +
  profiles), a curated music selection, a five-photo gallery with lightbox, and a
  technical-rider panel (DJ mixer, players, monitoring).
- The full DARK & LOVELY archive is 15 episodes; the home ledger shows the latest
  ten music entries, and the press kit plus the Markdown endpoints carry a
  featured five (hand-picked via the `featured` flag).

## Implementation map

- Tokens and base styles: `src/styles/global.css`
- Layout shell, CSP, fonts: `src/layouts/BaseLayout.astro`
- Metadata, OG/Twitter, JSON-LD: `src/components/SEO.astro`
- Header/nav: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Music ledger (shared): `src/components/MusicLedger.astro`
- Photo carousel script: `public/js/press-carousel.js`
- Editorial home: `src/pages/index.astro`
- Dossier press kit: `src/pages/press-kit/index.astro`
- 404: `src/pages/404.astro`
- Facts: `src/data/`
