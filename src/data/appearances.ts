export interface Appearance {
  venue: string;
  city: string;
  date?: string;
  href?: string;
  type: 'club' | 'recorded' | 'private';
}

export const APPEARANCES: Appearance[] = [
  {
    venue: 'Fluxs',
    city: 'Barcelona',
    date: '2026-07-10T22:30:00+02:00',
    href: 'https://www.instagram.com/fluxs.bcn/',
    type: 'club',
  },
  {
    venue: 'Lab65 by ELEKTR’ÂME',
    city: 'Barcelona',
    date: '2026-04-24T19:30:00+02:00',
    href: 'https://www.instagram.com/lab65_barcelona/',
    type: 'club',
  },
  {
    venue: 'Unplug',
    city: 'Barcelona',
    date: '2026-03-20T23:30:00+01:00',
    href: 'https://unplug.es/',
    type: 'club',
  },
  {
    venue: 'Absenta del Raval',
    city: 'Barcelona',
    date: '2025-12-23T22:00:00+01:00',
    href: 'https://www.instagram.com/absentaraval/',
    type: 'club',
  },
  {
    venue: 'Can Luis Ob Rem',
    city: 'Barcelona',
    date: '2025-06-21T21:00:00+02:00',
    href: 'https://www.instagram.com/canluis.bcn/',
    type: 'club',
  },
  {
    venue: 'TechnoZulo',
    city: 'Barcelona',
    href: 'https://www.instagram.com/p/DXCm9YOu7G7/',
    type: 'recorded',
  },
  {
    venue: 'Private events',
    city: 'Various locations across Catalonia',
    href: 'https://www.instagram.com/p/DNvihIO2DF3/',
    type: 'private',
  },
];
