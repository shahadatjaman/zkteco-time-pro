import { apiSlice } from '../api/apiSlice';
import { AttendanceLog } from '../slices/logSlice';

export interface IShift {
  _id: string;
  dept: string; // MongoDB ObjectId as string
  startAt: string; // Format: HH:mm
  endAt: string; // Format: HH:mm
  shiftName: string;
  employees?: string[]; // Array of ObjectId strings
  days: string[];
}

export const attendanceLogApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTodayLogs: builder.query<any, void>({
      query: () => '/logs/today',
    }),

    getLogs: builder.query<any, void>({
      query: () => '/logs',
    }),

    getAttendanceLogById: builder.query<AttendanceLog, string>({
      query: id => `/attendance-logs/${id}`,
    }),

    createAttendanceLog: builder.mutation<AttendanceLog, Partial<AttendanceLog>>({
      query: newLog => ({
        url: '/attendance-logs',
        method: 'POST',
        body: newLog,
      }),
    }),

    updateAttendanceLog: builder.mutation<
      AttendanceLog,
      { _id: string; data: Partial<AttendanceLog> }
    >({
      query: ({ _id, data }) => ({
        url: `/attendance-logs/${_id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    deleteAttendanceLog: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/logs/${id}`,
        method: 'DELETE',
      }),
    }),

    deleteMultipleAttendanceLogs: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/attendance-logs/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetTodayLogsQuery,
  useGetLogsQuery,
  useGetAttendanceLogByIdQuery,
  useCreateAttendanceLogMutation,
  useUpdateAttendanceLogMutation,
  useDeleteAttendanceLogMutation,
  useDeleteMultipleAttendanceLogsMutation,
} = attendanceLogApi;
