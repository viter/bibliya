import { useOverlayStore } from '@/store/overlayStore';
import { SearchIcon } from 'lucide-react';
import SearchOverlayContent from './SearchOverlayContent';

export default function SearchBtn() {
  const openOverlay = useOverlayStore((s) => s.openOverlay);
  return (
    <button
      className="flex items-center p-1 pr-10 bg-secondary rounded-full text-secondary-foreground hover:bg-accent cursor-pointer"
      onClick={(e) => {
        e.currentTarget.blur();
        openOverlay(() => <SearchOverlayContent />);
      }}
    >
      <SearchIcon className="text-xl ml-2 mr-5" />
      <h2 className="">Пошук...</h2>
    </button>
  );
}
