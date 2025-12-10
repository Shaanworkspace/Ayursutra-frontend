/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        userId:localStorage.getItem('userId') || null
    },
    reducers: {
        setCredentials: (state, action) => {
            
            // state.user = action.payload.user;
            // state.token = action.payload.token;
            // state.userId = action.payload.user.sub;

            const { user, token } = action.payload;
            
            // update Redux state
            state.user = user;
            state.token = token;
            state.userId = user?.sub || null;

            // and persist to localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user?.sub || "");
        },
        logout: (state) => {
            // clear Redux state
            state.user = null;
            state.token = null;
            state.userId = null;

            // clean localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        },
    },
})

export const { setCredentials, logout } = authSlice.actions;
// Here we use reducers--> reducer only 
export default authSlice.reducer