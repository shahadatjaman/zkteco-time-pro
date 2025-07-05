import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Schedule } from '../services/scheduleApi';

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
    deleteASchedule: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(item => item._id !== action.payload);
    },
    deleteManySchedules: (state, action: PayloadAction<string[]>) => {
      state.data = state.data.filter(item => !action.payload.includes(item._id)) || [];
    },
    setSchedules: (state, action: PayloadAction<Schedule[]>) => {
      state.data = action.payload;
    },
  },
});

export const {
  addSchedule,
  updateSchedule,
  deleteASchedule,
  deleteManySchedules,
  setSchedules,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
