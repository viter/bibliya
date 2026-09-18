'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useMounted } from '@/lib/useMounted';

export default function ThemeSwitch() {
  const mounted = useMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted)
    return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title="Тема"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5 text-foreground" />
      ) : (
        <MoonIcon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
}
