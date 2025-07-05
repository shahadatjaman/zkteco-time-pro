import { apiSlice } from '../api/apiSlice';

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: 'admin' | 'user' | 'superadmin'; // Example roles
  status?: 'active' | 'inactive';
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<any[], void>({
      query: () => '/users',
    }),

    getUserById: builder.query<User, string>({
      query: id => `/users/${id}`,
    }),

    createUser: builder.mutation<User, Partial<User>>({
      query: newUser => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
    }),

    updateUser: builder.mutation({
      query: user => ({
        url: `/users/${user._id}`,
        method: 'Put',
        body: user.data,
      }),
    }),

    deleteUser: builder.mutation<{ id: string }, string>({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),

    deleteMultipleUsers: builder.mutation<void, string[]>({
      query: ids => ({
        url: `/users/delete-many`,
        method: 'POST',
        body: { ids },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useDeleteMultipleUsersMutation,
} = userApi;
