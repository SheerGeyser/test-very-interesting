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
    initialState: { isLoadingLogin: false, errorLogin: undefined },
    reducers: {
        clearErrorLog: (state) => ({ ...state, errorLogin: undefined }),
    },
    extraReducers: {
        [signInThunk.pending]: (state) => ({ ...state, isLoadingLogin: true, errorLogin: undefined }),
        [signInThunk.fulfilled]: (state) => ({ ...state, isLoadingLogin: false }),
        [signInThunk.rejected]: (state, { error }) => ({
            ...state,
            isLoadingLogin: false,
            errorLogin: error.message,
        }),
    },
});

export const { clearErrorLog } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;