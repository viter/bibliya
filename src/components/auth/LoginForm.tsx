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
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

const loginSchema = z.object({
  email: z.email({ message: 'Введіть коректну електронну пошту.' }),
  password: z.string().min(1, { message: 'Введіть пароль.' }),
});

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo = '/' }: LoginFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setServerError(null);

    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        setServerError(
          'Ваша електронна пошта ще не підтверджена. Ми надіслали новий лист із посиланням для підтвердження.',
        );
        return;
      }
      setServerError(error.message ?? 'Не вдалося увійти. Перевірте дані та спробуйте ще раз.');
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-center mb-6">Вхід</h2>

      <GoogleSignInButton callbackURL={redirectTo} />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-border" />
        <span className="text-muted-foreground text-xs">або</span>
        <div className="h-px flex-1 bg-border" />
      </div>

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Пароль</FormLabel>
                  <Link
                    href="/zabuly-parol"
                    className="text-muted-foreground text-xs underline underline-offset-4"
                  >
                    Забули пароль?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" autoComplete="current-password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {serverError && <p className="text-destructive text-sm">{serverError}</p>}

          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            Увійти
          </Button>
        </form>
      </Form>

      <p className="text-muted-foreground text-sm text-center mt-6">
        Немає акаунту?{' '}
        <Link href="/reyestratsiya" className="text-foreground underline underline-offset-4">
          Зареєструватися
        </Link>
      </p>
    </div>
  );
}
