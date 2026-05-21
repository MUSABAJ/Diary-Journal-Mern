import { apiSlice } from "./apiSlice";

export const entriesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getEntries: builder.query({
            query: '/entries',
            providesTags: ['Entry']
        }),
    
        searchEntries: builder.query({
            query: (text) => `/entries/search?text=${text}`,
            providesTags: ['Entry']
        }),    

        getEntry: builder.query({
            query: (id) => `/entries/${id}`,
                providesTags: ['Entry']
            }),
        createEntry: builder.mutation({
            query: (data) => ({
            url: '/entries',
            method: 'POST',
            data: data,
            }),
            invalidatesTags: ["Entry"],
        }),
        
        updateEntry: builder.mutation({
        query: ({ id, ...data }) => ({
            url: `/entries/${id}`,
            method: 'PATCH',
            body: data,
        }),
        invalidatesTags: ['Entry'],
        }),

        deleteEntry: builder.mutation({
        query: (id) => ({
            url: `/entries/${id}`,
            method: 'DELETE',
        }),
        invalidatesTags: ['Entry'],
        }),
    }),
});


export const {

  useGetEntriesQuery,
  useSearchEntriesQuery,
  useGetEntryQuery,
  useCreateEntryMutation,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
  
} = entriesApiSlice;