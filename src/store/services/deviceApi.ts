import { apiSlice } from '../api/apiSlice';

export interface Device {
  _id: string;
  name: string;
  ip: string;
  port: number;
  location?: string;
  status?: 'online' | 'offline';
}

export const deviceApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDevices: builder.query<Device[], void>({
      query: () => '/devices',
    }),

    createDevice: builder.mutation<Device, Partial<Device>>({
      query: newDevice => ({
        url: '/devices',
        method: 'POST',
        body: newDevice,
      }),
    }),

    updateDevice: builder.mutation<Device, Device>({
      query: device => ({
        url: `/devices/${device._id}`,
        method: 'PUT',
        body: device,
      }),
    }),

    deleteDevice: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/devices/${id}`,
        method: 'DELETE',
      }),
    }),

    deleteMultipleDevices: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/devices/delete-many`,
        method: 'POST',
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useDeleteMultipleDevicesMutation,
} = deviceApi;
