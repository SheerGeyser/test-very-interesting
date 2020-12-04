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
    initialState: { isLoadingRegister: false, errorRegister: undefined },
    reducers: {
        clearError: (state) => ({ ...state, errorRegister: undefined }),
    },
    extraReducers: {
        [registerThunk.pending]: (state) => ({ ...state, isLoadingRegister: true, errorRegister: undefined }),
        [registerThunk.fulfilled]: (state) => ({ ...state, isLoadingRegister: false }),
        [registerThunk.rejected]: (state, { error }) => ({
            ...state,
            isLoadingRegister: false,
            errorRegister: error.message,
        }),
    },
});

export const { clearError } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;