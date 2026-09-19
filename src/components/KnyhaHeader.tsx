import ContentsButton from '@/components/ContentsButton';
import HomeButton from '@/components/HomeButton';
import { knyhy } from '@/utils/knyhy';
import { decode } from 'html-entities';
import ThemeSwitch from './ThemeSwitch';
import PaletteSwitch from './PaletteSwitch';
import SearchBtn from './Search/SearchBtn';
import QuotesBtn from './QuotesBtn';
import UserMenu from './auth/UserMenu';
import HelpBtn from './HelpBtn';

export default function KnyhaHeader({ knyha, onClick }: { knyha: string; onClick: () => void }) {
  return (
    <>
      <div className="z-10 w-full shrink-0 bg-transparent py-2 lg:py-4 px-5 mb-5">
        <div className="flex">
          <ContentsButton handleClick={onClick} />
          <HomeButton />
          <h1 className="w-full text-center font-bold text-foreground text-2xl lg:text-3xl">
            {Array.isArray(knyhy[knyha].title)
              ? decode(knyhy[knyha].title[1])
              : decode(knyhy[knyha].title)}
          </h1>
          <div className="flex items-center gap-1">
            <SearchBtn />
            <QuotesBtn />
            <div className="hidden md:flex items-center gap-1">
              <PaletteSwitch />
              <ThemeSwitch />
              <HelpBtn />
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
