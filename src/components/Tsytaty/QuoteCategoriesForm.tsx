'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useOverlayStore } from '@/store/overlayStore';
import { updateQuoteKatehoriyi } from '@/app/(main)/tsytaty/actions';
import CategoryCheckboxList from './CategoryCheckboxList';

interface QuoteCategoriesFormProps {
  quoteId: number;
  allKatehoriyi: { id: number; katehoriya: string }[];
  selectedIds: number[];
}

export default function QuoteCategoriesForm({
  quoteId,
  allKatehoriyi,
  selectedIds,
}: QuoteCategoriesFormProps) {
  const [selected, setSelected] = useState<number[]>(selectedIds);
  const [isPending, startTransition] = useTransition();
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  function handleSave() {
    startTransition(async () => {
      await updateQuoteKatehoriyi(quoteId, selected);
      closeOverlay();
    });
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">Категорії цитати</h2>
      <CategoryCheckboxList
        allKatehoriyi={allKatehoriyi}
        selected={selected}
        onChange={setSelected}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={closeOverlay}>
          Скасувати
        </Button>
        <Button type="button" onClick={handleSave} disabled={isPending}>
          Зберегти
        </Button>
      </div>
    </div>
  );
}
