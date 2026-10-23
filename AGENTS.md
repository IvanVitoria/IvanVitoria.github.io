# AGENTS.md

Hand-authored static site for IVNV (Barcelona techno DJ), served by GitHub Pages from the repo root at https://www.ivnvmusic.com.

## What to know before touching anything

- **No build system.** No `package.json`, lockfile, CI, tests, linter, formatter, or typecheck. Files are served as-is.
- **`main` is production.** A push/merge to `main` goes live within minutes. Work lands via PRs into `main` (see git log).
- **Single page.** Only `index.html` exists. `js/main.js` is the only custom JS (jQuery IIFE using Owl Carousel + Waypoints); everything else in `js/` and `css/` is vendored libs.
- Repo history has a `backup_jekyll` branch, but the live site is plain static. Do **not** reintroduce Jekyll (`_config.yml`, Gemfile, `_posts`, etc.).

## Critical gotchas

- **Custom CSS lives at the bottom of `css/style.css`** (roughly line 1320+: `.ivnv-logo-large-bold`, `.sc-credit`, `.center-container`, `.cta-wrapper-*`, `.secondary-btn-custom`, `.section-bio`, `.list-no-style`, ...). These rules are **not** in `sass/style.scss`. Recompiling the SCSS **overwrites `css/style.css` and deletes them**. Prefer editing `css/style.css` directly; if you must recompile, re-append the custom block afterward.
- The social-icon rows and the CONTACT / VIEW PRESS KIT CTA blocks are **duplicated twice** in `index.html`. Update both when changing contact/social links.
- `css/style.css.map` exists but `style.css` has no `sourceMappingURL` comment, so it is effectively unused (the README's claim about it is inaccurate).

## Commands

- Preview locally: open `index.html` directly via `file://`. It renders but does not match production paths/OG behavior.
- Recompile SCSS (only when intended, see gotcha): `sass sass/style.scss css/style.css`. Bootstrap 3 partials live in `sass/bootstrap/` (~70 files), imported by `sass/bootstrap.scss`; also `sass/style.scss`.
- There is no test/verify command. Validate changes by loading the page in a browser.

## Editing notes

- Bootstrapped from a Colorlib template: `colorlib-*` class names, Bootstrap 3 grid (`col-md-*`), and the Icomoon icon font are all in use.
- SEO metadata is inline in `index.html` `<head>`: OG/Twitter tags plus a JSON-LD array of `MusicGroup` and `MusicEvent` objects. Adding a gig requires editing **both** the JSON-LD events and the "Selected Appearances" list in the body.
- `CNAME` pins the custom domain `www.ivnvmusic.com`; OG URLs use the `www.` host.
