import { createSlice } from "@reduxjs/toolkit";

const savedProfile = JSON.parse(localStorage.getItem("profile"));

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        data: savedProfile?.data || null,
        role: savedProfile?.role || null,
    },
    reducers: {
        setProfile: (state, action) => {
            state.data = action.payload.data;
            state.role = action.payload.role;

            localStorage.setItem(
                "profile",
                JSON.stringify({
                    data: action.payload.data,
                    role: action.payload.role,
                }),
            );
        },
        clearProfile: (state) => {
            state.data = null;
            state.role = null;
            localStorage.removeItem("profile");
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
