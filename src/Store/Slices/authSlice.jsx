/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    userResponse: localStorage.getItem("userResponse"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.jwt;
            state.role = action.payload.role;
            state.userResponse = action.payload.userResponse;
            state.isAuthenticated = true;

            localStorage.setItem("token", action.payload.jwt);
            localStorage.setItem("role", action.payload.role);
            localStorage.setItem(
                "userResponse",
                JSON.stringify(action.payload.userResponse),
            );
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.userResponse = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userResponse");
            localStorage.removeItem("profile");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
