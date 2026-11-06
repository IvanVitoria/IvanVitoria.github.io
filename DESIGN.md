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
- Photos are grayscale with a slight contrast lift; no rounded corners.

### Dossier — press kit

- Radius: **12–16px** for cards and panels (`rounded-xl` = 12px,
  `rounded-2xl` = 16px); **8px** for buttons and the photo caption
  (`rounded-lg`).
- Subtle dark gradients: `from-surface-raised via-surface to-base`.
- The photo caption uses `bg-base/80` + `backdrop-blur-sm`.
- Same 12-column system, 6/6 split between the dossier card and the photo.
- The dossier reads as a document: fact card, at-a-glance cards, contact panel.

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
- Dossier H1: 36px → 48px. Dossier H2: 24px → 30px.
- Body: 14–17px with 1.6–1.65 line height.
- Uppercase mono labels use 0.12–0.18em tracking; body text uses normal case.
- Do not use all-caps for long copy.

## Layout

- Max content width: **1360px** (`max-w-page`).
- Page padding: 16px mobile, 32px tablet (`md`), 48px desktop (`lg`).
- Editorial hero: 12 columns; 7 type / 5 image at `lg`; stacked below.
- Press kit hero: 12 columns; 6 dossier / 6 photo at `lg`; stacked below.
- Credential strip: 2 columns below `lg`, 4 at `lg`; 1px gaps form the rules.
- Music ledger header/rows at `md`: `1.6fr / 1fr / 9rem / 6rem`; stacked below.
- Appearances rows at `md`: `9rem / minmax(0,1fr) / auto`; stacked below.
- Booking: stacked below `lg`; 6/6 columns at `lg`.
- Footer: single column below `sm`; three columns at `sm`+; brand block to the left
  at `md`+.

## Components

### Header

- 64px tall, sticky, black, 1px bottom rule.
- Wordmark left; desktop nav right; booking is a bordered button.
- Below `md`: native `<details>` mobile menu, full-width panel under the header.
- Current page gets `aria-current="page"` and `text-glow`.
- Mobile menu links are numbered 01–04.

### Buttons

- Editorial primary: white fill, black text, square, mono uppercase.
- Editorial secondary: transparent, 1px `line-strong`, square.
- Dossier primary: `glow` fill, black text, `rounded-lg`.
- Dossier secondary: `surface-raised`, `line-strong`, `rounded-lg`.
- Hover: border/text shifts to `glow`; no size or position jumps.

### Music ledger

- One link per row; entire row is clickable.
- Title + episode number, description, series, platform, date, “Watch ↗”.
- Hairline separators; hover wash `panel/40` and border `glow`.
- No iframes, embeds, players or fake durations.

### Photo frames

- Editorial: 4:5 frame, 1px border, grayscale `contrast-125`, caption bar inside
  the bottom edge.
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
  `menu.js` only adds link-close and Escape.
- 404 page is `noindex, nofollow`.

## Content and empty states

- No upcoming dates is a deliberate state: “No upcoming dates announced” plus the
  booking email.
- No fake ZIP, rider, logo or photo-count claims.
- The press kit’s canonical EPK is `/press-kit/`; Mavelpoint remains an official
  profile.
- Only `contact@ivnvmusic.com` is published.
- The full DARK & LOVELY archive is 15 episodes; the home ledger shows the latest
  six, and the press kit plus the Markdown endpoints carry the complete list.

## Implementation map

- Tokens and base styles: `src/styles/global.css`
- Layout shell, CSP, fonts: `src/layouts/BaseLayout.astro`
- Metadata, OG/Twitter, JSON-LD: `src/components/SEO.astro`
- Header/nav: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`
- Editorial home: `src/pages/index.astro`
- Dossier press kit: `src/pages/press-kit/index.astro`
- 404: `src/pages/404.astro`
- Facts: `src/data/`
