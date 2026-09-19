/**
 * One-off announcement: tells users the site is back online.
 *
 * Usage (from the project root):
 *   npx jiti scripts/notify-site-live.ts                    dry run: counts recipients, sends nothing
 *   npx jiti scripts/notify-site-live.ts --test me@x.com    sends ONE email to that address (no DB access)
 *   npx jiti scripts/notify-site-live.ts --send             sends to every user except addresses ending in .ru
 *
 * Add --verified to --test to preview the wording sent to already-verified users.
 * Links in the email use SITE_URL if set, otherwise BETTER_AUTH_URL from .env.
 * --send refuses to run if that is a localhost address.
 *
 * Emails go out through Resend's batch API, 100 per request, one message per
 * recipient (nobody sees anyone else's address). Each batch carries an
 * idempotency key, so re-running within 24h after a crash won't double-send
 * batches that already went through.
 */
import 'dotenv/config';
import { createHash } from 'node:crypto';
import { encode } from 'html-entities';
import { prisma } from '../src/lib/prisma';
import { resend } from '../src/lib/mailer';

const BATCH_SIZE = 100; // Resend's max per batch request
const BATCH_DELAY_MS = 600; // Resend's default limit is 2 requests/second
const SUBJECT = 'Святе Письмо знову працює';
const EXCLUDED_SUFFIX = '.ru';

type Recipient = { id: number; name: string; email: string; emailVerified: boolean };

const args = process.argv.slice(2);
const send = args.includes('--send');
const testIdx = args.indexOf('--test');
const testEmail = testIdx === -1 ? undefined : args[testIdx + 1];
const testVerified = args.includes('--verified'); // preview the wording for a verified user

if (testIdx !== -1 && (!testEmail || testEmail.startsWith('--'))) {
  fail('--test needs an email address, e.g. --test me@example.com');
}
if (testEmail && send) {
  fail('--test cannot be combined with --send');
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

// Public site address used in the links. .env's BETTER_AUTH_URL is localhost in
// development, so override it with: SITE_URL=https://your-site npx jiti ...
const siteUrl = (process.env.SITE_URL ?? process.env.BETTER_AUTH_URL) as string;

const isGmail = (email: string) => email.trim().toLowerCase().endsWith('@gmail.com');

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function buildMessage({ name, email, emailVerified }: Recipient) {
  const resetUrl = new URL('/zabuly-parol', siteUrl).href;
  // Google sign-in is new, so only Gmail users are told about it. It links to an
  // existing account only once that account's email is verified, so the wording
  // depends on that (see scripts/verify-gmail-users.ts).
  const googleNote = !isGmail(email)
    ? null
    : emailVerified
      ? 'Також тепер на сайті можна входити через Google: натисніть «Продовжити з Google» і оберіть цю саму пошту — тоді пароль створювати не потрібно.'
      : 'Також тепер на сайті можна входити через Google («Продовжити з Google»). Це спрацює після того, як ви створите пароль і підтвердите пошту, як описано вище, — до цього вхід через Google з цією поштою не працюватиме.';
  const verifyNote = emailVerified
    ? null
    : 'Після цього, коли будете входити, сайт може попросити підтвердити електронну пошту — просто перейдіть за посиланням у новому листі.';
  return {
    from: process.env.EMAIL_FROM as string,
    replyTo: process.env.EMAIL_REPLY_TO,
    to: email,
    subject: SUBJECT,
    html: `
      <p>Привіт, ${encode(name)}!</p>
      <p>Раді повідомити, що сайт «Святе Письмо» знову працює. Дякуємо за терпіння!</p>
      <p><strong>Щоб продовжити користуватися сайтом, потрібно створити новий пароль.</strong> Відкрийте сторінку входу, натисніть «Забули пароль?», введіть свою електронну пошту й перейдіть за посиланням з листа, який ми надішлемо:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      ${verifyNote ? `<p>${verifyNote}</p>` : ''}
      ${googleNote ? `<p>${googleNote}</p>` : ''}
      <p>Сайт: <a href="${siteUrl}">${siteUrl}</a></p>
      <p>Якщо помітите щось незвичне, просто дайте відповідь на цей лист.</p>
    `,
    text: [
      `Привіт, ${name}!`,
      '',
      'Раді повідомити, що сайт «Святе Письмо» знову працює. Дякуємо за терпіння!',
      '',
      'Щоб продовжити користуватися сайтом, потрібно створити новий пароль. Відкрийте сторінку входу, натисніть «Забули пароль?», введіть свою електронну пошту й перейдіть за посиланням з листа, який ми надішлемо:',
      resetUrl,
      '',
      ...(verifyNote ? [verifyNote, ''] : []),
      ...(googleNote ? [googleNote, ''] : []),
      `Сайт: ${siteUrl}`,
      '',
      'Якщо помітите щось незвичне, просто дайте відповідь на цей лист.',
    ].join('\n'),
  };
}

async function main() {
  for (const key of ['RESEND_API_KEY', 'EMAIL_FROM', 'EMAIL_REPLY_TO', 'BETTER_AUTH_URL']) {
    if (!process.env[key]) fail(`Missing ${key} in environment (.env)`);
  }

  if (send && /localhost|127\.0\.0\.1/.test(siteUrl)) {
    fail(
      `Refusing to send: links would point to ${siteUrl}. Run with SITE_URL=https://your-site set.`,
    );
  }

  if (testEmail) {
    const { data, error } = await resend.emails.send(
      buildMessage({ id: 0, name: 'друже', email: testEmail, emailVerified: testVerified }),
    );
    if (error) fail(`Test send failed: ${error.message}`);
    console.log(`Test email sent to ${testEmail} (id ${data?.id})`);
    return;
  }

  const users: Recipient[] = await prisma.user.findMany({
    select: { id: true, name: true, email: true, emailVerified: true },
    orderBy: { id: 'asc' },
  });

  const recipients = users.filter((u) => !u.email.trim().toLowerCase().endsWith(EXCLUDED_SUFFIX));
  console.log(
    `${recipients.length} recipient(s) (${recipients.filter((r) => isGmail(r.email)).length} Gmail, get the Google login note); skipped ${users.length - recipients.length} ${EXCLUDED_SUFFIX} address(es).`,
  );

  if (!send) {
    console.log('Dry run — nothing sent. Re-run with --send to send for real.');
    return;
  }

  const failed: { email: string; reason: string }[] = [];
  let sent = 0;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    const idempotencyKey = `site-live-${createHash('sha1')
      .update(batch.map((r) => r.id).join(','))
      .digest('hex')}`;

    const { error } = await resend.batch.send(batch.map(buildMessage), {
      idempotencyKey,
    });

    if (error) {
      console.error(`Batch starting at #${i + 1} failed: ${error.message}`);
      failed.push(...batch.map((r) => ({ email: r.email, reason: error.message })));
    } else {
      sent += batch.length;
      console.log(`Sent ${sent}/${recipients.length}`);
    }

    if (i + BATCH_SIZE < recipients.length) await sleep(BATCH_DELAY_MS);
  }

  console.log(`\nDone. Sent: ${sent}, failed: ${failed.length}.`);
  if (failed.length) {
    console.error('Failed recipients:');
    for (const f of failed) console.error(`  ${f.email} — ${f.reason}`);
    process.exitCode = 1;
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
