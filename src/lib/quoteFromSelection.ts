import { Data } from '@/lib/types';
import { knyhy } from '@/utils/knyhy';

export interface SelectedQuote {
  text: string;
  signature: string;
}

interface VerseRef {
  rozdilId: number;
  verseNum: string;
}

function closestVerseElement(node: Node): HTMLElement | null {
  const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
  return el?.closest<HTMLElement>('[id^="verse_"]') ?? null;
}

function parseVerseElementId(id: string): VerseRef | null {
  const match = id.match(/^verse_(\d+)_(.+)$/);
  if (!match) return null;
  return { rozdilId: Number(match[1]), verseNum: match[2] };
}

function chapterNumber(rozdil: string): string {
  return rozdil.match(/^(\d+)/)?.[1] ?? '';
}

export function buildQuoteFromRange(
  range: Range,
  data: Data[],
  knyhaSlug: string,
): SelectedQuote | null {
  const startEl = closestVerseElement(range.startContainer);
  const endEl = closestVerseElement(range.endContainer);
  if (!startEl || !endEl) return null;

  const startInfo = parseVerseElementId(startEl.id);
  const endInfo = parseVerseElementId(endEl.id);
  if (!startInfo || !endInfo) return null;

  const startChapter = data.find((d) => d.id === startInfo.rozdilId);
  if (!startChapter) return null;

  const short = (knyhy[knyhaSlug]?.short as string) ?? '';
  const startChapterNum = chapterNumber(startChapter.rozdil);

  let signature: string;
  if (startInfo.rozdilId === endInfo.rozdilId) {
    const verseRange =
      startInfo.verseNum === endInfo.verseNum
        ? startInfo.verseNum
        : `${startInfo.verseNum}-${endInfo.verseNum}`;
    signature = `(${short} ${startChapterNum},${verseRange})`;
  } else {
    const endChapter = data.find((d) => d.id === endInfo.rozdilId);
    const endChapterNum = endChapter ? chapterNumber(endChapter.rozdil) : '';
    signature = `(${short} ${startChapterNum},${startInfo.verseNum}-${endChapterNum},${endInfo.verseNum})`;
  }

  const fragment = range.cloneContents();
  fragment.querySelectorAll('[data-verse-num]').forEach((el) => el.remove());
  const rawText = (fragment.textContent ?? '').replace(/\s+/g, ' ').trim();
  if (!rawText) return null;

  return { text: `${rawText} ${signature}`, signature };
}
