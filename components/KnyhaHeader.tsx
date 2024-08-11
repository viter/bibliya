import ContentsButton from '@/components/ContentsButton';
import HomeButton from '@/components/HomeButton';
import { knyhy } from '@/utils/knyhy';
import { decode } from 'html-entities';

export default function KnyhaHeader({ knyha, onClick }: { knyha: string; onClick: () => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-neutral-300 py-2 lg:py-4 px-5">
        <div className="flex">
          <ContentsButton handleClick={onClick} />
          <HomeButton />
          <div className="w-full text-center font-bold text-neutral-700 text-2xl lg:text-3xl">
            {Array.isArray(knyhy[knyha]) ? decode(knyhy[knyha][1]) : decode(knyhy[knyha] as string)}
          </div>
        </div>
      </div>
    </>
  );
}
