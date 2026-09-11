'use client';

import { useRouter } from 'next/navigation';
import { HouseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomeButton({ className }: { className?: string }) {
  const router = useRouter();

  const buttonStyle = cn('hidden md:block text-muted-foreground hover:text-foreground', className);

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
