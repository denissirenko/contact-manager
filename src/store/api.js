import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", "Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn");
      headers.set("Accept", "application/json");
      headers.set("X-Requested-With", "XMLHttpRequest");
      return headers;
    },
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: ({ sort }) => `contacts?sort=${sort}`,
      providesTags: ["Contacts"],
    }),
    getContact: builder.query({
      query: (id) => `contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contacts", id }],
    }),
    createContact: builder.mutation({
      query: (newContact) => ({
        url: "contact",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
    addTags: builder.mutation({
      query: ({ id, tags }) => ({
        url: `contacts/${id}/tags`,
        method: "PUT",
        body: { tags },
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useAddTagsMutation,
} = contactsApi;
