import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63f4e98755677ef68bc69435.mockapi.io/api',
  }),

  tagTypes: ['Contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => '/contacts',
      providesTags: ['Contacts'],
    }),

    getContactById: builder.query({
      query: id => `/contacts/${id}`,
      providesTags: ['Contacts'],
    }),

    addContact: builder.mutation({
      query: contact => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    removeContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),

    editContact: builder.mutation({
      query: contact => ({
        url: `/contacts/${contact.id}`,
        method: 'PUT',
        body: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useAddContactMutation,
  useRemoveContactMutation,
  useEditContactMutation,
} = contactsApi;
