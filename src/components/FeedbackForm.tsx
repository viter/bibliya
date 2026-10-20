'use client';

import { useRef, useState, useTransition, type FormEvent } from 'react';
import Script from 'next/script';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useOverlayStore } from '@/store/overlayStore';
import { sendFeedback } from '@/lib/feedback';

interface Turnstile {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      language?: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [startedAt] = useState(() => Date.now());
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const closeOverlay = useOverlayStore((s) => s.closeOverlay);

  function renderWidget() {
    if (!window.turnstile || !widgetRef.current || widgetId.current) return;
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      language: 'uk',
      callback: setToken,
      'expired-callback': () => setToken(''),
      'error-callback': () => setToken(''),
    });
  }

  function resetWidget() {
    setToken('');
    if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) {
      setError('Підтвердіть, що ви не робот.');
      return;
    }
    startTransition(async () => {
      const result = await sendFeedback({ name, email, message, website, startedAt, token });
      if (result.error) {
        setError(result.error);
        resetWidget();
        return;
      }
      setSent(true);
    });
  }

  if (sent) {
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold text-foreground mb-3">Дякуємо!</h2>
        <p className="text-muted-foreground">Ваше повідомлення надіслано.</p>
        <div className="flex justify-end mt-4">
          <Button type="button" onClick={closeOverlay}>
            Закрити
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 overflow-y-auto">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={renderWidget}
      />
      <h2 className="text-lg font-semibold text-foreground mb-3">Зворотний зв&apos;язок</h2>

      <div className="grid gap-3">
        <div className="grid gap-1.5">
          <Label htmlFor="feedback-name">Ім&apos;я (необов&apos;язково)</Label>
          <Input
            id="feedback-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="bg-background"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="feedback-email">Email для відповіді (необов&apos;язково)</Label>
          <Input
            id="feedback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="feedback-message">Повідомлення</Label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError(null);
            }}
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            autoFocus
            className="placeholder:text-muted-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-background px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] md:text-sm resize-y"
          />
        </div>

        {/* Honeypot: hidden from people, but naive bots fill every field */}
        <div aria-hidden="true" className="absolute -left-2500 h-px w-px overflow-hidden">
          <label htmlFor="feedback-website">Website</label>
          <input
            id="feedback-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div ref={widgetRef} />
      </div>

      {error && <p className="text-destructive text-sm mt-2">{error}</p>}
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={closeOverlay}>
          Скасувати
        </Button>
        <Button type="submit" disabled={isPending || !token}>
          Надіслати
        </Button>
      </div>
    </form>
  );
}
