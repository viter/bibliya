'use client';

import { MenuIcon } from 'lucide-react';

export default function ContentsButton({ handleClick }: { handleClick: () => void }) {
  return (
    <MenuIcon
      className="md:hidden text-2xl text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={handleClick}
    />
  );
}
