import { APPEARANCES } from '../data/appearances';
import type { Appearance } from '../data/appearances';
import { MUSIC, musicDisplayTitle, musicPlatformLinks, musicSecondaryTitle } from '../data/music';
import type { MusicEntry } from '../data/music';

const typeLabels = {
  club: 'Club night',
  recorded: 'Recorded set',
  private: 'Private event',
} as const;

export function musicLine(entry: MusicEntry): string {
  const secondary = musicSecondaryTitle(entry);
  const title = secondary
    ? `${musicDisplayTitle(entry)}: ${secondary}`
    : musicDisplayTitle(entry);
  const series = entry.kind === 'episode' ? '' : ` (${entry.series})`;
  const links = musicPlatformLinks(entry)
    .map((link) => `[${link.label}](${link.href})`)
    .join(' · ');

  return `- ${title}${series} — ${links} — ${entry.published}`;
}

export function musicMarkdown(entries: MusicEntry[] = MUSIC): string {
  return entries.map(musicLine).join('\n');
}

export function appearanceLine(appearance: Appearance): string {
  const parts = [appearance.venue, appearance.city, typeLabels[appearance.type]];

  parts.push(appearance.date ? appearance.date.slice(0, 10) : 'date not published');

  return `- ${parts.join(' — ')}`;
}

export function appearancesMarkdown(): string {
  return APPEARANCES.map(appearanceLine).join('\n');
}
