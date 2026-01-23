import { SearchIcon } from 'lucide-react';

interface SearchBtnProps {
  click: () => void;
}

export default function SearchBtn({ click }: SearchBtnProps) {
  return (
    <div
      onClick={click}
      className="flex items-center p-1 pr-10 bg-neutral-200 dark:bg-cyan-800 rounded-full text-neutral-800 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer"
    >
      <SearchIcon className="text-xl ml-2 mr-5" />
      <h2 className="">Пошук...</h2>
    </div>
  );
}
