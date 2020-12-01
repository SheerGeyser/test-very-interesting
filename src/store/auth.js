
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: undefined,
    },
    reducers: {
        updateAuthState: (state, { payload }) => ({ ...state, user: payload }),
    },
    extraReducers: {},
});

export const { updateAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;