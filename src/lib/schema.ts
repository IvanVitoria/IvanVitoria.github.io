import { APPEARANCES } from '../data/appearances';
import { SITE } from '../data/site';

export const ARTIST_ID = `${SITE.url}/#artist`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export function musicGroupSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    '@id': ARTIST_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}/images/og-ivnv.jpg`,
    genre: [...SITE.genreTags],
    award: SITE.recognition,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    sameAs: SITE.socials.map((profile) => profile.href),
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en',
    publisher: { '@id': ARTIST_ID },
  };
}

export function eventSchemas(): Record<string, unknown>[] {
  return APPEARANCES.filter((appearance) => appearance.date).map((appearance) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `IVNV at ${appearance.venue}`,
    startDate: appearance.date,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: appearance.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: appearance.city,
        addressCountry: SITE.country,
      },
    },
    performer: { '@id': ARTIST_ID },
  }));
}

export function profilePageSchema(url: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    name: `${SITE.name} — Press Kit`,
    inLanguage: 'en',
    about: { '@id': ARTIST_ID },
    mainEntity: { '@id': ARTIST_ID },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
