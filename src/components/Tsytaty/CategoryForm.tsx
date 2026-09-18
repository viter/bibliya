'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useOverlayStore } from '@/store/overlayStore';
import { createKatehoriya, updateKatehoriya } from '@/app/(main)/tsytaty/actions';

interface CategoryFormProps {
  id?: number;
  initialName?: string;
}

export default function CategoryForm({ id, initialName = '' }: CategoryFormProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = id ? await updateKatehoriya(id, name) : await createKatehoriya(name);
      if (result.error) {
        setError(result.error);
        return;
      }
      closeOverlay();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">
        {id ? 'Редагувати категорію' : 'Нова категорія'}
      </h2>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError(null);
        }}
        autoFocus
        className="bg-background"
      />
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={closeOverlay}>
          Скасувати
        </Button>
        <Button type="submit" disabled={isPending}>
          Зберегти
        </Button>
      </div>
    </form>
  );
}
