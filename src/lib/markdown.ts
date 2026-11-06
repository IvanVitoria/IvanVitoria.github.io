import { APPEARANCES } from '../data/appearances';
import type { Appearance } from '../data/appearances';
import { MUSIC } from '../data/music';
import type { MusicEntry } from '../data/music';

const typeLabels = {
  club: 'Club night',
  recorded: 'Recorded set',
  private: 'Private event',
} as const;

export function musicLine(entry: MusicEntry): string {
  const title =
    entry.kind === 'episode'
      ? entry.title.startsWith('DARK & LOVELY')
        ? `DARK & LOVELY #${entry.episode}`
        : `DARK & LOVELY #${entry.episode} — ${entry.title}`
      : entry.title;

  return `- [${title}](${entry.href}) — ${entry.published}`;
}

export function musicMarkdown(): string {
  return MUSIC.map(musicLine).join('\n');
}

export function appearanceLine(appearance: Appearance): string {
  const parts = [appearance.venue, appearance.city, typeLabels[appearance.type]];

  parts.push(appearance.date ? appearance.date.slice(0, 10) : 'date not published');

  return `- ${parts.join(' — ')}`;
}

export function appearancesMarkdown(): string {
  return APPEARANCES.map(appearanceLine).join('\n');
}
