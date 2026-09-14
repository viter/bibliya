'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { useMounted } from '@/lib/useMounted';

export default function UserMenu() {
  const mounted = useMounted();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!mounted) {
    return <div className="w-8 h-8 rounded-full bg-secondary" />;
  }

  if (!session) {
    return (
      <Link
        href="/uviyty"
        title="Увійти"
        className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
      >
        <UserIcon className="text-foreground" />
      </Link>
    );
  }

  async function handleSignOut() {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      title={`Вийти (${session.user.name})`}
      className="flex w-8 h-8 bg-secondary items-center justify-center rounded-full hover:bg-accent hover:cursor-pointer"
    >
      <LogOutIcon className="text-foreground" />
    </button>
  );
}
