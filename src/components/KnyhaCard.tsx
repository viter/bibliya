import Image from 'next/image';

import type { JSX } from 'react';
import { ScrollArea } from './ui/scroll-area';

const title = {
  sz: 'Старий Завіт',
  nz: 'Новий Завіт',
};

const img = {
  sz: '/sz.jpg',
  nz: '/nz.jpg',
};

export default function KnyhaCard({
  children,
  knyha,
}: Readonly<{
  children: React.ReactNode;
  knyha: string;
}>): JSX.Element {
  return (
    <div className="flex flex-col h-[min(80vh,calc(100dvh-10rem))] max-h-245 lg:shadow-md w-full md:w-85 lg:w-120 xl:w-160 md:p-5 bg-card p-2 rounded-lg mb-5">
      <div className="flex items-center gap-7 shrink-0">
        <div className="bg-muted w-20 h-20 lg:w-30 lg:h-30 rounded-full p-1">
          <Image
            src={img[knyha as keyof typeof img]}
            width={80}
            height={200}
            alt={title[knyha as keyof typeof title]}
            className="rounded-full w-20 lg:w-30"
          />
        </div>
        <h2 className="text-center text-2xl lg:text-4xl font-bold text-foreground mb-3">
          {title[knyha as keyof typeof title]}
        </h2>
      </div>

      <div className="rounded-b-md flex-1 min-h-0">
        <ScrollArea className="h-full py-3">
          <div className="flex gap-7 lg:gap-12 text-base lg:text-lg">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
