'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { resend } from './mailer';

const FEEDBACK_TO = 'bibliya.in.ua@gmail.com';
// Humans need at least a few seconds to type a message; bots submit instantly.
const MIN_FILL_MS = 3000;

const feedbackSchema = z.object({
  name: z.string().trim().max(100),
  email: z.union([z.literal(''), z.email('Невірна адреса електронної пошти.')]),
  message: z
    .string()
    .trim()
    .min(10, 'Повідомлення має містити щонайменше 10 символів.')
    .max(5000, 'Повідомлення занадто довге.'),
  website: z.string(), // honeypot, must stay empty
  startedAt: z.number(),
  token: z.string(),
});

export type FeedbackInput = z.input<typeof feedbackSchema>;

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

export async function sendFeedback(input: FeedbackInput): Promise<{ error?: string }> {
  const parsed = feedbackSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const { name, email, message, website, startedAt, token } = parsed.data;

  // Pretend success to bots so they don't learn what tripped them.
  if (website || Date.now() - startedAt < MIN_FILL_MS) return {};

  const headerList = await headers();
  const ip = headerList.get('cf-connecting-ip') ?? headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? null;

  if (!(await verifyTurnstile(token, ip))) {
    return { error: 'Не вдалося підтвердити, що ви не робот. Спробуйте ще раз.' };
  }

  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM as string,
    to: FEEDBACK_TO,
    replyTo: email || undefined,
    subject: `Відгук — Святе Письмо${name ? ` (${name})` : ''}`,
    text: [`Ім'я: ${name || '—'}`, `Email: ${email || '—'}`, '', message].join('\n'),
  });

  if (error) return { error: 'Не вдалося надіслати повідомлення. Спробуйте пізніше.' };
  return {};
}
