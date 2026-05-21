import { configureStore  } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import  userReducer from './features/userSlices';

const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query's cache lives here
         user: userReducer,      // Local auth state lives here
    },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
