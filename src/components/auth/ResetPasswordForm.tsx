'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, { message: 'Пароль має містити принаймні 8 символів.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають.',
    path: ['confirmPassword'],
  });

interface ResetPasswordFormProps {
  token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    if (!token) return;
    setServerError(null);

    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      setServerError(error.message ?? 'Не вдалося скинути пароль. Спробуйте ще раз.');
      return;
    }

    setDone(true);
    setTimeout(() => router.push('/uviyty'), 2000);
  }

  if (!token) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Посилання недійсне</h2>
        <p className="text-muted-foreground text-sm">
          Це посилання для скидання пароля недійсне або застаріло.
        </p>
        <Link
          href="/zabuly-parol"
          className="text-foreground underline underline-offset-4 text-sm mt-6 inline-block"
        >
          Запросити нове посилання
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Пароль змінено</h2>
        <p className="text-muted-foreground text-sm">Перенаправляємо вас на сторінку входу...</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-center mb-6">Новий пароль</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новий пароль</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Підтвердіть пароль</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && <p className="text-destructive text-sm">{serverError}</p>}

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            Зберегти новий пароль
          </Button>
        </form>
      </Form>
    </div>
  );
}
