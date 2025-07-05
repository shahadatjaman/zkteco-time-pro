'use client';

import React from 'react';

import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('../../components/login'), {
  ssr: false,
});

const RenerPageWithCSR = () => {
  return <LoginPage />;
};

export default RenerPageWithCSR;
