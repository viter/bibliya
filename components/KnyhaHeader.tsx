interface StringDictionary {
  [key: string]: string;
}

const knyhy: StringDictionary = {
  but: 'Буття',
};

export default function KnyhaHeader({ knyha }: { knyha: string }) {
  return (
    <>
      <div className="fixed w-full z-20">
        <div className="bg-slate-600 py-5 mb-10 text-center font-bold text-slate-300 text-4xl">
          {knyhy[knyha]}
        </div>
      </div>
    </>
  );
}
