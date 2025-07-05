'use client';

import InfiniteTable from '@/app/components/logs/items/InfiniteTable';
import Users from '@/app/components/users/mobile/Users';
import useIsSmallDevice from '@/hooks/useIsSmallDevice';
import React from 'react';

const CombinePage = () => {
  const isSmall = useIsSmallDevice();
  return <div>{isSmall ? <Users /> : <InfiniteTable />}</div>;
};

export default CombinePage;
