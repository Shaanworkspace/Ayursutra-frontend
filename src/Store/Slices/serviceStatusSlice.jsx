import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: "unknown",
    patient: "unknown",
    doctor: "unknown",
    user: "unknown",
    therapist: "unknown",
};

const serviceStatusSlice = createSlice({
    name: "serviceStatus",
    initialState,
    reducers: {
        setServiceStatus: (state, action) => {
            const { service, status } = action.payload;
            state[service] = status;
        },
    },
});

export const { setServiceStatus } = serviceStatusSlice.actions;
export default serviceStatusSlice.reducer;
