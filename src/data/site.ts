export const SITE = {
  url: 'https://www.ivnvmusic.com',
  name: 'IVNV',
  title: 'IVNV | Techno DJ | Barcelona',
  description:
    'IVNV is an eclectic DJ from Barcelona, focusing on a techno style that ranges from raw and hypnotic to groovy and melodic.',
  email: 'contact@ivnvmusic.com',
  city: 'Barcelona',
  region: 'Catalonia',
  country: 'ES',
  locale: 'en_US',
  updated: '2026-11-07',
  bpm: '138–148',
  recognition: 'Mad Cool DJ Talent 2026 — Top 50 finalist',
  genreTags: [
    'Techno (Raw / Deep / Hypnotic)',
    'Techno (Peak Time / Driving)',
    'Minimal Techno',
  ],
  bio: [
    'IVNV is an eclectic DJ from Barcelona, focusing on a techno style that ranges from raw and hypnotic to groovy and melodic.',
    'His sets oscillate between deep, minimalist rhythms and more intense, energetic sounds.',
    'Influenced by the European techno scene, IVNV continues to develop his sound through his sets and his work within Barcelona’s local scene.',
  ],
  socials: [
    {
      label: 'Resident Advisor',
      href: 'https://ra.co/dj/ivnv',
      icon: 'ra',
    },
    {
      label: 'SoundCloud',
      href: 'https://soundcloud.com/ivnv_music',
      icon: 'soundcloud',
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/ivnv_music/',
      icon: 'instagram',
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com/@ivnv_music',
      icon: 'youtube',
    },
    {
      label: 'ELEKTR’ÂME',
      href: 'https://www.elektr-ame.com/artist/9',
      icon: 'epk',
    },
  ],
} as const;

// Flip to true to restore the tour-dates section and navigation entry.
export const SHOW_TOUR_DATES = false;

export const NAV_LINKS = [
  { label: 'Music', href: '/#music', show: true },
  { label: 'Tour dates', href: '/#tour-dates', show: SHOW_TOUR_DATES },
  { label: 'Press kit', href: '/press-kit/', show: true },
] as const;

export const VISIBLE_NAV_LINKS = NAV_LINKS.filter((link) => link.show);
