import { useOverlayStore } from '@/store/overlayStore';
import { SearchIcon } from 'lucide-react';
import SearchOverlayContent from './SearchOverlayContent';

export default function SearchBtn() {
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  return (
    <button
      className="flex items-center p-1 md:pr-4 bg-secondary rounded-full text-secondary-foreground hover:bg-accent cursor-pointer"
      onClick={(e) => {
        e.currentTarget.blur();
        openOverlay(() => <SearchOverlayContent />);
      }}
    >
      <SearchIcon className="h-5 w-5 md:ml-2 md:mr-2" />
      <h2 className="hidden md:block">Пошук</h2>
    </button>
  );
}
