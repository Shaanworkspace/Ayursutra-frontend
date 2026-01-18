import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import serviceStatusReducer from "./Slices/serviceStatusSlice";
import profileSlice from "./Slices/profileSlice";
const store = configureStore({
    reducer: {
        //we have given a name --> "auth"
        auth: authSlice,
        serviceStatus: serviceStatusReducer,
        profile: profileSlice,
    },
});

export default store;
