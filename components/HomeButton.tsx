'use client';

import { HomeIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function HomeButton({ className }: { className?: string }) {
  const router = useRouter();

  const buttonStyle = twMerge('hidden md:block text-slate-400 hover:text-slate-300', className);

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
      <HomeIcon width="24" height="24" />
    </button>
  );
}
