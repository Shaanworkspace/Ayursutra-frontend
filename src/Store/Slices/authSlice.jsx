/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.jwt;
            state.role = action.payload.role;
            state.isAuthenticated = true;

            localStorage.setItem("token", action.payload.jwt);
            localStorage.setItem("role", action.payload.role);
        },
        logout: (state) => {
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name: "auth",
//     initialState: {
//         user: JSON.parse(localStorage.getItem("user")) || null,
//         token: localStorage.getItem("token") || null,
//         userId: localStorage.getItem("userId") || null,
//     },
//     reducers: {
//         setCredentials: (state, action) => {
//             // state.user = action.payload.user;
//             // state.token = action.payload.token;
//             // state.userId = action.payload.user.sub;
//             const { user, token } = action.payload;

//             // update Redux state
//             state.user = user;
//             state.token = token;
//             state.userId = user?.sub || null;

//             // and persist to localStorage
//             localStorage.setItem("user", JSON.stringify(user));
//             localStorage.setItem("token", token);
//             localStorage.setItem("userId", user?.sub || "");
//         },
//         logout: (state) => {
//             // clear Redux state
//             state.user = null;
//             state.token = null;
//             state.userId = null;

//             // clean localStorage
//             localStorage.removeItem("user");
//             localStorage.removeItem("token");
//             localStorage.removeItem("userId");
//         },
//     },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
