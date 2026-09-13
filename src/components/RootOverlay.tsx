'use client';

import { Drawer, DrawerContent } from './ui/drawer';
import { Dialog, DialogContent } from './ui/dialog';
import { useOverlayStore } from '@/store/overlayStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { OverlayModeProvider } from '@/lib/overlay-context';

export default function RootOverlay() {
  const { open, render, closeOverlay } = useOverlayStore();

  const isMobile = useIsMobile();

  return (
    <OverlayModeProvider value={isMobile ? 'drawer' : 'dialog'}>
      {isMobile ? (
        <Drawer open={open} onOpenChange={(o) => !o && closeOverlay()}>
          <DrawerContent>{render?.()}</DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={(o) => !o && closeOverlay()}>
          <DialogContent
            className="flex h-auto max-h-[85vh] w-4xl! flex-col overflow-hidden rounded-md p-0 sm:max-w-4xl"
            showCloseButton={false}
          >
            {render?.()}
          </DialogContent>
        </Dialog>
      )}
    </OverlayModeProvider>
  );
}
