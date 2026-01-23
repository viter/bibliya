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
    <div className="lg:shadow-md lg:dark:shadow-lg lg:dark:shadow-neutral-900 md:w-85 lg:w-117.5 bg-cyan-100 dark:bg-cyan-900 p-4 rounded-lg">
      <div className="flex justify-center items-center gap-7 ">
        <div className="bg-neutral-100 dark:bg-cyan-100 w-20 h-20 lg:w-30 lg:h-30 rounded-full p-1">
          <Image
            src={img[knyha as keyof typeof img]}
            width={80}
            height={200}
            alt={title[knyha as keyof typeof title]}
            className="rounded-full w-20 lg:w-30"
          />
        </div>
        <h1 className="text-center text-2xl lg:text-4xl font-bold text-neutral-600 dark:text-cyan-100 mb-3">
          {title[knyha as keyof typeof title]}
        </h1>
      </div>

      <div className="p-3 pr-2 rounded-b-md">
        <ScrollArea className="md:h-150 md:overflow-y-auto py-3">
          <ScrollBar style={{ '--scrollbar-thumb': '#3b82f6' } as React.CSSProperties} />
          <div className="flex gap-7 lg:gap-12 text-base lg:text-lg justify-center">{children}</div>
        </ScrollArea>
      </div>
    </div>
  );
}
