'use client';

import { TagIcon } from 'lucide-react';
import { useOverlayStore } from '@/store/overlayStore';
import { useEditModeStore } from '@/store/editModeStore';
import QuoteCategoriesForm from './QuoteCategoriesForm';

interface QuoteCategoriesButtonProps {
  quoteId: number;
  katehoriyi: { id: number; katehoriya: string }[];
  allKatehoriyi: { id: number; katehoriya: string }[];
}

export default function QuoteCategoriesButton({
  quoteId,
  katehoriyi,
  allKatehoriyi,
}: QuoteCategoriesButtonProps) {
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  const editMode = useEditModeStore((s) => s.editMode);

  if (!editMode) return null;

  return (
    <button
      type="button"
      onClick={() =>
        openOverlay(() => (
          <QuoteCategoriesForm
            quoteId={quoteId}
            allKatehoriyi={allKatehoriyi}
            selectedIds={katehoriyi.map((k) => k.id)}
          />
        ))
      }
      title="Категорії цитати"
      className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
    >
      <TagIcon className="size-4" />
    </button>
  );
}
