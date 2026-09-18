import type { JSX } from 'react';
import { requireSession } from '@/lib/dal';
import { prisma } from '@/lib/prisma';
import { ScrollArea } from '@/components/ui/scroll-area';
import QuoteCard from '@/components/Tsytaty/QuoteCard';
import CategoriesFilter from '@/components/Tsytaty/CategoriesFilter';
import EditModeToggle from '@/components/Tsytaty/EditModeToggle';

interface SearchParamsProps {
  searchParams: Promise<{
    kat?: string | string[] | undefined;
  }>;
}

export default async function TsytatyPage(props: SearchParamsProps): Promise<JSX.Element> {
  const session = await requireSession('/tsytaty');
  const userid = Number(session.user.id);

  const { kat } = await props.searchParams;
  const selected = (kat ? (Array.isArray(kat) ? kat : [kat]) : [])
    .map(Number)
    .filter((n) => !Number.isNaN(n));

  const [katehoriyi, tsytaty] = await Promise.all([
    prisma.katehoriyi.findMany({
      where: { userid },
      orderBy: { katehoriya: 'asc' },
      include: { _count: { select: { tsytaty: true } } },
    }),
    prisma.tsytaty.findMany({
      where: {
        userid,
        ...(selected.length > 0 ? { katehoriyi: { some: { id: { in: selected } } } } : {}),
      },
      include: { katehoriyi: true },
      orderBy: { id: 'desc' },
    }),
  ]);

  return (
    <div className="flex flex-col h-[calc(100dvh-9rem)]">
      <div className="flex items-center justify-between mb-5 shrink-0">
        <p className="text-2xl">Мої цитати</p>
        <EditModeToggle />
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        <div className="order-2 md:order-1 flex-1 min-w-0 min-h-0">
          <ScrollArea className="h-full pr-2">
            {tsytaty.length === 0 ? (
              <p className="text-muted-foreground">
                {selected.length > 0
                  ? 'Немає цитат у вибраних категоріях.'
                  : 'У вас ще немає цитат.'}
              </p>
            ) : (
              <div className="columns-1 sm:columns-2 gap-4 p-2">
                {tsytaty.map((t) => (
                  <div key={t.id} className="mb-4 break-inside-avoid">
                    <QuoteCard
                      id={t.id}
                      tsytata={t.tsytata}
                      katehoriyi={t.katehoriyi}
                      allKatehoriyi={katehoriyi}
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="order-1 md:order-2 md:min-h-0">
          <CategoriesFilter katehoriyi={katehoriyi} selected={selected} />
        </div>
      </div>
    </div>
  );
}
