'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Button } from '@/components/ui/button';

const CONSENT_STORAGE_KEY = 'cookie-consent';
const GA_ID = 'G-PQBFFCK5FQ';

type Consent = 'granted' | 'denied';

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === 'granted' || stored === 'denied') setConsent(stored);
  }, []);

  const choose = (value: Consent) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setConsent(value);
  };

  return (
    <>
      {consent === 'granted' && <GoogleAnalytics gaId={GA_ID} />}
      {mounted && consent === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-3 border-t border-border bg-card p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-card-foreground">
            Цей сайт використовує аналітичні cookie-файли для покращення роботи сайту. Ви можете
            прийняти або відхилити їх використання.
          </p>
          <div className="flex shrink-0 gap-2">
            <Button variant="outline" size="sm" onClick={() => choose('denied')}>
              Відхилити
            </Button>
            <Button size="sm" onClick={() => choose('granted')}>
              Прийняти
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
