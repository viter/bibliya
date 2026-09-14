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

const forgotPasswordSchema = z.object({
  email: z.email({ message: 'Введіть коректну електронну пошту.' }),
});

export function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setServerError(null);

    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: '/skynuty-parol',
    });

    if (error) {
      setServerError(error.message ?? 'Щось пішло не так. Спробуйте ще раз.');
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="bg-card rounded-lg shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold mb-3">Перевірте пошту</h2>
        <p className="text-muted-foreground text-sm">
          Якщо ця електронна пошта зареєстрована, ми надіслали на неї посилання для скидання
          пароля.
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
      <h2 className="text-xl font-semibold text-center mb-2">Забули пароль?</h2>
      <p className="text-muted-foreground text-sm text-center mb-6">
        Введіть свою електронну пошту, і ми надішлемо посилання для скидання пароля.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          {serverError && <p className="text-destructive text-sm">{serverError}</p>}

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            Надіслати посилання
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground text-sm text-center mt-6">
        Згадали пароль?{' '}
        <Link href="/uviyty" className="text-foreground underline underline-offset-4">
          Увійти
        </Link>
      </p>
    </div>
  );
}
