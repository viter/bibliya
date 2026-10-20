'use client';

import { MessageSquareIcon } from 'lucide-react';
import { useOverlayStore } from '@/store/overlayStore';
import FeedbackForm from './FeedbackForm';

export default function FeedbackBtn() {
  const openOverlay = useOverlayStore((s) => s.openOverlay);

  return (
    <button
      type="button"
      title="Зворотний зв'язок"
      onClick={() => openOverlay(() => <FeedbackForm />)}
      className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
    >
      <MessageSquareIcon className="h-5 w-5 text-foreground" />
    </button>
  );
}
