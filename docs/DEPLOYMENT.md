# Deployment runbook

Production host: **GitHub Pages** at **https://www.ivnvmusic.com**.
Build: Astro static output in `dist/`, deployed by
`.github/workflows/deploy.yml` (GitHub Actions).

## Current state

- `main` still serves the legacy root-level static site.
- The Astro app is on `new_website` and builds cleanly.
- The Pages source has **not** been switched to GitHub Actions yet.
- Do not delete the legacy files until the first successful Actions deploy.

## Preconditions

- Node 24 (`.nvmrc`) and npm.
- Repository admin access to **Settings → Pages**.
- The custom domain `www.ivnvmusic.com` and HTTPS are already configured.
- `package-lock.json` is committed.

Local check:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run preview
```

`npm.cmd run build` must finish with 0 errors, 0 warnings, 0 hints.

## Cutover

1. **Push the rollback tag.** The annotated `pre-astro` tag was created locally on
   the legacy `main`:

   ```powershell
   git push origin pre-astro
   ```

   If it is missing, create it from the last legacy commit first
   (`git tag -a pre-astro <legacy-commit> -m "Legacy static site before the Astro cutover"`).
   Keep the tag permanently.

2. **Merge the Astro branch.** Open a PR from `new_website` to `main`. Review the
   diff, then merge. The workflow triggers on the push to `main`, but Pages may
   still be serving the legacy branch until step 3.

3. **Switch the Pages source.** GitHub → **Settings → Pages → Build and
   deployment → Source: GitHub Actions**. Do this before or immediately after the
   merge. Do not change the custom domain.

4. **Wait for the deploy.** Actions → **Deploy to GitHub Pages**. The `build` job
   runs `npm ci`, `npm run build` (which includes `astro check`) and uploads
   `dist/`; the `deploy` job publishes it.

5. **Verify the domain.** If the custom domain field resets, set it back to
   `www.ivnvmusic.com` and keep **Enforce HTTPS** enabled. The build copies
   `public/CNAME` to `dist/CNAME`, but the repository Pages setting is the source
   of truth for the domain.

## Post-deploy verification

Open these URLs on the live domain:

| URL | Expected |
|---|---|
| `/` | Astro home page, HTTPS, canonical `https://www.ivnvmusic.com/` |
| `/press-kit/` | Press kit, canonical `https://www.ivnvmusic.com/press-kit/` |
| `/press-kit` | Redirects to `/press-kit/` (or at minimum resolves without a 404) |
| `/404.html` | Custom 404, `noindex, nofollow` |
| `/robots.txt` | Preserved crawler policy, `Sitemap: https://www.ivnvmusic.com/sitemap.xml` |
| `/sitemap.xml` | Both URLs, `lastmod` = `SITE.updated` |
| `/llms.txt` | Generated summary, `Last updated` line |
| `/index.md` | `text/markdown`, home content |
| `/press-kit.md` | `text/markdown`, press-kit content |
| `/images/og-ivnv.jpg` | 1200×630 home OG |
| `/images/og-press-kit.jpg` | 1200×630 press-kit OG |
| `/js/menu.js` | Mobile menu script |
| random path | 404 page, not a directory listing |

Also check:

- `www` and apex redirects; the canonical host stays `www`.
- HTTPS padlock and no mixed content.
- View source: one `<h1>`, canonical, `og:*`, `twitter:*`, JSON-LD, meta CSP.
- Browser console: no CSP violations, 404s or JavaScript errors.
- Mobile menu opens/closes, closes on link click and Escape.
- Keyboard-only pass: skip link, nav, mobile menu, all links, focus rings.
- 390px, 768px and 1400px layouts; no horizontal scroll.
- OG unfurls with the Facebook Sharing Debugger, LinkedIn Post Inspector and X
  card validator. The `og-press-kit.jpg` is a 1200×630 crop of
  `Unplug_dancefloor.jpg`.
- Google Search Console: submit `https://www.ivnvmusic.com/sitemap.xml` and request
  indexing for `/press-kit/`.
- Re-run the AI SEO audit against the live site.

## Rollback

The old site is recoverable from the `pre-astro` tag and, until it is removed, the
legacy root files.

1. Revert the merge commit on `main`, or restore the legacy files from the tag:

   ```powershell
   git checkout pre-astro -- index.html css js sass fonts images robots.txt sitemap.xml llms.txt CNAME
   git commit -m "Rollback to the pre-Astro site"
   git push origin main
   ```

2. GitHub → **Settings → Pages → Build and deployment → Source: Deploy from a
   branch** → `main` / root.

3. Verify `https://www.ivnvmusic.com/` and HTTPS. The custom domain setting should
   persist; reset it to `www.ivnvmusic.com` if needed.

The `pre-astro` tag is the reliable rollback. Do not delete it.

## Cleanup after the new site is stable

After the new site has been live for a few days and verified:

1. Remove the legacy root files: `index.html`, `css/`, `js/`, `sass/`, `fonts/`,
   `images/`, `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`.
2. Keep `src/`, `public/`, `docs/`, `AGENTS.md`, `DESIGN.md`, the Astro config,
   package files and `.github/`.
3. Remove the migration notice from `AGENTS.md` and update the status in this
   document.
4. Leave the `pre-astro` tag in place.

## Security notes

- GitHub Pages does not support custom HTTP response headers. The site uses a
  production-only `<meta http-equiv="Content-Security-Policy">` plus
  `<meta name="referrer">`. `frame-ancestors` cannot be set via meta; the site has
  no sensitive actions, so the clickjacking risk is low.
- The CSP allows the inline JSON-LD by a SHA-256 hash computed at build time. Do
  not add unhashed inline scripts; the mobile menu is an external file.
- The workflow uses least-privilege permissions: `contents: read`, `pages: write`,
  `id-token: write`. No repository secrets are required.
- Dependabot watches npm and GitHub Actions. Review its PRs; do not auto-merge.
- Keep 2FA on the GitHub account and branch protection/PR-only changes on `main`.
