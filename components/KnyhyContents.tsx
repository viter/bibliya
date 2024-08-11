import KnyhaCardSZ from './KnyhaCardSZ';
import KnyhaCardNZ from './KnyhaCardNZ';

export default function KnyhyContents() {
  return (
    <div className="flex gap-10">
      <KnyhaCardSZ />
      <KnyhaCardNZ />
    </div>
  );
}
