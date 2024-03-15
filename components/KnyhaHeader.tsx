interface StringDictionary {
  [key: string]: string;
}

const knyhy: StringDictionary = {
  but: 'Буття',
};

export default function KnyhaHeader({ knyha }: { knyha: string }) {
  return (
    <>
      <div className="fixed left-0 w-full">
        <div className="bg-slate-600 py-4 text-center font-bold text-slate-300 text-3xl">
          {knyhy[knyha]}
        </div>
      </div>
    </>
  );
}
