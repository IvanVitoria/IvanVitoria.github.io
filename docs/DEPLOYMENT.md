# Deployment runbook

Production host: **GitHub Pages** at **https://www.ivnvmusic.com**.
Build: Astro static output in `dist/`, deployed by
`.github/workflows/deploy.yml` (GitHub Actions).

## Current state

- `main` serves the Astro build via GitHub Actions (cutover complete).
- The Pages source is **GitHub Actions**.
- The legacy root-level static files have been removed; they live on the
  `pre-astro` tag only.
- Keep the `pre-astro` tag permanently as the rollback point.

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

## Cutover (completed 2026-11-12)

The steps below document how the cutover was performed; keep them for reference.

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

The old site is recoverable from the `pre-astro` tag only (the legacy root files
have been removed from the working tree).

1. Revert the merge commit on `main`, or restore the legacy files from the tag
   (emergency only — this is the one documented exception to the PR rule):

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

**Done (2026-11-12).** The legacy root files were removed after the Actions deploy
was verified live:

1. Removed `index.html`, `css/`, `js/`, `sass/`, `fonts/`, `images/`, and the root
   `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`.
2. Kept `src/`, `public/`, `docs/`, `AGENTS.md`, `DESIGN.md`, the Astro config,
   package files and `.github/`.
3. Updated the migration notices in `AGENTS.md`, `README.md` and this document.
4. Kept the `pre-astro` tag in place.

If the legacy files are ever needed again, restore them from the tag:

```powershell
git checkout pre-astro -- index.html css js sass fonts images robots.txt sitemap.xml llms.txt CNAME
```

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

## Security gate and branch protection

Every change goes through a branch and a pull request. `main` is protected and is
the only branch that deploys.

- `.github/workflows/security.yml` runs on every pull request: gitleaks, `npm audit
  --audit-level=high`, `npm run build` and `npm run check:security`.
- `deploy.yml` calls the same workflow as a `security` job and `build` depends on
  it, so a direct push to `main` cannot publish a failing build.
- `scripts/check-security.mjs` encodes the site-specific rules: meta CSP present
  and unweakened, every inline script hash-matched, no third-party subresources,
  no iframes or inline handlers, HTTPS-only and `rel="noopener noreferrer"` on
  external links, no `set:html` outside the JSON-LD, no XSS sinks in `public/js/`.

One-time setup in GitHub → **Settings → Branches → Add branch protection rule**
for `main`:

1. Require a pull request before merging (1 approval is optional for a solo repo).
2. Require status checks to pass: select **Audit** (workflow **Security**).
3. Block force pushes and deletions.

That is the layer that holds for every agent and for local work, regardless of
which assistant produced the change.

If gitleaks reports a false positive, add a scoped allowlist in a `.gitleaks.toml`
instead of disabling the job.
