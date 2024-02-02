import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import { MessageResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:4000/api/v1/users',
  }),
  tagTypes:['users'],
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags:['users']
    }),
    deleteUser: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
      invalidatesTags:['users']
    }),
    allUsers: builder.query<string,string>({
      query: (id) =>`all?id${id}`,
      providesTags:['users']
    }),
    
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data } = await axios.get(
    `http://localhost:4000/api/v1/users/${id}`
    );
    return data;
  } catch(error) {console.log(error)}
};
export const { useLoginMutation } = userApi;
