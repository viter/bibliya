'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function ShowContentsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      id="contentButton"
      type="button"
      className="md:hidden text-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
      onClick={handleClick}
    >
      <HamburgerMenuIcon width="24" height="24" />
    </button>
  );
}
