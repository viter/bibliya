'use client';

import { GiHamburgerMenu } from 'react-icons/gi';

export default function ContentsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <GiHamburgerMenu
      className="md:hidden text-2xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 cursor-pointer"
      onClick={handleClick}
    />
  );
}
