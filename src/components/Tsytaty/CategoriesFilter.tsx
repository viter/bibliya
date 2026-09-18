'use client';

import { TagIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useOverlayStore } from '@/store/overlayStore';
import CategoryTagsList from './CategoryTagsList';

interface Katehoriya {
  id: number;
  katehoriya: string;
  _count: { tsytaty: number };
}

interface CategoriesFilterProps {
  katehoriyi: Katehoriya[];
  selected: number[];
}

export default function CategoriesFilter({ katehoriyi, selected }: CategoriesFilterProps) {
  const isMobile = useIsMobile();
  const openOverlay = useOverlayStore((s) => s.openOverlay);

  if (isMobile) {
    return (
      <Button
        type="button"
        variant="outline"
        className="mb-5"
        onClick={() =>
          openOverlay(() => (
            <div className="p-4">
              <h2 className="text-lg font-semibold text-foreground mb-3">Категорії</h2>
              <CategoryTagsList katehoriyi={katehoriyi} selected={selected} />
            </div>
          ))
        }
      >
        <TagIcon />
        Категорії
        {selected.length > 0 && (
          <span className="ml-1 text-xs rounded-full bg-primary text-primary-foreground px-1.5">
            {selected.length}
          </span>
        )}
      </Button>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-56 shrink-0 h-full">
      <h2 className="text-lg font-semibold text-foreground mb-3 shrink-0">Категорії</h2>
      <CategoryTagsList
        katehoriyi={katehoriyi}
        selected={selected}
        className="flex-1 min-h-0"
        scrollClassName="max-h-full min-h-0"
      />
    </aside>
  );
}
