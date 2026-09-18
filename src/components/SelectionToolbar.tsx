'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, CopyIcon, QuoteIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useOverlayStore } from '@/store/overlayStore';
import { buildQuoteFromRange, type SelectedQuote } from '@/lib/quoteFromSelection';
import { getUserKatehoriyi } from '@/app/(main)/tsytaty/actions';
import CreateQuoteForm from '@/components/Tsytaty/CreateQuoteForm';
import type { Data } from '@/lib/types';

interface ToolbarState extends SelectedQuote {
  top: number;
  left: number;
}

interface SelectionToolbarProps {
  containerRef: RefObject<HTMLDivElement | null>;
  data: Data[];
  knyha: string;
}

export default function SelectionToolbar({ containerRef, data, knyha }: SelectionToolbarProps) {
  const { data: session } = authClient.useSession();
  const openOverlay = useOverlayStore((s) => s.openOverlay);

  const [toolbar, setToolbar] = useState<ToolbarState | null>(null);
  const [copied, setCopied] = useState(false);
  const toolbarElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) return;
    const container = containerRef.current;
    if (!container) return;

    function computeToolbar() {
      // A plain click on already-selected text doesn't collapse the native
      // Selection until just after mouseup, so read it a tick later - otherwise
      // this can resurrect the toolbar we just hid on pointerdown.
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
          setToolbar(null);
          return;
        }

        const range = selection.getRangeAt(0);
        if (!container!.contains(range.commonAncestorContainer)) {
          setToolbar(null);
          return;
        }

        const built = buildQuoteFromRange(range, data, knyha);
        if (!built) {
          setToolbar(null);
          return;
        }

        const rect = range.getBoundingClientRect();
        setCopied(false);
        setToolbar({ top: rect.top, left: rect.left + rect.width / 2, ...built });
      }, 0);
    }

    function hideToolbar() {
      setToolbar(null);
    }

    function handleOutsidePointerDown(e: PointerEvent) {
      if (toolbarElRef.current?.contains(e.target as Node)) return;
      hideToolbar();
    }

    const viewport = container.querySelector('[data-slot=scroll-area-viewport]');

    container.addEventListener('mouseup', computeToolbar);
    container.addEventListener('touchend', computeToolbar);
    document.addEventListener('pointerdown', handleOutsidePointerDown);
    viewport?.addEventListener('scroll', hideToolbar);

    return () => {
      container.removeEventListener('mouseup', computeToolbar);
      container.removeEventListener('touchend', computeToolbar);
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      viewport?.removeEventListener('scroll', hideToolbar);
    };
  }, [session, containerRef, data, knyha]);

  if (!toolbar) return null;

  async function handleCopy() {
    if (!toolbar) return;
    await navigator.clipboard.writeText(toolbar.text);
    setCopied(true);
  }

  async function handleMakeQuote() {
    if (!toolbar) return;
    const allKatehoriyi = await getUserKatehoriyi();
    const quoteText = toolbar.text;
    setToolbar(null);
    openOverlay(() => <CreateQuoteForm text={quoteText} allKatehoriyi={allKatehoriyi} />);
  }

  return createPortal(
    <div
      ref={toolbarElRef}
      style={{
        position: 'fixed',
        top: Math.max(toolbar.top - 48, 8),
        left: toolbar.left,
        transform: 'translateX(-50%)',
      }}
      className="z-40 flex items-center gap-1 rounded-lg bg-primary py-1 px-2 shadow-xl ring-1 ring-black/10"
    >
      <button
        type="button"
        onClick={handleCopy}
        title="Копіювати"
        className="flex w-8 h-8 items-center justify-center rounded-full text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
      >
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </button>
      <button
        type="button"
        onClick={handleMakeQuote}
        title="Створити цитату"
        className="flex w-8 h-8 items-center justify-center rounded-full text-primary-foreground hover:bg-primary-foreground/20 cursor-pointer"
      >
        <QuoteIcon className="size-4" />
      </button>
    </div>,
    document.body,
  );
}
