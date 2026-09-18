'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BEZ_KATEHORIYI } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface CategoryCheckboxListProps {
  allKatehoriyi: { id: number; katehoriya: string }[];
  selected: number[];
  onChange: (next: number[]) => void;
}

export default function CategoryCheckboxList({
  allKatehoriyi,
  selected,
  onChange,
}: CategoryCheckboxListProps) {
  const bezId = allKatehoriyi.find((k) => k.katehoriya === BEZ_KATEHORIYI)?.id;
  const hasOtherSelected = selected.some((id) => id !== bezId);

  function toggle(id: number, name: string) {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
      return;
    }
    if (name !== BEZ_KATEHORIYI && bezId !== undefined) {
      onChange([...selected.filter((s) => s !== bezId), id]);
      return;
    }
    onChange([...selected, id]);
  }

  if (allKatehoriyi.length === 0) {
    return <p className="text-muted-foreground text-sm">Немає категорій</p>;
  }

  return (
    <ScrollArea className="max-h-64">
      <div className="flex flex-col gap-2 pr-2">
        {allKatehoriyi.map((kat) => {
          const isBez = kat.katehoriya === BEZ_KATEHORIYI;
          const isDisabled = isBez && hasOtherSelected;
          return (
            <label
              key={kat.id}
              className={cn(
                'flex items-center gap-2 text-sm text-foreground cursor-pointer',
                isDisabled && 'opacity-50 cursor-not-allowed',
              )}
            >
              <Checkbox
                checked={selected.includes(kat.id)}
                onCheckedChange={() => toggle(kat.id, kat.katehoriya)}
                disabled={isDisabled}
                className="bg-background border border-muted-foreground/70"
              />
              {kat.katehoriya}
            </label>
          );
        })}
      </div>
    </ScrollArea>
  );
}
