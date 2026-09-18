'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import EditCategoryButton from './EditCategoryButton';
import DeleteCategoryButton from './DeleteCategoryButton';
import AddCategoryButton from './AddCategoryButton';

interface Katehoriya {
  id: number;
  katehoriya: string;
  _count: { tsytaty: number };
}

interface CategoryTagsListProps {
  katehoriyi: Katehoriya[];
  selected: number[];
}

export default function CategoryTagsList({ katehoriyi, selected }: CategoryTagsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleCategory(id: number) {
    const isSelected = selected.includes(id);
    const nextSelected = isSelected ? selected.filter((s) => s !== id) : [...selected, id];

    const params = new URLSearchParams(searchParams.toString());
    params.delete('kat');
    nextSelected.forEach((s) => params.append('kat', String(s)));

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div>
      {katehoriyi.length === 0 ? (
        <p className="text-muted-foreground text-sm">Немає категорій</p>
      ) : (
        <ScrollArea className="max-h-64">
          <div className="flex flex-col gap-2 pr-2">
            {katehoriyi.map((kat) => {
              const isSelected = selected.includes(kat.id);
              return (
                <div key={kat.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleCategory(kat.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      'flex-1 min-w-0 truncate text-sm px-3 py-1 rounded-full border text-left cursor-pointer transition-colors',
                      isSelected
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-secondary text-secondary-foreground border-transparent hover:bg-accent',
                    )}
                  >
                    {kat.katehoriya}
                  </button>
                  <EditCategoryButton id={kat.id} name={kat.katehoriya} />
                  <DeleteCategoryButton
                    id={kat.id}
                    name={kat.katehoriya}
                    hasQuotes={kat._count.tsytaty > 0}
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
      <AddCategoryButton />
    </div>
  );
}
