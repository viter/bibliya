const VERSE_LINE_PATTERN = /^(\d+)\.?\s+(.*)$/;

export interface ParsedVerse {
  num: string;
  content: string;
}

export function parseVerseLine(line: string): ParsedVerse | null {
  const match = line.match(VERSE_LINE_PATTERN);
  return match ? { num: match[1], content: match[2] } : null;
}

export function verseAnchorId(rozdilId: number, verseNum: string): string {
  return `verse_${rozdilId}_${verseNum}`;
}
