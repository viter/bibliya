import type { JSX, ReactNode } from 'react';
import DeleteQuoteButton from './DeleteQuoteButton';
import QuoteCategoriesButton from './QuoteCategoriesButton';
import CopyQuoteButton from './CopyQuoteButton';

const SIGNATURE_PATTERN = /^([\s\S]*?)(\([^()]*\))\s*$/;

function renderTsytata(text: string): ReactNode {
  const match = text.match(SIGNATURE_PATTERN);
  if (!match) return text;

  const [, main, signature] = match;
  return (
    <>
      {main}
      <span className="text-primary">{signature}</span>
    </>
  );
}

interface QuoteCardProps {
  id: number;
  tsytata: string;
  katehoriyi: { id: number; katehoriya: string }[];
  allKatehoriyi: { id: number; katehoriya: string }[];
}

export default function QuoteCard({
  id,
  tsytata,
  katehoriyi,
  allKatehoriyi,
}: QuoteCardProps): JSX.Element {
  return (
    <div className="bg-card p-4 rounded-lg shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-foreground whitespace-pre-wrap text-justify">{renderTsytata(tsytata)}</p>
        <div className="flex flex-col items-center gap-2 shrink-0">
          <CopyQuoteButton tsytata={tsytata} />
          <QuoteCategoriesButton
            quoteId={id}
            katehoriyi={katehoriyi}
            allKatehoriyi={allKatehoriyi}
          />
          <DeleteQuoteButton id={id} />
        </div>
      </div>
      {katehoriyi.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {katehoriyi.map((kat) => (
            <span
              key={kat.id}
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {kat.katehoriya}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
