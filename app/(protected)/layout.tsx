'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
// import { ScreenLoader } from '@/components/common/screen-loader';
import { IconLoader } from "@tabler/icons-react";
import { Demo1Layout } from '../components/layouts/demo1/layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
      return (
            <IconLoader className="size-10 animate-spin mx-auto h-screen text-gray-500" />
        );
  }

  return session ? <Demo1Layout>{children}</Demo1Layout> : null;
}
