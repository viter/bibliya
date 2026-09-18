'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { PaletteIcon, CheckIcon } from 'lucide-react';
import { PALETTES, DEFAULT_PALETTE, PALETTE_STORAGE_KEY } from '@/lib/palettes';
import { useMounted } from '@/lib/useMounted';

const MENU_WIDTH = 224;
const VIEWPORT_MARGIN = 8;

export default function PaletteSwitch() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [palette, setPalette] = useState(() =>
    typeof document === 'undefined'
      ? DEFAULT_PALETTE
      : (document.documentElement.getAttribute('data-palette') ?? DEFAULT_PALETTE),
  );
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const { resolvedTheme } = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!open || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const maxLeft = Math.max(window.innerWidth - MENU_WIDTH - VIEWPORT_MARGIN, VIEWPORT_MARGIN);
    const left = Math.min(Math.max(rect.right - MENU_WIDTH, VIEWPORT_MARGIN), maxLeft);
    setMenuPos({ top: rect.bottom + 8, left });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  function selectPalette(key: string) {
    setPalette(key);
    setOpen(false);
    document.documentElement.setAttribute('data-palette', key);
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, key);
    } catch {
      // localStorage unavailable (private mode, etc.) — selection still applies for this session
    }
  }

  if (!mounted) {
    return <PaletteIcon className="text-2xl text-foreground" />;
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Кольорова схема"
      >
        <PaletteIcon className="h-5 w-5 text-foreground" />
      </button>
      {open && menuPos && (
        <div
          role="menu"
          style={{ top: menuPos.top, left: menuPos.left, width: MENU_WIDTH }}
          className="fixed z-30 rounded-md border border-border bg-popover p-1 shadow-lg"
        >
          {PALETTES.map((p) => (
            <button
              key={p.key}
              type="button"
              role="menuitemradio"
              aria-checked={p.key === palette}
              onClick={() => selectPalette(p.key)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-popover-foreground hover:bg-accent"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-border"
                style={{ background: resolvedTheme === 'dark' ? p.swatchDark : p.swatch }}
              />
              <span className="flex-1 text-left">{p.name}</span>
              {p.key === palette && <CheckIcon className="size-3.5 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
