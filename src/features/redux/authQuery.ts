import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResultFetchAuth, SignUpBody } from '../forms/AuthForm/types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://19429ba06ff2.vps.myjino.ru/api' }),
  endpoints: (builder) => ({
    signUp: builder.mutation<ResultFetchAuth, SignUpBody>({
      query: (userData) => ({
        method: 'POST',
        url: '/signup',
        body: userData,
      }),
    }),
  }),
});

export const { useSignUpMutation } = authApi;
