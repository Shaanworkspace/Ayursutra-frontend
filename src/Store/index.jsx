import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import serviceStatusReducer from "./Slices/serviceStatusSlice";

const store = configureStore({
    reducer: {
        //we have given a name --> "auth"
        auth: authSlice,
        serviceStatus: serviceStatusReducer,
    },
});

export default store;
