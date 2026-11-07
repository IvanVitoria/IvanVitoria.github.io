export interface PressPhoto {
  id: string;
  alt: string;
  caption: string;
}

/**
 * Press photos used in the press-kit gallery, newest venue first. Captions are
 * published; no photographer credits are included. `oneira-party` and
 * `slow-bcn` were private events and keep generic captions.
 */
export const PRESS_PHOTOS: PressPhoto[] = [
  {
    id: 'unplug-dancefloor',
    alt: 'IVNV performing to a crowd at Unplug in Barcelona',
    caption: 'Unplug dancefloor, Barcelona',
  },
  {
    id: 'unplug-bcn',
    alt: 'IVNV performing at Unplug in Barcelona',
    caption: 'Live at Unplug, Barcelona',
  },
  {
    id: 'absenta-del-raval',
    alt: 'IVNV performing at Absenta del Raval in Barcelona',
    caption: 'Live at Absenta del Raval, Barcelona',
  },
  {
    id: 'slow-bcn',
    alt: 'IVNV at a private party in Barcelona',
    caption: 'Private party, Barcelona',
  },
  {
    id: 'oneira-party',
    alt: 'IVNV at a private party',
    caption: 'Private party',
  },
  {
    id: 'recording',
    alt: 'Recording session',
    caption: 'Recording',
  },
  {
    id: 'bridge',
    alt: 'Bridge',
    caption: 'Bridge',
  },
  {
    id: 'electric-power-plant',
    alt: 'Electric power plant',
    caption: 'Electric power plant',
  },
  {
    id: 'port',
    alt: 'Port',
    caption: 'Port',
  },
  {
    id: 'road',
    alt: 'Road',
    caption: 'Road',
  },
  {
    id: 'profile',
    alt: 'Profile portrait',
    caption: 'Profile',
  },
  {
    id: 'profile-2',
    alt: 'Profile portrait',
    caption: 'Profile II',
  },
];

export interface RiderItem {
  name: string;
  preferred?: boolean;
}

export interface RiderCard {
  title: string;
  note: string;
  items?: RiderItem[];
  description?: string;
}

export const TECH_RIDER: RiderCard[] = [
  {
    title: 'DJ Mixer',
    note: 'Networked via Link (LAN) switch to the CDJs',
    items: [
      { name: 'Pioneer DJM-A9', preferred: true },
      { name: 'Pioneer DJM-900NXS2' },
      { name: 'Allen & Heath Xone:96' },
      { name: 'Allen & Heath Xone:92' },
      { name: 'Pioneer DJM-750MK2' },
      { name: 'Pioneer DJM-450' },
    ],
  },
  {
    title: 'Players',
    note: 'Minimum 2x required (linked)',
    items: [
      { name: 'Pioneer CDJ-3000', preferred: true },
      { name: 'Pioneer CDJ-3000X' },
      { name: 'Pioneer CDJ-2000NXS2' },
      { name: 'Pioneer XDJ-1000MK2' },
    ],
  },
  {
    title: 'Monitoring',
    note: 'Minimum 1x required',
    description:
      'High-power stereo booth monitors with independent volume control directly from the mixer booth output.',
  },
];
