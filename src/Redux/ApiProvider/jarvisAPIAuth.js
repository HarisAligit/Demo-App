import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jarvisAPIAuth = createApi({
  reducerPath: "jarvisAPIAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://staging-olxpk.jarvisempg.com/api/crm/",
    prepareHeaders: (headers, { getState }) => {
      const user = getState().user.user;

      const userInstance = user.find(item => item['auth'] === true);
      if (userInstance) {
        headers.set('access-token', userInstance.accessToken);
        headers.set('uid', userInstance.uid);
        headers.set('client', userInstance.client);
      }
      return headers
  }}),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getCurrentUser: builder.mutation({
      query: () => {
        return({
        url: "users/current",
      })},
    }),
    getClients: builder.query({
      query: (id= '') => {
        return({
        url: `/clients${id}`,
      })},
    }),
    getClientDetailByID: builder.query({
      query: (id) => ({
        url: `/clients/${id}`,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useGetClientDetailByIDQuery,
  useGetCurrentUserMutation,
  useGetClientsQuery,
} = jarvisAPIAuth;
