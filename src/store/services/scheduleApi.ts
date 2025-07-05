import { apiSlice } from '../api/apiSlice';

export interface Dep {
  _id: string;
  deptName: string;
  status: string;
}

export interface Schedule {
  _id: string;
  dept: Dep;
  shiftName: string;
  startAt: string;
  endAt: string;
  days: string[];
  employees: string[];
}

export interface Res {
  data: Schedule[];
  status: number;
}

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSchedules: builder.query<Res, void>({
      query: () => '/shifts',
    }),
    createSchedule: builder.mutation<Schedule, Partial<Schedule>>({
      query: newSchedule => ({
        url: '/shifts',
        method: 'POST',
        body: newSchedule,
      }),
    }),
    updateSchedule: builder.mutation({
      query: schedule => {
        console.log('schedule', schedule);
        return {
          url: `/shifts/${schedule.id}`,
          method: 'PUT',
          body: schedule,
        };
      },
    }),
    deleteSchedule: builder.mutation<Res, string>({
      query: id => ({
        url: `/shifts/${id}`,
        method: 'DELETE',
      }),
    }),

    deleteManySchedules: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/shifts/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
  useDeleteScheduleMutation,
  useDeleteManySchedulesMutation,
} = scheduleApi;
