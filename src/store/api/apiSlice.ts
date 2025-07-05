import { createApi, fetchBaseQuery, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import type { RootState } from '../store'; // Adjust the import based on your actual RootState path

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SERVER_URL || "http://localhost:3002",
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {

    
    const state:any = getState() as RootState;


    
       let token =   localStorage.getItem('accessToken');

       console.log('token', token)
   
    if (token) {
        token = token.replace(/"/g, '');
     
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Define the baseQueryWithReauth function with types
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       const refreshResult:any = await baseQuery('auth/refresh', api, extraOptions);


  //       const token = refreshResult?.data?.accessToken as string | undefined;

  //       if (token) {
  //         const sanitizedToken = token.replace(/"/g, '');
  //         localStorage.setItem('accessToken', sanitizedToken);

  //         // Retry original query with new token
  //         if (typeof args === 'string') {
  //           args = {
  //             url: args,
  //             headers: {
  //               Authorization: `Bearer ${sanitizedToken}`,
  //             },
  //           };
  //         } else {
  //           args.headers = {
  //             ...args.headers,
  //             Authorization: `Bearer ${sanitizedToken}`,
  //           };
  //         }

  //         result = await baseQuery(args, api, extraOptions);
  //       }

        
  //       if (refreshResult?.error) {
  //         if ((refreshResult.error as any).data?.statusCode === 401) {
  //           result = await baseQuery(args, api, extraOptions);
  //         }
  //       }
  //     } finally {
  //       release();
  //     }
  //   } else {
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }

  return result;
};

// Define your RTK Query API slice
export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({}),
});
