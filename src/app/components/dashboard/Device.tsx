'use client';

import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setDeviceTime } from '@/store/slices/deviceSlice';

const DeviceStatus = dynamic(() => import('./DeviceInfo'), {
  ssr: false,
});

const Device = () => {
  return <DeviceStatus />;
};

export default Device;
