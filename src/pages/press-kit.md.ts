import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';

import pressPhoto from '../assets/press/unplug-dancefloor.jpg';
import { MUSIC, SOUNDCLOUD_SERIES, YOUTUBE_CHANNEL } from '../data/music';
import { SITE } from '../data/site';
import { musicMarkdown } from '../lib/markdown';

const episodeCount = MUSIC.filter((entry) => entry.kind === 'episode').length;
const fullSet = MUSIC.find((entry) => entry.kind === 'set');

export const GET: APIRoute = async () => {
  const image = await getImage({
    src: pressPhoto,
    width: 1280,
    format: 'webp',
    quality: 80,
  });
  const imageUrl = new URL(image.src, SITE.url).href;
  const profiles = SITE.socials
    .map((profile) => `- [${profile.label}](${profile.href})`)
    .join('\n');

  const body = `# IVNV — Press Kit

> Electronic press kit for IVNV, a techno DJ from Barcelona.

Last updated: ${SITE.updated}

## Artist

- Name: IVNV
- Role: DJ
- Based in: Barcelona, Catalonia, Spain
- BPM: ${SITE.bpm}

## Genres

${SITE.genreTags.map((genre) => `- ${genre}`).join('\n')}

## Bio

${SITE.bio.join('\n\n')}

## Recognition

- ${SITE.recognition}
${fullSet ? `- Official full set: ${fullSet.href}` : ''}

## Recorded sets: DARK & LOVELY

- ${episodeCount} episodes are published on YouTube.

${musicMarkdown()}

- SoundCloud playlist: ${SOUNDCLOUD_SERIES}
- YouTube channel: ${YOUTUBE_CHANNEL}

## Booking and press contact

- Email: ${SITE.email}
- Website: ${SITE.url}/
- Press kit: ${SITE.url}/press-kit/

## Official profiles

${profiles}

## Press photo

![IVNV performing to a crowd at Unplug in Barcelona](${imageUrl})
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
