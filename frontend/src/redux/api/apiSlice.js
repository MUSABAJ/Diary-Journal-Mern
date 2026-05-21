import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// "base" API slice -- all other slices extend from this one

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:'/api', //All requests prepend /api
        credentials: 'include', //CRITICAL: sends the HTTP-only JWT cookie with every request
    }),
    tagTypes:['User', 'Entry'], // Tag names used for cache invalidation
    endpoints: ()=>({}) //Empty here bc endpoints are injected by the other slices 
})