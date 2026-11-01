---
target: "C:\\DJ\\stitch-brief.md"
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 4
p1_count: 1
target_identity: "file:C:\\DJ\\stitch-brief.md"
target_fingerprint: "sha256:e591ab92258e4b018e99bb002d0cccad19232c279ed3ee7be91ee1c82db2ed7b"
target_path: "C:\\DJ\\stitch-brief.md"
timestamp: 2026-10-31T12-47-54Z
slug: stitch-brief-md
---
# Critique — IVNV Stitch design brief (`C:\DJ\stitch-brief.md`)

Method: dual-agent (A: ses_e6e070f75ffeWiPtFtso4wuiV2 · B: ses_e6e070f74ffeXWyCgxVhxMs2bB)

Target under review: a 454-line design brief for a new Astro + Tailwind IVNV site, to be pasted into Google Stitch. The artifact is a brief, not a rendered interface, so heuristic scores describe the design the brief commits to. Assessment B's detector could not run on a Markdown brief; a baseline `impeccable detect` scan of the incumbent `index.html` was run instead (3 warnings + 1 advisory).

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Language switcher has no active/current state or defined behaviour; no feedback spec for the two "Copy" buttons |
| 2 | Match System / Real World | 3 | Domain vocabulary is right (BPM, rider, EPK, RA, SoundCloud); undermined by four names for the booking page |
| 3 | User Control and Freedom | 2 | Lightbox has a visual close but no Esc, no arrow paging, no focus return |
| 4 | Consistency and Standards | 1 | Four names for one page, three spellings of sub-genres, two titles for one release, 7 photos at two crops, "Bio" nav with no route |
| 5 | Error Prevention | 2 | §9 allowlist + §8 negative prompt are strong; then §3 orders duplicated rows and §7 leaves 4 of 5 FAQ answers to be invented |
| 6 | Recognition Rather Than Recall | 3 | Labels everywhere, icon-only nav explicitly banned; but no player means cross-tab recall |
| 7 | Flexibility and Efficiency | n/a | Experience surface — no task to accelerate |
| 8 | Aesthetic and Minimalist Design | 3 | The system is disciplined; empty states and dash-rows add non-content weight |
| 9 | Error Recovery | 2 | No 404, no redirect policy, no fallback for locales without content, no clipboard-failure path |
| 10 | Help and Documentation | n/a | Experience surface |
| **Total** | | **18/32** | **Acceptable (56%)** |

## Design Specificity Verdict

**LLM assessment**: The brief is exceptionally specific about *rules* and almost silent about *identity*. Its hardest commitments — 12 columns, 1280px max, 80px margin, radius 0, 1px `#2C2C2C` hairlines, 8px rhythm, 120px section padding — are numbers any site could adopt. Its only IVNV-specific material is a set of strings dropped into generic slots: six venue names, "DARK & LOVELY — EPISODE 14", "MAD COOL DJ TALENT 2026", "BPM 138–148". Swap the strings and the same 454 lines describe a Berlin, Lisbon or Tbilisi DJ with equal validity.

Nothing in the art direction derives from the artist's actual output. A fourteen-episode numbered series gets one card, one 28px title and an "artwork placeholder (square, 1:1)". The photography is pre-committed to "monochrome, high contrast" *before* the real photos are uploaded, so the photographic direction is a CSS filter rather than a response to the images. The palette's accent pair (`#0A0F2C` navy, `#3D5AFE` indigo) is the visual language of a SaaS dashboard, and the one asset that could have generated a unique accent — the series artwork — is explicitly a placeholder. "Editorial brutalism", "techno poster energy", "a printed club flyer crossed with a culture magazine" are category labels, not a direction: they name a genre of website, not this artist.

**Deterministic scan**: not applicable to a Markdown brief. Baseline on the incumbent `index.html`: 3 warnings (`undersized-ui-text` ×2 at 10px — `.sc-credit` at `css/style.css:1323` and the wordmark; `dark-glow` `#66afe9` from vendored Bootstrap at `css/bootstrap.css:3154`) and 1 advisory (`bounce-easing`). None of these are addressed by the brief; the brief's §0 replaces the 10px credit line with a 12–13px mono ramp, which does fix two of the three by construction.

**Verdict: hand this to 500 techno DJs and 500 valid sites come out — only the venue names would change.**

## Overall Impression

This is a better *specification* than most professional design briefs and a weaker *brief*. As a spec it is unusually rigorous: an enumerated fact allowlist, a negative prompt, explicit contrast rules, an empty-state-first IA, and a correct refusal to embed a SoundCloud iframe. As a brief it never answers the one question a design director asks first — what makes this artist's site not look like every other underground DJ's site? The single biggest opportunity: DARK & LOVELY has fourteen numbered episodes, and the brief uses the numeral "14" as a subtitle.

