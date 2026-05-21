import { createSlice } from "@reduxjs/toolkit";

// This slice stores the logged-in user's info in Redux====local UI state, not server data

const initialState = {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
    },
});

export const { setCredentials, clearCredentials } = userSlice.actions;
export default userSlice.reducer;

