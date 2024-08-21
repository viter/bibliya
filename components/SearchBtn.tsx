import { FiSearch } from 'react-icons/fi';

interface SearchBtnProps {
  click: () => void;
}

export default function SearchBtn({ click }: SearchBtnProps) {
  return (
    <div
      onClick={click}
      className="flex items-center p-1 pr-10 bg-neutral-200 dark:bg-neutral-700 rounded-full text-neutral-800 dark:text-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-600 cursor-pointer"
    >
      <FiSearch className="text-xl ml-2 mr-5" />
      <h2 className="">Пошук...</h2>
    </div>
  );
}
