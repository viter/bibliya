import ContentsButton from '@/components/ContentsButton';
import HomeButton from '@/components/HomeButton';

interface StringDictionary {
  [key: string]: string;
}

const knyhy: StringDictionary = {
  but: 'Буття',
};

export default function KnyhaHeader({ knyha, onClick }: { knyha: string; onClick: () => void }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-slate-600 py-2 lg:py-4 px-5">
        <div className="flex">
          <ContentsButton handleClick={onClick} />
          <HomeButton />
          <div className="w-full text-center font-bold text-slate-300 text-2xl lg:text-3xl">
            {knyhy[knyha]}
          </div>
        </div>
      </div>
    </>
  );
}
