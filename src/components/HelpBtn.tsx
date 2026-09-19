import Link from 'next/link';
import { CircleHelpIcon } from 'lucide-react';

export default function HelpBtn() {
  return (
    <Link
      href="/dopomoha"
      title="Інструкція"
      className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
    >
      <CircleHelpIcon className="h-5 w-5 text-foreground" />
    </Link>
  );
}
