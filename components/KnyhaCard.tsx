import Image from 'next/image';

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
    <div className="shadow-md w-[450px] mt-5 rounded-md">
      <div className="flex items-center gap-7 bg-neutral-300 p-4 rounded-t-md">
        <div className="bg-neutral-100 w-[120px] h-[120px] rounded-full p-1">
          <Image
            src={img[knyha as keyof typeof img]}
            width={120}
            height={558}
            alt="Старий Завіт"
            className="rounded-full"
          />
        </div>
        <h1 className="text-center text-4xl font-bold text-neutral-600 mb-3">
          {title[knyha as keyof typeof title]}
        </h1>
      </div>

      <div className="bg-neutral-200 p-3 pr-2 rounded-b-md">
        <div className="h-[600px] overflow-y-auto py-3 top-20 inset-0">
          <div className="flex gap-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
