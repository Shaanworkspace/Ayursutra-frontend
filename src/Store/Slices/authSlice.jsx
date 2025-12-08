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
        setCredentials: (state,action)=>{
            
        },
        logout: ()=>{
        },
    },
})

export const { setCredentials, logout } = authSlice.actions;
// Here we use reducers--> reducer only 
export default authSlice.reducer