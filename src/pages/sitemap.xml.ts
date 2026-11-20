import type { APIRoute } from 'astro';

import { PAGE_UPDATED, SITE } from '../data/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/press-kit/', priority: '0.8' },
] as const;

export const GET: APIRoute = () => {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE.url}${page.path}</loc>
    <lastmod>${PAGE_UPDATED[page.path]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
