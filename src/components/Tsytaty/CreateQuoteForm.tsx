'use client';

import { useState, useTransition } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOverlayStore } from '@/store/overlayStore';
import { createTsytata, createKatehoriya } from '@/app/(main)/tsytaty/actions';
import { BEZ_KATEHORIYI } from '@/lib/constants';
import CategoryCheckboxList from './CategoryCheckboxList';

interface Katehoriya {
  id: number;
  katehoriya: string;
}

interface CreateQuoteFormProps {
  text: string;
  allKatehoriyi: Katehoriya[];
}

export default function CreateQuoteForm({ text, allKatehoriyi }: CreateQuoteFormProps) {
  const [value, setValue] = useState(text);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  const [katehoriyi, setKatehoriyi] = useState<Katehoriya[]>(allKatehoriyi);
  const bezId = allKatehoriyi.find((k) => k.katehoriya === BEZ_KATEHORIYI)?.id;
  const [selected, setSelected] = useState<number[]>(bezId !== undefined ? [bezId] : []);

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [isAddingCategory, startAddCategoryTransition] = useTransition();

  function handleAddCategory() {
    startAddCategoryTransition(async () => {
      const result = await createKatehoriya(newCategoryName);
      if (result.error || !result.katehoriya) {
        setCategoryError(result.error ?? 'Не вдалося створити категорію.');
        return;
      }

      const created = result.katehoriya;
      setKatehoriyi((prev) =>
        [...prev, created].sort((a, b) => a.katehoriya.localeCompare(b.katehoriya, 'uk')),
      );
      setSelected((prev) => [...prev.filter((id) => id !== bezId), created.id]);
      setNewCategoryName('');
      setCategoryError(null);
      setShowAddCategory(false);
    });
  }

  function handleSave() {
    startTransition(async () => {
      const result = await createTsytata(value, selected);
      if (result.error) {
        setError(result.error);
        return;
      }
      closeOverlay();
    });
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-foreground mb-3">Нова цитата</h2>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setError(null);
        }}
        rows={5}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      />
      {error && <p className="text-destructive text-sm mt-2">{error}</p>}

      <div className="mt-4">
        {showAddCategory ? (
          <div className="flex items-center gap-2 mb-3">
            <Input
              value={newCategoryName}
              onChange={(e) => {
                setNewCategoryName(e.target.value);
                setCategoryError(null);
              }}
              autoFocus
              className="bg-background"
            />
            <Button type="button" size="sm" onClick={handleAddCategory} disabled={isAddingCategory}>
              Зберегти
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setShowAddCategory(false);
                setNewCategoryName('');
                setCategoryError(null);
              }}
            >
              Скасувати
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddCategory(true)}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer mb-3"
          >
            <PlusIcon className="size-4" />
            Додати категорію
          </button>
        )}
        {categoryError && <p className="text-destructive text-sm mb-3">{categoryError}</p>}

        <CategoryCheckboxList
          allKatehoriyi={katehoriyi}
          selected={selected}
          onChange={setSelected}
        />
      </div>

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