## What's Working

- **§9 "Fact sheet — the only facts allowed" + §8 negative prompt.** For an artist with zero upcoming dates, an invented date sends a stranger to a closed club door. The allowlist converts "don't hallucinate" from a wish into an auditable constraint, and it is why the empty state exists at all instead of a fabricated calendar.
- **§3 "There must be NO embedded player and NO iframe."** The incumbent's 300px SoundCloud iframe is the worst object on the current page — a third-party widget in `#a94442` red dropped onto a near-black layout, and a dead zone on a phone. Replacing it with real HTML text that survives translation, PDF export and text search is a durability decision.
- **§1 MULTI-LANGUAGE: same slugs, no flag icons, "design for the longest label".** The only place the brief thinks about the actual city the artist works in. Flags would be wrong for Catalan, and translated URLs would fragment the links a booker and RA actually share.

## Priority Issues

### [P0] The brief specifies a system, not an identity

- **What**: §1 ART DIRECTION gives "editorial brutalism / techno poster energy / printed club flyer crossed with a culture magazine". Every concrete instruction that follows is a rule (grid, radius, hairline, ramp) rather than a reference to IVNV's own material. §2 item 5 renders the flagship asset — a 14-episode series — as one card with an "artwork placeholder".
- **Why it matters**: this is the most saturated techno-artist look of 2024–2026, and §8's negative prompt (no gradients, no glow, no neon, no glassmorphism) pushes it further into the generic bucket. A booker comparing six DJs sees six identical black sites and has no reason to remember this one.
- **Fix**: derive one thing from the artist's actual output. Build Music as a DARK & LOVELY *ledger* — `01 … 14` as mono numerals, episode 14 as the live entry — and take the accent colour out of the series artwork instead of out of Tailwind's defaults.
- **Suggested command**: `$impeccable bolder`

### [P0] The AEO plan targets the wrong half of the measured report

- **What**: §10's AEO list is `llms.txt`, JSON-LD, `hreflang`, visible last-updated. The measured report for the live site (80/100) ranks the wins as: **"Support Markdown for Agents" — flagged critical, +5 pts, not implemented**; "`<main>`/`<article>`" +3.8 (already present in `index.html` at lines 208/213); "content-to-noise ratio" 5.2% +2.3; "more semantic HTML" +1.7. The brief addresses only the two the incumbent already does, and mentions `og:`, `canonical`, `sitemap`, `robots` zero times.
- **Why it matters**: the brief is written to beat an 80/100 and silently omits the largest single item. It also *removes* value: §10 says "`MusicEvent` (only upcoming — the site currently has five **past** events, which reads as dormant)" and "no events means no `MusicEvent` objects". Five verifiable venue+city+date associations would be deleted for nothing — structured data does not read as dormant to a crawler.
- **Fix**: emit `/music.md`, `/press.md`, `/dates.md` from the same content entries plus `/llms-full.txt` and `<link rel="alternate" type="text/markdown">`; keep past `MusicEvent` objects with `endDate`; set a numeric target (Semantic HTML ≥ 85, content-to-noise ≥ 15%, HTML ≤ 40 KB/page).
- **Suggested command**: `$impeccable harden`

### [P0] No mobile frame exists, and §8 forbids the only workable mobile navigation

- **What**: every screen prompt reads "Design the desktop Home screen…". The only mobile instructions in 454 lines are "24px mobile" (§0) and "1 mobile" for the photo grid (§5). §1 requires "6 nav links, language switcher right" in a sticky header; §8 bans "icon-only navigation" and specifies nothing in its place.
- **Why it matters**: a DJ's traffic arrives from Instagram. The hero's 8/4 split, the Press fact table's two columns, the Dates five-column table and the Music six-column table have no mobile behaviour at all — and the one device that carries most of the audience is the one never designed. §8 removes the hamburger and offers no alternative.
- **Fix**: design mobile first for Home, Dates and Book. Collapse the header to wordmark + a "Menu" *text* button opening a full-screen panel with the same links and the switcher (allowed by §8 — it bans icon-*only*, not a text overlay). Add per-screen collapse rules for every table and grid.
- **Suggested command**: `$impeccable adapt`

### [P0] The Music page contains no music, and asks Stitch to fake a table by duplicating rows

