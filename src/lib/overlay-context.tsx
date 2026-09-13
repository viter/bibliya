'use client';

import { createContext, useContext } from 'react';

type OverlayMode = 'drawer' | 'dialog';

const OverlayModeContext = createContext<OverlayMode>('dialog');

export const OverlayModeProvider = OverlayModeContext.Provider;
export const useOverlayMode = () => useContext(OverlayModeContext);
