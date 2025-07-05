import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IShift } from '../services/attendanceLogApi';

export interface AttendanceLog {
  _id: string;
  checkInAt: string;
  checkOutAt?: string;
  logDate: string;
  status: string;
  verifyType: string;
  shiftId: IShift;
  userId: string;
  employee: {
    _id: string;
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    gender: string;
    religion: string;
    blood: string;
    dept: string;
    roles: string[];
    avatar: string | null;
  };
}

const shift = {
  _id: '',
  dept: '', // MongoDB ObjectId as string
  startAt: '', // Format: HH:mm
  endAt: '', // Format: HH:mm
  shiftName: '',
  employees: [], // Array of ObjectId strings
  days: [],
};

export const initialStateOfLogState: AttendanceLog = {
  _id: '',
  checkInAt: '',
  employee: {
    _id: '',
    avatar: '',
    blood: '',
    dept: '',
    email: '',
    firstname: '',
    gender: '',
    lastname: '',
    phone: '',
    religion: '',
    roles: [''],
    userId: '',
  },
  logDate: '',
  shiftId: shift,
  status: '',
  userId: '',
  verifyType: '',
  checkOutAt: '',
};

export interface TodaySummary {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalLeave: number;
}

interface RootState {
  data: AttendanceLog[];
  liveLogs: AttendanceLog[];
  summary: TodaySummary;
}

const initialState: RootState = {
  data: [],
  liveLogs: [],
  summary: {
    totalPresent: 0,
    totalAbsent: 0,
    totalLate: 0,
    totalLeave: 0,
  },
};

export const logSlice = createSlice({
  name: 'attendance-log',
  initialState,
  reducers: {
    addLiveLog(state, action: PayloadAction<any>) {
      state.liveLogs.push(action.payload);
    },
    addLog(state, action: PayloadAction<any>) {
      const index = state.data.findIndex(log => log._id === action.payload._id);
      if (index !== -1) {
        // Replace existing log
        state.data[index] = action.payload;
      } else {
        // Add new log
        state.data.push(action.payload);
      }
    },
    addLogs(state, action: PayloadAction<any>) {
      state.data = action.payload;
    },
    addLiveLogs(state, action: PayloadAction<any>) {
      state.liveLogs = action.payload;
    },

    addSummary(state, action: PayloadAction<any>) {
      state.summary = action.payload;
    },
    deleteOne(state, action: PayloadAction<string>) {
      state.data = state.data.filter(log => log._id !== action.payload);
    },
  },
});

export const { addLiveLog, addLog, addLogs, addLiveLogs, addSummary, deleteOne } = logSlice.actions;
export default logSlice.reducer;
