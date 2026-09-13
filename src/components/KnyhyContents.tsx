'use client';

import KnyhaCardSZ from './KnyhaCardSZ';
import KnyhaCardNZ from './KnyhaCardNZ';
export default function KnyhyContents() {
  return (
    <div>
      <div className="md:flex md:justify-evenly md:gap-10 xl:justify-between content-center">
        <KnyhaCardSZ />
        <KnyhaCardNZ />
      </div>
    </div>
  );
}
