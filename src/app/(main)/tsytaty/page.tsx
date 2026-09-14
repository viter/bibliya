import type { JSX } from 'react';
import { requireSession } from '@/lib/dal';

export default async function TsytatyPage(): Promise<JSX.Element> {
  await requireSession('/tsytaty');

  return <div>цитати</div>;
}
