import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export const signInThunk = createAsyncThunk(
    "login/signInThunk",
    async ({ email, password }) => {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        return response.user.email;
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: { isLoading: false, error: undefined },
    reducers: {},
    extraReducers: {
        [signInThunk.pending]: (state) => ({ ...state, isLoading: true }),
        [signInThunk.fulfilled]: (state) => ({ ...state, isLoading: false }),
        [signInThunk.rejected]: (state, { error }) => ({
            ...state,
            isLoading: false,
            error: error.message,
        }),
    },
});

export const loginReducer = loginSlice.reducer;