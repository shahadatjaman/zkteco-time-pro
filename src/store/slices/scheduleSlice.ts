import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Schedule {
  _id: string;
  dep: string;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
}

interface ScheduleState {
  data: Schedule[];
}

const initialState: ScheduleState = {
  data: [],
};

const scheduleSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.data.push(action.payload);
    },
    updateSchedule: (state, action: PayloadAction<Schedule>) => {
      const index = state.data.findIndex(item => item._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteSchedule: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(item => item._id !== action.payload);
    },
    deleteMultipleSchedules: (state, action: PayloadAction<string[]>) => {
      console.log('action.payload', action.payload);
      state.data = state.data.filter(item => !action.payload.includes(item._id));
    },
    setSchedules: (state, action: PayloadAction<Schedule[]>) => {
      state.data = action.payload;
    },
  },
});

export const {
  addSchedule,
  updateSchedule,
  deleteSchedule,
  deleteMultipleSchedules,
  setSchedules,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
