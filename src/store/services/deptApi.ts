import { Department } from '@/app/components/dep/items/InfiniteTable';
import { apiSlice } from '../api/apiSlice';

export const deptApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
    }),

    getDepartmentById: builder.query<Department, string>({
      query: id => `/departments/${id}`,
    }),

    createDepartment: builder.mutation<Department, Partial<Department>>({
      query: newDept => ({
        url: '/departments',
        method: 'POST',
        body: newDept,
      }),
    }),

    updateDepartment: builder.mutation<Department, { _id: string; data: Partial<Department> }>({
      query: ({ _id, data }) => {
        return {
          url: `/departments/${_id}`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    deleteDepartment: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/departments/${id}`,
        method: 'DELETE',
      }),
    }),

    deleteMultipleDepartments: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/departments/bulk-delete`,
        method: 'DELETE',
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useDeleteMultipleDepartmentsMutation,
} = deptApi;
