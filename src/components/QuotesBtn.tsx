'use client';

import Link from 'next/link';
import { QuoteIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useMounted } from '@/lib/useMounted';

export default function QuotesBtn() {
  const mounted = useMounted();
  const { data: session } = authClient.useSession();

  if (!mounted || !session) {
    return null;
  }

  return (
    <Link
      href="/tsytaty"
      title="Мої цитати"
      className="flex items-center p-1 md:pr-4 bg-secondary rounded-full text-secondary-foreground hover:bg-accent hover:cursor-pointer"
    >
      <QuoteIcon className="h-5 w-5 md:ml-2 md:mr-2" />
      <h2 className="hidden md:block">Цитати</h2>
    </Link>
  );
}
