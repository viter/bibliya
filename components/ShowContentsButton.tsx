'use client';

import { useRef } from 'react';

export default function ShowContentsButton() {
  const contentsRef = useRef(null);

  function showContents() {}
  return (
    <div className="fixed top-15 px-5 py-2 z-40 w-full backdrop-blur flex transition-colors duration-500 lg:hidden dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-slate-800/95">
      <button
        type="button"
        className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
      >
        <svg width="24" height="24">
          <path
            d="M5 6h14M5 12h14M5 18h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          ></path>
        </svg>
      </button>
    </div>
  );
}
