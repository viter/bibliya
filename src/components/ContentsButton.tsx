'use client';

import { MenuIcon } from 'lucide-react';

export default function ContentsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <MenuIcon
      className="md:hidden text-2xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer"
      onClick={handleClick}
    />
  );
}
