import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api/apiSlice';

interface AuthResponse {
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => {
        console.log('credentials', credentials);
        return {
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        };
      },
    }),
    updateOldPassword: builder.mutation({
      query: credentials => {
        console.log('credentials', credentials);
        return {
          url: '/auth/update-password',
          method: 'PATCH',
          body: credentials,
        };
      },
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: newUser => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),
    getProfile: builder.query<AuthResponse['user'], void>({
      query: () => '/auth/profile',
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),

    // 🔑 Forgot password (send reset link)
    requestPasswordReset: builder.mutation({
      query: body => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    // 🔑 Reset password using token (from email)
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: body => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    // 🔑 Check token validation
    tokenValidator: builder.mutation({
      query: body => ({
        url: '/auth/token-validator',
        method: 'POST',
        body,
      }),
    }),

    // 🔑 Change password (must be logged in)
    changePassword: builder.mutation({
      query: body => ({
        url: '/auth/update-password',
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateOldPasswordMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
  useTokenValidatorMutation,
  useChangePasswordMutation,
} = authApi;
