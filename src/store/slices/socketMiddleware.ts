import { Middleware } from '@reduxjs/toolkit';
import { connectSocket } from '../../lib/socket';
import { setConnected, setLastMessage } from './socketSlice';
import { setDeviceInfo, setDeviceTime, updateDevice } from './deviceSlice';

export const socketMiddleware: Middleware = store => {
  const userId = store.getState().auth.user?.id ?? 'guest';

  const socket = connectSocket({ userId });

  socket.on('connect', () => {
    store.dispatch(setConnected(true));
  });

  socket.on('realtime-device', deviceData => {
    // handle deviceData in your UI
    store.dispatch(updateDevice(deviceData));
  });

  socket.on('device-info', (deviceData: any) => {
    // handle deviceData in your UI
    console.log('device-info', deviceData);
    store.dispatch(setDeviceInfo(deviceData));
  });

  socket.on('device-time', (time: any) => {
    console.log('time', time);
    store.dispatch(setDeviceTime(time));
  });

  // socket.emit('restartDevice', 'HI');

  socket.on('disconnect', () => {
    store.dispatch(setConnected(false));
  });

  socket.on('message', (data: string) => {
    store.dispatch(setLastMessage(data));
  });

  return next => action => next(action);
};
