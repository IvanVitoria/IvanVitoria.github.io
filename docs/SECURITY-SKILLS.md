# Security skills

Vendored copies of the product-security skills this repository uses, taken from
[RedHatProductSecurity/prodsec-skills](https://github.com/RedHatProductSecurity/prodsec-skills).

- Source commit: `b55c6b9c3392645f62da59a447c29473c413e371` (2026-07-15)
- Location: `.agents/skills/<id>/SKILL.md` — the cross-agent AgentSkills path.
  OpenCode, Claude Code and other harnesses discover it without extra config.
- Do not edit the copied files. Re-vendor from the pinned commit instead, so the
  upstream text stays auditable.

| Skill | Why it is here | License |
| --- | --- | --- |
| `client-side-security` | CSP, XSS, clickjacking, third-party scripts for the pages and the two JS files in `public/js/` | CC BY 4.0 — CoSAI Project CodeGuard |
| `http-security-headers` | Reviews the meta CSP emitted by `BaseLayout.astro`. GitHub Pages cannot set real response headers, so the HSTS/`frame-ancestors` guidance is informational only. | Apache-2.0 (prodsec-skills `ge-core`/`module`) |
| `dependency-vulnerability-audit` | CVE, license and dependency-health scans for the npm tree; pairs with Dependabot and `npm audit` in CI | Apache-2.0 |
| `supply-chain-risk-auditor` | Flags dependencies at risk of takeover (single/unknown maintainers) in a small lockfile | CC BY-SA 4.0 — Trail of Bits Skills Marketplace |
| `secrets-detection-patterns` | Self-contained pattern scan; the repo is public and the site publishes exactly one address | Apache-2.0 |
| `secure-by-design` | Secure-default and fail-closed review for config toggles and CI | Apache-2.0 |
| `ai-code-review` | Review checklist for AI-authored diffs, which is how most changes here are produced | Apache-2.0 |

`prodsec-skills` itself is Apache-2.0. The two adapted skills keep their upstream
`license` and `origin` frontmatter; adaptations of the Trail of Bits skill stay
under CC BY-SA 4.0. Attribution: Red Hat Product Security, CoSAI Project
CodeGuard and Trail of Bits.

Deliberately not vendored: the OAuth/MCP/Kubernetes/container/crypto/fuzzing
skills, and the server-side web ones (auth, sessions, uploads, databases). This
site has no server, no auth, no database and no user input.

## How the skills are used

Skills are advisory: the harness advertises them by `description` and the agent
loads one when it judges it relevant. The enforcement is separate and
deterministic — see the "Security review" section of `AGENTS.md`, the
`npm run check:security` script and `.github/workflows/security.yml`.
