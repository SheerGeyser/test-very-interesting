import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export const registerThunk = createAsyncThunk(
    "register/registerThunk",
    async ({ email, password }) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
    }
);

const registerSlice = createSlice({
    name: "register",
    initialState: { isLoading: false, error: undefined },
    reducers: {},
    extraReducers: {
        [registerThunk.pending]: (state) => ({ ...state, isLoading: true }),
        [registerThunk.fulfilled]: (state) => ({ ...state, isLoading: false }),
        [registerThunk.rejected]: (state, { error }) => ({
            ...state,
            isLoading: false,
            error,
        }),
    },
});

export const registerReducer = registerSlice.reducer;