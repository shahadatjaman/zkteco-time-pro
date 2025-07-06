'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { decodeToken } from '@/utils/decodeToken';
import LoadingPage from '@/shared/Loading/Loading';

const PUBLIC_PATHS = ['/login', '/register', '/forgot-password'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const isPublic = PUBLIC_PATHS.includes(pathname);

    if (!token) {
      if (isPublic) {
        setChecked(true);
        router.push(pathname);
      } else {
        setTimeout(() => {
          setChecked(true);
          router.push('/login');
          return;
        }, 2000);
      }
      return;
    }

    try {
      const user: any = decodeToken(token);

      dispatch(setCredentials({ user, accessToken: token }));

      if (!isPublic) {
        setChecked(true);

        router.push(pathname);
      } else {
        setChecked(true);

        router.push('/');
      }
    } catch (e) {
      localStorage.removeItem('accessToken');
      router.push('/login');
    }
  }, [pathname]);

  return checked ? <>{children}</> : <LoadingPage isAuthLoading={true} />;
}
