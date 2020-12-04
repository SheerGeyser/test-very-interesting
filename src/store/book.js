import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async () => {
        const books = await firebase.firestore().collection('book').get();
        // return books.docs.map((t) => ({ ...t.data(), id: t.id }));
        return []
    }
);


const bookSlice = createSlice({
    name: "books",
    initialState: {
        isLoadingBooks: false,
        items: [],
        errorBooks: undefined,
    },
    reducers: {},
    extraReducers: {
        [fetchBooks.pending]: (state) => ({ ...state, isLoadingBooks: true, errorBooks: undefined }),
        [fetchBooks.fulfilled]: (state, { payload }) => ({ ...state, isLoadingBooks: false, items: payload }),
        [fetchBooks.rejected]: (state, { error }) => ({
            ...state,
            isLoadingBooks: false,
            errorBooks: error.message,
        })
    }
})


export const booksReducer = bookSlice.reducer;