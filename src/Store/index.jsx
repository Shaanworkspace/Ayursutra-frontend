import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Slices/authSlice'

const store = configureStore({
    reducer: {
        //we have given a name --> "auth"
        auth: authSlice,
    },
});

export default store;
