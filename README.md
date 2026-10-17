# IVNV Music — Website

Static website for **IVNV** (electronic music / DJ project), served via GitHub Pages
at **https://www.ivnvmusic.com**.

## What this repo is

This is the production source for the IVNV music site. It is a hand-authored static
site (HTML + CSS + JavaScript) — there is no build step and no package manager. The
files in this repository are served directly by GitHub Pages, so whatever is on the
default branch is what visitors see at the live domain.

## Folder structure

```
.
├── index.html      # The single site page (HTML entry point)
├── css/            # Compiled / vendored stylesheets
│                   #   style.css (site styles + source map), bootstrap.css,
│                   #   animate.css, icomoon.css, magnific-popup.css,
│                   #   owl.carousel.min.css, owl.theme.default.min.css
├── js/             # JavaScript
│                   #   main.js (site behaviour), vendor libraries
│                   #   (jquery, bootstrap, owl.carousel, magnific-popup,
│                   #   modernizr, respond, waypoints, easing)
├── sass/           # SCSS sources (style.scss, bootstrap.scss + partials)
├── images/         # Site images (IVNV.png, etc.)
├── fonts/          # Web fonts (bootstrap, icomoon)
└── CNAME           # Custom domain for GitHub Pages: www.ivnvmusic.com
```

## Previewing locally

Because this is a plain static site, there is nothing to compile.

Open the page directly in a browser:

```
# Windows (from the repo root)
start index.html

# macOS
open index.html

# Linux
xdg-open index.html
```

Or serve it over HTTP (recommended, so relative paths and the custom-domain setup
behave like production):

```
python -m http.server 8000
# then open http://localhost:8000
```

Any static file server works — e.g. `npx serve .` if Node is available.

## Editing styles

`css/style.css` is what the site loads. If you change anything under `sass/`, you
must recompile it to `css/style.css` (e.g. with the Sass CLI) before the change
appears on the page. `css/style.css.map` links the compiled CSS back to the SCSS
sources for debugging.

## Deploying

Changes go live when they are merged/pushed to the branch GitHub Pages publishes
(typically `main`). No manual build or deploy step is required.
