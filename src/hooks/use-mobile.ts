import { MOBILE_WINDOW_WIDTH } from '@/lib/constants';
import * as React from 'react';

function subscribe(callback: () => void) {
  const mql = window.matchMedia(`(max-width: ${MOBILE_WINDOW_WIDTH - 1}px)`);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return window.innerWidth < MOBILE_WINDOW_WIDTH;
}

function getServerSnapshot() {
  return false; // default assumption for SSR; adjust if you want to guess mobile instead
}

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
