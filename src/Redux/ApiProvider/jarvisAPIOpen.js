import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jarvisAPIOpen = createApi({
  reducerPath: "jarvisAPIOpen",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://staging-olxpk.jarvisempg.com/api/crm/",
  }),
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
            response: response?.data,
            accessToken: meta.response.headers.get("access-token"),
            client: meta.response.headers.get("client"),
            uid: meta.response.headers.get("uid"),
          };
        },
        tagTypes: ["Post"],
      }),
    }),
});

export const {
  useSignInMutation,
} = jarvisAPIOpen;
