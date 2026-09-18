'use client';

import { PencilIcon } from 'lucide-react';
import { useOverlayStore } from '@/store/overlayStore';
import { useEditModeStore } from '@/store/editModeStore';
import CategoryForm from './CategoryForm';

export default function EditCategoryButton({ id, name }: { id: number; name: string }) {
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  const editMode = useEditModeStore((s) => s.editMode);

  if (!editMode) return null;

  return (
    <button
      type="button"
      onClick={() => openOverlay(() => <CategoryForm id={id} initialName={name} />)}
      title="Редагувати категорію"
      className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
    >
      <PencilIcon className="size-3.5" />
    </button>
  );
}
