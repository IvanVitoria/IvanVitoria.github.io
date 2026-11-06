import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';

import heroImage from '../assets/press/slow-bcn.jpg';
import { SOUNDCLOUD_SERIES, YOUTUBE_CHANNEL } from '../data/music';
import { SITE } from '../data/site';
import { appearancesMarkdown, musicMarkdown } from '../lib/markdown';

export const GET: APIRoute = async () => {
  const image = await getImage({
    src: heroImage,
    width: 960,
    format: 'webp',
    quality: 80,
  });
  const imageUrl = new URL(image.src, SITE.url).href;
  const profiles = SITE.socials
    .map((profile) => `- [${profile.label}](${profile.href})`)
    .join('\n');

  const body = `# ${SITE.name} — Techno DJ, Barcelona

> ${SITE.description}

Last updated: ${SITE.updated}

## Bio

${SITE.bio.join('\n\n')}

## Genres and BPM

${SITE.genreTags.map((genre) => `- ${genre}`).join('\n')}
- BPM: ${SITE.bpm}

## Recognition

- ${SITE.recognition}

## Recorded sets and transmissions

${musicMarkdown()}

- SoundCloud playlist: ${SOUNDCLOUD_SERIES}
- YouTube channel: ${YOUTUBE_CHANNEL}

## Selected appearances

All dates are historical. No upcoming dates are currently announced.

${appearancesMarkdown()}

## Booking and contact

- Email: ${SITE.email}
- Press kit: ${SITE.url}/press-kit/
- Based in Barcelona, Catalonia.

## Official profiles

${profiles}

## Image

![IVNV performing live at a private party in Barcelona](${imageUrl})
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
