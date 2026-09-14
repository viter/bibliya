'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

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
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Ім'я має містити принаймні 2 символи." })
      .max(255, { message: "Ім'я надто довге." }),
    email: z.email({ message: 'Введіть коректну електронну пошту.' }),
    password: z.string().min(8, { message: 'Пароль має містити принаймні 8 символів.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не співпадають.',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setServerError(null);

    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    if (error) {
      setServerError(error.message ?? 'Не вдалося створити акаунт. Спробуйте ще раз.');
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Підтвердіть пошту</h2>
        <p className="text-muted-foreground text-sm">
          Ми надіслали лист із посиланням для підтвердження на вашу електронну пошту. Перейдіть за
          посиланням, щоб завершити реєстрацію.
        </p>
        <Link
          href="/uviyty"
          className="text-foreground underline underline-offset-4 text-sm mt-6 inline-block"
        >
          Повернутися до входу
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-center mb-6">Реєстрація</h2>

      <GoogleSignInButton />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground text-xs">або</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ім&apos;я</FormLabel>
                <FormControl>
                  <Input type="text" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Електронна пошта</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
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
            Зареєструватися
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground text-sm text-center mt-6">
        Вже маєте акаунт?{' '}
        <Link href="/uviyty" className="text-foreground underline underline-offset-4">
          Увійти
        </Link>
      </p>
    </div>
  );
}
