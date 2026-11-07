export type MusicKind = 'episode' | 'contest' | 'guest' | 'mix';

export type MusicSeries =
  | 'DARK & LOVELY Episodes'
  | 'Contests'
  | 'Radio & Podcasts'
  | 'Mixes';

export interface MusicLinks {
  youtube?: string;
  soundcloud?: string;
}

export interface MusicEntry {
  id: string;
  title: string;
  series: MusicSeries;
  episode?: number;
  kind: MusicKind;
  published: string;
  links: MusicLinks;
}

export const SOUNDCLOUD_SERIES =
  'https://soundcloud.com/ivnv_music/sets/dark-lovely-episodes';

export const SOUNDCLOUD_TRACKS = 'https://soundcloud.com/ivnv_music/tracks';

export const YOUTUBE_CHANNEL = 'https://youtube.com/@ivnv_music';

/**
 * Recorded sets, newest first. DARK & LOVELY episodes appear on both YouTube
 * and SoundCloud; contest entries and guest mixes can be SoundCloud-only.
 * Episodes 10 and 11 were published out of numeric order; those are the real
 * release dates. Third-party posts are labelled Radio & Podcasts and link to
 * the host's page.
 */
export const MUSIC: MusicEntry[] = [
  {
    id: 'AQU4nSSr72A',
    title: 'Hypnotic, Groovy & Raw Techno (2+ Hours)',
    series: 'DARK & LOVELY Episodes',
    episode: 15,
    kind: 'episode',
    published: '2026-10-06',
    links: {
      youtube: 'https://youtu.be/AQU4nSSr72A',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-15',
    },
  },
  {
    id: 'FaDMr11b-3s',
    title: 'Raw & hypnotic techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 14,
    kind: 'episode',
    published: '2026-08-30',
    links: {
      youtube: 'https://youtu.be/FaDMr11b-3s',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-14',
    },
  },
  {
    id: '9gi5_VTngn4',
    title: 'Peak-time techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 13,
    kind: 'episode',
    published: '2026-08-29',
    links: {
      youtube: 'https://youtu.be/9gi5_VTngn4',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-13',
    },
  },
  {
    id: 'altera071-ivnv',
    title: 'ALTERA071: IVNV',
    series: 'Radio & Podcasts',
    kind: 'guest',
    published: '2026-06-03',
    links: {
      soundcloud: 'https://soundcloud.com/alteracollective/altera071-ivnv',
    },
  },
  {
    id: 'NZ5N96FXx_M',
    title: 'Hardgroove & hard techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 12,
    kind: 'episode',
    published: '2026-05-31',
    links: {
      youtube: 'https://youtu.be/NZ5N96FXx_M',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-12',
    },
  },
  {
    id: 'uyyL-7FP7y8',
    title: 'Mad Cool DJ Talent 2026 — Full set',
    series: 'Contests',
    kind: 'contest',
    published: '2026-05-19',
    links: {
      youtube: 'https://youtu.be/uyyL-7FP7y8',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-mad-cool-dj-talent-2026',
    },
  },
  {
    id: '_iO44f5zwN0',
    title: 'Raw, melodic & acid techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 10,
    kind: 'episode',
    published: '2026-05-05',
    links: {
      youtube: 'https://youtu.be/_iO44f5zwN0',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-10',
    },
  },
  {
    id: 'transmissions-ivnv-6',
    title: 'Transmissions presents IVNV #6',
    series: 'Radio & Podcasts',
    kind: 'guest',
    published: '2026-04-29',
    links: {
      soundcloud:
        'https://soundcloud.com/elektrame/transmissions-presents-ivnv-6',
    },
  },
  {
    id: 's7dygnDCpVo',
    title: 'Hardgroove techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 11,
    kind: 'episode',
    published: '2026-04-07',
    links: {
      youtube: 'https://youtu.be/s7dygnDCpVo',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-11',
    },
  },
  {
    id: 'maximum-heat-2026',
    title: 'Maximum Heat Contest 2026 | HÖR Berlin',
    series: 'Contests',
    kind: 'contest',
    published: '2026-04-07',
    links: {
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-maximum-heat-contest-2026-hoer-berlin',
    },
  },
  {
    id: '5wtSI7fl8Rs',
    title: 'Raw, deep & hypnotic techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 9,
    kind: 'episode',
    published: '2026-01-10',
    links: {
      youtube: 'https://youtu.be/5wtSI7fl8Rs',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-9',
    },
  },
  {
    id: 'xD0EjnCWpsE',
    title: 'Psy-trance, trance & techno mix 2026',
    series: 'DARK & LOVELY Episodes',
    episode: 8,
    kind: 'episode',
    published: '2025-12-25',
    links: {
      youtube: 'https://youtu.be/xD0EjnCWpsE',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-8',
    },
  },
  {
    id: 'CTP0L20_714',
    title: 'Dark peak-time techno mix 2025',
    series: 'DARK & LOVELY Episodes',
    episode: 7,
    kind: 'episode',
    published: '2025-12-10',
    links: {
      youtube: 'https://youtu.be/CTP0L20_714',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-7',
    },
  },
  {
    id: '5f_wrjdWQQM',
    title: 'Melodic peak-time techno mix 2025',
    series: 'DARK & LOVELY Episodes',
    episode: 6,
    kind: 'episode',
    published: '2025-11-20',
    links: {
      youtube: 'https://youtu.be/5f_wrjdWQQM',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-6',
    },
  },
  {
    id: 'FJ5X_u_T0_w',
    title: 'DARK & LOVELY — Episode 5',
    series: 'DARK & LOVELY Episodes',
    episode: 5,
    kind: 'episode',
    published: '2025-11-11',
    links: {
      youtube: 'https://youtu.be/FJ5X_u_T0_w',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-5',
    },
  },
  {
    id: 'Ro9npQZ6uqE',
    title: 'DARK & LOVELY — Episode 4',
    series: 'DARK & LOVELY Episodes',
    episode: 4,
    kind: 'episode',
    published: '2025-10-05',
    links: {
      youtube: 'https://youtu.be/Ro9npQZ6uqE',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-4',
    },
  },
  {
    id: '59txgydT7SQ',
    title: 'DARK & LOVELY — Episode 3',
    series: 'DARK & LOVELY Episodes',
    episode: 3,
    kind: 'episode',
    published: '2025-08-12',
    links: {
      youtube: 'https://youtu.be/59txgydT7SQ',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-3',
    },
  },
  {
    id: '9svDrhVONpQ',
    title: 'DARK & LOVELY — Episode 2',
    series: 'DARK & LOVELY Episodes',
    episode: 2,
    kind: 'episode',
    published: '2025-07-29',
    links: {
      youtube: 'https://youtu.be/9svDrhVONpQ',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-2',
    },
  },
  {
    id: 'hPo2Fl0Pdpg',
    title: 'DARK & LOVELY — Episode 1',
    series: 'DARK & LOVELY Episodes',
    episode: 1,
    kind: 'episode',
    published: '2025-07-23',
    links: {
      youtube: 'https://youtu.be/hPo2Fl0Pdpg',
      soundcloud:
        'https://soundcloud.com/ivnv_music/ivnv-presents-dark-lovely-episode-1',
    },
  },
  {
    id: 'lets-go-dancing-2025',
    title: "Let's go dancing — Tech-house mix",
    series: 'Mixes',
    kind: 'mix',
    published: '2025-04-02',
    links: {
      soundcloud:
        'https://soundcloud.com/ivnv_music/lets-go-dancing-by-ivnv-tech-house-mix-2025-04-02',
    },
  },
  {
    id: 'dark-and-slow-2025',
    title: 'Dark & Slow — Techno mix',
    series: 'Mixes',
    kind: 'mix',
    published: '2025-02-01',
    links: {
      soundcloud: 'https://soundcloud.com/ivnv_music/dark_and_slow_by_ivnv',
    },
  },
  {
    id: 'tormenta-electronica-2024',
    title: 'Tormenta Electrónica (Halloween Special Edition)',
    series: 'Mixes',
    kind: 'mix',
    published: '2024-10-30',
    links: {
      soundcloud:
        'https://soundcloud.com/ivnv_music/tormenta-electronica-special-halloween-edition-2024-10-31',
    },
  },
];

export const MAD_COOL_SET = MUSIC.find((entry) => entry.id === 'uyyL-7FP7y8');

export function musicDisplayTitle(entry: MusicEntry): string {
  return entry.kind === 'episode'
    ? `DARK & LOVELY — Episode ${entry.episode}`
    : entry.title;
}

export function musicSecondaryTitle(entry: MusicEntry): string | undefined {
  if (entry.kind !== 'episode') return undefined;
  return entry.title.startsWith('DARK & LOVELY') ? undefined : entry.title;
}

export function musicPrimaryHref(entry: MusicEntry): string | undefined {
  return entry.links.youtube ?? entry.links.soundcloud;
}

export function musicPlatformLinks(entry: MusicEntry): Array<{
  label: 'YouTube' | 'SoundCloud';
  href: string;
}> {
  const links: Array<{ label: 'YouTube' | 'SoundCloud'; href: string }> = [];

  if (entry.links.youtube) {
    links.push({ label: 'YouTube', href: entry.links.youtube });
  }
  if (entry.links.soundcloud) {
    links.push({ label: 'SoundCloud', href: entry.links.soundcloud });
  }

  return links;
}
