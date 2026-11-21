## What changed

<!-- One or two sentences. Link the request if there is one. -->

## Security checklist

- [ ] No new third-party origin: scripts, styles, fonts, images and embeds stay self-hosted
- [ ] No new inline `<script>` or inline event handler; the JSON-LD hash in `BaseLayout.astro` is untouched
- [ ] External links use `target="_blank"` with `rel="noopener noreferrer"`
- [ ] `npm.cmd run build` is 0 errors / 0 warnings / 0 hints and `npm.cmd run check:security` passes
- [ ] Facts still come from `src/data/` (no duplicated content in templates); `SITE.updated` bumped if data changed
- [ ] No secrets, env vars, analytics, cookies or iframes added

## Validation

<!-- Desktop + 375px, keyboard focus, mobile menu open/close + Escape, internal/external links. -->
