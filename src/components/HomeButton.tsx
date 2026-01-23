'use client';

import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { HouseIcon } from 'lucide-react';

export default function HomeButton({ className }: { className?: string }) {
  const router = useRouter();

  const buttonStyle = twMerge(
    'hidden md:block text-neutral-600 hover:text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-300',
    className,
  );

  function handleClick() {
    document.body.classList.remove('overflow-hidden');
    router.push('/');
  }

  return (
    <button
      id="homeButton"
      type="button"
      className={buttonStyle}
      onClick={handleClick}
      title="Повернутися на головну сторінку"
    >
      <HouseIcon className="text-2xl cursor-pointer" />
    </button>
  );
}
