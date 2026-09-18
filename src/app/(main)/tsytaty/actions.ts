'use server';

import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BEZ_KATEHORIYI } from '@/lib/constants';

async function requireUserId(): Promise<number> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error('Unauthorized');
  return Number(session.user.id);
}

const DUPLICATE_KATEHORIYA_ERROR = 'Категорія з такою назвою вже існує.';

function isUniqueViolation(e: unknown): boolean {
  return typeof e === 'object' && e !== null && 'code' in e && e.code === 'P2002';
}

async function resolveKatehoriyaIds(
  userid: number,
  owned: { id: number; katehoriya: string }[],
): Promise<number[]> {
  const nonSentinel = owned.filter((k) => k.katehoriya !== BEZ_KATEHORIYI);
  if (nonSentinel.length > 0) return nonSentinel.map((k) => k.id);
  if (owned.length > 0) return owned.map((k) => k.id);

  const existing = await prisma.katehoriyi.findFirst({
    where: { userid, katehoriya: BEZ_KATEHORIYI },
    select: { id: true },
  });
  if (existing) return [existing.id];

  try {
    const created = await prisma.katehoriyi.create({
      data: { userid, katehoriya: BEZ_KATEHORIYI },
      select: { id: true },
    });
    return [created.id];
  } catch (e) {
    if (!isUniqueViolation(e)) throw e;
    const raced = await prisma.katehoriyi.findFirstOrThrow({
      where: { userid, katehoriya: BEZ_KATEHORIYI },
      select: { id: true },
    });
    return [raced.id];
  }
}

export async function deleteTsytata(id: number) {
  const userid = await requireUserId();

  await prisma.tsytaty.deleteMany({
    where: { id, userid },
  });

  revalidatePath('/tsytaty');
}

export async function createKatehoriya(
  name: string,
): Promise<{ error?: string; katehoriya?: { id: number; katehoriya: string } }> {
  const userid = await requireUserId();

  const trimmed = name.trim();
  if (!trimmed) return { error: "Назва категорії обов'язкова." };

  const duplicate = await prisma.katehoriyi.findFirst({ where: { userid, katehoriya: trimmed } });
  if (duplicate) return { error: DUPLICATE_KATEHORIYA_ERROR };

  try {
    const created = await prisma.katehoriyi.create({
      data: { userid, katehoriya: trimmed },
      select: { id: true, katehoriya: true },
    });

    revalidatePath('/tsytaty');
    return { katehoriya: created };
  } catch (e) {
    if (isUniqueViolation(e)) return { error: DUPLICATE_KATEHORIYA_ERROR };
    throw e;
  }
}

export async function updateKatehoriya(id: number, name: string): Promise<{ error?: string }> {
  const userid = await requireUserId();

  const trimmed = name.trim();
  if (!trimmed) return { error: "Назва категорії обов'язкова." };

  const duplicate = await prisma.katehoriyi.findFirst({
    where: { userid, katehoriya: trimmed, id: { not: id } },
  });
  if (duplicate) return { error: DUPLICATE_KATEHORIYA_ERROR };

  try {
    await prisma.katehoriyi.updateMany({
      where: { id, userid },
      data: { katehoriya: trimmed },
    });
  } catch (e) {
    if (isUniqueViolation(e)) return { error: DUPLICATE_KATEHORIYA_ERROR };
    throw e;
  }

  revalidatePath('/tsytaty');
  return {};
}

export async function getUserKatehoriyi(): Promise<{ id: number; katehoriya: string }[]> {
  const userid = await requireUserId();

  return prisma.katehoriyi.findMany({
    where: { userid },
    orderBy: { katehoriya: 'asc' },
    select: { id: true, katehoriya: true },
  });
}

export async function createTsytata(
  text: string,
  katehoriyaIds: number[],
): Promise<{ error?: string }> {
  const userid = await requireUserId();

  const trimmed = text.trim();
  if (!trimmed) return { error: 'Текст цитати обов’язковий.' };

  const owned = await prisma.katehoriyi.findMany({
    where: { id: { in: katehoriyaIds }, userid },
  });

  const finalIds = await resolveKatehoriyaIds(userid, owned);

  await prisma.tsytaty.create({
    data: {
      userid,
      tsytata: trimmed,
      katehoriyi: { connect: finalIds.map((id) => ({ id })) },
    },
  });

  revalidatePath('/tsytaty');
  return {};
}

export async function updateQuoteKatehoriyi(
  quoteId: number,
  katehoriyaIds: number[],
): Promise<{ error?: string }> {
  const userid = await requireUserId();

  const quote = await prisma.tsytaty.findFirst({ where: { id: quoteId, userid } });
  if (!quote) return { error: 'Цитату не знайдено.' };

  const owned = await prisma.katehoriyi.findMany({
    where: { id: { in: katehoriyaIds }, userid },
  });

  const finalIds = await resolveKatehoriyaIds(userid, owned);

  await prisma.tsytaty.update({
    where: { id: quoteId },
    data: { katehoriyi: { set: finalIds.map((id) => ({ id })) } },
  });

  revalidatePath('/tsytaty');
  return {};
}

export async function deleteKatehoriya(id: number): Promise<{ error?: string }> {
  const userid = await requireUserId();

  const result = await prisma.katehoriyi.deleteMany({
    where: { id, userid, tsytaty: { none: {} } },
  });

  revalidatePath('/tsytaty');

  if (result.count === 0) {
    return { error: 'Неможливо видалити категорію, у якій є цитати.' };
  }

  return {};
}
