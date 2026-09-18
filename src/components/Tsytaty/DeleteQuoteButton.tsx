'use client';

import { useTransition } from 'react';
import { Trash2Icon } from 'lucide-react';
import { deleteTsytata } from '@/app/(main)/tsytaty/actions';
import { useOverlayStore } from '@/store/overlayStore';
import { useEditModeStore } from '@/store/editModeStore';
import { Button } from '@/components/ui/button';

export default function DeleteQuoteButton({ id }: { id: number }) {
  const [, startTransition] = useTransition();
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);
  const editMode = useEditModeStore((s) => s.editMode);

  if (!editMode) return null;

  function handleDelete() {
    closeOverlay();
    startTransition(async () => {
      await deleteTsytata(id);
    });
  }

  function confirmDelete() {
    openOverlay(() => (
      <div className="p-4">
        <p className="text-foreground mb-4">Видалити цю цитату?</p>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={closeOverlay}>
            Скасувати
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Видалити
          </Button>
        </div>
      </div>
    ));
  }

  return (
    <button
      type="button"
      onClick={confirmDelete}
      title="Видалити цитату"
      className="text-muted-foreground hover:text-destructive cursor-pointer shrink-0"
    >
      <Trash2Icon className="size-4" />
    </button>
  );
}
