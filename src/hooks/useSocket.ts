import { useEffect } from 'react';

import { getSocket } from '../lib/socket';
import { setLastMessage, setSocket } from '.././store/slices/socketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setDeviceInfo } from '@/store/slices/deviceSlice';

export const useSocket: any = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = getSocket();

    const messageHandler = (msg: string) => {
      dispatch(setLastMessage(msg));
    };

    socket.on('message', messageHandler);

    // socket.on('device-info', (deviceData: any) => {
    //   // handle deviceData in your UI
    //   console.log('device-info', deviceData);
    //   dispatch(setDeviceInfo(deviceData));
    // });

    socket.emit('setTime', { dateTime: new Date() });

    if (socket) {
      dispatch(setSocket(socket));
    }

    return () => {
      socket.off('message', messageHandler);
    };
  }, []);
};
