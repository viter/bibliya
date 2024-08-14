import ContentsButton from '@/components/ContentsButton';
import HomeButton from '@/components/HomeButton';
import { knyhy } from '@/utils/knyhy';
import { decode } from 'html-entities';
import ThemeSwitch from './ThemeSwitch';

export default function KnyhaHeader({ knyha, onClick }: { knyha: string; onClick: () => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-neutral-300 dark:bg-neutral-700 py-2 lg:py-4 px-5">
        <div className="flex">
          <ContentsButton handleClick={onClick} />
          <HomeButton />
          <div className="w-full text-center font-bold text-neutral-700 dark:text-neutral-300 text-2xl lg:text-3xl">
            {Array.isArray(knyhy[knyha]) ? decode(knyhy[knyha][1]) : decode(knyhy[knyha] as string)}
          </div>
          <div className="w-8 h-8 rounded-full p-1 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-600 dark:hover:bg-neutral-500 hover:cursor-pointer">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </>
  );
}
