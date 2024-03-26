import KnyhyContents from '@/components/KnyhyContents';

export default function Home(): JSX.Element {
  return (
    <div className="bg-slate-900 absolute top-0 bottom-0 left-0 right-0">
      <div
        className="bg-no-repeat absolute top-0 bottom-0 left-24 right-24"
        style={{ backgroundImage: 'url(bg.png)' }}
      >
        <div>
          <KnyhyContents />
        </div>
      </div>
    </div>
  );
}
