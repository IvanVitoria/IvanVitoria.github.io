export interface MusicEntry {
  id: string;
  title: string;
  series?: string;
  episode?: number;
  kind: 'episode' | 'set';
  published: string;
  href: string;
}

export const SOUNDCLOUD_SERIES =
  'https://soundcloud.com/ivnv_music/sets/dark-lovely-episodes';

export const YOUTUBE_CHANNEL = 'https://youtube.com/@ivnv_music';

/**
 * Official YouTube uploads only. Episodes 10 and 11 were published out of
 * numeric order; the dates below are the real upload dates.
 */
export const MUSIC: MusicEntry[] = [
  {
    id: 'AQU4nSSr72A',
    title: 'Hypnotic, Groovy & Raw Techno (2+ Hours)',
    series: 'DARK & LOVELY',
    episode: 15,
    kind: 'episode',
    published: '2026-10-06',
    href: 'https://youtu.be/AQU4nSSr72A',
  },
  {
    id: 'FaDMr11b-3s',
    title: 'Raw & hypnotic techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 14,
    kind: 'episode',
    published: '2026-08-30',
    href: 'https://youtu.be/FaDMr11b-3s',
  },
  {
    id: '9gi5_VTngn4',
    title: 'Peak-time techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 13,
    kind: 'episode',
    published: '2026-08-29',
    href: 'https://youtu.be/9gi5_VTngn4',
  },
  {
    id: 'NZ5N96FXx_M',
    title: 'Hardgroove & hard techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 12,
    kind: 'episode',
    published: '2026-05-31',
    href: 'https://youtu.be/NZ5N96FXx_M',
  },
  {
    id: 'uyyL-7FP7y8',
    title: 'Mad Cool DJ Talent 2026 (Top 50 Finalist) — Full Techno Set',
    kind: 'set',
    published: '2026-05-19',
    href: 'https://youtu.be/uyyL-7FP7y8',
  },
  {
    id: '_iO44f5zwN0',
    title: 'Raw, melodic & acid techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 10,
    kind: 'episode',
    published: '2026-05-05',
    href: 'https://youtu.be/_iO44f5zwN0',
  },
  {
    id: 's7dygnDCpVo',
    title: 'Hardgroove techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 11,
    kind: 'episode',
    published: '2026-04-07',
    href: 'https://youtu.be/s7dygnDCpVo',
  },
  {
    id: '5wtSI7fl8Rs',
    title: 'Raw, deep & hypnotic techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 9,
    kind: 'episode',
    published: '2026-01-10',
    href: 'https://youtu.be/5wtSI7fl8Rs',
  },
  {
    id: 'xD0EjnCWpsE',
    title: 'Psy-trance, trance & techno mix 2026',
    series: 'DARK & LOVELY',
    episode: 8,
    kind: 'episode',
    published: '2025-12-25',
    href: 'https://youtu.be/xD0EjnCWpsE',
  },
  {
    id: 'CTP0L20_714',
    title: 'Dark peak-time techno mix 2025',
    series: 'DARK & LOVELY',
    episode: 7,
    kind: 'episode',
    published: '2025-12-10',
    href: 'https://youtu.be/CTP0L20_714',
  },
  {
    id: '5f_wrjdWQQM',
    title: 'Melodic peak-time techno mix 2025',
    series: 'DARK & LOVELY',
    episode: 6,
    kind: 'episode',
    published: '2025-11-20',
    href: 'https://youtu.be/5f_wrjdWQQM',
  },
  {
    id: 'FJ5X_u_T0_w',
    title: 'DARK & LOVELY — Episode 5',
    series: 'DARK & LOVELY',
    episode: 5,
    kind: 'episode',
    published: '2025-11-11',
    href: 'https://youtu.be/FJ5X_u_T0_w',
  },
  {
    id: 'Ro9npQZ6uqE',
    title: 'DARK & LOVELY — Episode 4',
    series: 'DARK & LOVELY',
    episode: 4,
    kind: 'episode',
    published: '2025-10-05',
    href: 'https://youtu.be/Ro9npQZ6uqE',
  },
  {
    id: '59txgydT7SQ',
    title: 'DARK & LOVELY — Episode 3',
    series: 'DARK & LOVELY',
    episode: 3,
    kind: 'episode',
    published: '2025-08-12',
    href: 'https://youtu.be/59txgydT7SQ',
  },
  {
    id: '9svDrhVONpQ',
    title: 'DARK & LOVELY — Episode 2',
    series: 'DARK & LOVELY',
    episode: 2,
    kind: 'episode',
    published: '2025-07-29',
    href: 'https://youtu.be/9svDrhVONpQ',
  },
  {
    id: 'hPo2Fl0Pdpg',
    title: 'DARK & LOVELY — Episode 1',
    series: 'DARK & LOVELY',
    episode: 1,
    kind: 'episode',
    published: '2025-07-23',
    href: 'https://youtu.be/hPo2Fl0Pdpg',
  },
];
