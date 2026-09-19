'use client';

import { useIsMobile } from '@/hooks/use-mobile';
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

  if (isMobile) return null;

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