- **What**: §3 PURPOSE — "There must be NO embedded player and NO iframe. Playback happens on SoundCloud." §3 item 4 then asks for "6–8 total" rows when §9 supports exactly two, and instructs: "fill remaining rows with a repeated real entry dimmed, never with invented titles." The `duration` column has no data source in §9, so it must be invented.
- **Why it matters**: the fan who arrived from a mix cannot hear a second of audio on the artist's own site, and then scrolls a table where rows 3–8 are rows 1–2 repeated. On a phone that reads as a rendering bug. It is the one instruction in the brief that fabricates the *feeling* of content while obeying the letter of "no invented titles" — and duplicate rows are exactly what the AEO work is trying to avoid.
- **Fix**: delete the padding instruction; design the sparse state deliberately (as §2 and §6 do for zero dates). Make the two real items full-width editorial entries, and build the 14-episode ledger as the page instead of a 2-row table.
- **Suggested command**: `$impeccable distill`

### [P1] The fact sheet leaks unverified claims into four surfaces at once

- **What**: §9 claims "Anything not on this list must not appear in a design", then publishes facts that exist nowhere on the site or in `llms.txt`: **"Mad Cool DJ Talent 2026 — Top 50 finalist"** (zero grep hits in `index.html`, `llms.txt`, `sitemap.xml`), **"BPM 138–148"**, "DARK & LOVELY — Episode 14 / AUG 2026", and "available across Spain and Europe" — the last contradicting the published line "No travel radius or fee information is published publicly". Separately, §4 and §7 hardcode "Replies within 48 hours" while §11 lists response time as an open decision, and §10 prescribes `Person` with a real name while §11 lists that as an unresolved privacy call.
- **Why it matters**: `AGENTS.md` forbids `llms.txt` containing facts not on the page or an official profile. Each of these propagates simultaneously to the page, the JSON-LD, `llms.txt` and the PDF — one unverified claim, four machine-readable copies.
- **Fix**: move every unconfirmed item to §11 and gate all four surfaces on the answer; replace with `—` in the prompts. Note that §2 also mislabels three real gigs: it prints `"BARCELONA · 2026"` for all six rows, but Absenta del Raval is `2025-12-23` and Can Luis Ob Rem is `2025-06-21`, and TechnoZulo has no published date at all.
- **Suggested command**: `$impeccable clarify`

## Persona Red Flags

**Club/festival booker**
- §7 item 4: "Where a value is not confirmed, show an em dash '—' and keep the row" — Availability, Set length and Response time all render as `—`. Half the booking facts are holes.
- §4 item 7: the technical rider is designed as a definition list of em dashes. A promoter cannot advance a show without CDJ/mixer/headphones, and "Own headphones" is a *label asserting the requirement exists* with no value under it.
- §7 item 6: "Fee on request." A booker with a 40-artist shortlist does not send 40 emails to receive 40 non-answers.
- §7 item 2 asserts "available across Spain and Europe" while §11 lists availability as unresolved and §9 lists no travel radius.

**Journalist / press writer**
- §4 item 2: the page's largest type is "Press kit" 88px — a document label, not an angle. Both dated hooks (Apr 2026, Aug 2026) are stale at the brief's own date of 31 Oct 2026.
- §4 item 5: "SHORT BIO — 50 WORDS" is 45 words; "LONG BIO — 200 WORDS" is 83 words and four sentences, not four paragraphs. The two-column layout is sized for a length the copy never reaches.
- §4 item 8: seven tiles each requiring a "photographer credit line" while §11 marks credits unknown — the credits journalists are legally required to reproduce are empty slots.
- No one-line caption bio and no pronunciation of "IVNV"; the real name is an open decision, so a writer cannot open a sentence with "IVNV (…) is…".

**Fan arriving from an Instagram link on a phone**
- §3: the fan taps Music and cannot hear a single second; the site hands them a two-row table that opens SoundCloud in a new tab.
- No mobile screen exists. The hero's 8/4 split and 120px H1 have no mobile equivalent.
- §2 item 4: Home position 4 is "No dates announced yet." On a phone, hero + credential + empty state is roughly two screenfuls before any music.
- §8 bans icon-only navigation while §1 requires six links plus a three-way switcher at 375px.

## Minor Observations

