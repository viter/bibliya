/**
 * One-off: marks existing @gmail.com users as email-verified, so they can use
 * "Продовжити з Google" right away (better-auth links a Google sign-in to an
 * existing account only if that account's email is already verified).
 *
 * Usage (from the project root):
 *   npx jiti scripts/verify-gmail-users.ts           dry run: shows how many users would change
 *   npx jiti scripts/verify-gmail-users.ts --apply   writes the change
 *
 * Only users with emailVerified = false are touched. Before writing, the ids of
 * the affected users (ids only, no emails) are saved to
 * gmail-verified-ids-<timestamp>.json in the current directory, so the change
 * can be undone:
 *   UPDATE user SET emailVerified = false WHERE id IN (...ids from that file...);
 *
 * Run this BEFORE scripts/notify-site-live.ts --send: the announcement's wording
 * for Gmail users depends on whether they are verified.
 */
import 'dotenv/config';
import { writeFileSync } from 'node:fs';
import { prisma } from '../src/lib/prisma';

const apply = process.argv.includes('--apply');

const isGmail = (email: string) => email.trim().toLowerCase().endsWith('@gmail.com');

async function main() {
  const unverified = await prisma.user.findMany({
    where: { emailVerified: false },
    select: { id: true, email: true },
    orderBy: { id: 'asc' },
  });
  const ids = unverified.filter((u) => isGmail(u.email)).map((u) => u.id);

  console.log(
    `${unverified.length} unverified user(s); ${ids.length} of them are @gmail.com and would be marked verified.`,
  );

  if (!apply) {
    console.log('Dry run — nothing changed. Re-run with --apply to write.');
    return;
  }
  if (ids.length === 0) {
    console.log('Nothing to update.');
    return;
  }

  const backupFile = `gmail-verified-ids-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  writeFileSync(backupFile, JSON.stringify(ids));
  console.log(`Saved affected user ids to ${backupFile}`);

  const { count } = await prisma.user.updateMany({
    where: { id: { in: ids }, emailVerified: false },
    data: { emailVerified: true },
  });
  console.log(`Marked ${count} user(s) as verified.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
