import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jarvisApi = createApi({
  reducerPath: "jarvisApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://staging-olxpk.jarvisempg.com/api/crm/",
    prepareHeaders: (headers, { getState }) => {
      const user = getState().persistedReducer.user;

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
    signIn: builder.mutation({
      query: (payload) => ({
        url: "/auth/sign_in",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse(response, meta) {
        return {
          response,
          accessToken: meta.response.headers.get("access-token"),
          client: meta.response.headers.get("client"),
          uid: meta.response.headers.get("uid"),
        };
      },
      tagTypes: ["Post"],
    }),
    getOpportunities: builder.mutation({
      query: () => {

        return({
        url: "/opportunities",
        // headers: {
        //   'Content-type': 'application/json; charset=UTF-8',
        // },
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
  useGetOpportunitiesQuery,
  useGetClientsQuery,
} = jarvisApi;
