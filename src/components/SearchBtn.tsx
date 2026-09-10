import { SearchIcon } from 'lucide-react';

interface SearchBtnProps {
  click: () => void;
}

export default function SearchBtn({ click }: SearchBtnProps) {
  return (
    <div
      onClick={click}
      className="flex items-center p-1 pr-10 bg-secondary rounded-full text-secondary-foreground hover:bg-accent cursor-pointer"
    >
      <SearchIcon className="text-xl ml-2 mr-5" />
      <h2 className="">Пошук...</h2>
    </div>
  );
}
