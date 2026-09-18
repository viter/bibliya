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

  const created = await prisma.katehoriyi.create({
    data: { userid, katehoriya: trimmed },
    select: { id: true, katehoriya: true },
  });

  revalidatePath('/tsytaty');
  return { katehoriya: created };
}

export async function updateKatehoriya(id: number, name: string): Promise<{ error?: string }> {
  const userid = await requireUserId();

  const trimmed = name.trim();
  if (!trimmed) return { error: "Назва категорії обов'язкова." };

  await prisma.katehoriyi.updateMany({
    where: { id, userid },
    data: { katehoriya: trimmed },
  });

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

  const nonSentinel = owned.filter((k) => k.katehoriya !== BEZ_KATEHORIYI);
  const finalIds = nonSentinel.length > 0 ? nonSentinel.map((k) => k.id) : owned.map((k) => k.id);

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

  const nonSentinel = owned.filter((k) => k.katehoriya !== BEZ_KATEHORIYI);
  const finalIds = nonSentinel.length > 0 ? nonSentinel.map((k) => k.id) : owned.map((k) => k.id);

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
