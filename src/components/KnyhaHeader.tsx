import ContentsButton from '@/components/ContentsButton';
import HomeButton from '@/components/HomeButton';
import { knyhy } from '@/utils/knyhy';
import { decode } from 'html-entities';
import ThemeSwitch from './ThemeSwitch';
import PaletteSwitch from './PaletteSwitch';

export default function KnyhaHeader({ knyha, onClick }: { knyha: string; onClick: () => void }) {
  return (
    <>
      <div className="z-10 w-full bg-transparent py-2 lg:py-4 px-5 mb-5">
        <div className="flex">
          <ContentsButton handleClick={onClick} />
          <HomeButton />
          <div className="w-full text-center font-bold text-foreground text-2xl lg:text-3xl">
            {Array.isArray(knyhy[knyha].title)
              ? decode(knyhy[knyha].title[1])
              : decode(knyhy[knyha].title)}
          </div>
          <div className="hidden md:flex items-center gap-1">
            <PaletteSwitch />
            <div className="w-8 h-8 rounded-full p-1 bg-transparent hover:cursor-pointer">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
