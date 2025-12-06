import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nebs-it-backend-om25.vercel.app/api/v1/notice",
    prepareHeaders: (headers, { getState }) => {
      // Retrieve the token from your store or local storage
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["notice"],
  endpoints: () => ({}),
});
