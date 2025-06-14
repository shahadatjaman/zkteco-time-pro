import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import scheduleReducer from './slices/scheduleSlice';
import { scheduleApi } from './services/scheduleApi';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    schedules: scheduleReducer,
    [scheduleApi.reducerPath]: scheduleApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
