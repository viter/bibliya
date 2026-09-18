'use client';

import { PlusIcon } from 'lucide-react';
import { useOverlayStore } from '@/store/overlayStore';
import { useEditModeStore } from '@/store/editModeStore';
import CategoryForm from './CategoryForm';

export default function AddCategoryButton() {
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  const editMode = useEditModeStore((s) => s.editMode);

  if (!editMode) return null;

  return (
    <button
      type="button"
      onClick={() => openOverlay(() => <CategoryForm />)}
      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mt-2"
    >
      <PlusIcon className="size-4" />
      Додати категорію
    </button>
  );
}
