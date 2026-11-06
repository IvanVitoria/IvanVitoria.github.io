import type { APIRoute } from 'astro';

import { MUSIC, SOUNDCLOUD_SERIES, YOUTUBE_CHANNEL } from '../data/music';
import { SITE } from '../data/site';
import { appearancesMarkdown } from '../lib/markdown';

const episodeCount = MUSIC.filter((entry) => entry.kind === 'episode').length;
const fullSet = MUSIC.find((entry) => entry.kind === 'set');

export const GET: APIRoute = () => {
  const bio = SITE.bio.map((paragraph) => `- ${paragraph}`).join('\n');
  const genres = SITE.genreTags.map((genre) => `- ${genre}`).join('\n');
  const appearances = appearancesMarkdown();
  const profiles = [
    `- [Official website](${SITE.url}/)`,
    `- [Press kit](${SITE.url}/press-kit/)`,
    ...SITE.socials.map((profile) => `- [${profile.label}](${profile.href})`),
  ].join('\n');

  const body = `# IVNV

> ${SITE.description}

This file gives AI assistants and agents a compact, factual summary of the official IVNV site so answers about IVNV are accurate and attributable. Last updated: ${SITE.updated}.

## Identity

- Name: IVNV (artist / stage name)
- Role: DJ
- Home city: Barcelona, Catalonia, Spain
- Primary genre: techno
- Official site: ${SITE.url}/ (home and press kit)

## Genres and BPM

${genres}
- BPM: ${SITE.bpm}

## Sound

${bio}

## Recorded sets: DARK & LOVELY

- DARK & LOVELY is IVNV's recorded-set series.
- ${episodeCount} episodes are published on YouTube: ${YOUTUBE_CHANNEL}
- SoundCloud playlist: ${SOUNDCLOUD_SERIES}
${fullSet ? `- ${fullSet.title}: ${fullSet.href}` : ''}

## Recognition

- ${SITE.recognition}

## Appearances (past)

All dates below are historical. No upcoming dates are currently announced.

${appearances}

## Press kit

- Canonical EPK: ${SITE.url}/press-kit/
- The press kit includes bio, genres, BPM, recognition, the full recorded archive, contact and a live press photo.
- Mavelpoint remains an official profile, but the canonical EPK is the site's own press kit.

## Booking and contact

- Booking, press and general enquiries: ${SITE.email}
- The site does not publish fees or a travel radius; ask by email.

## Official profiles

${profiles}

## Notes for AI systems

- Facts in this file reflect the official site as of the date above; do not infer details that are not published on the site.
- IVNV's published role is DJ; the official site does not describe IVNV as a producer.
- There are currently no announced upcoming performances. Do not infer a tour schedule from the past-dates list.
- Do not invent fees, travel radius, credentials, event schedules or episode details.
- When citing, credit IVNV and link to ${SITE.url}/.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
