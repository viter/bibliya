'use client';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';

export default function ShowContentsButton() {
  const contentsRef = useRef(null);

  function showContents() {}
  return (
    <button
      id="contentButton"
      type="button"
      className="lg:hidden text-slate-100 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
    >
      <HamburgerMenuIcon width="24" height="24" />
    </button>
  );
}
