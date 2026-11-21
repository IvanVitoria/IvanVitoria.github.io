#!/usr/bin/env node
/**
 * Security invariants for the built site.
 *
 * Run after `npm run build`:  npm run check:security
 *
 * The production site is static and deliberately locked down (see AGENTS.md):
 * no third-party scripts, no iframes, no analytics, no unhashed inline scripts,
 * and a meta CSP emitted by `BaseLayout.astro`. Those rules are prose in
 * AGENTS.md; this script turns the ones that can be checked mechanically into a
 * failing build so a change cannot silently weaken them.
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = join(process.cwd(), 'dist');
const JS_DIR = join(process.cwd(), 'public', 'js');
const SRC_DIR = join(process.cwd(), 'src');
const SITE_HOSTS = new Set(['ivnvmusic.com', 'www.ivnvmusic.com']);
const SUBRESOURCE_TAGS =
  /<(script|link|img|source|iframe|embed|object|video|audio)\b[^>]*>/gi;
const URL_ATTRS = ['src', 'href', 'data', 'poster', 'srcset'];

/** @type {Map<string, string[]>} */
const problems = new Map();

function fail(file, message) {
  const list = problems.get(file) ?? [];
  list.push(message);
  problems.set(file, list);
}

function walk(dir, extension, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, extension, out);
    else if (entry.endsWith(extension)) out.push(full);
  }
  return out;
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? (match[1] ?? match[2]) : null;
}

/** Classify a URL found in an attribute of the built HTML. */
function classify(url) {
  if (!url || url.startsWith('#')) return 'fragment';
  if (url.startsWith('data:')) return 'data';
  if (url.startsWith('mailto:')) return 'mail';
  if (url.startsWith('//')) return 'external';
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return 'invalid';
    }
    if (parsed.protocol !== 'https:') return 'insecure';
    return SITE_HOSTS.has(parsed.hostname) ? 'self' : 'external';
  }
  return 'local';
}

