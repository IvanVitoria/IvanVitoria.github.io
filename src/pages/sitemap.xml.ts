import type { APIRoute } from 'astro';

import { SITE } from '../data/site';

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/press-kit/', priority: '0.8' },
];

export const GET: APIRoute = () => {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${SITE.url}${page.path}</loc>
    <lastmod>${SITE.updated}</lastmod>
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
