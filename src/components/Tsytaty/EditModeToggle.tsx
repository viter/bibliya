'use client';

import { SettingsIcon } from 'lucide-react';
import { useEditModeStore } from '@/store/editModeStore';
import { cn } from '@/lib/utils';

export default function EditModeToggle() {
  const editMode = useEditModeStore((s) => s.editMode);
  const toggleEditMode = useEditModeStore((s) => s.toggleEditMode);

  return (
    <button
      type="button"
      onClick={toggleEditMode}
      aria-pressed={editMode}
      title={editMode ? 'Завершити редагування' : 'Редагувати категорії'}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-full cursor-pointer shrink-0',
        editMode
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground hover:bg-accent',
      )}
    >
      <SettingsIcon className="size-4" />
    </button>
  );
}
