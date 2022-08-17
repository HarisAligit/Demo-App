import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const jarvisApi = createApi({
  reducerPath: 'jarvisApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://revforce-dev.empgautos.com/api/crm/' }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (payload) => ({
        url: '/auth/sign_in',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
      tagTypes: ['Post'],
    }),
  }),
})

export const { useSignInMutation } = jarvisApi