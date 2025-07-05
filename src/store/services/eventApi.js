import { apiSlice } from '../api/apiSlice';

const eventApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createCalendar: builder.mutation({
      query: data => {
        return {
          url: 'events/calendar',
          method: 'POST',
          body: data,
        };
      },
    }),
    updateCalendar: builder.mutation({
      query: data => ({
        url: `events/calendar/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    getCalendars: builder.mutation({
      query: () => ({
        url: 'events/calendar',
        method: 'GET',
      }),
    }),

    deleteCalendar: builder.mutation({
      query: data => ({
        url: `events/calendar/${data._id}`,
        method: 'DELETE',
      }),
    }),

    createEvent: builder.mutation({
      query: data => {
        return {
          url: 'events/event',
          method: 'POST',
          body: data,
        };
      },
    }),
    getEvents: builder.mutation({
      query: () => ({
        url: 'events/event',
        method: 'GET',
      }),
    }),
    updateAEvent: builder.mutation({
      query: data => {
        console.log('data at 354', data);
        return {
          url: `events/event/${data._id}`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteAEvent: builder.mutation({
      query: data => ({
        url: `events/event/${data}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCalendarMutation,
  useCreateEventMutation,
  useUpdateCalendarMutation,
  useGetCalendarsMutation,
  useGetEventsMutation,
  useUpdateAEventMutation,
  useDeleteCalendarMutation,
  useDeleteAEventMutation,
} = eventApi;