- **The heuristic of the visual language is a 1.50:1 hairline.** `surface #2C2C2C` on `base #000000` measures **1.50:1**, not the "~1.7:1" the brief claims. Every card border, divider and the empty-state panel is a meaningful boundary well below the 3:1 floor in WCAG 1.4.11. The design system is built on rules most screens will barely show.
- **Contrast numbers in §0 are wrong in four places.** `body #D6D6D6` is 14.45:1 (brief says 13.2); `muted #9A9A9A` is 7.46:1 (says 6.4); `surface on base` is 1.50:1 (says ~1.7). And "NEVER put white text on #3D5AFE … it fails AA at 4.09:1" conflates two pairs: white **on** `#3D5AFE` is **5.13:1** and passes AA. The 4.09 figure is `#3D5AFE` **on black**. The rule can stand as a design choice, but its stated justification is false.
- **Two unvalidated pairs the brief's own designs create**: `accent-text #6B7CFF` on `surface #2C2C2C` = **3.96:1** (fails AA for text), and `accent-solid #3D5AFE` on `surface #2C2C2C` = **2.72:1** (fails 1.4.11). Only base and panel were checked.
- **The print variant inherits a dark-ground palette onto white.** §0 defines eight colours for a black ground only. `#9A9A9A` on white = **2.81:1**; `#D6D6D6` on white = **1.45:1**. The PDF is the artefact press actually receives and the one output where the whole token system inverts. Add a print token set.
- **Stitch cannot produce four of the eight things asked of it.** It emits one static frame per generation, so §5's "design the open state" lightbox, §3/§4's hover states and §7's "answer when expanded" accordion have no frame. "Everything else inherits from it" (How-to-use 2) is not how Stitch works — it shares a theme, not components, so five prompts that say only "1. Header with language switcher" will drift. The print variant cannot live in a black-themed project. And Stitch emits hardcoded arbitrary Tailwind values, not `tailwind.config.mjs` tokens, so §10's "never hardcode hex" is hand-work, not generated work.
- **§10 omits the entire `<head>`.** `og:`, `canonical`, `sitemap`, `robots`, `description` appear zero times, though `index.html` currently has all of them plus a 1200×630 `og-ivnv.jpg`. A rebuild that drops the OG block regresses every Instagram, WhatsApp and RA share.
- **§10 drops a real profile.** §9 lists five profile URLs; `llms.txt:55` and the JSON-LD `sameAs` carry six, including `https://www.elektr-ame.com/artist/9`. `AGENTS.md` requires those lists to match.
- **Per-language `llms.txt` is the wrong call.** `llms.txt` is a root-level convention; `/es/llms.txt` will not be discovered. It also conflicts with `AGENTS.md`, which defines the file as hand-maintained in the same commit as the page. One root file plus `llms-full.txt` is correct.
- **`hreflang` triples on six pages will dilute.** 6 routes × 3 locales = 18 URLs of which at most 6 have unique content, and no `/es` or `/ca` directory exists today — so the triples would point at 404s. Ship EN only and add `hreflang` per page as translations land.
- **The language switcher's default behaviour is a 404.** Nothing says what a click does when the page has no translation, whether the choice persists, or what renders for an unbuilt locale.
- **Smaller contradictions**: "Bio" is a nav item with no route (§2 vs §10); the booking page is called Booking, "Book IVNV", "Contact" and `/contact`; sub-genres are spelled three ways and "Peak Time / Driving" appears in no current source; 7 photos at "3 across" leaves an orphan row with no rule; press photos are "4:5 portrait" in §4 but "mixed 4:5 and 3:2" in §5, against §4's own note "Do not crop the portrait"; the Dates row "Private events across Catalonia (2025)" has no date for a table that requires one; §10's route list has no `/bio` and no `/listen` while §11 asks whether `/listen` is wanted.
- **§10 lists `<main>`, `<nav>`, `<article>`, `<section>` as work to do, but `index.html` already has all four** (lines 196, 197, 208, 213, 263, 277, 352). The measured gap is the 4-vs-26 ratio, not their absence. The brief needs a structural budget ("zero layout divs; ≥ 60% semantic elements"), not a landmark list.

## Questions to Consider

1. DARK & LOVELY has fourteen episodes. Why is "14" a subtitle on a card instead of the largest numeral on the site — and what would this look like if the site were built as a ledger of the series, with bio, dates and booking hanging off it?
2. Which single screen would a booker screenshot and forward to a venue programmer? If it's the press kit, why does that path run through three em dashes and a "Fee on request"?
3. Six venues, all in Barcelona, in two years. Is the story "part of Barcelona's local scene" — which the bio already says twice — or "six rooms in one city"? Which of those would you set at 120px?
4. If the site refuses to play audio, is it a portfolio or a business card? What changes if the Home hero's primary action is "Play Episode 14"?
5. The palette was chosen before the real photographs were uploaded and while the series artwork was still a placeholder. Should the one accent colour come out of artwork you already own rather than out of Tailwind's defaults?
