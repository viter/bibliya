'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

export default function CopyQuoteButton({ tsytata }: { tsytata: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(tsytata);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="Копіювати цитату"
      className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
    >
      {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
    </button>
  );
}
