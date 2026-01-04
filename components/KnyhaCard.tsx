import Image from 'next/image';

import type { JSX } from "react";

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
    <div className="lg:shadow-md lg:dark:shadow-lg lg:dark:shadow-neutral-900 md:w-[340px] lg:w-[470px] lg:rounded-md">
      <div className="flex justify-center items-center gap-7 bg-neutral-300 dark:bg-neutral-700 p-4 rounded-t-md">
        <div className="bg-neutral-100 dark:bg-neutral-300 w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] rounded-full p-1">
          <Image
            src={img[knyha as keyof typeof img]}
            width={80}
            height={200}
            alt={title[knyha as keyof typeof title]}
            className="rounded-full w-[80px] lg:w-[120px]"
          />
        </div>
        <h1 className="text-center text-2xl lg:text-4xl font-bold text-neutral-600 dark:text-neutral-300 mb-3">
          {title[knyha as keyof typeof title]}
        </h1>
      </div>

      <div className="bg-neutral-200 dark:bg-neutral-600 p-3 pr-2 rounded-b-md">
        <div className="md:h-[600px] md:overflow-y-auto py-3 top-20">
          <div className="flex gap-7 lg:gap-12 text-base lg:text-lg justify-center">{children}</div>
        </div>
      </div>
    </div>
  );
}