function parseCsp(html, file) {
  const meta = html.match(/<meta\b[^>]*http-equiv\s*=\s*["']?Content-Security-Policy["']?[^>]*>/i);
  if (!meta) {
    fail(file, 'missing <meta http-equiv="Content-Security-Policy"> (production CSP)');
    return null;
  }
  const content = attr(meta[0], 'content');
  if (!content) {
    fail(file, 'CSP meta tag has no content attribute');
    return null;
  }
  const directives = new Map();
  for (const part of content.split(';')) {
    const [name, ...values] = part.trim().split(/\s+/);
    if (name) directives.set(name.toLowerCase(), values);
  }
  return { content, directives };
}

function checkCsp(file, csp) {
  const { directives } = csp;
  const defaultSrc = directives.get('default-src');
  if (!defaultSrc?.includes("'self'")) fail(file, "CSP default-src must include 'self'");
  if (directives.get('object-src')?.join(' ') !== "'none'")
    fail(file, "CSP must keep object-src 'none'");
  if (!directives.has('base-uri')) fail(file, "CSP must keep base-uri 'self'");
  if (!directives.has('upgrade-insecure-requests'))
    fail(file, 'CSP must keep upgrade-insecure-requests');

  const scriptSrc = directives.get('script-src');
  if (!scriptSrc) {
    fail(file, 'CSP must declare an explicit script-src');
    return;
  }
  if (!scriptSrc.includes("'self'"))
    fail(file, "CSP script-src must include 'self'");
  for (const token of scriptSrc) {
    const value = token.toLowerCase();
    if (value === "'unsafe-inline'" || value === "'unsafe-eval'" || value === "'strict-dynamic'")
      fail(file, `CSP script-src must not contain ${token}`);
    if (value === '*' || value === 'http:' || value === 'https:')
      fail(file, `CSP script-src must not use the wildcard scheme ${token}`);
    if (/^https?:\/\//.test(value))
      fail(file, `CSP script-src must not allow a remote origin: ${token}`);
  }
}

function checkInlineScripts(html, file, csp) {
  const scriptSrc = csp?.directives.get('script-src') ?? [];
  const hashes = new Set(
    scriptSrc.filter((token) => /^'sha(256|384|512)-/.test(token)).map((token) => token.slice(1, -1)),
  );
  const scripts = html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);
  let count = 0;
  for (const [, attrs, body] of scripts) {
    if (attrs && /\ssrc\s*=/i.test(attrs)) continue;
    if (!body.trim()) continue;
    count += 1;
    const digest = `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}`;
    if (!hashes.has(digest))
      fail(
        file,
        `inline <script> is not allowed by the CSP hash (expected '${digest}'). ` +
          'Do not add inline scripts; hashes are computed in BaseLayout.astro for the JSON-LD only.',
      );
  }
  if (count === 0) return;
  for (const hash of hashes) {
    const present = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)].some(
      ([, attrs, body]) =>
        attrs && !/\ssrc\s*=/i.test(attrs) && body.trim() &&
        `sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}` === hash,
    );
    if (!present) fail(file, `CSP allows '${hash}' but no matching inline script exists (stale hash)`);
  }
}

function checkSubresources(html, file) {
  for (const [tag] of html.matchAll(SUBRESOURCE_TAGS)) {
    const name = tag.match(/^<([a-z]+)/i)[1].toLowerCase();
    if (name === 'iframe') fail(file, 'iframes are not allowed (no third-party embeds)');
    if (name === 'script' && !attr(tag, 'src')) continue; // inline scripts: hash-checked above
    for (const key of URL_ATTRS) {
      const value = attr(tag, key);
      if (!value) continue;
      const urls = key === 'srcset'
        ? value.split(',').map((candidate) => candidate.trim().split(/\s+/)[0])
        : [value];
      for (const url of urls) {
        const kind = classify(url);
        if (kind === 'external')
          fail(file, `<${name} ${key}> loads a third-party origin: ${url}`);
        if (kind === 'insecure') fail(file, `<${name} ${key}> uses a non-HTTPS URL: ${url}`);
        if (kind === 'invalid') fail(file, `<${name} ${key}> has an unparsable URL: ${url}`);
      }
    }
  }
}

function checkAnchors(html, file) {
  for (const [tag] of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = attr(tag, 'href');
    if (!href) continue;
    const kind = classify(href);
    if (kind === 'insecure') fail(file, `<a href> uses a non-HTTPS URL: ${href}`);
    if (kind !== 'external') continue;
    if (attr(tag, 'target') !== '_blank')
      fail(file, `external link is missing target="_blank": ${href}`);
    const rel = (attr(tag, 'rel') ?? '').toLowerCase().split(/\s+/);
    if (!rel.includes('noopener') || !rel.includes('noreferrer'))
      fail(file, `external link is missing rel="noopener noreferrer": ${href}`);
  }
}

function checkInlineHandlers(html, file) {
  const withoutCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  for (const [tag] of withoutCode.matchAll(/<[a-z][^>]*>/gi)) {
    const handler = tag.match(/\son[a-z]+\s*=/i);
    if (handler) fail(file, `inline event handler is not allowed: ${handler[0].trim()}`);
  }
}

function checkPublicScripts() {
  if (!existsSync(JS_DIR)) return;
  const forbidden = [
    [/\binnerHTML\b/, 'innerHTML'],
    [/\bouterHTML\b/, 'outerHTML'],
    [/\binsertAdjacentHTML\b/, 'insertAdjacentHTML'],
    [/\bdocument\.write\b/, 'document.write'],
    [/\beval\s*\(/, 'eval()'],
    [/\bnew\s+Function\s*\(/, 'new Function()'],
    [/\bsrcdoc\b/, 'srcdoc'],
  ];
  for (const file of walk(JS_DIR, '.js')) {
    const source = readFileSync(file, 'utf8');
    for (const [pattern, label] of forbidden)
      if (pattern.test(source))
        fail(relative(process.cwd(), file), `${label} is an XSS sink; build nodes with textContent/DOM APIs`);
  }
}

function checkAstroSources() {
  if (!existsSync(SRC_DIR)) return;
  for (const extension of ['.astro', '.ts', '.js']) {
    for (const file of walk(SRC_DIR, extension)) {
      const source = readFileSync(file, 'utf8');
      const total = (source.match(/\bset:html\s*=/g) ?? []).length;
      if (total === 0) continue;

      // The single allowed use is the JSON-LD payload in SEO.astro. It is safe
      // because the built page is hash-checked against the CSP above; any other
      // set:html bypasses Astro's escaping and is rejected.
      let allowed = 0;
      for (const [tag] of source.matchAll(/<script\b[^>]*>/gi)) {
        if (!/type=["']application\/ld\+json["']/i.test(tag)) continue;
        allowed += (tag.match(/\bset:html\s*=/g) ?? []).length;
      }

      if (total > allowed)
        fail(
          relative(process.cwd(), file),
          'set:html() bypasses Astro escaping; only the hashed JSON-LD <script> may use it',
        );
    }
  }
}

if (!existsSync(DIST)) {
  console.error('check-security: dist/ is missing. Run `npm run build` first.');
  process.exit(1);
}

const pages = walk(DIST, '.html');
for (const page of pages) {
  const file = relative(process.cwd(), page);
  const html = readFileSync(page, 'utf8');
  const csp = parseCsp(html, file);
  if (csp) {
    checkCsp(file, csp);
    checkInlineScripts(html, file, csp);
  }
  checkSubresources(html, file);
  checkAnchors(html, file);
  checkInlineHandlers(html, file);
}

checkPublicScripts();
checkAstroSources();

if (problems.size > 0) {
  console.error('check-security: failed\n');
  for (const [file, messages] of problems) {
    console.error(`  ${file}`);
    for (const message of messages) console.error(`    - ${message}`);
  }
  console.error(`\n${[...problems.values()].flat().length} problem(s) found.`);
  process.exit(1);
}

console.log(`check-security: ${pages.length} page(s) checked, no problems found.`);
