'use client';

import { setCredentials } from '@/store/slices/authSlice';
import { decodeToken } from '@/utils/decodeToken';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router: any = useRouter();
  const pathname = usePathname();

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const user: any = decodeToken(token);
      dispatch(setCredentials({ user: user, accessToken: token }));
      router.push(pathname);
    } else {
      if (!PUBLIC_PATHS.includes(pathname)) {
        router.push('/login');
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
