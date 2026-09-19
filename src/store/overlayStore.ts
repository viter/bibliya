import { create } from 'zustand';
import type { ReactNode } from 'react';

interface OverlayStore {
  open: boolean;
  render: (() => ReactNode) | null;
  openOverlay: (render: () => ReactNode) => void;
  closeOverlay: () => void;
}

export const useOverlayStore = create<OverlayStore>((set) => ({
  open: false,
  render: null,
  openOverlay: (render) => {
    // Radix marks the page aria-hidden when the overlay opens; the opener must not still hold focus then
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    set({ open: true, render });
  },
  closeOverlay: () => set({ open: false, render: null }),
}));
