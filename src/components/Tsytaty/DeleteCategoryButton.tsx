'use client';

import { useTransition } from 'react';
import { Trash2Icon } from 'lucide-react';
import { deleteKatehoriya } from '@/app/(main)/tsytaty/actions';
import { useOverlayStore } from '@/store/overlayStore';
import { useEditModeStore } from '@/store/editModeStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DeleteCategoryButtonProps {
  id: number;
  name: string;
  hasQuotes: boolean;
}

export default function DeleteCategoryButton({ id, name, hasQuotes }: DeleteCategoryButtonProps) {
  const [, startTransition] = useTransition();
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);
  const editMode = useEditModeStore((s) => s.editMode);

  if (!editMode) return null;

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteKatehoriya(id);
      if (!result.error) {
        closeOverlay();
      }
    });
  }

  function confirmDelete() {
    if (hasQuotes) return;
    openOverlay(() => (
      <div className="p-4">
        <p className="text-foreground mb-4">Видалити категорію «{name}»?</p>
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
      disabled={hasQuotes}
      title={hasQuotes ? 'Неможливо видалити: у категорії є цитати' : 'Видалити категорію'}
      className={cn(
        'text-muted-foreground hover:text-destructive cursor-pointer shrink-0',
        hasQuotes && 'opacity-30 cursor-not-allowed hover:text-muted-foreground',
      )}
    >
      <Trash2Icon className="size-3.5" />
    </button>
  );
}
