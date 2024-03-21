'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function ContentsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      id="contentButton"
      type="button"
      className="md:hidden text-slate-400 hover:text-slate-300"
      onClick={handleClick}
    >
      <HamburgerMenuIcon width="24" height="24" />
    </button>
  );
}
