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
  openOverlay: (render) => set({ open: true, render }),
  closeOverlay: () => set({ open: false, render: null }),
}));
