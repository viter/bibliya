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

const TOOLBAR_HEIGHT = 40;
const TOOLBAR_HALF_WIDTH = 48;
const VIEWPORT_MARGIN = 8;
const SELECTION_SETTLE_MS = 250;
// After tapping the toolbar the browser may collapse the selection before the
// click lands; don't let that tear the toolbar down mid-tap.
const TOOLBAR_TAP_GRACE_MS = 600;

function isTouchDevice() {
  return window.matchMedia('(pointer: coarse)').matches;
}

// `navigator.clipboard` only exists in secure contexts (HTTPS / localhost), so
// fall back to a hidden textarea + execCommand, e.g. when testing over a LAN IP.
function legacyCopy(text: string) {
  const selection = window.getSelection();
  const savedRanges = selection
    ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i))
    : [];

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0;font-size:16px';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, text.length);

  let ok = false;
  try {
    ok = document.execCommand('copy');
  } finally {
    textarea.remove();
    selection?.removeAllRanges();
    savedRanges.forEach((range) => selection?.addRange(range));
  }
  return ok;
}

async function copyToClipboard(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or document not focused - try the legacy path below.
  }
  return legacyCopy(text);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

// On touch the native callout (Copy / Select all) sits above the selection and
// the drag handles hang below it, and dragging a handle low can push the end of
// the selection under the phone UI. So sit inside the selection, centred on the
// part of it that is actually visible in the reading area.
function placeToolbar(rect: DOMRect, bounds: DOMRect, touch: boolean) {
  const viewport = window.visualViewport;
  const viewportWidth = viewport?.width ?? window.innerWidth;
  const viewportHeight = viewport?.height ?? window.innerHeight;

  let preferred = rect.top - TOOLBAR_HEIGHT - VIEWPORT_MARGIN;
  if (touch) {
    const visibleTop = Math.max(rect.top, bounds.top, 0);
    const visibleBottom = Math.min(rect.bottom, bounds.bottom, viewportHeight);
    preferred = (visibleTop + visibleBottom) / 2 - TOOLBAR_HEIGHT / 2;
  }

  return {
    top: clamp(preferred, VIEWPORT_MARGIN, viewportHeight - TOOLBAR_HEIGHT - VIEWPORT_MARGIN),
    left: clamp(
      rect.left + rect.width / 2,
      TOOLBAR_HALF_WIDTH + VIEWPORT_MARGIN,
      viewportWidth - TOOLBAR_HALF_WIDTH - VIEWPORT_MARGIN,
    ),
  };
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
  const ignoreCollapseUntilRef = useRef(0);

  useEffect(() => {
    if (!session) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollViewport = container.querySelector('[data-slot=scroll-area-viewport]');
    let timer: ReturnType<typeof setTimeout> | undefined;

    function updateToolbar() {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        if (Date.now() >= ignoreCollapseUntilRef.current) setToolbar(null);
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

      setCopied(false);
      const bounds = (scrollViewport ?? container!).getBoundingClientRect();
      setToolbar({
        ...placeToolbar(range.getBoundingClientRect(), bounds, isTouchDevice()),
        ...built,
      });
    }

    function scheduleUpdate(delay: number) {
      clearTimeout(timer);
      timer = setTimeout(updateToolbar, delay);
    }

    // A plain click on already-selected text doesn't collapse the native
    // Selection until just after mouseup, so read it a tick later - otherwise
    // this can resurrect the toolbar we just hid on pointerdown.
    function handlePointerUp() {
      scheduleUpdate(0);
    }

    // On touch, long-press selection and handle dragging don't reliably end in a
    // touchend/mouseup on the container, so follow the selection itself and wait
    // for it to settle. Desktop keeps using mouseup so the toolbar doesn't pop up
    // mid-drag.
    function handleSelectionChange() {
      if (!isTouchDevice()) return;
      scheduleUpdate(SELECTION_SETTLE_MS);
    }

    function hideToolbar() {
      clearTimeout(timer);
      setToolbar(null);
    }

    function handleOutsidePointerDown(e: PointerEvent) {
      if (toolbarElRef.current?.contains(e.target as Node)) {
        ignoreCollapseUntilRef.current = Date.now() + TOOLBAR_TAP_GRACE_MS;
        return;
      }
      hideToolbar();
    }

    container.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchend', handlePointerUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('pointerdown', handleOutsidePointerDown);
    scrollViewport?.addEventListener('scroll', hideToolbar);

    return () => {
      clearTimeout(timer);
      container.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchend', handlePointerUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      scrollViewport?.removeEventListener('scroll', hideToolbar);
    };
  }, [session, containerRef, data, knyha]);

  if (!toolbar) return null;

  async function handleCopy() {
    if (!toolbar) return;
    setCopied(await copyToClipboard(toolbar.text));
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
        top: toolbar.top,
        left: toolbar.left,
        transform: 'translateX(-50%)',
      }}
      className="z-40 flex select-none items-center gap-1 rounded-lg bg-primary py-1 px-2 shadow-xl ring-1 ring-black/10"
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
