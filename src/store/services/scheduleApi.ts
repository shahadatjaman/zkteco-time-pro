import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Schedule {
  _id: string;
  dep: string;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
}

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust base URL
  tagTypes: ['Schedule'],
  endpoints: builder => ({
    getSchedules: builder.query<Schedule[], void>({
      query: () => '/schedules',
      providesTags: ['Schedule'],
    }),
    createSchedule: builder.mutation<Schedule, Partial<Schedule>>({
      query: newSchedule => ({
        url: '/schedules',
        method: 'POST',
        body: newSchedule,
      }),
      invalidatesTags: ['Schedule'],
    }),
    updateSchedule: builder.mutation<Schedule, Schedule>({
      query: schedule => ({
        url: `/schedules/${schedule._id}`,
        method: 'PUT',
        body: schedule,
      }),
      invalidatesTags: ['Schedule'],
    }),
    deleteSchedule: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/schedules/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule'],
    }),
    deleteMultipleSchedules: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/schedules/delete-many`,
        method: 'POST',
        body: { ids },
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
  useDeleteMultipleSchedulesMutation,
} = scheduleApi;
