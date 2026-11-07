import type { APIRoute } from 'astro';
import { getImage } from 'astro:assets';

import pressPhoto from '../assets/press/unplug-dancefloor.jpg';
import { FEATURED_MUSIC, SOUNDCLOUD_TRACKS, YOUTUBE_CHANNEL } from '../data/music';
import { PRESS_PHOTOS, TECH_RIDER } from '../data/press';
import { SITE } from '../data/site';
import { musicMarkdown } from '../lib/markdown';

const riderMarkdown = TECH_RIDER.map((card) => {
  const detail = card.items
    ? card.items
        .map((item) => `${item.name}${item.preferred ? ' (preferred)' : ''}`)
        .join(', ')
    : card.description;

  return `- **${card.title.toUpperCase()}** — ${card.note.toUpperCase()}: ${detail}`;
}).join('\n');

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

## Official profiles

${profiles}

## Press photo

![IVNV performing to a crowd at Unplug in Barcelona](${imageUrl})

## Music

${musicMarkdown(FEATURED_MUSIC)}

- SoundCloud tracks: ${SOUNDCLOUD_TRACKS}
- YouTube channel: ${YOUTUBE_CHANNEL}

## Pictures

${PRESS_PHOTOS.map((photo) => `- ${photo.caption}`).join('\n')}

## Technical rider

${riderMarkdown}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};
