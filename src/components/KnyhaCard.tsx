import Image from 'next/image';

import type { JSX } from 'react';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

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
    <div className="lg:shadow-md md:w-85 lg:w-120 xl:w-160 xl:p-10 2xl:p-15 bg-card p-4 rounded-lg mb-5">
      <div className="flex items-center gap-7 ">
        <div className="bg-muted w-20 h-20 lg:w-30 lg:h-30 rounded-full p-1">
          <Image
            src={img[knyha as keyof typeof img]}
            width={80}
            height={200}
            alt={title[knyha as keyof typeof title]}
            className="rounded-full w-20 lg:w-30"
          />
        </div>
        <h1 className="text-center text-2xl lg:text-4xl font-bold text-foreground mb-3">
          {title[knyha as keyof typeof title]}
        </h1>
      </div>

      <div className="p-3 pr-2 rounded-b-md">
        <ScrollArea className="h-70 md:h-150 overflow-y-auto py-3">
          <ScrollBar />
          <div className="flex gap-7 lg:gap-12 text-base lg:text-lg">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
