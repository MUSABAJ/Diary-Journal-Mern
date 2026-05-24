import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        signup: builder.mutation({
            query:(data) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: data,
            }),
        }),

        login: builder.mutation({
            query:(data) => ({
                url: '/auth/login',
                method: 'POST',
                body:data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                mehod: 'POST',
             }),
        }),

        getProfile: builder.query({
            query: () => '/user/me',
            providesTags: ['User']
        }),
        
        updateProfile: builder.mutation({
            query: (data) => ({
                url: '/users/me',
                method: 'PUT',
                body: data,
            }),
            invlidatesTags: ['User'] //after update, refetch anything tagged 'User
        }),

        changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: data,
      }),
    }),
 }),
});

// RTK Query auto-generates these hooks from the endpoint names
export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = usersApiSlice;