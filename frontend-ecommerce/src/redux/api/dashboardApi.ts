import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BarResponse,
  LineResponse,
  PieResponse,
  StatsResponse,
} from "../../types/api-types";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}api/v1/statistics/`,
  }),
  endpoints: (builder) => ({
    stats: builder.query<StatsResponse, string>({
      query: (id) => `dashboardStats?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    pie: builder.query<PieResponse, string>({
      query: (id) => `pieChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    bar: builder.query<BarResponse, string>({
      query: (id) => `barChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
    line: builder.query<LineResponse, string>({
      query: (id) => `lineChart?id=${id}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useBarQuery, useStatsQuery, useLineQuery, usePieQuery } =
  dashboardApi;
