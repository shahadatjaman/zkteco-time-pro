import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from './slices/sidebarSlice';
import scheduleReducer from './slices/scheduleSlice';
import deviceReducer from './slices/deviceSlice';
import authReducer from './slices/authSlice';
import socketReducer from './slices/socketSlice';
import userReducer from './slices/userSlice';
import deptReducer from './slices/deptSlice';
import logtReducer from './slices/logSlice';
import zktecoReducer from './slices/zktecoSlice';
import eventReducer from './slices/eventSlice';

import { apiSlice } from './api/apiSlice';

import { socketMiddleware } from './slices/socketMiddleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    sidebar: sidebarReducer,
    schedules: scheduleReducer,
    auth: authReducer,
    user: userReducer,
    device: deviceReducer,
    socket: socketReducer,
    dept: deptReducer,
    log: logtReducer,
    zkteco: zktecoReducer,
    event: eventReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware, socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
